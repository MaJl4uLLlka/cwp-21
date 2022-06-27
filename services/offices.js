const CrudService = require('./crud');
const Joi = require('joi');

const schema = Joi.object(
    {
        title: Joi.string()
                 .empty(),
                     
        website: Joi.string()
                .empty(),

        address: Joi.string()
                    .empty()
    }
); 

class OfficesService extends CrudService {
    async create(data) {
        let office = {
            title: data.title,
            website: data.website,
            address: data.address
        }

        try {
            const value = await schema.validateAsync(office);
        } catch (error) {
            //TODO: add errors   
        }
        
        return super.create(office);
    }

    async update(data) {
        let office = {
            title: data.title,
            website: data.website,
            address: data.address
        }

        try {
            const value = await schema.validateAsync(office);
        } catch (error) {   
            //TODO: add errors
        }

        return super.update(data.id, office);
    }
}

module.exports = AgentsService;