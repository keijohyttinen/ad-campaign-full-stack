import { use, request } from 'chai';
import chaiHttp from 'chai-http';
import Campaign from '../src/db/campaign';
import server from '../src/index';

use(chaiHttp);

describe('Campaigns', () => {
  beforeEach((done) => {
    Campaign.remove({}, () => {
      done();
    });
  });
  describe('/POST query campaigns', () => {
    const query = `
    query Campaign {
      id
      name:
      goal
      total_budget
      status
    }
    `;
    it('it should GET all the campaigns', (done) => {
      request(server)
        .post('/graphql')
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
