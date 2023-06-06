import { Link } from "react-router-dom";
import bannerImage from "../../assets/images/dice-image.jpg";
import Playimage from "../../assets/images/icons-play.png";
import "./Home.scss";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home__banner">
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="Home__action">
        <Link to="gameBoard">
          <img src={Playimage} alt="play" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
