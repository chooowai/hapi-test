'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const GitHubControllerModule = require('../src/controllers/github.controller');
const githubController = require('../src/controllers/github.controller');
const githubResponse = require('./github_res.json');

// Unit test for Github Controller as we don't want to use Internet
describe('Github Controller Unit Test', () => {
    // Mock GithubService
    const githubServiceStub = {
        fetchRepos: async (pageNumber) => {
            return new Promise((resolve, reject) => {
                resolve(githubResponse);
            });
        }
    }
    const gitHubController = new GitHubControllerModule.GithubController(githubServiceStub);

    const request = {query: {page: 1}};
    const reply = {
        view: (template, data) => {
            return (template, data);
        }
    }


    it('next page must be 2 if the current page is 1', async () => {
        await githubController.render(request, reply).then(context => {
            expect(context.nextPage).to.equal(2);
        });
    });

    it('previous page must not exist if the current page is 1', async () => {
        await githubController.render(request, reply).then(context => {
            expect(context.previousPage).to.equal(undefined);
        });
    });

    it('first page must be 1', async () => {
        await githubController.render(request, reply).then(context => {
            expect(context.firstPage).to.equal(1);
        });
    });

    it('last page must be 100 as GitHub max limit is 1000', async () => {
        await githubController.render(request, reply).then(context => {
            expect(context.lastPage).to.equal(100);
        });
    });

    it('10 items must be returned as result', async () => {
        await githubController.render(request, reply).then(context => {
            expect(context.result.length).to.equal(10);
        });
    });
});