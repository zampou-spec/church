import axios from 'axios'

export const httpClient = axios.create({
  baseURL: ` https://api-churche.webturba.com/api/`, 
  headers: {
    'Content-Type': 'application/json',
  },
});