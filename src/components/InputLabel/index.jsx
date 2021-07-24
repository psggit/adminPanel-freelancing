import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#363545",
  },
}));

function CustomInputLabel(props) {
  const classes = useStyles();

  const { id, style, classname, children } = props;

  const InputLabelProps = {
    id,
    style: { ...style },
  };

  return (
    <InputLabel
      {...InputLabelProps}
      variant="standard"
      className={clsx(classes.labelStyle, classname)}
    >
      {children}
    </InputLabel>
  );
}

CustomInputLabel.defaultProps = {
  style: {},
  id: "standard-label",
  className: "input-label",
};

CustomInputLabel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default CustomInputLabel;
