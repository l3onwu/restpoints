const parseEndpoints = (groups, points) => {
  const parsedEndpoints = [];
  groups.forEach((group) => {
    const matchingEndpoints = points.filter((endpoint) => {
      return endpoint["groupID"] === group["id"];
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
