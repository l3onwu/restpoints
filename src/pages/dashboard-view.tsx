import { useEffect } from "react";
import {
  useUserProvider,
  useProjectsProvider,
} from "../helpers/context/contextProviders";
import { Box, Flex, Text, Button, Stack, Spinner } from "@chakra-ui/react";
import NewProjectTile from "../components/new-project-tile";
import ProjectTile from "../components/project-tile";

const DashboardView = () => {
  // State
  const { userHook } = useUserProvider();
  const { projectsHook, currentProjectHook } = useProjectsProvider();
  // Setup
  useEffect(() => {
    projectsHook.setup(userHook);
  }, []);
  return (
    <Flex
      direction="column"
      px="100px"
      color="white"
      width="100%"
      height="100%"
      pt="70px"
    >
      <Box mb="20px">
        {/* Metadata */}
        <Text fontSize="30px" fontWeight="bold">
          RESTpoints
        </Text>
        <Text mb="20px" fontStyle="italic" color="gray.500">
          GET /restpoints/dashboard
        </Text>

        <Stack direction="row" align="baseline">
          <Text fontStyle="italic" mb="10px">
            {userHook.user["email"]}
          </Text>
          <Button
            color="orange"
            variant="unstyled"
            borderRadius="0px"
            size="sm"
            onClick={() => {
              userHook.logoutHandler();
            }}
          >
            Logout
          </Button>
        </Stack>
      </Box>
      {/* Projects panel */}
      <Box>
        <Box mb="20px">
          <Text fontSize="50px">Your Projects</Text>
        </Box>
        {projectsHook.loading && <Spinner />}
        {!projectsHook.loading && (
          <Flex flexDir="row" width="100%" wrap="wrap" mr="10px" gap="40px">
            <NewProjectTile />
            {projectsHook.projects.map((proj) => {
              return (
                <ProjectTile
                  key={proj["id"]}
                  setProjectHandler={currentProjectHook.setProjectHandler}
                  proj={proj}
                />
              );
            })}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default DashboardView;
