import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import Energizers from '../Energizers';
import Login from '../Login';
import Navigation from '../../components/Navigation';
//import { CurrentUserProvider } from 'contexts/CurrentUserContext';
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

    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      isLoading,
    } = this.state;

    return (
          <div>
             <SnackbarProvider maxSnack={3}>
              <Router>
                        <Navigation />

                        <Route  path="/" exact component = {Energizers} />
                        <Route  path="/new"  component = {showDate} />
                        <Route  path="/list"  component = {Energizers} />
                        <Route  path="/login"  component = {Login} />
              </Router>
            </SnackbarProvider>
          </div>

          )
     } //render
};

export default Root;

//
// <ul>
//         <li><Link to='/'> List </Link></li>
//         <li><Link to='/new'> Add New </Link></li>
// </ul>


//                 <Route path={url} exact component={Home} />
//
// fetchCurrentUser = async () => {
//   try {
//     const currentUser = await api.fetchCurrentUser();
//     this.setState({ currentUser });
//     return currentUser;
//   } catch {
//     // noop
//   }
// }
//
// fetchPatientData = async ({ currentUser }) => {
//   try {
//     const currentPatient = await api.fetchPatient({ userId: currentUser.id });
//     this.setState({ currentPatient });
//   } catch {
//     // noop
//   }
// }
//
// fetchAdminData = async ({ currentUser }) => {
//   try {
//     const currentProvider = await api.fetchProvider({ userId: currentUser.id });
//     const currentPractice = await api.fetchPractice({ providerId: currentProvider.id });
//     const currentUserIsAdmin = Boolean(currentProvider);
//     this.setState({ currentProvider, currentPractice, currentUserIsAdmin });
//   } catch {
//     // noop
//   }
// }
//
// onLogout = async () => {
//   try {
//     await api.logoutUser();
//   } finally {
//     window.location.href = '/';
//   }
// }
//
//
//
// <>
// <PublicNavigation
//   currentUser={currentUser}
//   currentUserIsAdmin={currentUserIsAdmin}
//   onLogout={this.onLogout}
// />
// <Route path={url} exact component={Home} />
// </>
//
//
// </SnackbarProvider>
// </MuiThemeProvider>
// </CurrentProviderProvider>
// </CurrentPatientProvider>
// </CurrentUserProvider>
