import { updateStreamParameters } from './types'

export async function updateStream(params: updateStreamParameters) {
  const response = await fetch('/api/superfluid/update-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update stream')
  }

  return response.json()
}
