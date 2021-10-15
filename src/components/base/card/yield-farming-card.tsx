import { BigNumber } from 'bignumber.js'
import cx from 'classnames'
import Avatar from 'react-avatar'
import format from 'date-fns/format'

import { PriceResponse, TokenBalance } from '@hooks/provider/hooks/types'
import { Card } from './'
import { getPercentDiff, normalizeNumber } from '@helpers/math'
import { PoolDataType } from '@components/blockchain/dashboard/farms-report'
import { TokenAmount } from '@uniswap/sdk'
import { LiquidityPool } from '@abis/rsk/liquidity-pool'
import { PoolDataResponse, PoolTokenData } from '@apis/rsk/sovryn'
import Chart from '../chart'

export interface PoolInfoCardProps {
  pool?: PoolDataType
}

PoolInfoCard.defaultProps = {
  pool: {
    // balance: 'N/A',
    // 	contract_ticker_symbol: 'N/A'
    balance: '5.704',
    contract_ticker_symbol: 'BNB',
    contract_name: 'BINANCE COIN',
    diff_percent: 100,
    contract_decimals: 1,
    prices: [{ price: 1 }]
  }
}

const dataEnv = 'mainnet'

const getChartConfig = (historyInfoList: PoolTokenData[]) => ({
  data: historyInfoList.map((i) => ({
    ...i,
    rewardAPY: i.APY_rewards_pc,
    date: format(Date.parse(i.activity_date), 'yyyy-MM-dd')
  })),
  height: 100,
  xField: 'date',
  yField: 'rewardAPY',
  point: {
    size: 5,
    shape: 'diamond'
  }
})

export function PoolInfoCard({ pool }: PoolInfoCardProps) {
  const firstAsset = pool?.supplyAssets?.[0]
  const secondAsset = pool?.supplyAssets?.[1]
  const poolAddress = firstAsset?.poolTokens[dataEnv].toLowerCase()
  const historyInfoList = pool?.data?.[poolAddress]
  return (
    <Card className='compact my-3'>
      <div className='flex justify-between'>
        <div className='flex flex-col flex-grow'>
          <div className='flex flex-row gap-2 items-center'>
            <div>
              <Avatar
                size='25'
                round={true}
                style={{ width: 25 }}
                src={firstAsset?.assetDetails?.logoSvg}
              />
              <Avatar
                size='25'
                round={true}
                style={{ width: 25 }}
                src={secondAsset?.assetDetails?.logoSvg}
              />
            </div>
            <span className='text-opacity-50 text-base-content'>
              {firstAsset?.asset || 'N/A'} - {secondAsset?.asset || 'N/A'}
            </span>
          </div>
          <div className='my-4'>
            <Chart config={getChartConfig(historyInfoList)} />
          </div>
          <span className='text-3xl font-bold text-primary'>
            {/* {pool?.balance
              ? normalizeNumber(pool?.balance, pool?.contract_decimals)
              : 'N/A'}
            {pool?.contract_ticker_symbol} */}
          </span>
          <span
            className={cx('font-bold text-lg', {
              'text-success': pool?.change24 >= 0,
              'text-error': pool?.change24 < 0
            })}
          >
            24hr Reward APY :{pool?.change24.toFixed(4)}%
          </span>
        </div>
        <div className='flex px-2 flex-col justify-center'>
          <a
            href='https://live.sovryn.app/yield-farm'
            className='btn btn-sm btn-square'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-6 h-6 stroke-current'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              ></path>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </Card>
  )
}
