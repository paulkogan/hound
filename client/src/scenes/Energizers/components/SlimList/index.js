import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames';

const styles = () => ({
  root: {
    padding: '24px 30px',
  },
  panelContainer: {
    width: "90%",
    textAlign: "left",
    paddingLeft: '50px'
  },
  title: {
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '19px',
    color: '#1C1C1C',
    paddingBottom: '0px',
  },
  countDiv: {
    textAlign: 'right',
    paddingBottom: '10px',
  },
  slimBox: {
    padding: '5px',
    borderTop: '1px solid rgba(96,106,116,0.4)',
    width: '100%',
    border: '0px solid blue',
    margin: "0px",
    clear: "both"
  },

  frontBox: {
    textAlign: 'left',
    paddingLeft: '10px',
    width: "60%",
    border: '0px solid red',
    float: 'left',
    margin: "0px",
    clear: "both"
  },
  slimName: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 'bold',
    paddingRight: '5px',
    paddingTop: '10px',
    width: "200px",
    border: '0px solid green',
    float: 'left',
  },
  slimInfo: {
    color: '#1C2B39',
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '14px',
    margin: "0px",
    paddingLeft: "5px",
    textAlign: "left",
    border: '0px solid red',
    float: 'left',
  },

  townInfo: {
    color: '#1C2B39',
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '14px',
    margin: "0px",
    paddingLeft: "5px",
    paddingBottom: "5px",
    textAlign: "left",
    border: '0px solid red',

  },


  backBox: {
    paddingRight: '10px',
    paddingBottom: '5px',
    float: 'right',
    border: '0px solid green',
  },
  actionButton: {
    paddingLeft: '5px',
    display: "inline-block"
  },
  

});

class SlimList extends Component {
  render() {
    const { classes, energizers } = this.props;

    if (energizers.length > 0) {
     return (
      <div className={cx(classes.panelContainer)}>
        <div className={cx(classes.countDiv)}> Energizers Found: {energizers.length}</div>

        {energizers.map(energizer  => {
          return (
            <div className={cx(classes.slimBox)} key={energizer.id} >
                <div className={cx(classes.frontBox)}>
                    <div className={cx(classes.slimName)}>
                        {energizer.firstName} {energizer.middleName} {energizer.lastName}
                    </div>
                    <div className={cx(classes.slimInfo)}>
                            <div className={cx(classes.townInfo)}>
                                {energizer.bornTown&& (energizer.bornTown+", ")}
                                {energizer.bornState&& (energizer.bornState)}              
                            </div>
                            <div className={cx(classes.townInfo)}>
                                {energizer.homeTown&& (energizer.homeTown+", ")}
                                {energizer.homeState&& (energizer.homeState)}
                            </div>
                    </div>
                    

                </div> 
                <div className={cx(classes.backBox)}>  
                    <span className={cx(classes.actionButton)}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.props.onEditEnergizer ({ energizer })}
                        >Edit Profile</Button>
                    </span>
                    <span className={cx(classes.actionButton)}>
                        <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.props.onStartScrapeWiki ({ energizer })}
                        >Pull from WikiPage</Button>
                    </span>
                </div>       
            </div>    
          ); //return
        })}
      </div>
     ) //return
    } else {

       return (<div> <b>No results </b></div>)

    } //if

  } //render
}

export default withStyles(styles)(SlimList);

