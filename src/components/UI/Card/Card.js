import classNames from "classnames";
import "./Card.scss";

const Card = (props) => {
  return (
    <div
      className={classNames("Card", {
        [props.className]: !!props.className
      })}
    >
      {props.children}
    </div>
  );
};

export default Card;
