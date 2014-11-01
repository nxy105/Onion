/**
 * Validator
 */

var validator = require('validator');

module.exports = {

    /**
     * check if value in array
     *
     * @param  mixed   val    input value
     * @param  array   array  array
     * @return boolean
     */
    inArray: function(val, array) {
        for (var i = 0; i < array.length; i ++) {
            if (val === array[i]) {
                return true;
            }
        }

        return false;
    },

    /**
     * check if the string's length falls in a range. Note: this function takes into account surrogate pairs
     *
     * @param  string   str  string
     * @param  integer  min  min length
     * @param  integer  max  max length
     * @return boolean
     */
    isLength: function(str, min, max) {
        return validator.isLength(str, min, max);
    },

    /**
     * is required
     *
     * @param  mixed  val
     * @return boolean
     */
    isRequired: function(val) {
        return val !== '' && val !== undefined && val !== null && val !== {} && val !== [];
    },

    /**
     * convert the value to a string.
     *
     * @param  mixed  val  input value
     * @return string
     */
    toString: function(val) {
        return validator.toString(val);
    },

    /**
     * convert the input to an integer, or NaN if the input is not an integer.
     *
     * @param  mixed  val  input value
     * @return int
     */
    toInt: function(val) {
        return validator.toInt(val);
    }
};