import { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Dice.scss";

const Dice = ({
  diceSrc,
  diceNo,
  round,
  diceRollResult,
  userPoints,
  triggerReset,
  isDisabled,
  betPointsHandlert
}) => {
  const [betCount, setBetCount] = useState(0);

  const betCountHandler = () => {
    if (!isDisabled) {
      setBetCount((prevCount) => {
        let updatedBetCount = prevCount + 1;
        return updatedBetCount <= userPoints ? updatedBetCount : prevCount;
      });
    }
  };

  useEffect(() => {
    if (betCount) {
      betPointsHandlert(diceNo, 1);
    }
  }, [diceNo, betCount, betPointsHandlert]);

  useEffect(() => {
    if (triggerReset) {
      setBetCount(0);
    }
  }, [triggerReset]);

  return (
    <div
      className={classNames("Dice", {
        Dice__disabled: isDisabled
      })}
    >
      <div className="Dice__contaner">
        <div className="Dice__betCount">{betCount}</div>
        <div
          className={classNames("Dice__each", {
            Dice__eachDisabled: isDisabled,
            Dice__eachSuccess: diceRollResult === diceNo
          })}
          onClick={betCountHandler}
        >
          <img src={diceSrc} alt="dice" />
        </div>
      </div>
    </div>
  );
};

Dice.defaultProps = {
  userPoints: 0,
  triggerReset: false,
  isDisabled: false,
  diceRollResult: -1
};

Dice.propTypes = {
  diceSrc: PropTypes.string.isRequired,
  diceNo: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  diceRollResult: PropTypes.number.isRequired,
  userPoints: PropTypes.number.isRequired,
  triggerReset: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  betPointsHandlert: PropTypes.func.isRequired
};

export default Dice;
