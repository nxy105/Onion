/**
 * Controller potato.
 */
var moment = require('moment')
  , potatoModel = require('../models/potato')
  , validator = require('../../../lib/validator');

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
        var createdById = req.session.userId;

        return potatoModel.listForNormal(createdById);
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

        title = validator.toString(req.param('title'));
        if (!checkTitle(title)) {
            return error(10001, 'Potato title must be required and length must less then 100');
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
        var potatoId, title, createdById, createdOn, status, updatingData;

        potatoId = validator.toInt(req.param('potatoId'));
        title = validator.toString(req.param('title'));
        status = validator.toString(req.param('status'));

        if (potatoId === 0) {
            return error(10002, 'Update a potato require a valid potato id');
        }

        if (!checkTitle(title)) {
            return error(10003, 'Potato title must be required and length must less then 100');
        }

        if (!checkStatus(status, [potatoModel.STATUS.COMPLETE])) {
            return error(10004, 'Potato status must be required and must be complete');
        }

        return potatoModel.get(potatoId).then(function(potato) {
            // do not allowed the other person to operate potato
            createdById = req.session.userId;
            if (potato.createdById !== createdById) {
                return error(10006, 'You are not this potato\'s created person');
            }

            // when get a potato to do this
            updatingData = { 'title': title, 'status': status };

            // update potato and return a promise object
            return potatoModel.update(potatoId, updatingData);
        }).then(function() {
            return potatoModel.get(potatoId);
        });
    },

    /**
     * remove
     *
     * @param  object   req      req object
     * @param  object   res      res object
     * @param  function error    error function which create error object
     * @param  function success  success function
     * @return promise
     */
    remove: function(req, res, error, success) {
        var potatoId;

        potatoId = validator.toInt(req.param('potatoId'));

        if (potatoId === 0) {
            return error(10005, 'Remove a potato require a valid potato id');
        }

        return potatoModel.get(potatoId).then(function(potato) {
            // do not allowed the other person to operate potato
            createdById = req.session.userId;
            if (potato.createdById !== createdById) {
                return error(10007, 'You are not this potato\'s created person');
            }

            // remove potato
            return potatoModel.remove(potatoId);
        }).then(function() {
            return success('ok');
        });
    },
};

/**
 * check title
 *
 * @param  string title   title
 * @return boolean
 */
function checkTitle(title) {
    return validator.isRequired(title) && validator.isLength(title, 1, 100);
}

/**
 * check status
 *
 * @param  string   status   status
 * @param  array    range    valid status range
 * @return boolean
 */
function checkStatus(status, range) {
    return validator.isRequired(status) && validator.inArray(status, range);
}

module.exports = potatoApi;