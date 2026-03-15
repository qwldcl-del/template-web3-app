import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CFAv1ForwarderABI } from '../abis/cfa-v1-forwarder'
import { DEFAULT_CFA_FORWARDER } from '../utils/constants'
import type { DeleteStreamParams } from '../utils/types'

export function useSuperfluidDeleteStream() {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const deleteStream = async (params: DeleteStreamParams) => {
    const { token, receiver, userData } = params
    
    writeContract({
      address: DEFAULT_CFA_FORWARDER,
      abi: CFAv1ForwarderABI,
      functionName: 'deleteFlow',
      args: [
        token,
        // @ts-expect-error - sender will be filled by the contract
        '0x0000000000000000000000000000000000000000', // sender = caller
        receiver,
        (userData || '0x') as `0x${string}`,
      ],
    })
  }

  return {
    deleteStream,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  }
}
