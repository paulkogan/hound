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
  title: {
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '19px',
    color: '#1C1C1C',
    paddingBottom: '24px',
  },
  energizerTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 'normal',
    paddingRight: '5px',
  },
  energizerSubTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 'normal',
    color: '#494949',
    textTransform: 'capitalize',
  },
  panelDetails: {
    borderTop: '1px solid rgba(96,106,116,0.4)',
    padding: '24px 0',
  },
  panelDetailsSection: {
    paddingBottom: '34px',
  },
  panelDetailsSectionTitle: {
    fontSize: '12px',
    lineHeight: '14px',
    textTransform: 'uppercase',
    color: '#606A74',
    fontWeight: 'normal',
  },
  panelDetailsSectionText: {
    color: '#1C2B39',
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '19px',
  },
  panelActions: {
    padding: '24px',
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
    return (
      <div>
        {energizers.map(energizer  => {
          return (
            <ExpansionPanel key={energizer.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h2 className={cx(classes.energizerTitle)}>
                  {energizer.lastName}, {energizer.firstName}
                </h2>
                <h3 className={cx(classes.energizerSubTitle)}>
                  ({energizer.occupation})
                </h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={cx(classes.panelDetails)}>
                <Grid container justify={'center'}>
                  <Grid item xs={12} lg={3}>
                    <div className={cx(classes.panelDetailsSection)}>
                      <h4 className={cx(classes.panelDetailsSectionTitle)}>
                        Name
                      </h4>
                      <span className={cx(classes.panelDetailsSectionText)}>
                          {energizer.firstName} {energizer.lastName}
                      </span>
                    </div>

                    <div className={cx(classes.panelDetailsSection)}>
                      <h4 className={cx(classes.panelDetailsSectionTitle)}>
                        Occupation
                      </h4>
                      <span className={cx(classes.panelDetailsSectionText)}>
                        {energizer.occupation || '--'}
                      </span>
                    </div>

                    <div className={cx(classes.panelDetailsSection)}>
                      <h4 className={cx(classes.panelDetailsSectionTitle)}>
                        Wiki Page
                      </h4>
                      <span className={cx(classes.panelDetailsSectionText)}>
                        {energizer.wikiPage}
                      </span>
                    </div>
                  </Grid>

                  <Grid item xs={12} lg={3}>
                    <div className={cx(classes.panelDetailsSection)}>
                      <h4 className={cx(classes.panelDetailsSectionTitle)}>
                        Home Town
                      </h4>
                      <span className={cx(classes.panelDetailsSectionText)}>
                        {energizer.homeTown}, {energizer.homeState},
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
                  Edit Info
                </Button>

              </ExpansionPanelActions>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(ExpansionList);
