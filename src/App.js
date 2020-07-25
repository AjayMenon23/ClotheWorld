import React from 'react';
import './App.css';
import HomePage from  './pages/homepage/homepage.component';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/Header/header.component'
import SignInSignUpPage from './pages/sign-in-and-sign-out/sign-in-sign-up.component.jsx'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route  exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInSignUpPage}/>
      </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
