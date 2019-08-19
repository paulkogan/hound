import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



//component get props
const PickStatesList = (props) => {

const {statesList, onListClick} = props;



  //create list of displayable dealactions
  const suggestedStates = statesList.map(  state => {

        return (

                <div  key = {Math.random(1000)}>

                  <Button
                    onClick={ onListClick }
                    value={state}
                  >
                  {state}
                  </Button>

                  <Divider />
                </div>


        )
  });



return (

                <List>
                        {suggestedStates}
                </List>

      )
}






export default PickStatesList;

// <ListItem button component="a" href={"www.google.com"}  >
//   <ListItemText primary={"> "+state}  />
// </ListItem>


// handleClick = event => {
//   this.setState({ anchorEl: event.currentTarget });
// }
