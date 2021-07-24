import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const Layout = React.memo(({ children }) => {
  const classes = useStyles();

  return <div className={classes.layout}>{children}</div>;
});

Layout.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: 64,
    marginTop: 64,
    width: "inherit",
    overflow: "scroll",
  },
}));

export default Layout;
