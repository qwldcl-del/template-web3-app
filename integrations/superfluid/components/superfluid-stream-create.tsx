'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useSuperfluidCreateStream } from '../hooks/use-superfluid-create-stream'
import { Address, parseEther } from 'viem'

interface SuperfluidStreamCreateProps {
  defaultToken?: string
  defaultReceiver?: string
}

export function SuperfluidStreamCreate({
  defaultToken = '',
  defaultReceiver = '',
}: SuperfluidStreamCreateProps) {
  const { isConnected } = useAccount()
  const { createStream, isPending, isConfirming, isSuccess, hash, error } =
    useSuperfluidCreateStream()

  const [token, setToken] = useState(defaultToken)
  const [receiver, setReceiver] = useState(defaultReceiver)
  const [flowRate, setFlowRate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !receiver || !flowRate) return

    // Convert flow rate from tokens/second to wei/second
    // For example, 0.001 ETH per second = 1000000000000000 wei
    const flowRateInWei = parseEther(flowRate as `${number}`).toString()

    createStream({
      token: token as Address,
      receiver: receiver as Address,
      flowRate: flowRateInWei,
    })
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Please connect your wallet to create a stream
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Create Money Stream</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Super Token Address
          </label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Receiver Address
          </label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Flow Rate (tokens per second)
          </label>
          <input
            type="number"
            step="0.0001"
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            placeholder="0.001"
            className="w-full p-2 border rounded-md"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Example: 0.001 = 0.001 tokens/second
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming || !token || !receiver || !flowRate}
          className="w-full p-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          {isPending
            ? 'Confirm in wallet...'
            : isConfirming
            ? 'Creating stream...'
            : 'Create Stream'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md">
          <p className="text-sm">Error: {(error as Error).message}</p>
        </div>
      )}

      {isSuccess && (
        <div className="p-3 bg-green-500/10 text-green-600 rounded-md">
          <p className="text-sm">Stream created successfully!</p>
          {hash && (
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline"
            >
              View Transaction
            </a>
          )}
        </div>
      )}
    </div>
  )
}
