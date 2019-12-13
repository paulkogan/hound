import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import CurrentUserContext, { CurrentUserConsumer, CurrentUserProvider }   from '../../contexts/CurrentUserContext.jsx';
import ExpansionList from './components/ExpansionList';
import EnergizerProfile from './components/EnergizerProfile';
import ReviewWikiResults from './components/ReviewWikiResults';
import SearchPage from './components/Search';
import ChartPage from './components/Chart';
import * as cx from 'classnames';
import * as api from '../../services/api';

let statesList = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]






class Energizers extends Component {



  state = {
    isLoading: true,
    openEditModal:false,
    openListModal:true,
    openReviewWikiModal:false,
    openSearchModal:false,
    openChartModal:false,
    energizerUnderEdit : {},
    wikiResults: {},
    energizers: [],
    filteredEnergizers: [],
    statesWithCounts: [],
    searchTerm: " ",
    stateCurrentUser: {}, 
    cookieUser: null
  }


 
  async componentDidMount() {
    const { history } = this.props;
    const { currentUser } = this.context;
    console.log("In Ener", currentUser.email)

    const cookies = new Cookies();
    const cookieUser = cookies.get('userEmail') || ""; 

    //if (!currentUser.email) {
    if (cookieUser==="") {
      history.push('/login');
      return;
    }
    this.setState({ 
      stateCurrentUser:currentUser,
      cookieUser
    });

    this.refreshEnergizers()
  }


async refreshEnergizers() {

  this.setState({ isLoading: true });
  const energizers = await api.fetchEnergizers();
  this.setState({ isLoading: false,
                  energizers,
                  filteredEnergizers: energizers
  });

}


  onEditEnergizer = ({ energizer }) => {
    this.setState({ energizerUnderEdit: energizer, openEditModal: true });
  };


  onNewEnergizer = () => {
      this.setState({ energizerUnderEdit: {}, openEditModal: true });
  };

  onOpenSearch = () => {
      this.setState({ openSearchModal: !this.state.openSearchModal });
  };

  onOpenChart = async () => {
      const statesMap = new Map()
      const {energizers, openListModal, openChartModal}  = this.state
      //statesWithCounts.set("test",608)
      energizers.forEach(enzr => {
            if(statesMap.has(enzr.bornState)) {
                  statesMap.set(enzr.bornState,statesMap.get(enzr.bornState)+1)
            } else {
                  statesMap.set(enzr.bornState,1)
            }
      })


      let statesWithCounts = []

      for (let [key,value] of statesMap.entries() ) {

        statesWithCounts.push({
          "stateName" : key,
          "numEnergizers" : value
        })
      }

      statesWithCounts.sort((a,b) => {
          return b.numEnergizers - a.numEnergizers
      })

      this.setState({
          openChartModal: !openChartModal,
          openListModal: !openListModal,
          statesWithCounts
      });
  };


  doSearch = async (searchTerm, statesOnly) => {
      const {energizers}  = this.state
      let filteredEnergizers = statesOnly ?
      energizers.filter (ezr => {
              return ezr.bornState.includes(searchTerm) || ezr.homeState.includes(searchTerm)
      })   :
      energizers.filter (ezr => {
              return ezr.bornState.includes(searchTerm) || ezr.homeState.includes(searchTerm) || ezr.currentState.includes(searchTerm) ||
              ezr.bio.includes(searchTerm) || ezr.earlyLife.includes(searchTerm) || ezr.education.includes(searchTerm)
             || ezr.playsWith.includes(searchTerm)
      })


      this.setState({ searchTerm, filteredEnergizers });
  };


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



  onClearSearch = () => {
    this.setState({
      openListModal: true,
      openEditModal: false,
      openReviewWikiModal: false,
      energizerUnderEdit: {},
      openSearchModal: false,
      openChartModal: false,
      searchTerm: " ",
      filteredEnergizers: this.state.energizers
    });
  };
  
