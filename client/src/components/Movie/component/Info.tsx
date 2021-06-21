import React from 'react';
import { Tag } from 'antd';

interface IInfo {
   userRating: number;
   numberOfLikes: number;
   genre: string;
   ratingGrade: string;
   runtime: string;
}

const Info = ({ userRating, numberOfLikes, genre, ratingGrade, runtime }: IInfo) => {
   const info = [
      { tagName: '영화 평점', tagValue: userRating, tagColor: 'success' },
      { tagName: '재밌어요', tagValue: numberOfLikes, tagColor: 'geekblue' },
      { tagName: '특징', tagValue: genre, tagColor: 'magenta' },
      { tagName: '등급', tagValue: ratingGrade, tagColor: 'blue' },
      { tagName: '재생 시간', tagValue: runtime, tagColor: 'default' },
   ];

   return (
      <div className="movie-contents-info">
         {info.map((data, i) => (
            <Tag
               key={i}
               className="movie-contents-info-tag"
               color={data.tagColor}
            >{`${data.tagName} : ${data.tagValue}`}</Tag>
         ))}
      </div>
   );
};

export default Info;
