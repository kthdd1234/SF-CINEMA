/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import './TopSlideShow.css';

export default function TopSlideShow() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '100px',
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
  };
  return (
    <div>
      {' '}
      <div className="containerSlide">
        <Slider {...settings}>
          <div>
            <img
              src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2014/1123/IE001775801_STD.jpg"
              alt="img1"
            />
          </div>
          <div>
            <img
              src="http://imgnews.naver.net/image/277/2015/10/02/2015091615053871593_1_99_20151002170102.jpg"
              alt="img2"
            />
          </div>
          <div>
            <img
              src="https://www.culturalfemminile.com/wp-content/uploads/2017/10/SUiavMWW5Vo.movieposter_maxres.jpg"
              alt="img3"
            />
          </div>
          <div>
            <img
              src="http://blogfiles.naver.net/20130724_216/blast709_1374671776229z4kn0_JPEG/gravity-poster-550x309.jpg"
              alt="img4"
            />
          </div>
          <div>
            <img
              src="https://t1.daumcdn.net/cfile/tistory/99A7B4435A450D990C"
              alt="img5"
            />
          </div>
          <div>
            <img
              src="https://t1.daumcdn.net/cfile/tistory/23657347590EB20116"
              alt="img6"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

// const proprietes = {
//   duration: 5000,
//   transitionDuration: 500,
//   infinite: true,
//   indicators: true,
//   pauseOnHover: true,
//   arrows: true,
// };
{
  /* <Slide {...proprietes}>
        <div className="each-slide">
          <div>
            <img
              src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2014/1123/IE001775801_STD.jpg"
              alt="img1"
            />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img
              src="http://imgnews.naver.net/image/277/2015/10/02/2015091615053871593_1_99_20151002170102.jpg"
              alt="img2"
            />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img
              src="http://blogfiles.naver.net/MjAxNzAyMDFfNzcg/MDAxNDg1OTEzNTQ1MzQ3.KnCkYUQB81FF33jAr4ZamATgHQX7XubvjcCKurQVXGIg.bQbwOggAODxmUAZh9P-6_himwfJGaqqVCCqpNcb0Ch0g.JPEG.wjdwjdrbfl/Arrival_2016_12804073.jpg"
              alt="img3"
            />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img
              src="http://blogfiles.naver.net/20130724_216/blast709_1374671776229z4kn0_JPEG/gravity-poster-550x309.jpg"
              alt="img4"
            />
          </div>
        </div>
      </Slide> */
}
