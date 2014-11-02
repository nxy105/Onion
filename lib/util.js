/**
 * util
 */

module.exports = {

    /**
     * get col data from a object array
     *
     * @param  array   arr array
     * @param  string  k   key name
     * @return array
     */
    getCol: function(arr, k) {
        var result = [];

        for (var i = 0; i < arr.length; i ++) {
            result.push(arr[i][k]);
        }

        return result;
    }
};
