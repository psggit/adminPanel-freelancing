import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Drawer } from "@material-ui/core";
import clsx from "clsx";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import NavMenu from "./../NavMenu";
import PropTypes from "prop-types";

const DrawerComponent = (props) => {
  const classes = useStyles();
  const { links, onRouteChange, currentRoute, drawerState, toggleMenu } = props;

  const drawer = (
    <List>
      <NavMenu
        links={links}
        onRouteChange={onRouteChange}
        currentRoute={currentRoute}
        toggleMenu={toggleMenu}
      />
    </List>
  );

  return (
    <React.Fragment>
      <Hidden smUp>
        <Drawer
          onMouseOver={() => toggleMenu(true)}
          onMouseOut={() => toggleMenu(false)}
          variant="temporary"
          open={drawerState}
          classes={{
            root: classes.root,
            paper: classes.drawer,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          onMouseOver={() => toggleMenu(true)}
          onMouseOut={() => toggleMenu(false)}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerState,
            [classes.drawerClose]: !drawerState,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerState,
              [classes.drawerClose]: !drawerState,
            }),
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

DrawerComponent.propTypes = {
  links: PropTypes.array,
  handleRouteChange: PropTypes.func,
  currentRoute: PropTypes.string,
  drawerState: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

const drawerWidth = 256;
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "2 !important",
    top: 75,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    marginTop: 75,
    [theme.breakpoints.down("sm")]: {
      marginTop: 117,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    marginTop: 75,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      marginTop: 117,
    },
  },
  drawerClose: {
    marginTop: 75,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8),
    },
  },
}));

export default DrawerComponent;
