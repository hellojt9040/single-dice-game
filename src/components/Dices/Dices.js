import Dice from "../Dice/Dice";
import Card from "../UI/Card";
import "./Dices.scss";

import dice1 from "../../assets/images/icons8-dice-one.png";
import dice2 from "../../assets/images/icons8-dice-two.png";
import dice3 from "../../assets/images/icons8-dice-three.png";
import dice4 from "../../assets/images/icons8-dice-four.png";
import dice5 from "../../assets/images/icons8-dice-five.png";
import dice6 from "../../assets/images/icons8-dice-six.png";

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];

const Dices = ({
  round,
  totalPoints,
  diceRollResult,
  betPointsHandlert,
  triggerReset,
  isDisabled
}) => {
  return (
    <div className="Dices">
      <Card>
        <div className="backdrip"></div>
      </Card>
      <div className="Dices__container">
        {dices?.map((dice, index) => (
          <Dice
            key={index}
            diceNo={index + 1}
            round={round}
            diceRollResult={diceRollResult}
            diceSrc={dice}
            userPoints={totalPoints}
            triggerReset={triggerReset}
            isDisabled={isDisabled}
            betPointsHandlert={betPointsHandlert}
          />
        ))}
      </div>
    </div>
  );
};

export default Dices;
