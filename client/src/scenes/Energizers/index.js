import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Cookies from 'universal-cookie';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import CurrentUserContext  from '../../contexts/CurrentUserContext.jsx';
import SlimList from './components/SlimList';
import EnzProfileDialog from './components/EnzProfileDialog/EnzProfileDialog.jsx';
import ReviewWikiResults from './components/ReviewWikiResults.jsx';
import ReviewWikiDialog from './components/ReviewWikiDialog/ReviewWikiDialog.jsx';
import SearchPage from './components/Search';
import ChartPage from './components/Chart';
import UploadPage from './components/Upload';

import * as cx from 'classnames';
import * as api from '../../services/api';
import * as utils from '../../services/utils';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


class Energizers extends Component {


  state = {
    isLoading: true,
    openEditModal:false,
    openListModal:true,
    openReviewWikiModal:false,
    openSearchModal:false,
    openChartModal:false,
    openUploadModal:false,
    energizerUnderEdit: {},
    sortByAlpha:true,
    wikiResults: {},
    energizers: [],
    filteredEnergizers: [],
    statesWithCounts: [],
    searchTerm: "",
    stateCurrentUser: {}, 
    cookieUser: null
  }


 
  async componentDidMount() {
    const { history } = this.props;
    const { currentUser } = this.context;
   

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
    if (this.state.energizers.length < 1) {
      this.refreshEnergizers()
    }

  }

  downloadCSV = async () => {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      //const fileExtension = '.xlsx';


      let fileName = "energizers"
      if (this.state.searchTerm.length > 1) {
        fileName = fileName + "-"+this.state.searchTerm
      }
      fileName.concat(".csv")
      let csvData = this.state.filteredEnergizers;

      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName);
  }

// sortArray = async (enzArray) => {
//   if (this.state.sortByAlpha) {
//     console.log("SORTING BY ALPHA", enzArray.length)
//     await enzArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
//   } else {
//     //sort by created
//     console.log("SORTING BY createdAt", enzArray.length)
//     enzArray.sort((a, b) => {
//        if (!b.createdAt) return -1
//        if (!a.createdAt) return 1
//        if (b.createdAt > a.createdAt) {
//          return 1
//        } else {
//          return -1
//        }
//     })   
//   }
//   return enzArray
// }


refreshEnergizers = async () => {

    this.setState({ isLoading: true });
    let energizers = await api.fetchEnergizers(this.state.sortByAlpha) 
    //console.log("REFRESHED FROM from DB", energizers.length)
    this.setState({ 
      isLoading: false,
      energizers,
      filteredEnergizers: energizers 
    });
}




onChangeSort = async () => {

    await this.setState({ 
      //isLoading: true,
      sortByAlpha: !this.state.sortByAlpha,
    });
   
    this.onClearSearch()
    this.refreshEnergizers()

    // if (this.state.filteredEnergizers.length < this.state.energizers.length) {
    //   let filteredEnergizers =  this.sortArray(this.state.filteredEnergizers)
    //   this.setState({ 
    //               filteredEnergizers,
    //               isLoading: false
    //   });


    // } else {  //no filter  sort all
    //   let energizers = await this.sortArray(this.state.energizers)
    //   this.setState({ 
    //               energizers,
    //               isLoading: false
    //   });
    // }

};






