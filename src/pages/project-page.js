import { useState, useEffect } from "react";
import { useProjectsProvider } from "../helpers/context/contextProviders";
import { Box, Stack, Spinner } from "@chakra-ui/react";
import Topnav from "../components/topnav/topnav";
import EndpointForm from "../components/endpointForm/endpoint-form";
import EndpointGroupBox from "../components/endpointGroupBox/endpoint-group-box";

const ProjectPage = () => {
  // State
  const { currentProjectHook } = useProjectsProvider();
  const [hiddenForm, setHiddenForm] = useState(false);
  // Setup
  useEffect(() => {
    currentProjectHook.setup();
  }, [currentProjectHook.project]);
  // JSX
  return (
    <Box bgColor="gray.600" width="100vw" height="100vh">
      {/* Topnav */}
      <Topnav />
      {/* Body */}
      <Stack direction="row" spacing={0} minWidth="100%" overflow="scroll">
        {/* Left Form */}
        <Box
          position="absolute"
          zIndex="1"
          bgColor="white"
          boxShadow="md"
          overflow="scroll"
          height="calc(100vh - 45px)"
        >
          <EndpointForm hiddenForm={hiddenForm} setHiddenForm={setHiddenForm} />
        </Box>
        {/* Right Display */}
        <Stack
          direction="row"
          height="calc(100vh - 45px)"
          pl={hiddenForm ? "100px" : "340px"}
          pt="20px"
          pr="100px"
          spacing="30px"
        >
          {currentProjectHook["loading"] && <Spinner mt="20px" ml="50px" />}
          {!currentProjectHook["loading"] &&
            currentProjectHook.parsedEndpoints.map((parsedGroup) => {
              return (
                <EndpointGroupBox
                  key={parsedGroup["id"]}
                  parsedGroup={parsedGroup}
                />
              );
            })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectPage;
