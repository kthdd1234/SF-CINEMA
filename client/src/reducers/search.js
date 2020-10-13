import { SET_KEYWORD, SET_SEARCH_RESULT } from '../actions/search';

const initialState = {
   keyword: '',
   searchResult: [],
};

const searchReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_KEYWORD:
         return Object.assign({}, state, {
            keyword: action.keyword,
         });

      case SET_SEARCH_RESULT:
         return Object.assign({}, state, {
            searchResult: action.searchResult,
         });
      default:
         return state;
   }
};

export default searchReducer;
