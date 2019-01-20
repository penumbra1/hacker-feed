import React from "react";

export const AuthContext = React.createContext({
  username: null,
  userId: null
});
export const AUTH_TOKEN = "auth-token";
