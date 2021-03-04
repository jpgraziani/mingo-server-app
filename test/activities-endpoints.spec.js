const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeActivitiesArray } = require('./recipes.fixture');

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

  
  //==================================
  // GET activities with id
  //==================================

  
   //==================================
  // POST activities
  //==================================

  

  //==================================
  // DELETE activities
  //==================================

  
  
  
});//end of all



