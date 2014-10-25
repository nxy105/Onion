/**
 * API wrapper
 */

var resType = 'application/json';

var apiWrapper = {
    /**
     * warp error object
     */
    err: function(code, msg) {
        return { 'code': code, 'msg': msg };
    },

    /**
     * wrap exec api method
     */
    exec: function(apiMethod) {

        var err = this.err;
        // return wrap function
        return function(req, res) {
            return apiMethod(req, res, err).then(function(result) {
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