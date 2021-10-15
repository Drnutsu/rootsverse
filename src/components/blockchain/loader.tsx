import { useContext } from 'react'
import ReactLoading from 'react-loading'

import { RequiredResourceProps } from '@hooks/provider/hooks/types'
import { BlockchainContext } from '@hooks/provider/blockchainProvider'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const StyledLoader = styled(ReactLoading)`
  ${tw`text-base-content fill-current`}
`

export function BalanceLoader({ children }) {
  const { isBalanceLoading }: RequiredResourceProps =
    useContext(BlockchainContext)
  return (
    <div>
      {isBalanceLoading ? (
        <div className='w-full flex justify-center'>
          {/* let's twin styling control the color instead of lib */}
          <StyledLoader color={null} type='cylon' />
        </div>
      ) : (
        children
      )}
    </div>
  )
}
