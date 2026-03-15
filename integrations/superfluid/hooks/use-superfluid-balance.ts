import { useReadContract } from 'wagmi'
import { CFAv1ForwarderABI } from '../abis/cfa-v1-forwarder'
import { DEFAULT_CFA_FORWARDER } from '../utils/constants'
import type { SuperTokenBalance } from '../utils/types'
import { useAccount } from 'wagmi'

export function useSuperfluidBalance(token: string) {
  const { address } = useAccount()

  const { data, error, isLoading, refetch } = useReadContract({
    address: DEFAULT_CFA_FORWARDER,
    abi: CFAv1ForwarderABI,
    functionName: 'getAccountFlowInfo',
    args: [token, address || '0x0000000000000000000000000000000000000000'],
    query: {
      enabled: !!address && !!token,
    },
  })

  const formatBalance = (balance: bigint) => {
    // Assuming 18 decimals
    return (Number(balance) / 1e18).toFixed(4)
  }

  const balance: SuperTokenBalance | null = data
    ? {
        balance: data[2].toString(),
        availableBalance: formatBalance(data[2]),
        timestamp: Number(data[0]),
      }
    : null

  return {
    balance,
    flowRate: data ? data[1].toString() : '0',
    lastUpdated: data ? Number(data[0]) : 0,
    error,
    isLoading,
    refetch,
  }
}
