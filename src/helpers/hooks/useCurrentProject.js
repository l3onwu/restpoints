import { useState } from "react";
import {
  requestGetProjectData,
  requestDeleteProject,
  requestUpdateProject,
} from "../apiClient/firebase-functions";
import parseEndpoints from "../../services/parse-endpoints";

const useCurrentProject = () => {
  // State
  const [project, setProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endgroups, setEndgroups] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const parsedEndpoints = parseEndpoints(endgroups, endpoints);
  // Functions
  const setup = async () => {
    try {
      setLoading(true);
      const [d1, d2] = await requestGetProjectData(project["id"]);
      setEndgroups(d1);
      setEndpoints(d2);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  const setProjectHandler = (proj) => {
    return () => {
      setProject(proj);
    };
  };
  const updateProjectHandler = (projectsHook) => {
    return async () => {
      try {
        const newName = prompt("Change project name to?");
        if (newName) {
          await requestUpdateProject(project["id"], newName);
          const newProjectObject = { ...project };
          newProjectObject["name"] = newName;
          const cleanObjects = projectsHook["projects"].filter((proj) => {
            return proj["id"] !== project["id"];
          });
          const newProjectArray = [...cleanObjects, newProjectObject];
          newProjectArray.sort((a, b) => {
            return a["rank"] - b["rank"];
          });
          setProject(newProjectObject);
          projectsHook.setProjects(newProjectArray);
        } else {
          throw Error("Please enter a name to change to");
        }
      } catch (err) {
        alert(err);
      }
    };
  };
  const deleteProjectHandler = () => {
    return () => {
      try {
        requestDeleteProject(project["id"]);
        setProject(false);
      } catch (err) {
        alert(err);
      }
    };
  };
  const selectProjectHandler = (projectsHook) => {
    const f = (e) => {
      const projName = e.target.value;
      const projObj = projectsHook["projects"].filter((pr) => {
        return pr.name === projName;
      });
      setProject(projObj[0]);
    };
    return f;
  };

  return {
    project,
    setProject,
    setProjectHandler,
    setup,
    loading,
    endgroups,
    setEndgroups,
    endpoints,
    setEndpoints,
    parsedEndpoints,
    updateProjectHandler,
    deleteProjectHandler,
    selectProjectHandler,
  };
};

export default useCurrentProject;
