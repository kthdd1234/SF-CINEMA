import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getMovie } from './request/getMovie';
import Trailer from './component/Trailer';
import Titles from './component/Titles';
import BackDrop from './component/BackDrop';
import Info from './component/Info';
import Plot from './component/Plot';
import Person from './component/Person';
import Btns from './component/Btns';
import './Movie.css';

const Movie = ({ isLogin, profile, handleProfileUpdate }) => {
   const [movie, setMovie] = useState([]);
   const [trailer, setTrailer] = useState(false);

   useEffect(() => {
      const req = async () => {
         const movie = await getMovie();
         setMovie(movie);
      };
      req();
   }, []);

   const {
      id,
      title,
      titleEng,
      genre,
      director,
      plot,
      actors,
      releaseDate,
      runtime,
      ratingGrade,
      userRating,
      backDrop,
      videoId,
      numberOfLikes,
   } = movie;

   return (
      <div className="movie">
         <div className="movie-contents">
            <Titles
               title={title}
               titleEng={titleEng}
               releaseDate={releaseDate}
            />
            <Info
               userRating={userRating}
               genre={genre}
               ratingGrade={ratingGrade}
               runtime={runtime}
               numberOfLikes={numberOfLikes}
            />
            <Plot plot={plot} />
            <Person director={director} actors={actors} />
            <Btns
               isLogin={isLogin}
               movieId={id}
               profile={profile}
               handleProfileUpdate={handleProfileUpdate}
               setTrailer={setTrailer}
            />
         </div>
         <BackDrop backDrop={backDrop} />
         {trailer ? (
            <Trailer videoId={videoId} setTrailer={setTrailer} />
         ) : null}
      </div>
   );
};

export default withRouter(Movie);
