 //time-current
 const time = document.getElementById("time");
//  const todayTime = new Date();
//  time.innerHTML =  todayTime.getHours() + ":" + todayTime.getMinutes();

//show sunset time
const sunsetPrint = document.getElementById("time-sun");

//show city
let city = "";
const cityPrint = document.getElementById("city");

//date
const date = document.getElementById("date");
const variations = {weekday : "long", month : "long", day : "numeric", year : "numeric"}
const today = new Date();

const header = document.getElementById("header")
const heading = document.getElementById("info");
const counter = document.getElementById("countdown");
const sun = document.getElementById("sun");
const centerText = document.getElementById("center-text");
const sky = document.getElementsByClassName("sky");
const clouds = document.getElementsByClassName("clouds");
const hideLoading = document.querySelector(".loader");


// API information
let sunset;
let sunrise;
let sunsetArr;
let sunriseArr;

//Store time of Right now
let hours
let minutes

date.innerHTML = today.toLocaleDateString("en-US", variations);

function timeRightNow() {
  setInterval(function() {
    const todayTime = new Date();
    hours = todayTime.getHours();
    minutes = todayTime.getMinutes();

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      time.innerHTML = hours + ":" + minutes;
    }, 1000);
}
timeRightNow();


const options = {
    enableHighAccuracy: false, 
    maximumAge: 30000, 
    timeout: 10000
};

const getLocation = navigator.geolocation.getCurrentPosition(success, error, options);

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getAPI(latitude, longitude);
};

function error () {
  displayErrorPageStyles();
  heading.innerText = "Tripped when looking for sunshine :(";
  counter.innerHTML = "We could not find your location! Please refresh the page and allow us to see your location." + 
  "<br/>" + "<div id=\"refresh-icon\"><i class=\"fas fa-redo\"></i></div>";
  const refreshButton = document.getElementById("refresh-icon");
  refreshButton.addEventListener("click", () => {
  window.location.reload();
  });
};

function getAPI (x, y) {
  const lat = x
  const long = y
  const url = "https://cors-anywhere.herokuapp.com/https://api.geodatasource.com/city"
  const apiKey = "JNHBEJJ3GUSDENNYOYFUIOOO7KM5PCZP"
  
  const requestURL = url.concat("?key=",apiKey,"&lat=", lat, "&lng=", long)
        
fetch(requestURL)
  .then(response => response.json())
  .then(data => {
    sunset = data.sunset;
    sunrise = data.sunrise;
    city = data.city;
    cityPrint.innerText = "Location: " + city;
    checkTime();
    heading.classList.remove("hidden");
    hideLoading.classList.add("hidden");
  })
  .catch(error => {
    displayErrorPageStyles();
    heading.innerText = "Tripped when looking for sunshine :(";
    counter.innerHTML = "Something went wrong when getting information regarding the sunset or sunrise. Please refresh the page so we can try get it for you again!" + 
    "<br/>" + "<div id=\"refresh-icon\"><i class=\"fas fa-redo\"></i></div>";
    const refreshButton = document.getElementById("refresh-icon");
      refreshButton.addEventListener("click", () => {
      window.location.reload();
      });
   });
}; 

function displayErrorPageStyles() {
 document.body.style.background = "var(--dark-gray)";
 sun.style.display = "none";  
 sunsetPrint.style.display = "none";

 centerText.style.marginTop = "15vh";
 centerText.style.color = "var(--light-peach)";
 date.style.color = "var(--light-peach)";
 time.style.color = "var(--light-peach)";

 heading.style.fontSize = "2.5rem";
 heading.style.fontFamily = "var(--font-numbers)";
}

function activateNightMode() {
  document.body.style.background = "black";
  centerText.style.color = "var(--light-peach)";
  header.style.color = "var(--light-peach)";
  sun.classList.add('moon');
  sky[0].classList.add('nightsky');
  clouds[0].classList.add('twinkles');
}

function checkTime() {
  sunsetArr = sunset.split(':');
  sunriseArr = sunrise.split(':');

  if (parseInt(hours) > parseInt(sunriseArr[0]) && 
    parseInt(hours) < parseInt(sunsetArr[0]) || 
    parseInt(hours) === parseInt(sunriseArr[0]) && 
    parseInt(minutes) < parseInt(sunriseArr[1]) || 
    parseInt(hours) === parseInt(sunsetArr[0]) && 
    parseInt(minutes) < parseInt(sunsetArr[1])) {

      console.log("Middle of the day")
      calculateCountDownSunset();

  } else if (parseInt(hours) > parseInt(sunsetArr[0]) || 
    parseInt(hours) === parseInt(sunsetArr[0]) && 
    parseInt(minutes) > parseInt(sunsetArr[1])) {

      console.log("After sunset, before midnight")
      activateNightMode();
      calculateCountDownSunriseBeforeMidnight()

  } else if (parseInt(hours) < parseInt(sunriseArr[0]) || 
    parseInt(hours) === parseInt(sunriseArr[0]) && 
    parseInt(minutes) < parseInt(sunsetArr[1])) { 
      
      console.log("After midnight, before sunrise");
      activateNightMode();
      calculateCountDownSunriseAfterMidnight()
    };
};

function calculateCountDownSunset () {
  let newDate = new Date();
  let calculateSunsetDate = newDate.setHours(parseInt(sunsetArr[0]), parseInt(sunsetArr[1]));

  let x = setInterval(function() {
    let today = new Date().getTime();
    let distance = calculateSunsetDate - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";
    sunsetPrint.innerText = "Sunset: " + sunset;

    if (distance < 0) {
      clearInterval(x);
      calculateCountDownSunriseBeforeMidnight();
    }
  }, 1000);
}     

function calculateCountDownSunriseBeforeMidnight() {
  let newDate = new Date();
  let calculateSunriseDate = newDate.setHours(parseInt(sunriseArr[0]), parseInt(sunriseArr[1]));
  let calSunTomorrow = new Date(calculateSunriseDate);
      calSunTomorrow.setDate(calSunTomorrow.getDate() + 1);

  let y = setInterval(function() {
    let today = new Date().getTime();
    let distance = calSunTomorrow - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";
    heading.innerText = "Time until sunrise";
    sunsetPrint.innerText ="Sunrise: " + sunrise

    if (distance < 0) {
      clearInterval(y);
      calculateCountDownSunriseAfterMidnight()
    }
  }, 1000);
}

function calculateCountDownSunriseAfterMidnight() {
  let newDate = new Date();
  let calculateSunriseDate = newDate.setHours(parseInt(sunriseArr[0]), parseInt(sunriseArr[1]));

  let y = setInterval(function() {
    let today = new Date().getTime();
    let distance = calculateSunriseDate - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    heading.innerText = "Time until sunrise";
    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";
    sunsetPrint.innerText ="Sunrise: " + sunrise

    if (distance < 0) {
      clearInterval(y);
      window.location.reload();
    }
  }, 1000);
}