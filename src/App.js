import { useEffect } from "react";
import useLogin from "./helpers/hooks/useLogin";
import { Box } from "@chakra-ui/react";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import { UserContext } from "./helpers/context/contextList";

const App = () => {
  // State
  const userHook = useLogin();
  // Setup
  useEffect(() => {
    userHook.setup();
  }, []);
  // JSX
  return (
    <UserContext.Provider value={{ userHook }}>
      <Box>
        {!userHook.user && <LoginPage />}
        {userHook.user && <DashboardPage />}
      </Box>
    </UserContext.Provider>
  );
};

export default App;
