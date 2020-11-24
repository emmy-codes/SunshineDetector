const date = document.getElementById("date");
const variations = {weekday : "long", month : "long", day : "numeric", year : "numeric"}
const today = new Date();
const errorModal = document.getElementById("error-modal")

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
        errorModal.style.display = "block";
        let refreshButton = document.getElementById("refresh-icon");
        refreshButton.addEventListener("click", refreshPage);
      }

    function refreshPage() {
      window.location.reload();
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
  
          let sunsetPrint = document.getElementById("time");
          sunsetPrint.innerText = "Sunset: " + sunset;
          
      })
      }

      
      // .catch(error => {
      //     let errorText = document.getElementById("error")
      //     errorText.innerText = "Sorry no sunset";
      // });


    
  