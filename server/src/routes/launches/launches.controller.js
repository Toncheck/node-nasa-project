const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  // Kao response se vraćaju samo values iz launches Map. JSON Može biti kreiran samo uz nekih stvari, a jedna je Array, a ovdje je kreiran Array od svih launches values kako bi se mogli podaci pretvoriti u json format
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  // stari princip provjere je li unesen datum ili je nekaj drugo launch.launchDate.toString() === "Invalid Date"
  // ovo dolje je izvedeno s isNaN i to je posve lud trik koji je objašnjen u videu 125
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  // funkcija je async pa treba napraviti await
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  const existsLaunch = await existsLaunchWithId(launchId);

  // if launch doesn't exist
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  //if launch exists
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not abroted",
    });
  }
  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
