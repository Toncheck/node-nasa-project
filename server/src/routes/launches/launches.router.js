// router koji obrađuje samo requestove koji se ulogički povezani za launches

const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

// kreiraj instancu express Routera imena launchesRouter
const launchesRouter = express.Router();

// /planets/
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
