import React from 'react';
import { useHistory } from 'react-router-dom';
import Item from './Item';
import { HomeOutlined } from '@ant-design/icons';

const HomeItem = () => {
   const history = useHistory();

   return (
      <Item
         name="홈"
         icon={<HomeOutlined />}
         onClick={() => history.push('/')}
      />
   );
};

export default HomeItem;
