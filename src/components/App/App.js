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
import { setQuery, getQuery } from '../../utils/SaveQuery';

function App() {
  const [appSize, setAppSize] = useState('desktop');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchRunning, setIsSearchRunning] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [foundCards, setFoundCards] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [index, setIndex] = useState(12);
  const [isCompletedMore, setIsCompletedMore] = useState(false);
  const initialCards = foundCards.slice(0, index);

  function handleFindAndSavedQuery(movieData) {
    const foundMovies = movieData.filter(i => i.nameRU.indexOf(searchQuery) !== -1);
    if (foundMovies.length) {
      setQuery({
        query: searchQuery,
        short: isShortMovies,
        cards: foundMovies
      });
    };
    return foundMovies;
  }

  function handleMore() {
    if (appSize === 'desktop') {
      setIndex(index + 3);
    } else {
      setIndex(index + 2);
    };
  }

  function handleSearch(query) {
    setIsPreloader(true);
    setIsSearchRunning(true);

    getAllMovies()
      .then(movieData => {
        setFoundCards(handleFindAndSavedQuery(movieData));
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

  function сheckUserSearch() {
    const userQuery = getQuery();
    if (userQuery) {
      setSearchQuery(userQuery.query);
      setIsShortMovies(userQuery.short);
      setFoundCards(userQuery.cards);
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
    if (index >= foundCards.length) {
      setIsCompletedMore(true);
    } else {
      setIsCompletedMore(false);
    };
  }, [index, foundCards])

  useEffect(() => {
    сheckUserSearch();
  }, [])

  return (
    <Routes>
      <Route path='*' element={
        <NotFound />
      } />
      <Route path='/' element={
        <>
          <Header
            appSize={appSize}
            isPresentation={true}
            isAuthorized={false} />
          <Main />
          <Footer />
        </>
      } />
      <Route path='/movies' element={
        <>
          <Header
            appSize={appSize}
            isPresentation={false}
            isAuthorized={true} />
          <Movies
            handleSubmit={handleSearch}
            onChange={setSearchQuery}
            searchValue={searchQuery}
            isSearchRunning={isSearchRunning}
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
            appSize={appSize}
            isPresentation={false}
            isAuthorized={true} />
          <SavedMovies />
          <Footer />
        </>
      } />
      <Route path='/profile' element={
        <>
          <Header
            appSize={appSize}
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
