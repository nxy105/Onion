/**
 * Controller potato.
 */
var moment = require('moment')
  , potatoModel = require('../models/potato');

var potatoApi = {

    /**
     * list
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @return promise
     */
    list: function(req, res, error) {
        return {success: true};
    },

    /**
     * create a potato
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @return promise
     */
    create: function(req, res, error) {
        var title, createdById, createdOn;

        title = req.param('title');
        if (!title) {
            return when.reject(error(10001, 'Potato title must be required'));
        }

        createdById = req.session.userId;
        createdOn = new Date();

        return potatoModel.create({
            'title': title,
            'createdById': createdById,
            'createdOn': moment().format('YYYY-MM-DD HH:mm:ss'),
            'status': potatoModel.STATUS.NORMAL
        });
    },

    /**
     * update
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @return promise
     */
    update: function(req, res, error) {
        var potatoId, title, createdById, createdOn;

        potatoId = parseInt(req.param('potatoId'));
        title = req.param('title');
        status = req.param('status');

        if (!potatoId) {
            return when.reject(error(10002, 'Update a potato require a potato id'));
        }

        return potatoModel.get(potatoId).then(function(potato) {
            // when get a potato to do this
            var updatingData = { 'title': title, 'status': status };

            // update potato and return a promise object
            return potatoModel.update(potatoId, updatingData);
        }).then(function() {
            return potatoModel.get(potatoId);
        });
    },

    /**
     * remove
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @return promise
     */
    remove: function(req, res, error) {
    },
};

module.exports = potatoApi;