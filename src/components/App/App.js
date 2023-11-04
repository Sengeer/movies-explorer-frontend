import {
  useState,
  useEffect
} from 'react';
import './App.css';
import '../../index.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { getAllMovies } from '../../utils/MoviesApi';
import {
  createUser,
  authorizeUser,
  identification
} from '../../utils/MainApi';
import {
  setQuery,
  getQuery
} from '../../utils/SaveQuery';

function App() {
  const [appSize, setAppSize] = useState('desktop');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchRunning, setIsSearchRunning] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [isRegisterErr, setIsRegisterErr] = useState(false);
  const [isLoginErr, setIsLoginErr] = useState(false);
  const [foundCards, setFoundCards] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [index, setIndex] = useState(12);
  const [isCompletedMore, setIsCompletedMore] = useState(false);
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({ _id: '', email: '', name: '' });
  const initialCards = foundCards.slice(0, index);
  const searchKeys = ['nameRU', 'nameEN'];

  const navigate = useNavigate();

  function handleUserIdentification() {
    identification()
      .then(userData => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch(e => {
        setLoggedIn(false);
        console.error(e);
      });
  };

  function handleLogin(authData) {
    authorizeUser({
      email: authData.email,
      password: authData.password
    })
      .then(res => {
        if ((res.statusCode !== 400) && (res.statusCode !== 401)) {
          handleUserIdentification();
          setLoggedIn(true);
          navigate('/movies', { replace: true });
          setIsLoginErr(false);
        } else {
          setIsLoginErr(true);
        };
      })
      .catch(e => {
        setIsLoginErr(true);
        console.error(e);
      });
  }

  function handleRegister(registerData) {
    createUser(registerData)
      .then(res => {
        if (res.statusCode !== 400) {
          handleLogin(registerData);
        } else {
          setIsRegisterErr(true);
        };
      })
      .catch(setIsRegisterErr(true));
  }

  function handleFindAndSavedQuery(movieData) {
    const foundMovies = movieData.filter(i => {
      const isFound = searchKeys.map(n => i[n].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
      return isFound.some(b => b);
    });
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

  function handleSearch() {
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
    handleUserIdentification();
    сheckUserSearch();
  }, [])

  if ((currentUser.name === '') && ((loggedIn === undefined) || loggedIn)) {
    return
  }

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
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isPresentation={false}
            isAuthorized={true}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Movies}
            handleSubmit={handleSearch}
            onChange={setSearchQuery}
            searchValue={searchQuery}
            isSearchRunning={isSearchRunning}
            isSearchErr={isSearchErr}
            initialCards={initialCards}
            isPreloader={isPreloader}
            onMore={handleMore}
            isCompletedMore={isCompletedMore}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Footer}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/saved-movies' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isPresentation={false}
            isAuthorized={true}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={SavedMovies}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Footer}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/profile' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isPresentation={false}
            isAuthorized={true}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Profile}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/signin' element={
        <Login
          handleLogin={handleLogin}
          isLoginErr={isLoginErr} />
      } />
      <Route path='/signup' element={
        <Register
          handleRegister={handleRegister}
          isRegisterErr={isRegisterErr} />
      } />
    </Routes>
  );
}

export default App;
