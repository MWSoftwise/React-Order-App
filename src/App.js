import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [CartIsVisible, setCartIsVisible] = useState(false)

  const showCartHandler = () => {
    setCartIsVisible(true)
  }
  const hideCartHandler = () => {
    setCartIsVisible(false)
  }

  return (
    <CartProvider>
      {CartIsVisible && <Cart onCloseCart={hideCartHandler} />}
      <Header onOpenCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
