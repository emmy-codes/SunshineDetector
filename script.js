 //time-current
 const time = document.getElementById("time");

//show sunset time
const sunsetPrint = document.getElementById("time-sun");

//show city
let city = "";
const cityPrint = document.getElementById("city");

//date
const date = document.getElementById("date");
const variations = {weekday : "long", month : "long", day : "numeric", year : "numeric"}
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", variations);

//Elemnts
const header = document.getElementById("header")
const heading = document.getElementById("info");
const counter = document.getElementById("countdown");
const sun = document.getElementById("sun");
const sunWarpper = document.getElementById("sun-wrapper");
const centerText = document.getElementById("center-text");
const sky = document.getElementsByClassName("sky");
const twinkles = document.getElementsByClassName("stars");
const hideLoading = document.querySelector(".loader");
const sunsetTimer = document.querySelector("#time-sun");
const clouds = document.getElementById("clouds");
const cloud = document.querySelectorAll(".cloud");

const mountain1 = document.getElementsByClassName("mountain1");
const mountain2 = document.getElementsByClassName("mountain2");
const mountain3 = document.getElementsByClassName("mountain3");
const mountain4 = document.getElementsByClassName("mountain4");
const mountain5 = document.getElementsByClassName("mountain5");
const mountain6 = document.getElementsByClassName("mountain6");
const mountain7 = document.getElementsByClassName("mountain7");
const mountain8 = document.getElementsByClassName("mountain8");
const mountain9 = document.getElementsByClassName("mountain9");
const mountain10 = document.getElementsByClassName("mountain10");


// API information
let randomAdvice;
let sunset;
let sunrise;
let sunsetArr;
let sunriseArr;

//Store time of Right now
let hours
let minutes


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
  const apiKey = "SYB4ORNCL6KQTWYWUEE83XDWPVXYQNSZ"
  
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
    sunsetTimer.classList.remove("hidden");
    clouds.classList.remove("hidden");


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
 clouds.style.display = "none";

 centerText.style.marginTop = "15vh";
 centerText.style.color = "var(--light-peach)";
 date.style.color = "var(--light-peach)";
 time.style.color = "var(--light-peach)";

 heading.style.fontSize = "2.5rem";
 heading.style.fontFamily = "var(--font-numbers)";
 counter.style.fontSize = "1.5rem";

 heading.classList.remove("hidden");
 hideLoading.classList.add("hidden");
 sunsetTimer.classList.remove("hidden");
}

function activateNightMode() {
  centerText.style.marginTop = "25vh";
  document.body.style.background = "black";
  centerText.style.color = "var(--light-peach)";
  header.style.color = "var(--light-peach)";
  sun.classList.add('moon');
  sky[0].classList.add('nightsky');
  twinkles[0].classList.add('twinkles');
  clouds.style.display = "none";
}


function activateTwilightMode() {
  document.body.style.background = "linear-gradient(var(--dark-gray), var(--linen))";
  sun.style.top = "25vh";
  centerText.style.color = "var(--light-peach)";
  header.style.color = "var(--light-peach)";
  mountain1[0].classList.add('twilight1');
  mountain4[0].classList.add('twilight1');
  mountain7[0].classList.add('twilight1');
  mountain10[0].classList.add('twilight1');
  mountain2[0].classList.add('twilight2');
  mountain5[0].classList.add('twilight2');
  mountain8[0].classList.add('twilight2');
  mountain3[0].classList.add('twilight3');
  mountain6[0].classList.add('twilight3');
  mountain9[0].classList.add('twilight3');
  cloud[0].classList.add('cloud-twilight');
  cloud[1].classList.add('cloud-twilight');
}


function checkTime() {
  sunsetArr = sunset.split(':');
  sunriseArr = sunrise.split(':');

  if (parseInt(hours) > parseInt(sunriseArr[0]) && 
    parseInt(hours) < parseInt(sunsetArr[0]) || 
    parseInt(hours) === parseInt(sunriseArr[0]) && 
    parseInt(minutes) > parseInt(sunriseArr[1]) || 
    parseInt(hours) === parseInt(sunsetArr[0]) && 
    parseInt(minutes) < parseInt(sunsetArr[1])) {
      console.log("Middle of the day")
      calculateCountDownSunset();

  } else if (parseInt(hours) > parseInt(sunsetArr[0]) || 
    parseInt(hours) === parseInt(sunsetArr[0]) && 
    parseInt(minutes) > parseInt(sunsetArr[1])) {
      console.log("After sunset, before midnight")
      calculateCountDownSunriseBeforeMidnight()

  } else if (parseInt(hours) < parseInt(sunriseArr[0]) || 
    parseInt(hours) === parseInt(sunriseArr[0]) && 
    parseInt(minutes) < parseInt(sunsetArr[1])) { 
      console.log("After midnight, before sunrise");
      calculateCountDownSunriseAfterMidnight()
    };
};

function calculateCountDownSunset () {
  let newDate = new Date();
  let calculateSunsetDate = newDate.setHours(parseInt(sunsetArr[0]), parseInt(sunsetArr[1]));
  sunsetPrint.innerText = "Time of Sunset: " + sunset;

  let x = setInterval(function() {
    let today = new Date().getTime();
    let distance = calculateSunsetDate - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    heading.innerText = "Time until sunset";
    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";

    if (minutes <= 30 && hours === 0) {
      activateTwilightMode();
    }

    else if (distance <= 0) {
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

      activateNightMode();
      sunsetPrint.innerText ="Time of Sunrise: " + sunrise

  let y = setInterval(function() {
    let today = new Date().getTime();
    let distance = calSunTomorrow - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    heading.innerText = "Time until sunrise";
    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";

    if (distance <= 0) {
      clearInterval(y);
      calculateCountDownSunriseAfterMidnight()
    }
  }, 1000);
}

function calculateCountDownSunriseAfterMidnight() {
  let newDate = new Date();
  let calculateSunriseDate = newDate.setHours(parseInt(sunriseArr[0]), parseInt(sunriseArr[1]));

  activateNightMode();
  sunsetPrint.innerText ="Time of Sunrise: " + sunrise

  let y = setInterval(function() {
    let today = new Date().getTime();
    let distance = calculateSunriseDate - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    heading.innerText = "Time until sunrise";
    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";

    if (distance <= 0) {
      clearInterval(y);
      window.location.reload();
    }
  }, 1000);
}


sunWarpper.addEventListener("click", getAPIAdvice);

function getAPIAdvice() {
  const requestAdviceURL = "https://api.adviceslip.com/advice";

  fetch(requestAdviceURL)
  .then(response => response.json())
  .then(data => {
    randomAdvice = data.slip.advice;
    displayAdvice();
  })
  .catch(error => {
    displayAdviceError();
  });
};

function displayAdvice(){
  let printRandomAdvice = document.getElementById("random-advice")
  let randomAdviceModal = document.getElementById("random-advice-modal");
  randomAdviceModal.style.display = "block";
  printRandomAdvice.innerHTML = randomAdvice;

  let close = document.getElementsByClassName("close")[0];
  close.onclick = function() {
  randomAdviceModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == randomAdviceModal) {
      randomAdviceModal.style.display = "none";
    }
  }
}

function displayAdviceError(){
  let printRandomAdvice = document.getElementById("random-advice")
  let randomAdviceModal = document.getElementById("random-advice-modal");
  randomAdviceModal.style.display = "block";
  printRandomAdvice.innerText = "No news are good news.";

  let close = document.getElementsByClassName("close")[0];
  close.onclick = function() {
    randomAdviceModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == randomAdviceModal) {
      randomAdviceModal.style.display = "none";
    }
  }
}





