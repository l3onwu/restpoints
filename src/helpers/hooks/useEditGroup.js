import { useState } from "react";
import { useField } from "./useField";
import {
  requestDeleteGroup,
  requestProjectOrder,
  requestUpdateGroup,
} from "../../helpers/apiClient/firebase-functions";

const useEditGroup = (parsedGroup, currentProjectHook) => {
  // State
  const [isEditing, setIsEditing] = useState(false);
  const groupName = useField(parsedGroup["name"]);

  // Functions
  const editGroupHandler = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        if (!groupName["value"]) {
          throw Error("Please enter a valid group name");
        }
        await requestUpdateGroup(parsedGroup["id"], {
          name: groupName["value"],
        });
        const cleanGroups = currentProjectHook.endgroups.filter((eg) => {
          return eg["id"] !== parsedGroup["id"];
        });
        const newGroup = { ...parsedGroup };
        newGroup["name"] = groupName["value"];
        currentProjectHook.setEndgroups([...cleanGroups, newGroup]);
        setIsEditing(false);
      } catch (err) {
        alert(err);
      }
    }
  };
  const deleteGroupHandler = async () => {
    try {
      // Delete group deletes from project order db
      const newOrder = currentProjectHook.groupOrder.filter((gr) => {
        return gr !== parsedGroup["id"];
      });
      await requestProjectOrder(currentProjectHook.project["id"], newOrder);

      // Delete from order locally
      currentProjectHook.setGroupOrder(newOrder);

      // Delete from db
      await requestDeleteGroup(parsedGroup["id"]);

      // Delete locally
      const cleanEndgroups = currentProjectHook.endgroups.filter((eg) => {
        return eg["id"] !== parsedGroup["id"];
      });
      currentProjectHook.setEndgroups(cleanEndgroups);

      const cleanEndpoints = currentProjectHook.endpoints.filter((ep) => {
        return ep["groupID"] !== parsedGroup["id"];
      });
      currentProjectHook.setEndpoints(cleanEndpoints);

      //
    } catch (err) {
      alert(err);
    }
  };
  return {
    isEditing,
    groupName,
    setIsEditing,
    editGroupHandler,
    deleteGroupHandler,
  };
};

export default useEditGroup;
