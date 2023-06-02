import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from 'react'; // Fragment is useful if you don't want to render an HTML element. Don't need a wrapping div.

import CartIcon from "../../components/cart-icon/cart-icon-component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown-component";

import { ReactComponent as Logo } from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from "./navigation-styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext); //useContext as a hook tells this component when this value changes, re-render this component.
    const { isCartOpen } = useContext(CartContext);
    // console.log(currentUser);

    // const signOutHandler = async () => {
    //     const response = await signOutUser();
    //     console.log(response);
    //     // setCurrentUser(null); // resetting currentUser once logged in user signs out to re-render. 
    // };

    return (
    <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}> 
                            SIGN OUT 
                        </NavLink>
                    )
                        : (
                        <NavLink className="nav-link" to="/auth">
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            { isCartOpen && <CartDropDown />}
            {/* // && short-circuit operator evaluates as true if left and right are truthy. isCartOpen boolean and component function (always true). */}
        </NavigationContainer>
        <Outlet />
    </Fragment>
    );
  };

export default Navigation;