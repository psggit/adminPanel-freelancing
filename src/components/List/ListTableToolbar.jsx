import React from "react";
import { Toolbar } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const ListTableToolbar = (props) => {
  const { title, subtitle, children, style, filteredResults } = props;
  const classes = useStyles();

  return (
    <Toolbar
      className={
        filteredResults ? classes.rootPrimaryFilters : classes.rootPrimary
      }
      style={style}
    >
      <div className={classes.headerWrapper}>
        <Typography component="div" className={classes.headline}>
          <span className={classes.title}>{title}</span>
          <span className={classes.subtitle}>{subtitle}</span>
        </Typography>
        <div className={classes.spacer} />
        {children}
      </div>
      {filteredResults && (
        <div className={classes.filterResultWrapper}>{filteredResults()}</div>
      )}
    </Toolbar>
  );
};

ListTableToolbar.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.any,
  style: PropTypes.object,
  children: PropTypes.node,
  filteredResults: PropTypes.any,
};

const useStyles = makeStyles((theme) => ({
  rootPrimary: {
    backgroundColor: "#F3F3F7",
    padding: "0px 20px 0 20px",
  },
  rootPrimaryFilters: {
    backgroundColor: "#F3F3F7",
    padding: "10px 20px 10px 20px",
    display: "flex",
    flexDirection: "column",
  },
  headerWrapper: {
    width: "100%",
    display: "flex",
  },
  filterResultWrapper: {
    width: "100%",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    display: "block",
    paddingRight: "8px",
  },
  subtitle: {
    color: "#7B7A86",
    fontSize: "12px",
  },
  headline: {
    display: "block",
    whiteSpace: "nowrap",
  },
  spacer: {
    flex: 1,
  },
}));

export default ListTableToolbar;
