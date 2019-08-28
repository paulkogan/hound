import React, { Component } from 'react';

//import d3-geo from 'd3-geo'
import * as topojson from 'topojson';
import * as d3 from 'd3'
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames'
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';



class Chart extends Component {

  state = {
      usData : null
  }



  async componentDidMount() {

    const {statesWithCounts} = this.props;
    //console.log("in chart obj: ",statesWithCounts)
    //this.drawStatesBarChart(statesWithCounts)


     let response = await fetch('https://d3js.org/us-10m.v1.json')
     let usData = await response.json();
     this.setState({usData})
     //console.log("CDM", this.state.usData)

     this.drawStatesMap();


  }




drawStatesMap = async () =>  {
    var width = 1200;
    var height = 700;

    var projection = d3.geoAlbersUsa()
    				   .translate([width/3, height/3])
               .scale([200])   // translate to center of screen
    				          // scale things down so see entire US

    var path = d3.geoPath();
    //var path = d3.geoPath(projection);

    const {usData} = this.state
    console.log("in function", usData)

    var svg = d3.select(this.refs.canvas)
       			.append("svg")
       			.attr("width", width)
       			.attr("height", height)
             .style("border", "1px solid blue")





       svg.append("g")
         .attr("class", "states")
         //.attr("transform", "translate(600,40)")
         .selectAll("path")
         .data(topojson.feature(usData, usData.objects.states).features)
         .join("path")
         .attr("fill", "green")
         .attr("d", path)
         //.enter()
          //.append("path")
        //.call(legend);


    //    svg.append("path")
    //        .attr("class", "state-borders")
    //        .attr("d", path(topojson.mesh(usData, usData.objects.states,
    //          function(a, b) { return a != b; })));
    // //});

  } //function



//   legend = g => {
//     const x = d3.scaleLinear()
//         .domain(d3.extent(color.domain()))
//         .rangeRound([0, 260]);
// }






    // const usData = this.state.usData;
    //
    //   svg.selectAll("use path")
    //   	//.data(json.features)
    //   	.enter()
    //   	.append("path")
    //     //.datum(topojson.feature(us, us.objects.land))
    //   	.attr("d", path)
    //   	.style("stroke", "red")
    //   	.style("stroke-width", "1")
    //   	.style("fill", function(d) {
    //          return "orange"
    //      // // Get data value
    //    	// var value = d.properties.visited;
    //      //
    //    	// if (value) {
    //    	// //If value exists…
    //    	// return color(value);
    //    	// } else {
    //    	// //If value is undefined…
    //    	// return "rgb(213,222,217)";
    //    	// }
    //    });













    //  d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    //    if (error) throw error;
     //
    //    svg.append("g")
    //        .attr("class", "states")
    //      .selectAll("path")
    //      .data(topojson.feature(us, us.objects.states).features)
    //      .enter().append("path")
    //        .attr("d", path);
     //
    //    svg.append("path")
    //        .attr("class", "state-borders")
    //        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
    //  });


     // // D3 Projection
     // var projection = d3.geo.albersUsa()
     // 				   .translate([width/2, height/2])    // translate to center of screen
     // 				   .scale([1000]);          // scale things down so see entire US


    // // Define path generator
    // var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
    // 		  	 .projection(projection);  // tell path generator to use albersUsa projection


    //  mCanvas.selectAll("use path")
    //  	//.data(json.features)
    //  	.enter()
    //  	.append("path")
    //  	.attr("d", path)
    //  	.style("stroke", "#fff")
    //  	.style("stroke-width", "1")
    //  	.style("fill", function(d) {
    //         return "rgb(213,222,217)"
    //     // // Get data value
    //   	// var value = d.properties.visited;
    //     //
    //   	// if (value) {
    //   	// //If value exists…
    //   	// return color(value);
    //   	// } else {
    //   	// //If value is undefined…
    //   	// return "rgb(213,222,217)";
    //   	// }
    //   });


    //d3.json does not return
    // d3.json('https://jsonplaceholder.typicode.com/todos/1', function(error, us) {
    //         if (error) throw error;
    //         console.log("JSON CDM!")
    //         console.log(us)
    //
    // })

  // ISSUE -- this does not wait
  // fetch('https://d3js.org/us-10m.v1.json')
  //     .then(response => response.json())
  //     //.then(json => console.log("Fetch",json))
  //     .then(async usData => await this.setState({usData}))
  //     .then(console.log("end", this.state.usData))






drawStatesBarChart = (sa) =>  {
    const bCanvas = d3.select(this.refs.canvas)
        .append("svg")
        .attr("width", 600)
        .attr("height", 400)
        .style("border", "1px solid black")


    bCanvas.selectAll("paint the bars")
          .data(sa)
          .enter()
              .append("rect")
              .attr("height",40)
              .attr("width", datapoint =>datapoint.numEnergizers*20)
              .attr("fill", "orange")
              .attr("x", 0)
              .attr("y", (datapoint, iteration) => iteration*45)
              .attr("class", "chartBar")


      bCanvas.selectAll("add descriptive text")
          .data(sa)
          .enter()
                .append("text")
                .attr("x", datapoint =>(datapoint.numEnergizers*20))
                .attr("y", (datapoint, iteration) => (iteration*45)+25)
                .text(datapoint =>`${datapoint.stateName} (${datapoint.numEnergizers})`)


  }




  render() {
    const { onClose } = this.props;


    return (
    <div>

              <div>
                    By States
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
  statesWithCounts: PropTypes.array.isRequired
};

export default withStyles(styles)(Chart);

// constructor(props) {
//   super(props);
// }




// d3.select(this.refs.temps)
// .selectAll("color-code the temps")
// .data(temps)
// .enter()  //add thid to the DOM
//     .append("div")
//     .text(datapoint => `${datapoint} degrees`)
//     .style("color", datapoint => (datapoint > 14) ? "red" : "green" )
//
// this.drawBarChart(temps)
