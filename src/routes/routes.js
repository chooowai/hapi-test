const OrganizerController = require('../controllers/organizer.controller');
const GithubController = require('../controllers/github.controller');
const Joi = require('joi');

module.exports = [
    // the post method for organizer challenge
    {
        method: "POST",
        path: "/organizer",
        handler: OrganizerController.organize,
        config: {
            tags: ['api'],
            description: "Organize the children nodes in parent node",
            pre: [{ method: OrganizerController.validateRequest}],
            validate: {
                payload: Joi.object({
                }).unknown(true)
            }
        }
    },
    // the get method for github challenge
    {
        method: "GET",
        path: "/github-repo",
        handler: GithubController.fetch,
        config: {
            tags: ['api'],
            description: "Fetch the repository details from Github",
            validate: {
                query: Joi.object({
                    page: Joi.number().integer().min(1)
                })
            }
        }
    },
    // frontend view for Github search
    {
        method: 'GET',
        path: '/',
        handler: GithubController.render,
        config: {
            tags: ['api'],
            description: "Display results from Github",
            validate: {
                query: Joi.object({
                    page: Joi.number().integer().min(1)
                })
            }
        }
    }
];