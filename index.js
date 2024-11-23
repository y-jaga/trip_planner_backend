const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  createItinerary,
  getItinerary,
} = require("./controllers/dataController");

const {
  getFlights,
  getHotels,
  getSites,
  getFilghtsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation
} = require("./controllers/itineraryController");

const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/itinerary", createItinerary);
app.get("/itinerary/:id", getItinerary);

app.get("/data/flights", getFlights);
app.get("/data/hotels", getHotels);
app.get("/data/sites", getSites);

app.get("/flights/search", getFilghtsByOriginAndDestination);
app.get("/hotels/search", getHotelsByLocation);
app.get("/sites/search", getSitesByLocation);

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error("Unable to connect to database", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
