const getHighestRank = (array) => {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i]["rank"] > counter) {
      counter = array[i]["rank"];
    }
  }
  return counter;
};

export default getHighestRank;
