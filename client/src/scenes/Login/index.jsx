import React, { Component } from 'react';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
//import CardForm from 'components/CardForm';
import * as api from '../../services/api';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }


  async componentDidMount() {
    const { history } = this.props;

    const cookies = new Cookies();
    const cookieUser = cookies.get('userEmail') || ""; 

    //if (!currentUser.email) {
    if (cookieUser==="") {
      history.push('/login');
      return;
    }
    this.setState({ 
      cookieUser:cookieUser
    });
  }

  
  handleSubmit = async () => {
    const { history } = this.props;
    const { setCurrentUser } = this.context;
    const { email, password } = this.state;
    const cookies = new Cookies();
    const localPass = await process.env.REACT_APP_LOCAL_PASS
    console.log("LOCAL PASS", localPass)
  
    let currentUser
    // await api.loginUser({ email, password });
    //const currentUser = await api.fetchCurrentUser();
    if (password === localPass) {
      currentUser = {email}  
      //1 minute * 60 min * 6 = 6 hours
      cookies.set('userEmail', email, { path: '/',  expires: new Date(Date.now()+60000*60*6)} );
      this.props.enqueueSnackbar('Welcome to Hound!')     
    } else {
       currentUser = {email: ""} 
       cookies.set('userEmail', "", { path: '/' });
       this.props.enqueueSnackbar('Bad Login')     
    }  
  
     setCurrentUser(currentUser);
     history.push("/");
     window.location.reload();  
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

export default withSnackbar(withStyles(styles)(Login));


{/* <div>
"from Cookie" {JSON.stringify(this.state.cookieUser)}
</div> */}