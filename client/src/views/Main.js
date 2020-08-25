import React, { } from 'react'
import { connect } from "react-redux";
import { setLogin, updateUser } from '../state/actions/index';
import axios from 'axios'
import socketIOClient from "socket.io-client";

import Login from './Login'


const Main = ({ updateUser, setLogin, authenticated }) => {

  const view = () => {
    if (!authenticated) {
      axios.get('api/loggedIn')
        .then(res => {
          if (Boolean(res.data)) {
            const socket = socketIOClient('https://musicmocker.herokuapp.com/');
            socket.emit("initial_data")
            socket.on("get_data", (data) => {
              updateUser(data)
              socket.emit("disconnect");
            });
            setLogin()
          }
        }).catch(error => {
          console.log(error)
        })
    }
    return <div className="main-conatiner">
      {<Login />}
    </div>
  }

  return view()
}



const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setLogin, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
