module.exports = (mongoose) => {

const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const Drone = require('../models/drone')(mongoose);

    router
    .use(bodyParser.json())
    .get('/',(req, res) => {
        Drone.find({}, (err, drones) => {
            if(err) res.status(500).send(err);
            res.send(drones);
        });
    })
    .post('/insert', (req, res) => {
        var drone = req.body;
        Drone.create(drone, (err, result) => {
            if(err) res.status(500).send('Error upon insertation');
            res.send('created');
        });
    })
    .put('/Update',(req, res) => {
        var droneId = req.body._id;
        var data = req.body;
        Drone.findById(droneId, (err, drone) => {
            if(err) res.status(404).send('couldnt find drone');
            drone.position = data.position;
            drone.save((err, updatedDrone) => {
                if(err) res.status(500).send('Error while updating drone');
                res.send('drone was updated');
            });
        });
    })
    .delete('/Delete/:droneId',(req, res) => {
        var droneId = req.params.droneId;
        Drone.findByIdAndRemove(droneId, (err, result) => {
            if(err) res.status(500).send("Error: drone wasnt removed");
            res.send("remove success")
        });
    });

    return router;
}
//module.exports = router;