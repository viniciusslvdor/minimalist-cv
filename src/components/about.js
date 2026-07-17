import { el, section } from "../utils/dom.js";

export function buildAbout(d) {
  if (!d.about) return null;
  return section("About", el("p", "about-text", d.about));
}
