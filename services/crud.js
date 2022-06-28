const Joi = require('joi');

const optionsSchema = Joi.object({
    limit: Joi.number()
                  .integer()
                  .greater(0),

    offset: Joi.number()
               .integer()
               .greater(-1),
    
    sortOrder: Joi.string()
                  .regex(/^((asc)|(desc)){1}$/),

    sortField: Joi.string()
});

class CrudService {
    constructor(repository, errors) {
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 10,
                page: 1,
                order: 'asc',
                orderField: 'id'
            }
        };
    }

    async readChunk(options) {
        try{
            const value = await optionsSchema.validateAsync(options);
            
            if(value.limit)  options.limit = value.limit;

            if(value.offset) options.offset = value.offset === '0' ? +0 : parseInt(value.offset);

            if(value.sortOrder) options.order = value.sortOrder;

            if(value.sortField) options.orderField = value.sortField;
        }
        catch(err) { options = {
            offset: (this.defaults.readChunk.page - 1) * this.defaults.readChunk.limit
        }}

        options = Object.assign({}, this.defaults.readChunk, options);
        let limit = options.limit;
        let offset = options.offset;

        return await this.repository.findAll({
            limit: limit,
            offset: offset,
            order: [[options.orderField, options.order.toUpperCase()]],
            raw: true
        });
    }

    async read(id) {
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.findByPk(id, { raw: true });

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }

    async create(data) {
        const item = await this.repository.create(data);

        return item.get({ plain: true });
    }

    async update(id, data) {
        await this.repository.update(data, { where: { id: id }, limit: 1 });

        return this.read(id);
    }

    async delete(id) {
        return this.repository.destroy({ where: { id: id } });
    }
}

module.exports = CrudService;