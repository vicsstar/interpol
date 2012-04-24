import scala.collection.mutable.HashMap

/**
 * @author Victor Igbokwe (vicsstar@yahoo.com)
 * @on Monday, April 23, 2012 4:02 PM
 */
class NamedInterpolator(text: String) {
  private val params = HashMap[String, Any]()

  /**
   * Add a named parameter to the parameter hash map.
   */
  def addParam(key: String, value: Any) = {
    params += key -> value
    this
  }

  /**
   * Adds a variable-length parameter list to the parameter hash map.
   */
  def addParams(params: (String, Any)*) = {
    this.params ++= params
    this
  }

  /**
   * Begins the interpolation process by reversing the keys in descending order.
   */
  def interpolate = {
    // reversing the keys in descending order will make sure
    // that shorter keys that are part of longer keys are not used to replace them.
    _interpolate(text, params.keys.toList.sortBy(a => a).reverse)
  }

  /*
   * A high level interpolation method that takes each key in turn for the process.
   */
  private def _interpolate(text: String, keys: List[String]): String = {

    // first check if the map of parameters is empty.
    if (keys.isEmpty) {
      text
    } else {
      // perform a top level interpolation.
      _interpolate(
        // perform the fine-grained (lower level) interpolation.
        __interpolate(
          // take each key from the head.
          text, keys.head, 0
        ),
        // evaluate the tail from the top-level list.
        keys.tail
      )
    }
  }

  /*
   * Performs low-level interpolation on a particular parameter.
   */
  private def __interpolate(text: String, paramKey: String, _index: Int): String = {
    var key = "@" + paramKey
    var index = text.indexOf(key, _index)

    // check if the parameter key was found in the text.
    if (index != -1) {
      // extract the first part of the text.
      val pretext = text.substring(0, index)
      // extract the second part of the text.
      val posttext = text.substring(index + key.length)

      /*
       * produce a new text based on the extraction process
       * and check this key/value pair again, to see if it's found again.
       */
      __interpolate(pretext + params(paramKey) + posttext, paramKey, index + 1)
    } else {
      text
    }
  }
}