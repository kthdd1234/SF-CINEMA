import React, { Component } from 'react';
import 'antd/dist/antd.css';

class ModalPage extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      const {
         title,
         titleEng,
         director,
         plot,
         posters,
         actors,
         releaseDate,
         runtime,
         rating,
         userRating,
      } = this.props.currentMovie;
      return (
         <div>
            <div className="img-box">
               <img
                  className="image"
                  src="http://file.koreafilm.or.kr/thm/02/00/03/19/tn_DPF010393.JPG"
               />
            </div>
            <div
               style={{
                  position: 'absolute',
                  bottom: '160px',
                  left: '70px',
               }}
            >
               <strong
                  style={{
                     fontSize: '45px',
                  }}
               >
                  인터스텔라
               </strong>
               <strong style={{ marginLeft: '5px', fontSize: '15px' }}>
                  {' '}
                  (interSteller, 2014)
               </strong>

               <div>
                  <ul
                     style={{
                        listStyle: 'none',
                        display: 'block',
                        padding: '5px',
                     }}
                  >
                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 15px 0 0',
                           fontSize: '20px',
                        }}
                     >
                        평점 ⭐ ⭐ ⭐ ⭐ ⭐ 9.14
                     </li>

                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 15px 0 0',
                           fontSize: '20px',
                        }}
                     >
                        내 평점 ☆☆☆☆☆☆
                     </li>
                  </ul>
               </div>
               <hr
                  style={{
                     color: 'darkgray',
                     border: '1px solid #f0f0f0',
                     borderRadius: '2px 2px 0 0',
                  }}
               />
               <div>
                  <ul
                     style={{
                        listStyle: 'none',
                        display: 'block',
                        padding: '5px',
                     }}
                  >
                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 10px 0 10px',
                           fontSize: '15px',
                        }}
                     >
                        SF/모험
                     </li>
                     <span> ꒐ </span>
                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 10px 0 10px',
                           fontSize: '15px',
                        }}
                     >
                        미국
                     </li>
                     <span> ꒐ </span>
                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 10px 0 10px',
                           fontSize: '15px',
                        }}
                     >
                        2014.11.06 개봉
                     </li>
                     <span> ꒐ </span>
                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 10px 0 10px',
                           fontSize: '15px',
                        }}
                     >
                        12세 관람가
                     </li>
                     <span> ꒐ </span>
                     <li
                        style={{
                           display: 'inline-block',
                           padding: '0 10px 0 10px',
                           fontSize: '15px',
                        }}
                     >
                        145분
                     </li>
                  </ul>
               </div>
               <div style={{ width: '610px', marginBottom: '30px' }}>
                  “우린 답을 찾을 거야, 늘 그랬듯이”세계 각국의 정부와 경제가
                  완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전
                  세계적인 식량 부족을 불러왔고, NASA도 해체되었다. 이때
                  시공간에 불가사의한 틈이 열리고, 남은 자들에게는 이 곳을
                  탐험해 인류를 구해야 하는 임무가 지워진다. 사랑하는 가족들을
                  뒤로 한 채 인류라는 더 큰 가족을 위해, 그들은 이제 희망을 찾아
                  우주로 간다. 그리고 우린 답을 찾을 것이다. 늘 그랬듯이…
               </div>
               <hr
                  style={{
                     color: 'darkgray',
                     border: '1px solid #f0f0f0',
                     borderRadius: '2px 2px 0 0',
                  }}
               />
               <div>
                  <div>
                     <strong style={{ padding: '0 10px 0 10px' }}>감독</strong>
                     크리스토퍼 놀란
                  </div>
                  <div>
                     <strong style={{ padding: '0 10px 0 10px' }}>출연</strong>
                     매슈 매코너헤이, 제시카 차스테인 , 앤 해서웨이, 맷 데이먼
                  </div>
               </div>
               {/* <div>
                  <div>
                     <img src="http://file.koreafilm.or.kr/thm/02/00/03/19/tn_DPF010393.JPG" />
                  </div>
                  <div>
                     <img src="http://file.koreafilm.or.kr/thm/02/00/03/19/tn_DPF010396.jpg" />
                  </div>
                  <div>
                     <img src="http://file.koreafilm.or.kr/thm/02/00/03/19/tn_DPF010395.jpg" />
                  </div>
                  <div>
                     <img src="http://file.koreafilm.or.kr/thm/02/00/02/69/tn_DPF006739.JPG" />
                  </div>
                  <div>
                     <img src="http://file.koreafilm.or.kr/thm/02/00/03/19/tn_DPF010394.jpg" />
                  </div>
               </div> */}
            </div>
         </div>
      );
   }
}

export default ModalPage;
