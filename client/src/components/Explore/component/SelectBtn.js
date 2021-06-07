import React from 'react';
import { Select } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';

const SelectBtn = ({ onChangeSelect }) => {
   return (
      <Select
         className="explore-head-select"
         defaultValue="선택해주세요"
         size="large"
         onChange={onChangeSelect}
         suffixIcon={<CaretDownFilled style={{ color: 'whitesmoke' }} />}
      >
         <Select.Option value="평점이 높은 순">⭐ 평점이 높은 순</Select.Option>
         <Select.Option value="최신 작품 순">🎞 최신 작품순</Select.Option>
      </Select>
   );
};

export default SelectBtn;
