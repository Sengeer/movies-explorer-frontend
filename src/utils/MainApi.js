import { BASE_URL } from '../utils/Constants';

export const header = {
  'Content-Type': 'application/json'
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  };
}

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
}

export function createUser(registerData) {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(registerData)
  });
}

export function authorizeUser(authData) {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(authData),
    credentials: 'include'
  });
}

export function deauthorizeUser() {
  return request(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: header,
    credentials: 'include'
  });
}

export function identification() {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: header,
    credentials: 'include'
  });
}

export function changeUserInfo(userData) {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: header,
    body: JSON.stringify(userData),
    credentials: 'include'
  });
}

export function getUserMovies() {
  return request(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: header,
    credentials: 'include'
  });
}

export function addUserMovie(movieData) {
  return request(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(movieData),
    credentials: 'include'
  });
}

export function removeUserMovie(movieId) {
  return request(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: header,
    credentials: 'include'
  });
}
