import { useCallback, useContext } from 'react'

import Modal from '@components/base/modal'
import { StageContext } from '@hooks/provider/stageProvider'
import { StepConfig, Stepper } from '@components/base/steps'

import { SelectAssetStep } from './step/select-asset'
import { HiringUnit } from './step/hiring-unit'
import { Summary } from './step/summary'
import { CreateModalInfoType } from './step/types'

const createBuildingStep: StepConfig<CreateModalInfoType>[] = [
  {
    title: 'Select Assets',
    component: SelectAssetStep
  },
  {
    title: 'Hiring Unit',
    component: HiringUnit
  },
  {
    title: 'Summary',
    component: Summary
  }
]

// TODO: build a stepper for create building here
export default function CreateBuildingModal(props) {
  const { submitCreateBuilding } = useContext(StageContext)
  const handleFinished = useCallback(
    (info: CreateModalInfoType) => {
      console.log(' FINISHED NOW !!! ')
      submitCreateBuilding(info)
    },
    [submitCreateBuilding]
  )
  return (
    <Modal destroyOnClose={true} {...props}>
      <div>
        <div className='mb-4'>
          <p className='text-xl text-bold'>CREATE YOUR BUILDING</p>
        </div>
        <Stepper
          stepsConfig={createBuildingStep}
          onFinalized={handleFinished}
        />
        {/* <div className='modal-action'>
          <Button onClick={submitCreateBuilding}>SUBMIT!!</Button>
        </div> */}
      </div>
    </Modal>
  )
}
