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
  deauthorizeUser,
  identification,
  addUserMovie,
  getUserMovies,
  removeUserMovie,
  changeUserInfo
} from '../../utils/MainApi';
import {
  setWrite,
  getWrite,
  removeWrite
} from '../../utils/ControlLocalStorage';

function App() {
  const [appSize, setAppSize] = useState('desktop');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchRunning, setIsSearchRunning] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [isRegisterErr, setIsRegisterErr] = useState(false);
  const [isLoginErr, setIsLoginErr] = useState(false);
  const [isEditErr, setIsEditErr] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [index, setIndex] = useState(12);
  const [isCompletedMore, setIsCompletedMore] = useState(false);
  const [loggedIn, setLoggedIn] = useState(getWrite('loggedIn'));
  const [currentUser, setCurrentUser] = useState({ _id: '', email: '', name: '' });
  const initialCards = foundMovies.slice(0, index);
  const searchKeys = ['nameRU', 'nameEN'];

  const navigate = useNavigate();

  function refreshPage() {
    navigate(0);
  }

  function handleExit() {
    deauthorizeUser().catch(console.error);
    setLoggedIn(false);
    removeWrite('loggedIn');
    removeWrite('search');
    navigate('/', { replace: true });
  }

  function handleChangeUserInfo(newUserData) {
    changeUserInfo(newUserData)
      .then(userData => {
        setCurrentUser(userData);
        setIsEditErr(false);
      })
      .catch(e => {
        setIsEditErr(true);
        console.error(e);
      });
  }

  function handleRemoveMovie(movie) {
    getUserMovies()
      .then(savedMovies => {
        savedMovies.forEach(item => {
          if (item.movieId === movie.id) {
            return removeUserMovie(item._id);
          };
        });
      })
      .catch(console.error);
  }

  function handleAddMovie(movie) {
    addUserMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
      .then()
      .catch(console.error);
  }

  function handleCardClick(movie) {
    if (movie.isLiked) {
      handleAddMovie(movie);
    } else {
      handleRemoveMovie(movie);
    };
    const nextMovies = foundMovies.map((item, index) => {
      if (index++ === movie._id) {
        return movie;
      } else {
        return item;
      }
    });
    setFoundMovies(nextMovies);
    setWrite('search', {
      query: searchQuery,
      isShort: isShortMovies,
      foundMovies: nextMovies
    });
  }

  function handleUserIdentification() {
    if (loggedIn) {
      identification()
        .then(userData => {
          setCurrentUser(userData);
        })
        .catch(console.error);
    };
  };

  function handleLogin(authData) {
    authorizeUser({
      email: authData.email,
      password: authData.password
    })
      .then(res => {
        if ((res.statusCode !== 400) && (res.statusCode !== 401)) {
          handleUserIdentification();
          setWrite('loggedIn', true);
          navigate('/movies', { replace: true });
          refreshPage();
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
          setLoggedIn(true);
        } else {
          setIsRegisterErr(true);
        };
      })
      .catch(e => {
        setIsRegisterErr(true);
        console.error(e);
      });
  }

  function handleFindAndSavedQuery(allMovies, savedMovies) {
    if (savedMovies.length) {
      allMovies.map(item => {
        if (savedMovies.some(itemSaved => itemSaved.movieId === item.id)) {
          item.isLiked = true;
          return item;
        } else {
          item.isLiked = false;
          return item;
        }
      });
    };
    const foundMovies = allMovies.filter(i => {
      const isFound = searchKeys.map(n => i[n].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
      return isFound.some(b => b);
    });
    if (foundMovies.length) {
      setWrite('search', {
        query: searchQuery,
        isShort: isShortMovies,
        foundMovies: foundMovies
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
    Promise.all([
      getAllMovies(),
      getUserMovies()
    ])
      .then(([allMovies, savedMovies]) => {
        setFoundMovies(handleFindAndSavedQuery(allMovies, savedMovies));
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
    const userSearch = getWrite('search');
    if (userSearch) {
      setSearchQuery(userSearch.query);
      setIsShortMovies(userSearch.iSshort);
      setFoundMovies(userSearch.foundMovies);
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
      }, 500);
    };

    window.addEventListener('resize', handleAppWidth);
    return () => {
      window.addEventListener('resize', handleAppWidth);
    };
  }, [])

  useEffect(() => {
    if (index >= foundMovies.length) {
      setIsCompletedMore(true);
    } else {
      setIsCompletedMore(false);
    };
  }, [index, foundMovies])

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
            isAuthorized={loggedIn} />
          <Main />
          <Footer />
        </>
      } />
      <Route path='/movies' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isPresentation={false}
            isAuthorized={loggedIn}
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
            handleClick={handleCardClick}
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
            isAuthorized={loggedIn}
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
            isAuthorized={loggedIn}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Profile}
            handleSubmit={handleChangeUserInfo}
            isEditErr={isEditErr}
            handleExit={handleExit}
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
