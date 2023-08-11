import React, { useReducer, useContext, useState, useEffect} from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { OrderContext, OrderInitialState, OrderReducer } from './store';
import { loginContext, isLoginContext, isLoginInitialState, isLoginReducer } from './store/isLogin';
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
  const loginReducer = useReducer(isLoginReducer, isLoginInitialState);
  const routing = useRoutes(routes);
  const [data, setData] = useState<any>([]);
  const [isLogin, setIsLogin] = useState(false)
  const url = process.env.REACT_APP_REMOTE_URL
  useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
      await axios.get(`${url}/api/movie`)
      .then(res => {
        setData(res.data.data.data)
      })
      .catch(error => console.log(error));
    })();
  }, []);
  useEffect(() => {
  }, [isLogin]);
  return (
    <OrderContext.Provider value={reducer}>
      <isLoginContext.Provider value={loginReducer}>
        <MovieContext.Provider value={data}>
        <loginContext.Provider value = {{isLogin,setIsLogin}}>

          <ThemeProvider theme={{}}>
            <Header />
            {routing}
            <Footer />
          </ThemeProvider>

        </loginContext.Provider>
        </MovieContext.Provider>
      </isLoginContext.Provider>
    </OrderContext.Provider>
  );
}

export default App;
