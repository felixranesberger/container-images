import { objectMap } from '@antfu/utils'

/**
 * Format string to kebab case
 * @example: formatStringToKebabCase('HelloWorld') -> 'hello-world'
 */
export function formatStringToKebabCase(str: string) {
  return str
    .replace(
      /[A-Z]+(?![a-z])|[A-Z]/g,
      ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
    )
}

/**
 * Convert string to number
 * @param key
 */
export function convertStringToNumber(key: string): number {
  const number = parseInt(key, 10)

  if (Number.isNaN(number))
    throw new Error(`Could not convert to number: ${key}`)

  return number
}

/**
 * Execute a callback function when an element is about to intersect the viewport.
 * The callback function will only be executed once.
 * @param element - Element to observe
 * @param callback - Callback function to execute when element is about to intersect the viewport
 */
export function lazyExecuteCallback(element: HTMLElement, callback: () => void): void {
  const observerOptions: IntersectionObserverInit = {
    rootMargin: '200px',
  }

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting)
      return

    callback()
    intersectionObserver.disconnect()
  }, observerOptions)

  intersectionObserver.observe(element)
}

/**
 * Filter object by key prefix
 * @param obj - object to filter
 * @param prefix - prefix used to filter object keys (e.g. 'source-')
 */
export function filterObjectByKeyPrefix(obj: Record<string, string>, prefix: string) {
  return objectMap(obj, (key, value) => {
    const isValidKey = key?.startsWith(prefix)
    if (isValidKey)
      return [key, value]

    return undefined
  })
}

/**
 * Strip object key prefix
 * @param obj
 * @param prefix - prefix to strip from object keys (e.g. 'source-')
 */
export function stripObjectKeyPrefix(obj: Record<string, string>, prefix: string) {
  return objectMap(obj, (key, value) => {
    return [key?.replace(prefix, ''), value]
  })
}

/**
 * Get number closest to target
 * @param numbers - Array of numbers to compare
 * @param target - Target number to compare
 */
export function numberClosestTo(numbers: number[], target: number): number {
  return numbers.reduce((prev, curr) => (
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  ))
}
