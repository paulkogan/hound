import "./EnergizerProfile.css";
import React, { useState, useEffect, useContext } from "react";


//import moment from 'moment';
//import { withStyles } from '@material-ui/core/styles';
//import * as cx from 'classnames'
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
//import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ControlledInputField from './ControlledInputField.jsx';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


const EnergizerProfile  = (props) => {
    const {onClose, deleteEnergizer, createEnergizer, updateEnergizer} = props;
    const [energizer, setEnergizer] = useState( setInitialEnergizer(props.energizer) || {});

    
    const handleSubmit = () => {
        console.log("PROFILE FORM onSubmit : "+JSON.stringify(energizer ,null,4))
        isEmpty(props.energizer) ? createEnergizer(energizer)
        : updateEnergizer ({
            id: props.energizer.id,
        ...energizer
        })

        onClose();
    }

  const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
  }

  const handleChange = e => {
    setEnergizer({
        ...energizer,
        [e.target.name]: e.target.value
    });
  };

  const handleBlur = e => {
    console.log("BLUR dataset ", e.target.dataset.label)  
    console.log("BLUR get Atrribute: ", e.target.getAttribute("data-label"))  
    setEnergizer({
        ...energizer,
        [e.target.name]: e.target.value
    });
  };


  const saveField = (fieldName, fieldValue) => {
    console.log("saveField got  ", fieldName, ": ", fieldValue)  
    setEnergizer({
        ...energizer,
        [fieldName]: fieldValue
    });
  };




    return (
        <div id="outerForm">
        <form onSubmit={handleSubmit} >
            <div id="header">
                <div id="headLine">
                        {isEmpty(props.energizer) ? "New Energizer" : "Update Energizer"}
                </div>
                <div id="actionButtons">   
                    <Button color="primary" variant="contained" onClick={() => deleteEnergizer(props.energizer)}>Delete</Button>
                    <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
                    <Button color="primary" variant="contained" type="submit">Save</Button>
                </div>
            </div>
            
            <div className="fieldsRow">

                <ControlledInputField
                    id="firstName"
                    label="First Name"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.firstName }
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />
        


                <ControlledInputField
                    id="middleName"
                    label="Middle Name"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.middleName }
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />
        
                <ControlledInputField
                    id="lastName"
                    label="Last Name *"
                    errorText=""
                    toValidate={["REQUIRED"]}
                    initialValue={ energizer.lastName }
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />

                <span className="timestamp">{props.energizer.createdAt ? props.energizer.createdAt.substring(0,10)+" "+props.energizer.createdAt.substring(12,16) : "no timestamp"} </span>
            </div>  

            <div className="fieldsRow">

                <ControlledInputField
                    id="occupation"
                    label="Occupation *"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.occupation }
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />

                <ControlledInputField
                    id="playsWith"
                    label="Band/Team/Show"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.playsWith }
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />

                <ControlledInputField
                    id="agencyRep"
                    label="Agency/Representation"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.agencyRep }
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />      

            </div>

            <div className="fieldsRow">

                <ControlledInputField
                    id="wikiPage"
                    label="Wiki Page"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.wikiPage}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />  

            </div>


            <div className="fieldsRow">
                <ControlledInputField
                    id="bornTown"
                    label="Born Town"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.bornTown}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />  

                <ControlledInputField
                    id="bornState"
                    label="Born State"
                    errorText="valid state"
                    toValidate={[]}
                    initialValue={ energizer.bornState}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />  

            </div>


            <div className="fieldsRow">
                <ControlledInputField
                    id="homeTown"
                    label="Home Town"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.homeTown}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />  

                <ControlledInputField
                    id="homeState"
                    label="Home State"
                    errorText="valid state"
                    toValidate={[]}
                    initialValue={ energizer.homeState}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />  

                <ControlledInputField
                    id="homeZipcode"
                    label="Home Zip"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.homeZipcode}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />                  
            </div>

            <div className="fieldsRow">
                <ControlledInputField
                    id="currentTown"
                    label="Current Town"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.currentTown}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />   

                <ControlledInputField
                    id="currentState"
                    label="Current State"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.currentState}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />  
             </div>


             <div className="fieldsRow">
                <ControlledInputField
                    id="education"
                    label="Education"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.education}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                /> 

                <ControlledInputField
                    id="highSchool"
                    label="High School"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.highSchool}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                /> 

                <ControlledInputField
                    id="birthday"
                    label="Birthday"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.birthday}
                    saveField = {saveField}
                    className="CIF"
                    isTextArea= { false }
                />
            </div>

            <div className="fieldsRow">
                <ControlledInputField
                        id="earlyLife"
                        label="Early Life"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.earlyLife}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { true }
                />    
            </div>

            <div className="fieldsRow">
                <ControlledInputField
                        id="bio"
                        label="Bio"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.bio}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { true }
                />    
            </div>


            <div className="fieldsRow">
                <ControlledInputField
                        id="imdbLink"
                        label="IMDB Link"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.imdbLink}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />    

                <ControlledInputField
                        id="social1"
                        label="Facebook"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.social1}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />         
        


                <ControlledInputField
                        id="social2"
                        label="Instagram"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.social2}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />    


                <ControlledInputField
                        id="social3"
                        label="Twitter"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.social3}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />   
            </div>

            <div className="fieldsRow">
                <ControlledInputField
                        id="solicitor"
                        label="Solicitor"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.solicitor}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />   


                <ControlledInputField
                        id="ethnicity"
                        label="Ethnicity"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.ethnicity}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />   


                <ControlledInputField
                        id="gender"
                        label="Gender"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.gender}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />   

                <ControlledInputField
                        id="stat1"
                        label="Key Stat"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.stat1}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { false }
                />   
             </div>


             <div className="fieldsRow">
                <ControlledInputField
                        id="notes"
                        label="Notes"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.notes}
                        saveField = {saveField}
                        className="CIF"
                        isTextArea= { true }
                /> 
             </div>

            </form>
        </div> 
    );
};

export default EnergizerProfile;


EnergizerProfile.propTypes = {
    energizer: PropTypes.object,
    createEnergizer: PropTypes.func.isRequired,
    updateEnergizer: PropTypes.func.isRequired,
    deleteEnergizer: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const setInitialEnergizer = (energizer) => {
    return  {
             firstName: energizer.firstName || '',
             middleName: energizer.middleName || '',
             lastName: energizer.lastName || '',
             wikiPage: energizer.wikiPage || '',
             homeTown: energizer.homeTown || '',
             homeState: energizer.homeState || '',
             bornTown: energizer.bornTown || '',
             bornState: energizer.bornState || '',
             currentTown : energizer.currentTown || '',
             currentState : energizer.currentState || '',
             earlyLife: energizer.earlyLife || '',
             bio: energizer.bio || '',
             playsWith: energizer.playsWith || '',
             agencyRep: energizer.agencyRep || '',
             ethnicity: energizer.ethnicity|| '',
             gender: energizer.gender || '',
             occupation: energizer.occupation || '',
             education: energizer.education || '',
             birthday: energizer.birthday || '',
             solicitor: energizer.solicitor || '',
             notes: energizer.notes || '',
             homeZipcode: energizer.homeZipcode || '',
             highSchool: energizer.highSchool || '',
             imdbLink: energizer.imdbLink || '',
             social1: energizer.social1 || '',
             social2: energizer.social2 || '',
             social3: energizer.social3 || '',
             stat1: energizer.stat1 || '' 
         }
 } 