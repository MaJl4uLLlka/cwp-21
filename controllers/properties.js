const CrudController = require('./crud');

class PropertiesController extends CrudController {
    constructor(propertiesService) {
        super(propertiesService);

        this.readAll = this.readAll.bind(this);
        this.linkAgent = this.linkAgent.bind(this);
        this.unlinkAgent = this.unlinkAgent.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];
        this.routes['/:id/link/:agentId'] = [{method:'post', cb: this.linkAgent}];
        this.routes['/:id/unlink'] = [{method:'post', cb: this.unlinkAgent}];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        res.json(posts);
    }

    async linkAgent(req, res){
        res.json(
            await this.service.linkAgent(req.params)
        );
    }

    async unlinkAgent(req, res){
        res.json(
            await this.service.unlinkAgent(req.params)
        );
    }
}

module.exports = (propertiesService) => {
    const controller = new PropertiesController(
        propertiesService
    );

    return controller.router;
};