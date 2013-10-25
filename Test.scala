/**
 * @author Victor Igbokwe (vicsstar@yahoo.com)
 * @on Monday, April 23, 2012 5:42 PM
 *
 * Tests the NamedInterpolator class.
 */
class Test {

  def main(args: Array[String]) {
    val ni = new NamedInterpol(
      "Hello @user! You are seeing this email because we received a request to reset your password on <a href=\"@site\">@site</a>"
    )
    ni.addParams(
      "user" -> "Victor",
      "site" -> "http://www.bloovue.com"
    )
    val text = ni.interpolate
    println(text)
  }
}
