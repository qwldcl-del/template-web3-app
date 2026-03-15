'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useSuperfluidUpdateStream } from '../hooks/use-superfluid-update-stream'
import { useSuperfluidDeleteStream } from '../hooks/use-superfluid-delete-stream'
import { Address, parseEther } from 'viem'

interface SuperfluidStreamManageProps {
  token: string
  receiver: string
  currentFlowRate: string
}

export function SuperfluidStreamManage({
  token,
  receiver,
  currentFlowRate,
}: SuperfluidStreamManageProps) {
  const { isConnected } = useAccount()
  const { updateStream, isPending: isUpdatePending, isConfirming: isUpdateConfirming, isSuccess: isUpdateSuccess, error: updateError } = useSuperfluidDeleteStream()
  const { deleteStream, isPending: isDeletePending, isConfirming: isDeleteConfirming, isSuccess: isDeleteSuccess, error: deleteError } = useSuperfluidDeleteStream()

  const [newFlowRate, setNewFlowRate] = useState('')
  const [mode, setMode] = useState<'view' | 'update' | 'delete'>('view')

  const formatFlowRate = (rate: string) => {
    const tokensPerSecond = Number(rate) / 1e18
    return tokensPerSecond.toFixed(4)
  }

  const handleUpdate = async () => {
    if (!newFlowRate) return
    const flowRateInWei = parseEther(newFlowRate as `${number}`).toString()
    
    updateStream({
      token: token as Address,
      receiver: receiver as Address,
      flowRate: flowRateInWei,
    })
  }

  const handleDelete = async () => {
    deleteStream({
      token: token as Address,
      receiver: receiver as Address,
    })
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Connect wallet to manage streams
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Manage Stream</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Token</span>
          <span className="font-mono text-xs">{token.slice(0, 6)}...{token.slice(-4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Receiver</span>
          <span className="font-mono text-xs">{receiver.slice(0, 6)}...{receiver.slice(-4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current Flow Rate</span>
          <span className="font-medium">{formatFlowRate(currentFlowRate)} tokens/sec</span>
        </div>
      </div>

      {mode === 'view' && (
        <div className="flex gap-2">
          <button
            onClick={() => setMode('update')}
            className="flex-1 p-2 bg-primary text-primary-foreground rounded-md text-sm"
          >
            Update Flow Rate
          </button>
          <button
            onClick={() => setMode('delete')}
            className="flex-1 p-2 bg-destructive text-destructive-foreground rounded-md text-sm"
          >
            Delete Stream
          </button>
        </div>
      )}

      {mode === 'update' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              New Flow Rate (tokens per second)
            </label>
            <input
              type="number"
              step="0.0001"
              value={newFlowRate}
              onChange={(e) => setNewFlowRate(e.target.value)}
              placeholder="0.001"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={isUpdatePending || isUpdateConfirming || !newFlowRate}
              className="flex-1 p-2 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50"
            >
              {isUpdatePending || isUpdateConfirming ? 'Updating...' : 'Confirm Update'}
            </button>
            <button
              onClick={() => setMode('view')}
              className="flex-1 p-2 border rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
          {isUpdateSuccess && (
            <p className="text-sm text-green-600">Stream updated successfully!</p>
          )}
          {updateError && (
            <p className="text-sm text-destructive">Error: {(updateError as Error).message}</p>
          )}
        </div>
      )}

      {mode === 'delete' && (
        <div className="space-y-3">
          <p className="text-sm text-destructive">
            Are you sure you want to delete this stream? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeletePending || isDeleteConfirming}
              className="flex-1 p-2 bg-destructive text-destructive-foreground rounded-md text-sm disabled:opacity-50"
            >
              {isDeletePending || isDeleteConfirming ? 'Deleting...' : 'Confirm Delete'}
            </button>
            <button
              onClick={() => setMode('view')}
              className="flex-1 p-2 border rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
          {isDeleteSuccess && (
            <p className="text-sm text-green-600">Stream deleted successfully!</p>
          )}
          {deleteError && (
            <p className="text-sm text-destructive">Error: {(deleteError as Error).message}</p>
          )}
        </div>
      )}
    </div>
  )
}
