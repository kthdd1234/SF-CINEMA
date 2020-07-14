const fetch = require('node-fetch');
const title = '컨택트';

var kmdbUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp?collection=kmdb_new&detail=Y&ServiceKey=&genre=SF&type=극영화&title=${title}&listCount=1`;
fetch(encodeURI(kmdbUrl), {
  methods: 'GET',
})
  .then((res) => res.json())
  .then((data) => {
    console.log('kmdb 영화 데이터 => ', data.Data[0].Result);
    const prodYear = data.Data[0].Result[0].prodYear;
    const movie_Data = {
      title: title,
      titleEn: data.Data[0].Result[0].titleEng,
      director: data.Data[0].Result[0].director,
      actor: data.Data[0].Result[0].actor,
      nation: data.Data[0].Result[0].nation,
      plot: data.Data[0].Result[0].plot,
      runtime: data.Data[0].Result[0].runtime,
      rating: data.Data[0].Result[0].rating,
      posters: data.Data[0].Result[0].posters,
      prodYear: data.Data[0].Result[0].prodYear,
      ReleaseDate: data.Data[0].Result[0].regDate,
    };
    const naverUrl = `https://openapi.naver.com/v1/search/movie.json?yearfrom=${prodYear}&yearto=${prodYear}&display=1&query=${title}`;
    fetch(encodeURI(naverUrl), {
      methods: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((movie) => {
        console.log(movie);
      });
  })
  .catch((err) => {
    console.log(err);
  });
