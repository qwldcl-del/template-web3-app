import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'
import { CFAv1ForwarderABI } from '@/integrations/superfluid/abis/cfa-v1-forwarder'
import { DEFAULT_CFA_FORWARDER } from '@/integrations/superfluid/utils/constants'
import { createPublicClient, http, parseEther } from 'viem'
import { mainnet } from 'viem/chains'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    
    if (!session?.address) {
      return NextResponse.json(
        { message: 'Unauthorized - Please connect your wallet' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { token, receiver, flowRate, userData } = body

    if (!token || !receiver || !flowRate) {
      return NextResponse.json(
        { message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Convert flow rate if it's in token units
    let flowRateInWei = flowRate
    if (!flowRate.includes('0x')) {
      flowRateInWei = parseEther(flowRate as `${number}`).toString()
    }

    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    })

    // Simulate the transaction to check for errors
    try {
      const { request: simulatedRequest } = await publicClient.simulateContract({
        address: DEFAULT_CFA_FORWARDER,
        abi: CFAv1ForwarderABI,
        functionName: 'createFlow',
        args: [
          token,
          session.address as `0x${string}`,
          receiver as `0x${string}`,
          BigInt(flowRateInWei),
          (userData || '0x') as `0x${string}`,
        ],
        account: session.address as `0x${string}`,
      })

      return NextResponse.json({
        success: true,
        message: 'Stream simulation successful',
        data: {
          token,
          receiver,
          flowRate: flowRateInWei,
        },
      })
    } catch (simError: any) {
      return NextResponse.json(
        { message: 'Simulation failed', error: simError.message },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Create stream error:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}
