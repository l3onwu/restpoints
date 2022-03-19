import { useState } from "react";
import {
  requestCreateProject,
  requestGetUserProjects,
} from "../../helpers/apiClient/firebase-functions";
import getHighestRank from "../../services/get-highest-rank";

const useProjects = () => {
  // State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const highestProject = getHighestRank(projects);
  // Functions
  const setup = async (userHook) => {
    try {
      setLoading(true);
      const projectObjects = await requestGetUserProjects(
        userHook.user["email"]
      );
      projectObjects.sort((a, b) => {
        return a.rank - b.rank;
      });
      setProjects(projectObjects);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  const newProjectHandler = (userHook) => {
    const f = async () => {
      let projectName = prompt("Name of project?");
      if (projectName) {
        try {
          const projectObject = {
            name: projectName,
            email: userHook.user["email"],
            rank: highestProject + 1,
          };
          const returnedID = await requestCreateProject(projectObject);
          setProjects([...projects, { ...projectObject, id: returnedID }]);
        } catch (err) {
          alert(err);
        }
      }
    };
    return f;
  };
  return { projects, setProjects, loading, setup, newProjectHandler };
};

export default useProjects;
