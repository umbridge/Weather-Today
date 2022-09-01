
import Dashboard from "./Components/Dashboard/dashboard";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CityWeatherDetails from "./Components/CityWeatherDetails/city-weather-details";

function App() {
  return (
    <div className="App" data-testid = "app-container">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city" element={<CityWeatherDetails/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


