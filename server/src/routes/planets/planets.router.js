// router koji obrađuje samo requestove koji se ulogički povezani za planets

const express = require("express");

// importaj controllere za planets i to eksplicitno
const { httpGetAllPlanets } = require("./planets.controller");

// kreiraj instancu express Routera imena planetsRouter
const planetsRouter = express.Router();

// /planets/
planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
