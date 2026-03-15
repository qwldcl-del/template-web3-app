import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/next'
import { GDAv1ForwarderABI } from '@/integrations/superfluid/abis/gda-v1-forwarder'
import { DEFAULT_GDA_FORWARDER } from '@/integrations/superfluid/utils/constants'
import { createPublicClient, http, parseEther } from 'viem'
import { mainnet } from 'viem/chains'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    
    if (!session?.address) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { poolAddress, token, amount, flowRate } = body

    if (!poolAddress || !token || (!amount && !flowRate)) {
      return NextResponse.json(
        { message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    })

    const amountInWei = amount ? parseEther(amount as `${number}`).toString() : '0'
    const flowRateInWei = flowRate ? parseEther(flowRate as `${number}`).toString() : '0'

    try {
      const { request: simulatedRequest } = await publicClient.simulateContract({
        address: DEFAULT_GDA_FORWARDER,
        abi: GDAv1ForwarderABI,
        functionName: 'distribute',
        args: [
          poolAddress as `0x${string}`,
          token as `0x${string}`,
          BigInt(amountInWei),
          BigInt(flowRateInWei),
        ],
        account: session.address as `0x${string}`,
      })

      return NextResponse.json({
        success: true,
        message: 'Distribute simulation successful',
        data: { poolAddress, token, amount: amountInWei, flowRate: flowRateInWei },
      })
    } catch (simError: any) {
      return NextResponse.json(
        { message: 'Simulation failed', error: simError.message },
        { status: 400 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}
