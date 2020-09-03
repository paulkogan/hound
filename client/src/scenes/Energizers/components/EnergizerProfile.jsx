import "./EnergizerProfile.css";
import React, { useState, useEffect, useContext } from "react";
import ControlledInputField from './ControlledInputField.jsx';
import { ControlledFormContext } from "../../../contexts/ControlledFormContext";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


const EnergizerProfile  = (props) => {
    const {onClose, deleteEnergizer, createEnergizer, updateEnergizer} = props;
    const [energizer, setEnergizer] = useState( setInitialEnergizer(props.energizer) || {});
    const {formState, updateFormState, isFormValid } = useContext(ControlledFormContext);

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

  const saveField = (fieldName, fieldValue) => {
    console.log("savefield got "+fieldName + " : " +fieldValue)  
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
                    <Button color="primary" variant="contained" disabled = { !isFormValid()} type="submit">Save</Button>
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
                    isTextArea= { false }
                />
        


                <ControlledInputField
                    id="middleName"
                    label="Middle Name"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.middleName }
                    saveField = {saveField}
                    isTextArea= { false }
                />
        
                <ControlledInputField
                    id="lastName"
                    label="Last Name *"
                    errorText=""
                    toValidate={["REQUIRED"]}
                    initialValue={ energizer.lastName }
                    saveField = {saveField}
                    isTextArea= { false }
                />

                <span className="timestamp">{props.energizer.createdAt ? props.energizer.createdAt.substring(0,10)+" "+props.energizer.createdAt.substring(12,16) : "no timestamp"} </span>
            </div>  

            <div className="fieldsRow">

                <ControlledInputField
                    id="occupation"
                    label="Occupation *"
                    errorText=""
                    toValidate={["REQUIRED"]}
                    initialValue={ energizer.occupation }
                    saveField = {saveField}
                    isTextArea= { false }
                />

                <ControlledInputField
                    id="playsWith"
                    label="Band/Team/Show"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.playsWith }
                    saveField = {saveField}
                    isTextArea= { false }
                />

                <ControlledInputField
                    id="agencyRep"
                    label="Agency/Representation"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.agencyRep }
                    saveField = {saveField}
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
                    isTextArea= { false }
                />  

                <ControlledInputField
                    id="homeZipcode"
                    label="Home Zip"
                    errorText=""
                    toValidate={["IS_ZIP"]}
                    initialValue={ (energizer.homeZipcode) ? energizer.homeZipcode.toString() : ""}
                    saveField = {saveField}
                    isTextArea= { false }
                />  

            </div>

             <div className="rowsBox">
                <div className="fieldsRow">
                    <ControlledInputField
                        id="bornTown"
                        label="Born Town"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.bornTown}
                        saveField = {saveField}    
                        isTextArea= { false }
                    />  

                    <ControlledInputField
                        id="bornState"
                        label="Born State"
                        errorText="Needs to be a valid state"
                        toValidate={["IS_US_STATE"]}
                        initialValue={ energizer.bornState}
                        saveField = {saveField}    
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
                        isTextArea= { false }
                    />  

                    <ControlledInputField
                        id="homeState"
                        label="Home State"
                        errorText="valid state"
                        toValidate={["IS_US_STATE"]}
                        initialValue={ energizer.homeState}
                        saveField = {saveField}    
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
                        isTextArea= { false }
                    />   

                    <ControlledInputField
                        id="currentState"
                        label="Current State"
                        errorText="valid state"
                        toValidate={["IS_US_STATE"]}
                        initialValue={ energizer.currentState}
                        saveField = {saveField}    
                        isTextArea= { false }
                    />  
             </div>
           </div>

             <div className="fieldsRow">
                <ControlledInputField
                    id="education"
                    label="Education"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.education}
                    saveField = {saveField}
                    isTextArea= { false }
                /> 

                <ControlledInputField
                    id="highSchool"
                    label="High School"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.highSchool}
                    saveField = {saveField}
                    isTextArea= { false }
                /> 

                <ControlledInputField
                    id="birthday"
                    label="Birthday"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.birthday}
                    saveField = {saveField}
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
                        isTextArea= { false }
                />    

                <ControlledInputField
                        id="social1"
                        label="Facebook"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.social1}
                        saveField = {saveField}    
                        isTextArea= { false }
                />         
        


                <ControlledInputField
                        id="social2"
                        label="Instagram"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.social2}
                        saveField = {saveField}    
                        isTextArea= { false }
                />    


                <ControlledInputField
                        id="social3"
                        label="Twitter"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.social3}
                        saveField = {saveField}    
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
                        isTextArea= { false }
                />   


                <ControlledInputField
                        id="ethnicity"
                        label="Ethnicity"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.ethnicity}
                        saveField = {saveField}    
                        isTextArea= { false }
                />   


                <ControlledInputField
                        id="gender"
                        label="Gender"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.gender}
                        saveField = {saveField}    
                        isTextArea= { false }
                />   

                <ControlledInputField
                        id="stat1"
                        label="Key Stat"
                        errorText=""
                        toValidate={[]}
                        initialValue={ energizer.stat1}
                        saveField = {saveField}    
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

  //transformation of initial values - none now but possible
  const setInitialEnergizer = (energizer) => {
    return  {
             bio: energizer.bio || '',
             earlyLife: energizer.earlyLife || '',
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

    // {/*<div> {"STATE BornState: "+ formState.bornState.value + "HomeState: "+formState.homeState.value}</div> */}
    // <div> {"LOCAL BornState: " + energizer.bornState +"     HomeState: "+ energizer.homeState}</div>
    // <div> {" LOCAL Bio "+ energizer.bio +" early life "+ energizer.earlyLife}</div>
    // <div> {" Props Bio "+ props.energizer.bio +" Props homestate "+ props.energizer.homeState}</div>
    //  <div> {"FORM IS VALID: "+isFormValid()}</div>