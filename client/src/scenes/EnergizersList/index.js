import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames';
import ExpansionList from './components/ExpansionList';
import * as api from '../../services/api';
import { TextField } from '@material-ui/core';

class EnergizersList extends Component {

  state = {
    isLoading: true,
    energizerUnderEdit : {},
    openEditModal:false,
    energizers: []
  }

  async componentDidMount() {

      this.setState({ isLoading: true });
      const energizers = await api.fetchEnergizers();
      this.setState({ isLoading: false,
                      energizers
      });

  }
onEditEnergizer = ({ energizer }) => {
    this.setState({ energizerUnderEdit: energizer , openEditModal: true });
  };

handleChange = (e) => {
      console.log (e.value)

}

onDialogClose = () => {
  this.setState({
    openEditModal: false,
    patientUnderEdit: {},
  });
};



  render() {
    const { classes } = this.props;
    const { energizers } = this.state;

    return (
      <div className={cx(classes.root)}>
        <header>
          <h1 className={cx(classes.title)}>Energizers</h1>
        </header>

        <div>

          <ExpansionList
            energizers={energizers}
            onEditEnergizer={this.onEditEnergizer}          
          />

        </div>


      </div>
    );
  }
}

const styles = () => ({
  root: {
    padding: '24px 30px',
  },
  title: {
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '19px',
    color: '#1C1C1C',
    paddingBottom: '24px',
  },
  patientTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 'normal',
    paddingRight: '5px',
  },
  patientSubTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 'normal',
    color: '#494949',
    textTransform: 'capitalize',
  },
  panelDetails: {
    borderTop: '1px solid rgba(96,106,116,0.4)',
    padding: '24px 0',
  },
  panelDetailsSection: {
    paddingBottom: '34px',
  },
  panelDetailsSectionTitle: {
    fontSize: '12px',
    lineHeight: '14px',
    textTransform: 'uppercase',
    color: '#606A74',
    fontWeight: 'normal',
  },
  panelDetailsSectionText: {
    color: '#1C2B39',
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '19px',
  },
  panelActions: {
    padding: '24px',
    borderTop: '1px solid rgba(96,106,116,0.4)',
  },
  actions: {
    textAlign: 'right',
    paddingTop: '24px',
  },
});

export default withStyles(styles)(EnergizersList);
