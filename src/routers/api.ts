import express from "express";
import { Request, Response } from "express";
import moment from "moment";
import axios from "axios"; // for HTTP requests
import path from "path";

const apiRouter = express.Router();

// router.get("/", (req, res) => {
//   res.json({ message: "Hello from Express + TypeScript!" });
// });

// Serve the landing page at root path
// router.get("/", (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, "../public/landing.html"));
// });

apiRouter.get("/time", (req, res) => {
    const currentTime = moment().format("DD-MM-YYYY HH:mm:ss");
    res.json({ time: currentTime });
  });

// New Route: Fetch data from a remote API
apiRouter.get("/fetch-todo", async (req, res) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });

  apiRouter.get("/weather-london", async (req, res) => {
    try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: 51.5074, // London
            longitude: -0.1278,
            current_weather: true
        }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

apiRouter.get("/weather", async (req: Request, res: Response) => {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
         res.status(400).json({ error: "Latitude and Longitude are required" });
         return;
      }

      const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true
        }
      });

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

export default apiRouter;
