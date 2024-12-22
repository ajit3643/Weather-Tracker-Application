document.getElementById("location-form").addEventListener("submit", getWeather);
const citymessage = document.getElementById("cityMessage");
const result = document.getElementById("result");

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);

  // Get the hours, minutes, and seconds from the date object
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let meridian = hours > 12 ? "PM" : "AM";

  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Format the time
  const formattedTime = `${hours}:${minutes} ${meridian}`;

  return formattedTime;
}

async function getWeather(e) {
  //Write you code logic here
  e.preventDefault();
  let cityName = document.getElementById("search").value;
  if (cityName === "") {
    citymessage.style.display = "block";
    citymessage.innerText = "Please enter a city name.";
    result.innerHTML = "";
    return;
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=dd81510bdcfe67ff3bbe3bb97bfa18ea&units=metric`
    );
    if (!res.ok) {
      result.innerHTML = "<h4>🔎 data Not Found</h4>";
    }
    const data = await res.json();
    if (data.message) {
      citymessage.style.display = "block";
      citymessage.innerText = "City not found";

      return;
    }
    citymessage.style.display = "none";
    result.innerHTML = ` <h4>${data.name}</h4>
  <div class="location">
    <span>🌎 Longitude: ${data.coord.lon}</span>
    <span>🌏 Latitude: ${data.coord.lat}</span>
  </div>
  <p>
    🔆 &nbsp; Temperature: ${data.main.temp}°C &nbsp; ${
      data.weather[0].main
    }<br/>
    🌤️ &nbsp; Feels like: ${data.main.feels_like}°C<br/>
    ⛅ &nbsp; Humidity: ${data.main.humidity}%<br/>
    🌊 &nbsp; pressure: ${data.main.pressure} mbar<br/>
    🌥️ &nbsp; Minimum Temperature: ${data.main.temp_min}°C <br/>
    🌤️ &nbsp; Maximum Temperature: ${data.main.temp_max}°C <br/>
    🌅 &nbsp; Sunrise: ${formatTime(data.sys.sunrise)} <br/>
    🌄 &nbsp; Sunset: ${formatTime(data.sys.sunset)}
  </p>`;
    cityName = "";
  } catch (error) {
    console.log(error);
  }
}
