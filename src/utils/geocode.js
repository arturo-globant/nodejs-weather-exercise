const request = require("postman-request");

const getGeocode = (address, callback) => {
  const URL_MB = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=pk.eyJ1IjoiYXJ0dXJvZ2FzY29uIiwiYSI6ImNsYTc0cncwcjEwam0zdnRwZjNkbHRzMmMifQ.89und-5tJFsZoWQY8Bo_pw&limit=1`;

  request({ url: URL_MB, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to fetch geocode API");
    } else if (body.features.length === 0) {
      callback("Location not found");
    } else {
      const data = body.features[0];

      const latitude = data.center[1];
      const longitude = data.center[0];
      const location = data.place_name;

      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = getGeocode;
