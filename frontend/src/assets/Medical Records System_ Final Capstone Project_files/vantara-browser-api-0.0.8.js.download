var Yo = Object.defineProperty;
var Zo = (s, e, t) => e in s ? Yo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var X = (s, e, t) => Zo(s, typeof e != "symbol" ? e + "" : e, t);
var Jo = Object.defineProperty, Xo = (s, e, t) => e in s ? Jo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, w = (s, e, t) => Xo(s, typeof e != "symbol" ? e + "" : e, t), Ws, Ko = Object.defineProperty, Qo = (s, e, t) => e in s ? Ko(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Vs = (s, e, t) => Qo(s, typeof e != "symbol" ? e + "" : e, t), G = /* @__PURE__ */ ((s) => (s[s.Document = 0] = "Document", s[s.DocumentType = 1] = "DocumentType", s[s.Element = 2] = "Element", s[s.Text = 3] = "Text", s[s.CDATA = 4] = "CDATA", s[s.Comment = 5] = "Comment", s))(G || {});
const Gs = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
}, js = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
}, mt = {}, qo = () => !!globalThis.Zone;
function fs(s) {
  if (mt[s])
    return mt[s];
  const e = globalThis[s], t = e.prototype, r = s in Gs ? Gs[s] : void 0, i = !!(r && // @ts-expect-error 2345
  r.every(
    (l) => {
      var a, u;
      return !!((u = (a = Object.getOwnPropertyDescriptor(t, l)) == null ? void 0 : a.get) != null && u.toString().includes("[native code]"));
    }
  )), n = s in js ? js[s] : void 0, o = !!(n && n.every(
    // @ts-expect-error 2345
    (l) => {
      var a;
      return typeof t[l] == "function" && ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"));
    }
  ));
  if (i && o && !qo())
    return mt[s] = e.prototype, e.prototype;
  try {
    const l = document.createElement("iframe");
    document.body.appendChild(l);
    const a = l.contentWindow;
    if (!a) return e.prototype;
    const u = a[s].prototype;
    return document.body.removeChild(l), u ? mt[s] = u : t;
  } catch {
    return t;
  }
}
const yr = {};
function me(s, e, t) {
  var r;
  const i = `${s}.${String(t)}`;
  if (yr[i])
    return yr[i].call(
      e
    );
  const n = fs(s), o = (r = Object.getOwnPropertyDescriptor(
    n,
    t
  )) == null ? void 0 : r.get;
  return o ? (yr[i] = o, o.call(e)) : e[t];
}
const wr = {};
function Hi(s, e, t) {
  const r = `${s}.${String(t)}`;
  if (wr[r])
    return wr[r].bind(
      e
    );
  const n = fs(s)[t];
  return typeof n != "function" ? e[t] : (wr[r] = n, n.bind(e));
}
function ea(s) {
  return me("Node", s, "childNodes");
}
function ta(s) {
  return me("Node", s, "parentNode");
}
function ra(s) {
  return me("Node", s, "parentElement");
}
function sa(s) {
  return me("Node", s, "textContent");
}
function ia(s, e) {
  return Hi("Node", s, "contains")(e);
}
function na(s) {
  return Hi("Node", s, "getRootNode")();
}
function oa(s) {
  return !s || !("host" in s) ? null : me("ShadowRoot", s, "host");
}
function aa(s) {
  return s.styleSheets;
}
function la(s) {
  return !s || !("shadowRoot" in s) ? null : me("Element", s, "shadowRoot");
}
function ua(s, e) {
  return me("Element", s, "querySelector")(e);
}
function ca(s, e) {
  return me("Element", s, "querySelectorAll")(e);
}
function ha() {
  return fs("MutationObserver").constructor;
}
const Y = {
  childNodes: ea,
  parentNode: ta,
  parentElement: ra,
  textContent: sa,
  contains: ia,
  getRootNode: na,
  host: oa,
  styleSheets: aa,
  shadowRoot: la,
  querySelector: ua,
  querySelectorAll: ca,
  mutationObserver: ha
};
function Yi(s) {
  return s.nodeType === s.ELEMENT_NODE;
}
function Ye(s) {
  const e = (
    // anchor and textarea elements also have a `host` property
    // but only shadow roots have a `mode` property
    s && "host" in s && "mode" in s && Y.host(s) || null
  );
  return !!(e && "shadowRoot" in e && Y.shadowRoot(e) === s);
}
function Ze(s) {
  return Object.prototype.toString.call(s) === "[object ShadowRoot]";
}
function fa(s) {
  return s.includes(" background-clip: text;") && !s.includes(" -webkit-background-clip: text;") && (s = s.replace(
    /\sbackground-clip:\s*text;/g,
    " -webkit-background-clip: text; background-clip: text;"
  )), s;
}
function pa(s) {
  const { cssText: e } = s;
  if (e.split('"').length < 3) return e;
  const t = ["@import", `url(${JSON.stringify(s.href)})`];
  return s.layerName === "" ? t.push("layer") : s.layerName && t.push(`layer(${s.layerName})`), s.supportsText && t.push(`supports(${s.supportsText})`), s.media.length && t.push(s.media.mediaText), t.join(" ") + ";";
}
function kr(s) {
  try {
    const e = s.rules || s.cssRules;
    if (!e)
      return null;
    let t = s.href;
    !t && s.ownerNode && s.ownerNode.ownerDocument && (t = s.ownerNode.ownerDocument.location.href);
    const r = Array.from(
      e,
      (i) => Zi(i, t)
    ).join("");
    return fa(r);
  } catch {
    return null;
  }
}
function Zi(s, e) {
  if (ma(s)) {
    let t;
    try {
      t = // for same-origin stylesheets,
      // we can access the imported stylesheet rules directly
      kr(s.styleSheet) || // work around browser issues with the raw string `@import url(...)` statement
      pa(s);
    } catch {
      t = s.cssText;
    }
    return s.styleSheet.href ? Gt(t, s.styleSheet.href) : t;
  } else {
    let t = s.cssText;
    return ga(s) && s.selectorText.includes(":") && (t = da(t)), e ? Gt(t, e) : t;
  }
}
function da(s) {
  const e = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return s.replace(e, "$1\\$2");
}
function ma(s) {
  return "styleSheet" in s;
}
function ga(s) {
  return "selectorText" in s;
}
class Ji {
  constructor() {
    Vs(this, "idNodeMap", /* @__PURE__ */ new Map()), Vs(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
  }
  getId(e) {
    var t;
    return e ? ((t = this.getMeta(e)) == null ? void 0 : t.id) ?? -1 : -1;
  }
  getNode(e) {
    return this.idNodeMap.get(e) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(e) {
    return this.nodeMetaMap.get(e) || null;
  }
  // removes the node from idNodeMap
  // doesn't remove the node from nodeMetaMap
  removeNodeFromMap(e) {
    const t = this.getId(e);
    this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach(
      (r) => this.removeNodeFromMap(r)
    );
  }
  has(e) {
    return this.idNodeMap.has(e);
  }
  hasNode(e) {
    return this.nodeMetaMap.has(e);
  }
  add(e, t) {
    const r = t.id;
    this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t);
  }
  replace(e, t) {
    const r = this.getNode(e);
    if (r) {
      const i = this.nodeMetaMap.get(r);
      i && this.nodeMetaMap.set(t, i);
    }
    this.idNodeMap.set(e, t);
  }
  reset() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
}
function ya() {
  return new Ji();
}
function ps({
  element: s,
  maskInputOptions: e,
  tagName: t,
  type: r,
  value: i,
  maskInputFn: n
}) {
  let o = i || "";
  const l = r && ve(r);
  return (e[t.toLowerCase()] || l && e[l]) && (n ? o = n(o, s) : o = "*".repeat(o.length)), o;
}
function ve(s) {
  return s.toLowerCase();
}
const Hs = "__rrweb_original__";
function wa(s) {
  const e = s.getContext("2d");
  if (!e) return !0;
  const t = 50;
  for (let r = 0; r < s.width; r += t)
    for (let i = 0; i < s.height; i += t) {
      const n = e.getImageData, o = Hs in n ? n[Hs] : n;
      if (new Uint32Array(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        o.call(
          e,
          r,
          i,
          Math.min(t, s.width - r),
          Math.min(t, s.height - i)
        ).data.buffer
      ).some((a) => a !== 0)) return !1;
    }
  return !0;
}
function ds(s) {
  const e = s.type;
  return s.hasAttribute("data-rr-is-password") ? "password" : e ? (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    ve(e)
  ) : null;
}
function Xi(s, e) {
  let t;
  try {
    t = new URL(s, e ?? window.location.href);
  } catch {
    return null;
  }
  const r = /\.([0-9a-z]+)(?:$)/i, i = t.pathname.match(r);
  return (i == null ? void 0 : i[1]) ?? null;
}
function Sa(s) {
  let e = "";
  return s.indexOf("//") > -1 ? e = s.split("/").slice(0, 3).join("/") : e = s.split("/")[0], e = e.split("?")[0], e;
}
const ba = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, Ca = /^(?:[a-z+]+:)?\/\//i, va = /^www\..*/i, Ia = /^(data:)([^,]*),(.*)/i;
function Gt(s, e) {
  return (s || "").replace(
    ba,
    (t, r, i, n, o, l) => {
      const a = i || o || l, u = r || n || "";
      if (!a)
        return t;
      if (Ca.test(a) || va.test(a))
        return `url(${u}${a}${u})`;
      if (Ia.test(a))
        return `url(${u}${a}${u})`;
      if (a[0] === "/")
        return `url(${u}${Sa(e) + a}${u})`;
      const c = e.split("/"), h = a.split("/");
      c.pop();
      for (const d of h)
        d !== "." && (d === ".." ? c.pop() : c.push(d));
      return `url(${u}${c.join("/")}${u})`;
    }
  );
}
function Sr(s) {
  return s.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "");
}
function xa(s, e) {
  const t = Array.from(e.childNodes), r = [];
  if (t.length > 1 && s && typeof s == "string") {
    const i = Sr(s);
    for (let n = 1; n < t.length; n++)
      if (t[n].textContent && typeof t[n].textContent == "string") {
        const o = Sr(t[n].textContent);
        for (let l = 3; l < o.length; l++) {
          const a = o.substring(0, l);
          if (i.split(a).length === 2) {
            const u = i.indexOf(a);
            for (let c = u; c < s.length; c++)
              if (Sr(s.substring(0, c)).length === u) {
                r.push(s.substring(0, c)), s = s.substring(c);
                break;
              }
            break;
          }
        }
      }
  }
  return r.push(s), r;
}
function Ra(s, e) {
  return xa(s, e).join("/* rr_split */");
}
let Oa = 1;
const Aa = new RegExp("[^a-z0-9-_:]"), Ke = -2;
function Ki() {
  return Oa++;
}
function Ea(s) {
  if (s instanceof HTMLFormElement)
    return "form";
  const e = ve(s.tagName);
  return Aa.test(e) ? "div" : e;
}
let Re, Ys;
const Ma = /^[^ \t\n\r\u000c]+/, $a = /^[, \t\n\r\u000c]+/;
function Na(s, e) {
  if (e.trim() === "")
    return e;
  let t = 0;
  function r(n) {
    let o;
    const l = n.exec(e.substring(t));
    return l ? (o = l[0], t += o.length, o) : "";
  }
  const i = [];
  for (; r($a), !(t >= e.length); ) {
    let n = r(Ma);
    if (n.slice(-1) === ",")
      n = Ee(s, n.substring(0, n.length - 1)), i.push(n);
    else {
      let o = "";
      n = Ee(s, n);
      let l = !1;
      for (; ; ) {
        const a = e.charAt(t);
        if (a === "") {
          i.push((n + o).trim());
          break;
        } else if (l)
          a === ")" && (l = !1);
        else if (a === ",") {
          t += 1, i.push((n + o).trim());
          break;
        } else a === "(" && (l = !0);
        o += a, t += 1;
      }
    }
  }
  return i.join(", ");
}
const Zs = /* @__PURE__ */ new WeakMap();
function Ee(s, e) {
  return !e || e.trim() === "" ? e : ms(s, e);
}
function ka(s) {
  return !!(s.tagName === "svg" || s.ownerSVGElement);
}
function ms(s, e) {
  let t = Zs.get(s);
  if (t || (t = s.createElement("a"), Zs.set(s, t)), !e)
    e = "";
  else if (e.startsWith("blob:") || e.startsWith("data:"))
    return e;
  return t.setAttribute("href", e), t.href;
}
function Qi(s, e, t, r) {
  return r && (t === "src" || t === "href" && !(e === "use" && r[0] === "#") || t === "xlink:href" && r[0] !== "#" || t === "background" && (e === "table" || e === "td" || e === "th") ? Ee(s, r) : t === "srcset" ? Na(s, r) : t === "style" ? Gt(r, ms(s)) : e === "object" && t === "data" ? Ee(s, r) : r);
}
function qi(s, e, t) {
  return (s === "video" || s === "audio") && e === "autoplay";
}
function Pa(s, e, t) {
  try {
    if (typeof e == "string") {
      if (s.classList.contains(e))
        return !0;
    } else
      for (let r = s.classList.length; r--; ) {
        const i = s.classList[r];
        if (e.test(i))
          return !0;
      }
    if (t)
      return s.matches(t);
  } catch {
  }
  return !1;
}
function jt(s, e, t) {
  if (!s) return !1;
  if (s.nodeType !== s.ELEMENT_NODE)
    return t ? jt(Y.parentNode(s), e, t) : !1;
  for (let r = s.classList.length; r--; ) {
    const i = s.classList[r];
    if (e.test(i))
      return !0;
  }
  return t ? jt(Y.parentNode(s), e, t) : !1;
}
function en(s, e, t, r) {
  let i;
  if (Yi(s)) {
    if (i = s, !Y.childNodes(i).length)
      return !1;
  } else {
    if (Y.parentElement(s) === null)
      return !1;
    i = Y.parentElement(s);
  }
  try {
    if (typeof e == "string") {
      if (r) {
        if (i.closest(`.${e}`)) return !0;
      } else if (i.classList.contains(e)) return !0;
    } else if (jt(i, e, r)) return !0;
    if (t) {
      if (r) {
        if (i.closest(t)) return !0;
      } else if (i.matches(t)) return !0;
    }
  } catch {
  }
  return !1;
}
function Ta(s, e, t) {
  const r = s.contentWindow;
  if (!r)
    return;
  let i = !1, n;
  try {
    n = r.document.readyState;
  } catch {
    return;
  }
  if (n !== "complete") {
    const l = setTimeout(() => {
      i || (e(), i = !0);
    }, t);
    s.addEventListener("load", () => {
      clearTimeout(l), i = !0, e();
    });
    return;
  }
  const o = "about:blank";
  if (r.location.href !== o || s.src === o || s.src === "")
    return setTimeout(e, 0), s.addEventListener("load", e);
  s.addEventListener("load", e);
}
function Da(s, e, t) {
  let r = !1, i;
  try {
    i = s.sheet;
  } catch {
    return;
  }
  if (i) return;
  const n = setTimeout(() => {
    r || (e(), r = !0);
  }, t);
  s.addEventListener("load", () => {
    clearTimeout(n), r = !0, e();
  });
}
function _a(s, e) {
  const {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    needsMask: o,
    inlineStylesheet: l,
    maskInputOptions: a = {},
    maskTextFn: u,
    maskInputFn: c,
    dataURLOptions: h = {},
    inlineImages: d,
    recordCanvas: m,
    keepIframeSrcFn: g,
    newlyAddedElement: p = !1,
    cssCaptured: f = !1
  } = e, S = La(t, r);
  switch (s.nodeType) {
    case s.DOCUMENT_NODE:
      return s.compatMode !== "CSS1Compat" ? {
        type: G.Document,
        childNodes: [],
        compatMode: s.compatMode
        // probably "BackCompat"
      } : {
        type: G.Document,
        childNodes: []
      };
    case s.DOCUMENT_TYPE_NODE:
      return {
        type: G.DocumentType,
        name: s.name,
        publicId: s.publicId,
        systemId: s.systemId,
        rootId: S
      };
    case s.ELEMENT_NODE:
      return Ua(s, {
        doc: t,
        blockClass: i,
        blockSelector: n,
        inlineStylesheet: l,
        maskInputOptions: a,
        maskInputFn: c,
        dataURLOptions: h,
        inlineImages: d,
        recordCanvas: m,
        keepIframeSrcFn: g,
        newlyAddedElement: p,
        rootId: S
      });
    case s.TEXT_NODE:
      return Fa(s, {
        doc: t,
        needsMask: o,
        maskTextFn: u,
        rootId: S,
        cssCaptured: f
      });
    case s.CDATA_SECTION_NODE:
      return {
        type: G.CDATA,
        textContent: "",
        rootId: S
      };
    case s.COMMENT_NODE:
      return {
        type: G.Comment,
        textContent: Y.textContent(s) || "",
        rootId: S
      };
    default:
      return !1;
  }
}
function La(s, e) {
  if (!e.hasNode(s)) return;
  const t = e.getId(s);
  return t === 1 ? void 0 : t;
}
function Fa(s, e) {
  const { needsMask: t, maskTextFn: r, rootId: i, cssCaptured: n } = e, o = Y.parentNode(s), l = o && o.tagName;
  let a = "";
  const u = l === "STYLE" ? !0 : void 0, c = l === "SCRIPT" ? !0 : void 0;
  return c ? a = "SCRIPT_PLACEHOLDER" : n || (a = Y.textContent(s), u && a && (a = Gt(a, ms(e.doc)))), !u && !c && a && t && (a = r ? r(a, Y.parentElement(s)) : a.replace(/[\S]/g, "*")), {
    type: G.Text,
    textContent: a || "",
    rootId: i
  };
}
function Ua(s, e) {
  const {
    doc: t,
    blockClass: r,
    blockSelector: i,
    inlineStylesheet: n,
    maskInputOptions: o = {},
    maskInputFn: l,
    dataURLOptions: a = {},
    inlineImages: u,
    recordCanvas: c,
    keepIframeSrcFn: h,
    newlyAddedElement: d = !1,
    rootId: m
  } = e, g = Pa(s, r, i), p = Ea(s);
  let f = {};
  const S = s.attributes.length;
  for (let y = 0; y < S; y++) {
    const C = s.attributes[y];
    qi(p, C.name, C.value) || (f[C.name] = Qi(
      t,
      p,
      ve(C.name),
      C.value
    ));
  }
  if (p === "link" && n) {
    const y = Array.from(t.styleSheets).find(($) => $.href === s.href);
    let C = null;
    y && (C = kr(y)), C && (delete f.rel, delete f.href, f._cssText = C);
  }
  if (p === "style" && s.sheet) {
    let y = kr(
      s.sheet
    );
    y && (s.childNodes.length > 1 && (y = Ra(y, s)), f._cssText = y);
  }
  if (p === "input" || p === "textarea" || p === "select") {
    const y = s.value, C = s.checked;
    f.type !== "radio" && f.type !== "checkbox" && f.type !== "submit" && f.type !== "button" && y ? f.value = ps({
      element: s,
      type: ds(s),
      tagName: p,
      value: y,
      maskInputOptions: o,
      maskInputFn: l
    }) : C && (f.checked = C);
  }
  if (p === "option" && (s.selected && !o.select ? f.selected = !0 : delete f.selected), p === "dialog" && s.open && (f.rr_open_mode = s.matches("dialog:modal") ? "modal" : "non-modal"), p === "canvas" && c) {
    if (s.__context === "2d")
      wa(s) || (f.rr_dataURL = s.toDataURL(
        a.type,
        a.quality
      ));
    else if (!("__context" in s)) {
      const y = s.toDataURL(
        a.type,
        a.quality
      ), C = t.createElement("canvas");
      C.width = s.width, C.height = s.height;
      const $ = C.toDataURL(
        a.type,
        a.quality
      );
      y !== $ && (f.rr_dataURL = y);
    }
  }
  if (p === "img" && u) {
    Re || (Re = t.createElement("canvas"), Ys = Re.getContext("2d"));
    const y = s, C = y.currentSrc || y.getAttribute("src") || "<unknown-src>", $ = y.crossOrigin, P = () => {
      y.removeEventListener("load", P);
      try {
        Re.width = y.naturalWidth, Re.height = y.naturalHeight, Ys.drawImage(y, 0, 0), f.rr_dataURL = Re.toDataURL(
          a.type,
          a.quality
        );
      } catch (j) {
        if (y.crossOrigin !== "anonymous") {
          y.crossOrigin = "anonymous", y.complete && y.naturalWidth !== 0 ? P() : y.addEventListener("load", P);
          return;
        } else
          console.warn(
            `Cannot inline img src=${C}! Error: ${j}`
          );
      }
      y.crossOrigin === "anonymous" && ($ ? f.crossOrigin = $ : y.removeAttribute("crossorigin"));
    };
    y.complete && y.naturalWidth !== 0 ? P() : y.addEventListener("load", P);
  }
  if (p === "audio" || p === "video") {
    const y = f;
    y.rr_mediaState = s.paused ? "paused" : "played", y.rr_mediaCurrentTime = s.currentTime, y.rr_mediaPlaybackRate = s.playbackRate, y.rr_mediaMuted = s.muted, y.rr_mediaLoop = s.loop, y.rr_mediaVolume = s.volume;
  }
  if (d || (s.scrollLeft && (f.rr_scrollLeft = s.scrollLeft), s.scrollTop && (f.rr_scrollTop = s.scrollTop)), g) {
    const { width: y, height: C } = s.getBoundingClientRect();
    f = {
      class: f.class,
      rr_width: `${y}px`,
      rr_height: `${C}px`
    };
  }
  p === "iframe" && !h(f.src) && (s.contentDocument || (f.rr_src = f.src), delete f.src);
  let b;
  try {
    customElements.get(p) && (b = !0);
  } catch {
  }
  return {
    type: G.Element,
    tagName: p,
    attributes: f,
    childNodes: [],
    isSVG: ka(s) || void 0,
    needBlock: g,
    rootId: m,
    isCustom: b
  };
}
function k(s) {
  return s == null ? "" : s.toLowerCase();
}
function Ba(s, e) {
  if (e.comment && s.type === G.Comment)
    return !0;
  if (s.type === G.Element) {
    if (e.script && // script tag
    (s.tagName === "script" || // (module)preload link
    s.tagName === "link" && (s.attributes.rel === "preload" || s.attributes.rel === "modulepreload") && s.attributes.as === "script" || // prefetch link
    s.tagName === "link" && s.attributes.rel === "prefetch" && typeof s.attributes.href == "string" && Xi(s.attributes.href) === "js"))
      return !0;
    if (e.headFavicon && (s.tagName === "link" && s.attributes.rel === "shortcut icon" || s.tagName === "meta" && (k(s.attributes.name).match(
      /^msapplication-tile(image|color)$/
    ) || k(s.attributes.name) === "application-name" || k(s.attributes.rel) === "icon" || k(s.attributes.rel) === "apple-touch-icon" || k(s.attributes.rel) === "shortcut icon")))
      return !0;
    if (s.tagName === "meta") {
      if (e.headMetaDescKeywords && k(s.attributes.name).match(/^description|keywords$/))
        return !0;
      if (e.headMetaSocial && (k(s.attributes.property).match(/^(og|twitter|fb):/) || // og = opengraph (facebook)
      k(s.attributes.name).match(/^(og|twitter):/) || k(s.attributes.name) === "pinterest"))
        return !0;
      if (e.headMetaRobots && (k(s.attributes.name) === "robots" || k(s.attributes.name) === "googlebot" || k(s.attributes.name) === "bingbot"))
        return !0;
      if (e.headMetaHttpEquiv && s.attributes["http-equiv"] !== void 0)
        return !0;
      if (e.headMetaAuthorship && (k(s.attributes.name) === "author" || k(s.attributes.name) === "generator" || k(s.attributes.name) === "framework" || k(s.attributes.name) === "publisher" || k(s.attributes.name) === "progid" || k(s.attributes.property).match(/^article:/) || k(s.attributes.property).match(/^product:/)))
        return !0;
      if (e.headMetaVerification && (k(s.attributes.name) === "google-site-verification" || k(s.attributes.name) === "yandex-verification" || k(s.attributes.name) === "csrf-token" || k(s.attributes.name) === "p:domain_verify" || k(s.attributes.name) === "verify-v1" || k(s.attributes.name) === "verification" || k(s.attributes.name) === "shopify-checkout-api-token"))
        return !0;
    }
  }
  return !1;
}
function Me(s, e) {
  const {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    maskTextClass: o,
    maskTextSelector: l,
    skipChild: a = !1,
    inlineStylesheet: u = !0,
    maskInputOptions: c = {},
    maskTextFn: h,
    maskInputFn: d,
    slimDOMOptions: m,
    dataURLOptions: g = {},
    inlineImages: p = !1,
    recordCanvas: f = !1,
    onSerialize: S,
    onIframeLoad: b,
    iframeLoadTimeout: y = 5e3,
    onStylesheetLoad: C,
    stylesheetLoadTimeout: $ = 5e3,
    keepIframeSrcFn: P = () => !1,
    newlyAddedElement: j = !1,
    cssCaptured: _ = !1
  } = e;
  let { needsMask: W } = e, { preserveWhiteSpace: H = !0 } = e;
  W || (W = en(
    s,
    o,
    l,
    W === void 0
  ));
  const Q = _a(s, {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    needsMask: W,
    inlineStylesheet: u,
    maskInputOptions: c,
    maskTextFn: h,
    maskInputFn: d,
    dataURLOptions: g,
    inlineImages: p,
    recordCanvas: f,
    keepIframeSrcFn: P,
    newlyAddedElement: j,
    cssCaptured: _
  });
  if (!Q)
    return console.warn(s, "not serialized"), null;
  let oe;
  r.hasNode(s) ? oe = r.getId(s) : Ba(Q, m) || !H && Q.type === G.Text && !Q.textContent.replace(/^\s+|\s+$/gm, "").length ? oe = Ke : oe = Ki();
  const O = Object.assign(Q, { id: oe });
  if (r.add(s, O), oe === Ke)
    return null;
  S && S(s);
  let Be = !a;
  if (O.type === G.Element) {
    Be = Be && !O.needBlock, delete O.needBlock;
    const V = Y.shadowRoot(s);
    V && Ze(V) && (O.isShadowHost = !0);
  }
  if ((O.type === G.Document || O.type === G.Element) && Be) {
    m.headWhitespace && O.type === G.Element && O.tagName === "head" && (H = !1);
    const V = {
      doc: t,
      mirror: r,
      blockClass: i,
      blockSelector: n,
      needsMask: W,
      maskTextClass: o,
      maskTextSelector: l,
      skipChild: a,
      inlineStylesheet: u,
      maskInputOptions: c,
      maskTextFn: h,
      maskInputFn: d,
      slimDOMOptions: m,
      dataURLOptions: g,
      inlineImages: p,
      recordCanvas: f,
      preserveWhiteSpace: H,
      onSerialize: S,
      onIframeLoad: b,
      iframeLoadTimeout: y,
      onStylesheetLoad: C,
      stylesheetLoadTimeout: $,
      keepIframeSrcFn: P,
      cssCaptured: !1
    };
    if (!(O.type === G.Element && O.tagName === "textarea" && O.attributes.value !== void 0)) {
      O.type === G.Element && O.attributes._cssText !== void 0 && typeof O.attributes._cssText == "string" && (V.cssCaptured = !0);
      for (const ye of Array.from(Y.childNodes(s))) {
        const ae = Me(ye, V);
        ae && O.childNodes.push(ae);
      }
    }
    let q = null;
    if (Yi(s) && (q = Y.shadowRoot(s)))
      for (const ye of Array.from(Y.childNodes(q))) {
        const ae = Me(ye, V);
        ae && (Ze(q) && (ae.isShadow = !0), O.childNodes.push(ae));
      }
  }
  const ze = Y.parentNode(s);
  return ze && Ye(ze) && Ze(ze) && (O.isShadow = !0), O.type === G.Element && O.tagName === "iframe" && Ta(
    s,
    () => {
      const V = s.contentDocument;
      if (V && b) {
        const q = Me(V, {
          doc: V,
          mirror: r,
          blockClass: i,
          blockSelector: n,
          needsMask: W,
          maskTextClass: o,
          maskTextSelector: l,
          skipChild: !1,
          inlineStylesheet: u,
          maskInputOptions: c,
          maskTextFn: h,
          maskInputFn: d,
          slimDOMOptions: m,
          dataURLOptions: g,
          inlineImages: p,
          recordCanvas: f,
          preserveWhiteSpace: H,
          onSerialize: S,
          onIframeLoad: b,
          iframeLoadTimeout: y,
          onStylesheetLoad: C,
          stylesheetLoadTimeout: $,
          keepIframeSrcFn: P
        });
        q && b(
          s,
          q
        );
      }
    },
    y
  ), O.type === G.Element && O.tagName === "link" && typeof O.attributes.rel == "string" && (O.attributes.rel === "stylesheet" || O.attributes.rel === "preload" && typeof O.attributes.href == "string" && Xi(O.attributes.href) === "css") && Da(
    s,
    () => {
      if (C) {
        const V = Me(s, {
          doc: t,
          mirror: r,
          blockClass: i,
          blockSelector: n,
          needsMask: W,
          maskTextClass: o,
          maskTextSelector: l,
          skipChild: !1,
          inlineStylesheet: u,
          maskInputOptions: c,
          maskTextFn: h,
          maskInputFn: d,
          slimDOMOptions: m,
          dataURLOptions: g,
          inlineImages: p,
          recordCanvas: f,
          preserveWhiteSpace: H,
          onSerialize: S,
          onIframeLoad: b,
          iframeLoadTimeout: y,
          onStylesheetLoad: C,
          stylesheetLoadTimeout: $,
          keepIframeSrcFn: P
        });
        V && C(
          s,
          V
        );
      }
    },
    $
  ), O;
}
function za(s, e) {
  const {
    mirror: t = new Ji(),
    blockClass: r = "rr-block",
    blockSelector: i = null,
    maskTextClass: n = "rr-mask",
    maskTextSelector: o = null,
    inlineStylesheet: l = !0,
    inlineImages: a = !1,
    recordCanvas: u = !1,
    maskAllInputs: c = !1,
    maskTextFn: h,
    maskInputFn: d,
    slimDOM: m = !1,
    dataURLOptions: g,
    preserveWhiteSpace: p,
    onSerialize: f,
    onIframeLoad: S,
    iframeLoadTimeout: b,
    onStylesheetLoad: y,
    stylesheetLoadTimeout: C,
    keepIframeSrcFn: $ = () => !1
  } = e || {};
  return Me(s, {
    doc: s,
    mirror: t,
    blockClass: r,
    blockSelector: i,
    maskTextClass: n,
    maskTextSelector: o,
    skipChild: !1,
    inlineStylesheet: l,
    maskInputOptions: c === !0 ? {
      color: !0,
      date: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
      textarea: !0,
      select: !0,
      password: !0
    } : c === !1 ? {
      password: !0
    } : c,
    maskTextFn: h,
    maskInputFn: d,
    slimDOMOptions: m === !0 || m === "all" ? (
      // if true: set of sensible options that should not throw away any information
      {
        script: !0,
        comment: !0,
        headFavicon: !0,
        headWhitespace: !0,
        headMetaDescKeywords: m === "all",
        // destructive
        headMetaSocial: !0,
        headMetaRobots: !0,
        headMetaHttpEquiv: !0,
        headMetaAuthorship: !0,
        headMetaVerification: !0
      }
    ) : m === !1 ? {} : m,
    dataURLOptions: g,
    inlineImages: a,
    recordCanvas: u,
    preserveWhiteSpace: p,
    onSerialize: f,
    onIframeLoad: S,
    iframeLoadTimeout: b,
    onStylesheetLoad: y,
    stylesheetLoadTimeout: C,
    keepIframeSrcFn: $,
    newlyAddedElement: !1
  });
}
function Wa(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Va(s) {
  if (s.__esModule) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(s, r);
    Object.defineProperty(t, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[r];
      }
    });
  }), t;
}
var gs = { exports: {} }, T = String, tn = function() {
  return { isColorSupported: !1, reset: T, bold: T, dim: T, italic: T, underline: T, inverse: T, hidden: T, strikethrough: T, black: T, red: T, green: T, yellow: T, blue: T, magenta: T, cyan: T, white: T, gray: T, bgBlack: T, bgRed: T, bgGreen: T, bgYellow: T, bgBlue: T, bgMagenta: T, bgCyan: T, bgWhite: T };
};
gs.exports = tn();
gs.exports.createColors = tn;
var Ga = gs.exports;
const ja = {}, Ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" })), ie = /* @__PURE__ */ Va(Ha);
let Js = Ga, Xs = ie, Pr = class rn extends Error {
  constructor(e, t, r, i, n, o) {
    super(e), this.name = "CssSyntaxError", this.reason = e, n && (this.file = n), i && (this.source = i), o && (this.plugin = o), typeof t < "u" && typeof r < "u" && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, rn);
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }
  showSourceCode(e) {
    if (!this.source) return "";
    let t = this.source;
    e == null && (e = Js.isColorSupported), Xs && e && (t = Xs(t));
    let r = t.split(/\r?\n/), i = Math.max(this.line - 3, 0), n = Math.min(this.line + 2, r.length), o = String(n).length, l, a;
    if (e) {
      let { bold: u, gray: c, red: h } = Js.createColors(!0);
      l = (d) => u(h(d)), a = (d) => c(d);
    } else
      l = a = (u) => u;
    return r.slice(i, n).map((u, c) => {
      let h = i + 1 + c, d = " " + (" " + h).slice(-o) + " | ";
      if (h === this.line) {
        let m = a(d.replace(/\d/g, " ")) + u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return l(">") + a(d) + u + `
 ` + m + l("^");
      }
      return " " + a(d) + u;
    }).join(`
`);
  }
  toString() {
    let e = this.showSourceCode();
    return e && (e = `

` + e + `
`), this.name + ": " + this.message + e;
  }
};
var ys = Pr;
Pr.default = Pr;
var at = {};
at.isClean = Symbol("isClean");
at.my = Symbol("my");
const Ks = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function Ya(s) {
  return s[0].toUpperCase() + s.slice(1);
}
let Tr = class {
  constructor(e) {
    this.builder = e;
  }
  atrule(e, t) {
    let r = "@" + e.name, i = e.params ? this.rawValue(e, "params") : "";
    if (typeof e.raws.afterName < "u" ? r += e.raws.afterName : i && (r += " "), e.nodes)
      this.block(e, r + i);
    else {
      let n = (e.raws.between || "") + (t ? ";" : "");
      this.builder(r + i + n, e);
    }
  }
  beforeAfter(e, t) {
    let r;
    e.type === "decl" ? r = this.raw(e, null, "beforeDecl") : e.type === "comment" ? r = this.raw(e, null, "beforeComment") : t === "before" ? r = this.raw(e, null, "beforeRule") : r = this.raw(e, null, "beforeClose");
    let i = e.parent, n = 0;
    for (; i && i.type !== "root"; )
      n += 1, i = i.parent;
    if (r.includes(`
`)) {
      let o = this.raw(e, null, "indent");
      if (o.length)
        for (let l = 0; l < n; l++) r += o;
    }
    return r;
  }
  block(e, t) {
    let r = this.raw(e, "between", "beforeOpen");
    this.builder(t + r + "{", e, "start");
    let i;
    e.nodes && e.nodes.length ? (this.body(e), i = this.raw(e, "after")) : i = this.raw(e, "after", "emptyBody"), i && this.builder(i), this.builder("}", e, "end");
  }
  body(e) {
    let t = e.nodes.length - 1;
    for (; t > 0 && e.nodes[t].type === "comment"; )
      t -= 1;
    let r = this.raw(e, "semicolon");
    for (let i = 0; i < e.nodes.length; i++) {
      let n = e.nodes[i], o = this.raw(n, "before");
      o && this.builder(o), this.stringify(n, t !== i || r);
    }
  }
  comment(e) {
    let t = this.raw(e, "left", "commentLeft"), r = this.raw(e, "right", "commentRight");
    this.builder("/*" + t + e.text + r + "*/", e);
  }
  decl(e, t) {
    let r = this.raw(e, "between", "colon"), i = e.prop + r + this.rawValue(e, "value");
    e.important && (i += e.raws.important || " !important"), t && (i += ";"), this.builder(i, e);
  }
  document(e) {
    this.body(e);
  }
  raw(e, t, r) {
    let i;
    if (r || (r = t), t && (i = e.raws[t], typeof i < "u"))
      return i;
    let n = e.parent;
    if (r === "before" && (!n || n.type === "root" && n.first === e || n && n.type === "document"))
      return "";
    if (!n) return Ks[r];
    let o = e.root();
    if (o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u")
      return o.rawCache[r];
    if (r === "before" || r === "after")
      return this.beforeAfter(e, r);
    {
      let l = "raw" + Ya(r);
      this[l] ? i = this[l](o, e) : o.walk((a) => {
        if (i = a.raws[t], typeof i < "u") return !1;
      });
    }
    return typeof i > "u" && (i = Ks[r]), o.rawCache[r] = i, i;
  }
  rawBeforeClose(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
        return t = r.raws.after, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawBeforeComment(e, t) {
    let r;
    return e.walkComments((i) => {
      if (typeof i.raws.before < "u")
        return r = i.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeDecl") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeDecl(e, t) {
    let r;
    return e.walkDecls((i) => {
      if (typeof i.raws.before < "u")
        return r = i.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeRule") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeOpen(e) {
    let t;
    return e.walk((r) => {
      if (r.type !== "decl" && (t = r.raws.between, typeof t < "u"))
        return !1;
    }), t;
  }
  rawBeforeRule(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && (r.parent !== e || e.first !== r) && typeof r.raws.before < "u")
        return t = r.raws.before, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawColon(e) {
    let t;
    return e.walkDecls((r) => {
      if (typeof r.raws.between < "u")
        return t = r.raws.between.replace(/[^\s:]/g, ""), !1;
    }), t;
  }
  rawEmptyBody(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length === 0 && (t = r.raws.after, typeof t < "u"))
        return !1;
    }), t;
  }
  rawIndent(e) {
    if (e.raws.indent) return e.raws.indent;
    let t;
    return e.walk((r) => {
      let i = r.parent;
      if (i && i !== e && i.parent && i.parent === e && typeof r.raws.before < "u") {
        let n = r.raws.before.split(`
`);
        return t = n[n.length - 1], t = t.replace(/\S/g, ""), !1;
      }
    }), t;
  }
  rawSemicolon(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length && r.last.type === "decl" && (t = r.raws.semicolon, typeof t < "u"))
        return !1;
    }), t;
  }
  rawValue(e, t) {
    let r = e[t], i = e.raws[t];
    return i && i.value === r ? i.raw : r;
  }
  root(e) {
    this.body(e), e.raws.after && this.builder(e.raws.after);
  }
  rule(e) {
    this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
  }
  stringify(e, t) {
    if (!this[e.type])
      throw new Error(
        "Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier."
      );
    this[e.type](e, t);
  }
};
var sn = Tr;
Tr.default = Tr;
let Za = sn;
function Dr(s, e) {
  new Za(e).stringify(s);
}
var sr = Dr;
Dr.default = Dr;
let { isClean: gt, my: Ja } = at, Xa = ys, Ka = sn, Qa = sr;
function _r(s, e) {
  let t = new s.constructor();
  for (let r in s) {
    if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache") continue;
    let i = s[r], n = typeof i;
    r === "parent" && n === "object" ? e && (t[r] = e) : r === "source" ? t[r] = i : Array.isArray(i) ? t[r] = i.map((o) => _r(o, t)) : (n === "object" && i !== null && (i = _r(i)), t[r] = i);
  }
  return t;
}
let Lr = class {
  constructor(e = {}) {
    this.raws = {}, this[gt] = !1, this[Ja] = !0;
    for (let t in e)
      if (t === "nodes") {
        this.nodes = [];
        for (let r of e[t])
          typeof r.clone == "function" ? this.append(r.clone()) : this.append(r);
      } else
        this[t] = e[t];
  }
  addToError(e) {
    if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
      let t = this.source;
      e.stack = e.stack.replace(
        /\n\s{4}at /,
        `$&${t.input.from}:${t.start.line}:${t.start.column}$&`
      );
    }
    return e;
  }
  after(e) {
    return this.parent.insertAfter(this, e), this;
  }
  assign(e = {}) {
    for (let t in e)
      this[t] = e[t];
    return this;
  }
  before(e) {
    return this.parent.insertBefore(this, e), this;
  }
  cleanRaws(e) {
    delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
  }
  clone(e = {}) {
    let t = _r(this);
    for (let r in e)
      t[r] = e[r];
    return t;
  }
  cloneAfter(e = {}) {
    let t = this.clone(e);
    return this.parent.insertAfter(this, t), t;
  }
  cloneBefore(e = {}) {
    let t = this.clone(e);
    return this.parent.insertBefore(this, t), t;
  }
  error(e, t = {}) {
    if (this.source) {
      let { end: r, start: i } = this.rangeBy(t);
      return this.source.input.error(
        e,
        { column: i.column, line: i.line },
        { column: r.column, line: r.line },
        t
      );
    }
    return new Xa(e);
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || /* c8 ignore next */
        t === "text") && e.markDirty()), !0;
      }
    };
  }
  markDirty() {
    if (this[gt]) {
      this[gt] = !1;
      let e = this;
      for (; e = e.parent; )
        e[gt] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e + 1];
  }
  positionBy(e, t) {
    let r = this.source.start;
    if (e.index)
      r = this.positionInside(e.index, t);
    else if (e.word) {
      t = this.toString();
      let i = t.indexOf(e.word);
      i !== -1 && (r = this.positionInside(i, t));
    }
    return r;
  }
  positionInside(e, t) {
    let r = t || this.toString(), i = this.source.start.column, n = this.source.start.line;
    for (let o = 0; o < e; o++)
      r[o] === `
` ? (i = 1, n += 1) : i += 1;
    return { column: i, line: n };
  }
  prev() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e - 1];
  }
  rangeBy(e) {
    let t = {
      column: this.source.start.column,
      line: this.source.start.line
    }, r = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: t.column + 1,
      line: t.line
    };
    if (e.word) {
      let i = this.toString(), n = i.indexOf(e.word);
      n !== -1 && (t = this.positionInside(n, i), r = this.positionInside(n + e.word.length, i));
    } else
      e.start ? t = {
        column: e.start.column,
        line: e.start.line
      } : e.index && (t = this.positionInside(e.index)), e.end ? r = {
        column: e.end.column,
        line: e.end.line
      } : typeof e.endIndex == "number" ? r = this.positionInside(e.endIndex) : e.index && (r = this.positionInside(e.index + 1));
    return (r.line < t.line || r.line === t.line && r.column <= t.column) && (r = { column: t.column + 1, line: t.line }), { end: r, start: t };
  }
  raw(e, t) {
    return new Ka().raw(this, e, t);
  }
  remove() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }
  replaceWith(...e) {
    if (this.parent) {
      let t = this, r = !1;
      for (let i of e)
        i === this ? r = !0 : r ? (this.parent.insertAfter(t, i), t = i) : this.parent.insertBefore(t, i);
      r || this.remove();
    }
    return this;
  }
  root() {
    let e = this;
    for (; e.parent && e.parent.type !== "document"; )
      e = e.parent;
    return e;
  }
  toJSON(e, t) {
    let r = {}, i = t == null;
    t = t || /* @__PURE__ */ new Map();
    let n = 0;
    for (let o in this) {
      if (!Object.prototype.hasOwnProperty.call(this, o) || o === "parent" || o === "proxyCache") continue;
      let l = this[o];
      if (Array.isArray(l))
        r[o] = l.map((a) => typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a);
      else if (typeof l == "object" && l.toJSON)
        r[o] = l.toJSON(null, t);
      else if (o === "source") {
        let a = t.get(l.input);
        a == null && (a = n, t.set(l.input, n), n++), r[o] = {
          end: l.end,
          inputId: a,
          start: l.start
        };
      } else
        r[o] = l;
    }
    return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
  }
  toProxy() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }
  toString(e = Qa) {
    e.stringify && (e = e.stringify);
    let t = "";
    return e(this, (r) => {
      t += r;
    }), t;
  }
  warn(e, t, r) {
    let i = { node: this };
    for (let n in r) i[n] = r[n];
    return e.warn(t, i);
  }
  get proxyOf() {
    return this;
  }
};
var ir = Lr;
Lr.default = Lr;
let qa = ir, Fr = class extends qa {
  constructor(e) {
    e && typeof e.value < "u" && typeof e.value != "string" && (e = { ...e, value: String(e.value) }), super(e), this.type = "decl";
  }
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
};
var nr = Fr;
Fr.default = Fr;
let el = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", tl = (s = 21) => {
  let e = "", t = s;
  for (; t--; )
    e += el[Math.random() * 64 | 0];
  return e;
};
var rl = { nanoid: tl };
let { SourceMapConsumer: Qs, SourceMapGenerator: qs } = ie, { existsSync: sl, readFileSync: il } = ie, { dirname: br, join: nl } = ie;
function ol(s) {
  return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
}
let Ur = class {
  constructor(e, t) {
    if (t.map === !1) return;
    this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
    let r = t.map ? t.map.prev : void 0, i = this.loadMap(t.from, r);
    !this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = br(this.mapFile)), i && (this.text = i);
  }
  consumer() {
    return this.consumerCache || (this.consumerCache = new Qs(this.text)), this.consumerCache;
  }
  decodeInline(e) {
    let t = /^data:application\/json;charset=utf-?8;base64,/, r = /^data:application\/json;base64,/, i = /^data:application\/json;charset=utf-?8,/, n = /^data:application\/json,/;
    if (i.test(e) || n.test(e))
      return decodeURIComponent(e.substr(RegExp.lastMatch.length));
    if (t.test(e) || r.test(e))
      return ol(e.substr(RegExp.lastMatch.length));
    let o = e.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + o);
  }
  getAnnotationURL(e) {
    return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(e) {
    return typeof e != "object" ? !1 : typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections);
  }
  loadAnnotation(e) {
    let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!t) return;
    let r = e.lastIndexOf(t.pop()), i = e.indexOf("*/", r);
    r > -1 && i > -1 && (this.annotation = this.getAnnotationURL(e.substring(r, i)));
  }
  loadFile(e) {
    if (this.root = br(e), sl(e))
      return this.mapFile = e, il(e, "utf-8").toString().trim();
  }
  loadMap(e, t) {
    if (t === !1) return !1;
    if (t) {
      if (typeof t == "string")
        return t;
      if (typeof t == "function") {
        let r = t(e);
        if (r) {
          let i = this.loadFile(r);
          if (!i)
            throw new Error(
              "Unable to load previous source map: " + r.toString()
            );
          return i;
        }
      } else {
        if (t instanceof Qs)
          return qs.fromSourceMap(t).toString();
        if (t instanceof qs)
          return t.toString();
        if (this.isMap(t))
          return JSON.stringify(t);
        throw new Error(
          "Unsupported previous source map format: " + t.toString()
        );
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        let r = this.annotation;
        return e && (r = nl(br(e), r)), this.loadFile(r);
      }
    }
  }
  startWith(e, t) {
    return e ? e.substr(0, t.length) === t : !1;
  }
  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var nn = Ur;
