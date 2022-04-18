import { useState } from "react";
import {
  validateInputs,
  validateJSON,
} from "../../services/validate-endpoint-form";
import {
  requestCreateGroup,
  requestCreateEndpoint,
  requestProjectOrder,
  requestGroupOrder,
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
    try {
      // Validate form
      validateInputs(group, type, address);
      const [validatedInputs, validatedOutputs] =
        inputs || outputs ? validateJSON(inputs, outputs) : [{}, {}];

      // x. Check if group exists, if not add to db
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
          order: [],
        };
        // add local
        const returnedGroupID = await requestCreateGroup(newGroupObject);
        matchingID = returnedGroupID;
        currentProjectHook.setEndgroups([
          ...currentProjectHook.endgroups,
          { ...newGroupObject, id: returnedGroupID },
        ]);

        // append to project's group order
        const newGroupOrder =
          currentProjectHook["groupOrder"].concat(matchingID);
        await requestProjectOrder(
          currentProjectHook.project["id"],
          newGroupOrder
        );

        // append local
        currentProjectHook.setGroupOrder(newGroupOrder);
      } else {
        // If there is a matching group, get its id from local state
        matchingID = currentProjectHook.endgroups.filter((gr) => {
          return gr["name"] === group;
        })[0]["id"];
      }
      // x. Endpoint data collection and add to db
      const endpointObject = {
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

      // x. Append new endpoint's ID to group order
      const newOrder = currentProjectHook["pointOrder"][matchingID]
        ? currentProjectHook["pointOrder"][matchingID].concat(returnedID)
        : [returnedID];

      // Update order in db
      await requestGroupOrder(matchingID, newOrder);

      // Update order locally
      const oldPointOrder = currentProjectHook.pointOrder;
      oldPointOrder[matchingID] = newOrder;
      currentProjectHook.setPointOrder(oldPointOrder);

      // Add endpoint data locally
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
