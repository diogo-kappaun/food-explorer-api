export const up = (knex) =>
  knex.schema.createTable('dishes', (table) => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('description')
    table.integer('price-in-cents').notNullable()
    table.text('image').nullable()
    table.timestamp('created_at').default(knex.fn.now)
    table.timestamp('updated_at').default(knex.fn.now)
  })

export const down = (knex) => knex.schema.dropTable('dishes')
