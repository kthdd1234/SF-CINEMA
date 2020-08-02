import React from 'react';
import SubjectSummary from './Subject-summary';
import './Subject.css';

function SubjectListEntry({
   title,
   titleEng,
   director,
   plot,
   posters,
   nation,
   actors,
   releaseDate,
   releaseYear,
   runtime,
   ratingGrade,
   userRating,
}) {
   const sub_list = [
      'SF/모험',
      nation,
      `${releaseDate} 개봉`,
      ratingGrade,
      `${runtime}분`,
   ];
   return (
      <div>
         <div className="moive-content">
            <div className="movie-img-box">
               <img className="movie-img" src={posters}></img>
            </div>
            <div className="movie-info">
               <div className="movie-headers">
                  <div className="movie-title-list">
                     <strong className="movie-title">{title}</strong>
                     <div>
                        <strong className="movie-titleEng_year">
                           {`(${titleEng}, ${releaseYear})`}
                        </strong>
                     </div>
                  </div>
                  <ul className="movie-rating-list">
                     <li className="movie-user-rating">
                        <strong className="movie-rating">평점</strong>⭐ ⭐ ⭐
                        ⭐ ⭐ {userRating}
                     </li>
                     <li className="movie-my-rating">
                        <strong className="movie-rating">나의 평점</strong>
                        ☆☆☆☆☆☆ 9.50
                     </li>
                  </ul>
               </div>

               <hr className="border-bottom-line" />

               <div className="movie-body">
                  <ul className="movie-summary">
                     {sub_list.map((sub, i) => (
                        <SubjectSummary key={i} sub={sub} i={i} />
                     ))}
                  </ul>
                  <div className="movie-plot">{plot}</div>

                  <hr className="border-bottom-line" />

                  <div className="movie-director_actors_awards">
                     <div className="movie-director">
                        <strong className="movie-sub">감독</strong>
                        {director}
                     </div>
                     <div className="movie-actors">
                        <strong className="movie-sub">출연</strong>
                        {actors}
                     </div>
                     <div className="movie-awards">
                        <strong className="movie-sub">수상</strong>
                        아카데미 시각효과상, 엠파이어 영화상, 엠파이어 감독상
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
// eslint-disable-next-line
export default SubjectListEntry;
