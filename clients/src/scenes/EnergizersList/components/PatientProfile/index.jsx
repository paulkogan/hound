import React, { Component } from 'react';
import moment from 'moment';
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
import MomentUtils from '@date-io/moment';
import * as generator from 'generate-password'
import PropTypes from 'prop-types';


const styles = () => ({
  input: {
    margin: '0.5rem 0',
  },
});

class PatientProfile extends Component {
  constructor(props) {
    super(props);

    const { patient } = this.props;

    this.state = {
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      email: patient.email || '',
      phone: patient.phone || '',
      gender: patient.gender || '',
      birthdate: moment(patient.birthdate).format() || new Date('January 1, 1990 00:00:00'),
    };
  }

  onSubmit = () => {
    const { patient, createPatient, updatePatient } = this.props;

    this.isEmpty(patient) ? (
      createPatient({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        birthdate: this.state.birthdate,
        password: generator.generate({length: 10, numbers: true}),
      }))
      : (
      updatePatient({
        id: patient.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        birthdate: this.state.birthdate,
      }))

    this.props.onClose();
  }

  isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
  }

  onFirstNameChange = (element) => {
    const firstName = element.target.value;
    this.setState({ firstName });
  }

  onLastNameChange = (element) => {
    const lastName = element.target.value;
    this.setState({ lastName });
  }

  onEmailChange = (element) => {
    const email = element.target.value;
    this.setState({ email });
  }

  onEmailChange = (element) => {
    const email = element.target.value;
    this.setState({ email });
  }

  onPhoneChange = (element) => {
    const phone = element.target.value;
    this.setState({ phone });
  }

  onGenderChange = (element) => {
    const gender = element.target.value;
    this.setState({ gender });
  }

  onBirthdateChange = (date) => {
    this.setState({ birthdate: moment.utc(date).format('MM/DD/YYYY') });
  }

  render() {
    const { classes, onClose } = this.props;

    return (
      <Dialog open fullWidth onClose={ onClose } maxWidth={ 'xs' }>
          <DialogTitle>
            {this.isEmpty(this.props.patient) ?
                "New Patient" : "Update Patient"}
         </DialogTitle>

        <ValidatorForm ref="form" onSubmit={ this.onSubmit }>
          <DialogContent>
            <TextValidator
              fullWidth
              label="First Name"
              value={ this.state.firstName }
              variant="outlined"
              onChange={ this.onFirstNameChange }
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Last Name"
              value={ this.state.lastName }
              variant="outlined"
              onChange={ this.onLastNameChange }
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Email"
              value={ this.state.email }
              variant="outlined"
              onChange={ this.onEmailChange }
              validators={ ['required', 'isEmail'] }
              errorMessages={ ['Required', 'email is not valid'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Phone Number"
              value={ this.state.phone }
              variant="outlined"
              onChange={ this.onPhoneChange }
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <FormControl component="fieldset" variant="filled" className={ cx(classes.input) }>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="Gender"
                name="gender"
                value={ this.state.gender }
                onChange={ this.onGenderChange }
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" variant="filled" className={ cx(classes.input) }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                  keyboard
                  disableFuture
                  format="MM/DD/YYYY"
                  value={ this.state.birthdate }
                  label="D.O.B."
                  onChange={ this.onBirthdateChange }
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button color="primary" variant="contained" type="submit">Save</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
};
PatientProfile.propTypes = {
  patient: PropTypes.object,
  createPatient: PropTypes.func.isRequired,
  updatePatient: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(PatientProfile);
