export const up = (knex) =>
  knex.schema.createTable('order-items', (table) => {
    table.increments('id')
    table.integer('dishe_id').references('id').inTable('dishes')
    table
      .integer('order_id')
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE')
    table.integer('amount').notNullable()
    table.integer('price-in-cents').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = (knex) => knex.schema.dropTable('order-items')
