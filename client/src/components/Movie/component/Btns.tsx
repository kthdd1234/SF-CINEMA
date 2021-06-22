import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
   LikeOutlined,
   PushpinOutlined,
   CheckOutlined,
   PlayCircleOutlined,
} from '@ant-design/icons';
import Btn from './Btn';
import { saveCompleted, saveCancel, likeCompleted, likeCancel } from '../request'

interface IBtns {
   isLogin?: boolean;
   profile?: object;
   movieId: number;
   setTrailer: Function;
   handleProfileUpdate: Function;
}

interface IProfile {
   id?: number
   likedMovie?: Array<object>;
   savedMovie?: Array<object>;
}

interface ISetting {
   data?: Array<object>;
   setFilled: Function;
   setClass: Function;
}

interface IData {
   id?: number
}

interface IProps {
   className: string;
   icon: any;
   onClick:Function;
   value: string;
}

const Btns = ({
   isLogin,
   movieId,
   profile,
   setTrailer,
   handleProfileUpdate,
}: IBtns) => {
   const classGray = 'movie-contents-btn color-gray';
   const classblue = 'movie-contents-btn color-blue';
   const [savedFilled, setSavedFilled] = useState(false);
   const [likedFilled, setLikedFilled] = useState(false);
   const [likedClass, setLikedClass] = useState(classGray);
   const [savedClass, setSavedClass] = useState(classGray);


   useEffect(() => {
      if (isLogin) {
         const { likedMovie, savedMovie }: IProfile = profile || {};
         const setting = [
            { data: likedMovie, setFilled: setLikedFilled, setClass: setLikedClass },
            { data: savedMovie, setFilled: setSavedFilled, setClass: setSavedClass }
         ]

         setting.forEach(({ data, setFilled, setClass }: ISetting) => {
            data?.some(({ id }: IData) => {
               if (movieId === id) {
                  setFilled(true);
                  setClass(classblue)
               }
            });
         });
      }
   }, [movieId, isLogin]);

   const setSave = async () => {
      if (isLogin) {
         const { id }: IProfile = profile || {}; 

         if (!savedFilled) {
            const data = await saveCompleted(id, movieId);
            handleProfileUpdate(data);
            message.success('저장하기 리스트에 추가하였습니다.');
            setSavedClass(classblue);
         } else {
            const data = await saveCancel(id, movieId);
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
         const { id }: IProfile = profile || {}; 

         if (!likedFilled) {
            const data = await likeCompleted(id, movieId);
            handleProfileUpdate(data);
            message.success('재밌어요 리스트에 추가하였습니다.');
            setLikedClass(classblue);
         } else {
            const data = await likeCancel(id, movieId);
            handleProfileUpdate(data);
            message.success('재밌어요 리스트에서 제거하였습니다.');
            setLikedClass(classGray);
         }
         setLikedFilled(!likedFilled);
      } else {
         message.warning('로그인을 하여 영화를 평가해보세요.');
      }
   };

   const props: IProps[] = [
      {
         className: 'movie-contents-btn',
         icon: <PlayCircleOutlined />,
         onClick: setTrailer,
         value: '예고편 보기',
      },
      {
         className: likedClass,
         icon: likedFilled ? <CheckOutlined /> : <LikeOutlined />,
         onClick: setLike,
         value: '재밌어요',
      },
      {
         className: savedClass,
         icon: savedFilled ? <CheckOutlined /> : <PushpinOutlined />,
         onClick: setSave,
         value: '저장하기',
      },
   ];

   return (
      <div>
         {props.map(({ className, icon, onClick ,value }, i) => (
            <Btn
               key={i}
               className={className}
               icon={icon}
               onClick={onClick}
               value={value}
            />
         ))}
      </div>
   );
};

export default Btns;
