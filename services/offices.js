const CrudService = require('./crud');
const Joi = require('joi');

const schema = Joi.object(
    {
        id: Joi.number()
               .greater(0),

        title: Joi.string()
                 .empty()
                 .required(),
                     
        website: Joi.string()
                .empty()
                .required(),

        address: Joi.string()
                    .empty()
                    .required()
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
            await schema.validateAsync(office);
        } catch (error) {
            throw this.errors.incorrectData;
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
            await schema.validateAsync(office);
        } catch (error) {   
            throw this.errors.incorrectData;
        }

        return super.update(data.id, office);
    }

    async readAgents(data)
    {
        
        if(isNaN(data.id))
        {
            throw this.errors.invalidId;
        }

        return this.repository.findByPk(data.id, {include: 'agents'});
    }
}

module.exports = OfficesService;