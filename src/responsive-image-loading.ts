type ResponsiveImageVariants = {
    [key: string]: string,
}

const formatStringToKebabCase = (str: string) => str
    .replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
    );

const computeResponsiveImageVariants = (sourceTag: HTMLSourceElement): ResponsiveImageVariants | undefined => {
    const dataset = sourceTag.dataset;
    if (Object.keys(dataset).length === 0) {
        console.error('No source attributes found for responsive image', sourceTag);
        return undefined;
    }

    const availableSources = Object.entries(dataset)
        .map(([key, value]) => [formatStringToKebabCase(key), value])
        .filter(([key]) => key?.startsWith('source-') || false)
        .map(([key, value]) => [key?.replace('source-', ''), value]);

    return Object.fromEntries(availableSources);
};

const sortResponsiveImageVariants = (variants: ResponsiveImageVariants): [string, string][] => {
    return Object.entries(variants).sort(([keyA], [keyB]) => {
        if (keyA === 'default') return 1;
        if (keyB === 'default') return -1;

        return parseInt(keyB) <= parseInt(keyA) ? -1 : 1;
    });
};

const initResponsiveImageLoading = (pictureTag: HTMLPictureElement) => {
    const sourceTag = pictureTag.querySelector("source") as HTMLSourceElement | null;
    if (sourceTag === null) {
        console.error('No source element found in picture tag', pictureTag);
        return;
    }

    const imgTag = pictureTag.querySelector('img') as HTMLImageElement | null;
    if (imgTag === null) {
        console.error('No img element found in picture tag', pictureTag);
        return;
    }

    const unsortedImageVariants = computeResponsiveImageVariants(sourceTag);
    if (unsortedImageVariants === undefined) return;

    const sortedImageVariants = sortResponsiveImageVariants(unsortedImageVariants);

    const resizeObserver = new ResizeObserver((imgTags) => {
        imgTags.forEach((imgTag) => {
            const { width: imgTagWidth } = imgTag.contentRect;

            const source = sortedImageVariants.find(([width]) => {
                if (isNaN(parseInt(width))) return false;
                return parseInt(width) <= imgTagWidth;
            });

            // if no matching source is found, use the default one
            if (source === undefined) {
                sourceTag.srcset = unsortedImageVariants['default'];
                return;
            }

            const [, sourceURL] = source;
            sourceTag.srcset = sourceURL;
        });
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
