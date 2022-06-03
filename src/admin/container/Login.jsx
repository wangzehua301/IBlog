import React from "react";
import { Guard } from "@authing/react-ui-components";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
  //对应应用的id
  const appId = "62510c7b94e095bc30cf1ce1";
  const onLogin = userInfo => {
      window.localStorage.token = userInfo.token
      window.localStorage.tokenExpiredAt = userInfo.tokenExpiredAt
      window.localStorage.photo = userInfo.photo
      window.location.reload()
    // console.log(userInfo);
  };
  return <Guard appId={appId} onLogin={onLogin} />;
};

export default Login;