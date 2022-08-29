const express = require('express');
const minionsRouter = express.Router();
const db = require('./db');

//get api minions to get an array of all minions
minionsRouter.get('/', (req, res) => {
    const allMinions = db.getAllFromDatabase('minions');
    res.status(200).send(allMinions);
})

//post api minions to create a new minion and save to db
minionsRouter.post('/', (req, res) => {
    const newMinion = req.body;
    if ( typeof newMinion.name === 'string' 
        && typeof newMinion.title === 'string' && typeof newMinion.salary === 'number') {
            db.addToDatabase('minions', newMinion);
            res.status(201).send(newMinion);
        } else {
            res.status(400).send('Wrong input type');
    }
})

//get api mions :minionid to get single minion by id
minionsRouter.get('/:minionsId', (req, res) => {
    const foundMinion = db.getFromDatabaseById('minions', req.params.minionsId);
    if (foundMinion) {
        res.status(200).send(foundMinion)
    } else {
        res.status(404).send();
    }
})

//put api minions :minionid to update single minion by id
minionsRouter.put('/:minionsId', (req, res) => {
    let updatedMinion = db.getFromDatabaseById('minions', req.params.minionsId);
    if (updatedMinion) {
        updatedMinion = req.body;
        db.updateInstanceInDatabase('minions', updatedMinion)
        res.status(200).send(updatedMinion);
    } else {
        res.status(404).send();
    }
})

//delete api minions :minion id to delete single minion by id
minionsRouter.delete('/:minionId', (req, res) => {
    const isDeleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})



module.exports = minionsRouter;