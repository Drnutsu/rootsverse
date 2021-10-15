import { RouteComponentProps } from '@reach/router'
import cx from 'classnames'
import Map from './map'
import { ThemeColor } from './types'
import UserInterface from './user-interface'

export interface GameProps {
  time: 'day' | 'night'
  themeColor?: ThemeColor
}

export default function Game({
  time,
  themeColor
}: GameProps & RouteComponentProps) {
  return (
    <div className={cx('app', time)}>
      <Map themeColor={themeColor} />
      <UserInterface />
    </div>
  )
}
