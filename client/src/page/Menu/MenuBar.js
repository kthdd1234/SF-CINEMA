import React, { Component } from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, Input } from 'antd';
import {
   StarFilled,
   ThunderboltFilled,
   VideoCameraFilled,
   GiftFilled,
   CrownFilled,
   HomeOutlined,
   LoginOutlined,
   FormOutlined,
   UserOutlined,
   SearchOutlined,
} from '@ant-design/icons';
import MyInfo from '../MyInfo/MyInfo';
import './MenuBar.css';
import SFCINEMA from '../../SFCINEMA.png';
import Search from 'antd/lib/input/Search';
const { Header } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;

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

const horrorSeriesList = ['레지던트 이블', '클로버필드', '28일 후'];

const alienAndSpaceSeriesList = [
   '에이리언',
   '맨 인 블랙',
   '스타워즈',
   '스타트렉',
];

const actionAndAdventureSeriesList = [
   '메이즈 러너',
   '백 투 더 퓨쳐',
   '헝거게임',
   '다이버전트',
   '블레이드 러너',
   '혹성탈출',
   '쥬라기 월드',
];

const robotAndAISeriesList = ['트랜스포머', '터미네이터', '퍼시픽 림'];

class MenuBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         profile: {},
      };
   }

   handleLogoutChange = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      location.reload(true);
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
      const { handleLoginChange, profile, isLogin } = this.props;
      return (
         <div>
            <Layout className="layout">
               <Header>
                  <img className="logo" src={SFCINEMA}></img>
                  <Menu
                     onClick={this.handleClick}
                     mode="horizontal"
                     theme="dark"
                  >
                     <SubMenu
                        icon={<StarFilled />}
                        title="평점 높은순"
                        style={{
                           marginLeft: '20vw',
                        }}
                     >
                        <Menu.Item
                           key="1"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/highlyRated/rating',
                                 key,
                                 100,
                                 10,
                                 9,
                              )
                           }
                        >
                           9점대 평점
                        </Menu.Item>
                        <Menu.Item
                           key="2"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/highlyRated/rating',
                                 key,
                                 100,
                                 9,
                                 8,
                              )
                           }
                        >
                           8점대 평점
                        </Menu.Item>
                        <Menu.Item
                           key="3"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/highlyRated/rating',
                                 key,
                                 100,
                                 8,
                                 7,
                              )
                           }
                        >
                           7점대 평점
                        </Menu.Item>
                        <Menu.Item
                           key="4"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/highlyRated/rating',
                                 key,
                                 100,
                                 7,
                                 0,
                              )
                           }
                        >
                           6점대 평점 / 이하
                        </Menu.Item>
                     </SubMenu>
                     <SubMenu icon={<VideoCameraFilled />} title="영화 개봉순">
                        <Menu.Item
                           key="5"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/releaseOrder/year',
                                 key,
                                 100,
                                 20210000,
                                 20150000,
                              )
                           }
                        >
                           2020~2015
                        </Menu.Item>
                        <Menu.Item
                           key="6"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/releaseOrder/year',
                                 key,
                                 100,
                                 20150000,
                                 20100000,
                              )
                           }
                        >
                           2014~2010
                        </Menu.Item>
                        <Menu.Item
                           key="7"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/releaseOrder/year',
                                 key,
                                 100,
                                 20100000,
                                 20050000,
                              )
                           }
                        >
                           2009~2005
                        </Menu.Item>
                        <Menu.Item
                           key="8"
                           onClick={({ key }) =>
                              this.NavigateToHighlyRataedAndReleaseOrder(
                                 '/releaseOrder/year',
                                 key,
                                 100,
                                 20050000,
                                 0,
                              )
                           }
                        >
                           2004년 이하
                        </Menu.Item>
                     </SubMenu>
                     <SubMenu
                        icon={<ThunderboltFilled />}
                        title="SF 시리즈"
                        mode="horizontal"
                     >
                        <SubMenu key="seriesMenuItem-1" title="마블 시리즈">
                           {marvelSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 9}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries(
                                       '/series/seriesName',
                                       key,
                                       name,
                                    )
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=16 까지 */}
                        <SubMenu key="seriesMenuItem-2" title="호러 시리즈">
                           {horrorSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 17}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries(
                                       '/series/seriesName',
                                       key,
                                       name,
                                    )
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=19 까지 */}
                        <SubMenu
                           key="seriesMenuItem-3"
                           title="외계인/우주 탐사 시리즈"
                        >
                           {alienAndSpaceSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 20}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries(
                                       '/series/seriesName',
                                       key,
                                       name,
                                    )
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=23 까지 */}
                        <SubMenu
                           key="seriesMenuItem-4"
                           title="액션/모험 시리즈"
                        >
                           {actionAndAdventureSeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 24}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries(
                                       '/series/seriesName',
                                       key,
                                       name,
                                    )
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=30 까지 */}
                        <SubMenu key="seriesMenuItem-5" title="로봇/AI 시리즈">
                           {robotAndAISeriesList.map((name, i) => (
                              <Menu.Item
                                 key={i + 31}
                                 onClick={({ key }) =>
                                    this.NavigateToSeries(
                                       '/series/seriesName',
                                       key,
                                       name,
                                    )
                                 }
                              >
                                 {name}
                              </Menu.Item>
                           ))}
                        </SubMenu>
                        {/* key=33 까지 */}
                     </SubMenu>
                     <Menu.Item
                        icon={<GiftFilled />}
                        key="34"
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
                        key="35"
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

                     <Menu.Item
                        icon={<HomeOutlined />}
                        key="home"
                        onClick={() => this.props.history.push('/')}
                        style={{
                           marginLeft: '20vw',
                        }}
                     >
                        <a>홈</a>
                     </Menu.Item>

                     {!isLogin ? (
                        <Menu.Item
                           icon={<LoginOutlined />}
                           key="login"
                           onClick={() => this.props.history.push('/login')}
                        >
                           <a>로그인</a>
                        </Menu.Item>
                     ) : null}

                     {!isLogin ? (
                        <Menu.Item
                           icon={<FormOutlined />}
                           key="signUp"
                           onClick={() => this.props.history.push('/signUp')}
                        >
                           <a>회원가입</a>
                        </Menu.Item>
                     ) : null}

                     {isLogin ? (
                        <Menu.Item
                           icon={<UserOutlined />}
                           key="profile"
                           onClick={this.showDrawer}
                        >
                           <a>프로필 관리</a>
                        </Menu.Item>
                     ) : null}
                  </Menu>
               </Header>
            </Layout>
            <Drawer
               width={350}
               closable={false}
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
