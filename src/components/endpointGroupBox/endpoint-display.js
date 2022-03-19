import { useState } from "react";
import { useProjectsProvider } from "../../helpers/context/contextProviders";
import { Stack } from "@chakra-ui/react";
import AddressRow from "./address-row";
import DisplayInputs from "./display-inputs";
import DisplayDescription from "./display-description";
import { useField, useJSONField } from "../../helpers/hooks/useField";
import {
  requestDeleteEndpoint,
  requestUpdateEndpoint,
} from "../../helpers/apiClient/firebase-functions";

const EndpointDisplay = ({ parsedEndpoint }) => {
  // State
  const [isEditing, setIsEditing] = useState(false);
  const address = useField(parsedEndpoint.address);
  const description = useField(parsedEndpoint.description);
  const type = useField(parsedEndpoint.type);
  const inputs = useJSONField(parsedEndpoint.inputs);
  const outputs = useJSONField(parsedEndpoint.outputs);
  const { currentProjectHook } = useProjectsProvider();
  // Functions
  const editingHandler = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        inputs.onSave();
        outputs.onSave();
        const updateObject = { ...parsedEndpoint };
        updateObject["address"] = address["value"];
        updateObject["description"] = description["value"];
        updateObject["type"] = type["value"];
        updateObject["inputs"] = JSON.parse(inputs["stringified"]);
        updateObject["outputs"] = JSON.parse(outputs["stringified"]);
        await requestUpdateEndpoint(parsedEndpoint["id"], updateObject);
        const cleanEndpoints = currentProjectHook.endpoints.filter((ep) => {
          return ep["id"] !== parsedEndpoint["id"];
        });
        currentProjectHook.setEndpoints([
          ...cleanEndpoints,
          { ...updateObject, id: parsedEndpoint["id"] },
        ]);
        setIsEditing(!isEditing);
      } catch (err) {
        alert(err);
      }
    }
  };
  const deleteHandler = async () => {
    try {
      await requestDeleteEndpoint(parsedEndpoint.id);
      const cleanEndpoints = currentProjectHook.endpoints.filter((ep) => {
        return ep["id"] !== parsedEndpoint["id"];
      });
      currentProjectHook.setEndpoints(cleanEndpoints);
    } catch (err) {
      alert(err);
    }
  };
  // JSX
  return (
    <Stack
      bgColor="gray.100"
      p={5}
      borderRadius={5}
      borderWidth="1px"
      direction="column"
      spacing={5}
      fontSize="sm"
    >
      {/* HTTP address row */}
      <AddressRow
        isEditing={isEditing}
        editHandler={editingHandler}
        deleteHandler={deleteHandler}
        address={address}
        type={type}
      />
      {/* Description */}
      <DisplayDescription description={description} isEditing={isEditing} />
      {/* Inputs */}
      <DisplayInputs
        objectValues={inputs}
        isEditing={isEditing}
        label="Inputs"
      />
      {/* Outputs */}
      <DisplayInputs
        objectValues={outputs}
        isEditing={isEditing}
        label="Outputs"
      />
    </Stack>
  );
};

export default EndpointDisplay;