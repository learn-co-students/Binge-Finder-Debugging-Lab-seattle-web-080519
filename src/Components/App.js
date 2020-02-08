import React, { Component } from "react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";
import { Grid } from "semantic-ui-react";

class App extends Component {
  state = {
    shows: [],
    episodes: [],
    searchTerm: "",
    selectedShow: "",
    filterByRating: "",
    currentPage: 0
  };

  componentDidMount() {
    this.getShows();
  }

  getShows = () => {
    Adapter.getShows(this.state.currentPage).then(newShows =>
      // this.setState(prevState => ({ shows: [...prevState.shows, shows }))
      this.setState({ shows: newShows })
    );
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

  handleBottomOfPage = () => {
    this.setState(
      prevState => ({ currentPage: prevState.currentPage + 1 }),
      () => this.getShows()
    );
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() });
  };

  handleFilter = e => {
    e.target.value === "No Filter"
      ? this.setState({ filterByRating: "" })
      : this.setState({ filterByRating: e.target.value });
  };

  selectShow = show => {
    Adapter.getShowEpisodes(show.id).then(episodes =>
      this.setState({
        selectedShow: show,
        episodes: episodes
      })
    );
  };

  displayShows = () => {
    if (this.state.filterByRating) {
      return this.state.shows.filter(show => {
        return show.rating.average >= this.state.filterByRating;
      });
    } else {
      return this.state.shows;
    }
  };

  render() {
    return (
      <div>
        <Nav
          handleFilter={this.handleFilter}
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? (
              <SelectedShowContainer
                selectedShow={this.state.selectedShow}
                episodes={this.state.episodes}
              />
            ) : (
              <div />
            )}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList
              shows={this.displayShows()}
              selectShow={this.selectShow}
              searchTerm={this.state.searchTerm}
              handleBottomOfPage={this.handleBottomOfPage}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
