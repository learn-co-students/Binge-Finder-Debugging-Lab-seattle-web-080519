import React from "react";

const tvShow = props => {
  const { show } = props;
  if (!show.image) {
    console.log(show.id);
    console.log(show.image);
  }

  return (
    <div>
      <br />
      <img
        src={show.image ? show.image.medium : ""}
        onClick={() => props.selectShow(show)}
        alt="Show Poster"
      />
    </div>
  );
};

export default tvShow;
