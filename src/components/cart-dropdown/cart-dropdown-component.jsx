import './cart-dropdown.jsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart-context';
import CartItem from '../cart-item/cart-item-component';
import Button from '../button/button-component';

import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.jsx';

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const nav = useNavigate();

    const goToCheckoutHandler = () => {
        nav('/checkout')
    };

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item}/>
                        )) : (
                            <EmptyMessage> Empty Cart </EmptyMessage>
                        )
                }
                
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}> CHECKOUT </Button>
        </CartDropdownContainer>
    );
};

export default CartDropDown;