Ur.default = Ur;
let { SourceMapConsumer: al, SourceMapGenerator: ll } = ie, { fileURLToPath: ei, pathToFileURL: yt } = ie, { isAbsolute: Br, resolve: zr } = ie, { nanoid: ul } = rl, Cr = ie, ti = ys, cl = nn, vr = Symbol("fromOffsetCache"), hl = !!(al && ll), ri = !!(zr && Br), Ht = class {
  constructor(e, t = {}) {
    if (e === null || typeof e > "u" || typeof e == "object" && !e.toString)
      throw new Error(`PostCSS received ${e} instead of CSS string`);
    if (this.css = e.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (!ri || /^\w+:\/\//.test(t.from) || Br(t.from) ? this.file = t.from : this.file = zr(t.from)), ri && hl) {
      let r = new cl(this.css, t);
      if (r.text) {
        this.map = r;
        let i = r.consumer().file;
        !this.file && i && (this.file = this.mapResolve(i));
      }
    }
    this.file || (this.id = "<input css " + ul(6) + ">"), this.map && (this.map.file = this.from);
  }
  error(e, t, r, i = {}) {
    let n, o, l;
    if (t && typeof t == "object") {
      let u = t, c = r;
      if (typeof u.offset == "number") {
        let h = this.fromOffset(u.offset);
        t = h.line, r = h.col;
      } else
        t = u.line, r = u.column;
      if (typeof c.offset == "number") {
        let h = this.fromOffset(c.offset);
        o = h.line, l = h.col;
      } else
        o = c.line, l = c.column;
    } else if (!r) {
      let u = this.fromOffset(t);
      t = u.line, r = u.col;
    }
    let a = this.origin(t, r, o, l);
    return a ? n = new ti(
      e,
      a.endLine === void 0 ? a.line : { column: a.column, line: a.line },
      a.endLine === void 0 ? a.column : { column: a.endColumn, line: a.endLine },
      a.source,
      a.file,
      i.plugin
    ) : n = new ti(
      e,
      o === void 0 ? t : { column: r, line: t },
      o === void 0 ? r : { column: l, line: o },
      this.css,
      this.file,
      i.plugin
    ), n.input = { column: r, endColumn: l, endLine: o, line: t, source: this.css }, this.file && (yt && (n.input.url = yt(this.file).toString()), n.input.file = this.file), n;
  }
  fromOffset(e) {
    let t, r;
    if (this[vr])
      r = this[vr];
    else {
      let n = this.css.split(`
`);
      r = new Array(n.length);
      let o = 0;
      for (let l = 0, a = n.length; l < a; l++)
        r[l] = o, o += n[l].length + 1;
      this[vr] = r;
    }
    t = r[r.length - 1];
    let i = 0;
    if (e >= t)
      i = r.length - 1;
    else {
      let n = r.length - 2, o;
      for (; i < n; )
        if (o = i + (n - i >> 1), e < r[o])
          n = o - 1;
        else if (e >= r[o + 1])
          i = o + 1;
        else {
          i = o;
          break;
        }
    }
    return {
      col: e - r[i] + 1,
      line: i + 1
    };
  }
  mapResolve(e) {
    return /^\w+:\/\//.test(e) ? e : zr(this.map.consumer().sourceRoot || this.map.root || ".", e);
  }
  origin(e, t, r, i) {
    if (!this.map) return !1;
    let n = this.map.consumer(), o = n.originalPositionFor({ column: t, line: e });
    if (!o.source) return !1;
    let l;
    typeof r == "number" && (l = n.originalPositionFor({ column: i, line: r }));
    let a;
    Br(o.source) ? a = yt(o.source) : a = new URL(
      o.source,
      this.map.consumer().sourceRoot || yt(this.map.mapFile)
    );
    let u = {
      column: o.column,
      endColumn: l && l.column,
      endLine: l && l.line,
      line: o.line,
      url: a.toString()
    };
    if (a.protocol === "file:")
      if (ei)
        u.file = ei(a);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    let c = n.sourceContentFor(o.source);
    return c && (u.source = c), u;
  }
  toJSON() {
    let e = {};
    for (let t of ["hasBOM", "css", "file", "id"])
      this[t] != null && (e[t] = this[t]);
    return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
  }
  get from() {
    return this.file || this.id;
  }
};
var or = Ht;
Ht.default = Ht;
Cr && Cr.registerInput && Cr.registerInput(Ht);
let { SourceMapConsumer: on, SourceMapGenerator: Ft } = ie, { dirname: Ut, relative: an, resolve: ln, sep: un } = ie, { pathToFileURL: si } = ie, fl = or, pl = !!(on && Ft), dl = !!(Ut && ln && an && un), ml = class {
  constructor(e, t, r, i) {
    this.stringify = e, this.mapOpts = r.map || {}, this.root = t, this.opts = r, this.css = i, this.originalCSS = i, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let e;
    this.isInline() ? e = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? e = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? e = this.mapOpts.annotation(this.opts.to, this.root) : e = this.outputFile() + ".map";
    let t = `
`;
    this.css.includes(`\r
`) && (t = `\r
`), this.css += t + "/*# sourceMappingURL=" + e + " */";
  }
  applyPrevMaps() {
    for (let e of this.previous()) {
      let t = this.toUrl(this.path(e.file)), r = e.root || Ut(e.file), i;
      this.mapOpts.sourcesContent === !1 ? (i = new on(e.text), i.sourcesContent && (i.sourcesContent = null)) : i = e.consumer(), this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation !== !1)
      if (this.root) {
        let e;
        for (let t = this.root.nodes.length - 1; t >= 0; t--)
          e = this.root.nodes[t], e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
      } else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
  }
  generate() {
    if (this.clearAnnotation(), dl && pl && this.isMap())
      return this.generateMap();
    {
      let e = "";
      return this.stringify(this.root, (t) => {
        e += t;
      }), [e];
    }
  }
  generateMap() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      let e = this.previous()[0].consumer();
      e.file = this.outputFile(), this.map = Ft.fromSourceMap(e, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new Ft({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
  }
  generateString() {
    this.css = "", this.map = new Ft({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    let e = 1, t = 1, r = "<no source>", i = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    }, n, o;
    this.stringify(this.root, (l, a, u) => {
      if (this.css += l, a && u !== "end" && (i.generated.line = e, i.generated.column = t - 1, a.source && a.source.start ? (i.source = this.sourcePath(a), i.original.line = a.source.start.line, i.original.column = a.source.start.column - 1, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), n = l.match(/\n/g), n ? (e += n.length, o = l.lastIndexOf(`
`), t = l.length - o) : t += l.length, a && u !== "start") {
        let c = a.parent || { raws: {} };
        (!(a.type === "decl" || a.type === "atrule" && !a.nodes) || a !== c.last || c.raws.semicolon) && (a.source && a.source.end ? (i.source = this.sourcePath(a), i.original.line = a.source.end.line, i.original.column = a.source.end.column - 1, i.generated.line = e, i.generated.column = t - 2, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, i.generated.line = e, i.generated.column = t - 1, this.map.addMapping(i)));
      }
    });
  }
  isAnnotation() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((e) => e.annotation) : !0;
  }
  isInline() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    let e = this.mapOpts.annotation;
    return typeof e < "u" && e !== !0 ? !1 : this.previous().length ? this.previous().some((t) => t.inline) : !0;
  }
  isMap() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }
  isSourcesContent() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((e) => e.withContent()) : !0;
  }
  outputFile() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }
  path(e) {
    if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
    let t = this.memoizedPaths.get(e);
    if (t) return t;
    let r = this.opts.to ? Ut(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (r = Ut(ln(r, this.mapOpts.annotation)));
    let i = an(r, e);
    return this.memoizedPaths.set(e, i), i;
  }
  previous() {
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk((e) => {
          if (e.source && e.source.input.map) {
            let t = e.source.input.map;
            this.previousMaps.includes(t) || this.previousMaps.push(t);
          }
        });
      else {
        let e = new fl(this.originalCSS, this.opts);
        e.map && this.previousMaps.push(e.map);
      }
    return this.previousMaps;
  }
  setSourcesContent() {
    let e = {};
    if (this.root)
      this.root.walk((t) => {
        if (t.source) {
          let r = t.source.input.from;
          if (r && !e[r]) {
            e[r] = !0;
            let i = this.usesFileUrls ? this.toFileUrl(r) : this.toUrl(this.path(r));
            this.map.setSourceContent(i, t.source.input.css);
          }
        }
      });
    else if (this.css) {
      let t = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(t, this.css);
    }
  }
  sourcePath(e) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
  }
  toBase64(e) {
    return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
  }
  toFileUrl(e) {
    let t = this.memoizedFileURLs.get(e);
    if (t) return t;
    if (si) {
      let r = si(e).toString();
      return this.memoizedFileURLs.set(e, r), r;
    } else
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
  }
  toUrl(e) {
    let t = this.memoizedURLs.get(e);
    if (t) return t;
    un === "\\" && (e = e.replace(/\\/g, "/"));
    let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(e, r), r;
  }
};
var cn = ml;
let gl = ir, Wr = class extends gl {
  constructor(e) {
    super(e), this.type = "comment";
  }
};
var ar = Wr;
Wr.default = Wr;
let { isClean: hn, my: fn } = at, pn = nr, dn = ar, yl = ir, mn, ws, Ss, gn;
function yn(s) {
  return s.map((e) => (e.nodes && (e.nodes = yn(e.nodes)), delete e.source, e));
}
function wn(s) {
  if (s[hn] = !1, s.proxyOf.nodes)
    for (let e of s.proxyOf.nodes)
      wn(e);
}
let fe = class Sn extends yl {
  append(...e) {
    for (let t of e) {
      let r = this.normalize(t, this.last);
      for (let i of r) this.proxyOf.nodes.push(i);
    }
    return this.markDirty(), this;
  }
  cleanRaws(e) {
    if (super.cleanRaws(e), this.nodes)
      for (let t of this.nodes) t.cleanRaws(e);
  }
  each(e) {
    if (!this.proxyOf.nodes) return;
    let t = this.getIterator(), r, i;
    for (; this.indexes[t] < this.proxyOf.nodes.length && (r = this.indexes[t], i = e(this.proxyOf.nodes[r], r), i !== !1); )
      this.indexes[t] += 1;
    return delete this.indexes[t], i;
  }
  every(e) {
    return this.nodes.every(e);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    let e = this.lastEach;
    return this.indexes[e] = 0, e;
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...r) => e[t](
          ...r.map((i) => typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i)
        ) : t === "every" || t === "some" ? (r) => e[t](
          (i, ...n) => r(i.toProxy(), ...n)
        ) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((r) => r.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
      }
    };
  }
  index(e) {
    return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
  }
  insertAfter(e, t) {
    let r = this.index(e), i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
    r = this.index(e);
    for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
    let n;
    for (let o in this.indexes)
      n = this.indexes[o], r < n && (this.indexes[o] = n + i.length);
    return this.markDirty(), this;
  }
  insertBefore(e, t) {
    let r = this.index(e), i = r === 0 ? "prepend" : !1, n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
    r = this.index(e);
    for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
    let o;
    for (let l in this.indexes)
      o = this.indexes[l], r <= o && (this.indexes[l] = o + n.length);
    return this.markDirty(), this;
  }
  normalize(e, t) {
    if (typeof e == "string")
      e = yn(mn(e).nodes);
    else if (typeof e > "u")
      e = [];
    else if (Array.isArray(e)) {
      e = e.slice(0);
      for (let i of e)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type === "root" && this.type !== "document") {
      e = e.nodes.slice(0);
      for (let i of e)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type)
      e = [e];
    else if (e.prop) {
      if (typeof e.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof e.value != "string" && (e.value = String(e.value)), e = [new pn(e)];
    } else if (e.selector)
      e = [new ws(e)];
    else if (e.name)
      e = [new Ss(e)];
    else if (e.text)
      e = [new dn(e)];
    else
      throw new Error("Unknown node type in node creation");
    return e.map((i) => (i[fn] || Sn.rebuild(i), i = i.proxyOf, i.parent && i.parent.removeChild(i), i[hn] && wn(i), typeof i.raws.before > "u" && t && typeof t.raws.before < "u" && (i.raws.before = t.raws.before.replace(/\S/g, "")), i.parent = this.proxyOf, i));
  }
  prepend(...e) {
    e = e.reverse();
    for (let t of e) {
      let r = this.normalize(t, this.first, "prepend").reverse();
      for (let i of r) this.proxyOf.nodes.unshift(i);
      for (let i in this.indexes)
        this.indexes[i] = this.indexes[i] + r.length;
    }
    return this.markDirty(), this;
  }
  push(e) {
    return e.parent = this, this.proxyOf.nodes.push(e), this;
  }
  removeAll() {
    for (let e of this.proxyOf.nodes) e.parent = void 0;
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }
  removeChild(e) {
    e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
    let t;
    for (let r in this.indexes)
      t = this.indexes[r], t >= e && (this.indexes[r] = t - 1);
    return this.markDirty(), this;
  }
  replaceValues(e, t, r) {
    return r || (r = t, t = {}), this.walkDecls((i) => {
      t.props && !t.props.includes(i.prop) || t.fast && !i.value.includes(t.fast) || (i.value = i.value.replace(e, r));
    }), this.markDirty(), this;
  }
  some(e) {
    return this.nodes.some(e);
  }
  walk(e) {
    return this.each((t, r) => {
      let i;
      try {
        i = e(t, r);
      } catch (n) {
        throw t.addToError(n);
      }
      return i !== !1 && t.walk && (i = t.walk(e)), i;
    });
  }
  walkAtRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "atrule" && e.test(r.name))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "atrule" && r.name === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "atrule")
        return t(r, i);
    }));
  }
  walkComments(e) {
    return this.walk((t, r) => {
      if (t.type === "comment")
        return e(t, r);
    });
  }
  walkDecls(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "decl" && e.test(r.prop))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "decl" && r.prop === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "decl")
        return t(r, i);
    }));
  }
  walkRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "rule" && e.test(r.selector))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "rule" && r.selector === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "rule")
        return t(r, i);
    }));
  }
  get first() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
