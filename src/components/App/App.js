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
import NotFound from '../NotFound/NotFound';
import { getAllMovies } from '../../utils/MoviesApi'

function App() {
  const [isMobile, setIsMobile] = useState(false);

  function handleSearch() {
    getAllMovies().then(moviesData => {
        console.log(moviesData)
      })
      .catch(console.error);
  }

  useEffect(() => {
    const handleWindowWidth = (e) => {
      if (e.target.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleWindowWidth);
    return () => {
      window.addEventListener('resize', handleWindowWidth);
    };
  }, [])

  return (
    <Routes>
      <Route path='*' element={
        <NotFound />
      } />
      <Route path='/' element={
        <>
          <Header
            isMobile={isMobile}
            isPresentation={true}
            isAuthorized={false} />
          <Main />
          <Footer />
        </>
      } />
      <Route path='/movies' element={
        <>
          <Header
            isMobile={isMobile}
            isPresentation={false}
            isAuthorized={true} />
          <Movies
            onSearch={handleSearch} />
          <Footer />
        </>
      } />
      <Route path='/saved-movies' element={
        <>
          <Header
            isMobile={isMobile}
            isPresentation={false}
            isAuthorized={true} />
          <SavedMovies />
          <Footer />
        </>
      } />
      <Route path='/profile' element={
        <>
          <Header
            isMobile={isMobile}
            isPresentation={false}
            isAuthorized={true} />
          <Profile />
        </>
      } />
      <Route path='/signin' element={
        <Login />
      } />
      <Route path='/signup' element={
        <Register />
      } />
    </Routes>
  );
}

export default App;
