import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
   LikeOutlined,
   PushpinOutlined,
   CheckOutlined,
   PlayCircleOutlined,
} from '@ant-design/icons';
import { saveCompleted } from '../request/saveCompleted';
import { saveCancel } from '../request/saveCancel';
import { likeCompleted } from '../request/likeCompleted';
import { likeCancel } from '../request/likeCancel';
import Btn from './Btn';

const Btns = ({
   isLogin,
   movieId,
   profile,
   setTrailer,
   handleProfileUpdate,
}) => {
   const classGray = 'movie-btns-btn color-gray';
   const classblue = 'movie-btns-btn color-blue';
   const [savedFilled, setSavedFilled] = useState(false);
   const [likedFilled, setLikedFilled] = useState(false);
   const [likedClass, setLikedClass] = useState(classGray);
   const [savedClass, setSavedClass] = useState(classGray);

   useEffect(() => {
      if (isLogin) {
         const { likedMovie, savedMovie } = profile;
         const lists = [
            [likedMovie, setLikedFilled, setLikedClass],
            [savedMovie, setSavedFilled, setSavedClass],
         ];

         lists.forEach((list) => {
            list[0].some((movie) => {
               if (movieId === movie.id) {
                  list[1](true);
                  list[2](classblue);
               }
            });
         });
      }
   }, [movieId, isLogin]);

   const setSave = async () => {
      if (isLogin) {
         if (!savedFilled) {
            const data = await saveCompleted(profile.id, movieId);
            handleProfileUpdate(data);
            message.success('저장하기 리스트에 추가하였습니다.');
            setSavedClass(classblue);
         } else {
            const data = await saveCancel(profile.id, movieId);
            handleProfileUpdate(data);
            message.success('저장하기 리스트에서 제거하였습니다.');
            setSavedClass(classGray);
         }
         setSavedFilled(!savedFilled);
      } else {
         message.warning('로그인을 하여 영화를 저장해보세요.');
      }
   };

   const setLike = async () => {
      if (isLogin) {
         if (!likedFilled) {
            const data = await likeCompleted(profile.id, movieId);
            handleProfileUpdate(data);
            message.success('재밌어요 리스트에 추가하였습니다.');
            setLikedClass(classblue);
         } else {
            const data = await likeCancel(profile.id, movieId);
            handleProfileUpdate(data);
            message.success('재밌어요 리스트에서 제거하였습니다.');
            setLikedClass(classGray);
         }
         setLikedFilled(!likedFilled);
      } else {
         message.warning('로그인을 하여 영화를 평가해보세요.');
      }
   };

   const settings = [
      ['movie-btns-btn', <PlayCircleOutlined />, setTrailer, '예고편 보기'],
      [
         likedClass,
         likedFilled ? <CheckOutlined /> : <LikeOutlined />,
         setLike,
         '재밌어요',
      ],
      [
         savedClass,
         savedFilled ? <CheckOutlined /> : <PushpinOutlined />,
         setSave,
         '저장하기',
      ],
   ];

   return (
      <div className="movie-btns">
         {settings.map((setting, i) => (
            <Btn
               key={i}
               className={setting[0]}
               icon={setting[1]}
               onClick={setting[2]}
               value={setting[3]}
            />
         ))}
      </div>
   );
};

export default Btns;
