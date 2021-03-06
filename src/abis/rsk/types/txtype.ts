export enum TxType {
  STAKING_STAKE = 'staking-stake',
  STAKING_WITHDRAW = 'staking-withdraw',
  STAKING_EXTEND = 'staking-extend',
  STAKING_DELEGATE = 'staking-delegate',
  VESTING_DELEGATE = 'vesting-delegate',
  NONE = 'none',
  APPROVE = 'approve',
  LEND = 'lend',
  UNLEND = 'unlend',
  TRADE = 'trade',
  CLOSE_WITH_DEPOSIT = 'close_with_deposit',
  CLOSE_WITH_SWAP = 'close_with_swap',
  BORROW = 'borrow',
  ADD_LIQUIDITY = 'add_liquidity',
  REMOVE_LIQUIDITY = 'remove_liquidity',
  DEPOSIT_COLLATERAL = 'deposit_collateral',
  CONVERT_BY_PATH = 'convert_by_path', // swap
  SWAP_EXTERNAL = 'swap_external',
  OTHER = 'other',
  SALE_BUY_SOV = 'sale_buy_sov',
  SOV_REIMBURSE = 'sov_reimburse',
  SOV_CONVERT = 'sov_convert',
  SOV_ORIGIN_CLAIM = 'sov_origin_claim',
  SOV_WITHDRAW_VESTING = 'sov_withdraw_vesting',
  ESCROW_SOV_DEPOSIT = 'escrow_sov_deposit',
  LM_DEPOSIT = 'lm_deposit',
  LOCKED_SOV_CLAIM = 'locked_sov_claim',
  STAKING_REWARDS_CLAIM = 'staking_rewards_claim',
  ORIGINS_SALE_BUY = 'origins_sale_buy',
  CONVERT_RUSDT_TO_XUSD = 'convert_rusdt_to_xusd',
  LOCKED_FUND_WAITED_CLAIM = 'locked_fund_waited_claim',
  LOCKED_FUND_CREATE_STAKE = 'locked_fund_create_stake',
  CROSS_CHAIN_DEPOSIT = 'cross_chain_deposit',
  CROSS_CHAIN_WITHDRAW = 'cross_chain_withdraw',
  UNWRAP_WRBTC = 'unwrap_wrbtc'
}
