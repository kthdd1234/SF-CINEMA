import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Video from './Video';
import 'antd/dist/antd.css';
import '../Movie.css';

const Trailer = ({ videoId, setTrailer }) => {
   const [visible, setVisible] = useState(false);
   useEffect(() => {
      setVisible(true);
   }, []);

   const closeTrailer = useCallback((setting) => {
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
