/**
 * API wrapper
 */
var when = require('when');

var resType = 'application/json';

var apiWrapper = {

    /**
     * warp error object
     *
     * @param  integer code  error code
     * @param  string  msg   error message
     * @return promise
     */
    err: function(code, msg) {
        return when.reject({ 'code': code, 'msg': msg });
    },

    /**
     * next
     *
     * @param  mixed data
     * @return promise
     */
    next: function(data) {
        return when.resolve(data);
    },

    /**
     * wrap exec api method
     *
     * @param  function  apiMethod  api method
     * @return void
     */
    exec: function(apiMethod) {
        var err = this.err
          , next = this.next;

        // return wrap function
        return function(req, res) {
            return apiMethod(req, res, err, next).then(function(result) {
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