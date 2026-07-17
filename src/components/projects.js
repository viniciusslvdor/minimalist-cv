import { el, section } from "../utils/dom.js";

export function buildProjects(d) {
  if (!d.projects || !d.projects.length) return null;

  const list = el("div", "projects-grid");
  const items = d.projects.slice(0, 6);
  for (const proj of items) {
    const entry = el("div", "entry");

    const dot = el("span", proj.url ? "project-dot project-dot--live" : "project-dot project-dot--wip");
    dot.title = proj.url ? "Live" : "No link";

    const nameEl = el("span", "entry-name");
    nameEl.appendChild(dot);
    if (proj.url) {
      const a = document.createElement("a");
      a.href   = proj.url;
      a.target = "_blank";
      a.rel    = "noopener noreferrer";
      a.appendChild(document.createTextNode(proj.name));
      a.appendChild(el("span", "entry-link-icon", "↗"));
      nameEl.appendChild(a);
    } else {
      nameEl.appendChild(document.createTextNode(proj.name));
    }

    const left = el("div", "entry-left");
    left.appendChild(nameEl);

    const header = el("div", "entry-header");
    header.appendChild(left);
    entry.appendChild(header);

    if (proj.description) entry.appendChild(el("p", "entry-description", proj.description));

    const meta = el("div", "project-meta");
    const roleAndTags = el("div", "project-role-row");

    if (proj.role) {
      roleAndTags.appendChild(el("span", "project-role", proj.role));
    }

    if (proj.stack && proj.stack.length) {
      const stackEl = el("div", "entry-stack project-stack");
      for (const s of proj.stack) stackEl.appendChild(el("span", "stack-tag", s));
      roleAndTags.appendChild(stackEl);
    }

    if (roleAndTags.childNodes.length) meta.appendChild(roleAndTags);

    if (meta.childNodes.length) entry.appendChild(meta);

    list.appendChild(entry);
  }
  return section("Projects", list);
}
