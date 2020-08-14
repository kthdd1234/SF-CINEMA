import React from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './PreArrow.css';

function PrevArrow(props) {
   const { className, onClick } = props;
   return (
      <div className={className}>
         <Button
            type="link"
            className="pre-arrow-btn"
            icon={<LeftOutlined className="direction-icon-left" />}
            onClick={onClick}
         />
      </div>
   );
}

export default PrevArrow;
