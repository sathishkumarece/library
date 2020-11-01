import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logOut} from '../actions/authAction';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'

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
        <Link to='/allbooks'>AllBooks</Link>
        <Link to='/mybooks'>MyBooks</Link>
        <Link
            to=""
            onClick={this.onLogoutClick.bind(this)}
          >LogOut</Link>
      </React.Fragment>
    }else{
      fragment = <React.Fragment>
        <Link to='/login'>LogIn</Link>
            <Link to='/signup'>SignUp</Link>
      </React.Fragment>
    }

    return (
      <div className='navbar-wrapper'>
        <Navbar fixed='top' bg='primary' variant='dark'>
          <Navbar.Brand href='/'>Library.</Navbar.Brand>
          <Nav className='ml-auto link-wrapper'>
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