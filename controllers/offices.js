const CrudController = require('./crud');

class OfficesController extends CrudController {
    constructor(officesService) {
        super(officesService);

        this.readAll = this.readAll.bind(this);
        this.readAgents = this.readAgents.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];
        this.routes['/:id/agents'] = [{ method: 'get', cb: this.readAgents }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        res.json(posts);
    }

    async readAgents(req,  res){
        res.json(
            await this.service.readAgents(req.params)
        );
    }
}

module.exports = (officesService) => {
    const controller = new OfficesController(
        officesService
    );

    return controller.router;
};