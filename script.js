// OpenWeather API key
const API_KEY = 'db9b042e4440b5702ba54793e3d43197';

// Handle form submission
document.getElementById('weatherForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('cityInput').value;
  getWeatherData(city);
});

// Fetch weather data from OpenWeather API
function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
      document.getElementById('errorMessage').style.display = 'none';
    })
    .catch(error => {
      document.getElementById('weatherInfo').style.display = 'none';
      document.getElementById('errorMessage').style.display = 'block';
    });
}

// Display weather data on the page
function displayWeatherData(data) {
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('temperature').textContent = `${data.main.temp}°C`;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('windSpeed').textContent = data.wind.speed;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById('weatherInfo').style.display = 'block';
}
