import React, { Component } from 'react';
import { Modal } from 'antd';
import ModalPage from './ModalPage';
import SFCINEMA from '../../SFCINEMA.png';

class RandomMoviesImg extends Component {
   constructor(props) {
      super(props);
      this.state = {
         likeFilled: false,

         modalVisible: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = () => {
      const { movie, isLogin, profile } = this.props;
      const movieId = movie ? movie.id : null;
      const likeMovies = profile.likedMovie;
      const numberOfLikes = movie ? movie.numberOfLikes : null;

      this.setState({
         numberOfLikes: numberOfLikes,
      });
      if (isLogin) {
         if (likeMovies === undefined) {
            location.reload(true);
            window.scrollTo(0, 0);
         } else {
            likeMovies.forEach((movie) => {
               if (movie.id === movieId) {
                  return this.setState({
                     likeFilled: true,
                  });
               }
            });
         }
      }
   };

   setModalVisible = (modalVisible) => {
      if (!modalVisible) {
         this.setState({
            pause: false,
         });
      }
      this.setState({
         modalVisible,
      });
   };

   handleNumberOfLikesIncrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes + 1,
         likeFilled: true,
      });
   };

   handleNumberOfLikesDecrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes - 1,
         likeFilled: false,
      });
   };

   render() {
      const { movie, isLogin, profile } = this.props;
      const {
         likeFilled,

         modalVisible,
         numberOfLikes,
      } = this.state;
      return (
         <div>
            <div className="movie-poster-list">
               <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posters}`}
                  alt={`img${movie.id}`}
                  onClick={() => this.setModalVisible(true)}
               />
            </div>
            <Modal
               title={<img src={SFCINEMA} className="small-logo" />}
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
               maskClosable={false}
            />
            <Modal
               title={<img src={SFCINEMA} className="small-logo" />}
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
               maskClosable={false}
            >
               <ModalPage
                  isLogin={isLogin}
                  profile={profile}
                  currentMovie={movie}
                  likeFilled={likeFilled}
                  numberOfLikes={numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
            </Modal>
         </div>
      );
   }
}

export default RandomMoviesImg;
