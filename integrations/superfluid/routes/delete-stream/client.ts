import { deleteStreamParameters } from './types'

export async function deleteStream(params: deleteStreamParameters) {
  const response = await fetch('/api/superfluid/delete-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete stream')
  }

  return response.json()
}
