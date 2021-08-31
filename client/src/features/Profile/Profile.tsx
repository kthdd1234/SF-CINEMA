import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import List from '../Lists/component/List';
import { Sub, SelectBtn } from './component';
import './Profile.css';

interface IData {
   username?: string;
   savedMovie?: Array<object>;
   likedMovie?: Array<object>;
}

const Profile = () => {
   const [movies, setMovies] = useState<Array<object> | void>([]);
   const [sub, setSub] = useState('');
   const profile = useSelector((state: RootState) => state.auth.profile);
   const { username, savedMovie, likedMovie }: IData = profile || {};

   useEffect(() => {
      setSub('저장한');
      setMovies(savedMovie);
   }, [savedMovie]);

   const onChangeSelect = (value: string) => {
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
            <Sub username={username ? username : ''} sub={sub} />
            <SelectBtn onChangeSelect={onChangeSelect} />
         </div>
         <List movies={movies ? movies : []} />
      </div>
   );
};

export default Profile;
