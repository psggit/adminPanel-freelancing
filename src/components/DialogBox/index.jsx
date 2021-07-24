import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import useDialogState from "./useDialogState";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 16,
    color: "#ffffff",
    backgroundColor: theme.palette.background.button
      ? theme.palette.background.button
      : "#005e9d",
    "&.MuiDialogTitle-root h6": {
      paddingLeft: 49,
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.36,
    },
  },
  closeButton: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: "#FFFFFF",
  },
  editButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#FFFFFF",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, isEditable, onEdit, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      {isEditable ? (
        <IconButton
          aria-label="edit"
          className={classes.editButton}
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogBox = React.memo((props) => {
  const {
    title,
    children,
    actions,
    style,
    handleCloseDialog,
    isEditable,
    handleEdit,
  } = props;
  const [dialogRendered, dialogOpen, openDialog, closeDialog] = useDialogState({
    defaultOpen: true,
  });
  const classes = useStyles();

  const dialogStyle = {
    ...style,
    minWidth: 320,
    maxHeight: 500,
    maxWidth: 672,
    overflow: "hidden",
  };

  const handleClose = () => {
    closeDialog();
    if (handleCloseDialog) {
      handleCloseDialog();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialogOpen}
      className={classes.dialogPaper}
    >
      <div style={dialogStyle}>
        <DialogTitle
          onClose={handleClose}
          isEditable={isEditable}
          onEdit={handleEdit}
        >
          {title}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {children}
        </DialogContent>
        <DialogActions
          className={
            actions && actions.length > 0
              ? classes.dialogFooter
              : classes.hideDialogFooter
          }
        >
          {actions ? actions.map((item) => item) : ""}
        </DialogActions>
      </div>
    </Dialog>
  );
});

DialogBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.array,
  style: PropTypes.object,
  handleCloseDialog: PropTypes.func,
  isEditable: PropTypes.bool,
  handleEdit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    margin: 0,
  },
  dialogContent: {
    padding: "24px 32px 24px 32px",
    maxHeight: 362,
  },
  hideDialogFooter: {
    display: "none",
  },
  dialogFooter: {
    position: "relative",
    zIndex: "2",
    boxShadow: "0 -3px 6px 0 rgba(0, 0, 0, 0.16)",
    padding: "16px 32px 16px 32px",
  },
}));

export default DialogBox;
