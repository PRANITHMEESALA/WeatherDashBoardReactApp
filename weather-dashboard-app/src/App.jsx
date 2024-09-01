import TapButtons from "./components/TapButtons";
import Inputs from "./components/Inputs";
import TImeAndCurrentLocation from "./components/TImeAndCurrentLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [query, setQuery] = useState({ q: "hyderabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    const message = query.q ? query.q : "current location";
    toast.info(`Fetching weather data  for ${message.toUpperCase()}...`);
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    });
  };
  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "frm-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-cyan-600 to-red-700";
  };
  return (
    <>
      <div
        className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <TapButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />
        {weather && (
          <>
            <TImeAndCurrentLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
            <Forecast title="3 hour step forecast" data={weather.hourly} />
            <Forecast title="Daily forecast" data={weather.daily} />
          </>
        )}
      </div>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        theme={"colored"}
      />
    </>
  );
}

export default App;
