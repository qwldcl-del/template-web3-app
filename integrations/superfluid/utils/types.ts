export interface Stream {
  id: string
  token: string
  sender: string
  receiver: string
  flowRate: string
  deposit: string
  startedAt: number
  updatedAtTimestamp: number
}

export interface Pool {
  id: string
  token: string
  admin: string
  poolAddress: string
  totalUnits: string
  members: PoolMember[]
}

export interface PoolMember {
  address: string
  units: string
  pendingDistribution: string
}

export interface CreateStreamParams {
  token: string
  receiver: string
  flowRate: string // in wei per second
  userData?: string
}

export interface UpdateStreamParams {
  token: string
  receiver: string
  flowRate: string
  userData?: string
}

export interface DeleteStreamParams {
  token: string
  receiver: string
  userData?: string
}

export interface CreatePoolParams {
  token: string
  admin: string
  transferabilityForUnitsOwner?: boolean
  distributionFromAnyAddress?: boolean
}

export interface DistributeParams {
  poolAddress: string
  token: string
  amount: string
}

export interface StreamFlow {
  flowRate: string
  timestamp: number
}

export interface SuperTokenBalance {
  balance: string
  availableBalance: string
  timestamp: number
}
