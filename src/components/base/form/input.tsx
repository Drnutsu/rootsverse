import {
  Input as AntdInput,
  Form as AntdForm,
  FormItemProps,
  InputProps
} from 'antd'
import tw from 'twin.macro'
import styled from '@emotion/styled'

const StyledFormItem = styled(AntdForm.Item)`
  .ant-form-item-label {
    ${tw`text-left`}
  }
`

/**
 * Freely customize input wrapper with style tuned.
 * @param param0
 * @returns
 */
Input.Item = ({ children, ...props }) => (
  <>
    <StyledFormItem
      {...props}
      className='form-control'
      label={
        <label className='label'>
          <span className='label-text'>{(props as FormItemProps).label}</span>
        </label>
      }
    >
      {children}
    </StyledFormItem>
  </>
)

export default function Input(props: FormItemProps | InputProps) {
  return (
    <StyledFormItem
      {...(props as FormItemProps)}
      className='form-control'
      label={
        <label className='label'>
          <span className='label-text'>{(props as FormItemProps).label}</span>
        </label>
      }
    >
      <AntdInput
        {...(props as InputProps)}
        className='input input-bordered text-base-content'
      />
    </StyledFormItem>
  )
}
