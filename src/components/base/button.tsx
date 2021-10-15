import { Button as AntdButton, ButtonProps } from 'antd'
import cx from 'classnames'

export default function Button(props: ButtonProps) {
  return (
    <AntdButton className={cx('btn', props?.className)} {...props}>
      {props.children}
    </AntdButton>
  )
}
