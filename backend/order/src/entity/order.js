const { EntitySchema } = require('typeorm');

const UserSchema = new EntitySchema({
    name: 'Order_Product',
    tableName: 'order_product',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        idUser: {
            type: 'int'
        },
        articles: {
            type: 'varchar'
        },
        articlesPrices: {
            type: 'int'
        },
        price: {
            type: 'int',
            default: 0
        }
    }
});

module.exports = UserSchema;

