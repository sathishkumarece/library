import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Form, Button, Alert} from 'react-bootstrap';

import {logIn} from '../actions/authAction'

import './LogIn.css'

class LogIn extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
          // if loged in, redirect to home / books:
          this.props.history.push('/');
        }
      }

      shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.auth.isAuthenticated) {
          // once logged in, redirect user to their books homepage
          this.props.history.push('/allbooks');
        }
    
        // if(nextProps.errors) {
        //   this.setState({errors: nextProps.errors});
        // }
        return true;
      }
      
    static propTypes = {
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    hasError(key){
        return this.state.errors[key];
    }

    handleSubmit(e){
        e.preventDefault();

            //VALIDATE
    var errors = {};

    //email
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(this.state.email).toLowerCase());

    if (!validEmail) {
      errors.email = 'Invalid email';
    }

    //password
    if (this.state.password === "") {
        errors.pass = "Invalid password";
    }

    this.setState({
      errors: errors
    });

    if (errors.length > 0) {
      return false;
    } else {
        this.props.logIn({...this.state})
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
            <div className='login-wrapper'>
                <Container>
                <h3>Login</h3>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter Email address" value={this.state.email} onChange={this.handleChange}/>
                            <div className={this.hasError('email')?'inline-errormsg':'hidden'}>Please enter valid email</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange}/>
                            <div className={this.hasError('pass')?'inline-errormsg':'hidden'}>Please enter password or match</div>
                        </Form.Group>
                        {alert}
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {logIn})(LogIn)