import { SET_CONTENTS } from '../actions/contents';

const initialState = {
   contents: {},
};

const contentsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_CONTENTS:
         return Object.assign({}, state, {
            contents: action.contents,
         });
      default:
         return state;
   }
};

export default contentsReducer;
