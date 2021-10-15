/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return*/
import { useState, useEffect } from 'react'
import { useQuery, useQueries } from 'react-query'
import format from 'date-fns/format'
import sub from 'date-fns/sub'
import { Web3Provider } from '@ethersproject/providers'

import { binanceChainId } from '@apis/covalent/constants'
import { getTokenBalancesData } from '@apis/covalent/class-a'
import { getHistoricalPricesDataByTicker } from '@apis/covalent/pricing'

import { BalanceResponse, PriceResponse, TokenBalance } from './types'

export const defaultRequiredResource = {
  chainId: binanceChainId,
  isReady: false,
  coinBalanceInfo: null,
  isBalanceLoading: false,
  historyQueries: null
}

export default function useSetupAllRequireResource(
  address: string,
  userProvider: Web3Provider
) {
  const [chainId, setChainId] = useState(binanceChainId)

  useEffect(() => {
    async function fetchNewNetwork() {
      const newNetwork = await userProvider.getNetwork()
      setChainId(newNetwork.chainId)
    }
    fetchNewNetwork()
  }, [userProvider])
  const { data: coinBalanceInfo, isLoading: isBalanceLoading } =
    useQuery<BalanceResponse>(
      ['balance', chainId, address],
      () =>
        getTokenBalancesData(
          {
            address,
            chain_id: chainId
          },
          {
            key: process.env.REACT_APP_COVALENT_API_KEY
          }
        ),
      {
        enabled: !!address && !!chainId
      }
    )

  // console.log('#log -> coinBalanceInfo', coinBalanceInfo)
  // react query didn't define type casting yet.
  // https://github.com/tannerlinsley/react-query/pull/1527
  const historyQueries = (
    useQueries(
      (coinBalanceInfo?.items || []).map((balance) => {
        return {
          queryKey: ['history-balance', balance?.contract_ticker_symbol],
          queryFn: () =>
            getHistoricalPricesDataByTicker(
              'USD',
              balance?.contract_ticker_symbol,
              {
                to: format(sub(new Date(), { days: 1 }), 'yyyy-MM-dd'),
                from: format(sub(new Date(), { days: 2 }), 'yyyy-MM-dd'),
                key: process.env.REACT_APP_COVALENT_API_KEY
              }
            ).then((data) => {
              if (!data) return data
              return { ...data, ...balance }
            }),
          enabled: !!balance?.contract_ticker_symbol
        }
      })
    ) as { data: PriceResponse }[]
  )
    .filter((h) => h?.data && h?.data?.balance > 0)
    .reduce(
      (a, h) => ({
        ...a,
        [h?.data?.contract_ticker_symbol]: h
      }),
      {}
    )

  return {
    // overall loading
    chainId,
    // isReady: false,
    // coinBalanceInfo: null,
    // isBalanceLoading: false
    isReady: isBalanceLoading,
    coinBalanceInfo,
    isBalanceLoading,
    historyQueries
  }
}
