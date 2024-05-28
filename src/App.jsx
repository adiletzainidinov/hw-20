import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import Cart from './components/Cart/Cart';
import { getBasketMealsThunk } from './redux/actions/basketActions';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasketMealsThunk());
  }, [dispatch]);

  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
