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
}