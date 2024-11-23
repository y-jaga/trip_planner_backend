const axios = require("axios");
const {
  validateFlightQueryParams,
  validateHotelsQueryParams,
  validateSitesQueryParams,
} = require("../validations/index");

const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

const getFilghtsByOriginAndDestination = async (req, res) => {
  const errors = validateFlightQueryParams(req.query);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const { origin, destination } = req.query;
    const response = await axiosInstance.get(
      `/flights/search?origin=${origin}&destination=${destination}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight details." });
  }
};

const getHotelsByLocation = async (req, res) => {
  const errors = validateHotelsQueryParams(req.query);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const { location } = req.query;
    const response = await axiosInstance.get(
      `/hotels/search?location=${location}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels details." });
  }
};

const getSitesByLocation = async (req, res) => {
  const errors = validateSitesQueryParams(req.query);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const { location } = req.query;
    const response = await axiosInstance.get(
      `/sites/search?location=${location}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sites details." });
  }
};

const getFlights = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;
    const response = await axiosInstance.get(
      `/flights?test_error=${test_error}&rate_limit=${rate_limit}`,
      {
        headers: {
          CLIENT_KEY: process.env.CLIENT_KEY,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }

    res.status(500).json({ error: "Failed to fetch flights." });
  }
};

const getHotels = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;

    const response = await axiosInstance.get(
      `/hotels?test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
};

const getSites = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;

    const response = await axiosInstance.get(
      `/sites?test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }

    res.status(500).json({ error: "Failed to fetch sites." });
  }
};

module.exports = {
  getFlights,
  getHotels,
  getSites,
  getFilghtsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation
};
