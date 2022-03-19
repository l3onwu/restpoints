const parseEndpoints = (groups, points) => {
  const parsedEndpoints = [];
  groups.sort((a, b) => {
    return a["rank"] - b["rank"];
  });
  groups.forEach((group) => {
    const matchingEndpoints = points.filter((endpoint) => {
      return endpoint["groupID"] === group["id"];
    });
    matchingEndpoints.sort((a, b) => {
      return a["rank"] - b["rank"];
    });
    const groupObject = {
      ...group,
      endpoints: matchingEndpoints,
    };
    parsedEndpoints.push(groupObject);
  });
  return parsedEndpoints;
};

export default parseEndpoints;
