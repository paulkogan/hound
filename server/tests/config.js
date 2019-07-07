const defaults = require('superagent-defaults');
const supertest = require('supertest');
const app = require('../app');

const request = defaults(supertest(app));

//request.set({ Authorization: `Bearer ${process.env.API_KEY}` });

beforeEach(() => {
  jest.clearAllMocks();
});

module.exports = {
  request,
};
