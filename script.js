 //time-current
 const time = document.getElementById("time");
 const todayTime = new Date();
 time.innerHTML =  todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();

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

// const errorModal = document.getElementById("error-modal");

//Counter time
const counterHours = document.getElementById("hours");
const counterMinutes = document.getElementById("minutes");
const counterSeconds = document.getElementById("seconds");


date.innerHTML = today.toLocaleDateString("en-US", variations);

const options = {
    enableHighAccuracy: false, 
    maximumAge: 30000, 
    timeout: 10000
  };

const getLocation = navigator.geolocation.getCurrentPosition(success, error, options);

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
          let sunset = data.sunset;
          // console.log(sunset);
          sunsetPrint.innerText = "Sunset: " + sunset;
          })
          // .catch(error => {
          //   displayErrorPageStyles();
          //   heading.innerText = "Tripped when looking for sunshine :(";
          //   counter.innerHTML = "Something went wrong when getting information regarding the sunset or sunrise. Please refresh the page so we can try get it for you again!" + 
          //   "<br/>" + "<div id=\"refresh-icon\"><i class=\"fas fa-redo\"></i></div>";

          //   const refreshButton = document.getElementById("refresh-icon");
          //   refreshButton.addEventListener("click", () => {
          //     window.location.reload();
          //   });
          // })
      };


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
        document.body.style.background = "var(--dark-gray)";
        centerText.style.color = "var(--light-peach)";
        header.style.color = "var(--light-peach)";
        sun.classList.add('moon');
      }
    
    
    //  function calculateCountdown(){
    //     const second = 1000,
    //           minute = second * 60,
    //           hour = minute * 60;
    //      let countdown = new Date(sunsetSetData)
    //      console.log(countdown);

    //     //   let x = setInterval(function(){
    //     //   let now = new Date().getTime();
    //     //   let distance = countdown - now;

    //     // counterHours.innerText = Math.floor((distance / (hour))),
    //     // counterMinutes.innerText = Math.floor((distance % (hour)) / (minute)),
    //     // counterSeconds.innerText = Math.floor((distance % (minute)) / second);

         
    //  }
    //  calculateCountdown();