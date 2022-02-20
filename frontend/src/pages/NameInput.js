import React, { forwardRef } from "react";
const NameInput = (props, ref) => {
  return <input ref={ref} {...props} type="text" />;
};
export default forwardRef(NameInput);
