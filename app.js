// Starting --------------------------------------------------------
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const searchlocation = `${latitude},${longitude}`;

      setCurrent(searchlocation);
      setForecast(searchlocation);
      setHistory(searchlocation);
    }, function(error) {
      console.error('Error getting location:', error);
      alert('Error getting location: ');
      // Handle location error, fallback to a default location if needed
      const defaultLocation = 'Panadura'; 
      setCurrent(defaultLocation);
      setForecast(defaultLocation);
      setHistory(defaultLocation);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by this browser.');
    // Handle lack of geolocation support, use a default location
    const defaultLocation = 'Pandura'; 
    setCurrent(defaultLocation);
    setForecast(defaultLocation);
    setHistory(defaultLocation);
  }
};


// Function to fetch and display current weather for a given location
function setCurrent(searchlocation) {
  fetch('https://api.weatherapi.com/v1/current.json?key=af7def029d84448e957173059243108&q=' + searchlocation)
    .then(response => response.json())
    .then(data => {

      document.getElementById('locationName').innerHTML = `${data.location.name}` + " , " + `${data.location.country}`;
      document.getElementById('currentWeather').innerHTML = `${data.current.condition.text}`;
    
      const formattedDate = formatDate(data.location.localtime);
      const formattedTime = formatTime(data.location.localtime);
      
      document.getElementById('currentDate').innerHTML = formattedDate;
      document.getElementById('currentTime').innerHTML = `<span class="icon">&#128339;</span>`+formattedTime;
      
      document.getElementById('currentTemp').innerHTML = `<span class="icon"><i class="fas fa-thermometer-half"></i></span>${data.current.temp_c} °C`;
      document.getElementById('currentHumidity').innerHTML = `<span class="icon"><i class="fas fa-tint"></i></span> ${data.current.humidity} %`;
      document.getElementById('conditionIcon').src = data.current.condition.icon;
      document.getElementById('currentPressure').innerHTML = `<span class="icon"><i class="fas fa-wind"></i></span>${data.current.wind_kph} km/h`;
      document.getElementById('currentPressure').innerHTML = `<span class="icon"><i class="fas fa-tachometer-alt"></i></span>${data.current.pressure_mb} mb`;
      document.getElementById('currentUV').innerHTML = `<span class="icon"><i class="fas fa-sun"></i></span>${data.current.uv} uv`;
      document.getElementById('currentVisibility').innerHTML = `<span class="icon"><i class="fas fa-eye"></i></span>${data.current.vis_km} km`;
      document.getElementById('currentDewpoint').innerHTML = `<span class="icon"><i class="fas fa-snowflake"></i></span>${data.current.dewpoint_c} °C`;
      document.getElementById('currentHeatIndex').innerHTML = `<span class="icon"><i class="fas fa-temperature-high"></i></span>${data.current.heatindex_c} °C`;
    })
    .catch(error => console.error('SetCurrent Error:', error));
}


// Function to fetch and display 4-day weather forecast for a given location
function setForecast(searchlocation) {
  fetch('https://api.weatherapi.com/v1/forecast.json?key=af7def029d84448e957173059243108&q=' + searchlocation + '&days=8')
    .then(response => response.json())
    .then(data => {
      const forecastDays = data.forecast.forecastday;
      document.getElementById("invalidMsg").innerHTML = "";
      
      // Loop through available forecast days (limit to 3 to avoid index error)
      for (let i = 0; i < 7; i++) {
        document.getElementById(`Date${i+1}`).innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[i+1].date}</b>`;
        document.getElementById(`current${i+1}`).innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[i].day.condition.text}`;
        document.getElementById(`Temp${i+1}`).innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[i].day.avgtemp_c}°C`;
        document.getElementById(`hummidity${i+1}`).innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[i].day.avghumidity}%`;
        document.getElementById(`crntfor${i+1}`).src = `${forecastDays[i+1].day.condition.icon}`;
      }
    })
    .catch(error => {
      console.error(error);
      document.getElementById("invalidMsg").innerHTML = "";
      
    });
}



