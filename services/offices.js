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

const optionsSchema = Joi.object(
    {
        limit: Joi.number()
                  .integer()
                  .greater(0),

        offset: Joi.number()
                   .integer()
                   .greater(-1)
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

    async readAgents(data, options)
    {
        let queryOptions = {
            association: 'agents',
            limit: 10,
            offset: 0
        };

        if(isNaN(data.id))
        {
            throw this.errors.invalidId;
        }

        try{
            let value = await optionsSchema.validateAsync(options);
            
            if(value.limit)
            {
                queryOptions.limit = value.limit;
            }

            if(value.offset)
            {
                queryOptions.offset =  value.offset;
            }
        }
        catch(err){}

        return this.repository.findByPk(data.id, {include: queryOptions});
    }
}

module.exports = OfficesService;