  onDialogClose = () => {
    this.setState({
      openListModal: true,
      openEditModal: false,
      openReviewWikiModal: false,
      energizerUnderEdit: {},
      openSearchModal: false,
      openChartModal: false
    });
  };
  

onDialogClose = () => {
  this.setState({
    openListModal: true,
    openEditModal: false,
    openReviewWikiModal: false,
    energizerUnderEdit: {},
    openSearchModal: false,
    openChartModal: false
  });
};



  render() {
    const { classes } = this.props;
    const { statesWithCounts, filteredEnergizers, searchTerm, wikiResults,
      openListModal, openChartModal, openSearchModal, energizerUnderEdit,
      openEditModal, openReviewWikiModal} = this.state;

    return (
        <div className={cx(classes.root)}>
              <div className={cx(classes.actions)}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.onNewEnergizer}
                    >
                      Add Energizer
                    </Button>

                    <Button
                    className={cx(classes.actionButton)}
                    color="primary"
                    variant="contained"
                    onClick={this.onOpenChart}
                  >
                    States Map
                  </Button>

                  <Button
                  className={cx(classes.actionButton)}
                  color="primary"
                  variant="contained"
                  onClick={this.onOpenSearch}
                >
                  Search
                </Button>


                <span className={cx(classes.showSearchTerm)}>
                  {searchTerm}
                </span>

                <Button
                  className={cx(classes.actionButton)}
                  color="primary"
                  variant="contained"
                  onClick={this.onClearSearch}
                >
                  Clear
                </Button>

            </div>


            {openListModal && (
              <div>
                <ExpansionList
                  energizers={filteredEnergizers}
                  onEditEnergizer={this.onEditEnergizer}
                  onStartScrapeWiki = {this.onStartScrapeWiki}
                />

              </div>
              )}

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

            {openSearchModal && (
            <div>
              <SearchPage
                doSearch={this.doSearch}
                onClose={this.onDialogClose}
                statesList={statesList}
              />
            </div>
            )}

            {openChartModal &&  (
            <div>
              <ChartPage
                statesWithCounts = {statesWithCounts}
                doSearch={this.doSearch}
                onClose={this.onDialogClose}
              />
            </div>
            )}

            </div>
         )} 
  } //component


Energizers.contextType = CurrentUserContext;


const styles = () => ({
  root: {
    padding: '0px',
    paddingLeft: '30px',
  },
  title: {
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '19px',
    color: '#1C1C1C',
    margin: '0px',
    marginTop: '30px',
    paddingBottom: '0px',
    paddingLeft: '52px',
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
    marginLeft: '50px',
    paddingBottom: '30px',
  },
  actionButton: {
    marginLeft: '30px',
    marginRight: '0px',

  },
  showSearchTerm: {
    marginLeft: '30px',
    marginRight: '0px',

  },

});

export default withSnackbar(withStyles(styles)(Energizers));



          //  <div>
          //    {JSON.stringify(filteredEnergizers,null,4)}
          //  </div>
           //


           //search
          //  CICDSearch= event => {
          //      const { energizers } = this.state;
          //      const searchedEnergizerName = event.target.value.toLowerCase();
           //
          //      if (searchedEnergizerName) {
          //        this.setState({
          //          filteredEnergizers: energizers.filter(
          //            energizer =>
          //              energizer.name &&
          //              energizer.name.toLowerCase().includes(searchedEnergizerName)
          //          ),
          //        });
          //      } else {
          //        this.setState({ filteredEnergizers: Energizers });
          //      }
          //    };

          // <CurrentUserProvider>
          // <CurrentUserContext.Consumer>
          // {(context) => (
          //       <div>
          //             "from Provider/Consumer" {JSON.stringify(context.currentUser)}
          //             "from State-context" {JSON.stringify(stateCurrentUser)}
          //       </div>
          // )}  
          // </CurrentUserContext.Consumer>
          // </CurrentUserProvider>



//       <div>
//              "from Cookie" {JSON.stringify(cookieUser)}
//        </div>


// <CurrentUserConsumer>
//  {({ currentUser }) => (
//        <div>
//              "from Consumer" {JSON.stringify(currentUser)}
//              "from State-context" {JSON.stringify(stateCurrentUser)}
//        </div>
//  )}                   
//  </CurrentUserConsumer>
