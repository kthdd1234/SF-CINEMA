import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, Select } from 'antd';
import {
   StarFilled,
   GiftOutlined,
   VideoCameraFilled,
   GiftFilled,
   CrownFilled,
   HomeOutlined,
   LoginOutlined,
   FormOutlined,
   UserOutlined,
   BarsOutlined,
   EyeInvisibleFilled,
   RocketFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   GitlabFilled,
   RobotFilled,
   HourglassFilled,
   ReadFilled,
   FireFilled,
   SearchOutlined,
   TagOutlined,
} from '@ant-design/icons';
import dotenv from 'dotenv';
import Profile from '../../containers/Profile/profile';
import SFCINEMA from '../../SFCINEMA.png';
import { requestProfile } from '../../requests';
import './MenuBar.css';
dotenv.config();

const url = require('url');
const { Header } = Layout;
const { SubMenu } = Menu;
const { Option, OptGroup } = Select;

const seriesList = [
   {
      title: '슈퍼히어로 시리즈',
      key: '/seriesMenuItem-1',
      list: [
         '어벤져스',
         '스파이더맨',
         '아이언맨',
         '앤트맨',
         '캡틴 아메리카',
         '데드풀',
         '엑스맨',
         '가디언즈 오브 갤럭시',
         '토르',
         '배트맨',
      ],
   },
   {
      title: '몬스터 시리즈',
      key: '/seriesMenuItem-2',
      list: ['클로버필드', '퍼시픽 림', '쥬라기 월드', '콰이어트 플레이스'],
   },
   {
      title: '우주배경 시리즈',
      key: '/seriesMenuItem-3',
      list: ['에이리언', '스타워즈', '스타트렉', '트랜스포머'],
   },
   {
      title: '액션 시리즈',
      key: '/seriesMenuItem-4',
      list: [
         '레지던트 이블',
         '터미네이터',
         '메이즈 러너',
         '헝거게임',
         '다이버전트',
         '블레이드 러너',
         '맨 인 블랙',
      ],
   },
   {
      title: '모험 시리즈',
      key: '/seriesMenuItem-5',
      list: ['백 투 더 퓨쳐', '28일 후', '혹성탈출'],
   },
];

const genre = [
   { genre: '우주 탐사', icon: <RocketFilled /> },
   { genre: '외계인', icon: <RedditCircleFilled /> },
   { genre: '슈퍼 히어로', icon: <DingdingOutlined /> },
   { genre: '액션', icon: <ThunderboltFilled /> },
   { genre: '몬스터', icon: <GitlabFilled /> },
   { genre: '가상 현실 또는 AI', icon: <RobotFilled /> },
   { genre: '시간 여행', icon: <HourglassFilled /> },
   { genre: '드라마', icon: <ReadFilled /> },
   { genre: '좀비', icon: <EyeInvisibleFilled /> },
   { genre: '재난', icon: <FireFilled /> },
];

const recommended = [
   {
      category: '최신 영화',
      icon: <VideoCameraFilled />,
      path: 'latest-movies',
   },
   {
      category: '평점이 높은 영화',
      icon: <StarFilled />,
      path: 'highly-rated-movies',
   },
   {
      category: '운영자 추천',
      icon: <GiftFilled />,
      path: 'operator-recommendation',
   },
   {
      category: 'SF 명작',
      icon: <CrownFilled />,
      path: 'sf-masterpiece',
   },
];

class MenuBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         profile: {},
         searchVisible: false,
         dropdown: true,
      };
   }

   componentDidMount = async () => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken) {
         const profile = await requestProfile(accessToken);
         this.props.handleProfileUpdate(profile);
         this.props.handleLoginChange(true);
      }
   };

   handlePageSwitching = (path) => {
      const { history } = this.props;

      switch (path) {
         case 'highly-rated-movies':
            return history.push(`/recommendation/${path}`);

         case 'latest-movies':
            return history.push(`/recommendation/${path}`);

         case 'operator-recommendation':
            return history.push(`/recommendation/${path}`);

         case 'sf-masterpiece':
            return history.push(`/recommendation/${path}`);

         default:
            return;
      }
   };

   handleLogoutChange = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      location.reload(true);
   };

   hadleSearchVisible = () => {
      this.setState({
         searchVisible: !this.state.searchVisible,
      });
   };

   onBlur = () => {
      this.setState({
         searchVisible: !this.state.searchVisible,
      });
   };

   handleSearchKeword = (keyword) => {
      if (keyword === '') {
         return this.setState({
            dropdown: true,
         });
      }
      this.setState({
         dropdown: false,
      });
      this.props.history.push(`/search?query=${keyword}`);
   };

   handleRecommendedKeyword = (keyword) => {
      this.setState({
         dropdown: true,
      });
      this.props.history.push(`/search?query=${keyword}`);
   };

   handleDrawer = () => {
      this.setState({
         visible: !this.state.visible,
      });
   };

   render() {
      const { isLogin, history } = this.props;
      let path = window.location.pathname;
      let address = url.parse(window.location.search, true).query.key;
      if (path === '/' || path === '/login' || path === '/signUp') {
         address = window.location.pathname;
      }

      return (
         <div>
            <Layout className="menubar-layout">
               <Header>
                  <Menu
                     selectedKeys={[address]}
                     mode="horizontal"
                     theme="dark"
                     overflowedIndicator={<BarsOutlined />}
                  >
                     <Menu.Item
                        icon={<img className="header-logo" src={SFCINEMA} />}
                        style={{
                           paddingRight: '30px',
                        }}
                        onClick={() => history.push('/')}
                     />
                     <Menu.Item
                        icon={<HomeOutlined />}
                        key="/"
                        onClick={() => history.push('/')}
                     >
                        홈
                     </Menu.Item>
                     <SubMenu
                        icon={<GiftOutlined />}
                        title="추천"
                        mode="horizontal"
                     >
                        {recommended.map((element, i) => (
                           <Menu.Item
                              key={element.path}
                              icon={element.icon}
                              onClick={() =>
                                 this.handlePageSwitching(element.path)
                              }
                           >
                              {element.category}
                           </Menu.Item>
                        ))}
                     </SubMenu>

                     <SubMenu
                        icon={<TagOutlined />}
                        title="장르"
                        mode="horizontal"
                        key="/genre"
                     >
                        {genre.map((element) => (
                           <Menu.Item
                              key={element.genre}
                              icon={element.icon}
                              onClick={() =>
                                 history.push(`/genre?genre=${element.genre}`)
                              }
                           >
                              {element.genre}
                           </Menu.Item>
                        ))}
                     </SubMenu>
                     <SubMenu
                        icon={<ThunderboltFilled />}
                        title="시리즈"
                        mode="horizontal"
                        key="/series"
                     >
                        {seriesList.map((series) => (
                           <SubMenu key={series.key} title={series.title}>
                              {series.list.map((title) => (
                                 <Menu.Item
                                    key={title}
                                    onClick={() =>
                                       history.push(`/series?title=${title}`)
                                    }
                                 >
                                    {title}
                                 </Menu.Item>
                              ))}
                           </SubMenu>
                        ))}
                     </SubMenu>
                     {!isLogin ? (
                        <Menu.Item
                           icon={<FormOutlined />}
                           key="/signup"
                           onClick={() => history.push('/signup')}
                           style={{ float: 'right' }}
                        >
                           회원가입
                        </Menu.Item>
                     ) : null}
                     {!isLogin ? (
                        <Menu.Item
                           icon={<LoginOutlined />}
                           key="/login"
                           onClick={() => history.push('/login')}
                           style={{ float: 'right' }}
                        >
                           로그인
                        </Menu.Item>
                     ) : null}
                     {isLogin ? (
                        <Menu.Item
                           icon={<UserOutlined />}
                           key="/profile"
                           onClick={this.handleDrawer}
                           style={{
                              float: 'right',
                           }}
                        >
                           프로필 관리
                        </Menu.Item>
                     ) : null}

                     {this.state.searchVisible ? (
                        <Menu.Item style={{ float: 'right' }}>
                           <Select
                              showSearch={true}
                              defaultOpen={true}
                              autoFocus={true}
                              dropdownClassName={
                                 this.state.dropdown
                                    ? 'dropdown-on'
                                    : 'dropdown-off'
                              }
                              onChange={this.handleRecommendedKeyword}
                              onSearch={this.handleSearchKeword}
                              onBlur={this.onBlur}
                              suffixIcon={<SearchOutlined />}
                              style={{ width: '12.5vw' }}
                              placeholder="제목, 감독, 인물 검색"
                              filterOption={false}
                           >
                              <OptGroup label="추천 검색어">
                                 <Option value="스파이더맨">스파이더맨</Option>
                                 <Option value="엑스맨">엑스맨</Option>
                                 <Option value="터미네이터">터미네이터</Option>
                                 <Option value="크리스토퍼 놀란">
                                    크리스토퍼 놀란
                                 </Option>
                                 <Option value="스칼렛 요한슨">
                                    스칼렛 요한슨
                                 </Option>
                              </OptGroup>
                           </Select>
                        </Menu.Item>
                     ) : (
                        <Menu.Item
                           icon={<SearchOutlined />}
                           key="/search"
                           style={{ float: 'right' }}
                           onClick={this.hadleSearchVisible}
                        >
                           검색
                        </Menu.Item>
                     )}
                  </Menu>
               </Header>
            </Layout>

            <Drawer
               title={<img src={SFCINEMA} className="max-small-logo" />}
               width={350}
               closable={true}
               onClose={this.handleDrawer}
               visible={this.state.visible}
               footer={
                  <div className="drawer-profile">
                     <div>
                        <Button
                           type="primary"
                           htmlType="submit"
                           className="btn-signout"
                           onClick={this.handleLogoutChange}
                        >
                           로그아웃
                        </Button>
                     </div>
                  </div>
               }
            >
               <Profile />
            </Drawer>
         </div>
      );
   }
}
// eslint-disable-next-line
export default withRouter(MenuBar);
// eslint-disable-next-line
