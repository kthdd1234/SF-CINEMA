import React, { Component } from 'react';
import { Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchResultListEntry from '../Menu/SearchResultListEntry';
import './SearchResultList.css';

class SearchResultList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchResult: [],
      };
   }

   componentDidMount = async () => {
      const searchResult = await this.props.searchResult;
      this.setState({
         searchResult: searchResult,
      });
   };

   componentDidUpdate = async (prevProps, prevState) => {
      if (this.props.keyword !== prevProps.keyword) {
         const searchResult = await this.props.searchResult;
         this.setState({
            searchResult: searchResult,
         });
      }
   };

   render() {
      const { profile, isLogin, keyword } = this.props;
      let { searchResult } = this.state;
      searchResult ? searchResult : (searchResult = []);

      return (
         <div>
            <div className="search-result-container">
               <div className="search-result-wrap">
                  <div className="search-result-text">
                     <SearchOutlined className="search-icon" />
                     {keyword}
                     <span className="text-detail">검색 결과 </span>
                     {searchResult.length}
                     <span className="text-detail">건</span>
                  </div>
                  {searchResult.length ? (
                     <div className="search-result-list">
                        {searchResult.map((movie, i) => (
                           <SearchResultListEntry
                              key={i}
                              isLogin={isLogin}
                              profile={profile}
                              movie={movie}
                           />
                        ))}
                     </div>
                  ) : (
                     <div className="loding-spin">
                        <Spin size="large" />
                     </div>
                  )}
               </div>
            </div>
         </div>
      );
   }
}

export default SearchResultList;
