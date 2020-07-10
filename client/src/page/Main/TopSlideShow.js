/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Slide } from 'react-slideshow-image';
import img1 from '../../img/img1.png';
import img2 from '../../img/img2.png';
import img3 from '../../img/img3.png';
import img4 from '../../img/img4.png';
import 'react-slideshow-image/dist/styles.css';
import './TopSlideShow.css';

const proprietes = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  pauseOnHover: true,
  arrows: true,
};
export default function TopSlideShow() {
  return (
    <div className="containerSlide">
      <Slide {...proprietes}>
        <div className="each-slide">
          <div>
            <img src={img1} alt="img1" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src={img2} alt="img2" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src={img3} alt="img3" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src={img4} alt="img4" />
          </div>
        </div>
      </Slide>
    </div>
  );
}
