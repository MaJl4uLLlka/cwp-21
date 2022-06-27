const CrudService = require('./crud');
const Joi = require('joi');

const schema = Joi.object(
    {
        heading: Joi.string()
                    .empty(),

        price: Joi.number()
                  .greater(0)
                  .required(),
        
        currency: Joi.string()
                     .pattern(/^(BYN)|(USD)|(EUR)/),
                     
        location: Joi.string()
                     .empty(),

        agentId: Joi.number()
                    .empty()
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
            const value = await schema.validateAsync(property);
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
            const value = await schema.validateAsync(property);
        } catch (error) {   
            throw this.errors.incorrectData;
        }

        return super.update(data.id, property);
    }
}

module.exports = PropertiesService;