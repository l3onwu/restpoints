import { useProjectsProvider } from "../../helpers/context/contextProviders";
import { Flex, Stack, Text, Select, Button } from "@chakra-ui/react";

const Topnav = () => {
  // State
  const { projectsHook, currentProjectHook } = useProjectsProvider();
  // JSX
  return (
    <Flex
      bgColor="gray.800"
      boxShadow="lg"
      opacity="0.9"
      height="45px"
      width="100%"
      p={5}
      align="center"
      color="white"
      justify="space-between"
    >
      <Stack direction="row" align="baseline" spacing="20px">
        <Text
          fontSize="20px"
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            currentProjectHook.setProject(false);
          }}
        >
          RESTpoints
        </Text>
        <Flex
          borderRadius="10px"
          borderWidth="1px"
          borderColor="gray.600"
          height="35px"
          width="200px"
          p="10px"
          justify="center"
          align="center"
        >
          <Select
            _hover={{ cursor: "pointer" }}
            variant="unstyled"
            color="gray"
            fontFamily="mono"
            fontWeight="bold"
            defaultValue={currentProjectHook["project"]["name"]}
            onChange={currentProjectHook.selectProjectHandler(projectsHook)}
          >
            {projectsHook["projects"].map((proj) => {
              return <option key={proj["id"]}>{proj["name"]}</option>;
            })}
          </Select>
        </Flex>
      </Stack>
      <Stack direction="row">
        <Button
          variant="unstyled"
          onClick={currentProjectHook.updateProjectHandler(projectsHook)}
        >
          Edit
        </Button>
        <Button
          onClick={currentProjectHook.deleteProjectHandler()}
          variant="unstyled"
        >
          Delete
        </Button>
      </Stack>
    </Flex>
  );
};

export default Topnav;
