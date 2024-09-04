// Starting --------------------------------------------------------
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const searchlocation = `${latitude},${longitude}`;

      setCurrent(searchlocation);
      setForecast(searchlocation);
    }, function(error) {
      console.error('Error getting location:', error);
      // Handle location error, fallback to a default location if needed
      const defaultLocation = 'Colombo'; 
      setCurrent(defaultLocation);
      setForecast(defaultLocation);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
    // Handle lack of geolocation support, use a default location
    const defaultLocation = 'Colombo'; 
    setCurrent(defaultLocation);
    setForecast(defaultLocation);
  }
};


// Function to fetch and display current weather for a given location
function setCurrent(searchlocation) {
  fetch('https://api.weatherapi.com/v1/current.json?key=af7def029d84448e957173059243108&q=' + searchlocation)
    .then(response => response.json())
    .then(data => {
      document.getElementById('countryName').innerHTML = `${data.location.country}`;
      document.getElementById('locationName').innerHTML = `${data.location.name}`;
      document.getElementById('currentWeather').innerHTML = `${data.current.condition.text}`;
      document.getElementById('currentTime').innerHTML = `${data.location.localtime}`;
      document.getElementById('currentTemp').innerHTML = `${data.current.temp_c} °C`;
      document.getElementById('curentHumidity').innerHTML = `${data.current.humidity}%`;
      document.getElementById('currenttIcon').src = data.current.condition.icon;
    })
    .catch(error => console.error('SetCurrent Error:', error));
}

// Function to fetch and display 4-day weather forecast for a given location
function setForecast(searchlocation) {
  fetch('https://api.weatherapi.com/v1/forecast.json?key=af7def029d84448e957173059243108&q=' + searchlocation + '&days=5')
    .then(response => response.json())
    .then(data => {
      const forecastDays = data.forecast.forecastday;

      document.getElementById('Date2').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[1].date}</b>`;
      document.getElementById('current2').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[1].day.condition.text}`;
      document.getElementById('Temp2').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[1].day.avgtemp_c}°C`;
      document.getElementById('hummidity2').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[1].day.avghumidity}%`;
      document.getElementById('crntfor1').src = `${forecastDays[1].day.condition.icon}`;
      
      document.getElementById('Date3').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[2].date}</b>`;
      document.getElementById('current3').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[2].day.condition.text}`;
      document.getElementById('Temp3').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[2].day.avgtemp_c}°C`;
      document.getElementById('hummidity3').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[2].day.avghumidity}%`;
      document.getElementById('crntfor2').src = `${forecastDays[2].day.condition.icon}`;

      document.getElementById('Date4').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[3].date}</b>`;
      document.getElementById('current4').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[3].day.condition.text}`;
      document.getElementById('Temp4').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[3].day.avgtemp_c}°C`;
      document.getElementById('hummidity4').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[3].day.avghumidity}%`;
      document.getElementById('crntfor3').src = `${forecastDays[3].day.condition.icon}`;

      document.getElementById('Date5').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[4].date}</b>`;
      document.getElementById('current5').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[4].day.condition.text}`;
      document.getElementById('Temp5').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[4].day.avgtemp_c}°C`;
      document.getElementById('hummidity5').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[4].day.avghumidity}%`;
      document.getElementById('crntfor4').src = `${forecastDays[4].day.condition.icon}`;
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle search and fetch weather data for the searched location
function searching() {
  var searchlocation = document.getElementById("searchBar").value;
  setCurrent(searchlocation);
  setForecast(searchlocation);
  const query = this.value;
  if (query.length > 2) {
    suggestCities(query);
  }
}