doFilter = async (searchTerm, statesOnly) => {
  const {energizers}  = this.state
  
  let altState = (searchTerm.length === 2) ? utils.fullStateFromAcr(searchTerm) 
     : utils.acrFromFullState(searchTerm)
  let filteredEnergizers = statesOnly ?
      energizers.filter (ezr => {
              return ezr.bornState && ezr.bornState.toUpperCase() == searchTerm.toUpperCase() || 
              ezr.homeState && ezr.homeState.toUpperCase() == searchTerm.toUpperCase() ||
              ezr.bornState && altState && ezr.bornState.toUpperCase() == altState.toUpperCase()  || 
              ezr.homeState && altState && ezr.homeState.toUpperCase() == altState.toUpperCase() 
      })   :
      energizers.filter (ezr => {
              return ezr.bornState && ezr.bornState.toUpperCase() == searchTerm.toUpperCase() || 
              ezr.homeState && ezr.homeState.toUpperCase() == searchTerm.toUpperCase() ||
              ezr.currentState && ezr.currentState.toUpperCase() == searchTerm.toUpperCase() ||
              ezr.bornState && altState && ezr.bornState.toUpperCase() == altState.toUpperCase()  || 
              ezr.homeState && altState && ezr.homeState.toUpperCase() == altState.toUpperCase()  ||
              ezr.currentState && altState && ezr.currentState.toUpperCase() == altState.toUpperCase()  ||
              ezr.bornTown && ezr.bornTown.includes(searchTerm) || 
              ezr.homeTown && ezr.homeTown.includes(searchTerm) || 
              ezr.bio && ezr.bio.includes(searchTerm) || 
              ezr.earlyLife && ezr.earlyLife.includes(searchTerm) || 
              ezr.education && ezr.education.includes(searchTerm) || 
              ezr.highSchool && ezr.highSchool.includes(searchTerm) || 
              ezr.playsWith && ezr.playsWith.includes(searchTerm) ||
              ezr.firstName && ezr.firstName.includes(searchTerm) ||
              ezr.lastName && ezr.lastName.includes(searchTerm)
      })


  this.setState({ searchTerm, filteredEnergizers });
};



  onEditEnergizer = ({ energizer }) => {
    this.setState({ 
      energizerUnderEdit: energizer, 
      openEditModal: true,
      openListModal: true,
     });
  };


  onNewEnergizer = () => {
      this.closeAll()
      this.setState({ 
        openEditModal: true,
      });
  };

  onOpenSearch = () => {
      this.setState({ openSearchModal: !this.state.openSearchModal });
  };

  onOpenUpload = () => {
    this.setState({ openUploadModal: !this.state.openUploadModal });
};




  onOpenChart = async () => {     
      const {energizers, openListModal, openChartModal}  = this.state
      this.closeAll() 
      if (this.state.statesWithCounts.length < 1) {
        const statesMap = new Map()

        energizers.forEach(enzr => {
          if(statesMap.has(enzr.bornState)) {
                statesMap.set(enzr.bornState,statesMap.get(enzr.bornState)+1)
          } else {
                statesMap.set(enzr.bornState,1)
          }

          if(statesMap.has(enzr.homeState)) {
            statesMap.set(enzr.homeState,statesMap.get(enzr.homeState)+1)
          } else {
            statesMap.set(enzr.homeState,1)
          }


        })

        let statesWithCounts = []
        for (let [key,value] of statesMap.entries() ) {
          statesWithCounts.push({
            "stateName" : key,
            "numEnergizers" : value
          })
        }

        this.setState({
          statesWithCounts
        });
    }

    this.setState({
      openChartModal: true,
      openListModal: false
    });

  };


  onStartScrapeWiki = async  energizer  => {
      this.closeAll()
      this.setState({openListModal: true})
      try {
        let wikiResults = await api.scrapeWikiUrl(energizer);
        //console.log("WikiResults on FRONTEND", wikiResults)
        this.props.enqueueSnackbar('Got Wiki Page')
        await this.setState({
          energizerUnderEdit: energizer,
          wikiResults,
          openReviewWikiModal: true,
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
      let response = await api.updateEnergizer({updatedEnz:energizer});
      //console.log("FRONT end Update energizer resp", JSON.stringify(response,null,4));
      let updatedEnergizer = response.data
      let newFilteredEnergizers = this.state.filteredEnergizers
      let updateIndex = newFilteredEnergizers.findIndex(enz => enz.id === updatedEnergizer.id)
      newFilteredEnergizers.splice(updateIndex, 1, updatedEnergizer );
      this.setState({ 
        filteredEnergizers: newFilteredEnergizers
      });


      this.props.enqueueSnackbar('Energizer updated!');

    } catch (err) {
       this.props.enqueueSnackbar(
        'Oops, something went wrong with the Update. Please Try again'+err
       );
    }
  };

  createEnergizer = async energizer => {
    console.log("FRONT end CREATE energizer", JSON.stringify(energizer,null,4))

    try {
      await api.createEnergizer({newEnz:energizer});
      this.refreshEnergizers();
      this.props.enqueueSnackbar('Energizer created!');
    } catch {
       this.props.enqueueSnackbar(
         'Oops, something went wrong. Please Try again'
       );
    }
  };


  deleteEnergizer = async energizer => {
    try {
      await api.deleteEnergizer(energizer);
      this.onDialogClose() 
      //this.refreshEnergizers();
      let newFilteredEnergizers = this.state.filteredEnergizers
      let deleteIndex = newFilteredEnergizers.findIndex(enz => enz.id === energizer.id)
      newFilteredEnergizers.splice(deleteIndex, 1 );
      this.setState({ 
        filteredEnergizers: newFilteredEnergizers
      });

      this.props.enqueueSnackbar('Energizer deleted!');
    } catch {
       this.props.enqueueSnackbar(
         'Oops, something went wrong. Please Try again'
       );
    }
  };

  sendUploadList= async (enzList) => {

    let enzListWithWiki = enzList.map(enz => {
         
          if (!enz.wikiPage || enz.wikiPage.length <10 ) {
              let capFirst = enz.firstName.charAt(0).toUpperCase()
              if(enz.firstName.length > 0) capFirst+=enz.firstName.substring(1);
              let capLast = enz.lastName.charAt(0).toUpperCase()
              if(enz.lastName.length > 0) capLast+=enz.lastName.substring(1);
              let autoWiki = "https://en.wikipedia.org/wiki/"+capFirst+"_"+capLast
              console.log ("ADDING ", autoWiki)
              enz.wikiPage = autoWiki 
          }
          return enz
    })


    try {
      await api.sendUploadList({enzlist: enzListWithWiki});
      this.props.enqueueSnackbar('Energizer List Added!');
      this.refreshEnergizers();
      this.onDialogClose()

    } catch {
       this.props.enqueueSnackbar(
         'Oops, something went wrong with adding the List.'
       );
    }
  };

  closeAll = () => {
    this.setState({
      openListModal: false,
      openEditModal: false,
      openReviewWikiModal: false,
      energizerUnderEdit: {},
      openSearchModal: false,
      openChartModal: false,
      openUploadModal: false
    });
  }
  
  onClearSearch = () => {
    this.closeAll()
    this.setState({
      openListModal: true,
      searchTerm: "",
      filteredEnergizers: this.state.energizers
    });
  };


  onDialogClose = () => {
    this.closeAll()
    this.setState({
      openListModal: true,
    });
  };
  


  render() {
    const { classes } = this.props;
    const { statesWithCounts, filteredEnergizers, searchTerm, wikiResults,
      openListModal, openChartModal, openSearchModal, energizerUnderEdit,
      openEditModal, openUploadModal, openReviewWikiModal, isLoading, sortByAlpha} = this.state;

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
                      onClick={this.onOpenUpload}
                    >
                      Upload List
                    </Button>


                    <Button
                    className={cx(classes.actionButton)}
                    color="primary"
                    variant="contained"
                    onClick={this.downloadCSV}
                  >
                    Download List
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

                <Switch 
                  checked={sortByAlpha}
                  onChange={this.onChangeSort} 
                  value={sortByAlpha} 
                /> &alpha;
                 <div className={cx(classes.shortInstructions)}>
                 Dont use the browser back button. Use 'cancel' or 'save' when done.
                </div>
            </div>
            
            {openListModal && (
              
              <div>
                {!isLoading ? 
                <SlimList
                  energizers={filteredEnergizers}
                  onEditEnergizer={this.onEditEnergizer}
                  onStartScrapeWiki = {this.onStartScrapeWiki}
                  sortByAlpha = {sortByAlpha}
                /> : <div> Loading... </div>
              }
              </div> 

              )}

            {openEditModal && (
              <div>
                    <EnzProfileDialog
                      energizer={energizerUnderEdit}
                      updateEnergizer={this.updateEnergizer}
                      createEnergizer={this.createEnergizer}
                      deleteEnergizer={this.deleteEnergizer}
                      onClose={this.onDialogClose}
                    />
              </div>  
            )}


              {openReviewWikiModal && (
              <div>
                <ReviewWikiDialog
                  energizer={energizerUnderEdit.energizer}
                  wikiResults={wikiResults}
                  updateEnergizer={this.updateEnergizer}
                  onClose={this.onDialogClose}
                />
              </div>

            )}

            {openSearchModal && (
            <div>
              <SearchPage
                doSearch={this.doFilter}
                onClose={this.onDialogClose}
              />
            </div>
            )}

            {openChartModal &&  (
            <div>
              <ChartPage
                statesWithCounts = {statesWithCounts}
                doSearch={this.doFilter}
                onClose={this.onDialogClose}
              />
            </div>
            )}

            {openUploadModal &&  (
            <div>
              <UploadPage
                onClose={this.onDialogClose}
                sendUploadList = {this.sendUploadList}
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
  shortInstructions: {
    fontWeight: '300',
    fontSize: '12px',
    fontStyle: 'italic',
  }

});

export default withSnackbar(withStyles(styles)(Energizers));

