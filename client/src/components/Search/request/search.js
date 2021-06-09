import { serverUrl } from './index';

/* 키워드 검색 */
export const search = async (keyword) => {
   try {
      const { data } = await serverUrl.get('/search', {
         params: {
            keyword: keyword,
         },
      });

      if (data === 'Not Found') {
         return [];
      }

      return data;
   } catch (error) {
      console.log(error);
   }
};
