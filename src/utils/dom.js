export function el(tag, cls, ...children) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string") {
      node.appendChild(document.createTextNode(child));
    } else {
      node.appendChild(child);
    }
  }
  return node;
}

export function link(href, text, cls) {
  const node = el("a", cls || null);
  node.href = href;
  node.textContent = text;
  node.target = "_blank";
  node.rel = "noopener noreferrer";
  return node;
}

export function section(label, ...children) {
  const s = el("section", "cv-section");
  s.appendChild(el("h2", "section-label", label));
  for (const child of children) {
    if (child != null) s.appendChild(child);
  }
  return s;
}

export function buildEntry(item) {
  const entry = el("div", "entry");

  const nameEl = el("span", "entry-name");
  if (item.url) {
    try {
      const domain = new URL(item.url).hostname;
      const favicon = document.createElement("img");
      favicon.src       = `https://icon.horse/icon/${domain}`;
      favicon.alt       = "";
      favicon.className = "entry-favicon";
      favicon.onerror   = () => { favicon.remove(); };
      nameEl.appendChild(favicon);
      nameEl.appendChild(link(item.url, item.name || item.company || item.institution));
    } catch (_) {
      nameEl.appendChild(link(item.url, item.name || item.company || item.institution));
    }
  } else {
    nameEl.appendChild(
      document.createTextNode(item.name || item.company || item.institution || "")
    );
  }

  const left = el("div", "entry-left");
  left.appendChild(nameEl);
  if (item.tags && item.tags.length) {
    left.appendChild(el("div", "entry-tags", item.tags.join("  ·  ")));
  }

  const right = el("div", "entry-right");
  if (item.period) right.appendChild(document.createTextNode(item.period));
  if (item.role && item.period) right.appendChild(document.createTextNode(""));
  if (!item.period && item.role) right.appendChild(document.createTextNode(item.role));

  const header = el("div", "entry-header");
  header.appendChild(left);
  if (right.childNodes.length) header.appendChild(right);
  entry.appendChild(header);

  if (item.role && item.period) {
    entry.appendChild(el("div", "entry-role", item.role));
  }

  if (item.course) {
    entry.appendChild(el("div", "entry-role", item.course));
  }

  if (item.description) {
    entry.appendChild(el("p", "entry-description", item.description));
  }

  if (item.stack && item.stack.length) {
    const stackEl = el("div", "entry-stack");
    for (const s of item.stack) {
      stackEl.appendChild(el("span", "stack-tag", s));
    }
    entry.appendChild(stackEl);
  }

  return entry;
}
