const CrudService = require('./crud');
const Joi = require('joi');

const schema = Joi.object(
    {
        id: Joi.number()
               .greater(0),

        heading: Joi.string()
                    .empty()
                    .required(),

        price: Joi.number()
                  .greater(0)
                  .required(),
        
        currency: Joi.string()
                     .pattern(/^((BYN)|(USD)|(EUR)){1}$/)
                     .required(),
                     
        location: Joi.string()
                     .empty()
                     .required(),

        agentId: Joi.number()
                    .empty()
                    .required()
    }
); 

const optionsSchema = Joi.object({
    step: Joi.number()
                  .integer()
                  .default(1)
                  .min(1)
                  .max(5),

    offset: Joi.number()
               .integer()
               .greater(-1),
    
    sortOrder: Joi.string()
                  .regex(/^((asc)|(desc)){1}$/),

    sortField: Joi.string()
});

class PropertiesService extends CrudService {
    async readChunk(options){
        try{
            const value = await optionsSchema.validateAsync(options);
            
            if(value.step)  options.limit = value.step*5;

            if(value.offset) options.offset = value.offset === '0' ? +0 : parseInt(value.offset) ;

            if(value.sortOrder) options.order = value.sortOrder;

            if(value.sortField) options.orderField = value.sortField;
        }
        catch(err) { options = {
            offset: (this.defaults.readChunk.page - 1) * this.defaults.readChunk.limit
        } }
        
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

    async create(data) {
        let property = {
            heading: data.heading,
            price: data.price,
            currency: data.currency,
            location: data.location,
            agentId: data.agentId
        }

        try {
            await schema.validateAsync(property);
        } catch (error) {
            throw this.errors.incorrectData;
        }
        
        return super.create(property);
    }

    async update(data) {
        let property = {
            heading: data.heading,
            price: data.price,
            currency: data.currency,
            location: data.location,
            agentId: data.agentId
        }

        try {
            await schema.validateAsync(property);
        } catch (error) {   
            throw this.errors.incorrectData;
        }

        return super.update(data.id, property);
    }

    async linkAgent(data)
    {
        if(isNaN(data.id) || isNaN(data.agentId))
        {
            throw this.errors.invalidId;
        }

        let property = await this.read(data.id);

        property.agentId = data.agentId;
        return super.update(data.id, property);
    }

    async unlinkAgent(data)
    {
        if(isNaN(data.id))
        {
            throw this.errors.invalidId;
        }

        let property = await this.read(data.id);

        property.agentId = null;
        return super.update(data.id, property);
    }
}

module.exports = PropertiesService;