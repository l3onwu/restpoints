import { Box, Text, Textarea } from "@chakra-ui/react";

const DisplayDescription = ({ description, isEditing }) => {
  return (
    <>
      {!isEditing && description.value && (
        <Box>
          <Text fontWeight="bold" mb="5px">
            Description{" "}
          </Text>
          <Text>{description.value}</Text>
        </Box>
      )}
      {isEditing && (
        <Box>
          <Text fontWeight="bold" mb="5px" color="gray.500">
            Description{" "}
          </Text>
          <Textarea
            value={description.value}
            onChange={description.onChange}
            resize="none"
            size="sm"
            fontSize="sm"
            color="gray.500"
            borderRadius="0px"
            borderColor="gray.300"
          />
        </Box>
      )}
    </>
  );
};

export default DisplayDescription;
