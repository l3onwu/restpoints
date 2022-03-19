import { Box, Stack, Textarea, Text } from "@chakra-ui/react";

const DisplayInputs = ({ objectValues, isEditing, label }) => {
  return (
    <>
      {Object.keys(objectValues["value"]) && (
        <>
          {isEditing && (
            <>
              <Text mb={2} fontWeight="bold" color="gray.500">
                {label}
              </Text>
              <Textarea
                resize="none"
                size="sm"
                color="gray.500"
                borderColor="gray.300"
                value={objectValues["stringified"]}
                onChange={objectValues.onChange}
              />
            </>
          )}
          {!isEditing && Object.keys(objectValues["value"])[0] && (
            <Box>
              <Text fontWeight="bold" mb="8px">
                {label}
              </Text>
              <Stack
                bgColor="gray.700"
                color="white"
                fontSize="12px"
                borderRadius={5}
                p={3}
                fontFamily="mono"
                direction="column"
              >
                <Text>&#123;</Text>
                {Object.keys(objectValues["value"]).map((keyName, i) => {
                  return (
                    <Text key={i} pl={3}>
                      <Box as="span" color="red.400">
                        {keyName}:
                      </Box>{" "}
                      <Box as="span" color="yellow.400">
                        {objectValues["value"][keyName]}
                      </Box>{" "}
                    </Text>
                  );
                })}
                <Text>&#125; </Text>
              </Stack>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default DisplayInputs;
