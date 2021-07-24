import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  backdrop: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& .loaderText": {
      marginTop: 8,
    },
  },
  circle: {
    strokeLinecap: "round",
  },
  bottom: {
    color: "#eeeeee",
  },
  top: {
    position: "absolute",
    left: 0,
  },
}));

function CircularProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        value={100}
      />

      <CircularProgress
        variant="determinate"
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  style: PropTypes.any,
};

const Loader = (props) => {
  const { classname, isOpen, hasLoadingText, loadingText } = props;

  const classes = useStyles();
  return (
    <>
      <Backdrop className={clsx(classes.backdrop, classname)} open={isOpen}>
        <CircularProgress color="inherit" />
        {hasLoadingText && <div className="loaderText">{loadingText}</div>}
      </Backdrop>
    </>
  );
};

export default Loader;

Loader.defaultProps = {
  hasLoadingText: false,
};

Loader.propTypes = {
  classname: PropTypes.any,
  isOpen: PropTypes.bool,
  hasLoadingText: PropTypes.bool,
  loadingText: PropTypes.string,

  shadeStyle: PropTypes.object,
};
