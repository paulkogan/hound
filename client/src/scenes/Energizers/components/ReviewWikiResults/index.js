import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
//import MomentUtils from '@date-io/moment';
import * as cx from 'classnames'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
  input: {
    margin: '0.5rem 0',
    paddingRight: '5px'
  },
fieldSmall: {
    fontSize: '12px',
    lineHeight: '14px',
    color: '#606A74',
    fontWeight: 'normal',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'left',
    contentAlign: 'left'
  },


  fieldMed: {
      fontSize: '12px',
      lineHeight: '14px',
      color: '#606A74',
      fontWeight: 'normal',
      maxWidth: '900px',
      margin: 'auto',
      textAlign: 'left',
      contentAlign: 'left',
      marginLeft: '208px'

    },


  fieldBig: {
      fontSize: '12px',
      lineHeight: '14px',
      textTransform: 'uppercase',
      color: '#606A74',
      fontWeight: 'normal',
      maxWidth: '800px',
      margin: 'auto'
    },

    parentCont: {
      display: 'inline-block',
      width: '100%',
      border: '1px solid blue',
      padding: '10px'

    },

    textBlockLeft: {
      float: 'left',
      textAlign: 'left',
      contentAlign: 'left',
      marginRight: '30px'
    },


    textBlockRight: {
      float: 'right',
      textAlign: 'left',
      contentAlign: 'left',
      marginRight: '20px'
    },



});


//  display: 'flex'
// float: 'left',
// clear: 'none',
// margin: 'auto',


class ReviewWikiResults extends Component {
  constructor(props) {
    super(props);

    const { energizer:enerObj, wikiResults} = this.props;
    console.log("In Review Wiki: "+JSON.stringify(enerObj,null,4) )
    const { energizer } = enerObj;

    this.state = {
      firstName: energizer.firstName || '',
      lastName: energizer.lastName || '',
      occupation: energizer.occupation || '',
      wikiPage: energizer.wikiPage || '',
      homeTown: energizer.homeTown || '',
      homeState: energizer.homeState || '',
      bornTown: wikiResults.bornTown || wikiResults.birthPlaceTown || wikiResults.originTown || energizer.bornTown  || '',
      bornState: wikiResults.bornState || wikiResults.birthPlaceState || wikiResults.originState || energizer.bornState || '',
      currentTown: energizer.currentTown|| '',
      currentState: energizer.currentState|| '',
      education: wikiResults.almaMater || wikiResults.education || energizer.education || '',
      bio: wikiResults.bio || energizer.bio || '',
      earlyLife: wikiResults.earlyLife || energizer.earlyLife || ''
    };
  }

  onSubmit = () => {
    const { energizer, updateEnergizer } = this.props;


      updateEnergizer({
        id: energizer.energizer.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        occupation: this.state.occupation,
        wikiPage: this.state.wikiPage,
        homeTown: this.state.homeTown,
        homeState: this.state.homeState,
        bornTown: this.state.bornTown,
        bornState: this.state.bornState,
        currentTown: this.state.currentTown,
        currentState: this.state.currentState,
        bio: this.state.bio,
        earlyLife: this.state.earlyLife,
        education: this.state.education,
      })

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
    const { classes, onClose, wikiResults, energizer:enerObj } = this.props;
    const { energizer } = enerObj;


    return (
      <Dialog open fullWidth onClose={ onClose } maxWidth={ 'lg' }>
          <DialogTitle>
                Review Wiki Results
         </DialogTitle>


    <ValidatorForm ref="form" onSubmit={ this.onSubmit }>
      <DialogContent>

     <div className = { cx(classes.parentCont) }>
          <div className = { cx(classes.textBlockLeft) }>
                    <div>
                       <b>Current Information:</b>
                    </div>
                    <div>
                       Name:  { energizer.firstName } { energizer.lastName }
                    </div>
                    <div>
                       Occupation:   { energizer.occupation}
                    </div>
                    <div>
                       Wiki Page:    <a href = {energizer.wikiPage} target="_blank">{energizer.wikiPage}</a>
                    </div>
                    <div>
                       BornTown:   {energizer.bornTown}, {energizer.bornState}
                    </div>
                    <div>
                       HomeTown:   {energizer.homeTown}, {energizer.homeState}
                    </div>
                    <div>
                       CurrentTown:   {energizer.currentTown}, {energizer.currentState}
                    </div>
                    <div>
                       Education:   {energizer.education}
                    </div>
          </div>


            <div className = { cx(classes.textBlockRight) }>
                  <div>
                     <b>Found on WikiPedia:</b>
                  </div>
                  <div>
                         Born: { wikiResults.bornTown }, { wikiResults.bornState }
                  </div>

                  <div>
                         Birthplace: { wikiResults.birthPlaceTown }, { wikiResults.birthPlaceState }
                  </div>
                  <div>
                         Origin: { wikiResults.originTown }, { wikiResults.originState }
                  </div>

                  <div>
                         Education: { wikiResults.education }
                  </div>
                  <div>
                         Alma Mater: { wikiResults.almaMater}
                  </div>
            </div>


     </div>



        <div className={ cx(classes.fieldSmall) } >
            <TextValidator
              label="Born Town (can edit)"
              value={ this.state.bornTown}
              variant="outlined"
              name="bornTown"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />

            <TextValidator
              label="Born State (can edit)"
              value={ this.state.bornState}
              variant="outlined"
              name="bornState"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />
        </div>

         <div className={ cx(classes.fieldSmall) } >
            <TextValidator
              label="Home Town (can edit)"
              value={ this.state.homeTown}
              variant="outlined"
              name="homeTown"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />


            <TextValidator
              label="Home State (can edit)"
              value={ this.state.homeState}
              variant="outlined"
              name="homeState"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />
       </div>


       <div className={ cx(classes.fieldSmall) } >
          <TextValidator
            label="Current Town (can edit)"
            value={ this.state.currentTown}
            variant="outlined"
            name="currentTown"
            onChange={this.onChange}
            className={ cx(classes.input) }
          />


          <TextValidator
            label="Current State (can edit)"
            value={ this.state.currentState}
            variant="outlined"
            name="currentState"
            onChange={this.onChange}
            className={ cx(classes.input) }
          />
     </div>

     <div className={ cx(classes.fieldMed) } >
            <TextValidator
              label="Education"
              value={ this.state.education}
              variant="outlined"
              name="education"
              onChange={this.onChange}
              className={ cx(classes.input) }
            />
    </div>

            <TextValidator
              fullWidth
              label="Early Life"
              value={ this.state.earlyLife}
              variant="outlined"
              multiline
              rows="12"
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
              rows="12"
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

ReviewWikiResults.propTypes = {
  energizer: PropTypes.object,
  updateEnergizer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ReviewWikiResults);
