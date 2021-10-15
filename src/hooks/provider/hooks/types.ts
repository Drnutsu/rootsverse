import { UseQueryResult } from 'react-query'

export interface TokenBalance {
  balance: string
  balance_24h: string
  contract_address: string
  contract_decimals: number
  contract_name: string
  contract_ticker_symbol: string
  last_transferred_at: string
  logo_url: string
  nft_data: unknown
  quote: number
  quote_24h: unknown
  quote_rate: unknown
  quote_rate_24h: unknown
  supports_erc: string[]
  type: string
}

export interface TokenPrice {
  contract_metadata: {
    contract_address: string
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    logo_url: string
  }
  supports_erc: string[]
  date: string
  price: number
}

export interface PriceResponse {
  contract_address: string
  contract_decimals: number
  contract_name: string
  contract_ticker_symbol: string
  logo_url: string
  prices: TokenPrice[]
  quote_currency: string
  supports_erc: string[]
  update_at: string
  balance: number
}

export interface BalanceResponse {
  address: string
  chain_id: number
  items: TokenBalance[]
  next_update_at: string
  pagination: number
  quote_number: string
  update_at: string
}

export interface RequiredResourceProps {
  chainId: number
  isReady: boolean
  coinBalanceInfo: BalanceResponse
  isBalanceLoading: boolean
  historyQueries: { [key: string]: UseQueryResult<PriceResponse, {}> }
}
