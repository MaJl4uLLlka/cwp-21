const CrudController = require('./crud');

class OfficesController extends CrudController {
    constructor(officesService) {
        super(officesService);

        this.readAll = this.readAll.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        res.json(posts);
    }
}

module.exports = (officesService) => {
    const controller = new OfficesController(
        officesService
    );

    return controller.router;
};