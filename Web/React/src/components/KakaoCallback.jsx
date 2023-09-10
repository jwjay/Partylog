import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSaveUserNo } from "../actions/actions";

const KakaoCallback = () => {
  const dispatch = useDispatch();
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    kakaoLogin(code);
  });

  const kakaoLogin = (code) => {
    axios
      .get(`${SERVER_API_URL}/user/login?code=${code}`)
      .then((res) => {
        const userNo = res.data.data;

        // userNo를 비교용으로 사용하기 위해 리덕스 저장
        dispatch(loginSaveUserNo(userNo));

        if (res.data.code === "201") {
          // 생일입력 페이지로 이동
          navigate(`/birthdayinput/${userNo}`);
        } else if (res.data.code === "200") {
          localStorage.setItem(
            "access-token",
            res.headers.get("authorization")
          );
          localStorage.setItem(
            "refresh-token",
            res.headers.get("refresh-token")
          );
          navigate(`/user/${userNo}`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <p>로그인 중 입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};
export default KakaoCallback;
