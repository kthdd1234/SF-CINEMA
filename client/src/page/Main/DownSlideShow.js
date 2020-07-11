import React from 'react';
import Slider from 'react-slick';
import img1 from '../../img/img4.png';
import img2 from '../../img/img5.png';
import img3 from '../../img/img6.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DownSlideShow.css';
import moduleName from 'react-bootstrap';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        padding: '10px',
        background: 'silver',
        borderRadius: '20px',
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        padding: '10px',
        background: 'silver',
        borderRadius: '20px',
        margin: '0 0 0 -30px',
      }}
      onClick={onClick}
    />
  );
}

function DownSlideShow() {
  const settings = {
    infinite: true,

    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div>
      <h2
        style={{
          margin: '20px',
        }}
      >
        외계인
      </h2>
      <div className="container-all-Slide">
        <Slider {...settings}>
          <div>
            <img src={img1} alt="img4" />
          </div>
          <div>
            <img src={img2} alt="img4" />
          </div>
          <div>
            <img src={img3} alt="img4" />
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default DownSlideShow;
