# Superfluid TurboETH Integration

Welcome to the Superfluid TurboETH Integration! This integration enables developers to quickly build Web3 applications with real-time money streaming capabilities using the Superfluid Protocol.

## What is Superfluid?

Superfluid is a revolutionary protocol that enables **real-time money streaming**. Instead of receiving salary or payments monthly, recipients can receive funds continuously in real-time - every second. This opens up new possibilities for:

- **Streaming Salaries**: Pay employees/contractors per second
- **Subscription Services**: Streaming payments for services
- **DeFi Yield Distribution**: Distribute yields to LP providers in real-time
- **Creator Economics**: Fans can stream payments to creators continuously
- **DeFi Collateral**: Use streaming income as collateral

## Features

- **Money Streaming**: Create, update, and delete payment streams
- **Distribution Pools**: Distribute tokens to multiple recipients automatically
- **Super Token Support**: Work with wrapped (xDAIx, etc.) or pure Super Tokens
- **Batch Operations**: Execute multiple operations in a single transaction

## Integration Overview

### Core Contracts

The integration uses two main forwarder contracts:

- **CFAv1Forwarder** (Constant Flow Agreement): For creating money streams
- **GDAv1Forwarder** (General Distribution Agreement): For distribution pools

### Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Base
- Avalanche
- And more...

## Getting Started

### Prerequisites

1. A wallet with some tokens on a Superfluid-supported network
2. Super Tokens (wrap your tokens at [app.superfluid.finance](https://app.superfluid.finance))

### Environment Variables

No API key required for basic Superfluid interactions. However, for production use, you may want to configure:

```env
# Optional: For enhanced analytics
NEXT_PUBLIC_SUPERFLUID_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1
```

## API

### Routes

- `create-stream`: Create a new money stream
- `update-stream`: Update an existing stream's flow rate
- `delete-stream`: Stop a money stream
- `get-stream`: Get details of an existing stream
- `create-pool`: Create a distribution pool
- `distribute`: Distribute tokens to pool members

## Components

- `SuperfluidStreamCreate`: Form to create a new stream
- `SuperfluidStreamManage`: View and manage active streams
- `SuperfluidPoolCreate`: Form to create a distribution pool
- `SuperfluidBalance`: Display Super Token balance and streaming status
- `SuperfluidStreamCard`: Card displaying stream details

## Hooks

- `useSuperfluidStreams`: Fetch streams for a given address
- `useSuperfluidCreateStream`: Hook for creating new streams
- `useSuperfluidUpdateStream`: Hook for updating stream flow rates
- `useSuperfluidDeleteStream`: Hook for deleting streams
- `useSuperfluidBalance`: Fetch Super Token balance and flow rates

## Example Usage

### Creating a Stream

```typescript
import { useSuperfluidCreateStream } from '@/integrations/superfluid/hooks/use-superfluid-create-stream'

function CreateStream() {
  const { createStream, isLoading } = useSuperfluidCreateStream()
  
  const handleCreateStream = async () => {
    await createStream({
      token: '0x...', // Super Token address
      receiver: '0x...', // Recipient address
      flowRate: '1000000000000000000' // 1 token per second
    })
  }
  
  return <button onClick={handleCreateStream}>Start Streaming</button>
}
```

## File Structure

```
integrations/superfluid
├── abis/
│   ├── cfa-v1-forwarder.ts      # ABI for Constant Flow Agreement
│   └── gda-v1-forwarder.ts      # ABI for General Distribution
├── components/
│   ├── superfluid-stream-create.tsx
│   ├── superfluid-stream-manage.tsx
│   ├── superfluid-pool-create.tsx
│   ├── superfluid-balance.tsx
│   └── superfluid-stream-card.tsx
├── hooks/
│   ├── use-superfluid-streams.ts
│   ├── use-superfluid-create-stream.ts
│   ├── use-superfluid-update-stream.ts
│   ├── use-superfluid-delete-stream.ts
│   └── use-superfluid-balance.ts
├── routes/
│   ├── create-stream/
│   ├── update-stream/
│   ├── delete-stream/
│   ├── get-stream/
│   ├── create-pool/
│   └── distribute/
├── utils/
│   ├── types.ts
│   └── constants.ts
├── assets/
├── wagmi.config.ts
└── README.md
```

## Resources

- [Superfluid Documentation](https://docs.superfluid.finance)
- [Superfluid GitHub](https://github.com/superfluid-finance)
- [Superfluid Dashboard](https://app.superfluid.finance)
- [Superfluid Blog](https://medium.com/superfluid-blog)

## License

MIT
