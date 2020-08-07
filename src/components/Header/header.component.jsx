import React from 'react';
import './header.styles.scss'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux' 
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors'





const Header =({currentUser,hidden})=>(
    <div className='header'>
        <Link to="/" className="logo-container">
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link  to ='/shop' className='options'>SHOP</Link>
            <Link  to ='/contact' className='options'>CONTACT</Link>
            {
                currentUser ?( 
                <div className='options' onClick={()=>auth.signOut()}>SIGN OUT</div>
                )
                :(
                <Link className='options' to='/signin'>SIGN IN</Link>
                )
            }
            <CartIcon/>
        </div>
        {
            hidden ? null :
            <CartDropdown/>
        }
    </div>
)

const mapStateToProps= createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})
export default connect(mapStateToProps)(Header);