const cache = new Map();

/**
 * Get a value from the cache.
 * @param {string} key 
 * @returns {any|null} The cached value or null if not found/expired.
 */
export const getCache = (key) => {
    const item = cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
    }
    return item.value;
};

/**
 * Set a value in the cache.
 * @param {string} key 
 * @param {any} value 
 * @param {number} ttlSeconds Time to live in seconds
 */
export const setCache = (key, value, ttlSeconds = 900) => { // Default 15 mins
    const expiry = Date.now() + (ttlSeconds * 1000);
    cache.set(key, { value, expiry });
};

/**
 * Clear a specific key or the entire cache.
 */
export const clearCache = (key = null) => {
    if (key) {
        cache.delete(key);
    } else {
        cache.clear();
    }
};
