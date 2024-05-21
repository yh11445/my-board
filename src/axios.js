import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // API의 기본 URL 설정
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
