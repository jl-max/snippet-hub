import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    props: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    setValue,
    reset: () => setValue(initialValue),
  };
};
