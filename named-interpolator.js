/**
 * @author Victor Igbokwe (vicsstar@yahoo.com)
 * @start_time Monday, April 23, 2012 10:42 PM
 * @stop_time [Same Day] 11:40 PM
 *
 * Function that provides support for named interpolation of JavaScript strings.
 */
var NamedInterpolator = function() {

  // creates a NamedInterpolator instance with the appropriate parameters.
  function NamedInterpolator(text) {
    // initialize the text attribute with the parameter.
    this.text = text;
    // initialize an object (map) of parameters.
    this.params = {};
  }

  // prototype the NamedInterpolator function to add more functions.
  NamedInterpolator.prototype = {
    // adds a parameter to the params object.
    addParam: function(key, value) {
      this.params[key] = value;
      return this;
    },

    // add several parameters to the list.
    addParams: function(params) {
      // retrieve an array of keys in the params object.
      var keys = Object.keys(params);

      // retrieve their index.
      for (var item_index in keys) {
        // add the parameter to the params object.
        this.addParam(keys[item_index], params[keys[item_index]]);
      }
      return this;
    },

    // returns the first element in an array.
    head: function(keys) {
      // check that the keys array is not empty.
      if (keys.length != 0) {
        return keys[0];
      }
      return "";
    },

    // returns all the elements except the first in an array.
    tail: function(keys) {
      // define the array of keys that will 
      var _keys = [];

      // check that the keys array is not empty.
      for (var i = 0; i < keys.length; i++) {
        // skip the first item in the array.
        if (i != 0) {
          _keys.push(keys[i]);
        }
      }
      return _keys;
    },

    // begin the interpolation process.
    interpolate: function() {
      return this._interpolate(this.text, Object.keys(this.params));
    },

    /*
     * high level interpolation method that takes each key in turn for the process.
     */
    _interpolate: function(text, keys) {
      // first check if the list of parameter keys is empty.
      if (keys.length == 0) {
        return text;
      } else {
        // perform a top-level interpolation.
        return this._interpolate(
          // perform the fine-grained (lower level) interpolation.
          this.__interpolate(
            // take each key from the head (top).
            text, this.head(keys), 0
          ),
          this.tail(keys)
        );
      }
    },

    /*
     * Performs low-level interpolation on a particular parameter.
     */
    __interpolate: function(text, paramKey, _index) {
      var key = "@" + paramKey
      var index = text.indexOf(key, _index)

      // check if the parameter key was found in the text.
      if (index != -1) {
        // extract the first part of the text.
        var pretext = text.substring(0, index)
        // extract the second part of the text.
        var posttext = text.substring(index + key.length)

        /*
         * produce a new text based on the extraction process
         * and check this key/value pair again, to see if it's found again.
         */
        return this.__interpolate(pretext + this.params[paramKey] + posttext, paramKey, index + 1)
      } else {
        return text
      }
    }
  }
  // return the function.
  return NamedInterpolator;
}();