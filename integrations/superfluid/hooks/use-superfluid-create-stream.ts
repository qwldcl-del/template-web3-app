import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { CFAv1ForwarderABI } from '../abis/cfa-v1-forwarder'
import { DEFAULT_CFA_FORWARDER } from '../utils/constants'
import type { CreateStreamParams } from '../utils/types'

export function useSuperfluidCreateStream() {
  const { chainId } = useAccount()
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createStream = async (params: CreateStreamParams) => {
    const { token, receiver, flowRate, userData } = params
    
    writeContract({
      address: DEFAULT_CFA_FORWARDER,
      abi: CFAv1ForwarderABI,
      functionName: 'createFlow',
      args: [
        token,
        // @ts-expect-error - sender will be filled by the contract
        '0x0000000000000000000000000000000000000000', // sender = caller
        receiver,
        BigInt(flowRate),
        (userData || '0x') as `0x${string}`,
      ],
    })
  }

  return {
    createStream,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  }
}
