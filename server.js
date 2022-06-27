const express = require('express');
const bodyParser = require('body-parser');

const errors = require('./helpers/errors');

const AgentsService = require('./services/agents');
const PropertiesService = require('./services/properties');
const OfficesService = require('./services/offices');

module.exports = (db, config) =>{
    const app = express();

    //Services
    const agentsService = new AgentsService(db.agents, errors);
    const propertiesService = new PropertiesService(db.properties, errors);
    const officesService = new OfficesService(db.offices, errors);

    //Controllers
    const error = require('./global-controllers/error');

    const apiController = require('./controllers/api')(
        agentsService,
        officesService,
        propertiesService
    );

    app.use(bodyParser.json());

    app.use('/api', apiController);
    app.use('/api', error);

    return app;
}