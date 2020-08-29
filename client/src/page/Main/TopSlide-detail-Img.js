import React from 'react';

function TopSlideDetailImg({
   movie,
   alt,
   setModalVisible,
   handleCurrentMovie,
}) {
   return (
      <div>
         <div className="movie-poster-list">
            <img
               src={`https://image.tmdb.org/t/p/w500${movie.posters}`}
               alt={`img${movie.id}`}
               onClick={() => {
                  setModalVisible(true);
                  handleCurrentMovie(movie);
               }}
            />
         </div>
      </div>
   );
}

export default TopSlideDetailImg;
