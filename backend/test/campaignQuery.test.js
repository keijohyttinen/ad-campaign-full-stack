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

  describe('Query campaigns', () => {
    const queryAllCampaigns = {
      query: `query getCampaign($id: ID) {
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
                id: '100000001',
                name: 'Test Ad 1',
                total_budget: 120,
              },
              {
                goal: 'Raise Awareness',
                id: '100000002',
                name: 'Test Ad 2',
                total_budget: 360,
              },
              {
                goal: 'Raise Awareness',
                id: '100000003',
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
        query: `query getCampaign($id: ID) {
          campaigns(id: $id){
            id
            name
            goal
            total_budget
          }
        }`,
        variables: { id: '100000003' },
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
                id: '100000003',
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
        query: `query getCampaign($id: ID) {
          campaigns(id: $id){
            id
            name
            goal
            total_budget
          }
        }`,
        variables: { id: '1' },
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

    it('should QUERY single platforms with fragments', (done) => {
      const querySingleCampaigns = {
        query: `query getCampaign($id: ID) {
          campaigns(id: $id){
            id
            name
            goal
            total_budget
            platforms {
                ...campaignDetailsPlatformList
            }
          }
        }
        fragment campaignDetailsPlatformList on Platforms{
            facebook {
              ...campaignDetailsPlatformRow
            }
            instagram {
              ...campaignDetailsPlatformRow
            }
        }
        fragment campaignDetailsPlatformRow on Platform{
            status
            total_budget
            remaining_budget
            start_date
            end_date
            target_audiance {
              languages
              genders
              age_range
              locations
              interests
            }
        }
        `,
        variables: { id: '100000003' },
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
                id: '100000003',
                name: 'Test Ad 3',
                platforms: {
                  facebook: {
                    end_date: '1535580000000',
                    remaining_budget: 40,
                    start_date: '1532901600000',
                    status: 'Scheduled',
                    target_audiance: {
                      languages: [
                        'EN',
                      ],
                      genders: [
                        'M',
                        'F',
                      ],
                      age_range: [
                        20,
                        65,
                      ],
                      locations: [
                        'Switzerland',
                      ],
                      interests: [
                        'Software Development',
                        'React Native',
                        'Angular',
                        'React',
                        'VueJS',
                        'Frontend Development',
                      ],
                    },
                    total_budget: 40,
                  },
                  instagram: {
                    end_date: '1535580000000',
                    remaining_budget: 40,
                    start_date: '1532901600000',
                    status: 'Scheduled',
                    target_audiance: {
                      languages: [
                        'EN',
                      ],
                      genders: [
                        'M',
                        'F',
                      ],
                      age_range: [
                        20,
                        45,
                      ],
                      locations: [
                        'Switzerland',
                      ],
                      interests: [
                        'Software Development',
                        'React Native',
                        'Angular',
                        'React',
                        'VueJS',
                        'Frontend Development',
                        'NodeJS',
                        'Facebook Developer',
                        'Wordpress',
                      ],
                    },
                    total_budget: 50,
                  },
                },
                total_budget: 90,
              },
            ],
          });
          done();
        });
    });
  });
});
