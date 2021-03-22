const OrganizerController = require('../controllers/organizer.controller');
const GithubControllerModule = require('../controllers/github.controller');
const GithubServiceModule = require('../services/github.service');
const Joi = require('joi');

const githubService = new GithubServiceModule.GithubService();
const githubController = new GithubControllerModule.GithubController(githubService);

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
        handler: githubController.fetch,
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
        handler: githubController.render,
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