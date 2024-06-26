export const up = (knex) =>
  knex.schema.createTable('dishes', (table) => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('description')
    table.integer('price_in_cents').notNullable()
    table.text('image_id').nullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = (knex) => knex.schema.dropTable('dishes')
