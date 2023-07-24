import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  // const { kakaoProfile, dispatch } = useAuthContext();
  // console.log(kakaoProfile);

  // useEffect(() => {
  //   console.log("kakao 사용자 정보", kakaoProfile);
  //   if (!kakaoProfile) {
  //     kakaoLogOut();
  //   }
  // }, [kakaoProfile]);

  // 카카오 로그아웃
  // const kakaoLogOut = () => {
  //   if (!window.Kakao.Auth.getAccessToken()) {
  //     console.log("Not logged in.");
  //     return;
  //   }
  //   window.Kakao.Auth.logout(function (response) {
  //     dispatch({ type: "kakaoLogout" });
  //     // alert(response + " logout");
  //     // window.location.href='/'
  //     navigate("/");
  //   });
  // };
  // // 카카오 회원탈퇴
  // const memberOut = () => {
  //   window.Kakao.API.request({
  //     url: "/v1/user/unlink",
  //     success: function (response) {
  //       console.log(response);
  //       //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
  //       // window.location.href='/'
  //       dispatch({ type: "kakaoOut" });
  //       navigate("/");
  //     },
  //     fail: function (error) {
  //       console.log("탈퇴 미완료");
  //       console.log(error);
  //     },
  //   });
  // };
  return (
    <>
      <div className="p-6 mt-5 shadow rounded bg-slate-200">About</div>
    </>
  );
};

export default About;
