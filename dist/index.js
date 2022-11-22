const f = (s) => s.replace(
  /[A-Z]+(?![a-z])|[A-Z]/g,
  (r, t) => (t ? "-" : "") + r.toLowerCase()
), l = (s) => {
  const { dataset: r } = s;
  if (Object.keys(r).length === 0)
    return;
  const t = Object.entries(r).map(([e, n]) => [f(e), n]).filter(([e]) => (e == null ? void 0 : e.startsWith("source-")) || !1).map(([e, n]) => [e == null ? void 0 : e.replace("source-", ""), n]);
  return Object.fromEntries(t);
}, b = (s) => Object.entries(s).sort(([r], [t]) => r === "default" ? 1 : t === "default" || parseInt(t, 10) <= parseInt(r, 10) ? -1 : 1), d = (s) => {
  const r = s.querySelector("source");
  if (r === null)
    return;
  const t = s.querySelector("img");
  if (t === null)
    return;
  const e = l(r);
  if (e === void 0)
    return;
  const n = b(e);
  new ResizeObserver(([a]) => {
    const { width: c } = a.contentRect, o = n.find(([i]) => Number.isNaN(parseInt(i, 10)) ? !1 : parseInt(i, 10) <= c);
    if (o === void 0) {
      r.srcset = e.default;
      return;
    }
    const [, u] = o;
    r.srcset = u;
  }).observe(t);
}, v = (s) => {
  s.forEach((r) => {
    const t = {
      rootMargin: "200px"
    }, e = new IntersectionObserver(([n]) => {
      !n.isIntersecting || (d(r), e.disconnect());
    }, t);
    e.observe(r);
  });
};
export {
  v as default
};
