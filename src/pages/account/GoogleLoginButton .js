import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const clientId =
    "600594856412-lh2dai2bpm509vkagk9h786m745tmm7u.apps.googleusercontent.com";
  const navi = useNavigate({});
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            // 해당 부분은 후에 들어오는 토큰에 대해서 디코딩 하는 부분이다.
            const decodeding = jwtDecode(credentialResponse.credential);
            console.log(decodeding);
            console.log(decodeding.email);
            axios({
              url: `/user/signGoogle.sam`,
              method: "post",
              data: { userEmail: decodeding.email },
            })
              .then((res) => {
                if (res.data == 1) {
                  navi("/auth/googlesignup", { state: decodeding.email });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        {/* <GoogleLogout
          clientId={clientId}
          buttonText="로그아웃"
          onLogoutSuccess={logout}
        /> */}
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;
