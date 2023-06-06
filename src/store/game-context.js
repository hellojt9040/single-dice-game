import { createContext } from "react";

const INITIAL_STATE = {
  totalPoints: 100,
  round: 1
};

const gameReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "REDUCE_POINT":
      return {
        ...state,
        totalPoints: state.totalPoints - payload?.pointsToReduce
      };

    default:
      return state;
  }
};

const gameContext = createContext(gameReducer);
