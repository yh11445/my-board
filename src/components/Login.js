import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post("http://localhost:4000/api/auth/google", {
        code: codeResponse.code,
      });

      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const googleSocialLogin = useGoogleLogin({
    // scope: "email profile",
    onSuccess: async ({ code }) => {
      console.log(code);
      axios
        .post("http://localhost:4000/api/auth/google", { code })
        .then(({ data }) => {
          console.log(data);
        });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });
  return (
    <div className="App">
      hello world
      <button onClick={googleLogin}>Google Button</button>
    </div>
  );
};

export default Login;
