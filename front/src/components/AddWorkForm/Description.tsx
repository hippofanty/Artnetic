
import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

interface DescriptionProps {
  className: string,
}

export const Description = forwardRef<HTMLInputElement, DescriptionProps>((props, ref) => {
  return (
    <>
      <TextField 
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={6}
        variant="outlined"
        inputRef={ref}
        {...props}
      />
    </>
  );
});
