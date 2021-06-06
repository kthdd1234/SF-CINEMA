import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import Trailer from './Trailer';
import 'antd/dist/antd.css';
import './MovieList.css';
import './MovieCard.css';

const Title = ({ title }) => {
   return (
      <div>
         <div className="card-detail">
            <div className="card-detail-title">{title}</div>
         </div>
      </div>
   );
};

const Poster = ({ poster }) => {
   return (
      <img
         className="card-image"
         src={`https://image.tmdb.org/t/p/w500${poster}`}
      />
   );
};

const Fade = ({ movieId, handleSettingTrailer }) => {
   return (
      <div className="fade-box fade">
         <div className="btn-wrap">
            <Btn value="영화상세정보" movieId={movieId} />
            <Btn
               value="예고편 보기"
               handleSettingTrailer={handleSettingTrailer}
            />
         </div>
      </div>
   );
};

const Btn = ({ value, movieId, handleSettingTrailer }) => {
   const history = useHistory();
   return (
      <Button
         className="btn-detail-movie"
         type="ghost"
         onClick={() =>
            value !== '예고편 보기'
               ? history.push(`/movies/${movieId}`)
               : handleSettingTrailer(true)
         }
      >
         {value}
      </Button>
   );
};

const MovieCard = ({ movie }) => {
   const [trailer, setTrailer] = useState(false);
   const { title, posters, videoId } = movie;

   return (
      <div className="card-container">
         <div className="card-box-image">
            <Poster poster={posters} />
            <Fade
               history={history}
               movieId={movie.id}
               handleSettingTrailer={setTrailer}
            />
         </div>
         <Title title={title} />
         {trailer ? (
            <Trailer videoId={videoId} handleSettingTrailer={setTrailer} />
         ) : null}
      </div>
   );
};

export default withRouter(MovieCard);
