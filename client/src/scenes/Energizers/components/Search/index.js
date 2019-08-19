import React, { Component } from 'react';
//import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { TextField } from '@material-ui/core';
import PickStatesList from './stateslist';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';


let statesList = [
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]



class Search extends Component {
  constructor(props) {
    super(props);


    this.state = {
        searchTerm: "",
        statesList: statesList,
        anchorEl: null,
        showStateListModal: false
    };
  }

  onSubmit = () => {
      const { doSearch } = this.props;
      doSearch(this.state.searchTerm)
      this.props.onClose();
  }


  onChange = event => {
    //console.log("On Change: name: ", e.target.name, "value:", e.target.value)
    this.setState({
                [event.target.name]: event.target.value,
                anchorEl: event.currentTarget
        });
  };

  handlePopoverOpen = event => {
        this.setState({
          anchorEl: event.currentTarget,
        });
      };

  handlePopoverClose = () => {

        };

handlePopoverClose2 = () => {
              this.setState({
                anchorEl: null,
                searchTerm: "",
              });
              };


onListClick = async event => {
    const { stateName } = event.currentTarget.dataset;
    //console.log("Whole dataSet:", e.currentTarget.dataset)
    await this.setState({
            searchTerm: stateName,
            anchorEl: null,
    });
    this.onSubmit()
  }




  render() {
    const { classes, onClose } = this.props;
    const { anchorEl, searchTerm, statesList } = this.state;
    return (
      <Dialog
              open
              fullWidth
              onClose={ onClose }
              maxWidth={ 'sm' }
              classes={{ paper: classes.dialogPaper }}
      >
          <DialogTitle>
                Search
         </DialogTitle>

  <div>
        {"BAEL: "+Boolean(anchorEl)+" ST:"+searchTerm}
</div>

          <DialogContent>


            <div className={ cx(classes.fieldSmall) }>
                <TextField
                  fullWidth
                  autoFocus
                  label="Enter Search Term"
                  type="search"
                  name="searchTerm"
                  value={ this.state.searchTerm }
                  autoComplete="false"
                  variant="filled"
                  onChange={this.onChange}
                  className={ cx(classes.input) }
                  onClick={this.handlePopoverOpen}
                />
            </div>


            <div>
            <Popper
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    placement ='bottom-start'
                    disablePortal
                   className={ cx(classes.popOver) }
            >
            <ClickAwayListener onClickAway={this.handlePopoverClose}>

            <Grid container justify={'center'}>

                            { statesList.map( state => {
                                  return (
                                      <Grid item xs={3} lg={2} key = {Math.random(100000)}>
                                                      <MenuItem
                                                            data-state-name={state}
                                                            onClick={this.onListClick}
                                                            className={ cx(classes.menuItem) }
                                                      >
                                                      {state}</MenuItem>
                                      </Grid>

                                  )
                              })
                            }
            </Grid>
            </ClickAwayListener>
            </Popper>
            </div>
            </DialogContent>

          <DialogActions>
              <Button color="primary" variant="contained" onClick={onClose}>Cancel</Button>
              <Button color="primary" variant="contained" onClick={this.onSubmit}>Search</Button>
          </DialogActions>


      </Dialog>
    );
  }
};



const styles = () => ({
  input: {
    margin: '0.5rem 0',
    padding: '5px',
    autocomplete: 'false'
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

    dialogPaper: {
            minHeight: '80%',
            minWidth: '80%',

    },
    popOver: {
        maxWidth: '80%',
    },
    menuItem: {
      margin: '0px',
      padding: '0px',
      fontSize: '14px',
      lineHeight: '14px',
    },


});



Search.propTypes = {
  onClose: PropTypes.func.isRequired,
  doSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(Search);


// closeStateList = () => {
//   this.setState({ searchTerm: "nada",
//                   showStateListModal: false
//   });
//
// }


// <div
//       name={"yabber"}
//       value={"Bubbles"}
//       onClick={this.onListClick}
//       className={ cx(classes.menuItem) }
// >
//       {state}
// </div>


// <MenuList>
//       { statesList.map( state => {
//             return (
//                 <MenuItem
//                       value={state}
//                       onClick={this.onListClick}
//                       className={ cx(classes.menuItem) }
//                 >
//                 {state}</MenuItem>
//
//             )
//         })
//       }
// </MenuList>






//        <ValidatorForm ref="form" onSubmit={ this.onSubmit }>
// <TextValidator
//   label="Enter search term:"
//   value={ this.state.searchTerm }
//   variant="outlined"
//   name="searchTerm"
//   onChange={this.onChange}
//   className={ cx(classes.input) }
// />

// anchorReference="anchorPosition"
// anchorPosition={{ top: 500, left: 80 }}

// <Popper
//         open={showStateListModal}
//         anchorEl={anchorEl}
//         placement ='bottom-start'
//         disablePortal
// >




            // <div className={ cx(classes.fieldSmall) } >
            //   {showStateListModal && searchTerm == "xxx" &&(
            //       <div>
            //         {searchTerm}
            //
            //         <PickStatesList
            //             statesList = {statesList}
            //             onListClick = {this.onListClick}
            //         />
            //       </div>
            //   )}
            // </div>





            // <Popover
            //         open={Boolean(anchorEl)}
            //         anchorEl={anchorEl}
            //
            //         anchorOrigin={{
            //              vertical: 'bottom',
            //              horizontal: 'left',
            //         }}
            //         transformOrigin={{
            //          vertical: 'top',
            //          horizontal: 'left',
            //        }}
            //        className={ cx(classes.popOver) }
            // >
            // <ClickAwayListener onClickAway={this.handlePopoverClose}>
            //
            // <Grid container justify={'center'}>
            //
            //                 { statesList.map( state => {
            //                       return (
            //                           <Grid item xs={3} lg={2} key = {Math.random(100000)}>
            //                                           <MenuItem
            //                                                 data-state-name={state}
            //                                                 onClick={this.onListClick}
            //                                                 className={ cx(classes.menuItem) }
            //                                           >
            //                                           {state}</MenuItem>
            //                           </Grid>
            //
            //                       )
            //                   })
            //                 }
            // </Grid>
            // </ClickAwayListener>
            // </Popover>


            // <div>
            //      <Select
            //        inputId="state-pick"
            //        name="searchTerm"
            //        TextFieldProps={{
            //          label: 'Country',
            //          InputLabelProps: {
            //            htmlFor: 'state-pick',
            //            shrink: true,
            //          },
            //        }}
            //        placeholder="Type State"
            //        options={statesList}
            //        value={searchTerm}
            //        onChange={this.onChange}
            //      />
            //  </div>
