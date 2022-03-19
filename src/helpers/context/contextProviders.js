import { UserContext, ProjectsContext } from "./contextList";
import { useContext } from "react";

export const useUserProvider = () => {
  return useContext(UserContext);
};

export const useProjectsProvider = () => {
  return useContext(ProjectsContext);
};
