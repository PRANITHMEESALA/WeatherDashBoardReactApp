import { DateTime } from "luxon";

const API_KEY = "6eaeae33bdbdaad443133ed4cd495e47";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const iconURLFromCode = (iconCode) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data) => {
  const {
    name,
    main: { temp, feels_like, humidity, temp_max, temp_min },
    weather,
    dt,
    coord: { lat, lon },
    sys: { country, sunrise, sunset },
    wind: { speed },
    timezone,
  } = data;
  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconURLFromCode(icon),
    formattedLocalTime,
    dt,
    lat,
    lon,
    timezone,
  };
};
const formatForecastWeather = (secs, offset, data) => {
  const hourly = data
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconURLFromCode(f.weather[0].icon),
      date: f.dt_text,
    }))
    .slice(0, 5);
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconURLFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));
  return { hourly, daily };
};
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);
  const { dt, lat, lon, timezone } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};
export default getFormattedWeatherData;
