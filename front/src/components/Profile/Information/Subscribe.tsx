import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function Subscribe() {
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <FormGroup>

      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Monthly newspaper"
      />
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Product emails"
      />
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Research emails"
      />
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Reminder emails"
      />
    </FormGroup>
  );
}
