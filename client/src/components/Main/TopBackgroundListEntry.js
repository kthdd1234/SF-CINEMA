import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import {
   ZoomInOutlined,
   PlayCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';
import { handleTrailerVisible } from '../../utils';
import ContentsModal from '../../containers/Main/ContentsModal';
import Trailer from './Trailer';
import './TopBackgroundList.css';

class TopBackgroundListEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {
         likedFilled: false,
         modalVisible: false,
         numberOfLikes: 0,
         trailer: false,
      };
   }

   handleModalVisible = (modalVisible, movie) => {
      window.innerWidth > 1200
         ? this.setState({ modalVisible })
         : this.props.history.push(`/contents/${movie.id}`);
   };

   handleSettingTrailer(trailer) {
      handleTrailerVisible(trailer, this.props.movieData.movie.videoId);
      this.setState({ trailer });
   }

   handleNumberOfLikesIncrease = () => {};
   handleNumberOfLikesDecrease = () => {};

   render() {
      const { likedFilled, numberOfLikes, trailer, modalVisible } = this.state;
      const { movieData } = this.props;
      const { movie } = movieData;
      const { backgroundImg } = movieData;
      const { title, userRating, genre, releaseDate, videoId } = movie;

      return (
         <div>
            <div className="main-box-background-images">
               <div className="background-left-shadow" />
               <div className="movie-content">
                  <div className="content-wrap">
                     <h2 className="content-title">{title}</h2>
                  </div>
                  <div className="content-list">
                     <div>
                        <span className="content-rating">⭐ {userRating}</span>
                        <span className="content-genre">{genre}</span>
                        <span className="content-genre">
                           {String(releaseDate).slice(0, 4)}
                        </span>
                     </div>
                     <div className="content-btn">
                        <Button
                           type="ghost"
                           icon={<ZoomInOutlined />}
                           className="detail-info-btn"
                           onClick={() => this.handleModalVisible(true, movie)}
                        >
                           상세정보
                        </Button>
                        <Button
                           type="danger"
                           icon={<PlayCircleOutlined />}
                           className="show-trailer-btn"
                           onClick={() => this.handleSettingTrailer(true)}
                        >
                           예고편
                        </Button>
                     </div>
                  </div>
               </div>

               <img
                  className="main-background-images"
                  src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${backgroundImg}`}
               />
            </div>
            <Modal
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.handleModalVisible(false)}
               onCancel={() => this.handleModalVisible(false)}
               maskClosable={false}
               footer={null}
            >
               <ContentsModal
                  likedFilled={likedFilled}
                  movie={movie}
                  numberOfLikes={numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
            </Modal>

            <Modal
               visible={trailer}
               onOk={() => this.handleSettingTrailer(false)}
               onCancel={() => this.handleSettingTrailer(false)}
               footer={null}
               width={1300}
            >
               <Button
                  ghost
                  icon={<CloseOutlined />}
                  className="trailer-close"
                  onClick={() => this.handleSettingTrailer(false)}
               />
               <Trailer videoId={videoId} />
            </Modal>
         </div>
      );
   }
}

export default TopBackgroundListEntry;
