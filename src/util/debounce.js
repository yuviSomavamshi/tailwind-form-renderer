import debounce from "lodash/debounce";
import { useState, useCallback, useEffect } from "react";

const eventToValue = (ev) => ev.target.value;

export const useDebouncedChange = (
  handleChange,
  defaultValue,
  data,
  path,
  eventToValueFunction,
  timeout = 300
) => {
  const [input, setInput] = useState(data ?? defaultValue);
  useEffect(() => {
    setInput(data ?? defaultValue);
  }, [data, defaultValue]);

  const debouncedUpdate = useCallback(
    debounce((newValue) => handleChange(path, newValue), timeout),
    [handleChange, path, timeout]
  );
  const onChange = useCallback(
    (ev) => {
      const newValue = eventToValueFunction(ev);
      setInput(newValue ?? defaultValue);
      debouncedUpdate(newValue);
    },
    [debouncedUpdate, eventToValueFunction, defaultValue]
  );
  const onClear = useCallback(() => {
    setInput(defaultValue);
    handleChange(path, undefined);
  }, [defaultValue, handleChange, path]);
  return [input, onChange, onClear];
};
