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
import { createTheme, ThemeProvider } from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles/FadeStyles.css";

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
      >
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <Routes location={location}>
              <Route path="/" element={<Render />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Singup />} />
              <Route path="/home" element={<LowerNavbar />}>
                <Route index element={<Home />} />
                <Route path="payment" element={<PaymentDetails />} />
                <Route path="point" element={<PointDetail />} />
              </Route>
              <Route path="/mypage" element={<LowerNavbar />}>
                <Route index element={<Mypage />} />
              </Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </ThemeProvider>
  );
};

export default App;
