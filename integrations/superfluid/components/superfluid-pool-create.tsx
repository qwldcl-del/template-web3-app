'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { GDAv1ForwarderABI } from '../abis/gda-v1-forwarder'
import { DEFAULT_GDA_FORWARDER } from '../utils/constants'
import { Address } from 'viem'

interface SuperfluidPoolCreateProps {
  defaultToken?: string
}

export function SuperfluidPoolCreate({ defaultToken = '' }: SuperfluidPoolCreateProps) {
  const { isConnected } = useAccount()
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const [token, setToken] = useState(defaultToken)
  const [admin, setAdmin] = useState('')
  const [transferability, setTransferability] = useState(false)
  const [distributionFromAny, setDistributionFromAny] = useState(false)
  const [poolAddress, setPoolAddress] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !admin) return

    writeContract({
      address: DEFAULT_GDA_FORWARDER,
      abi: GDAv1ForwarderABI,
      functionName: 'createPool',
      args: [
        token as Address,
        admin as Address,
        {
          transferabilityForUnitsOwner: transferability,
          distributionFromAnyAddress: distributionFromAny,
        },
      ],
    })
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Connect your wallet to create a pool
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Create Distribution Pool</h3>
      <p className="text-sm text-muted-foreground">
        Create a pool to distribute tokens to multiple recipients automatically.
      </p>

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
            Admin Address
          </label>
          <input
            type="text"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={transferability}
              onChange={(e) => setTransferability(e.target.checked)}
              className="rounded"
            />
            Allow transferability for units owner
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={distributionFromAny}
              onChange={(e) => setDistributionFromAny(e.target.checked)}
              className="rounded"
            />
            Allow distribution from any address
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming || !token || !admin}
          className="w-full p-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          {isPending
            ? 'Confirm in wallet...'
            : isConfirming
            ? 'Creating pool...'
            : 'Create Pool'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md">
          <p className="text-sm">Error: {(error as Error).message}</p>
        </div>
      )}

      {isSuccess && hash && (
        <div className="p-3 bg-green-500/10 text-green-600 rounded-md">
          <p className="text-sm">Pool created successfully!</p>
          <a
            href={`https://etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline"
          >
            View Transaction
          </a>
        </div>
      )}
    </div>
  )
}
