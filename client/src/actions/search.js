export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';

/* Action creators */
export const setKeyword = (keyword) => ({
   type: SET_KEYWORD,
   keyword: keyword,
});

export const setSearchResult = (searchResult) => ({
   type: SET_SEARCH_RESULT,
   searchResult: searchResult,
});
