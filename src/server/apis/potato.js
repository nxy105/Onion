/**
 * Controller potato.
 */
var moment = require('moment')
  , potatoModel = require('../models/potato')
  , validator = require('../../../lib/validator')
  , session = require('../session');

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
        if (!session.checkUserLogin(req)) {
            return error(100, 'Not login yet');
        }

        return potatoModel.listForNormal(session.getLoginnedUserId(req));
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
        var title, createdById;

        if (!session.checkUserLogin(req)) {
            return error(100, 'Not login yet');
        }

        createdById = session.getLoginnedUserId(req);
        title = validator.toString(req.param('title'));

        if (!checkTitle(title)) {
            return error(10001, 'Potato title must be required and length must less then 100');
        }

        return potatoModel.create({
            title: title,
            createdById: createdById,
            createdOn: moment().format('YYYY-MM-DD HH:mm:ss'),
            status: potatoModel.STATUS.NORMAL
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

        if (!session.checkUserLogin(req)) {
            return error(100, 'Not login yet');
        }

        createdById = session.getLoginnedUserId(req);
        potatoId = validator.toInt(req.param('potatoId'));
        title = validator.toString(req.param('title'));
        status = validator.toString(req.param('status'));

        if (potatoId === 0) {
            return error(10002, 'Update a potato require a valid potato id');
        }

        // find a potato first
        return potatoModel.get(potatoId).then(function(potato) {
            // can not find the potato
            if (!potato) {
                return error(10007, 'potato not found');
            }

            // do not allowed the other person to operate potato
            if (potato.createdById !== createdById) {
                return error(10006, 'You are not this potato\'s created person');
            }

            updatingData = {};

            if (validator.isRequired(title)) {
                if (!checkTitle(title)) {
                    return error(10003, 'Potato title must be required and length must less then 100');
                } else {
                    updatingData.title = title;
                }
            }

            if (validator.isRequired(status)) {
                if (!checkStatus(status, [potatoModel.STATUS.COMPLETE])) {
                    return error(10004, 'Potato status must be required and must be complete');
                } else {
                    updatingData.status = status;
                }
            }

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
     * @param  function next     next function
     * @return promise
     */
    remove: function(req, res, error, next) {
        var potatoId, createdById;

        if (!session.checkUserLogin(req)) {
            return error(100, 'Not login yet');
        }

        createdById = session.getLoginnedUserId(req);
        potatoId = validator.toInt(req.param('potatoId'));

        if (potatoId === 0) {
            return error(10005, 'Remove a potato require a valid potato id');
        }

        return potatoModel.get(potatoId).then(function(potato) {
            // can not find the potato
            if (!potato) {
                return error(10007, 'potato not found');
            }

            // do not allowed the other person to operate potato
            if (potato.createdById !== createdById) {
                return error(10006, 'You are not this potato\'s created person');
            }

            return potatoModel.remove(potatoId);
        }).then(function() {
            return next('ok');
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