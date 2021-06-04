import React from 'react';
import { Select } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';

const SelectBtn = ({ onChangeSelect }) => {
   return (
      <Select
         className="select"
         defaultValue="저장한 작품"
         size="large"
         onChange={onChangeSelect}
         suffixIcon={<CaretDownFilled style={{ color: 'whitesmoke' }} />}
      >
         <Select.Option value="저장한 작품">📌 저장한 작품</Select.Option>
         <Select.Option value="좋아요를 누른 작품">
            👍 좋아요를 누른 작품
         </Select.Option>
      </Select>
   );
};
export default SelectBtn;
