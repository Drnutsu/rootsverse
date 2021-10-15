import { useCallback, useState } from 'react'
import { Steps } from 'antd'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { i } from 'mathjs'
import { SelectAssetInfoType } from '@components/game/modal/step/select-asset'
import { CreateModalInfoType } from '@components/game/modal/step/types'

const { Step } = Steps

export interface StepComponentProps<T = void> {
  nextStep: <T>(i?: { [key: string]: string | number | T }) => void
  prevStep: () => void
  info: T
}

const StyledStep = styled(Step)`
  &.ant-steps-item-process,
  &.ant-steps-item-wait,
  &.ant-steps-item-finish {
    &
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title {
      ${tw`text-base-content`}
    }
  }
`

export interface StepConfig<T> {
  title: string
  component: React.FC<StepComponentProps<T>>
}

const stepsDefaultConfig = [
  {
    title: 'First',
    component: ({ nextStep, prevStep }: StepComponentProps) => <div></div>
  },
  {
    title: 'Second',
    component: ({ nextStep, prevStep }: StepComponentProps) => <div></div>
  },
  {
    title: 'Last',
    component: ({ nextStep, prevStep }: StepComponentProps) => <div></div>
  }
]

export const defaultStoredInfo = {
  asset: '',
  name: ''
}

export function Stepper({
  stepsConfig = stepsDefaultConfig,
  onFinalized
}: {
  stepsConfig: StepConfig<void | SelectAssetInfoType>[]
  onFinalized: (a: CreateModalInfoType) => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [storedInfo, setStoredInfo] = useState(defaultStoredInfo)
  const handleNextStep = useCallback(
    <T extends {}>(info?: string | number | T) => {
      if (currentStep < stepsDefaultConfig.length - 1) {
        if (info)
          setStoredInfo((i) => ({
            ...i,
            ...(typeof info === 'object' ? info : {})
          }))
        setCurrentStep((currentStep) => currentStep + 1)
      } else {
        // when user already reached the last step.
        onFinalized(storedInfo)
      }
    },
    [currentStep, storedInfo]
  )
  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((currentStep) => currentStep - 1)
    }
  }, [currentStep])
  const CurrentStepContent = useCallback(
    () =>
      stepsConfig?.[currentStep]?.component({
        nextStep: handleNextStep,
        prevStep: handlePrevStep,
        info: storedInfo
      }),
    [currentStep, storedInfo, JSON.stringify(stepsConfig)]
  )
  return (
    <>
      <Steps className='mb-4' current={currentStep}>
        {stepsConfig.map((item) => (
          <StyledStep key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content'>
        <CurrentStepContent />
      </div>
    </>
  )
}
