import React from 'react';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';

export default function Body({ imgList }) {
  return (
    <div>
      <TopSlideShow />
      <DownSlideShow imgList={imgList} />
    </div>
  );
}
