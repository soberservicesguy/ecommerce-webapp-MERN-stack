import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";

// this generator function which delays an action dispatch
// worker saga
function* ageUpAsync() {
// delay is similar to timeout OR PUT SOME REQUEST HERE
  yield delay(1000);
// put is similar to dispatch action
  yield put({ type: "AGE_UP_ASYNC", value: 1 });
}

// this is a function which will take latest action dispatch of AGE_UP and eats it and runs above function over it which has different action, AGE_UP never gets dispatched
// we are catching an action, eating it and dispatching another
// watcher saga
export function* watchAgeUp() {
  yield takeLatest("AGE_UP", ageUpAsync); // takes action and runs a function for it rather than passing to reducer
}