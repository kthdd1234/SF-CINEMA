import React, { Component } from 'react';
import './Trailer.css';

class Trailer extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="movie-trailer-container">
            <iframe
               className={`movie-trailer ` + this.props.videoId}
               src={`https://www.youtube.com/embed/${this.props.videoId}?mute=1&autoplay=1&enablejsapi=1&html5=1`}
               allowFullScreen
               frameBorder="0"
            />
         </div>
      );
   }
}

export default Trailer;
