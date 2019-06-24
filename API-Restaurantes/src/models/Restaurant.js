import Sequelize from 'sequelize';
import { sequilize } from '../database/database';
import Vacancy from './Vacancy';

const Restaurant = sequilize.define('restaurants',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    restaurant_name: {
        type: Sequelize.TEXT
    },
    address: {
        type: Sequelize.TEXT
    },
    bussiness_name: {
        type: Sequelize.TEXT
    },
    rfc: {
        type: Sequelize.TEXT
    },
    postal_code: {
        type: Sequelize.INTEGER
    },
    city: {
        type: Sequelize.TEXT
    },
    state: {
        type: Sequelize.TEXT
    },
    phone: {
        type: Sequelize.TEXT
    },
    opening_time: {
        type: Sequelize.TEXT
    },
    contact_name: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

Restaurant.hasMany(Vacancy, { foreignKey: 'restaurant_id', sourceKey: 'id'} );
Vacancy.belongsTo(Restaurant, { foreignKey: 'restaurant_id', sourceKey: 'id'});

export default Restaurant;