import Avatar from 'react-avatar'

import { normalizeNumber } from '@helpers/math'
import { TokenBalance } from '@hooks/provider/hooks/types'
import Button from '@components/base/button'

export interface ManageBuildingContentProps {
  asset: TokenBalance
  onHide: () => void
}

export function ManageBuildingContent({
  asset,
  onHide
}: ManageBuildingContentProps) {
  return (
    <div className='stats'>
      <div className='stat'>
        <div className='stat-title'>TotalAsset Balance</div>
        <div className='stat-value'>
          <Avatar size='25' round={true} src={asset.logo_url} />{' '}
          {normalizeNumber(asset?.balance, asset?.contract_decimals)}{' '}
          {asset?.contract_ticker_symbol}
        </div>
        <div className='text-xs'></div>
        <div className='stat-actions flex'>
          {/* REMOVEME: [UNIT] remove this when unit feature is launch  */}
          <button disabled className='btn btn-sm btn-primary'>
            Manage Unit
          </button>
          <button className='btn btn-sm btn-error ml-4'>Remove Building</button>
        </div>
        {/* REMOVEME: remove me when completed the unit feature */}
        <span className='stat-actions stat-title text-xs'>
          you don't have any unit.
        </span>
      </div>
      <Button className='btn-circle btn-sm' ghost onClick={onHide}>
        X
      </Button>
      {/* <div className='stat'>
        <div className='stat-title'>Current balance</div>
        <div className='stat-value'>$89,400</div>
        <div className='stat-actions'>
          <button className='btn btn-sm btn-primary'>Withdrawal</button>
          <button className='btn btn-sm btn-primary'>deposit</button>
        </div>
      </div> */}
    </div>
  )
}
