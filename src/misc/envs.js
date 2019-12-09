/* eslint-disable no-process-env */

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: (process.env.LOG_LEVEL || 'debug').toLowerCase(),
    HTTP_PORT: parseInt(process.env.HTTP_PORT) || 3000,
    
    GRPC_PORT: parseInt(process.env.GRPC_PORT) || 50051,
    
    DATABASE_URL: process.env.DATABASE_URL || 'mysql://default_answer:default_answer@mysql:3306/default_answer',
};
