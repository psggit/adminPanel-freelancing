import React from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const ListCard = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>{children}</Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "24px",
    overflow: "visible",
  },
}));

ListCard.propTypes = {
  children: PropTypes.node,
};

export default ListCard;
