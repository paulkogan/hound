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
      usData : null,
      congressData: null,
      currentState: "here"
  }



  async componentDidMount() {

    const {statesWithCounts} = this.props;
    //console.log("in chart obj: ",statesWithCounts)
     let responseStates = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json')
    // let responseStates = await fetch('https://d3js.org/us-10m.v1.json')
     let usData = await responseStates.json();
     this.setState({usData})
     console.log("CDM-US", this.state.usData)


     this.drawStatesMap();
  }




drawStatesMap = async () =>  {

    const {usData, congressData, currentState} = this.state
    const {statesWithCounts, doSearch, onClose} = this.props;

    var width = 1000;
    var height = 600;
    //var projection = d3.geoAlbersUsa().scale(1280).translate([480, 300])
    var path = d3.geoPath();
    //var path = d3.geoPath.projection(projection);


  //var svg = d3.select("this.refs.canvas")
  var svg = d3.select(".svg-div")
       			.append("svg")
       			.attr("width", width)
       			.attr("height", height)
            .style("border", "1px solid lightslategrey")




       svg.append("g")
         .selectAll("path")
         //data() binds data to previous selection (path)
         .data(topojson.feature(usData, usData.objects.states).features)
         .join("path")
           .attr("class", "chart-state")
           .attr("fill", d => {
                let stateColor = "lightslategrey"
                statesWithCounts.forEach(eState => {
                      if (d.properties.name == eState.stateName) {
                          stateColor = "orange"
                      }
                })
                return stateColor
           })
           .attr("d", path)
           .attr("stateName", d => d.properties.name)
           .append("title")
           .text( d => d.properties.name)

      svg.selectAll(".chart-state")
            .on("click", (node) => {
                  console.log("Node-prop-name", node.properties.name)
                  doSearch(node.properties.name, true)
                  onClose()

            })


            svg.append("text")
                .attr("x", 400)
                .attr("y", 450)
                .text("Texas", currentState)


  } //function



  render() {
    const { onClose } = this.props;


    return (
      <div>

              <div className="svg-div"></div>
      </div>
    )



  } //render


} //component




const styles = () => ({


root: {
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




});



Chart.propTypes = {
  onClose: PropTypes.func.isRequired,
  statesWithCounts: PropTypes.array.isRequired
};

export default withStyles(styles)(Chart);



// svg.selectAll(".chart-state")
//       .on("click", (node) => {
//             doSearch(node.properties.name, true)
//
//             console.log("This", this)
//             console.log("Node", node)
//             console.log("Node-prop-name", node.properties.name)
//             console.log("Event-path0",d3.event.path[0])
//             //console.log("Event-path0-path-statename",d3.event.path[0].path)
//             console.log("Event-target",d3.event.target)
//             //console.log("Event-target-path-stateName",d3.event.target.node("path"))
//             //let stateDom = d3.event.select('path')
//             //console.log("stateDom",stateDom)
//       })




    //  let responseCongress = await fetch('https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us-congress-113.json')
    //  let congressData= await responseCongress.json();
    //  this.setState({congressData})
    //  console.log("CDM-Congress", this.state.congressData)




// d3.select(this.refs.temps)
// .selectAll("color-code the temps")
// .data(temps)
// .enter()  //add thid to the DOM
//     .append("div")
//     .text(datapoint => `${datapoint} degrees`)
//     .style("color", datapoint => (datapoint > 14) ? "red" : "green" )
//
// this.drawBarChart(temps)


        // svg.append("g")
        //   .attr("className", "districts")
        //   //.attr("transform", "translate(600,40)")
        //   .select("path2")
        //   .data(topojson.feature(congressData, congressData.objects.districts).features)
        //   .join("path2")
        //   .attr("fill", "purple")
        //   .attr("d", path2)



      //  svg.append("path")
      //      .attr("class", "state-borders")
      //      .attr("d", path(topojson.mesh(usData, usData.objects.states,
      //        function(a, b) { return a != b; })));
    // //});





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

  // ISSUE -- this does not wait => use await
  // fetch('https://d3js.org/us-10m.v1.json')
  //     .then(response => response.json())
  //     //.then(json => console.log("Fetch",json))
  //     .then(async usData => await this.setState({usData}))
  //     .then(console.log("end", this.state.usData))



// drawStatesBarChart = (sa) =>  {
//     const bCanvas = d3.select(this.refs.canvas)
//         .append("svg")
//         .attr("width", 600)
//         .attr("height", 400)
//         .style("border", "1px solid black")
//
//
//     bCanvas.selectAll("paint the bars")
//           .data(sa)
//           .enter()
//               .append("rect")
//               .attr("height",40)
//               .attr("width", datapoint =>datapoint.numEnergizers*20)
//               .attr("fill", "orange")
//               .attr("x", 0)
//               .attr("y", (datapoint, iteration) => iteration*45)
//               .attr("class", "chartBar")
//
//
//       bCanvas.selectAll("add descriptive text")
//           .data(sa)
//           .enter()
//                 .append("text")
//                 .attr("x", datapoint =>(datapoint.numEnergizers*20))
//                 .attr("y", (datapoint, iteration) => (iteration*45)+25)
//                 .text(datapoint =>`${datapoint.stateName} (${datapoint.numEnergizers})`)
//
//
//   }
//
//
