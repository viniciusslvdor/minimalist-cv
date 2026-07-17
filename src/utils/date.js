const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"];

export function dateVal(str) {
  if (!str) return Infinity;
  const [y, m] = str.split("-").map(Number);
  return y * 100 + (m || 1);
}

export function fmtDate(str) {
  if (!str) return "Present";
  const [y, m] = str.split("-").map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
}

export function buildPeriod(item) {
  if (item.from) return `${fmtDate(item.from)} – ${fmtDate(item.to)}`;
  return item.period || "";
}

export function sortDesc(arr) {
  return [...arr].sort((a, b) => dateVal(b.from || null) - dateVal(a.from || null));
}
