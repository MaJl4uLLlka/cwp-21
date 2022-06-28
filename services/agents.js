const CrudService = require('./crud');
const Joi = require('joi');

const schema = Joi.object(
    {
        id: Joi.number()
               .greater(0),

        name: Joi.string()
                 .empty()
                 .required(),

        email: Joi.string()
                  .email()
                  .required(),
                     
        tel: Joi.string()
                .empty()
                .required(),

        officeId: Joi.number()
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

class AgentsService extends CrudService {
    async create(data) {
        let agent = {
            name: data.name,
            email: data.email,
            tel: data.tel,
            officeId: data.officeId
        }

        try {
            await schema.validateAsync(agent);
        } catch (error) {
            throw this.errors.incorrectData;
        }
        
        return super.create(agent);
    }

    async update(data) {
        let agent = {
            name: data.name,
            email: data.email,
            tel: data.tel,
            officeId: data.officeId
        }

        try {
            await schema.validateAsync(agent);
        } catch (error) {   
            throw this.errors.incorrectData;
        }

        return super.update(data.id, agent);
    }

    async linkOffice(data){
        if(isNaN(data.id) || isNaN(data.officeId))
        {
            throw this.errors.invalidId;
        }

        let agent = await this.read(data.id);

        agent.officeId = data.officeId;
        return super.update(data.id, agent);
    }

    async unlinkOffice(data){
        if(isNaN(data.id))
        {
            throw this.errors.invalidId;
        }

        let agent = await this.read(data.id);

        agent.officeId = null;
        return super.update(data.id, agent);
    }

    async readProperties(data, options)
    {
        let queryOptions = {
            association: 'properties',
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

module.exports = AgentsService;