import React from 'react';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './NextArrow.css';

function NextArrow(props) {
   const { className, onClick } = props;
   return (
      <div className={className}>
         <Button
            type="link"
            className="next-arrow-btn"
            icon={<RightOutlined className="direction-icon-right" />}
            onClick={onClick}
         />
      </div>
   );
}

export default NextArrow;
