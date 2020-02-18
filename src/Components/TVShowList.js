import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import TVShow from "./TVShow.js";

class TVShowList extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      window.scrollTo(0, 0);
      this.props.handleBottomOfPage();
    }
  };

  mapAllShows = () => {
    if (!!this.props.searchTerm) {
      return this.props.shows.map(show => {
        if (show.name.toLowerCase().includes(this.props.searchTerm)) {
          return (
            <TVShow
              show={show}
              key={show.id}
              selectShow={this.props.selectShow}
            />
          );
        }
        return null;
      });
    }
    return this.props.shows.map(show => (
      <TVShow show={show} key={show.id} selectShow={this.props.selectShow} />
    ));
  };

  render() {
    return (
      <div className="TVShowList">
        <Grid>{this.mapAllShows()}</Grid>
      </div>
    );
  }
}

export default TVShowList;
