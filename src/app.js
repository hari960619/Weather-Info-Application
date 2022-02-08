let path = require("path");
let express = require("express");
let hbs = require("hbs");
let foreCast = require("./utils/foreCast");
let geoCode = require("./utils/geoCode");

let app = express();
let publicDirectoryPath = path.join(__dirname, "../public");
let viewsPath = path.join(__dirname, "../public/templates/views");
let partialsPath = path.join(__dirname, "../public/templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Harish S",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Harish S",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Harish S",
    message: "Hi, How can I help You ?",
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorPage", {
    name: "Harish S",
    errorInfo: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an Address.",
    });
  }
  return geoCode(
    req.query.address,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      foreCast(latitude, longitude, (error, { foreCast }) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          Searched_Address: req.query.address,
          Latitude: latitude,
          Longitude: longitude,
          ForeCast: foreCast,
          Place_Name: placeName,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must specify the products.",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "Error: 404",
    name: "Harish S",
    errorInfo: "Page does not Exist",
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000.");
});
