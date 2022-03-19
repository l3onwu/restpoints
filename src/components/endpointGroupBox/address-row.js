import { Box, Select, Flex, Input } from "@chakra-ui/react";
import EditButtons from "./edit-buttons";

const AddressRow = ({
  isEditing,
  editHandler,
  deleteHandler,
  type,
  address,
}) => {
  return (
    <Flex align="center" justify="space-between">
      {/* Address bar */}
      <Flex
        borderWidth="1px"
        borderColor="white"
        bgColor="white"
        overflow="hidden"
        align="center"
        height="33px"
        width="100%"
      >
        {/* TYPE select */}
        <Select
          bgColor={
            type.value === "GET"
              ? "teal"
              : type.value === "POST"
              ? "messenger.500"
              : type.value === "UPDATE"
              ? "purple.500"
              : "#cf2b41"
          }
          onChange={type.onChange}
          _disabled={{
            opacity: "1",
          }}
          disabled={isEditing ? false : true}
          color="white"
          fontWeight="bold"
          fontSize="12px"
          width="150px"
          size="sm"
          height="50px"
          m={0}
          borderRadius={0}
          borderWidth={0}
          defaultValue={type.value}
        >
          {["GET", "POST", "UPDATE", "DELETE"].map((code) => {
            return <option key={code}>{code}</option>;
          })}
        </Select>
        {/* Address url */}
        <Box px={3} width="100%" color="blackAlpha.600">
          <Input
            defaultValue={address.value}
            onChange={address.onChange}
            focusBorderColor="transparent"
            isReadOnly={isEditing ? false : true}
            borderWidth={0}
            m={0}
            p={0}
            fontSize="15px"
            height="100%"
          ></Input>
        </Box>
      </Flex>
      {/* Edit buttons */}
      <EditButtons
        isEditing={isEditing}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Flex>
  );
};

export default AddressRow;
