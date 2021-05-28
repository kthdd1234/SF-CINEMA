import React, { useState, useEffect } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import {
   GiftOutlined,
   HomeOutlined,
   LoginOutlined,
   FormOutlined,
   UserOutlined,
   BarsOutlined,
   ThunderboltFilled,
   SearchOutlined,
   TagOutlined,
} from '@ant-design/icons';
import dotenv from 'dotenv';
import SFCINEMA from '../../SFCINEMA.png';
import { pushList, tagList, seriesList } from '../../utils';
import './MenuBar.css';
dotenv.config();

const navLeft = [
   [<HomeOutlined />, '홈', '/'],
   [<GiftOutlined />, '추천'],
   [<TagOutlined />, '특징'],
   [<ThunderboltFilled />, '시리즈'],
];

const navRight = [
   [<SearchOutlined />, '검색'],
   ['', '로그인'],
   ['', '회원가입'],
];

const Hover = ({ query, lists, history, onHover }) => {
   const onClick = (value) => {
      history.push(`/explore?${query}=${value}`);
      onHover(false);
   };

   return (
      <div className="nav-detail-list">
         {Object.entries(lists).map((list, i) => (
            <div
               key={i}
               className="nav-detail-list-item"
               onClick={() => onClick(list[0])}
            >
               <span>{list[1][1]}</span>
               <span className="nav-icon">{list[1][0]}</span>
            </div>
         ))}
      </div>
   );
};

const DetailSeries = () => {
   return <div></div>;
};

const MenuBar = ({ history }) => {
   const [pushHover, onPushHover] = useState(false);
   const [tagHover, onTagHover] = useState(false);
   const [seriesHover, onSeriesHover] = useState(false);

   return (
      <nav className="nav">
         <div className="nav-list">
            <img
               className="nav-list-logo"
               src={SFCINEMA}
               onClick={() => history.push('/')}
            />

            <div className="nav-list-item" onClick={() => history.push('/')}>
               <span>{navLeft[0][0]}</span>
               <span className="nav-icon">{navLeft[0][1]}</span>
            </div>

            <div
               className="wrap"
               onMouseOver={() => onPushHover(true)}
               onMouseLeave={() => onPushHover(false)}
            >
               <div className="nav-list-item">
                  <span>{navLeft[1][0]}</span>
                  <span className="nav-icon">{navLeft[1][1]}</span>
               </div>
               {pushHover ? (
                  <Hover
                     query="push"
                     lists={pushList}
                     history={history}
                     onHover={onPushHover}
                  />
               ) : null}
            </div>

            <div
               className="wrap"
               onMouseOver={() => onTagHover(true)}
               onMouseLeave={() => onTagHover(false)}
            >
               <div className="nav-list-item">
                  <span>{navLeft[2][0]}</span>
                  <span className="nav-icon">{navLeft[2][1]}</span>
                  {tagHover ? (
                     <Hover
                        query="tag"
                        lists={tagList}
                        history={history}
                        onHover={onTagHover}
                     />
                  ) : null}
               </div>
            </div>

            <div className="nav-list-item">
               <span>{navLeft[3][0]}</span>
               <span className="nav-icon">{navLeft[3][1]}</span>
            </div>
         </div>

         <div className="nav-list">
            {navRight.map((item, i) => (
               <div key={i} className="nav-list-item">
                  <span>{item[0]}</span>
                  <span className="nav-icon">{item[1]}</span>
               </div>
            ))}
         </div>
      </nav>
   );
};

export default withRouter(MenuBar);

// const url = require('url');
// const { Header } = Layout;
// const { SubMenu } = Menu;
// const { Option, OptGroup } = Select;

// class MenuBar extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          visible: false,
//          profile: {},
//          searchVisible: false,
//          dropdown: true,
//       };
//    }

//    handleSettingLogout = () => {
//       reactLocalStorage.remove('SFCinemaUserToken');
//       location.reload(true);
//    };

//    hadleSearchVisible = () => {
//       this.setState({
//          searchVisible: !this.state.searchVisible,
//       });
//    };

//    onBlur = () => {
//       this.setState({
//          searchVisible: !this.state.searchVisible,
//       });
//    };

//    handleSearchKeword = (keyword) => {
//       if (keyword === '') {
//          return this.setState({
//             dropdown: true,
//          });
//       }
//       this.setState({
//          dropdown: false,
//       });
//       this.props.history.push(`/search?query=${keyword}`);
//    };

//    handleRecommendedKeyword = (keyword) => {
//       this.setState({
//          dropdown: true,
//       });
//       this.props.history.push(`/search?query=${keyword}`);
//    };

//    handleDrawer = () => {
//       this.setState({
//          visible: !this.state.visible,
//       });
//    };

//    render() {
//       const { isLogin, history } = this.props;
//       let path = window.location.pathname;
//       let address = url.parse(window.location.search, true).query.key;
//       if (path === '/' || path === '/login' || path === '/signup') {
//          address = window.location.pathname;
//       }

