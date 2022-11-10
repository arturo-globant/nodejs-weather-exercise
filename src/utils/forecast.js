const request = require("postman-request");

const forecast = ({ latitude, longitude } = {}, callback) => {
  if (!latitude || !longitude) {
    return callback("Latitude and or longitude are empty or incomplete");
  }

  const URL_WS = `http://api.weatherstack.com/current?access_key=e6a9e266ff5bf3a2f4c2d211352f4441&query=${latitude},${longitude}`;

  request({ url: URL_WS, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to fetch weather API");
    } else if (body.error) {
      callback("There was an error with the data input");
    } else {
      const current = body.current;
      const weather_desc = current.weather_descriptions;
      const temp = current.temperature;
      const feelslike = current.feelslike;

      callback(
        undefined,
        `${weather_desc}. The temperature is ${temp}. But it feels like ${feelslike}.`
      );
    }
  });
};

module.exports = forecast;
