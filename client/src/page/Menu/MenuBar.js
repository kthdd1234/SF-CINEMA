import React, { Component } from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, Select, message } from 'antd';
import {
   StarFilled,
   VideoCameraOutlined,
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
import MyInfo from '../MyInfo/MyInfo';
import './MenuBar.css';
import SFCINEMA from '../../SFCINEMA.png';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/main`,
});

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

const genres = [
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

const recommendedCategory = [
   { category: '최신 영화', icon: <VideoCameraFilled />, key: '/releaseOrder' },
   { category: '평점이 높은 영화', icon: <StarFilled />, key: '/highlyRated' },
   { category: '운영자 추천', icon: <GiftFilled />, key: '/operatorMovies' },
   { category: 'SF 명작', icon: <CrownFilled />, key: '/masterpiece' },
];

function onChange(value) {
   console.log(`selected ${value}`);
}

class MenuBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         profile: {},
         selectKey: '',
         searchVisible: false,
         searchResult: null,
      };
   }

   handleLogoutChange = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      location.reload(true);
   };

   NavigateToGenres = (path, key, genre) => {
      this.props.history.push(`${path}?key=${key}&genre=${genre}`);
   };

   NavigateToHighlyRataedAndReleaseOrder = (
      path,
      key,
      count,
      under,
      moreThen,
   ) => {
      this.props.history.push(
         `${path}?key=${key}&count=${count}&under=${under}&moreThen=${moreThen}`,
      );
   };

   NavigateToSeries = (path, key, seriesName) => {
      this.props.history.push(`${path}?key=${key}&seriesName=${seriesName}`);
   };
   NavigateToOperatorAndMasterpiece = (path, key, count) => {
      this.props.history.push(`${path}?key=${key}&count=${count}`);
   };

   handleNavigatePage = (key) => {
      if (key === '/releaseOrder') {
         this.NavigateToHighlyRataedAndReleaseOrder(
            key,
            key,
            100,
            20220000,
            20200000,
         );
      } else if (key === '/highlyRated') {
         this.NavigateToHighlyRataedAndReleaseOrder(key, key, 100, 10, 8.5);
      } else if (key === '/operatorMovies') {
         this.NavigateToOperatorAndMasterpiece(key, key, 41);
      } else if (key === '/masterpiece') {
         this.NavigateToOperatorAndMasterpiece(key, key, 100);
      }
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

   handleRecommendedKeword = (keyword) => {
      serverUrl
         .get('/searchMovie', {
            params: {
               keyword: keyword,
            },
         })
         .then(({ data }) => {
            if (data === 'Not Found') {
               return message.error('검색 결과를 찾을 수 없음');
            }
            console.log(data);
            this.setState({
               searchResult: data,
            });
         });
   };

   handleSearchKeword = (keyword) => {};

   showDrawer = () => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');

      if (this.props.isLogin) {
         if (accessToken) {
            axios
               .get(`http://${process.env.REACT_APP_HOST}:5000/user/profile`, {
                  headers: {
                     Authorization: 'Bearer ' + accessToken,
                  },
               })
               .then(({ data }) => {
                  this.setState({
                     profile: data,
                  });
               });
         }
      }

      this.setState({
         visible: true,
      });
   };

   onClose = () => {
      this.setState({
         visible: false,
      });
   };

   render() {
      const { handleLoginChange, isLogin } = this.props;
      let path = window.location.pathname;
      let address = url.parse(window.location.search, true).query.key;
      if (path === '/' || path === '/login' || path === '/signUp') {
         address = window.location.pathname;
      }

      return (
         <div>
            <Layout
               className="layout"
               style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 3,
               }}
            >
               <Header>
                  <Menu
                     selectedKeys={[address]}
                     mode="horizontal"
                     theme="dark"
                     overflowedIndicator={<BarsOutlined />}
                  >
                     <Menu.Item
                        icon={
                           <img
                              className="header-logo"
                              src={SFCINEMA}
                              onClick={() => this.props.history.push('/')}
                           />
                        }
                        style={{
                           paddingRight: '30px',
                        }}
                        onClick={() => this.props.history.push('/')}
                     />
                     <Menu.Item
                        icon={<HomeOutlined />}
                        key="/"
                        onClick={() => this.props.history.push('/')}
                     >
                        홈
                     </Menu.Item>
                     <SubMenu
                        icon={<VideoCameraOutlined />}
                        title="추천 영화"
                        mode="horizontal"
                        key="/recommendedCategory"
                     >
                        {recommendedCategory.map((element, i) => (
                           <Menu.Item
                              key={element.key}
                              icon={element.icon}
                              onClick={() =>
                                 this.handleNavigatePage(element.key)
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
                        key="/genres"
                     >
                        {genres.map((element) => (
                           <Menu.Item
                              key={element.genre}
                              icon={element.icon}
                              onClick={({ key }) =>
                                 this.NavigateToGenres(
                                    '/genres',
                                    key,
                                    element.genre,
                                 )
                              }
                           >
                              {element.genre}
                           </Menu.Item>
                        ))}
                     </SubMenu>
                     <SubMenu
                        icon={<ThunderboltFilled />}
                        title="시리즈물"
                        mode="horizontal"
                        key="/series"
                     >
                        {seriesList.map((series) => (
                           <SubMenu key={series.key} title={series.title}>
                              {series.list.map((name) => (
                                 <Menu.Item
                                    key={name}
                                    onClick={({ key }) =>
                                       this.NavigateToSeries(
                                          '/series',
                                          key,
                                          name,
                                       )
                                    }
                                 >
                                    {name}
                                 </Menu.Item>
                              ))}
                           </SubMenu>
                        ))}
                     </SubMenu>
                     {!isLogin ? (
                        <Menu.Item
                           icon={<FormOutlined />}
                           key="/signUp"
                           onClick={() => this.props.history.push('/signUp')}
                           style={{ float: 'right' }}
                        >
                           회원가입
                        </Menu.Item>
                     ) : null}
                     {!isLogin ? (
                        <Menu.Item
                           icon={<LoginOutlined />}
                           key="/login"
                           onClick={() => this.props.history.push('/login')}
                           style={{ float: 'right' }}
                        >
                           로그인
                        </Menu.Item>
                     ) : null}
                     {isLogin ? (
                        <Menu.Item
                           icon={<UserOutlined />}
                           key="/profile"
                           onClick={this.showDrawer}
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
                              onChange={this.handleRecommendedKeword}
                              onSearch={this.handleSearchKeword}
                              onBlur={this.onBlur}
                              suffixIcon={<SearchOutlined />}
                              style={{ width: 200 }}
                              placeholder="제목, 감독, 인물 검색"
                              optionFilterProp="children"
                           >
                              <OptGroup label="추천 검색어">
                                 <Option value="스파이더맨">스파이더맨</Option>
                                 <Option value="엑스맨">엑스맨</Option>
                                 <Option value="에이리언">에이리언</Option>
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
               onClose={this.onClose}
               visible={this.state.visible}
               footer={
                  <div
                     style={{
                        margin: '0 0 15pt 40pt',
                     }}
                  >
                     <div>
                        <Button
                           type="primary"
                           htmlType="submit"
                           style={{
                              width: '180pt',
                              margin: '10pt 0 0 0',
                              borderRadius: '3px',
                           }}
                           onClick={this.handleLogoutChange}
                        >
                           로그아웃
                        </Button>
                     </div>
                  </div>
               }
            >
               <MyInfo
                  isLogin={this.props.isLogin}
                  profile={this.state.profile}
                  handleLoginChange={handleLoginChange}
               />
            </Drawer>
         </div>
      );
   }
}
// eslint-disable-next-line
export default withRouter(MenuBar);
// eslint-disable-next-line
