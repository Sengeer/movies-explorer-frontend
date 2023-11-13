const MODE = process.env.REACT_APP_MODE;

export const SEARCH_KEYS = ['nameRU', 'nameEN'];

export const BASE_URL = MODE === 'production'
  ? 'https://api.movies.explorer.sengeer.nomoredomainsrocks.ru'
  : 'http://localhost:3000';
export const API_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const UNAUTHORIZED_TEXT_FOR_AUTH = 'Вы ввели неправильный логин или пароль';
export const UNAUTHORIZED_TEXT_FOR_IDENTIFICATION = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
export const CONFLICT_TEXT_FOR_REGISTER = 'Пользователь с таким email уже существует';
export const BAD_REQUEST_TEXT_FOR_REGISTER = 'При регистрации пользователя произошла ошибка';
export const CONFLICT_TEXT_FOR_CHANGE_USER = 'Пользователь с таким email уже существует';
export const BAD_REQUEST_TEXT_FOR_CHANGE_USER = 'При обновлении профиля произошла ошибка';
export const BAD_REQUEST_TEXT_FOR_COMMON = 'На сервере произошла ошибка';
