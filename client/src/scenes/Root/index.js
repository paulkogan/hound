import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import Energizers from '../Energizers';
import Login from '../Login';
import Navigation from '../../components/Navigation';
import {CurrentUserProvider} from '../../contexts/CurrentUserContext.jsx';
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

//simple component
const showDate = () => {
    let date = new Date();
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
  return (

       <div> Time: {hours}:{minutes}</div>
  )

}


class Root extends Component {

  state = {
    isLoading: true,
    currentUser: {},
  }

  async componentDidMount() {
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
      const currentUser = {email: "root@root.com"}
      this.setState({ currentUser });
    } catch {
      // no-op; not being logged in is not an error state
    }
  }




  render() {
    const {currentUser} = this.state;      

    return (
        <div>
          <CurrentUserProvider value={currentUser}>
             <SnackbarProvider maxSnack={3}>
              <Router>
                        <Navigation />
                        <Route  path="/" exact component = {Energizers} />
                        <Route  path="/new"  component = {showDate} />
                        <Route  path="/list"  component = {Energizers} />
                        <Route  path="/login"  component = {Login} />
              </Router>
            </SnackbarProvider>
          </CurrentUserProvider>
        </div>

          )
     } //render
};

export default Root;

//</MuiThemeProvider>