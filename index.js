import fetch from "node-fetch";
import cookie from "cookie";
import updateCopy from "./utils/update_copy";
import constants from "./constants";

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
const handleRequest = async request => {
  const url = "https://cfw-takehome.developers.workers.dev/api/variants";
  const rawRes = await fetch(url);
  const response = await rawRes.json();
  const { variants } = response;

  const cookies = cookie.parse(request.headers.get("Cookie") || "");
  const cookieVariant = cookies[constants.COOKIE_KEY];

  let variantChosen;
  if (cookieVariant === undefined) {
    /**
     * Rounding Math.random should yield even distribution between
     * both variants.
     */
    variantChosen = Math.round(Math.random());
  } else {
    variantChosen = cookieVariant;
  }

  const urlChosen = variants[variantChosen];
  const resChosen = await fetch(urlChosen);
  let transformedResponse = updateCopy(resChosen, variantChosen);

  /* Only send Set-Cookie header if one doesn't exist already */
  if (cookieVariant === undefined) {
    const userCookie = cookie.serialize(
      constants.COOKIE_KEY,
      String(variantChosen),
      {
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }
    );
    transformedResponse.headers.set("Set-Cookie", userCookie);
  }

  return transformedResponse;
};
