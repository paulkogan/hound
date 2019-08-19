import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import ExpansionList from './components/ExpansionList';
import EnergizerProfile from './components/EnergizerProfile';
import ReviewWikiResults from './components/ReviewWikiResults';
import SearchPage from './components/Search';
import { TextField } from '@material-ui/core';
import * as cx from 'classnames';
import * as api from '../../services/api';

class Energizers extends Component {


  constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        openEditModal:false,
        openReviewWikiModal:false,
        openSearchModal:false,
        energizerUnderEdit : {},
        wikiResults: {},
        energizers: [],
        filteredEnergizers: [],
        searchTerm: "none"
      }
  }


  async componentDidMount() {

      this.refreshEnergizers()
  }


async refreshEnergizers() {

  this.setState({ isLoading: true });
  const energizers = await api.fetchEnergizers();
  this.setState({ isLoading: false,
                  energizers
  });

}


  onEditEnergizer = ({ energizer }) => {
    this.setState({ energizerUnderEdit: energizer, openEditModal: true });
  };


  onNewEnergizer = () => {
      this.setState({ energizerUnderEdit: {}, openEditModal: true });
  };

  // onOpenSearch = () => {
  //     this.setState({ openSearchModal: true });
  // };


  // doSearch = async searchTerm => {
  //     this.setState({ openSearchModal: true });
  // };

  onStartScrapeWiki = async  energizer  => {
      try {
        let wikiResults = await api.scrapeWikiUrl(energizer);
        console.log("FRONTEND", wikiResults)
        this.props.enqueueSnackbar('Got Wiki Page')
        await this.setState({
          energizerUnderEdit: energizer,
          wikiResults,
          openReviewWikiModal: true
        });


      } catch (err) {
        console.log("problem", err)
         this.props.enqueueSnackbar(
           'Oops, something went wrong getting Wiki page'
         );
      }
  };



  updateEnergizer = async energizer => {
    try {
      await api.updateEnergizer(energizer);
      this.refreshEnergizers();
      this.props.enqueueSnackbar('Energizer updated!');
    } catch {
       this.props.enqueueSnackbar(
        'Oops, something went wrong. Please Try again'
       );
    }
  };

  createEnergizer = async energizer => {
    try {
      await api.createEnergizer(energizer);
      this.refreshEnergizers();
      this.props.enqueueSnackbar('Energizer created!');
    } catch {
       this.props.enqueueSnackbar(
         'Oops, something went wrong. Please Try again'
       );
    }
  };





//search
handleChange = event => {
    const { Energizers } = this.state;
    const searchedEnergizerName = event.target.value.toLowerCase();

    if (searchedEnergizerName) {
      this.setState({
        filteredEnergizers: Energizers.filter(
          Energizer =>
            Energizer.name &&
            Energizer.name.toLowerCase().includes(searchedEnergizerName)
        ),
      });
    } else {
      this.setState({ filteredEnergizers: Energizers });
    }
  };

onDialogClose = () => {
  this.setState({
    openEditModal: false,
    openReviewWikiModal: false,
    openSearchModal: false,
    energizerUnderEdit: {},
  });
};



  render() {
    const { classes } = this.props;
    const { energizers, searchTerm, wikiResults, energizerUnderEdit, openEditModal, openSearchModal, openReviewWikiModal} = this.state;

    return (
      <div className={cx(classes.root)}>
        <header>
          <h1 className={cx(classes.title)}>Energizers</h1>
        </header>

        <div>
          <ExpansionList
            energizers={energizers}
            onEditEnergizer={this.onEditEnergizer}
            onStartScrapeWiki = {this.onStartScrapeWiki}
          />

        </div>

       {openEditModal && (
        <div>
          <EnergizerProfile
            energizer={energizerUnderEdit}
            updateEnergizer={this.updateEnergizer}
            createEnergizer={this.createEnergizer}
            onClose={this.onDialogClose}
          />

        </div>
      )}



        {openReviewWikiModal && (
         <div>
           <ReviewWikiResults
             energizer={energizerUnderEdit}
             wikiResults={wikiResults}
             updateEnergizer={this.updateEnergizer}
             onClose={this.onDialogClose}
           />
         </div>

      )}

     </div>
    ) //return
  }
}

const styles = () => {
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
  EnergizerTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 'normal',
    paddingRight: '5px',
  },
  EnergizerSubTitle: {
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
    textAlign: 'left',
    paddingTop: '24px',
  },
};

export default withSnackbar(withStyles(styles)(Energizers));

    //display: 'inline-block'


// {openSearchModal && (
//  <div>
//    <SearchPage
//      doSearch={this.doSearch}
//      onClose={this.onDialogClose}
//    />
//  </div>
// )}



// <div className={cx(classes.actions)}>
//   <Button
//     color="primary"
//     variant="contained"
//     onClick={this.onNewEnergizer}
//   >
//     Add New Energizer
//   </Button>
//
//   <Button
//     color="primary"
//     variant="contained"
//     onClick={this.onOpenSearch}
//   >
//     Search
//   </Button>
//
//
// <div>
//   {searchTerm}
// </div>
//
// </div>
//
