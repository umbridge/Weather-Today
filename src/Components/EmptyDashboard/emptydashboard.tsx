
import "./emptydashboard.scss"
import no_location_img from "./../../assets/images/Clouds.png";

interface isFocused {
    focusedsearchbar: boolean;
}
const EmptyDashboard = ({ focusedsearchbar }: isFocused) => {
    return (
        <>
            {
                !focusedsearchbar &&
                <div className="no-location" >
                    <img src={no_location_img} />
                    <p>No location added to watchlist</p>
                </div>
            }

        </>
    )
}

export default EmptyDashboard;