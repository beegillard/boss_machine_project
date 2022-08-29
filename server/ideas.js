const express = require('express');
const ideasRouter = express.Router();
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.use('/:ideasId', (req, res, next) => {
    const idea = db.getFromDatabaseById('ideas', req.params.ideasId);
    if (!idea) {
        res.status(404).send()
    } else {
        next();
    }
})

//get api ideas to get an array of all ideas
ideasRouter.get('/', (req, res) => {
    const allIdeas = db.getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
})

//post api ideas to create new idea and save it to db
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = req.body;
    if (newIdea) {
        db.addToDatabase('ideas', newIdea);
        res.status(201).send(newIdea);
    } else {
        res.status(400).send();
    }
})

//get api ideas :ideaId to get a single idea by id
ideasRouter.get('/:ideaId', (req, res) => {
    const foundIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (foundIdea) {
        res.status(200).send(foundIdea);
    } else {
        res.status(404).send();
    }
})

//put api ideas :ideaId to update single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    let updatedIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (updatedIdea) {
        updatedIdea = req.body;
        db.updateInstanceInDatabase('ideas', updatedIdea);
        res.status(200).send(updatedIdea);
    } else {
        res.status(404).send();
    }
})

//delete api ideas :ideaId to delete single idea by id
ideasRouter.delete('/:ideasId', (req, res) => {
    const deletedIdea = db.deleteFromDatabasebyId('ideas', req.params.ideasId);
    if (deletedIdea) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

module.exports = ideasRouter;