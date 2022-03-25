import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { checkAuthTimeout } from "../actions/auth";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";

import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSuccess } from "../actions";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

// export function* watchAuth() {

//   yield takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga);
//   yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
//   yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
//   yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
// }

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

// export function* watchOrder() {
//     yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
//     yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
//   }
