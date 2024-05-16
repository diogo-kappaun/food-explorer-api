export const up = (knex) =>
  knex.schema.createTable('ingredients', (table) => {
    table.increments('id')
    table
      .integer('dishe_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
    table.text('name').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = (knex) => knex.schema.dropTable('ingredients')
