import React from 'react';

function TopSlideDetailImg({
  movie,
  alt,
  setModalVisible,
  handleCurrentMovie,
}) {
  let { posters } = movie;
  let poster = JSON.parse(posters);
  poster = Array.isArray(poster) ? poster[0] : poster;

  return (
    <div>
      <div>
        <img
          src={poster}
          alt={`img${alt}`}
          onClick={() => {
            setModalVisible(true);
            handleCurrentMovie(arguments[0].movie);
          }}
        />
      </div>
    </div>
  );
}

export default TopSlideDetailImg;
