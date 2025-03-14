import express from 'express';

// Assuming router is in routers/index.ts
// import router from "./routers";
import apiRouter from './routers/api';
import blogRouter from './routers/blog';

import path from "path";

const app = express();
// TODO: const PORT = process.env.PORT || 3000;
const PORT = 3000;

console.log("__dirname", __dirname);

app.use(express.json()); // Middleware to parse JSON

// === ROUTERS ===

// Use routers
// http://localhost:3000/api/weather-london
// Prefix all API routes with /api
app.use("/api", apiRouter);

// Prefix all blog routes with /blog
app.use("/blog", blogRouter);

// === STATIC PAGES ===

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Serve static files from the "node_modules" directory
// It serves files from node_modules/leaflet/dist/ as if they were inside /libs/leaflet.
// It does NOT create a physical directory like /public/libs/leaflet.
// When a browser requests /libs/leaflet/leaflet.js, Express will map it to ../node_modules/leaflet/dist/leaflet.js and serve it.
app.use(
  "/libs/leaflet",
  express.static(path.join(__dirname, "../node_modules/leaflet/dist"))
);
console.log("Serving Leaflet from:", path.join(__dirname, "../node_modules/leaflet/dist"));


// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript Express!');
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// Serve the landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});


// Route to serve weather-map.html at /weather-map
app.get("/weather-map", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/weather-map.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
