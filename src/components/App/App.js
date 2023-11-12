import {
  useState,
  useEffect
} from 'react';
import { Navigate } from 'react-router-dom';
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
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import ErrorTooltip from '../ErrorTooltip/ErrorTooltip';
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
import {
  SearchKeys,
  UnauthorizedTextForAuth,
  UnauthorizedTextForIdentification,
  ConflictTextForRegister,
  BadRequestTextForRegister,
  ConflictTextForChangeUser,
  BadRequestTextForChangeUser,
  BadRequestTextForCommon
} from '../../utils/Constants'

function App() {
  const [appSize, setAppSize] = useState('desktop');
  const [query, setQuery] = useState(getWrite('query') || '');
  const [querySaved, setQuerySaved] = useState(getWrite('querySaved') || '');
  const [isSearchRunning, setIsSearchRunning] = useState(false);
  const [isSearchRunningSaved, setIsSearchRunningSaved] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isShortMain, setIsShortMain] = useState(getWrite('isShortMain') || Boolean());
  const [isShortSaved, setIsShortSaved] = useState(getWrite('isShortSaved') || Boolean());
  const [errTooltipText, setErrTooltipText] = useState('');
  const [rowIndex, setRowIndex] = useState(0);
  const [isCompletedMore, setIsCompletedMore] = useState(false);
  const [loggedIn, setLoggedIn] = useState(getWrite('loggedIn'));
  const [currentUser, setCurrentUser] = useState({ _id: '', email: '', name: '' });
  const initialCards = foundMovies.slice(0, rowIndex);

  const MODE = process.env.REACT_APP_MODE;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const baseUrl = MODE === 'production'
  ? BASE_URL
  : 'http://localhost:3000'

  const navigate = useNavigate();

  function handleCloseErrTooltip() {
    setErrTooltipText('');
  }

  function handleError(err) {
    if ((err.status === 401) && (err.url === `${baseUrl}/signin`)) {
      setErrTooltipText(UnauthorizedTextForAuth);
    } else if ((err.status === 401) && (err.url === `${baseUrl}/users/me`)) {
      setErrTooltipText(UnauthorizedTextForIdentification);
    } else if ((err.status === 409) && (err.url === `${baseUrl}/signup`)) {
      setErrTooltipText(ConflictTextForRegister);
    } else if ((err.status === 400) && (err.url === `${baseUrl}/signup`)) {
      setErrTooltipText(BadRequestTextForRegister);
    } else if ((err.status === 409) && (err.url === `${baseUrl}/users/me`)) {
      setErrTooltipText(ConflictTextForChangeUser);
    } else if ((err.status === 400) && (err.url === `${baseUrl}/users/me`)) {
      setErrTooltipText(BadRequestTextForChangeUser);
    } else {
      setErrTooltipText(BadRequestTextForCommon);
    };
    console.error(err);
  }

  function refreshPage() {
    navigate(0);
  }

  function handleCardDelete(movie) {
    removeUserMovie(movie._id)
      .then(() => {
        const nextMovies = foundMovies.filter(i => i._id !== movie._id);
        setWrite('savedMovies', nextMovies);
        setFoundMovies(nextMovies);
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
        setIsProfileSaved(true);
      })
      .catch(handleError);
  }

  function handleRemoveMovie(movie) {
    getUserMovies()
      .then(savedMovies => {
        savedMovies.forEach(item => {
          if (item.movieId === movie.id) {
            return removeUserMovie(item._id).catch(console.error);
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
        .catch(handleError);
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
        } else {
          return;
        };
      })
      .catch(handleError);
  }

  function handleRegister(registerData) {
    createUser(registerData)
      .then(res => {
        if (res.statusCode !== 400) {
          handleLogin(registerData);
          setLoggedIn(true);
        } else {
          return;
        };
      })
      .catch(handleError);
  }

  function handleFindMovies(array, query, isShort) {
    return array.filter(item => {
      let isFound = [];
      if (isShort && (item.duration <= 40)) {
        isFound = SearchKeys.map(
          key => item[key].toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      } else if (!isShort) {
        isFound = SearchKeys.map(
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
      setIsPreloader(false);
      return foundMovies;
    } else {
      const isShort = getWrite('isShortSaved');
      const foundMovies = handleFindMovies(savedMovies, querySaved, isShort);
      setRowIndex(foundMovies.length);
      if (foundMovies.length) {
        setWrite('querySaved', querySaved);
      };
      setIsPreloader(false);
      return foundMovies;
    };
  }

  function handleSavedMoviesForSearch(allMovies) {
    setIsPreloader(true);
    getUserMovies()
      .then(savedMoviesData => {
        setWrite('savedMovies', savedMoviesData);
        setFoundMovies(handleFindAndSavedQuery(savedMoviesData, allMovies));
        setIsSearchErr(false);
      })
      .catch((e) => {
        setIsSearchErr(true);
        console.error(e)
      });
  }

  function handleMore() {
    if (appSize === 'desktop') {
      setRowIndex(rowIndex + 3);
    } else {
      setRowIndex(rowIndex + 2);
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
      setRowIndex(5);
    };
    if (appSize === 'tablet') {
      setRowIndex(8);
    };
    if (appSize === 'desktop') {
      setRowIndex(12);
    };
  }

  function handleAppSize(width) {
    if (width < 738) {
      setAppSize('mobile');
      setRowIndex(5);
    };
    if (width >= 738) {
      setAppSize('tablet');
      setRowIndex(8);
    };
    if (width >= 1200) {
      setAppSize('desktop');
      setRowIndex(12);
    };
  }

  useEffect(() => {
    const handleWidth = (e) => {
      setTimeout(function () {
        handleAppSize(e.target.innerWidth);
      }, 500);
    };

    window.addEventListener('resize', handleWidth);
    return () => {
      window.addEventListener('resize', handleWidth);
    };
  }, [])

  useEffect(() => {
    if (rowIndex >= foundMovies.length) {
      setIsCompletedMore(true);
    } else {
      setIsCompletedMore(false);
    };
  }, [rowIndex, foundMovies])

  useEffect(() => {
    handleUserIdentification();
    handleAppSize(window.screen.width);
  }, [])

  if (((currentUser.name === '') && (loggedIn === undefined))) {
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
            isAuthorized={loggedIn}
            pageName={'main'} />
          <ErrorTooltip
            errTooltipText={errTooltipText}
            onClose={handleCloseErrTooltip} />
          <Main />
          <Footer />
        </>
      } />
      <Route path='/movies' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ErrorTooltip />
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isAuthorized={loggedIn}
            pageName={'movies'}
            loggedIn={loggedIn} />
          <ErrorTooltip
            errTooltipText={errTooltipText}
            onClose={handleCloseErrTooltip} />
          <ProtectedRouteElement element={Movies}
            handleSubmit={handleSearch}
            onChange={setQuery}
            searchValue={query}
            isSearchRunning={isSearchRunning}
            isSearchErr={isSearchErr}
            initialCards={initialCards}
            isPreloader={isPreloader}
            onMore={handleMore}
            handleClickAdd={handleCardClick}
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
            isPreloader={isPreloader}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/saved-movies' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isAuthorized={loggedIn}
            pageName={'saved'}
            loggedIn={loggedIn} />
          <ErrorTooltip
            errTooltipText={errTooltipText}
            onClose={handleCloseErrTooltip} />
          <ProtectedRouteElement element={SavedMovies}
            handleSubmit={
              () => {
                setFoundMovies(handleFindAndSavedQuery(getWrite('savedMovies')));
                setIsSearchRunningSaved(true);
              }
            }
            onChange={setQuerySaved}
            searchValue={querySaved}
            isSearchRunningSaved={isSearchRunningSaved}
            isSearchErr={isSearchErr}
            initialCards={initialCards}
            isPreloader={isPreloader}
            handleClickDelete={handleCardDelete}
            handleSearch={() => {
              setWrite('querySaved', '');
              setQuerySaved('');
              setWrite('isShortSaved', false);
              setIsShortSaved(false);
              handleSavedMoviesForSearch();
            }}
            isShort={isShortSaved}
            handleClickShort={() => {
              setWrite('isShortSaved', !isShortSaved);
              setIsShortSaved(!isShortSaved);
              setFoundMovies(handleFindAndSavedQuery(getWrite('savedMovies')));
            }}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/profile' element={
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRouteElement element={Header}
            appSize={appSize}
            isAuthorized={loggedIn}
            pageName={'profile'}
            loggedIn={loggedIn} />
          <ErrorTooltip
            errTooltipText={errTooltipText}
            onClose={handleCloseErrTooltip} />
          <ProtectedRouteElement element={Profile}
            handleSubmit={handleChangeUserInfo}
            isProfileSaved={isProfileSaved}
            handleProfileSaved={() => setIsProfileSaved(false)}
            handleExit={handleExit}
            loggedIn={loggedIn} />
        </CurrentUserContext.Provider>
      } />
      <Route path='/signin' element={
        loggedIn
          ? <Navigate to='/' replace />
          : <>
              <ErrorTooltip
                errTooltipText={errTooltipText}
                onClose={handleCloseErrTooltip} />
              <Login
                handleLogin={handleLogin} />
            </>
      } />
      <Route path='/signup' element={
        loggedIn
          ? <Navigate to='/' replace/>
          : <>
              <ErrorTooltip
                errTooltipText={errTooltipText}
                onClose={handleCloseErrTooltip} />
              <Register
                handleRegister={handleRegister} />
            </>
      } />
    </Routes>
  );
}

export default App;
