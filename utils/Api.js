import axios from 'axios'

export const httpClient = axios.create({
  baseURL: ` https://api-churche.webturba.com/api/`,
  // baseURL: ` http://localhost:8000/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});