fe.registerParse = (s) => {
  mn = s;
};
fe.registerRule = (s) => {
  ws = s;
};
fe.registerAtRule = (s) => {
  Ss = s;
};
fe.registerRoot = (s) => {
  gn = s;
};
var Ie = fe;
fe.default = fe;
fe.rebuild = (s) => {
  s.type === "atrule" ? Object.setPrototypeOf(s, Ss.prototype) : s.type === "rule" ? Object.setPrototypeOf(s, ws.prototype) : s.type === "decl" ? Object.setPrototypeOf(s, pn.prototype) : s.type === "comment" ? Object.setPrototypeOf(s, dn.prototype) : s.type === "root" && Object.setPrototypeOf(s, gn.prototype), s[fn] = !0, s.nodes && s.nodes.forEach((e) => {
    fe.rebuild(e);
  });
};
let wl = Ie, bn, Cn, Qe = class extends wl {
  constructor(e) {
    super({ type: "document", ...e }), this.nodes || (this.nodes = []);
  }
  toResult(e = {}) {
    return new bn(new Cn(), this, e).stringify();
  }
};
Qe.registerLazyResult = (s) => {
  bn = s;
};
Qe.registerProcessor = (s) => {
  Cn = s;
};
var bs = Qe;
Qe.default = Qe;
let ii = {};
var vn = function(e) {
  ii[e] || (ii[e] = !0, typeof console < "u" && console.warn && console.warn(e));
};
let Vr = class {
  constructor(e, t = {}) {
    if (this.type = "warning", this.text = e, t.node && t.node.source) {
      let r = t.node.rangeBy(t);
      this.line = r.start.line, this.column = r.start.column, this.endLine = r.end.line, this.endColumn = r.end.column;
    }
    for (let r in t) this[r] = t[r];
  }
  toString() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }
};
var In = Vr;
Vr.default = Vr;
let Sl = In, Gr = class {
  constructor(e, t, r) {
    this.processor = e, this.messages = [], this.root = t, this.opts = r, this.css = void 0, this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(e, t = {}) {
    t.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin);
    let r = new Sl(e, t);
    return this.messages.push(r), r;
  }
  warnings() {
    return this.messages.filter((e) => e.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var Cs = Gr;
Gr.default = Gr;
const Ir = 39, ni = 34, wt = 92, oi = 47, St = 10, We = 32, bt = 12, Ct = 9, vt = 13, bl = 91, Cl = 93, vl = 40, Il = 41, xl = 123, Rl = 125, Ol = 59, Al = 42, El = 58, Ml = 64, It = /[\t\n\f\r "#'()/;[\\\]{}]/g, xt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, $l = /.[\r\n"'(/\\]/, ai = /[\da-f]/i;
var Nl = function(e, t = {}) {
  let r = e.css.valueOf(), i = t.ignoreErrors, n, o, l, a, u, c, h, d, m, g, p = r.length, f = 0, S = [], b = [];
  function y() {
    return f;
  }
  function C(_) {
    throw e.error("Unclosed " + _, f);
  }
  function $() {
    return b.length === 0 && f >= p;
  }
  function P(_) {
    if (b.length) return b.pop();
    if (f >= p) return;
    let W = _ ? _.ignoreUnclosed : !1;
    switch (n = r.charCodeAt(f), n) {
      case St:
      case We:
      case Ct:
      case vt:
      case bt: {
        o = f;
        do
          o += 1, n = r.charCodeAt(o);
        while (n === We || n === St || n === Ct || n === vt || n === bt);
        g = ["space", r.slice(f, o)], f = o - 1;
        break;
      }
      case bl:
      case Cl:
      case xl:
      case Rl:
      case El:
      case Ol:
      case Il: {
        let H = String.fromCharCode(n);
        g = [H, H, f];
        break;
      }
      case vl: {
        if (d = S.length ? S.pop()[1] : "", m = r.charCodeAt(f + 1), d === "url" && m !== Ir && m !== ni && m !== We && m !== St && m !== Ct && m !== bt && m !== vt) {
          o = f;
          do {
            if (c = !1, o = r.indexOf(")", o + 1), o === -1)
              if (i || W) {
                o = f;
                break;
              } else
                C("bracket");
            for (h = o; r.charCodeAt(h - 1) === wt; )
              h -= 1, c = !c;
          } while (c);
          g = ["brackets", r.slice(f, o + 1), f, o], f = o;
        } else
          o = r.indexOf(")", f + 1), a = r.slice(f, o + 1), o === -1 || $l.test(a) ? g = ["(", "(", f] : (g = ["brackets", a, f, o], f = o);
        break;
      }
      case Ir:
      case ni: {
        l = n === Ir ? "'" : '"', o = f;
        do {
          if (c = !1, o = r.indexOf(l, o + 1), o === -1)
            if (i || W) {
              o = f + 1;
              break;
            } else
              C("string");
          for (h = o; r.charCodeAt(h - 1) === wt; )
            h -= 1, c = !c;
        } while (c);
        g = ["string", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case Ml: {
        It.lastIndex = f + 1, It.test(r), It.lastIndex === 0 ? o = r.length - 1 : o = It.lastIndex - 2, g = ["at-word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case wt: {
        for (o = f, u = !0; r.charCodeAt(o + 1) === wt; )
          o += 1, u = !u;
        if (n = r.charCodeAt(o + 1), u && n !== oi && n !== We && n !== St && n !== Ct && n !== vt && n !== bt && (o += 1, ai.test(r.charAt(o)))) {
          for (; ai.test(r.charAt(o + 1)); )
            o += 1;
          r.charCodeAt(o + 1) === We && (o += 1);
        }
        g = ["word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      default: {
        n === oi && r.charCodeAt(f + 1) === Al ? (o = r.indexOf("*/", f + 2) + 1, o === 0 && (i || W ? o = r.length : C("comment")), g = ["comment", r.slice(f, o + 1), f, o], f = o) : (xt.lastIndex = f + 1, xt.test(r), xt.lastIndex === 0 ? o = r.length - 1 : o = xt.lastIndex - 2, g = ["word", r.slice(f, o + 1), f, o], S.push(g), f = o);
        break;
      }
    }
    return f++, g;
  }
  function j(_) {
    b.push(_);
  }
  return {
    back: j,
    endOfFile: $,
    nextToken: P,
    position: y
  };
};
let xn = Ie, Yt = class extends xn {
  constructor(e) {
    super(e), this.type = "atrule";
  }
  append(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
  }
  prepend(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
  }
};
var vs = Yt;
Yt.default = Yt;
xn.registerAtRule(Yt);
let Rn = Ie, On, An, Ne = class extends Rn {
  constructor(e) {
    super(e), this.type = "root", this.nodes || (this.nodes = []);
  }
  normalize(e, t, r) {
    let i = super.normalize(e);
    if (t) {
      if (r === "prepend")
        this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
      else if (this.first !== t)
        for (let n of i)
          n.raws.before = t.raws.before;
    }
    return i;
  }
  removeChild(e, t) {
    let r = this.index(e);
    return !t && r === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[r].raws.before), super.removeChild(e);
  }
  toResult(e = {}) {
    return new On(new An(), this, e).stringify();
  }
};
Ne.registerLazyResult = (s) => {
  On = s;
};
Ne.registerProcessor = (s) => {
  An = s;
};
var lt = Ne;
Ne.default = Ne;
Rn.registerRoot(Ne);
let qe = {
  comma(s) {
    return qe.split(s, [","], !0);
  },
  space(s) {
    let e = [" ", `
`, "	"];
    return qe.split(s, e);
  },
  split(s, e, t) {
    let r = [], i = "", n = !1, o = 0, l = !1, a = "", u = !1;
    for (let c of s)
      u ? u = !1 : c === "\\" ? u = !0 : l ? c === a && (l = !1) : c === '"' || c === "'" ? (l = !0, a = c) : c === "(" ? o += 1 : c === ")" ? o > 0 && (o -= 1) : o === 0 && e.includes(c) && (n = !0), n ? (i !== "" && r.push(i.trim()), i = "", n = !1) : i += c;
    return (t || i !== "") && r.push(i.trim()), r;
  }
};
var En = qe;
qe.default = qe;
let Mn = Ie, kl = En, Zt = class extends Mn {
  constructor(e) {
    super(e), this.type = "rule", this.nodes || (this.nodes = []);
  }
  get selectors() {
    return kl.comma(this.selector);
  }
  set selectors(e) {
    let t = this.selector ? this.selector.match(/,\s*/) : null, r = t ? t[0] : "," + this.raw("between", "beforeOpen");
    this.selector = e.join(r);
  }
};
var Is = Zt;
Zt.default = Zt;
Mn.registerRule(Zt);
let Pl = nr, Tl = Nl, Dl = ar, _l = vs, Ll = lt, li = Is;
const ui = {
  empty: !0,
  space: !0
};
function Fl(s) {
  for (let e = s.length - 1; e >= 0; e--) {
    let t = s[e], r = t[3] || t[2];
    if (r) return r;
  }
}
let Ul = class {
  constructor(e) {
    this.input = e, this.root = new Ll(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(e) {
    let t = new _l();
    t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
    let r, i, n, o = !1, l = !1, a = [], u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (e = this.tokenizer.nextToken(), r = e[0], r === "(" || r === "[" ? u.push(r === "(" ? ")" : "]") : r === "{" && u.length > 0 ? u.push("}") : r === u[u.length - 1] && u.pop(), u.length === 0)
        if (r === ";") {
          t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
          break;
        } else if (r === "{") {
          l = !0;
          break;
        } else if (r === "}") {
          if (a.length > 0) {
            for (n = a.length - 1, i = a[n]; i && i[0] === "space"; )
              i = a[--n];
            i && (t.source.end = this.getPosition(i[3] || i[2]), t.source.end.offset++);
          }
          this.end(e);
          break;
        } else
          a.push(e);
      else
        a.push(e);
      if (this.tokenizer.endOfFile()) {
        o = !0;
        break;
      }
    }
    t.raws.between = this.spacesAndCommentsFromEnd(a), a.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(a), this.raw(t, "params", a), o && (e = a[a.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), l && (t.nodes = [], this.current = t);
  }
  checkMissedSemicolon(e) {
    let t = this.colon(e);
    if (t === !1) return;
    let r = 0, i;
    for (let n = t - 1; n >= 0 && (i = e[n], !(i[0] !== "space" && (r += 1, r === 2))); n--)
      ;
    throw this.input.error(
      "Missed semicolon",
      i[0] === "word" ? i[3] + 1 : i[2]
    );
  }
  colon(e) {
    let t = 0, r, i, n;
    for (let [o, l] of e.entries()) {
      if (r = l, i = r[0], i === "(" && (t += 1), i === ")" && (t -= 1), t === 0 && i === ":")
        if (!n)
          this.doubleColon(r);
        else {
          if (n[0] === "word" && n[1] === "progid")
            continue;
          return o;
        }
      n = r;
    }
    return !1;
  }
  comment(e) {
    let t = new Dl();
    this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
    let r = e[1].slice(2, -2);
    if (/^\s*$/.test(r))
      t.text = "", t.raws.left = r, t.raws.right = "";
    else {
      let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
      t.text = i[2], t.raws.left = i[1], t.raws.right = i[3];
    }
  }
  createTokenizer() {
    this.tokenizer = Tl(this.input);
  }
  decl(e, t) {
    let r = new Pl();
    this.init(r, e[0][2]);
    let i = e[e.length - 1];
    for (i[0] === ";" && (this.semicolon = !0, e.pop()), r.source.end = this.getPosition(
      i[3] || i[2] || Fl(e)
    ), r.source.end.offset++; e[0][0] !== "word"; )
      e.length === 1 && this.unknownWord(e), r.raws.before += e.shift()[1];
    for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
      let u = e[0][0];
      if (u === ":" || u === "space" || u === "comment")
        break;
      r.prop += e.shift()[1];
    }
    r.raws.between = "";
    let n;
    for (; e.length; )
      if (n = e.shift(), n[0] === ":") {
        r.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), r.raws.between += n[1];
    (r.prop[0] === "_" || r.prop[0] === "*") && (r.raws.before += r.prop[0], r.prop = r.prop.slice(1));
    let o = [], l;
    for (; e.length && (l = e[0][0], !(l !== "space" && l !== "comment")); )
      o.push(e.shift());
    this.precheckMissedSemicolon(e);
    for (let u = e.length - 1; u >= 0; u--) {
      if (n = e[u], n[1].toLowerCase() === "!important") {
        r.important = !0;
        let c = this.stringFrom(e, u);
        c = this.spacesFromEnd(e) + c, c !== " !important" && (r.raws.important = c);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let c = e.slice(0), h = "";
        for (let d = u; d > 0; d--) {
          let m = c[d][0];
          if (h.trim().indexOf("!") === 0 && m !== "space")
            break;
          h = c.pop()[1] + h;
        }
        h.trim().indexOf("!") === 0 && (r.important = !0, r.raws.important = h, e = c);
      }
      if (n[0] !== "space" && n[0] !== "comment")
        break;
    }
    e.some((u) => u[0] !== "space" && u[0] !== "comment") && (r.raws.between += o.map((u) => u[1]).join(""), o = []), this.raw(r, "value", o.concat(e), t), r.value.includes(":") && !t && this.checkMissedSemicolon(e);
  }
  doubleColon(e) {
    throw this.input.error(
      "Double colon",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
  emptyRule(e) {
    let t = new li();
    this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
  }
  end(e) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(e) {
    if (this.spaces += e[1], this.current.nodes) {
      let t = this.current.nodes[this.current.nodes.length - 1];
      t && t.type === "rule" && !t.raws.ownSemicolon && (t.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }
  // Helpers
  getPosition(e) {
    let t = this.input.fromOffset(e);
    return {
      column: t.col,
      line: t.line,
      offset: e
    };
  }
  init(e, t) {
    this.current.push(e), e.source = {
      input: this.input,
      start: this.getPosition(t)
    }, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
  }
  other(e) {
    let t = !1, r = null, i = !1, n = null, o = [], l = e[1].startsWith("--"), a = [], u = e;
    for (; u; ) {
      if (r = u[0], a.push(u), r === "(" || r === "[")
        n || (n = u), o.push(r === "(" ? ")" : "]");
      else if (l && i && r === "{")
        n || (n = u), o.push("}");
      else if (o.length === 0)
        if (r === ";")
          if (i) {
            this.decl(a, l);
            return;
          } else
            break;
        else if (r === "{") {
          this.rule(a);
          return;
        } else if (r === "}") {
          this.tokenizer.back(a.pop()), t = !0;
          break;
        } else r === ":" && (i = !0);
      else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (t = !0), o.length > 0 && this.unclosedBracket(n), t && i) {
      if (!l)
        for (; a.length && (u = a[a.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(a.pop());
      this.decl(a, l);
    } else
      this.unknownWord(a);
  }
  parse() {
    let e;
    for (; !this.tokenizer.endOfFile(); )
      switch (e = this.tokenizer.nextToken(), e[0]) {
        case "space":
          this.spaces += e[1];
          break;
        case ";":
          this.freeSemicolon(e);
          break;
        case "}":
          this.end(e);
          break;
        case "comment":
          this.comment(e);
          break;
        case "at-word":
          this.atrule(e);
          break;
        case "{":
          this.emptyRule(e);
          break;
        default:
          this.other(e);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(e, t, r, i) {
    let n, o, l = r.length, a = "", u = !0, c, h;
    for (let d = 0; d < l; d += 1)
      n = r[d], o = n[0], o === "space" && d === l - 1 && !i ? u = !1 : o === "comment" ? (h = r[d - 1] ? r[d - 1][0] : "empty", c = r[d + 1] ? r[d + 1][0] : "empty", !ui[h] && !ui[c] ? a.slice(-1) === "," ? u = !1 : a += n[1] : u = !1) : a += n[1];
    if (!u) {
      let d = r.reduce((m, g) => m + g[1], "");
      e.raws[t] = { raw: d, value: a };
    }
    e[t] = a;
  }
  rule(e) {
    e.pop();
    let t = new li();
    this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
  }
  spacesAndCommentsFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], !(t !== "space" && t !== "comment")); )
      r = e.pop()[1] + r;
    return r;
  }
  // Errors
  spacesAndCommentsFromStart(e) {
    let t, r = "";
    for (; e.length && (t = e[0][0], !(t !== "space" && t !== "comment")); )
      r += e.shift()[1];
    return r;
  }
  spacesFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], t === "space"); )
      r = e.pop()[1] + r;
    return r;
  }
  stringFrom(e, t) {
    let r = "";
    for (let i = t; i < e.length; i++)
      r += e[i][1];
    return e.splice(t, e.length - t), r;
  }
  unclosedBlock() {
    let e = this.current.source.start;
    throw this.input.error("Unclosed block", e.line, e.column);
  }
  unclosedBracket(e) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unexpectedClose(e) {
    throw this.input.error(
      "Unexpected }",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unknownWord(e) {
    throw this.input.error(
      "Unknown word",
      { offset: e[0][2] },
      { offset: e[0][2] + e[0][1].length }
    );
  }
  unnamedAtrule(e, t) {
    throw this.input.error(
      "At-rule without name",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
};
var Bl = Ul;
let zl = Ie, Wl = Bl, Vl = or;
function Jt(s, e) {
  let t = new Vl(s, e), r = new Wl(t);
  try {
    r.parse();
  } catch (i) {
    throw process.env.NODE_ENV !== "production" && i.name === "CssSyntaxError" && e && e.from && (/\.scss$/i.test(e.from) ? i.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(e.from) ? i.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(e.from) && (i.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), i;
  }
  return r.root;
}
var xs = Jt;
Jt.default = Jt;
zl.registerParse(Jt);
let { isClean: ue, my: Gl } = at, jl = cn, Hl = sr, Yl = Ie, Zl = bs, Jl = vn, ci = Cs, Xl = xs, Kl = lt;
const Ql = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, ql = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, eu = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, ke = 0;
function Ve(s) {
  return typeof s == "object" && typeof s.then == "function";
}
function $n(s) {
  let e = !1, t = Ql[s.type];
  return s.type === "decl" ? e = s.prop.toLowerCase() : s.type === "atrule" && (e = s.name.toLowerCase()), e && s.append ? [
    t,
    t + "-" + e,
    ke,
    t + "Exit",
    t + "Exit-" + e
  ] : e ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e] : s.append ? [t, ke, t + "Exit"] : [t, t + "Exit"];
}
function hi(s) {
  let e;
  return s.type === "document" ? e = ["Document", ke, "DocumentExit"] : s.type === "root" ? e = ["Root", ke, "RootExit"] : e = $n(s), {
    eventIndex: 0,
    events: e,
    iterator: 0,
    node: s,
    visitorIndex: 0,
    visitors: []
  };
}
function jr(s) {
  return s[ue] = !1, s.nodes && s.nodes.forEach((e) => jr(e)), s;
}
let Hr = {}, Pe = class Nn {
  constructor(e, t, r) {
    this.stringified = !1, this.processed = !1;
    let i;
    if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document"))
      i = jr(t);
    else if (t instanceof Nn || t instanceof ci)
      i = jr(t.root), t.map && (typeof r.map > "u" && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = t.map);
    else {
      let n = Xl;
      r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
      try {
        i = n(t, r);
      } catch (o) {
        this.processed = !0, this.error = o;
      }
      i && !i[Gl] && Yl.rebuild(i);
    }
    this.result = new ci(e, i, r), this.helpers = { ...Hr, postcss: Hr, result: this.result }, this.plugins = this.processor.plugins.map((n) => typeof n == "object" && n.prepare ? { ...n, ...n.prepare(this.result) } : n);
  }
  async() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(e, t) {
    let r = this.result.lastPlugin;
    try {
      if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin)
        e.plugin = r.postcssPlugin, e.setMessage();
      else if (r.postcssVersion && process.env.NODE_ENV !== "production") {
        let i = r.postcssPlugin, n = r.postcssVersion, o = this.result.processor.version, l = n.split("."), a = o.split(".");
        (l[0] !== a[0] || parseInt(l[1]) > parseInt(a[1])) && console.error(
          "Unknown error from PostCSS plugin. Your current PostCSS version is " + o + ", but " + i + " uses " + n + ". Perhaps this is the source of the error below."
        );
      }
    } catch (i) {
      console && console.error && console.error(i);
    }
    return e;
  }
  prepareVisitors() {
    this.listeners = {};
    let e = (t, r, i) => {
      this.listeners[r] || (this.listeners[r] = []), this.listeners[r].push([t, i]);
    };
    for (let t of this.plugins)
      if (typeof t == "object")
        for (let r in t) {
          if (!ql[r] && /^[A-Z]/.test(r))
            throw new Error(
              `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          if (!eu[r])
            if (typeof t[r] == "object")
              for (let i in t[r])
                i === "*" ? e(t, r, t[r][i]) : e(
                  t,
                  r + "-" + i.toLowerCase(),
                  t[r][i]
                );
            else typeof t[r] == "function" && e(t, r, t[r]);
        }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let e = 0; e < this.plugins.length; e++) {
      let t = this.plugins[e], r = this.runOnRoot(t);
      if (Ve(r))
        try {
          await r;
        } catch (i) {
          throw this.handleError(i);
        }
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[ue]; ) {
        e[ue] = !0;
        let t = [hi(e)];
        for (; t.length > 0; ) {
          let r = this.visitTick(t);
          if (Ve(r))
            try {
              await r;
            } catch (i) {
              let n = t[t.length - 1].node;
              throw this.handleError(i, n);
            }
        }
      }
      if (this.listeners.OnceExit)
        for (let [t, r] of this.listeners.OnceExit) {
          this.result.lastPlugin = t;
          try {
            if (e.type === "document") {
              let i = e.nodes.map(
                (n) => r(n, this.helpers)
              );
              await Promise.all(i);
            } else
              await r(e, this.helpers);
          } catch (i) {
            throw this.handleError(i);
          }
        }
    }
    return this.processed = !0, this.stringify();
  }
  runOnRoot(e) {
    this.result.lastPlugin = e;
    try {
      if (typeof e == "object" && e.Once) {
        if (this.result.root.type === "document") {
          let t = this.result.root.nodes.map(
            (r) => e.Once(r, this.helpers)
          );
          return Ve(t[0]) ? Promise.all(t) : t;
        }
        return e.Once(this.result.root, this.helpers);
      } else if (typeof e == "function")
        return e(this.result.root, this.result);
    } catch (t) {
      throw this.handleError(t);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    let e = this.result.opts, t = Hl;
    e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
    let i = new jl(t, this.result.root, this.result.opts).generate();
    return this.result.css = i[0], this.result.map = i[1], this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (let e of this.plugins) {
      let t = this.runOnRoot(e);
      if (Ve(t))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[ue]; )
        e[ue] = !0, this.walkSync(e);
      if (this.listeners.OnceExit)
        if (e.type === "document")
          for (let t of e.nodes)
            this.visitSync(this.listeners.OnceExit, t);
        else
          this.visitSync(this.listeners.OnceExit, e);
    }
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || Jl(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this.css;
  }
  visitSync(e, t) {
    for (let [r, i] of e) {
      this.result.lastPlugin = r;
      let n;
      try {
        n = i(t, this.helpers);
      } catch (o) {
        throw this.handleError(o, t.proxyOf);
      }
      if (t.type !== "root" && t.type !== "document" && !t.parent)
        return !0;
      if (Ve(n))
        throw this.getAsyncError();
    }
  }
  visitTick(e) {
    let t = e[e.length - 1], { node: r, visitors: i } = t;
    if (r.type !== "root" && r.type !== "document" && !r.parent) {
      e.pop();
      return;
    }
    if (i.length > 0 && t.visitorIndex < i.length) {
      let [o, l] = i[t.visitorIndex];
      t.visitorIndex += 1, t.visitorIndex === i.length && (t.visitors = [], t.visitorIndex = 0), this.result.lastPlugin = o;
      try {
        return l(r.toProxy(), this.helpers);
      } catch (a) {
        throw this.handleError(a, r);
      }
    }
    if (t.iterator !== 0) {
      let o = t.iterator, l;
      for (; l = r.nodes[r.indexes[o]]; )
        if (r.indexes[o] += 1, !l[ue]) {
          l[ue] = !0, e.push(hi(l));
          return;
        }
      t.iterator = 0, delete r.indexes[o];
    }
    let n = t.events;
    for (; t.eventIndex < n.length; ) {
      let o = n[t.eventIndex];
      if (t.eventIndex += 1, o === ke) {
        r.nodes && r.nodes.length && (r[ue] = !0, t.iterator = r.getIterator());
        return;
      } else if (this.listeners[o]) {
        t.visitors = this.listeners[o];
        return;
      }
    }
    e.pop();
  }
  walkSync(e) {
    e[ue] = !0;
    let t = $n(e);
    for (let r of t)
      if (r === ke)
        e.nodes && e.each((i) => {
          i[ue] || this.walkSync(i);
        });
      else {
        let i = this.listeners[r];
        if (i && this.visitSync(i, e.toProxy()))
          return;
      }
  }
  warnings() {
    return this.sync().warnings();
  }
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
};
Pe.registerPostcss = (s) => {
  Hr = s;
};
var kn = Pe;
Pe.default = Pe;
Kl.registerLazyResult(Pe);
Zl.registerLazyResult(Pe);
let tu = cn, ru = sr, su = vn, iu = xs;
const nu = Cs;
let Yr = class {
  constructor(e, t, r) {
    t = t.toString(), this.stringified = !1, this._processor = e, this._css = t, this._opts = r, this._map = void 0;
    let i, n = ru;
    this.result = new nu(this._processor, i, this._opts), this.result.css = t;
    let o = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return o.root;
      }
    });
    let l = new tu(n, i, this._opts, t);
    if (l.isMap()) {
      let [a, u] = l.generate();
      a && (this.result.css = a), u && (this.result.map = u);
    } else
      l.clearAnnotation(), this.result.css = l.css;
  }
  async() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || su(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root)
      return this._root;
    let e, t = iu;
    try {
      e = t(this._css, this._opts);
    } catch (r) {
      this.error = r;
    }
    if (this.error)
      throw this.error;
    return this._root = e, e;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var ou = Yr;
Yr.default = Yr;
let au = ou, lu = kn, uu = bs, cu = lt, et = class {
  constructor(e = []) {
    this.version = "8.4.38", this.plugins = this.normalize(e);
  }
  normalize(e) {
    let t = [];
    for (let r of e)
      if (r.postcss === !0 ? r = r() : r.postcss && (r = r.postcss), typeof r == "object" && Array.isArray(r.plugins))
        t = t.concat(r.plugins);
      else if (typeof r == "object" && r.postcssPlugin)
        t.push(r);
      else if (typeof r == "function")
        t.push(r);
      else if (typeof r == "object" && (r.parse || r.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error(
            "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
          );
      } else
        throw new Error(r + " is not a PostCSS plugin");
    return t;
  }
  process(e, t = {}) {
    return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax ? new au(this, e, t) : new lu(this, e, t);
  }
  use(e) {
    return this.plugins = this.plugins.concat(this.normalize([e])), this;
  }
};
var hu = et;
et.default = et;
cu.registerProcessor(et);
uu.registerProcessor(et);
let fu = nr, pu = nn, du = ar, mu = vs, gu = or, yu = lt, wu = Is;
function tt(s, e) {
  if (Array.isArray(s)) return s.map((i) => tt(i));
  let { inputs: t, ...r } = s;
  if (t) {
    e = [];
    for (let i of t) {
      let n = { ...i, __proto__: gu.prototype };
      n.map && (n.map = {
        ...n.map,
        __proto__: pu.prototype
      }), e.push(n);
    }
  }
  if (r.nodes && (r.nodes = s.nodes.map((i) => tt(i, e))), r.source) {
    let { inputId: i, ...n } = r.source;
    r.source = n, i != null && (r.source.input = e[i]);
  }
  if (r.type === "root")
    return new yu(r);
  if (r.type === "decl")
    return new fu(r);
  if (r.type === "rule")
    return new wu(r);
  if (r.type === "comment")
    return new du(r);
  if (r.type === "atrule")
    return new mu(r);
  throw new Error("Unknown node type: " + s.type);
}
var Su = tt;
tt.default = tt;
let bu = ys, Pn = nr, Cu = kn, vu = Ie, Rs = hu, Iu = sr, xu = Su, Tn = bs, Ru = In, Dn = ar, _n = vs, Ou = Cs, Au = or, Eu = xs, Mu = En, Ln = Is, Fn = lt, $u = ir;
function E(...s) {
  return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new Rs(s);
}
E.plugin = function(e, t) {
  let r = !1;
  function i(...o) {
    console && console.warn && !r && (r = !0, console.warn(
      e + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
    ), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(
      e + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
    ));
    let l = t(...o);
    return l.postcssPlugin = e, l.postcssVersion = new Rs().version, l;
  }
  let n;
  return Object.defineProperty(i, "postcss", {
    get() {
      return n || (n = i()), n;
    }
  }), i.process = function(o, l, a) {
    return E([i(a)]).process(o, l);
  }, i;
};
E.stringify = Iu;
E.parse = Eu;
E.fromJSON = xu;
E.list = Mu;
E.comment = (s) => new Dn(s);
E.atRule = (s) => new _n(s);
E.decl = (s) => new Pn(s);
E.rule = (s) => new Ln(s);
E.root = (s) => new Fn(s);
E.document = (s) => new Tn(s);
E.CssSyntaxError = bu;
E.Declaration = Pn;
E.Container = vu;
E.Processor = Rs;
E.Document = Tn;
E.Comment = Dn;
E.Warning = Ru;
E.AtRule = _n;
E.Result = Ou;
E.Input = Au;
E.Rule = Ln;
E.Root = Fn;
E.Node = $u;
Cu.registerPostcss(E);
var Nu = E;
E.default = E;
const L = /* @__PURE__ */ Wa(Nu);
L.stringify;
L.fromJSON;
L.plugin;
L.parse;
L.list;
L.document;
L.comment;
L.atRule;
L.rule;
L.decl;
L.root;
L.CssSyntaxError;
L.Declaration;
L.Container;
L.Processor;
L.Document;
L.Comment;
L.Warning;
L.AtRule;
L.Result;
L.Input;
L.Rule;
L.Root;
L.Node;
var ku = Object.defineProperty, Pu = (s, e, t) => e in s ? ku(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ee = (s, e, t) => Pu(s, typeof e != "symbol" ? e + "" : e, t);
function Tu(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Du(s) {
  if (s.__esModule) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(s, r);
    Object.defineProperty(t, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[r];
      }
    });
  }), t;
}
var Os = { exports: {} }, D = String, Un = function() {
  return { isColorSupported: !1, reset: D, bold: D, dim: D, italic: D, underline: D, inverse: D, hidden: D, strikethrough: D, black: D, red: D, green: D, yellow: D, blue: D, magenta: D, cyan: D, white: D, gray: D, bgBlack: D, bgRed: D, bgGreen: D, bgYellow: D, bgBlue: D, bgMagenta: D, bgCyan: D, bgWhite: D };
};
Os.exports = Un();
Os.exports.createColors = Un;
var _u = Os.exports;
const Lu = {}, Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lu
}, Symbol.toStringTag, { value: "Module" })), ne = /* @__PURE__ */ Du(Fu);
let fi = _u, pi = ne, Zr = class Bn extends Error {
  constructor(e, t, r, i, n, o) {
    super(e), this.name = "CssSyntaxError", this.reason = e, n && (this.file = n), i && (this.source = i), o && (this.plugin = o), typeof t < "u" && typeof r < "u" && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, Bn);
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }
  showSourceCode(e) {
    if (!this.source) return "";
    let t = this.source;
    e == null && (e = fi.isColorSupported), pi && e && (t = pi(t));
    let r = t.split(/\r?\n/), i = Math.max(this.line - 3, 0), n = Math.min(this.line + 2, r.length), o = String(n).length, l, a;
    if (e) {
      let { bold: u, gray: c, red: h } = fi.createColors(!0);
      l = (d) => u(h(d)), a = (d) => c(d);
    } else
      l = a = (u) => u;
    return r.slice(i, n).map((u, c) => {
      let h = i + 1 + c, d = " " + (" " + h).slice(-o) + " | ";
      if (h === this.line) {
        let m = a(d.replace(/\d/g, " ")) + u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return l(">") + a(d) + u + `
 ` + m + l("^");
      }
      return " " + a(d) + u;
    }).join(`
`);
  }
  toString() {
    let e = this.showSourceCode();
    return e && (e = `

` + e + `
`), this.name + ": " + this.message + e;
  }
};
var As = Zr;
Zr.default = Zr;
var ut = {};
ut.isClean = Symbol("isClean");
ut.my = Symbol("my");
const di = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function Uu(s) {
  return s[0].toUpperCase() + s.slice(1);
}
let Jr = class {
  constructor(e) {
    this.builder = e;
  }
  atrule(e, t) {
    let r = "@" + e.name, i = e.params ? this.rawValue(e, "params") : "";
    if (typeof e.raws.afterName < "u" ? r += e.raws.afterName : i && (r += " "), e.nodes)
      this.block(e, r + i);
    else {
      let n = (e.raws.between || "") + (t ? ";" : "");
      this.builder(r + i + n, e);
    }
  }
  beforeAfter(e, t) {
    let r;
    e.type === "decl" ? r = this.raw(e, null, "beforeDecl") : e.type === "comment" ? r = this.raw(e, null, "beforeComment") : t === "before" ? r = this.raw(e, null, "beforeRule") : r = this.raw(e, null, "beforeClose");
    let i = e.parent, n = 0;
    for (; i && i.type !== "root"; )
      n += 1, i = i.parent;
    if (r.includes(`
`)) {
      let o = this.raw(e, null, "indent");
      if (o.length)
        for (let l = 0; l < n; l++) r += o;
    }
    return r;
  }
  block(e, t) {
    let r = this.raw(e, "between", "beforeOpen");
    this.builder(t + r + "{", e, "start");
    let i;
    e.nodes && e.nodes.length ? (this.body(e), i = this.raw(e, "after")) : i = this.raw(e, "after", "emptyBody"), i && this.builder(i), this.builder("}", e, "end");
  }
  body(e) {
    let t = e.nodes.length - 1;
    for (; t > 0 && e.nodes[t].type === "comment"; )
      t -= 1;
    let r = this.raw(e, "semicolon");
    for (let i = 0; i < e.nodes.length; i++) {
      let n = e.nodes[i], o = this.raw(n, "before");
      o && this.builder(o), this.stringify(n, t !== i || r);
    }
  }
  comment(e) {
    let t = this.raw(e, "left", "commentLeft"), r = this.raw(e, "right", "commentRight");
    this.builder("/*" + t + e.text + r + "*/", e);
  }
  decl(e, t) {
    let r = this.raw(e, "between", "colon"), i = e.prop + r + this.rawValue(e, "value");
    e.important && (i += e.raws.important || " !important"), t && (i += ";"), this.builder(i, e);
  }
  document(e) {
    this.body(e);
  }
  raw(e, t, r) {
    let i;
    if (r || (r = t), t && (i = e.raws[t], typeof i < "u"))
      return i;
    let n = e.parent;
    if (r === "before" && (!n || n.type === "root" && n.first === e || n && n.type === "document"))
      return "";
    if (!n) return di[r];
    let o = e.root();
    if (o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u")
      return o.rawCache[r];
    if (r === "before" || r === "after")
      return this.beforeAfter(e, r);
    {
      let l = "raw" + Uu(r);
      this[l] ? i = this[l](o, e) : o.walk((a) => {
        if (i = a.raws[t], typeof i < "u") return !1;
      });
    }
    return typeof i > "u" && (i = di[r]), o.rawCache[r] = i, i;
  }
  rawBeforeClose(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
        return t = r.raws.after, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawBeforeComment(e, t) {
    let r;
    return e.walkComments((i) => {
      if (typeof i.raws.before < "u")
        return r = i.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeDecl") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeDecl(e, t) {
    let r;
    return e.walkDecls((i) => {
      if (typeof i.raws.before < "u")
        return r = i.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeRule") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeOpen(e) {
    let t;
    return e.walk((r) => {
      if (r.type !== "decl" && (t = r.raws.between, typeof t < "u"))
        return !1;
    }), t;
  }
  rawBeforeRule(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && (r.parent !== e || e.first !== r) && typeof r.raws.before < "u")
        return t = r.raws.before, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawColon(e) {
    let t;
    return e.walkDecls((r) => {
      if (typeof r.raws.between < "u")
        return t = r.raws.between.replace(/[^\s:]/g, ""), !1;
    }), t;
  }
  rawEmptyBody(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length === 0 && (t = r.raws.after, typeof t < "u"))
        return !1;
    }), t;
  }
  rawIndent(e) {
    if (e.raws.indent) return e.raws.indent;
    let t;
    return e.walk((r) => {
      let i = r.parent;
      if (i && i !== e && i.parent && i.parent === e && typeof r.raws.before < "u") {
        let n = r.raws.before.split(`
`);
        return t = n[n.length - 1], t = t.replace(/\S/g, ""), !1;
      }
    }), t;
  }
  rawSemicolon(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length && r.last.type === "decl" && (t = r.raws.semicolon, typeof t < "u"))
        return !1;
    }), t;
  }
  rawValue(e, t) {
    let r = e[t], i = e.raws[t];
    return i && i.value === r ? i.raw : r;
  }
  root(e) {
    this.body(e), e.raws.after && this.builder(e.raws.after);
  }
  rule(e) {
    this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
  }
  stringify(e, t) {
    if (!this[e.type])
      throw new Error(
        "Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier."
      );
    this[e.type](e, t);
  }
};
var zn = Jr;
Jr.default = Jr;
let Bu = zn;
function Xr(s, e) {
  new Bu(e).stringify(s);
}
var lr = Xr;
Xr.default = Xr;
let { isClean: Rt, my: zu } = ut, Wu = As, Vu = zn, Gu = lr;
function Kr(s, e) {
  let t = new s.constructor();
  for (let r in s) {
    if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache") continue;
    let i = s[r], n = typeof i;
    r === "parent" && n === "object" ? e && (t[r] = e) : r === "source" ? t[r] = i : Array.isArray(i) ? t[r] = i.map((o) => Kr(o, t)) : (n === "object" && i !== null && (i = Kr(i)), t[r] = i);
  }
  return t;
}
let Qr = class {
  constructor(e = {}) {
    this.raws = {}, this[Rt] = !1, this[zu] = !0;
    for (let t in e)
      if (t === "nodes") {
        this.nodes = [];
        for (let r of e[t])
          typeof r.clone == "function" ? this.append(r.clone()) : this.append(r);
      } else
        this[t] = e[t];
  }
  addToError(e) {
    if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
      let t = this.source;
      e.stack = e.stack.replace(
        /\n\s{4}at /,
        `$&${t.input.from}:${t.start.line}:${t.start.column}$&`
      );
    }
    return e;
  }
  after(e) {
    return this.parent.insertAfter(this, e), this;
  }
  assign(e = {}) {
    for (let t in e)
      this[t] = e[t];
    return this;
  }
  before(e) {
    return this.parent.insertBefore(this, e), this;
  }
  cleanRaws(e) {
    delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
  }
  clone(e = {}) {
    let t = Kr(this);
    for (let r in e)
      t[r] = e[r];
    return t;
  }
  cloneAfter(e = {}) {
    let t = this.clone(e);
    return this.parent.insertAfter(this, t), t;
  }
  cloneBefore(e = {}) {
    let t = this.clone(e);
    return this.parent.insertBefore(this, t), t;
  }
  error(e, t = {}) {
    if (this.source) {
      let { end: r, start: i } = this.rangeBy(t);
      return this.source.input.error(
        e,
        { column: i.column, line: i.line },
        { column: r.column, line: r.line },
        t
      );
    }
    return new Wu(e);
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || /* c8 ignore next */
        t === "text") && e.markDirty()), !0;
      }
    };
  }
  markDirty() {
    if (this[Rt]) {
      this[Rt] = !1;
      let e = this;
      for (; e = e.parent; )
        e[Rt] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e + 1];
  }
  positionBy(e, t) {
    let r = this.source.start;
    if (e.index)
      r = this.positionInside(e.index, t);
    else if (e.word) {
      t = this.toString();
      let i = t.indexOf(e.word);
      i !== -1 && (r = this.positionInside(i, t));
    }
    return r;
  }
  positionInside(e, t) {
    let r = t || this.toString(), i = this.source.start.column, n = this.source.start.line;
    for (let o = 0; o < e; o++)
      r[o] === `
` ? (i = 1, n += 1) : i += 1;
    return { column: i, line: n };
  }
  prev() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e - 1];
  }
  rangeBy(e) {
    let t = {
      column: this.source.start.column,
      line: this.source.start.line
    }, r = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: t.column + 1,
      line: t.line
    };
    if (e.word) {
      let i = this.toString(), n = i.indexOf(e.word);
      n !== -1 && (t = this.positionInside(n, i), r = this.positionInside(n + e.word.length, i));
    } else
      e.start ? t = {
        column: e.start.column,
        line: e.start.line
      } : e.index && (t = this.positionInside(e.index)), e.end ? r = {
        column: e.end.column,
        line: e.end.line
      } : typeof e.endIndex == "number" ? r = this.positionInside(e.endIndex) : e.index && (r = this.positionInside(e.index + 1));
    return (r.line < t.line || r.line === t.line && r.column <= t.column) && (r = { column: t.column + 1, line: t.line }), { end: r, start: t };
  }
  raw(e, t) {
    return new Vu().raw(this, e, t);
  }
  remove() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }
  replaceWith(...e) {
    if (this.parent) {
      let t = this, r = !1;
      for (let i of e)
        i === this ? r = !0 : r ? (this.parent.insertAfter(t, i), t = i) : this.parent.insertBefore(t, i);
      r || this.remove();
    }
    return this;
  }
  root() {
    let e = this;
    for (; e.parent && e.parent.type !== "document"; )
      e = e.parent;
    return e;
  }
  toJSON(e, t) {
    let r = {}, i = t == null;
    t = t || /* @__PURE__ */ new Map();
    let n = 0;
    for (let o in this) {
      if (!Object.prototype.hasOwnProperty.call(this, o) || o === "parent" || o === "proxyCache") continue;
      let l = this[o];
      if (Array.isArray(l))
        r[o] = l.map((a) => typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a);
      else if (typeof l == "object" && l.toJSON)
        r[o] = l.toJSON(null, t);
      else if (o === "source") {
        let a = t.get(l.input);
        a == null && (a = n, t.set(l.input, n), n++), r[o] = {
          end: l.end,
          inputId: a,
          start: l.start
        };
      } else
        r[o] = l;
    }
    return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
  }
  toProxy() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }
  toString(e = Gu) {
    e.stringify && (e = e.stringify);
    let t = "";
    return e(this, (r) => {
      t += r;
    }), t;
  }
  warn(e, t, r) {
    let i = { node: this };
    for (let n in r) i[n] = r[n];
    return e.warn(t, i);
  }
  get proxyOf() {
    return this;
  }
};
var ur = Qr;
Qr.default = Qr;
let ju = ur, qr = class extends ju {
  constructor(e) {
    e && typeof e.value < "u" && typeof e.value != "string" && (e = { ...e, value: String(e.value) }), super(e), this.type = "decl";
  }
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
};
var cr = qr;
qr.default = qr;
let Hu = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Yu = (s = 21) => {
  let e = "", t = s;
  for (; t--; )
    e += Hu[Math.random() * 64 | 0];
  return e;
};
var Zu = { nanoid: Yu };
let { SourceMapConsumer: mi, SourceMapGenerator: gi } = ne, { existsSync: Ju, readFileSync: Xu } = ne, { dirname: xr, join: Ku } = ne;
function Qu(s) {
  return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
}
let es = class {
  constructor(e, t) {
    if (t.map === !1) return;
    this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
    let r = t.map ? t.map.prev : void 0, i = this.loadMap(t.from, r);
    !this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = xr(this.mapFile)), i && (this.text = i);
  }
  consumer() {
    return this.consumerCache || (this.consumerCache = new mi(this.text)), this.consumerCache;
  }
  decodeInline(e) {
    let t = /^data:application\/json;charset=utf-?8;base64,/, r = /^data:application\/json;base64,/, i = /^data:application\/json;charset=utf-?8,/, n = /^data:application\/json,/;
    if (i.test(e) || n.test(e))
      return decodeURIComponent(e.substr(RegExp.lastMatch.length));
    if (t.test(e) || r.test(e))
      return Qu(e.substr(RegExp.lastMatch.length));
    let o = e.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + o);
  }
  getAnnotationURL(e) {
    return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(e) {
    return typeof e != "object" ? !1 : typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections);
  }
  loadAnnotation(e) {
    let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!t) return;
    let r = e.lastIndexOf(t.pop()), i = e.indexOf("*/", r);
    r > -1 && i > -1 && (this.annotation = this.getAnnotationURL(e.substring(r, i)));
  }
  loadFile(e) {
    if (this.root = xr(e), Ju(e))
      return this.mapFile = e, Xu(e, "utf-8").toString().trim();
  }
  loadMap(e, t) {
    if (t === !1) return !1;
    if (t) {
      if (typeof t == "string")
        return t;
      if (typeof t == "function") {
        let r = t(e);
        if (r) {
          let i = this.loadFile(r);
          if (!i)
            throw new Error(
              "Unable to load previous source map: " + r.toString()
            );
          return i;
        }
      } else {
        if (t instanceof mi)
          return gi.fromSourceMap(t).toString();
        if (t instanceof gi)
          return t.toString();
        if (this.isMap(t))
          return JSON.stringify(t);
        throw new Error(
          "Unsupported previous source map format: " + t.toString()
        );
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        let r = this.annotation;
        return e && (r = Ku(xr(e), r)), this.loadFile(r);
      }
    }
  }
  startWith(e, t) {
    return e ? e.substr(0, t.length) === t : !1;
  }
  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var Wn = es;
es.default = es;
let { SourceMapConsumer: qu, SourceMapGenerator: ec } = ne, { fileURLToPath: yi, pathToFileURL: Ot } = ne, { isAbsolute: ts, resolve: rs } = ne, { nanoid: tc } = Zu, Rr = ne, wi = As, rc = Wn, Or = Symbol("fromOffsetCache"), sc = !!(qu && ec), Si = !!(rs && ts), Xt = class {
  constructor(e, t = {}) {
    if (e === null || typeof e > "u" || typeof e == "object" && !e.toString)
      throw new Error(`PostCSS received ${e} instead of CSS string`);
    if (this.css = e.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (!Si || /^\w+:\/\//.test(t.from) || ts(t.from) ? this.file = t.from : this.file = rs(t.from)), Si && sc) {
      let r = new rc(this.css, t);
      if (r.text) {
        this.map = r;
        let i = r.consumer().file;
        !this.file && i && (this.file = this.mapResolve(i));
      }
    }
    this.file || (this.id = "<input css " + tc(6) + ">"), this.map && (this.map.file = this.from);
  }
  error(e, t, r, i = {}) {
    let n, o, l;
    if (t && typeof t == "object") {
      let u = t, c = r;
      if (typeof u.offset == "number") {
        let h = this.fromOffset(u.offset);
        t = h.line, r = h.col;
      } else
        t = u.line, r = u.column;
      if (typeof c.offset == "number") {
        let h = this.fromOffset(c.offset);
        o = h.line, l = h.col;
      } else
        o = c.line, l = c.column;
    } else if (!r) {
      let u = this.fromOffset(t);
      t = u.line, r = u.col;
    }
    let a = this.origin(t, r, o, l);
    return a ? n = new wi(
      e,
      a.endLine === void 0 ? a.line : { column: a.column, line: a.line },
      a.endLine === void 0 ? a.column : { column: a.endColumn, line: a.endLine },
      a.source,
      a.file,
      i.plugin
    ) : n = new wi(
      e,
      o === void 0 ? t : { column: r, line: t },
      o === void 0 ? r : { column: l, line: o },
      this.css,
      this.file,
      i.plugin
    ), n.input = { column: r, endColumn: l, endLine: o, line: t, source: this.css }, this.file && (Ot && (n.input.url = Ot(this.file).toString()), n.input.file = this.file), n;
  }
  fromOffset(e) {
    let t, r;
    if (this[Or])
      r = this[Or];
    else {
      let n = this.css.split(`
`);
      r = new Array(n.length);
      let o = 0;
      for (let l = 0, a = n.length; l < a; l++)
        r[l] = o, o += n[l].length + 1;
      this[Or] = r;
    }
    t = r[r.length - 1];
    let i = 0;
    if (e >= t)
      i = r.length - 1;
    else {
      let n = r.length - 2, o;
      for (; i < n; )
        if (o = i + (n - i >> 1), e < r[o])
          n = o - 1;
        else if (e >= r[o + 1])
          i = o + 1;
        else {
          i = o;
          break;
        }
    }
    return {
      col: e - r[i] + 1,
      line: i + 1
    };
  }
  mapResolve(e) {
    return /^\w+:\/\//.test(e) ? e : rs(this.map.consumer().sourceRoot || this.map.root || ".", e);
  }
  origin(e, t, r, i) {
    if (!this.map) return !1;
    let n = this.map.consumer(), o = n.originalPositionFor({ column: t, line: e });
    if (!o.source) return !1;
    let l;
    typeof r == "number" && (l = n.originalPositionFor({ column: i, line: r }));
    let a;
    ts(o.source) ? a = Ot(o.source) : a = new URL(
      o.source,
      this.map.consumer().sourceRoot || Ot(this.map.mapFile)
    );
    let u = {
      column: o.column,
      endColumn: l && l.column,
      endLine: l && l.line,
      line: o.line,
      url: a.toString()
    };
    if (a.protocol === "file:")
      if (yi)
        u.file = yi(a);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    let c = n.sourceContentFor(o.source);
    return c && (u.source = c), u;
  }
  toJSON() {
    let e = {};
    for (let t of ["hasBOM", "css", "file", "id"])
      this[t] != null && (e[t] = this[t]);
    return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
  }
  get from() {
    return this.file || this.id;
  }
};
var hr = Xt;
Xt.default = Xt;
Rr && Rr.registerInput && Rr.registerInput(Xt);
let { SourceMapConsumer: Vn, SourceMapGenerator: Bt } = ne, { dirname: zt, relative: Gn, resolve: jn, sep: Hn } = ne, { pathToFileURL: bi } = ne, ic = hr, nc = !!(Vn && Bt), oc = !!(zt && jn && Gn && Hn), ac = class {
  constructor(e, t, r, i) {
    this.stringify = e, this.mapOpts = r.map || {}, this.root = t, this.opts = r, this.css = i, this.originalCSS = i, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let e;
    this.isInline() ? e = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? e = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? e = this.mapOpts.annotation(this.opts.to, this.root) : e = this.outputFile() + ".map";
    let t = `
`;
    this.css.includes(`\r
`) && (t = `\r
`), this.css += t + "/*# sourceMappingURL=" + e + " */";
  }
  applyPrevMaps() {
    for (let e of this.previous()) {
      let t = this.toUrl(this.path(e.file)), r = e.root || zt(e.file), i;
      this.mapOpts.sourcesContent === !1 ? (i = new Vn(e.text), i.sourcesContent && (i.sourcesContent = null)) : i = e.consumer(), this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation !== !1)
      if (this.root) {
        let e;
        for (let t = this.root.nodes.length - 1; t >= 0; t--)
          e = this.root.nodes[t], e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
      } else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
  }
  generate() {
    if (this.clearAnnotation(), oc && nc && this.isMap())
      return this.generateMap();
    {
      let e = "";
      return this.stringify(this.root, (t) => {
        e += t;
      }), [e];
    }
  }
  generateMap() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      let e = this.previous()[0].consumer();
      e.file = this.outputFile(), this.map = Bt.fromSourceMap(e, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new Bt({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
  }
  generateString() {
    this.css = "", this.map = new Bt({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    let e = 1, t = 1, r = "<no source>", i = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    }, n, o;
    this.stringify(this.root, (l, a, u) => {
      if (this.css += l, a && u !== "end" && (i.generated.line = e, i.generated.column = t - 1, a.source && a.source.start ? (i.source = this.sourcePath(a), i.original.line = a.source.start.line, i.original.column = a.source.start.column - 1, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), n = l.match(/\n/g), n ? (e += n.length, o = l.lastIndexOf(`
`), t = l.length - o) : t += l.length, a && u !== "start") {
        let c = a.parent || { raws: {} };
        (!(a.type === "decl" || a.type === "atrule" && !a.nodes) || a !== c.last || c.raws.semicolon) && (a.source && a.source.end ? (i.source = this.sourcePath(a), i.original.line = a.source.end.line, i.original.column = a.source.end.column - 1, i.generated.line = e, i.generated.column = t - 2, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, i.generated.line = e, i.generated.column = t - 1, this.map.addMapping(i)));
      }
    });
  }
  isAnnotation() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((e) => e.annotation) : !0;
  }
  isInline() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    let e = this.mapOpts.annotation;
    return typeof e < "u" && e !== !0 ? !1 : this.previous().length ? this.previous().some((t) => t.inline) : !0;
  }
  isMap() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }
  isSourcesContent() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((e) => e.withContent()) : !0;
  }
  outputFile() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }
  path(e) {
    if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
    let t = this.memoizedPaths.get(e);
    if (t) return t;
    let r = this.opts.to ? zt(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (r = zt(jn(r, this.mapOpts.annotation)));
    let i = Gn(r, e);
    return this.memoizedPaths.set(e, i), i;
  }
  previous() {
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk((e) => {
          if (e.source && e.source.input.map) {
            let t = e.source.input.map;
            this.previousMaps.includes(t) || this.previousMaps.push(t);
          }
        });
      else {
        let e = new ic(this.originalCSS, this.opts);
        e.map && this.previousMaps.push(e.map);
      }
    return this.previousMaps;
  }
  setSourcesContent() {
    let e = {};
    if (this.root)
      this.root.walk((t) => {
        if (t.source) {
          let r = t.source.input.from;
          if (r && !e[r]) {
            e[r] = !0;
            let i = this.usesFileUrls ? this.toFileUrl(r) : this.toUrl(this.path(r));
            this.map.setSourceContent(i, t.source.input.css);
          }
        }
      });
    else if (this.css) {
      let t = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(t, this.css);
    }
  }
  sourcePath(e) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
  }
  toBase64(e) {
    return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
  }
  toFileUrl(e) {
    let t = this.memoizedFileURLs.get(e);
    if (t) return t;
    if (bi) {
      let r = bi(e).toString();
      return this.memoizedFileURLs.set(e, r), r;
    } else
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
  }
  toUrl(e) {
    let t = this.memoizedURLs.get(e);
    if (t) return t;
    Hn === "\\" && (e = e.replace(/\\/g, "/"));
    let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(e, r), r;
  }
};
var Yn = ac;
let lc = ur, ss = class extends lc {
  constructor(e) {
    super(e), this.type = "comment";
  }
};
var fr = ss;
ss.default = ss;
let { isClean: Zn, my: Jn } = ut, Xn = cr, Kn = fr, uc = ur, Qn, Es, Ms, qn;
function eo(s) {
  return s.map((e) => (e.nodes && (e.nodes = eo(e.nodes)), delete e.source, e));
}
function to(s) {
  if (s[Zn] = !1, s.proxyOf.nodes)
    for (let e of s.proxyOf.nodes)
      to(e);
}
let pe = class ro extends uc {
  append(...e) {
    for (let t of e) {
      let r = this.normalize(t, this.last);
      for (let i of r) this.proxyOf.nodes.push(i);
    }
    return this.markDirty(), this;
  }
  cleanRaws(e) {
    if (super.cleanRaws(e), this.nodes)
      for (let t of this.nodes) t.cleanRaws(e);
  }
  each(e) {
    if (!this.proxyOf.nodes) return;
    let t = this.getIterator(), r, i;
    for (; this.indexes[t] < this.proxyOf.nodes.length && (r = this.indexes[t], i = e(this.proxyOf.nodes[r], r), i !== !1); )
      this.indexes[t] += 1;
    return delete this.indexes[t], i;
  }
  every(e) {
    return this.nodes.every(e);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    let e = this.lastEach;
    return this.indexes[e] = 0, e;
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...r) => e[t](
          ...r.map((i) => typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i)
        ) : t === "every" || t === "some" ? (r) => e[t](
          (i, ...n) => r(i.toProxy(), ...n)
        ) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((r) => r.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
      }
    };
  }
  index(e) {
    return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
  }
  insertAfter(e, t) {
    let r = this.index(e), i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
    r = this.index(e);
    for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
    let n;
    for (let o in this.indexes)
      n = this.indexes[o], r < n && (this.indexes[o] = n + i.length);
    return this.markDirty(), this;
  }
  insertBefore(e, t) {
    let r = this.index(e), i = r === 0 ? "prepend" : !1, n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
    r = this.index(e);
    for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
    let o;
    for (let l in this.indexes)
      o = this.indexes[l], r <= o && (this.indexes[l] = o + n.length);
    return this.markDirty(), this;
  }
  normalize(e, t) {
    if (typeof e == "string")
      e = eo(Qn(e).nodes);
    else if (typeof e > "u")
      e = [];
    else if (Array.isArray(e)) {
      e = e.slice(0);
      for (let i of e)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type === "root" && this.type !== "document") {
      e = e.nodes.slice(0);
      for (let i of e)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type)
      e = [e];
    else if (e.prop) {
      if (typeof e.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof e.value != "string" && (e.value = String(e.value)), e = [new Xn(e)];
    } else if (e.selector)
      e = [new Es(e)];
    else if (e.name)
      e = [new Ms(e)];
    else if (e.text)
      e = [new Kn(e)];
    else
      throw new Error("Unknown node type in node creation");
    return e.map((i) => (i[Jn] || ro.rebuild(i), i = i.proxyOf, i.parent && i.parent.removeChild(i), i[Zn] && to(i), typeof i.raws.before > "u" && t && typeof t.raws.before < "u" && (i.raws.before = t.raws.before.replace(/\S/g, "")), i.parent = this.proxyOf, i));
  }
  prepend(...e) {
    e = e.reverse();
    for (let t of e) {
      let r = this.normalize(t, this.first, "prepend").reverse();
      for (let i of r) this.proxyOf.nodes.unshift(i);
      for (let i in this.indexes)
        this.indexes[i] = this.indexes[i] + r.length;
    }
    return this.markDirty(), this;
  }
  push(e) {
    return e.parent = this, this.proxyOf.nodes.push(e), this;
  }
  removeAll() {
    for (let e of this.proxyOf.nodes) e.parent = void 0;
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }
  removeChild(e) {
    e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
    let t;
    for (let r in this.indexes)
      t = this.indexes[r], t >= e && (this.indexes[r] = t - 1);
    return this.markDirty(), this;
  }
  replaceValues(e, t, r) {
    return r || (r = t, t = {}), this.walkDecls((i) => {
      t.props && !t.props.includes(i.prop) || t.fast && !i.value.includes(t.fast) || (i.value = i.value.replace(e, r));
    }), this.markDirty(), this;
  }
  some(e) {
    return this.nodes.some(e);
  }
  walk(e) {
    return this.each((t, r) => {
      let i;
      try {
        i = e(t, r);
      } catch (n) {
        throw t.addToError(n);
      }
      return i !== !1 && t.walk && (i = t.walk(e)), i;
    });
  }
  walkAtRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "atrule" && e.test(r.name))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "atrule" && r.name === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "atrule")
        return t(r, i);
    }));
  }
  walkComments(e) {
    return this.walk((t, r) => {
      if (t.type === "comment")
        return e(t, r);
    });
  }
  walkDecls(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "decl" && e.test(r.prop))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "decl" && r.prop === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "decl")
        return t(r, i);
    }));
  }
  walkRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "rule" && e.test(r.selector))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "rule" && r.selector === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "rule")
        return t(r, i);
    }));
  }
  get first() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
pe.registerParse = (s) => {
  Qn = s;
};
pe.registerRule = (s) => {
  Es = s;
};
pe.registerAtRule = (s) => {
  Ms = s;
};
pe.registerRoot = (s) => {
  qn = s;
};
var xe = pe;
pe.default = pe;
pe.rebuild = (s) => {
  s.type === "atrule" ? Object.setPrototypeOf(s, Ms.prototype) : s.type === "rule" ? Object.setPrototypeOf(s, Es.prototype) : s.type === "decl" ? Object.setPrototypeOf(s, Xn.prototype) : s.type === "comment" ? Object.setPrototypeOf(s, Kn.prototype) : s.type === "root" && Object.setPrototypeOf(s, qn.prototype), s[Jn] = !0, s.nodes && s.nodes.forEach((e) => {
    pe.rebuild(e);
  });
};
let cc = xe, so, io, rt = class extends cc {
  constructor(e) {
    super({ type: "document", ...e }), this.nodes || (this.nodes = []);
  }
  toResult(e = {}) {
    return new so(new io(), this, e).stringify();
  }
};
rt.registerLazyResult = (s) => {
  so = s;
};
rt.registerProcessor = (s) => {
  io = s;
};
var $s = rt;
rt.default = rt;
let Ci = {};
var no = function(e) {
  Ci[e] || (Ci[e] = !0, typeof console < "u" && console.warn && console.warn(e));
};
let is = class {
  constructor(e, t = {}) {
    if (this.type = "warning", this.text = e, t.node && t.node.source) {
      let r = t.node.rangeBy(t);
      this.line = r.start.line, this.column = r.start.column, this.endLine = r.end.line, this.endColumn = r.end.column;
    }
    for (let r in t) this[r] = t[r];
  }
  toString() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }
};
var oo = is;
is.default = is;
let hc = oo, ns = class {
  constructor(e, t, r) {
    this.processor = e, this.messages = [], this.root = t, this.opts = r, this.css = void 0, this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(e, t = {}) {
    t.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin);
    let r = new hc(e, t);
    return this.messages.push(r), r;
  }
  warnings() {
    return this.messages.filter((e) => e.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var Ns = ns;
ns.default = ns;
const Ar = 39, vi = 34, At = 92, Ii = 47, Et = 10, Ge = 32, Mt = 12, $t = 9, Nt = 13, fc = 91, pc = 93, dc = 40, mc = 41, gc = 123, yc = 125, wc = 59, Sc = 42, bc = 58, Cc = 64, kt = /[\t\n\f\r "#'()/;[\\\]{}]/g, Pt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, vc = /.[\r\n"'(/\\]/, xi = /[\da-f]/i;
var Ic = function(e, t = {}) {
  let r = e.css.valueOf(), i = t.ignoreErrors, n, o, l, a, u, c, h, d, m, g, p = r.length, f = 0, S = [], b = [];
  function y() {
    return f;
  }
  function C(_) {
    throw e.error("Unclosed " + _, f);
  }
  function $() {
    return b.length === 0 && f >= p;
  }
  function P(_) {
    if (b.length) return b.pop();
    if (f >= p) return;
    let W = _ ? _.ignoreUnclosed : !1;
    switch (n = r.charCodeAt(f), n) {
      case Et:
      case Ge:
      case $t:
      case Nt:
      case Mt: {
        o = f;
        do
          o += 1, n = r.charCodeAt(o);
        while (n === Ge || n === Et || n === $t || n === Nt || n === Mt);
        g = ["space", r.slice(f, o)], f = o - 1;
        break;
      }
      case fc:
      case pc:
      case gc:
      case yc:
      case bc:
      case wc:
      case mc: {
        let H = String.fromCharCode(n);
        g = [H, H, f];
        break;
      }
      case dc: {
        if (d = S.length ? S.pop()[1] : "", m = r.charCodeAt(f + 1), d === "url" && m !== Ar && m !== vi && m !== Ge && m !== Et && m !== $t && m !== Mt && m !== Nt) {
          o = f;
          do {
            if (c = !1, o = r.indexOf(")", o + 1), o === -1)
              if (i || W) {
                o = f;
                break;
              } else
                C("bracket");
            for (h = o; r.charCodeAt(h - 1) === At; )
              h -= 1, c = !c;
          } while (c);
          g = ["brackets", r.slice(f, o + 1), f, o], f = o;
        } else
          o = r.indexOf(")", f + 1), a = r.slice(f, o + 1), o === -1 || vc.test(a) ? g = ["(", "(", f] : (g = ["brackets", a, f, o], f = o);
        break;
      }
      case Ar:
      case vi: {
        l = n === Ar ? "'" : '"', o = f;
        do {
          if (c = !1, o = r.indexOf(l, o + 1), o === -1)
            if (i || W) {
              o = f + 1;
              break;
            } else
              C("string");
          for (h = o; r.charCodeAt(h - 1) === At; )
            h -= 1, c = !c;
        } while (c);
        g = ["string", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case Cc: {
        kt.lastIndex = f + 1, kt.test(r), kt.lastIndex === 0 ? o = r.length - 1 : o = kt.lastIndex - 2, g = ["at-word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case At: {
        for (o = f, u = !0; r.charCodeAt(o + 1) === At; )
          o += 1, u = !u;
        if (n = r.charCodeAt(o + 1), u && n !== Ii && n !== Ge && n !== Et && n !== $t && n !== Nt && n !== Mt && (o += 1, xi.test(r.charAt(o)))) {
          for (; xi.test(r.charAt(o + 1)); )
            o += 1;
          r.charCodeAt(o + 1) === Ge && (o += 1);
        }
        g = ["word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      default: {
        n === Ii && r.charCodeAt(f + 1) === Sc ? (o = r.indexOf("*/", f + 2) + 1, o === 0 && (i || W ? o = r.length : C("comment")), g = ["comment", r.slice(f, o + 1), f, o], f = o) : (Pt.lastIndex = f + 1, Pt.test(r), Pt.lastIndex === 0 ? o = r.length - 1 : o = Pt.lastIndex - 2, g = ["word", r.slice(f, o + 1), f, o], S.push(g), f = o);
        break;
      }
    }
    return f++, g;
  }
  function j(_) {
    b.push(_);
  }
  return {
    back: j,
    endOfFile: $,
    nextToken: P,
    position: y
  };
};
let ao = xe, Kt = class extends ao {
  constructor(e) {
    super(e), this.type = "atrule";
  }
  append(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
  }
  prepend(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
  }
};
var ks = Kt;
Kt.default = Kt;
ao.registerAtRule(Kt);
let lo = xe, uo, co, Te = class extends lo {
  constructor(e) {
    super(e), this.type = "root", this.nodes || (this.nodes = []);
  }
  normalize(e, t, r) {
    let i = super.normalize(e);
    if (t) {
      if (r === "prepend")
        this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
      else if (this.first !== t)
        for (let n of i)
          n.raws.before = t.raws.before;
    }
    return i;
  }
  removeChild(e, t) {
    let r = this.index(e);
    return !t && r === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[r].raws.before), super.removeChild(e);
  }
  toResult(e = {}) {
    return new uo(new co(), this, e).stringify();
  }
};
Te.registerLazyResult = (s) => {
  uo = s;
};
Te.registerProcessor = (s) => {
  co = s;
};
var ct = Te;
Te.default = Te;
lo.registerRoot(Te);
let st = {
  comma(s) {
    return st.split(s, [","], !0);
  },
  space(s) {
    let e = [" ", `
`, "	"];
    return st.split(s, e);
  },
  split(s, e, t) {
    let r = [], i = "", n = !1, o = 0, l = !1, a = "", u = !1;
    for (let c of s)
      u ? u = !1 : c === "\\" ? u = !0 : l ? c === a && (l = !1) : c === '"' || c === "'" ? (l = !0, a = c) : c === "(" ? o += 1 : c === ")" ? o > 0 && (o -= 1) : o === 0 && e.includes(c) && (n = !0), n ? (i !== "" && r.push(i.trim()), i = "", n = !1) : i += c;
    return (t || i !== "") && r.push(i.trim()), r;
  }
};
var ho = st;
st.default = st;
let fo = xe, xc = ho, Qt = class extends fo {
  constructor(e) {
    super(e), this.type = "rule", this.nodes || (this.nodes = []);
  }
  get selectors() {
    return xc.comma(this.selector);
  }
  set selectors(e) {
    let t = this.selector ? this.selector.match(/,\s*/) : null, r = t ? t[0] : "," + this.raw("between", "beforeOpen");
    this.selector = e.join(r);
  }
};
var Ps = Qt;
Qt.default = Qt;
fo.registerRule(Qt);
let Rc = cr, Oc = Ic, Ac = fr, Ec = ks, Mc = ct, Ri = Ps;
const Oi = {
  empty: !0,
  space: !0
};
function $c(s) {
  for (let e = s.length - 1; e >= 0; e--) {
    let t = s[e], r = t[3] || t[2];
    if (r) return r;
  }
}
let Nc = class {
  constructor(e) {
    this.input = e, this.root = new Mc(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(e) {
    let t = new Ec();
    t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
    let r, i, n, o = !1, l = !1, a = [], u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (e = this.tokenizer.nextToken(), r = e[0], r === "(" || r === "[" ? u.push(r === "(" ? ")" : "]") : r === "{" && u.length > 0 ? u.push("}") : r === u[u.length - 1] && u.pop(), u.length === 0)
        if (r === ";") {
          t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
          break;
        } else if (r === "{") {
          l = !0;
          break;
        } else if (r === "}") {
          if (a.length > 0) {
            for (n = a.length - 1, i = a[n]; i && i[0] === "space"; )
              i = a[--n];
            i && (t.source.end = this.getPosition(i[3] || i[2]), t.source.end.offset++);
          }
          this.end(e);
          break;
        } else
          a.push(e);
      else
        a.push(e);
      if (this.tokenizer.endOfFile()) {
        o = !0;
        break;
      }
    }
    t.raws.between = this.spacesAndCommentsFromEnd(a), a.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(a), this.raw(t, "params", a), o && (e = a[a.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), l && (t.nodes = [], this.current = t);
  }
  checkMissedSemicolon(e) {
    let t = this.colon(e);
    if (t === !1) return;
    let r = 0, i;
    for (let n = t - 1; n >= 0 && (i = e[n], !(i[0] !== "space" && (r += 1, r === 2))); n--)
      ;
    throw this.input.error(
      "Missed semicolon",
      i[0] === "word" ? i[3] + 1 : i[2]
    );
  }
  colon(e) {
    let t = 0, r, i, n;
    for (let [o, l] of e.entries()) {
      if (r = l, i = r[0], i === "(" && (t += 1), i === ")" && (t -= 1), t === 0 && i === ":")
        if (!n)
          this.doubleColon(r);
        else {
          if (n[0] === "word" && n[1] === "progid")
            continue;
          return o;
        }
      n = r;
    }
    return !1;
  }
  comment(e) {
    let t = new Ac();
    this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
    let r = e[1].slice(2, -2);
    if (/^\s*$/.test(r))
      t.text = "", t.raws.left = r, t.raws.right = "";
    else {
      let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
      t.text = i[2], t.raws.left = i[1], t.raws.right = i[3];
    }
  }
  createTokenizer() {
    this.tokenizer = Oc(this.input);
  }
  decl(e, t) {
    let r = new Rc();
    this.init(r, e[0][2]);
    let i = e[e.length - 1];
    for (i[0] === ";" && (this.semicolon = !0, e.pop()), r.source.end = this.getPosition(
      i[3] || i[2] || $c(e)
    ), r.source.end.offset++; e[0][0] !== "word"; )
      e.length === 1 && this.unknownWord(e), r.raws.before += e.shift()[1];
    for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
      let u = e[0][0];
      if (u === ":" || u === "space" || u === "comment")
        break;
      r.prop += e.shift()[1];
    }
    r.raws.between = "";
    let n;
    for (; e.length; )
      if (n = e.shift(), n[0] === ":") {
        r.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), r.raws.between += n[1];
    (r.prop[0] === "_" || r.prop[0] === "*") && (r.raws.before += r.prop[0], r.prop = r.prop.slice(1));
    let o = [], l;
    for (; e.length && (l = e[0][0], !(l !== "space" && l !== "comment")); )
      o.push(e.shift());
    this.precheckMissedSemicolon(e);
    for (let u = e.length - 1; u >= 0; u--) {
      if (n = e[u], n[1].toLowerCase() === "!important") {
        r.important = !0;
        let c = this.stringFrom(e, u);
        c = this.spacesFromEnd(e) + c, c !== " !important" && (r.raws.important = c);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let c = e.slice(0), h = "";
        for (let d = u; d > 0; d--) {
          let m = c[d][0];
          if (h.trim().indexOf("!") === 0 && m !== "space")
            break;
          h = c.pop()[1] + h;
        }
        h.trim().indexOf("!") === 0 && (r.important = !0, r.raws.important = h, e = c);
      }
      if (n[0] !== "space" && n[0] !== "comment")
        break;
    }
    e.some((u) => u[0] !== "space" && u[0] !== "comment") && (r.raws.between += o.map((u) => u[1]).join(""), o = []), this.raw(r, "value", o.concat(e), t), r.value.includes(":") && !t && this.checkMissedSemicolon(e);
  }
  doubleColon(e) {
    throw this.input.error(
      "Double colon",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
  emptyRule(e) {
    let t = new Ri();
    this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
  }
  end(e) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(e) {
    if (this.spaces += e[1], this.current.nodes) {
      let t = this.current.nodes[this.current.nodes.length - 1];
      t && t.type === "rule" && !t.raws.ownSemicolon && (t.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }
  // Helpers
  getPosition(e) {
    let t = this.input.fromOffset(e);
    return {
      column: t.col,
      line: t.line,
      offset: e
    };
  }
  init(e, t) {
    this.current.push(e), e.source = {
      input: this.input,
      start: this.getPosition(t)
    }, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
  }
  other(e) {
    let t = !1, r = null, i = !1, n = null, o = [], l = e[1].startsWith("--"), a = [], u = e;
    for (; u; ) {
      if (r = u[0], a.push(u), r === "(" || r === "[")
        n || (n = u), o.push(r === "(" ? ")" : "]");
      else if (l && i && r === "{")
        n || (n = u), o.push("}");
      else if (o.length === 0)
        if (r === ";")
          if (i) {
            this.decl(a, l);
            return;
          } else
            break;
        else if (r === "{") {
          this.rule(a);
          return;
        } else if (r === "}") {
          this.tokenizer.back(a.pop()), t = !0;
          break;
        } else r === ":" && (i = !0);
      else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (t = !0), o.length > 0 && this.unclosedBracket(n), t && i) {
      if (!l)
        for (; a.length && (u = a[a.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(a.pop());
      this.decl(a, l);
    } else
      this.unknownWord(a);
  }
  parse() {
    let e;
    for (; !this.tokenizer.endOfFile(); )
      switch (e = this.tokenizer.nextToken(), e[0]) {
        case "space":
          this.spaces += e[1];
          break;
        case ";":
          this.freeSemicolon(e);
          break;
        case "}":
          this.end(e);
          break;
        case "comment":
          this.comment(e);
          break;
        case "at-word":
          this.atrule(e);
          break;
        case "{":
          this.emptyRule(e);
          break;
        default:
          this.other(e);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(e, t, r, i) {
    let n, o, l = r.length, a = "", u = !0, c, h;
    for (let d = 0; d < l; d += 1)
      n = r[d], o = n[0], o === "space" && d === l - 1 && !i ? u = !1 : o === "comment" ? (h = r[d - 1] ? r[d - 1][0] : "empty", c = r[d + 1] ? r[d + 1][0] : "empty", !Oi[h] && !Oi[c] ? a.slice(-1) === "," ? u = !1 : a += n[1] : u = !1) : a += n[1];
    if (!u) {
      let d = r.reduce((m, g) => m + g[1], "");
      e.raws[t] = { raw: d, value: a };
    }
    e[t] = a;
  }
  rule(e) {
    e.pop();
    let t = new Ri();
    this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
  }
  spacesAndCommentsFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], !(t !== "space" && t !== "comment")); )
      r = e.pop()[1] + r;
    return r;
  }
  // Errors
  spacesAndCommentsFromStart(e) {
    let t, r = "";
    for (; e.length && (t = e[0][0], !(t !== "space" && t !== "comment")); )
      r += e.shift()[1];
    return r;
  }
  spacesFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], t === "space"); )
      r = e.pop()[1] + r;
    return r;
  }
  stringFrom(e, t) {
    let r = "";
    for (let i = t; i < e.length; i++)
      r += e[i][1];
    return e.splice(t, e.length - t), r;
  }
  unclosedBlock() {
    let e = this.current.source.start;
    throw this.input.error("Unclosed block", e.line, e.column);
  }
  unclosedBracket(e) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unexpectedClose(e) {
    throw this.input.error(
      "Unexpected }",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unknownWord(e) {
    throw this.input.error(
      "Unknown word",
      { offset: e[0][2] },
      { offset: e[0][2] + e[0][1].length }
    );
  }
  unnamedAtrule(e, t) {
    throw this.input.error(
      "At-rule without name",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
};
var kc = Nc;
let Pc = xe, Tc = kc, Dc = hr;
function qt(s, e) {
  let t = new Dc(s, e), r = new Tc(t);
  try {
    r.parse();
  } catch (i) {
    throw process.env.NODE_ENV !== "production" && i.name === "CssSyntaxError" && e && e.from && (/\.scss$/i.test(e.from) ? i.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(e.from) ? i.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(e.from) && (i.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), i;
  }
  return r.root;
}
var Ts = qt;
qt.default = qt;
Pc.registerParse(qt);
let { isClean: ce, my: _c } = ut, Lc = Yn, Fc = lr, Uc = xe, Bc = $s, zc = no, Ai = Ns, Wc = Ts, Vc = ct;
const Gc = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, jc = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, Hc = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, De = 0;
function je(s) {
  return typeof s == "object" && typeof s.then == "function";
}
function po(s) {
  let e = !1, t = Gc[s.type];
  return s.type === "decl" ? e = s.prop.toLowerCase() : s.type === "atrule" && (e = s.name.toLowerCase()), e && s.append ? [
    t,
    t + "-" + e,
    De,
    t + "Exit",
    t + "Exit-" + e
  ] : e ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e] : s.append ? [t, De, t + "Exit"] : [t, t + "Exit"];
}
function Ei(s) {
  let e;
  return s.type === "document" ? e = ["Document", De, "DocumentExit"] : s.type === "root" ? e = ["Root", De, "RootExit"] : e = po(s), {
    eventIndex: 0,
    events: e,
    iterator: 0,
    node: s,
    visitorIndex: 0,
    visitors: []
  };
}
function os(s) {
  return s[ce] = !1, s.nodes && s.nodes.forEach((e) => os(e)), s;
}
let as = {}, _e = class mo {
  constructor(e, t, r) {
    this.stringified = !1, this.processed = !1;
    let i;
    if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document"))
      i = os(t);
    else if (t instanceof mo || t instanceof Ai)
      i = os(t.root), t.map && (typeof r.map > "u" && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = t.map);
    else {
      let n = Wc;
      r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
      try {
        i = n(t, r);
      } catch (o) {
        this.processed = !0, this.error = o;
      }
      i && !i[_c] && Uc.rebuild(i);
    }
    this.result = new Ai(e, i, r), this.helpers = { ...as, postcss: as, result: this.result }, this.plugins = this.processor.plugins.map((n) => typeof n == "object" && n.prepare ? { ...n, ...n.prepare(this.result) } : n);
  }
  async() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(e, t) {
    let r = this.result.lastPlugin;
    try {
      if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin)
        e.plugin = r.postcssPlugin, e.setMessage();
      else if (r.postcssVersion && process.env.NODE_ENV !== "production") {
        let i = r.postcssPlugin, n = r.postcssVersion, o = this.result.processor.version, l = n.split("."), a = o.split(".");
        (l[0] !== a[0] || parseInt(l[1]) > parseInt(a[1])) && console.error(
          "Unknown error from PostCSS plugin. Your current PostCSS version is " + o + ", but " + i + " uses " + n + ". Perhaps this is the source of the error below."
        );
      }
    } catch (i) {
      console && console.error && console.error(i);
    }
    return e;
  }
  prepareVisitors() {
    this.listeners = {};
    let e = (t, r, i) => {
      this.listeners[r] || (this.listeners[r] = []), this.listeners[r].push([t, i]);
    };
    for (let t of this.plugins)
      if (typeof t == "object")
        for (let r in t) {
          if (!jc[r] && /^[A-Z]/.test(r))
            throw new Error(
              `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          if (!Hc[r])
            if (typeof t[r] == "object")
              for (let i in t[r])
                i === "*" ? e(t, r, t[r][i]) : e(
                  t,
                  r + "-" + i.toLowerCase(),
                  t[r][i]
                );
            else typeof t[r] == "function" && e(t, r, t[r]);
        }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let e = 0; e < this.plugins.length; e++) {
      let t = this.plugins[e], r = this.runOnRoot(t);
      if (je(r))
        try {
          await r;
        } catch (i) {
          throw this.handleError(i);
        }
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[ce]; ) {
        e[ce] = !0;
        let t = [Ei(e)];
        for (; t.length > 0; ) {
          let r = this.visitTick(t);
          if (je(r))
            try {
              await r;
            } catch (i) {
              let n = t[t.length - 1].node;
              throw this.handleError(i, n);
            }
        }
      }
      if (this.listeners.OnceExit)
        for (let [t, r] of this.listeners.OnceExit) {
          this.result.lastPlugin = t;
          try {
            if (e.type === "document") {
              let i = e.nodes.map(
                (n) => r(n, this.helpers)
              );
              await Promise.all(i);
            } else
              await r(e, this.helpers);
          } catch (i) {
            throw this.handleError(i);
          }
        }
    }
    return this.processed = !0, this.stringify();
  }
  runOnRoot(e) {
    this.result.lastPlugin = e;
    try {
      if (typeof e == "object" && e.Once) {
        if (this.result.root.type === "document") {
          let t = this.result.root.nodes.map(
            (r) => e.Once(r, this.helpers)
          );
          return je(t[0]) ? Promise.all(t) : t;
        }
        return e.Once(this.result.root, this.helpers);
      } else if (typeof e == "function")
        return e(this.result.root, this.result);
    } catch (t) {
      throw this.handleError(t);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    let e = this.result.opts, t = Fc;
    e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
    let i = new Lc(t, this.result.root, this.result.opts).generate();
    return this.result.css = i[0], this.result.map = i[1], this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (let e of this.plugins) {
      let t = this.runOnRoot(e);
      if (je(t))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[ce]; )
        e[ce] = !0, this.walkSync(e);
      if (this.listeners.OnceExit)
        if (e.type === "document")
          for (let t of e.nodes)
            this.visitSync(this.listeners.OnceExit, t);
        else
          this.visitSync(this.listeners.OnceExit, e);
    }
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || zc(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this.css;
  }
  visitSync(e, t) {
    for (let [r, i] of e) {
      this.result.lastPlugin = r;
      let n;
      try {
        n = i(t, this.helpers);
      } catch (o) {
        throw this.handleError(o, t.proxyOf);
      }
      if (t.type !== "root" && t.type !== "document" && !t.parent)
        return !0;
      if (je(n))
        throw this.getAsyncError();
    }
  }
  visitTick(e) {
    let t = e[e.length - 1], { node: r, visitors: i } = t;
    if (r.type !== "root" && r.type !== "document" && !r.parent) {
      e.pop();
      return;
    }
    if (i.length > 0 && t.visitorIndex < i.length) {
      let [o, l] = i[t.visitorIndex];
      t.visitorIndex += 1, t.visitorIndex === i.length && (t.visitors = [], t.visitorIndex = 0), this.result.lastPlugin = o;
      try {
        return l(r.toProxy(), this.helpers);
      } catch (a) {
        throw this.handleError(a, r);
      }
    }
    if (t.iterator !== 0) {
      let o = t.iterator, l;
      for (; l = r.nodes[r.indexes[o]]; )
        if (r.indexes[o] += 1, !l[ce]) {
          l[ce] = !0, e.push(Ei(l));
          return;
        }
      t.iterator = 0, delete r.indexes[o];
    }
    let n = t.events;
    for (; t.eventIndex < n.length; ) {
      let o = n[t.eventIndex];
      if (t.eventIndex += 1, o === De) {
        r.nodes && r.nodes.length && (r[ce] = !0, t.iterator = r.getIterator());
        return;
      } else if (this.listeners[o]) {
        t.visitors = this.listeners[o];
        return;
      }
    }
    e.pop();
  }
  walkSync(e) {
    e[ce] = !0;
    let t = po(e);
    for (let r of t)
      if (r === De)
        e.nodes && e.each((i) => {
          i[ce] || this.walkSync(i);
        });
      else {
        let i = this.listeners[r];
        if (i && this.visitSync(i, e.toProxy()))
          return;
      }
  }
  warnings() {
    return this.sync().warnings();
  }
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
};
_e.registerPostcss = (s) => {
  as = s;
};
var go = _e;
_e.default = _e;
Vc.registerLazyResult(_e);
Bc.registerLazyResult(_e);
let Yc = Yn, Zc = lr, Jc = no, Xc = Ts;
const Kc = Ns;
let ls = class {
  constructor(e, t, r) {
    t = t.toString(), this.stringified = !1, this._processor = e, this._css = t, this._opts = r, this._map = void 0;
    let i, n = Zc;
    this.result = new Kc(this._processor, i, this._opts), this.result.css = t;
    let o = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return o.root;
      }
    });
    let l = new Yc(n, i, this._opts, t);
    if (l.isMap()) {
      let [a, u] = l.generate();
      a && (this.result.css = a), u && (this.result.map = u);
    } else
      l.clearAnnotation(), this.result.css = l.css;
  }
  async() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || Jc(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root)
      return this._root;
    let e, t = Xc;
    try {
      e = t(this._css, this._opts);
    } catch (r) {
      this.error = r;
    }
    if (this.error)
      throw this.error;
    return this._root = e, e;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var Qc = ls;
ls.default = ls;
let qc = Qc, eh = go, th = $s, rh = ct, it = class {
  constructor(e = []) {
    this.version = "8.4.38", this.plugins = this.normalize(e);
  }
  normalize(e) {
    let t = [];
    for (let r of e)
      if (r.postcss === !0 ? r = r() : r.postcss && (r = r.postcss), typeof r == "object" && Array.isArray(r.plugins))
        t = t.concat(r.plugins);
      else if (typeof r == "object" && r.postcssPlugin)
        t.push(r);
      else if (typeof r == "function")
        t.push(r);
      else if (typeof r == "object" && (r.parse || r.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error(
            "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
          );
      } else
        throw new Error(r + " is not a PostCSS plugin");
    return t;
  }
  process(e, t = {}) {
    return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax ? new qc(this, e, t) : new eh(this, e, t);
  }
  use(e) {
    return this.plugins = this.plugins.concat(this.normalize([e])), this;
  }
};
var sh = it;
it.default = it;
rh.registerProcessor(it);
th.registerProcessor(it);
let ih = cr, nh = Wn, oh = fr, ah = ks, lh = hr, uh = ct, ch = Ps;
function nt(s, e) {
  if (Array.isArray(s)) return s.map((i) => nt(i));
  let { inputs: t, ...r } = s;
  if (t) {
    e = [];
    for (let i of t) {
      let n = { ...i, __proto__: lh.prototype };
      n.map && (n.map = {
        ...n.map,
        __proto__: nh.prototype
      }), e.push(n);
    }
  }
  if (r.nodes && (r.nodes = s.nodes.map((i) => nt(i, e))), r.source) {
    let { inputId: i, ...n } = r.source;
    r.source = n, i != null && (r.source.input = e[i]);
  }
  if (r.type === "root")
    return new uh(r);
  if (r.type === "decl")
    return new ih(r);
  if (r.type === "rule")
    return new ch(r);
  if (r.type === "comment")
    return new oh(r);
  if (r.type === "atrule")
    return new ah(r);
  throw new Error("Unknown node type: " + s.type);
}
var hh = nt;
nt.default = nt;
let fh = As, yo = cr, ph = go, dh = xe, Ds = sh, mh = lr, gh = hh, wo = $s, yh = oo, So = fr, bo = ks, wh = Ns, Sh = hr, bh = Ts, Ch = ho, Co = Ps, vo = ct, vh = ur;
function M(...s) {
  return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new Ds(s);
}
M.plugin = function(e, t) {
  let r = !1;
  function i(...o) {
    console && console.warn && !r && (r = !0, console.warn(
      e + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
    ), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(
      e + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
    ));
    let l = t(...o);
    return l.postcssPlugin = e, l.postcssVersion = new Ds().version, l;
  }
  let n;
  return Object.defineProperty(i, "postcss", {
    get() {
      return n || (n = i()), n;
    }
  }), i.process = function(o, l, a) {
    return M([i(a)]).process(o, l);
  }, i;
};
M.stringify = mh;
M.parse = bh;
M.fromJSON = gh;
M.list = Ch;
M.comment = (s) => new So(s);
M.atRule = (s) => new bo(s);
M.decl = (s) => new yo(s);
M.rule = (s) => new Co(s);
M.root = (s) => new vo(s);
M.document = (s) => new wo(s);
M.CssSyntaxError = fh;
M.Declaration = yo;
M.Container = dh;
M.Processor = Ds;
M.Document = wo;
M.Comment = So;
M.Warning = yh;
M.AtRule = bo;
M.Result = wh;
M.Input = Sh;
M.Rule = Co;
M.Root = vo;
M.Node = vh;
ph.registerPostcss(M);
var Ih = M;
M.default = M;
const F = /* @__PURE__ */ Tu(Ih);
F.stringify;
F.fromJSON;
F.plugin;
F.parse;
F.list;
F.document;
F.comment;
F.atRule;
F.rule;
F.decl;
F.root;
F.CssSyntaxError;
F.Declaration;
F.Container;
F.Processor;
F.Document;
F.Comment;
F.Warning;
F.AtRule;
F.Result;
F.Input;
F.Rule;
F.Root;
F.Node;
class _s {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  constructor(...e) {
    ee(this, "parentElement", null), ee(this, "parentNode", null), ee(this, "ownerDocument"), ee(this, "firstChild", null), ee(this, "lastChild", null), ee(this, "previousSibling", null), ee(this, "nextSibling", null), ee(this, "ELEMENT_NODE", 1), ee(this, "TEXT_NODE", 3), ee(this, "nodeType"), ee(this, "nodeName"), ee(this, "RRNodeType");
  }
  get childNodes() {
    const e = [];
    let t = this.firstChild;
    for (; t; )
      e.push(t), t = t.nextSibling;
    return e;
  }
  contains(e) {
    if (e instanceof _s) {
      if (e.ownerDocument !== this.ownerDocument) return !1;
      if (e === this) return !0;
    } else return !1;
    for (; e.parentNode; ) {
      if (e.parentNode === this) return !0;
      e = e.parentNode;
    }
    return !1;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  appendChild(e) {
    throw new Error(
      "RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method."
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertBefore(e, t) {
    throw new Error(
      "RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method."
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeChild(e) {
    throw new Error(
      "RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method."
    );
  }
  toString() {
    return "RRNode";
  }
}
const Mi = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
}, $i = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
}, Tt = {}, xh = () => !!globalThis.Zone;
function Ls(s) {
  if (Tt[s])
    return Tt[s];
  const e = globalThis[s], t = e.prototype, r = s in Mi ? Mi[s] : void 0, i = !!(r && // @ts-expect-error 2345
  r.every(
    (l) => {
      var a, u;
      return !!((u = (a = Object.getOwnPropertyDescriptor(t, l)) == null ? void 0 : a.get) != null && u.toString().includes("[native code]"));
    }
  )), n = s in $i ? $i[s] : void 0, o = !!(n && n.every(
    // @ts-expect-error 2345
    (l) => {
      var a;
      return typeof t[l] == "function" && ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"));
    }
  ));
  if (i && o && !xh())
    return Tt[s] = e.prototype, e.prototype;
  try {
    const l = document.createElement("iframe");
    document.body.appendChild(l);
    const a = l.contentWindow;
    if (!a) return e.prototype;
    const u = a[s].prototype;
    return document.body.removeChild(l), u ? Tt[s] = u : t;
  } catch {
    return t;
  }
}
const Er = {};
function ge(s, e, t) {
  var r;
  const i = `${s}.${String(t)}`;
  if (Er[i])
    return Er[i].call(
      e
    );
  const n = Ls(s), o = (r = Object.getOwnPropertyDescriptor(
    n,
    t
  )) == null ? void 0 : r.get;
  return o ? (Er[i] = o, o.call(e)) : e[t];
}
const Mr = {};
function Io(s, e, t) {
  const r = `${s}.${String(t)}`;
  if (Mr[r])
    return Mr[r].bind(
      e
    );
  const n = Ls(s)[t];
  return typeof n != "function" ? e[t] : (Mr[r] = n, n.bind(e));
}
function Rh(s) {
  return ge("Node", s, "childNodes");
}
function Oh(s) {
  return ge("Node", s, "parentNode");
}
function Ah(s) {
  return ge("Node", s, "parentElement");
}
function Eh(s) {
  return ge("Node", s, "textContent");
}
function Mh(s, e) {
  return Io("Node", s, "contains")(e);
}
function $h(s) {
  return Io("Node", s, "getRootNode")();
}
function Nh(s) {
  return !s || !("host" in s) ? null : ge("ShadowRoot", s, "host");
}
function kh(s) {
  return s.styleSheets;
}
function Ph(s) {
  return !s || !("shadowRoot" in s) ? null : ge("Element", s, "shadowRoot");
}
function Th(s, e) {
  return ge("Element", s, "querySelector")(e);
}
function Dh(s, e) {
  return ge("Element", s, "querySelectorAll")(e);
}
function xo() {
  return Ls("MutationObserver").constructor;
}
const v = {
  childNodes: Rh,
  parentNode: Oh,
  parentElement: Ah,
  textContent: Eh,
  contains: Mh,
  getRootNode: $h,
  host: Nh,
  styleSheets: kh,
  shadowRoot: Ph,
  querySelector: Th,
  querySelectorAll: Dh,
  mutationObserver: xo
};
function Z(s, e, t = document) {
  const r = { capture: !0, passive: !0 };
  return t.addEventListener(s, e, r), () => t.removeEventListener(s, e, r);
}
const Oe = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
let Ni = {
  map: {},
  getId() {
    return console.error(Oe), -1;
  },
  getNode() {
    return console.error(Oe), null;
  },
  removeNodeFromMap() {
    console.error(Oe);
  },
  has() {
    return console.error(Oe), !1;
  },
  reset() {
    console.error(Oe);
  }
};
typeof window < "u" && window.Proxy && window.Reflect && (Ni = new Proxy(Ni, {
  get(s, e, t) {
    return e === "map" && console.error(Oe), Reflect.get(s, e, t);
  }
}));
function ot(s, e, t = {}) {
  let r = null, i = 0;
  return function(...n) {
    const o = Date.now();
    !i && t.leading === !1 && (i = o);
    const l = e - (o - i), a = this;
    l <= 0 || l > e ? (r && (clearTimeout(r), r = null), i = o, s.apply(a, n)) : !r && t.trailing !== !1 && (r = setTimeout(() => {
      i = t.leading === !1 ? 0 : Date.now(), r = null, s.apply(a, n);
    }, l));
  };
}
function pr(s, e, t, r, i = window) {
  const n = i.Object.getOwnPropertyDescriptor(s, e);
  return i.Object.defineProperty(
    s,
    e,
    r ? t : {
      set(o) {
        setTimeout(() => {
          t.set.call(this, o);
        }, 0), n && n.set && n.set.call(this, o);
      }
    }
  ), () => pr(s, e, n || {}, !0);
}
function Ue(s, e, t) {
  try {
    if (!(e in s))
      return () => {
      };
    const r = s[e], i = t(r);
    return typeof i == "function" && (i.prototype = i.prototype || {}, Object.defineProperties(i, {
      __rrweb_original__: {
        enumerable: !1,
        value: r
      }
    })), s[e] = i, () => {
      s[e] = r;
    };
  } catch {
    return () => {
    };
  }
}
let er = Date.now;
/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString()) || (er = () => (/* @__PURE__ */ new Date()).getTime());
function Ro(s) {
  var e, t, r, i;
  const n = s.document;
  return {
    left: n.scrollingElement ? n.scrollingElement.scrollLeft : s.pageXOffset !== void 0 ? s.pageXOffset : n.documentElement.scrollLeft || (n == null ? void 0 : n.body) && ((e = v.parentElement(n.body)) == null ? void 0 : e.scrollLeft) || ((t = n == null ? void 0 : n.body) == null ? void 0 : t.scrollLeft) || 0,
    top: n.scrollingElement ? n.scrollingElement.scrollTop : s.pageYOffset !== void 0 ? s.pageYOffset : (n == null ? void 0 : n.documentElement.scrollTop) || (n == null ? void 0 : n.body) && ((r = v.parentElement(n.body)) == null ? void 0 : r.scrollTop) || ((i = n == null ? void 0 : n.body) == null ? void 0 : i.scrollTop) || 0
  };
}
function Oo() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function Ao() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function Eo(s) {
  return s ? s.nodeType === s.ELEMENT_NODE ? s : v.parentElement(s) : null;
}
function J(s, e, t, r) {
  if (!s)
    return !1;
  const i = Eo(s);
  if (!i)
    return !1;
  try {
    if (typeof e == "string") {
      if (i.classList.contains(e) || r && i.closest("." + e) !== null) return !0;
    } else if (jt(i, e, r)) return !0;
  } catch {
  }
  return !!(t && (i.matches(t) || r && i.closest(t) !== null));
}
function _h(s, e) {
  return e.getId(s) !== -1;
}
function $r(s, e, t) {
  return s.tagName === "TITLE" && t.headTitleMutations ? !0 : e.getId(s) === Ke;
}
function Mo(s, e) {
  if (Ye(s))
    return !1;
  const t = e.getId(s);
  if (!e.has(t))
    return !0;
  const r = v.parentNode(s);
  return r && r.nodeType === s.DOCUMENT_NODE ? !1 : r ? Mo(r, e) : !0;
}
function us(s) {
  return !!s.changedTouches;
}
function Lh(s = window) {
  "NodeList" in s && !s.NodeList.prototype.forEach && (s.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in s && !s.DOMTokenList.prototype.forEach && (s.DOMTokenList.prototype.forEach = Array.prototype.forEach);
}
function $o(s, e) {
  return !!(s.nodeName === "IFRAME" && e.getMeta(s));
}
function No(s, e) {
  return !!(s.nodeName === "LINK" && s.nodeType === s.ELEMENT_NODE && s.getAttribute && s.getAttribute("rel") === "stylesheet" && e.getMeta(s));
}
function cs(s) {
  return s ? s instanceof _s && "shadowRoot" in s ? !!s.shadowRoot : !!v.shadowRoot(s) : !1;
}
class Fh {
  constructor() {
    w(this, "id", 1), w(this, "styleIDMap", /* @__PURE__ */ new WeakMap()), w(this, "idStyleMap", /* @__PURE__ */ new Map());
  }
  getId(e) {
    return this.styleIDMap.get(e) ?? -1;
  }
  has(e) {
    return this.styleIDMap.has(e);
  }
  /**
   * @returns If the stylesheet is in the mirror, returns the id of the stylesheet. If not, return the new assigned id.
   */
  add(e, t) {
    if (this.has(e)) return this.getId(e);
    let r;
    return t === void 0 ? r = this.id++ : r = t, this.styleIDMap.set(e, r), this.idStyleMap.set(r, e), r;
  }
  getStyle(e) {
    return this.idStyleMap.get(e) || null;
  }
  reset() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map(), this.id = 1;
  }
  generateId() {
    return this.id++;
  }
}
function ko(s) {
  var e;
  let t = null;
  return "getRootNode" in s && ((e = v.getRootNode(s)) == null ? void 0 : e.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && v.host(v.getRootNode(s)) && (t = v.host(v.getRootNode(s))), t;
}
function Uh(s) {
  let e = s, t;
  for (; t = ko(e); )
    e = t;
  return e;
}
function Bh(s) {
  const e = s.ownerDocument;
  if (!e) return !1;
  const t = Uh(s);
  return v.contains(e, t);
}
function Po(s) {
  const e = s.ownerDocument;
  return e ? v.contains(e, s) || Bh(s) : !1;
}
var R = /* @__PURE__ */ ((s) => (s[s.DomContentLoaded = 0] = "DomContentLoaded", s[s.Load = 1] = "Load", s[s.FullSnapshot = 2] = "FullSnapshot", s[s.IncrementalSnapshot = 3] = "IncrementalSnapshot", s[s.Meta = 4] = "Meta", s[s.Custom = 5] = "Custom", s[s.Plugin = 6] = "Plugin", s))(R || {}), I = /* @__PURE__ */ ((s) => (s[s.Mutation = 0] = "Mutation", s[s.MouseMove = 1] = "MouseMove", s[s.MouseInteraction = 2] = "MouseInteraction", s[s.Scroll = 3] = "Scroll", s[s.ViewportResize = 4] = "ViewportResize", s[s.Input = 5] = "Input", s[s.TouchMove = 6] = "TouchMove", s[s.MediaInteraction = 7] = "MediaInteraction", s[s.StyleSheetRule = 8] = "StyleSheetRule", s[s.CanvasMutation = 9] = "CanvasMutation", s[s.Font = 10] = "Font", s[s.Log = 11] = "Log", s[s.Drag = 12] = "Drag", s[s.StyleDeclaration = 13] = "StyleDeclaration", s[s.Selection = 14] = "Selection", s[s.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", s[s.CustomElement = 16] = "CustomElement", s))(I || {}), K = /* @__PURE__ */ ((s) => (s[s.MouseUp = 0] = "MouseUp", s[s.MouseDown = 1] = "MouseDown", s[s.Click = 2] = "Click", s[s.ContextMenu = 3] = "ContextMenu", s[s.DblClick = 4] = "DblClick", s[s.Focus = 5] = "Focus", s[s.Blur = 6] = "Blur", s[s.TouchStart = 7] = "TouchStart", s[s.TouchMove_Departed = 8] = "TouchMove_Departed", s[s.TouchEnd = 9] = "TouchEnd", s[s.TouchCancel = 10] = "TouchCancel", s))(K || {}), he = /* @__PURE__ */ ((s) => (s[s.Mouse = 0] = "Mouse", s[s.Pen = 1] = "Pen", s[s.Touch = 2] = "Touch", s))(he || {}), Le = /* @__PURE__ */ ((s) => (s[s["2D"] = 0] = "2D", s[s.WebGL = 1] = "WebGL", s[s.WebGL2 = 2] = "WebGL2", s))(Le || {}), Ae = /* @__PURE__ */ ((s) => (s[s.Play = 0] = "Play", s[s.Pause = 1] = "Pause", s[s.Seeked = 2] = "Seeked", s[s.VolumeChange = 3] = "VolumeChange", s[s.RateChange = 4] = "RateChange", s))(Ae || {}), To = /* @__PURE__ */ ((s) => (s[s.Document = 0] = "Document", s[s.DocumentType = 1] = "DocumentType", s[s.Element = 2] = "Element", s[s.Text = 3] = "Text", s[s.CDATA = 4] = "CDATA", s[s.Comment = 5] = "Comment", s))(To || {});
function ki(s) {
  return "__ln" in s;
}
class zh {
  constructor() {
    w(this, "length", 0), w(this, "head", null), w(this, "tail", null);
  }
  get(e) {
    if (e >= this.length)
      throw new Error("Position outside of list range");
    let t = this.head;
    for (let r = 0; r < e; r++)
      t = (t == null ? void 0 : t.next) || null;
    return t;
  }
  addNode(e) {
    const t = {
      value: e,
      previous: null,
      next: null
    };
    if (e.__ln = t, e.previousSibling && ki(e.previousSibling)) {
      const r = e.previousSibling.__ln.next;
      t.next = r, t.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = t, r && (r.previous = t);
    } else if (e.nextSibling && ki(e.nextSibling) && e.nextSibling.__ln.previous) {
      const r = e.nextSibling.__ln.previous;
      t.previous = r, t.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = t, r && (r.next = t);
    } else
      this.head && (this.head.previous = t), t.next = this.head, this.head = t;
    t.next === null && (this.tail = t), this.length++;
  }
  removeNode(e) {
    const t = e.__ln;
    this.head && (t.previous ? (t.previous.next = t.next, t.next ? t.next.previous = t.previous : this.tail = t.previous) : (this.head = t.next, this.head ? this.head.previous = null : this.tail = null), e.__ln && delete e.__ln, this.length--);
  }
}
const Pi = (s, e) => `${s}@${e}`;
class Wh {
  constructor() {
    w(this, "frozen", !1), w(this, "locked", !1), w(this, "texts", []), w(this, "attributes", []), w(this, "attributeMap", /* @__PURE__ */ new WeakMap()), w(this, "removes", []), w(this, "mapRemoves", []), w(this, "movedMap", {}), w(this, "addedSet", /* @__PURE__ */ new Set()), w(this, "movedSet", /* @__PURE__ */ new Set()), w(this, "droppedSet", /* @__PURE__ */ new Set()), w(this, "removesSubTreeCache", /* @__PURE__ */ new Set()), w(this, "mutationCb"), w(this, "blockClass"), w(this, "blockSelector"), w(this, "maskTextClass"), w(this, "maskTextSelector"), w(this, "inlineStylesheet"), w(this, "maskInputOptions"), w(this, "maskTextFn"), w(this, "maskInputFn"), w(this, "keepIframeSrcFn"), w(this, "recordCanvas"), w(this, "inlineImages"), w(this, "slimDOMOptions"), w(this, "dataURLOptions"), w(this, "doc"), w(this, "mirror"), w(this, "iframeManager"), w(this, "stylesheetManager"), w(this, "shadowDomManager"), w(this, "canvasManager"), w(this, "processedNodeManager"), w(this, "unattachedDoc"), w(this, "processMutations", (e) => {
      e.forEach(this.processMutation), this.emit();
    }), w(this, "emit", () => {
      if (this.frozen || this.locked)
        return;
      const e = [], t = /* @__PURE__ */ new Set(), r = new zh(), i = (a) => {
        let u = a, c = Ke;
        for (; c === Ke; )
          u = u && u.nextSibling, c = u && this.mirror.getId(u);
        return c;
      }, n = (a) => {
        const u = v.parentNode(a);
        if (!u || !Po(a))
          return;
        let c = !1;
        if (a.nodeType === Node.TEXT_NODE) {
          const g = u.tagName;
          if (g === "TEXTAREA")
            return;
          g === "STYLE" && this.addedSet.has(u) && (c = !0);
        }
        const h = Ye(u) ? this.mirror.getId(ko(a)) : this.mirror.getId(u), d = i(a);
        if (h === -1 || d === -1)
          return r.addNode(a);
        const m = Me(a, {
          doc: this.doc,
          mirror: this.mirror,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          maskTextClass: this.maskTextClass,
          maskTextSelector: this.maskTextSelector,
          skipChild: !0,
          newlyAddedElement: !0,
          inlineStylesheet: this.inlineStylesheet,
          maskInputOptions: this.maskInputOptions,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          dataURLOptions: this.dataURLOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (g) => {
            $o(g, this.mirror) && this.iframeManager.addIframe(g), No(g, this.mirror) && this.stylesheetManager.trackLinkElement(
              g
            ), cs(a) && this.shadowDomManager.addShadowRoot(v.shadowRoot(a), this.doc);
          },
          onIframeLoad: (g, p) => {
            this.iframeManager.attachIframe(g, p), this.shadowDomManager.observeAttachShadow(g);
          },
          onStylesheetLoad: (g, p) => {
            this.stylesheetManager.attachLinkElement(g, p);
          },
          cssCaptured: c
        });
        m && (e.push({
          parentId: h,
          nextId: d,
          node: m
        }), t.add(m.id));
      };
      for (; this.mapRemoves.length; )
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      for (const a of this.movedSet)
        Ti(this.removesSubTreeCache, a, this.mirror) && !this.movedSet.has(v.parentNode(a)) || n(a);
      for (const a of this.addedSet)
        !Di(this.droppedSet, a) && !Ti(this.removesSubTreeCache, a, this.mirror) || Di(this.movedSet, a) ? n(a) : this.droppedSet.add(a);
      let o = null;
      for (; r.length; ) {
        let a = null;
        if (o) {
          const u = this.mirror.getId(v.parentNode(o.value)), c = i(o.value);
          u !== -1 && c !== -1 && (a = o);
        }
        if (!a) {
          let u = r.tail;
          for (; u; ) {
            const c = u;
            if (u = u.previous, c) {
              const h = this.mirror.getId(v.parentNode(c.value));
              if (i(c.value) === -1) continue;
              if (h !== -1) {
                a = c;
                break;
              } else {
                const m = c.value, g = v.parentNode(m);
                if (g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  const p = v.host(g);
                  if (this.mirror.getId(p) !== -1) {
                    a = c;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!a) {
          for (; r.head; )
            r.removeNode(r.head.value);
          break;
        }
        o = a.previous, r.removeNode(a.value), n(a.value);
      }
      const l = {
        texts: this.texts.map((a) => {
          const u = a.node, c = v.parentNode(u);
          return c && c.tagName === "TEXTAREA" && this.genTextAreaValueMutation(c), {
            id: this.mirror.getId(u),
            value: a.value
          };
        }).filter((a) => !t.has(a.id)).filter((a) => this.mirror.has(a.id)),
        attributes: this.attributes.map((a) => {
          const { attributes: u } = a;
          if (typeof u.style == "string") {
            const c = JSON.stringify(a.styleDiff), h = JSON.stringify(a._unchangedStyles);
            c.length < u.style.length && (c + h).split("var(").length === u.style.split("var(").length && (u.style = a.styleDiff);
          }
          return {
            id: this.mirror.getId(a.node),
            attributes: u
          };
        }).filter((a) => !t.has(a.id)).filter((a) => this.mirror.has(a.id)),
        removes: this.removes,
        adds: e
      };
      !l.texts.length && !l.attributes.length && !l.removes.length && !l.adds.length || (this.texts = [], this.attributes = [], this.attributeMap = /* @__PURE__ */ new WeakMap(), this.removes = [], this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.removesSubTreeCache = /* @__PURE__ */ new Set(), this.movedMap = {}, this.mutationCb(l));
    }), w(this, "genTextAreaValueMutation", (e) => {
      let t = this.attributeMap.get(e);
      t || (t = {
        node: e,
        attributes: {},
        styleDiff: {},
        _unchangedStyles: {}
      }, this.attributes.push(t), this.attributeMap.set(e, t)), t.attributes.value = Array.from(
        v.childNodes(e),
        (r) => v.textContent(r) || ""
      ).join("");
    }), w(this, "processMutation", (e) => {
      if (!$r(e.target, this.mirror, this.slimDOMOptions))
        switch (e.type) {
          case "characterData": {
            const t = v.textContent(e.target);
            !J(e.target, this.blockClass, this.blockSelector, !1) && t !== e.oldValue && this.texts.push({
              value: en(
                e.target,
                this.maskTextClass,
                this.maskTextSelector,
                !0
                // checkAncestors
              ) && t ? this.maskTextFn ? this.maskTextFn(t, Eo(e.target)) : t.replace(/[\S]/g, "*") : t,
              node: e.target
            });
            break;
          }
          case "attributes": {
            const t = e.target;
            let r = e.attributeName, i = e.target.getAttribute(r);
            if (r === "value") {
              const o = ds(t);
              i = ps({
                element: t,
                maskInputOptions: this.maskInputOptions,
                tagName: t.tagName,
                type: o,
                value: i,
                maskInputFn: this.maskInputFn
              });
            }
            if (J(e.target, this.blockClass, this.blockSelector, !1) || i === e.oldValue)
              return;
            let n = this.attributeMap.get(e.target);
            if (t.tagName === "IFRAME" && r === "src" && !this.keepIframeSrcFn(i))
              if (!t.contentDocument)
                r = "rr_src";
              else
                return;
            if (n || (n = {
              node: e.target,
              attributes: {},
              styleDiff: {},
              _unchangedStyles: {}
            }, this.attributes.push(n), this.attributeMap.set(e.target, n)), r === "type" && t.tagName === "INPUT" && (e.oldValue || "").toLowerCase() === "password" && t.setAttribute("data-rr-is-password", "true"), !qi(t.tagName, r))
              if (n.attributes[r] = Qi(
                this.doc,
                ve(t.tagName),
                ve(r),
                i
              ), r === "style") {
                if (!this.unattachedDoc)
                  try {
                    this.unattachedDoc = document.implementation.createHTMLDocument();
                  } catch {
                    this.unattachedDoc = this.doc;
                  }
                const o = this.unattachedDoc.createElement("span");
                e.oldValue && o.setAttribute("style", e.oldValue);
                for (const l of Array.from(t.style)) {
                  const a = t.style.getPropertyValue(l), u = t.style.getPropertyPriority(l);
                  a !== o.style.getPropertyValue(l) || u !== o.style.getPropertyPriority(l) ? u === "" ? n.styleDiff[l] = a : n.styleDiff[l] = [a, u] : n._unchangedStyles[l] = [a, u];
                }
                for (const l of Array.from(o.style))
                  t.style.getPropertyValue(l) === "" && (n.styleDiff[l] = !1);
              } else r === "open" && t.tagName === "DIALOG" && (t.matches("dialog:modal") ? n.attributes.rr_open_mode = "modal" : n.attributes.rr_open_mode = "non-modal");
            break;
          }
          case "childList": {
            if (J(e.target, this.blockClass, this.blockSelector, !0))
              return;
            if (e.target.tagName === "TEXTAREA") {
              this.genTextAreaValueMutation(e.target);
              return;
            }
            e.addedNodes.forEach((t) => this.genAdds(t, e.target)), e.removedNodes.forEach((t) => {
              const r = this.mirror.getId(t), i = Ye(e.target) ? this.mirror.getId(v.host(e.target)) : this.mirror.getId(e.target);
              J(e.target, this.blockClass, this.blockSelector, !1) || $r(t, this.mirror, this.slimDOMOptions) || !_h(t, this.mirror) || (this.addedSet.has(t) ? (hs(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && r === -1 || Mo(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[Pi(r, i)] ? hs(this.movedSet, t) : (this.removes.push({
                parentId: i,
                id: r,
                isShadow: Ye(e.target) && Ze(e.target) ? !0 : void 0
              }), Vh(t, this.removesSubTreeCache))), this.mapRemoves.push(t));
            });
            break;
          }
        }
    }), w(this, "genAdds", (e, t) => {
      if (!this.processedNodeManager.inOtherBuffer(e, this) && !(this.addedSet.has(e) || this.movedSet.has(e))) {
        if (this.mirror.hasNode(e)) {
          if ($r(e, this.mirror, this.slimDOMOptions))
            return;
          this.movedSet.add(e);
          let r = null;
          t && this.mirror.hasNode(t) && (r = this.mirror.getId(t)), r && r !== -1 && (this.movedMap[Pi(this.mirror.getId(e), r)] = !0);
        } else
          this.addedSet.add(e), this.droppedSet.delete(e);
        J(e, this.blockClass, this.blockSelector, !1) || (v.childNodes(e).forEach((r) => this.genAdds(r)), cs(e) && v.childNodes(v.shadowRoot(e)).forEach((r) => {
          this.processedNodeManager.add(r, this), this.genAdds(r, e);
        }));
      }
    });
  }
  init(e) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "maskTextClass",
      "maskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager"
    ].forEach((t) => {
      this[t] = e[t];
    });
  }
  freeze() {
    this.frozen = !0, this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = !1, this.canvasManager.unfreeze(), this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = !0, this.canvasManager.lock();
  }
  unlock() {
    this.locked = !1, this.canvasManager.unlock(), this.emit();
  }
  reset() {
    this.shadowDomManager.reset(), this.canvasManager.reset();
  }
}
function hs(s, e) {
  s.delete(e), v.childNodes(e).forEach((t) => hs(s, t));
}
function Vh(s, e) {
  const t = [s];
  for (; t.length; ) {
    const r = t.pop();
    e.has(r) || (e.add(r), v.childNodes(r).forEach((i) => t.push(i)));
  }
}
function Ti(s, e, t) {
  return s.size === 0 ? !1 : Gh(s, e);
}
function Gh(s, e, t) {
  const r = v.parentNode(e);
  return r ? s.has(r) : !1;
}
function Di(s, e) {
  return s.size === 0 ? !1 : Do(s, e);
}
function Do(s, e) {
  const t = v.parentNode(e);
  return t ? s.has(t) ? !0 : Do(s, t) : !1;
}
let Je;
function jh(s) {
  Je = s;
}
function Hh() {
  Je = void 0;
}
const x = (s) => Je ? (...t) => {
  try {
    return s(...t);
  } catch (r) {
    if (Je && Je(r) === !0)
      return;
    throw r;
  }
} : s, Ce = [];
function ht(s) {
  try {
    if ("composedPath" in s) {
      const e = s.composedPath();
      if (e.length)
        return e[0];
    } else if ("path" in s && s.path.length)
      return s.path[0];
  } catch {
  }
  return s && s.target;
}
function _o(s, e) {
  const t = new Wh();
  Ce.push(t), t.init(s);
  const r = new (xo())(
    x(t.processMutations.bind(t))
  );
  return r.observe(e, {
    attributes: !0,
    attributeOldValue: !0,
    characterData: !0,
    characterDataOldValue: !0,
    childList: !0,
    subtree: !0
  }), r;
}
function Yh({
  mousemoveCb: s,
  sampling: e,
  doc: t,
  mirror: r
}) {
  if (e.mousemove === !1)
    return () => {
    };
  const i = typeof e.mousemove == "number" ? e.mousemove : 50, n = typeof e.mousemoveCallback == "number" ? e.mousemoveCallback : 500;
  let o = [], l;
  const a = ot(
    x(
      (h) => {
        const d = Date.now() - l;
        s(
          o.map((m) => (m.timeOffset -= d, m)),
          h
        ), o = [], l = null;
      }
    ),
    n
  ), u = x(
    ot(
      x((h) => {
        const d = ht(h), { clientX: m, clientY: g } = us(h) ? h.changedTouches[0] : h;
        l || (l = er()), o.push({
          x: m,
          y: g,
          id: r.getId(d),
          timeOffset: er() - l
        }), a(
          typeof DragEvent < "u" && h instanceof DragEvent ? I.Drag : h instanceof MouseEvent ? I.MouseMove : I.TouchMove
        );
      }),
      i,
      {
        trailing: !1
      }
    )
  ), c = [
    Z("mousemove", u, t),
    Z("touchmove", u, t),
    Z("drag", u, t)
  ];
  return x(() => {
    c.forEach((h) => h());
  });
}
function Zh({
  mouseInteractionCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  sampling: n
}) {
  if (n.mouseInteraction === !1)
    return () => {
    };
  const o = n.mouseInteraction === !0 || n.mouseInteraction === void 0 ? {} : n.mouseInteraction, l = [];
  let a = null;
  const u = (c) => (h) => {
    const d = ht(h);
    if (J(d, r, i, !0))
      return;
    let m = null, g = c;
    if ("pointerType" in h) {
      switch (h.pointerType) {
        case "mouse":
          m = he.Mouse;
          break;
        case "touch":
          m = he.Touch;
          break;
        case "pen":
          m = he.Pen;
          break;
      }
      m === he.Touch ? K[c] === K.MouseDown ? g = "TouchStart" : K[c] === K.MouseUp && (g = "TouchEnd") : he.Pen;
    } else us(h) && (m = he.Touch);
    m !== null ? (a = m, (g.startsWith("Touch") && m === he.Touch || g.startsWith("Mouse") && m === he.Mouse) && (m = null)) : K[c] === K.Click && (m = a, a = null);
    const p = us(h) ? h.changedTouches[0] : h;
    if (!p)
      return;
    const f = t.getId(d), { clientX: S, clientY: b } = p;
    x(s)({
      type: K[g],
      id: f,
      x: S,
      y: b,
      ...m !== null && { pointerType: m }
    });
  };
  return Object.keys(K).filter(
    (c) => Number.isNaN(Number(c)) && !c.endsWith("_Departed") && o[c] !== !1
  ).forEach((c) => {
    let h = ve(c);
    const d = u(c);
    if (window.PointerEvent)
      switch (K[c]) {
        case K.MouseDown:
        case K.MouseUp:
          h = h.replace(
            "mouse",
            "pointer"
          );
          break;
        case K.TouchStart:
        case K.TouchEnd:
          return;
      }
    l.push(Z(h, d, e));
  }), x(() => {
    l.forEach((c) => c());
  });
}
function Lo({
  scrollCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  sampling: n
}) {
  const o = x(
    ot(
      x((l) => {
        const a = ht(l);
        if (!a || J(a, r, i, !0))
          return;
        const u = t.getId(a);
        if (a === e && e.defaultView) {
          const c = Ro(e.defaultView);
          s({
            id: u,
            x: c.left,
            y: c.top
          });
        } else
          s({
            id: u,
            x: a.scrollLeft,
            y: a.scrollTop
          });
      }),
      n.scroll || 100
    )
  );
  return Z("scroll", o, e);
}
function Jh({ viewportResizeCb: s }, { win: e }) {
  let t = -1, r = -1;
  const i = x(
    ot(
      x(() => {
        const n = Oo(), o = Ao();
        (t !== n || r !== o) && (s({
          width: Number(o),
          height: Number(n)
        }), t = n, r = o);
      }),
      200
    )
  );
  return Z("resize", i, e);
}
const Xh = ["INPUT", "TEXTAREA", "SELECT"], _i = /* @__PURE__ */ new WeakMap();
function Kh({
  inputCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  ignoreClass: n,
  ignoreSelector: o,
  maskInputOptions: l,
  maskInputFn: a,
  sampling: u,
  userTriggeredOnInput: c
}) {
  function h(b) {
    let y = ht(b);
    const C = b.isTrusted, $ = y && y.tagName;
    if (y && $ === "OPTION" && (y = v.parentElement(y)), !y || !$ || Xh.indexOf($) < 0 || J(y, r, i, !0) || y.classList.contains(n) || o && y.matches(o))
      return;
    let P = y.value, j = !1;
    const _ = ds(y) || "";
    _ === "radio" || _ === "checkbox" ? j = y.checked : (l[$.toLowerCase()] || l[_]) && (P = ps({
      element: y,
      maskInputOptions: l,
      tagName: $,
      type: _,
      value: P,
      maskInputFn: a
    })), d(
      y,
      c ? { text: P, isChecked: j, userTriggered: C } : { text: P, isChecked: j }
    );
    const W = y.name;
    _ === "radio" && W && j && e.querySelectorAll(`input[type="radio"][name="${W}"]`).forEach((H) => {
      if (H !== y) {
        const Q = H.value;
        d(
          H,
          c ? { text: Q, isChecked: !j, userTriggered: !1 } : { text: Q, isChecked: !j }
        );
      }
    });
  }
  function d(b, y) {
    const C = _i.get(b);
    if (!C || C.text !== y.text || C.isChecked !== y.isChecked) {
      _i.set(b, y);
      const $ = t.getId(b);
      x(s)({
        ...y,
        id: $
      });
    }
  }
  const g = (u.input === "last" ? ["change"] : ["input", "change"]).map(
    (b) => Z(b, x(h), e)
  ), p = e.defaultView;
  if (!p)
    return () => {
      g.forEach((b) => b());
    };
  const f = p.Object.getOwnPropertyDescriptor(
    p.HTMLInputElement.prototype,
    "value"
  ), S = [
    [p.HTMLInputElement.prototype, "value"],
    [p.HTMLInputElement.prototype, "checked"],
    [p.HTMLSelectElement.prototype, "value"],
    [p.HTMLTextAreaElement.prototype, "value"],
    // Some UI library use selectedIndex to set select value
    [p.HTMLSelectElement.prototype, "selectedIndex"],
    [p.HTMLOptionElement.prototype, "selected"]
  ];
  return f && f.set && g.push(
    ...S.map(
      (b) => pr(
        b[0],
        b[1],
        {
          set() {
            x(h)({
              target: this,
              isTrusted: !1
              // userTriggered to false as this could well be programmatic
            });
          }
        },
        !1,
        p
      )
    )
  ), x(() => {
    g.forEach((b) => b());
  });
}
function tr(s) {
  const e = [];
  function t(r, i) {
    if (Dt("CSSGroupingRule") && r.parentRule instanceof CSSGroupingRule || Dt("CSSMediaRule") && r.parentRule instanceof CSSMediaRule || Dt("CSSSupportsRule") && r.parentRule instanceof CSSSupportsRule || Dt("CSSConditionRule") && r.parentRule instanceof CSSConditionRule) {
      const o = Array.from(
        r.parentRule.cssRules
      ).indexOf(r);
      i.unshift(o);
    } else if (r.parentStyleSheet) {
      const o = Array.from(r.parentStyleSheet.cssRules).indexOf(r);
      i.unshift(o);
    }
    return i;
  }
  return t(s, e);
}
function de(s, e, t) {
  let r, i;
  return s ? (s.ownerNode ? r = e.getId(s.ownerNode) : i = t.getId(s), {
    styleId: i,
    id: r
  }) : {};
}
function Qh({ styleSheetRuleCb: s, mirror: e, stylesheetManager: t }, { win: r }) {
  if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype)
    return () => {
    };
  const i = r.CSSStyleSheet.prototype.insertRule;
  r.CSSStyleSheet.prototype.insertRule = new Proxy(i, {
    apply: x(
      (c, h, d) => {
        const [m, g] = d, { id: p, styleId: f } = de(
          h,
          e,
          t.styleMirror
        );
        return (p && p !== -1 || f && f !== -1) && s({
          id: p,
          styleId: f,
          adds: [{ rule: m, index: g }]
        }), c.apply(h, d);
      }
    )
  }), r.CSSStyleSheet.prototype.addRule = function(c, h, d = this.cssRules.length) {
    const m = `${c} { ${h} }`;
    return r.CSSStyleSheet.prototype.insertRule.apply(this, [m, d]);
  };
  const n = r.CSSStyleSheet.prototype.deleteRule;
  r.CSSStyleSheet.prototype.deleteRule = new Proxy(n, {
    apply: x(
      (c, h, d) => {
        const [m] = d, { id: g, styleId: p } = de(
          h,
          e,
          t.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          removes: [{ index: m }]
        }), c.apply(h, d);
      }
    )
  }), r.CSSStyleSheet.prototype.removeRule = function(c) {
    return r.CSSStyleSheet.prototype.deleteRule.apply(this, [c]);
  };
  let o;
  r.CSSStyleSheet.prototype.replace && (o = r.CSSStyleSheet.prototype.replace, r.CSSStyleSheet.prototype.replace = new Proxy(o, {
    apply: x(
      (c, h, d) => {
        const [m] = d, { id: g, styleId: p } = de(
          h,
          e,
          t.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          replace: m
        }), c.apply(h, d);
      }
    )
  }));
  let l;
  r.CSSStyleSheet.prototype.replaceSync && (l = r.CSSStyleSheet.prototype.replaceSync, r.CSSStyleSheet.prototype.replaceSync = new Proxy(l, {
    apply: x(
      (c, h, d) => {
        const [m] = d, { id: g, styleId: p } = de(
          h,
          e,
          t.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          replaceSync: m
        }), c.apply(h, d);
      }
    )
  }));
  const a = {};
  _t("CSSGroupingRule") ? a.CSSGroupingRule = r.CSSGroupingRule : (_t("CSSMediaRule") && (a.CSSMediaRule = r.CSSMediaRule), _t("CSSConditionRule") && (a.CSSConditionRule = r.CSSConditionRule), _t("CSSSupportsRule") && (a.CSSSupportsRule = r.CSSSupportsRule));
  const u = {};
  return Object.entries(a).forEach(([c, h]) => {
    u[c] = {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      insertRule: h.prototype.insertRule,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deleteRule: h.prototype.deleteRule
    }, h.prototype.insertRule = new Proxy(
      u[c].insertRule,
      {
        apply: x(
          (d, m, g) => {
            const [p, f] = g, { id: S, styleId: b } = de(
              m.parentStyleSheet,
              e,
              t.styleMirror
            );
            return (S && S !== -1 || b && b !== -1) && s({
              id: S,
              styleId: b,
              adds: [
                {
                  rule: p,
                  index: [
                    ...tr(m),
                    f || 0
                    // defaults to 0
                  ]
                }
              ]
            }), d.apply(m, g);
          }
        )
      }
    ), h.prototype.deleteRule = new Proxy(
      u[c].deleteRule,
      {
        apply: x(
          (d, m, g) => {
            const [p] = g, { id: f, styleId: S } = de(
              m.parentStyleSheet,
              e,
              t.styleMirror
            );
            return (f && f !== -1 || S && S !== -1) && s({
              id: f,
              styleId: S,
              removes: [
                { index: [...tr(m), p] }
              ]
            }), d.apply(m, g);
          }
        )
      }
    );
  }), x(() => {
    r.CSSStyleSheet.prototype.insertRule = i, r.CSSStyleSheet.prototype.deleteRule = n, o && (r.CSSStyleSheet.prototype.replace = o), l && (r.CSSStyleSheet.prototype.replaceSync = l), Object.entries(a).forEach(([c, h]) => {
      h.prototype.insertRule = u[c].insertRule, h.prototype.deleteRule = u[c].deleteRule;
    });
  });
}
function Fo({
  mirror: s,
  stylesheetManager: e
}, t) {
  var r, i, n;
  let o = null;
  t.nodeName === "#document" ? o = s.getId(t) : o = s.getId(v.host(t));
  const l = t.nodeName === "#document" ? (r = t.defaultView) == null ? void 0 : r.Document : (n = (i = t.ownerDocument) == null ? void 0 : i.defaultView) == null ? void 0 : n.ShadowRoot, a = l != null && l.prototype ? Object.getOwnPropertyDescriptor(
    l == null ? void 0 : l.prototype,
    "adoptedStyleSheets"
  ) : void 0;
  return o === null || o === -1 || !l || !a ? () => {
  } : (Object.defineProperty(t, "adoptedStyleSheets", {
    configurable: a.configurable,
    enumerable: a.enumerable,
    get() {
      var u;
      return (u = a.get) == null ? void 0 : u.call(this);
    },
    set(u) {
      var c;
      const h = (c = a.set) == null ? void 0 : c.call(this, u);
      if (o !== null && o !== -1)
        try {
          e.adoptStyleSheets(u, o);
        } catch {
        }
      return h;
    }
  }), x(() => {
    Object.defineProperty(t, "adoptedStyleSheets", {
      configurable: a.configurable,
      enumerable: a.enumerable,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      get: a.get,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      set: a.set
    });
  }));
}
function qh({
  styleDeclarationCb: s,
  mirror: e,
  ignoreCSSAttributes: t,
  stylesheetManager: r
}, { win: i }) {
  const n = i.CSSStyleDeclaration.prototype.setProperty;
  i.CSSStyleDeclaration.prototype.setProperty = new Proxy(n, {
    apply: x(
      (l, a, u) => {
        var c;
        const [h, d, m] = u;
        if (t.has(h))
          return n.apply(a, [h, d, m]);
        const { id: g, styleId: p } = de(
          (c = a.parentRule) == null ? void 0 : c.parentStyleSheet,
          e,
          r.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          set: {
            property: h,
            value: d,
            priority: m
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: tr(a.parentRule)
        }), l.apply(a, u);
      }
    )
  });
  const o = i.CSSStyleDeclaration.prototype.removeProperty;
  return i.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o, {
    apply: x(
      (l, a, u) => {
        var c;
        const [h] = u;
        if (t.has(h))
          return o.apply(a, [h]);
        const { id: d, styleId: m } = de(
          (c = a.parentRule) == null ? void 0 : c.parentStyleSheet,
          e,
          r.styleMirror
        );
        return (d && d !== -1 || m && m !== -1) && s({
          id: d,
          styleId: m,
          remove: {
            property: h
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: tr(a.parentRule)
        }), l.apply(a, u);
      }
    )
  }), x(() => {
    i.CSSStyleDeclaration.prototype.setProperty = n, i.CSSStyleDeclaration.prototype.removeProperty = o;
  });
}
function ef({
  mediaInteractionCb: s,
  blockClass: e,
  blockSelector: t,
  mirror: r,
  sampling: i,
  doc: n
}) {
  const o = x(
    (a) => ot(
      x((u) => {
        const c = ht(u);
        if (!c || J(c, e, t, !0))
          return;
        const { currentTime: h, volume: d, muted: m, playbackRate: g, loop: p } = c;
        s({
          type: a,
          id: r.getId(c),
          currentTime: h,
          volume: d,
          muted: m,
          playbackRate: g,
          loop: p
        });
      }),
      i.media || 500
    )
  ), l = [
    Z("play", o(Ae.Play), n),
    Z("pause", o(Ae.Pause), n),
    Z("seeked", o(Ae.Seeked), n),
    Z("volumechange", o(Ae.VolumeChange), n),
    Z("ratechange", o(Ae.RateChange), n)
  ];
  return x(() => {
    l.forEach((a) => a());
  });
}
function tf({ fontCb: s, doc: e }) {
  const t = e.defaultView;
  if (!t)
    return () => {
    };
  const r = [], i = /* @__PURE__ */ new WeakMap(), n = t.FontFace;
  t.FontFace = function(a, u, c) {
    const h = new n(a, u, c);
    return i.set(h, {
      family: a,
      buffer: typeof u != "string",
      descriptors: c,
      fontSource: typeof u == "string" ? u : JSON.stringify(Array.from(new Uint8Array(u)))
    }), h;
  };
  const o = Ue(
    e.fonts,
    "add",
    function(l) {
      return function(a) {
        return setTimeout(
          x(() => {
            const u = i.get(a);
            u && (s(u), i.delete(a));
          }),
          0
        ), l.apply(this, [a]);
      };
    }
  );
  return r.push(() => {
    t.FontFace = n;
  }), r.push(o), x(() => {
    r.forEach((l) => l());
  });
}
function rf(s) {
  const { doc: e, mirror: t, blockClass: r, blockSelector: i, selectionCb: n } = s;
  let o = !0;
  const l = x(() => {
    const a = e.getSelection();
    if (!a || o && (a != null && a.isCollapsed)) return;
    o = a.isCollapsed || !1;
    const u = [], c = a.rangeCount || 0;
    for (let h = 0; h < c; h++) {
      const d = a.getRangeAt(h), { startContainer: m, startOffset: g, endContainer: p, endOffset: f } = d;
      J(m, r, i, !0) || J(p, r, i, !0) || u.push({
        start: t.getId(m),
        startOffset: g,
        end: t.getId(p),
        endOffset: f
      });
    }
    n({ ranges: u });
  });
  return l(), Z("selectionchange", l);
}
function sf({
  doc: s,
  customElementCb: e
}) {
  const t = s.defaultView;
  return !t || !t.customElements ? () => {
  } : Ue(
    t.customElements,
    "define",
    function(i) {
      return function(n, o, l) {
        try {
          e({
            define: {
              name: n
            }
          });
        } catch {
          console.warn(`Custom element callback failed for ${n}`);
        }
        return i.apply(this, [n, o, l]);
      };
    }
  );
}
function nf(s, e) {
  const {
    mutationCb: t,
    mousemoveCb: r,
    mouseInteractionCb: i,
    scrollCb: n,
    viewportResizeCb: o,
    inputCb: l,
    mediaInteractionCb: a,
    styleSheetRuleCb: u,
    styleDeclarationCb: c,
    canvasMutationCb: h,
    fontCb: d,
    selectionCb: m,
    customElementCb: g
  } = s;
  s.mutationCb = (...p) => {
    e.mutation && e.mutation(...p), t(...p);
  }, s.mousemoveCb = (...p) => {
    e.mousemove && e.mousemove(...p), r(...p);
  }, s.mouseInteractionCb = (...p) => {
    e.mouseInteraction && e.mouseInteraction(...p), i(...p);
  }, s.scrollCb = (...p) => {
    e.scroll && e.scroll(...p), n(...p);
  }, s.viewportResizeCb = (...p) => {
    e.viewportResize && e.viewportResize(...p), o(...p);
  }, s.inputCb = (...p) => {
    e.input && e.input(...p), l(...p);
  }, s.mediaInteractionCb = (...p) => {
    e.mediaInteaction && e.mediaInteaction(...p), a(...p);
  }, s.styleSheetRuleCb = (...p) => {
    e.styleSheetRule && e.styleSheetRule(...p), u(...p);
  }, s.styleDeclarationCb = (...p) => {
    e.styleDeclaration && e.styleDeclaration(...p), c(...p);
  }, s.canvasMutationCb = (...p) => {
    e.canvasMutation && e.canvasMutation(...p), h(...p);
  }, s.fontCb = (...p) => {
    e.font && e.font(...p), d(...p);
  }, s.selectionCb = (...p) => {
    e.selection && e.selection(...p), m(...p);
  }, s.customElementCb = (...p) => {
    e.customElement && e.customElement(...p), g(...p);
  };
}
function of(s, e = {}) {
  const t = s.doc.defaultView;
  if (!t)
    return () => {
    };
  nf(s, e);
  let r;
  s.recordDOM && (r = _o(s, s.doc));
  const i = Yh(s), n = Zh(s), o = Lo(s), l = Jh(s, {
    win: t
  }), a = Kh(s), u = ef(s);
  let c = () => {
  }, h = () => {
  }, d = () => {
  }, m = () => {
  };
  s.recordDOM && (c = Qh(s, { win: t }), h = Fo(s, s.doc), d = qh(s, {
    win: t
  }), s.collectFonts && (m = tf(s)));
  const g = rf(s), p = sf(s), f = [];
  for (const S of s.plugins)
    f.push(
      S.observer(S.callback, t, S.options)
    );
  return x(() => {
    Ce.forEach((S) => S.reset()), r == null || r.disconnect(), i(), n(), o(), l(), a(), u(), c(), h(), d(), m(), g(), p(), f.forEach((S) => S());
  });
}
function Dt(s) {
  return typeof window[s] < "u";
}
function _t(s) {
  return !!(typeof window[s] < "u" && // Note: Generally, this check _shouldn't_ be necessary
  // However, in some scenarios (e.g. jsdom) this can sometimes fail, so we check for it here
  window[s].prototype && "insertRule" in window[s].prototype && "deleteRule" in window[s].prototype);
}
class Li {
  constructor(e) {
    w(this, "iframeIdToRemoteIdMap", /* @__PURE__ */ new WeakMap()), w(this, "iframeRemoteIdToIdMap", /* @__PURE__ */ new WeakMap()), this.generateIdFn = e;
  }
  getId(e, t, r, i) {
    const n = r || this.getIdToRemoteIdMap(e), o = i || this.getRemoteIdToIdMap(e);
    let l = n.get(t);
    return l || (l = this.generateIdFn(), n.set(t, l), o.set(l, t)), l;
  }
  getIds(e, t) {
    const r = this.getIdToRemoteIdMap(e), i = this.getRemoteIdToIdMap(e);
    return t.map(
      (n) => this.getId(e, n, r, i)
    );
  }
  getRemoteId(e, t, r) {
    const i = r || this.getRemoteIdToIdMap(e);
    if (typeof t != "number") return t;
    const n = i.get(t);
    return n || -1;
  }
  getRemoteIds(e, t) {
    const r = this.getRemoteIdToIdMap(e);
    return t.map((i) => this.getRemoteId(e, i, r));
  }
  reset(e) {
    if (!e) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e);
  }
  getIdToRemoteIdMap(e) {
    let t = this.iframeIdToRemoteIdMap.get(e);
    return t || (t = /* @__PURE__ */ new Map(), this.iframeIdToRemoteIdMap.set(e, t)), t;
  }
  getRemoteIdToIdMap(e) {
    let t = this.iframeRemoteIdToIdMap.get(e);
    return t || (t = /* @__PURE__ */ new Map(), this.iframeRemoteIdToIdMap.set(e, t)), t;
  }
}
class af {
  constructor(e) {
    w(this, "iframes", /* @__PURE__ */ new WeakMap()), w(this, "crossOriginIframeMap", /* @__PURE__ */ new WeakMap()), w(this, "crossOriginIframeMirror", new Li(Ki)), w(this, "crossOriginIframeStyleMirror"), w(this, "crossOriginIframeRootIdMap", /* @__PURE__ */ new WeakMap()), w(this, "mirror"), w(this, "mutationCb"), w(this, "wrappedEmit"), w(this, "loadListener"), w(this, "stylesheetManager"), w(this, "recordCrossOriginIframes"), this.mutationCb = e.mutationCb, this.wrappedEmit = e.wrappedEmit, this.stylesheetManager = e.stylesheetManager, this.recordCrossOriginIframes = e.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new Li(
      this.stylesheetManager.styleMirror.generateId.bind(
        this.stylesheetManager.styleMirror
      )
    ), this.mirror = e.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
  }
  addIframe(e) {
    this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);
  }
  addLoadListener(e) {
    this.loadListener = e;
  }
  attachIframe(e, t) {
    var r, i;
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(e),
          nextId: null,
          node: t
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: !0
    }), this.recordCrossOriginIframes && ((r = e.contentWindow) == null || r.addEventListener(
      "message",
      this.handleMessage.bind(this)
    )), (i = this.loadListener) == null || i.call(this, e), e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(
      e.contentDocument.adoptedStyleSheets,
      this.mirror.getId(e.contentDocument)
    );
  }
  handleMessage(e) {
    const t = e;
    if (t.data.type !== "rrweb" || // To filter out the rrweb messages which are forwarded by some sites.
    t.origin !== t.data.origin || !e.source) return;
    const i = this.crossOriginIframeMap.get(e.source);
    if (!i) return;
    const n = this.transformCrossOriginEvent(
      i,
      t.data.event
    );
    n && this.wrappedEmit(
      n,
      t.data.isCheckout
    );
  }
  transformCrossOriginEvent(e, t) {
    var r;
    switch (t.type) {
      case R.FullSnapshot: {
        this.crossOriginIframeMirror.reset(e), this.crossOriginIframeStyleMirror.reset(e), this.replaceIdOnNode(t.data.node, e);
        const i = t.data.node.id;
        return this.crossOriginIframeRootIdMap.set(e, i), this.patchRootIdOnNode(t.data.node, i), {
          timestamp: t.timestamp,
          type: R.IncrementalSnapshot,
          data: {
            source: I.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(e),
                nextId: null,
                node: t.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
          }
        };
      }
      case R.Meta:
      case R.Load:
      case R.DomContentLoaded:
        return !1;
      case R.Plugin:
        return t;
      case R.Custom:
        return this.replaceIds(
          t.data.payload,
          e,
          ["id", "parentId", "previousId", "nextId"]
        ), t;
      case R.IncrementalSnapshot:
        switch (t.data.source) {
          case I.Mutation:
            return t.data.adds.forEach((i) => {
              this.replaceIds(i, e, [
                "parentId",
                "nextId",
                "previousId"
              ]), this.replaceIdOnNode(i.node, e);
              const n = this.crossOriginIframeRootIdMap.get(e);
              n && this.patchRootIdOnNode(i.node, n);
            }), t.data.removes.forEach((i) => {
              this.replaceIds(i, e, ["parentId", "id"]);
            }), t.data.attributes.forEach((i) => {
              this.replaceIds(i, e, ["id"]);
            }), t.data.texts.forEach((i) => {
              this.replaceIds(i, e, ["id"]);
            }), t;
          case I.Drag:
          case I.TouchMove:
          case I.MouseMove:
            return t.data.positions.forEach((i) => {
              this.replaceIds(i, e, ["id"]);
            }), t;
          case I.ViewportResize:
            return !1;
          case I.MediaInteraction:
          case I.MouseInteraction:
          case I.Scroll:
          case I.CanvasMutation:
          case I.Input:
            return this.replaceIds(t.data, e, ["id"]), t;
          case I.StyleSheetRule:
          case I.StyleDeclaration:
            return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
          case I.Font:
            return t;
          case I.Selection:
            return t.data.ranges.forEach((i) => {
              this.replaceIds(i, e, ["start", "end"]);
            }), t;
          case I.AdoptedStyleSheet:
            return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), (r = t.data.styles) == null || r.forEach((i) => {
              this.replaceStyleIds(i, e, ["styleId"]);
            }), t;
        }
    }
    return !1;
  }
  replace(e, t, r, i) {
    for (const n of i)
      !Array.isArray(t[n]) && typeof t[n] != "number" || (Array.isArray(t[n]) ? t[n] = e.getIds(
        r,
        t[n]
      ) : t[n] = e.getId(r, t[n]));
    return t;
  }
  replaceIds(e, t, r) {
    return this.replace(this.crossOriginIframeMirror, e, t, r);
  }
  replaceStyleIds(e, t, r) {
    return this.replace(this.crossOriginIframeStyleMirror, e, t, r);
  }
  replaceIdOnNode(e, t) {
    this.replaceIds(e, t, ["id", "rootId"]), "childNodes" in e && e.childNodes.forEach((r) => {
      this.replaceIdOnNode(r, t);
    });
  }
  patchRootIdOnNode(e, t) {
    e.type !== To.Document && !e.rootId && (e.rootId = t), "childNodes" in e && e.childNodes.forEach((r) => {
      this.patchRootIdOnNode(r, t);
    });
  }
}
class lf {
  constructor(e) {
    w(this, "shadowDoms", /* @__PURE__ */ new WeakSet()), w(this, "mutationCb"), w(this, "scrollCb"), w(this, "bypassOptions"), w(this, "mirror"), w(this, "restoreHandlers", []), this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror, this.init();
  }
  init() {
    this.reset(), this.patchAttachShadow(Element, document);
  }
  addShadowRoot(e, t) {
    if (!Ze(e) || this.shadowDoms.has(e)) return;
    this.shadowDoms.add(e);
    const r = _o(
      {
        ...this.bypassOptions,
        doc: t,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this
      },
      e
    );
    this.restoreHandlers.push(() => r.disconnect()), this.restoreHandlers.push(
      Lo({
        ...this.bypassOptions,
        scrollCb: this.scrollCb,
        // https://gist.github.com/praveenpuglia/0832da687ed5a5d7a0907046c9ef1813
        // scroll is not allowed to pass the boundary, so we need to listen the shadow document
        doc: e,
        mirror: this.mirror
      })
    ), setTimeout(() => {
      e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(
        e.adoptedStyleSheets,
        this.mirror.getId(v.host(e))
      ), this.restoreHandlers.push(
        Fo(
          {
            mirror: this.mirror,
            stylesheetManager: this.bypassOptions.stylesheetManager
          },
          e
        )
      );
    }, 0);
  }
  /**
   * Monkey patch 'attachShadow' of an IFrameElement to observe newly added shadow doms.
   */
  observeAttachShadow(e) {
    !e.contentWindow || !e.contentDocument || this.patchAttachShadow(
      e.contentWindow.Element,
      e.contentDocument
    );
  }
  /**
   * Patch 'attachShadow' to observe newly added shadow doms.
   */
  patchAttachShadow(e, t) {
    const r = this;
    this.restoreHandlers.push(
      Ue(
        e.prototype,
        "attachShadow",
        function(i) {
          return function(n) {
            const o = i.call(this, n), l = v.shadowRoot(this);
            return l && Po(this) && r.addShadowRoot(l, t), o;
          };
        }
      )
    );
  }
  reset() {
    this.restoreHandlers.forEach((e) => {
      try {
        e();
      } catch {
      }
    }), this.restoreHandlers = [], this.shadowDoms = /* @__PURE__ */ new WeakSet();
  }
}
var $e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", uf = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Lt = 0; Lt < $e.length; Lt++)
  uf[$e.charCodeAt(Lt)] = Lt;
var cf = function(s) {
  var e = new Uint8Array(s), t, r = e.length, i = "";
  for (t = 0; t < r; t += 3)
    i += $e[e[t] >> 2], i += $e[(e[t] & 3) << 4 | e[t + 1] >> 4], i += $e[(e[t + 1] & 15) << 2 | e[t + 2] >> 6], i += $e[e[t + 2] & 63];
  return r % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : r % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="), i;
};
const Fi = /* @__PURE__ */ new Map();
function hf(s, e) {
  let t = Fi.get(s);
  return t || (t = /* @__PURE__ */ new Map(), Fi.set(s, t)), t.has(e) || t.set(e, []), t.get(e);
}
const Uo = (s, e, t) => {
  if (!s || !(zo(s, e) || typeof s == "object"))
    return;
  const r = s.constructor.name, i = hf(t, r);
  let n = i.indexOf(s);
  return n === -1 && (n = i.length, i.push(s)), n;
};
function Wt(s, e, t) {
  if (s instanceof Array)
    return s.map((r) => Wt(r, e, t));
  if (s === null)
    return s;
  if (s instanceof Float32Array || s instanceof Float64Array || s instanceof Int32Array || s instanceof Uint32Array || s instanceof Uint8Array || s instanceof Uint16Array || s instanceof Int16Array || s instanceof Int8Array || s instanceof Uint8ClampedArray)
    return {
      rr_type: s.constructor.name,
      args: [Object.values(s)]
    };
  if (
    // SharedArrayBuffer disabled on most browsers due to spectre.
    // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/SharedArrayBuffer
    // value instanceof SharedArrayBuffer ||
    s instanceof ArrayBuffer
  ) {
    const r = s.constructor.name, i = cf(s);
    return {
      rr_type: r,
      base64: i
    };
  } else {
    if (s instanceof DataView)
      return {
        rr_type: s.constructor.name,
        args: [
          Wt(s.buffer, e, t),
          s.byteOffset,
          s.byteLength
        ]
      };
    if (s instanceof HTMLImageElement) {
      const r = s.constructor.name, { src: i } = s;
      return {
        rr_type: r,
        src: i
      };
    } else if (s instanceof HTMLCanvasElement) {
      const r = "HTMLImageElement", i = s.toDataURL();
      return {
        rr_type: r,
        src: i
      };
    } else {
      if (s instanceof ImageData)
        return {
          rr_type: s.constructor.name,
          args: [Wt(s.data, e, t), s.width, s.height]
        };
      if (zo(s, e) || typeof s == "object") {
        const r = s.constructor.name, i = Uo(s, e, t);
        return {
          rr_type: r,
          index: i
        };
      }
    }
  }
  return s;
}
const Bo = (s, e, t) => s.map((r) => Wt(r, e, t)), zo = (s, e) => !![
  "WebGLActiveInfo",
  "WebGLBuffer",
  "WebGLFramebuffer",
  "WebGLProgram",
  "WebGLRenderbuffer",
  "WebGLShader",
  "WebGLShaderPrecisionFormat",
  "WebGLTexture",
  "WebGLUniformLocation",
  "WebGLVertexArrayObject",
  // In old Chrome versions, value won't be an instanceof WebGLVertexArrayObject.
  "WebGLVertexArrayObjectOES"
].filter(
  (i) => typeof e[i] == "function"
).find(
  (i) => s instanceof e[i]
);
function ff(s, e, t, r) {
  const i = [], n = Object.getOwnPropertyNames(
    e.CanvasRenderingContext2D.prototype
  );
  for (const o of n)
    try {
      if (typeof e.CanvasRenderingContext2D.prototype[o] != "function")
        continue;
      const l = Ue(
        e.CanvasRenderingContext2D.prototype,
        o,
        function(a) {
          return function(...u) {
            return J(this.canvas, t, r, !0) || setTimeout(() => {
              const c = Bo(u, e, this);
              s(this.canvas, {
                type: Le["2D"],
                property: o,
                args: c
              });
            }, 0), a.apply(this, u);
          };
        }
      );
      i.push(l);
    } catch {
      const l = pr(
        e.CanvasRenderingContext2D.prototype,
        o,
        {
          set(a) {
            s(this.canvas, {
              type: Le["2D"],
              property: o,
              args: [a],
              setter: !0
            });
          }
        }
      );
      i.push(l);
    }
  return () => {
    i.forEach((o) => o());
  };
}
function pf(s) {
  return s === "experimental-webgl" ? "webgl" : s;
}
function Ui(s, e, t, r) {
  const i = [];
  try {
    const n = Ue(
      s.HTMLCanvasElement.prototype,
      "getContext",
      function(o) {
        return function(l, ...a) {
          if (!J(this, e, t, !0)) {
            const u = pf(l);
            if ("__context" in this || (this.__context = u), r && ["webgl", "webgl2"].includes(u))
              if (a[0] && typeof a[0] == "object") {
                const c = a[0];
                c.preserveDrawingBuffer || (c.preserveDrawingBuffer = !0);
              } else
                a.splice(0, 1, {
                  preserveDrawingBuffer: !0
                });
          }
          return o.apply(this, [l, ...a]);
        };
      }
    );
    i.push(n);
  } catch {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return () => {
    i.forEach((n) => n());
  };
}
function Bi(s, e, t, r, i, n) {
  const o = [], l = Object.getOwnPropertyNames(s);
  for (const a of l)
    if (
      //prop.startsWith('get') ||  // e.g. getProgramParameter, but too risky
      ![
        "isContextLost",
        "canvas",
        "drawingBufferWidth",
        "drawingBufferHeight"
      ].includes(a)
    )
      try {
        if (typeof s[a] != "function")
          continue;
        const u = Ue(
          s,
          a,
          function(c) {
            return function(...h) {
              const d = c.apply(this, h);
              if (Uo(d, n, this), "tagName" in this.canvas && !J(this.canvas, r, i, !0)) {
                const m = Bo(h, n, this), g = {
                  type: e,
                  property: a,
                  args: m
                };
                t(this.canvas, g);
              }
              return d;
            };
          }
        );
        o.push(u);
      } catch {
        const u = pr(s, a, {
          set(c) {
            t(this.canvas, {
              type: e,
              property: a,
              args: [c],
              setter: !0
            });
          }
        });
        o.push(u);
      }
  return o;
}
function df(s, e, t, r) {
  const i = [];
  return i.push(
    ...Bi(
      e.WebGLRenderingContext.prototype,
      Le.WebGL,
      s,
      t,
      r,
      e
    )
  ), typeof e.WebGL2RenderingContext < "u" && i.push(
    ...Bi(
      e.WebGL2RenderingContext.prototype,
      Le.WebGL2,
      s,
      t,
      r,
      e
    )
  ), () => {
    i.forEach((n) => n());
  };
}
const Wo = "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICB2YXIgY2hhcnMgPSAiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyI7CiAgdmFyIGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAidW5kZWZpbmVkIiA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTsKICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7CiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOwogIH0KICB2YXIgZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHsKICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaTIsIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gIiI7CiAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW47IGkyICs9IDMpIHsKICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kyXSA+PiAyXTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMl0gJiAzKSA8PCA0IHwgYnl0ZXNbaTIgKyAxXSA+PiA0XTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMiArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpMiArIDJdID4+IDZdOwogICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaTIgKyAyXSAmIDYzXTsKICAgIH0KICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgIj0iOwogICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgIj09IjsKICAgIH0KICAgIHJldHVybiBiYXNlNjQ7CiAgfTsKICBjb25zdCBsYXN0QmxvYk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7CiAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTsKICBhc3luYyBmdW5jdGlvbiBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpIHsKICAgIGNvbnN0IGlkID0gYCR7d2lkdGh9LSR7aGVpZ2h0fWA7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBpZiAodHJhbnNwYXJlbnRCbG9iTWFwLmhhcyhpZCkpIHJldHVybiB0cmFuc3BhcmVudEJsb2JNYXAuZ2V0KGlkKTsKICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsKICAgICAgb2Zmc2NyZWVuLmdldENvbnRleHQoIjJkIik7CiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBvZmZzY3JlZW4uY29udmVydFRvQmxvYihkYXRhVVJMT3B0aW9ucyk7CiAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpOwogICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOwogICAgICB0cmFuc3BhcmVudEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICByZXR1cm4gYmFzZTY0OwogICAgfSBlbHNlIHsKICAgICAgcmV0dXJuICIiOwogICAgfQogIH0KICBjb25zdCB3b3JrZXIgPSBzZWxmOwogIHdvcmtlci5vbm1lc3NhZ2UgPSBhc3luYyBmdW5jdGlvbihlKSB7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBjb25zdCB7IGlkLCBiaXRtYXAsIHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zIH0gPSBlLmRhdGE7CiAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKAogICAgICAgIHdpZHRoLAogICAgICAgIGhlaWdodCwKICAgICAgICBkYXRhVVJMT3B0aW9ucwogICAgICApOwogICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOwogICAgICBjb25zdCBjdHggPSBvZmZzY3JlZW4uZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIDAsIDApOwogICAgICBiaXRtYXAuY2xvc2UoKTsKICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IG9mZnNjcmVlbi5jb252ZXJ0VG9CbG9iKGRhdGFVUkxPcHRpb25zKTsKICAgICAgY29uc3QgdHlwZSA9IGJsb2IudHlwZTsKICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBibG9iLmFycmF5QnVmZmVyKCk7CiAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7CiAgICAgIGlmICghbGFzdEJsb2JNYXAuaGFzKGlkKSAmJiBhd2FpdCB0cmFuc3BhcmVudEJhc2U2NCA9PT0gYmFzZTY0KSB7CiAgICAgICAgbGFzdEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZCB9KTsKICAgICAgfQogICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KSByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7CiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7CiAgICAgICAgaWQsCiAgICAgICAgdHlwZSwKICAgICAgICBiYXNlNjQsCiAgICAgICAgd2lkdGgsCiAgICAgICAgaGVpZ2h0CiAgICAgIH0pOwogICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7CiAgICB9IGVsc2UgewogICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsKICAgIH0KICB9Owp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS1iaXRtYXAtZGF0YS11cmwtd29ya2VyLUlKcEM3Z19iLmpzLm1hcAo=", mf = (s) => Uint8Array.from(atob(s), (e) => e.charCodeAt(0)), zi = typeof window < "u" && window.Blob && new Blob([mf(Wo)], { type: "text/javascript;charset=utf-8" });
function gf(s) {
  let e;
  try {
    if (e = zi && (window.URL || window.webkitURL).createObjectURL(zi), !e) throw "";
    const t = new Worker(e, {
      name: s == null ? void 0 : s.name
    });
    return t.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(e);
    }), t;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Wo,
      {
        name: s == null ? void 0 : s.name
      }
    );
  } finally {
    e && (window.URL || window.webkitURL).revokeObjectURL(e);
  }
}
class yf {
  constructor(e) {
    w(this, "pendingCanvasMutations", /* @__PURE__ */ new Map()), w(this, "rafStamps", { latestId: 0, invokeId: null }), w(this, "mirror"), w(this, "mutationCb"), w(this, "resetObservers"), w(this, "frozen", !1), w(this, "locked", !1), w(this, "processMutation", (a, u) => {
      (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(a) || this.pendingCanvasMutations.set(a, []), this.pendingCanvasMutations.get(a).push(u);
    });
    const {
      sampling: t = "all",
      win: r,
      blockClass: i,
      blockSelector: n,
      recordCanvas: o,
      dataURLOptions: l
    } = e;
    this.mutationCb = e.mutationCb, this.mirror = e.mirror, o && t === "all" && this.initCanvasMutationObserver(r, i, n), o && typeof t == "number" && this.initCanvasFPSObserver(t, r, i, n, {
      dataURLOptions: l
    });
  }
  reset() {
    this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
  }
  freeze() {
    this.frozen = !0;
  }
  unfreeze() {
    this.frozen = !1;
  }
  lock() {
    this.locked = !0;
  }
  unlock() {
    this.locked = !1;
  }
  initCanvasFPSObserver(e, t, r, i, n) {
    const o = Ui(
      t,
      r,
      i,
      !0
    ), l = /* @__PURE__ */ new Map(), a = new gf();
    a.onmessage = (g) => {
      const { id: p } = g.data;
      if (l.set(p, !1), !("base64" in g.data)) return;
      const { base64: f, type: S, width: b, height: y } = g.data;
      this.mutationCb({
        id: p,
        type: Le["2D"],
        commands: [
          {
            property: "clearRect",
            // wipe canvas
            args: [0, 0, b, y]
          },
          {
            property: "drawImage",
            // draws (semi-transparent) image
            args: [
              {
                rr_type: "ImageBitmap",
                args: [
                  {
                    rr_type: "Blob",
                    data: [{ rr_type: "ArrayBuffer", base64: f }],
                    type: S
                  }
                ]
              },
              0,
              0
            ]
          }
        ]
      });
    };
    const u = 1e3 / e;
    let c = 0, h;
    const d = () => {
      const g = [];
      return t.document.querySelectorAll("canvas").forEach((p) => {
        J(p, r, i, !0) || g.push(p);
      }), g;
    }, m = (g) => {
      if (c && g - c < u) {
        h = requestAnimationFrame(m);
        return;
      }
      c = g, d().forEach(async (p) => {
        var f;
        const S = this.mirror.getId(p);
        if (l.get(S) || p.width === 0 || p.height === 0) return;
        if (l.set(S, !0), ["webgl", "webgl2"].includes(p.__context)) {
          const y = p.getContext(p.__context);
          ((f = y == null ? void 0 : y.getContextAttributes()) == null ? void 0 : f.preserveDrawingBuffer) === !1 && y.clear(y.COLOR_BUFFER_BIT);
        }
        const b = await createImageBitmap(p);
        a.postMessage(
          {
            id: S,
            bitmap: b,
            width: p.width,
            height: p.height,
            dataURLOptions: n.dataURLOptions
          },
          [b]
        );
      }), h = requestAnimationFrame(m);
    };
    h = requestAnimationFrame(m), this.resetObservers = () => {
      o(), cancelAnimationFrame(h);
    };
  }
  initCanvasMutationObserver(e, t, r) {
    this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
    const i = Ui(
      e,
      t,
      r,
      !1
    ), n = ff(
      this.processMutation.bind(this),
      e,
      t,
      r
    ), o = df(
      this.processMutation.bind(this),
      e,
      t,
      r
    );
    this.resetObservers = () => {
      i(), n(), o();
    };
  }
  startPendingCanvasMutationFlusher() {
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const e = (t) => {
      this.rafStamps.latestId = t, requestAnimationFrame(e);
    };
    requestAnimationFrame(e);
  }
  flushPendingCanvasMutations() {
    this.pendingCanvasMutations.forEach(
      (e, t) => {
        const r = this.mirror.getId(t);
        this.flushPendingCanvasMutationFor(t, r);
      }
    ), requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(e, t) {
    if (this.frozen || this.locked)
      return;
    const r = this.pendingCanvasMutations.get(e);
    if (!r || t === -1) return;
    const i = r.map((o) => {
      const { type: l, ...a } = o;
      return a;
    }), { type: n } = r[0];
    this.mutationCb({ id: t, type: n, commands: i }), this.pendingCanvasMutations.delete(e);
  }
}
class wf {
  constructor(e) {
    w(this, "trackedLinkElements", /* @__PURE__ */ new WeakSet()), w(this, "mutationCb"), w(this, "adoptedStyleSheetCb"), w(this, "styleMirror", new Fh()), this.mutationCb = e.mutationCb, this.adoptedStyleSheetCb = e.adoptedStyleSheetCb;
  }
  attachLinkElement(e, t) {
    "_cssText" in t.attributes && this.mutationCb({
      adds: [],
      removes: [],
      texts: [],
      attributes: [
        {
          id: t.id,
          attributes: t.attributes
        }
      ]
    }), this.trackLinkElement(e);
  }
  trackLinkElement(e) {
    this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
  }
  adoptStyleSheets(e, t) {
    if (e.length === 0) return;
    const r = {
      id: t,
      styleIds: []
    }, i = [];
    for (const n of e) {
      let o;
      this.styleMirror.has(n) ? o = this.styleMirror.getId(n) : (o = this.styleMirror.add(n), i.push({
        styleId: o,
        rules: Array.from(n.rules || CSSRule, (l, a) => ({
          rule: Zi(l, n.href),
          index: a
        }))
      })), r.styleIds.push(o);
    }
    i.length > 0 && (r.styles = i), this.adoptedStyleSheetCb(r);
  }
  reset() {
    this.styleMirror.reset(), this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }
  // TODO: take snapshot on stylesheet reload by applying event listener
  trackStylesheetInLinkElement(e) {
  }
}
class Sf {
  constructor() {
    w(this, "nodeMap", /* @__PURE__ */ new WeakMap()), w(this, "active", !1);
  }
  inOtherBuffer(e, t) {
    const r = this.nodeMap.get(e);
    return r && Array.from(r).some((i) => i !== t);
  }
  add(e, t) {
    this.active || (this.active = !0, requestAnimationFrame(() => {
      this.nodeMap = /* @__PURE__ */ new WeakMap(), this.active = !1;
    })), this.nodeMap.set(e, (this.nodeMap.get(e) || /* @__PURE__ */ new Set()).add(t));
  }
  destroy() {
  }
}
let z, Vt, Nr, rr = !1;
try {
  if (Array.from([1], (s) => s * 2)[0] !== 2) {
    const s = document.createElement("iframe");
    document.body.appendChild(s), Array.from = ((Ws = s.contentWindow) == null ? void 0 : Ws.Array.from) || Array.from, document.body.removeChild(s);
  }
} catch (s) {
  console.debug("Unable to override Array.from", s);
}
const se = ya();
function ft(s = {}) {
  const {
    emit: e,
    checkoutEveryNms: t,
    checkoutEveryNth: r,
    blockClass: i = "rr-block",
    blockSelector: n = null,
    ignoreClass: o = "rr-ignore",
    ignoreSelector: l = null,
    maskTextClass: a = "rr-mask",
    maskTextSelector: u = null,
    inlineStylesheet: c = !0,
    maskAllInputs: h,
    maskInputOptions: d,
    slimDOMOptions: m,
    maskInputFn: g,
    maskTextFn: p,
    hooks: f,
    packFn: S,
    sampling: b = {},
    dataURLOptions: y = {},
    mousemoveWait: C,
    recordDOM: $ = !0,
    recordCanvas: P = !1,
    recordCrossOriginIframes: j = !1,
    recordAfter: _ = s.recordAfter === "DOMContentLoaded" ? s.recordAfter : "load",
    userTriggeredOnInput: W = !1,
    collectFonts: H = !1,
    inlineImages: Q = !1,
    plugins: oe,
    keepIframeSrcFn: O = () => !1,
    ignoreCSSAttributes: Be = /* @__PURE__ */ new Set([]),
    errorHandler: ze
  } = s;
  jh(ze);
  const V = j ? window.parent === window : !0;
  let q = !1;
  if (!V)
    try {
      window.parent.document && (q = !1);
    } catch {
      q = !0;
    }
  if (V && !e)
    throw new Error("emit function is required");
  if (!V && !q)
    return () => {
    };
  C !== void 0 && b.mousemove === void 0 && (b.mousemove = C), se.reset();
  const ye = h === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0
  } : d !== void 0 ? d : { password: !0 }, ae = m === !0 || m === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaVerification: !0,
    // the following are off for slimDOMOptions === true,
    // as they destroy some (hidden) info:
    headMetaAuthorship: m === "all",
    headMetaDescKeywords: m === "all",
    headTitleMutations: m === "all"
  } : m || {};
  Lh();
  let Fs, dr = 0;
  const Us = (A) => {
    for (const re of oe || [])
      re.eventProcessor && (A = re.eventProcessor(A));
    return S && // Disable packing events which will be emitted to parent frames.
    !q && (A = S(A)), A;
  };
  z = (A, re) => {
    var U;
    const B = A;
    if (B.timestamp = er(), (U = Ce[0]) != null && U.isFrozen() && B.type !== R.FullSnapshot && !(B.type === R.IncrementalSnapshot && B.data.source === I.Mutation) && Ce.forEach((le) => le.unfreeze()), V)
      e == null || e(Us(B), re);
    else if (q) {
      const le = {
        type: "rrweb",
        event: Us(B),
        origin: window.location.origin,
        isCheckout: re
      };
      window.parent.postMessage(le, "*");
    }
    if (B.type === R.FullSnapshot)
      Fs = B, dr = 0;
    else if (B.type === R.IncrementalSnapshot) {
      if (B.data.source === I.Mutation && B.data.isAttachIframe)
        return;
      dr++;
      const le = r && dr >= r, N = t && B.timestamp - Fs.timestamp > t;
      (le || N) && Vt(!0);
    }
  };
  const pt = (A) => {
    z({
      type: R.IncrementalSnapshot,
      data: {
        source: I.Mutation,
        ...A
      }
    });
  }, Bs = (A) => z({
    type: R.IncrementalSnapshot,
    data: {
      source: I.Scroll,
      ...A
    }
  }), zs = (A) => z({
    type: R.IncrementalSnapshot,
    data: {
      source: I.CanvasMutation,
      ...A
    }
  }), Ho = (A) => z({
    type: R.IncrementalSnapshot,
    data: {
      source: I.AdoptedStyleSheet,
      ...A
    }
  }), we = new wf({
    mutationCb: pt,
    adoptedStyleSheetCb: Ho
  }), Se = new af({
    mirror: se,
    mutationCb: pt,
    stylesheetManager: we,
    recordCrossOriginIframes: j,
    wrappedEmit: z
  });
  for (const A of oe || [])
    A.getMirror && A.getMirror({
      nodeMirror: se,
      crossOriginIframeMirror: Se.crossOriginIframeMirror,
      crossOriginIframeStyleMirror: Se.crossOriginIframeStyleMirror
    });
  const mr = new Sf();
  Nr = new yf({
    recordCanvas: P,
    mutationCb: zs,
    win: window,
    blockClass: i,
    blockSelector: n,
    mirror: se,
    sampling: b.canvas,
    dataURLOptions: y
  });
  const dt = new lf({
    mutationCb: pt,
    scrollCb: Bs,
    bypassOptions: {
      blockClass: i,
      blockSelector: n,
      maskTextClass: a,
      maskTextSelector: u,
      inlineStylesheet: c,
      maskInputOptions: ye,
      dataURLOptions: y,
      maskTextFn: p,
      maskInputFn: g,
      recordCanvas: P,
      inlineImages: Q,
      sampling: b,
      slimDOMOptions: ae,
      iframeManager: Se,
      stylesheetManager: we,
      canvasManager: Nr,
      keepIframeSrcFn: O,
      processedNodeManager: mr
    },
    mirror: se
  });
  Vt = (A = !1) => {
    if (!$)
      return;
    z(
      {
        type: R.Meta,
        data: {
          href: window.location.href,
          width: Ao(),
          height: Oo()
        }
      },
      A
    ), we.reset(), dt.init(), Ce.forEach((U) => U.lock());
    const re = za(document, {
      mirror: se,
      blockClass: i,
      blockSelector: n,
      maskTextClass: a,
      maskTextSelector: u,
      inlineStylesheet: c,
      maskAllInputs: ye,
      maskTextFn: p,
      maskInputFn: g,
      slimDOM: ae,
      dataURLOptions: y,
      recordCanvas: P,
      inlineImages: Q,
      onSerialize: (U) => {
        $o(U, se) && Se.addIframe(U), No(U, se) && we.trackLinkElement(U), cs(U) && dt.addShadowRoot(v.shadowRoot(U), document);
      },
      onIframeLoad: (U, B) => {
        Se.attachIframe(U, B), dt.observeAttachShadow(U);
      },
      onStylesheetLoad: (U, B) => {
        we.attachLinkElement(U, B);
      },
      keepIframeSrcFn: O
    });
    if (!re)
      return console.warn("Failed to snapshot the document");
    z(
      {
        type: R.FullSnapshot,
        data: {
          node: re,
          initialOffset: Ro(window)
        }
      },
      A
    ), Ce.forEach((U) => U.unlock()), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && we.adoptStyleSheets(
      document.adoptedStyleSheets,
      se.getId(document)
    );
  };
  try {
    const A = [], re = (B) => {
      var le;
      return x(of)(
        {
          mutationCb: pt,
          mousemoveCb: (N, gr) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: gr,
              positions: N
            }
          }),
          mouseInteractionCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.MouseInteraction,
              ...N
            }
          }),
          scrollCb: Bs,
          viewportResizeCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.ViewportResize,
              ...N
            }
          }),
          inputCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.Input,
              ...N
            }
          }),
          mediaInteractionCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.MediaInteraction,
              ...N
            }
          }),
          styleSheetRuleCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.StyleSheetRule,
              ...N
            }
          }),
          styleDeclarationCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.StyleDeclaration,
              ...N
            }
          }),
          canvasMutationCb: zs,
          fontCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.Font,
              ...N
            }
          }),
          selectionCb: (N) => {
            z({
              type: R.IncrementalSnapshot,
              data: {
                source: I.Selection,
                ...N
              }
            });
          },
          customElementCb: (N) => {
            z({
              type: R.IncrementalSnapshot,
              data: {
                source: I.CustomElement,
                ...N
              }
            });
          },
          blockClass: i,
          ignoreClass: o,
          ignoreSelector: l,
          maskTextClass: a,
          maskTextSelector: u,
          maskInputOptions: ye,
          inlineStylesheet: c,
          sampling: b,
          recordDOM: $,
          recordCanvas: P,
          inlineImages: Q,
          userTriggeredOnInput: W,
          collectFonts: H,
          doc: B,
          maskInputFn: g,
          maskTextFn: p,
          keepIframeSrcFn: O,
          blockSelector: n,
          slimDOMOptions: ae,
          dataURLOptions: y,
          mirror: se,
          iframeManager: Se,
          stylesheetManager: we,
          shadowDomManager: dt,
          processedNodeManager: mr,
          canvasManager: Nr,
          ignoreCSSAttributes: Be,
          plugins: ((le = oe == null ? void 0 : oe.filter((N) => N.observer)) == null ? void 0 : le.map((N) => ({
            observer: N.observer,
            options: N.options,
            callback: (gr) => z({
              type: R.Plugin,
              data: {
                plugin: N.name,
                payload: gr
              }
            })
          }))) || []
        },
        f
      );
    };
    Se.addLoadListener((B) => {
      try {
        A.push(re(B.contentDocument));
      } catch (le) {
        console.warn(le);
      }
    });
    const U = () => {
      Vt(), A.push(re(document)), rr = !0;
    };
    return document.readyState === "interactive" || document.readyState === "complete" ? U() : (A.push(
      Z("DOMContentLoaded", () => {
        z({
          type: R.DomContentLoaded,
          data: {}
        }), _ === "DOMContentLoaded" && U();
      })
    ), A.push(
      Z(
        "load",
        () => {
          z({
            type: R.Load,
            data: {}
          }), _ === "load" && U();
        },
        window
      )
    )), () => {
      A.forEach((B) => B()), mr.destroy(), rr = !1, Hh();
    };
  } catch (A) {
    console.warn(A);
  }
}
ft.addCustomEvent = (s, e) => {
  if (!rr)
    throw new Error("please add custom event after start recording");
  z({
    type: R.Custom,
    data: {
      tag: s,
      payload: e
    }
  });
};
ft.freezePage = () => {
  Ce.forEach((s) => s.freeze());
};
ft.takeFullSnapshot = (s) => {
  if (!rr)
    throw new Error("please take full snapshot after start recording");
  Vt(s);
};
ft.mirror = se;
var Wi;
(function(s) {
  s[s.NotStarted = 0] = "NotStarted", s[s.Running = 1] = "Running", s[s.Stopped = 2] = "Stopped";
})(Wi || (Wi = {}));
const Vi = {
  "Content-Type": "application/json",
  "X-Vantara-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone
}, bf = "https://in.vantara.ai", Gi = 5e3, Cf = 5, vf = 2e3, If = 3e4, ji = 1e4;
var Fe = /* @__PURE__ */ ((s) => (s.Initializing = "initializing", s.Ready = "ready", s))(Fe || {});
const be = class be {
  constructor(e, t, r, i, n) {
    X(this, "productId");
    X(this, "clientKey");
    X(this, "endpoint");
    X(this, "sessionInfo");
    X(this, "state");
    X(this, "lastSendTime", Date.now());
    X(this, "isSending", !1);
    X(this, "retryCount", 0);
    X(this, "retryTimeout", null);
    X(this, "flushInterval", null);
    X(this, "events", []);
    X(this, "stopRrwebRecording", null);
    if (!e.startsWith("prd_") || e.length !== 30)
      throw new Error(
        "Vantara: Invalid product ID, product ID must start with 'prd_' and be 30 characters long"
      );
    if (!t.startsWith("key_"))
      throw new Error(
        "Vantara: Invalid client key, client key must start with 'key_'"
      );
    this.productId = e, this.clientKey = t, this.endpoint = r, this.sessionInfo = i, this.state = n;
  }
  static async initializeAsync(e, t, r, i) {
    return be.currentSession = new be(
      e,
      t,
      i ?? bf,
      r,
      {
        type: "initializing"
        /* Initializing */
      }
    ), await be.currentSession.startOrRestartOrResumeSession();
  }
  static reset() {
    be.currentSession = null;
  }
  async startOrRestartOrResumeSession() {
    if (this.stopRecording(), this.state.type !== "initializing")
      throw new Error(
        "Vantara: Unexpected state - starting session when not initializing"
      );
    const e = sessionStorage.getItem("sessionId"), t = await fetch(`${this.endpoint}/session`, {
      method: "POST",
      headers: {
        ...Vi,
        "X-Vantara-Product-Id": this.productId,
        "X-Vantara-Client-Key": this.clientKey,
        ...e ? {
          "X-Vantara-Session-Id": e
        } : {}
      },
      body: JSON.stringify({
        environment: this.sessionInfo.environment,
        version: this.sessionInfo.version,
        extra: this.sessionInfo.metadata
      })
    });
    if (!t.ok)
      return console.warn(
        `Vantara: Failed to initialize session: ${t.statusText}`
      ), !1;
    const i = await t.json();
    if (!i.sampled)
      return console.debug("Vantara: Session not sampled, will not record"), !1;
    if (!i.sessionId)
      return console.warn("Vantara: No session ID received, will not record"), !1;
    const n = i.sessionId;
    return sessionStorage.setItem("sessionId", n), this.state = {
      type: "ready",
      sessionId: n
    }, console.debug(e === n ? `Vantara: Resumed session ${n}` : `Vantara: Started session ${n}`), this.events = [], this.startRecording(), !0;
  }
  async identify(e) {
    const t = await fetch(`${this.endpoint}/identify`, {
      method: "POST",
      headers: this._getPostInitializationHeaders(),
      body: JSON.stringify(e)
    });
    return t.ok ? !0 : (console.info(
      `Vantara: Failed to identify user: ${t.status} ${t.statusText}`
    ), !1);
  }
  async sendEvents(e) {
    try {
      const t = await fetch(`${this.endpoint}/batch`, {
        method: "POST",
        headers: this._getPostInitializationHeaders(),
        body: JSON.stringify({
          batchStartedAt: e[0].timestamp,
          eventsString: JSON.stringify(e)
        })
      });
      if (!t.ok)
        throw new Error(
          `Vantara: Got non-OK events response: ${t.statusText}`
        );
      const i = await t.json();
      return i.success ? !0 : (i.shouldRestartSession && (sessionStorage.removeItem("sessionId"), this.state = {
        type: "initializing"
        /* Initializing */
      }, await this.startOrRestartOrResumeSession(), console.info("Vantara: Restarted session")), !1);
    } catch (t) {
      return console.debug(
        "Vantara: Failed to send events, will retry automatically",
        t
      ), !1;
    }
  }
  _getPostInitializationHeaders() {
    if (this.state.type !== "ready")
      throw new Error(
        "Vantara: Library initialization not started. Call init() first."
      );
    return {
      ...Vi,
      "X-Vantara-Product-Id": this.productId,
      "X-Vantara-Client-Key": this.clientKey,
      "X-Vantara-Session-Id": this.state.sessionId
    };
  }
  clearRetryTimeout() {
    this.retryTimeout !== null && (clearTimeout(this.retryTimeout), this.retryTimeout = null);
  }
  scheduleRetry() {
    if (this.clearRetryTimeout(), this.retryCount < Cf) {
      const e = vf * Math.pow(2, this.retryCount);
      this.retryCount++, this.retryTimeout = window.setTimeout(() => {
        this.tryToSendEvents();
      }, e);
    } else
      console.warn("Vantara: Max retry count reached for sending events."), this.retryCount = 0;
  }
  async tryToSendEvents() {
    if (this.clearRetryTimeout(), this.isSending || this.events.length === 0) return;
    if (this.isSending = !0, this.events.length > Gi) {
      const i = this.events.length - Gi;
      this.events.splice(0, i), console.warn(
        `Vantara: Buffer exceeded maximum size. Dropped ${i} oldest events.`
      );
    }
    const e = Math.min(this.events.length, 1e3), t = this.events.slice(0, e);
    await this.sendEvents(t) ? (this.events.splice(0, t.length), this.lastSendTime = Date.now(), this.retryCount = 0) : this.scheduleRetry(), this.isSending = !1;
  }
  pushEvent(e) {
    this.events.push(e), (this.events.length >= 100 || // Send more frequently for smaller batches too
    Date.now() - this.lastSendTime >= ji && this.events.length > 0) && (this.clearRetryTimeout(), setTimeout(() => void this.tryToSendEvents(), 0));
  }
  startRecording() {
    if (this.stopRrwebRecording) {
      console.debug("Vantara: Recording already in progress");
      return;
    }
    this.stopRrwebRecording = ft({
      emit: (e) => this.pushEvent(e)
    }) ?? null, this.lastSendTime = Date.now(), this.flushInterval === null && (this.flushInterval = window.setInterval(() => {
      this.events.length > 0 && Date.now() - this.lastSendTime >= ji && this.tryToSendEvents();
    }, If));
  }
  stopRecording(e = !1) {
    this.stopRrwebRecording && (this.stopRrwebRecording(), this.stopRrwebRecording = null), this.flushInterval !== null && (clearInterval(this.flushInterval), this.flushInterval = null), e && (this.events.length = 0), this.events.length > 0 && this.tryToSendEvents();
  }
};
X(be, "currentSession", null);
let te = be, Xe = null;
const He = [];
function Vo() {
  if (!te.currentSession || te.currentSession.state.type !== Fe.Ready)
    return;
  const s = [];
  for (const e of He)
    try {
      e.callback(), s.push(e), console.debug(`Vantara: Completed '${e.method}'`);
    } catch (t) {
      console.warn(`Vantara: Error processing queued '${e.method}'`, t);
    }
  for (const e of s)
    He.splice(He.indexOf(e), 1);
  He.length === 0 && te.currentSession.state.type === Fe.Ready && Xe !== null && (clearInterval(Xe), Xe = null);
}
function xf(s, e) {
  var t;
  if (((t = te.currentSession) == null ? void 0 : t.state.type) === Fe.Ready)
    try {
      e();
    } catch (r) {
      console.warn(`Vantara: Error executing callback for '${s}'`, r);
    }
  else
    console.debug(`Vantara: Queueing call for '${s}'`), He.push({ method: s, callback: e }), Xe === null && (Xe = window.setInterval(Vo, 200));
}
const Go = async (s, e, t, r) => {
  var i, n;
  if (((i = te.currentSession) == null ? void 0 : i.state.type) === Fe.Initializing || ((n = te.currentSession) == null ? void 0 : n.state.type) === Fe.Ready) {
    console.warn("Vantara: Already initializing or initialized");
    return;
  }
  try {
    await te.initializeAsync(
      s,
      e,
      t,
      r
    ) || (console.warn("Vantara: Failed to initialize session"), te.reset());
  } catch (o) {
    console.warn(
      "Vantara: Failed to initialize, application will continue unaffected. Error:",
      o
    ), te.reset();
  }
  Vo();
}, jo = async (s) => new Promise((e, t) => {
  xf("identify", async () => {
    var r;
    try {
      await ((r = te.currentSession) == null ? void 0 : r.identify(s)) ? e() : t(new Error("Vantara: Failed to identify user"));
    } catch (i) {
      const n = i instanceof Error ? i : new Error(`Vantara: Error in identify: ${String(i)}`);
      console.warn("Vantara: Failed to identify. Error:", n), t(n);
    }
  });
});
function Rf() {
  if (typeof window > "u" || !Array.isArray(window._vntQueue)) return;
  const s = [...window._vntQueue], e = {
    push: function(t) {
      const [r, i] = t;
      switch (r) {
        case "init":
          if (Array.isArray(i) && i.length >= 3) {
            const n = i[0], o = i[1], l = i[2], a = i.length > 3 ? i[3] : void 0;
            Go(n, o, l, a);
          }
          break;
        case "identify":
          if (Array.isArray(i) && i.length >= 1) {
            const n = i[0];
            jo(n);
          }
          break;
        default:
          console.warn(`Vantara: Unknown command: '${r}'`);
      }
    }
  };
  window._vntQueue = e, s.forEach((t) => {
    e.push(t);
  });
}
typeof window < "u" ? (window.VNT = {
  init: Go,
  identify: jo
}, Rf(), console.debug("Vantara: Ready")) : console.warn(
  "Vantara: 'window' object not found. Skipping Vantara assignment"
);
export {
  jo as identify,
  Go as init
};
