import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContentWrapper from "./SnackbarContentWrapper";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  snackbar: {
    //marginLeft: `calc(245px + 64px - 24px)`
  },
}));

const CustomizedSnackbars = React.memo((props) => {
  const { messageType, message, open, handleClose } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className={clsx(classes.snackbar, "snackbar")}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant={messageType}
          message={message}
        />
      </Snackbar>
    </React.Fragment>
  );
});

CustomizedSnackbars.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CustomizedSnackbars;
