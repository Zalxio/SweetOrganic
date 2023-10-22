const { EntitySchema } = require('typeorm');

const ProductSchema = new EntitySchema({
    name: 'Product',
    tableName: 'product',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        title: {
            type: 'varchar'
        },
        image: {
            type: 'varchar'
        },
        likes: {
            type: 'int',
            default: 0
        }
    }
});

module.exports = ProductSchema;