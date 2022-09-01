import "./navbar.scss";
import icon from "./../../assets/images/cloud_raining_sun_weather_forecast_icon.png"
const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <img src={icon} />
        <span className="text" >Weather Forecast</span>
      </div>
    </>
  );
};

export default Navbar;
