import { Stack, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const EditButtons = ({ isEditing, editHandler, deleteHandler }) => {
  return (
    <Stack direction="row" ml={2} spacing={1}>
      <IconButton
        icon={<EditIcon />}
        color={isEditing ? "gray" : "black"}
        onClick={editHandler}
        size="xs"
      ></IconButton>
      <IconButton
        icon={<DeleteIcon />}
        onClick={deleteHandler}
        size="xs"
      ></IconButton>
    </Stack>
  );
};

export default EditButtons;
