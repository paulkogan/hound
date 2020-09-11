import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import  { createMuiTheme, ThemeProvider,  MuiThemeProvider}  from '@material-ui/core/styles';
import Energizers from '../Energizers/Energizers';
import Cookies from 'universal-cookie';
import Login from '../Login';
import Navigation from '../../components/Navigation.jsx';
import CurrentUserContext, {CurrentUserProvider} from '../../contexts/CurrentUserContext.jsx';
import {ControlledFormContext, ControlledFormProvider } from '../../contexts/ControlledFormContext.jsx';


//import * as api from 'services/api';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#30437A', //HTP blue
      light: '#909FAC', //HTP GREY
      dark: '#DC483A' //HTP red
    },
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
   
    return (
        <div>
          <CurrentUserProvider value={currentUser}>
             <SnackbarProvider maxSnack={3}>
             < MuiThemeProvider theme={theme}>
                <ControlledFormProvider>   
                  <Router>
                            
                            <Navigation handleLogout = {this.handleLogout}/>
                            <Route  path="/" exact component = {Energizers} />
                            <Route  path="/list"  component = {Energizers} />
                            <Route  path="/login"  component = {Login} />
                  </Router>
                </ControlledFormProvider> 
              </ MuiThemeProvider>
            </SnackbarProvider>
          </CurrentUserProvider>
        </div>

          )
    

     } 
};

//Root.contextType = CurrentUserContext;

export default Root;

{/* <ControlledFormContext> {/* write }
</ControlledFormContext> 

<ControlledFormContext.Provider value = {{"aa":123}}> {/* read }
</ControlledFormContext.Provider>
*/}

