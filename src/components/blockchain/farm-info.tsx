import { useContext, useMemo } from 'react'
import BigNumber from 'bignumber.js'

import {
  BlockchainContext
  // BlockChainContextType
} from '@hooks/provider/blockchainProvider'
import { chainIdNetwork } from '@constants/blockchain'
import {
  RequiredResourceProps,
  TokenBalance
} from '@hooks/provider/hooks/types'
import { normalizeNumber } from '@helpers/math'

export interface TokenData {
  balance: string
  contract_address: string
  contract_decimals: number
  contract_ticker_symbol: string
  logo_url: string
  quote: number
  quote_rate: number
  total_supply: string
}

export interface FarmData {
  address: string
  chain_id: number
  next_update_at: string
  pancakeswap: {
    balances: Array<{
      pool_token: TokenData
      token_0: TokenData
      token_1: TokenData
    }>
    length: number
  }
  quote_currency: string
}

// const pancakeConfig = {
//   titleResolver: (data: FarmData) =>
//     data?.pancakeswap?.balances?.[0]?.pool_token?.contract_ticker_symbol ||
//     'UNKNOWN FARM DATA',
//   listData: [
//     {
//       iconResolver: (data: FarmData) =>
//         data?.pancakeswap?.balances?.[0]?.pool_token?.logo_url,
//       labelResolver: () => 'Total supply',
//       dataResolver: (data: FarmData) =>
//         new BigNumber(
//           data?.pancakeswap?.balances?.[0]?.pool_token?.total_supply
//         )
//           .shiftedBy(
//             -data?.pancakeswap?.balances?.[0]?.pool_token?.contract_decimals ||
//               -8
//           )
//           .toFormat(4) + ' $' || '0 $'
//     },
//     {
//       iconResolver: (data: FarmData) =>
//         data?.pancakeswap?.balances?.[0]?.token_0?.logo_url,
//       labelResolver: (data: FarmData) =>
//         data?.pancakeswap?.balances?.[0]?.token_0?.contract_ticker_symbol,
//       dataResolver: (data: FarmData) =>
//         new BigNumber(data?.pancakeswap?.balances?.[0]?.token_0?.balance)
//           .shiftedBy(
//             -data?.pancakeswap?.balances?.[0]?.token_0?.contract_decimals || -8
//           )
//           .toFormat(4) + ' $' || '0 $'
//     },
//     {
//       iconResolver: (data: FarmData) =>
//         data?.pancakeswap?.balances?.[0]?.token_1?.logo_url,
//       labelResolver: (data: FarmData) =>
//         data?.pancakeswap?.balances?.[0]?.token_1?.contract_ticker_symbol,
//       dataResolver: (data: FarmData) =>
//         new BigNumber(data?.pancakeswap?.balances?.[0]?.token_1?.balance)
//           .shiftedBy(
//             -data?.pancakeswap?.balances?.[0]?.token_1?.contract_decimals || -8
//           )
//           .toFormat(4) + ' $' || '0 $'
//     }
//   ]
// }

const balanceConfig = {
  titleResolver: (data: TokenBalance) => data?.contract_ticker_symbol,
  listData: [
    {
      labelResolver: () => 'balance : ',
      dataResolver: (data: TokenBalance) =>
        `${normalizeNumber(data?.balance, data?.contract_decimals)} ${
          data?.contract_ticker_symbol
        }` || '0 $'
    }
  ]
}

export const FarmInfoCard = <A extends {}>({
  rawData,
  isLoading,
  titleResolver,
  listData
}: {
  rawData: A
  isLoading: boolean
  titleResolver: (d: A) => string
  listData: {
    labelResolver: (d: A) => string
    dataResolver: (d: A) => string
    iconResolver?: (d: A) => string
  }[]
}) => (
  <div className='flex w-full lg:w-96 justify-center'>
    {isLoading || !listData ? (
      <button className='btn btn-lg btn-circle loading'></button>
    ) : (
      <div
        tabIndex={0}
        className='card shadow-lg compact side bg-base-100 collapse w-full  rounded-box collapse-arrow text-base-content'
      >
        <div className='collapse-title text-xl font-medium'>
          {titleResolver(rawData)}
        </div>
        <div className='collapse-content'>
          <ul>
            {listData?.map(({ labelResolver, dataResolver, iconResolver }) => (
              <li>
                {iconResolver && (
                  <img src={iconResolver(rawData)} className='w-7 h-7' />
                )}
                {labelResolver(rawData)}: {dataResolver(rawData)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
)

export default function FarmInfo() {
  const { chainId, isBalanceLoading, coinBalanceInfo }: RequiredResourceProps =
    useContext(BlockchainContext)
  // const { data, isLoading } = useQuery<FarmData>('farm', () =>
  //   getPancakeSwapV2BalancesData(
  //     { address, chain_id: 56 },
  //     {
  //       key: process.env.REACT_APP_COVALENT_API_KEY
  //     }
  //   )
  // )

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='text-xl text-base-500 text-base-content font-bold'>
        YOUR {chainIdNetwork?.[chainId]?.name?.toUpperCase() || 'BSC'} TOKENS
      </div>
      {isBalanceLoading ||
        (!coinBalanceInfo?.items && (
          <button className='btn btn-lg btn-circle loading self-center flex'></button>
        ))}
      {coinBalanceInfo?.items &&
        coinBalanceInfo.items.map((item) => (
          <FarmInfoCard<TokenBalance>
            rawData={item}
            isLoading={isBalanceLoading || !coinBalanceInfo?.items}
            {...balanceConfig}
          />
        ))}
    </div>
  )
}

FarmInfo.whyDidYouRender = true
