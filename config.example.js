/**
 * Config file
 */

var config, env;

config = {
    development: {
        db: {
            protocol: 'mongodb',
            host: '127.0.0.1',
            port: '27017',
            name: 'test'
        },
        session: {
            secret: 'test',
            maxAge: 3600000
        },
        users: [
            {
                userId: 1,
                username: 'test',
                password: '1',
            }
        ]
    },

    production: {
        db: {
            protocol: 'mongodb',
            host: '127.0.0.1',
            port: '27017',
            name: 'onion'
        },
        session: {
            secret: 'no way to see',
            maxAge: 3600000
        },
        users: [
            {
                userId: 1,
                username: 'test',
                password: '1',
            }
        ]
    }
};

env = process.env.NODE_ENV || 'development';

// Export config
module.exports = config[env];