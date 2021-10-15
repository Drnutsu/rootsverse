import { useContext, useMemo, useCallback } from 'react'

import { StepComponentProps } from '@components/base/steps'
import Button from '@components/base/button'
import warehouseLv1 from '@assets/map/warehouseLv1.png'
import { TokenBalance } from '@hooks/provider/hooks/types'
import { normalizeNumber } from '@helpers/math'
import { StageContext } from '@hooks/provider/stageProvider'

import { CreateModalInfoType } from './types'

export function Summary({
  prevStep,
  nextStep,
  info
}: StepComponentProps<CreateModalInfoType>) {
  const { isSandbox } = useContext(StageContext)
  const handleComplete = useCallback(() => {
    nextStep()
  }, [])
  const asset = useMemo<TokenBalance>(() => {
    if (!info || !info?.asset) return null
    try {
      return JSON.parse(info?.asset) as TokenBalance
    } catch {
      return null
    }
  }, [info])
  return (
    <div className='flex flex-col'>
      <div className='mb-4 text-center text-xl'>Construction Confirmation</div>
      <div className='my-4 flex justify-center w-full'>
        <img src={warehouseLv1} className='w-20 h-20' />
      </div>
      {info && asset && (
        <div className='flex flex-col w-3/4 self-center my-4 bg-base-200 shadow-lg p-4 rounded-lg'>
          <div className='flex w-full justify-between'>
            <span className='text-base-content'>BUILDING NAME</span>
            <span>{info.name}</span>
          </div>
          <div className='flex w-full justify-between'>
            <span className='text-base-content'>ASSET NAME</span>
            <span>{asset.contract_name}</span>
          </div>
          <div className='flex w-full justify-between'>
            <span className='text-base-content'>BALANCE</span>
            <span>
              {normalizeNumber(asset.balance, asset.contract_decimals)}
            </span>
          </div>
        </div>
      )}
      {isSandbox && (
        <div className='w-3/4 self-center text-xs pb-6'>
          building creation is on the sandbox mode now, so you can freely try to
          build and destroy the building without any fee & blockchain
          transaction right now.
        </div>
      )}
      <div className='flex justify-between w-full'>
        <Button onClick={prevStep}>BACK</Button>
        <Button className='btn btn-accent' onClick={handleComplete}>
          COMPLETE
        </Button>
      </div>
    </div>
  )
}
