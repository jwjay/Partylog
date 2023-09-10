import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import KakaoRedirectHandler from "./components/KakaoCallback";
import BirthdayInput from "./pages/BirthdayInput";
import UserPage from "./pages/UserPage";
import ProfileSetting from "./pages/ProfileSetting";
import MyFriend from "./pages/MyFriend";
import NotFound404 from "./pages/NotFound404";
import LivePage from "./pages/LivePage";
import PrivateRoute from "./components/Route/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/auth" element={<KakaoRedirectHandler />} />
        <Route path="/birthdayinput/:userNo" element={<BirthdayInput />} />
        {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute />}>
          <Route path="/user/:userNo" element={<UserPage />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/myfriend/:userNum" element={<MyFriend />} />
          {/* <Route path="/livecheck/:userNo" element */}
          <Route path="/live/:userNo" element={<LivePage />} />
        </Route>
        {/* 일단 이상한 페이지로 이동하면 404NotFound로 이동 */}
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}
export default App;
