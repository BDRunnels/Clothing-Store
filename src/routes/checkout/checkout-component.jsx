import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context';
import './checkout.scss';

import CheckoutItem from '../../components/checkout-item/checkout-item-component';
import PaymentForm from '../../components/payment-form/payment-form-component';

const Checkout = () => {
    const { cartItems, total } = useContext(CartContext);

    return (
        <div className='checkout-container'> 
            <div className='checkout-header'>
                <div className='header-block'>
                    <span> Product</span>
                </div>
                <div className='header-block'>
                    <span> Description</span>
                </div>
                <div className='header-block'>
                    <span> Quantity</span>
                </div>
                <div className='header-block'>
                    <span> Price</span>
                </div>
                <div className='header-block'>
                    <span> Remove</span>
                </div>
            </div>
                {
                    cartItems.length ? cartItems.map((cartItem) => {
                        return (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                        )
                    }) : <h1> No items in your cart </h1>
                }
                {
                    cartItems.length ? <span className='total'> Total: ${total}</span> : ''
                }
            <PaymentForm />
        </div>
    );
};

export default Checkout;