import React from "react";
// import { withRouter } from "react-router-dom";

import "./Burger.css";
import BurgerIngrediet from "./Burgeringredient/Burgeringredient";

const burger = (props) => {
  // console.log(props);
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igkey, i = 0) => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngrediet key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> Please start adding ingredients!</p>;
  }

  //  console.log(transformedIngredients);

  return (
    <div className="Burger">
      <BurgerIngrediet type="bread-top" />
      {transformedIngredients}
      <BurgerIngrediet type="bread-bottom" />
    </div>
  );
};

export default burger;
