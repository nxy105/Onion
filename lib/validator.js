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
     * check if value is not none
     *
     * @param  mixed  val
     * @return boolean
     */
    isRequired: function(val) {
        return val !== '' && val !== undefined && val !== null && val !== {} && val !== [];
    },

    /**
     * check if is date value.
     *
     * @param  string  str   date string
     * @return boolean
     */
    isDate: function(str) {
        return validator.isDate(str);
    },

    /**
     * check if the string is a date that's before the specified date.
     *
     * @param  string  str   date string
     * @param  string  date  date
     * @return boolean
     */
    isBefore: function(str, date) {
        return validator.isBefore(str, date);
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