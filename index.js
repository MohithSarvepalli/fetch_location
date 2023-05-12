function getCookies() {
    var cookies = document.cookie.split(';');
    var result = "Cookies:<br>";
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        result += cookie + "<br>";
    }
    document.getElementById("result-cookies").innerHTML = result;
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + latitude + '+' + longitude + '&key=59760c8bbe0d4f8da93a83b82371be62')
      .then(function(response) {
        const state = response.data.results[0].components.state;
        const result = `Latitude: ${latitude}<br>Longitude: ${longitude}<br>State: ${state}`;
        document.getElementById("location").innerHTML = result;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
async function getIPAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ipAddress = data.ip;
    return ipAddress;
}

function displayIPAddress() {
    const ipAddressElement = document.getElementById('ip-address');
    getIPAddress().then((ipAddress) => {
        ipAddressElement.textContent = `Your IP address is ${ipAddress}`;
    });
}

// Create a cookie with a name "myCookie" and a value "someValue"
document.cookie = "myCookie=someValue";

// Create a cookie with a name "myCookie" and a value "someValue" that expires in 30 days
var date = new Date();
date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
document.cookie = "myCookie=someValue; expires=" + date.toGMTString() + "; path=/";
