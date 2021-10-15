/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return*/
export const sovrynBackendEndpoint = 'https://backend.sovryn.app'

export interface PoolTokenData {
  pool_token: string
  activity_date: string
  APY_fees_pc: number
  APY_rewards_pc: number
  APY_pc: number
}

export interface PoolBalanceHistory {
  activity_date: string
  balance_btc: number
  pool: string
}

export interface PoolDataResponse {
  [poolAddress: string]: {
    pool: string
    data: {
      [poolTokenAddress: string]: PoolTokenData[]
    }
    balanceHistory: PoolBalanceHistory[]
  }
}

export const getSovrynPoolData = async () => {
  const res = await fetch(`${sovrynBackendEndpoint}/amm/apy/all`)
  const json = await res.json()
  return json
}
