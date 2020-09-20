import React from 'react';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './NextArrow.css';

function NextArrow(props) {
   const { className, onClick } = props;
   return (
      <div className={className}>
         <div className="next-arrow-warp">
            <Button
               type="ghost"
               className="next-arrow-btn"
               icon={<RightOutlined className="direction-icon-right" />}
               onClick={onClick}
            />
         </div>
      </div>
   );
}

export default NextArrow;
