
import "./ListRecentSearches.scss";
import indianCities from "./../../assets/indian.cities.json";

interface Locations {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const ListRecentSearches = ({ setLocation, location }: Locations) => {

    const HandleFetch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLocation(event.currentTarget.id);

    }
    const fetchRecentLocations = indianCities.filter(it => it.name.includes(location)).map((loc, i) => {
        return (
            <button id={loc.name} className="recent-location-button" onClick={HandleFetch}>
                <span className="location">{loc.name}</span>
            </button>
        )
    })
    return (
        <>
            <div data-testid="suggestions" className="recent-location-container">
                {fetchRecentLocations}
            </div>
        </>
    )
}
export default ListRecentSearches;