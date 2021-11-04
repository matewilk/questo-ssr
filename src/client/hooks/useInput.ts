import React, { useState } from "react";

export const useInput = (
  initialValue: any
): [{ value: string; onChange: any }, any] => {
  const [value, setValue] = useState(initialValue);

  return [
    {
      value,
      onChange: (e: React.MouseEvent<HTMLElement>) =>
        setValue((e.target as any).value),
    },
    () => setValue(initialValue),
  ];
};
