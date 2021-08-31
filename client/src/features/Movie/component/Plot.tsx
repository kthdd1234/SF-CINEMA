import React from 'react';

interface IPlot {
   plot: string;
}

const Plot = ({ plot }: IPlot) => {
   return <div className="movie-contents-plot">{plot}</div>;
};

export default Plot;
