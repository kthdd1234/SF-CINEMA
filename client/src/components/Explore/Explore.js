import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { reqExplore } from '../../requests';
import { pushList, tagList } from '../../utils';
import Head from './component/Head';
import Loding from './component/Loding';
import List from '../Movies/List';
import './Explore.css';

const Explore = () => {
   const [movies, setMovies] = useState([]);
   const [selectdBtn, setSelectdBtn] = useState(false);
   const [icon, setIcon] = useState('');
   const [sub, setSub] = useState('');
   const [key, value] = useLocation().search.substring(1).split('=');
   const decoding = decodeURI(value);

   useEffect(() => {
      switch (key) {
         case 'push':
            setSub(pushList[value][0]);
            setIcon(pushList[value][1]);
            break;
         case 'tag':
            setSub(decoding);
            setIcon(tagList[decoding][1]);
            break;
         case 'series':
            setSub(decoding);
            break;
      }
      return () => {
         setIcon('');
      };
   });

   useEffect(() => {
      const req = async () => {
         const data = await reqExplore(key, decoding);
         setMovies(data);
         setSelectdBtn(true);
      };
      req();

      return () => {
         setSelectdBtn(false);
      };
   }, [value]);

   const onChangeSelect = useCallback((selected) => {
      let sortMovies = [...movies];
      sortMovies =
         selected === '평점이 높은 순'
            ? sortMovies.sort((a, b) => b.userRating - a.userRating)
            : sortMovies.sort((a, b) => b.releaseDate - a.releaseDate);
      setMovies(sortMovies);
   });

   return (
      <div>
         {movies.length ? (
            <div>
               <Head
                  sub={sub}
                  icon={icon}
                  selectdBtn={selectdBtn}
                  setSelectdBtn={setSelectdBtn}
                  onChangeSelect={onChangeSelect}
               />
               <List movies={movies} />
            </div>
         ) : (
            <Loding />
         )}
      </div>
   );
};

export default Explore;

// class MenuList extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          currentMovies: [],
//          movies: [],
//          movePage: false,
//          isLoding: false,
//          path: '',
//       };
//    }

//    componentDidMount = async () => {

//       this.setState({
//          movies: movies,
//          path: window.location.pathname,
//       });
//    };

//    componentDidUpdate = async (prevProps, prevState) => {
//       // const movies = await this.state.movies;
//       const { pathname } = window.location;
//       const { path } = prevState;
//       console.log(path);
//       console.log(pathname);

//       if (path !== pathname) {
//          const pathList = pathname.split('/');
//          const movies = await reqList[pathList[2]]();

//          this.setState({
//             path: pathname,
//             movies: movies,
//          });
//          window.scrollTo(0, 0);
//       }
//    };

//    render() {
//       const { ...state } = this.state;

//       // return (

//       // );
//    }
// }

// eslint-disable-next-line

// handleWatingTime = () => {
//    const { movies, currentMovies } = this.state;

//    setTimeout(() => {
//       this.setState({
//          currentMovies: movies.slice(0, currentMovies.length + 5),
//          isLoding: false,
//       });
//    }, 700);
// };

// if (prevState.currentMovies.length !== this.state.currentMovies.length) {
//    const domElement = document.querySelectorAll('.moive-content');
//    const lastElement = domElement[domElement.length - 1];

//    const observer = new IntersectionObserver(
//       (entries, observer) => {
//          entries.forEach(async (entry) => {
//             if (entry.isIntersecting) {
//                this.setState({ isLoding: true });
//                await this.handleWatingTimeObserver();
//                observer.unobserve(entry.target);
//             }
//          });
//       },
//       { threshold: 0.5 },
//    );
//    observer.observe(lastElement);
// }
