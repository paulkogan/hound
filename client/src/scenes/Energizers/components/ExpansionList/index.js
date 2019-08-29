import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
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

class ExpansionList extends Component {
  render() {
    const { classes, energizers } = this.props;

    if (energizers.length > 0) {
     return (
      <div className={cx(classes.panelContainer)}>
        {energizers.map(energizer  => {
          return (
            <ExpansionPanel key={energizer.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h2 className={cx(classes.energizerTitle)}>
                  {energizer.firstName} {energizer.lastName}
                </h2>
                <h3 className={cx(classes.energizerSubTitle)}>
                  ({energizer.occupation})
                </h3>
              </ExpansionPanelSummary>


              <ExpansionPanelDetails className={cx(classes.panelDetails)}>
                <Grid container justify={'center'}>
                            <Grid item xs={4} lg={4}>
                              <div className={cx(classes.panelDetailsSection)}>
                                <h4 className={cx(classes.panelDetailsSectionTitle)}>
                                  Name
                                </h4>
                                <span className={cx(classes.panelDetailsSectionText)}>
                                    {energizer.firstName} {energizer.lastName}
                                </span>
                              </div>
                            </Grid>

                            <Grid item xs={4} lg={4}>
                              <div className={cx(classes.panelDetailsSection)}>
                                <h4 className={cx(classes.panelDetailsSectionTitle)}>
                                  Occupation
                                </h4>
                                <span className={cx(classes.panelDetailsSectionText)}>
                                  {energizer.occupation || '--'}
                                </span>
                              </div>
                            </Grid>


                            <Grid item xs={4} lg={4}>
                              <div className={cx(classes.panelDetailsSection)}>
                                <h4 className={cx(classes.panelDetailsSectionTitle)}>
                                </h4>
                                <span className={cx(classes.panelDetailsSectionText)}>
                                  {'--'}
                                </span>
                              </div>
                            </Grid>

                        <Grid item xs={4} lg={4}>
                          <div className={cx(classes.panelDetailsSection)}>
                            <h4 className={cx(classes.panelDetailsSectionTitle)}>
                              Born Town
                            </h4>
                            <span className={cx(classes.panelDetailsSectionText)}>
                              {energizer.bornTown ?
                                energizer.bornTown+ ", "+energizer.bornState : "  "
                              }
                            </span>
                          </div>
                        </Grid>



                        <Grid item xs={4} lg={4}>
                          <div className={cx(classes.panelDetailsSection)}>
                            <h4 className={cx(classes.panelDetailsSectionTitle)}>
                              Home Town
                            </h4>
                            <span className={cx(classes.panelDetailsSectionText)}>
                              {energizer.homeTown ?
                                energizer.homeTown+ ", "+energizer.homeState : "  "
                              }
                            </span>
                          </div>
                        </Grid>


                        <Grid item xs={4} lg={4}>
                          <div className={cx(classes.panelDetailsSection)}>
                            <h4 className={cx(classes.panelDetailsSectionTitle)}>
                              Current Town
                            </h4>
                            <span className={cx(classes.panelDetailsSectionText)}>
                            {energizer.currentTown ?
                              energizer.currentTown+ ", "+energizer.currentState : "  "
                            }

                            </span>
                          </div>
                        </Grid>


                </Grid>
              </ExpansionPanelDetails>

              <ExpansionPanelActions className={cx(classes.panelActions)}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.props.onEditEnergizer ({ energizer })}
                >
                  Edit Profile
                </Button>


                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.props.onStartScrapeWiki ({ energizer })}
                >
                  Pull from WikiPage
                </Button>




              </ExpansionPanelActions>
            </ExpansionPanel>
          );
        })}
      </div>
    )} else {

       return (<div> <b>No results </b></div>)

    } //if

  } //render
}

export default withStyles(styles)(ExpansionList);
