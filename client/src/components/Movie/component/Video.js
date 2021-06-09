import React from 'react';

const Video = ({ videoId }) => {
   return (
      <div className="movie-trailer-container">
         <iframe
            className="movie-trailer"
            src={`https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&enablejsapi=1&html5=1`}
            allowFullScreen
            frameBorder="0"
         />
      </div>
   );
};

export default Video;
