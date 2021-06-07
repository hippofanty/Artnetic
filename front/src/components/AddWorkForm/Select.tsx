import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ChangeHandler } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";

import React from "react";

interface PropsSelect {
  options: { label: string; value: string }[];
  onChange: ChangeHandler;
  name: string;
}
export function MySelect({ options, onChange, name }: PropsSelect) {
  return (
    <>
      <Box style={{ minWidth: "220px", marginLeft: '35px' }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={onChange}
            label="Category"
            name={name}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
