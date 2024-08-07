import knex from 'knex'
import config from '../../../knexfile.cjs'

export const dbConnection = knex(config.development)
