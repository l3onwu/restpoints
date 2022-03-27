import { useState, useEffect } from "react";
import { useProjectsProvider } from "../helpers/context/contextProviders";
import { Box, Stack, Spinner } from "@chakra-ui/react";
import Topnav from "../components/topnav/topnav";
import EndpointForm from "../components/endpointForm/endpoint-form";
import EndpointGroupBox from "../components/endpointGroupBox/endpoint-group-box";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
        <DragDropContext onDragEnd={currentProjectHook.onDragEndGroups}>
          <Droppable direction="horizontal" droppableId="1">
            {(provided) => {
              return (
                <Stack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  direction="row"
                  height="calc(100vh - 45px)"
                  pl={hiddenForm ? "100px" : "340px"}
                  pt="20px"
                  pr="100px"
                  spacing="0px"
                >
                  {currentProjectHook["loading"] && (
                    <Spinner mt="20px" ml="50px" />
                  )}
                  {!currentProjectHook["loading"] &&
                    currentProjectHook.parsedEndpoints.map(
                      (parsedGroup, index) => {
                        return (
                          <EndpointGroupBox
                            key={parsedGroup["id"]}
                            index={index}
                            parsedGroup={parsedGroup}
                          />
                        );
                      }
                    )}
                  {provided.placeholder}
                </Stack>
              );
            }}
          </Droppable>
        </DragDropContext>
      </Stack>
    </Box>
  );
};

export default ProjectPage;
