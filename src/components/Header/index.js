import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IF_LOGO from "./../../assets/IF_logo.jpg";
import { styles } from "./../../styles/components/header.styles";
import IconButton from "@material-ui/core/IconButton";
import menuIcon from "Images/menu_icon.svg";
import Drawer from "Components/Drawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = ({ classes, currentRoute, history }) => {
  const links = require("./routes").links;
  const [drawerState, setDrawerState] = React.useState(false);

  const handleRouteChange = (selectedRoute) => {
    if (currentRoute !== selectedRoute) history.push(`/${selectedRoute}`);
    setDrawerState(false);
  };

  const toggleMenu = (drawerOpen) => {
    setDrawerState(drawerOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload("/login");
  };

  return (
    <>
      <div id="Header" className={classes.header}>
        <div className={classes.iconWrapper}>
          <IconButton
            onClick={() => {
              setDrawerState((prev) => !drawerState);
            }}
            className="menuIcon"
          >
            <img alt="Menu" src={menuIcon} className={classes.menuIconStyle} />
          </IconButton>
          <div>{currentRoute}</div>
          <img src={IF_LOGO} alt="if_logo" className={classes.logoImg} />
        </div>
        <div className={classes.titleWrapper}>
          <div className={classes.logout} onClick={handleLogout}>
            <ExitToAppIcon />
          </div>
        </div>
      </div>
      <Drawer
        links={links}
        onRouteChange={handleRouteChange}
        currentRoute={currentRoute}
        drawerState={drawerState}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
