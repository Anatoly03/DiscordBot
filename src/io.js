import { createClient } from 'redis'

export const redis = createClient()
let redis_key = 'community-manager-'

/**
 * @description For the case of the redis client failing to work.
 */
redis.on('error', function (error) {
    throw error
})

/**
 * @param {string} key
 * @returns {Promise<string>} Data that was stored to the redis client
 * @description Gets key and then executes callback handing over the value as
 * parameter. If the value wasn't saved yet, returns default value defined in
 * default.json
 */
export function get(key) {
    return new Promise((resolve, reject) => {
        redis.get(redis_key + key, async (err, reply) => {
            if (err != null) reject(err)
            resolve(reply)
        })
    })
}

/**
 * @param {string} key
 * @param {function (object) : any} operation The operation that will edit the object.
 * @returns {object} New value of key is the returned value of an array function, or
 * if that is null, the operation edit on the shallow function.
 * @description Get data from the redis client and edit it with an array function.
 */
/*export async function edit (key, operation) {
    let data = await get(key)
    let value = operation(data)
    await exports.set(key, typeof value == 'object' ? value : data)
    return typeof value == 'object' ? value : data
}*/

/**
 * @param {string} key
 * @param {object | string} value
 * @description Gets key and then executes callback handing over the value as
 * parameter. If the value wasn't saved yet, returns default value defined in
 * default.json
 */
export function set(key, value) {
    if (typeof value == 'object') value = JSON.stringify(value)

    return new Promise((resolve, reject) => {
        redis.set(redis_key + key, value, (err, _) => {
            if (err) reject(err)
            resolve()
        })
    })
}

export default {
    set,
    get,
}
