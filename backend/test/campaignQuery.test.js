import { use, request } from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import Campaign from '../src/db/campaign';
import serverStartupDone from '../src/index';

/* import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';
const schemaCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'graphql', 'schema.graphql'), 'utf8');
*/

use(chaiHttp);

describe('Test Campaigns API', () => {
  let expressServer;
  before(() => serverStartupDone.then((server) => {
    expressServer = server.express;
  }));
  beforeEach((done) => {
    done();
  });
  afterEach((done) => {
    done();
  });
  describe('Query campaigns', () => {
    const queryAllCampaigns = {
      query: `query getCampaign($id: Int) {
        campaigns(id: $id){
          id
          name
          goal
          total_budget
        }
      }`,
    };

    it('should QUERY all the campaigns', (done) => {
      request(expressServer)
        .post('/graphql')
        .set('content-type', 'application/json')
        .send(queryAllCampaigns)
        .end((err, res) => {
          assert.equal(err, null);
          assert.equal(res.error, false, `error: ${res.error}, text: ${res.text}`);
          assert.equal(res.status, 200);
          assert.deepStrictEqual(res.body.data, {
            campaigns: [
              {
                goal: 'Increase Reach',
                id: 100000001,
                name: 'Test Ad 1',
                total_budget: 120,
              },
              {
                goal: 'Raise Awareness',
                id: 100000002,
                name: 'Test Ad 2',
                total_budget: 360,
              },
              {
                goal: 'Raise Awareness',
                id: 100000003,
                name: 'Test Ad 3',
                total_budget: 90,
              },
            ],
          });
          done();
        });
    });
    it('should QUERY single campaign successfully', (done) => {
      const querySingleCampaigns = {
        query: `query getCampaign($id: Int) {
          campaigns(id: $id){
            id
            name
            goal
            total_budget
          }
        }`,
        variables: { id: 100000003 },
      };
      request(expressServer)
        .post('/graphql')
        .set('content-type', 'application/json')
        .send(querySingleCampaigns)
        .end((err, res) => {
          assert.equal(err, null);
          assert.equal(res.error, false, `error: ${res.error}, text: ${res.text}`);
          assert.equal(res.status, 200);
          assert.deepStrictEqual(res.body.data, {
            campaigns: [
              {
                goal: 'Raise Awareness',
                id: 100000003,
                name: 'Test Ad 3',
                total_budget: 90,
              },
            ],
          });
          done();
        });
    });
    it('should QUERY single campaign, which does not exist, successfully', (done) => {
      const querySingleCampaigns = {
        query: `query getCampaign($id: Int) {
          campaigns(id: $id){
            id
            name
            goal
            total_budget
          }
        }`,
        variables: { id: 1 },
      };
      request(expressServer)
        .post('/graphql')
        .set('content-type', 'application/json')
        .send(querySingleCampaigns)
        .end((err, res) => {
          assert.equal(err, null);
          assert.equal(res.error, false, `error: ${res.error}, text: ${res.text}`);
          assert.equal(res.status, 200);
          assert.deepStrictEqual(res.body.data, {
            campaigns: [null],
          });
          done();
        });
    });
  });
});
