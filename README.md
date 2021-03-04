# Mingo

# Summary
This database was built for the Mingo activities for kids app. The database will allow you to see all activities, add activities and delete activities. It was built using PostgreSQL and an Express.js RESTful API. The database contains an activities table.

# Built with
* PostgreSQL
* Express.js
* Node.js


# API documentation

#### /activities
- (/api/activities)
- GET: Returns a list of all current activities.
- POST: Create a new activity to the database

#### /activity/:id
- (/api/activity/:id)
- GET: Return a single activity
- DELETE: Remove a single activity from the database wtih a valid activity id