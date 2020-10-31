import React, { Component } from 'react'
import { Container, Form, Button, Alert} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import {signUp} from '../actions/authAction'

import './SignUp.css'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    signUp: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  hasError(key) {
    return this.state.errors[key]
  }

  handleSubmit(e) {
    e.preventDefault()
    //VALIDATE
    var errors = []

    //name
    if (this.state.name === '') {
      errors.name="Invalid name"
    }

    //email
    const expression = /\S+@\S+/
    var validEmail = expression.test(String(this.state.email).toLowerCase())

    if (!validEmail) {
      errors.email = 'Invalid email';
    }

    //password
    if (
      this.state.password === '' ||
      this.state.confirmPassword === '' ||
      this.state.password !== this.state.confirmPassword
    ) {
      errors.pass = "Invalid password";
    }

    this.setState({
      errors: errors,
    })

    if (errors.length > 0) {
      return false
    } else {
      this.props.signUp({...this.state}, this.props.history);
    }
  }

  render() {
    let alert;
        if(this.props.errors.error){
            alert = <Alert key='1' variant='danger'>
                {this.props.errors.error}
            </Alert>
        }
    return (
      <div className='signup-wrapper'>
        <Container>
          <h3>SignUp Form</h3>
          <Form>
            <Form.Group>
              <Form.Label>User Name:</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter username'
                value={this.state.name}
                onChange={this.handleChange}
              />
              <div
                className={this.hasError('name') ? 'inline-errormsg' : 'hidden'}
              >
                Please enter name
              </div>
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter email address'
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div
                className={
                  this.hasError('email') ? 'inline-errormsg' : 'hidden'
                }
              >
                Please enter valid email
              </div>
            </Form.Group>
            <Form.Group controlId='formBasicPassword1'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter Password'
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div
                className={this.hasError('pass') ? 'inline-errormsg' : 'hidden'}
              >
                Please enter password or match
              </div>
            </Form.Group>
            <Form.Group controlId='formBasicPassword2'>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                placeholder='Repeat Password'
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              <div
                className={this.hasError('pass') ? 'inline-errormsg' : 'hidden'}
              >
                Please enter password or match
              </div>
            </Form.Group>
            {alert}
            <Button variant='primary' onClick={this.handleSubmit}>
              SignUp
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {signUp})(SignUp);