const MODE = process.env.REACT_APP_MODE;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const header = {
  'Content-Type': 'application/json'
}

const baseUrl = MODE === 'production'
  ? BASE_URL
  : 'http://localhost:3002'

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
  return request(`${baseUrl}/signup`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(registerData)
  });
}

export function authorizeUser(requestBody) {
  return request(`${baseUrl}/signin`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
    credentials: 'include'
  });
}

export function deauthorizeUser() {
  return request(`${baseUrl}/signout`, {
    method: 'POST',
    headers: header,
    credentials: 'include'
  });
}

export function getUserData() {
  return request(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: header,
    credentials: 'include'
  });
}

export function changeUserInfo(userData) {
  return request(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: header,
    body: userData,
    credentials: 'include'
  });
}

export function getUserMovies() {
  return request(`${baseUrl}/movies`, {
    method: 'GET',
    headers: header,
    credentials: 'include'
  });
}

export function addUserMovie(movieData) {
  return request(`${baseUrl}/movies`, {
    method: 'POST',
    headers: header,
    body: movieData,
    credentials: 'include'
  });
}

export function removeUserMovie(movieId) {
  return request(`${baseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: header,
    credentials: 'include'
  });
}
