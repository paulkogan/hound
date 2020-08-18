import "./EnergizerProfile.css";
import React, { useState, useEffect, useContext } from "react";


//import moment from 'moment';
//import { withStyles } from '@material-ui/core/styles';
//import * as cx from 'classnames'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

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
        // setState(prevState => ({
        //     ...prevState,
        //     [e.target.name]: e.target.value
        // }));
        // };


        setEnergizer({
            ...energizer,
            [e.target.name]: e.target.value
        });



  };




    return (
      <Dialog open  onClose={ onClose } maxWidth={ 'lg' }>
          <DialogTitle>
            {isEmpty(energizer) ?
                "New Energizer - * fields required" : "Update Energizer"}
         </DialogTitle>



      {//<ValidatorForm ref="form" onSubmit={ }>
      }

      <form onSubmit={handleSubmit} >
        <DialogActions>
          
          <Button color="primary" variant="contained" onClick={() => deleteEnergizer(energizer)}>Delete</Button>
          <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
          <Button color="primary" variant="contained" type="submit">Save</Button>
        </DialogActions>

        <DialogContent>
        <div className="fieldSmall">
            <input type="text"
              label="First Name"
              value={ energizer.firstName }
              variant="outlined"
              name="firstName"
              onChange={handleChange}
              className="input"
            />

            <input type="text"
              label="Middle Name"
              value={ energizer.middleName }
              variant="outlined"
              name="middleName"
              onChange={handleChange}
              className="input"
            />

            <input type="text"
              label="Last Name *"
              value={ energizer.lastName }
              variant="outlined"
              name="lastName"
              onChange={handleChange}
              className="input"
            />

             <span className="timestamp">{energizer.createdAt ? energizer.createdAt.substring(0,10)+" "+energizer.createdAt.substring(12,16) : "no timestamp"} </span>
          </div>  

          <div>    
            <input type="text"
              label="Occupation *"
              value={ energizer.occupation}
              variant="outlined"
              name="occupation"
              onChange={handleChange}
              className="input"
            />

            <input type="text"
              label="Band/Team/Show"
              value={ energizer.playsWith}
              variant="outlined"
              name="playsWith"
              onChange={handleChange}
              className="input"
            />

          <input type="text"
              label="Agency/Representation"
              value={ energizer.agencyRep}
              variant="outlined"
              name="agencyRep"
              onChange={handleChange}
              className="input"
            />

        </div>

        <div className="fieldBig">
              <input type="text"
                
                label="Wiki Page"
                value={ energizer.wikiPage}
                variant="outlined"
                name="wikiPage"
                onChange={handleChange}
                className="input"
              />
        </div>


            <div className="fieldSmall">
              <input type="text"
                label="Born Town"
                value={ energizer.bornTown}
                variant="outlined"
                name="bornTown"
                onChange={handleChange}
                className="input"
              />

              <input type="text"
                label="Born State"
                value={ energizer.bornState}
                variant="outlined"
                name="bornState"
                onChange={handleChange}
                className="input"
              />
            </div>



            <div className="fieldSmall">
              <input type="text"
                label="Home Town"
                value={ energizer.homeTown}
                variant="outlined"
                name="homeTown"
                onChange={handleChange}
                className="input"
              />


              <input type="text"
                label="Home State"
                value={ energizer.homeState}
                variant="outlined"
                name="homeState"
                onChange={handleChange}
                className="input"
              />
              <input type="text"
                label="Home Zip"
                value={ energizer.homeZipcode}
                variant="outlined"
                name="homeZipcode"
                onChange={handleChange}
                className="input"
              />

            </div>



            <div className="fieldSmall">
              <input type="text"
                label="Current Town"
                value={ energizer.currentTown}
                variant="outlined"
                name="currentTown"
                onChange={handleChange}
                className="input"
              />


              <input type="text"
                label="Current State"
                value={ energizer.currentState}
                variant="outlined"
                name="currentState"
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="fieldBig">
                <input type="text"
                label="Education"
                value={ energizer.education}
                variant="outlined"
                name="education"
                onChange={handleChange}
                className="input"
                />

                <input type="text"
                label="High School"
                value={ energizer.highSchool}
                variant="outlined"
                name="highSchool"
                onChange={handleChange}
                className="input"
                />

                <input type="text"
                label="Birthday"
                value={ energizer.birthday}
                variant="outlined"
                name="birthday"
                onChange={handleChange}
                className="input"
                />

         </div>

            <input type="text"
              
              label="Early Life"
              value={ energizer.earlyLife}
              variant="outlined"
              
              rows="6"
              name="earlyLife"
              onChange={handleChange}
              className="input"
            />

            <input type="text"
              
              label="Bio"
              value={ energizer.bio}
              variant="outlined"
              
              rows="6"
              name="bio"
              onChange={handleChange}
              className="input"
            />

        <div className="fieldBig">
            <input type="text"
              label="IMDB Link"
              value={ energizer.imdbLink}
              variant="outlined"
              name="imdbLink"
              onChange={handleChange}
              className="input"
            />
       
       
          <input type="text"
              label="Facebook"
              value={ energizer.social1}
              variant="outlined"
              name="social1"
              onChange={handleChange}
              className="input"
            />

          <input type="text"
              label="Instagram"
              value={ energizer.social2}
              variant="outlined"
              name="social2"
              onChange={handleChange}
              className="input"
            />


          <input type="text"
              label="Twitter"
              value={ energizer.social3}
              variant="outlined"
              name="social3"
              onChange={handleChange}
              className="input"
            />
      </div>


      <div className="fieldMedium">
          <input type="text"
              label="Solicitor"
              value={ energizer.solicitor}
              variant="outlined"
              name="solicitor"
              onChange={handleChange}
              className="input"
            />

          <input type="text"
              label="Ethnicity"
              value={ energizer.ethnicity}
              variant="outlined"
              name="ethnicity"
              onChange={handleChange}
              className="input"
            />

          <input type="text"
              label="Gender"
              value={ energizer.gender}
              variant="outlined"
              name="gender"
              onChange={handleChange}
              className="input"
            />

            <input type="text"
              label="Key Stat"
              value={ energizer.stat1}
              variant="outlined"
              name="stat1"
              onChange={handleChange}
              className="input"
            />
      </div>

          <input type="text"
              
              label="Notes"
              value={ energizer.notes}
              variant="outlined"
              
              rows="6"
              name="notes"
              onChange={handleChange}
              className="input"
            />

          </DialogContent>



        </form>
      </Dialog>
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