import React, { Component } from 'react';
import SubjectListEntry from './SubjectListEntry';
import './Subject.css';

class MenuItems extends Component {
   constructor(props) {
      super(props);
      this.state = {
         movies: [],
      };
   }

   componentDidUpdate = async (prevProps, prevState) => {
      let movies = await this.props.MenuItem;
      console.log('prevProps', movies);
      console.log('지금 secretKey', this.props.secretKey);
      console.log('그전에 키', prevProps.secretKey);

      if (prevProps.secretKey !== this.props.secretKey) {
         this.setState({
            movies: movies,
         });
      }
   };

   componentDidMount = async () => {
      let movies = await this.props.MenuItem;
      console.log('props로 받은 데이터', movies);
      this.setState({ movies: movies });
   };

   render() {
      const { movies } = this.state;
      console.log('지금 스테이트 ', movies);

      return (
         <div>
            <center>
               <div className="movie-container">
                  {movies.length
                     ? movies.map((movie, i) => (
                          <SubjectListEntry
                             key={i}
                             title={movie.title}
                             titleEng={movie.titleEng}
                             director={movie.director}
                             plot={movie.plot}
                             posters={movie.posters}
                             nation={movie.nation}
                             actors={movie.actors}
                             releaseDate={movie.releaseDate}
                             releaseYear={movie.releaseYear}
                             runtime={movie.runtime}
                             ratingGrade={movie.ratingGrade}
                             userRating={movie.userRating}
                          />
                       ))
                     : null}
               </div>
            </center>
         </div>
      );
   }
}

// eslint-disable-next-line
export default MenuItems;
