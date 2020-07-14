import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';

// eslint-disable-next-line
const imgList = [
  'https://ppss.kr/wp-content/uploads/2017/05/Alien-Covenant-First-Official-Poster-featl-540x309.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1qK0332d6DkVo7xKldt-xkQugvBTZD7Varw&usqp=CAU',
  'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F151631484FD4CC5B20',
  'https://images-na.ssl-images-amazon.com/images/I/71YKrhcJHYL._SL1000_.jpg',
  'https://upload.wikimedia.org/wikipedia/en/1/12/Predators_54632_glg.jpg',
  'https://playwares.com/files/attach/images/5543821/663/193/017/7c848bf187b1265bea0a6c8194c38fa5.jpg',
  'https://t1.daumcdn.net/cfile/tistory/9999A8455DE5653305',
  'https://ae01.alicdn.com/kf/HTB1skFKXFzsK1Rjy1Xbq6xOaFXa1/Custom-Canvas-Wall-Mural-Marvel-Venom-Poster-Venom-Tom-Hardy-Wallpaper-Office-Wall-Stickers-Cafe-Dining.jpg',
  'https://happyspacenoises.files.wordpress.com/2018/08/after-earth.jpg',
  'https://image.yes24.com/momo/TopCate1508/MidCate005/123838213.jpg',
];
export default class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body imgList={imgList} />
      </div>
    );
  }
}
