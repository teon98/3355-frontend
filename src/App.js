import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import appStyle from "./App.module.css";
import Container from "@mui/system/Container";
import Home from "./pages/card/Home";
import Render from "./pages/Render";
import Login from "./pages/account/Login";
import Singup from "./pages/account/Singup";
import LowerNavbar from "./components/LowerNavbar";
import Mypage from "./pages/mypage/Mypage";
import PaymentDetails from "./pages/card/PaymentDetails";
import PointDetail from "./pages/card/PointDetail";
import CommunityMain from "./pages/community/CommunityMain";
import Event from "./pages/eventpage/EventPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles/FadeStyles.css";
import BarcodeScan from "./pages/card/BarcodeScan";
import Pay from "./pages/card/Pay";
import CardCreate from "./pages/account/CardCreate";
import PayComplete from "./pages/card/PayComplete";
import FindPass from "./pages/account/FindPass";
import ChangePass from "./pages/account/ChangePass";

//폰트 GmarketSans로 지정
const theme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },
});

const App = () => {
  const location = useLocation();

  //현재 경로 알아내기
  const currentPath = location.pathname;
  //console.log(currentPath === "/");
  //console.log(/\/auth/.test(currentPath));
  // console.log( currentPath === "/" || /\/auth/.test(currentPath) ? "야호" : "무야호");

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        className={
          currentPath === "/" || /\/auth/.test(currentPath)
            ? appStyle.gradient
            : appStyle.notgradient
        }
        disableGutters
      >
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <Routes location={location}>
              {/* 렌더화면 */}
              <Route path="/" element={<Render />} />
              {/* 계정 */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Singup />} />
              <Route path="/auth/cardCreate" element={<CardCreate />} />
              <Route path="/auth/findPass" element={<FindPass />} />
              <Route path="/auth/ChangePass" element={<ChangePass />} />
              {/* 홈(==카드) */}
              <Route path="/home" element={<LowerNavbar />}>
                <Route index element={<Home />} />
                <Route path="barcode" element={<BarcodeScan />} />
                <Route path="pay" element={<Pay />} />
                <Route path="pay/complete" element={<PayComplete />} />
                <Route path="payment" element={<PaymentDetails />} />
                <Route path="point" element={<PointDetail />} />
              </Route>
              {/* 커뮤니티 */}
              <Route path="/community" element={<LowerNavbar />}>
                <Route index element={<CommunityMain />} />
              </Route>
              {/* 마이페이지 */}
              <Route path="/mypage" element={<LowerNavbar />}>
                <Route index element={<Mypage />} />
              </Route>
              {/* 이벤트 */}
              <Route path="/event" element={<LowerNavbar />}>
                <Route index element={<Event />}></Route>
              </Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </ThemeProvider>
  );
};

export default App;
