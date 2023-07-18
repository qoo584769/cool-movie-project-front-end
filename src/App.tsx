import React, { useReducer,useState,useEffect } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { OrderContext, OrderInitialState, OrderReducer } from './store';
import { ThemeProvider } from 'styled-components';
import { Header } from './components';
import { Footer } from './components';
import './assets/scss/all.scss';
import routes from './routes';
import axios from 'axios';
import { MovieContext } from './store/movie';
// import { GlobalStyle } from './assets/GlobalStyle';
const GetMovieData= ({children}:any) => {
  const url = process.env.REACT_APP_REMOTE_RENDER_URL
  
  const [data, setData] = useState([]);
  useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{

      // await axios.get('http://127.0.0.1:3000/api/movie')
      await axios.get(`${url}/api/movie`)
      .then(res => {
        setData(res.data.data.data)
      })
      .catch(error => console.log(error));
    })();
  }, []);

  return (
    // 使用 MovieContext.Provider 包裹整個應用程式以使所有子元件都可以訪問到該 Context 物件提供的值
    <MovieContext.Provider value={data}>
      {children}
    </MovieContext.Provider> 
  );
}

function App() {
  const reducer = useReducer(OrderReducer, OrderInitialState);
  const routing = useRoutes(routes);
  const url = 'https://crazymovie.onrender.com'
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
      console.log(url);
      
      // await axios.get('http://127.0.0.1:3000/api/movie')
      await axios.get(`${url}/api/movie`)
      .then(res => {
        setData(res.data.data.data)
      })
      .catch(error => console.log(error));
    })();
  }, []);
  return (
    <OrderContext.Provider value={reducer}>
      <MovieContext.Provider value={data}>
        <ThemeProvider theme={{}}>
          <Header />
          {routing}
          <Footer />
        </ThemeProvider>
      </MovieContext.Provider>
    </OrderContext.Provider>
  );
}

export default App;
