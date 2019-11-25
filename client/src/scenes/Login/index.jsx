import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

//import CurrentUserContext from 'contexts/CurrentUserContext';
//import CardForm from 'components/CardForm';
import * as api from '../../services/api';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = async (event) => {
    const { history } = this.props;
    const { setCurrentUser } = this.context;
    const { email, password } = this.state;

    // await api.loginUser({ email, password });
    // const currentUser = await api.fetchCurrentUser();
    // setCurrentUser(currentUser);
    // history.push(this.redirect());
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
      <div>

          <FormControl className={classes.formControl} margin="normal">
            <TextField
              autoFocus
              variant="outlined"
              label="Email"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
          </FormControl>

          <FormControl className={classes.formControl} margin={'normal'}>
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </FormControl>
      </div>
    );
  }
};

const styles = () => ({
  formControl: {
    display: 'block',
  },
  metaActions: {
    marginTop: '25px',
    color: 'white',
    textAlign: 'center',
  },
  metaAction: {
    display: 'block',
    marginBottom: '10px',
  }
});

//Login.contextType = CurrentUserContext;

export default withStyles(styles)(Login);
