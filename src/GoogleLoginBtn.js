import { memo } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleLoginSuccessHandler } from "@react-oauth/google";

export const GoogleLoginBtn = memo(() => {
  const googleLoginOnSuccess = useGoogleLoginSuccessHandler();

  const loginButtonOnClick = useGoogleLogin({
    onSuccess: async (response) => {
      await googleLoginOnSuccess(response.access_token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <button onClick={() => loginButtonOnClick()}>
      <img src="https://www.svgrepo.com/show/355037/google.svg" />
      <span>Continue with Google</span>
    </button>
  );
});
