import React, { Component } from "react";
import Episode from "../Components/Episode";

class SelectedShowContainer extends Component {
  state = {
    selectedSeason: 1
  };

  mapSeasons = () => {
    if (!!this.props.episodes) {
      let seasonsArray = this.props.episodes.map(episode => episode.season);
      let uniqueSeasons = this.unique(seasonsArray);
      return uniqueSeasons.map(season => {
        return (
          <option value={season} key={season}>
            Season {season}
          </option>
        );
      });
    }
  };

  mapEpisodes = () => {
    return this.props.episodes.map(episode => {
      if (episode.season === this.state.selectedSeason) {
        return <Episode episode={episode} key={episode.id} />;
      }
      return null;
    });
  };

  unique = array => {
    let uniqueArray = [];
    for (let i of array) {
      if (!uniqueArray.includes(i)) {
        uniqueArray.push(i);
      }
    }
    return uniqueArray;
  };

  handleSelectionChange = e => {
    this.setState({ selectedSeason: parseInt(e.target.value, 10) });
  };

  render() {
    const { selectedShow } = this.props;
    return (
      <div style={{ position: "static" }}>
        <h2>{selectedShow.name}</h2>
        <img src={selectedShow.image.medium || ""} alt="" />
        <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></p>
        <p>Premiered: {selectedShow.premiered}</p>
        <p>Status: {selectedShow.status}</p>
        <p>Average Rating: {selectedShow.rating.average}</p>
        <select
          style={{ display: "block" }}
          onChange={this.handleSelectionChange}
        >
          {this.mapSeasons()}
        </select>
        {this.mapEpisodes()}
      </div>
    );
  }
}

export default SelectedShowContainer;
