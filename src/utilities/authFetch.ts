import axios from 'axios';

const url = process.env.REACT_APP_REMOTE_URL
const authFetch = axios.create({
  baseURL: url,
});

// request 攔截封裝
authFetch.interceptors.request.use((config) => {
  const token = (localStorage.getItem("userToken")) ? (localStorage.getItem("userToken") || "") : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response 攔截封裝
authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    // console.log('authFetch_error => ', error)
    console.error(`API Error: ${message}`)
    if (error.response?.status === 401) {
      window.location.replace('/')
    }
    return Promise.reject(error);
  }
);

export { authFetch };