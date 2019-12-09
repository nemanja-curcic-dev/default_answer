import {DefaultAnswer} from './index';
import logger from '@coozzy/logger';
import uniqid from 'uniqid';


module.exports.get = async (advertId) => {
    logger.debug(`Called get with advertId: ${advertId}`);

    try{
        return await DefaultAnswer.findOne({where: {advertId: advertId}});
    } catch(error) {
        logger.error(`Error occured in get: ${error}`);
        return null;
    }
};

module.exports.set = async (data) => {
    logger.debug(`Called set with ${JSON.stringify(data)}.`);

    try{
        const result = await DefaultAnswer.findOne({where: {advertId: data.advertId}});

        if(result){
            // update existing result
            return await result.update(data);
        } else {
            // set id for new default answer
            data.id = uniqid();

            return await DefaultAnswer.create(data);
        }
        
    } catch (error) {
        logger.error(`Error occured in set: ${error}`);
        return null;
    }
};