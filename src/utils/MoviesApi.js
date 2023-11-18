import { request, header } from './MainApi';
import { API_URL } from '../utils/Constants';

export function getAllMovies() {
  return request(API_URL, {
    method: 'GET',
    headers: header
  });
}
