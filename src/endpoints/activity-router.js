const path = require('path')
const express = require('express')
const ActivityService = require('./activity-service')
const activityRouter = express.Router()
const bodyParser = express.json();

const serializeActivity = activity => ({
  id: activity.id,
  created: activity.created,
  name: activity.name,
  supplies: activity.supplies,
  directions: activity.directions
});

activityRouter.route('/api/activities')
.get((req, res, next) => {
  ActivityService.getAllActivities(req.app.get('db'))
    .then(activities => {
      res.json(activities.map(serializeActivity))
    })
    .catch(next)
})

module.exports = recipesRouter;