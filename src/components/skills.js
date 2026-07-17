import { el, section } from "../utils/dom.js";

export function buildSkills(d) {
  if (!d.skills || !d.skills.length) return null;
  const wrap = el("div", "entry-stack skills-stack");
  for (const s of d.skills) {
    wrap.appendChild(el("span", "stack-tag", s));
  }
  return section("Skills", wrap);
}
