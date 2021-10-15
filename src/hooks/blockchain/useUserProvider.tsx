import { useMemo } from 'react'
import {
  Web3Provider,
  StaticJsonRpcProvider,
  ExternalProvider
} from '@ethersproject/providers'
import BurnerProvider from 'burner-provider'
import { INFURA_ID } from '@constants/blockchain'

export interface BurnerConfig {
  provider?: unknown
  privateKey?: string
  mnemonic?: string
  index?: number
  namespace?: string
  rpcUrl?: string
  getPrivateKey?: (addr: string, cb: () => void) => void
  getAccounts?: (cb: (a: boolean, addrs: string[]) => void) => void
}

const useUserProvider = (
  injectedProvider: Web3Provider,
  localProvider: StaticJsonRpcProvider
): Web3Provider =>
  useMemo<Web3Provider | undefined>(() => {
    if (injectedProvider) {
      console.log('🦊 Using injected provider')
      return injectedProvider
    }
    if (!localProvider) return undefined

    const burnerConfig: BurnerConfig = {}

    if (window.location.pathname) {
      if (window.location.pathname.indexOf('/pk') >= 0) {
        const incomingPK = window?.location?.hash?.replace('#', '') || ''
        let rawPK: string
        if (incomingPK.length === 64 || incomingPK.length === 66) {
          console.log('🔑 Incoming Private Key...')
          rawPK = incomingPK
          burnerConfig.privateKey = rawPK
          window.history.pushState({}, '', '/')
          const currentPrivateKey =
            window.localStorage.getItem('metaPrivateKey')
          if (currentPrivateKey && currentPrivateKey !== rawPK) {
            window.localStorage.setItem(
              'metaPrivateKey_backup' + Date.now().toString(),
              currentPrivateKey
            )
          }
          window.localStorage.setItem('metaPrivateKey', rawPK)
        }
      }
    }

    console.log('🔥 Using burner provider', burnerConfig)
    if (localProvider.connection && localProvider.connection.url) {
      burnerConfig.rpcUrl = localProvider?.connection?.url || ''
      const burnerProvider = new BurnerProvider(
        burnerConfig
      ) as ExternalProvider
      return new Web3Provider(burnerProvider)
    }
    // eslint-disable-next-line no-underscore-dangle
    const networkName = localProvider._network && localProvider._network.name
    burnerConfig.rpcUrl = `https://${
      networkName || 'mainnet'
    }.infura.io/v3/${INFURA_ID}`
    const burnerProvider = new BurnerProvider(burnerConfig) as ExternalProvider
    return new Web3Provider(burnerProvider)
  }, [injectedProvider, localProvider])

export default useUserProvider
