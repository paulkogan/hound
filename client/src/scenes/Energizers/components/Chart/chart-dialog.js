import React, { Component } from 'react';
import * as d3 from 'd3'
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
import Grid from '@material-ui/core/Grid';


class Chart extends Component {
  constructor(props) {
    super(props);


    this.state = {
    };
  }



  render() {
    const { classes, onClose, energizers } = this.props;
    const {  } = this.state;
    d3.select(this.refs.myDiv).style("background-color", "blue")
    d3.select(this.refs.myList)
    .append("li")
    .text("bananas")

    return (
    <div>

      <Dialog
              open
              fullWidth
              onClose={ onClose }
              maxWidth={ 'sm' }
              classes={{ paper: classes.dialogPaper }}
      >
                  <DialogTitle>
                        Chart by State
                 </DialogTitle>

                  <DialogContent>
                          <div>
                                Hello from Chart
                          </div>

                          <div ref="myDiv">XXXX</div>


                  </DialogContent>

                  <DialogActions>
                      <Button color="primary" variant="contained" onClick={onClose}>OK</Button>

                  </DialogActions>


          </Dialog>
      </div>
    )
      d3.select(this.refs.myDiv).style("background-color", "blue")
      d3.select(this.refs.myList)
      .append("li")
      .text("bananas")
  } //render


} //component




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



Chart.propTypes = {
  onClose: PropTypes.func.isRequired,
  energizers: PropTypes.array.isRequired,
};

export default withStyles(styles)(Chart);
