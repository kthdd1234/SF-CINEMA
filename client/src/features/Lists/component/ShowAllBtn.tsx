import React from 'react';
import { useHistory } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';

interface IShowAllBtn {
   path: string;
}

const ShowAllBtn = ({ path }: IShowAllBtn) => {
   const history = useHistory();

   return (
      <div
         className="lists-head-btn"
         onClick={() => history.push(`explore?${path}`)}
      >
         모두 보기
         <DoubleRightOutlined className="showall-icon" />
      </div>
   );
};

export default ShowAllBtn;
