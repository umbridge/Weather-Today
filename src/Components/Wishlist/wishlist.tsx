import Carousel from "react-material-ui-carousel";
import { useAppSelector } from "./../../app/hooks"
import { selectCityList } from "../../app/Reducers/Watchlist/watchlist";
import City from "./City";
import "./wishlist.scss";
import { useEffect, useState } from "react";

const Wishlist = () => {
    const cityList = useAppSelector(selectCityList);
    const [ind, setInd] = useState<number>(0);
    useEffect(() => {

    }, [])

    return (
        <div data-testid="wishlist" className="Carousel-container">
            <Carousel
                index={ind}
                strictIndexing={true}
                interval={4000}
                animation="slide"
                indicators={true}
                stopAutoPlayOnHover
                swipe
                className="my-carousel"
                key={ind}
            >
                {cityList.map(
                    (city: string, index: number) => {
                        return (
                            <City cityName={city} key={index} />
                        )
                    })}
            </Carousel>
        </div>
    )

}
export default Wishlist;