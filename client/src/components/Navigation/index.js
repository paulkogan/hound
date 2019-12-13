import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Cookies from 'universal-cookie';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

class Navigation extends Component {

  state = {
    cookieUser: null
  }


   //const  = (classes) => {
  //const { id: currentUserId, name: currentUserName } = currentUser;
  //const currentUserExists = Boolean(currentUserId);
 
  async componentDidMount() { 
      const cookies = new Cookies();
      let cookieUser = cookies.get('userEmail'); 
      if (cookieUser == "") cookieUser = null; 
      this.setState({ 
        cookieUser
      });
  }

render () {
  const { classes } = this.props;
  const { cookieUser } = this.state;

  const houndVersion = process.env.REACT_APP_VERSION
  return (
  
    <AppBar position="sticky" className="navigation">
      <Toolbar className="toolbar">
          <Link className="home-link" component={RouterLink} to="/">
              <img width="65" src={"./htp_logo.jpg"}/>
          </Link>
                <div className="hound-head">
                      Energizer Hound
                </div>


            <div className="version">
                  <b>ver. {houndVersion}</b>                
            </div>



    
          {cookieUser && (
            <div>
                <Button
                    className={classes.actionButton}
                    color="primary"
                    variant="contained"
                    onClick={this.props.handleLogout}
                  >
                    Logout
                  </Button>
            </div>  
          )}


      </Toolbar>
    </AppBar>
  );
};

} //component
 const styles = () => ({

 })
//   appBar: {
//     boxShadow: '2px',
//   },
//   selectWrapper: {
//     alignItems: 'left',
//     position: 'relative',
//     right: '1rem',
//   },
//   settingsMenuButton: {
//     color: 'white',
//   },
//   toolbar: {
//     paddingLeft: '8rem',
//     paddingRight: '18rem',
//     marginRight: '10px',
//     height: '550px',
//     display: 'flex',
//     border: '2px solid red',
//   },
//   version: {
//     paddingLeft: '18rem',
//     paddingRight: '18rem',
//     marginRight: '40px',
//     display: 'flex',
//     border: '2px solid red',
//   },
//   menuItem: {
//     padding: '0.5rem 2.5rem',
//   },
//   name: {
//     fontStyle: 'italic',
//   },
//   linkButton: {
//     padding: '10px 30px',
//     marginLeft: '20px',
//     width: '100px',
//     border: '1px solid #424B5A',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     '&:hover': {
//       textDecoration: 'none',
//     },
//   },
// });

export default withStyles(styles)(Navigation);

//    <img width="75" src={"../../static/htp_logo_logo.png"}/>


//        <div className={ cx(classes.version)}>

//   <div>
//     <span className={classes.name}>Hi {currentUserName}!</span>
//
//     {currentUserIsAdmin ? (
//       <Link
//         className={classes.linkButton}
//         component={RouterLink}
//         to="/admin"
//       >
//         <span>My Practice</span>
//       </Link>
//     ) : (
//       <Link
//         className={classes.linkButton}
//         component={RouterLink}
//         to="/patients"
//       >
//         <span>My Portal</span>
//       </Link>
//     )}
//
//     <span className={classes.linkButton} onClick={onLogout}>
//       Logout
//     </span>
//   </div>
// ) : (
//   <div>
//     <Link
//       className={classes.linkButton}
//       component={RouterLink}
//       to="/login"
//     >
//       <span className="name">Login/Sign Up</span>
//     </Link>
//   </div>
// )}




//{/* <div>
/* <RouterLink to="/login">
    <Button
        className={classes.actionButton}
        color="primary"
        variant="contained"
      >
        Login
      </Button>
  </RouterLink>
</div>   */
//) : ( */}