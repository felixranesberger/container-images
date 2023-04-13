import {
  convertStringToNumber,
  filterObjectByKeyPrefix,
  lazyExecuteCallback,
  numberClosestTo,
  stripObjectKeyPrefix,
} from './utils'

/**
 * Get available sources from data attributes on source tag
 * @param sourceTag - Source tag to get data attributes from
 */
function getAvailableSources(sourceTag: HTMLSourceElement) {
  const attributePrefix = 'source-'

  const { dataset } = sourceTag
  if (Object.keys(dataset).length === 0) {
    console.error('No data attributes found in source tag, aborting', sourceTag)
    return
  }

  const unsortedImageVariants = filterObjectByKeyPrefix(
    dataset as Record<string, string>,
    attributePrefix,
  )

  if (Object.keys(unsortedImageVariants).length === 0)
    console.error('No valid container-images data attributes found on source tag, aborting', sourceTag)

  return stripObjectKeyPrefix(unsortedImageVariants, attributePrefix)
}

export default (pictureTags: HTMLPictureElement[]) => {
  pictureTags.forEach((pictureTag) => {
    const sourceTag = pictureTag.querySelector<HTMLSourceElement>('source')
    if (sourceTag === null) {
      console.error('No source tag found in picture tag, aborting', pictureTag)
      return
    }

    const imageTag = pictureTag.querySelector<HTMLImageElement>('img')
    if (imageTag === null) {
      console.error('No image tag found in picture tag, aborting', pictureTag)
      return
    }

    const availableSources = getAvailableSources(sourceTag)
    if (availableSources === undefined)
      return

    lazyExecuteCallback(pictureTag, () => {
      const availableSourceWidths = Object.keys(availableSources).map(convertStringToNumber)

      const resizeObserver = new ResizeObserver(([element]) => {
        const { width: imageWidth } = element.contentRect

        const bestFittingSource = numberClosestTo(
          availableSourceWidths,
          imageWidth,
        )

        sourceTag.srcset = availableSources[bestFittingSource]
      })

      resizeObserver.observe(imageTag)
    })
  })
}
