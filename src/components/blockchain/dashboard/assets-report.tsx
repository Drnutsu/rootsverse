/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return*/
import { useContext, useMemo } from 'react'

import { PriceInfoCard } from '@components/base/card/price-info-card'
import { BlockchainContext } from '@hooks/provider/blockchainProvider'
import { BalanceLoader } from '../loader'
// import { UseQueryResult } from 'react-query'
// import { PriceResponse } from '@hooks/provider/hooks/types'

export function AssetsReport() {
  const { historyQueries } = useContext(BlockchainContext)
  const top3PriceDiff = useMemo(() => {
    return Object.keys(historyQueries)
      .map((key) => {
        return {
          ...historyQueries[key]?.data,
          diff_percent:
            ((historyQueries[key]?.data?.prices[0]?.price -
              historyQueries[key]?.data?.prices[1]?.price) /
              historyQueries[key]?.data?.prices[1]?.price) *
            100
        }
      })
      .filter((p) => p.diff_percent || p.balance <= 0)
      .sort((a, b) => Math.abs(b.diff_percent) - Math.abs(a?.diff_percent))
  }, [JSON.stringify(historyQueries)])
  return (
    <div className='py-4 max-w-md flex-grow'>
      <div className='flex flex-col'>
        <span className='text-2xl text-base-content font-bold'>
          TOP ASSETS CHANGED 24 HRS.
        </span>
        <span className='text-xs text-base-content text-opacity-50'>
          we use covalent as API for provide data here,it's might have some
          missing assets which didn't supported by covalent yet.
        </span>
      </div>
      {top3PriceDiff.length === 0 && (
        <div className='my-10 text-base-content text-opacity-70 text-center'>
          you don't have any assets on this chain.
        </div>
      )}
      <BalanceLoader>
        {top3PriceDiff.map((info) => (
          <PriceInfoCard info={info} />
        ))}
      </BalanceLoader>
    </div>
  )
}
