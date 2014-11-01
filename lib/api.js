/**
 * API wrapper
 */
var when = require('when');

var resType = 'application/json';

var apiWrapper = {
    /**
     * warp error object
     */
    err: function(code, msg) {
        return when.reject({ 'code': code, 'msg': msg });
    },

    /**
     * success
     *
     * @param  mixed data
     * @return promise
     */
    success: function(data) {
        return when.resolve(data);
    },

    /**
     * wrap exec api method
     */
    exec: function(apiMethod) {
        var err = this.err
          , success = this.success;

        // return wrap function
        return function(req, res) {
            return apiMethod(req, res, err, success).then(function(result) {
                // output json result
                return res.type(resType).json({ 'code': 0, 'msg': '', 'data': result });
            }, function(error) {
                return res.type(resType).json({
                    'code': error.code ? error.code : 500,
                    'msg': error.msg ? error.msg : 'Unkown expection'
                });
            });
        }
    }
};

module.exports = apiWrapper;