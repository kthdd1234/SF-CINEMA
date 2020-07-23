import React, { Component } from 'react';

export default class Subject extends Component {
   render() {
      return (
         <div>
            <center>
               <div className="moive-container">
                  <div className="moive-info">
                     <div className="movie-img-box">
                        <img
                           className="mivie-img"
                           src="http://file.koreafilm.or.kr/thm/02/00/02/69/tn_DPF006739.JPG"
                        ></img>
                     </div>
                     <div className="headers">
                        <div className="movie-title-list">
                           <strong className="movie-title">인터스텔라</strong>
                           <strong className="movie-titleEng_year">
                              (InterSteller, 2014)
                           </strong>
                        </div>
                        <ul className="movie-rating-list">
                           <li className="movie-user-rating">
                              <strong className="movie-rating">평점</strong>⭐
                              ⭐ ⭐ ⭐ ⭐ 9.14
                           </li>
                           <li className="movie-my-rating">
                              <strong className="movie-rating">
                                 나의 평점
                              </strong>
                              ☆☆☆☆☆☆ 9.50
                           </li>
                        </ul>
                     </div>

                     <hr className="border-bottom-line" />

                     <div className="contents">
                        <ul className="movie-summary">
                           <li className="modal-summary-each-sub">
                              SF/모험
                              <span className="modal-summary-each-boundary">
                                 {' '}
                                 ꒐{' '}
                              </span>
                           </li>
                           <li className="modal-summary-each-sub">
                              미국
                              <span className="modal-summary-each-boundary">
                                 {' '}
                                 ꒐{' '}
                              </span>
                           </li>
                           <li className="modal-summary-each-sub">
                              2014.11.06 개봉
                              <span className="modal-summary-each-boundary">
                                 {' '}
                                 ꒐{' '}
                              </span>
                           </li>
                           <li className="modal-summary-each-sub">
                              12세관람가
                              <span className="modal-summary-each-boundary">
                                 {' '}
                                 ꒐{' '}
                              </span>
                           </li>
                           <li className="modal-summary-each-sub">
                              124분
                              <span className="modal-summary-each-boundary">
                                 {' '}
                                 ꒐{' '}
                              </span>
                           </li>
                        </ul>
                        <div className="movie-plot">
                           “우린 답을 찾을 거야, 늘 그랬듯이”세계 각국의 정부와
                           경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에
                           범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도
                           해체되었다. 이때 시공간에 불가사의한 틈이 열리고,
                           남은 자들에게는 이 곳을 탐험해 인류를 구해야 하는
                           임무가 지워진다. 사랑하는 가족들을 뒤로 한 채
                           인류라는 더 큰 가족을 위해, 그들은 이제 희망을 찾아
                           우주로 간다. 그리고 우린 답을 찾을 것이다. 늘
                           그랬듯이…
                        </div>

                        <hr className="border-bottom-line" />

                        <div className="movie-director_actors_awards">
                           <div className="movie-director">
                              <strong className="movie-sub">감독</strong>
                              크리스토퍼 놀란
                           </div>
                           <div className="movie-actors">
                              <strong className="movie-sub">출연</strong>
                              매슈 매코너헤이, 앤 해서웨이, 제시카 채스테인,
                              마이클 케인
                           </div>
                           <div className="movie-awards">
                              <strong className="movie-sub">수상</strong>
                              아카데미 시각효과상, 엠파이어 영화상, 엠파이어
                              감독상
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </center>
         </div>
      );
   }
}
