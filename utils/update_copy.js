/**
 * Class with element changing method for use with HTMLRewriter.
 * (Didn't break this out into separate class because it's not used elsewhere)
 */
class ElementHandler {
  constructor(selector, variant) {
    this.selector = selector;
    this.variant = variant;
  }

  element(element) {
    switch (this.selector) {
      case "title":
        element.setInnerContent("Rock's Cloudflare Challenge");
        break;
      case "h1#title":
        element.setInnerContent(this.variant ? "Open Beta" : "Current Version");
        break;
      case "p#description":
        element.setInnerContent(
          this.variant
            ? "Welcome to the open beta! Take a look around."
            : "Welcome back."
        );
        break;
      case "a#url":
        element
          .setInnerContent("Visit my website!")
          .setAttribute("href", "https://rockzhou.com");
        break;
      default:
        break;
    }
  }
}

const updateCopy = (response, variant) => {
  const rewriter = new HTMLRewriter()
    .on("title", new ElementHandler("title", variant))
    .on("h1#title", new ElementHandler("h1#title", variant))
    .on("p#description", new ElementHandler("p#description", variant))
    .on("a#url", new ElementHandler("a#url", variant));

  return rewriter.transform(response);
};

export default updateCopy;
