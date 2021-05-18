import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducers from './reducers';
import 'antd/dist/antd.css';
import './index.css';

const store = createStore(
   reducers,
   window.devToolsExtension ? window.devToolsExtension() : (f) => f,
);

ReactDOM.render(
   <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
   </BrowserRouter>,
   document.getElementById('root'),
);

/* src 디렉토리 내부 설명 
- actions: 액션 타입, 액션 생성자 파일이 저장됩니다.
- reducers: 스토어의 기본 상태와 상태의 업데이트를 담당하는 리듀서 파일들이 저장됩니다.
- containers: store 에 접근이 닿는 container 컴포넌트들이 저장됩니다.
- componentes: view 만을 담당하는 presentational 컴포넌트들이 저장됩니다.
- utils: 일부 컴포넌트들에서 공용되는 파일이 저장됩니다.
*/
