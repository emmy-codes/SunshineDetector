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

      function getAPI (x, y){
      const lat = x
      const long = y
      const url = "https://api.sunrise-sunset.org/json"
      const requestURL = url.concat("&lat=", lat, "&lng=", long)

      fetch(requestURL)
      .then(response => response.json())
      .then(data => console.log(data));
      }






      // const lat = x
      // const long = y
      // const url = "https://api.geodatasource.com/city"
      // const apiKey = "S5RRHG5VS6G7CPBGRXUYUAVFS44W6ZXO"

      // const requestURL = url.concat("?key=",apiKey,"&lat=", lat, "&lng=", long)

      // fetch(requestURL)
      // .then(response => response.json())
      // .then(data => console.log(data));


      // // let apiAddress = `https://api.geodatasource.com/city?key=S5RRHG5VS6G7CPBGRXUYUAVFS44W6ZXO&lat=${lat}&lng=${long}`;
      // //   fetch(apiAddress)
      // //   .then(response => response.json())
      // //   .then(data => console.log(data));