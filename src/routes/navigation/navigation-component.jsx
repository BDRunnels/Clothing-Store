import { Outlet, Link } from "react-router-dom";
import { Fragment } from 'react'; // Fragment is useful if you don't want to render an HTML element. Don't need a wrapping div.

import { ReactComponent as Logo } from "../../assets/crown.svg"
import "./navigation-styles.scss";

const Navigation = () => {
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
            <Link className="nav-link" to="/sign-in">
                SIGN IN
            </Link>
            </div>
        </div>
        <Outlet />
    </Fragment>
    );
  };

export default Navigation;