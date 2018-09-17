import assert from 'assert';
import fs from 'fs';
import path from 'path';
import serverStartupDone from '../src/index';

const request = require('supertest');

function binaryParser(res, callback) {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', (chunk) => {
    res.data += chunk;
  });
  res.on('end', () => {
    callback(null, Buffer.from(res.data, 'binary'));
  });
}

const imageRequest = (expressServer, imageName) => new Promise((resolve, reject) => {
  request(expressServer)
    .get(`/images/${imageName}`)
    .set('content-type', 'application/json')
    .buffer()
    .parse(binaryParser)
    .end((err, res) => {
      if (err) {
        reject(err);
      }
      assert.ok(Buffer.isBuffer(res.body));
      const originalImageBuf = fs.readFileSync(path.resolve(`./resources/images/${imageName}`));
      assert.ok(originalImageBuf.equals(res.body), 'Image got not match with original');
      assert.equal(res.error, false, `error: ${res.error}, text: ${res.text}`);
      assert.equal(res.status, 200);
      resolve();
    });
});

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
  /* after(() => {
    expressServer.
  }); */
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
    it('should get all images successfully', () => {
      const imageNames = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];
      return Promise.each(imageNames, imageName => imageRequest(expressServer, imageName));
    });
  });
});
