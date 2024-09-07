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
      setAlert(searchlocation);
    }, function(error) {
      console.error('Error getting location:', error);
      alert('Error getting location: ');
      // Handle location error, fallback to a default location if needed
      const defaultLocation = 'Panadura'; 
      setCurrent(defaultLocation);
      setForecast(defaultLocation);
      setHistory(defaultLocation);
      setAlert(searchlocation);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by this browser.');
    // Handle lack of geolocation support, use a default location
    const defaultLocation = 'Pandura'; 
    setCurrent(defaultLocation);
    setForecast(defaultLocation);
    setHistory(defaultLocation);
    setAlert(searchlocation);
  }
};


// Function to fetch and display current weather for a given location
function setCurrent(searchlocation) {
  fetch('https://api.weatherapi.com/v1/current.json?key=af7def029d84448e957173059243108&q=' + searchlocation)
    .then(response => response.json())
    .then(data => {
    if(data.location.country.length > 15 || data.location.name.length > 15){
      document.getElementById('locationName').style.fontSize = '39px';
      }
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


function setForecast(searchlocation) {
  fetch('https://api.weatherapi.com/v1/forecast.json?key=af7def029d84448e957173059243108&q=' + searchlocation + '&days=10')
    .then(response => response.json())
    .then(data => {
      const forecastDays = data.forecast.forecastday;

    for (let i = 1; i < 10; i++) {
        const formattedDate = formatDate(data.forecast.forecastday[i].date);
        document.getElementById(`Date${i+1}`).innerHTML = `<span class="icon">&#128197;</span> <b>${formattedDate}</b>`;

        // document.getElementById(`Date${i+1}`).innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[i].date}</b>`;
        document.getElementById(`current${i+1}`).innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[i].day.condition.text}`;
        document.getElementById(`Temp${i+1}`).innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[i].day.avgtemp_c}°C`;
        document.getElementById(`humi${i+1}`).innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[i].day.avghumidity}%`;
      }
    })
    .catch(error => {
      console.error("For error", error);
      document.getElementById("invalidMsg").innerHTML = "API Expired...";
      
    });
}



// History --------------------------------------------------------------------------------------------

function setHistory(searchlocation) {


  const currentDate = new Date();
  const pastDates = [];


  for (let i = 1; i <= 3; i++) {
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - i);
    pastDates.push(pastDate.toISOString().split('T')[0]); 
  }


  pastDates.forEach((date, index) => {
    const historyApi = `https://api.weatherapi.com/v1/history.json?key=af7def029d84448e957173059243108&q=${searchlocation}&dt=${date}`;
    console.log(historyApi);

    fetch(historyApi)
      .then(response => response.json())
      .then(data => {

        const forecastDays = data.forecast.forecastday;
        console.log(index);
        const formattedDate = formatDate(data.forecast.forecastday[0].date);

        document.getElementById('Date' + (20 + index)).innerHTML = `<span class="icon">&#128197;</span> <b>${formattedDate}</b>`;

       
        document.getElementById('current' + (20 + index)).innerHTML = `<span class="icon">&#9728;</span>${data.forecast.forecastday[0].day.condition.text}`;
        document.getElementById('Temp' + (20 + index)).innerHTML = `<span class="icon"><i class="fas fa-thermometer-half"></i></span> ${data.forecast.forecastday[0].day.avgtemp_c}°C`;
        document.getElementById('humi' + (20 + index)).innerHTML = `<span class="icon"><i class="fas fa-tint"></i></span> ${data.forecast.forecastday[0].day.avghumidity}%`;

      })
      .catch(error => console.error('SetHistory Error:', error));
  });
}


// Searching ---------------------------------------------------------
function searching() {
  var searchlocation = document.getElementById("searchBar").value;
  document.getElementById("active").innerHTML = "Back to Location";
  setCurrent(searchlocation);
  setForecast(searchlocation);
  setHistory(searchlocation);
  setAlert(searchlocation);
  document.getElementById("suggestions").innerHTML = "";
  
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


function formatTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

//Alert Function-------------------------------------------
function setAlert(searchlocation) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=af7def029d84448e957173059243108&q=${searchlocation}&days=1&alerts=yes`)
    .then(response => response.json())
    .then(data => {

      if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
        const alert = data.alerts.alert[0];


        document.getElementById('alertTitle2').innerHTML = alert.event || 'No event information';

        if(alert.desc.length > 800){
          document.getElementById('alertDesc').style.fontSize = '11px';
           }
        else if(alert.desc.length < 400){
          document.getElementById('alertDesc').style.fontSize = '26px';
        }
        
        document.getElementById('alertDesc').innerHTML = alert.desc || 'No description available';}
       else {

        document.getElementById('alertTitle2').innerHTML = 'No alerts';
        document.getElementById('alertDesc').innerHTML = 'Currently, there are no alerts available or received for this location at this time. If any weather alerts or important notifications are issued, they will be displayed here immediately to keep you informed. Our system is constantly monitoring for updates, and we will ensure that any alerts are shown promptly when they become available. Please check back regularly for updates, as we aim to provide you with the latest information as soon as it arrives.';

      }
    })
    .catch(error => {
      console.error('SetAlert Error:', error);

    });
}

// -----------------------    Search Suggestion   -----------------------
const apiKey = 'af7def029d84448e957173059243108';
const apiUrl = 'http://api.weatherapi.com/v1/search.json';

async function getSuggestions() {
  const query = document.getElementById('searchBar').value;
  if (query.length < 1) return;

  const response = await fetch(`${apiUrl}?key=${apiKey}&q=${query}`);
  const suggestions = await response.json();

  displaySuggestions(suggestions);
}

function displaySuggestions(suggestions) {
  const suggestionsList = document.getElementById('suggestions');
  suggestionsList.innerHTML = ''; 

  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    if(suggestion.country.length > 10 || suggestion.name.length > 10){
      document.getElementById('suggestions').style.fontSize = '13px';
    }
    li.textContent = suggestion.name+' , '+suggestion.country; 
    suggestionsList.appendChild(li);

    li.addEventListener('click', () => {
      document.getElementById('searchBar').value = suggestion.name; 
      suggestionsList.innerHTML = '';
    });
  });
}



