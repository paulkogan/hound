import React, { Component } from 'react';
//import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';


const styles = () => ({
  input: {
    margin: '0.5rem 0',
    padding: '5px'
  },
fieldSmall: {
    fontSize: '12px',
    lineHeight: '14px',
    color: '#606A74',
    fontWeight: 'normal',
    maxWidth: '80%',
    margin: '0px',
    padding: '0px',
    textAlign: 'left',
    contentAlign: 'left'
  },
  fieldBig: {
      fontSize: '12px',
      lineHeight: '14px',
      color: '#606A74',
      fontWeight: 'normal',
      maxWidth: '100%',
      margin: '0px',
    },

});

class EnergizerProfile extends Component {
  constructor(props) {
    super(props);

    const { energizer } = this.props;

    this.state = {
      firstName: energizer.firstName || '',
      lastName: energizer.lastName || '',
      wikiPage: energizer.wikiPage || '',
      homeTown: energizer.homeTown || '',
      homeState: energizer.homeState || '',
      bornTown: energizer.bornTown || '',
      bornState: energizer.bornState || '',
      currentTown : energizer.currentTown || '',
      currentState : energizer.currentState || '',
      earlyLife: energizer.earlyLife || '',
      playsWith: energizer.playsWith || '',
      ethnicity: energizer.ethnicity|| '',
      gender: energizer.gender || '',
      occupation: energizer.occupation || '',
      education: energizer.education || '',
      bio: energizer.bio || '',
    };
  }

  onSubmit = () => {
    const { energizer, createEnergizer, updateEnergizer } = this.props;

    this.isEmpty(energizer) ? (
      createEnergizer({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        occupation: this.state.occupation,
        wikiPage: this.state.wikiPage
      }))
      : (
      updateEnergizer({
        id: energizer.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        wikiPage: this.state.wikiPage,
        homeTown: this.state.homeTown,
        homeState: this.state.homeState,
        bornTown: this.state.bornTown,
        bornState: this.state.bornState,
        currentTown : this.state.currentTown || '',
        currentState : this.state.currentState || '',
        earlyLife: this.state.earlyLife || '',
        playsWith: this.state.playsWith || '',
        ethnicity: this.state.ethnicity|| '',
        gender: this.state.gender || '',
        occupation: this.state.occupation,
        education: this.state.education,
        bio: this.state.bio

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
      <Dialog open fullWidth onClose={ onClose } maxWidth={ 'lg' }>
          <DialogTitle>
            {this.isEmpty(this.props.energizer) ?
                "New Energizer - add * fields only" : "Update Energizer"}
         </DialogTitle>



        <ValidatorForm ref="form" onSubmit={ this.onSubmit }>
          <DialogContent>


        <div className={ cx(classes.fieldSmall) } >
            <TextValidator
              label="First Name *"
              value={ this.state.firstName }
              variant="outlined"
              name="firstName"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              label="Last Name *"
              value={ this.state.lastName }
              variant="outlined"
              name="lastName"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required'] }
              className={ cx(classes.input) }
            />

            <TextValidator
              label="Occupation *"
              value={ this.state.occupation}
              variant="outlined"
              name="occupation"
              onChange={this.onChange}
              validators={ ['required'] }
              errorMessages={ ['Required']}
              className={ cx(classes.input) }
            />

            <TextValidator
              label="Plays With (band/team)"
              value={ this.state.playsWith}
              variant="outlined"
              name="playsWith"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />


        </div>

        <div className={ cx(classes.fieldBig) } >
              <TextValidator
                fullWidth
                label="Wiki Page *"
                value={ this.state.wikiPage}
                variant="outlined"
                name="wikiPage"
                onChange={this.onChange}
              />
        </div>


            <div className={ cx(classes.fieldSmall) } >
              <TextValidator
                label="Born Town"
                value={ this.state.bornTown}
                variant="outlined"
                name="bornTown"
                onChange={this.onChange}
                className={ cx(classes.input) }
              />

              <TextValidator
                label="Born State"
                value={ this.state.bornState}
                variant="outlined"
                name="bornState"
                onChange={this.onChange}
                className={ cx(classes.input) }
              />
            </div>



            <div className={ cx(classes.fieldSmall) } >
              <TextValidator
                label="Home Town"
                value={ this.state.homeTown}
                variant="outlined"
                name="homeTown"
                onChange={this.onChange}
                className={ cx(classes.input) }
              />


              <TextValidator
                label="Home State"
                value={ this.state.homeState}
                variant="outlined"
                name="homeState"
                onChange={this.onChange}
                className={ cx(classes.input) }
              />
            </div>



            <div className={ cx(classes.fieldSmall) } >
              <TextValidator
                label="Current Town"
                value={ this.state.currentTown}
                variant="outlined"
                name="currentTown"
                onChange={this.onChange}
                className={ cx(classes.input) }
              />


              <TextValidator
                label="Current State"
                value={ this.state.currentState}
                variant="outlined"
                name="currentState"
                onChange={this.onChange}
                className={ cx(classes.input) }
              />
            </div>




            <TextValidator
              fullWidth
              label="Education"
              value={ this.state.education}
              variant="outlined"
              name="education"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Early Life"
              value={ this.state.earlyLife}
              variant="outlined"
              multiline
              rows="6"
              name="earlyLife"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />

            <TextValidator
              fullWidth
              label="Bio"
              value={ this.state.bio}
              variant="outlined"
              multiline
              rows="6"
              name="bio"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />


          </DialogContent>

          <DialogActions>
              <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
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
