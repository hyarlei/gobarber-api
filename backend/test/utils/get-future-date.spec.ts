import { expect, test } from 'vitest'
import { getFutureDate } from './get-future-date'

test('should be able to get a future date', () => {
    const year = new Date().getFullYear()
    expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(year + 1)
})