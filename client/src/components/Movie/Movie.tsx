import React, { useState, useEffect } from 'react';
import { getMovie } from './request';
import {
   Trailer,
   Titles,
   BackDrop,
   Info,
   Plot,
   Person,
   Btns,
} from './component';
import './Movie.css';

interface IProps {
   isLogin?: boolean;
   profile?: object;
   handleProfileUpdate: Function;
}

interface IMovie {
   id: number;
   title: string;
   titleEng: string;
   genre: string;
   director: string;
   plot: string;
   actors: string;
   releaseDate: number;
   runtime: string;
   ratingGrade: string;
   userRating: number;
   backDrop: string;
   videoId: string;
   numberOfLikes: number;
}

const data = { 
   id: 0,
   title: '',
   titleEng: '',
   genre: '',
   director: '',
   plot: '',
   actors: '',
   releaseDate: 0,
   runtime: '',
   ratingGrade: '',
   userRating: 0,
   backDrop: '',
   videoId: '',
   numberOfLikes: 0, 
}




const Movie = ({ isLogin, profile, handleProfileUpdate }: IProps) => {
   const [movie, setMovie] = useState(data);
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
   }: IMovie = movie;


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

export default Movie;
