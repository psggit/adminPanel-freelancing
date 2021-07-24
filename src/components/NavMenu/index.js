import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const NavMenu = ({ links, onRouteChange, currentRoute }) => {
  const isActive = (path) => {
    return path === currentRoute ? true : false;
  };

  const classes = useStyles();

  const handleClick = (item) => {
    onRouteChange(`${item.path}`);
  };

  const renderItem = (item = {}, index) => {
    const active = isActive(item.path);
    const icon = item.icon
      ? React.cloneElement(item.icon, {
          className: active ? classes.active : null,
        })
      : null;

    return (
      <React.Fragment key={item.name}>
        {!item.hide && (
          <React.Fragment>
            <ListItem
              button
              data-testid={item.name}
              onClick={() => handleClick(item)}
              className={
                active
                  ? `active ${classes.activeMenuListItem}`
                  : classes.menuListItem
              }
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={item.name} className={classes.menuItem} />
            </ListItem>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return <List>{links.map((link) => renderItem(link))}</List>;
};

NavMenu.propTypes = {
  links: PropTypes.array,
  onRouteChange: PropTypes.func,
  currentRoute: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  menuItem: {
    fontSize: 14,
    userSelect: "none",
    color: "#252433",
  },
  menuListItem: {
    "&:hover": {
      backgroundColor: "#f3f3f7",
    },
  },
  activeMenuListItem: {
    backgroundColor: "#f3f3f7",
  },
}));

export default NavMenu;
