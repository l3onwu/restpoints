import { useState } from "react";
import {
  requestGetProjectData,
  requestDeleteProject,
  requestUpdateProject,
  requestGroupOrder,
  requestProjectOrder,
} from "../apiClient/firebase-functions";
import { parseEndpointsObject } from "../../services/parse-endpoints";
import { ProjectType, EndgroupType } from "../../types/shared";

const useCurrentProject = () => {
  // State
  const [project, setProject] = useState<ProjectType | Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [endgroups, setEndgroups] = useState<Array<EndgroupType>>([]);
  const [endpoints, setEndpoints] = useState([]);

  // Parsed
  const [groupOrder, setGroupOrder] = useState([]);
  const [pointOrder, setPointOrder] = useState({});
  const pe2 = parseEndpointsObject(endgroups, endpoints);

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

      // Loop over groups, and set point orders
      const oldPointOrder = { ...pointOrder };
      d1.forEach((gr) => {
        oldPointOrder[gr["id"]] = gr["order"];
      });
      setPointOrder(oldPointOrder);

      // Set group order from project info
      setGroupOrder(project["order"]);

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
      const newName = prompt("Change project name to?");
      try {
        if (!newName) {
          throw Error("Please enter a name to change to");
        }
        await requestUpdateProject(project["id"], newName);
        const newProjectObject = { ...project };
        newProjectObject["name"] = newName;

        // Update projects array
        const cleanObjects = projectsHook["projects"].filter((proj) => {
          return proj["id"] !== project["id"];
        });
        const newProjectArray = [...cleanObjects, newProjectObject];
        newProjectArray.sort((a, b) => {
          return a["rank"] - b["rank"];
        });

        // Update locally
        setProject(newProjectObject);
        projectsHook.setProjects(newProjectArray);
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

  const onDragEndGroups = async (result) => {
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

    // Get data
    const sourceGroup = groupOrder[source.index];
    const destinationGroup = groupOrder[destination.index];
    console.log({ sourceGroup });
    console.log({ destinationGroup });

    // Create new group orders
    const copyOrder = [...groupOrder];
    const newOrder = copyOrder.filter((gr) => {
      return gr !== sourceGroup;
    });
    const destinationIndex = newOrder.findIndex((gr) => {
      return gr === destinationGroup;
    });

    if (source.index > destination.index) {
      newOrder.splice(destinationIndex, 0, sourceGroup);
    } else {
      newOrder.splice(destinationIndex + 1, 0, sourceGroup);
    }

    // Update locally
    setGroupOrder(newOrder);

    // Update db
    await requestProjectOrder(project["id"], newOrder);
  };

  const onDragEndPoints = async (result) => {
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

    // Get data
    const groupNumber = groupOrder[Number(source.droppableId)];
    const sourcePoint =
      pointOrder[groupOrder[Number(source.droppableId)]][source.index];
    const destinationPoint =
      pointOrder[groupOrder[Number(destination.droppableId)]][
        destination.index
      ];

    // Create new 'order' arrays
    const upPointOrder = { ...pointOrder };
    const cleanPoint = upPointOrder[groupNumber].filter((p) => {
      return p !== sourcePoint;
    });
    const destinationIndex = cleanPoint.findIndex((p) => {
      return p === destinationPoint;
    });
    if (source.index > destination.index) {
      cleanPoint.splice(destinationIndex, 0, sourcePoint);
    } else {
      cleanPoint.splice(destinationIndex + 1, 0, sourcePoint);
    }
    upPointOrder[groupNumber] = cleanPoint;

    // Update order locally
    setPointOrder(upPointOrder);

    // Update db
    await requestGroupOrder(groupNumber, cleanPoint).catch((err) => {
      alert(err);
    });
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
    pe2,
    groupOrder,
    setGroupOrder,
    pointOrder,
    setPointOrder,
    updateProjectHandler,
    deleteProjectHandler,
    selectProjectHandler,
    onDragEndGroups,
    onDragEndPoints,
  };
};

export default useCurrentProject;
