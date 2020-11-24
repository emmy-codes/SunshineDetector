const date = document.getElementById("date");
const sunsetPrint = document.getElementById("time");
const heading = document.getElementById("info");
const counter = document.getElementById("countdown");
const sun = document.getElementById("sun");
const centerText = document.getElementById("center-text");
const variations = {weekday : "long", month : "long", day : "numeric", year : "numeric"}
const today = new Date();
const errorModal = document.getElementById("error-modal");


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
        displayErrorPage();
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
          let sunset = data.sunset;
          // console.log(sunset);
  
          
          sunsetPrint.innerText = "Sunset: " + sunset;
          
      })
      .catch(error => {
        displayErrorPage();
      })
      };

      function displayErrorPage() {
        errorModal.style.display = "none";
        document.body.style.background = "var(--dark-gray)";

        sun.style.display = "none";
        sunsetPrint.style.display = "none";

        date.style.color = "var(--light-peach)";
        centerText.style.marginTop = "15vh"
        
        heading.style.color = "var(--light-peach)";
        heading.style.fontSize = "3rem";
        heading.style.fontFamily = "var(--font-numbers)";
        heading.innerText = "Tripped when looking for sunshine :(";

        counter.style.fontFamily = "var(--font-text)";
        counter.style.fontWeight = "700";
        counter.style.fontSize = "2rem";
        counter.innerHTML = "We could not find your location! Please refresh the page and allow us to see your location." + 
        "<br/>" + "<div id=\"refresh-icon\"><i class=\"fas fa-redo\"></i></div>";

        counter.style.color = "var(--light-peach)";

        const refreshButton = document.getElementById("refresh-icon");
        refreshButton.addEventListener("click", () => {
          window.location.reload();
        });
      
      }
    
  