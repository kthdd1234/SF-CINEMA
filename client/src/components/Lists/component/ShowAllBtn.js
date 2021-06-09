import React from 'react';
import { useHistory } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';

const ShowAllBtn = ({ path }) => {
   const history = useHistory();

   return (
      <div
         className="movie-list-head-btn"
         onClick={() => history.push(`explore?${path}`)}
      >
         모두 보기
         <DoubleRightOutlined className="showall-icon" />
      </div>
   );
};

export default ShowAllBtn;
