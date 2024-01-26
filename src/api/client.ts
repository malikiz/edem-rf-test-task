const API_ORIGIN = 'http://localhost:3002'

/* TODO: Добавить обработку ошибок из API */
export const client = {
  get: async <T> (method: string, params?: Record<string, string>): Promise<T> => {
    const searchParams = new URLSearchParams(params)
    const urlToFetch = `${API_ORIGIN}/api/${method}?${searchParams}`

    const response = await fetch(urlToFetch)

    if (!response.ok) {
      throw new Error(`Incorrect request to ${urlToFetch}\nStatus code: ${response.status}\nStatus text: ${response.statusText}`)
    }

    const result = await response.json()

    return result.data as T
  }
}
