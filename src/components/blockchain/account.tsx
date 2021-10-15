/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires*/
import { useContext } from 'react'

// import Address from './Address'
// import Balance from './Balance'
// import Wallet from './Wallet'
import Button from '@components/base/button'
import { BlockchainContext } from '@hooks/provider/blockchainProvider'

export default function Account() {
  const {
    address,
    web3Modal,
    // injectedProvider,
    // setInjectedProvider,
    loadWeb3Modal,
    logoutOfWeb3Modal
  } = useContext(BlockchainContext)
  const isConnectedWallet = web3Modal.cachedProvider

  return (
    <div>
      <Button
        className='btn btn-accent'
        key={isConnectedWallet ? 'logoutbutton' : 'loginbutton'}
        onClick={isConnectedWallet ? logoutOfWeb3Modal : loadWeb3Modal}
      >
        {address ? (
          <div className='flex'>
            <div className='w-32'>
              {web3Modal.cachedProvider
                ? `${address.slice(0, 6)}***${address.slice(-4)}`
                : 'not connected'}
            </div>
            <div className='badge ml-2 badge-outline self-center'>
              {web3Modal.cachedProvider ? 'logout' : 'connect wallet'}
            </div>
          </div>
        ) : (
          'Connecting ...'
        )}
      </Button>
    </div>
  )
}
