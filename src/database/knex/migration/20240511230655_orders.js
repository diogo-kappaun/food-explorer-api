export const up = (knex) =>
  knex.schema.createTable('orders', (table) => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users')
    table.integer('total-in-cents').notNullable()
    table.text('status').default('pendente').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = (knex) => knex.schema.dropTable('orders')
