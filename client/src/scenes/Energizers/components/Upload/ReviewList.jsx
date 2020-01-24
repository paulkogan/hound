import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ReviewList = props => {
    const {classes, rowsList, columnMap, onClose, sendUploadList} = props;
    //const [currentList, updateList] = useState(rawList)

    const renderEnergizerRow = (enzRow) => {

        return (

            <tr key={enzRow.index}>
                {columnMap.map((header, index)=> {
                    return <td key={index} className={classes.reviewCell}>{enzRow[header.toString()]}</td>
                })}
            </tr>
        )
    };


    return (
        <Dialog open fullWidth onClose={ onClose } maxWidth={ 'lg' }>
            <DialogTitle>         
                    Review List
            </DialogTitle>

            <DialogContent >

                    <div className={classes.tableContainer}>
                        <table className={classes.reviewTable}>
                            <tbody>
                               <tr>
                               {columnMap.map((header, index)=>{
                                     if (header==='social1') header='facebook'
                                     if (header==='social2') header='instagram'
                                     if (header==='social3') header='twitter'
                                     return <td key={index} className={classes.headerCell} >{header}</td>
                                })}
                               </tr>
                               {rowsList.map(enzRow =>{
                                     return renderEnergizerRow(enzRow)
                                })}
                            
                            </tbody>
                        </table>
                    </div>

            </DialogContent>

            <DialogActions>
                <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
                <Button color="primary" variant="contained" onClick={() => sendUploadList(rowsList)}>Accept List</Button>
            </DialogActions>
        </Dialog>
      );

}

const styles = () => ({
    root: {
      padding: '24px 30px',
    },

    tableContainer: {
      width: "90%",
      textAlign: "left",
      padding: '10px',
      border: '0px solid red',
    },
    reviewTable: {
        width: "100%",
        textAlign: "left",
        padding: '10px',
        border: '0px solid blue',
        borderCollapse: 'collapse',
        cellSpacing: "0px", 
        cellPadding: "0px"
      },

      reviewCell: {
        padding: '5px',  
        paddingLeft: '10px',
        paddingRight: '10px',
        border: '1px solid green',
      },

      headerCell: {
        padding: '5px',
        border: '3px solid purple',
      },




    title: {
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '19px',
      color: '#1C1C1C',
      paddingBottom: '0px',
    },
    energizerTitle: {
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 'normal',
      paddingRight: '5px',
      margin: "0px"
    },
    energizerSubTitle: {
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 'normal',
      color: '#494949',
      textTransform: 'capitalize',
      margin: "0px"
    },
    panelDetails: {
      borderTop: '1px solid rgba(96,106,116,0.4)',
      padding: '0px 0',
      textAlign: "left",
    },
    panelDetailsSection: {
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '60px',
      textAlign: "left",
    },
    panelDetailsSectionTitle: {
      fontSize: '12px',
      lineHeight: '14px',
      textTransform: 'uppercase',
      color: '#606A74',
      fontWeight: 'normal',
      margin: "0px",
      textAlign: "left"
    },
    panelDetailsSectionText: {
      color: '#1C2B39',
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '14px',
      margin: "0px",
      textAlign: "left",
    },
    panelActions: {
      padding: '7px',
      borderTop: '1px solid rgba(96,106,116,0.4)',
    },
    actions: {
      textAlign: 'right',
      paddingTop: '24px',
    },
  });



export default withStyles(styles)(ReviewList);

