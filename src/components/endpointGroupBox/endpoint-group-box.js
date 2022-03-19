import { useProjectsProvider } from "../../helpers/context/contextProviders";
import useEditGroup from "../../helpers/hooks/useEditGroup";
import EndpointDisplay from "./endpoint-display";
import EditButtons from "./edit-buttons";
import { Stack, Flex, Box, Text, Input } from "@chakra-ui/react";

const EndpointGroupBox = ({ parsedGroup }) => {
  // State
  const { currentProjectHook } = useProjectsProvider();
  const editGroupHook = useEditGroup(parsedGroup, currentProjectHook);
  // JSX
  return (
    <Box
      maxHeight="calc(100vh - 45px - 20px - 15px)"
      height="min-content"
      width="500px"
      overflow="scroll"
      key={parsedGroup.name}
      bgColor="white"
      boxShadow="lg"
      py={7}
      px={10}
      borderWidth="1px"
      borderRadius="10px"
    >
      {/* Meta */}
      <Flex direction="row" align="baseline" justify="space-between" mb="25px">
        {!editGroupHook.isEditing && (
          <Text fontWeight="bold" fontSize="18px">
            {parsedGroup.name}
          </Text>
        )}
        {editGroupHook.isEditing && (
          <Input
            value={editGroupHook.groupName["value"]}
            onChange={editGroupHook.groupName.onChange}
          />
        )}
        <EditButtons
          isEditing={editGroupHook.isEditing}
          editHandler={editGroupHook.editGroupHandler}
          deleteHandler={editGroupHook.deleteGroupHandler}
        />
      </Flex>
      {/* Endpoints */}
      <Stack direction="column" spacing={5}>
        {parsedGroup.endpoints.map((parsedEndpoint) => {
          return (
            <EndpointDisplay
              key={parsedEndpoint["id"]}
              parsedEndpoint={parsedEndpoint}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default EndpointGroupBox;
