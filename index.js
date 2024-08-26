require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(bodyParser.json());

app.get("/api/bookings", async (req, res) => {
  const { auth, startDate, endDate, offset } = req.query;
  console.log(req.query, "bookings queryyyyyyyyyyyyyyy");
  console.log({ auth }, { startDate }, { endDate }, { offset });
  const url = `https://api.icabbicanada.com/ca2/bookings/history/?order=closed_date&from=${startDate}T00:30:00&to=${endDate}T23:30:00&Order=id&direction=DESC&status=COMPLETED&offset=${offset}&limit=50`;
  // const url = `https://api.icabbicanada.com/ca2/bookings/history/?order=closed_date&from=2024-08-21T00:30:00&to=2024-08-21T23:30:00&Order=id&direction=DESC&status=COMPLETED&offset=500&limit=499`;
// const url = "https://api.icabbicanada.com/ca2/bookings/history/?order=closed_date&from=2023-08-22T00:30:00&to=2024-08-22T23:30:00&Order=id&direction=DESC&status=COMPLETED&offset=500&limit=499"
  console.log(url, "bookings urlllllllllllllllllllllllllllllll");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

app.get("/api/driver", async (req, res) => {
  const { auth, startDate, endDate } = req.query;
  console.log(req.query, "driver queryyyyyyyyyyyyyyy");
  console.log({ auth }, { startDate }, { endDate });

  const url = `https://api.icabbicanada.com/ca2/drivers/hours/?from=${startDate}T00:30:00&to=${endDate}T23:30:00`;
  // const url = `https://api.icabbicanada.com/ca2/drivers/hours/?from=2024-08-21T00:30:00&to=2024-08-21T23:30:00`;
  console.log(url, "driver urlllllllllllllllllllllllllllllll");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });
 
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`app is runing on ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
