(function () {
  "use strict";

  const root = document.getElementById("cv");
  const d = CV;
  const storedTheme = localStorage.getItem("cv-theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const initialTheme = "light";

  document.body.setAttribute("data-theme", initialTheme);
  document.title = "Minimalist CV";

  const themeToggle = document.getElementById("theme-switch");

  function setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    document.body.classList.toggle("darkmode", theme === "dark");
    localStorage.setItem("cv-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  setTheme(initialTheme);

  function el(tag, cls, ...children) {
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

  function link(href, text, cls) {
    const node = el("a", cls || null);
    node.href = href;
    node.textContent = text;
    node.target = '_blank'
    node.rel = 'noopener noreferrer';
    return node;
  }

  function section(label, ...children) {
    const s = el("section", "cv-section");
    s.appendChild(el("h2", "section-label", label));
    for (const child of children) {
      if (child != null) s.appendChild(child);
    }
    return s;
  }

  function buildHeader() {
    const meta = el("div", "cv-meta");
    if (d.location) meta.appendChild(el("span", null, d.location));

    const SVG_EMAIL    = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
    const SVG_GLOBE    = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>`;
    const SVG_GITHUB   = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
    const SVG_LINKEDIN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

    function svgLink(href, label, svgMarkup) {
      const link = document.createElement("a");
      link.href      = href;
      link.title     = label;
      link.className = "cv-link-icon";
      link.setAttribute("aria-label", label);
      link.innerHTML = svgMarkup;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return link;
    }

    const SLUG_MAP = {
      instagram: "instagram", facebook: "facebook", x: "x", twitter: "x",
      youtube: "youtube", tiktok: "tiktok", discord: "discord",
      telegram: "telegram", whatsapp: "whatsapp", twitch: "twitch", reddit: "reddit",
    };

    function iconLink(href, label, slug) {
      const a = document.createElement("a");
      a.href      = href;
      a.title     = label;
      a.className = "cv-link-icon";
      a.setAttribute("aria-label", label);
      const img  = document.createElement("img");
      img.src    = `https://cdn.simpleicons.org/${slug}/111111`;
      img.alt    = label;
      img.width  = 18;
      img.height = 18;

      img.onerror = () => { img.style.display = "none"; };
      a.appendChild(img);
      return a;
    }

    const linksRow = el("div", "cv-links");
    if (d.email)    linksRow.appendChild(svgLink(`mailto:${d.email}`, d.email, SVG_EMAIL));
    if (d.github)   linksRow.appendChild(svgLink(d.github,   "GitHub",   SVG_GITHUB));
    if (d.linkedin) linksRow.appendChild(svgLink(d.linkedin, "LinkedIn", SVG_LINKEDIN));
    if (d.website)  linksRow.appendChild(svgLink(d.website, d.website.replace(/^https?:\/\//, ""), SVG_GLOBE));
    if (d.social && d.social.length) {
      for (const s of d.social) {
        if (!s.url) continue;
        const slug = s.icon || SLUG_MAP[s.label.toLowerCase()];
        if (slug) {
          linksRow.appendChild(iconLink(s.url, s.label, slug));
        } else {
          linksRow.appendChild(svgLink(s.url, s.label, SVG_GLOBE));
        }
      }
    }

    let flagsRow = null;
    if (d.languages && d.languages.length) {
      flagsRow = el("div", "header-flags");
      for (const lang of d.languages) {
        if (!lang.flag) continue;
        const img = document.createElement("img");
        img.className = "header-flag";
        img.src    = `https://flagcdn.com/w20/${lang.flag}.png`;
        img.srcset = `https://flagcdn.com/w40/${lang.flag}.png 2x`;
        img.width  = 20;
        img.alt    = lang.name;
        img.title  = lang.name;
        flagsRow.appendChild(img);
      }
      if (!flagsRow.childNodes.length) flagsRow = null;
    }

    const left = el("div", "cv-header-left");
    left.appendChild(el("h1", "cv-name", d.name));
    if (d.title) left.appendChild(el("p", "cv-title", d.title));
    if (meta.childNodes.length) left.appendChild(meta);
    if (flagsRow) left.appendChild(flagsRow);
    if (linksRow.childNodes.length) left.appendChild(linksRow);

    const header = el("header", "cv-header");
    header.appendChild(left);

    const photoSrc = d.photo || "assets/images/photo.jpg";
    const photoImg = document.createElement("img");
    photoImg.src       = photoSrc;
    photoImg.alt       = d.name || "Profile photo";
    photoImg.className = "cv-photo";
    photoImg.onerror   = () => { photoImg.remove(); };
    header.appendChild(photoImg);

    return header;
  }

  function buildAbout() {
    if (!d.about) return null;
    return section("About", el("p", "about-text", d.about));
  }

  function buildSkills() {
    if (!d.skills || !d.skills.length) return null;
    const wrap = el("div", "entry-stack skills-stack");
    for (const s of d.skills) {
      wrap.appendChild(el("span", "stack-tag", s));
    }
    return section("Skills", wrap);
  }

  function buildEntry(item) {
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

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul","Aug","Sep","Oct","Nov","Dec"];

  function dateVal(str) {
    if (!str) return Infinity;
    const [y, m] = str.split("-").map(Number);
    return y * 100 + (m || 1);
  }

  function fmtDate(str) {
    if (!str) return "Present";
    const [y, m] = str.split("-").map(Number);
    return m ? `${MONTHS[m - 1]} ${y}` : String(y);
  }

  function buildPeriod(item) {
    if (item.from) return `${fmtDate(item.from)} – ${fmtDate(item.to)}`;
    return item.period || "";
  }

  function sortDesc(arr) {
    return [...arr].sort((a, b) => dateVal(b.from || null) - dateVal(a.from || null));
  }

  function buildExperience() {
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

  function buildEducation() {
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

  function buildProjects() {
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

  function buildFooter() {
    if (!d.updatedAt) return null;
    const footer = el("footer", "cv-footer");
    footer.appendChild(document.createTextNode(`Updated on ${d.updatedAt}`));
    return footer;
  }

  const parts = [
    buildHeader(),
    buildAbout(),
    buildSkills(),
    buildExperience(),
    buildEducation(),
    buildProjects(),
    buildFooter(),
  ];

  for (const part of parts) {
    if (part) root.appendChild(part);
  }

})();
