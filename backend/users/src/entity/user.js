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
            enum: UserRole,
            default: UserRole.USER
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

/*UserSchema.pre('save', function(callback) {
    var user = this;
  
    // On sort si le mdp n a pas changer
    if (!user.isModified('password')) return callback();
  
    // Si nouveau mdp on le chiffre
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);
  
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});*/

module.exports = UserSchema;

