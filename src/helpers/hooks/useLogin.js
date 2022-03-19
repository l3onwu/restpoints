import { useState } from "react";
import { loginFirebase, logoutFirebase } from "../apiClient/firebase-functions";

const useLogin = () => {
  const [user, setUser] = useState(false);
  const setup = () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  };
  const loginHandler = async () => {
    try {
      const profile = await loginFirebase();
      localStorage.setItem("user", JSON.stringify(profile));
      setUser(profile);
    } catch (err) {
      alert(err);
    }
  };
  const logoutHandler = async () => {
    try {
      await logoutFirebase;
      localStorage.clear();
      setUser(false);
    } catch (err) {
      alert(err);
    }
  };

  return { user, setup, loginHandler, logoutHandler };
};

export default useLogin;
