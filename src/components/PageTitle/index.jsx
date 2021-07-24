import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { startCase, camelCase } from "lodash";

const useStyles = makeStyles((theme) => ({
  fontStyle: {
    fontSize: 30,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    fontWeight: 600,
    marginBottom: 30,
  },
}));

const PageTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.fontStyle}>
      {title.includes("-")
        ? `${title.split("-")[0]} ${startCase(camelCase(title.split("-")[1]))}`
        : title}
    </div>
  );
};

export default PageTitle;
