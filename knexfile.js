import path from 'path'
import Path from './src/utils/Path.js'

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(
        Path.dirname(import.meta.url),
        'src',
        'database',
        'database.db',
      ),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON ', cb),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(
        Path.dirname(import.meta.url),
        'src',
        'database',
        'knex',
        'migration',
      ),
    },
  },
}
