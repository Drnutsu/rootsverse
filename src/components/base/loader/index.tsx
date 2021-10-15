import ReactLoading from 'react-loading'

import styled from '@emotion/styled'
import tw from 'twin.macro'

const StyledLoader = styled(ReactLoading)`
  ${tw`text-base-content fill-current`}
`

export function LoaderWrapper({ children, isLoading }) {
  return (
    <div>
      {isLoading ? (
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
