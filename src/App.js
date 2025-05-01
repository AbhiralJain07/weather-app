import React, { useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError("Please enter a location.");
      setWeather(null);
      return;
    }

    const apiKey = "46f36e4e927d47bab67172601253004";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Location not found");
      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="result">
          <p><strong>Location:</strong> {weather.location.name}, {weather.location.country}</p>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
