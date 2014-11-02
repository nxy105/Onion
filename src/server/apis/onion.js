/**
 * Controller onion.
 */
var moment = require('moment')
  , onionModel = require('../models/onion')
  , potatoModel = require('../models/potato')
  , validator = require('../../../lib/validator');

var onionApi = {

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

        return onionModel.list(createdById);
    },

    /**
     * create a potato
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @param  function next   next function
     * @return promise
     */
    create: function(req, res, error, next) {
        var createdById, createdOn, completedOn, potatoId;

        potatoId = validator.toInt(req.param('potatoId'));
        createdOn = moment(req.param('createdOn')).format('YYYY-MM-DD HH:mm:ss');
        completedOn = moment().format('YYYY-MM-DD HH:mm:ss');

        if (potatoId === 0) {
            return error(20001, 'Create a onion require a valid potato id');
        }

        if (!checkCreatedOn(createdOn, completedOn)) {
            return error(20002, 'Onion create time must be required and sooner than now time');
        }

        return potatoModel.get(potatoId).then(function(potato) {
            return next(potato.potatoId);
        }).then(function(potatoId) {
            return onionModel.create({
                'potatoId': potatoId,
                'createdById': req.session.userId,
                'createdOn': createdOn,
                'completedOn': completedOn,
            });
        });
    },
};

/**
 * check if created on time is valid
 *
 * @param  string createdOn   created on time
 * @param  string completedOn completed on time
 * @return boolean
 */
function checkCreatedOn(createdOn, completedOn) {
    return validator.isRequired(createdOn) && validator.isDate(createdOn) && validator.isBefore(createdOn, completedOn);
}

module.exports = onionApi;