const form = document.querySelector("form");
const search = document.querySelector("#location-text");
const locationParagraph = document.getElementById("location");
const forecastParagraph = document.getElementById("forecast");
const errorParagraph = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  locationParagraph.innerText = "Loading...";
  forecastParagraph.innerText = "";

  fetch("/weather?address=" + address).then((res) => {
    res.json().then(({ error, location, forecast } = {}) => {
      if (error) {
        locationParagraph.innerText = "";
        errorParagraph.innerText = error;
      } else {
        errorParagraph.innerText = "";
        locationParagraph.innerText = location;
        forecastParagraph.innerText = forecast;
      }
    });
  });
});
