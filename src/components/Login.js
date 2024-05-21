import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const kakaoLogin = () => {
    const Rest_api_key = "09e314de2cda3c6e13afce019b8b1c8c"; //REST API KEY
    const redirect_uri = "http://localhost:3000/auth/kakao/redirect"; //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post("http://localhost:4000/api/auth/google", {
        code: codeResponse.code,
      });

      console.log(tokens);
      localStorage.setItem("accessToken", tokens.data.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="App">
      hello world
      <button onClick={googleLogin}>Google Button</button>
      <button onClick={kakaoLogin}>카카오 로그인</button>
    </div>
  );
};

export default Login;
