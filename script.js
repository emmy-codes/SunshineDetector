const options = {
    enableHighAccuracy: false, 
    maximumAge: 30000, 
    timeout: 10000
  };
const getLocation = navigator.geolocation.getCurrentPosition(success, error, options);

    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getAPI(latitude, longitude);
    }

    function error () {
        alert('Sorry, no position available.');
      }

      function getAPI (lat, long){
        let apiAddress = `https://api.geodatasource.com/city?key=S5RRHG5VS6G7CPBGRXUYUAVFS44W6ZXO&lat=${lat}&lng=${long}`;
    }