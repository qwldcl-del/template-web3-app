import { createStreamParameters } from './types'

export async function createStream(params: createStreamParameters) {
  const response = await fetch('/api/superfluid/create-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create stream')
  }

  return response.json()
}
