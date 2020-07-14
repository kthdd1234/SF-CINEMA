import React from 'react';
import './DownSlideShow.css';

export default function SlideImgEntry({ img, alt }) {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div>
        <img src={img} alt={`img${alt}`} />
      </div>
      <div className="title">인터스텔라(InterSteller)</div>
      <span className="releaseDate">2014.11.06</span>
      <span> | </span>
      <span className="rating">⭐ 9.11</span>
    </div>
  );
}
