import Sequelize from 'sequelize';
import db from '../index';

const DefaultAnswer = db.define('default-answer', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    advertId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('NO_ANSWER', 'DEFAULT', 'VIEWING_FIX', 'VIEWING_CONTACT'),
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    underscored: true
});

DefaultAnswer.sync();

module.exports = DefaultAnswer;
