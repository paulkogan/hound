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
import ReviewList from './ReviewList';

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

    let columnMap = []
    columnMap[0]='index' 
    columnMap[1]='firstName'
    columnMap[2]='lastName'
    columnMap[3]='occupation'
    columnMap[4]='ethnicity'
    columnMap[5]='gender'
    columnMap[6]='agencyRep'
    columnMap[7]='bornTown'
    columnMap[8]='bornState'
    columnMap[12]='education'
    columnMap[15]='playsWith'
    columnMap[17]='wikiPage'
    //=====not included===== 
    columnMap[9]='zipCode'
    columnMap[10]='bornCountry'
    columnMap[11]='highSchool'
    columnMap[13]='instagram'
    columnMap[14]='twitter'
    columnMap[16]='imdb'

    let shownColumnList = []
    let shownColumnOrder = [0,1,2,3,7,8,15,12,6,4,5,17]
    shownColumnOrder.forEach((pos) => {
        shownColumnList.push(columnMap[pos])
    })


    this.state = {
        selectedFile: "", 
        fileName: "",
        cleanUploadList: [],
        openReviewListModal:false,
        columnMap, 
        shownColumnList
    };
  }

  readFile = async () => {
        var reader = new FileReader();
        reader.onload = async (file) =>  { //needs to be arrow function
          //  try {
                        var data = file.target.result;
                        let readData = XLSX.read(data, {type: 'binary'});
                        const wsname = readData.SheetNames[0];
                        const ws = readData.Sheets[wsname];
                        let rawJSON= XLSX.utils.sheet_to_json(ws, {header:1});
                        //console.log("JSONData", rawJSON) 
                        let cleanUploadList = this.processJSON(rawJSON)

                        this.setState({
                            cleanUploadList,
                            openReviewListModal: true
                        });
                        this.props.enqueueSnackbar('List Read!');
            // } catch {
            //     this.props.enqueueSnackbar(
            //         'Oops, something went wrong while reading the list. Please Try again'
            // )}

        };
        reader.readAsBinaryString(this.state.selectedFile) 
  }; 

  processJSON = (rawJSON) => {
 
        let columnMap = this.state.columnMap
        let results = []

        rawJSON.forEach ((row,index) => {
            let newEnergizer={}    
            newEnergizer["index"] = index
            for (let col =0;col<row.length;col++) {
                let value = row[col] ? row[col].toString() : ""
                newEnergizer[columnMap[col+1]] = value
            }
           console.log(newEnergizer)
           if (newEnergizer.firstName && newEnergizer.lastName) {
               results.push(newEnergizer)
           }
           
        })
        results.shift()//remove headers
        return results
        
  }




  onOpenFileSelector = (event) => {
    event.preventDefault();
    let fileObj = event.target.files[0];
    
    this.setState({
        selectedFile:fileObj, 
        fileName: event.target.files[0].name
    })
  }


  render() {
    const {  onClose, sendUploadList } = this.props;
    const {  cleanUploadList,  shownColumnList, openReviewListModal } = this.state;

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


          {openReviewListModal && (
            <div>
              <ReviewList
                onClose={onClose}
                rowsList={cleanUploadList}
                sendUploadList={sendUploadList}
                columnMap = {shownColumnList}
              />
            </div>
            )}


          </DialogContent>

          <DialogActions>       
              <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
              <Button color="primary" variant="contained" onClick={this.readFile}>Process {this.state.fileName}</Button>
          </DialogActions>
      </Dialog>
    );
  }
};


export default withSnackbar(withStyles(styles)(UploadPage));






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