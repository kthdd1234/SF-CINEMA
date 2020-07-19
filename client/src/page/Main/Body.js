import React, { Component } from 'react';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';
import axios from 'axios';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomMovies: [],
      highlyRated: [],
      recentlyReleased: [],
      operatorMovies: [],
      masterpiece: [],
      series: [],
    };
  }
  async componentDidMount() {
    const path_list = [
      'randomMovies',
      'highlyRated',
      'recentlyReleased',
      'operatorMovies',
      'masterpiece',
    ];
    const series_title = ['매트릭스', '어벤져스', '터미네이터'];

    const serverUrl = axios.create({
      baseURL: 'http://localhost:5000/main',
    });

    path_list.forEach((path) => {
      serverUrl.get(`/${path}`).then(({ data }) => {
        this.setState({ [path]: data });
      });
    });

    let series_get_data = series_title.map((title) => {
      return serverUrl
        .get('/series', {
          params: {
            tilte: title,
          },
        })
        .then((movies) => {
          return movies;
        });
    });
    series_get_data = await Promise.all(series_get_data);
    let series_movies = series_get_data.map((movie) => {
      return movie.data;
    });

    let array = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < series_movies.length; j++) {
        let obj = series_movies[j][i];
        if (!obj) {
          array.push('');
        } else {
          array.push(obj);
        }
      }
    }
    this.setState({
      series: array,
    });
  }
  render() {
    const {
      randomMovies,
      highlyRated,
      recentlyReleased,
      operatorMovies,
      masterpiece,
      series,
    } = this.state;
    return (
      <div>
        {randomMovies.length ? (
          <TopSlideShow randomMovies={randomMovies} />
        ) : null}
        {masterpiece.length ? (
          <DownSlideShow
            highlyRated={highlyRated}
            recentlyReleased={recentlyReleased}
            operatorMovies={operatorMovies}
            masterpiece={masterpiece}
            series={series}
          />
        ) : null}
      </div>
    );
  }
}

export default Body;
