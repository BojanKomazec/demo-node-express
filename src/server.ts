import express from 'express';
import routes from "./routes";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// Use routes
// http://localhost:3000/api/weather-london
app.use("/api", routes);


app.use(express.static(path.join(__dirname, "../public"))); // Serve static files


// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript Express!');
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

