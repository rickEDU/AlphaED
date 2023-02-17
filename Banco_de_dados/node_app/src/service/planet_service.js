const dbPlanet = require("../repositories/DB_planet");

exports.getPlanet = async () => {
  const planets = dbPlanet.planet;
  console.log(planets); //Vê o que tem
  return planets; //repository
};