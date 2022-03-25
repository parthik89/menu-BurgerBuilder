import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigationitems/Navigationitems";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary/Auxilary";

const sideDrawer = (props) => {
  let attachedClasses = ["SideDrawer", "Close"];
  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        {/* <div className="Logo">
           <Logo />
           </div>
           // here we pass div to style than that is apply to Logo 
           //FOR DOWNSIDE  we can ise this way to  pass as props to logoand set height there
      */}
        <Logo height="11%" />
        <nav style={{ marginTop: "32px" }}>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
