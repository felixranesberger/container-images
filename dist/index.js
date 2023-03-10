const l = (s) => s.replace(
  /[A-Z]+(?![a-z])|[A-Z]/g,
  (e, r) => (r ? "-" : "") + e.toLowerCase()
), g = (s) => {
  const { dataset: e } = s;
  if (Object.keys(e).length === 0)
    return;
  const r = Object.entries(e).map(([t, n]) => [l(t), n]).filter(([t]) => (t == null ? void 0 : t.startsWith("source-")) || !1).map(([t, n]) => [t == null ? void 0 : t.replace("source-", ""), n]);
  return Object.fromEntries(r);
}, b = (s) => Object.entries(s).sort(([e], [r]) => e === "default" ? 1 : r === "default" || parseInt(r, 10) <= parseInt(e, 10) ? -1 : 1), c = (s) => {
  const e = s.querySelector("source");
  if (e === null)
    return;
  const r = s.querySelector("img");
  if (r === null)
    return;
  const t = g(e);
  if (t === void 0)
    return;
  const n = b(t);
  new ResizeObserver(([u]) => {
    const { width: d } = u.contentRect, i = n.find(([a]) => Number.isNaN(parseInt(a, 10)) ? !1 : parseInt(a, 10) <= d);
    if (i === void 0) {
      e.srcset = t.default;
      return;
    }
    const [, f] = i;
    e.srcset = f;
  }).observe(r);
}, m = (s) => {
  s.forEach((e) => {
    const r = {
      rootMargin: "200px"
    };
    if (e.hasAttribute("data-container-images-loading") && e.getAttribute("data-container-images-loading") === "eager") {
      c(e);
      return;
    }
    const n = new IntersectionObserver(([o]) => {
      o.isIntersecting && (c(e), n.disconnect());
    }, r);
    n.observe(e);
  });
};
export {
  m as default
};
