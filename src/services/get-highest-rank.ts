import { RankObject } from "../types/shared";

const getHighestRank = (array:Array<RankObject>):number => {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i]["rank"] > counter) {
      counter = array[i]["rank"];
    }
  }
  return counter;
};

export default getHighestRank;
