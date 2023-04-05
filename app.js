window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=ja&appid=69a2d7d98282457edf5e4fb07ae0b89e&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          console.log(data.weather[0].main);

          const temp = data.main.temp;
          const weather = data.weather[0].main;
          const icon = data.weather[0].main;

          // Set DOM ELements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = weather;
          locationTimezone.textContent = data.sys.country + data.name;
          //FORUMULA FOR Fahrenheit
          let fahrenheit = temp * 1.8 + 32;
          //Set icon
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to C F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp;
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
            }
          });
        });
    });

    function setIcons(icon, iconID) {
      const skycons = new Skycons({ color: "white" });
      const currentIcon = icon.toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
  }
});
