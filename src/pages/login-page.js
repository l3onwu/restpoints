import { Box, Stack, Flex, Text, Button } from "@chakra-ui/react";
import { useUserProvider } from "../helpers/context/contextProviders";

const LoginPage = () => {
  // State
  const { userHook } = useUserProvider();
  // JSX
  return (
    <Box bgColor="gray.800" width="100vw" height="100vh">
      <Flex width="100%" height="100%" pt="calc(100vh * 0.3)" justify="center">
        <Stack direction="column" spacing="30px" color="white">
          <Stack spacing="10px">
            <Text fontSize="30px" fontWeight="bold">
              RESTpoints
            </Text>
            <Text fontStyle="italic" color="gray.500">
              GET /restpoints/dashboard
            </Text>
          </Stack>
          <Button
            borderRadius="0px"
            colorScheme="orange"
            onClick={userHook.loginHandler}
          >
            Login with Google
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default LoginPage;
