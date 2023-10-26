import { useState, useEffect } from 'react';
import './App.css';
import '../../index.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  const [isMobile, setIsMobile] = useState(false);

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
        // Route for 404 Not Found page
        <>
        </>
      } />
      <Route path='/' element={
        <>
          <Header
            isMobile={isMobile}
            isPresentation={true}
            isAuthorized={true} />
          <Navigation />
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
          <Navigation />
          <Movies />
          <Footer />
        </>
      } />
      <Route path='/saved-movies' element={
        <>
          <Header
            isMobile={isMobile}
            isPresentation={false}
            isAuthorized={true} />
          <Navigation />
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
          <Navigation />
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
