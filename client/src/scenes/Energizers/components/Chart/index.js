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

  async componentDidMount() {

    const { statesWithCounts} = this.props;
    const {  } = this.state;

    let statesArray = []
    for (let [key,value] of statesWithCounts.entries() ) {
      console.log(key,value)
      statesArray.push({
        "stateName" : key,
        "numEnergizers" : value
      })
    }

    statesArray.sort((a,b) => {
        return b.numEnergizers - a.numEnergizers
    })

    this.drawStatesBarChart(statesArray)

  }

drawStatesBarChart = (sa) =>  {

    const barChart = d3.select(this.refs.canvas)
        .append("svg")
        .attr("width", 600)
        .attr("height", 400)
        .style("border", "1px solid black")


    barChart.selectAll("paint the bars")
          .data(sa)
          .enter()
              .append("rect")
              .attr("height",40)
              .attr("width", datapoint =>datapoint.numEnergizers*20)
              .attr("fill", "orange")
              .attr("x", 0)
              .attr("y", (datapoint, iteration) => iteration*45)
              .attr("class", "chartBar")


      barChart.selectAll("add some text")
          .data(sa)
          .enter()
                .append("text")
                .attr("x", datapoint =>(datapoint.numEnergizers*20))
                .attr("y", (datapoint, iteration) => (iteration*45)+25)
                .text(datapoint =>`${datapoint.stateName} (${datapoint.numEnergizers})`)


  }



  render() {
    const { classes, onClose, statesWithCounts, energizers } = this.props;
    const {  } = this.state;

    for (let [key,value] of statesWithCounts.entries() ) {
      console.log(key,value)
    }



    return (
    <div>

              <div>
                    Energizers by State
              </div>

              <div ref="canvas"></div>
              <Button color="primary" variant="contained" onClick={onClose}>OK</Button>


      </div>
    )



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
};

export default withStyles(styles)(Chart);


// d3.select(this.refs.temps)
// .selectAll("color-code the temps")
// .data(temps)
// .enter()  //add thid to the DOM
//     .append("div")
//     .text(datapoint => `${datapoint} degrees`)
//     .style("color", datapoint => (datapoint > 14) ? "red" : "green" )
//
// this.drawBarChart(temps)




// drawBarChart = (nums) =>  {
//
//     const barChart = d3.select(this.refs.canvas)
//         .append("svg")
//         .attr("width", 600)
//         .attr("height", 400)
//         .style("border", "1px solid black")
//
//
//     barChart.selectAll("paint the bars")
//           .data(nums)
//           .enter()
//               .append("rect")
//               .attr("height",40)
//               .attr("width", datapoint =>datapoint*20)
//               .attr("fill", "orange")
//               .attr("x", 0)
//               .attr("y", (datapoint, iteration) => iteration*45)
//               .attr("class", "chartBar")
//
//
//       barChart.selectAll("add some text")
//           .data(nums)
//           .enter()
//                 .append("text")
//                 .attr("x", datapoint =>(datapoint*20))
//                 .attr("y", (datapoint, iteration) => (iteration*45)+25)
//                 .text(datapoint =>`${datapoint} nums`)
//
//
//   }
