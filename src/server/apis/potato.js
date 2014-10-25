/**
 * Controller potato.
 */
var potatoModel = require('../models/potato');

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
            'createdOn': createdOn,
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