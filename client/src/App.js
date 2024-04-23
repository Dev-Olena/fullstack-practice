import React, {useEffect, useState} from "react";
import {unstable_HistoryRouter as Router, Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
// import UserContext from './contexts/UserContext';
import history from './history';
import './reset.css';
// import {getUserData} from './api';
import { getUserDataRequest } from "./actions/actionCreators";


function App(props) {
  // const [user, setUser] = useState(null);
  
    useEffect(() => {
      if(!props.user && localStorage.getItem('accessToken')) {
      //    // ідемо за юзером.
      // // якщо отримуємо її - кладемо у стейт    
      // console.log('getUserData')
      // getUserData()
      // .then(({data: {data}}) => {
      //     // у нас є в пропсах функція dispatch
      //     const action = {
      //       type: 'GET_USER_DATA',
      //       payload: data
      //     }
      //     props.dispatch(action)
      // })
      // .catch(error => {
      //   const action = {
      //     type: 'USER_DATA_ERROR_FETCHING',
      //     error
      //   }
      //   props.dispatch(action)
      // })
      props.getUserDataRequest()
      }
    }, []);

    useEffect (() => {
      if(props.notification) {
          const {body, createdAt, type} = props.notification;
          toast[type](body, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
          });
      } 
     
    }, [props.notification]);

  return (
    <>
      <Router history={history}>
          <Routes>
            <Route path='/' exact element={<Home />}/>
            <Route path='/messenger' element={<Dashboard />} />
          </Routes>
      </Router>
      <ToastContainer />
      {props.error && <p>Ooops, something goes wrong</p>}
    </>
  );
}

const mapStateToProps = ({user, error, notification}) => ({user, error, notification});
const mapDispatchToProps = {
  getUserDataRequest
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
