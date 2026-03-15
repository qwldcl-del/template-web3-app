export interface createPoolParameters {
  token: string
  admin: string
  transferabilityForUnitsOwner?: boolean
  distributionFromAnyAddress?: boolean
}

export interface distributeParameters {
  poolAddress: string
  token: string
  amount: string
  flowRate?: string
}
