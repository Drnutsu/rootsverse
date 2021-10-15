import { BigNumber } from 'bignumber.js'
import cx from 'classnames'

import { PriceResponse } from '@hooks/provider/hooks/types'
import { Card } from './'
import { normalizeNumber } from '@helpers/math'

export interface PriceInfoCardProps {
  info: PriceResponse & { diff_percent: number }
}

PriceInfoCard.defaultProps = {
  info: {
    // balance: 'N/A',
    // 	contract_ticker_symbol: 'N/A'
    balance: '5.704',
    contract_ticker_symbol: 'BNB',
    contract_name: 'BINANCE COIN'
  }
}

export function PriceInfoCard({ info }: PriceInfoCardProps) {
  //   const total = useMemo(() => info?.prices?.[0]?.price * )
  return (
    <Card className='compact my-3'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span className='text-opacity-50 text-base-content'>
            {info?.contract_name}
          </span>
          <span className='text-3xl font-bold text-primary'>
            {info?.balance
              ? normalizeNumber(info?.balance, info?.contract_decimals)
              : 'N/A'}
            {info?.contract_ticker_symbol}
          </span>
          <span
            className={cx('text-base-content', {
              'text-success': info.diff_percent >= 0,
              'text-error': info?.diff_percent < 0
            })}
          >
            ~{' '}
            {new BigNumber(info?.prices?.[0]?.price)
              .times(info?.balance)
              .shiftedBy(-info?.contract_decimals)
              .toFormat(4) || 'N/A'}
            {' $'}({info.diff_percent.toFixed(4)}%)
          </span>
        </div>
        <div className='flex px-2 flex-col justify-center'>
          <button className='btn btn-sm btn-square'>
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
          </button>
        </div>
      </div>
    </Card>
  )
}
