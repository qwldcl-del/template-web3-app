import { createPoolParameters } from './types'

export async function createPool(params: createPoolParameters) {
  const response = await fetch('/api/superfluid/create-pool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create pool')
  }

  return response.json()
}
