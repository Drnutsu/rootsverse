import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { LiquidityPoolDictionary } from '@abis/rsk/liquidity-pool-dictionary'
import { getSovrynPoolData, PoolDataResponse } from '@apis/rsk/sovryn'
import { getPercentDiff } from '@helpers/math'
import { LiquidityPool } from 'src/abis/rsk/liquidity-pool'
import { LoaderWrapper } from '@components/base/loader'
import { PoolInfoCard } from '@components/base/card/yield-farming-card'

export type PoolDataType = LiquidityPool & {
  change24: number
} & PoolDataResponse[string]

const dataEnv = 'mainnet'

export function FarmReport() {
  // TODO: I don't know why list static function didn't return the value type let's check it again later.
  /* tslint:disable-next-line */
  const poolsInfo: LiquidityPool[] = LiquidityPoolDictionary.list()
  const { data: APYData, isLoading: APYInfoLoading } =
    useQuery<PoolDataResponse>('sovryn-apy-all', () => getSovrynPoolData())
  const poolData = useMemo<PoolDataType[]>(() => {
    if (!poolsInfo) return []
    return poolsInfo
      .map((poolInfo) => {
        let poolAddr = poolInfo?.assetDetails?.ammContract?.address
        if (typeof poolAddr === 'string')
          poolAddr = poolAddr.toLocaleLowerCase()
        const firstAsset = poolInfo?.supplyAssets?.[0]
        const poolAddress = firstAsset?.poolTokens[dataEnv].toLowerCase()
        const historyInfoList = APYData?.[poolAddr]?.data?.[poolAddress]
        const change24 = historyInfoList
          ? getPercentDiff(
              historyInfoList[historyInfoList.length - 2]?.APY_rewards_pc,
              historyInfoList[historyInfoList.length - 1]?.APY_rewards_pc
            )
          : 0
        return {
          ...poolInfo,
          ...(APYData?.[poolAddr] ? APYData?.[poolAddr] : {}),
          change24
        }
      })
      .sort(
        (a, b) => Math.abs(b?.change24) - Math.abs(a?.change24)
      ) as PoolDataType[]
    // .slice(0, 2) as PoolDataType[]
  }, [poolsInfo, APYData])
  // console.log('#log -> poolData', poolData)
  return (
    <div className='flex-grow max-w-md py-4'>
      <div className='flex flex-col'>
        <span className='text-2xl text-base-content font-bold'>
          YIELD FARMING POOL
        </span>
        <span className='text-xs text-base-content text-opacity-50'>
          We're currently support only sovryn's pool, others defi will be
          supported very soon.{' '}
          <a
            className='underline text-primary'
            href='https://wiki.sovryn.app/en/getting-started/what-is-sovryn'
          >
            (what's sovryn)
          </a>
        </span>
        <LoaderWrapper isLoading={APYInfoLoading || !poolsInfo}>
          {poolData.map((pool) => (
            <PoolInfoCard pool={pool} />
          ))}
        </LoaderWrapper>
      </div>
    </div>
  )
}
