import { notUndefined, objectEntries } from '@antfu/utils'
import { getNodeAttributesMatchingPrefix, numberClosestTo } from './utils'

const getResponsiveImageVariants = (sourceTag: HTMLSourceElement) => {
  const unvalidatedImageVariants = getNodeAttributesMatchingPrefix(sourceTag, 'data-source-')

  // filter out all keys that cannot be converted to numbers
  const validImageVariants = objectEntries(unvalidatedImageVariants)
    .map(([key, value]) => {
      if

      const parsedKey = parseInt(key, 10)
      if (Number.isNaN(parsedKey))
        return undefined

      return [parsedKey, value]
    })
    .filter(notUndefined)

  if (validImageVariants.length === 0)
    throw new Error('No valid container-images data attributes found')

  return Object.fromEntries(validImageVariants)
}

const initResponsiveImageLoading = (pictureTag: HTMLPictureElement) => {
  const sourceTag = pictureTag.querySelector<HTMLSourceElement>('source')
  if (sourceTag === null)
    return

  const imgTag = pictureTag.querySelector<HTMLImageElement>('img')
  if (imgTag === null)
    return

  const responsiveImageVariants = getResponsiveImageVariants(sourceTag)

  const resizeObserver = new ResizeObserver(([element]) => {
    const { width: imageWidth } = element.contentRect

    // get image variant that is closest to the current image width
    const closestImageVariantKey = numberClosestTo(
      Object.keys(responsiveImageVariants),
      imageWidth,
    )

    const source = sortedImageVariants.find(([width]) => {
      if (Number.isNaN(parseInt(width, 10)))
        return false
      return parseInt(width, 10) <= imageWidth
    })

    // if no matching source is found, use the default one
    if (source === undefined) {
      sourceTag.srcset = unsortedImageVariants.default
      return
    }

    const [, sourceURL] = source
    sourceTag.srcset = sourceURL
  })

  resizeObserver.observe(imgTag)
}

export default (pictureTags: HTMLPictureElement[]) => {
  pictureTags.forEach((pictureTag) => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: '200px',
    }

    const hasOptionsDefined = pictureTag.hasAttribute('data-container-images-loading')
    if (hasOptionsDefined) {
      const loadingMode = pictureTag.getAttribute('data-container-images-loading')

      if (loadingMode === 'eager') {
        initResponsiveImageLoading(pictureTag)
        return
      }
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting)
        return
      initResponsiveImageLoading(pictureTag)
      intersectionObserver.disconnect()
    }, observerOptions)

    intersectionObserver.observe(pictureTag)
  })
}
