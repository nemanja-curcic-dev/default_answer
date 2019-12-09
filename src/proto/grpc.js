import {grpcMiddleware as requestIdMiddleware} from '@coozzy/request-id';
import {grpcMiddleware as prometheusMiddleware} from '@coozzy/prometheus';

const interceptors = require('@hpidcock/node-grpc-interceptors');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

let packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '/message/default_answer/default_answer.proto'),
    {
        keepCase: true,
        longs: Number,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [
            __dirname
        ]
    }
);

const loadedObject = grpc.loadPackageDefinition(packageDefinition);

const server = interceptors.serverProxy(new grpc.Server());
server.use(requestIdMiddleware);
server.use(prometheusMiddleware);

module.exports.server = server;
module.exports.DefaultAnswerService = loadedObject.coozzy.message.default_answer.DefaultAnswerService;

