import { EndgroupType } from "../types/shared";

export const parseEndpointsObject = (
  groups: Array<EndgroupType>,
  points: Array<object>
): Object => {
  const parsedEndpoints = {};

  groups.forEach((group) => {
    const matchingEndpoints = points.filter((endpoint) => {
      return endpoint["groupID"] === group["id"];
    });

    const endpointObject = {};
    matchingEndpoints.forEach((point) => {
      endpointObject[point["id"]] = point;
    });

    const groupObject = {
      ...group,
      endpoints: endpointObject,
    };
    parsedEndpoints[group["id"]] = groupObject;
  });

  return parsedEndpoints;
};
