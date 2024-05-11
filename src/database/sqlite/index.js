import path from 'path'
import * as sqlite from 'sqlite'
import sqlite3 from 'sqlite3'
import Path from '../../utils/Path.js'

export default async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(Path.dirname(import.meta.url), '..', 'database.db'),
    driver: sqlite3.Database,
  })

  return database
}
