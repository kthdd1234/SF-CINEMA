import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Slider from 'react-slick';
import ModalImage from './Modal-image';
import ModalSummary from './Modal-summary';
import './ModalPage.css';

class ModalPage extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      let {
         title,
         titleEng,
         director,
         plot,
         posters,
         nation,
         actors,
         releaseDate,
         runtime,
         ratingGrade,
         userRating,
      } = this.props.currentMovie;

      const settings = {
         fade: true,
         infinite: true,
         autoplay: true,
         speed: 4000,
         autoplaySpeed: 3000,
         slidesToShow: 1,
         slidesToScroll: 1,
      };

      let MoviePlot = '';
      let lengthOfPlot = plot.length;
      if (lengthOfPlot > 310) {
         let check_spc = /[.!,(]/;
         MoviePlot = plot.substring(0, 310);
         let lastStr = '';
         do {
            lastStr = MoviePlot[MoviePlot.length - 1];
            MoviePlot = MoviePlot.slice(0, -1);
         } while (!check_spc.test(lastStr));
         MoviePlot = MoviePlot + '...';
      } else {
         for (let i = lengthOfPlot; i < 310; i++) {
            plot = plot + ' ' + '\u00A0';
         }
         MoviePlot = plot;
      }

      actors = JSON.parse(actors).slice(0, 4);
      actors = actors.join(', ');

      var poster_list = JSON.parse(posters);
      console.log(poster_list);
      poster_list = Array.isArray(poster_list) ? poster_list : [poster_list];

      let convertStrDate = String(releaseDate);
      let releaseYear = convertStrDate.slice(0, 4);
      convertStrDate = convertStrDate
         .replace(/(.{4})/, '$1.')
         .replace(/(.{7})/, '$1.');

      let summay_subs = [
         'SF/모험',
         nation,
         convertStrDate + ' 개봉',
         ratingGrade,
         runtime + '분',
      ];

      return (
         <div>
            <Slider {...settings}>
               {poster_list.map((img, i) => (
                  <ModalImage key={i} img={img} alt={i++} />
               ))}
            </Slider>

            <div className="modal-container">
               <strong className="modal-header-title">{title}</strong>
               <strong className="modal-header-titleEng_year">
                  {title.length < 11 ? `(${titleEng}, ${releaseYear})` : null}
               </strong>
               <div>
                  {title.length >= 11 ? (
                     <strong className="modal-header-titleEng_year">
                        {`(${titleEng}, ${releaseYear})`}
                     </strong>
                  ) : null}
               </div>

               <div>
                  <ul className="modal-rating-list">
                     <li className="modal-user-rating">
                        <strong>평점</strong> ⭐ ⭐ ⭐ ⭐ ⭐ {userRating}
                     </li>

                     <li className="modal-my-rating">
                        <strong>내 평점</strong> ☆☆☆☆☆☆
                     </li>
                  </ul>
               </div>

               <hr className="border-bottom-line" />

               <div>
                  <ul className="modal-summary">
                     {summay_subs.map((sub, i) => (
                        <ModalSummary key={i} sub={sub} i={i} />
                     ))}
                  </ul>
               </div>
               <div className="modal-plot">{MoviePlot}</div>
               <hr className="border-bottom-line" />
               <div>
                  <div>
                     <strong className="modal-director">감독</strong>
                     {director}
                  </div>
                  <div>
                     <strong className="modal-actors">출연</strong>
                     {actors}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

// eslint-disable-next-line
export default ModalPage;
