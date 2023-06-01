import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems,productToAdd) => {
    // find if cartitems contains producttoadd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    };
    // return new array with modified cartitems / new cart item
    return [...cartItems, {...productToAdd, quantity: 1}] // new array, new product WITH quantity of 1.
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems]);

    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};