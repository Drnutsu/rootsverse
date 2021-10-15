/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access*/
import BigNumber from 'bignumber.js'

// MATRIX
export const toMatrix = (arr: number[], width: number) =>
  arr.reduce(
    (rows, key, index) =>
      (index % width == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  )

// PERCENT CHANGED
export const getPercentDiff = (first: number, second: number) =>
  ((second - first) / first) * 100

export const normalizeNumber = (balance: string | number, decimal: number) =>
  new BigNumber(balance).shiftedBy(-decimal || -8).toFormat(4)
