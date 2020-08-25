import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHashParams } from '../utils/func'
import { withRouter, Redirect } from 'react-router-dom'
import { setLogin, updateUser } from '../state/actions/index';
import socketIOClient from "socket.io-client";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
    }
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      this.updateState()
    }
  }

  updateState() {
    const params = getHashParams()
    if (params) {
      const socket = socketIOClient('http://localhost:5000');
      socket.emit("initial_data")
      socket.on("get_data", (data) => {
        this.props.updateUser(data)
        socket.emit("disconnect");
      });
      this.props.setLogin()
    }

  }



  render() {
    if (this.props.authenticated === true) {
      return <Redirect to="/musicmock" />
    }
    return (
      <div className="loginContainer">
        <div className="webName">
          <h1 className="display-1">Music Mock</h1>
        </div>
        <div className="2-login-Container">

          <div className="jumboTronLogin">

            {/* <a href="http://localhost:5000/api/login/" id="login-anchor" >Login</a> */}
            <a href="https://musicmocker.herokuapp/api/login/" id="login-anchor" >Login</a>

          </div>

        </div >
      </div>

    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setLogin, updateUser };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))