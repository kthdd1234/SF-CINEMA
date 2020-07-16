import React from 'react';
import Slider from 'react-slick';
import './DownSlideShow.css';
import SlideImgEntry from './SlideImgEntry';
import NextArrow from './NextArrow';
import PrevArrow from './PreArrow';

function DownSlideShow({ imgList }) {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  const mainSubjects = [
    '평점이 높은 영화 SF 영화(9점이상)',
    '최근 개봉한 SF 영화(2020~2019)',
    '운영자가 추천하는 SF 영화',
    '주말에 몰아보기 좋은 SF 명작 추천',
    'SF 시리즈물 강력 추천(Top3)',
  ];
  let id = 0;
  return (
    <div>
      <h2 className="mainSubject">평점이 높은 SF 영화(9점이상)</h2>
      <div className="container-all-Slide">
        <Slider {...settings}>
          {imgList.map((img) => (
            <SlideImgEntry key={id++} img={img} alt={id} />
          ))}
        </Slider>
      </div>
      <h2 className="mainSubject">최근 개봉한 SF 영화(2020~2019)</h2>
      <div className="container-all-Slide">
        <Slider {...settings}>
          {imgList.map((img) => (
            <SlideImgEntry key={id++} img={img} alt={id} />
          ))}
        </Slider>
      </div>
      <h2 className="mainSubject">운영자가 추천하는 SF 영화</h2>
      <div className="container-all-Slide">
        <Slider {...settings}>
          {imgList.map((img) => (
            <SlideImgEntry key={id++} img={img} alt={id} />
          ))}
        </Slider>
      </div>
      <h2 className="mainSubject">주말에 몰아보기 좋은 SF 명작 추천</h2>
      <div className="container-all-Slide">
        <Slider {...settings}>
          {imgList.map((img) => (
            <SlideImgEntry key={id++} img={img} alt={id} />
          ))}
        </Slider>
      </div>
      <h2 className="mainSubject">SF 시리즈물 강력 추천(Top3)</h2>
      <div className="container-all-Slide">
        <Slider {...settings}>
          {imgList.map((img) => (
            <SlideImgEntry key={id++} img={img} alt={id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default DownSlideShow;
