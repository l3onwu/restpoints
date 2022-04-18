import { useProjectsProvider } from "../../helpers/context/contextProviders";
import useEditGroup from "../../helpers/hooks/useEditGroup";
import EndpointDisplay from "./endpoint-display";
import EditButtons from "./edit-buttons";
import { Stack, Flex, Box, Text, Input } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EndpointGroupBox = ({ parsedGroup, index }) => {
  // State
  const { currentProjectHook } = useProjectsProvider();
  const editGroupHook = useEditGroup(parsedGroup, currentProjectHook);

  // JSX
  return (
    <Draggable draggableId={parsedGroup["name"]} index={index}>
      {(provided) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            width="500px"
            key={parsedGroup.name}
            px={5}
          >
            <Box
              py={7}
              px={10}
              bgColor="white"
              boxShadow="lg"
              borderWidth="1px"
              borderRadius="10px"
              overflow="auto"
              maxHeight="calc(100vh - 45px - 20px - 15px)"
              height="min-content"
            >
              {/* Meta */}
              <Flex
                {...provided.dragHandleProps}
                direction="row"
                align="baseline"
                justify="space-between"
                mb="25px"
              >
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
              <DragDropContext onDragEnd={currentProjectHook.onDragEndPoints}>
                <Droppable droppableId={String(index)}>
                  {(provided) => {
                    return (
                      <Stack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        direction="column"
                        spacing="0px"
                      >
                        {currentProjectHook.pointOrder[parsedGroup["id"]]?.map(
                          (pointID, index) => {
                            return (
                              <EndpointDisplay
                                key={pointID}
                                index={index}
                                parsedEndpoint={
                                  parsedGroup["endpoints"][pointID]
                                }
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
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default EndpointGroupBox;
