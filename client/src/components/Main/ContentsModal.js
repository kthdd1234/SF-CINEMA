// import React, { Component } from 'react';
// import { Button, Modal } from 'antd';
// import { CloseOutlined } from '@ant-design/icons';
// import { handleTrailerVisible } from '../../utils';
// import Trailer from './Trailer';

// class ContentsModal extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          trailer: false,
//       };
//    }

//    componentDidMount = () => {
//       const { trailer } = this.props;
//       this.setState({ trailer: trailer });
//    };

//    handleSettingTrailer = (trailer) => {
//       const { videoId } = this.props;
//       handleTrailerVisible(trailer, videoId);
//       this.setState({ trailer: trailer });
//    };

//    render() {
//       const { videoId } = this.props;
//       const { trailer } = this.state;

//       return (
//          <div>
//             <Modal
//                visible={trailer}
//                onOk={() => this.handleSettingTrailer(false)}
//                onCancel={() => this.handleSettingTrailer(false)}
//                footer={null}
//                width={1300}
//             >
//                <Button
//                   ghost
//                   icon={<CloseOutlined />}
//                   className="trailer-close"
//                   onClick={() => this.handleSettingTrailer(false)}
//                />
//                <Trailer videoId={videoId} />
//             </Modal>
//          </div>
//       );
//    }
// }

// // eslint-disable-next-line
// export default ContentsModal;
// // eslint-disable-next-line
