import React from 'react'
import { connect } from "react-redux";
import NavComponent from './NavComponent'
import Jumbotron from 'react-bootstrap/esm/Jumbotron';

export const UserComponent = ({ data }) => {
  return (
    <div>
      <NavComponent />
      <div className="underConstruction">
        <h1><i class="fas fa-globe-europe"></i></h1>
        <Jumbotron style={{ background: 'yellow' }}>
          <h1>Currently being worked on</h1>
        </Jumbotron>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  data: state.userData['userData']
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
