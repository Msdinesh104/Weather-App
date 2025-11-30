import { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [disc, setDisc] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [feels, setFeels] = useState("");
  const [wind, setWind] = useState("");
  const [nearby, setNearby] = useState([]);

  async function getWeather() {
    if (!city) return alert("Please enter a city name");

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ffa6aa35608d0099c7aa357ef40d52b&units=metric`
      );

      let data = res.data;

      
      setWeather(data.weather[0].main);
      setDisc(data.weather[0].description);
      setTemp(data.main.temp);
      setIcon(data.weather[0].icon);

      
      setHumidity(data.main.humidity);
      setFeels(data.main.feels_like);
      setWind(data.wind.speed);

      
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const nearRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=9ffa6aa35608d0099c7aa357ef40d52b&units=metric`
      );

      setNearby(nearRes.data.list);

    } catch (err) {
      alert("City not found!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-700 to-cyan-500 flex items-center justify-center p-5">

      <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 animate-card">

        
        <h1 className="text-4xl font-bold text-center text-white mb-2 drop-shadow-lg">
          Weather Forecast
        </h1>
        <p className="text-center text-white/80 mb-8 fade-appear">
          Check live weather 
        </p>

        
        <div className="flex gap-3">
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Search city..."
            className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none shadow-md focus:shadow-lg transition"
          />
          <button
            onClick={getWeather}
            className="bg-white/90 text-blue-700 font-bold px-6 rounded-xl shadow-lg hover:bg-white transition"
          >
            Search
          </button>
        </div>

        
        {weather && (
          <div className="mt-10 bg-white/20 backdrop-blur-xl p-8 rounded-3xl text-center border border-white/20 shadow-xl animate-card">

            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon"
              className="mx-auto -mt-2 drop-shadow-xl float-icon"
            />

            <h2 className="text-6xl font-extrabold text-white drop-shadow-lg temp-pop">
              {temp}°C
            </h2>

            <h3 className="text-2xl font-semibold text-white mt-3 tracking-wide fade-appear">
              {weather}
            </h3>

            <p className="capitalize text-white/80 mt-1 fade-appear">
              {disc}
            </p>

            
            <div className="mt-6 grid grid-cols-3 gap-4 text-white/90 text-sm">

              <div>
                <p className="font-bold">💧 Humidity</p>
                <p>{humidity}%</p>
              </div>

              <div>
                <p className="font-bold">🌡 Feels Like</p>
                <p>{feels}°C</p>
              </div>

              <div>
                <p className="font-bold">💨 Wind</p>
                <p>{wind} m/s</p>
              </div>

            </div>

           
            <div className="mt-6 pt-4 border-t border-white/20 fade-appear">
              <p className="text-lg font-medium text-white tracking-wider">
                {city.toUpperCase()}
              </p>
            </div>

          </div>
        )}


        {nearby.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl text-white font-bold mb-3">
              Nearby Places
            </h2>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">

              {nearby.map((place, i) => (
                <div key={i} className="flex justify-between mb-2 text-white">
                  <span>{place.name}</span>
                  <span>{place.main.temp}°C</span>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
