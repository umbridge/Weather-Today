import { useState } from "react";
import EmptyDashboard from "../EmptyDashboard/emptydashboard";
import Navbar from "../Navbar/navbar";
import Searchbar from "../Searchbar/searchbar";
import { useAppSelector } from "./../../app/hooks"

import { selectCityList } from "../../app/Reducers/Watchlist/watchlist";

import "./dashboard.scss"
import Wishlist from "../Wishlist/wishlist";
const Dashboard = () => {
  const cityList = useAppSelector(selectCityList);
  const { isSearch } = useAppSelector((state) => state.wishlistSlice);
  const [isFocusedsearchbar, setFocusedsearchbar] = useState(false);
  return (
    <>
      <div data-testid="dashboard" className="user-container">
        <Navbar />
        <Searchbar focusedsearchbar={isFocusedsearchbar} setFocusedsearchbar={setFocusedsearchbar} />
        {cityList.length > 0 && !isSearch ? <Wishlist /> :
          <EmptyDashboard focusedsearchbar={isFocusedsearchbar} />}
      </div>

    </>
  );
};

export default Dashboard;
