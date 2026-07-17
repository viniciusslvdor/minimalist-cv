import { el, section, buildEntry } from "../utils/dom.js";
import { buildPeriod, sortDesc } from "../utils/date.js";

export function buildExperience(d) {
  if (!d.experience || !d.experience.length) return null;

  const list = el("div", "entries");
  for (const exp of sortDesc(d.experience)) {
    list.appendChild(buildEntry({
      name:        exp.company,
      url:         exp.url,
      tags:        exp.tags,
      period:      buildPeriod(exp),
      role:        exp.role,
      description: exp.description,
      stack:       exp.stack,
    }));
  }
  return section("Work Experience", list);
}
