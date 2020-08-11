import React from 'react';
import './DownSlideShow.css';

function SlideImgEntry({ movie, alt, setModalVisible, handleCurrentMovie }) {
   if (movie !== '') {
      let { title, posters, releaseDate, userRating } = movie;
      let poster = JSON.parse(posters)[0];
      let convertStrDate = String(releaseDate);

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
               <img
                  src={poster}
                  alt={`img${alt}`}
                  onClick={() => {
                     setModalVisible(true);
                     handleCurrentMovie(arguments[0].movie);
                  }}
               />
            </div>
            <div className="title">
               <strong>{title}</strong>
            </div>
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
            <div>
               없음<strong className="title">없음</strong>
            </div>
            <div>⭐</div>
         </div>
      );
   }
}

export default SlideImgEntry;
