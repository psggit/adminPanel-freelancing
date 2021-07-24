import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";

const StandardButton = (props) => {
  const {
    disabled,
    text,
    color,
    className,
    style,
    onClick,
    variant,
    id,
    icon,
    useRealText,
    buttonWithIcon,
  } = props;

  const classes = useStyles();

  const getClassname = () => {
    let classname;
    if (color === "primary") classname = classes.buttonPrimary;
    else if (color === "secondary") classname = classes.buttonSecondary;
    else if (color === "tertiary") classname = classes.buttonTertiary;
    else if (color === "error") classname = classes.buttonError;
    return classname;
  };

  const buttonProps = {
    id,
    onClick: onClick,
    className: classnames(
      getClassname(),
      className,
      useRealText ? null : classes.buttonTextUpperCase
    ),
    style: { ...style },
    variant,
    color,
    text,
    disabled,
  };

  if (buttonWithIcon) {
    return (
      <Button {...buttonProps}>
        <span className="label">{text}</span>
        <span className="icon">{icon}</span>
      </Button>
    );
  } else {
    return <Button {...buttonProps}>{text}</Button>;
  }
};

const useStyles = makeStyles((theme) => ({
  buttonError: {
    color: theme.palette.error.main,
    backgroundColor: "#474655",
  },
  buttonPrimary: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.background.hover
        ? theme.palette.background.hover
        : "red",
    },
    "&:disabled": {
      color: "#FFFFFF",
      backgroundColor: theme.palette.background.disabled
        ? theme.palette.background.disabled
        : "#aeaeb7",
    },
  },
  buttonSecondary: {
    color: theme.palette.background.active
      ? theme.palette.background.active
      : "#005e9d",
    backgroundColor: "#FFFFFF",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.background.active
      ? theme.palette.background.active
      : "#005e9d",
    "&:hover": {
      backgroundColor: theme.palette.background.outlineHover
        ? theme.palette.background.outlineHover
        : "#e5f0f8",
      color: theme.palette.background.hover
        ? theme.palette.background.hover
        : "#0c77be",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.palette.background.hover
        ? theme.palette.background.hover
        : "#0c77be",
    },
    "&:active": {
      backgroundColor: "#FFFFFF",
      color: theme.palette.background.selected
        ? theme.palette.background.selected
        : "#00437f",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.palette.background.selected
        ? theme.palette.background.selected
        : "#00437f",
    },
    "&:disabled": {
      color: theme.palette.background.disabled
        ? theme.palette.background.disabled
        : "#aeaeb7",
      borderWidth: "1px",
      backgroundColor: "#FFFFFF",
      borderStyle: "solid",
      borderColor: theme.palette.background.disabled
        ? theme.palette.background.disabled
        : "#aeaeb7",
    },
  },
  button: {
    borderRadius: 0,
    verticalAlign: "none",
    textTransform: "none",
    padding: "8px 24px",
    "& span": {
      marginRight: 0,
    },
    "&:disabled": {
      opacity: 0.9,
    },
    "& span.icon": {
      marginLeft: 6,
      display: "flex",
    },
  },
  buttonTextUpperCase: {
    textTransform: "uppercase",
  },
}));

StandardButton.defaultProps = {
  useRealText: false,
};

StandardButton.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  useRealText: PropTypes.bool,
  buttonWithIcon: PropTypes.bool,
};

export default StandardButton;
