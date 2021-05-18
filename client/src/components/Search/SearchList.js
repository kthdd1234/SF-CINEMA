import React, { Component } from 'react';
import { Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { requestSearch } from '../../requests';
import { handleURLSearchParams } from '../../utils';
import List from './List';
import SearchListEntry from '../../containers/Search/SearchListEntry';
import './SearchList.css';

class SearchList extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount = async () => {
      const {
         handleSettingSearchKeyword,
         handleSettingSearchResult,
      } = this.props;

      const keyword = handleURLSearchParams('query');
      const searchResult = await requestSearch(keyword);

      handleSettingSearchKeyword(keyword);
      handleSettingSearchResult(searchResult);
   };

   componentDidUpdate = async (prevProps) => {
      const {
         handleSettingSearchKeyword,
         handleSettingSearchResult,
      } = this.props;

      if (this.props.location !== prevProps.location) {
         // console.log(this.props.location);
         // console.log(prevProps.location);
         const keyword = handleURLSearchParams('query');
         const searchResult = await requestSearch(keyword);

         handleSettingSearchKeyword(keyword);
         handleSettingSearchResult(searchResult);
      }
   };

   render() {
      let { keyword, searchResult } = this.props;
      searchResult ? searchResult : (searchResult = []);

      return (
         <div>
            <div className="search-result-container">
               <div className="search-result-text">
                  <SearchOutlined className="search-icon" />
                  {keyword}
                  <span className="text-detail">검색 결과 </span>
                  {searchResult.length}
                  <span className="text-detail">건</span>
               </div>
               {searchResult.length ? (
                  <List movieList={searchResult} keyword={keyword} />
               ) : (
                  // <div className="search-result-list">
                  //    {searchResult.map((movie, i) => (
                  //       <SearchListEntry
                  //          key={i}
                  //          movie={movie}
                  //          keyword={keyword}
                  //       />
                  //    ))}
                  // </div>
                  <div className="loding-spin">
                     <Spin size="large" />
                  </div>
               )}
            </div>
         </div>
      );
   }
}

export default SearchList;
