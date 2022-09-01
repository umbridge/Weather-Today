import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeFromWishlist } from "../../app/Reducers/Watchlist/watchlist";
import { weatherInfo } from "../../app/type";

import { Button } from "@mui/material";

import Degree from "./.././../assets/images/Degree.png"
import Vector from "./.././../assets/images/Vector.png"

import "./wishlist.scss";
import Graph from "../Graph/graph";

interface props {
    cityName: string;
    key: number;
}

const City = ({ cityName, key }: props) => {

    const dispatch = useAppDispatch();
    const [currWeather, setCurrWeather] = useState<weatherInfo>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7b1125233d68b80c88073b75c2fa80c8`;

    function HandleSearch() {
        axios.get(url).then((response) => {
            setCurrWeather(response.data);
        })
    }
    useEffect(() => {
        HandleSearch();
    }, [cityName]);

    const HandleRemoveFromWishlist = () => {
        console.log("remove from wishlist", currWeather?.name);
        dispatch(removeFromWishlist(currWeather?.name));

    }
    const getDayDetails = (sunset: number, sunrise: number) => {
        let diff = sunset - sunrise;
        let res = "0H 0M";
        if (diff > 0) {
            res = Math.floor(diff / 3600) + "H " + Math.floor(diff % 3600 / 60) + "M";
        }
        return res;
    }

    return (
        <div data-testid="city" className="city-container">
            {/* Upper half */}
            <div className="upper-container" >
                <div className="remove-from-wishlist" onClick={HandleRemoveFromWishlist} >
                    <Button variant="contained" color="error" className="remove-button"  >Remove</Button>
                </div>
                <div className="city-details" >
                    <img src={`https://openweathermap.org/img/wn/${currWeather?.weather[0].icon}.png`} className="weather-icon" />
                    <p className="city" >{currWeather?.name} <img src={Vector} className="arrow-img" /></p>

                    <p className="city-temp">{currWeather?.main.temp ? Number(parseFloat((currWeather.main.temp - 273).toString()).toFixed(2)) : ""}
                        <img src={Degree} className="degree" /></p>
                    {/* <span><img src={Degree} className="degree" /></span> */}
                </div>

            </div>

            {/* Lower half */}
            <div className="lower-container">
                <div className="tabulated" >
                    <div>
                        <p className="properties" >TIME</p>
                        <p className="properties" >{currWeather?.dt ? (new Date(currWeather?.dt * 1000)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : ""}</p>
                    </div>
                    <div>
                        <p className="properties" >PRESSURE</p>
                        <p className="properties" >{currWeather?.main.pressure}</p>
                    </div>
                    <div>
                        <p className="properties" >%RAIN</p>
                        <p className="properties" >{currWeather?.rain ? currWeather.rain["1h"] + "%" : "--"}</p>
                    </div>
                    <div>
                        <p className="properties" >HUMIDITY</p>
                        <p className="properties" >{currWeather?.main.humidity}</p>
                    </div>
                </div>
                <div className="graphical" >
                    <div className="day-details" ><p className="heading" >SUNRISE & SUNSET</p></div>

                    <div className="text-details">

                        <div className="day-values" >
                            <p className="heading" >Length Of the day : <span className="values">
                                {currWeather?.sys ? getDayDetails(currWeather?.sys.sunset, currWeather?.sys.sunrise) : "0H 0M"}</span> </p>

                            <p className="heading" >Remaining daylight: <span className="values">
                                {currWeather?.sys && currWeather.dt ? getDayDetails(currWeather?.sys.sunset, currWeather?.dt) : "0H 0M"}</span></p>
                        </div>

                        <div className="graph-area">
                            <div className="head-values">
                                <div>
                                    <p className="head" >Sunrise</p>
                                    <p className="val">
                                        {currWeather?.sys ? (new Date(currWeather?.sys.sunrise * 1000)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : ""}
                                    </p>
                                </div>
                                <div>
                                    <p className="head" >Sunset</p>
                                    <p className="val">
                                        {currWeather?.sys ? (new Date(currWeather?.sys.sunset * 1000)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : ""}
                                    </p>
                                </div>
                            </div>
                            {currWeather?.name && <Graph location={currWeather?.name} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default City;