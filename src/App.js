import { Routes, Route } from 'react-router-dom';

import Home from "./routes/home/home-component";
import Navigation from './routes/navigation/navigation-component';
import Auth from './routes/auth/auth-component';


const Shop = () => {
  return (
    <div>
      <h1> I am the shop</h1>
    </div>
  );
};

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} /> {/* index is an attribute, defaults to true, it says render this child element when path matches */}
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;
