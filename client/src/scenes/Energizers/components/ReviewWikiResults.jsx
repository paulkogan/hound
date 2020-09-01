import "./ReviewWikiResults.css";
import React, { useState, useEffect, useContext } from "react";
import ControlledInputField from './ControlledInputField.jsx';
import { ControlledFormContext } from "../../../contexts/ControlledFormContext";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';




//  display: 'flex'
// float: 'left',
// clear: 'none',
// margin: 'auto',


const ReviewWikiResults  = (props) => {

    const {updateEnergizer, wikiResults, onClose} = props;
    const [energizer, setEnergizer] = useState( setInitialEnergizer(props.energizer, wikiResults) || {});
    const {formState, updateFormState, isFormValid } = useContext(ControlledFormContext);
    console.log("In Review Wiki up to: "+JSON.stringify(energizer,null,4) )
 
    const isEmpty = (obj) => {
      return Object.entries(obj).length === 0;
    }
  
    const saveField = (fieldName, fieldValue) => {
      setEnergizer({
          ...energizer,
          [fieldName]: fieldValue
      });
    };
  

    const handleSubmit = () => {
      console.log("WIKI handleSubmit : "+JSON.stringify(energizer ,null,4))
      updateEnergizer (energizer)
      onClose();
    }



  return (
    <div id="outerForm">
    <form onSubmit={handleSubmit} >
        <div id="header">
            <div id="headLine">
                    {"Review Update from Wiki"}
            </div>

            <div id="actionButtons">   
        
                <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
                <Button color="primary" variant="contained" disabled = { !isFormValid()} type="submit">Save</Button>
            </div>
        </div>
        
        <div className="fromWikiHead">
            <div className = "textBlockLeft">
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


            <div className = "textBlockRight">
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
                  id="playsWith"
                  label="Band/Team/Show"
                  errorText=""
                  toValidate={[]}
                  initialValue={ energizer.playsWith }
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
                  id="agencyRep"
                  label="Agency/Representation"
                  errorText=""
                  toValidate={[]}
                  initialValue={ energizer.agencyRep }
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
                    id="homeZipcode"
                    label="Home Zip"
                    errorText=""
                    toValidate={[]}
                    initialValue={ energizer.homeZipcode}
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

export default ReviewWikiResults;



ReviewWikiResults.propTypes = {
  energizer: PropTypes.object,
  updateEnergizer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};


const setInitialEnergizer = (energizer, wikiResults) => {
  return  {
    id: energizer.id,
    firstName: energizer.firstName || '',
    middleName: energizer.middleName || '',
    lastName: energizer.lastName || '',
    occupation: energizer.occupation || '',
    wikiPage: energizer.wikiPage || '',
    homeTown: energizer.homeTown || '',
    homeState: energizer.homeState || '',
    bornTown: wikiResults.bornTown || wikiResults.birthPlaceTown || wikiResults.originTown || energizer.bornTown  || '',
    bornState: wikiResults.bornState || wikiResults.birthPlaceState || wikiResults.originState || energizer.bornState || '',
    currentTown: energizer.currentTown|| '',
    currentState: energizer.currentState|| '',
    highSchool: energizer.highSchool || '',
    education: wikiResults.almaMater || wikiResults.education || energizer.education || '',
    bio: wikiResults.bio || energizer.bio || '',
    earlyLife: wikiResults.earlyLife || energizer.earlyLife || '',
    playsWith: energizer.playsWith || '',
    agencyRep: energizer.agencyRep || '',
    ethnicity: energizer.ethnicity|| '',
    gender: energizer.gender || '',
    occupation: energizer.occupation || '',
    birthday: energizer.birthday || '',
    solicitor: energizer.solicitor || '',
    notes: energizer.notes || '',
    homeZipcode: energizer.homeZipcode || '',
    imdbLink: energizer.imdbLink || '',
    social1: energizer.social1 || '',
    social2: energizer.social2 || '',
    social3: energizer.social3 || '',
    stat1: energizer.stat1 || '' 
 }
}





// const styles = () => ({
//   input: {
//     margin: '0.5rem 0',
//     paddingRight: '5px'
//   },
// fieldSmall: {
//     fontSize: '12px',
//     lineHeight: '14px',
//     color: '#606A74',
//     fontWeight: 'normal',
//     maxWidth: '600px',
//     margin: 'auto',
//     textAlign: 'left',
//     contentAlign: 'left'
//   },


//   fieldMed: {
//       fontSize: '12px',
//       lineHeight: '14px',
//       color: '#606A74',
//       fontWeight: 'normal',
//       maxWidth: '900px',
//       margin: 'auto',
//       textAlign: 'left',
//       contentAlign: 'left',
//       marginLeft: '208px'

//     },


//   fieldBig: {
//       fontSize: '12px',
//       lineHeight: '14px',
//       textTransform: 'uppercase',
//       color: '#606A74',
//       fontWeight: 'normal',
//       maxWidth: '800px',
//       margin: 'auto'
//     },

//     parentCont: {
//       display: 'inline-block',
//       width: '100%',
//       border: '1px solid blue',
//       padding: '10px'

//     },

//     textBlockLeft: {
//       float: 'left',
//       textAlign: 'left',
//       contentAlign: 'left',
//       marginRight: '30px'
//     },


//     textBlockRight: {
//       float: 'right',
//       textAlign: 'left',
//       contentAlign: 'left',
//       marginRight: '20px'
//     },



// });