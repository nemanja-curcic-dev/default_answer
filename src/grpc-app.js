import logger from '@coozzy/logger';
import {ErrorCode} from '@coozzy/error';
import {DefaultAnswerService, server} from './proto/grpc';
import {get, set} from './db/db';
import {toAnswer} from './helpers/helpers';

server.addService(DefaultAnswerService.service, {
    replace: replace2,
    Get: getAnswer,
    Set: setAnswer,
});

async function replace2(call) {
    logger.debug(`Received replace RPC call: ${JSON.stringify(call.request)}`);
    call.metadata.add('method', 'replace');
}

async function getAnswer(call, callback) {
    logger.debug(`Received Get RPC call: ${JSON.stringify(call.request)}`);

    const result = await get(call.request.advertId);

    if(!result){
        return callback({
            code: ErrorCode.NOT_FOUND,
            message: 'Advert with provided id not found.'
        });
    }

    return callback(null, {answer: toAnswer(result.dataValues)});
}

async function setAnswer(call, callback) {
    logger.debug(`Received Set RPC call: ${JSON.stringify(call.request)}`);

    if(call.request.advertId === ''){
        return callback({
            code: ErrorCode.INVALID_ARGUMENT,
            message: 'You must provide advertId.'
        });
    }

    const result = await set(call.request);

    if(!result) {
        return callback({
            code: ErrorCode.INTERNAL,
            message: 'Internal server error.'
        });
    }
    
    return callback(null, {answer: toAnswer(result.dataValues)});
}

module.exports.grpcApp = server;
