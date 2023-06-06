import { Link } from "react-router-dom";
import Card from "../UI/Card";
import "./Header.scss";

const Header = () => {
  return (
    <Card className="Header">
      <div className="Header__container">
        <p className="Header__title">
          <Link to="/">Single Dice Game</Link>
        </p>
      </div>
    </Card>
  );
};

export default Header;
