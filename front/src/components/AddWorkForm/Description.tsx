
import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const Description = forwardRef((props, ref) => {
  return (
    <>
      <TextField 
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        inputRef={ref}
        {...props}
      />
    </>
  );
});
