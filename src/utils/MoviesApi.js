import { request, header } from "./MainApi";

export function getAllMovies() {
  return request('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: header
  });
}
