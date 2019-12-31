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
import XLSX from 'xlsx';

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
        selectedFile: "", 
        fileName: " - ? - ",
        listData: null,
        openReviewUploadResultsModal:false
    };
  }

  processFile = async () => {


        var reader = new FileReader();
        reader.onload = async (file) =>  { //needs to be arrow function
            try {
                        var data = file.target.result;
                        let readData = XLSX.read(data, {type: 'binary'});
                        const wsname = readData.SheetNames[0];
                        const ws = readData.Sheets[wsname];
                        let listData= XLSX.utils.sheet_to_json(ws, {header:1});
                        console.log("JSONData", listData) 
                        this.setState({
                            listData,
                            openReviewUploadResultsModal: true
                        });
                        this.props.enqueueSnackbar('List Read!');
            } catch {
                this.props.enqueueSnackbar(
                    'Oops, something went wrong while reading the list. Please Try again'
            )}

        };
        reader.readAsBinaryString(this.state.selectedFile)
    
        


 
  }; //readFile


  onOpenFileSelector = (event) => {
    event.preventDefault();
    let fileObj = event.target.files[0];
    console.log("IN Open File Selector, selected: ", fileObj.name) 


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
              <Button color="primary" variant="contained" onClick={this.processFile}>Process {this.state.fileName}</Button>
          </DialogActions>
      </Dialog>
    );
  }
};


export default withSnackbar(withStyles(styles)(UploadPage));



// try {
//     //this is useless, just sending the name 
//     let data = new FormData()
//     data.append('englist', this.state.selectedFile, this.state.fileName) 
//     let uploadResults = await api.readUploadList(data);
//     console.log("UPLOAD RESULTS", uploadResults)
//     this.props.enqueueSnackbar('List Read!');
//     await this.setState({
//         uploadResults,
//         openReviewUploadResultsModal: true
//       });
//   } catch {
//      this.props.enqueueSnackbar(
//       'Oops, something went wrong with list upload. Please Try again'
//      );
//   }

// }; //readFile



{/* <form          
action='http://localhost:5000/api/uploadlist' 
method='post' 
encType="multipart/form-data"
>

<input 
type="file" 
name="englist"
onChange={this.onOpenFileSelector} 
/>

<input type="submit" />
</form> */}