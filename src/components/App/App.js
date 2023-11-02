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
  const [isTablet, setIsTablet] = useState(false);
  const [appSize, setAppSize] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [index, setIndex] = useState(12);
  const [isCompletedMore, setIsCompletedMore] = useState(false);
  const initialCards = allCards.slice(0, index);

  function handleMore() {
    if (appSize === 'desktop') {
      setIndex(index + 3);
    } else {
      setIndex(index + 2);
    };
  }

  function handleSearch(query) {
    setIsPreloader(true);
    setIsSearch(true);

    getAllMovies()
      .then(moviesData => {
        setAllCards(moviesData.filter(i => i.nameRU.indexOf(query) !== -1));
        setIsSearchErr(false);
      })
      .catch(() => setIsSearchErr(true))
      .finally(() => {
        checkSize();
        setIsPreloader(false);
      });
  }

  function checkSize() {
    if (appSize === 'mobile') {
      setIndex(5);
    };
    if (appSize === 'tablet') {
      setIndex(8);
    };
    if (appSize === 'desktop') {
      setIndex(12);
    };
  }

  useEffect(() => {
    const handleAppWidth = (e) => {
      setTimeout(function () {
        if (e.target.innerWidth < 738) {
          setAppSize('mobile');
        };
        if (e.target.innerWidth >= 738) {
          setAppSize('tablet');
        };
        if (e.target.innerWidth < 1024) {
          setIsTablet(true);
        } else {
          setIsTablet(false);
        };
        if (e.target.innerWidth >= 1200) {
          setAppSize('desktop');
        };
      }, 1000);
    };

    window.addEventListener('resize', handleAppWidth);
    return () => {
      window.addEventListener('resize', handleAppWidth);
    };
  }, [])

  useEffect(() => {
    if (index >= allCards.length) {
      setIsCompletedMore(true);
    } else {
      setIsCompletedMore(false);
    };
  }, [index, allCards])

  return (
    <Routes>
      <Route path='*' element={
        <NotFound />
      } />
      <Route path='/' element={
        <>
          <Header
            isTablet={isTablet}
            isPresentation={true}
            isAuthorized={false} />
          <Main />
          <Footer />
        </>
      } />
      <Route path='/movies' element={
        <>
          <Header
            isTablet={isTablet}
            isPresentation={false}
            isAuthorized={true} />
          <Movies
            onSubmit={handleSearch}
            isSearch={isSearch}
            isSearchErr={isSearchErr}
            initialCards={initialCards}
            isPreloader={isPreloader}
            onMore={handleMore}
            isCompletedMore={isCompletedMore} />
          <Footer />
        </>
      } />
      <Route path='/saved-movies' element={
        <>
          <Header
            isTablet={isTablet}
            isPresentation={false}
            isAuthorized={true} />
          <SavedMovies />
          <Footer />
        </>
      } />
      <Route path='/profile' element={
        <>
          <Header
            isTablet={isTablet}
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
