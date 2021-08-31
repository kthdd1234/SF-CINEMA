import React, { useState } from 'react';
import { Title, Poster, Fade } from './component'
import Trailer from '../Movie/component/Trailer';
import 'antd/dist/antd.css';
import './Card.css';

interface ICard {
   movie: object
}

interface IMovie {
   id?: string;
   title?: string;
   posters?: string;
   videoId?: string;
}

const Card = ({ movie }: ICard) => {
   const [trailer, setTrailer] = useState(false);
   const { id, title, posters, videoId }: IMovie = movie;

   return (
      <div className="card">
         <div className="card-poster">
            <Poster poster={posters} />
            <Fade
               movieId={id}
               setTrailer={setTrailer}
            />
         </div>
         <Title title={title} />
         {trailer ? (
            <Trailer videoId={videoId} setTrailer={setTrailer} />
         ) : null}
      </div>
   );
};

export default Card;
