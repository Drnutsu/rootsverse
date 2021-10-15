import { Form as AntdForm, FormProps } from 'antd'

import Input from './input'

function Form(props: FormProps) {
  return (
    <AntdForm {...props}>
      <div className='grid gap-4'>{props.children}</div>
    </AntdForm>
  )
}

export { Form, Input }
