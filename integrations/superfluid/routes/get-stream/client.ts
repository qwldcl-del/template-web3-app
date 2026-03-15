export async function getStream(params: { token: string; sender: string; receiver: string }) {
  const response = await fetch('/api/superfluid/get-stream?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get stream')
  }

  return response.json()
}
