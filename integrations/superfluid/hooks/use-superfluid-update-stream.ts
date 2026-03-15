import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { CFAv1ForwarderABI } from '../abis/cfa-v1-forwarder'
import { DEFAULT_CFA_FORWARDER } from '../utils/constants'
import type { UpdateStreamParams } from '../utils/types'

export function useSuperfluidUpdateStream() {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateStream = async (params: UpdateStreamParams) => {
    const { token, receiver, flowRate, userData } = params
    
    writeContract({
      address: DEFAULT_CFA_FORWARDER,
      abi: CFAv1ForwarderABI,
      functionName: 'updateFlow',
      args: [
        token,
        receiver,
        BigInt(flowRate),
        (userData || '0x') as `0x${string}`,
      ],
    })
  }

  return {
    updateStream,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  }
}
