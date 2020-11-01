import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import './App.css'

import NavBar from './components/AppNavBar.jsx'
import LogIn from './components/LogIn.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import AllBooks from './components/AllBooks.jsx'
import MyBooks from './components/MyBooks.jsx'

import {loggedUser,logOut} from './actions/authAction'
import setAuthToken from './auth/authToken'

if(localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(loggedUser(decoded));

  // Check for expired token:
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout the user:
    store.dispatch(logOut());
    // TODO: Clear current Profile / Books:

    // Redirect to login:
    window.location.href = '/login';
  }
}

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar></NavBar>
          <Route exact name="home" component={Home} path="/" />
          <Route name="singup" component={SignUp} path='/signup' />
          <Route name="login" component={LogIn} path='/login' />
          <Route name="allbooks" component={AllBooks} path='/allbooks' />
          <Route name="mybooks" component={MyBooks} path='/mybooks' />
        </div>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
