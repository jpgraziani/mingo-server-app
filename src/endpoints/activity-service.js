const ActivityService = {
  getAllActivities(knex) {
    return knex.select('*').from('activities')
  },

  getById(knex, id) {
    return knex.from('activities').select('*').where('id', id).first()
  },

  insertActivity(knex, newActivity) {
    return knex
      .insert(newActivity)
      .into('activities')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteActivity(knex, id) {
    return knex('activities')
      .where({ id })
      .delete()
  },

  updateActivity(knex, id, newActivityFields) {
    return knex('activities')
      .where({ id })
      .update(newActivityFields)
  },
}

module.exports = ActivityService;