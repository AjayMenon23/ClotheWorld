import React from 'react';
import CartItem  from "../cart-item/cart-item.component";
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux'
import './cart-dropdown.styles.scss';
import {selectCartItems} from '../../redux/cart/cart.selectors'

const Cart=({cartItems})=>(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem=> (<CartItem key={cartItem.id} item={cartItem}/>))
            }
        </div>
        <CustomButton>Checkout</CustomButton>
    </div>
)


// const mapStateToProps = ({cart : {cartItems}})=>({
//     cartItems
// })



const mapStateToProps = (state)=>({
    cartItems : selectCartItems(state)
})

export default connect(mapStateToProps)(Cart);