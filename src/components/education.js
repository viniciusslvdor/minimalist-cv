import { el, section, buildEntry } from "../utils/dom.js";
import { buildPeriod, sortDesc } from "../utils/date.js";

export function buildEducation(d) {
  if (!d.education || !d.education.length) return null;

  const list = el("div", "entries");
  for (const edu of sortDesc(d.education)) {
    list.appendChild(buildEntry({
      name:        edu.institution,
      url:         edu.url,
      tags:        edu.status ? [edu.status] : [],
      period:      buildPeriod(edu),
      course:      edu.course,
    }));
  }
  return section("Education", list);
}
