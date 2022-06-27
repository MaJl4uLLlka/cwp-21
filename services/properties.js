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
                     .pattern(/^(BYN)|(USD)|(EUR)/)
                     .required(),
                     
        location: Joi.string()
                     .empty()
                     .required(),

        agentId: Joi.number()
                    .empty()
                    .required()
    }
); 

class PropertiesService extends CrudService {
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
        if(!Number.isInteger(data.id) || !Number.isInteger(data.agentId))
        {
            throw this.errors.invalidId;
        }

        let property = await this.read(data.id);

        property.agentId = data.agentId;
        return super.update(data.id, property);
    }

    async unlinkAgent(data)
    {
        if(!Number.isInteger(data.id))
        {
            throw this.errors.invalidId;
        }

        let property = await this.read(data.id);

        property.agentId = null;
        return super.update(data.id, property);
    }
}

module.exports = PropertiesService;