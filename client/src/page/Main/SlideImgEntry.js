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
               style={{
                  width: 200,
                  borderRadius: '5px',
               }}
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
         // <div
         //    style={{
         //       textAlign: 'center',
         //    }}
         // >
         //    <div>
         //       <img
         //          src={poster}
         //          alt={`img${alt}`}
         //          onClick={() => {
         //             setModalVisible(true);
         //             handleCurrentMovie(arguments[0].movie);
         //          }}
         //       />
         //    </div>
         //    <div className="title">
         //       <strong>{title}</strong>
         //    </div>
         //    <span className="releaseDate">{convertStrDate}</span>
         //    <span> ꒐ </span>
         //    <span className="rating">⭐ {userRating}</span>
         // </div>
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
