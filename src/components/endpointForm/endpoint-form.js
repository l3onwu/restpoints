import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Textarea,
  Text,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import FormMessage from "./form-message";
import { useUserProvider } from "../../helpers/context/contextProviders";
import { useProjectsProvider } from "../../helpers/context/contextProviders";
import useForm from "../../helpers/hooks/useForm";

const EndpointForm = ({ hiddenForm, setHiddenForm }) => {
  // State
  const { userHook } = useUserProvider();
  const { currentProjectHook } = useProjectsProvider();
  const form = useForm();

  // Functions
  const dataHandler = (callback) => {
    const func = (e) => {
      callback(e.target.value);
    };
    return func;
  };

  // JSX
  return (
    <>
      {!hiddenForm && (
        <Stack
          pt="40px"
          pb="50px"
          px="40px"
          width="300px"
          direction="column"
          bgColor="white"
          spacing={5}
          fontSize="sm"
        >
          {/* Group */}
          <Box>
            <InputGroup size="sm" mb="2px">
              <InputLeftAddon children="Group" />
              <Input
                value={form["group"]}
                onChange={dataHandler(form.setGroup)}
                placeholder="Users"
              />
            </InputGroup>
            <FormMessage />
          </Box>
          {/* Type */}
          <Box>
            <InputGroup size="sm">
              <InputLeftAddon children="Type" />
              <Select
                value={form["type"]}
                onChange={dataHandler(form.setType)}
                default="GET"
              >
                {["GET", "POST", "UPDATE", "DELETE"].map((code) => {
                  return <option key={code}>{code}</option>;
                })}
              </Select>
            </InputGroup>
            <FormMessage />
          </Box>
          {/* Address */}
          <Box>
            <InputGroup size="sm">
              <InputLeftAddon children="Address" />
              <Input
                value={form["address"]}
                onChange={dataHandler(form.setAddress)}
                placeholder="/api/users/get/:id"
              />
            </InputGroup>
            <FormMessage />
          </Box>
          {/* Description */}
          <Box>
            <Text>Description</Text>
            <Textarea
              resize="none"
              color="gray"
              size="sm"
              value={form["description"]}
              onChange={dataHandler(form.setDescription)}
            />
          </Box>
          {/* Inputs */}
          <Box>
            <Text>Inputs</Text>
            <Textarea
              resize="none"
              color="gray"
              size="sm"
              value={form["inputs"]}
              onChange={dataHandler(form.setInputs)}
            />
          </Box>
          {/* Outputs */}
          <Box>
            <Text>Ouputs</Text>
            <Textarea
              resize="none"
              color="gray"
              size="sm"
              value={form["outputs"]}
              onChange={dataHandler(form.setOutputs)}
            />
          </Box>
          <Button
            onClick={() => {
              form.formHandler(userHook, currentProjectHook);
            }}
            borderRadius={0}
            colorScheme="orange"
          >
            Add Endpoint
          </Button>
          <IconButton
            variant="ghost"
            icon={<HamburgerIcon />}
            onClick={() => {
              setHiddenForm(!hiddenForm);
            }}
          />
        </Stack>
      )}
      {hiddenForm && (
        <Box
          as="button"
          height="100%"
          width="40px"
          bgColor="gray.800"
          onClick={() => {
            setHiddenForm(!hiddenForm);
          }}
        ></Box>
      )}
    </>
  );
};

export default EndpointForm;
