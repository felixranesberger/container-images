type ResponsiveImageVariants = {
  [key: string]: string,
};

const formatStringToKebabCase = (str: string) => str
  .replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  );

// eslint-disable-next-line max-len
const computeResponsiveImageVariants = (sourceTag: HTMLSourceElement): ResponsiveImageVariants | undefined => {
  const { dataset } = sourceTag;
  if (Object.keys(dataset).length === 0) return undefined;

  const availableSources = Object.entries(dataset)
    .map(([key, value]) => [formatStringToKebabCase(key), value])
    .filter(([key]) => key?.startsWith('source-') || false)
    .map(([key, value]) => [key?.replace('source-', ''), value]);

  return Object.fromEntries(availableSources);
};

// eslint-disable-next-line max-len
const sortResponsiveImageVariants = (variants: ResponsiveImageVariants): [string, string][] => Object.entries(variants)
  .sort(([keyA], [keyB]) => {
    if (keyA === 'default') return 1;
    if (keyB === 'default') return -1;

    return parseInt(keyB, 10) <= parseInt(keyA, 10) ? -1 : 1;
  });

const initResponsiveImageLoading = (pictureTag: HTMLPictureElement) => {
  const sourceTag = pictureTag.querySelector<HTMLSourceElement>('source');
  if (sourceTag === null) return;

  const imgTag = pictureTag.querySelector<HTMLImageElement>('img');
  if (imgTag === null) return;

  const unsortedImageVariants = computeResponsiveImageVariants(sourceTag);
  if (unsortedImageVariants === undefined) return;

  const sortedImageVariants = sortResponsiveImageVariants(unsortedImageVariants);

  const resizeObserver = new ResizeObserver(([element]) => {
    const { width: imgTagWidth } = element.contentRect;

    const source = sortedImageVariants.find(([width]) => {
      if (Number.isNaN(parseInt(width, 10))) return false;
      return parseInt(width, 10) <= imgTagWidth;
    });

    // if no matching source is found, use the default one
    if (source === undefined) {
      sourceTag.srcset = unsortedImageVariants.default;
      return;
    }

    const [, sourceURL] = source;
    sourceTag.srcset = sourceURL;
  });

  resizeObserver.observe(imgTag);
};

export default (pictureTags: HTMLPictureElement[]) => {
  pictureTags.forEach((pictureTag) => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: '200px',
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      initResponsiveImageLoading(pictureTag);
      intersectionObserver.disconnect();
    }, observerOptions);

    intersectionObserver.observe(pictureTag);
  });
};
