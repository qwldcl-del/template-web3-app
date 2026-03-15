'use client'

import { useSuperfluidBalance } from '../hooks/use-superfluid-balance'
import { useAccount } from 'wagmi'

interface SuperfluidBalanceProps {
  token: string
  tokenSymbol?: string
}

export function SuperfluidBalance({ token, tokenSymbol = 'TOKEN' }: SuperfluidBalanceProps) {
  const { isConnected } = useAccount()
  const { balance, flowRate, lastUpdated, error, isLoading, refetch } = useSuperfluidBalance(token)

  const formatFlowRate = (rate: string) => {
    // Assuming 18 decimals
    const tokensPerSecond = Number(rate) / 1e18
    if (tokensPerSecond === 0) return '0'
    if (tokensPerSecond < 0.001) return '< 0.001'
    return tokensPerSecond.toFixed(4)
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Connect wallet to view balance
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg">
        <p className="text-sm text-muted-foreground">Loading balance...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-destructive/10">
        <p className="text-sm text-destructive">Error loading balance</p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Superfluid Balance</h3>
        <button
          onClick={() => refetch()}
          className="p-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Balance</span>
          <span className="text-sm font-medium">
            {balance?.availableBalance || '0'} {tokenSymbol}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Net Flow Rate</span>
          <span className={`text-sm font-medium ${Number(flowRate) > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>
            {Number(flowRate) > 0 ? '+' : ''}{formatFlowRate(flowRate)} {tokenSymbol}/sec
          </span>
        </div>

        {lastUpdated > 0 && (
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Last Updated</span>
            <span className="text-sm text-muted-foreground">
              {new Date(lastUpdated * 1000).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
