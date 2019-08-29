import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

const Navigation = (classes) => {
  //const { id: currentUserId, name: currentUserName } = currentUser;
  //const currentUserExists = Boolean(currentUserId);
const houndVersion = process.env.REACT_APP_VERSION
//const { classes } = this.props;
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
      </Toolbar>
    </AppBar>
  );
};

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
