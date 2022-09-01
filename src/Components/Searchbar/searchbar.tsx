
import React, { useState } from "react";
import "./../Searchbar/searchbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import ListRecentSearches from "./ListRecentSearches";
import icon from "./../../assets/images/icon-wrapper.png";
import axios from "axios";
import SearchReult from "./SearchResult/searchResult";
import {weatherInfo} from "./../../app/type";
import {LocationSearch} from "./../../app/Reducers/Watchlist/watchlist";
import { useAppSelector, useAppDispatch } from "./../../app/hooks"

export interface focused{
    focusedsearchbar : boolean
    setFocusedsearchbar : React.Dispatch<React.SetStateAction<boolean>>

}               

const Searchbar = ({focusedsearchbar,setFocusedsearchbar}:focused) => {
    const dispatch = useAppDispatch();

    const [location,setLocation] = useState("");
    const [currWeather, setCurrWeather] = useState<weatherInfo>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b1125233d68b80c88073b75c2fa80c8`;

    function HandleSearch (){
        axios.get(url).then((response) =>{
            setCurrWeather(response.data);
            dispatch(LocationSearch(true));
        })
    }
    return(
        <>
        <div className="search-container" >
            <div className="wrapper">
                <span className="text">
                    <input  data-testid="search-bar"
                            type="text" value={location}  
                            placeholder="Search Location" 
                            className="imput-location" 
                            onFocus={()=>setFocusedsearchbar(true)} 
                            onChange={(event)=>setLocation(event.target.value)}></input>
                </span>
                <span className="input-addon" >
                    <button data-testid="search-btn" className="search-icon" onClick={HandleSearch}>
                        <img src={icon}></img>
                    </button>
                </span>                
            </div>         
        </div>
        {location &&
                <div>
                    <ListRecentSearches data-testid = "suggest-box" location={location} setLocation={setLocation} />                      
                </div> 
            }
        { currWeather && <SearchReult currWeather = {currWeather} />}
        </>
    )
    
}

export default Searchbar;