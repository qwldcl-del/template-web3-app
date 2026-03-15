export interface createStreamParameters {
  token: string
  receiver: string
  flowRate: string
  userData?: string
}

export interface updateStreamParameters {
  token: string
  receiver: string
  flowRate: string
  userData?: string
}

export interface deleteStreamParameters {
  token: string
  receiver: string
  userData?: string
}

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
