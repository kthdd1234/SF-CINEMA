import React from 'react';
import { Tag } from 'antd';

const Info = ({ userRating, numberOfLikes, genre, ratingGrade, runtime }) => {
   const info = {
      '영화 평점': [userRating, 'success'],
      재밌어요: [numberOfLikes, 'geekblue'],
      장르: [genre, 'magenta'],
      등급: [ratingGrade, 'blue'],
      재생시간: [runtime, 'default'],
   };

   return (
      <div className="movie-contents-info">
         {Object.entries(info).map((data, i) => (
            <Tag
               key={i}
               className="movie-contents-info-tag"
               color={data[1][1]}
            >{`${data[0]} : ${data[1][0]}`}</Tag>
         ))}
      </div>
   );
};

export default Info;
