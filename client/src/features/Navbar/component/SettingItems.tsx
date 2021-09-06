import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import {
   setIsLogin,
   setProfile,
} from '../../Auth/Reducer/authSlice';
import { UserOutlined } from '@ant-design/icons';

import Item from './Item';

const SettingItems = () => {
   const history = useHistory();
   const dispatch = useDispatch();

   const onClick = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      history.push('/');
      dispatch(setIsLogin(false));
      dispatch(setProfile({}));
   };

   return (
      <>
         <Item
            name="프로필"
            icon={<UserOutlined />}
            onClick={() => history.push('/profile')}
         />
         <Item name="로그아웃" icon={null} onClick={onClick} />
      </>
   );
};
export default SettingItems;
