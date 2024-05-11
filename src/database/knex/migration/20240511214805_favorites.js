export const up = (knex) =>
  knex.schema.createTable('favorites', (table) => {
    table.increments('id')
    table
      .integer('dishe_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = (knex) => knex.schema.dropTable('favorites')
