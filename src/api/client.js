import axios from "axios";
// 쿠키 관련
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const client = axios.create({
  baseURL: "API 주소", // 선택사항 1 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

//request 처리
axios.interceptors.request.use(
  config => {
    // localStorage 를 활용한 경우
    // const user = JSON.parse(localStorage.getItem("token") || "");
    // if (user?.token) {
    //   config.headers.Authorization = `Bearer ${user.token}`;
    // }
    // return config;

    // cookie 를 활용하는 경우
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => console.log(error),
);

// 쿠키 set 하기
export const fetchLogin = async (id, pass) => {
  try {
    const res = client.post("/login", { id, pass });
    //res.data ==========>>>>>> {token:"토큰문자열", .....}
    const result = await res.data;
    cookies.set("token", result.token, {
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// logout 시 쿠키 지우기
export const fetchLogout = () => {
  cookies.remove("token");
};

// 선택사항 1 기본 URL 설정
// client.defaults.baseURL = "API 주소";
// 선택사항
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 선택사항 2 JWT 관련
// 토큰 값의 경우는 일반적으로 쿠키에 보관해서 읽어오거나 업데이트 한다.
// const token = "토큰값";
// client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// 외부로 axios 호출(post, get, put, delete, patch)
// 인터셉터 설정
