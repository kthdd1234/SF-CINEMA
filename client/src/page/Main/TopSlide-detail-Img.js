import React from 'react';

function TopSlideDetailImg({ movie, alt }) {
  let { posters } = movie;
  let poster = JSON.parse(posters);
  poster = Array.isArray(poster) ? poster[0] : poster;

  return (
    <div>
      <div>
        <img src={poster} alt={`img${alt}`} />
      </div>
    </div>
  );
}

export default TopSlideDetailImg;
