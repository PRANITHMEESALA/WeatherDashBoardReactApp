import React from "react";
import getFormattedWeatherData from "../services/weatherService";

const Forecast = ({ title, data }) => {
  const getWeather = async () => {
    const data = await getFormattedWeatherData({ q: "berlin" });
  };
  getWeather();

  return (
    <div>
      <div className=" flex items-center justify-start mt-6">
        <p className=" font-medium uppercase">{title}</p>
      </div>

      <hr className="my-l" />
      <div className="flex items-center justify-between">
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <p className="font-ligh text-sm">{data.title}</p>
              <img
                src="http://openweathermap.org/img/wn/01d@2x.png"
                alt="weather icon"
                className="w-12 my-l"
              />
              <p className="font-medium">{`${data.temp.toFixed()}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
