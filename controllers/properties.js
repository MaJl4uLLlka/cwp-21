const CrudController = require('./crud');

class PropertiesController extends CrudController {
    constructor(propertiesService) {
        super(propertiesService);

        this.readAll = this.readAll.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        res.json(posts);
    }
}

module.exports = (propertiesService) => {
    const controller = new PropertiesController(
        propertiesService
    );

    return controller.router;
};