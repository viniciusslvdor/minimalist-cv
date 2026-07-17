import { el } from "../utils/dom.js";

export function buildFooter(d) {
  if (!d.updatedAt) return null;
  const footer = el("footer", "cv-footer");
  footer.appendChild(document.createTextNode(`Updated on ${d.updatedAt}`));
  return footer;
}
