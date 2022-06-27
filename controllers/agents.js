const CrudController = require('./crud');

class AgentsController extends CrudController {
    constructor(agentsService) {
        super(agentsService);

        this.readAll = this.readAll.bind(this);
        this.linkOffice = this.linkOffice.bind(this);
        this.unlinkOffice = this.unlinkOffice.bind(this);
        this.readProperties = this.readProperties.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];
        this.routes['/:id/link/:officeId'] = [{ method: 'post', cb: this.linkOffice }];
        this.routes['/:id/unlink'] = [{ method: 'post', cb: this.unlinkOffice }];
        this.routes['/:id/properties'] = [{ method: 'get', cb: this.readProperties }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        res.json(posts);
    }

    async linkOffice(req, res){
        res.json(
            await this.service.linkOffice(req.params)
        );
    }

    async unlinkOffice(req, res){
        res.json(
            await this.unlinkOffice(req.params)
        );
    }

    async readProperties(req, res){
        res.json(
            await this.service.readProperties(req.params)
        );
    }
}

module.exports = (agentsService) => {
    const controller = new AgentsController(
        agentsService
    );

    return controller.router;
};