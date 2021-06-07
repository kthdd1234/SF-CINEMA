import React from 'react';
import { useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { UserOutlined } from '@ant-design/icons';

const SettingItems = () => {
   const history = useHistory();
   const onClick = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      history.push('/');
      location.reload();
   };

   return (
      <>
         <div
            className="nav-list-item"
            onClick={() => history.push('/profile')}
         >
            <span className="nav-icon">{<UserOutlined />}</span>
            <span>프로필</span>
         </div>
         <div className="nav-list-item" onClick={onClick}>
            <span>로그아웃</span>
         </div>
      </>
   );
};
export default SettingItems;
