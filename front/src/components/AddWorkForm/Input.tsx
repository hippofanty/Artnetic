import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const Input = forwardRef((props, ref) => {
  return (
    <>
      <TextField 
        id="outlined-basic"
        variant="outlined"
        inputRef={ref}
        {...props}
      />
    </>
  );
});
// export const Input = ({ label, register, required }: InputProps) => (
//   <>
//     <label>{label}</label>
//     <input {...register(label, { required })} />
//   </>
// );
