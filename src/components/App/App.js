import { useState, useEffect } from 'react';
import './App.css';
import '../../index.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {

  return (
    <Routes>
      <Route path="*" element={
        // Route for 404 Not Found page
        <>
        </>
      } />
      <Route path="/" element={
        <>
          <Header />
          <Main />
          <Footer />
        </>
      } />
      <Route path="/movies" element={
        <>
          <Header />
          <Movies />
          <Footer />
        </>
      } />
      <Route path="/saved-movies" element={
        <>
          <Header />
          <SavedMovies />
          <Footer />
        </>
      } />
      <Route path="/profile" element={
        <>
          <Header />
          <Profile />
          <Footer />
        </>
      } />
      <Route path="/signin" element={
        <>
          <Header />
          <Login />
        </>
      } />
      <Route path="/signup" element={
        <>
          <Header />
          <Register />
        </>
      } />
    </Routes>
  );
}

export default App;
