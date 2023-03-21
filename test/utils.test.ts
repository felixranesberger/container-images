import { describe, expect, it } from 'vitest'
import { getNodeAttributesMatchingPrefix, numberClosestTo } from '../src/utils'

describe('utils', () => {
  it('should get number closest to target', () => {
    expect(numberClosestTo([1, 2, 3, 4, 5], 3)).toBe(3)
    expect(numberClosestTo([100, 200, 300], 160)).toBe(200)
    expect(numberClosestTo([100, 200, 300], 140)).toBe(100)
    expect(numberClosestTo([200], 100)).toBe(200)
  })

  it('should get node attributes matching prefix', () => {
    const prefix = 'data-prefix-'

    const node = document.createElement('div')
    node.setAttribute('data-prefix-key-1', 'value1')
    node.setAttribute('data-prefix-key-2', 'value2')
    node.setAttribute('data-random-prefix-key-3', 'value3')

    expect(getNodeAttributesMatchingPrefix(node, prefix)).toEqual({
      'key-1': 'value1',
      'key-2': 'value2',
    })
  })
})
