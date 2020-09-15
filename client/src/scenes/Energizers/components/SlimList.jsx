import "./SlimList.css";
import React from "react";
import Button from '@material-ui/core/Button';
import { FixedSizeList as List } from "react-window";


const SlimList = (props) => {

  const { energizers } = props;

  const renderRow = ({index, newkey, style}) => {
      return (
        <div className="slimBox" style = {style} key={newkey} >

            <div className="frontBox">
              <div className="slimNum">
                  {index+1}.
                </div>
                <div className="slimName">
                  {energizers[index].firstName} {energizers[index].middleName} {energizers[index].lastName}
                </div>
                <div className="slimInfo">
                        <div className="townInfo">
                            {energizers[index].bornTown&& (energizers[index].bornTown+", ")}
                            {energizers[index].bornState&& (energizers[index].bornState)}              
                        </div>
                        <div className="townInfo">
                            {energizers[index].homeTown&& (energizers[index].homeTown+", ")}
                            {energizers[index].homeState&& (energizers[index].homeState)}
                        </div>
                </div>
            </div> 

            <div className="backBox">  
                <span className="action-Button">
                      <Button
                          color="primary"
                          variant="contained"
                          onClick={() => props.onEditEnergizer ({energizer: energizers[index]})}
                      >Edit Profile</Button>
                </span>
                <span className="action-Button">
                <Button
                        color="primary"
                        variant="contained"
                        onClick={() => props.onStartScrapeWiki ({energizer: energizers[index]})}
                >Pull from WikiPage</Button>
                </span> 
            </div>  
        </div>    
      ); 
  }


    if (energizers.length > 0) {
      return (
        <div className="panelContainer">
          <div className="countDiv"> Energizers Found: {energizers.length}</div>
            <List
              height={800}
              width={1000}
              itemSize={50}
              itemCount={energizers.length}
            >
              {renderRow}
            </List>

        </div>
      ) 
    } else {

       return (<div> <b>No Results Found </b></div>)

    } 

}

export default SlimList;

