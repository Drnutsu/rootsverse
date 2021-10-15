import { useCallback, useMemo, useContext } from 'react'
import { message } from 'antd'
import Avatar from 'react-avatar'

import { BlockchainContext } from '@hooks/provider/blockchainProvider'
import {
  RequiredResourceProps,
  TokenBalance
} from '@hooks/provider/hooks/types'
import Button from '@components/base/button'
import { RadioSelector, RadioSelectorConfig } from '@components/base/form/radio'
import { Form, Input } from '@components/base/form'
import { StepComponentProps } from '@components/base/steps'
import { normalizeNumber } from '@helpers/math'
import { BalanceLoader } from '@components/blockchain/loader'

const RadioSelectorItem = ({ coinInfo }: { coinInfo: TokenBalance }) => (
  <div className='flex justify-between'>
    <div>
      <Avatar size='25' round={true} src={coinInfo.logo_url} />{' '}
      {coinInfo?.contract_name}
    </div>
    <div>
      {normalizeNumber(coinInfo?.balance, coinInfo?.contract_decimals)}
      {coinInfo?.contract_ticker_symbol}
    </div>
  </div>
)

export interface SelectAssetInfoType {
  asset: string
  name: string
}

export function SelectAssetStep({ nextStep }: StepComponentProps) {
  const { chainId, isBalanceLoading, coinBalanceInfo }: RequiredResourceProps =
    useContext(BlockchainContext)
  const handleFinish = useCallback((values) => {
    nextStep<{ [k: string]: string }>(values)
  }, [])
  const handleFailed = useCallback(() => {
    message.error(" Please ensure that you're filled all the input")
  }, [])
  const radioSelectorConfig = useMemo(() => {
    // if balance is still loading
    if (isBalanceLoading || !coinBalanceInfo.items) return []
    return coinBalanceInfo.items.map((info) => ({
      label: <RadioSelectorItem coinInfo={info} />,
      value: JSON.stringify(info)
    }))
  }, [chainId, isBalanceLoading, coinBalanceInfo])
  return (
    <div className='flex flex-col'>
      <div className='mb-4'>
        All Building is representation of your assets, so to create the
        building, you have to fill all information required and Choose your
        assets from the list below first.
      </div>
      <Form
        layout='vertical'
        onFinish={handleFinish}
        onFinishFailed={handleFailed}
      >
        <Input
          label='your building name'
          name='name'
          autoComplete='off'
          rules={[
            {
              required: true,
              message: 'please fill building name'
            }
          ]}
          placeholder='My little ETH Farm'
        />

        <div className='w-full flex flex-col justify-center'>
          <ul className='menu items-stretch px-3 shadow-lg text-base-content bg-base-200 horizontal rounded-box'>
            <li className='bordered'>
              <span>Token</span>
            </li>
            <li className='cursor-not-allowed opacity-50'>
              <span>Farm</span>
            </li>
            <li className='cursor-not-allowed opacity-50'>
              <span>NFT</span>
            </li>
            <li className='cursor-not-allowed opacity-50'>
              <span>Contract</span>
            </li>
            <li className='cursor-not-allowed opacity-50'>
              <span>Combo</span>
            </li>
          </ul>
          <span className='text-xs text-base-content text-center mt-2'>
            we're supported only coin right now, others will be supported very
            soon
          </span>
        </div>
        <Input.Item
          label='select your assets'
          name='asset'
          rules={[
            {
              required: true,
              message: 'please select asset'
            }
          ]}
        >
          <div className='border-2 border-base-content border-opacity-10 px-4 rounded-md overflow-y-auto h-48'>
            <BalanceLoader>
              <RadioSelector radioConfig={radioSelectorConfig} />
            </BalanceLoader>
          </div>
        </Input.Item>

        <Input.Item noStyle>
          <Button htmlType='submit'>NEXT</Button>
        </Input.Item>
      </Form>
    </div>
  )
}
