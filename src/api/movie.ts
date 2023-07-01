import { authFetch } from '../utilities/authFetch'

export const getMovie = async () => {
  return await authFetch.get(`/api/movie`);
}