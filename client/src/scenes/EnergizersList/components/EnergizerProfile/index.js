import React, { Component } from 'react';
//import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
//import MomentUtils from '@date-io/moment';
import * as generator from 'generate-password'
import PropTypes from 'prop-types';


const styles = () => ({
  input: {
    margin: '0.5rem 0',
  },
});

class EnergizerProfile extends Component {
  constructor(props) {
    super(props);

    const { energizer } = this.props;

    this.state = {
      firstName: energizer.firstName || '',
      lastName: energizer.lastName || '',
      occupation: energizer.occupation || '',
      wikiPage: energizer.wikiPage || '',
      homeTown: energizer.homeTown || '',
      homeState: energizer.homeState || '',
    };
  }

  onSubmit = () => {
    const { energizer, createEnergizer, updateEnergizer } = this.props;

    this.isEmpty(energizer) ? (
      createEnergizer({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        occupation: this.state.occupation,
        wikiPage: this.state.wikiPage,
        homeTown: this.state.homeTown,
        homeState: this.state.homeState,
      }))
      : (
      updateEnergizer({
        id: energizer.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        occupation: this.state.occupation,
        wikiPage: this.state.wikiPage,
        homeTown: this.state.homeTown,
        homeState: this.state.homeState,
      }))

    this.props.onClose();
  }

  isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
  }

  onChange = e => {
    //console.log("On Change: name: ", e.target.name, "value:", e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    const { classes, onClose } = this.props;

    return (
      <Dialog open fullWidth onClose={ onClose } maxWidth={ 'sm' }>
          <DialogTitle>
            {this.isEmpty(this.props.energizer) ?
                "New Energizer" : "Update Energizer"}
         </DialogTitle>



        <ValidatorForm ref="form" onSubmit={ this.onSubmit }>
          <DialogContent>
            <TextValidator
              fullWidth
              label="First Name"
              value={ this.state.firstName }
              variant="outlined"
              name="firstName"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Last Name"
              value={ this.state.lastName }
              variant="outlined"
              name="lastName"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />



            <TextValidator
              fullWidth
              label="Occupation"
              value={ this.state.occupation}
              variant="outlined"
              name="occupation"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required']}
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Wiki Page"
              value={ this.state.wikiPage}
              variant="outlined"
              name="wikiPage"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Home Town"
              value={ this.state.homeTown}
              variant="outlined"
              name="homeTown"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />


            <TextValidator
              fullWidth
              label="Home State"
              value={ this.state.homeState}
              variant="outlined"
              name="homeState"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />



          </DialogContent>

          <DialogActions>
            <Button color="primary" variant="contained" type="submit">Save</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
};

EnergizerProfile.propTypes = {
  energizer: PropTypes.object,
  createEnergizer: PropTypes.func.isRequired,
  updateEnergizer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnergizerProfile);
