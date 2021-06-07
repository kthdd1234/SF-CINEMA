import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import Trailer from './Trailer';
import 'antd/dist/antd.css';
import './MovieCard.css';

const Title = ({ title }) => {
   return <div className="movie_card-title">{title}</div>;
};

const Poster = ({ poster }) => {
   return (
      <img
         className="movie_card-poster-img"
         src={`https://image.tmdb.org/t/p/w500${poster}`}
      />
   );
};

const Fade = ({ movieId, handleSettingTrailer }) => {
   return (
      <div className="movie_card-fade fade">
         <div className="movie_card-btns">
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
         className="movie_card-btns-btn"
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
      <div className="movie_card">
         <div className="movie_card-poster">
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
