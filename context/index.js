module.exports = (Sequelize, config) =>{
    const options = {
        host: config.db.host,
        dialect: 'mssql',
        logging: false,
        define: {
            timestamps: true,
            paranoid:  true
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Agent = require('../models/agent')(Sequelize, sequelize);
    const Office = require('../models/office')(Sequelize, sequelize);
    const Property = require('../models/property')(Sequelize, sequelize);

    //Office -> Agent
    Agent.belongsTo(Office);
    Office.hasMany(Agent, {onDelete: "SET NULL"});
    
    //Agent -> Property
    Property.belongsTo(Agent);
    Agent.hasMany(Property, {onDelete: "SET NULL"});

    return {
        agents: Agent,
        offices: Office,
        properties: Property,

        sequelize,
        Sequelize
    };
};