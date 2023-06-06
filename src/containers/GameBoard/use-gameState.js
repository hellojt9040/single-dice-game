import { useReducer } from "react";
import { GAME_STATE } from "../../constants/constants";

const INITIAL_STATE = {
  totalPoints: 100,
  round: 1,
  allBets: [],
  isDisabled: false,
  diceRollResult: -1,
  isBetPlayed: false,
  gameState: GAME_STATE.INIT
};

const gameReducer = (state, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "HANDLE_BET_POINTS":
      let updatedBetData;
      if (state.allBets?.length) {
        updatedBetData = state.allBets.map((bet) => {
          if (bet.round === state?.round) {
            const foundIndex = bet.bets?.findIndex(
              (each) => each.diceNo === payload?.diceNo
            );
            let updatedBets = [...bet.bets];
            if (foundIndex === -1) {
              updatedBets.push({
                betCount: payload?.pointsToReduce,
                diceNo: payload?.diceNo
              });
            } else {
              const prevBetData = updatedBets[foundIndex];
              const updatedBet = {
                ...prevBetData,
                betCount: prevBetData?.betCount + payload?.pointsToReduce
              };
              updatedBets[foundIndex] = updatedBet;
            }
            return { ...bet, bets: updatedBets };
          }
          return bet;
        });
      } else {
        updatedBetData = [
          {
            round: state.round,
            bets: [
              {
                diceNo: payload?.diceNo,
                betCount: payload?.pointsToReduce
              }
            ]
          }
        ];
      }
      return {
        ...state,
        allBets: updatedBetData,
        totalPoints: state.totalPoints - payload?.pointsToReduce
      };
    case "HANDLE_DISABLE_GAME":
      const anyBetPlayed =
        state.allBets?.findIndex((bet) => bet.round === state.round) !== -1;
      return {
        ...state,
        isDisabled: payload?.shouldDisabled || false,
        gameState: GAME_STATE.WAITING,
        isBetPlayed: anyBetPlayed
      };
    case "SET_DICE_ROLL_RESULT":
      let betMatchCount = 0;
      const updatedBets = state.allBets.map((bet) => {
        if (bet.round === state.round) {
          const updatedRoundBets = bet.bets?.map((each) => {
            if (each.diceNo === payload?.diceRollResult) {
              betMatchCount = each.betCount;
              return {
                ...each,
                isMatch: true
              };
            }
            return each;
          });
          if (betMatchCount) {
            updatedRoundBets.matchFound = payload?.diceRollResult;
          }

          return { ...bet, bets: updatedRoundBets };
        }
        return bet;
      });

      return {
        ...state,
        diceRollResult: payload?.diceRollResult || 0,
        totalPoints: state.totalPoints + (betMatchCount * 2 || 0),
        allBets: updatedBets,
        gameState: GAME_STATE.RESULT
      };
    case "MOVE_TO_NEXT_ROUND":
      return {
        ...state,
        round: state.round + 1,
        isDisabled: false,
        diceRollResult: -1,
        gameState: GAME_STATE.INIT
      };
    default:
      return state;
  }
};

const useGameState = () => {
  const [userGameState, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  return {
    userGameState,
    dispatch
  };
};

export default useGameState;
