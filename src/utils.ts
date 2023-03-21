import { objectEntries } from '@antfu/utils'

/**
 * Get number closest to target
 * @param numbers - Array of numbers to compare
 * @param target - Target number to compare
 */
export const numberClosestTo = (numbers: number[], target: number): number => {
  return numbers.reduce((prev, curr) => (
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  ))
}

/**
 * Get node attributes matching a given prefix.
 * The prefix is removed from the key.
 * @param node - Node to get attributes from
 * @param prefix - Prefix to match
 */
export const getNodeAttributesMatchingPrefix = (node: HTMLElement, prefix: string) => {
  const attributes = objectEntries(node.dataset)
    .map(([key, value]) => {
      if (typeof key === 'number')
        return [key.toString(), value]

      return [key, value]
    })
    .filter(([key]) => {
      if (!key)
        return false

      return key.startsWith(prefix)
    })
    .map(([key, value]) => [key?.replace(prefix, ''), value])

  if (attributes.length === 0)
    throw new Error('No container-images data attributes found')

  return Object.fromEntries(attributes) as Record<string, string>
}
