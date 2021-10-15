import { Radio as AntdRadio } from 'antd'
import tw from 'twin.macro'
import styled from '@emotion/styled'

const StyledRadioInput = styled(AntdRadio)`
  ${tw`flex shadow-md rounded-md items-center p-4 my-2 border-2 border-transparent`}
  &.ant-radio-wrapper-checked {
    ${tw`border-2 border-base-content border-opacity-30`}
  }
  & > span:not(.ant-radio) {
    ${tw`w-full`}
  }
`

export interface RadioSelectorConfig<T extends {}> {
  label: string | React.ReactElement
  value: string | T
}

const defaultRadioConfig: RadioSelectorConfig<{}>[] = [
  {
    label: <div>It's can use component</div>,
    value: 'info'
  },
  {
    label: 'its also can use string',
    value: {}
  }
]

export function RadioSelector({ radioConfig = defaultRadioConfig }) {
  return (
    <AntdRadio.Group className='w-full' size='large'>
      {radioConfig.map((c) => (
        <StyledRadioInput className='cursor-pointer label' value={c.value}>
          <span className='label-text w-full'>{c.label}</span>
        </StyledRadioInput>
      ))}
    </AntdRadio.Group>
  )
}
