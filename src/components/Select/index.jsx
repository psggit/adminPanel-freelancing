import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    padding: "8px 16px",
  },
  wrapper: {
    width: "100%",
    height: "33px",
    backgroundColor: "#f3f3f7",
  },
}));

const CustomSelect = ({
  id,
  defaultValue,
  labelKey,
  options,
  placeholder,
  isDisabled,
  handleSelectChange,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "none");

  useEffect(() => {
    setValue(defaultValue);

    // eslint-disable-next-line
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (handleSelectChange) handleSelectChange(e);
  };

  const classes = useStyles();

  return (
    <Select
      id={id}
      disableUnderline
      value={value}
      onChange={handleChange}
      className={classes.wrapper}
      classes={{ select: classes.select }}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      }}
      disabled={isDisabled}
    >
      <MenuItem value="none" disabled>
        {placeholder}
      </MenuItem>
      {options &&
        options.map((item) => {
          return (
            <MenuItem value={item.id} key={item.id}>
              {item[labelKey]}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export default CustomSelect;

CustomSelect.defaultProps = {
  labelKey: "value",
  placeholder: "Select an option",
  isDisabled: false,
};

CustomSelect.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.any,
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  handleSelectChange: PropTypes.func,
  options: PropTypes.array,
  isDisabled: PropTypes.bool,
};