//       return (
//          <div>
//             <Layout className="menubar-layout">
//                <Header>
//                   <Menu
//                      selectedKeys={[address]}
//                      mode="horizontal"
//                      theme="dark"
//                      overflowedIndicator={<BarsOutlined />}
//                   >
//                      <Menu.Item
//                         icon={<img className="header-logo" src={SFCINEMA} />}
//                         style={{
//                            paddingRight: '30px',
//                         }}
//                         onClick={() => history.push('/')}
//                      />
//                      <Menu.Item
//                         icon={<HomeOutlined />}
//                         key="/"
//                         onClick={() => history.push('/')}
//                      >
//                         홈
//                      </Menu.Item>
//                      <SubMenu
//                         icon={<GiftOutlined />}
//                         title="추천"
//                         mode="horizontal"
//                      >
//                         {Object.entries(pushList).map((push) => (
//                            <Menu.Item
//                               key={push[0]}
//                               icon={push[1][1]}
//                               onClick={() =>
//                                  history.push(`/explore?push=${push[0]}`)
//                               }
//                            >
//                               {push[1][0]}
//                            </Menu.Item>
//                         ))}
//                      </SubMenu>

//                      <SubMenu
//                         icon={<TagOutlined />}
//                         title="특징"
//                         mode="horizontal"
//                         key="/tag"
//                      >
//                         {Object.entries(tagList).map((tag) => (
//                            <Menu.Item
//                               key={tag[0]}
//                               icon={tag[1]}
//                               onClick={() =>
//                                  history.push(`/explore?tag=${tag[0]}`)
//                               }
//                            >
//                               {tag[0]}
//                            </Menu.Item>
//                         ))}
//                      </SubMenu>
//                      <SubMenu
//                         icon={<ThunderboltFilled />}
//                         title="시리즈"
//                         mode="horizontal"
//                         key="/series"
//                      >
//                         {Object.entries(seriesList).map((series) => (
//                            <SubMenu key={series[0]} title={series[0]}>
//                               {series[1].map((title) => (
//                                  <Menu.Item
//                                     key={title}
//                                     onClick={() =>
//                                        history.push(`/explore?series=${title}`)
//                                     }
//                                  >
//                                     {title}
//                                  </Menu.Item>
//                               ))}
//                            </SubMenu>
//                         ))}
//                      </SubMenu>
//                      {!isLogin ? (
//                         <Menu.Item
//                            icon={<FormOutlined />}
//                            key="/signup"
//                            onClick={() => history.push('/signup')}
//                            style={{ float: 'right' }}
//                         >
//                            회원가입
//                         </Menu.Item>
//                      ) : null}
//                      {!isLogin ? (
//                         <Menu.Item
//                            icon={<LoginOutlined />}
//                            key="/login"
//                            onClick={() => history.push('/login')}
//                            style={{ float: 'right' }}
//                         >
//                            로그인
//                         </Menu.Item>
//                      ) : null}
//                      {isLogin ? (
//                         <Menu.Item
//                            icon={<UserOutlined />}
//                            key="/profile"
//                            onClick={this.handleDrawer}
//                            style={{
//                               float: 'right',
//                            }}
//                         >
//                            프로필 관리
//                         </Menu.Item>
//                      ) : null}

//                      {this.state.searchVisible ? (
//                         <Menu.Item style={{ float: 'right' }}>
//                            <Select
//                               showSearch={true}
//                               defaultOpen={true}
//                               autoFocus={true}
//                               dropdownClassName={
//                                  this.state.dropdown
//                                     ? 'dropdown-on'
//                                     : 'dropdown-off'
//                               }
//                               onChange={this.handleRecommendedKeyword}
//                               onSearch={this.handleSearchKeword}
//                               onBlur={this.onBlur}
//                               suffixIcon={<SearchOutlined />}
//                               style={{ width: '12.5vw' }}
//                               placeholder="제목, 감독, 인물 검색"
//                               filterOption={false}
//                            >
//                               <OptGroup label="추천 검색어">
//                                  <Option value="스파이더맨">스파이더맨</Option>
//                                  <Option value="엑스맨">엑스맨</Option>
//                                  <Option value="터미네이터">터미네이터</Option>
//                                  <Option value="크리스토퍼 놀란">
//                                     크리스토퍼 놀란
//                                  </Option>
//                                  <Option value="스칼렛 요한슨">
//                                     스칼렛 요한슨
//                                  </Option>
//                               </OptGroup>
//                            </Select>
//                         </Menu.Item>
//                      ) : (
//                         <Menu.Item
//                            icon={<SearchOutlined />}
//                            key="/search"
//                            style={{ float: 'right' }}
//                            onClick={this.hadleSearchVisible}
//                         >
//                            검색
//                         </Menu.Item>
//                      )}
//                   </Menu>
//                </Header>
//             </Layout>

//             <Drawer
//                title={<img src={SFCINEMA} className="max-small-logo" />}
//                width={350}
//                closable={true}
//                onClose={this.handleDrawer}
//                visible={this.state.visible}
//                footer={
//                   <div className="drawer-profile">
//                      <div>
//                         <Button
//                            type="primary"
//                            htmlType="submit"
//                            className="btn-signout"
//                            onClick={this.handleSettingLogout}
//                         >
//                            로그아웃
//                         </Button>
//                      </div>
//                   </div>
//                }
//             >
//                <Profile />
//             </Drawer>
//          </div>
//       );
//    }
// }
