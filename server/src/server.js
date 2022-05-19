//server.js služi samo za konfiguraciju servera i http te websocket konekcija

// importaj http module
const http = require("http");

// importiraj .env package za Environment varijable
require("dotenv").config(); // metoda config napravi dostupnima sve environment varijable iz .env filea

// importaj kreiranju instancu express app-a iz app.js
const app = require("./app");

//
const { mongoConnect } = require("./services/mongo");

//
const { loadPlanetsData } = require("./models/planets.model");

//
const { loadLaunchData } = require("./models/launches.model");

// definiraj PORT kao varijablu koja je defaultno 8000 ili ju može korisnik odrediti evironment varijablom prilikom pokretanja servera
const PORT = process.env.PORT || 8001;

// kreiraj server za već kreiranju instancu express aplikacije
const server = http.createServer(app);

//

// ova async funkcija je samo zato što await ne može biti top level pa je morao biti wrapan
async function startServer() {
  // spoji se na MongoDB prije nego se pokrene server kako bi svi podaci bili inicijalno dostupni
  await mongoConnect();

  console.log("prije loadPlanetsData");
  // loadPlanetsData je metoda koja vraća Promise te se ovdje radi await. To je isto kao da piše then(). Tek kad je taj await izvršen onda kod ide dalje. Ovdje je to tako izvedeno jer bi server krenuo slušati na datom PORTU prije neg ima podataka potrebnih i onda nastane greška.
  await loadPlanetsData();

  // load SpaceX data for initial server startup
  await loadLaunchData();

  console.log("poslije loadPlanetsData");
  // aktiviraj kreirani server da radi na definiranom PORTU
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
  });
  console.log("poslije servera");
}

startServer();
