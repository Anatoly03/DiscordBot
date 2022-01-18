import { createClient } from 'redis'

export const redis = createClient()
await redis.connect()

/**
 * @description For the case of the redis client failing to work.
 */
redis.on('error', function (error) {
    throw error
})

export default redis
