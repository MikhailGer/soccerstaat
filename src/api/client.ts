import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
)
