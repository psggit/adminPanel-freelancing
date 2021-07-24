import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textboxStyle: {
    //borderRadius: "4px",
    padding: "2px 16px",
    backgroundColor: "#f3f3f7",
    // border: "1px solid #363636",
    color: "#000",
  },
  textareaStyle: {
    padding: "8px 16px",
    backgroundColor: "#f3f3f7",
    // border: "1px solid #363636",
    color: "#000",
  },
  charCountStyle: {
    textAlign: "right",
    color: "#8b8a96",
    margin: 0,
    //paddingTop: 4
  },
  charCountFontStyle: {
    fontSize: 12,
  },
  adornedStart: {
    flex: 2,
  },
}));

function CustomInputbase(props) {
  const classes = useStyles();

  const {
    id,
    style,
    classname,
    defaultValue,
    handleTextChange,
    placeholder,
    name,
    disabled,
    keyDownAction,
    multiline,
    maxRows,
    hasCharLimit,
    maxChars,
    type,
  } = props;

  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (!keyDownAction) setTextValue(defaultValue);

    // eslint-disable-next-line
  }, [defaultValue]);

  const handleChange = (e) => {
    if (keyDownAction && e.target.value === ",") {
      e.target.value = e.target.value.replace(",", "");
    }
    setTextValue(e.target.value);
    if (handleTextChange) handleTextChange(e);
  };

  const handleBlur = (e) => {
    if (keyDownAction) {
      setTextValue("");
      keyDownAction({ key: "Enter" });
    }
  };

  const handleKeyDown = ({ e, key }) => {
    if ((key === "," || key === "Enter") && keyDownAction) {
      setTextValue("");
      keyDownAction({ key: "Enter" });
    }
  };

  const InputbaseProps = {
    style: { ...style },
  };

  return (
    <React.Fragment>
      <InputBase
        {...InputbaseProps}
        id={id}
        name={name}
        type={type}
        multiline={multiline ? true : false}
        rows={multiline ? maxRows : ""}
        classes={{ input: keyDownAction ? classes.adornedStart : undefined }}
        className={clsx(
          multiline ? classes.textareaStyle : classes.textboxStyle,
          classname
        )}
        placeholder={placeholder}
        value={textValue}
        onChange={(e) => handleChange(e)}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        inputProps={{
          maxLength: hasCharLimit ? maxChars : "",
        }}
      />
    </React.Fragment>
  );
}

CustomInputbase.defaultProps = {
  style: {},
  id: "outlined-inputbase",
  defaultValue: "",
  className: "inputbase",
  name: "inpult-field",
  disabled: false,
  type: "text",
};

CustomInputbase.propTypes = {
  id: PropTypes.string,
  handleTextChange: PropTypes.func,
  classname: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  keyDownAction: PropTypes.func,
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  hasCharLimit: PropTypes.bool,
  maxChars: PropTypes.number,
  remainingChars: PropTypes.number,
};

export default CustomInputbase;
