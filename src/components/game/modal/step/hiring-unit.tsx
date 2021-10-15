import { useCallback } from 'react'
import { StepComponentProps } from '@components/base/steps'
import Button from '@components/base/button'

export function HiringUnit({ nextStep, prevStep }: StepComponentProps) {
  const handleNextStep = useCallback(() => {
    nextStep()
  }, [])
  return (
    <div className='flex flex-col'>
      <div className='mb-4'>
        Unit is the entity that empower and protect your building during The
        wars. To getting Unit please check our activity closely, you will got
        their some when completed the mission or growing them by yourself,
        anyway you need to have at least one unit to grow the others.
      </div>
      <div className='text-6xl text-center'>⚔️</div>
      <div className='py-6 card bg-base-content-100 text-center'>
        You don't have any unit! please continue to the next step
      </div>
      <div className='flex justify-between w-full'>
        <Button onClick={prevStep}>BACK</Button>
        <Button onClick={handleNextStep}>NEXT</Button>
      </div>
    </div>
  )
}
