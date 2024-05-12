export const up = (knex) =>
  knex.schema.createTable('dishes', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('description')
    table.integer('price-in-cents').notNullable()
    table.string('image').nullable()
    table.timestamp('created_at').default(knex.fn.now)
    table.timestamp('updated_at').default(knex.fn.now)
  })

export const down = (knex) => knex.schema.dropTable('dishes')
