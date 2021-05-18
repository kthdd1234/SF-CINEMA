import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Trailer.css';

const Trailer = ({ videoId, handleSettingTrailer }) => {
   const [visible, setVisible] = useState(false);
   useEffect(() => {
      setVisible(true);
   }, []);

   const closeTrailer = useCallback((setting) => {
      handleSettingTrailer(setting);
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
            className="trailer-close"
            onClick={() => closeTrailer(false)}
         />
         <div className="movie-trailer-container">
            <iframe
               className="movie-trailer"
               src={`https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&enablejsapi=1&html5=1`}
               allowFullScreen
               frameBorder="0"
            />
         </div>
      </Modal>
   );
};

export default Trailer;
