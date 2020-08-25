import React from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import axios from 'axios'

const NavComponent = () => {
  const logout = async () => {
    console.log("hello")
    await axios.get('api/logout')
      .then(res => {
        window.location.reload(false);
      }).catch(error => console.log(error))
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="nav-bar">
        <Navbar.Brand style={{ color: "dodgerblue" }}>MusicMock</Navbar.Brand>
        <Navbar.Collapse className="mr-auto justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/musicmock">Music</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link> */}
            <Nav.Link onClick={logout} >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavComponent