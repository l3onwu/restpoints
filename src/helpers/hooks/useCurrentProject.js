import { useState } from "react";
import {
  requestGetProjectData,
  requestDeleteProject,
  requestUpdateProject,
  requestSwapGroupRank,
  requestSwapPointsRank,
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
      d1.sort((a, b) => {
        return a["rank"] - b["rank"];
      });
      d2.sort((a, b) => {
        return a["rank"] - b["rank"];
      });
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
  const onDragEndGroups = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Swap ranks
    const sourceGroup = { ...endgroups[source.index] };
    const destinationGroup = { ...endgroups[destination.index] };
    const temp = sourceGroup["rank"];
    sourceGroup["rank"] = destinationGroup["rank"];
    destinationGroup["rank"] = temp;
    const newGroupArray = endgroups.filter((gr, index) => {
      return index !== source.index;
    });
    newGroupArray.splice(destination.index, 0, sourceGroup);
    setEndgroups(newGroupArray);
    // requestSwapGroupRank(sourceGroup, destinationGroup).catch((err) =>
    //   alert(err)
    // );
  };
  const onDragEndPoints = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourcePoint = {
      ...parsedEndpoints[Number(source.droppableId)]["endpoints"][source.index],
    };
    const destinationPoint = {
      ...parsedEndpoints[Number(destination.droppableId)]["endpoints"][
        destination.index
      ],
    };
    // Swap ranks
    const temp = sourcePoint["rank"];
    sourcePoint["rank"] = destinationPoint["rank"];
    destinationPoint["rank"] = temp;
    const newPointsArray = endpoints.filter((point) => {
      return point["id"] !== sourcePoint["id"];
    });
    const destinationIndex = endpoints.findIndex((point) => {
      return point["id"] === destinationPoint["id"];
    });
    newPointsArray.splice(destinationIndex, 0, sourcePoint);
    setEndpoints(newPointsArray);
    // requestSwapPointsRank(sourcePoint, destinationPoint).catch((err) =>
    //   alert(err)
    // );
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
    onDragEndGroups,
    onDragEndPoints,
  };
};

export default useCurrentProject;
