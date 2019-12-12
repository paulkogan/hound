import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import Energizers from '../Energizers';
import Cookies from 'universal-cookie';
import Login from '../Login';
import Navigation from '../../components/Navigation';
import CurrentUserContext, {CurrentUserProvider} from '../../contexts/CurrentUserContext.jsx';
//import * as api from 'services/api';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#505D68',
      light: '#879bad',
      dark: '#25303a'
    },
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'white',
      },
    },
    input: {
      color: 'red'
    }
  },
});


class Root extends Component {

  state = {
    isLoading: true,
    currentUser: {},
  }

  async componentWillMount() {
    try {
      this.setState({ isLoading: true });
      //const currentUser = await this.fetchCurrentUser();
      this.attemptToFetchCurrentUser();

    } finally {
      this.setState({ isLoading: false });
    }
  }

  attemptToFetchCurrentUser = async () => {
    try {
      //const currentUser = await api.fetchCurrentUser();
      const currentUser = {email: null}

      this.setState({ currentUser });

    } catch (err) {
        console.log("ERROR IN ROOT"+err)
      // no-op; not being logged in is not an error state
    }
  }


  handleLogout = () => {
    console.log("logout")
    const cookies = new Cookies();
    cookies.set('userEmail', "", { path: '/' }); 
    window.location.reload();  
  }

  render() {
    const {currentUser} = this.state;      
    console.log("IN ROOT ", currentUser.email)
    //OK value DOES work!
    return (
        <div>
          <CurrentUserProvider value={currentUser}>
             <SnackbarProvider maxSnack={3}>
              <Router>
                        <Navigation handleLogout = {this.handleLogout}/>
                        <Route  path="/" exact component = {Energizers} />
                        <Route  path="/list"  component = {Energizers} />
                        <Route  path="/login"  component = {Login} />
              </Router>
            </SnackbarProvider>
          </CurrentUserProvider>
        </div>

          )
     } //render
};

//Root.contextType = CurrentUserContext;

export default Root;

//</MuiThemeProvider>