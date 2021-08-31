import React, { useEffect, useState,  } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Video from './Video';
import 'antd/dist/antd.css';
import '../Movie.css';

interface ITrailer {
   videoId?: string;
   setTrailer: Function
}

const Trailer = ({ videoId, setTrailer }: ITrailer) => {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      setVisible(true);
   }, []);

   const closeTrailer = ((setting: boolean) => {
      setTrailer(setting);
      setVisible(setting);
   });

   return (
      <Modal
         visible={visible}
         footer={null}
         width={1300}
         onCancel={() => closeTrailer(false)}
      >
         <Button
            ghost
            icon={<CloseOutlined />}
            className="movie-trailer-close"
            onClick={() => closeTrailer(false)}
         />
         <Video videoId={videoId} />
      </Modal>
   );
};

export default Trailer;
