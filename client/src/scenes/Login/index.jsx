import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
//import CardForm from 'components/CardForm';
import * as api from '../../services/api';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = async () => {
    const { history } = this.props;
    const { setCurrentUser } = this.context;
    const { email, password } = this.state;
    let currentUser
    console.log("EMAIL",email)
    // await api.loginUser({ email, password });
    //const currentUser = await api.fetchCurrentUser();
    if (password === 'zzz') {
      currentUser = {email}    
    } else {
       currentUser = {email: "not logged in"}    
    }  
     setCurrentUser(currentUser);
     history.push("/");
  }

  redirect = () => {
    const { location = {} } = this.props;
    const queryParams = queryString.parse(location.search);
    return queryParams.redirect || '/';
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.outerContainer} >
        
        <div className={classes.innerContainer} >
        {"Please login: "}
            <FormControl className={classes.formControl} margin="normal">
              <TextField
                variant="outlined"
                value={this.state.email}
                onChange={this.onEmailChange}
                className={ classes.input }
              />
            </FormControl>

            <FormControl className={classes.formControl} margin={'normal'}>
              <TextField
                type="password"
                variant="outlined"
                value={this.state.password}
                onChange={this.onPasswordChange}
                className={ classes.input }
              />
            </FormControl>
            <Button
                      color="primary"
                      variant="contained"
                      onClick={this.handleSubmit}
                    >
                      Login
            </Button>
        </div>
        


      </div>
    );
  }
};

const styles = () => ({

  outerContainer: {
    justifyContent: 'center',
    border: '0px solid orange',
    display: 'flex'
  },

  innerContainer: {
    border: '0px solid red',
    display: 'block',
    width: '70%',
    marginLeft: '20px', 
    marginTop: '30px', 
  },

  formControl: {
    display: 'block',
    border: '0px solid green',

    width: '90%',
  },
  metaActions: {
    marginTop: '25px',
    color: 'white',
    textAlign: 'center',
  },
  metaAction: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    padding: '5px',
    fontSize: '14px',
    background: 'white',  
    color: 'purple',  
    border: '0px solid red', 
  }

});

Login.contextType = CurrentUserContext;

export default withStyles(styles)(Login);
