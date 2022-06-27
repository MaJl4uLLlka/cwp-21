const express = require('express');

module.exports = (
    agentsService,
    officesService,
    propertiesService
) =>{
    const router = express.Router();

    const agentsController = require('./agents')(agentsService);
    const propertiesController = require('./properties')(propertiesService);
    const officesController = require('./offices')(officesService);

    router.use('/agents', agentsController);
    router.use('/properties', propertiesController);
    router.use('/offices', officesController);

    return router;
}