'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/server');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

describe('Github Test', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with correct result', async () => {
        const { request } = await server.inject('/');
        const { template, context } = request.response.source;
        expect(context.nextPage).to.equal(2);
        expect(context.previousPage).to.equal(undefined);
        expect(context.firstPage).to.equal(1);
        expect(context.lastPage).to.equal(100);
    });
});