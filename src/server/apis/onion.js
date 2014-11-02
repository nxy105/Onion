/**
 * Controller onion.
 */
var moment = require('moment')
  , onionModel = require('../models/onion')
  , potatoModel = require('../models/potato')
  , validator = require('../../../lib/validator')
  , util = require('../../../lib/util');

var onionApi = {

    /**
     * list
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @param  function next   next function
     * @return promise
     */
    list: function(req, res, error, next) {
        var createdById, potatoIds;

        createdById = req.session.userId;

        return onionModel.list(createdById).then(function(onions) {
            potatoIds = util.getCol(onions, 'potatoId');
            // get all potato
            return potatoModel.listByPotatoIds(potatoIds).then(function(potatos) {
                // assemble onion with potato
                return next(assembleOnions(onions, potatos));
            });
        });
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
        createdOn = validator.toString(req.param('createdOn'));
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
                'createdOn': moment(createdOn).format('YYYY-MM-DD HH:mm:ss'),
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

/**
 * assemble onions
 *
 * @param  array   onions  onions
 * @param  array   potatos potatos
 * @return array
 */
function assembleOnions(onions, potatos) {
    for (var i = 0; i < onions.length; i ++) {
        for (var j = 0; j < potatos.length; j ++) {
            if (potatos[j].potatoId === onions[i].potatoId) {
                onions[i].potato = potatos[j];
            }
        }
    }

    return onions;
}

module.exports = onionApi;