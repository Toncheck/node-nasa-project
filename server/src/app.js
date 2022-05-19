//app.js se odnosi samo na globalne middlewarove i globalne konfiguracije dolazećih requestova te uvlačenje pojedinih tokena i slično

// import modula za rad s putanjama za fileove i direktorije
const path = require("path");

const express = require("express");

// import cors modula iz instaliranog 3rd party library packagea kako bi se riješio CORS za sve requestove
const cors = require("cors");

// const morgan modula iz 3rd party library packagea koji skuži kao http request logger za node.js
const morgan = require("morgan");

// importaj Router za Versioning
const api = require("./routes/api");

// kreiraj express instancu
const app = express();

// globalni Middleware koji koristi cors object i rješava CORS za sve requestove
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// globalni Middleaware koji će za svaki request kreirati log (izabran je combined tip loga)
app.use(morgan("combined"));

// glovbalni Middleware za parsanje svih dolazećih requestova iz json formata
app.use(express.json());

// globalni Middleware za dohvaćanje svih static fileova, a to su oni koji nastanu buildom Frontenta (ovdje je projekt setupiran tako da se sve odvija na istom portu, kao da smo već u deployment fazi). Prema tome korištenjem ovod Middlewarea i express.static će app dobiti pristup svim static fileovimea koji se nalaze na predanoj putanji, a ovdje je to public folder. S time će korisnik na PORTU 800o (ako nije drugačije zadao) dobiti pristup na putanju /index.html , a to je file na kojem se nalazi React SPA = PROBLEM
app.use(express.static(path.join(__dirname, "..", "public")));

// globalni Middleware za Versioning
app.use("/v1", api);

//OVO MORA BITI ZADNJE U OVOM server.js fileu
// da bi se riješio gornji PROBLEM potrebno je applikaciji reći da na putanji / mora servirati upravo index.html na kojem se prikazuje sve
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// exportaj app kako bi server u server.js mogao promatrati taj app (event loop)
module.exports = app;
