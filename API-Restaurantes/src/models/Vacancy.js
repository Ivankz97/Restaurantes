import Sequelize from 'sequelize';
import { sequilize } from '../database/database';

const Vacancy = sequilize.define('vacancy', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    time: {
        type: Sequelize.INTEGER
    },
    id_payment: {
        type: Sequelize.INTEGER
    },
    benefits: {
        type: Sequelize.TEXT
    },
    validity_post: {
        type: Sequelize.INTEGER
    },
    restaurant_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

export default Vacancy;