export const validateInputs = (group, type, address) => {
  if (!group || !address || !type) {
    throw Error("Please fill in all required details");
  }
};

export const validateJSON = (
  inputs: string,
  outputs: string
): Array<object> => {
  try {
    return [JSON.parse(inputs), JSON.parse(outputs)];
  } catch (err) {
    throw Error(
      "Make sure inputs and outputs are in JSON format with double quotes"
    );
  }
};
