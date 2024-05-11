export const up = (knex) =>
  knex.schema.createTable('dishes', (table) => {
    table.increments('id')
    table.string('name')
    table.string('description')
    table.string('image').nullable()
    table.timestamp('created_at').default(knex.fn.now)
    table.timestamp('updated_at').default(knex.fn.now)
  })

export const down = (knex) => knex.schema.dropTable('dishes')
