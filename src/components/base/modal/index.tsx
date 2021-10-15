import { Modal as AntdModal } from 'antd'
import tw from 'twin.macro'
import styled from '@emotion/styled'

const StyledModal = styled(AntdModal)`
  .ant-modal-content {
    ${tw`bg-base-100 shadow-none text-base-content`}
  }

  .ant-modal-close-x {
    ${tw`text-base-content`}
  }

  .ant-modal-body {
    ${tw`bg-transparent`}
  }
`

export default function Modal({ children, ...props }) {
  return (
    <StyledModal className='modal-box' footer={null} {...props}>
      {children}
    </StyledModal>
  )
}
