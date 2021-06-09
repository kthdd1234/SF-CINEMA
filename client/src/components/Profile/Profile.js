import React, { useEffect, useState } from 'react';
import List from '../Lists/component/List';
import Sub from './component/Sub';
import SelectBtn from './component/SelectBtn';
import './Profile.css';

const Profile = ({ profile }) => {
   const { username, savedMovie, likedMovie } = profile;
   const [movies, setMovies] = useState([]);
   const [sub, setSub] = useState('');

   useEffect(() => {
      setSub('저장한');
      setMovies(savedMovie);
   }, [savedMovie]);

   const onChangeSelect = (value) => {
      if (value === '저장한 작품') {
         setSub('저장한');
         setMovies(savedMovie);
      } else {
         setSub('좋아요를 누른');
         setMovies(likedMovie);
      }
   };

   return (
      <div className="profile">
         <div className="profile-head">
            <Sub username={username} sub={sub} />
            <SelectBtn onChangeSelect={onChangeSelect} />
         </div>
         <List movies={movies ? movies : []} />
      </div>
   );
};

export default Profile;
