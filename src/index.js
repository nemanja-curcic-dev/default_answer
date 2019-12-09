import '@babel/polyfill';

import envs from './misc/envs'; 
import logger from '@coozzy/logger';
import {init as initMetrics, shutdown as shutdownMetrics} from '@coozzy/prometheus';


import grpc from 'grpc';
import {grpcApp} from './grpc-app';


initMetrics({
    enableServer: true,
    http: false,
    grpc: true,
    amqp: false
});

// Start gRPC server
const started = grpcApp.bind(`0.0.0.0:${envs.GRPC_PORT}`, grpc.ServerCredentials.createInsecure());
if (started !== 0) {
    logger.info(`gRPC server is listening on 0.0.0.0:${envs.GRPC_PORT}`);
} else {
    logger.error(`Could not start gRPC server on 0.0.0.0:${envs.GRPC_PORT}`);
    process.exit(-1);
}
grpcApp.start();

require('./db/index');

// Shutdown handling
const shutdown = () => {
    logger.info('SIGTERM/SIGINT received');

    shutdownMetrics();
    
    // Shutting down gRPC server
    grpcApp.tryShutdown(function () {
        logger.info('gRPC server was shut down gracefully');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
