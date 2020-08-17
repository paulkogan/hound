import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Cookies from 'universal-cookie';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';

import './Navigation.css';

class Navigation extends Component {

  state = {
    cookieUser: null
  }
 
  async componentDidMount() { 
      const cookies = new Cookies();
      let cookieUser = cookies.get('userEmail'); 
      if (cookieUser == "") cookieUser = null; 
      this.setState({ 
        cookieUser
      });
  }

render () {
  const { cookieUser } = this.state;

  const houndVersion = process.env.REACT_APP_VERSION

  return (
  
    <AppBar position="sticky" className="navigation">
      <Toolbar className="toolbar">
          <Link className="hound-logo" component={RouterLink} to="/">
              <img width="65" src={"./htp_logo.jpg"}/>
          </Link>
                <div className="hound-head">
                      Energizer-Hound
                </div>


            <div className='version'>
                  <b>ver. {houndVersion}</b>                
            </div>

          {cookieUser && (
            <div>
                <Button
                    className= 'actionButton'
                    onClick={this.props.handleLogout}
                    variant="contained"
                    color="primary"
                  >
                    Logout
                  </Button>
            </div>  
          )}


      </Toolbar>
    </AppBar>
  );
};

} 


export default Navigation;


