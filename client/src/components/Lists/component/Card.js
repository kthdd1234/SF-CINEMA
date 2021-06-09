import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Title from './Title';
import Poster from './Poster';
import Trailer from '../../Movie/component/Trailer';
import Fade from './Fade';
import 'antd/dist/antd.css';
import '../Lists.css';

const Card = ({ movie }) => {
   const [trailer, setTrailer] = useState(false);
   const { title, posters, videoId } = movie;

   return (
      <div className="card">
         <div className="card-poster">
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

export default withRouter(Card);
