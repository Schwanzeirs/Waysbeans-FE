import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import Landing from './pages/landing';
import Main from './pages/customer/main';
import Detail from './pages/customer/detail-product';
import card from './assets/dummy/card'
import Cart from './pages/customer/cart';
import Profile from './pages/customer/profile';
import Transaction from './pages/admin/income-transaction';
import List from './pages/admin/list-product';
import Add from './pages/admin/add-product';
import Update from './pages/admin/update-product';
import AddProfile from './pages/customer/add-profile';
import { Usercontext } from './assets/context/user-context';
import { API, setAuthToken } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  let navigate = useNavigate();
  const [state, dispatch] = useContext(Usercontext)
  console.log(state);

  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }


    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/admin')
      } else if (state.user.status === 'customer') {
        navigate('/main');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        });
      }

      console.log(response.data);

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/main' element={<Main />} />
      <Route exact path='/detail/:id' element={<Detail data={card} />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route exact path='/admin' element={<Transaction />} />
      <Route exact path='/list-product' element={<List />} />
      <Route exact path='/add-product' element={<Add />} />
      <Route exact path='/update-product' element={<Update />} />
      <Route exact path='/add-profile' element={<AddProfile />} />
    </Routes>
  );
}

export default App;
