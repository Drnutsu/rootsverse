import cx from 'classnames'
import { ReactElement } from 'react'

export interface CardProps {
  children: ReactElement | ReactElement[]
  className?: string
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        'card bg-base-100 shadow-lg p-4 my-2 text-base-content',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