// History --------------------------------------------------------------------------------------------
// Function to fetch and display weather history for the past 4 days
function setHistory(searchlocation) {

  // Get the current date and create an array of past dates (last 4 days)
  const currentDate = new Date();
  const pastDates = [];

  // Loop to get dates for the past 4 days
  for (let i = 0; i <= 2; i++) {
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - i);
    pastDates.push(pastDate.toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
  }

  // Loop through the past dates and make API calls for each day
  pastDates.forEach((date, index) => {
    const historyApi = `https://api.weatherapi.com/v1/history.json?key=af7def029d84448e957173059243108&q=${searchlocation}&dt=${date}`;
    console.log(historyApi);

    fetch(historyApi)
      .then(response => response.json())
      .then(data => {

        const forecastDays = data.forecast.forecastday;
        console.log(index);
        
        // Dynamically update the history data in your UI for each day
        document.getElementById('Date' + (20 + index)).innerHTML = `<span class="icon">&#128197;</span> <b>${data.forecast.forecastday[0].date}</b>`;
       
        //-------------------------------------------
        
        //===========================================
       
        document.getElementById('current' + (20 + index)).innerHTML = `<span class="icon">&#9728;</span> ${data.forecast.forecastday[0].day.condition.text}`;
        document.getElementById('Temp' + (20 + index)).innerHTML = `<span class="icon">&#x1F321;</span> ${data.forecast.forecastday[0].day.avgtemp_c}°C`;
        document.getElementById('hummidity' + (20 + index)).innerHTML = `<span class="icon">&#128167;</span> ${data.forecast.forecastday[0].day.avghumidity}%`;
        document.getElementById('crntfor' + (19 + index)).src = `${data.forecast.forecastday[0].day.condition.icon}`;
      })
      .catch(error => console.error('SetCurrent Error:', error));
  });
}


// Function to handle search and fetch weather data for the searched location
function searching() {
  var searchlocation = document.getElementById("searchBar").value;
  document.getElementById("active").innerHTML = "Back to Location";
  setCurrent(searchlocation);
  setForecast(searchlocation);
  setHistory(searchlocation);
}

function formatDate(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const day = dateObj.getDate();

  // Suffix for the day (st, nd, rd, th)
  const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  };

  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  const month = months[dateObj.getMonth()];

  return `${day}${daySuffix(day)} of ${month}`;
}

// Function to format the time as "23.00"
function formatTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  
  return `${hours}.${minutes < 10 ? '0' + minutes : minutes}`;
}

//Alert Function-------------------------------------------
function setAlert(searchlocation) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=af7def029d84448e957173059243108&q=${searchlocation}&days=1&alerts=yes`)
    .then(response => response.json())
    .then(data => {
      // Check if there are any alerts
      if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
        const alert = data.alerts.alert[0]; // Get the first alert

        // Update the HTML elements with alert details
        document.getElementById('alertTitle2').innerHTML = alert.event || 'No event information';
        document.getElementById('alertDesc').innerHTML = alert.desc || 'No description available';
        document.getElementById('areas').innerHTML = alert.areas || 'No affected areas';
        document.getElementById('note').innerHTML = alert.note || 'No additional notes';
      } else {
        // If no alerts, show a default message
        document.getElementById('alertTitle2').innerHTML = 'No alerts';
        document.getElementById('alertDesc').innerHTML = '';
        document.getElementById('areas').innerHTML = '';
        document.getElementById('note').innerHTML = '';
      }
    })
    .catch(error => {
      console.error('SetAlert Error:', error);

      // Handle fetch errors
      document.getElementById('alertTitle2').innerHTML = 'Error fetching alerts';
      document.getElementById('alertDesc').innerHTML = '';
      document.getElementById('areas').innerHTML = '';
      document.getElementById('note').innerHTML = '';
    });
}


