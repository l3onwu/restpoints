import { Flex, Box, Text } from "@chakra-ui/react";

const ProjectTile = ({ setProjectHandler, proj }) => {
  return (
    <Flex
      _hover={{ bgColor: "yellow", color: "black", cursor: "pointer" }}
      bgColor="transparent"
      color="yellow"
      borderColor="yellow"
      borderWidth="1px"
      width="150px"
      height="150px"
      p="10px"
      justify="center"
      align="center"
      onClick={setProjectHandler(proj)}
      overflow="hidden"
    >
      <Box width="150px" textAlign="center">
        <Text fontWeight="bold" fontFamily="mono">
          {proj.name}
        </Text>
      </Box>
    </Flex>
  );
};
export default ProjectTile;
