import React, { Component } from 'react';
import './Trailer.css';

class Trailer extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const { videoId } = this.props;

      return (
         <div className="movie-trailer-container">
            <iframe
               className={`movie-trailer ` + videoId}
               src={`https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&enablejsapi=1&html5=1`}
               allowFullScreen
               frameBorder="0"
            />
         </div>
      );
   }
}

export default Trailer;
