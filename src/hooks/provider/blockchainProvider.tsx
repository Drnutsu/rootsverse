/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires*/
import {
  useCallback,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo
} from 'react'
import Web3Modal from 'web3modal'
import { useUserAddress } from 'eth-hooks'
import WalletConnectProvider from '@walletconnect/web3-provider'
import {
  ExternalProvider,
  StaticJsonRpcProvider,
  Web3Provider
} from '@ethersproject/providers'

import useUserProvider from '../blockchain/useUserProvider'
// import useExchangePrice from '../blockchain/useExchangePrice'
import { INFURA_ID, NETWORKS } from '@constants/blockchain'
import useSetupAllRequireResource, {
  defaultRequiredResource
} from './hooks/useSetupAllRequireResource'
import { RequiredResourceProps } from './hooks/types'

// 😬 Sorry for all the console logging
const DEBUG = true

// const scaffoldEthProvider = new StaticJsonRpcProvider(
//   'https://rpc.scaffoldeth.io:48544'
// )
// const mainnetInfura = new StaticJsonRpcProvider(
//   'https://mainnet.infura.io/v3/' + INFURA_ID
// )

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.bsc // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl

export interface BlockchainContextProps {
  address?: string
  ethPrice?: number
  injectedProvider?: Web3Provider
  setInjectedProvider?: (w: Web3Provider) => void
  web3Modal?: Web3Modal
  loadWeb3Modal?: () => void
  logoutOfWeb3Modal?: () => void
  localProvider?: StaticJsonRpcProvider
  userProvider?: StaticJsonRpcProvider
}

const defaultBlockchainContext = {
  address: null,
  ethPrice: 0,
  injectedProvider: null,
  setInjectedProvider: () => null,
  web3Modal: null,
  loadWeb3Modal: () => null,
  logoutOfWeb3Modal: () => null,
  localProvider: null,
  userProvider: null
}

export type BlockChainContextType = BlockchainContextProps &
  RequiredResourceProps

export const BlockchainContext = createContext<BlockChainContextType>({
  ...defaultBlockchainContext,
  ...defaultRequiredResource
})

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID
      }
    }
  }
})

const useSetupWalletConnection = () => {
  // const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura
  // const mainnetProvider = mainnetInfura
  const [injectedProvider, setInjectedProvider] = useState<
    Web3Provider | undefined
  >(null)

  if (DEBUG) console.log('🏠 Connecting to provider:', localProviderUrlFromEnv)

  const localProvider = useMemo(
    () => new StaticJsonRpcProvider(localProviderUrlFromEnv),
    [localProviderUrlFromEnv]
  )

  const userProvider = useUserProvider(injectedProvider, localProvider)
  const address = useUserAddress(userProvider)

  // TODO: this hooks is highly perform
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  // const ethPrice = useExchangePrice(targetNetwork, mainnetProvider, 9777)
  // console.log('#log -> ethPrice', ethPrice)

  const loadWeb3Modal = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const provider = await web3Modal.connect()
    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts: string[]) => {
      // reset the provider when account change the address
      setInjectedProvider(new Web3Provider(provider as ExternalProvider))
    })

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId: number) => {
      // reset the provider when account change network
      setInjectedProvider(new Web3Provider(provider as ExternalProvider))
    })
    setInjectedProvider(new Web3Provider(provider as ExternalProvider))
  }, [setInjectedProvider])

  const logoutOfWeb3Modal = async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await web3Modal.clearCachedProvider()
    console.log(' already clear the cache ')
    setTimeout(() => {
      window.location.reload()
    }, 1)
  }

  // initialize if web# is already connect.
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal()
    }
  }, [loadWeb3Modal])

  return {
    address,
    // ethPrice,
    injectedProvider,
    setInjectedProvider,
    web3Modal,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    localProvider,
    userProvider
  }
}

export default function BlockchainProvider({
  children
}: {
  children: ReactNode
}) {
  const {
    address,
    // ethPrice,
    injectedProvider,
    web3Modal,
    setInjectedProvider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    localProvider,
    userProvider
  } = useSetupWalletConnection()
  // setup all resource from api and rpc.
  const userSetupValue = useSetupAllRequireResource(address, userProvider)

  console.log(' #log Blockchain Provider is rerendered ')

  const context = {
    address,
    // price: ethPrice,
    web3Modal,
    injectedProvider,
    setInjectedProvider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    localProvider,
    userProvider,
    ...userSetupValue
  }
  return (
    <BlockchainContext.Provider value={context}>
      {children}
    </BlockchainContext.Provider>
  )
}
