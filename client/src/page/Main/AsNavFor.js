import React, { Component } from 'react';
import Slider from 'react-slick';
import './DownSlideShow.css';
import SlideImgEntry from './SlideImgEntry';
import NextArrow from './NextArrow';
import PrevArrow from './PreArrow';

const settings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  adaptiveHeight: true,
};

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const { imgList } = this.props;
    let id = 0;
    return (
      <div>
        <h2 className="mainSubject">SF 시리즈물 강력 추천(Top3)</h2>
        <ul className="series-list">
          <li className="subheading">
            <h4>터미네이터</h4>
          </li>
          <li className="subheading">
            <h4>어벤져스</h4>
          </li>
          <li className="subheading">
            <h4>매트릭스</h4>
          </li>
        </ul>

        <div className="series-container">
          <div className="series-first-Slick">
            <Slider
              {...settings}
              asNavFor={this.state.nav2}
              ref={(slider) => (this.slider1 = slider)}
            >
              {imgList.map((img) => (
                <SlideImgEntry key={id++} img={img} alt={id} />
              ))}
            </Slider>
          </div>

          <Slider
            asNavFor={this.state.nav1}
            ref={(slider) => (this.slider2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
          >
            {imgList.map((img) => (
              <SlideImgEntry key={id++} img={img} alt={id} />
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
