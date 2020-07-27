import React from 'react';
import './App.css';
import HomePage from  './pages/homepage/homepage.component';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/Header/header.component'
import SignInSignUpPage from './pages/sign-in-and-sign-out/sign-in-sign-up.component.jsx'
import Contact from './pages/contact/contact'
import {connect} from 'react-redux'
import {auth,createUserProfileDocument} from  './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actionss'

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          this.props.setCurrentUser({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          })
          console.log(this.state)
        })
      }
      this.props.setCurrentUser(userAuth)
    })
  }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route  exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInSignUpPage}/>
        <Route path='/contact' component={Contact}/>
      </Switch>
      </BrowserRouter>
      </div>
  );
}
}


const mapDispatchToProps =dispatch=>({
  setCurrentUser: user=> dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);
