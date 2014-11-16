/**
 * Config example file
 */

var config, env;

config = {
    development: {
        db: {
            protocol: 'mongodb',
            host: '127.0.0.1',
            port: '27017',
            name: 'test'
        }
    },

    production: {
        db: {
            protocol: 'mongodb',
            host: '127.0.0.1',
            port: '27017',
            name: 'onion'
        }
    }
};

env = process.env.NODE_ENV || 'development';

// Export config
module.exports = config[env];