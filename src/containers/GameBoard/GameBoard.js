import { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Dices from "../../components/Dices/Dices";
import GameDetails from "../../components/GameDetails";
import Card from "../../components/UI/Card";
import { GAME_STATE } from "../../constants/constants";
import getDiceResult from "../../helpers/rollDice";
import useGameState from "./use-gameState";
import "./GameBoard.scss";

const GameBoard = () => {
  const { userGameState, dispatch } = useGameState();
  const evalWaitingTimerId = useRef();
  const resetTriggerRef = useRef();
  const navigate = useNavigate();

  const {
    round,
    totalPoints,
    isDisabled,
    isBetPlayed,
    diceRollResult,
    gameState
  } = userGameState;

  const betPointsHandlert = useCallback(
    (diceNo, pointsToReduce) => {
      dispatch({
        type: "HANDLE_BET_POINTS",
        payload: {
          diceNo,
          pointsToReduce
        }
      });
    },
    [dispatch]
  );

  const disableGameHandler = useCallback(
    (shouldDisabled) => {
      dispatch({
        type: "HANDLE_DISABLE_GAME",
        payload: {
          shouldDisabled
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    evalWaitingTimerId.current = setTimeout(() => {
      if (isDisabled) {
        const result = getDiceResult(1, 6);
        dispatch({
          type: "SET_DICE_ROLL_RESULT",
          payload: {
            diceRollResult: result
          }
        });
      }
    }, 2000);

    return () => {
      clearTimeout(evalWaitingTimerId.current);
    };
  }, [isDisabled, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (diceRollResult > 0) {
        dispatch({
          type: "MOVE_TO_NEXT_ROUND"
        });
        resetTriggerRef.current = true;
      }
    }, 5000);

    return () => {
      resetTriggerRef.current = false;
      clearTimeout(timer);
    };
  }, [diceRollResult, dispatch]);

  const isWaiting = gameState === GAME_STATE.WAITING;
  useEffect(() => {
    if (
      !isBetPlayed &&
      isWaiting &&
      window.confirm("You have not taken any bet! want to exit")
    ) {
      navigate("/");
    }
  }, [isBetPlayed, isWaiting, navigate]);

  return (
    <Card className="GameBoard">
      <GameDetails
        round={round}
        userPoints={totalPoints}
        disableGameHandler={disableGameHandler}
      />
      <Dices
        round={round}
        totalPoints={totalPoints}
        isDisabled={isDisabled}
        diceRollResult={diceRollResult}
        triggerReset={resetTriggerRef.current}
        betPointsHandlert={betPointsHandlert}
      />
      <div className="GameBoard__loading">
        <p
          className={classNames("GameBoard__spinner", {
            "GameBoard__spinner--show": gameState === GAME_STATE.WAITING
          })}
        >
          Rolling Dice...
        </p>
      </div>
    </Card>
  );
};

export default GameBoard;
