import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logOut} from '../actions/authAction';
import { Navbar, Nav } from 'react-bootstrap';

import './AppNavBar.css'

class AppNavBar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logOut();
  }

  render() {
    
    let fragment;
    if(this.props.auth.isAuthenticated){
      fragment = <React.Fragment>
        <Nav.Link href='/allbooks'>AllBooks</Nav.Link>
        <Nav.Link href='/mybooks'>MyBooks</Nav.Link>
        <Nav.Link
            href=""
            onClick={this.onLogoutClick.bind(this)}
          >LogOut</Nav.Link>
      </React.Fragment>
    }else{
      fragment = <React.Fragment>
        <Nav.Link href='/login'>LogIn</Nav.Link>
            <Nav.Link href='/signup'>SignUp</Nav.Link>
      </React.Fragment>
    }

    return (
      <div className='navbar-wrapper'>
        <Navbar fixed='top' bg='primary' variant='dark'>
          <Navbar.Brand href='/'>Library.</Navbar.Brand>
          <Nav className='ml-auto'>
            {fragment}
          </Nav>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {logOut})(AppNavBar)