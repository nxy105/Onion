/**
 * API wrapper
 */
var apiWrapper;

apiWrapper = {
    /**
     * warp error object
     */
    err: function(code, msg) {
        return { code: code, msg: msg };
    },

    /**
     * wrap exec api method
     */
    exec: function(apiMethod) {

        var err = this.err;
        // return wrap function
        return function(req, res) {
            var result;
            // use try/catch to control process
            try {
                result = {
                    code: 0,
                    msg: '',
                    data: apiMethod(req, res, err)
                };
            } catch (e) {
                result = {
                    code: e.code ? e.code : 500,
                    msg: e.msg ? e.msg : 'Unkown expection'
                };
            }
            // output json result
            res.type('application/json').json(result);
        }
    }
};

module.exports = apiWrapper;