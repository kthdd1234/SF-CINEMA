import React from 'react';
import './DownSlideShow.css';

function SlideImgEntry({ movie, alt }) {
  if (movie !== '') {
    let { title, titleEng, posters, releaseDate, userRating } = movie;
    let poster = JSON.parse(posters);
    let convertStrDate = String(releaseDate);

    poster = Array.isArray(poster) ? poster[0] : poster;

    convertStrDate = convertStrDate
      .replace(/(.{4})/, '$1.')
      .replace(/(.{7})/, '$1.');

    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <div>
          <img src={poster} alt={`img${alt}`} />
        </div>
        <div className="title">{title}</div>
        {/* <div className="title-eng">{titleEng}</div> */}
        <span className="releaseDate">{convertStrDate}</span>
        <span> ꒐ </span>
        <span className="rating">⭐ {userRating}</span>
      </div>
    );
  } else {
    return (
      <div className="noting">
        <div>
          <img />
        </div>
        <div>없음</div>

        <div>⭐</div>
      </div>
    );
  }
}

export default SlideImgEntry;
