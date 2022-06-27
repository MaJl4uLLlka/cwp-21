const CrudService = require('./crud');
const Joi = require('joi');

const schema = Joi.object(
    {
        name: Joi.string()
                 .empty(),

        email: Joi.string()
                     .pattern(/^(BYN)|(USD)|(EUR)/),
                     
        tel: Joi.string()
                .empty(),

        officeId: Joi.number()
                    .empty()
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
            const value = await schema.validateAsync(agent);
        } catch (error) {
            //TODO: add errors   
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
            const value = await schema.validateAsync(agent);
        } catch (error) {   
            //TODO: add errors
        }

        return super.update(data.id, agent);
    }
}

module.exports = AgentsService;