import React from "react";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";

const CustomTableCell = (props) => {
  const { size = "small" } = props;
  const classes = useStyles();

  return <TableCell size={size} classes={classes} {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    //textOverflow: "ellipsis",
    //maxWidth: 500,
    height: 48,
  },
  head: {
    fontWeight: 600,
  },
  sizeSmall: {
    padding: "0px 4px",
    "&:first-child": {
      //paddingLeft: 16
    },
    "&:last-child": {
      //paddingLeft: 16,
    },
  },
}));

export default CustomTableCell;
