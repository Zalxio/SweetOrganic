const { EntitySchema } = require('typeorm');

const UserRole = {
    ADMIN : "admin",
    USER : "user"
}

const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        role: {
            type: "enum",
            //enum: UserRole,
            //default: UserRole // UserRole.USER ou UserRole.ADMIN
            type: "enum",
            enum: ['admin', 'user'],
            default: 'user'
        },
        username:{
            type: 'varchar',
            unique: true,
            required: true
        },
        password:{
            type: 'varchar',
            required: true
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