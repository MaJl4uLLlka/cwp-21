const CrudController = require('./crud');

class AgentsController extends CrudController {
    constructor(agentsService) {
        super(agentsService);

        this.readAll = this.readAll.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        res.json(posts);
    }
}

module.exports = (agentsService) => {
    const controller = new AgentsController(
        agentsService
    );

    return controller.router;
};