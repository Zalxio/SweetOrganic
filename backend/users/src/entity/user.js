const { EntitySchema } = require('typeorm');

const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        lastname: {
            type: 'varchar'
        },
        age: {
            type: 'int',
            default: 0
        }
    }
});

module.exports = UserSchema;

