import { describe, expect, it } from 'vitest'
import { filterObjectByKeyPrefix, formatStringToKebabCase, numberClosestTo } from '../src/utils'

describe('utils', () => {
  it('should format string to kebab case', () => {
    expect(formatStringToKebabCase('HelloWorld')).toBe('hello-world')
    expect(formatStringToKebabCase('helloworld')).toBe('helloworld')
  })

  it('should get number closest to target', () => {
    expect(numberClosestTo([1, 2, 3, 4, 5], 3)).toBe(3)
    expect(numberClosestTo([100, 200, 300], 160)).toBe(200)
    expect(numberClosestTo([100, 200, 300], 140)).toBe(100)
    expect(numberClosestTo([200], 100)).toBe(200)
  })

  it('should get node attributes matching prefix', () => {
    const input = {
      'key-incorrect': 'incorrect',
      'key-incorrect-2': 'incorrect-2',
      'key-correct': 'correct',
      'key-correct-2': 'correct-2',
    }

    const expectedOutput = {
      'key-correct': 'correct',
      'key-correct-2': 'correct-2',
    }

    expect(filterObjectByKeyPrefix(input, 'key-correct')).toEqual(expectedOutput)
  })
})
