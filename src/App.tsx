import React, { useReducer } from 'react';
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { Ticknumber } from './pages/Ticknumber';
import { OrderContext, OrderInitialState, OrderReducer } from './stroe/store';
import { ThemeProvider } from 'styled-components';
import './assets/scss/all.scss';
import { Loading } from './components/Loading';
// import { GlobalStyle } from './assets/GlobalStyle';


function App() {
  const reducer = useReducer(OrderReducer, OrderInitialState);
  return (
    <OrderContext.Provider value={reducer}>
      <ThemeProvider theme={{}}>
        {/* <Loading/> */}
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/movie/:id" element={<Movie/>}></Route>
          <Route path="/ticknumber" element={<Ticknumber/>}></Route>
        </Routes>
      </ThemeProvider>
    </OrderContext.Provider>
  );
}

export default App;
