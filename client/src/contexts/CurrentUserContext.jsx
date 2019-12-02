import React, { Component } from 'react';

const CurrentUserContext = React.createContext({});

export class CurrentUserProvider extends Component {
  
  state = {
    currentUser: null,
  }

  componentWillMount() {
    const { value: currentUser } = this.props;
    this.setCurrentUser(currentUser);
  }

  componentDidUpdate({ value: oldCurrentUser }) {
    const { value: currentUser } = this.props;

    if (currentUser.id !== oldCurrentUser.id) {
      this.setCurrentUser(currentUser);
    }
  }

  setCurrentUser = (currentUser) => {
      this.setState((state) => ({
        ...state,
        currentUser,
      }));
  }

  render() {
    const { children } = this.props;
    const { currentUser } = this.state;

    return (
      <CurrentUserContext.Provider value={{
        currentUser,
        setCurrentUser: this.setCurrentUser,
      }}>
        { children }
      </CurrentUserContext.Provider>
    );
  }
};

export const CurrentUserConsumer = CurrentUserContext.Consumer;
export default CurrentUserContext; //export this, not the class
