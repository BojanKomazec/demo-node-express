import express from "express";
import { Request, Response } from "express";
import moment from "moment";
import axios from "axios"; // for HTTP requests
import path from "path";

const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
  res.send("<h1>Blog Home Page</h1>");
});

blogRouter.get("/post/:id", (req, res) => {
  res.send(`<h1>Viewing Blog Post ${req.params.id}</h1>`);
});

export default blogRouter;