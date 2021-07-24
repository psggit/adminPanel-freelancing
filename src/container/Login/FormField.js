import React from "react";
import TextField from "@material-ui/core/TextField";

function FormField({ classes, name, label, ...rest }) {
  return (
    <TextField
      id="outlined-required"
      className={`input-field ${name}`}
      classes={{ root: classes.rootInput }}
      autoComplete="off"
      label={label}
      name={name}
      variant="outlined"
      {...rest}
    />
  );
}

export default FormField;
