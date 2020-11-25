 //time-current
 const time = document.getElementById("time");
//  const todayTime = new Date();
//  time.innerHTML =  todayTime.getHours() + ":" + todayTime.getMinutes();

//show sunset time
const sunsetPrint = document.getElementById("time-sun");

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


// API information
let sunset = "";
let sunrise = "";

date.innerHTML = today.toLocaleDateString("en-US", variations);

function timeRightNow() {
  setInterval(function() {
    const todayTime = new Date();
    time.innerHTML =  todayTime.getHours() + ":" + todayTime.getMinutes();
    }, 1000);
}
timeRightNow();


const options = {
    enableHighAccuracy: false, 
    maximumAge: 30000, 
    timeout: 10000
  };

// const getLocation = navigator.geolocation.getCurrentPosition(success, error, options);

    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(longitude, latitude)
        getAPI(latitude, longitude);
    }

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
        const apiKey = "S5RRHG5VS6G7CPBGRXUYUAVFS44W6ZXO"
  
        const requestURL = url.concat("?key=",apiKey,"&lat=", lat, "&lng=", long)
        
        fetch(requestURL)
          .then(response => response.json())
          // .then(data => console.log(data))
          .then(data => {
          sunset = data.sunset;
          sunrise = data.sunrise;
          // console.log(sunset);
          sunsetPrint.innerText = "Sunset: " + sunset;
          console.log(sunset)
          calculateCountDown();
        })
      } 

      function displayErrorPageStyles() {
        document.body.style.background = "var(--dark-gray)";

        sun.style.display = "none";
        time.style.display = "none";
        sunsetPrint.style.display = "none";

        date.style.color = "var(--light-peach)";
        centerText.style.marginTop = "15vh";
        centerText.style.color = "var(--light-peach)";

        heading.style.fontSize = "3rem";
        heading.style.fontFamily = "var(--font-numbers)";
        

        counter.style.fontFamily = "var(--font-text)";
        counter.style.fontWeight = "700";
        counter.style.fontSize = "2rem";
      }

      function activateNightMode() {
        document.body.style.background = "black";
        centerText.style.color = "var(--light-peach)";
        header.style.color = "var(--light-peach)";
        sun.classList.add('moon');
        sky[0].classList.add('nightsky');
        clouds[0].classList.add('twinkles');
      }


  function calculateCountDown () {
    let sunArr = sunset.split(':');
    let calculateSunsetDate = new Date();
    let calsun = calculateSunsetDate.setHours(parseInt(sunArr[0]), parseInt(sunArr[1]));

   let countDownDate = calculateSunsetDate.getTime();

   let x = setInterval(function() {
    let today = new Date().getTime();

    let distance = calsun - today;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      // calculateCountDownSunrise();
      clearInterval(x);
      }
    }, 1000);
  }
      

  function calculateCountDownSunrise() {
    heading.innerText = "Time until sunrise";
      
    let sunArr = sunrise.split(':');
    let calculateSunriseDate = new Date();
    let calsun = calculateSunriseDate.setHours(parseInt(sunArr[0]), parseInt(sunArr[1]))
    let countDownDate = calculateSunriseDate.getTime();

    let y = setInterval(function() {
      let today = new Date().getTime();
  
      let distance = calsun - today;
     distance = (midnight - today) + (calsun - today)
  
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      counter.innerText = hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
          clearInterval(y);
          window.location.reload();
          }
      }, 1000);
  }