import { Routes, Route } from 'react-router-dom';

import Home from "./routes/home/home-component";
import Navigation from './routes/navigation/navigation-component';
import Auth from './routes/auth/auth-component';
import Shop from './routes/shop/shop-component';
import Checkout from './routes/checkout/checkout-component';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} /> {/* index is an attribute, defaults to true, it says render this child element when path matches */}
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
        < Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
