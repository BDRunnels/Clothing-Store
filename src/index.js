import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { UserProvider } from './contexts/user-context';
import { CategoriesProvider } from './contexts/categories-context';
import { CartProvider } from './contexts/cart-context';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';


import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* parent level component where the user object is stored, thus passed down with useContext. */}
        <CategoriesProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </CartProvider>
        </CategoriesProvider> 
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
