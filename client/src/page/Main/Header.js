import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
   StarFilled,
   ThunderboltFilled,
   VideoCameraFilled,
   GiftFilled,
   CrownFilled,
   HomeOutlined,
   LoginOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { SubMenu } = Menu;

class Headers extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   handleHighlyRatedMenuItems = (count, under, moreThen, key) => {
      this.props.history.push(
         `/highlyRated/rating?key=${key}&count=${count}&under=${under}&moreThen=${moreThen}`,
      );
   };

   handleReleaseOrderMenuItems = () => {};

   render() {
      return (
         <div>
            <Layout className="layout">
               <Header>
                  <div className="logo"></div>
                  <Menu onClick={this.handleClick} mode="horizontal" theme="">
                     <SubMenu icon={<StarFilled />} title="평점 높은순">
                        <Menu.Item
                           key="Item:1"
                           onClick={() =>
                              this.handleHighlyRatedMenuItems(100, 10, 9, 1)
                           }
                        >
                           9점대 평점
                        </Menu.Item>
                        <Menu.Item
                           key="Item:2"
                           onClick={() =>
                              this.handleHighlyRatedMenuItems(100, 9, 8, 2)
                           }
                        >
                           8점대 평점
                        </Menu.Item>
                        <Menu.Item
                           key="Item:3"
                           onClick={() =>
                              this.handleHighlyRatedMenuItems(100, 8, 7, 3)
                           }
                        >
                           7점대 평점
                        </Menu.Item>
                        <Menu.Item
                           key="Item:4"
                           onClick={() =>
                              this.handleHighlyRatedMenuItems(100, 7, 0, 4)
                           }
                        >
                           6점대 평점 / 이하
                        </Menu.Item>
                     </SubMenu>
                     <SubMenu icon={<VideoCameraFilled />} title="영화 개봉순">
                        <Menu.Item key="Item:5">2020~2015</Menu.Item>
                        <Menu.Item key="Item:6">2014~2010</Menu.Item>
                        <Menu.Item key="Item:7">2009~2005</Menu.Item>
                        <Menu.Item key="Item:8">2004년 이하</Menu.Item>
                     </SubMenu>
                     <SubMenu
                        icon={<ThunderboltFilled />}
                        title="SF 시리즈"
                        mode="horizontal"
                     >
                        <SubMenu key="series-1" title="마블 시리즈">
                           <Menu.Item key="1">어벤져스</Menu.Item>
                           <Menu.Item key="2">스파이더맨</Menu.Item>
                           <Menu.Item key="3">아이언맨</Menu.Item>
                           <Menu.Item key="4">앤트맨</Menu.Item>
                           <Menu.Item key="5">캡틴 아메리카</Menu.Item>
                           <Menu.Item key="522">데드풀</Menu.Item>
                           <Menu.Item key="15">엑스맨</Menu.Item>
                           <Menu.Item key="221">가디언즈 오브 갤럭시</Menu.Item>
                        </SubMenu>
                        <SubMenu key="series-2" title="공포/호러 시리즈">
                           <Menu.Item key="5">콰이어트 플레이스</Menu.Item>
                           <Menu.Item key="56">레지던트 이블</Menu.Item>
                           <Menu.Item key="36">클로버 필드</Menu.Item>
                        </SubMenu>
                        <SubMenu key="series-3" title="외계인/우주 탐사 시리즈">
                           <Menu.Item key="9">에일리언</Menu.Item>
                           <Menu.Item key="10">맨 인 블랙</Menu.Item>
                           <Menu.Item key="11">스타워즈</Menu.Item>
                           <Menu.Item key="12">스타트랙</Menu.Item>
                        </SubMenu>
                        <SubMenu key="series-4" title="액션/모험 시리즈">
                           <Menu.Item key="13">다이버전트</Menu.Item>
                           <Menu.Item key="14">메이즈 러너</Menu.Item>
                           <Menu.Item key="16">백 투 더 퓨처</Menu.Item>
                           <Menu.Item key="17">헝거 게임</Menu.Item>
                           <Menu.Item key="18">다이버전트</Menu.Item>
                           <Menu.Item key="333">블레이드 러너</Menu.Item>
                           <Menu.Item key="111">혹성탈출</Menu.Item>
                           <Menu.Item key="111">쥬라기 월드</Menu.Item>
                        </SubMenu>
                        <SubMenu key="series-5" title="로봇/AI 시리즈">
                           <Menu.Item key="19">트랜스 포머</Menu.Item>
                           <Menu.Item key="20">터미네이터</Menu.Item>
                           <Menu.Item key="21">퍼시픽 림</Menu.Item>
                        </SubMenu>
                     </SubMenu>
                     <Menu.Item icon={<GiftFilled />} key="운영자 추천">
                        <a>운영자 추천</a>
                     </Menu.Item>
                     <Menu.Item icon={<CrownFilled />} key="SF 명작">
                        <a>SF 명작</a>
                     </Menu.Item>
                     <Menu.Item
                        icon={<HomeOutlined />}
                        key="home"
                        onClick={() => this.props.history.push('/')}
                     >
                        <a>홈</a>
                     </Menu.Item>
                     <Menu.Item
                        icon={<LoginOutlined />}
                        key="login"
                        onClick={() => this.props.history.push('/login')}
                     >
                        <a>로그인</a>
                     </Menu.Item>
                  </Menu>
               </Header>
            </Layout>
         </div>
      );
   }
}
// eslint-disable-next-line
export default withRouter(Headers);
