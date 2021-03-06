import React from 'react';
import './App.css';
import HomePage from  './pages/homepage/homepage.component';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/Header/header.component'
import SignInSignUpPage from './pages/sign-in-and-sign-out/sign-in-sign-up.component.jsx'
import Contact from './pages/contact/contact'
import {connect} from 'react-redux'
import {auth,createUserProfileDocument} from  './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actionss'
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors'
import CheckoutPage from  './pages/checkout/checkout.component';

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
      <Header/>
      <Switch>
        <Route  exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route exact path='/signin' render={()=>this.props.currentUser?(<Redirect to='/'/> ) : (<SignInSignUpPage/>)}/>
        <Route path='/contact' component={Contact}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
      </Switch>
      </div>
  );
}
}

// const mapStateToProps =({user})=>({   Old way without memoizaation
//   currentUser :user.currentUser
// });

const mapStateToProps =createStructuredSelector({
  currentUser :selectCurrentUser
});

const mapDispatchToProps =dispatch=>({
  setCurrentUser: user=> dispatch(setCurrentUser(user))
})

export default (connect(mapStateToProps,mapDispatchToProps)(App));
