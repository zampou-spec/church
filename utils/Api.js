import axios from 'axios';

export const httpClient = axios.create({
  baseURL: ` http://api-churche.webturba.com/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});