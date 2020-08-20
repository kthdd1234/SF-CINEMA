import React from 'react';
import './DownSlideShow.css';
import { Card } from 'antd';

const { Meta } = Card;

function SlideImgEntry({ movie, alt, setModalVisible, handleCurrentMovie }) {
   if (movie !== null) {
      let { title, posters, releaseDate, userRating } = movie;
      let poster = JSON.parse(posters)[0];
      let convertStrDate = String(releaseDate);

      convertStrDate = convertStrDate
         .replace(/(.{4})/, '$1.')
         .replace(/(.{7})/, '$1.');

      return (
         <div>
            <Card
               size="small"
               hoverable
               className="movie-card"
               onClick={() => {
                  setModalVisible(true);
                  handleCurrentMovie(arguments[0].movie);
               }}
               cover={<img src={poster} alt={`img${alt}`} />}
            >
               <Meta
                  title={title}
                  description={`${convertStrDate} ꒐ ⭐ ${userRating}`}
               />
            </Card>
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
