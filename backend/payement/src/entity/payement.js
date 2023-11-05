const { EntitySchema } = require('typeorm');

const PaymentSchema = new EntitySchema({
    name: 'Payment',
    tableName: 'payment',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        amount: {
            type: 'decimal',
            precision: 10,
            scale: 2
        },
        currency: {
            type: 'varchar'
        },
        description: {
            type: 'text'
        },
        status: {
            type: 'varchar',
            enum: ['pending', 'success', 'failed'],
            default: 'pending'
        },
        customerId: {
            type: 'int'
        }, 
        // timestamp: {
        //     type: 'timestamp',
        //     default: () => 'CURRENT_TIMESTAMP',
        // }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true
        },
        // Ajoutez des relations supplémentaires, par exemple, une relation avec un produit.
        product: {
            type: 'many-to-one',
            target: 'Product',
            joinColumn: true
        }
    }
});

module.exports = PaymentSchema;