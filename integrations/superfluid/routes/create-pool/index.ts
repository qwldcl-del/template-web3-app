import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/next'
import { GDAv1ForwarderABI } from '@/integrations/superfluid/abis/gda-v1-forwarder'
import { DEFAULT_GDA_FORWARDER } from '@/integrations/superfluid/utils/constants'
import { createPublicClient, http } from 'viem'
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
    const { token, admin, transferabilityForUnitsOwner, distributionFromAnyAddress } = body

    if (!token || !admin) {
      return NextResponse.json(
        { message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    })

    try {
      const { request: simulatedRequest } = await publicClient.simulateContract({
        address: DEFAULT_GDA_FORWARDER,
        abi: GDAv1ForwarderABI,
        functionName: 'createPool',
        args: [
          token as `0x${string}`,
          admin as `0x${string}`,
          {
            transferabilityForUnitsOwner: transferabilityForUnitsOwner ?? false,
            distributionFromAnyAddress: distributionFromAnyAddress ?? false,
          },
        ],
        account: session.address as `0x${string}`,
      })

      return NextResponse.json({
        success: true,
        message: 'Pool creation simulation successful',
        data: { token, admin },
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
