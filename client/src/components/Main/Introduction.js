import React, { Component } from 'react';
import SFCINEMA from '../../SFCINEMA.png';

class Introduction extends Component {
   render() {
      return (
         <div>
            <div className="main-box-background-images">
               <div className="background-left-shadow" />
               <div className="introduce">
                  <div className="introduce-wrap">
                     <img className="introduce-logo" src={SFCINEMA} />

                     <h2 className="introduce-title">Welcome.</h2>
                     <h3 className="introduce-description">
                        lot of SF movies to discover.
                        <div>Explore now.</div>
                     </h3>
                  </div>
               </div>
               <img
                  className="main-background-images"
                  src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/yBG2J4dMnUViwfF1crq0b7xystj.jpg`}
               />
            </div>
         </div>
      );
   }
}

export default Introduction;
