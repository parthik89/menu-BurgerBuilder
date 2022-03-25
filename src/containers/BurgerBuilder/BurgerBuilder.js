import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import Checkout from "../Checkout/Checkout";
import App from "../../App";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }

  state = {
    purchasing: false,
    //  boss: false,
  };

  componentDidMount() {
    //   console.log(this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    //    alert("You continue!");
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Parthik Pethani",
    //     address: {
    //       street: "Viratnagar",
    //       zipCode: 445646,
    //       country: "INDIA",
    //     },
    //     email: "parthikpethani9090@gmail.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // axios
    //   .post("/orders.json", order) // orders here is node where all data will store in tree like structure (DIR type)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });

    // // 😀😀
    // this.setState({
    //   boss: true,
    // });
    // setTimeout(() => {
    //   this.props.history.push("/checkout");
    // }, 4000);

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true , meat: false, ...}

    let orderSummary = null;
    let burger = this.props.error ? (
      <p> ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );

    // if (this.state.boss === true) {
    //   <Checkout ingredients2={this.state.totalPrice} />;
    //   console.log("😚😚😚😚");
    // }

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

// addIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   const updatedCount = oldCount + 1;
//   const updatedIngredients = {
//     ...this.state.ingredients,
//   };
//   updatedIngredients[type] = updatedCount;
//   const priceAddition = INGREDIENT_PRICES[type];
//   const oldPrice = this.state.totalPrice;
//   const newPrice = oldPrice + priceAddition;
//   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
//   this.updatePurchaseState(updatedIngredients);
// };

// removeIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   if (oldCount <= 0) {
//     return;
//   }
//   const updatedCount = oldCount - 1;
//   const updatedIngredients = {
//     ...this.state.ingredients,
//   };
//   updatedIngredients[type] = updatedCount;
//   const priceDeduction = INGREDIENT_PRICES[type];
//   const oldPrice = this.state.totalPrice;
//   const newPrice = oldPrice - priceDeduction;
//   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
//   this.updatePurchaseState(updatedIngredients);
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onIngredientAdded: (ingName) =>
//       dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
//     onIngredientRemoved: (ingName) =>
//       dispatch({
//         type: actionTypes.REMOVE_INGREDIENT,
//         ingredientName: ingName,
//       }),
//   };
