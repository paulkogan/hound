import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect,   Link, } from 'react-router-dom';
//import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EnergizersList from '../EnergizersList';
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

              <Router>
                                <Navigation />

                        <ul>
                                <li><Link to='/list'> List </Link></li>
                                <li><Link to='/new'> Add New </Link></li>
                        </ul>

                        <Route  path="/list"  component = {EnergizersList} />
                        <Route  path="/new"  component = {showDate} />




              </Router>
          </div>

          )
     } //render
};

export default Root;

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
