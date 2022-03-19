import { useState } from "react";

export const useField = (currentValue) => {
  const [value, setValue] = useState(currentValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export const useJSONField = (currentValue) => {
  const [value, setValue] = useState(currentValue);
  const [stringified, setStringified] = useState(JSON.stringify(currentValue));
  const onChange = (e) => {
    setStringified(e.target.value);
  };
  const onSave = () => {
    setValue(JSON.parse(stringified));
  };
  return { value, onChange, onSave, stringified };
};
