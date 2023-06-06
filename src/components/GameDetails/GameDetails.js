import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { DEFAULT_BET_TIME } from "../../constants/constants";
import "./GameDetails.scss";

const GameDetails = ({ round, userPoints, disableGameHandler }) => {
  const [countDownTimer, setCountDownTimer] = useState(DEFAULT_BET_TIME);
  const timerIdRef = useRef();

  useEffect(() => {
    if (round) {
      timerIdRef.current = setInterval(() => {
        setCountDownTimer((prevTime) =>
          prevTime >= 1 ? prevTime - 1 : prevTime
        );
      }, 1000);
    }
  }, [round]);

  useEffect(() => {
    if (countDownTimer < 1) {
      setCountDownTimer(DEFAULT_BET_TIME);
      clearInterval(timerIdRef.current);
      disableGameHandler(true);
    }
  }, [countDownTimer, disableGameHandler]);

  return (
    <div className="GameDetails">
      <div className="Header__rounds">
        <p>Round {round}</p>
      </div>
      <div className="Header__countDown">
        <p>Bet in {countDownTimer} seconds</p>
      </div>
      <div className="Header__userPoints">
        <p>Total Points {userPoints}</p>
      </div>
    </div>
  );
};

GameDetails.defaultProps = {
  round: 1,
  userPoints: 0
};

GameDetails.propTypes = {
  userPoints: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired
};

export default GameDetails;
