import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { CFAv1ForwarderABI } from '@/integrations/superfluid/abis/cfa-v1-forwarder'
import { DEFAULT_CFA_FORWARDER } from '@/integrations/superfluid/utils/constants'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const sender = searchParams.get('sender')
    const receiver = searchParams.get('receiver')

    if (!token || !sender || !receiver) {
      return NextResponse.json(
        { message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    })

    const [lastUpdated, flowRate, deposit] = await publicClient.readContract({
      address: DEFAULT_CFA_FORWARDER,
      abi: CFAv1ForwarderABI,
      functionName: 'getFlowInfo',
      args: [token as `0x${string}`, sender as `0x${string}`, receiver as `0x${string}`],
    })

    return NextResponse.json({
      success: true,
      data: {
        lastUpdated: lastUpdated.toString(),
        flowRate: flowRate.toString(),
        deposit: deposit.toString(),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error', error: error.message },
      { status: 500 }
    )
  }
}
