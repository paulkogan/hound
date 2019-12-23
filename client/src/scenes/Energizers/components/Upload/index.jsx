import React, { Component } from 'react';
//import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import * as api from '../../../../services/api';


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

class UploadPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        selectedFile: null, 
        fileName: null,
        uploadResults: null,
        openReviewUploadResultsModal:false
    };
  }

  readFile = async () => {
     console.log("Reading.... ",this.state.selectedFile.name) 

     try {
        let data = new FormData()
        data.append('file', this.state.selectedFile) 
        data.append('name', this.state.fileName) 
        let uploadResults = await api.readUploadList(data);
        console.log("UPLOAD RESULTS", uploadResults)
        this.props.enqueueSnackbar('List Read!');
        await this.setState({
            uploadResults,
            openReviewUploadResultsModal: true
          });
      } catch {
         this.props.enqueueSnackbar(
          'Oops, something went wrong with list upload. Please Try again'
         );
      }
 
  }; //readFile


  onOpenFileSelector = (event) => {
    let fileObj = event.target.files[0];
    console.log("NAME ", event.target.files[0].name) 
    this.setState({
        selectedFile:fileObj, 
        fileName: event.target.files[0].name
    })

  }



  render() {
    const {  onClose } = this.props;

    return (
      <Dialog open fullWidth onClose={ onClose } maxWidth={ 'lg' }>
          <DialogTitle>         
                Upload Spreadsheet
         </DialogTitle>

        <div>
            FILE: {this.state.fileName}
        </div>


         <input 
            type="file" 
            onChange={this.onOpenFileSelector} 
         />
     
          <DialogContent>


          </DialogContent>

          <DialogActions>
        
              <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
              <Button color="primary" variant="contained" onClick={this.readFile}>Read File</Button>
              <Button color="primary" variant="contained" type="submit">Save</Button>
          </DialogActions>
      </Dialog>
    );
  }
};


export default withSnackbar(withStyles(styles)(UploadPage));