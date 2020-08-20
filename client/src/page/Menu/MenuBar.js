import React, { Component } from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, Input } from 'antd';
import {
   StarFilled,
   SketchCircleFilled,
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
} from '@ant-design/icons';
import MyInfo from '../MyInfo/MyInfo';
import './MenuBar.css';
import SFCINEMA from '../../SFCINEMA.png';

const { Header } = Layout;
const { SubMenu } = Menu;

const marvelSeriesList = [
   '어벤져스',
   '스파이더맨',
   '아이언맨',
   '앤트맨',
   '캡틴 아메리카',
   '데드풀',
   '엑스맨',
   '가디언즈 오브 갤럭시',
];

const zombieAndMonsterSeriesList = [
   '레지던트 이블',
   '클로버필드',
   '28일 후',
   '쥬라기 월드',
   '혹성탈출',
];

const alienAndSpaceSeriesList = [
   '에이리언',
   '맨 인 블랙',
   '스타워즈',
   '스타트렉',
   '트랜스포머',
   '콰이어트 플레이스',
   '퍼시픽 림',
];

const actionAndAdventureSeriesList = [
   '터미네이터',
   '메이즈 러너',
   '백 투 더 퓨쳐',
   '헝거게임',
   '다이버전트',
   '블레이드 러너',
];

const geners = [
   ['우주 탐사', <RocketFilled />],
   ['외계인', <RedditCircleFilled />],
   ['슈퍼 히어로', <DingdingOutlined />],
   ['액션', <ThunderboltFilled />],
   ['몬스터', <GitlabFilled />],
   ['가상 현실 또는 AI', <RobotFilled />],
   ['시간 여행', <HourglassFilled />],
   ['드라마', <ReadFilled />],
   ['좀비', <EyeInvisibleFilled />],
   ['재난', <FireFilled />],
];

class MenuBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         profile: {},
         selectKey: '',
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

   showDrawer = () => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');

      if (this.props.isLogin) {
         if (accessToken) {
            axios
               .get('http://localhost:5000/user/profile', {
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
      let currentpath = window.location.pathname;
      let currentParams = window.location.search;
      currentpath =
         currentpath === '/series' || currentpath === '/genres'
            ? ''
            : currentpath;
      let paramsKey = currentParams.slice(
         currentParams.indexOf('=') + 1,
         currentParams.indexOf('&'),
      );

      paramsKey = isNaN(paramsKey) ? '' : paramsKey;

      history.replaceState({}, null, location.pathname);

      return (
         <div>
            <Layout
               className="layout"
               style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
               }}
            >
               <Header>
                  <img
                     className="header-logo"
                     src={SFCINEMA}
                     onClick={() => this.props.history.push('/')}
                  />

                  <Menu
                     selectedKeys={[currentpath + paramsKey]}
                     onClick={this.handleClick}
                     mode="horizontal"
                     theme="dark"
                  >
                     <Menu.Item
                        icon={<HomeOutlined />}
                        key="/"
                        onClick={() => this.props.history.push('/')}
                        style={{
                           float: 'left',
                           marginLeft: '30px',
                        }}
                     >
                        <a>홈</a>
                     </Menu.Item>

                     <SubMenu
                        icon={<BarsOutlined />}
                        title="SF 장르"
                        mode="horizontal"
                        key="/genres"
                     >
                        {geners.map((gener, i) => (
                           <Menu.Item
                              key={i + 40 + ''}
                              icon={gener[1]}
                              onClick={({ key }) =>
                                 this.NavigateToGenres('/genres', key, gener[0])
                              }
                           >
                              {gener[0]}
                           </Menu.Item>
                        ))}
                     </SubMenu>

                     <Menu.Item
                        icon={<VideoCameraFilled />}
                        title="최신 영화"
                        key="/releaseOrder"
                        style={{
                           marginLeft: '10vw',
                        }}
                        onClick={({ key }) =>
                           this.NavigateToHighlyRataedAndReleaseOrder(
                              '/releaseOrder',
                              key,
                              100,
                              20210000,
                              20200000,
                           )
                        }
                     >
                        최신 영화
                     </Menu.Item>

                     <Menu.Item
                        icon={<StarFilled />}
                        title="별점이 높은 영화"
                        key="/highlyRated"
                        onClick={({ key }) =>
                           this.NavigateToHighlyRataedAndReleaseOrder(
                              '/highlyRated',
                              key,
                              100,
                              10,
                              8.5,
                           )
                        }
                     >
                        별점이 높은 영화
                     </Menu.Item>

                     <Menu.Item
                        icon={<GiftFilled />}
                        key="/operatorMovies"
                        onClick={({ key }) =>
                           this.NavigateToOperatorAndMasterpiece(
                              '/operatorMovies',
                              key,
                              41,
                           )
                        }
                     >
                        <a>운영자 추천</a>
                     </Menu.Item>

                     <Menu.Item
                        icon={<CrownFilled />}
                        key="/masterpiece"
                        onClick={({ key }) =>
                           this.NavigateToOperatorAndMasterpiece(
                              '/masterpiece',
                              key,
                              100,
                           )
                        }
                     >
                        <a>SF 명작</a>
                     </Menu.Item>

                     <SubMenu
                        icon={<SketchCircleFilled />}
                        title="SF 시리즈"
                        mode="horizontal"
                        key="/series"
                     >
                        <SubMenu key="seriesMenuItem-1" title="마블 시리즈">
                           {marvelSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + ''}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries('/series', key, name)
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>

                        {/* key=16 까지 */}
                        <SubMenu
                           key="/seriesMenuItem-2"
                           title="좀비/몬스터 시리즈"
                        >
                           {zombieAndMonsterSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 8 + ''}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries('/series', key, name)
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=19 까지 */}
                        <SubMenu
                           key="/seriesMenuItem-3"
                           title="외계인/우주 탐사 시리즈"
                        >
                           {alienAndSpaceSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 14 + ''}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries('/series', key, name)
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=23 까지 */}
                        <SubMenu
                           key="/seriesMenuItem-4"
                           title="액션/모험 시리즈"
                        >
                           {actionAndAdventureSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 30 + ''}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries('/series', key, name)
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                     </SubMenu>

                     {!isLogin ? (
                        <Menu.Item
                           icon={<FormOutlined />}
                           key="/signUp"
                           onClick={() => this.props.history.push('/signUp')}
                           style={{
                              float: 'right',
                              marginRight: '50px',
                           }}
                        >
                           <a>회원가입</a>
                        </Menu.Item>
                     ) : null}

                     {!isLogin ? (
                        <Menu.Item
                           icon={<LoginOutlined />}
                           key="/login"
                           onClick={() => this.props.history.push('/login')}
                           style={{
                              float: 'right',
                           }}
                        >
                           <a>로그인</a>
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
                           <a>프로필 관리</a>
                        </Menu.Item>
                     ) : null}
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
