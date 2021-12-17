const express = require('express');
const router = express.Router();

const Drone = require('../models/Drone.model');
// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find({}).then(
    (drones)=>{
      res.render("drones/list",{
        drones:drones
      });
    }
  ).catch(
    (err)=>{
      console.log(err);
    }
  )
  // Iteration #2: List the drones
  // ... your code here
});

router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form");
});

router.post('/drones/create', (req, res, next) => {
  Drone.create({
    name:req.body.name,
    propellers:req.body.propellers,
    maxSpeed:req.body.maxSpeed
  }).then(
    (drone)=>{
      console.log("Success!")
      res.redirect("/drones");
    }
  ).catch(
    (err)=>{
      console.log("Error");
      res.redirect("/drones/create");
    }
    )
});

router.get('/drones/:id/edit', (req, res, next) => {
  Drone.findById(req.params.id).then(
    (drone)=>{
      res.render("drones/update-form",{
        drone:drone
      })
    }
  )
  
});

router.post('/drones/:id/edit', (req, res, next) => {
  Drone.updateOne({_id:req.params.id},{
    name:req.body.name,
    propellers:req.body.propellers,
    maxSpeed:req.body.maxSpeed
  }).then(
    (drone)=>{
      res.redirect("/drones");
    }
  ).catch(
    (err)=>{
      res.redirect(`/drones/${req.params.id}/edit`);
    }
  )
});

router.post('/drones/:id/delete', (req, res, next) => {
  Drone.findByIdAndDelete(req.params.id).then(
    ()=>{
      res.redirect("/drones")
    }
  ).catch(
    ()=>{
      console.log("ERROR");
      res.redirect("/drones");
    }
  );
});

module.exports = router;
