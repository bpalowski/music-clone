import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { stringTrac } from '../state/actions/index';

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.stringTrac(this.input.value)
    this.input.value = ""
  }
  render() {
    return (
      <div className="form-conatiner">
        <Form
          noValidate
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <Form.Group controlId="formBasicMusicSearch">
            <Form.Control
              className="input-Filed"
              type="text"
              placeholder="Music Search"
              ref={(ref) => { this.input = ref }}
              required />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = { stringTrac };
export default connect(null, mapDispatchToProps)(InputComponent)
