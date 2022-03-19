import { Flex, Text } from "@chakra-ui/react";
import {
  useUserProvider,
  useProjectsProvider,
} from "../helpers/context/contextProviders";

const NewProjectTile = () => {
  const { userHook } = useUserProvider();
  const { projectsHook } = useProjectsProvider();

  return (
    <Flex
      as="button"
      onClick={projectsHook.newProjectHandler(userHook)}
      _hover={{
        bgColor: "gray.400",
        color: "black",
        cursor: "pointer",
      }}
      height="150px"
      width="150px"
      borderColor="gray.400"
      borderWidth="2px"
      color="gray.400"
      fontFamily="mono"
      fontWeight="bold"
      justify="center"
      align="center"
    >
      <Text>+ New Project</Text>
    </Flex>
  );
};

export default NewProjectTile;
