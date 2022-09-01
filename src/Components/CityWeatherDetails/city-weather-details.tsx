
import "./city-weather-details.scss"

import Navbar from "../Navbar/navbar"

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import DoneIcon from '@mui/icons-material/Done';
import { Button, IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import Sun from "./.././../assets/images/Sun.png"
import Degree from "./.././../assets/images/Degree.png"
import Vector from "./.././../assets/images/Vector.png"
import AddToList from "./.././../assets/images/AddToList.png"

import { weatherInfo } from "../../app/type";
import { useAppSelector, useAppDispatch } from "./../../app/hooks"
import { addToWishlist, removeFromWishlist, selectCityList } from "../../app/Reducers/Watchlist/watchlist";
import Graph from "../Graph/graph";


const CityWeatherDetails = () => {
    const cityList = useAppSelector(selectCityList);
    useEffect(() => {
        // Type Casting, then you can get the params passed via router
        const state = location.state as weatherInfo;
        // console.log(state);
        setCurrWeather(state);
    }, []);

    const getDayDetails = (sunset: number, sunrise: number) => {
        let diff = sunset - sunrise;
        let res = Math.floor(diff / 3600) + "H " + Math.floor(diff % 3600 / 60) + "M";
        return res;
    }

    const checkWishlist = () => {
        return cityList.find((city) => city === currWeather?.name) !== undefined ? true : false;
    }


    const HandleAddToWishlist = () => {
        dispatch(addToWishlist(currWeather?.name));
    }

    const HandleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(currWeather?.name));
    }

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [currWeather, setCurrWeather] = useState<weatherInfo>();


    return (
        <div data-testid="testing-city-weather" className="user-container" >
            <Navbar />
            <div className="city-container">
                {/* Upper half */}
                <div className="action-container" >

                    <div className="navigation" onClick={() => navigate(-1)} >
                        {/* <div> */}
                        <IconButton >
                            <ArrowBackIosNewOutlinedIcon />
                        </IconButton>
                        {/* </div> */}
                        {/* <div className="back-text">Back */}
                        <span className="back-text"  >Back</span>
                        {/* </div> */}
                    </div>


                    <div className="add-to-watchlist" >
                        {currWeather && checkWishlist() ?
                            <div className="added-to-list">
                                <Button className="button-text g" variant="contained" color="success" endIcon={<DoneIcon fontSize="small" />}>Added to list</Button>
                                <Button className="button-text r" variant="contained" color="error" onClick={HandleRemoveFromWishlist} >Remove</Button>
                            </div>
                            : <div><img src={AddToList} className="add-to-list" onClick={HandleAddToWishlist} /></div>
                        }

                    </div>
                </div>
                {/* Middle Half */}
                <div className="city-details" >
                    <img src={`https://openweathermap.org/img/wn/${currWeather?.weather[0].icon}.png`} className="sun-img" />
                    <p className="city-name" >{currWeather?.name} <img src={Vector} className="arrow-img" /></p>

                    <p className="temp">{currWeather?.main.temp ? Number(parseFloat((currWeather.main.temp - 273).toString()).toFixed(2)) : ""}
                        <img src={Degree} className="degree" /></p>
                    {/* <span><img src={Degree} className="degree" /></span> */}
                </div>


                {/* Lower half */}
                <div className="weather-details">
                    <div className="tabulated" >
                        <div>
                            <p className="properties" >TIME</p>
                            <p className="properties-val" >{currWeather?.dt ? (new Date(currWeather?.dt * 1000)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : ""}</p>
                        </div>
                        <div>
                            <p className="properties" >PRESSURE</p>
                            <p className="properties-val" >{currWeather?.main.pressure}</p>
                        </div>
                        <div>
                            <p className="properties" >%RAIN</p>
                            <p className="properties-val" >{currWeather?.rain ? currWeather.rain["1h"] + "%" : "--"}</p>
                        </div>
                        <div>
                            <p className="properties" >HUMIDITY</p>
                            <p className="properties-val" >{currWeather?.main.humidity}</p>
                        </div>
                    </div>
                    <div className="graphical" >
                        <div className="day-details" ><p className="rise-set" >SUNRISE & SUNSET</p></div>
                        <div className="text-details">

                            <div className="day-values" >
                                <p className="heading" >Length Of the day : <span className="values">
                                    {currWeather?.sys ? getDayDetails(currWeather?.sys.sunset, currWeather?.sys.sunrise) : "0H 0M"}</span> </p>
                                {/* <br></br> */}
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
        </div>
    )
}

export default CityWeatherDetails;