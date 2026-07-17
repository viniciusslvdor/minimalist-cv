import { el } from "../utils/dom.js";

const SVG_EMAIL    = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const SVG_GLOBE    = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>`;
const SVG_GITHUB   = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
const SVG_LINKEDIN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

function svgLink(href, label, svgMarkup) {
  const a = document.createElement("a");
  a.href      = href;
  a.title     = label;
  a.className = "cv-link-icon";
  a.setAttribute("aria-label", label);
  a.innerHTML = svgMarkup;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
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

export function buildHeader(d) {
  const meta = el("div", "cv-meta");
  if (d.location) meta.appendChild(el("span", null, d.location));

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
