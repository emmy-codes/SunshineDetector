 //time-current
 const time = document.getElementById("time");
 const todayTime = new Date();
 time.innerHTML =  todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();

//show sunset time
const sunsetPrint = document.getElementById("time-sun")

//date
const date = document.getElementById("date");
const variations = {weekday : "long", month : "long", day : "numeric", year : "numeric"}
const today = new Date();

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
        alert('Sorry, no position available.');
      }

      function getAPI (x, y) {
        const lat = x
        const long = y
        const url = "https://cors-anywhere.herokuapp.com/https://api.geodatasource.com/city"
        const apiKey = "S5RRHG5VS6G7CPBGRXUYUAVFS44W6ZXO"
  
        const requestURL = url.concat("?key=",apiKey,"&lat=", lat, "&lng=", long)
  
      //   fetch(requestURL)
      //   .then(response => response.json())
      //   .then(data => console.log(data));
      // }

      fetch(requestURL)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => {
          const sunset = data.sunset;
          // console.log(sunset)

          sunsetPrint.innerText = "Sunset: " + sunset; })
      }
  

      
      // .catch(error => {
      //     let errorText = document.getElementById("error")
      //     errorText.innerText = "Sorry no sunset";
      // });
    
    
    //  function calculateCountdown(){
    //     const second = 1000,
    //           minute = second * 60,
    //           hour = minute * 60;
    //      let countdown = new Date(sunsetSetData)
    //      console.log(countdown);

    //     //   let x = setInterval(function(){
    //     //   let now = new Date().getTime();
    //     //   let distance = countdown - now;

    //     // document.getElementById("hours").innerText = Math.floor((distance / (hour))),
    //     // document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
    //     // document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

         
    //  }
    //  calculateCountdown();