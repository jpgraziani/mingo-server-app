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

/* ------------------------------------------- */
/* GET ALL ACTIVITIES */
/* ------------------------------------------- */
activityRouter.route('/api/activities')
.get((req, res, next) => {
  ActivityService.getAllActivities(req.app.get('db'))
    .then(activities => {
      res.json(activities.map(serializeActivity))
    })
    .catch(next)
})

/* ------------------------------------------- */
/* POST NEW ACTIVITY */
/* ------------------------------------------- */
activityRouter.route('/api/activities')
  .post(bodyParser, (req, res, next) => {
    const { name, supplies, directions } = req.body
    const newActivity = { name, supplies, directions }

    for (const [key, value] of Object.entries(newActivity)) {
      if (value == null) {
        return res.status(400).json({
          error: {
            message: `Missing recipe ${key}`
          }
        })
      }
    }

    ActivityService.insertActivity(
      req.app.get('db'),
      newActivity
    )
    .then(activity => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl + `/${activity.id}`))
        .json(serializeActivity(activity))
    })
    .catch(next)
  })

/* ------------------------------------------- */
/* POST NEW ACTIVITY */
/* ------------------------------------------- */
activityRouter.route('/api/activities/:id')
  .all((req, res, next) => {
    if(isNaN(parseInt(req.params.id))) {
      return res.status(404).json({
        error: {
          message: `Invalid id`
        }
      })
    }

    ActivityService.getById(
      req.app.get('db'),
      req.params.id
    )
    .then(activity => {
      if (!activity) {
        return res.status(404).json({
          error: {
            message: `The activity does not exist`
          }
        })
      }
      res.activity = activity
      next()
      res.json(serializeActivity(activity))
    })
    .catch(next)
  })

/* ------------------------------------------- */
/* DELETE ACTIVITY */
/* ------------------------------------------- */
activityRouter.route('/api/activities/:id')
.delete((req, res, next) => {
  ActivityService.deleteActivity(
    req.app.get('db'),
    req.params.id
  )
  .then(activity => {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = activityRouter;