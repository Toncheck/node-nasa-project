const express = require("express");

// importaj router koji se odnosi na requestove za planets
const planetsRouter = require("./planets/planets.router");
// importaj router koji se odnosi na requestove za planets
const launchesRouter = require("./launches/launches.router");

const api = express.Router();

// Middleware kojim se uključuju svi requestovi koji se odnose na planets
api.use("/planets", planetsRouter);
// Middleware kojim se uključuju svi requestovi koji se odnose na planets
api.use("/launches", launchesRouter);

module.exports = api;
