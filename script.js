let today = new Date();
let now = today.toLocaleDateString('ru-RU');
let upData = document.getElementById("up_Data");

function changeData() {
  upData.innerHTML = now;
}

changeData();


let mainCel = document.getElementById('main_cel');
let mainHumidity = document.getElementById('humidity');
let mainHumidityMain = document.getElementById('humidity_main');
let mainFeels = document.getElementById('feels');
let mainWindSpeed = document.getElementById('wind_speed');
let mainSunset = document.getElementById('sunset');
let mainSunrise = document.getElementById('sunrise');

let searchBtn = document.getElementById('search_btn');
let body = document.getElementById('body');

function changeBGI(curentWeather, lastWeather) {
  // console.log(resWeather.toLowerCase());
  // let resWeatherLower = resWeather.toLowerCase();
  // console.log('!!!   ' + resWeatherLower);

  if (lastWeather !== null) {
    body.classList.remove(lastWeather.toLowerCase());
  } 
  body.classList.add(curentWeather.toLowerCase());
}

let lastWeather = null;

searchBtn.onclick = function() {
  let search = document.getElementById('search');
  // console.log(String(search));

  const apiKey = "aa5c179fb22f3ce6953bfc714741872c";
  let city = `${search.value}`;
  // let cnt = "8";
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${cnt}&appid=${apiKey}&units=metric`;
  console.log(url);

  axios.get(url).then(res => {
    console.log(res.data);

    let resCel = Math.round(res.data.main.temp);
    let resHumidity = Math.round(res.data.main.humidity);
    let resHumidityMain = Math.round(res.data.main.humidity);
    let resFeels = Math.round(res.data.main.feels_like);
    let resWindSpeed = Math.round(res.data.wind.speed);
    let resSunrise = res.data.sys.sunrise;
    let resSunset = res.data.sys.sunset;

    let millisecondsSunrise = resSunrise * 1000;
    let dateObject = new Date(millisecondsSunrise);
    let humanDateFormatSunriseHour = dateObject.toLocaleString("ru-RU", {hour: "numeric"});
    let humanDateFormatSunriseMinute = dateObject.toLocaleString("ru-RU", {minute: "numeric"});

    let millisecondsSunset = resSunset * 1000;
    let dateObjectSet = new Date(millisecondsSunset);
    let humanDateFormatSunsetHour = dateObjectSet.toLocaleString("ru-RU", {hour: "numeric"});
    let humanDateFormatSunsetMinute = dateObjectSet.toLocaleString("ru-RU", {minute: "numeric"});

    let humanDateFormatSunrise = `${humanDateFormatSunriseHour}:${humanDateFormatSunriseMinute}`;
    let humanDateFormatSunset = `${humanDateFormatSunsetHour}:${humanDateFormatSunsetMinute}`;


    mainCel.innerHTML = resCel+"&deg;C";
    mainHumidity.innerHTML = resHumidity;
    mainHumidityMain.innerHTML = resHumidityMain;
    mainFeels.innerHTML = resFeels;
    mainWindSpeed.innerHTML = resWindSpeed;
    mainSunrise.innerHTML = humanDateFormatSunrise;
    mainSunset.innerHTML = humanDateFormatSunset;


    let resWeather = res.data.weather[0].main;

    changeBGI(resWeather, lastWeather);
    lastWeather = resWeather;
  })
}

