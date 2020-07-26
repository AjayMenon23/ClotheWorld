import React from 'react';
import './App.css';
import HomePage from  './pages/homepage/homepage.component';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/Header/header.component'
import SignInSignUpPage from './pages/sign-in-and-sign-out/sign-in-sign-up.component.jsx'
import {auth,createUserProfileDocument} from  './firebase/firebase.utils'


class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          })
          console.log(this.state)
        })
      }
      this.setState({currentUser:userAuth})
    })
  }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div>
      <BrowserRouter>
      <Header currentUser ={this.state.currentUser}/>
      <Switch>
        <Route  exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInSignUpPage}/>
      </Switch>
      </BrowserRouter>
      </div>
  );
}
}


export default App;
