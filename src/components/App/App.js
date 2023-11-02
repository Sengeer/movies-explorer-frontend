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
import { getAllMovies } from '../../utils/MoviesApi';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [foundCards, setFoundCards] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);

  function handleSearch(query) {
    setIsPreloader(true);
    setIsSearch(true);

    getAllMovies()
      .then(moviesData => {
        setFoundCards(moviesData.filter(i => i.nameRU.indexOf(query) !== -1));
        setIsSearchErr(false);
      })
      .catch(() => setIsSearchErr(true))
      .finally(() => setIsPreloader(false));
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
            onSubmit={handleSearch}
            isSearch={isSearch}
            isSearchErr={isSearchErr}
            foundCards={foundCards}
            isPreloader={isPreloader} />
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
