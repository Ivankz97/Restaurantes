import Sequelize from 'sequelize';
import { sequilize } from '../database/database';

const User = sequilize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    last_name: {
        type: Sequelize.TEXT
    },
    e_mail: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    },
    phone: {
        type: Sequelize.TEXT
    },
    postal_code: {
        type: Sequelize.INTEGER
    },
    experience: {
        type: Sequelize.TEXT
    },
    token: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

export default User;