const path = require("path");
const express = require("express");
const hbs = require("hbs");

const getGeocode = require("./utils/geocode");
const getForecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");

// Setup handlebars engine and views locations
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static  directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Arturo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Arturo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "Get help",
    title: "Help",
    name: "Arturo",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "You must provide and address" });
  }

  getGeocode(address, (error, geocode) => {
    if (error) {
      return res.send({ error });
    }

    getForecast(geocode, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        location: geocode.location,
        forecast: data,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Missing search query!",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Arturo",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Arturo",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
