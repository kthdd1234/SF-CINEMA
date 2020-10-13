import SearchList from '../../components/Search/SearchList';
import { connect } from 'react-redux';
import { setKeyword, setSearchResult } from '../../actions/search';

const mapReduxStateToReactProps = ({ searchReducer }) => {
   return {
      keyword: searchReducer.keyword,
      searchResult: searchReducer.searchResult,
   };
};

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleSettingSearchKeyword: (keyword) => {
         dispatch(setKeyword(keyword));
      },
      handleSettingSearchResult: (searchResult) => {
         dispatch(setSearchResult(searchResult));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(SearchList);
