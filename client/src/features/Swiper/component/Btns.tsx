import React, { useState } from 'react';
import {
   PlayCircleOutlined,
   ZoomInOutlined,
   UnorderedListOutlined,
} from '@ant-design/icons';
import Trailer from '../../Movie/component/Trailer';
import Btn from './Btn';

interface IBtns {
   index: number;
   sub: string;
}

const Btns = ({ index, sub }: IBtns) => {
   const [trailer, setTrailer] = useState(false);
   const videoId = 'lTE3zHll7ZY';

   return (
      <div className="swiper-btns">
         {index === 0 ? (
            <div>
               <Btn
                  sub=""
                  icon={<PlayCircleOutlined />}
                  value="예고편 보기"
                  setTrailer={setTrailer}
               />
               <Btn  sub="" icon={<ZoomInOutlined />} value="자세히 보기" setTrailer={() => null}/>
            </div>
         ) : (
            <Btn sub={sub} icon={<UnorderedListOutlined />} value="목록 보기" setTrailer={() => null}/>
         )}
         {trailer ? (
            <Trailer  videoId={videoId} setTrailer={setTrailer} />
         ) : null}
      </div>
   );
};

export default Btns;
