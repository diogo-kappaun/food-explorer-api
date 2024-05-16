export const up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('password')
    table
      .enum('role', ['admin', 'customer'], {
        useNative: true,
        enumName: 'roles',
      })
      .NotNullable()
      .default('customer')
    table.string('avatar').nullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = (knex) => knex.schema.dropTable('users')
