import { distributeParameters } from './types'

export async function distribute(params: distributeParameters) {
  const response = await fetch('/api/superfluid/distribute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to distribute')
  }

  return response.json()
}
