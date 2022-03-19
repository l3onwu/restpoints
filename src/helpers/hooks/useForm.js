import { useState } from "react";
import getHighestRank from "../../services/get-highest-rank";
import {
  validateInputs,
  validateJSON,
} from "../../services/validate-endpoint-form";
import {
  requestCreateGroup,
  requestCreateEndpoint,
} from "../../helpers/apiClient/firebase-functions";

const useForm = () => {
  const [group, setGroup] = useState("");
  const [type, setType] = useState("GET");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [inputs, setInputs] = useState("");
  const [outputs, setOutputs] = useState("");
  // Functions
  const formHandler = async (userHook, currentProjectHook) => {
    const highestGroup = getHighestRank(currentProjectHook["endgroups"]);
    const highestEndpoint = getHighestRank(currentProjectHook["endpoints"]);
    try {
      // Validate form
      validateInputs(group, type, address);
      const [validatedInputs, validatedOutputs] =
        inputs || outputs ? validateJSON(inputs, outputs) : [{}, {}];
      // Check if group exists, if not add to db
      // TODO: Convert this to a transaction
      let matchingID;
      if (
        !currentProjectHook.endgroups.filter((gr) => {
          return gr.name === group;
        })[0]
      ) {
        const newGroupObject = {
          name: group,
          projectID: currentProjectHook.project["id"],
          user: userHook.user["email"],
          rank: highestGroup + 1,
        };
        const returnedGroupID = await requestCreateGroup(newGroupObject);
        matchingID = returnedGroupID;
        currentProjectHook.setEndgroups([
          ...currentProjectHook.endgroups,
          { ...newGroupObject, id: returnedGroupID },
        ]);
      } else {
        // If there is a matching group, get its id from local state
        matchingID = currentProjectHook.endgroups.filter((gr) => {
          return gr["name"] === group;
        })[0]["id"];
      }
      // Endpoint data collection and add to db
      const endpointObject = {
        rank: highestEndpoint + 1,
        group,
        groupID: matchingID,
        type,
        address,
        description,
        inputs: validatedInputs,
        outputs: validatedOutputs,
        projectID: currentProjectHook.project["id"],
        user: userHook.user["email"],
      };
      const returnedID = await requestCreateEndpoint(endpointObject);
      currentProjectHook.setEndpoints([
        ...currentProjectHook.endpoints,
        { ...endpointObject, id: returnedID },
      ]);
      // Clear form
      setGroup("");
      setType("GET");
      setAddress("");
      setDescription("");
      setInputs("");
      setOutputs("");
    } catch (err) {
      alert(err);
    }
  };
  return {
    group,
    setGroup,
    type,
    setType,
    address,
    setAddress,
    description,
    setDescription,
    inputs,
    setInputs,
    outputs,
    setOutputs,
    formHandler,
  };
};

export default useForm;
