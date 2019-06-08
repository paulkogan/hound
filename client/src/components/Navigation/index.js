import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

const Navigation = ({history, classes, currentUser}) => {
  //const { id: currentUserId, name: currentUserName } = currentUser;
  //const currentUserExists = Boolean(currentUserId);

  return (
    <AppBar position="sticky" className="navigation">
      <Toolbar className="toolbar">
        <Link className="home-link" component={RouterLink} to="/">
          <h3 className="hound-head">Energizer Hound</h3>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const styles = () => ({
  appBar: {
    boxShadow: 'none',
  },
  selectWrapper: {
    alignItems: 'left',
    position: 'relative',
    right: '1rem',
  },
  settingsMenuButton: {
    color: 'white',
  },
  toolbar: {
    paddingLeft: '18rem',
    display: 'flex',
    position: 'relative',
  },
  menuItem: {
    padding: '0.5rem 2.5rem',
  },
  name: {
    fontStyle: 'italic',
  },
  linkButton: {
    padding: '10px 30px',
    marginLeft: '20px',
    width: '100px',
    border: '1px solid #424B5A',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

export default withStyles(styles)(Navigation);



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
