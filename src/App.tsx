import React, { useReducer } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { OrderContext, OrderInitialState, OrderReducer } from './store';
import { ThemeProvider } from 'styled-components';
import { Header,Footer } from './components';

import './assets/scss/all.scss';
import routes from './routes';

// import { GlobalStyle } from './assets/GlobalStyle';



function App() {
  const reducer = useReducer(OrderReducer, OrderInitialState);
  const routing = useRoutes(routes);
  return (
    <OrderContext.Provider value={reducer}>
      <ThemeProvider theme={{}}>
        <Header />
        {routing}
        <Footer/>
      </ThemeProvider>
    </OrderContext.Provider>
  );
}

export default App;
