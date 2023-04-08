import React, { useReducer } from 'react';
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { Member } from './pages/Member';
import { Ticknumber } from './pages/Ticknumber';
import { OrderContext, OrderInitialState, OrderReducer } from './stroe';
import { ThemeProvider } from 'styled-components';
import { Header } from './components';
import './assets/scss/all.scss';

// import { GlobalStyle } from './assets/GlobalStyle';



function App() {
  const reducer = useReducer(OrderReducer, OrderInitialState);
  return (
    <OrderContext.Provider value={reducer}>
      <ThemeProvider theme={{}}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/member/:id" element={<Member/>}></Route>
          <Route path="/movie/:id" element={<Movie/>}></Route>
          <Route path="/ticknumber" element={<Ticknumber/>}></Route>
        </Routes>
      </ThemeProvider>
    </OrderContext.Provider>
  );
}

export default App;
