import React from "react";

import "./Navigationitems.css";
import NavigationItem from "./Navigationitem/Navigationitem";

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders"> Orders </NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth"> Authenticate </NavigationItem>
    ) : (
      <NavigationItem link="/logout"> Logout </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
