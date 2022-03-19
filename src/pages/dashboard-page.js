import { ProjectsContext } from "../helpers/context/contextList";
import useProjects from "../helpers/hooks/useProjects";
import useCurrentProject from "../helpers/hooks/useCurrentProject";
import { Box } from "@chakra-ui/react";
import ProjectPage from "./project-page";
import DashboardView from "./dashboard-view";

const DashboardPage = () => {
  // State
  const projectsHook = useProjects();
  const currentProjectHook = useCurrentProject();
  return (
    <ProjectsContext.Provider value={{ projectsHook, currentProjectHook }}>
      <Box bgColor="gray.800" width="100vw" height="100vh">
        {!currentProjectHook.project && <DashboardView />}
        {currentProjectHook.project && <ProjectPage />}
      </Box>
    </ProjectsContext.Provider>
  );
};

export default DashboardPage;
