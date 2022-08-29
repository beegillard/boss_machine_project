const express = require('express');
const apiRouter = express.Router();

const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');
const minionsRouter = require('./minions');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);



module.exports = apiRouter;
