import React, { useMemo, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
//Provider: 어떤 컴포넌트에 제공할지 useSelector:어떤 state값을 쓰고싶은지
//useDispatch: state값을 변경시킬때 사용

//초기상태정의 - User 정보 저장하는 Redux
const initialState = { userNo: 0 };

//세션 스토리지에서 상태 불러오기
const savedState = sessionStorage.getItem("reduxState");
const persistedState = savedState ? JSON.parse(savedState) : initialState;

//리듀서 안의 변수를 어떻게 변경시킬지
function reducer(state = persistedState, action) {
  if (action.type === "setUserNo") {
    return { ...state, userNo: action.num };
  }
  return state;
}

const store = createStore(reducer);

//상태저장
store.subscribe(() => {
  sessionStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
