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
import { TextField } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';


let statesList = [
  'Alabama',
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
        showStateListModal: false,
        statesOnly: true
    };
  }

  onSubmit = () => {
      const { doSearch } = this.props;
      doSearch(this.state.searchTerm, this.state.statesOnly)
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
              console.log("HandlePopClose")
              this.setState({
                anchorEl: null,

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

  onCheckboxChange = () => {
    this.setState({ statesOnly: !this.state.statesOnly });
  };


  render() {
    const { classes, onClose } = this.props;
    const { statesOnly, anchorEl, searchTerm, statesList } = this.state;
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

          <DialogContent>

          <div className={ cx(classes.parentBox)}>
                    <div className={ cx(classes.searchDiv) }>
                        <TextField
                          label="Enter state or search term to filter results"
                          type="search"
                          name="searchTerm"
                          value={ this.state.searchTerm }
                          autoComplete="off"
                          variant="filled"
                          onChange={this.onChange}
                          className={ cx(classes.input) }
                          onClick={this.handlePopoverOpen}
                        />
                    </div>

                    <div className={ cx(classes.optionsBox)}>
                          <div className={ cx(classes.optionsLabel)}>
                            {statesOnly
                              ? 'State Fields Only'
                              : 'All Fields'}
                          </div>

                          <Checkbox
                                checked={this.state.statesOnly}
                                onChange={this.onCheckboxChange}
                          />
                    </div>

          </div>






            <div>
            <Popper
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    placement ='bottom-start'
                    disablePortal
                    modifiers={{
                            preventOverflow: {
                              enabled: false,
                              boundariesElement: 'scrollParent',
                            },
                    }}
                    className={ cx(classes.popOver) }
            >
            <ClickAwayListener onClickAway={this.handlePopoverClose}>

            <Grid container justify={'center'}>

                            { statesList.filter(state => {

                                  return state.toLowerCase().includes(searchTerm.toLowerCase())

                            }).map( state => {
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



  dialogPaper: {
          minHeight: '80%',
          minWidth: '80%',

  },

  parentBox: {
    display: 'inline-block',
    width: '100%',
    border: '0px solid red',
    padding: '5px'

  },


searchDiv: {
    fontSize: '12px',
    lineHeight: '12px',
    color: '#606A74',
    fontWeight: 'normal',
    width: '70%',
    margin: '0px',
    padding: '0px',
    textAlign: 'left',
    contentAlign: 'left',
    border: "0px solid blue",
    float: 'left',
  },

  input: {
    margin: '0 rem 0',
    padding: '0px',
    autocomplete: 'false',
    width: '100%'
  },

  popOver: {
      marginTop: '0px',
      paddingTop: '0px',
      maxWidth: '90%',
      minWidth: '60%',
      border: "1px solid grey"
  },

  menuItem: {
    margin: "0px",
    marginRight: '10px',
    padding: '0px',
    paddingLeft: '5px',
    fontSize: '14px',
    lineHeight: '14px',
  },

  optionsBox: {
    minWidth: '140px',
    padding: '0px',
    paddingTop: '5px',
    margin: '0px',
    textAlign: 'center',
    contentAlign: 'center',
    float: 'right',
    border: "0px solid green"
  },

  optionsLabel: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '12px',
    color: '#606A74',
    float: 'center',
  },

  checkBox: {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '12px',
    padding: '0px',

  },



});



Search.propTypes = {
  onClose: PropTypes.func.isRequired,
  doSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(Search);




            //    color: '#1C1C1C',






// <div>
//       {"BAEL: "+Boolean(anchorEl)+" ST:"+searchTerm}
// </div>





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
