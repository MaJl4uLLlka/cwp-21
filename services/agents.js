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

class AgentsService extends CrudService {
    async create(data) {
        let agent = {
            name: data.name,
            email: data.email,
            tel: data.tel,
            officeId: data.agentId
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
            officeId: data.agentId
        }

        try {
            await schema.validateAsync(agent);
        } catch (error) {   
            throw this.errors.incorrectData;
        }

        return super.update(data.id, agent);
    }

    async linkOffice(data){
        if(!Number.isInteger(data.id) || !Number.isInteger(data.officeId))
        {
            throw this.errors.invalidId;
        }

        let agent = await this.read(data.id);

        agent.officeId = data.officeId;
        return super.update(data.id, agent);
    }

    async unlinkOffice(data){
        if(!Number.isInteger(data.id))
        {
            throw this.errors.invalidId;
        }

        let agent = await this.read(data.id);

        agent.officeId = null;
        return super.update(data.id, agent);
    }

    async readProperties(data)
    {
        
        if(!Number.isInteger(data.id))
        {
            throw this.errors.invalidId;
        }

        return this.repository.findById(data.id, { include: 'properties' });
    }
}

module.exports = AgentsService;