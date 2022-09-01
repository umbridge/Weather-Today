import "./searchResult.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Degree from "./../../../assets/images/Degree.png";
import Warning from "./../../../assets/images/Warning.png";
import { useNavigate } from "react-router";
import { weatherInfo } from "./../../../app/type";

import { useAppDispatch } from "./../../../app/hooks";
import { LocationSearch } from "../../../app/Reducers/Watchlist/watchlist";

interface weather {
  currWeather: weatherInfo
}

export default function SearchReult({ currWeather }: weather) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    navigate('/city', { state: currWeather });
    dispatch(LocationSearch(false));
  }
  return (

    <div className="ResultCard" onClick={handleClick} >
      <div className="card-header">
        <div className="title" >{currWeather?.name}</div>
        <div><ArrowForwardIosIcon /></div>
      </div>
      <div className="card-content-1">
        <div className="temp-val">
          {Number(parseFloat((currWeather.main.temp - 273).toString()).toFixed(2))}
          <img src={Degree} className="degree" />
        </div>

        <div>
          <img src={`https://openweathermap.org/img/wn/${currWeather.weather[0].icon}.png`} className="weather-icon"></img>
        </div>
      </div>
      <div className="card-content-2">
        {currWeather.rain ?
          <div className="rainyday" >
            <div className="warning" >
              <p><img src={Warning} />WARNING</p>

            </div>
            <div><p>Expecting Rainfall</p></div>

          </div> : <div></div>
        }
      </div>
    </div>

  );
}
