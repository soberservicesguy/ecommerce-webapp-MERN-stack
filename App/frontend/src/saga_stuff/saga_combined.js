// REDUX STUFF
import { all, fork } from "redux-saga/effects";

// IMPORT all saga watchers
import {watchAgeUp} from "./saga_a";

// Create rootSaga
export function* rootSaga(){
  yield all([
    fork(watchAgeUp),
    // fork(watchDecreaseCounter),
  ]);
};
