import React from 'react';
import { useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { UserOutlined } from '@ant-design/icons';
import Item from './Item';

const SettingItems = () => {
   const history = useHistory();
   const onClick = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      history.push('/');
      location.reload();
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
