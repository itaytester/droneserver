module.exports = (mongoose) => {

    const express = require('express');
    const bodyParser = require('body-parser');
    const router = express.Router();
    const Drone = require('../models/drone')(mongoose);
    const Target = require('../models/target');

    router
        .use(bodyParser.json())
        .get('/', (req, res) => {
            Drone.find({}, (err, drones) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.send(drones);
            });
        })
        .post('/Insert', (req, res) => {
            var drone = req.body;
            Drone.create(drone, (err, result) => {
                if (err) res.status(500).send('Error upon inseration');
                res.send(result);
            });
        })
        .post('/LinkTarget', (req, res) => {
            var targetId = req.body.targetId;
            var droneId = req.body.droneId;
            Drone.findById(droneId, (err, drone) => {
                if (err) res.status(404).send('drone not found');
                drone.target_id = targetId;
                drone.save((err, updatedDrone) => {
                    if (err) res.status(500).send('Error while updating target of drone');
                    res.send(targetId);
                });
            });
        })
        .post('/Update', (req, res) => {
            var droneId = req.body._id;
            var data = req.body;
            Drone.findById(droneId, (err, drone) => {
                if (err) res.status(404).send('could not find drone');
                drone.position = data.position;
                drone.save((err, updatedDrone) => {
                    if (err) res.status(500).send('Error while updating drone');
                    if (updatedDrone.target_id)
                        Target.findById(updatedDrone.target_id, (err, target) => {
                            if (err) res.send('could not find target in db');
                            res.send(target.position);
                        });
                    else
                        res.send('drone updated');
                });
            });
        })
        .delete('/Delete/:droneId', (req, res) => {
            var droneId = req.params.droneId;
            Drone.findByIdAndRemove(droneId, (err, result) => {
                if (err) res.status(500).send("Error: drone was not removed");
                res.send(result)
            });
        });

    return router;
}

//module.exports = router;