import React from "react";

import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigationitems/Navigationitems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <Logo height="80%" />
    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;

// import React from "react";

// import "./Toolbar.css";
// import Logo from "../../Logo/Logo";
// import NavigationItems from "../Navigationitems/Navigationitems";

// const toolbar = (props) => (
//   <header className="Toolbar">
//     <div> MENU </div>
//     <Logo height="80%" />
//     <nav className="DesktopOnly">
//       <NavigationItems />
//     </nav>
//   </header>
// );

// export default toolbar;
