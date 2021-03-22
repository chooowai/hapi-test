const Boom = require('@hapi/boom');

organizerService =  undefined;
function OrganizerController(providedOrganizerService) {
    organizerService = providedOrganizerService;
}

OrganizerController.prototype.organize = (request) => {
    return organizerService.organize(request.payload);
}

// Validate the first input value (didn't use hapi validator because the input type is not formal)
OrganizerController.prototype.validateRequest = (request) => {
    const inputJson = request.payload;
    isValid = false;
    if(inputJson) {
        const firstKey = Object.keys(inputJson)[0];
        if(firstKey && !isNaN(firstKey)) {
            const firstValue = inputJson[firstKey];
            if(Array.isArray(firstValue)) {
                const firstNode = firstValue[0];
                if (firstNode) {
                    if('id' in firstNode && 'parent_id' in firstNode)
                        isValid = true;
                }
            }
        }
    }
    if (isValid) {
        return request;
    } else {
        throw Boom.badRequest('Invalid Request');
    }
}

module.exports = {
    OrganizerController: OrganizerController
}

