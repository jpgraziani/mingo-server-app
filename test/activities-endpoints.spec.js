const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeActivitiesArray } = require('./activities.fixture');

describe('Activities Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  });

  after('disconnect from db', () => db.destroy())
  before('clean the table', () => db.raw('TRUNCATE activities RESTART IDENTITY CASCADE'));
  afterEach('cleanup',() => db.raw('TRUNCATE activities RESTART IDENTITY CASCADE'));
 
  
  //==================================
  // GET activities
  //==================================
  describe(`GET /api/activities`, () => {
    context(`Given no activities`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/activities')
          .expect(200, [])
      })
    })

    context(`Given there are activities in the database`, () => {
      const testActivity = makeActivitiesArray();

      beforeEach('insert activity', () => {
        return db.into('activities').insert(testActivity)
      })

      it(`Responds with 200 and all of the activities`, () => {
        return supertest(app)
          .get('/api/activities')
          .expect(200, testActivity)
      })
    })


  })// end of describ GET activities

  //==================================
  // POST activities
  //==================================
  describe(`POST /api/activities`, () => {
    const testActivity = makeActivitiesArray();

    beforeEach('insert activity', () => {
      return db.into('activities').insert(testActivity)
    })

    it.skip(`Responds with 201 and the activity`, () => {
      const newActivity = {
        name: 'Test new Name',
        supplies: 'Test new Supplies',
        directions: 'Test new Directions'
      }

      return supertest(app)
        .post('/api/activities')
        .send(newActivity)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newActivity.name)
          expect(res.body.supplies).to.eql(newActivity.supplies)
          expect(res.body.directions).to.eql(newActivity.directions)
        })
    })
  })
  
  //==================================
  // GET activities with id
  //==================================
  describe(`GET /api/activities/:id`, () => {
    context(`Given no activity with selected id`, () => {
      const testActivity = makeActivitiesArray();
      
      beforeEach('insert activity', () => {
        return db.into('activities').insert(testActivity)
      })

      it(`Responds with 404`, () => {
        const activityId = 123456

        return supertest(app)
          .get(`api/activities/${activityId}`)
          .expect(404, { error: {
            message: `The activity does not exist`
          }})
      })
    })
  })
  
  
  

  //==================================
  // DELETE activities
  //==================================

  
  
  
});//end of all



