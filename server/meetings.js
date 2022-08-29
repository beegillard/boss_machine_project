const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db');

//get to get array of all meetings
meetingsRouter.get('/', (req, res) => {
    const allMeetings = db.getAllFromDatabase('meetings');
    res.status(200).send(allMeetings);
})

//post to create new meeting and save it to db
meetingsRouter.post('/', (req, res) => {
    const newMeeting = db.createMeeting();
    if (newMeeting) {
        db.addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    } else {
        res.status(400).send();
    }
})

//delete to delete all meetings from db
meetingsRouter.delete('/', (req, res) => {
    const isDeleted = db.deleteAllFromDatabase('meetings');
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})







module.exports = meetingsRouter;

