<h1 align="center">Movies Explorer</h1>

SPA сервис на React для поиска фильмов. Фронтенд часть.

![Movies Explorer](https://github.com/Sengeer/movies-explorer-frontend/assets/63221404/baf7dac5-8d6e-404c-99f8-ccab7204079b)

## Основная функциональность

- Поиск с фильтрацией;
- Авторизация и регистрация пользователей;
- Изменение пользовательских данных;
- Добавление фильмов в личный кабинет;
- Валидация всех форм с помощью кастомного хука;
- Адаптивная вёрстка;

**В проекте применен БЭМ подход.** Он позволяет снизить сложность и улучшить читабельность кода, а также сделать его более структурированным.

**API и общение с сервером.** Был разработан API для получения информации о карточках и пользователе с сервера. Для общения с сервером используется технология FETCH. Карточки и пользователь сохраняются на сервере с использованием методов HTTP: GET, POST, PUT, DELETE.

**Проект собран с помощью webpack.** Он позволяет минифицировать код и добавить вендорные префиксы.
## Инструкция по развёртыванию

1. Сохраните фронтенд и [бэкенд](https://github.com/Sengeer/movies-explorer-api) на компьютер
<img src="https://github.com/Sengeer/movies-explorer-frontend/assets/63221404/837151e3-e555-4ba3-b84b-fab52244dad5" alt="Сохранить на компьютер" width="400" />

2. Установите зависимости в обоих проектах командой `npm i`
3. Запустите поочерёдно, сначала бэкенд, потом фронтенд командой `npm run start`
4. Нажмите `Y` что-бы согласится запустить фронтенд на 3001 порту
5. Приложение будет доступно из браузера по адресу `http://localhost:3001`, API по адресу `http://localhost:3000`

## Технологический стек

**Front-end:** HTML, CSS, JS, React, Webpack
**Back-end:** Node.js, Express, API, Webpack


## Автор

- [@Sengeer](https://vk.com/sergey.polenov/)

