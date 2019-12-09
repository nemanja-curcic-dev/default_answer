module.exports.toAnswer = (result) => {
    return {
        id: result.id,
        advertId: result.advertId,
        type: result.type,
        message: result.message
    };
};