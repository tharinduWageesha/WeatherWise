// Fetch current weather for Colombo, Sri Lanka
{fetch('https://api.weatherapi.com/v1/current.json?key=af7def029d84448e957173059243108&q=Colombo')
  .then(response => response.json())
  .then(data => {
    // Set the text of the element with ID 'current1' to Colombo's current weather
    document.getElementById('current1').innerText = `${data.current.condition.text}`;
    document.getElementById('Time').innerHTML = `${data.location.localtime}`;
    document.getElementById('Temp').innerHTML = `${data.current.temp_c} °C`;
    document.getElementById('humidity').innerHTML = `${data.current.humidity}%`;
    document.getElementById('bnrimg').src = data.current.condition.icon;
  })
  .catch(error => console.error('Error:', error));}

  // Fetch 4-day weather forecast for Colombo, Sri Lanka
{fetch('https://api.weatherapi.com/v1/forecast.json?key=af7def029d84448e957173059243108&q=Colombo&days=5')
.then(response => response.json())
.then(data => {
  const forecastDays = data.forecast.forecastday;

  // Update the first forecast card
  document.getElementById('Date2').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[1].date}</b>`;
  document.getElementById('current2').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[1].day.condition.text}`;
  document.getElementById('Temp2').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[1].day.avgtemp_c}°C`;
  document.getElementById('hummidity2').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[1].day.avghumidity}%`;
  document.getElementById('crntfor1').src = `${forecastDays[1].day.condition.icon}`;
  
  // Update the second forecast card
  document.getElementById('Date3').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[2].date}</b>`;
  document.getElementById('current3').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[2].day.condition.text}`;
  document.getElementById('Temp3').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[2].day.avgtemp_c}°C`;
  document.getElementById('hummidity3').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[2].day.avghumidity}%`;
  document.getElementById('crntfor2').src = `${forecastDays[2].day.condition.icon}`;

  // Update the third forecast card
  document.getElementById('Date4').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[3].date}</b>`;
  document.getElementById('current4').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[3].day.condition.text}`;
  document.getElementById('Temp4').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[3].day.avgtemp_c}°C`;
  document.getElementById('hummidity4').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[3].day.avghumidity}%`;
  document.getElementById('crntfor3').src = `${forecastDays[3].day.condition.icon}`;

  // Update the fourth forecast card
  document.getElementById('Date5').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[4].date}</b>`;
  document.getElementById('current5').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[4].day.condition.text}`;
  document.getElementById('Temp5').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[4].day.avgtemp_c}°C`;
  document.getElementById('hummidity5').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[4].day.avghumidity}%`;
  document.getElementById('crntfor4').src = `${forecastDays[4].day.condition.icon}`;
})
.catch(error => console.error('Error:', error));
}

{fetch('https://api.weatherapi.com/v1/history.json?key=af7def029d84448e957173059243108&q=Colombo&dt=2024-08-31')
  .then(response => response.json())
  .then(data => {
    const forecastDays = data.forecast.forecastday;
  
    // Update the first forecast card
    document.getElementById('Date6').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[1].date}</b>`;
    document.getElementById('current6').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[1].day.condition.text}`;
    document.getElementById('Temp6').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[1].day.avgtemp_c}°C`;
    document.getElementById('hummidity6').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[1].day.avghumidity}%`;
    document.getElementById('crntfor6').src = `${forecastDays[1].day.condition.icon}`;
    
    // Update the second forecast card
    document.getElementById('Date7').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[2].date}</b>`;
    document.getElementById('current7').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[2].day.condition.text}`;
    document.getElementById('Temp7').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[2].day.avgtemp_c}°C`;
    document.getElementById('hummidity7').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[2].day.avghumidity}%`;
    document.getElementById('crntfor7').src = `${forecastDays[2].day.condition.icon}`;
  
    // Update the third forecast card
    document.getElementById('Date8').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[3].date}</b>`;
    document.getElementById('current8').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[3].day.condition.text}`;
    document.getElementById('Temp8').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[3].day.avgtemp_c}°C`;
    document.getElementById('hummidity8').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[3].day.avghumidity}%`;
    document.getElementById('crntfor8').src = `${forecastDays[3].day.condition.icon}`;
  
    // Update the fourth forecast card
    document.getElementById('Date9').innerHTML = `<span class="icon">&#128197;</span> <b>${forecastDays[4].date}</b>`;
    document.getElementById('current9').innerHTML = `<span class="icon">&#9728;</span> ${forecastDays[4].day.condition.text}`;
    document.getElementById('Temp9').innerHTML = `<span class="icon">&#x1F321;</span> ${forecastDays[4].day.avgtemp_c}°C`;
    document.getElementById('hummidity9').innerHTML = `<span class="icon">&#128167;</span> ${forecastDays[4].day.avghumidity}%`;
    document.getElementById('crntfor9').src = `${forecastDays[4].day.condition.icon}`;
  })
  .catch(error => console.error('Error:', error));
  }

