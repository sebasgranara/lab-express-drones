// Iteration #1
require("../db");
const Drone = require("../models/Drone.model");

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

Drone.create(drones).then(
  (drones)=>{
    console.log(`${drones.length} inserted`);
    mongoose.disconnect();
  }
).catch(
  (err)=>{
    console.error(err);
    mongoose.disconnect();
  }
)