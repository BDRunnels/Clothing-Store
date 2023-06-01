import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from 'react'; // Fragment is useful if you don't want to render an HTML element. Don't need a wrapping div.

import { ReactComponent as Logo } from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user-context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation-styles.scss";

const Navigation = () => {
    const { currentUser } = useContext(UserContext); //useContext as a hook tells this component when this value changes, re-render this component.
    // console.log(currentUser);

    // const signOutHandler = async () => {
    //     const response = await signOutUser();
    //     console.log(response);
    //     // setCurrentUser(null); // resetting currentUser once logged in user signs out to re-render. 
    // };

    return (
    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {
                currentUser ? (
                    <span className="nav-link" onClick={signOutUser}> 
                        SIGN OUT 
                    </span>
                )
                    : (
                    <Link className="nav-link" to="/auth">
                        SIGN IN
                    </Link>
                )
            };
            
            </div>
        </div>
        <Outlet />
    </Fragment>
    );
  };

export default Navigation;