import React from 'react';

function TopSlideDetailImg({
   movie,
   alt,
   setModalVisible,
   handleCurrentMovie,
}) {
   const posters = JSON.parse(movie.posters);

   return (
      <div>
         <div className="slide-center-mode">
            <img
               src={posters[0]}
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
