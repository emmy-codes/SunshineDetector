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
        displayErrorPageStyles();
        heading.innerText = "Tripped when looking for sunshine :(";
        counter.innerHTML = "We could not find your location! Please refresh the page and allow us to see your location." + 
        "<br/>" + "<div id=\"refresh-icon\"><i class=\"fas fa-redo\"></i></div>";

        const refreshButton = document.getElementById("refresh-icon");
        refreshButton.addEventListener("click", () => {
          window.location.reload();
        });
      }

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
          .catch(error => {
            displayErrorPageStyles();
            heading.innerText = "Tripped when looking for sunshine :(";
            counter.innerHTML = "Something went wrong when getting information regarding the sunset or sunrise. Please refresh the page so we can try get it for you again!" + 
            "<br/>" + "<div id=\"refresh-icon\"><i class=\"fas fa-redo\"></i></div>";

            const refreshButton = document.getElementById("refresh-icon");
            refreshButton.addEventListener("click", () => {
              window.location.reload();
            });
          })
        };


      function displayErrorPageStyles() {
        // errorModal.style.display = "none";
        document.body.style.background = "var(--dark-gray)";

        sun.style.display = "none";
        sunsetPrint.style.display = "none";
        date.style.color = "var(--light-peach)";

        centerText.style.marginTop = "15vh"

        heading.style.color = "var(--light-peach)";
        heading.style.fontSize = "3rem";
        heading.style.fontFamily = "var(--font-numbers)";
        

        counter.style.fontFamily = "var(--font-text)";
        counter.style.fontWeight = "700";
        counter.style.fontSize = "2rem";
        counter.style.color = "var(--light-peach)";
      }
    
  