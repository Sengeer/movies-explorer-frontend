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
  clearAll
} from '../../utils/ControlLocalStorage';

function App() {
  const [appSize, setAppSize] = useState('desktop');
  const [query, setQuery] = useState(getWrite('query') || '');
  const [querySaved, setQuerySaved] = useState(getWrite('querySaved') || '');
  const [isSearchRunning, setIsSearchRunning] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [isRegisterErr, setIsRegisterErr] = useState(false);
  const [isLoginErr, setIsLoginErr] = useState(false);
  const [isEditErr, setIsEditErr] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isShortMain, setIsShortMain] = useState(getWrite('isShortMain') || Boolean());
  const [isShortSaved, setIsShortSaved] = useState(getWrite('isShortSaved') || Boolean());
  const [index, setIndex] = useState(0);
  const [isCompletedMore, setIsCompletedMore] = useState(false);
  const [loggedIn, setLoggedIn] = useState(getWrite('loggedIn'));
  const [currentUser, setCurrentUser] = useState({ _id: '', email: '', name: '' });
  const initialCards = foundMovies.slice(0, index);
  const searchKeys = ['nameRU', 'nameEN'];

  const navigate = useNavigate();

  function refreshPage() {
    navigate(0);
  }

  function handleCardDelete(movie) {
    removeUserMovie(movie._id)
      .then(() => {
        setFoundMovies(foundMovies.filter(i => i._id !== movie._id));
      })
      .catch(console.error);
  }

  function handleExit() {
    deauthorizeUser().catch(console.error);
    setLoggedIn(false);
    clearAll();
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
          setLoggedIn(true);
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

  function handleFindMovies(array, query, isShort) {
    return array.filter(item => {
      let isFound = [];
      if (isShort && (item.duration <= 40)) {
        isFound = searchKeys.map(
          key => item[key].toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      } else if (!isShort) {
        isFound = searchKeys.map(
          key => item[key].toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      };
      return isFound.some(boolean => boolean);
    });
  }


  function handleFindAndSavedQuery(savedMovies, allMovies) {
    if (savedMovies.length && allMovies) {
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
    if (allMovies) {
      const isShort = getWrite('isShortMain');
      const foundMovies = handleFindMovies(allMovies, query, isShort);
      if (foundMovies.length) {
        setWrite('query', query);
      };
      return foundMovies;
    } else {
      const isShort = getWrite('isShortSaved');
      const foundMovies = handleFindMovies(savedMovies, querySaved, isShort);
      setIndex(foundMovies.length);
      setWrite('querySaved', querySaved);
      return foundMovies;
    };
  }

  function handleSavedMoviesForSearch(allMovies) {
    getUserMovies()
      .then(savedMoviesData => {
        setWrite('savedMovies', savedMoviesData);
        setFoundMovies(handleFindAndSavedQuery(savedMoviesData, allMovies));
        setIsSearchErr(false);
      })
      .catch(() => setIsSearchErr(true));
  }

  function handleMore() {
    if (appSize === 'desktop') {
      setIndex(index + 3);
    } else {
      setIndex(index + 2);
    };
  }

  function handleSearch() {
    if (query) {
      setIsSearchRunning(true);
      const allMovies = getWrite('allMovies');
      if (allMovies) {
        handleSavedMoviesForSearch(allMovies);
        checkSize();
      } else {
        setIsPreloader(true);
        getAllMovies()
          .then(allMoviesData => {
            setWrite('allMovies', allMoviesData);
            handleSavedMoviesForSearch(allMoviesData);
            setIsSearchErr(false);
          })
          .catch(() => setIsSearchErr(true))
          .finally(() => {
            setIsPreloader(false);
            checkSize();
          });
      };
    };
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
            isAuthorized={loggedIn}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Movies}
            handleSubmit={handleSearch}
            onChange={setQuery}
            searchValue={query}
            isSearchRunning={isSearchRunning}
            isSearchErr={isSearchErr}
            initialCards={initialCards}
            isPreloader={isPreloader}
            onMore={handleMore}
            handleClick={handleCardClick}
            isCompletedMore={isCompletedMore}
            handleSearch={handleSearch}
            isShort={isShortMain}
            handleClickShort={() => {
              setWrite('isShortMain', !isShortMain);
              setIsShortMain(!isShortMain);
              handleSearch();
            }}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Footer}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/saved-movies' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isAuthorized={loggedIn}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={SavedMovies}
            handleSubmit={
              () => setFoundMovies(handleFindAndSavedQuery(getWrite('savedMovies')))
            }
            onChange={setQuerySaved}
            searchValue={querySaved}
            initialCards={initialCards}
            handleClickDelete={handleCardDelete}
            handleSearch={handleSavedMoviesForSearch}
            isShort={isShortSaved}
            handleClickShort={() => {
              setWrite('isShortSaved', !isShortSaved);
              setIsShortSaved(!isShortSaved);
              setFoundMovies(handleFindAndSavedQuery(getWrite('savedMovies')));
            }}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Footer}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/profile' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
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
