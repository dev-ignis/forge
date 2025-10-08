/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fe = globalThis, Ke = Fe.ShadowRoot && (Fe.ShadyCSS === void 0 || Fe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ge = Symbol(), st = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== Ge) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ke && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = st.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && st.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (e) => new yt(typeof e == "string" ? e : e + "", void 0, Ge), M = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce(((r, s, a) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[a + 1]), e[0]);
  return new yt(i, e, Ge);
}, Dt = (e, t) => {
  if (Ke) e.adoptedStyleSheets = t.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of t) {
    const r = document.createElement("style"), s = Fe.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, e.appendChild(r);
  }
}, ot = Ke ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return At(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mt, defineProperty: Tt, getOwnPropertyDescriptor: Ot, getOwnPropertyNames: zt, getOwnPropertySymbols: Et, getPrototypeOf: It } = Object, Ne = globalThis, at = Ne.trustedTypes, Rt = at ? at.emptyScript : "", Pt = Ne.reactiveElementPolyfillSupport, Te = (e, t) => e, je = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Rt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Xe = (e, t) => !Mt(e, t), nt = { attribute: !0, type: String, converter: je, reflect: !1, useDefault: !1, hasChanged: Xe };
Symbol.metadata ??= Symbol("metadata"), Ne.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let _e = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = nt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(t, r, i);
      s !== void 0 && Tt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: s, set: a } = Ot(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: s, set(n) {
      const c = s?.call(this);
      a?.call(this, n), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Te("elementProperties"))) return;
    const t = It(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Te("properties"))) {
      const i = this.properties, r = [...zt(i), ...Et(i)];
      for (const s of r) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, s] of i) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const s = this._$Eu(i, r);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) i.unshift(ot(s));
    } else t !== void 0 && i.push(ot(t));
    return i;
  }
  static _$Eu(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$ET(t, i) {
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : je).toAttribute(i, r.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = r.getPropertyOptions(s), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : je;
      this._$Em = s;
      const c = n.fromAttribute(i, a.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, r) {
    if (t !== void 0) {
      const s = this.constructor, a = this[t];
      if (r ??= s.getPropertyOptions(t), !((r.hasChanged ?? Xe)(a, i) || r.useDefault && r.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: s, wrapped: a }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, a] of r) {
        const { wrapped: n } = a, c = this[s];
        n !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, a, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach(((r) => r.hostUpdate?.())), this.update(i)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((i) => i.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
_e.elementStyles = [], _e.shadowRootOptions = { mode: "open" }, _e[Te("elementProperties")] = /* @__PURE__ */ new Map(), _e[Te("finalized")] = /* @__PURE__ */ new Map(), Pt?.({ ReactiveElement: _e }), (Ne.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = globalThis, He = Je.trustedTypes, lt = He ? He.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, xt = "$lit$", ge = `lit$${Math.random().toFixed(9).slice(2)}$`, wt = "?" + ge, Bt = `<${wt}>`, xe = document, ze = () => xe.createComment(""), Ee = (e) => e === null || typeof e != "object" && typeof e != "function", Ze = Array.isArray, Lt = (e) => Ze(e) || typeof e?.[Symbol.iterator] == "function", Ye = `[ 	
\f\r]`, De = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ct = />/g, be = RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, pt = /"/g, $t = /^(?:script|style|textarea|title)$/i, Ft = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), l = Ft(1), re = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), ye = xe.createTreeWalker(xe, 129);
function kt(e, t) {
  if (!Ze(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const qt = (e, t) => {
  const i = e.length - 1, r = [];
  let s, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = De;
  for (let c = 0; c < i; c++) {
    const d = e[c];
    let m, P, p = -1, k = 0;
    for (; k < d.length && (n.lastIndex = k, P = n.exec(d), P !== null); ) k = n.lastIndex, n === De ? P[1] === "!--" ? n = dt : P[1] !== void 0 ? n = ct : P[2] !== void 0 ? ($t.test(P[2]) && (s = RegExp("</" + P[2], "g")), n = be) : P[3] !== void 0 && (n = be) : n === be ? P[0] === ">" ? (n = s ?? De, p = -1) : P[1] === void 0 ? p = -2 : (p = n.lastIndex - P[2].length, m = P[1], n = P[3] === void 0 ? be : P[3] === '"' ? pt : ht) : n === pt || n === ht ? n = be : n === dt || n === ct ? n = De : (n = be, s = void 0);
    const v = n === be && e[c + 1].startsWith("/>") ? " " : "";
    a += n === De ? d + Bt : p >= 0 ? (r.push(m), d.slice(0, p) + xt + d.slice(p) + ge + v) : d + ge + (p === -2 ? c : v);
  }
  return [kt(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Ie {
  constructor({ strings: t, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let a = 0, n = 0;
    const c = t.length - 1, d = this.parts, [m, P] = qt(t, i);
    if (this.el = Ie.createElement(m, r), ye.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = ye.nextNode()) !== null && d.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(xt)) {
          const k = P[n++], v = s.getAttribute(p).split(ge), H = /([.?@])?(.*)/.exec(k);
          d.push({ type: 1, index: a, name: H[2], strings: v, ctor: H[1] === "." ? Ht : H[1] === "?" ? Nt : H[1] === "@" ? Ut : Ue }), s.removeAttribute(p);
        } else p.startsWith(ge) && (d.push({ type: 6, index: a }), s.removeAttribute(p));
        if ($t.test(s.tagName)) {
          const p = s.textContent.split(ge), k = p.length - 1;
          if (k > 0) {
            s.textContent = He ? He.emptyScript : "";
            for (let v = 0; v < k; v++) s.append(p[v], ze()), ye.nextNode(), d.push({ type: 2, index: ++a });
            s.append(p[k], ze());
          }
        }
      } else if (s.nodeType === 8) if (s.data === wt) d.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(ge, p + 1)) !== -1; ) d.push({ type: 7, index: a }), p += ge.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const r = xe.createElement("template");
    return r.innerHTML = t, r;
  }
}
function Ce(e, t, i = e, r) {
  if (t === re) return t;
  let s = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const a = Ee(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== a && (s?._$AO?.(!1), a === void 0 ? s = void 0 : (s = new a(e), s._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = s : i._$Cl = s), s !== void 0 && (t = Ce(e, s._$AS(e, t.values), s, r)), t;
}
let jt = class {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: r } = this._$AD, s = (t?.creationScope ?? xe).importNode(i, !0);
    ye.currentNode = s;
    let a = ye.nextNode(), n = 0, c = 0, d = r[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let m;
        d.type === 2 ? m = new Ae(a, a.nextSibling, this, t) : d.type === 1 ? m = new d.ctor(a, d.name, d.strings, this, t) : d.type === 6 && (m = new Vt(a, this, t)), this._$AV.push(m), d = r[++c];
      }
      n !== d?.index && (a = ye.nextNode(), n++);
    }
    return ye.currentNode = xe, s;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
};
class Ae {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = Ce(this, t, i), Ee(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== re && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Lt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && Ee(this._$AH) ? this._$AA.nextSibling.data = t : this.T(xe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Ie.createElement(kt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const a = new jt(s, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = ut.get(t.strings);
    return i === void 0 && ut.set(t.strings, i = new Ie(t)), i;
  }
  k(t) {
    Ze(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const a of t) s === i.length ? i.push(r = new Ae(this.O(ze()), this.O(ze()), this, this.options)) : r = i[s], r._$AI(a), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, s, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(t, i = this, r, s) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = Ce(this, t, i, 0), n = !Ee(t) || t !== this._$AH && t !== re, n && (this._$AH = t);
    else {
      const c = t;
      let d, m;
      for (t = a[0], d = 0; d < a.length - 1; d++) m = Ce(this, c[r + d], i, d), m === re && (m = this._$AH[d]), n ||= !Ee(m) || m !== this._$AH[d], m === g ? t = g : t !== g && (t += (m ?? "") + a[d + 1]), this._$AH[d] = m;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ht extends Ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Nt extends Ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Ut extends Ue {
  constructor(t, i, r, s, a) {
    super(t, i, r, s, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Ce(this, t, i, 0) ?? g) === re) return;
    const r = this._$AH, s = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== g && (r === g || s);
    s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vt {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ce(this, t);
  }
}
const Yt = { I: Ae }, Wt = Je.litHtmlPolyfillSupport;
Wt?.(Ie, Ae), (Je.litHtmlVersions ??= []).push("3.3.1");
const Qt = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const a = i?.renderBefore ?? null;
    r._$litPart$ = s = new Ae(t.insertBefore(ze(), a), a, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis;
let Oe = class extends _e {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return re;
  }
};
Oe._$litElement$ = !0, Oe.finalized = !0, et.litElementHydrateSupport?.({ LitElement: Oe });
const Kt = et.litElementPolyfillSupport;
Kt?.({ LitElement: Oe });
(et.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(e, t);
  })) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = { attribute: !0, type: String, converter: je, reflect: !1, hasChanged: Xe }, Xt = (e = Gt, t, i) => {
  const { kind: r, metadata: s } = i;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), r === "accessor") {
    const { name: n } = i;
    return { set(c) {
      const d = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, d, e);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: n } = i;
    return function(c) {
      const d = this[n];
      t.call(this, c), this.requestUpdate(n, d, e);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function o(e) {
  return (t, i) => typeof i == "object" ? Xt(e, t, i) : ((r, s, a) => {
    const n = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, r), n ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function h(e) {
  return o({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ne(e, t) {
  return (i, r, s) => {
    const a = (n) => n.renderRoot?.querySelector(e) ?? null;
    return Jt(i, r, { get() {
      return a(this);
    } });
  };
}
var Zt = Object.defineProperty, me = (e, t, i, r) => {
  for (var s = void 0, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = n(t, i, s) || s);
  return s && Zt(t, i, s), s;
};
const it = class it extends Oe {
  constructor() {
    super(), this.ariaDescription = null, this.maxRenderMs = 16, this.warnOnViolation = !1, this.performanceMode = "auto", this.devMode = !1, this.showMetrics = !1, this.renderTime = 0, this.renderCount = 0, this.performanceStartTime = 0, this.aiMetadata = {
      purpose: "UI Component",
      criticality: "low"
    }, this.componentState = /* @__PURE__ */ new Map(), this.performanceStartTime = globalThis.performance.now();
  }
  // Performance monitoring per ADR-014
  checkPerformance(t) {
    const i = globalThis.performance.now();
    if (this.renderTime = i - t, this.renderCount++, this.renderTime > this.maxRenderMs) {
      const r = `${this.tagName} render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      this.warnOnViolation && console.warn(r, {
        component: this.tagName.toLowerCase(),
        renderTime: this.renderTime,
        maxRenderMs: this.maxRenderMs,
        renderCount: this.renderCount,
        performanceMode: this.performanceMode
      }), this.performanceMode === "auto" && this.applyPerformanceDegradation();
    }
    this.devMode && console.log(`${this.tagName} render metrics:`, {
      component: this.tagName.toLowerCase(),
      renderTime: this.renderTime,
      renderCount: this.renderCount,
      totalTime: i - this.performanceStartTime
    });
  }
  // Override in components to degrade gracefully
  applyPerformanceDegradation() {
  }
  // AI State getter per ADR-014
  get aiState() {
    const t = {};
    this.componentState.forEach((r, s) => {
      t[s] = r;
    });
    const i = {
      renderTime: this.renderTime,
      renderCount: this.renderCount,
      violations: 0,
      mode: this.performanceMode
    };
    return {
      component: this.tagName.toLowerCase(),
      semanticRole: this.semanticRole,
      context: this.aiContext,
      description: this.ariaDescription,
      metadata: this.aiMetadata,
      state: t,
      attributes: this.getAttributeNames().reduce((r, s) => (r[s] = this.getAttribute(s), r), {}),
      possibleActions: this.getPossibleActions(),
      stateExplanation: this.explainState(),
      performance: i
    };
  }
  // AI helper methods per ADR-014
  getAIDescription() {
    const t = `${this.tagName.toLowerCase()} component`, i = this.aiMetadata.purpose || "UI interaction", r = this.semanticRole ? ` with role ${this.semanticRole}` : "", s = this.aiContext ? ` in ${this.aiContext} context` : "";
    return `${t} for ${i}${r}${s}`;
  }
  getPossibleActions() {
    return [];
  }
  explainState() {
    return {
      currentState: "default",
      possibleStates: ["default"],
      stateDescription: "Component in default state"
    };
  }
  // Update component state for AI tracking
  updateComponentState(t, i) {
    this.componentState.set(t, i), this.emit("ai-state-change", {
      key: t,
      value: i,
      fullState: this.aiState
    });
  }
  // Get semantic HTML attributes for AI
  getSemanticAttributes() {
    const t = {};
    return this.semanticRole && (t["data-semantic-role"] = this.semanticRole), this.aiContext && (t["data-ai-context"] = this.aiContext), this.aiMetadata.criticality && this.aiMetadata.criticality !== "low" && (t["data-criticality"] = this.aiMetadata.criticality), this.aiMetadata.dataType && (t["data-type"] = this.aiMetadata.dataType), t;
  }
  // Event emission helper
  emit(t, i, r) {
    const s = new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      ...r
    });
    return this.dispatchEvent(s);
  }
  // Accessibility helpers
  announceToScreenReader(t) {
    const i = document.createElement("div");
    i.setAttribute("aria-live", "polite"), i.setAttribute("aria-atomic", "true"), i.style.position = "absolute", i.style.left = "-10000px", i.style.width = "1px", i.style.height = "1px", i.style.overflow = "hidden", i.textContent = t, document.body.appendChild(i), setTimeout(() => document.body.removeChild(i), 1e3);
  }
  // Lifecycle hooks
  firstUpdated(t) {
    super.firstUpdated(t), this.setAttribute("data-ready", "true");
  }
  // Focus management helpers
  trapFocus(t = this) {
    const i = t.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ), r = i[0], s = i[i.length - 1];
    t.addEventListener("keydown", (a) => {
      a.key === "Tab" && (a.shiftKey && document.activeElement === r ? (a.preventDefault(), s?.focus()) : !a.shiftKey && document.activeElement === s && (a.preventDefault(), r?.focus()));
    });
  }
};
it.styles = M`
    :host {
      box-sizing: border-box;
    }
    
    *, *::before, *::after {
      box-sizing: inherit;
    }
  `;
let f = it;
me([
  o({ type: String, attribute: "semantic-role" })
], f.prototype, "semanticRole");
me([
  o({ type: String, attribute: "ai-context" })
], f.prototype, "aiContext");
me([
  o({ type: String, attribute: "aria-description" })
], f.prototype, "ariaDescription");
me([
  o({ type: Number, attribute: "max-render-ms" })
], f.prototype, "maxRenderMs");
me([
  o({ type: Boolean, attribute: "warn-on-violation" })
], f.prototype, "warnOnViolation");
me([
  o({ type: String, attribute: "performance-mode" })
], f.prototype, "performanceMode");
me([
  o({ type: Boolean, attribute: "dev-mode" })
], f.prototype, "devMode");
me([
  o({ type: Boolean, attribute: "show-metrics" })
], f.prototype, "showMetrics");
class dr {
  constructor() {
    this.metadata = {};
  }
  setPurpose(t) {
    return this.metadata.purpose = t, this;
  }
  setContext(t) {
    return this.metadata.context = t, this;
  }
  setDataType(t) {
    return this.metadata.dataType = t, this;
  }
  setCriticality(t) {
    return this.metadata.criticality = t, this;
  }
  setSemanticRole(t) {
    return this.metadata.semanticRole = t, this;
  }
  addInteraction(t) {
    return this.metadata.interactions || (this.metadata.interactions = []), this.metadata.interactions.push(t), this;
  }
  addValidation(t) {
    return this.metadata.validation || (this.metadata.validation = []), this.metadata.validation.push(t), this;
  }
  addRelation(t) {
    return this.metadata.relations || (this.metadata.relations = []), this.metadata.relations.push(t), this;
  }
  build() {
    if (!this.metadata.purpose)
      throw new Error("AIMetadata must have a purpose");
    return this.metadata;
  }
}
const cr = {
  /**
   * Merge multiple metadata objects with priority
   */
  merge(...e) {
    const t = {};
    for (const i of e)
      Object.assign(t, i), i.interactions && t.interactions && (t.interactions = [...t.interactions, ...i.interactions]), i.validation && t.validation && (t.validation = [...t.validation, ...i.validation]), i.relations && t.relations && (t.relations = [...t.relations, ...i.relations]);
    return t;
  },
  /**
   * Validate metadata completeness
   */
  validate(e) {
    const t = [];
    if (e.purpose || t.push("Missing required field: purpose"), e.criticality && !["low", "medium", "high", "critical"].includes(e.criticality) && t.push("Invalid criticality level"), e.validation)
      for (const i of e.validation)
        (!i.type || !i.message) && t.push("Invalid validation rule");
    return {
      valid: t.length === 0,
      errors: t
    };
  },
  /**
   * Generate AI-friendly description from metadata
   */
  describe(e) {
    const t = [e.purpose];
    return e.context && t.push(`in ${e.context} context`), e.dataType && t.push(`handling ${e.dataType} data`), e.criticality && e.criticality !== "low" && t.push(`with ${e.criticality} criticality`), e.semanticRole && t.push(`serving as ${e.semanticRole}`), t.join(" ");
  },
  /**
   * Generate training examples from AI component metadata
   */
  generateTrainingExamples(e) {
    const t = [];
    return e.usagePatterns.forEach((i, r) => {
      const s = ["react", "vue", "angular", "vanilla"], a = s[r % s.length];
      t.push({
        component: e.purpose.toLowerCase().replace(/\s+/g, "-"),
        context: i,
        goodExample: e.codeExamples[a] || e.codeExamples.vanilla,
        explanation: `Proper usage for ${i} context`,
        framework: a,
        tags: ["best-practice", e.category]
      });
    }), e.antiPatterns.forEach((i) => {
      t.push({
        component: e.purpose.toLowerCase().replace(/\s+/g, "-"),
        context: "anti-pattern",
        goodExample: e.codeExamples.vanilla,
        badExample: `<!-- Avoid: ${i} -->`,
        explanation: `Avoid this pattern: ${i}`,
        tags: ["anti-pattern", e.category]
      });
    }), t;
  },
  /**
   * Validate AI component compliance
   */
  validateCompliance(e, t) {
    const i = [], r = [], s = [];
    t.a11yGuidelines.length > 0 && (!e.getAttribute("role") && t.semanticRole ? i.push({
      category: "accessibility",
      severity: "warning",
      description: "Missing semantic role attribute",
      fix: `Add role="${t.semanticRole}" attribute`,
      example: `<${e.tagName.toLowerCase()} role="${t.semanticRole}">...</${e.tagName.toLowerCase()}>`
    }) : e.getAttribute("role") && r.push("Has proper semantic role"), t.ariaPatterns.forEach((d) => {
      !e.getAttribute("aria-label") && !e.getAttribute("aria-labelledby") && s.push(`Consider adding ${d} for better accessibility`);
    })), t.performanceHints.length > 0 && t.performanceHints.forEach((d) => {
      d.includes("lazy load") && !e.hasAttribute("loading") && s.push("Consider adding lazy loading for performance");
    });
    const a = t.a11yGuidelines.length + t.performanceHints.length + t.contextualRules.length, n = a - i.filter((d) => d.severity === "error").length, c = a > 0 ? Math.round(n / a * 100) : 100;
    return {
      score: c,
      status: c >= 90 ? "compliant" : c >= 70 ? "partial" : "non-compliant",
      issues: i,
      suggestions: s,
      strengths: r
    };
  },
  /**
   * Export AI training dataset
   */
  exportTrainingDataset(e) {
    const t = [];
    return e.forEach((i, r) => {
      t.push({
        tagName: r,
        metadata: i,
        examples: this.generateTrainingExamples(i),
        antiExamples: [],
        // Could be expanded
        relationships: []
        // Could be expanded
      });
    }), {
      version: "1.0.0",
      created: /* @__PURE__ */ new Date(),
      components: t,
      globalPatterns: [],
      frameworkGuidance: {
        react: {
          framework: "react",
          importPatterns: ['import { ComponentName } from "@nexcraft/forge/integrations/react"'],
          eventPatterns: {
            onClick: "onClick={(e) => handleClick(e)}",
            onChange: "onChange={(value) => handleChange(value)}"
          },
          statePatterns: ["controlled components", "uncontrolled with refs"],
          gotchas: ["Remember to handle synthetic events", "Use proper TypeScript types"]
        },
        vue: {
          framework: "vue",
          importPatterns: ['import { ComponentName } from "@nexcraft/forge/integrations/vue"'],
          eventPatterns: {
            click: '@click="handleClick"',
            change: '@change="handleChange"'
          },
          statePatterns: ["v-model", "reactive refs"],
          gotchas: ["Use kebab-case for component names in templates"]
        },
        angular: {
          framework: "angular",
          importPatterns: ['import { NgxForgeModule } from "@nexcraft/forge/integrations/angular"'],
          eventPatterns: {
            click: '(click)="handleClick($event)"',
            change: '(change)="handleChange($event)"'
          },
          statePatterns: ["two-way binding", "reactive forms"],
          gotchas: ["Import CUSTOM_ELEMENTS_SCHEMA for web components"]
        }
      }
    };
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, Re = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Pe = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, r) {
    this._$Ct = t, this._$AM = i, this._$Ci = r;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = Re(class extends Pe {
  constructor(e) {
    if (super(e), e.type !== de.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter(((t) => e[t])).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter(((r) => r !== ""))));
      for (const r in t) t[r] && !this.nt?.has(r) && this.st.add(r);
      return this.render(t);
    }
    const i = e.element.classList;
    for (const r of this.st) r in t || (i.remove(r), this.st.delete(r));
    for (const r in t) {
      const s = !!t[r];
      s === this.st.has(r) || this.nt?.has(r) || (s ? (i.add(r), this.st.add(r)) : (i.remove(r), this.st.delete(r)));
    }
    return re;
  }
});
var ei = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, U = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ti(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && ei(t, i, s), s;
};
let B = class extends f {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.disabled = !1, this.loading = !1, this.type = "button", this.fullWidth = !1, this.ariaLabel = null, this.ariaControls = null, this.ariaExpanded = null, this.ariaCurrent = null, this.ariaSelected = null, this.role = null, this.tabIndex = 0, this.ripples = [], this.renderMetrics = { time: 0, violations: 0 };
  }
  connectedCallback() {
    super.connectedCallback(), this.updateComponentState("variant", this.variant), this.updateComponentState("size", this.size), this.updateComponentState("disabled", this.disabled), this.updateComponentState("loading", this.loading);
  }
  render() {
    const e = {
      button: !0,
      [`button--${this.variant}`]: !0,
      [`button--${this.size}`]: !0,
      "button--loading": this.loading
    }, t = performance.now(), i = l`
      <button
        class=${W(e)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        role=${this.role ? this.role : g}
        tabindex=${this.tabIndex !== void 0 ? this.tabIndex : g}
        aria-label=${this.ariaLabel ? this.ariaLabel : g}
        aria-controls=${this.ariaControls ? this.ariaControls : g}
        aria-expanded=${this.ariaExpanded ? this.ariaExpanded : g}
        aria-current=${this.ariaCurrent ? this.ariaCurrent : g}
        aria-selected=${this.ariaSelected ? this.ariaSelected : g}
        aria-busy=${this.loading ? "true" : g}
        aria-disabled=${this.disabled ? "true" : g}
        aria-description=${this.ariaDescription || this.getDefaultAriaDescription()}
        data-semantic-role=${this.semanticRole || this.getDefaultSemanticRole()}
        data-ai-context=${this.aiContext || this.getDefaultAiContext()}
        @click=${this.handleClick}
        part="button"
      >
        ${this.loading ? l`<span class="spinner" aria-label="Loading"></span>` : ""}
        <slot></slot>
        ${this.ripples.map((s) => l`
          <span 
            class="ripple" 
            style="left: ${s.x}px; top: ${s.y}px;"
            @animationend=${() => this.removeRipple(s.id)}
          ></span>
        `)}
      </button>
    `, r = performance.now();
    return this.checkPerformance(r - t), this.devMode && this.showMetrics ? l`
        <div style="position: relative; display: inline-block;">
          ${i}
          <div style="position: absolute; top: -20px; right: 0; font-size: 10px; background: rgba(0,0,0,0.8); color: white; padding: 2px 4px; border-radius: 2px; z-index: 1000;">
            ${this.renderMetrics.time.toFixed(2)}ms
            ${this.renderMetrics.violations > 0 ? l`<span style="color: red;"> ⚠️ ${this.renderMetrics.violations}</span>` : ""}
          </div>
        </div>
      ` : i;
  }
  handleClick(e) {
    if (!this.disabled && !this.loading) {
      const t = this.getBoundingClientRect(), i = {
        x: e.clientX - t.left,
        y: e.clientY - t.top,
        id: Date.now()
      };
      this.ripples = [...this.ripples, i];
      const r = {
        variant: this.variant,
        size: this.size
      };
      this.emit("click", r);
    }
  }
  removeRipple(e) {
    this.ripples = this.ripples.filter((t) => t.id !== e);
  }
  updated(e) {
    super.updated(e), e.has("variant") && (this.updateComponentState("variant", this.variant), this.aiMetadata.semanticRole = this.getDefaultSemanticRole()), e.has("size") && this.updateComponentState("size", this.size), e.has("disabled") && this.updateComponentState("disabled", this.disabled), e.has("loading") && (this.updateComponentState("loading", this.loading), this.loading && this.announceToScreenReader("Loading, please wait")), this.devMode && console.debug("ForgeButton state:", {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      loading: this.loading,
      semanticRole: this.semanticRole,
      aiContext: this.aiContext,
      renderTime: this.renderMetrics.time
    });
  }
  getDefaultSemanticRole() {
    switch (this.variant) {
      case "primary":
        return "primary-action";
      case "secondary":
        return "secondary-action";
      case "danger":
        return "destructive-action";
      default:
        return "action";
    }
  }
  getDefaultAiContext() {
    return this.type === "submit" ? "form-submission" : this.variant === "danger" ? "confirmation-required" : "user-interaction";
  }
  getDefaultAriaDescription() {
    const e = [];
    return this.variant && e.push(`${this.variant} button`), this.size !== "md" && e.push(`${this.size} size`), this.loading && e.push("currently loading"), this.disabled && e.push("disabled"), e.join(", ") || "Interactive button";
  }
  // Override AI methods from BaseElement
  getPossibleActions() {
    return [
      {
        name: "click",
        description: "Trigger button action",
        available: !this.disabled && !this.loading
      },
      {
        name: "focus",
        description: "Focus the button",
        available: !this.disabled
      },
      {
        name: "disable",
        description: "Disable the button",
        available: !this.disabled
      },
      {
        name: "enable",
        description: "Enable the button",
        available: this.disabled
      }
    ];
  }
  explainState() {
    const e = [];
    this.disabled && e.push("disabled"), this.loading && e.push("loading"), !this.disabled && !this.loading && e.push("ready");
    const t = e.join("-") || "ready";
    return {
      currentState: t,
      possibleStates: ["ready", "loading", "disabled", "disabled-loading"],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return {
      ready: `${this.variant} button ready for interaction`,
      loading: "Button is processing, please wait",
      disabled: "Button is disabled and cannot be clicked",
      "disabled-loading": "Button is disabled while processing"
    }[e] || "Button state";
  }
  checkPerformance(e) {
    this.renderMetrics.time = e, e > this.maxRenderMs && (this.renderMetrics.violations++, this.warnOnViolation && console.warn(`ForgeButton render exceeded budget: ${e.toFixed(2)}ms > ${this.maxRenderMs}ms`, {
      variant: this.variant,
      size: this.size,
      performanceMode: this.performanceMode
    }), this.performanceMode === "auto" && this.renderMetrics.violations > 3 && (this.performanceMode = "fast", console.info("ForgeButton: Switching to fast performance mode due to violations")));
  }
};
B.aiMetadata = {
  // Core Identity
  purpose: "Primary action trigger with semantic meaning for user interactions",
  semanticRole: "button",
  category: "atom",
  criticality: "medium",
  // AI Generation Guidance
  usagePatterns: [
    "form submission",
    "modal triggers",
    "navigation actions",
    "data operations (save, delete, edit)",
    "workflow progression",
    "menu interactions"
  ],
  antiPatterns: [
    "never use primary variant for destructive actions",
    "avoid disabled state for async operations - prefer loading state",
    "do not use buttons for navigation - use links for page changes",
    'avoid generic text like "Click here" - use descriptive labels'
  ],
  contextualRules: [
    "always provide accessible labels for icon-only buttons",
    "maintain consistent spacing using design tokens",
    "ensure WCAG 2.1 AA compliance automatically",
    "use primary variant sparingly - only one primary action per section",
    "provide loading states for async operations",
    "include proper focus management for keyboard users"
  ],
  // AI Prompts for Code Generation
  aiPrompts: {
    codeGeneration: "Generate button with semantic HTML, proper ARIA attributes, and accessible interaction patterns",
    accessibility: "Include keyboard navigation (Enter/Space), screen reader support, and proper focus management",
    performance: "Implement efficient event handling, debounce rapid clicks, and optimize for mobile touch",
    designSystem: "Use design tokens for consistent styling, spacing, and maintain design system alignment"
  },
  // Framework-Specific Code Examples
  codeExamples: {
    react: `import { ForgeButton } from '@nexcraft/forge/integrations/react';

function App() {
  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <ForgeButton 
      variant="primary" 
      onClick={handleSubmit}
      loading={isSubmitting}
      disabled={!isValid}
    >
      Submit Form
    </ForgeButton>
  );
}`,
    vue: `<template>
  <forge-button 
    variant="primary"
    @click="handleSubmit"
    :loading="isSubmitting"
    :disabled="!isValid"
  >
    Submit Form
  </forge-button>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      // Handle form submission
    }
  }
}
<\/script>`,
    angular: `<forge-button 
  variant="primary"
  (click)="handleSubmit()"
  [loading]="isSubmitting"
  [disabled]="!isValid">
  Submit Form
</forge-button>`,
    vanilla: `<forge-button variant="primary" id="submit-btn">
  Submit Form
</forge-button>

<script>
document.getElementById('submit-btn').addEventListener('click', () => {
  // Handle form submission
});
<\/script>`
  },
  // Design System Integration
  designTokens: {
    spacing: ["--forge-spacing-sm", "--forge-spacing-md", "--forge-spacing-lg"],
    colors: ["--forge-color-primary-*", "--forge-color-error", "--forge-color-surface-*"],
    typography: ["--forge-font-family", "--forge-font-size-*", "--forge-font-weight-*"],
    borders: ["--forge-border-radius-*"],
    shadows: ["--forge-shadow-*"],
    transitions: ["--forge-transition-fast", "--forge-transition-normal"]
  },
  // Performance Guidelines
  performanceHints: [
    "debounce rapid clicks by default (300ms)",
    "lazy load when not in viewport for large button collections",
    "use CSS transforms for hover/active states instead of layout changes",
    "implement efficient ripple effect with requestAnimationFrame",
    "avoid excessive DOM manipulations during interactions"
  ],
  bundleImpact: "minimal",
  // Accessibility Guidelines
  a11yGuidelines: [
    "WCAG 2.1 AA compliant focus indicators",
    "Support both keyboard (Enter/Space) and mouse interactions",
    "Provide clear, descriptive button labels",
    "Include loading and disabled state announcements",
    "Maintain minimum 44px touch target size",
    "Support high contrast mode"
  ],
  ariaPatterns: [
    "aria-label for icon-only buttons",
    "aria-expanded for dropdown/menu triggers",
    "aria-controls for elements controlled by button",
    "aria-current for navigation states",
    "aria-busy during loading states"
  ],
  keyboardInteractions: [
    "Enter: Activate button action",
    "Space: Activate button action",
    "Tab: Move focus to next interactive element",
    "Shift+Tab: Move focus to previous interactive element"
  ],
  // Component Composition Patterns
  compositionPatterns: {
    "with-icons": "Use iconStart or iconEnd props, not nested icon elements for consistency",
    "in-forms": "Automatically handle form submission context and validation states",
    "in-modals": "Integrate with modal focus management and escape key handling",
    "in-toolbars": "Support toolbar keyboard navigation patterns",
    "as-menu-trigger": "Include proper ARIA attributes for dropdown menus"
  },
  childComponents: [],
  // Atomic component - no children
  parentComponents: ["forge-form-field", "forge-modal", "forge-toolbar", "forge-card"],
  // Testing Guidance
  testingPatterns: [
    "test click event handling",
    "test keyboard activation (Enter/Space)",
    "test loading state behavior",
    "test disabled state prevention",
    "test accessibility attributes",
    "test focus management",
    "test variant styling",
    "test responsive behavior"
  ],
  commonTestCases: [
    "should render with correct variant class",
    "should handle click events",
    "should be keyboard accessible",
    "should show loading spinner when loading=true",
    "should be non-interactive when disabled=true",
    "should emit proper events with correct detail",
    "should have proper ARIA attributes",
    "should meet WCAG 2.1 AA contrast requirements"
  ]
};
B.styles = M`
    :host {
      display: inline-block;
      --button-height-sm: 32px;
      --button-height-md: 40px;
      --button-height-lg: 48px;
      --button-padding-sm: 0 12px;
      --button-padding-md: 0 16px;
      --button-padding-lg: 0 20px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--forge-spacing-sm);
      font-family: var(--forge-font-family);
      font-size: var(--forge-font-size-base);
      font-weight: 500;
      border: none;
      border-radius: var(--forge-border-radius-md);
      cursor: pointer;
      transition: all var(--forge-transition-fast);
      width: 100%;
      height: var(--button-height-md);
      padding: var(--button-padding-md);
      position: relative;
      overflow: hidden;
    }

    /* Variants */
    .button--primary {
      background-color: var(--forge-color-primary-500);
      color: white;
    }

    .button--primary:hover:not(:disabled) {
      background-color: var(--forge-color-primary-600);
    }

    .button--secondary {
      background-color: transparent;
      color: var(--forge-color-primary-500);
      border: 1px solid var(--forge-color-primary-500);
    }

    .button--secondary:hover:not(:disabled) {
      background-color: var(--forge-color-primary-50);
    }

    .button--danger {
      background-color: var(--forge-color-error);
      color: white;
    }

    .button--danger:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    /* Sizes */
    .button--sm {
      height: var(--button-height-sm);
      padding: var(--button-padding-sm);
      font-size: var(--forge-font-size-sm);
    }

    .button--lg {
      height: var(--button-height-lg);
      padding: var(--button-padding-lg);
      font-size: var(--forge-font-size-lg);
    }

    /* States */
    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button--loading {
      color: transparent;
    }

    .spinner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Focus styles */
    .button:focus-visible {
      outline: 2px solid var(--forge-color-primary-500);
      outline-offset: 2px;
    }

    /* Ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
U([
  o({ type: String })
], B.prototype, "variant", 2);
U([
  o({ type: String })
], B.prototype, "size", 2);
U([
  o({ type: Boolean })
], B.prototype, "disabled", 2);
U([
  o({ type: Boolean })
], B.prototype, "loading", 2);
U([
  o({ type: String })
], B.prototype, "type", 2);
U([
  o({ type: Boolean })
], B.prototype, "fullWidth", 2);
U([
  o({ type: String })
], B.prototype, "iconStart", 2);
U([
  o({ type: String })
], B.prototype, "iconEnd", 2);
U([
  o({ type: String, attribute: "aria-label" })
], B.prototype, "ariaLabel", 2);
U([
  o({ type: String, attribute: "aria-controls" })
], B.prototype, "ariaControls", 2);
U([
  o({ type: String, attribute: "aria-expanded" })
], B.prototype, "ariaExpanded", 2);
U([
  o({ type: String, attribute: "aria-current" })
], B.prototype, "ariaCurrent", 2);
U([
  o({ type: String, attribute: "aria-selected" })
], B.prototype, "ariaSelected", 2);
U([
  o({ type: String })
], B.prototype, "role", 2);
U([
  o({ type: Number })
], B.prototype, "tabIndex", 2);
U([
  h()
], B.prototype, "ripples", 2);
U([
  h()
], B.prototype, "renderMetrics", 2);
B = U([
  O("forge-button")
], B);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = (e) => e ?? g;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ii } = Yt, ri = (e) => e.strings === void 0, ft = () => document.createComment(""), Me = (e, t, i) => {
  const r = e._$AA.parentNode, s = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const a = r.insertBefore(ft(), s), n = r.insertBefore(ft(), s);
    i = new ii(a, n, e, e.options);
  } else {
    const a = i._$AB.nextSibling, n = i._$AM, c = n !== e;
    if (c) {
      let d;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (d = e._$AU) !== n._$AU && i._$AP(d);
    }
    if (a !== s || c) {
      let d = i._$AA;
      for (; d !== a; ) {
        const m = d.nextSibling;
        r.insertBefore(d, s), d = m;
      }
    }
  }
  return i;
}, ve = (e, t, i = e) => (e._$AI(t, i), e), si = {}, St = (e, t = si) => e._$AH = t, oi = (e) => e._$AH, We = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = Re(class extends Pe {
  constructor(e) {
    if (super(e), e.type !== de.PROPERTY && e.type !== de.ATTRIBUTE && e.type !== de.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!ri(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === re || t === g) return t;
    const i = e.element, r = e.name;
    if (e.type === de.PROPERTY) {
      if (t === i[r]) return re;
    } else if (e.type === de.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(r)) return re;
    } else if (e.type === de.ATTRIBUTE && i.getAttribute(r) === t + "") return re;
    return St(e), t;
  }
});
var ni = Object.defineProperty, li = Object.getOwnPropertyDescriptor, S = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? li(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && ni(t, i, s), s;
};
let y = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Text data entry",
      context: "form",
      dataType: "text",
      criticality: "medium",
      semanticRole: "textbox"
    }, this.type = "text", this.value = "", this.placeholder = "", this.name = "", this.label = "", this.helperText = "", this.variant = "default", this.size = "md", this.validationState = "default", this.disabled = !1, this.readonly = !1, this.required = !1, this.clearable = !1, this.hasFocus = !1, this.renderMetrics = { time: 0, violations: 0 };
  }
  render() {
    const e = performance.now(), t = {
      "input-container": !0,
      [`input-container--${this.variant}`]: !0,
      [`input-container--${this.size}`]: !0,
      [`input-container--${this.validationState}`]: !0,
      "input-container--disabled": this.disabled,
      "input-container--focused": this.hasFocus
    }, i = {
      "helper-text": !0,
      [`helper-text--${this.validationState}`]: this.validationState !== "default"
    }, r = {
      label: !0,
      "label--required": this.required
    }, s = l`
      <div class="input-wrapper">
        ${this.label ? l`
          <label class=${W(r)} for="input">
            ${this.label}
          </label>
        ` : ""}
        
        <div class=${W(t)}>
          <slot name="prefix" class="prefix"></slot>
          
          <input
            class="input"
            id="input"
            type=${this.type}
            .value=${ai(this.value)}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            pattern=${X(this.pattern)}
            minlength=${X(this.minLength)}
            maxlength=${X(this.maxLength)}
            min=${X(this.min)}
            max=${X(this.max)}
            step=${X(this.step)}
            autocomplete=${X(this.autocomplete)}
            inputmode=${X(this.inputmode)}
            name=${this.name}
            aria-label=${this.label || this.placeholder}
            aria-invalid=${this.validationState === "error" ? "true" : "false"}
            aria-describedby=${this.helperText ? "helper-text" : void 0}
            aria-description=${this.ariaDescription || this.getDefaultAriaDescription()}
            data-semantic-role=${this.semanticRole || this.getDefaultSemanticRole()}
            data-ai-context=${this.aiContext || this.getDefaultAiContext()}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeydown}
          />
          
          ${this.clearable && this.value ? l`
            <button
              class="clear-button"
              @click=${this.handleClear}
              aria-label="Clear input"
              tabindex="-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          ` : ""}
          
          <slot name="suffix" class="suffix"></slot>
        </div>
        
        ${this.helperText ? l`
          <div class=${W(i)} id="helper-text">
            ${this.helperText}
          </div>
        ` : ""}
      </div>
    `, a = performance.now();
    return this.checkPerformance(a - e), this.devMode && this.showMetrics ? l`
        <div style="position: relative;">
          ${s}
          <div class="metrics-overlay">
            ${this.renderMetrics.time.toFixed(2)}ms
            ${this.renderMetrics.violations > 0 ? l`
              <span class="violation"> ⚠️ ${this.renderMetrics.violations}</span>
            ` : ""}
          </div>
        </div>
      ` : s;
  }
  handleInput(e) {
    const t = e.target;
    this.value = t.value, this.emit("input", { value: this.value }), (this.pattern || this.required || this.minLength || this.maxLength) && this.validateInput();
  }
  handleChange(e) {
    const t = e.target;
    this.value = t.value, this.emit("change", { value: this.value });
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("focus");
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("blur"), this.validateInput();
  }
  handleKeydown(e) {
    e.key === "Enter" && this.emit("enter", { value: this.value }), e.key === "Escape" && this.clearable && this.handleClear();
  }
  handleClear() {
    this.value = "", this.inputElement.value = "", this.emit("clear"), this.emit("input", { value: "" }), this.inputElement.focus();
  }
  validateInput() {
    if (!this.inputElement) return;
    const e = this.inputElement.validity;
    e.valid ? this.validationState === "error" && (this.validationState = "default", this.emit("validation-change", { state: "default", validity: e })) : this.validationState !== "error" && (this.validationState = "error", this.emit("validation-change", { state: "error", validity: e }));
  }
  // UVP Methods
  getDefaultSemanticRole() {
    switch (this.type) {
      case "email":
        return "email-input";
      case "password":
        return "password-input";
      case "search":
        return "search-input";
      case "number":
        return "numeric-input";
      case "tel":
        return "phone-input";
      case "url":
        return "url-input";
      default:
        return "text-input";
    }
  }
  getDefaultAiContext() {
    return this.required ? "required-field" : this.type === "password" ? "sensitive-data" : this.type === "email" ? "contact-information" : this.type === "search" ? "search-query" : "user-input";
  }
  getDefaultAriaDescription() {
    const e = [];
    return this.label && e.push(this.label), this.type !== "text" && e.push(`${this.type} input`), this.required && e.push("required"), this.disabled && e.push("disabled"), this.readonly && e.push("readonly"), this.validationState !== "default" && e.push(this.validationState), e.join(", ") || "Text input field";
  }
  checkPerformance(e) {
    this.renderMetrics.time = e, e > this.maxRenderMs && (this.renderMetrics.violations++, this.warnOnViolation && console.warn(`ForgeInput render exceeded budget: ${e.toFixed(2)}ms > ${this.maxRenderMs}ms`, {
      type: this.type,
      variant: this.variant,
      performanceMode: this.performanceMode
    }), this.performanceMode === "auto" && this.renderMetrics.violations > 3 && (this.performanceMode = "fast", console.info("ForgeInput: Switching to fast performance mode due to violations")));
  }
  updated(e) {
    super.updated(e), e.has("value") && this.updateComponentState("value", this.value), e.has("type") && (this.updateComponentState("type", this.type), this.aiMetadata.dataType = this.getAIDataType()), e.has("disabled") && this.updateComponentState("disabled", this.disabled), e.has("validationState") && this.updateComponentState("validationState", this.validationState), this.devMode && console.debug("ForgeInput state:", {
      type: this.type,
      value: this.value,
      variant: this.variant,
      validationState: this.validationState,
      disabled: this.disabled,
      semanticRole: this.semanticRole,
      aiContext: this.aiContext,
      renderTime: this.renderMetrics.time
    });
  }
  // AI metadata methods
  getAIDataType() {
    return {
      text: "text",
      password: "password",
      email: "email",
      number: "number",
      tel: "phone",
      url: "url",
      search: "text"
    }[this.type] || "text";
  }
  getPossibleActions() {
    return [
      {
        name: "input",
        description: "Enter text into the field",
        available: !this.disabled && !this.readonly
      },
      {
        name: "clear",
        description: "Clear the input value",
        available: !this.disabled && !this.readonly && !!this.value
      },
      {
        name: "focus",
        description: "Focus the input field",
        available: !this.disabled
      },
      {
        name: "validate",
        description: "Validate the input value",
        available: !0
      },
      {
        name: "showPassword",
        description: "Toggle password visibility",
        available: this.type === "password"
      }
    ];
  }
  explainState() {
    const e = [];
    this.disabled && e.push("disabled"), this.readonly && e.push("readonly"), this.value && e.push("filled"), this.value || e.push("empty"), this.validationState !== "default" && e.push(this.validationState);
    const t = e.join("-") || "default";
    return {
      currentState: t,
      possibleStates: ["default", "filled", "empty", "disabled", "readonly", "error", "warning", "success"],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return e.includes("disabled") ? "Input is disabled and cannot be edited" : e.includes("readonly") ? "Input is read-only" : e.includes("error") ? "Input has validation error" : e.includes("warning") ? "Input has validation warning" : e.includes("success") ? "Input value is valid" : e.includes("filled") ? `Input contains ${this.type} data` : e.includes("empty") ? "Input is empty and ready for data entry" : "Input field ready for data entry";
  }
  connectedCallback() {
    super.connectedCallback(), this.updateComponentState("type", this.type), this.updateComponentState("value", this.value), this.updateComponentState("disabled", this.disabled), this.updateComponentState("readonly", this.readonly), this.updateComponentState("validationState", this.validationState);
  }
  // Public methods
  focus() {
    this.inputElement?.focus();
  }
  blur() {
    this.inputElement?.blur();
  }
  select() {
    this.inputElement?.select();
  }
  setSelectionRange(e, t, i) {
    this.inputElement?.setSelectionRange(e, t, i);
  }
  checkValidity() {
    return this.inputElement?.checkValidity() ?? !0;
  }
  reportValidity() {
    return this.inputElement?.reportValidity() ?? !0;
  }
};
y.styles = M`
    :host {
      display: block;
      --input-height-sm: 32px;
      --input-height-md: 40px;
      --input-height-lg: 48px;
      --input-padding-sm: 8px;
      --input-padding-md: 12px;
      --input-padding-lg: 16px;
      --input-font-size-sm: var(--forge-font-size-sm);
      --input-font-size-md: var(--forge-font-size-base);
      --input-font-size-lg: var(--forge-font-size-lg);
    }

    .input-wrapper {
      position: relative;
      width: 100%;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: var(--forge-border-radius-md);
      transition: all var(--forge-transition-fast);
    }

    .input {
      flex: 1;
      border: none;
      background: transparent;
      font-family: var(--forge-font-family);
      font-size: var(--input-font-size-md);
      height: var(--input-height-md);
      padding: 0 var(--input-padding-md);
      outline: none;
      width: 100%;
      color: var(--forge-color-text, #000);
    }

    /* Variants */
    .input-container--default {
      border: 1px solid var(--forge-color-border, #d1d5db);
      background: var(--forge-color-surface, #fff);
    }

    .input-container--default:hover:not(.input-container--disabled) {
      border-color: var(--forge-color-primary-400);
    }

    .input-container--default:focus-within:not(.input-container--disabled) {
      border-color: var(--forge-color-primary-500);
      box-shadow: 0 0 0 3px var(--forge-color-primary-100);
    }

    .input-container--filled {
      background: var(--forge-color-gray-100, #f3f4f6);
      border: 1px solid transparent;
    }

    .input-container--filled:hover:not(.input-container--disabled) {
      background: var(--forge-color-gray-200, #e5e7eb);
    }

    .input-container--filled:focus-within:not(.input-container--disabled) {
      background: var(--forge-color-surface, #fff);
      border-color: var(--forge-color-primary-500);
      box-shadow: 0 0 0 3px var(--forge-color-primary-100);
    }

    .input-container--outlined {
      border: 2px solid var(--forge-color-border, #d1d5db);
      background: transparent;
    }

    .input-container--outlined:focus-within:not(.input-container--disabled) {
      border-color: var(--forge-color-primary-500);
    }

    /* Sizes */
    .input-container--sm .input {
      height: var(--input-height-sm);
      padding: 0 var(--input-padding-sm);
      font-size: var(--input-font-size-sm);
    }

    .input-container--lg .input {
      height: var(--input-height-lg);
      padding: 0 var(--input-padding-lg);
      font-size: var(--input-font-size-lg);
    }

    /* Validation States */
    .input-container--error {
      border-color: var(--forge-color-error);
    }

    .input-container--error:focus-within {
      box-shadow: 0 0 0 3px var(--forge-color-error-100);
    }

    .input-container--warning {
      border-color: var(--forge-color-warning);
    }

    .input-container--warning:focus-within {
      box-shadow: 0 0 0 3px var(--forge-color-warning-100);
    }

    .input-container--success {
      border-color: var(--forge-color-success);
    }

    .input-container--success:focus-within {
      box-shadow: 0 0 0 3px var(--forge-color-success-100);
    }

    /* Disabled State */
    .input-container--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .input-container--disabled .input {
      cursor: not-allowed;
    }

    /* Slots */
    .prefix, .suffix {
      display: flex;
      align-items: center;
      padding: 0 var(--input-padding-md);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    .prefix {
      border-right: 1px solid var(--forge-color-border, #d1d5db);
      margin-right: var(--forge-spacing-sm);
    }

    .suffix {
      border-left: 1px solid var(--forge-color-border, #d1d5db);
      margin-left: var(--forge-spacing-sm);
    }

    /* Helper Text */
    .helper-text {
      margin-top: var(--forge-spacing-xs);
      font-size: var(--forge-font-size-sm);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    .helper-text--error {
      color: var(--forge-color-error);
    }

    .helper-text--warning {
      color: var(--forge-color-warning);
    }

    .helper-text--success {
      color: var(--forge-color-success);
    }

    /* Label */
    .label {
      display: block;
      margin-bottom: var(--forge-spacing-xs);
      font-size: var(--forge-font-size-sm);
      font-weight: 500;
      color: var(--forge-color-text, #000);
    }

    .label--required::after {
      content: ' *';
      color: var(--forge-color-error);
    }

    /* Clear button */
    .clear-button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--forge-color-text-secondary);
      transition: color var(--forge-transition-fast);
    }

    .clear-button:hover {
      color: var(--forge-color-text);
    }

    /* Dev mode metrics */
    .metrics-overlay {
      position: absolute;
      top: -20px;
      right: 0;
      font-size: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 2px 4px;
      border-radius: 2px;
      z-index: 1000;
      pointer-events: none;
    }

    .metrics-overlay .violation {
      color: #ff6b6b;
    }
  `;
S([
  o({ type: String })
], y.prototype, "type", 2);
S([
  o({ type: String })
], y.prototype, "value", 2);
S([
  o({ type: String })
], y.prototype, "placeholder", 2);
S([
  o({ type: String })
], y.prototype, "name", 2);
S([
  o({ type: String })
], y.prototype, "label", 2);
S([
  o({ type: String, attribute: "helper-text" })
], y.prototype, "helperText", 2);
S([
  o({ type: String })
], y.prototype, "variant", 2);
S([
  o({ type: String })
], y.prototype, "size", 2);
S([
  o({ type: String, attribute: "validation-state" })
], y.prototype, "validationState", 2);
S([
  o({ type: Boolean })
], y.prototype, "disabled", 2);
S([
  o({ type: Boolean })
], y.prototype, "readonly", 2);
S([
  o({ type: Boolean })
], y.prototype, "required", 2);
S([
  o({ type: Boolean })
], y.prototype, "clearable", 2);
S([
  o({ type: String })
], y.prototype, "pattern", 2);
S([
  o({ type: Number })
], y.prototype, "minLength", 2);
S([
  o({ type: Number })
], y.prototype, "maxLength", 2);
S([
  o({ type: Number })
], y.prototype, "min", 2);
S([
  o({ type: Number })
], y.prototype, "max", 2);
S([
  o({ type: Number })
], y.prototype, "step", 2);
S([
  o({ type: String })
], y.prototype, "autocomplete", 2);
S([
  o({ type: String })
], y.prototype, "inputmode", 2);
S([
  h()
], y.prototype, "hasFocus", 2);
S([
  h()
], y.prototype, "renderMetrics", 2);
S([
  ne(".input")
], y.prototype, "inputElement", 2);
y = S([
  O("forge-input")
], y);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Qe extends Pe {
  constructor(t) {
    if (super(t), this.it = g, t.type !== de.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === g || t == null) return this._t = void 0, this.it = t;
    if (t === re) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
Qe.directiveName = "unsafeHTML", Qe.resultType = 1;
const di = Re(Qe);
class tt extends Error {
  constructor(t, i) {
    super(t), this.name = "ForgeError", this.component = i?.component, this.context = i, Error.captureStackTrace && Error.captureStackTrace(this, tt);
  }
}
function _t(e, t, i) {
  const r = {
    component: e,
    ...i
  };
  let s = `[${e}] ${t}`;
  return i?.received !== void 0 && (s += `
  Received: ${gt(i.received)}`), i?.expected !== void 0 && (s += `
  Expected: ${gt(i.expected)}`), i?.suggestion && (s += `
  💡 Suggestion: ${i.suggestion}`), i?.docs && (s += `
  📖 Docs: ${i.docs}`), new tt(s, r);
}
function gt(e) {
  return Array.isArray(e) ? `[${e.map((t) => JSON.stringify(t)).join(", ")}]` : typeof e == "object" && e !== null ? JSON.stringify(e, null, 2) : JSON.stringify(e);
}
function ci(e, t, i, r) {
  const s = {
    404: "Check that the URL is correct and the resource exists",
    403: "Check that you have permission to access this resource",
    401: "Authentication may be required",
    500: "The server encountered an error - try again later",
    503: "The server is temporarily unavailable - try again later"
  };
  throw _t(e, "Failed to fetch resource", {
    received: `${i} ${r}`,
    expected: "200 OK",
    suggestion: s[i] || "Check network connection and try again",
    docs: t
  });
}
function hi(e, t) {
  throw _t(e, "Invalid SVG content", {
    received: t || "Non-SVG content",
    expected: "Valid SVG markup",
    suggestion: "Ensure the file contains valid SVG XML with an <svg> root element"
  });
}
var pi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, q = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ui(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && pi(t, i, s), s;
};
let u = class extends f {
  constructor() {
    super(...arguments), this.size = "md", this.spin = !1, this.pulse = !1, this.ariaDescription = null, this.maxRenderMs = 16, this.warnOnViolation = !1, this.performanceMode = "auto", this.devMode = !1, this.showMetrics = !1, this.loading = !1, this.error = !1, this.renderTime = 0, this.renderCount = 0;
  }
  static registerIcon(e, t, i) {
    this.iconRegistry.set(e, { svg: t, viewBox: i });
  }
  static registerIcons(e) {
    Object.entries(e).forEach(([t, i]) => {
      typeof i == "string" ? this.registerIcon(t, i) : this.registerIcon(t, i.svg, i.viewBox);
    });
  }
  static async loadIconSet(e) {
    try {
      const i = await (await fetch(e)).json();
      this.registerIcons(i);
    } catch (t) {
      throw console.error("Failed to load icon set:", t), t;
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.updateAria();
  }
  firstUpdated() {
    const e = performance.now();
    if (this.name && u.iconRegistry.has(this.name)) {
      this.iconData = u.iconRegistry.get(this.name), this.error = !1, this.trackRenderPerformance(e);
      return;
    }
    this.name || this.src ? this.loadIcon() : this.trackRenderPerformance(e);
  }
  updated(e) {
    super.updated(e);
    const t = e.has("name"), i = e.has("src");
    if (!(e.has("name") && e.get("name") === void 0 || e.has("src") && e.get("src") === void 0) && (t || i))
      if (this.name && u.iconRegistry.has(this.name)) {
        const s = performance.now();
        this.iconData = u.iconRegistry.get(this.name), this.error = !1, this.trackRenderPerformance(s);
      } else (this.name || this.src) && this.loadIcon();
    (e.has("label") || e.has("semanticRole") || e.has("aiContext")) && this.updateAria();
  }
  async loadIcon() {
    const e = performance.now();
    if (this.name) {
      const t = u.iconRegistry.get(this.name);
      if (t) {
        this.iconData = t, this.error = !1, this.trackRenderPerformance(e);
        return;
      }
      this.src ? await this.loadFromUrl(this.src) : (this.error = !0, console.warn(`Icon "${this.name}" not found in registry`));
    } else this.src && await this.loadFromUrl(this.src);
    this.trackRenderPerformance(e);
  }
  async loadFromUrl(e) {
    const t = u.loadingIcons.get(e);
    if (t)
      try {
        this.iconData = await t, this.error = !1;
        return;
      } catch {
        this.error = !0;
        return;
      }
    const i = this.fetchIcon(e);
    u.loadingIcons.set(e, i);
    try {
      this.loading = !0, this.iconData = await i, this.error = !1, this.name && u.iconRegistry.set(this.name, this.iconData);
    } catch (r) {
      this.error = !0, console.error("Failed to load icon:", r);
    } finally {
      this.loading = !1, u.loadingIcons.delete(e);
    }
  }
  async fetchIcon(e) {
    const t = await fetch(e);
    t.ok || ci("ForgeIcon", e, t.status, t.statusText);
    const i = await t.text(), s = new DOMParser().parseFromString(i, "image/svg+xml"), a = s.querySelector("svg");
    if (!a) {
      const d = s.querySelector("parsererror"), m = d ? d.textContent : "No <svg> element found";
      hi("ForgeIcon", m || void 0);
    }
    const n = a.getAttribute("viewBox") || void 0;
    return { svg: a.innerHTML, viewBox: n };
  }
  updateAria() {
    const e = this.label ? "img" : "presentation";
    this.setAttribute("role", e), this.label ? this.setAttribute("aria-label", this.label) : this.removeAttribute("aria-label"), this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext);
  }
  trackRenderPerformance(e) {
    const t = performance.now();
    if (this.renderTime = t - e, this.renderCount++, this.renderTime > this.maxRenderMs) {
      const i = `Icon render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      this.warnOnViolation && console.warn(i, {
        component: "forge-icon",
        name: this.name,
        renderTime: this.renderTime,
        maxRenderMs: this.maxRenderMs,
        renderCount: this.renderCount
      }), this.performanceMode === "auto" && this.applyPerformanceDegradation();
    }
    this.devMode && console.log("Icon render metrics:", {
      component: "forge-icon",
      name: this.name,
      renderTime: this.renderTime,
      renderCount: this.renderCount,
      cacheHit: !!u.iconRegistry.get(this.name || "")
    });
  }
  applyPerformanceDegradation() {
    this.spin = !1, this.pulse = !1;
  }
  render() {
    const e = this.renderIcon(), t = this.showMetrics ? this.renderMetrics() : null;
    return l` ${t} ${e} `;
  }
  renderIcon() {
    if (this.loading)
      return this.renderLoading();
    if (this.error || !this.iconData)
      return this.renderError();
    const e = this.iconData.viewBox || "0 0 24 24";
    return l`
      <svg viewBox="${e}" xmlns="http://www.w3.org/2000/svg" part="svg">
        ${di(this.iconData.svg)}
      </svg>
    `;
  }
  renderLoading() {
    return l`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          opacity="0.3"
        />
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" stroke-width="2" fill="none">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    `;
  }
  renderError() {
    return l`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" />
      </svg>
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Icon: ${this.name || "custom"}<br />
        Render: ${this.renderTime.toFixed(2)}ms<br />
        Count: ${this.renderCount}<br />
        Cache: ${u.iconRegistry.size} icons
      </div>
    `;
  }
  getPossibleActions() {
    return [
      {
        name: "reload",
        description: "Reload icon from source",
        available: this.error && (!!this.name || !!this.src)
      },
      {
        name: "clearCache",
        description: "Clear icon from cache",
        available: !!this.name && u.iconRegistry.has(this.name)
      },
      {
        name: "startSpin",
        description: "Start spinning animation",
        available: !this.spin && !this.loading
      },
      {
        name: "stopSpin",
        description: "Stop spinning animation",
        available: this.spin
      },
      {
        name: "startPulse",
        description: "Start pulse animation",
        available: !this.pulse && !this.loading
      },
      {
        name: "stopPulse",
        description: "Stop pulse animation",
        available: this.pulse
      },
      {
        name: "focus",
        description: "Focus the icon",
        available: !0
      }
    ];
  }
  explainState() {
    const e = ["idle", "loading", "loaded", "error"];
    this.spin && e.push("spinning"), this.pulse && e.push("pulsing");
    let t = "idle";
    this.loading ? t = "loading" : this.error ? t = "error" : this.iconData && (t = "loaded");
    let i = "Icon component";
    return this.name ? i += ` displaying "${this.name}" icon` : this.src ? i += " loading from custom source" : i += " without icon specified", this.loading ? i += ", currently loading" : this.error ? i += ", failed to load" : this.iconData && (i += ", successfully loaded"), this.spin && (i += ", spinning animation active"), this.pulse && (i += ", pulse animation active"), !!(this.name && u.iconRegistry.has(this.name)) && (i += ", cached in registry"), {
      currentState: t,
      possibleStates: e,
      stateDescription: i
    };
  }
};
u.styles = M`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: currentColor;
      fill: currentColor;
      line-height: 1;
      flex-shrink: 0;
      max-width: 100%;
      vertical-align: middle;
    }

    :host([hidden]) {
      display: none !important;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: currentColor;
      stroke: currentColor;
    }

    /* Size variants */
    :host([size='xs']) {
      width: 16px;
      height: 16px;
    }

    :host([size='sm']) {
      width: 20px;
      height: 20px;
    }

    :host([size='md']) {
      width: 24px;
      height: 24px;
    }

    :host([size='lg']) {
      width: 32px;
      height: 32px;
    }

    :host([size='xl']) {
      width: 40px;
      height: 40px;
    }

    /* Spin animation */
    :host([spin]) svg {
      animation: forge-icon-spin 1s linear infinite;
    }

    @keyframes forge-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Pulse animation */
    :host([pulse]) svg {
      animation: forge-icon-pulse 2s ease-in-out infinite;
    }

    @keyframes forge-icon-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;
u.iconRegistry = /* @__PURE__ */ new Map();
u.loadingIcons = /* @__PURE__ */ new Map();
q([
  o({ type: String })
], u.prototype, "name", 2);
q([
  o({ type: String })
], u.prototype, "src", 2);
q([
  o({ type: String })
], u.prototype, "size", 2);
q([
  o({ type: Boolean })
], u.prototype, "spin", 2);
q([
  o({ type: Boolean })
], u.prototype, "pulse", 2);
q([
  o({ type: String })
], u.prototype, "label", 2);
q([
  o({ type: String, attribute: "semantic-role" })
], u.prototype, "semanticRole", 2);
q([
  o({ type: String, attribute: "ai-context" })
], u.prototype, "aiContext", 2);
q([
  o({ type: String, attribute: "aria-description" })
], u.prototype, "ariaDescription", 2);
q([
  o({ type: Number, attribute: "max-render-ms" })
], u.prototype, "maxRenderMs", 2);
q([
  o({ type: Boolean, attribute: "warn-on-violation" })
], u.prototype, "warnOnViolation", 2);
q([
  o({ type: String, attribute: "performance-mode" })
], u.prototype, "performanceMode", 2);
q([
  o({ type: Boolean, attribute: "dev-mode" })
], u.prototype, "devMode", 2);
q([
  o({ type: Boolean, attribute: "show-metrics" })
], u.prototype, "showMetrics", 2);
q([
  h()
], u.prototype, "iconData", 2);
q([
  h()
], u.prototype, "loading", 2);
q([
  h()
], u.prototype, "error", 2);
q([
  h()
], u.prototype, "renderTime", 2);
q([
  h()
], u.prototype, "renderCount", 2);
u = q([
  O("forge-icon")
], u);
const fi = {
  "chevron-down": '<path d="M6 9l6 6 6-6"/>',
  "chevron-up": '<path d="M18 15l-6-6-6 6"/>',
  "chevron-left": '<path d="M15 18l-6-6 6-6"/>',
  "chevron-right": '<path d="M9 18l6-6-6-6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 7.54l4.24 4.24m12.68 0l4.24 4.24M1.54 16.46l4.24-4.24"/>',
  "alert-circle": '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  expand_less: '<polyline points="18 15 12 9 6 15"/>',
  expand_more: '<polyline points="6 9 12 15 18 9"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  "chevron-double-left": '<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
  "chevron-double-right": '<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'
};
u.registerIcons(fi);
var gi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, j = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? mi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && gi(t, i, s), s;
};
let z = class extends f {
  constructor() {
    super(...arguments), this.severity = "info", this.variant = "standard", this.title = "", this.message = "", this.closable = !1, this.animateIn = !1, this.autoDismiss = 0, this.ariaDescription = null, this.maxRenderMs = 16, this.warnOnViolation = !1, this.performanceMode = "auto", this.devMode = !1, this.showMetrics = !1, this.closing = !1, this.renderTime = 0, this.renderCount = 0, this.iconMap = {
      info: "info",
      success: "check",
      warning: "alert-circle",
      error: "close"
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "alert"), this.setAttribute("aria-live", this.severity === "error" ? "assertive" : "polite"), this.animateIn && this.setAttribute("animate", ""), this.autoDismiss > 0 && this.startAutoDismiss(), this.updateAria();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.dismissTimer && clearTimeout(this.dismissTimer);
  }
  updated(e) {
    super.updated(e), e.has("severity") && this.setAttribute("aria-live", this.severity === "error" ? "assertive" : "polite"), e.has("autoDismiss") && this.autoDismiss > 0 && this.startAutoDismiss(), (e.has("semanticRole") || e.has("aiContext") || e.has("title") || e.has("message")) && this.updateAria();
  }
  updateAria() {
    this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext);
    const e = [this.title, this.message].filter(Boolean).join(". ");
    e && this.setAttribute("aria-label", e);
  }
  startAutoDismiss() {
    this.dismissTimer && clearTimeout(this.dismissTimer), this.dismissTimer = window.setTimeout(() => {
      this.close();
    }, this.autoDismiss);
  }
  async close() {
    const e = performance.now();
    this.closing = !0, this.setAttribute("closing", "");
    const t = new CustomEvent("close", {
      detail: { severity: this.severity },
      bubbles: !0,
      composed: !0,
      cancelable: !0
    });
    if (!this.dispatchEvent(t)) {
      this.closing = !1, this.removeAttribute("closing");
      return;
    }
    await new Promise((i) => setTimeout(i, 300)), this.remove(), this.trackRenderPerformance(e);
  }
  handleClose() {
    this.close();
  }
  getIcon() {
    return this.icon || this.iconMap[this.severity];
  }
  trackRenderPerformance(e) {
    const t = performance.now();
    if (this.renderTime = t - e, this.renderCount++, this.renderTime > this.maxRenderMs) {
      const i = `Alert render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      this.warnOnViolation && console.warn(i, {
        component: "forge-alert",
        severity: this.severity,
        renderTime: this.renderTime,
        maxRenderMs: this.maxRenderMs,
        renderCount: this.renderCount
      }), this.performanceMode === "auto" && this.applyPerformanceDegradation();
    }
    this.devMode && console.log("Alert render metrics:", {
      component: "forge-alert",
      severity: this.severity,
      renderTime: this.renderTime,
      renderCount: this.renderCount
    });
  }
  applyPerformanceDegradation() {
    this.animateIn = !1;
  }
  render() {
    const e = performance.now(), t = l`
      <div class="alert-container">
        <forge-icon 
          class="alert-icon"
          name="${this.getIcon()}"
          size="sm"
          aria-hidden="true">
        </forge-icon>
        
        <div class="alert-content">
          ${this.title ? l`<div class="alert-title">${this.title}</div>` : ""}
          ${this.message ? l`<div class="alert-message">${this.message}</div>` : ""}
          <slot></slot>
        </div>
        
        <div class="alert-actions">
          <slot name="actions"></slot>
          ${this.closable ? l`
            <button
              class="close-button"
              @click="${this.handleClose}"
              aria-label="Close alert"
              type="button">
              <forge-icon name="close" size="sm"></forge-icon>
            </button>
          ` : ""}
        </div>
      </div>
    `;
    return this.trackRenderPerformance(e), l`
      ${this.showMetrics ? this.renderMetrics() : ""}
      ${t}
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Alert: ${this.severity}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
  getPossibleActions() {
    return [
      {
        name: "close",
        description: "Close the alert",
        available: this.closable && !this.closing
      },
      {
        name: "focus",
        description: "Focus the alert",
        available: !0
      },
      {
        name: "acknowledge",
        description: "Acknowledge the alert message",
        available: !this.closing
      }
    ];
  }
  explainState() {
    const e = ["default", "closing"];
    this.autoDismiss > 0 && e.push("auto-dismissing");
    let t = "default";
    return this.closing ? t = "closing" : this.autoDismiss > 0 && (t = "auto-dismissing"), {
      currentState: t,
      possibleStates: e,
      stateDescription: `Alert with ${this.severity} severity${this.closing ? ", currently closing" : ""}${this.autoDismiss > 0 ? `, auto-dismissing in ${this.autoDismiss}ms` : ""}${this.closable ? ", user can close" : ", cannot be closed"}`
    };
  }
};
z.styles = M`
    :host {
      display: block;
      position: relative;
      border-radius: var(--forge-border-radius-md, 8px);
      padding: 12px 16px;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
      transition: all 0.3s ease;
    }

    :host([hidden]) {
      display: none !important;
    }

    .alert-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .alert-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .alert-content {
      flex: 1;
      min-width: 0;
    }

    .alert-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .alert-message {
      color: inherit;
      opacity: 0.9;
    }

    .alert-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .close-button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      color: inherit;
      opacity: 0.7;
    }

    .close-button:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.08);
    }

    .close-button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    /* Severity styles - Standard variant */
    :host([severity="info"][variant="standard"]) {
      background-color: #e3f2fd;
      color: #0d47a1;
      border: 1px solid #90caf9;
    }

    :host([severity="success"][variant="standard"]) {
      background-color: #e8f5e9;
      color: #1b5e20;
      border: 1px solid #81c784;
    }

    :host([severity="warning"][variant="standard"]) {
      background-color: #fff3e0;
      color: #e65100;
      border: 1px solid #ffb74d;
    }

    :host([severity="error"][variant="standard"]) {
      background-color: #ffebee;
      color: #b71c1c;
      border: 1px solid #ef5350;
    }

    /* Severity styles - Filled variant */
    :host([severity="info"][variant="filled"]) {
      background-color: #2196f3;
      color: white;
    }

    :host([severity="success"][variant="filled"]) {
      background-color: #4caf50;
      color: white;
    }

    :host([severity="warning"][variant="filled"]) {
      background-color: #ff9800;
      color: white;
    }

    :host([severity="error"][variant="filled"]) {
      background-color: #f44336;
      color: white;
    }

    :host([variant="filled"]) .close-button:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    /* Severity styles - Outlined variant */
    :host([severity="info"][variant="outlined"]) {
      background-color: transparent;
      color: #2196f3;
      border: 2px solid #2196f3;
    }

    :host([severity="success"][variant="outlined"]) {
      background-color: transparent;
      color: #4caf50;
      border: 2px solid #4caf50;
    }

    :host([severity="warning"][variant="outlined"]) {
      background-color: transparent;
      color: #ff9800;
      border: 2px solid #ff9800;
    }

    :host([severity="error"][variant="outlined"]) {
      background-color: transparent;
      color: #f44336;
      border: 2px solid #f44336;
    }

    /* Transitions */
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    :host([animate]) {
      animation: slideIn 0.3s ease-out;
    }

    :host([closing]) {
      animation: fadeOut 0.3s ease-out;
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;
j([
  o({ type: String })
], z.prototype, "severity", 2);
j([
  o({ type: String })
], z.prototype, "variant", 2);
j([
  o({ type: String })
], z.prototype, "title", 2);
j([
  o({ type: String })
], z.prototype, "message", 2);
j([
  o({ type: Boolean })
], z.prototype, "closable", 2);
j([
  o({ type: Boolean, attribute: "animate-in" })
], z.prototype, "animateIn", 2);
j([
  o({ type: Number, attribute: "auto-dismiss" })
], z.prototype, "autoDismiss", 2);
j([
  o({ type: String })
], z.prototype, "icon", 2);
j([
  o({ type: String, attribute: "semantic-role" })
], z.prototype, "semanticRole", 2);
j([
  o({ type: String, attribute: "ai-context" })
], z.prototype, "aiContext", 2);
j([
  o({ type: String, attribute: "aria-description" })
], z.prototype, "ariaDescription", 2);
j([
  o({ type: Number, attribute: "max-render-ms" })
], z.prototype, "maxRenderMs", 2);
j([
  o({ type: Boolean, attribute: "warn-on-violation" })
], z.prototype, "warnOnViolation", 2);
j([
  o({ type: String, attribute: "performance-mode" })
], z.prototype, "performanceMode", 2);
j([
  o({ type: Boolean, attribute: "dev-mode" })
], z.prototype, "devMode", 2);
j([
  o({ type: Boolean, attribute: "show-metrics" })
], z.prototype, "showMetrics", 2);
j([
  h()
], z.prototype, "closing", 2);
j([
  h()
], z.prototype, "renderTime", 2);
j([
  h()
], z.prototype, "renderCount", 2);
z = j([
  O("forge-alert")
], z);
var bi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, T = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? vi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && bi(t, i, s), s;
};
let $ = class extends f {
  constructor() {
    super(...arguments), this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.required = !1, this.error = !1, this.value = "on", this.label = "", this.description = "", this.size = "md", this.variant = "default", this.labelPosition = "end", this.ariaDescription = null, this.maxRenderMs = 16, this.warnOnViolation = !1, this.performanceMode = "auto", this.devMode = !1, this.showMetrics = !1, this.renderTime = 0, this.renderCount = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", this.getAriaChecked()), this.disabled && this.setAttribute("aria-disabled", "true"), this.updateAria();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("indeterminate")) && (this.setAttribute("aria-checked", this.getAriaChecked()), this.indeterminate && (this.checked = !1)), e.has("disabled") && (this.disabled ? this.setAttribute("aria-disabled", "true") : this.removeAttribute("aria-disabled")), (e.has("semanticRole") || e.has("aiContext") || e.has("label")) && this.updateAria();
  }
  getAriaChecked() {
    return this.indeterminate ? "mixed" : this.checked ? "true" : "false";
  }
  updateAria() {
    this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext), this.label && this.setAttribute("aria-label", this.label);
  }
  handleChange(e) {
    const t = performance.now(), i = e.target;
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    const r = this.checked, s = this.indeterminate;
    this.checked = i.checked, this.indeterminate = !1;
    const a = {
      checked: this.checked,
      value: this.value,
      previousChecked: r,
      previousIndeterminate: s
    };
    this.emit("change", a), this.emit("forge-change", a), this.trackRenderPerformance(t);
  }
  handleClick(e) {
    if (this.disabled) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    e.target !== this.input && this.input?.click();
  }
  handleKeyDown(e) {
    this.disabled || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.toggle());
  }
  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked, this.indeterminate = !1;
    const e = {
      checked: this.checked,
      value: this.value
    };
    this.emit("change", e), this.emit("forge-change", e);
  }
  reset() {
    this.checked = !1, this.indeterminate = !1, this.error = !1;
  }
  trackRenderPerformance(e) {
    const t = performance.now();
    if (this.renderTime = t - e, this.renderCount++, this.renderTime > this.maxRenderMs) {
      const i = `Checkbox render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      this.warnOnViolation && console.warn(i, {
        component: "forge-checkbox",
        checked: this.checked,
        renderTime: this.renderTime,
        maxRenderMs: this.maxRenderMs,
        renderCount: this.renderCount
      }), this.performanceMode;
    }
    this.devMode && console.log("Checkbox render metrics:", {
      component: "forge-checkbox",
      checked: this.checked,
      renderTime: this.renderTime,
      renderCount: this.renderCount
    });
  }
  render() {
    const e = performance.now(), t = this.indeterminate ? "minus" : "check", i = l`
      <div class="checkbox-wrapper" @click="${this.handleClick}">
        <input
          type="checkbox"
          class="checkbox-input"
          .checked="${this.checked}"
          .indeterminate="${this.indeterminate}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          .value="${this.value}"
          name="${X(this.name)}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          aria-describedby="${this.description ? "description" : ""}"
        />
        <span class="checkbox-control" part="control">
          <forge-icon 
            class="checkbox-icon"
            name="${t}"
            size="sm"
            aria-hidden="true">
          </forge-icon>
        </span>
        ${this.label || this.description ? l`
          <div class="checkbox-label-wrapper">
            ${this.label ? l`
              <label class="checkbox-label" part="label">
                ${this.label}
                ${this.required ? l`<span class="required-indicator">*</span>` : ""}
              </label>
            ` : ""}
            ${this.description ? l`
              <span id="description" class="checkbox-description" part="description">
                ${this.description}
              </span>
            ` : ""}
          </div>
        ` : ""}
      </div>
    `;
    return this.trackRenderPerformance(e), l`
      ${this.showMetrics ? this.renderMetrics() : ""}
      ${i}
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Checkbox: ${this.checked ? "checked" : "unchecked"}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
  getPossibleActions() {
    return [
      {
        name: "toggle",
        description: "Toggle checked state",
        available: !this.disabled && !this.indeterminate
      },
      {
        name: "check",
        description: "Set to checked",
        available: !this.disabled && !this.checked
      },
      {
        name: "uncheck",
        description: "Set to unchecked",
        available: !this.disabled && this.checked
      },
      {
        name: "setIndeterminate",
        description: "Set to indeterminate state",
        available: !this.disabled && !this.indeterminate
      },
      {
        name: "reset",
        description: "Reset to default state",
        available: this.checked || this.indeterminate || this.error
      },
      {
        name: "focus",
        description: "Focus the checkbox",
        available: !this.disabled
      },
      {
        name: "validate",
        description: "Validate required state",
        available: this.required
      }
    ];
  }
  explainState() {
    const e = ["unchecked", "checked", "indeterminate"];
    this.error && e.push("error"), this.disabled && e.push("disabled");
    let t = "unchecked";
    this.indeterminate ? t = "indeterminate" : this.checked && (t = "checked"), this.disabled ? t = "disabled" : this.error && (t = "error");
    let i = `Checkbox with ${this.variant} variant`;
    return this.checked ? i += ", currently checked" : this.indeterminate ? i += ", in indeterminate state" : i += ", currently unchecked", this.disabled && (i += ", disabled"), this.required && (i += ", required field"), this.error && (i += ", has validation error"), this.label && (i += `, labeled: ${this.label}`), {
      currentState: t,
      possibleStates: e,
      stateDescription: i
    };
  }
};
$.styles = M`
    :host {
      display: inline-flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      user-select: none;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
      gap: 8px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none !important;
    }

    .checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkbox-control {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size);
      height: var(--size);
      border-radius: var(--forge-border-radius-sm, 4px);
      border: 2px solid var(--forge-color-border, #d1d5db);
      background-color: var(--forge-color-background, #ffffff);
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    /* Size variants */
    :host([size="sm"]) .checkbox-control {
      --size: 16px;
    }

    :host([size="md"]) .checkbox-control {
      --size: 20px;
    }

    :host([size="lg"]) .checkbox-control {
      --size: 24px;
    }

    /* Hover state */
    :host(:not([disabled]):hover) .checkbox-control {
      border-color: var(--forge-color-primary, #3b82f6);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    /* Focus state */
    .checkbox-input:focus-visible ~ .checkbox-control {
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* Checked state */
    :host([checked]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
      border-color: var(--forge-color-primary, #3b82f6);
    }

    :host([checked]) .checkbox-icon {
      color: white;
      opacity: 1;
      transform: scale(1);
    }

    /* Indeterminate state */
    :host([indeterminate]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
      border-color: var(--forge-color-primary, #3b82f6);
    }

    :host([indeterminate]) .checkbox-icon {
      color: white;
      opacity: 1;
    }

    /* Variant: Filled */
    :host([variant="filled"]) .checkbox-control {
      background-color: var(--forge-color-surface-variant, #f3f4f6);
      border-color: transparent;
    }

    :host([variant="filled"][checked]) .checkbox-control,
    :host([variant="filled"][indeterminate]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
    }

    /* Variant: Outlined */
    :host([variant="outlined"]) .checkbox-control {
      border-width: 2px;
      background-color: transparent;
    }

    :host([variant="outlined"][checked]) .checkbox-control,
    :host([variant="outlined"][indeterminate]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
      border-color: var(--forge-color-primary, #3b82f6);
    }

    /* Error state */
    :host([error]) .checkbox-control {
      border-color: var(--forge-color-error, #ef4444);
    }

    :host([error]:hover) .checkbox-control {
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }

    .checkbox-icon {
      position: absolute;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.2s ease;
      pointer-events: none;
    }

    .checkbox-label {
      color: var(--forge-color-text, #1f2937);
      cursor: pointer;
    }

    :host([disabled]) .checkbox-label {
      cursor: not-allowed;
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    :host([label-position="start"]) .checkbox-wrapper {
      flex-direction: row-reverse;
    }

    .checkbox-description {
      display: block;
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin-top: 2px;
    }

    /* Required indicator */
    .required-indicator {
      color: var(--forge-color-error, #ef4444);
      margin-left: 4px;
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;
T([
  o({ type: Boolean, reflect: !0 })
], $.prototype, "checked", 2);
T([
  o({ type: Boolean, reflect: !0 })
], $.prototype, "indeterminate", 2);
T([
  o({ type: Boolean, reflect: !0 })
], $.prototype, "disabled", 2);
T([
  o({ type: Boolean })
], $.prototype, "required", 2);
T([
  o({ type: Boolean, reflect: !0 })
], $.prototype, "error", 2);
T([
  o({ type: String })
], $.prototype, "name", 2);
T([
  o({ type: String })
], $.prototype, "value", 2);
T([
  o({ type: String })
], $.prototype, "label", 2);
T([
  o({ type: String })
], $.prototype, "description", 2);
T([
  o({ type: String, reflect: !0 })
], $.prototype, "size", 2);
T([
  o({ type: String, reflect: !0 })
], $.prototype, "variant", 2);
T([
  o({ type: String, attribute: "label-position", reflect: !0 })
], $.prototype, "labelPosition", 2);
T([
  o({ type: String, attribute: "semantic-role" })
], $.prototype, "semanticRole", 2);
T([
  o({ type: String, attribute: "ai-context" })
], $.prototype, "aiContext", 2);
T([
  o({ type: String, attribute: "aria-description" })
], $.prototype, "ariaDescription", 2);
T([
  o({ type: Number, attribute: "max-render-ms" })
], $.prototype, "maxRenderMs", 2);
T([
  o({ type: Boolean, attribute: "warn-on-violation" })
], $.prototype, "warnOnViolation", 2);
T([
  o({ type: String, attribute: "performance-mode" })
], $.prototype, "performanceMode", 2);
T([
  o({ type: Boolean, attribute: "dev-mode" })
], $.prototype, "devMode", 2);
T([
  o({ type: Boolean, attribute: "show-metrics" })
], $.prototype, "showMetrics", 2);
T([
  ne(".checkbox-input")
], $.prototype, "input", 2);
T([
  h()
], $.prototype, "renderTime", 2);
T([
  h()
], $.prototype, "renderCount", 2);
$ = T([
  O("forge-checkbox")
], $);
var yi = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, E = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? xi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && yi(t, i, s), s;
};
let C = class extends f {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.position = "inline", this.count = 0, this.maxCount = 99, this.dot = !1, this.outlined = !1, this.pulse = !1, this.invisible = !1, this.content = "", this.ariaDescription = null, this.maxRenderMs = 16, this.warnOnViolation = !1, this.performanceMode = "auto", this.devMode = !1, this.showMetrics = !1, this.renderTime = 0, this.renderCount = 0, this.previousCount = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "status"), this.setAttribute("aria-live", "polite"), this.updateAria();
  }
  updated(e) {
    super.updated(e), e.has("count") && (this.previousCount = e.get("count") ?? 0, this.updateAriaLabel(), this.animateCountChange()), e.has("invisible") && this.setAttribute("aria-hidden", this.invisible ? "true" : "false"), (e.has("semanticRole") || e.has("aiContext") || e.has("content")) && this.updateAria();
  }
  updateAria() {
    this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext), this.updateAriaLabel();
  }
  updateAriaLabel() {
    let e = "";
    this.dot ? e = "Status indicator" : this.count > 0 ? e = `${this.getDisplayCount()} ${this.variant} notifications` : this.content && (e = `${this.content} badge`), e && this.setAttribute("aria-label", e);
  }
  getDisplayCount() {
    return this.count > this.maxCount ? `${this.maxCount}+` : this.count.toString();
  }
  animateCountChange() {
    if (this.count !== this.previousCount && !this.dot) {
      const e = this.shadowRoot?.querySelector(".badge");
      e && (e.style.transform = "scale(1.2)", setTimeout(() => {
        e.style.transform = "";
      }, 200));
    }
  }
  show() {
    this.invisible = !1;
  }
  hide() {
    this.invisible = !0;
  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count > 0 && this.count--;
  }
  reset() {
    this.count = 0, this.invisible = !1;
  }
  trackRenderPerformance(e) {
    const t = performance.now();
    if (this.renderTime = t - e, this.renderCount++, this.renderTime > this.maxRenderMs) {
      const i = `Badge render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      this.warnOnViolation && console.warn(i, {
        component: "forge-badge",
        variant: this.variant,
        renderTime: this.renderTime,
        maxRenderMs: this.maxRenderMs,
        renderCount: this.renderCount
      }), this.performanceMode === "auto" && (this.pulse = !1);
    }
    this.devMode && console.log("Badge render metrics:", {
      component: "forge-badge",
      variant: this.variant,
      count: this.count,
      renderTime: this.renderTime,
      renderCount: this.renderCount
    });
  }
  render() {
    const e = performance.now(), t = this.dot ? "" : this.content || (this.count > 0 ? this.getDisplayCount() : ""), i = l`
      <div class="badge-container">
        <slot></slot>
        ${!this.invisible || this.dot || t ? l`
          <span class="badge" part="badge">
            ${t}
          </span>
        ` : ""}
      </div>
    `;
    return this.trackRenderPerformance(e), l`
      ${this.showMetrics ? this.renderMetrics() : ""}
      ${i}
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Badge: ${this.variant}<br>
        Count: ${this.count}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
  getPossibleActions() {
    return [
      {
        name: "show",
        description: "Show the badge",
        available: this.invisible
      },
      {
        name: "hide",
        description: "Hide the badge",
        available: !this.invisible
      },
      {
        name: "increment",
        description: "Increment the count",
        available: !this.dot && this.count < 999
      },
      {
        name: "decrement",
        description: "Decrement the count",
        available: !this.dot && this.count > 0
      },
      {
        name: "reset",
        description: "Reset count to zero and show badge",
        available: this.count > 0 || this.invisible
      },
      {
        name: "focus",
        description: "Focus the badge",
        available: !0
      }
    ];
  }
  explainState() {
    const e = ["visible", "hidden"];
    this.dot && e.push("dot-indicator"), this.pulse && e.push("pulsing"), this.count > 0 && e.push("counting");
    let t = this.invisible ? "hidden" : "visible";
    this.dot ? t = "dot-indicator" : this.count > 0 && (t = "counting");
    let i = `Badge with ${this.variant} variant`;
    return this.dot ? i += ", showing as dot indicator" : this.count > 0 ? i += `, displaying count: ${this.getDisplayCount()}` : this.content && (i += `, displaying content: ${this.content}`), i += this.invisible ? ", currently hidden" : ", currently visible", this.pulse && (i += ", pulsing animation active"), {
      currentState: t,
      possibleStates: e,
      stateDescription: i
    };
  }
};
C.styles = M`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([position="inline"]) {
      display: inline-flex;
    }

    .badge-container {
      position: relative;
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border-radius: var(--forge-border-radius-full, 9999px);
      white-space: nowrap;
      transition: all 0.2s ease;
      line-height: 1;
    }

    /* Position variants */
    :host(:not([position="inline"])) .badge {
      position: absolute;
      z-index: 1;
    }

    :host([position="top-right"]) .badge {
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    :host([position="top-left"]) .badge {
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }

    :host([position="bottom-right"]) .badge {
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }

    :host([position="bottom-left"]) .badge {
      bottom: 0;
      left: 0;
      transform: translate(-50%, 50%);
    }

    /* Size variants */
    :host([size="sm"]) .badge {
      font-size: 10px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
    }

    :host([size="md"]) .badge {
      font-size: 12px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
    }

    :host([size="lg"]) .badge {
      font-size: 14px;
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
    }

    /* Dot mode (no content) */
    :host([dot]) .badge {
      padding: 0;
      min-width: auto;
    }

    :host([dot][size="sm"]) .badge {
      width: 8px;
      height: 8px;
    }

    :host([dot][size="md"]) .badge {
      width: 10px;
      height: 10px;
    }

    :host([dot][size="lg"]) .badge {
      width: 12px;
      height: 12px;
    }

    /* Color variants */
    :host([variant="default"]) .badge {
      background-color: var(--forge-color-neutral, #6b7280);
      color: white;
    }

    :host([variant="primary"]) .badge {
      background-color: var(--forge-color-primary, #3b82f6);
      color: white;
    }

    :host([variant="success"]) .badge {
      background-color: var(--forge-color-success, #10b981);
      color: white;
    }

    :host([variant="warning"]) .badge {
      background-color: var(--forge-color-warning, #f59e0b);
      color: white;
    }

    :host([variant="error"]) .badge {
      background-color: var(--forge-color-error, #ef4444);
      color: white;
    }

    :host([variant="info"]) .badge {
      background-color: var(--forge-color-info, #3b82f6);
      color: white;
    }

    /* Outlined style */
    :host([outlined]) .badge {
      background-color: transparent;
      border: 2px solid;
    }

    :host([outlined][variant="default"]) .badge {
      border-color: var(--forge-color-neutral, #6b7280);
      color: var(--forge-color-neutral, #6b7280);
    }

    :host([outlined][variant="primary"]) .badge {
      border-color: var(--forge-color-primary, #3b82f6);
      color: var(--forge-color-primary, #3b82f6);
    }

    :host([outlined][variant="success"]) .badge {
      border-color: var(--forge-color-success, #10b981);
      color: var(--forge-color-success, #10b981);
    }

    :host([outlined][variant="warning"]) .badge {
      border-color: var(--forge-color-warning, #f59e0b);
      color: var(--forge-color-warning, #f59e0b);
    }

    :host([outlined][variant="error"]) .badge {
      border-color: var(--forge-color-error, #ef4444);
      color: var(--forge-color-error, #ef4444);
    }

    :host([outlined][variant="info"]) .badge {
      border-color: var(--forge-color-info, #3b82f6);
      color: var(--forge-color-info, #3b82f6);
    }

    /* Pulse animation */
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 currentColor;
      }
      70% {
        box-shadow: 0 0 0 6px transparent;
      }
      100% {
        box-shadow: 0 0 0 0 transparent;
      }
    }

    :host([pulse]) .badge {
      animation: pulse 2s infinite;
    }

    /* Invisible state (for accessibility) */
    :host([invisible]) .badge {
      visibility: hidden;
    }

    ::slotted(*) {
      display: block;
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;
E([
  o({ type: String, reflect: !0 })
], C.prototype, "variant", 2);
E([
  o({ type: String, reflect: !0 })
], C.prototype, "size", 2);
E([
  o({ type: String, reflect: !0 })
], C.prototype, "position", 2);
E([
  o({ type: Number })
], C.prototype, "count", 2);
E([
  o({ type: Number, attribute: "max-count" })
], C.prototype, "maxCount", 2);
E([
  o({ type: Boolean, reflect: !0 })
], C.prototype, "dot", 2);
E([
  o({ type: Boolean, reflect: !0 })
], C.prototype, "outlined", 2);
E([
  o({ type: Boolean, reflect: !0 })
], C.prototype, "pulse", 2);
E([
  o({ type: Boolean, reflect: !0 })
], C.prototype, "invisible", 2);
E([
  o({ type: String })
], C.prototype, "content", 2);
E([
  o({ type: String, attribute: "semantic-role" })
], C.prototype, "semanticRole", 2);
E([
  o({ type: String, attribute: "ai-context" })
], C.prototype, "aiContext", 2);
E([
  o({ type: String, attribute: "aria-description" })
], C.prototype, "ariaDescription", 2);
E([
  o({ type: Number, attribute: "max-render-ms" })
], C.prototype, "maxRenderMs", 2);
E([
  o({ type: Boolean, attribute: "warn-on-violation" })
], C.prototype, "warnOnViolation", 2);
E([
  o({ type: String, attribute: "performance-mode" })
], C.prototype, "performanceMode", 2);
E([
  o({ type: Boolean, attribute: "dev-mode" })
], C.prototype, "devMode", 2);
E([
  o({ type: Boolean, attribute: "show-metrics" })
], C.prototype, "showMetrics", 2);
E([
  h()
], C.prototype, "renderTime", 2);
E([
  h()
], C.prototype, "renderCount", 2);
E([
  h()
], C.prototype, "previousCount", 2);
C = E([
  O("forge-badge")
], C);
var wi = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, ee = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? $i(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && wi(t, i, s), s;
};
let Q = class extends f {
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.loading = !1, this.required = !1, this.error = !1, this.value = "on", this.label = "", this.description = "", this.onLabel = "", this.offLabel = "", this.size = "md", this.labelPosition = "end", this.aiMetadata = {
      purpose: "Toggle binary state",
      dataType: "boolean",
      criticality: "medium",
      semanticRole: "switch"
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "switch"), this.setAttribute("aria-checked", String(this.checked)), this.disabled && this.setAttribute("aria-disabled", "true"), this.updateAria();
  }
  updated(e) {
    super.updated(e), e.has("checked") && this.setAttribute("aria-checked", String(this.checked)), e.has("disabled") && (this.disabled ? this.setAttribute("aria-disabled", "true") : this.removeAttribute("aria-disabled")), e.has("loading") && this.setAttribute("aria-busy", String(this.loading)), e.has("label") && this.updateAria();
  }
  updateAria() {
    this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext), this.label && this.setAttribute("aria-label", this.label);
  }
  handleChange(e) {
    const t = performance.now();
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }
    const i = e.target, r = this.checked;
    this.checked = i.checked;
    const s = {
      checked: this.checked,
      value: this.value,
      previousChecked: r
    };
    this.emit("change", s), this.emit("forge-change", s), this.checkPerformance(t);
  }
  handleClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    e.target !== this.input && this.input?.click();
  }
  handleKeyDown(e) {
    this.disabled || this.loading || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.toggle());
  }
  toggle() {
    if (this.disabled || this.loading) return;
    this.checked = !this.checked;
    const e = {
      checked: this.checked,
      value: this.value
    };
    this.emit("change", e), this.emit("forge-change", e);
  }
  reset() {
    this.checked = !1, this.error = !1, this.loading = !1;
  }
  // ADR-014 AI helper method overrides
  getPossibleActions() {
    return [
      {
        name: "toggle",
        description: "Toggle the switch on/off",
        available: !this.disabled && !this.loading
      },
      {
        name: "reset",
        description: "Reset switch to off state",
        available: !0
      }
    ];
  }
  explainState() {
    return {
      currentState: this.loading ? "loading" : this.disabled ? "disabled" : this.checked ? "on" : "off",
      possibleStates: ["off", "on", "disabled", "loading"],
      stateDescription: this.loading ? "Switch is processing change" : this.disabled ? "Switch is disabled and cannot be changed" : this.checked ? "Switch is turned on" : "Switch is turned off"
    };
  }
  getAIDescription() {
    const e = this.checked ? "on" : "off";
    return `${this.label || "Toggle switch"} - currently ${e}${this.disabled ? " (disabled)" : ""}${this.loading ? " (loading)" : ""}`;
  }
  applyPerformanceDegradation() {
    const e = this.shadowRoot?.querySelector(".switch-track"), t = this.shadowRoot?.querySelector(".switch-thumb");
    e && (e.style.transition = "none"), t && (t.style.transition = "none");
  }
  render() {
    const e = performance.now(), t = l`
      <div class="switch-wrapper" @click="${this.handleClick}">
        <input
          type="checkbox"
          class="switch-input"
          .checked="${this.checked}"
          .disabled="${this.disabled || this.loading}"
          .required="${this.required}"
          .value="${this.value}"
          name="${X(this.name)}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          aria-describedby="${this.description ? "description" : ""}"
        />
        <div class="switch-track" part="track">
          ${this.onLabel || this.offLabel ? l`
            <span class="switch-state-label on">${this.onLabel}</span>
            <span class="switch-state-label off">${this.offLabel}</span>
          ` : ""}
          <div class="switch-thumb" part="thumb"></div>
        </div>
        ${this.label || this.description ? l`
          <div class="switch-label-wrapper">
            ${this.label ? l`
              <label class="switch-label" part="label">
                ${this.label}
                ${this.required ? l`<span class="required-indicator">*</span>` : ""}
              </label>
            ` : ""}
            ${this.description ? l`
              <span id="description" class="switch-description" part="description">
                ${this.description}
              </span>
            ` : ""}
          </div>
        ` : ""}
      </div>
    `;
    return this.checkPerformance(e), l`
      ${this.showMetrics ? this.renderMetrics() : ""}
      ${t}
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Switch: ${this.checked ? "on" : "off"}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
};
Q.styles = M`
      :host {
        display: inline-flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        user-select: none;
        font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
        font-size: var(--forge-font-size-md, 14px);
        line-height: 1.5;
        gap: 12px;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host([label-position="top"]),
      :host([label-position="bottom"]) {
        flex-direction: column;
        align-items: flex-start;
      }

      .switch-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 12px;
      }

      .switch-input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .switch-track {
        position: relative;
        display: inline-block;
        border-radius: 9999px;
        background-color: var(--forge-color-neutral-400, #9ca3af);
        transition: all 0.3s ease;
        cursor: pointer;
      }

      /* Size variants */
      :host([size="sm"]) .switch-track {
        width: 36px;
        height: 20px;
      }

      :host([size="md"]) .switch-track {
        width: 44px;
        height: 24px;
      }

      :host([size="lg"]) .switch-track {
        width: 52px;
        height: 28px;
      }

      .switch-thumb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: white;
        border-radius: 50%;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      /* Thumb size variants */
      :host([size="sm"]) .switch-thumb {
        width: 16px;
        height: 16px;
        left: 2px;
      }

      :host([size="md"]) .switch-thumb {
        width: 20px;
        height: 20px;
        left: 2px;
      }

      :host([size="lg"]) .switch-thumb {
        width: 24px;
        height: 24px;
        left: 2px;
      }

      /* Checked state */
      :host([checked]) .switch-track {
        background-color: var(--forge-color-primary, #3b82f6);
      }

      :host([checked][size="sm"]) .switch-thumb {
        left: calc(100% - 18px);
      }

      :host([checked][size="md"]) .switch-thumb {
        left: calc(100% - 22px);
      }

      :host([checked][size="lg"]) .switch-thumb {
        left: calc(100% - 26px);
      }

      /* Loading state */
      :host([loading]) .switch-thumb {
        opacity: 0.6;
      }

      :host([loading]) .switch-thumb::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        border: 2px solid var(--forge-color-primary, #3b82f6);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }

      /* Hover state */
      :host(:not([disabled]):hover) .switch-track {
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }

      /* Focus state */
      .switch-input:focus-visible ~ .switch-track {
        outline: 2px solid var(--forge-color-primary, #3b82f6);
        outline-offset: 2px;
      }

      /* Error state */
      :host([error]) .switch-track {
        background-color: var(--forge-color-error, #ef4444);
      }

      :host([error]:not([checked])) .switch-track {
        background-color: var(--forge-color-error-light, #fca5a5);
      }

      /* Label positioning */
      :host([label-position="start"]) .switch-wrapper {
        flex-direction: row-reverse;
      }

      :host([label-position="top"]) .switch-wrapper {
        flex-direction: column;
      }

      :host([label-position="bottom"]) .switch-wrapper {
        flex-direction: column-reverse;
      }

      .switch-label {
        color: var(--forge-color-text, #1f2937);
        cursor: pointer;
      }

      :host([disabled]) .switch-label {
        cursor: not-allowed;
        color: var(--forge-color-text-disabled, #9ca3af);
      }

      .switch-description {
        display: block;
        font-size: var(--forge-font-size-sm, 12px);
        color: var(--forge-color-text-secondary, #6b7280);
        margin-top: 2px;
      }

      .switch-state-label {
        position: absolute;
        font-size: 10px;
        font-weight: 600;
        color: white;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([size="sm"]) .switch-state-label {
        display: none;
      }

      .switch-state-label.on {
        left: 6px;
        opacity: 0;
      }

      .switch-state-label.off {
        right: 6px;
        opacity: 1;
      }

      :host([checked]) .switch-state-label.on {
        opacity: 1;
      }

      :host([checked]) .switch-state-label.off {
        opacity: 0;
      }

      /* Required indicator */
      .required-indicator {
        color: var(--forge-color-error, #ef4444);
        margin-left: 4px;
      }

      /* Performance overlay */
      .performance-overlay {
        position: fixed;
        top: 4px;
        left: 4px;
        background: rgba(0, 0, 0, 0.8);
        color: #00ff00;
        padding: 4px 8px;
        font-family: monospace;
        font-size: 10px;
        border-radius: 4px;
        z-index: 10000;
        pointer-events: none;
      }

      .performance-overlay.warning {
        color: #ffff00;
      }

      .performance-overlay.error {
        color: #ff0000;
      }
    `;
ee([
  o({ type: Boolean, reflect: !0 })
], Q.prototype, "checked", 2);
ee([
  o({ type: Boolean, reflect: !0 })
], Q.prototype, "disabled", 2);
ee([
  o({ type: Boolean, reflect: !0 })
], Q.prototype, "loading", 2);
ee([
  o({ type: Boolean })
], Q.prototype, "required", 2);
ee([
  o({ type: Boolean, reflect: !0 })
], Q.prototype, "error", 2);
ee([
  o({ type: String })
], Q.prototype, "name", 2);
ee([
  o({ type: String })
], Q.prototype, "value", 2);
ee([
  o({ type: String })
], Q.prototype, "label", 2);
ee([
  o({ type: String })
], Q.prototype, "description", 2);
ee([
  o({ type: String, attribute: "on-label" })
], Q.prototype, "onLabel", 2);
ee([
  o({ type: String, attribute: "off-label" })
], Q.prototype, "offLabel", 2);
ee([
  o({ type: String, reflect: !0 })
], Q.prototype, "size", 2);
ee([
  o({ type: String, attribute: "label-position", reflect: !0 })
], Q.prototype, "labelPosition", 2);
ee([
  ne(".switch-input")
], Q.prototype, "input", 2);
Q = ee([
  O("forge-switch")
], Q);
var ki = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, te = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Si(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && ki(t, i, s), s;
};
let K = class extends f {
  constructor() {
    super(), this.value = "", this.label = "", this.description = "", this.options = [], this.disabled = !1, this.required = !1, this.error = !1, this.errorMessage = "", this.orientation = "vertical", this.labelPosition = "end", this.size = "md", this.focusedIndex = -1, this.groupId = Math.random().toString(36).substr(2, 9), this.aiMetadata = {
      purpose: "Select single option from multiple choices",
      dataType: "text",
      criticality: "medium",
      semanticRole: "radiogroup"
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "radiogroup"), this.disabled && this.setAttribute("aria-disabled", "true"), this.required && this.setAttribute("aria-required", "true"), this.updateAria();
  }
  updated(e) {
    super.updated(e), e.has("disabled") && (this.disabled ? this.setAttribute("aria-disabled", "true") : this.removeAttribute("aria-disabled")), e.has("required") && (this.required ? this.setAttribute("aria-required", "true") : this.removeAttribute("aria-required")), (e.has("error") || e.has("errorMessage")) && (this.error ? (this.setAttribute("aria-invalid", "true"), this.errorMessage && this.setAttribute("aria-errormessage", "error-message")) : (this.removeAttribute("aria-invalid"), this.removeAttribute("aria-errormessage"))), e.has("label") && this.updateAria();
  }
  updateAria() {
    this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext), this.label && this.setAttribute("aria-label", this.label);
  }
  handleChange(e) {
    const t = performance.now();
    if (this.disabled) return;
    const i = this.value;
    this.value = e;
    const r = {
      value: this.value,
      previousValue: i,
      option: this.options.find((s) => s.value === e)
    };
    this.emit("change", r), this.emit("forge-change", r), this.checkPerformance(t);
  }
  handleKeyDown(e) {
    if (this.disabled) return;
    const t = this.options.filter((a) => !a.disabled);
    if (t.length === 0) return;
    let i = t.findIndex((a) => a.value === this.value);
    i === -1 && (i = 0);
    let r = i, s = !1;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        r = (i + 1) % t.length, s = !0;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        r = i === 0 ? t.length - 1 : i - 1, s = !0;
        break;
      case "Home":
        r = 0, s = !0;
        break;
      case "End":
        r = t.length - 1, s = !0;
        break;
      case " ":
      case "Enter":
        this.focusedIndex >= 0 && this.focusedIndex < t.length && this.handleChange(t[this.focusedIndex].value), s = !0;
        break;
    }
    if (s && (e.preventDefault(), e.key !== " " && e.key !== "Enter")) {
      this.handleChange(t[r].value), this.focusedIndex = r;
      const a = this.shadowRoot?.querySelectorAll(".radio-input:not([disabled])");
      a && a[r] && a[r].focus();
    }
  }
  reset() {
    this.value = "", this.error = !1, this.errorMessage = "";
  }
  validate() {
    return this.required && !this.value ? (this.error = !0, this.errorMessage = "Please select an option", !1) : (this.error = !1, this.errorMessage = "", !0);
  }
  selectOption(e) {
    const t = this.options.find((i) => i.value === e);
    t && !t.disabled && this.handleChange(e);
  }
  // ADR-014 AI helper method overrides
  getPossibleActions() {
    return [
      {
        name: "selectOption",
        description: "Select a specific radio option",
        available: !this.disabled && this.options.some((e) => !e.disabled)
      },
      {
        name: "reset",
        description: "Clear the selection",
        available: !0
      },
      {
        name: "validate",
        description: "Validate the current selection",
        available: !0
      }
    ];
  }
  explainState() {
    const e = this.options.find((i) => i.value === this.value);
    return {
      currentState: this.disabled ? "disabled" : this.error ? "error" : this.value ? "selected" : "unselected",
      possibleStates: ["unselected", "selected", "disabled", "error"],
      stateDescription: this.disabled ? "Radio group is disabled" : this.error ? `Radio group has error: ${this.errorMessage}` : e ? `Selected: ${e.label}` : "No option selected"
    };
  }
  getAIDescription() {
    const e = this.options.find((r) => r.value === this.value), t = this.label || "Radio group", i = e ? e.label : "none";
    return `${t} - ${this.options.length} options, selected: ${i}${this.disabled ? " (disabled)" : ""}${this.error ? ` (error: ${this.errorMessage})` : ""}`;
  }
  applyPerformanceDegradation() {
    (this.shadowRoot?.querySelectorAll(".radio-item")).forEach((t) => {
      t.style.transition = "none";
    });
  }
  render() {
    const e = performance.now(), t = l`
      ${this.label ? l`
        <label class="radio-group-label" part="label">
          ${this.label}
          ${this.required ? l`<span class="required-indicator">*</span>` : ""}
        </label>
      ` : ""}
      ${this.description ? l`
        <span class="radio-group-description" part="description">
          ${this.description}
        </span>
      ` : ""}
      <div 
        class="radio-group" 
        part="group"
        @keydown="${this.handleKeyDown}"
      >
        ${this.options.map((i, r) => l`
          <label 
            class="radio-item" 
            part="radio-item"
            ?disabled="${i.disabled || this.disabled}"
          >
            <input
              type="radio"
              class="radio-input"
              name="${X(this.name || `radio-group-${this.groupId}`)}"
              value="${i.value}"
              .checked="${this.value === i.value}"
              ?disabled="${i.disabled || this.disabled}"
              @change="${() => this.handleChange(i.value)}"
              @focus="${() => this.focusedIndex = r}"
              aria-describedby="${i.description ? `option-desc-${r}` : ""}"
            />
            <span class="radio-control" part="control"></span>
            <div class="radio-label-wrapper">
              <span class="radio-label" part="option-label">
                ${i.label}
              </span>
              ${i.description ? l`
                <span 
                  id="option-desc-${r}" 
                  class="radio-option-description" 
                  part="option-description"
                >
                  ${i.description}
                </span>
              ` : ""}
            </div>
          </label>
        `)}
      </div>
      ${this.error && this.errorMessage ? l`
        <span id="error-message" class="error-message" part="error" role="alert">
          ${this.errorMessage}
        </span>
      ` : ""}
    `;
    return this.checkPerformance(e), l`
      ${this.showMetrics ? this.renderMetrics() : ""}
      ${t}
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Radio Group: ${this.value || "none"}<br>
        Options: ${this.options.length}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
};
K.styles = M`
    :host {
      display: block;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none !important;
    }

    .radio-group {
      display: flex;
      gap: var(--forge-spacing-md, 16px);
    }

    :host([orientation="vertical"]) .radio-group {
      flex-direction: column;
    }

    :host([orientation="horizontal"]) .radio-group {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .radio-group-label {
      display: block;
      font-weight: 500;
      margin-bottom: var(--forge-spacing-sm, 8px);
      color: var(--forge-color-text, #1f2937);
    }

    .radio-group-description {
      display: block;
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin-bottom: var(--forge-spacing-sm, 8px);
    }

    .radio-item {
      display: flex;
      align-items: flex-start;
      gap: var(--forge-spacing-xs, 8px);
      cursor: pointer;
      position: relative;
    }

    .radio-item[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([label-position="start"]) .radio-item {
      flex-direction: row-reverse;
    }

    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .radio-control {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      border: 2px solid var(--forge-color-border, #d1d5db);
      background-color: var(--forge-color-bg, #ffffff);
      transition: all 0.2s ease;
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* Size variants */
    :host([size="sm"]) .radio-control {
      width: 16px;
      height: 16px;
    }

    :host([size="md"]) .radio-control {
      width: 20px;
      height: 20px;
    }

    :host([size="lg"]) .radio-control {
      width: 24px;
      height: 24px;
    }

    .radio-control::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
      background-color: var(--forge-color-primary, #3b82f6);
      transition: transform 0.2s ease;
    }

    /* Size variants for inner dot */
    :host([size="sm"]) .radio-control::after {
      width: 6px;
      height: 6px;
    }

    :host([size="md"]) .radio-control::after {
      width: 8px;
      height: 8px;
    }

    :host([size="lg"]) .radio-control::after {
      width: 10px;
      height: 10px;
    }

    /* Checked state */
    .radio-input:checked ~ .radio-control {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    .radio-input:checked ~ .radio-control::after {
      transform: translate(-50%, -50%) scale(1);
    }

    /* Hover state */
    .radio-item:not([disabled]):hover .radio-control {
      border-color: var(--forge-color-primary, #3b82f6);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    /* Focus state */
    .radio-input:focus-visible ~ .radio-control {
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* Error state */
    :host([error]) .radio-control {
      border-color: var(--forge-color-error, #ef4444);
    }

    :host([error]) .radio-input:checked ~ .radio-control::after {
      background-color: var(--forge-color-error, #ef4444);
    }

    .radio-label {
      cursor: pointer;
      color: var(--forge-color-text, #1f2937);
      user-select: none;
    }

    .radio-item[disabled] .radio-label {
      cursor: not-allowed;
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    .radio-label-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .radio-option-description {
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    /* Required indicator */
    .required-indicator {
      color: var(--forge-color-error, #ef4444);
      margin-left: 4px;
    }

    /* Error message */
    .error-message {
      color: var(--forge-color-error, #ef4444);
      font-size: var(--forge-font-size-sm, 12px);
      margin-top: var(--forge-spacing-xs, 4px);
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;
te([
  o({ type: String })
], K.prototype, "value", 2);
te([
  o({ type: String })
], K.prototype, "name", 2);
te([
  o({ type: String })
], K.prototype, "label", 2);
te([
  o({ type: String })
], K.prototype, "description", 2);
te([
  o({ type: Array })
], K.prototype, "options", 2);
te([
  o({ type: Boolean, reflect: !0 })
], K.prototype, "disabled", 2);
te([
  o({ type: Boolean })
], K.prototype, "required", 2);
te([
  o({ type: Boolean, reflect: !0 })
], K.prototype, "error", 2);
te([
  o({ type: String, attribute: "error-message" })
], K.prototype, "errorMessage", 2);
te([
  o({ type: String, reflect: !0 })
], K.prototype, "orientation", 2);
te([
  o({ type: String, attribute: "label-position", reflect: !0 })
], K.prototype, "labelPosition", 2);
te([
  o({ type: String, reflect: !0 })
], K.prototype, "size", 2);
te([
  h()
], K.prototype, "focusedIndex", 2);
te([
  ne(".radio-group")
], K.prototype, "radioGroup", 2);
K = te([
  O("forge-radio-group")
], K);
var _i = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, I = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ci(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && _i(t, i, s), s;
};
let A = class extends f {
  constructor() {
    super(), this.value = "", this.label = "", this.description = "", this.placeholder = "Select an option", this.options = [], this.disabled = !1, this.required = !1, this.error = !1, this.errorMessage = "", this.searchable = !1, this.loading = !1, this.open = !1, this.size = "md", this.variant = "default", this.searchQuery = "", this.focusedIndex = -1, this.filteredOptions = [], this.handleTriggerClick = () => {
      this.disabled || this.loading || (this.open ? this.close() : this.openDropdown());
    }, this.handleKeyDown = (e) => {
      if (this.disabled || this.loading) return;
      (!this.filteredOptions || this.filteredOptions.length === 0) && (this.filteredOptions = this.options || []);
      const t = this.filteredOptions.filter((r) => !r.disabled);
      if (t.length === 0) return;
      let i = !1;
      switch (e.key) {
        case "Enter":
        case " ":
          if (!this.open)
            this.openDropdown();
          else if (this.focusedIndex >= 0) {
            const r = t[this.focusedIndex];
            r && this.selectOption(r.value);
          }
          i = !0;
          break;
        case "Escape":
          this.open && (this.close(), this.trigger?.focus()), i = !0;
          break;
        case "ArrowDown":
          this.open ? (this.focusedIndex = Math.min(this.focusedIndex + 1, t.length - 1), this.focusedIndex === -1 && (this.focusedIndex = 0), this.scrollToFocused()) : this.openDropdown(), i = !0;
          break;
        case "ArrowUp":
          this.open && (this.focusedIndex = Math.max(this.focusedIndex - 1, 0), this.scrollToFocused()), i = !0;
          break;
        case "Home":
          this.open && (this.focusedIndex = 0, this.scrollToFocused()), i = !0;
          break;
        case "End":
          this.open && (this.focusedIndex = t.length - 1, this.scrollToFocused()), i = !0;
          break;
      }
      i && (e.preventDefault(), e.stopPropagation());
    }, this.handleSearch = (e) => {
      const t = e.target;
      this.searchQuery = t.value.toLowerCase(), this.searchQuery && this.options ? this.filteredOptions = this.options.filter(
        (i) => i.label.toLowerCase().includes(this.searchQuery) || i.value.toLowerCase().includes(this.searchQuery)
      ) : this.filteredOptions = this.options || [], this.focusedIndex = -1;
    }, this.renderSelectOptions = (e) => e.map((t, i) => {
      const r = this.filteredOptions.indexOf(t), s = t.value === this.value, a = r === this.focusedIndex;
      return l`
        <div
          class="select-option"
          part="option"
          role="option"
          ?selected="${s}"
          ?focused="${a}"
          ?disabled="${t.disabled}"
          aria-selected="${s}"
          @click="${() => !t.disabled && this.selectOption(t.value)}"
          @mouseenter="${() => !t.disabled && (this.focusedIndex = r)}"
        >
          ${t.label}
        </div>
      `;
    }), this.aiMetadata = {
      purpose: "Select single option from dropdown list",
      dataType: "text",
      criticality: "medium",
      semanticRole: "combobox"
    }, this.filteredOptions = [], this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "combobox"), this.setAttribute("aria-haspopup", "listbox"), this.setAttribute("aria-expanded", String(this.open)), this.disabled && this.setAttribute("aria-disabled", "true"), this.required && this.setAttribute("aria-required", "true"), this.updateAria(), this.filteredOptions = this.options || [], document.addEventListener("click", this.handleDocumentClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this.handleDocumentClick);
  }
  updated(e) {
    super.updated(e), e.has("open") && (this.setAttribute("aria-expanded", String(this.open)), this.open && this.searchable && setTimeout(() => this.searchInput?.focus(), 50)), e.has("disabled") && (this.disabled ? this.setAttribute("aria-disabled", "true") : this.removeAttribute("aria-disabled")), e.has("options") && (this.filteredOptions = this.options, this.searchQuery = ""), (e.has("error") || e.has("errorMessage")) && (this.error ? (this.setAttribute("aria-invalid", "true"), this.errorMessage && this.setAttribute("aria-errormessage", "error-message")) : (this.removeAttribute("aria-invalid"), this.removeAttribute("aria-errormessage"))), e.has("label") && this.updateAria();
  }
  updateAria() {
    this.ariaDescription && this.setAttribute("aria-description", this.ariaDescription), this.semanticRole && this.setAttribute("data-semantic-role", this.semanticRole), this.aiContext && this.setAttribute("data-ai-context", this.aiContext), this.label && this.setAttribute("aria-label", this.label);
  }
  handleDocumentClick(e) {
    this.contains(e.target) || this.close();
  }
  scrollToFocused() {
    requestAnimationFrame(() => {
      const e = this.shadowRoot?.querySelectorAll(".select-option");
      e && e[this.focusedIndex] && e[this.focusedIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    });
  }
  openDropdown() {
    this.disabled || this.loading || (this.open = !0, (!this.filteredOptions || this.filteredOptions.length === 0) && (this.filteredOptions = this.options || []), this.options && this.options.length > 0 ? (this.focusedIndex = this.options.findIndex((e) => e.value === this.value), this.focusedIndex === -1 && (this.focusedIndex = 0)) : this.focusedIndex = -1, this.emit("open"));
  }
  close() {
    this.open = !1, this.searchQuery = "", this.filteredOptions = this.options || [], this.focusedIndex = -1, this.emit("close");
  }
  selectOption(e) {
    const t = this.options.find((s) => s.value === e);
    if (!t || t.disabled) return;
    const i = this.value;
    this.value = e, this.close();
    const r = {
      value: this.value,
      previousValue: i,
      option: t
    };
    this.emit("change", r), this.emit("forge-change", r);
  }
  reset() {
    this.value = "", this.error = !1, this.errorMessage = "", this.searchQuery = "", this.filteredOptions = this.options || [];
  }
  validate() {
    return this.required && !this.value ? (this.error = !0, this.errorMessage = "Please select an option", !1) : (this.error = !1, this.errorMessage = "", !0);
  }
  // ADR-014 AI helper method overrides
  getPossibleActions() {
    return [
      {
        name: "openDropdown",
        description: "Open the dropdown menu",
        available: !this.disabled && !this.loading && !this.open
      },
      {
        name: "close",
        description: "Close the dropdown menu",
        available: this.open
      },
      {
        name: "selectOption",
        description: "Select a specific option",
        available: !this.disabled && !this.loading
      },
      {
        name: "reset",
        description: "Clear the selection",
        available: !0
      },
      {
        name: "validate",
        description: "Validate the current selection",
        available: !0
      }
    ];
  }
  explainState() {
    const e = this.options.find((i) => i.value === this.value);
    return {
      currentState: this.disabled ? "disabled" : this.loading ? "loading" : this.open ? "open" : this.error ? "error" : this.value ? "selected" : "unselected",
      possibleStates: ["unselected", "selected", "open", "disabled", "loading", "error"],
      stateDescription: this.disabled ? "Select is disabled" : this.loading ? "Select is loading" : this.open ? "Dropdown is open" : this.error ? `Select has error: ${this.errorMessage}` : e ? `Selected: ${e.label}` : "No option selected"
    };
  }
  getAIDescription() {
    const e = this.options.find((r) => r.value === this.value), t = this.label || "Select dropdown", i = e ? e.label : "none";
    return `${t} - ${this.options.length} options, selected: ${i}${this.disabled ? " (disabled)" : ""}${this.loading ? " (loading)" : ""}${this.error ? ` (error: ${this.errorMessage})` : ""}`;
  }
  applyPerformanceDegradation() {
    const e = this.shadowRoot?.querySelector(".select-dropdown");
    e && (e.style.transition = "none");
  }
  render() {
    const e = performance.now(), t = this.options.find((s) => s.value === this.value), i = [...new Set(this.filteredOptions.map((s) => s.group).filter(Boolean))], r = l`
      <div class="select-wrapper">
        ${this.label ? l`
          <label class="select-label" part="label">
            ${this.label}
            ${this.required ? l`<span class="required-indicator">*</span>` : ""}
          </label>
        ` : ""}
        ${this.description ? l`
          <span class="select-description" part="description">
            ${this.description}
          </span>
        ` : ""}
        
        <button
          class="select-trigger"
          part="trigger"
          type="button"
          ?disabled="${this.disabled || this.loading}"
          @click="${this.handleTriggerClick}"
          @keydown="${this.handleKeyDown}"
          aria-labelledby="${this.label ? "label" : ""}"
          aria-describedby="${this.description ? "description" : ""}"
        >
          <span class="select-value">
            ${t ? l`<span>${t.label}</span>` : l`<span class="select-placeholder">${this.placeholder}</span>`}
          </span>
          <span class="select-icon" part="icon">
            ${this.loading ? l`
              <span class="loading-spinner"></span>
            ` : l`
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `}
          </span>
        </button>
        
        <div 
          class="select-dropdown" 
          part="dropdown"
          role="listbox"
          aria-label="${this.label || "Options"}"
        >
          ${this.searchable ? l`
            <div class="select-search" part="search">
              <input
                type="text"
                class="select-search-input"
                part="search-input"
                placeholder="Search..."
                .value="${this.searchQuery}"
                @input="${this.handleSearch}"
                @keydown="${(s) => s.stopPropagation()}"
              />
            </div>
          ` : ""}
          
          <div class="select-options" part="options">
            ${this.filteredOptions.length === 0 ? l`
              <div class="select-no-results" part="no-results">
                No options found
              </div>
            ` : i.length > 0 ? i.map((s) => l`
                <div class="select-group" part="group">
                  ${s ? l`
                    <div class="select-group-label" part="group-label">${s}</div>
                  ` : ""}
                  ${this.renderSelectOptions(this.filteredOptions.filter((a) => a.group === s))}
                </div>
              `) : this.renderSelectOptions(this.filteredOptions)}
          </div>
        </div>
        
        ${this.error && this.errorMessage ? l`
          <span id="error-message" class="error-message" part="error" role="alert">
            ${this.errorMessage}
          </span>
        ` : ""}
      </div>
    `;
    return this.checkPerformance(e), l`
      ${this.showMetrics ? this.renderMetrics() : ""}
      ${r}
    `;
  }
  renderMetrics() {
    const e = this.renderTime > this.maxRenderMs ? "error" : this.renderTime > this.maxRenderMs * 0.75 ? "warning" : "";
    return l`
      <div class="performance-overlay ${e}">
        Select: ${this.value || "none"}<br>
        Options: ${this.options.length}<br>
        Filtered: ${this.filteredOptions.length}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
};
A.styles = M`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
      width: 100%;
      max-width: 320px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none !important;
    }

    .select-wrapper {
      position: relative;
      width: 100%;
    }

    .select-label {
      display: block;
      font-weight: 500;
      margin-bottom: var(--forge-spacing-xs, 4px);
      color: var(--forge-color-text, #1f2937);
    }

    .select-description {
      display: block;
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin-bottom: var(--forge-spacing-xs, 4px);
    }

    .select-trigger {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      border: 1px solid var(--forge-color-border, #d1d5db);
      border-radius: var(--forge-radius-md, 6px);
      background-color: var(--forge-color-bg, #ffffff);
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      color: var(--forge-color-text, #1f2937);
    }

    /* Size variants */
    :host([size="sm"]) .select-trigger {
      height: 32px;
      font-size: var(--forge-font-size-sm, 12px);
      padding: 0 10px;
    }

    :host([size="md"]) .select-trigger {
      height: 40px;
    }

    :host([size="lg"]) .select-trigger {
      height: 48px;
      font-size: var(--forge-font-size-lg, 16px);
      padding: 0 14px;
    }

    /* Variant styles */
    :host([variant="filled"]) .select-trigger {
      background-color: var(--forge-color-bg-secondary, #f3f4f6);
      border-color: transparent;
    }

    :host([variant="outlined"]) .select-trigger {
      border-width: 2px;
    }

    .select-trigger:hover:not([disabled]) {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    .select-trigger:focus-visible {
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    :host([open]) .select-trigger {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    :host([disabled]) .select-trigger {
      cursor: not-allowed;
      background-color: var(--forge-color-bg-disabled, #f9fafb);
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    :host([error]) .select-trigger {
      border-color: var(--forge-color-error, #ef4444);
    }

    .select-value {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-placeholder {
      color: var(--forge-color-text-placeholder, #9ca3af);
    }

    .select-icon {
      display: flex;
      align-items: center;
      margin-left: 8px;
      transition: transform 0.2s ease;
      color: var(--forge-color-text-secondary, #6b7280);
    }

    :host([open]) .select-icon {
      transform: rotate(180deg);
    }

    .select-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 280px;
      overflow-y: auto;
      background-color: var(--forge-color-bg, #ffffff);
      border: 1px solid var(--forge-color-border, #d1d5db);
      border-radius: var(--forge-radius-md, 6px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    }

    :host([open]) .select-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .select-search {
      position: sticky;
      top: 0;
      padding: 8px;
      background-color: var(--forge-color-bg, #ffffff);
      border-bottom: 1px solid var(--forge-color-border, #e5e7eb);
      z-index: 1;
    }

    .select-search-input {
      width: 100%;
      padding: 6px 10px;
      border: 1px solid var(--forge-color-border, #d1d5db);
      border-radius: var(--forge-radius-sm, 4px);
      font-family: inherit;
      font-size: var(--forge-font-size-sm, 12px);
      outline: none;
    }

    .select-search-input:focus {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    .select-options {
      padding: 4px;
    }

    .select-option {
      padding: 8px 12px;
      cursor: pointer;
      border-radius: var(--forge-radius-sm, 4px);
      transition: background-color 0.15s ease;
      display: flex;
      align-items: center;
      color: var(--forge-color-text, #1f2937);
    }

    .select-option:hover:not([disabled]) {
      background-color: var(--forge-color-bg-hover, #f3f4f6);
    }

    .select-option[selected] {
      background-color: var(--forge-color-primary-light, #dbeafe);
      color: var(--forge-color-primary, #3b82f6);
      font-weight: 500;
    }

    .select-option[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    .select-option[focused] {
      background-color: var(--forge-color-bg-hover, #f3f4f6);
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: -2px;
    }

    .select-group {
      margin-top: 8px;
    }

    .select-group:first-child {
      margin-top: 0;
    }

    .select-group-label {
      padding: 4px 12px;
      font-size: var(--forge-font-size-xs, 11px);
      font-weight: 600;
      text-transform: uppercase;
      color: var(--forge-color-text-secondary, #6b7280);
      letter-spacing: 0.05em;
    }

    .select-no-results {
      padding: 16px;
      text-align: center;
      color: var(--forge-color-text-secondary, #6b7280);
      font-size: var(--forge-font-size-sm, 12px);
    }

    /* Required indicator */
    .required-indicator {
      color: var(--forge-color-error, #ef4444);
      margin-left: 4px;
    }

    /* Error message */
    .error-message {
      color: var(--forge-color-error, #ef4444);
      font-size: var(--forge-font-size-sm, 12px);
      margin-top: var(--forge-spacing-xs, 4px);
    }

    /* Loading state */
    :host([loading]) .select-trigger {
      pointer-events: none;
    }

    .loading-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid var(--forge-color-border, #d1d5db);
      border-top-color: var(--forge-color-primary, #3b82f6);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;
I([
  o({ type: String })
], A.prototype, "value", 2);
I([
  o({ type: String })
], A.prototype, "name", 2);
I([
  o({ type: String })
], A.prototype, "label", 2);
I([
  o({ type: String })
], A.prototype, "description", 2);
I([
  o({ type: String })
], A.prototype, "placeholder", 2);
I([
  o({ type: Array })
], A.prototype, "options", 2);
I([
  o({ type: Boolean, reflect: !0 })
], A.prototype, "disabled", 2);
I([
  o({ type: Boolean })
], A.prototype, "required", 2);
I([
  o({ type: Boolean, reflect: !0 })
], A.prototype, "error", 2);
I([
  o({ type: String, attribute: "error-message" })
], A.prototype, "errorMessage", 2);
I([
  o({ type: Boolean })
], A.prototype, "searchable", 2);
I([
  o({ type: Boolean, reflect: !0 })
], A.prototype, "loading", 2);
I([
  o({ type: Boolean, reflect: !0 })
], A.prototype, "open", 2);
I([
  o({ type: String, reflect: !0 })
], A.prototype, "size", 2);
I([
  o({ type: String, reflect: !0 })
], A.prototype, "variant", 2);
I([
  h()
], A.prototype, "searchQuery", 2);
I([
  h()
], A.prototype, "focusedIndex", 2);
I([
  h()
], A.prototype, "filteredOptions", 2);
I([
  ne(".select-trigger")
], A.prototype, "trigger", 2);
I([
  ne(".select-dropdown")
], A.prototype, "dropdown", 2);
I([
  ne(".select-search-input")
], A.prototype, "searchInput", 2);
A = I([
  O("forge-select")
], A);
var Ai = Object.defineProperty, Di = Object.getOwnPropertyDescriptor, $e = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Di(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Ai(t, i, s), s;
};
let pe = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Progress indication and loading state visualization",
      context: "status",
      dataType: "number",
      criticality: "medium",
      semanticRole: "progressbar"
    }, this.value = 0, this.max = 100, this.variant = "primary", this.size = "medium", this.indeterminate = !1, this.ariaLabel = "";
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.setAttribute("role", "progressbar"), this.updateAccessibilityAttributes();
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("max") || e.has("indeterminate")) && this.updateAccessibilityAttributes();
  }
  updateAccessibilityAttributes() {
    this.indeterminate ? (this.removeAttribute("aria-valuenow"), this.removeAttribute("aria-valuetext"), this.setAttribute("aria-valuemin", "0"), this.setAttribute("aria-valuemax", this.max.toString())) : (this.setAttribute("aria-valuenow", this.value.toString()), this.setAttribute("aria-valuemin", "0"), this.setAttribute("aria-valuemax", this.max.toString()), this.setAttribute("aria-valuetext", `${this.value} of ${this.max}`)), this.ariaLabel && this.setAttribute("aria-label", this.ariaLabel);
  }
  getProgressPercentage() {
    return this.indeterminate ? 0 : Math.min(Math.max(this.value / this.max * 100, 0), 100);
  }
  render() {
    const e = {
      "progress-fill": !0,
      "progress-fill--indeterminate": this.indeterminate
    }, t = this.indeterminate ? "" : `width: ${this.getProgressPercentage()}%`;
    return l`
      <div class="progress-container" part="container">
        <div class="progress-track" part="track">
          <div 
            class=${W(e)} 
            part="fill"
            style=${t}
          ></div>
        </div>
        ${this.renderLabel()}
      </div>
    `;
  }
  renderLabel() {
    const e = this.innerHTML && this.innerHTML.trim();
    return !e && !this.indeterminate ? l`
        <div class="progress-label" part="label">
          ${this.value}%
        </div>
      ` : e ? l`
        <div class="progress-label" part="label">
          <slot></slot>
        </div>
      ` : "";
  }
  /**
   * Updates the progress value
   * @param value New progress value
   */
  updateProgress(e) {
    this.value = Math.min(Math.max(e, 0), this.max);
  }
  /**
   * Sets the progress to indeterminate state
   */
  setIndeterminate() {
    this.indeterminate = !0;
  }
  /**
   * Sets the progress to determinate state with a specific value
   * @param value Progress value to set
   */
  setDeterminate(e = this.value) {
    this.indeterminate = !1, this.updateProgress(e);
  }
  // AI Integration Methods
  explainState() {
    const e = [];
    this.indeterminate ? e.push("indeterminate") : this.value === 0 ? e.push("not-started") : this.value >= this.max ? e.push("complete") : e.push("in-progress");
    const t = e.join("-") || "not-started";
    return {
      currentState: t,
      possibleStates: ["not-started", "in-progress", "complete", "indeterminate"],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return {
      "not-started": "Progress bar at 0%, ready to show progress",
      "in-progress": `Progress bar at ${this.getProgressPercentage().toFixed(1)}% (${this.value}/${this.max})`,
      complete: `Progress bar complete at 100% (${this.value}/${this.max})`,
      indeterminate: "Progress bar in loading state without specific completion percentage"
    }[e] || `Progress bar in ${e} state. Variant: ${this.variant}, Size: ${this.size}`;
  }
  getPossibleActions() {
    return [
      {
        name: "updateProgress",
        description: "Update the progress value",
        available: !this.indeterminate
      },
      {
        name: "setIndeterminate",
        description: "Switch to indeterminate loading state",
        available: !this.indeterminate
      },
      {
        name: "setDeterminate",
        description: "Switch to determinate progress state",
        available: this.indeterminate
      }
    ];
  }
  get aiState() {
    return {
      ...super.aiState,
      value: this.value,
      max: this.max,
      percentage: this.getProgressPercentage(),
      variant: this.variant,
      size: this.size,
      indeterminate: this.indeterminate,
      complete: !this.indeterminate && this.value >= this.max
    };
  }
};
pe.styles = M`
    :host {
      display: block;
      --forge-progress-height: var(--size-2, 8px);
      --forge-progress-radius: var(--radius-full, 9999px);
      --forge-progress-bg: var(--color-gray-200, #e5e7eb);
      --forge-progress-fill: var(--color-primary-500, #3b82f6);
      --forge-progress-animation-duration: 2s;
    }

    .progress-container {
      display: flex;
      flex-direction: column;
      gap: var(--forge-spacing-xs, 4px);
    }

    .progress-track {
      width: 100%;
      height: var(--forge-progress-height);
      background-color: var(--forge-progress-bg);
      border-radius: var(--forge-progress-radius);
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background-color: var(--forge-progress-fill);
      border-radius: var(--forge-progress-radius);
      transition: width 300ms ease-out;
      position: relative;
    }

    .progress-fill--indeterminate {
      width: 100%;
      animation: indeterminate var(--forge-progress-animation-duration) ease-in-out infinite;
      transform-origin: left;
    }

    .progress-label {
      font-size: var(--forge-font-size-sm, 14px);
      color: var(--forge-color-text-secondary, #6b7280);
      text-align: left;
    }

    /* Size variants */
    :host([size="small"]) {
      --forge-progress-height: 4px;
    }

    :host([size="medium"]) {
      --forge-progress-height: 8px;
    }

    :host([size="large"]) {
      --forge-progress-height: 12px;
    }

    /* Variant colors */
    :host([variant="primary"]) {
      --forge-progress-fill: var(--color-primary-500, #3b82f6);
    }

    :host([variant="secondary"]) {
      --forge-progress-fill: var(--color-secondary-500, #6b7280);
    }

    :host([variant="success"]) {
      --forge-progress-fill: var(--color-success-500, #10b981);
    }

    :host([variant="warning"]) {
      --forge-progress-fill: var(--color-warning-500, #f59e0b);
    }

    :host([variant="danger"]) {
      --forge-progress-fill: var(--color-danger-500, #ef4444);
    }

    /* Animations */
    @keyframes indeterminate {
      0% {
        transform: translateX(-100%) scaleX(0.3);
      }
      50% {
        transform: translateX(0%) scaleX(0.6);
      }
      100% {
        transform: translateX(100%) scaleX(0.3);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-fill {
        transition: none;
      }
      
      .progress-fill--indeterminate {
        animation: none;
        width: 30%;
      }
    }
  `;
$e([
  o({ type: Number })
], pe.prototype, "value", 2);
$e([
  o({ type: Number })
], pe.prototype, "max", 2);
$e([
  o({ reflect: !0 })
], pe.prototype, "variant", 2);
$e([
  o({ reflect: !0 })
], pe.prototype, "size", 2);
$e([
  o({ type: Boolean, reflect: !0 })
], pe.prototype, "indeterminate", 2);
$e([
  o({ attribute: "aria-label", reflect: !0 })
], pe.prototype, "ariaLabel", 2);
pe = $e([
  O("forge-progress")
], pe);
var Mi = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, ce = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ti(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Mi(t, i, s), s;
};
let ae = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Circular progress indication and loading state visualization",
      context: "status",
      dataType: "number",
      criticality: "medium",
      semanticRole: "progressbar"
    }, this.value = 0, this.max = 100, this.variant = "primary", this.size = "medium", this.showLabel = !0, this.hideLabel = !1, this.indeterminate = !1, this.ariaLabel = "", this.radius = 20, this.circumference = 2 * Math.PI * this.radius;
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.setAttribute("role", "progressbar"), this.updateAccessibilityAttributes();
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("max") || e.has("indeterminate")) && this.updateAccessibilityAttributes();
  }
  updateAccessibilityAttributes() {
    this.indeterminate ? (this.removeAttribute("aria-valuenow"), this.removeAttribute("aria-valuetext"), this.setAttribute("aria-valuemin", "0"), this.setAttribute("aria-valuemax", this.max.toString())) : (this.setAttribute("aria-valuenow", this.value.toString()), this.setAttribute("aria-valuemin", "0"), this.setAttribute("aria-valuemax", this.max.toString()), this.setAttribute("aria-valuetext", `${this.value} of ${this.max}`)), this.ariaLabel && this.setAttribute("aria-label", this.ariaLabel);
  }
  getProgressPercentage() {
    return this.indeterminate ? 25 : Math.min(Math.max(this.value / this.max * 100, 0), 100);
  }
  getStrokeDashOffset() {
    const e = this.getProgressPercentage();
    return this.circumference - e / 100 * this.circumference;
  }
  render() {
    const e = this.getStrokeDashOffset(), t = this.indeterminate ? "progress-fill progress-fill--indeterminate" : "progress-fill";
    return l`
      <div class="progress-container" part="container">
        <svg class="progress-svg" part="svg" viewBox="0 0 44 44">
          <!-- Background track -->
          <circle
            class="progress-track"
            part="track"
            cx="22"
            cy="22"
            r="${this.radius}"
          ></circle>
          
          <!-- Progress fill -->
          <circle
            class="${t}"
            part="fill"
            cx="22"
            cy="22"
            r="${this.radius}"
            stroke-dasharray="${this.circumference}"
            stroke-dashoffset="${e}"
          ></circle>
        </svg>
        
        ${this.renderLabel()}
      </div>
    `;
  }
  renderLabel() {
    if (this.hideLabel || !this.showLabel)
      return "";
    const e = this.innerHTML && this.innerHTML.trim();
    return !e && !this.indeterminate ? l`
        <div class="progress-label" part="label">
          ${Math.round(this.getProgressPercentage())}%
        </div>
      ` : e ? l`
        <div class="progress-label" part="label">
          <slot></slot>
        </div>
      ` : this.indeterminate ? l`
        <div class="progress-label" part="label">
          ...
        </div>
      ` : "";
  }
  /**
   * Updates the progress value
   * @param value New progress value
   */
  updateProgress(e) {
    this.value = Math.min(Math.max(e, 0), this.max);
  }
  /**
   * Sets the progress to indeterminate state
   */
  setIndeterminate() {
    this.indeterminate = !0;
  }
  /**
   * Sets the progress to determinate state with a specific value
   * @param value Progress value to set
   */
  setDeterminate(e = this.value) {
    this.indeterminate = !1, this.updateProgress(e);
  }
  // AI Integration Methods
  explainState() {
    const e = [];
    this.indeterminate ? e.push("indeterminate") : this.value === 0 ? e.push("not-started") : this.value >= this.max ? e.push("complete") : e.push("in-progress");
    const t = e.join("-") || "not-started";
    return {
      currentState: t,
      possibleStates: ["not-started", "in-progress", "complete", "indeterminate"],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return {
      "not-started": "Circular progress at 0%, ready to show progress",
      "in-progress": `Circular progress at ${this.getProgressPercentage().toFixed(1)}% (${this.value}/${this.max})`,
      complete: `Circular progress complete at 100% (${this.value}/${this.max})`,
      indeterminate: "Circular progress in loading state without specific completion percentage"
    }[e] || `Circular progress in ${e} state. Variant: ${this.variant}, Size: ${this.size}`;
  }
  getPossibleActions() {
    return [
      {
        name: "updateProgress",
        description: "Update the progress value",
        available: !this.indeterminate
      },
      {
        name: "setIndeterminate",
        description: "Switch to indeterminate loading state",
        available: !this.indeterminate
      },
      {
        name: "setDeterminate",
        description: "Switch to determinate progress state",
        available: this.indeterminate
      }
    ];
  }
  get aiState() {
    return {
      ...super.aiState,
      value: this.value,
      max: this.max,
      percentage: this.getProgressPercentage(),
      variant: this.variant,
      size: this.size,
      indeterminate: this.indeterminate,
      complete: !this.indeterminate && this.value >= this.max,
      showLabel: this.showLabel && !this.hideLabel
    };
  }
};
ae.styles = M`
    :host {
      display: inline-block;
      --forge-progress-circle-size: 64px;
      --forge-progress-circle-stroke: 4px;
      --forge-progress-circle-track: var(--color-gray-200, #e5e7eb);
      --forge-progress-circle-fill: var(--color-primary-500, #3b82f6);
    }

    .progress-container {
      position: relative;
      width: var(--forge-progress-circle-size);
      height: var(--forge-progress-circle-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .progress-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progress-track {
      fill: none;
      stroke: var(--forge-progress-circle-track);
      stroke-width: var(--forge-progress-circle-stroke);
    }

    .progress-fill {
      fill: none;
      stroke: var(--forge-progress-circle-fill);
      stroke-width: var(--forge-progress-circle-stroke);
      stroke-linecap: round;
      transition: stroke-dashoffset 300ms ease-out;
    }

    .progress-fill--indeterminate {
      animation: rotate 1.5s linear infinite;
    }

    .progress-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--forge-font-size-sm, 14px);
      font-weight: 500;
      color: var(--forge-color-text-primary, #111827);
      text-align: center;
      line-height: 1.2;
    }

    /* Size variants */
    :host([size="small"]) {
      --forge-progress-circle-size: 32px;
      --forge-progress-circle-stroke: 3px;
    }

    :host([size="small"]) .progress-label {
      font-size: var(--forge-font-size-xs, 12px);
    }

    :host([size="medium"]) {
      --forge-progress-circle-size: 48px;
      --forge-progress-circle-stroke: 4px;
    }

    :host([size="large"]) {
      --forge-progress-circle-size: 80px;
      --forge-progress-circle-stroke: 6px;
    }

    :host([size="large"]) .progress-label {
      font-size: var(--forge-font-size-base, 16px);
    }

    /* Variant colors */
    :host([variant="primary"]) {
      --forge-progress-circle-fill: var(--color-primary-500, #3b82f6);
    }

    :host([variant="secondary"]) {
      --forge-progress-circle-fill: var(--color-secondary-500, #6b7280);
    }

    :host([variant="success"]) {
      --forge-progress-circle-fill: var(--color-success-500, #10b981);
    }

    :host([variant="warning"]) {
      --forge-progress-circle-fill: var(--color-warning-500, #f59e0b);
    }

    :host([variant="danger"]) {
      --forge-progress-circle-fill: var(--color-danger-500, #ef4444);
    }

    /* Animations */
    @keyframes rotate {
      from {
        transform: rotate(-90deg);
      }
      to {
        transform: rotate(270deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-fill {
        transition: none;
      }
      
      .progress-fill--indeterminate {
        animation: none;
      }
    }

    /* Hide label when requested */
    :host([hide-label]) .progress-label {
      display: none;
    }
  `;
ce([
  o({ type: Number })
], ae.prototype, "value", 2);
ce([
  o({ type: Number })
], ae.prototype, "max", 2);
ce([
  o({ reflect: !0 })
], ae.prototype, "variant", 2);
ce([
  o({ reflect: !0 })
], ae.prototype, "size", 2);
ce([
  o({ type: Number, attribute: "stroke-width" })
], ae.prototype, "strokeWidth", 2);
ce([
  o({ type: Boolean, attribute: "show-label", reflect: !0 })
], ae.prototype, "showLabel", 2);
ce([
  o({ type: Boolean, attribute: "hide-label", reflect: !0 })
], ae.prototype, "hideLabel", 2);
ce([
  o({ type: Boolean, reflect: !0 })
], ae.prototype, "indeterminate", 2);
ce([
  o({ attribute: "aria-label", reflect: !0 })
], ae.prototype, "ariaLabel", 2);
ae = ce([
  O("forge-progress-circle")
], ae);
var Oi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, ke = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? zi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Oi(t, i, s), s;
};
let ue = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Loading state placeholder and perceived performance enhancement",
      context: "loading",
      dataType: void 0,
      criticality: "low",
      semanticRole: "presentation"
    }, this.width = "", this.height = "", this.shape = "rounded", this.size = "md", this.noAnimation = !1, this.ariaLabel = "Loading content";
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.setAttribute("aria-busy", "true"), this.setAttribute("aria-label", this.ariaLabel), this.setAttribute("role", "presentation"), this.updateDimensions();
  }
  updated(e) {
    super.updated(e), (e.has("width") || e.has("height")) && this.updateDimensions(), e.has("ariaLabel") && this.setAttribute("aria-label", this.ariaLabel);
  }
  updateDimensions() {
    this.width && this.style.setProperty("--skeleton-width", this.width), this.height && this.style.setProperty("--skeleton-height", this.height);
  }
  render() {
    const e = {};
    return this.noAnimation && (e.animation = "none", e.background = "var(--forge-skeleton-base)"), l`
      <div 
        class="skeleton" 
        part="container"
        style=${Object.entries(e).map(([t, i]) => `${t}: ${i}`).join("; ")}
      ></div>
    `;
  }
  // AI Integration Methods
  explainState() {
    const e = [];
    this.noAnimation ? e.push("static") : e.push("animated");
    const t = e.join("-") || "animated";
    return {
      currentState: t,
      possibleStates: ["animated", "static"],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return {
      animated: `Animated skeleton placeholder with shimmer effect, ${this.shape} shape, ${this.size} size`,
      static: `Static skeleton placeholder without animation, ${this.shape} shape, ${this.size} size`
    }[e] || `Skeleton in ${e} state. Shape: ${this.shape}, Size: ${this.size}`;
  }
  getPossibleActions() {
    return [
      {
        name: "toggleAnimation",
        description: "Toggle shimmer animation on/off",
        available: !0
      },
      {
        name: "updateDimensions",
        description: "Update skeleton width and height",
        available: !0
      }
    ];
  }
  get aiState() {
    return {
      ...super.aiState,
      width: this.width,
      height: this.height,
      shape: this.shape,
      size: this.size,
      noAnimation: this.noAnimation,
      dimensions: {
        computedWidth: getComputedStyle(this).width,
        computedHeight: getComputedStyle(this).height
      }
    };
  }
};
ue.styles = M`
    :host {
      display: block;
      --forge-skeleton-base: var(--color-gray-200, #e5e7eb);
      --forge-skeleton-highlight: var(--color-gray-50, #f9fafb);
      --forge-skeleton-animation-duration: 2s;
      --forge-skeleton-border-radius: var(--radius-sm, 4px);
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--forge-skeleton-base) 0%,
        var(--forge-skeleton-highlight) 50%,
        var(--forge-skeleton-base) 100%
      );
      background-size: 200% 100%;
      animation: shimmer var(--forge-skeleton-animation-duration) ease-in-out infinite;
      border-radius: var(--forge-skeleton-border-radius);
      width: var(--skeleton-width, 100%);
      height: var(--skeleton-height, 1em);
      min-height: var(--skeleton-min-height, 16px);
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Shape variants */
    :host([shape="circle"]) .skeleton {
      border-radius: 50%;
      aspect-ratio: 1;
    }

    :host([shape="rounded"]) .skeleton {
      border-radius: var(--forge-skeleton-border-radius);
    }

    :host([shape="square"]) .skeleton {
      border-radius: 0;
    }

    /* Size variants */
    :host([size="xs"]) {
      --skeleton-height: 12px;
    }

    :host([size="sm"]) {
      --skeleton-height: 16px;
    }

    :host([size="md"]) {
      --skeleton-height: 20px;
    }

    :host([size="lg"]) {
      --skeleton-height: 24px;
    }

    :host([size="xl"]) {
      --skeleton-height: 32px;
    }

    /* Disable animation when reduced motion is preferred */
    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
        background: var(--forge-skeleton-base);
      }
    }

    /* Custom dimensions */
    :host([width]) {
      --skeleton-width: attr(width);
    }

    :host([height]) {
      --skeleton-height: attr(height);
    }
  `;
ke([
  o()
], ue.prototype, "width", 2);
ke([
  o()
], ue.prototype, "height", 2);
ke([
  o({ reflect: !0 })
], ue.prototype, "shape", 2);
ke([
  o({ reflect: !0 })
], ue.prototype, "size", 2);
ke([
  o({ type: Boolean, attribute: "no-animation" })
], ue.prototype, "noAnimation", 2);
ke([
  o({ attribute: "aria-label" })
], ue.prototype, "ariaLabel", 2);
ue = ke([
  O("forge-skeleton")
], ue);
var Ei = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, Se = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ii(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Ei(t, i, s), s;
};
let fe = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Aspect ratio maintenance and responsive layout control",
      context: "layout",
      dataType: void 0,
      criticality: "medium",
      semanticRole: "presentation"
    }, this.ratio = "16:9", this.value = 0, this.maxWidth = "", this.maxHeight = "", this.center = !0, this.objectFit = "cover";
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.setAttribute("role", "presentation"), this.updateAspectRatio(), this.updateConstraints();
  }
  updated(e) {
    super.updated(e), (e.has("ratio") || e.has("value")) && this.updateAspectRatio(), (e.has("maxWidth") || e.has("maxHeight")) && this.updateConstraints(), e.has("objectFit") && this.updateObjectFit();
  }
  updateAspectRatio() {
    let e, t;
    if (this.value > 0)
      e = this.value, t = `${100 / e}%`;
    else {
      const [i, r] = this.parseRatio(this.ratio);
      e = i / r, t = `${r / i * 100}%`;
    }
    if (this.style.setProperty("--forge-aspect-ratio", e.toString()), this.style.setProperty("--forge-aspect-ratio-padding", t), CSS.supports("aspect-ratio", "16 / 9")) {
      const [i, r] = this.parseRatio(this.ratio);
      this.style.setProperty("--forge-aspect-ratio", `${i} / ${r}`);
    }
  }
  updateConstraints() {
    this.maxWidth ? this.style.maxWidth = this.maxWidth : this.style.removeProperty("max-width"), this.maxHeight ? this.style.maxHeight = this.maxHeight : this.style.removeProperty("max-height");
  }
  updateObjectFit() {
    const e = this.shadowRoot?.querySelector(".aspect-ratio-content");
    if (e) {
      const t = e.children;
      for (let i = 0; i < t.length; i++) {
        const r = t[i];
        (r.tagName === "IMG" || r.tagName === "VIDEO") && (r.style.objectFit = this.objectFit, r.style.width = "100%", r.style.height = "100%");
      }
    }
  }
  parseRatio(e) {
    const t = e.split(":").map((i) => parseFloat(i.trim()));
    return t.length === 2 && t.every((i) => !isNaN(i) && i > 0) ? [t[0], t[1]] : (console.warn(`Invalid aspect ratio "${e}". Using default 16:9.`), [16, 9]);
  }
  /**
   * Get the calculated aspect ratio as a number
   */
  getAspectRatio() {
    if (this.value > 0)
      return this.value;
    const [e, t] = this.parseRatio(this.ratio);
    return e / t;
  }
  /**
   * Get the calculated padding-bottom percentage
   */
  getPaddingBottom() {
    const [e, t] = this.parseRatio(this.ratio);
    return `${t / e * 100}%`;
  }
  /**
   * Set aspect ratio from width and height values
   */
  setRatio(e, t) {
    e > 0 && t > 0 && (this.ratio = `${e}:${t}`);
  }
  render() {
    const e = ["aspect-ratio-container"], t = ["aspect-ratio-content"];
    return this.center || t.push("no-center"), l`
      <div class=${e.join(" ")} part="container">
        <div class=${t.join(" ")} part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  // AI Integration Methods
  explainState() {
    const e = this.getAspectRatio(), t = this.value > 0;
    return {
      currentState: t ? "custom" : "preset",
      possibleStates: ["preset", "custom"],
      stateDescription: this.getStateDescription(t, e)
    };
  }
  getStateDescription(e, t) {
    const [i, r] = this.parseRatio(this.ratio);
    return e ? `Custom aspect ratio of ${t.toFixed(2)} (${this.value}), ${i}:${r} equivalent` : `Preset aspect ratio of ${this.ratio} (${t.toFixed(2)}), maintaining ${i}:${r} proportions`;
  }
  getPossibleActions() {
    return [
      {
        name: "setRatio",
        description: "Set aspect ratio from width and height values",
        available: !0
      },
      {
        name: "updateConstraints",
        description: "Update maximum width and height constraints",
        available: !0
      },
      {
        name: "getAspectRatio",
        description: "Get the calculated aspect ratio value",
        available: !0
      }
    ];
  }
  get aiState() {
    const e = this.getAspectRatio(), [t, i] = this.parseRatio(this.ratio);
    return {
      ...super.aiState,
      ratio: this.ratio,
      value: this.value,
      calculatedAspectRatio: e,
      calculatedPadding: this.getPaddingBottom(),
      dimensions: {
        width: t,
        height: i,
        aspectRatio: e
      },
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      center: this.center,
      objectFit: this.objectFit,
      supportsNativeAspectRatio: CSS.supports("aspect-ratio", "16 / 9")
    };
  }
};
fe.styles = M`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .aspect-ratio-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: var(--forge-aspect-ratio-padding, 56.25%); /* 16:9 by default */
      overflow: hidden;
    }

    .aspect-ratio-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Common aspect ratio presets */
    :host([ratio="1:1"]) .aspect-ratio-container {
      padding-bottom: 100%; /* Square */
    }

    :host([ratio="16:9"]) .aspect-ratio-container {
      padding-bottom: 56.25%; /* Widescreen */
    }

    :host([ratio="4:3"]) .aspect-ratio-container {
      padding-bottom: 75%; /* Traditional video */
    }

    :host([ratio="3:2"]) .aspect-ratio-container {
      padding-bottom: 66.67%; /* Photo aspect ratio */
    }

    :host([ratio="21:9"]) .aspect-ratio-container {
      padding-bottom: 42.86%; /* Ultra-wide */
    }

    :host([ratio="2:1"]) .aspect-ratio-container {
      padding-bottom: 50%; /* Banner */
    }

    :host([ratio="3:4"]) .aspect-ratio-container {
      padding-bottom: 133.33%; /* Portrait 4:3 */
    }

    :host([ratio="9:16"]) .aspect-ratio-container {
      padding-bottom: 177.78%; /* Portrait 16:9 */
    }

    /* Support for modern CSS aspect-ratio when available */
    @supports (aspect-ratio: 16 / 9) {
      .aspect-ratio-container {
        aspect-ratio: var(--forge-aspect-ratio, 16 / 9);
        height: auto;
        padding-bottom: 0;
      }
    }

    /* Fallback for content overflow */
    .aspect-ratio-content > * {
      max-width: 100%;
      max-height: 100%;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .aspect-ratio-content {
        /* Ensure content remains accessible on small screens */
        min-height: 0;
      }
    }
  `;
Se([
  o({ reflect: !0 })
], fe.prototype, "ratio", 2);
Se([
  o({ type: Number })
], fe.prototype, "value", 2);
Se([
  o({ attribute: "max-width" })
], fe.prototype, "maxWidth", 2);
Se([
  o({ attribute: "max-height" })
], fe.prototype, "maxHeight", 2);
Se([
  o({ type: Boolean })
], fe.prototype, "center", 2);
Se([
  o({ attribute: "object-fit" })
], fe.prototype, "objectFit", 2);
fe = Se([
  O("forge-aspect-ratio")
], fe);
var Ri = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, oe = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Pi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Ri(t, i, s), s;
};
let Z = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "User identity display with image or initials",
      context: "profile",
      dataType: "image",
      criticality: "low",
      semanticRole: "img"
    }, this.size = "md", this.status = "none", this.statusPosition = "top-right", this.shape = "circle", this.clickable = !1, this.loading = !1, this.disabled = !1, this.imageLoaded = !1, this.imageError = !1, this._handleImageLoad = () => {
      this.imageLoaded = !0, this.imageError = !1, this.updateAvatarState();
    }, this._handleImageError = () => {
      this.imageLoaded = !1, this.imageError = !0, this.updateAvatarState();
    }, this._handleClick = () => {
      this.disabled || this.dispatchEvent(
        new CustomEvent("click", {
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.updateAIMetadata(), this.updateAvatarState();
  }
  updated(e) {
    super.updated(e), (e.has("src") || e.has("fallback") || e.has("status") || e.has("clickable") || e.has("size") || e.has("disabled") || e.has("loading") || e.has("shape")) && (this.updateAIMetadata(), this.updateAvatarState());
  }
  updateAIMetadata() {
    this.aiMetadata = {
      ...this.aiMetadata,
      purpose: `User avatar ${this.src ? "with image" : "with initials"} ${this.status !== "none" ? `showing ${this.status} status` : ""}`,
      context: this.clickable ? "interactive-profile" : "profile",
      criticality: this.clickable ? "medium" : "low"
    };
  }
  // AI Integration methods
  explainState() {
    const t = this.src && !this.imageError ? `showing image from "${this.src}"` : this.fallback ? `displaying initials "${this.fallback}"` : "showing default avatar", i = this.status !== "none" ? ` with ${this.status} status indicator` : "", r = this.clickable ? " and is clickable" : "", s = this.loading ? " (currently loading)" : "", a = this.loading ? "loading" : this.disabled ? "disabled" : this.clickable ? "interactive" : "display", n = ["display", "interactive", "loading", "disabled"], c = `Avatar component ${t}${i}${r}${s}. Size: ${this.size}, Shape: ${this.shape}.`;
    return {
      currentState: a,
      possibleStates: n,
      stateDescription: c,
      visualIndicators: [
        `Size: ${this.size}`,
        `Shape: ${this.shape}`,
        this.status !== "none" ? `Status: ${this.status}` : "",
        this.loading ? "Loading animation" : "",
        this.disabled ? "Disabled appearance" : ""
      ].filter(Boolean)
    };
  }
  getPossibleActions() {
    const e = [];
    return this.clickable && !this.disabled && e.push({
      name: "click",
      description: "Click avatar to trigger user profile action",
      available: !0,
      parameters: []
    }), e;
  }
  // Update component state for AI tracking
  updateAvatarState() {
    this.updateComponentState("hasImage", !!(this.src && !this.imageError)), this.updateComponentState("fallbackText", this.fallback || null), this.updateComponentState("size", this.size), this.updateComponentState("status", this.status), this.updateComponentState("clickable", this.clickable), this.updateComponentState("disabled", this.disabled), this.updateComponentState("loading", this.loading), this.updateComponentState("shape", this.shape);
  }
  render() {
    const e = this.src && !this.imageError && !this.loading, t = !e && this.fallback && !this.loading, i = {
      avatar: !0,
      [`avatar--${this.size}`]: !0,
      [`avatar--${this.shape}`]: !0,
      "avatar--clickable": this.clickable,
      "avatar--disabled": this.disabled,
      "avatar--loading": this.loading
    }, r = {
      avatar__status: !0,
      [`avatar__status--${this.statusPosition}`]: !0,
      [`avatar__status--${this.status}`]: !0
    }, s = l`
      ${e ? l`
            <img
              class="avatar__image"
              src=${this.src}
              alt=${this.alt || ""}
              @load=${this._handleImageLoad}
              @error=${this._handleImageError}
              part="image"
            />
          ` : ""}
      ${t ? l` <span class="avatar__fallback" part="fallback"> ${this.fallback} </span> ` : ""}
      ${this.status !== "none" ? l`
            <div
              class=${W(r)}
              id="status-indicator"
              role="status"
              aria-label=${`User is ${this.status}`}
              part="status"
            ></div>
          ` : ""}
    `;
    return this.clickable ? l`
          <button
            class=${W(i)}
            type="button"
            ?disabled=${this.disabled}
            aria-label=${this.alt || (this.fallback ? `Avatar with initials ${this.fallback}` : "User avatar")}
            aria-describedby=${this.status !== "none" ? "status-indicator" : ""}
            @click=${this._handleClick}
            part="avatar"
          >
            ${s}
          </button>
        ` : l`
          <div
            class=${W(i)}
            role="img"
            aria-label=${this.alt || (this.fallback ? `Avatar with initials ${this.fallback}` : "User avatar")}
            aria-describedby=${this.status !== "none" ? "status-indicator" : ""}
            part="avatar"
          >
            ${s}
          </div>
        `;
  }
};
Z.styles = M`
    ${f.styles}

    :host {
      display: inline-block;
      position: relative;
      --forge-avatar-size: 2.5rem;
      --forge-avatar-bg: var(--forge-color-neutral-200);
      --forge-avatar-color: var(--forge-color-neutral-700);
      --forge-avatar-border-radius: 50%;
      --forge-avatar-border-width: 0;
      --forge-avatar-border-color: transparent;
      --forge-avatar-status-size: 0.75rem;
      --forge-avatar-status-border: 2px solid var(--forge-color-background);
    }

    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--forge-avatar-size);
      height: var(--forge-avatar-size);
      border-radius: var(--forge-avatar-border-radius);
      border: var(--forge-avatar-border-width) solid var(--forge-avatar-border-color);
      background-color: var(--forge-avatar-bg);
      color: var(--forge-avatar-color);
      font-family: var(--forge-font-family);
      font-weight: 500;
      overflow: hidden;
      transition: all var(--forge-transition-fast);
      outline: none;
    }

    /* Button reset for clickable avatars */
    button.avatar {
      padding: 0;
      margin: 0;
      font: inherit;
      color: inherit;
      background: inherit;
      cursor: pointer;
    }

    button.avatar:disabled {
      cursor: not-allowed;
    }

    .avatar--clickable {
      cursor: pointer;
    }

    .avatar--clickable:hover {
      transform: scale(1.02);
    }

    .avatar--clickable:focus {
      box-shadow: 0 0 0 2px var(--forge-color-primary-500);
    }

    .avatar--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .avatar--loading {
      background: linear-gradient(
        90deg,
        var(--forge-avatar-bg) 0%,
        var(--forge-color-neutral-300) 50%,
        var(--forge-avatar-bg) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    .avatar__fallback {
      font-size: calc(var(--forge-avatar-size) * 0.4);
      line-height: 1;
      text-transform: uppercase;
      user-select: none;
    }

    /* Size variants */
    .avatar--xs {
      --forge-avatar-size: 1.5rem;
      --forge-avatar-status-size: 0.5rem;
    }

    .avatar--sm {
      --forge-avatar-size: 2rem;
      --forge-avatar-status-size: 0.625rem;
    }

    .avatar--md {
      --forge-avatar-size: 2.5rem;
      --forge-avatar-status-size: 0.75rem;
    }

    .avatar--lg {
      --forge-avatar-size: 3rem;
      --forge-avatar-status-size: 0.875rem;
    }

    .avatar--xl {
      --forge-avatar-size: 4rem;
      --forge-avatar-status-size: 1rem;
    }

    /* Shape variants */
    .avatar--circle {
      --forge-avatar-border-radius: 50%;
    }

    .avatar--square {
      --forge-avatar-border-radius: 0;
    }

    .avatar--rounded {
      --forge-avatar-border-radius: var(--forge-border-radius-md);
    }

    /* Status indicator */
    .avatar__status {
      position: absolute;
      width: var(--forge-avatar-status-size);
      height: var(--forge-avatar-status-size);
      border-radius: 50%;
      border: var(--forge-avatar-status-border);
      z-index: 1;
    }

    .avatar__status--top-right {
      top: 0;
      right: 0;
    }

    .avatar__status--top-left {
      top: 0;
      left: 0;
    }

    .avatar__status--bottom-right {
      bottom: 0;
      right: 0;
    }

    .avatar__status--bottom-left {
      bottom: 0;
      left: 0;
    }

    .avatar__status--online {
      background-color: var(--forge-color-success-500, #10b981);
    }

    .avatar__status--offline {
      background-color: var(--forge-color-neutral-400, #6b7280);
    }

    .avatar__status--busy {
      background-color: var(--forge-color-error-500, #ef4444);
    }

    .avatar__status--away {
      background-color: var(--forge-color-warning-500, #f59e0b);
    }
  `;
oe([
  o({ type: String })
], Z.prototype, "src", 2);
oe([
  o({ type: String })
], Z.prototype, "alt", 2);
oe([
  o({ type: String })
], Z.prototype, "fallback", 2);
oe([
  o({ type: String })
], Z.prototype, "size", 2);
oe([
  o({ type: String })
], Z.prototype, "status", 2);
oe([
  o({ type: String, attribute: "status-position" })
], Z.prototype, "statusPosition", 2);
oe([
  o({ type: String })
], Z.prototype, "shape", 2);
oe([
  o({ type: Boolean })
], Z.prototype, "clickable", 2);
oe([
  o({ type: Boolean })
], Z.prototype, "loading", 2);
oe([
  o({ type: Boolean })
], Z.prototype, "disabled", 2);
oe([
  h()
], Z.prototype, "imageLoaded", 2);
oe([
  h()
], Z.prototype, "imageError", 2);
Z = oe([
  O("forge-avatar")
], Z);
var Bi = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, _ = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Li(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Bi(t, i, s), s;
};
let x = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Form field container with label and validation",
      context: "form",
      dataType: "text",
      criticality: "medium",
      semanticRole: "group",
      interactions: [
        {
          type: "input",
          description: "Enter data into the field",
          outcome: "Updates form data"
        },
        {
          type: "focus",
          description: "Focus the input field",
          outcome: "Activates field for input"
        }
      ]
    }, this.label = "", this.name = "", this.value = "", this.placeholder = "", this.type = "text", this.variant = "default", this.validationState = "default", this.errorMessage = "", this.warningMessage = "", this.successMessage = "", this.helpText = "", this.required = !1, this.showOptional = !1, this.disabled = !1, this.readonly = !1, this.isFocused = !1, this.isFilled = !1, this.renderMetrics = { time: 0, violations: 0 };
  }
  connectedCallback() {
    super.connectedCallback(), this.updateComponentState("label", this.label), this.updateComponentState("value", this.value), this.updateComponentState("required", this.required), this.updateComponentState("validationState", this.validationState), this.updateComponentState("variant", this.variant);
  }
  render() {
    const e = performance.now(), t = ["form-field"];
    this.variant === "default" && t.push("form-field--default"), this.variant === "floating" && t.push("form-field--floating"), this.variant === "inline" && t.push("form-field--inline"), this.validationState !== "default" && t.push(`form-field--${this.validationState}`), this.isFocused && t.push("is-focused"), (this.isFilled || this.value) && t.push("is-filled"), this.disabled && t.push("is-disabled"), this.readonly && t.push("is-readonly");
    const i = l`
      <div class=${t.join(" ")}>
        ${this.renderLabel()}
        <div class="input-container">
          <forge-input
            .type=${this.type}
            .value=${this.value}
            .placeholder=${this.variant === "floating" ? "" : this.placeholder}
            .disabled=${this.disabled}
            .readonly=${this.readonly}
            .validationState=${this.validationState}
            .name=${this.name}
            pattern=${X(this.pattern)}
            minlength=${X(this.minLength)}
            maxlength=${X(this.maxLength)}
            min=${X(this.min)}
            max=${X(this.max)}
            ?required=${this.required}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @change=${this.handleChange}
            aria-labelledby="label-${this.name}"
            aria-describedby=${this.getAriaDescribedBy()}
            data-semantic-role="form-input"
            data-ai-context=${this.aiContext || "form-field"}
          ></forge-input>
        </div>
        ${this.renderMessages()}
      </div>
    `, r = performance.now();
    return this.checkPerformance(r - e), i;
  }
  renderLabel() {
    return this.label ? l`
      <div class="label-container">
        <label 
          class="label" 
          id="label-${this.name}"
          for="input-${this.name}"
        >
          ${this.label}
          ${this.required ? l`<span class="required-indicator">*</span>` : ""}
          ${this.showOptional && !this.required ? l`
            <span class="optional-indicator">(optional)</span>
          ` : ""}
        </label>
      </div>
    ` : null;
  }
  renderMessages() {
    return this.helpText || this.errorMessage || this.warningMessage || this.successMessage ? l`
      <div class="message-container">
        ${this.errorMessage ? l`
          <div class="error-message" role="alert" id="error-${this.name}">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            ${this.errorMessage}
          </div>
        ` : ""}
        ${this.warningMessage ? l`
          <div class="warning-message" id="warning-${this.name}">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            ${this.warningMessage}
          </div>
        ` : ""}
        ${this.successMessage ? l`
          <div class="success-message" id="success-${this.name}">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            ${this.successMessage}
          </div>
        ` : ""}
        ${this.helpText && !this.errorMessage ? l`
          <div class="help-text" id="help-${this.name}">
            ${this.helpText}
          </div>
        ` : ""}
      </div>
    ` : null;
  }
  getAriaDescribedBy() {
    const e = [];
    return e.push("error-accessible"), e.push("warning-accessible"), e.push("success-accessible"), this.errorMessage && e.push(`error-${this.name}`), this.warningMessage && e.push(`warning-${this.name}`), this.successMessage && e.push(`success-${this.name}`), this.helpText && !this.errorMessage && e.push(`help-${this.name}`), e.join(" ");
  }
  handleInput(e) {
    const t = e.target;
    e.detail?.value !== void 0 ? (this.value = e.detail.value, t.value = this.value) : this.value = t.value, this.isFilled = !!this.value, this.updateComponentState("value", this.value), this.emit("input", { value: this.value, name: this.name });
  }
  handleFocus() {
    this.isFocused = !0, this.updateComponentState("focused", !0), this.emit("focus", { name: this.name });
  }
  handleBlur() {
    this.isFocused = !1, this.updateComponentState("focused", !1), this.emit("blur", { name: this.name, value: this.value });
  }
  handleChange(e) {
    this.emit("change", { value: this.value, name: this.name });
  }
  updated(e) {
    super.updated(e), e.has("label") && this.updateComponentState("label", this.label), e.has("validationState") && this.updateComponentState("validationState", this.validationState), e.has("required") && this.updateComponentState("required", this.required), e.has("type") && (this.aiMetadata.dataType = this.mapTypeToAIDataType(this.type));
  }
  mapTypeToAIDataType(e) {
    return {
      text: "text",
      password: "password",
      email: "email",
      number: "number",
      tel: "phone",
      url: "url",
      search: "text"
    }[e] || "text";
  }
  // AI metadata methods
  getPossibleActions() {
    return [
      {
        name: "input",
        description: `Enter ${this.label || "data"} into the field`,
        available: !this.disabled && !this.readonly
      },
      {
        name: "clear",
        description: "Clear the field value",
        available: !this.disabled && !this.readonly && !!this.value
      },
      {
        name: "focus",
        description: "Focus the input field",
        available: !this.disabled
      },
      {
        name: "validate",
        description: "Validate the field value",
        available: !0
      }
    ];
  }
  explainState() {
    const e = [];
    this.disabled && e.push("disabled"), this.readonly && e.push("readonly"), this.value && e.push("filled"), this.value || e.push("empty"), this.isFocused && e.push("focused"), this.validationState !== "default" && e.push(this.validationState), this.required && !this.value && e.push("required-empty");
    const t = e.join("-") || "default";
    return {
      currentState: t,
      possibleStates: [
        "default",
        "filled",
        "empty",
        "focused",
        "disabled",
        "readonly",
        "error",
        "warning",
        "success",
        "required-empty"
      ],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return e.includes("disabled") ? `${this.label} field is disabled` : e.includes("readonly") ? `${this.label} field is read-only` : e.includes("required-empty") ? `${this.label} is required but empty` : e.includes("error") ? `${this.label} has validation error: ${this.errorMessage}` : e.includes("warning") ? `${this.label} has warning: ${this.warningMessage}` : e.includes("success") ? `${this.label} is valid: ${this.successMessage}` : e.includes("focused") ? `${this.label} field is focused and ready for input` : e.includes("filled") ? `${this.label} contains data` : e.includes("empty") ? `${this.label} field is empty` : `${this.label} field ready for input`;
  }
  checkPerformance(e) {
    this.renderMetrics.time = e, e > this.maxRenderMs && (this.renderMetrics.violations++, this.warnOnViolation && console.warn(`ForgeFormField render exceeded budget: ${e.toFixed(2)}ms > ${this.maxRenderMs}ms`));
  }
  // Public methods
  focus() {
    this.inputElement?.focus();
  }
  blur() {
    this.inputElement?.blur();
  }
  validate() {
    return this.inputElement?.checkValidity() ?? !0;
  }
  reportValidity() {
    return this.inputElement?.reportValidity() ?? !0;
  }
};
x.styles = M`
    :host {
      display: block;
      --field-gap: var(--forge-spacing-sm);
      --label-color: var(--forge-color-text-primary);
      --label-font-size: var(--forge-font-size-sm);
      --label-font-weight: 500;
      --error-color: var(--forge-color-error);
      --warning-color: var(--forge-color-warning);
      --success-color: var(--forge-color-success);
      --help-text-color: var(--forge-color-text-secondary);
      --help-text-font-size: var(--forge-font-size-xs);
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: var(--field-gap);
      width: 100%;
    }

    /* Default variant */
    .form-field--default {
      /* Default variant styles - explicitly defined for test */
    }

    /* Inline variant */
    .form-field--inline {
      flex-direction: row;
      align-items: center;
    }

    .form-field--inline .label-container {
      flex: 0 0 auto;
      min-width: 120px;
    }

    .form-field--inline .input-container {
      flex: 1;
    }

    /* Label styles */
    .label-container {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .label {
      color: var(--label-color);
      font-size: var(--label-font-size);
      font-weight: var(--label-font-weight);
      font-family: var(--forge-font-family);
      transition: all var(--forge-transition-fast);
    }

    .required-indicator {
      color: var(--error-color);
      font-weight: bold;
    }

    .optional-indicator {
      color: var(--help-text-color);
      font-size: var(--help-text-font-size);
      font-weight: normal;
      margin-left: 4px;
    }

    /* Floating label variant */
    .form-field--floating {
      position: relative;
      padding-top: 20px;
    }

    .form-field--floating .label-container {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      pointer-events: none;
      transition: all var(--forge-transition-fast);
      background: white;
      padding: 0 4px;
      z-index: 1;
    }

    .form-field--floating.is-filled .label-container,
    .form-field--floating.is-focused .label-container {
      top: 10px;
      transform: translateY(-50%) scale(0.85);
      left: 8px;
    }

    /* Input container */
    .input-container {
      position: relative;
      width: 100%;
    }

    /* Help text and error messages */
    .message-container {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .help-text,
    .error-message,
    .warning-message,
    .success-message {
      font-family: var(--forge-font-family);
      font-size: var(--help-text-font-size);
      line-height: 1.4;
    }

    .help-text {
      color: var(--help-text-color);
    }

    .error-message {
      color: var(--error-color);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .warning-message {
      color: var(--warning-color);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .success-message {
      color: var(--success-color);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Icons */
    .icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }

    /* Disabled state */
    :host([disabled]) .label {
      opacity: 0.5;
    }

    /* Focus styles */
    .form-field:focus-within .label {
      color: var(--forge-color-primary-500);
    }

    /* Validation states */
    .form-field--error .label {
      color: var(--error-color);
    }

    .form-field--warning .label {
      color: var(--warning-color);
    }

    .form-field--success .label {
      color: var(--success-color);
    }

    /* Animation for floating label */
    @keyframes float-up {
      from {
        top: 50%;
        transform: translateY(-50%) scale(1);
      }
      to {
        top: 10px;
        transform: translateY(-50%) scale(0.85);
      }
    }

    /* Performance mode adjustments */
    :host([performance-mode="fast"]) .label-container,
    :host([performance-mode="fast"]) .message-container {
      transition: none;
    }
  `;
_([
  o({ type: String })
], x.prototype, "label", 2);
_([
  o({ type: String })
], x.prototype, "name", 2);
_([
  o({ type: String })
], x.prototype, "value", 2);
_([
  o({ type: String })
], x.prototype, "placeholder", 2);
_([
  o({ type: String })
], x.prototype, "type", 2);
_([
  o({ type: String })
], x.prototype, "variant", 2);
_([
  o({ type: String })
], x.prototype, "validationState", 2);
_([
  o({ type: String })
], x.prototype, "errorMessage", 2);
_([
  o({ type: String })
], x.prototype, "warningMessage", 2);
_([
  o({ type: String })
], x.prototype, "successMessage", 2);
_([
  o({ type: String })
], x.prototype, "helpText", 2);
_([
  o({ type: Boolean })
], x.prototype, "required", 2);
_([
  o({ type: Boolean })
], x.prototype, "showOptional", 2);
_([
  o({ type: Boolean })
], x.prototype, "disabled", 2);
_([
  o({ type: Boolean })
], x.prototype, "readonly", 2);
_([
  o({ type: String })
], x.prototype, "pattern", 2);
_([
  o({ type: Number })
], x.prototype, "minLength", 2);
_([
  o({ type: Number })
], x.prototype, "maxLength", 2);
_([
  o({ type: String })
], x.prototype, "min", 2);
_([
  o({ type: String })
], x.prototype, "max", 2);
_([
  h()
], x.prototype, "isFocused", 2);
_([
  h()
], x.prototype, "isFilled", 2);
_([
  h()
], x.prototype, "renderMetrics", 2);
_([
  ne("forge-input")
], x.prototype, "inputElement", 2);
x = _([
  O("forge-form-field")
], x);
var Fi = Object.defineProperty, qi = Object.getOwnPropertyDescriptor, ie = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? qi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Fi(t, i, s), s;
};
let G = class extends f {
  constructor() {
    super(), this.options = [], this.value = [], this.placeholder = "Select options...", this.searchPlaceholder = "Search...", this.disabled = !1, this.showSearch = !0, this.showActions = !0, this.maxSelections = 1 / 0, this.groupBy = !1, this.noResultsText = "No results found", this.isOpen = !1, this.searchQuery = "", this.filteredOptions = [], this.focusedOptionIndex = -1, this.aiMetadata = {
      purpose: "Select multiple options from a list",
      dataType: "multiselection",
      criticality: "medium",
      semanticRole: "multi-select",
      interactions: [
        {
          type: "click",
          description: "Toggle dropdown",
          outcome: "Opens or closes the options list"
        },
        {
          type: "input",
          description: "Search options",
          outcome: "Filters the available options"
        },
        {
          type: "select",
          description: "Toggle option selection",
          outcome: "Adds or removes option from selection"
        },
        {
          type: "keyboard",
          description: "Navigate options",
          shortcuts: ["ArrowUp", "ArrowDown", "Enter", "Escape"]
        }
      ],
      validation: [
        {
          type: "maxLength",
          value: this.maxSelections,
          message: `Maximum ${this.maxSelections} selections allowed`
        }
      ]
    }, this.toggleDropdown = () => {
      this.disabled || (this.isOpen = !this.isOpen, this.focusedOptionIndex = this.isOpen ? 0 : -1, this.updateComponentState("isOpen", this.isOpen));
    }, this.handleDocumentClick = (e) => {
      this.contains(e.target) || this.closeDropdown();
    }, this.handleKeydown = (e) => {
      if (!this.disabled)
        switch (e.key) {
          case "Escape":
            e.preventDefault(), this.closeDropdown();
            break;
          case "Enter":
          case " ":
            if (e.preventDefault(), !this.isOpen)
              this.toggleDropdown();
            else if (this.focusedOptionIndex >= 0 && this.focusedOptionIndex < this.filteredOptions.length) {
              const t = this.filteredOptions[this.focusedOptionIndex];
              this.toggleOption(t);
            }
            break;
          case "ArrowDown":
            e.preventDefault(), this.isOpen ? this.focusNextOption() : this.toggleDropdown();
            break;
          case "ArrowUp":
            e.preventDefault(), this.isOpen ? this.focusPreviousOption() : this.toggleDropdown();
            break;
          case "Home":
            this.isOpen && (e.preventDefault(), this.focusFirstOption());
            break;
          case "End":
            this.isOpen && (e.preventDefault(), this.focusLastOption());
            break;
        }
    }, this.filteredOptions = this.options;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this.handleKeydown), document.addEventListener("click", this.handleDocumentClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this.handleKeydown), document.removeEventListener("click", this.handleDocumentClick);
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.filteredOptions = this.options, this.initializeLiveRegion();
  }
  updated(e) {
    super.updated(e), (e.has("options") || e.has("searchQuery")) && this.filterOptions(), e.has("value") && (this.updateComponentState("selectedCount", this.value.length), this.updateComponentState("hasSelection", this.value.length > 0), this.emit("forge-change", { value: this.value }));
  }
  filterOptions() {
    if (!this.searchQuery) {
      this.filteredOptions = this.options;
      return;
    }
    const e = this.searchQuery.toLowerCase();
    this.filteredOptions = this.options.filter(
      (t) => t.label.toLowerCase().includes(e)
    );
  }
  closeDropdown() {
    this.isOpen = !1, this.searchQuery = "", this.focusedOptionIndex = -1, this.filterOptions(), this.updateComponentState("isOpen", !1);
  }
  handleSearch(e) {
    this.searchQuery = e.detail.value;
  }
  // Keyboard Navigation Helper Methods
  focusNextOption() {
    const e = this.focusedOptionIndex + 1;
    e < this.filteredOptions.length && (this.focusedOptionIndex = e, this.announceOption(this.filteredOptions[e]));
  }
  focusPreviousOption() {
    const e = this.focusedOptionIndex - 1;
    e >= 0 && (this.focusedOptionIndex = e, this.announceOption(this.filteredOptions[e]));
  }
  focusFirstOption() {
    this.filteredOptions.length > 0 && (this.focusedOptionIndex = 0, this.announceOption(this.filteredOptions[0]));
  }
  focusLastOption() {
    this.filteredOptions.length > 0 && (this.focusedOptionIndex = this.filteredOptions.length - 1, this.announceOption(this.filteredOptions[this.focusedOptionIndex]));
  }
  // ARIA Live Region Methods
  initializeLiveRegion() {
    this.liveRegion || (this.liveRegion = document.createElement("div"), this.liveRegion.setAttribute("role", "status"), this.liveRegion.setAttribute("aria-live", "polite"), this.liveRegion.setAttribute("aria-atomic", "true"), this.liveRegion.className = "sr-only", this.liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `, this.shadowRoot?.appendChild(this.liveRegion));
  }
  announce(e) {
    this.liveRegion && (this.liveRegion.textContent = "", setTimeout(() => {
      this.liveRegion && (this.liveRegion.textContent = e);
    }, 100));
  }
  announceOption(e) {
    const t = this.value.includes(e.value), i = this.focusedOptionIndex + 1, r = this.filteredOptions.length, s = `${e.label}, ${t ? "selected" : "not selected"}, ${i} of ${r}`;
    this.announce(s);
  }
  announceSelectionChange(e, t) {
    const i = t ? "selected" : "deselected", r = t ? this.value.length + 1 : this.value.length - 1;
    this.announce(`${e.label} ${i}. ${r} item${r !== 1 ? "s" : ""} selected.`);
  }
  toggleOption(e) {
    if (e.disabled) return;
    const t = [...this.value], i = [...this.value], r = i.indexOf(e.value);
    r > -1 ? (i.splice(r, 1), this.value = i, this.announceSelectionChange(e, !1), this.dispatchEvent(new CustomEvent("change", {
      detail: { value: i, previousValue: t },
      bubbles: !0,
      composed: !0
    }))) : i.length < this.maxSelections && (i.push(e.value), this.value = i, this.announceSelectionChange(e, !0), this.dispatchEvent(new CustomEvent("change", {
      detail: { value: i, previousValue: t },
      bubbles: !0,
      composed: !0
    })));
  }
  removeTag(e, t) {
    t.stopPropagation();
    const i = [...this.value], r = this.value.filter((s) => s !== e);
    this.value = r, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: r, previousValue: i },
      bubbles: !0,
      composed: !0
    }));
  }
  selectAll() {
    const e = [...this.value], i = this.filteredOptions.filter((r) => !r.disabled).slice(0, this.maxSelections).map((r) => r.value);
    this.value = i, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: i, previousValue: e },
      bubbles: !0,
      composed: !0
    }));
  }
  selectNone() {
    const e = [...this.value];
    this.value = [], this.dispatchEvent(new CustomEvent("change", {
      detail: { value: [], previousValue: e },
      bubbles: !0,
      composed: !0
    }));
  }
  invertSelection() {
    const e = [...this.value], i = this.filteredOptions.filter((r) => !r.disabled).filter((r) => !this.value.includes(r.value)).slice(0, this.maxSelections).map((r) => r.value);
    this.value = i, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: i, previousValue: e },
      bubbles: !0,
      composed: !0
    }));
  }
  highlightMatch(e) {
    if (!this.searchQuery) return e;
    const t = new RegExp(`(${this.searchQuery})`, "gi"), i = e.split(t);
    return l`${i.map(
      (r, s) => t.test(r) ? l`<mark>${r}</mark>` : r
    )}`;
  }
  renderTags() {
    const e = this.options.filter((t) => this.value.includes(t.value));
    return e.length === 0 ? l`<span class="multi-select__placeholder">${this.placeholder}</span>` : e.length > 3 ? l`
        <div class="multi-select__tags">
          ${e.slice(0, 2).map((t) => l`
            <span class="multi-select__tag">
              ${t.label}
              <button
                class="multi-select__tag-remove"
                @click=${(i) => this.removeTag(t.value, i)}
                aria-label="Remove ${t.label}"
              >
                ×
              </button>
            </span>
          `)}
          <span class="multi-select__count">+${e.length - 2} more</span>
        </div>
      ` : l`
      <div class="multi-select__tags">
        ${e.map((t) => l`
          <span class="multi-select__tag">
            ${t.label}
            <button
              class="multi-select__tag-remove"
              @click=${(i) => this.removeTag(t.value, i)}
              aria-label="Remove ${t.label}"
            >
              ×
            </button>
          </span>
        `)}
      </div>
    `;
  }
  renderOptionsList() {
    if (this.filteredOptions.length === 0)
      return l`
        <div class="multi-select__no-results">
          ${this.noResultsText}
        </div>
      `;
    if (this.groupBy) {
      const e = /* @__PURE__ */ new Map(), t = [];
      return this.filteredOptions.forEach((i) => {
        i.group ? (e.has(i.group) || e.set(i.group, []), e.get(i.group).push(i)) : t.push(i);
      }), l`
        ${t.length > 0 ? t.map((i) => this.renderOption(i, this.filteredOptions.indexOf(i))) : ""}
        ${Array.from(e.entries()).map(([i, r]) => l`
          <div class="multi-select__group">${i}</div>
          ${r.map((s) => {
        const a = this.filteredOptions.indexOf(s);
        return this.renderOption(s, a);
      })}
        `)}
      `;
    }
    return this.filteredOptions.map((e, t) => this.renderOption(e, t));
  }
  renderOption(e, t) {
    const i = this.value.includes(e.value), r = t !== void 0 && t === this.focusedOptionIndex;
    return l`
      <div
        class="multi-select__option ${r ? "focused" : ""}"
        @click=${() => this.toggleOption(e)}
        aria-disabled=${e.disabled}
        role="option"
        aria-selected=${i}
        data-focused=${r}
      >
        <forge-checkbox
          .checked=${i}
          .disabled=${e.disabled}
          @click=${(s) => s.stopPropagation()}
        ></forge-checkbox>
        <span class="multi-select__option-label">
          ${this.highlightMatch(e.label)}
        </span>
      </div>
    `;
  }
  render() {
    const e = performance.now(), t = l`
      <div class="multi-select">
        <div
          class="multi-select__trigger"
          @click=${this.toggleDropdown}
          tabindex="0"
          role="combobox"
          aria-expanded=${this.isOpen}
          aria-haspopup="listbox"
          ?disabled=${this.disabled}
        >
          ${this.renderTags()}
          <forge-icon
            class="multi-select__icon"
            name="chevron-down"
            size="small"
          ></forge-icon>
        </div>

        <div
          class="multi-select__dropdown"
          data-open=${this.isOpen}
          role="listbox"
          aria-multiselectable="true"
        >
          ${this.showSearch ? l`
            <div class="multi-select__search">
              <forge-input
                type="search"
                placeholder=${this.searchPlaceholder}
                @input=${this.handleSearch}
                size="small"
              ></forge-input>
            </div>
          ` : ""}

          ${this.showActions ? l`
            <div class="multi-select__actions">
              <button class="multi-select__action" @click=${this.selectAll}>
                All
              </button>
              <button class="multi-select__action" @click=${this.selectNone}>
                None
              </button>
              <button class="multi-select__action" @click=${this.invertSelection}>
                Invert
              </button>
            </div>
          ` : ""}

          <div class="multi-select__options">
            ${this.renderOptionsList()}
          </div>
        </div>
      </div>
    `;
    return this.checkPerformance(e), t;
  }
  getPossibleActions() {
    return [
      {
        name: "toggle",
        description: "Toggle dropdown open/closed",
        available: !this.disabled,
        result: "Dropdown visibility changes"
      },
      {
        name: "selectOption",
        description: "Select or deselect an option",
        available: !this.disabled && this.isOpen,
        parameters: [
          {
            name: "value",
            type: "text",
            required: !0,
            description: "Option value to toggle"
          }
        ],
        result: "Option selection state changes"
      },
      {
        name: "selectAll",
        description: "Select all available options",
        available: !this.disabled && this.showActions,
        result: "All options selected"
      },
      {
        name: "clearSelection",
        description: "Clear all selections",
        available: !this.disabled && this.value.length > 0,
        result: "All selections cleared"
      },
      {
        name: "search",
        description: "Search/filter options",
        available: !this.disabled && this.showSearch,
        parameters: [
          {
            name: "query",
            type: "text",
            required: !0,
            description: "Search query"
          }
        ],
        result: "Options filtered by search query"
      }
    ];
  }
  explainState() {
    const e = ["closed", "open", "searching", "selecting"];
    let t = "closed";
    return this.isOpen ? t = this.searchQuery ? "searching" : "open" : this.value.length > 0 && (t = "selecting"), {
      currentState: t,
      possibleStates: e,
      stateDescription: `Multi-select is ${t}. ${this.value.length} of ${this.options.length} options selected.`,
      transitions: [
        {
          from: "closed",
          to: "open",
          trigger: "Click trigger or press Enter"
        },
        {
          from: "open",
          to: "searching",
          trigger: "Type in search field"
        },
        {
          from: "open",
          to: "closed",
          trigger: "Click outside or press Escape"
        }
      ],
      visualIndicators: [
        this.isOpen ? "Dropdown visible" : "Dropdown hidden",
        `${this.value.length} items selected`,
        this.searchQuery ? "Search active" : "No search"
      ]
    };
  }
};
G.styles = M`
    ${f.styles}
    
      :host {
        display: inline-block;
        position: relative;
        width: 100%;
        max-width: 400px;
      }

      .multi-select {
        position: relative;
      }

      .multi-select__trigger {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        min-height: 40px;
        padding: 8px 32px 8px 12px;
        border: 1px solid var(--forge-border-color, #d1d5db);
        border-radius: 6px;
        background: var(--forge-bg-color, #ffffff);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .multi-select__trigger:hover {
        border-color: var(--forge-border-hover-color, #9ca3af);
      }

      .multi-select__trigger:focus {
        outline: none;
        border-color: var(--forge-primary-color, #3b82f6);
        box-shadow: 0 0 0 3px var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
      }

      .multi-select__trigger[aria-expanded="true"] {
        border-color: var(--forge-primary-color, #3b82f6);
      }

      .multi-select__trigger[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .multi-select__placeholder {
        color: var(--forge-text-muted, #6b7280);
      }

      .multi-select__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }

      .multi-select__tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        background: var(--forge-tag-bg, #e5e7eb);
        border-radius: 4px;
        font-size: 14px;
      }

      .multi-select__tag-remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 2px;
      }

      .multi-select__tag-remove:hover {
        background: var(--forge-tag-remove-hover, rgba(0, 0, 0, 0.1));
      }

      .multi-select__icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        transition: transform 0.2s ease;
      }

      .multi-select__trigger[aria-expanded="true"] .multi-select__icon {
        transform: translateY(-50%) rotate(180deg);
      }

      .multi-select__dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        z-index: 1000;
        max-height: 300px;
        overflow: hidden;
        background: var(--forge-dropdown-bg, #ffffff);
        border: 1px solid var(--forge-border-color, #d1d5db);
        border-radius: 6px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
      }

      .multi-select__dropdown[data-open="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .multi-select__search {
        padding: 8px;
        border-bottom: 1px solid var(--forge-border-color, #e5e7eb);
      }

      .multi-select__search forge-input {
        width: 100%;
      }

      .multi-select__actions {
        display: flex;
        gap: 8px;
        padding: 8px;
        border-bottom: 1px solid var(--forge-border-color, #e5e7eb);
      }

      .multi-select__action {
        flex: 1;
        padding: 4px 8px;
        border: 1px solid var(--forge-border-color, #d1d5db);
        border-radius: 4px;
        background: transparent;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .multi-select__action:hover {
        background: var(--forge-hover-bg, #f3f4f6);
      }

      .multi-select__options {
        max-height: 200px;
        overflow-y: auto;
      }

      .multi-select__group {
        padding: 8px 12px 4px;
        font-size: 12px;
        font-weight: 600;
        color: var(--forge-text-muted, #6b7280);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .multi-select__option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .multi-select__option:hover {
        background: var(--forge-hover-bg, #f3f4f6);
      }

      .multi-select__option.focused {
        background: var(--forge-primary-bg-light, rgba(59, 130, 246, 0.1));
        outline: 2px solid var(--forge-primary-color, #3b82f6);
        outline-offset: -2px;
      }

      .multi-select__option[aria-disabled="true"] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .multi-select__option-label {
        flex: 1;
      }

      .multi-select__option mark {
        background: var(--forge-highlight, #fef3c7);
        font-weight: 600;
      }

      .multi-select__count {
        margin-left: 4px;
        color: var(--forge-text-muted, #6b7280);
      }

      .multi-select__no-results {
        padding: 16px;
        text-align: center;
        color: var(--forge-text-muted, #6b7280);
      }
    `;
ie([
  o({ type: Array, attribute: !1 })
], G.prototype, "options", 2);
ie([
  o({ type: Array, attribute: !1 })
], G.prototype, "value", 2);
ie([
  o({ type: String })
], G.prototype, "placeholder", 2);
ie([
  o({ type: String, attribute: "search-placeholder" })
], G.prototype, "searchPlaceholder", 2);
ie([
  o({ type: Boolean })
], G.prototype, "disabled", 2);
ie([
  o({ type: Boolean, attribute: "show-search" })
], G.prototype, "showSearch", 2);
ie([
  o({ type: Boolean, attribute: "show-actions" })
], G.prototype, "showActions", 2);
ie([
  o({ type: Number, attribute: "max-selections" })
], G.prototype, "maxSelections", 2);
ie([
  o({ type: Boolean, attribute: "group-by" })
], G.prototype, "groupBy", 2);
ie([
  o({ type: String, attribute: "no-results-text" })
], G.prototype, "noResultsText", 2);
ie([
  h()
], G.prototype, "isOpen", 2);
ie([
  h()
], G.prototype, "searchQuery", 2);
ie([
  h()
], G.prototype, "filteredOptions", 2);
ie([
  h()
], G.prototype, "focusedOptionIndex", 2);
G = ie([
  O("forge-multi-select")
], G);
var ji = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, R = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Hi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && ji(t, i, s), s;
};
u.registerIcon("calendar", '<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>');
u.registerIcon("chevron-left", '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>');
u.registerIcon("chevron-right", '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>');
let D = class extends f {
  constructor() {
    super(), this._value = null, this._range = null, this.placeholder = "Select date", this.format = "MM/DD/YYYY", this.locale = "en-US", this.disabled = !1, this.required = !1, this.readonly = !1, this.rangeMode = !1, this.clearButton = !0, this.min = null, this.max = null, this.disabledDates = [], this.weekStartMonday = !1, this.isOpen = !1, this.currentMonth = (/* @__PURE__ */ new Date()).getMonth(), this.currentYear = (/* @__PURE__ */ new Date()).getFullYear(), this.hoverDate = null, this.rangeStart = null, this.rangeEnd = null, this.selectingRangeEnd = !1, this.aiMetadata = {
      purpose: "Date selection with calendar interface",
      dataType: "date",
      criticality: "medium",
      semanticRole: "date-picker",
      interactions: [
        {
          type: "click",
          description: "Open calendar",
          outcome: "Shows calendar for date selection"
        },
        {
          type: "select",
          description: "Select date",
          outcome: "Sets selected date value"
        },
        {
          type: "keyboard",
          description: "Navigate calendar",
          shortcuts: ["ArrowKeys", "Enter", "Escape"]
        }
      ]
    }, this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ], this.weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], this.handleDocumentClick = (e) => {
      this.contains(e.target) || this.closeCalendar();
    }, this.handleKeydown = (e) => {
      if (!this.disabled)
        switch (e.key) {
          case "Escape":
            e.preventDefault(), this.closeCalendar();
            break;
          case "Enter":
            e.preventDefault(), this.isOpen || this.toggleCalendar();
            break;
        }
    }, this.handleInputChange = (e) => {
      const t = e.detail?.value || "", i = this.parseDate(t);
      i ? this.value = i : this.value = null;
    }, this.weekStartMonday && (this.weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e instanceof Date && isNaN(e.getTime()) ? this._value = null : this._value = e, this.requestUpdate("value", t);
  }
  get range() {
    return this._range;
  }
  set range(e) {
    const t = this._range;
    this._range = e, e ? (this.rangeStart = e.start, this.rangeEnd = e.end) : (this.rangeStart = null, this.rangeEnd = null), this.requestUpdate("range", t);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this.handleKeydown), document.addEventListener("click", this.handleDocumentClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this.handleKeydown), document.removeEventListener("click", this.handleDocumentClick);
  }
  updated(e) {
    super.updated(e), e.has("value") && (this.updateComponentState("hasValue", this.value !== null), this.emit("forge-change", { value: this.value })), e.has("range") && (this.updateComponentState("hasRange", this.range !== null), this.emit("forge-change", { range: this.range }));
  }
  toggleCalendar() {
    this.disabled || (this.isOpen = !this.isOpen, this.updateComponentState("isOpen", this.isOpen));
  }
  closeCalendar() {
    this.isOpen = !1, this.updateComponentState("isOpen", !1);
  }
  // Public methods for external control
  open() {
    this.disabled || (this.isOpen = !0, this.updateComponentState("isOpen", !0));
  }
  close() {
    this.closeCalendar();
  }
  toggle() {
    this.toggleCalendar();
  }
  formatDate(e) {
    if (!e) return "";
    const t = String(e.getMonth() + 1).padStart(2, "0"), i = String(e.getDate()).padStart(2, "0"), r = e.getFullYear();
    return this.format.replace("MM", t).replace("DD", i).replace("YYYY", String(r));
  }
  selectDate(e) {
    this.isDateDisabled(e) || (this.rangeMode ? !this.rangeStart || this.rangeStart && this.rangeEnd ? (this.rangeStart = e, this.rangeEnd = null, this.selectingRangeEnd = !0) : (e < this.rangeStart ? (this.rangeEnd = this.rangeStart, this.rangeStart = e) : this.rangeEnd = e, this.selectingRangeEnd = !1, this.range = { start: this.rangeStart, end: this.rangeEnd }) : (this.value = e, this.closeCalendar()));
  }
  clearValue() {
    this.rangeMode ? (this.range = null, this.rangeStart = null, this.rangeEnd = null) : this.value = null;
  }
  // Alias for clearValue to match test expectations
  clear() {
    this.clearValue();
  }
  selectToday() {
    const e = /* @__PURE__ */ new Date();
    this.currentMonth = e.getMonth(), this.currentYear = e.getFullYear(), this.rangeMode || this.selectDate(e);
  }
  parseDate(e) {
    try {
      const t = e.split(/[\/\-]/);
      if (t.length !== 3) return null;
      let i, r, s;
      this.format === "DD/MM/YYYY" ? (r = parseInt(t[0]), i = parseInt(t[1]) - 1, s = parseInt(t[2])) : this.format === "YYYY-MM-DD" ? (s = parseInt(t[0]), i = parseInt(t[1]) - 1, r = parseInt(t[2])) : (i = parseInt(t[0]) - 1, r = parseInt(t[1]), s = parseInt(t[2]));
      const a = new Date(s, i, r);
      return isNaN(a.getTime()) ? null : a;
    } catch {
      return null;
    }
  }
  getMonthName(e) {
    return new Date(2024, e, 1).toLocaleDateString(this.locale, { month: "long" });
  }
  getWeekdayNames() {
    const e = [], t = new Date(2024, 0, 7);
    for (let i = 0; i < 7; i++) {
      const r = new Date(t);
      r.setDate(t.getDate() + i), e.push(r.toLocaleDateString(this.locale, { weekday: "short" }));
    }
    return this.weekStartMonday && e.push(e.shift()), e;
  }
  getDaysInMonth(e, t) {
    return new Date(t, e + 1, 0).getDate();
  }
  getFirstDayOfMonth(e, t) {
    const i = new Date(t, e, 1).getDay();
    return this.weekStartMonday ? i === 0 ? 6 : i - 1 : i;
  }
  setRange(e, t) {
    this.rangeStart = e, this.rangeEnd = t, this.range = { start: e, end: t };
  }
  clearRange() {
    this.rangeStart = null, this.rangeEnd = null, this.range = null;
  }
  isDateBeforeMin(e) {
    return this.min ? e < this.min : !1;
  }
  isDateAfterMax(e) {
    return this.max ? e > this.max : !1;
  }
  previousMonth() {
    this.currentMonth === 0 ? (this.currentMonth = 11, this.currentYear--) : this.currentMonth--;
  }
  nextMonth() {
    this.currentMonth === 11 ? (this.currentMonth = 0, this.currentYear++) : this.currentMonth++;
  }
  isDateDisabled(e) {
    return this.min && e < this.min || this.max && e > this.max ? !0 : this.disabledDates.some(
      (t) => t.getDate() === e.getDate() && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear()
    );
  }
  isToday(e) {
    const t = /* @__PURE__ */ new Date();
    return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
  }
  isSelected(e) {
    return this.rangeMode ? this.rangeStart?.getTime() === e.getTime() || this.rangeEnd?.getTime() === e.getTime() : this.value?.getTime() === e.getTime();
  }
  isDateInRange(e) {
    if (!this.rangeMode || !this.rangeStart) return !1;
    if (this.rangeEnd)
      return e > this.rangeStart && e < this.rangeEnd;
    if (this.hoverDate && this.selectingRangeEnd) {
      const t = this.hoverDate > this.rangeStart ? this.hoverDate : this.rangeStart, i = this.hoverDate < this.rangeStart ? this.hoverDate : this.rangeStart;
      return e > i && e < t;
    }
    return !1;
  }
  getCalendarDays() {
    const e = new Date(this.currentYear, this.currentMonth, 1), t = new Date(this.currentYear, this.currentMonth + 1, 0), i = [];
    let r = e.getDay();
    this.weekStartMonday && (r = r === 0 ? 6 : r - 1);
    const s = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let n = r - 1; n >= 0; n--)
      i.push(new Date(this.currentYear, this.currentMonth - 1, s - n));
    for (let n = 1; n <= t.getDate(); n++)
      i.push(new Date(this.currentYear, this.currentMonth, n));
    const a = 42 - i.length;
    for (let n = 1; n <= a; n++)
      i.push(new Date(this.currentYear, this.currentMonth + 1, n));
    return i;
  }
  renderCalendarDay(e) {
    const t = e.getMonth() !== this.currentMonth, i = this.isDateDisabled(e), r = this.isToday(e), s = this.isSelected(e), a = this.isDateInRange(e), n = this.rangeStart?.getTime() === e.getTime(), c = this.rangeEnd?.getTime() === e.getTime(), d = ["calendar__day"];
    return t && d.push("calendar__day--other-month"), r && d.push("calendar__day--today"), s && d.push("calendar__day--selected"), a && d.push("calendar__day--in-range"), n && d.push("calendar__day--range-start"), c && d.push("calendar__day--range-end"), l`
      <button
        class=${d.join(" ")}
        ?disabled=${i || t}
        @click=${() => !t && this.selectDate(e)}
        @mouseenter=${() => this.hoverDate = e}
        @mouseleave=${() => this.hoverDate = null}
        aria-label=${e.toLocaleDateString(this.locale)}
      >
        ${e.getDate()}
      </button>
    `;
  }
  render() {
    const e = performance.now(), t = this.rangeMode && this.range ? `${this.formatDate(this.range.start)} - ${this.formatDate(this.range.end)}` : this.formatDate(this.value), i = this.clearButton && (this.value || this.range) ? l`
      <button
        class="date-picker__clear"
        @click=${(s) => {
      s.stopPropagation(), this.clearValue();
    }}
        aria-label="Clear date"
      >
        ×
      </button>
    ` : g, r = l`
      <div class="date-picker">
        <div class="date-picker__input-wrapper">
          <forge-input
            type="text"
            .value=${t || ""}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            @click=${this.toggleCalendar}
            @change=${this.handleInputChange}
          ></forge-input>
          ${i}
          <forge-icon
            class="date-picker__icon"
            name="calendar"
            size="sm"
          ></forge-icon>
        </div>

        <div
          class="date-picker__calendar"
          data-open=${this.isOpen ? "true" : "false"}
          role="dialog"
          aria-label="Calendar"
        >
          <div class="calendar__header">
            <div class="calendar__nav">
              <button
                class="calendar__nav-button"
                @click=${this.previousMonth}
                aria-label="Previous month"
              >
                <forge-icon name="chevron-left" size="sm"></forge-icon>
              </button>
            </div>
            
            <div class="calendar__month-year">
              <forge-select
                class="calendar__month-select"
                .value=${String(this.currentMonth)}
                .options=${this.monthNames.map((s, a) => ({
      value: String(a),
      label: s
    }))}
                @change=${(s) => {
      this.currentMonth = parseInt(s.detail.value);
    }}
              ></forge-select>
              
              <forge-select
                class="calendar__year-select"
                .value=${String(this.currentYear)}
                .options=${Array.from({ length: 20 }, (s, a) => this.currentYear - 10 + a).map((s) => ({
      value: String(s),
      label: String(s)
    }))}
                @change=${(s) => {
      this.currentYear = parseInt(s.detail.value);
    }}
              ></forge-select>
            </div>
            
            <div class="calendar__nav">
              <button
                class="calendar__nav-button"
                @click=${this.nextMonth}
                aria-label="Next month"
              >
                <forge-icon name="chevron-right" size="sm"></forge-icon>
              </button>
            </div>
          </div>

          <div class="calendar__weekdays">
            ${this.weekdayNames.map((s) => l`
              <div class="calendar__weekday">${s}</div>
            `)}
          </div>

          <div class="calendar__days">
            ${this.getCalendarDays().map((s) => this.renderCalendarDay(s))}
          </div>

          <div class="calendar__footer">
            <button
              class="calendar__today-button"
              @click=${this.selectToday}
            >
              Today
            </button>
            ${this.rangeMode ? l`
              <span class="calendar__range-info">
                ${this.rangeStart && !this.rangeEnd ? "Select end date" : ""}
              </span>
            ` : g}
          </div>
        </div>
      </div>
    `;
    return this.checkPerformance(e), r;
  }
  getPossibleActions() {
    return [
      {
        name: "toggle",
        description: "Toggle calendar open/closed",
        available: !this.disabled,
        result: "Calendar visibility changes"
      },
      {
        name: "selectDate",
        description: "Select a specific date",
        available: !this.disabled && this.isOpen,
        parameters: [
          {
            name: "date",
            type: "date",
            required: !0,
            description: "Date to select"
          }
        ],
        result: "Date is selected"
      },
      {
        name: "clear",
        description: "Clear selected date",
        available: !this.disabled && (this.value !== null || this.range !== null),
        result: "Date selection cleared"
      },
      {
        name: "selectToday",
        description: "Select today's date",
        available: !this.disabled,
        result: "Today's date is selected"
      }
    ];
  }
  explainState() {
    const e = ["empty", "open", "selecting", "selected", "disabled"];
    let t = "empty";
    this.disabled ? t = "disabled" : this.isOpen ? t = this.rangeMode && this.selectingRangeEnd ? "selecting" : "open" : (this.value || this.range) && (t = "selected");
    const i = this.rangeMode ? `Date range picker is ${t}. ${this.range ? "Range selected" : "No range selected"}.` : `Date picker is ${t}. ${this.value ? `Selected: ${this.formatDate(this.value)}` : "No date selected"}.`;
    return {
      currentState: t,
      possibleStates: e,
      stateDescription: i,
      transitions: [
        {
          from: "empty",
          to: "open",
          trigger: "Click input or press Enter"
        },
        {
          from: "open",
          to: "selected",
          trigger: "Click on a date"
        },
        {
          from: "open",
          to: "empty",
          trigger: "Click outside or press Escape"
        },
        {
          from: "selected",
          to: "open",
          trigger: "Click input to change date"
        }
      ],
      visualIndicators: [
        this.isOpen ? "Calendar visible" : "Calendar hidden",
        this.value ? `Date selected: ${this.formatDate(this.value)}` : "No date selected"
      ]
    };
  }
};
D.styles = M`
    ${f.styles}
    
    :host {
      display: inline-block;
      position: relative;
      width: 100%;
      max-width: 300px;
    }

    .date-picker {
      position: relative;
    }

    .date-picker__input-wrapper {
      position: relative;
    }

    .date-picker__icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--forge-text-muted, #6b7280);
    }

    .date-picker__clear {
      position: absolute;
      right: 36px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 50%;
      color: var(--forge-text-muted, #6b7280);
      transition: all 0.2s ease;
    }

    .date-picker__clear:hover {
      background: var(--forge-hover-bg, #f3f4f6);
      color: var(--forge-text-color, #374151);
    }

    .date-picker__calendar {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: 1000;
      background: var(--forge-bg-color, #ffffff);
      border: 1px solid var(--forge-border-color, #d1d5db);
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s ease;
      padding: 16px;
      min-width: 300px;
    }

    .date-picker__calendar[data-open="true"] {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .calendar__nav {
      display: flex;
      gap: 8px;
    }

    .calendar__nav-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      color: var(--forge-text-color, #374151);
      transition: all 0.2s ease;
    }

    .calendar__nav-button:hover:not(:disabled) {
      background: var(--forge-hover-bg, #f3f4f6);
    }

    .calendar__nav-button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .calendar__month-year {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 16px;
    }

    .calendar__month-select,
    .calendar__year-select {
      max-width: 120px;
      font-size: 14px;
    }

    .calendar__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }

    .calendar__weekday {
      padding: 8px 0;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: var(--forge-text-muted, #6b7280);
      text-transform: uppercase;
    }

    .calendar__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .calendar__day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      font-size: 14px;
      color: var(--forge-text-color, #374151);
      transition: all 0.2s ease;
      position: relative;
    }

    .calendar__day:hover:not(:disabled):not(.calendar__day--selected) {
      background: var(--forge-hover-bg, #f3f4f6);
    }

    .calendar__day:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .calendar__day--other-month {
      color: var(--forge-text-muted, #9ca3af);
    }

    .calendar__day--today {
      font-weight: 600;
      color: var(--forge-primary-color, #3b82f6);
    }

    .calendar__day--today::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--forge-primary-color, #3b82f6);
    }

    .calendar__day--selected {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
    }

    .calendar__day--in-range {
      background: var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
    }

    .calendar__day--range-start {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .calendar__day--range-end {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .calendar__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--forge-border-color, #e5e7eb);
    }

    .calendar__today-button {
      padding: 6px 12px;
      border: 1px solid var(--forge-border-color, #d1d5db);
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .calendar__today-button:hover {
      background: var(--forge-hover-bg, #f3f4f6);
    }

    .calendar__range-info {
      font-size: 12px;
      color: var(--forge-text-muted, #6b7280);
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  `;
R([
  o({ type: Object, attribute: !1 })
], D.prototype, "value", 1);
R([
  o({ type: Object, attribute: !1 })
], D.prototype, "range", 1);
R([
  o({ type: String })
], D.prototype, "placeholder", 2);
R([
  o({ type: String })
], D.prototype, "format", 2);
R([
  o({ type: String })
], D.prototype, "locale", 2);
R([
  o({ type: Boolean })
], D.prototype, "disabled", 2);
R([
  o({ type: Boolean })
], D.prototype, "required", 2);
R([
  o({ type: Boolean })
], D.prototype, "readonly", 2);
R([
  o({ type: Boolean, attribute: "range-mode" })
], D.prototype, "rangeMode", 2);
R([
  o({ type: Boolean, attribute: "clear-button" })
], D.prototype, "clearButton", 2);
R([
  o({ type: Object, attribute: !1 })
], D.prototype, "min", 2);
R([
  o({ type: Object, attribute: !1 })
], D.prototype, "max", 2);
R([
  o({ type: Array, attribute: !1 })
], D.prototype, "disabledDates", 2);
R([
  o({ type: Boolean, attribute: "week-start-monday" })
], D.prototype, "weekStartMonday", 2);
R([
  h()
], D.prototype, "isOpen", 2);
R([
  h()
], D.prototype, "currentMonth", 2);
R([
  h()
], D.prototype, "currentYear", 2);
R([
  h()
], D.prototype, "hoverDate", 2);
R([
  h()
], D.prototype, "rangeStart", 2);
R([
  h()
], D.prototype, "rangeEnd", 2);
R([
  h()
], D.prototype, "selectingRangeEnd", 2);
D = R([
  O("forge-date-picker")
], D);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = (e, t, i) => {
  const r = /* @__PURE__ */ new Map();
  for (let s = t; s <= i; s++) r.set(e[s], s);
  return r;
}, qe = Re(class extends Pe {
  constructor(e) {
    if (super(e), e.type !== de.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let r;
    i === void 0 ? i = t : t !== void 0 && (r = t);
    const s = [], a = [];
    let n = 0;
    for (const c of e) s[n] = r ? r(c, n) : n, a[n] = i(c, n), n++;
    return { values: a, keys: s };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, r]) {
    const s = oi(e), { values: a, keys: n } = this.dt(t, i, r);
    if (!Array.isArray(s)) return this.ut = n, a;
    const c = this.ut ??= [], d = [];
    let m, P, p = 0, k = s.length - 1, v = 0, H = a.length - 1;
    for (; p <= k && v <= H; ) if (s[p] === null) p++;
    else if (s[k] === null) k--;
    else if (c[p] === n[v]) d[v] = ve(s[p], a[v]), p++, v++;
    else if (c[k] === n[H]) d[H] = ve(s[k], a[H]), k--, H--;
    else if (c[p] === n[H]) d[H] = ve(s[p], a[H]), Me(e, d[H + 1], s[p]), p++, H--;
    else if (c[k] === n[v]) d[v] = ve(s[k], a[v]), Me(e, s[p], s[k]), k--, v++;
    else if (m === void 0 && (m = mt(n, v, H), P = mt(c, p, k)), m.has(c[p])) if (m.has(c[k])) {
      const he = P.get(n[v]), Ve = he !== void 0 ? s[he] : null;
      if (Ve === null) {
        const rt = Me(e, s[p]);
        ve(rt, a[v]), d[v] = rt;
      } else d[v] = ve(Ve, a[v]), Me(e, s[p], Ve), s[he] = null;
      v++;
    } else We(s[k]), k--;
    else We(s[p]), p++;
    for (; v <= H; ) {
      const he = Me(e, d[H + 1]);
      ve(he, a[v]), d[v++] = he;
    }
    for (; p <= k; ) {
      const he = s[p++];
      he !== null && We(he);
    }
    return this.ut = n, St(e, d), re;
  }
});
var Ni = Object.defineProperty, Ui = Object.getOwnPropertyDescriptor, J = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ui(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Ni(t, i, s), s;
};
let N = class extends f {
  constructor() {
    super(), this.items = [], this.label = "Options", this.position = "bottom-start", this.variant = "default", this.size = "medium", this.disabled = !1, this.closeOnSelect = !0, this.multiSelect = !1, this.icon = "▼", this.placeholder = "", this.isOpen = !1, this.selectedItems = /* @__PURE__ */ new Set(), this.focusedIndex = -1, this.actualPosition = "bottom-start", this.groups = /* @__PURE__ */ new Map(), this.aiMetadata = {
      purpose: "Interactive dropdown menu with selectable options",
      criticality: "medium",
      semanticRole: "menu",
      interactions: [
        {
          type: "click",
          description: "Toggle dropdown menu",
          outcome: "Opens/closes dropdown"
        },
        {
          type: "keyboard",
          description: "Navigate menu with keyboard",
          shortcuts: ["ArrowUp", "ArrowDown", "Enter", "Escape", "Space"]
        },
        {
          type: "select",
          description: "Select menu item",
          outcome: "Triggers selection event"
        }
      ]
    }, this.handleTriggerClick = this.handleTriggerClick.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "combobox"), this.setAttribute("aria-haspopup", "menu"), this.setAttribute("aria-expanded", "false"), document.addEventListener("click", this.handleDocumentClick), this.addEventListener("keydown", this.handleKeydown), this.processGroups();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this.handleDocumentClick), this.removeEventListener("keydown", this.handleKeydown);
  }
  updated(e) {
    super.updated(e), e.has("isOpen") && (this.setAttribute("aria-expanded", String(this.isOpen)), this.updateComponentState("open", this.isOpen), this.emit("dropdownvisibilitychange", { open: this.isOpen }), this.isOpen && (this.updatePosition(), this.focusedIndex = -1)), e.has("items") && this.processGroups(), e.has("disabled") && (this.updateComponentState("disabled", this.disabled), this.disabled && this.isOpen && this.close());
  }
  processGroups() {
    this.groups.clear(), this.items.forEach((e) => {
      e.group && (this.groups.has(e.group) || this.groups.set(e.group, []), this.groups.get(e.group).push(e));
    });
  }
  handleTriggerClick(e) {
    this.disabled || (e.stopPropagation(), this.toggle());
  }
  handleDocumentClick(e) {
    if (!this.isOpen) return;
    e.composedPath().includes(this) || this.close();
  }
  handleKeydown(e) {
    if (!this.disabled)
      switch (e.key) {
        case "Enter":
        case " ":
          this.isOpen ? this.focusedIndex >= 0 && (e.preventDefault(), this.selectItemAtIndex(this.focusedIndex)) : (e.preventDefault(), this.open());
          break;
        case "Escape":
          this.isOpen && (e.preventDefault(), this.close());
          break;
        case "ArrowDown":
          e.preventDefault(), this.isOpen ? this.focusNextItem() : this.open();
          break;
        case "ArrowUp":
          e.preventDefault(), this.isOpen && this.focusPreviousItem();
          break;
        case "Home":
          this.isOpen && (e.preventDefault(), this.focusFirstItem());
          break;
        case "End":
          this.isOpen && (e.preventDefault(), this.focusLastItem());
          break;
      }
  }
  focusNextItem() {
    if (this.items.filter((t) => !t.disabled && !t.divider).length !== 0) {
      for (this.focusedIndex = (this.focusedIndex + 1) % this.items.length; this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider; )
        this.focusedIndex = (this.focusedIndex + 1) % this.items.length;
      this.scrollToFocused();
    }
  }
  focusPreviousItem() {
    if (this.items.filter((t) => !t.disabled && !t.divider).length !== 0) {
      for (this.focusedIndex = this.focusedIndex <= 0 ? this.items.length - 1 : this.focusedIndex - 1; this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider; )
        this.focusedIndex = this.focusedIndex <= 0 ? this.items.length - 1 : this.focusedIndex - 1;
      this.scrollToFocused();
    }
  }
  focusFirstItem() {
    for (this.focusedIndex = 0; this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider; )
      if (this.focusedIndex++, this.focusedIndex >= this.items.length) {
        this.focusedIndex = -1;
        return;
      }
    this.scrollToFocused();
  }
  focusLastItem() {
    for (this.focusedIndex = this.items.length - 1; this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider; )
      if (this.focusedIndex--, this.focusedIndex < 0) {
        this.focusedIndex = -1;
        return;
      }
    this.scrollToFocused();
  }
  scrollToFocused() {
    requestAnimationFrame(() => {
      const e = this.shadowRoot?.querySelector(".dropdown__menu"), t = this.shadowRoot?.querySelectorAll(".dropdown__item");
      e && t && t[this.focusedIndex] && t[this.focusedIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    });
  }
  handleItemClick(e, t, i) {
    i.stopPropagation(), !(e.disabled || e.divider) && this.selectItemAtIndex(t);
  }
  selectItemAtIndex(e) {
    const t = this.items[e];
    !t || t.disabled || t.divider || (t.type === "checkbox" || this.multiSelect ? (this.selectedItems.has(t.id) ? this.selectedItems.delete(t.id) : this.selectedItems.add(t.id), this.requestUpdate()) : t.type === "radio" && (this.selectedItems.clear(), this.selectedItems.add(t.id), this.requestUpdate()), this.emit("forge-select", {
      item: t,
      index: e,
      selected: Array.from(this.selectedItems)
    }), this.closeOnSelect && !this.multiSelect && t.type !== "checkbox" && this.close());
  }
  updatePosition() {
    this.position === "auto" ? this.calculateAutoPosition() : this.actualPosition = this.position;
  }
  calculateAutoPosition() {
    const e = this.shadowRoot?.querySelector(".dropdown__trigger"), t = this.shadowRoot?.querySelector(".dropdown__menu");
    if (!e || !t) return;
    const i = e.getBoundingClientRect(), r = window.innerWidth, s = window.innerHeight, a = 250, n = 300, c = s - i.bottom, d = i.top, m = r - i.left, P = i.right;
    let p = "bottom-start";
    c >= n ? p = m >= a ? "bottom-start" : "bottom-end" : d >= n ? p = m >= a ? "top-start" : "top-end" : m >= a ? p = "right" : P >= a && (p = "left"), this.actualPosition = p;
  }
  open() {
    this.disabled || (this.isOpen = !0);
  }
  close() {
    this.isOpen = !1;
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  renderItem(e, t) {
    if (e.divider)
      return l`<div class="dropdown__divider"></div>`;
    const i = this.selectedItems.has(e.id), r = t === this.focusedIndex, s = {
      dropdown__item: !0,
      "dropdown__item--disabled": e.disabled || !1,
      "dropdown__item--selected": i,
      "dropdown__item--has-children": !!(e.items && e.items.length > 0)
    };
    return l`
      <div
        class=${W(s)}
        role="menuitem"
        tabindex=${e.disabled ? "-1" : "0"}
        aria-disabled=${e.disabled || !1}
        aria-selected=${i}
        aria-current=${r}
        @click=${(a) => this.handleItemClick(e, t, a)}
      >
        ${e.type === "checkbox" ? l`
          <input 
            type="checkbox" 
            class="dropdown__item-checkbox"
            .checked=${i}
            ?disabled=${e.disabled}
          />
        ` : e.type === "radio" ? l`
          <input 
            type="radio" 
            class="dropdown__item-radio"
            .checked=${i}
            ?disabled=${e.disabled}
          />
        ` : ""}
        ${e.icon ? l`<span class="dropdown__item-icon">${e.icon}</span>` : ""}
        <span class="dropdown__item-label">${e.label}</span>
        ${e.badge !== void 0 ? l`
          <span class="dropdown__item-badge">${e.badge}</span>
        ` : ""}
        ${e.items && e.items.length > 0 ? l`
          <span class="dropdown__item-arrow">›</span>
          <div class="dropdown__submenu dropdown__menu">
            ${qe(
      e.items,
      (a) => a.id,
      (a, n) => this.renderItem(a, n)
    )}
          </div>
        ` : ""}
      </div>
    `;
  }
  render() {
    const e = performance.now(), t = {
      dropdown__trigger: !0,
      [`dropdown__trigger--${this.variant}`]: !0,
      [`dropdown__trigger--${this.size}`]: !0,
      "dropdown__trigger--active": this.isOpen,
      "dropdown__trigger--disabled": this.disabled
    }, i = {
      dropdown__menu: !0,
      [`dropdown__menu--${this.actualPosition}`]: !0,
      "dropdown__menu--visible": this.isOpen
    }, r = this.selectedItems.size > 0 && !this.multiSelect ? this.items.find((a) => this.selectedItems.has(a.id))?.label || this.label : this.selectedItems.size > 0 && this.multiSelect ? `${this.selectedItems.size} selected` : this.label, s = l`
      <div class="dropdown">
        <forge-button
          class=${W(t)}
          @click=${this.handleTriggerClick}
          aria-label=${this.label}
          aria-expanded=${this.isOpen}
          aria-haspopup="menu"
          ?disabled=${this.disabled}
          variant="default"
        >
          <span>${r}</span>
          <span class="dropdown__trigger-icon">${this.icon}</span>
        </forge-button>
        <div 
          class=${W(i)}
          role="menu"
          aria-hidden=${!this.isOpen}
        >
          ${this.groups.size > 0 ? Array.from(this.groups.entries()).map(([a, n]) => l`
              <div class="dropdown__group">${a}</div>
              ${qe(
      n,
      (c) => c.id,
      (c, d) => this.renderItem(c, this.items.indexOf(c))
    )}
            `) : qe(
      this.items,
      (a) => a.id,
      (a, n) => this.renderItem(a, n)
    )}
        </div>
      </div>
    `;
    return this.checkPerformance(e), s;
  }
  getPossibleActions() {
    return [
      {
        name: "open",
        description: "Open dropdown menu",
        available: !this.disabled && !this.isOpen,
        result: "Shows dropdown options"
      },
      {
        name: "close",
        description: "Close dropdown menu",
        available: !this.disabled && this.isOpen,
        result: "Hides dropdown options"
      },
      {
        name: "select",
        description: "Select an item",
        available: !this.disabled && this.items.length > 0,
        parameters: [
          {
            name: "itemId",
            type: "text",
            required: !0,
            description: "ID of item to select"
          }
        ],
        result: "Selects specified item"
      },
      {
        name: "clear",
        description: "Clear selection",
        available: !this.disabled && this.selectedItems.size > 0,
        result: "Clears all selected items"
      }
    ];
  }
  explainState() {
    const e = ["closed", "open", "disabled"];
    let t = "closed";
    return this.disabled ? t = "disabled" : this.isOpen && (t = "open"), {
      currentState: t,
      possibleStates: e,
      stateDescription: `Dropdown is ${t}. ${this.selectedItems.size} item(s) selected. ${this.items.length} total items.`,
      transitions: [
        {
          from: "closed",
          to: "open",
          trigger: "Click trigger or Enter/Space key"
        },
        {
          from: "open",
          to: "closed",
          trigger: "Select item, Escape key, or click outside"
        }
      ],
      visualIndicators: [
        this.isOpen ? "Menu visible with options" : "Menu hidden",
        `${this.variant} trigger style`,
        this.selectedItems.size > 0 ? "Items selected" : "No selection"
      ]
    };
  }
};
N.styles = M`
    ${f.styles}
    
    :host {
      position: relative;
      display: inline-block;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown__trigger {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--forge-dropdown-trigger-bg, white);
      border: 1px solid var(--forge-border-color, #e5e7eb);
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      user-select: none;
    }

    .dropdown__trigger:hover {
      background: var(--forge-dropdown-trigger-hover-bg, #f9fafb);
      border-color: var(--forge-border-hover-color, #d1d5db);
    }

    .dropdown__trigger:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
    }

    .dropdown__trigger--active {
      background: var(--forge-dropdown-trigger-active-bg, #f3f4f6);
      border-color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__trigger--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Trigger variants */
    .dropdown__trigger--primary {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
      border-color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__trigger--primary:hover {
      background: var(--forge-primary-hover, #2563eb);
      border-color: var(--forge-primary-hover, #2563eb);
    }

    .dropdown__trigger--secondary {
      background: transparent;
      border-color: var(--forge-primary-color, #3b82f6);
      color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__trigger--minimal {
      background: transparent;
      border: none;
      padding: 4px 8px;
    }

    .dropdown__trigger--minimal:hover {
      background: var(--forge-dropdown-trigger-hover-bg, #f9fafb);
    }

    /* Trigger sizes */
    .dropdown__trigger--small {
      padding: 6px 10px;
      font-size: 12px;
    }

    .dropdown__trigger--large {
      padding: 10px 16px;
      font-size: 16px;
    }

    .dropdown__trigger-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
    }

    .dropdown__trigger--active .dropdown__trigger-icon {
      transform: rotate(180deg);
    }

    /* Menu */
    .dropdown__menu {
      position: absolute;
      z-index: 1000;
      min-width: 200px;
      max-width: 320px;
      max-height: 400px;
      overflow-y: auto;
      background: var(--forge-dropdown-menu-bg, white);
      border: 1px solid var(--forge-border-color, #e5e7eb);
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      padding: 4px;
    }

    .dropdown__menu--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Menu positions */
    .dropdown__menu--bottom-start {
      top: calc(100% + 4px);
      left: 0;
    }

    .dropdown__menu--bottom-end {
      top: calc(100% + 4px);
      right: 0;
    }

    .dropdown__menu--top-start {
      bottom: calc(100% + 4px);
      left: 0;
    }

    .dropdown__menu--top-end {
      bottom: calc(100% + 4px);
      right: 0;
    }

    .dropdown__menu--left {
      right: calc(100% + 4px);
      top: 0;
    }

    .dropdown__menu--right {
      left: calc(100% + 4px);
      top: 0;
    }

    /* Menu items */
    .dropdown__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.15s;
      position: relative;
      user-select: none;
    }

    .dropdown__item:hover {
      background: var(--forge-dropdown-item-hover-bg, #f3f4f6);
    }

    .dropdown__item:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: -2px;
    }

    .dropdown__item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .dropdown__item--selected {
      background: var(--forge-dropdown-item-selected-bg, #eff6ff);
      color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__item-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .dropdown__item-label {
      flex: 1;
    }

    .dropdown__item-badge {
      padding: 2px 6px;
      background: var(--forge-badge-bg, #f3f4f6);
      color: var(--forge-badge-color, #6b7280);
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }

    .dropdown__item-checkbox,
    .dropdown__item-radio {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .dropdown__item-arrow {
      width: 12px;
      height: 12px;
      margin-left: auto;
      opacity: 0.6;
    }

    /* Divider */
    .dropdown__divider {
      height: 1px;
      background: var(--forge-border-color, #e5e7eb);
      margin: 4px 0;
    }

    /* Group */
    .dropdown__group {
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--forge-text-secondary, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Nested menu */
    .dropdown__item--has-children {
      position: relative;
    }

    .dropdown__item--has-children .dropdown__submenu {
      position: absolute;
      left: calc(100% + 4px);
      top: 0;
      opacity: 0;
      visibility: hidden;
      transform: translateX(-8px);
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
    }

    .dropdown__item--has-children:hover .dropdown__submenu,
    .dropdown__item--has-children:focus-within .dropdown__submenu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    /* Scrollbar styling */
    .dropdown__menu::-webkit-scrollbar {
      width: 8px;
    }

    .dropdown__menu::-webkit-scrollbar-track {
      background: var(--forge-scrollbar-track, #f3f4f6);
      border-radius: 4px;
    }

    .dropdown__menu::-webkit-scrollbar-thumb {
      background: var(--forge-scrollbar-thumb, #d1d5db);
      border-radius: 4px;
    }

    .dropdown__menu::-webkit-scrollbar-thumb:hover {
      background: var(--forge-scrollbar-thumb-hover, #9ca3af);
    }
  `;
J([
  o({ type: Array })
], N.prototype, "items", 2);
J([
  o({ type: String })
], N.prototype, "label", 2);
J([
  o({ type: String })
], N.prototype, "position", 2);
J([
  o({ type: String })
], N.prototype, "variant", 2);
J([
  o({ type: String })
], N.prototype, "size", 2);
J([
  o({ type: Boolean })
], N.prototype, "disabled", 2);
J([
  o({ type: Boolean, attribute: "close-on-select" })
], N.prototype, "closeOnSelect", 2);
J([
  o({ type: Boolean, attribute: "multi-select" })
], N.prototype, "multiSelect", 2);
J([
  o({ type: String })
], N.prototype, "icon", 2);
J([
  o({ type: String, attribute: "placeholder" })
], N.prototype, "placeholder", 2);
J([
  h()
], N.prototype, "isOpen", 2);
J([
  h()
], N.prototype, "selectedItems", 2);
J([
  h()
], N.prototype, "focusedIndex", 2);
J([
  h()
], N.prototype, "actualPosition", 2);
J([
  h()
], N.prototype, "groups", 2);
N = J([
  O("forge-dropdown")
], N);
var Vi = Object.defineProperty, Yi = Object.getOwnPropertyDescriptor, V = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Yi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Vi(t, i, s), s;
};
let L = class extends f {
  constructor() {
    super(), this.variant = "default", this.size = "medium", this.elevation = -1, this.clickable = !1, this.selected = !1, this.disabled = !1, this.loading = !1, this.title = "", this.subtitle = "", this.mediaAspect = "16-9", this.noHeaderBorder = !1, this.noFooterBorder = !1, this.ariaLabel = null, this.hasMedia = !1, this.hasHeader = !1, this.hasFooter = !1, this.hasActions = !1, this.aiMetadata = {
      purpose: "Container for structured content with optional media",
      criticality: "low",
      semanticRole: "article",
      interactions: [
        {
          type: "click",
          description: "Card click interaction",
          outcome: "Triggers card action if clickable"
        },
        {
          type: "hover",
          description: "Hover effect",
          outcome: "Visual feedback on interactive cards"
        },
        {
          type: "keyboard",
          description: "Keyboard navigation",
          shortcuts: ["Enter", "Space"]
        }
      ]
    }, this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  connectedCallback() {
    super.connectedCallback(), this.updateSlotStatus(), this.clickable && (this.setAttribute("role", "button"), this.setAttribute("tabindex", "0"));
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.shadowRoot?.querySelectorAll("slot").forEach((t) => {
      t.addEventListener("slotchange", () => this.updateSlotStatus());
    });
  }
  updated(e) {
    super.updated(e), e.has("clickable") && (this.clickable ? (this.setAttribute("role", "button"), this.setAttribute("tabindex", "0")) : (this.removeAttribute("role"), this.removeAttribute("tabindex"))), e.has("selected") && (this.updateComponentState("selected", this.selected), this.emit("cardselect", { selected: this.selected })), e.has("disabled") && (this.updateComponentState("disabled", this.disabled), this.setAttribute("aria-disabled", String(this.disabled)));
  }
  updateSlotStatus() {
    (this.shadowRoot?.querySelectorAll("slot") || []).forEach((t) => {
      const i = t.getAttribute("name"), r = t.assignedNodes().length > 0;
      switch (i) {
        case "media":
          this.hasMedia = r;
          break;
        case "header":
          this.hasHeader = r;
          break;
        case "footer":
          this.hasFooter = r;
          break;
        case "actions":
          this.hasActions = r;
          break;
      }
    });
  }
  handleClick(e) {
    this.disabled || !this.clickable || this.emit("cardclick", {
      originalEvent: e,
      selected: this.selected
    });
  }
  handleKeydown(e) {
    this.disabled || !this.clickable || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.handleClick(e));
  }
  getElevationClass() {
    return this.elevation >= 0 && this.elevation <= 5 ? `card--elevation-${this.elevation}` : this.variant === "elevated" ? "card--elevation-2" : "";
  }
  render() {
    const e = performance.now(), t = {
      card: !0,
      [`card--${this.variant}`]: !0,
      [`card--${this.size}`]: !0,
      "card--clickable": this.clickable,
      "card--selected": this.selected,
      "card--disabled": this.disabled,
      "card--loading": this.loading,
      [this.getElevationClass()]: this.elevation >= 0 || this.variant === "elevated"
    }, i = l`
      <article 
        class=${W(t)}
        aria-label=${this.ariaLabel || this.title || "Card"}
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}
        aria-busy=${this.loading}
      >
        <slot name="media" class="card__media card__media--${this.mediaAspect}"></slot>
        
        <slot name="header"></slot>
        ${this.title || this.subtitle ? l`
          <header class="card__header ${this.noHeaderBorder ? "card__header--no-border" : ""}">
            ${this.title ? l`<h3 class="card__title">${this.title}</h3>` : ""}
            ${this.subtitle ? l`<p class="card__subtitle">${this.subtitle}</p>` : ""}
          </header>
        ` : ""}
        
        <div class="card__body">
          <slot></slot>
        </div>
        
        <slot name="footer"></slot>
        <slot name="actions"></slot>
      </article>
    `;
    return this.checkPerformance(e), i;
  }
  getPossibleActions() {
    return [
      {
        name: "click",
        description: "Click the card",
        available: this.clickable && !this.disabled,
        result: "Triggers card action"
      },
      {
        name: "select",
        description: "Select/deselect the card",
        available: this.clickable && !this.disabled,
        parameters: [
          {
            name: "selected",
            type: "boolean",
            required: !0,
            description: "Selection state"
          }
        ],
        result: "Changes card selection state"
      },
      {
        name: "expand",
        description: "Expand card details",
        available: !1,
        // Could be implemented in future
        result: "Shows expanded view"
      }
    ];
  }
  explainState() {
    const e = ["default", "hover", "selected", "disabled", "loading"];
    let t = "default";
    return this.disabled ? t = "disabled" : this.loading ? t = "loading" : this.selected && (t = "selected"), {
      currentState: t,
      possibleStates: e,
      stateDescription: `Card is ${t}. ${this.clickable ? "Interactive" : "Static"} container with ${this.variant} variant.`,
      transitions: [
        {
          from: "default",
          to: "selected",
          trigger: "Click or Enter/Space key"
        },
        {
          from: "selected",
          to: "default",
          trigger: "Click again to deselect"
        }
      ],
      visualIndicators: [
        this.selected ? "Blue border with shadow" : "Default border",
        this.clickable ? "Hover elevation effect" : "Static appearance",
        this.loading ? "Skeleton animation" : "Normal content"
      ]
    };
  }
};
L.styles = M`
    ${f.styles}
    
    :host {
      display: block;
      width: 100%;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: var(--forge-card-bg, #ffffff);
      border-radius: var(--forge-card-radius, 8px);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    /* Variants */
    .card--default {
      border: 1px solid var(--forge-border-color, #e5e7eb);
    }

    .card--outlined {
      border: 2px solid var(--forge-border-color, #e5e7eb);
    }

    .card--elevated {
      border: none;
      box-shadow: 
        0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .card--elevated:hover {
      box-shadow: 
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .card--filled {
      border: none;
      background: var(--forge-card-filled-bg, #f3f4f6);
    }

    /* Interactive states */
    .card--clickable {
      cursor: pointer;
    }

    .card--clickable:hover {
      transform: translateY(-2px);
    }

    .card--clickable:active {
      transform: translateY(0);
    }

    .card--selected {
      border-color: var(--forge-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
    }

    .card--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Elevation levels */
    .card--elevation-0 {
      box-shadow: none;
    }

    .card--elevation-1 {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .card--elevation-2 {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card--elevation-3 {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .card--elevation-4 {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .card--elevation-5 {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    /* Size variations */
    .card--small {
      --card-padding: 12px;
    }

    .card--medium {
      --card-padding: 16px;
    }

    .card--large {
      --card-padding: 24px;
    }

    /* Card sections */
    .card__media {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--forge-card-media-bg, #f3f4f6);
    }

    .card__media ::slotted(img),
    .card__media ::slotted(video) {
      width: 100%;
      height: auto;
      display: block;
    }

    .card__media--16-9 {
      aspect-ratio: 16 / 9;
    }

    .card__media--4-3 {
      aspect-ratio: 4 / 3;
    }

    .card__media--1-1 {
      aspect-ratio: 1 / 1;
    }

    .card__header {
      padding: var(--card-padding, 16px);
      border-bottom: 1px solid var(--forge-border-light, #f3f4f6);
    }

    .card__header--no-border {
      border-bottom: none;
    }

    .card__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--forge-text-primary, #111827);
    }

    .card__subtitle {
      margin: 4px 0 0;
      font-size: 0.875rem;
      color: var(--forge-text-secondary, #6b7280);
    }

    .card__body {
      flex: 1;
      padding: var(--card-padding, 16px);
    }

    .card__footer {
      padding: var(--card-padding, 16px);
      border-top: 1px solid var(--forge-border-light, #f3f4f6);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card__footer--no-border {
      border-top: none;
    }

    .card__actions {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }

    /* Loading skeleton */
    .card--loading .card__body {
      position: relative;
      min-height: 100px;
    }

    .card--loading .card__body::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      animation: skeleton-loading 1.5s ease-in-out infinite;
    }

    @keyframes skeleton-loading {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .card--large {
        --card-padding: 16px;
      }
    }

    /* Focus styles */
    .card--clickable:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
    }

    /* Slots */
    ::slotted([slot="header"]) {
      display: block;
    }

    ::slotted([slot="footer"]) {
      display: block;
    }

    ::slotted([slot="actions"]) {
      display: flex;
      gap: 8px;
    }
  `;
V([
  o({ type: String })
], L.prototype, "variant", 2);
V([
  o({ type: String })
], L.prototype, "size", 2);
V([
  o({ type: Number })
], L.prototype, "elevation", 2);
V([
  o({ type: Boolean })
], L.prototype, "clickable", 2);
V([
  o({ type: Boolean })
], L.prototype, "selected", 2);
V([
  o({ type: Boolean })
], L.prototype, "disabled", 2);
V([
  o({ type: Boolean })
], L.prototype, "loading", 2);
V([
  o({ type: String })
], L.prototype, "title", 2);
V([
  o({ type: String })
], L.prototype, "subtitle", 2);
V([
  o({ type: String, attribute: "media-aspect" })
], L.prototype, "mediaAspect", 2);
V([
  o({ type: Boolean, attribute: "no-header-border" })
], L.prototype, "noHeaderBorder", 2);
V([
  o({ type: Boolean, attribute: "no-footer-border" })
], L.prototype, "noFooterBorder", 2);
V([
  o({ type: String, attribute: "aria-label" })
], L.prototype, "ariaLabel", 2);
V([
  h()
], L.prototype, "hasMedia", 2);
V([
  h()
], L.prototype, "hasHeader", 2);
V([
  h()
], L.prototype, "hasFooter", 2);
V([
  h()
], L.prototype, "hasActions", 2);
L = V([
  O("forge-card")
], L);
var Wi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, Y = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Qi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Wi(t, i, s), s;
};
let F = class extends f {
  constructor() {
    super(), this.open = !1, this.size = "medium", this.title = "", this.showClose = !0, this.closeOnBackdrop = !0, this.closeOnEscape = !0, this.noHeaderBorder = !1, this.noFooterBorder = !1, this.scrollBehavior = "body", this.preventBodyScroll = !0, this.animation = "fade", this.stackLevel = 0, this.ariaLabel = null, this.hasFooter = !1, this.focusedElementBeforeOpen = null, this.focusableElements = [], this.firstFocusableElement = null, this.lastFocusableElement = null, this.aiMetadata = {
      purpose: "Modal dialog for focused content or interactions",
      criticality: "high",
      semanticRole: "dialog",
      interactions: [
        {
          type: "keyboard",
          description: "ESC to close, Tab for focus navigation",
          shortcuts: ["Escape", "Tab", "Shift+Tab"]
        },
        {
          type: "click",
          description: "Click backdrop to close",
          outcome: "Closes modal if closeOnBackdrop is true"
        },
        {
          type: "focus",
          description: "Focus trap management",
          outcome: "Keeps focus within modal while open"
        }
      ]
    }, this.handleEscape = this.handleEscape.bind(this), this.handleBackdropClick = this.handleBackdropClick.bind(this), this.handleFocusTrap = this.handleFocusTrap.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.getAttribute("show-close") === "false" && (this.showClose = !1), this.getAttribute("close-on-backdrop") === "false" && (this.closeOnBackdrop = !1), this.updateSlotStatus(), this.open && this.handleOpen();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.handleClose();
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.shadowRoot?.querySelector('slot[name="footer"]')?.addEventListener("slotchange", () => this.updateSlotStatus());
  }
  updated(e) {
    super.updated(e), e.has("open") && (this.open ? this.handleOpen() : this.handleClose(), this.updateComponentState("open", this.open), this.emit("modaltoggle", { open: this.open })), e.has("stackLevel") && this.style.setProperty("--stack-level", String(this.stackLevel));
  }
  updateSlotStatus() {
    const e = this.shadowRoot?.querySelector('slot[name="footer"]');
    this.hasFooter = e ? e.assignedNodes().length > 0 : !1;
  }
  handleOpen() {
    this.focusedElementBeforeOpen = document.activeElement, this.closeOnEscape && document.addEventListener("keydown", this.handleEscape), this.preventBodyScroll && (document.body.style.overflow = "hidden"), requestAnimationFrame(() => {
      this.setupFocusTrap(), this.focusFirstElement();
    });
  }
  handleClose() {
    document.removeEventListener("keydown", this.handleEscape), this.preventBodyScroll && (document.body.style.overflow = ""), this.focusedElementBeforeOpen && (this.focusedElementBeforeOpen.focus(), this.focusedElementBeforeOpen = null);
  }
  handleEscape(e) {
    e.key === "Escape" && this.open && (e.preventDefault(), this.close());
  }
  handleBackdropClick(e) {
    this.closeOnBackdrop && e.target === e.currentTarget && this.close();
  }
  setupFocusTrap() {
    if (!this.modalElement) return;
    const e = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    this.focusableElements = Array.from(
      this.modalElement.querySelectorAll(e)
    ), (this.shadowRoot?.querySelectorAll("slot") || []).forEach((i) => {
      i.assignedElements().forEach((s) => {
        const a = s.querySelectorAll(e);
        this.focusableElements.push(...Array.from(a));
      });
    }), this.focusableElements.length > 0 && (this.firstFocusableElement = this.focusableElements[0], this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1], this.modalElement.addEventListener("keydown", this.handleFocusTrap));
  }
  handleFocusTrap(e) {
    e.key === "Tab" && (e.shiftKey ? document.activeElement === this.firstFocusableElement && (e.preventDefault(), this.lastFocusableElement?.focus()) : document.activeElement === this.lastFocusableElement && (e.preventDefault(), this.firstFocusableElement?.focus()));
  }
  focusFirstElement() {
    this.firstFocusableElement ? this.firstFocusableElement.focus() : this.modalElement && (this.modalElement.setAttribute("tabindex", "-1"), this.modalElement.focus());
  }
  handleCloseClick() {
    this.close();
  }
  close() {
    const e = new CustomEvent("close", {
      bubbles: !0,
      composed: !0,
      cancelable: !0
    });
    this.dispatchEvent(e), e.defaultPrevented || (this.open = !1);
  }
  show() {
    const e = new CustomEvent("open", {
      bubbles: !0,
      composed: !0,
      cancelable: !0
    });
    this.dispatchEvent(e), e.defaultPrevented || (this.open = !0);
  }
  render() {
    const e = performance.now(), t = {
      "modal-container": !0,
      "modal-container--open": this.open
    }, i = {
      modal: !0,
      [`modal--${this.size}`]: !0,
      [`modal--scroll-${this.scrollBehavior}`]: !0,
      "modal--no-header-border": this.noHeaderBorder,
      "modal--no-footer-border": this.noFooterBorder,
      [`modal--animation-${this.animation}`]: this.animation !== "none"
    }, r = l`
      <div 
        class=${W(t)}
        @click=${this.handleBackdropClick}
      >
        <div class="modal-backdrop"></div>
        <div 
          class=${W(i)}
          role="dialog"
          aria-modal="true"
          aria-label=${this.ariaLabel || this.title || "Modal dialog"}
          aria-describedby="modal-body"
        >
          <div class="modal__header">
            ${this.title ? l`<h2 class="modal__title">${this.title}</h2>` : l`<slot name="header"></slot>`}
            ${this.showClose ? l`
              <forge-button 
                class="modal__close"
                @click=${this.handleCloseClick}
                aria-label="Close modal"
                variant="ghost"
                size="sm"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.95 5.05L5.05 14.95M5.05 5.05L14.95 14.95" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </forge-button>
            ` : ""}
          </div>
          
          <div class="modal__body" id="modal-body">
            <slot></slot>
          </div>
          
          <div class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
    return this.checkPerformance(e), r;
  }
  getPossibleActions() {
    return [
      {
        name: "open",
        description: "Open the modal",
        available: !this.open,
        result: "Shows the modal dialog"
      },
      {
        name: "close",
        description: "Close the modal",
        available: this.open,
        result: "Hides the modal dialog"
      },
      {
        name: "toggle",
        description: "Toggle modal visibility",
        available: !0,
        parameters: [
          {
            name: "open",
            type: "boolean",
            required: !1,
            description: "Specific state to set"
          }
        ],
        result: "Changes modal visibility"
      }
    ];
  }
  explainState() {
    const e = ["closed", "open", "opening", "closing"], t = this.open ? "open" : "closed";
    return {
      currentState: t,
      possibleStates: e,
      stateDescription: `Modal is ${t}. ${this.size} sized dialog with ${this.scrollBehavior} scroll behavior.`,
      transitions: [
        {
          from: "closed",
          to: "open",
          trigger: "show() method or open property set to true"
        },
        {
          from: "open",
          to: "closed",
          trigger: "ESC key, backdrop click, or close button"
        }
      ],
      visualIndicators: [
        this.open ? "Visible with backdrop" : "Hidden",
        "Focus trapped within modal when open",
        "Body scroll prevented when open"
      ]
    };
  }
};
F.styles = M`
    ${f.styles}
    
    :host {
      display: contents;
    }

    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--forge-modal-z-index, 1000);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-container--open {
      opacity: 1;
      visibility: visible;
    }

    .modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--forge-modal-backdrop, rgba(0, 0, 0, 0.5));
      backdrop-filter: var(--forge-modal-backdrop-blur, blur(4px));
      transition: opacity 0.3s ease;
    }

    .modal {
      position: relative;
      background: var(--forge-modal-bg, #ffffff);
      border-radius: var(--forge-modal-radius, 12px);
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      transform: scale(0.95);
      transition: transform 0.3s ease;
    }

    .modal-container--open .modal {
      transform: scale(1);
    }

    /* Size variants */
    .modal--small {
      width: 100%;
      max-width: 400px;
    }

    .modal--medium {
      width: 100%;
      max-width: 600px;
    }

    .modal--large {
      width: 100%;
      max-width: 900px;
    }

    .modal--full {
      width: calc(100vw - 32px);
      height: calc(100vh - 32px);
      max-width: none;
    }

    /* Header */
    .modal__header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--forge-border-light, #e5e7eb);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .modal__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--forge-text-primary, #111827);
    }

    .modal__close {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--forge-text-secondary, #6b7280);
      border-radius: 6px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal__close:hover {
      background: var(--forge-hover-bg, #f3f4f6);
      color: var(--forge-text-primary, #111827);
    }

    .modal__close:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
    }

    /* Body */
    .modal__body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }

    .modal--scroll-entire .modal__body {
      overflow-y: visible;
    }

    .modal--scroll-entire .modal {
      overflow-y: auto;
    }

    /* Footer */
    .modal__footer {
      padding: 16px 24px;
      border-top: 1px solid var(--forge-border-light, #e5e7eb);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      flex-shrink: 0;
    }

    /* No header/footer borders */
    .modal--no-header-border .modal__header {
      border-bottom: none;
    }

    .modal--no-footer-border .modal__footer {
      border-top: none;
    }

    /* Focus trap indicator */
    .focus-trap-indicator {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Stacking context for multiple modals */
    :host([stacked]) .modal-container {
      z-index: calc(var(--forge-modal-z-index, 1000) + var(--stack-level, 1));
    }

    /* Animation variants */
    @keyframes modal-slide-up {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes modal-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal--animation-slide .modal {
      animation: modal-slide-up 0.3s ease forwards;
    }

    .modal--animation-fade .modal {
      animation: modal-fade-in 0.3s ease forwards;
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .modal-container {
        padding: 0;
      }

      .modal--small,
      .modal--medium,
      .modal--large {
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        border-radius: 0;
      }
    }
  `;
Y([
  o({ type: Boolean })
], F.prototype, "open", 2);
Y([
  o({ type: String })
], F.prototype, "size", 2);
Y([
  o({ type: String })
], F.prototype, "title", 2);
Y([
  o({ type: Boolean, attribute: "show-close", reflect: !0 })
], F.prototype, "showClose", 2);
Y([
  o({ type: Boolean, attribute: "close-on-backdrop", reflect: !0 })
], F.prototype, "closeOnBackdrop", 2);
Y([
  o({ type: Boolean, attribute: "close-on-escape" })
], F.prototype, "closeOnEscape", 2);
Y([
  o({ type: Boolean, attribute: "no-header-border" })
], F.prototype, "noHeaderBorder", 2);
Y([
  o({ type: Boolean, attribute: "no-footer-border" })
], F.prototype, "noFooterBorder", 2);
Y([
  o({ type: String, attribute: "scroll-behavior" })
], F.prototype, "scrollBehavior", 2);
Y([
  o({ type: Boolean, attribute: "prevent-body-scroll" })
], F.prototype, "preventBodyScroll", 2);
Y([
  o({ type: String })
], F.prototype, "animation", 2);
Y([
  o({ type: Number, attribute: "stack-level" })
], F.prototype, "stackLevel", 2);
Y([
  o({ type: String, attribute: "aria-label" })
], F.prototype, "ariaLabel", 2);
Y([
  h()
], F.prototype, "hasFooter", 2);
Y([
  h()
], F.prototype, "focusedElementBeforeOpen", 2);
Y([
  ne(".modal")
], F.prototype, "modalElement", 2);
Y([
  ne(".modal__body")
], F.prototype, "bodyElement", 2);
F = Y([
  O("forge-modal")
], F);
var Ki = Object.defineProperty, Gi = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Gi(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Ki(t, i, s), s;
};
let se = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "User notification and feedback display",
      context: "notification",
      dataType: "text",
      criticality: "medium",
      semanticRole: "alert"
    }, this.title = "", this.message = "", this.variant = "info", this.duration = 5e3, this.dismissible = !0, this.showProgress = !1, this.persistent = !1, this.toastId = "", this.isVisible = !0, this.progressWidth = 100;
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.setAttribute("role", this.variant === "error" ? "alert" : "status"), this.setAttribute("aria-live", this.variant === "error" ? "assertive" : "polite"), this.shouldAutoDismiss() && this.startAutoDismiss(), this.setAttribute("data-entering", ""), setTimeout(() => {
      this.removeAttribute("data-entering");
    }, 300);
  }
  updated(e) {
    super.updated(e), e.has("variant") && (this.setAttribute("role", this.variant === "error" ? "alert" : "status"), this.setAttribute("aria-live", this.variant === "error" ? "assertive" : "polite")), (e.has("duration") || e.has("persistent")) && (this.shouldAutoDismiss() ? this.startAutoDismiss() : this.clearAutoDismiss());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearAutoDismiss(), this.animationEndHandler && this.removeEventListener("animationend", this.animationEndHandler);
  }
  shouldAutoDismiss() {
    return !this.persistent && this.duration > 0;
  }
  startAutoDismiss() {
    this.clearAutoDismiss(), this.showProgress && this.startProgressAnimation(), this.dismissTimer = window.setTimeout(() => {
      this.dismiss();
    }, this.duration);
  }
  clearAutoDismiss() {
    this.dismissTimer && (clearTimeout(this.dismissTimer), this.dismissTimer = void 0), this.progressTimer && (clearInterval(this.progressTimer), this.progressTimer = void 0);
  }
  startProgressAnimation() {
    this.progressWidth = 100;
    const e = Date.now(), t = this.duration;
    this.progressTimer = window.setInterval(() => {
      const i = Date.now() - e, r = Math.max(0, (t - i) / t);
      this.progressWidth = r * 100, r === 0 && this.clearAutoDismiss();
    }, 16);
  }
  /**
   * Emits dismiss events (ADR-008 compliant + deprecated alias)
   * @private
   */
  emitDismiss() {
    this.dispatchEvent(
      new CustomEvent("dismiss", {
        detail: { toastId: this.toastId },
        bubbles: !0,
        composed: !0
      })
    ), this.dispatchEvent(
      new CustomEvent("toast-dismissed", {
        detail: { toastId: this.toastId },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Dismisses the toast with animation
   */
  dismiss() {
    this.isVisible && (this.isVisible = !1, this.clearAutoDismiss(), this.setAttribute("data-exiting", ""), this.animationEndHandler = (e) => {
      e.animationName === "slide-out" && (this.emitDismiss(), this.remove());
    }, this.addEventListener("animationend", this.animationEndHandler, { once: !0 }), setTimeout(() => {
      this.parentNode && (this.emitDismiss(), this.remove());
    }, 300));
  }
  /**
   * Pauses auto-dismiss timer (useful for hover interactions)
   */
  pause() {
    this.clearAutoDismiss();
  }
  /**
   * Resumes auto-dismiss timer
   */
  resume() {
    this.shouldAutoDismiss() && this.startAutoDismiss();
  }
  handleDismissClick() {
    this.dismiss();
  }
  handleMouseEnter() {
    this.pause();
  }
  handleMouseLeave() {
    this.resume();
  }
  getDefaultIcon() {
    const e = {
      info: "🔵",
      success: "✅",
      warning: "⚠️",
      error: "❌"
    };
    return e[this.variant] || e.info;
  }
  render() {
    const e = {
      "toast-container": !0
    }, t = this.showProgress ? `width: ${this.progressWidth}%` : "display: none";
    return l`
      <div
        class=${W(e)}
        part="container"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="toast-header" part="header">
          <div class="toast-icon" part="icon">
            <slot name="icon">${this.getDefaultIcon()}</slot>
          </div>

          <div class="toast-content" part="content">
            ${this.title ? l` <h4 class="toast-title" part="title">${this.title}</h4> ` : ""}

            <div class="toast-message" part="message">${this.message || l`<slot></slot>`}</div>
          </div>

          ${this.dismissible ? l`
                <button
                  class="dismiss-button"
                  part="dismiss"
                  @click=${this.handleDismissClick}
                  aria-label="Dismiss notification"
                >
                  ✕
                </button>
              ` : ""}
        </div>

        <div class="toast-actions" part="actions">
          <slot name="action"></slot>
        </div>

        <div class="progress-bar" style=${t}></div>
      </div>
    `;
  }
  // AI Integration Methods
  explainState() {
    const e = [];
    this.isVisible ? this.persistent ? e.push("persistent") : this.duration > 0 ? e.push("timed") : e.push("manual") : e.push("dismissed");
    const t = e.join("-") || "visible";
    return {
      currentState: t,
      possibleStates: ["visible", "timed", "persistent", "dismissed"],
      stateDescription: this.getStateDescription(t)
    };
  }
  getStateDescription(e) {
    return {
      visible: `${this.variant} toast notification visible and active`,
      timed: `${this.variant} toast with ${this.duration}ms auto-dismiss timer`,
      persistent: `${this.variant} toast that persists until manually dismissed`,
      dismissed: `${this.variant} toast has been dismissed and will be removed`
    }[e] || `Toast in ${e} state. Type: ${this.variant}, Title: ${this.title || "none"}`;
  }
  getPossibleActions() {
    const e = [];
    return this.isVisible && this.dismissible && e.push({
      name: "dismiss",
      description: "Dismiss the toast notification",
      available: !0
    }), this.shouldAutoDismiss() && (e.push({
      name: "pause",
      description: "Pause auto-dismiss timer",
      available: !0
    }), e.push({
      name: "resume",
      description: "Resume auto-dismiss timer",
      available: !0
    })), e;
  }
  get aiState() {
    return {
      ...super.aiState,
      title: this.title,
      message: this.message,
      variant: this.variant,
      duration: this.duration,
      dismissible: this.dismissible,
      persistent: this.persistent,
      visible: this.isVisible,
      showProgress: this.showProgress,
      toastId: this.toastId,
      timeRemaining: this.dismissTimer ? this.duration : 0
    };
  }
};
se.styles = M`
    :host {
      display: block;
      --forge-toast-width: 380px;
      --forge-toast-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      --forge-toast-radius: var(--radius-md, 6px);
      --forge-toast-slide-distance: var(--space-8, 32px);
      --forge-toast-animation-duration: 300ms;
    }

    .toast-container {
      width: var(--forge-toast-width);
      background: var(--forge-color-background, #ffffff);
      border: 1px solid var(--forge-color-border, #e5e7eb);
      border-radius: var(--forge-toast-radius);
      box-shadow: var(--forge-toast-shadow);
      padding: var(--forge-spacing-md, 16px);
      position: relative;
      overflow: hidden;
    }

    .toast-header {
      display: flex;
      align-items: flex-start;
      gap: var(--forge-spacing-sm, 12px);
      margin-bottom: var(--forge-spacing-xs, 8px);
    }

    .toast-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-size: var(--forge-font-size-sm, 14px);
      font-weight: 600;
      color: var(--forge-color-text-primary, #111827);
      margin: 0 0 var(--forge-spacing-xs, 4px) 0;
      line-height: 1.4;
    }

    .toast-message {
      font-size: var(--forge-font-size-sm, 14px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin: 0;
      line-height: 1.4;
    }

    .toast-actions {
      display: flex;
      gap: var(--forge-spacing-xs, 8px);
      margin-top: var(--forge-spacing-sm, 12px);
      align-items: center;
    }

    .dismiss-button {
      position: absolute;
      top: var(--forge-spacing-xs, 8px);
      right: var(--forge-spacing-xs, 8px);
      background: none;
      border: none;
      padding: var(--forge-spacing-xs, 4px);
      cursor: pointer;
      border-radius: var(--forge-border-radius-sm, 4px);
      color: var(--forge-color-text-tertiary, #9ca3af);
      transition: all var(--forge-transition-fast, 150ms);
    }

    .dismiss-button:hover {
      background: var(--forge-color-gray-100, #f3f4f6);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    .dismiss-button:focus {
      outline: 2px solid var(--forge-color-focus, #3b82f6);
      outline-offset: 2px;
    }

    /* Variant styles */
    :host([variant='success']) .toast-container {
      border-left: 4px solid var(--forge-color-success-500, #10b981);
    }

    :host([variant='success']) .toast-icon {
      color: var(--forge-color-success-500, #10b981);
    }

    :host([variant='warning']) .toast-container {
      border-left: 4px solid var(--forge-color-warning-500, #f59e0b);
    }

    :host([variant='warning']) .toast-icon {
      color: var(--forge-color-warning-500, #f59e0b);
    }

    :host([variant='error']) .toast-container {
      border-left: 4px solid var(--forge-color-danger-500, #ef4444);
    }

    :host([variant='error']) .toast-icon {
      color: var(--forge-color-danger-500, #ef4444);
    }

    :host([variant='info']) .toast-container {
      border-left: 4px solid var(--forge-color-primary-500, #3b82f6);
    }

    :host([variant='info']) .toast-icon {
      color: var(--forge-color-primary-500, #3b82f6);
    }

    /* Animation states */
    :host([data-entering]) {
      animation: slide-in var(--forge-toast-animation-duration) ease-out;
    }

    :host([data-exiting]) {
      animation: slide-out var(--forge-toast-animation-duration) ease-in;
    }

    @keyframes slide-in {
      from {
        transform: translateX(var(--forge-toast-slide-distance));
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(var(--forge-toast-slide-distance));
        opacity: 0;
      }
    }

    /* Progress bar for timed toasts */
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: var(--forge-color-primary-500, #3b82f6);
      transition: width linear;
      border-radius: 0 0 var(--forge-toast-radius) var(--forge-toast-radius);
    }

    :host([variant='success']) .progress-bar {
      background: var(--forge-color-success-500, #10b981);
    }

    :host([variant='warning']) .progress-bar {
      background: var(--forge-color-warning-500, #f59e0b);
    }

    :host([variant='error']) .progress-bar {
      background: var(--forge-color-danger-500, #ef4444);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      :host([data-entering]),
      :host([data-exiting]) {
        animation: none;
      }

      .progress-bar {
        transition: none;
      }
    }

    /* Hide title when not provided */
    .toast-title:empty {
      display: none;
      margin: 0;
    }

    /* Adjust spacing when no title */
    .toast-title:empty + .toast-message {
      margin-top: 0;
    }
  `;
le([
  o()
], se.prototype, "title", 2);
le([
  o()
], se.prototype, "message", 2);
le([
  o({ reflect: !0 })
], se.prototype, "variant", 2);
le([
  o({ type: Number })
], se.prototype, "duration", 2);
le([
  o({ type: Boolean })
], se.prototype, "dismissible", 2);
le([
  o({ type: Boolean, attribute: "show-progress" })
], se.prototype, "showProgress", 2);
le([
  o({ type: Boolean })
], se.prototype, "persistent", 2);
le([
  o()
], se.prototype, "toastId", 2);
le([
  h()
], se.prototype, "isVisible", 2);
le([
  h()
], se.prototype, "progressWidth", 2);
se = le([
  O("forge-toast")
], se);
var Xi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, Be = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ji(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && Xi(t, i, s), s;
};
let we = class extends f {
  constructor() {
    super(...arguments), this.aiMetadata = {
      purpose: "Toast notification queue management and positioning",
      context: "notification-system",
      dataType: "text",
      criticality: "medium",
      semanticRole: "region"
    }, this.position = "top-right", this.maxToasts = 5, this.stackNewest = !0, this.toasts = [], this.toastQueue = [];
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.setAttribute("role", "region"), this.setAttribute("aria-label", "Notifications"), this.setAttribute("aria-live", "polite"), this.addEventListener("dismiss", this.handleToastDismissed.bind(this)), document.querySelector('forge-toast-container[data-global="true"]') || (this.setAttribute("data-global", "true"), window.forgeToastContainer = this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.forgeToastContainer === this && (window.forgeToastContainer = null);
  }
  handleToastDismissed(e) {
    const t = e.detail.toastId;
    this.removeToast(t), this.processQueue();
  }
  /**
   * Add a toast notification
   */
  addToast(e) {
    const t = e.id || this.generateToastId(), i = {
      id: t,
      title: e.title,
      message: e.message,
      variant: e.variant || "info",
      duration: e.duration ?? 5e3,
      dismissible: e.dismissible ?? !0,
      persistent: e.persistent ?? !1,
      showProgress: e.showProgress ?? !1
    };
    return this.toasts.length >= this.maxToasts ? this.toastQueue.push(i) : this.createToast(i), t;
  }
  /**
   * Remove a specific toast by ID
   */
  removeToast(e) {
    const t = this.toasts.find((r) => r.toastId === e);
    if (t)
      return t.dismiss(), !0;
    const i = this.toastQueue.findIndex((r) => r.id === e);
    return i >= 0 ? (this.toastQueue.splice(i, 1), !0) : !1;
  }
  /**
   * Remove all toasts
   */
  clearAll() {
    this.toasts.forEach((e) => e.dismiss()), this.toastQueue = [];
  }
  /**
   * Get all active toasts
   */
  getToasts() {
    return [...this.toasts];
  }
  /**
   * Get toast count (active + queued)
   */
  getToastCount() {
    return {
      active: this.toasts.length,
      queued: this.toastQueue.length,
      total: this.toasts.length + this.toastQueue.length
    };
  }
  createToast(e) {
    const t = document.createElement("forge-toast");
    t.toastId = e.id, t.title = e.title || "", t.message = e.message, t.variant = e.variant, t.duration = e.duration, t.dismissible = e.dismissible, t.persistent = e.persistent, t.showProgress = e.showProgress, this.stackNewest ? this.toasts.unshift(t) : this.toasts.push(t);
    const i = this.shadowRoot?.querySelector(".toast-container");
    i && (this.stackNewest ? i.prepend(t) : i.append(t)), this.requestUpdate();
  }
  processQueue() {
    for (this.toasts = this.toasts.filter((e) => e.parentNode); this.toasts.length < this.maxToasts && this.toastQueue.length > 0; ) {
      const e = this.toastQueue.shift();
      e && this.createToast(e);
    }
    this.requestUpdate();
  }
  generateToastId() {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  render() {
    return l`
      <div class="toast-container" part="container" role="log" aria-live="polite">
        <div part="stack">
          <!-- Toasts are dynamically added here -->
        </div>
      </div>
    `;
  }
  // AI Integration Methods
  explainState() {
    const e = [], t = this.getToastCount();
    t.total === 0 ? e.push("empty") : t.queued > 0 ? e.push("queued") : t.active === this.maxToasts ? e.push("full") : e.push("active");
    const i = e.join("-") || "empty";
    return {
      currentState: i,
      possibleStates: ["empty", "active", "full", "queued"],
      stateDescription: this.getStateDescription(i)
    };
  }
  getStateDescription(e) {
    const t = this.getToastCount();
    return {
      empty: "Toast container has no active or queued notifications",
      active: `Toast container showing ${t.active} of ${this.maxToasts} notifications`,
      full: `Toast container at capacity with ${t.active} active notifications`,
      queued: `Toast container full with ${t.active} active and ${t.queued} queued notifications`
    }[e] || `Toast container in ${e} state. Position: ${this.position}`;
  }
  getPossibleActions() {
    const e = this.getToastCount();
    return [
      {
        name: "addToast",
        description: "Add a new toast notification",
        available: !0
      },
      {
        name: "clearAll",
        description: "Remove all toast notifications",
        available: e.total > 0
      },
      {
        name: "removeToast",
        description: "Remove a specific toast by ID",
        available: e.active > 0
      }
    ];
  }
  get aiState() {
    const e = this.getToastCount();
    return {
      ...super.aiState,
      position: this.position,
      maxToasts: this.maxToasts,
      stackNewest: this.stackNewest,
      activeToasts: e.active,
      queuedToasts: e.queued,
      totalToasts: e.total,
      toastIds: this.toasts.map((t) => t.toastId)
    };
  }
};
we.styles = M`
    :host {
      position: fixed;
      pointer-events: none;
      z-index: var(--forge-toast-container-z-index, 9999);
      --forge-toast-stack-gap: var(--space-3, 12px);
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: var(--forge-toast-stack-gap);
      pointer-events: none;
    }

    .toast-container > * {
      pointer-events: auto;
    }

    /* Position variants */
    :host([position='top-left']) {
      top: var(--forge-spacing-lg, 24px);
      left: var(--forge-spacing-lg, 24px);
    }

    :host([position='top-center']) {
      top: var(--forge-spacing-lg, 24px);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position='top-right']) {
      top: var(--forge-spacing-lg, 24px);
      right: var(--forge-spacing-lg, 24px);
    }

    :host([position='bottom-left']) {
      bottom: var(--forge-spacing-lg, 24px);
      left: var(--forge-spacing-lg, 24px);
    }

    :host([position='bottom-center']) {
      bottom: var(--forge-spacing-lg, 24px);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position='bottom-right']) {
      bottom: var(--forge-spacing-lg, 24px);
      right: var(--forge-spacing-lg, 24px);
    }

    /* Stack ordering for bottom positions */
    :host([position^='bottom']) .toast-container {
      flex-direction: column-reverse;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      :host {
        left: var(--forge-spacing-md, 16px) !important;
        right: var(--forge-spacing-md, 16px) !important;
        transform: none !important;
      }

      :host([position='top-center']),
      :host([position='bottom-center']) {
        left: var(--forge-spacing-md, 16px);
        right: var(--forge-spacing-md, 16px);
      }

      .toast-container {
        width: 100%;
      }
    }
  `;
Be([
  o({ reflect: !0 })
], we.prototype, "position", 2);
Be([
  o({ type: Number, attribute: "max-toasts" })
], we.prototype, "maxToasts", 2);
Be([
  o({ type: Boolean, attribute: "stack-newest" })
], we.prototype, "stackNewest", 2);
Be([
  h()
], we.prototype, "toasts", 2);
we = Be([
  O("forge-toast-container")
], we);
function Le(e) {
  let t = window.forgeToastContainer;
  return t || (t = document.createElement("forge-toast-container"), t.setAttribute("data-global", "true"), document.body.appendChild(t), window.forgeToastContainer = t), t.addToast(e);
}
const pr = {
  info: (e, t) => Le({ message: e, title: t, variant: "info" }),
  success: (e, t) => Le({ message: e, title: t, variant: "success" }),
  warning: (e, t) => Le({ message: e, title: t, variant: "warning" }),
  error: (e, t) => Le({ message: e, title: t, variant: "error", persistent: !0 }),
  dismiss: (e) => window.forgeToastContainer?.removeToast(e),
  clear: () => window.forgeToastContainer?.clearAll()
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = "important", Zi = " !" + Ct, bt = Re(class extends Pe {
  constructor(e) {
    if (super(e), e.type !== de.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce(((t, i) => {
      const r = e[i];
      return r == null ? t : t + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }), "");
  }
  update(e, [t]) {
    const { style: i } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const r of this.ft) t[r] == null && (this.ft.delete(r), r.includes("-") ? i.removeProperty(r) : i[r] = null);
    for (const r in t) {
      const s = t[r];
      if (s != null) {
        this.ft.add(r);
        const a = typeof s == "string" && s.endsWith(Zi);
        r.includes("-") || a ? i.setProperty(r, a ? s.slice(0, -11) : s, a ? Ct : "") : i[r] = s;
      }
    }
    return re;
  }
});
function er(e, t, i = !1) {
  let r = null;
  return function(...a) {
    const n = () => {
      r = null, i || e(...a);
    }, c = i && !r;
    r && clearTimeout(r), r = setTimeout(n, t), c && e(...a);
  };
}
var tr = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, w = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ir(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (r ? n(t, i, s) : n(s)) || s);
  return r && s && tr(t, i, s), s;
};
class rr {
  constructor(t, i) {
    this.scrollTop = 0, this.container = t, this.config = i, this.totalRows = 0, this.visibleRange = { start: 0, end: 0 }, this.setupScrollListener();
  }
  setupScrollListener() {
    this.container.addEventListener("scroll", this.handleScroll.bind(this), { passive: !0 });
  }
  handleScroll() {
    this.scrollTop = this.container.scrollTop, this.updateVisibleRange();
  }
  updateData(t) {
    this.totalRows = t, this.updateVisibleRange();
  }
  updateVisibleRange() {
    if (!this.config.enabled) {
      this.visibleRange = { start: 0, end: this.totalRows };
      return;
    }
    const t = this.container.clientHeight, i = this.getRowHeight(0), r = Math.floor(this.scrollTop / i), s = Math.ceil(t / i), a = Math.min(r + s + this.config.overscan, this.totalRows);
    this.visibleRange = {
      start: Math.max(0, r - this.config.overscan),
      end: a
    };
  }
  getRowHeight(t) {
    return typeof this.config.rowHeight == "number" ? this.config.rowHeight : typeof this.config.rowHeight == "function" ? this.config.rowHeight(t) : 40;
  }
  getVisibleRange() {
    return this.visibleRange;
  }
  getTotalHeight() {
    return this.totalRows * this.getRowHeight(0);
  }
}
let b = class extends f {
  constructor() {
    super(), this.columns = [], this.data = [], this.loading = !1, this.sortable = !0, this.filterable = !0, this.selectable = !0, this.selectionType = "multiple", this.editable = !1, this.expandable = !1, this.virtualScrolling = !1, this.rowHeight = 40, this.showToolbar = !0, this.showSearch = !0, this.searchPlaceholder = "Search...", this.pageSize = 50, this.paginated = !1, this.selection = { type: "none", selectedIds: /* @__PURE__ */ new Set() }, this.sortState = [], this.filterState = [], this.editingCell = null, this.expandedRows = /* @__PURE__ */ new Set(), this.searchQuery = "", this.currentPage = 1, this.isPerformanceWarning = !1, this.debouncedSearch = er(this.performSearch.bind(this), 300), this.gridPerformanceStartTime = 0, this.aiMetadata = {
      purpose: "Advanced data grid with virtual scrolling, sorting, filtering, and editing capabilities",
      context: "Data management and visualization interface for large datasets",
      dataType: "custom",
      criticality: "high",
      semanticRole: "data-grid",
      interactions: [
        {
          type: "click",
          description: "Select rows, sort columns, edit cells",
          outcome: "Updates grid state and data manipulation"
        },
        {
          type: "keyboard",
          description: "Navigate grid with arrow keys, edit with Enter",
          shortcuts: ["ArrowKeys", "Enter", "Escape", "Space"]
        },
        {
          type: "input",
          description: "Search and filter data",
          outcome: "Filters displayed data based on query"
        }
      ],
      validation: [
        {
          type: "custom",
          message: "Columns array must not be empty",
          value: "validateColumns"
        },
        {
          type: "custom",
          message: "Data must be array of objects with id property",
          value: "validateData"
        }
      ]
    }, this.setupPerformanceMonitoring();
  }
  setupPerformanceMonitoring() {
    this.gridPerformanceStartTime = performance.now();
  }
  connectedCallback() {
    super.connectedCallback(), this.setupVirtualScrolling(), this.setupResizeObserver();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  setupVirtualScrolling() {
    this.virtualScrolling && this.gridBody && (this.virtualScroller = new rr(this.gridBody, {
      enabled: this.virtualScrolling,
      rowHeight: this.rowHeight,
      bufferSize: 20,
      threshold: 100,
      overscan: 5
    }));
  }
  setupResizeObserver() {
    typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    }), this.resizeObserver.observe(this));
  }
  handleResize() {
    this.virtualScroller?.updateData(this.filteredData.length), this.requestUpdate();
  }
  get filteredData() {
    let e = [...this.data];
    return this.searchQuery && (e = e.filter(
      (t) => this.columns.some(
        (i) => String(t[i.field] || "").toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    )), this.filterState.forEach((t) => {
      e = e.filter((i) => {
        const r = i[t.columnId];
        return this.applyFilter(r, t);
      });
    }), this.sortState.length > 0 && e.sort((t, i) => {
      for (const r of this.sortState) {
        const s = t[r.columnId], a = i[r.columnId], n = this.compareValues(s, a);
        if (n !== 0)
          return r.direction === "asc" ? n : -n;
      }
      return 0;
    }), e;
  }
  applyFilter(e, t) {
    const i = String(e || "").toLowerCase(), r = String(t.value || "").toLowerCase();
    switch (t.operator) {
      case "equals":
        return i === r;
      case "contains":
        return i.includes(r);
      case "startsWith":
        return i.startsWith(r);
      case "endsWith":
        return i.endsWith(r);
      default:
        return !0;
    }
  }
  compareValues(e, t) {
    return e === t ? 0 : e == null ? -1 : t == null ? 1 : typeof e == "number" && typeof t == "number" ? e - t : String(e).localeCompare(String(t));
  }
  performSearch() {
    this.currentPage = 1, this.requestUpdate();
  }
  handleColumnSort(e) {
    if (!e.sortable) return;
    const t = performance.now(), i = this.sortState.find((s) => s.columnId === e.id);
    i ? i.direction === "asc" ? i.direction = "desc" : this.sortState = this.sortState.filter((s) => s.columnId !== e.id) : this.sortState = [{ columnId: e.id, direction: "asc" }, ...this.sortState], performance.now() - t > this.maxRenderMs && (this.isPerformanceWarning = !0, setTimeout(() => {
      this.isPerformanceWarning = !1, this.requestUpdate();
    }, 3e3)), this.emit("sort", {
      column: e.id,
      direction: this.sortState.find((s) => s.columnId === e.id)?.direction,
      sorts: [...this.sortState]
    }), this.requestUpdate();
  }
  handleRowSelection(e, t) {
    const r = t.target.checked;
    this.selectionType === "single" ? (this.selection.selectedIds.clear(), r && this.selection.selectedIds.add(e)) : r ? this.selection.selectedIds.add(e) : this.selection.selectedIds.delete(e), this.emit("selection-change", {
      selectedIds: Array.from(this.selection.selectedIds),
      selectedRows: this.filteredData.filter((s) => this.selection.selectedIds.has(s.id))
    }), this.requestUpdate();
  }
  handleCellEdit(e, t) {
    !this.editable || !this.columns.find((r) => r.id === t)?.editor || (this.editingCell = { rowId: e, columnId: t }, this.requestUpdate(), this.updateComplete.then(() => {
      this.shadowRoot?.querySelector(".cell-editor input")?.focus();
    }));
  }
  handleCellEditComplete(e) {
    if (!this.editingCell) return;
    const { rowId: t, columnId: i } = this.editingCell, r = this.data.findIndex((s) => s.id === t);
    r >= 0 && (this.data[r] = { ...this.data[r], [i]: e }, this.emit("cell-edit", {
      rowId: t,
      columnId: i,
      value: e,
      row: this.data[r]
    })), this.editingCell = null, this.requestUpdate();
  }
  handleSearchInput(e) {
    const t = e.target;
    this.searchQuery = t.value, this.debouncedSearch();
  }
  renderToolbar() {
    return this.showToolbar ? l`
      <div class="grid-toolbar">
        <div class="toolbar-left">
          ${this.showSearch ? l`
            <input
              type="text"
              class="search-input"
              placeholder="${this.searchPlaceholder}"
              .value="${this.searchQuery}"
              @input="${this.handleSearchInput}"
              aria-label="Search data grid"
            />
          ` : ""}
          <span class="selection-info" aria-live="polite">
            ${this.selection.selectedIds.size > 0 ? `${this.selection.selectedIds.size} selected` : `${this.filteredData.length} items`}
          </span>
        </div>
        <div class="toolbar-right">
          <forge-button variant="outline" size="sm" @click="${this.exportData}">
            <forge-icon name="download"></forge-icon>
            Export
          </forge-button>
          ${this.selectable ? l`
            <forge-button variant="outline" size="sm" @click="${this.clearSelection}">
              Clear Selection
            </forge-button>
          ` : ""}
        </div>
      </div>
    ` : l``;
  }
  renderHeader() {
    return l`
      <div class="grid-header" role="row">
        ${this.selectable ? l`
          <div class="header-cell" style="width: 40px; min-width: 40px;">
            <forge-checkbox
              .checked="${this.selection.selectedIds.size === this.filteredData.length && this.filteredData.length > 0}"
              .indeterminate="${this.selection.selectedIds.size > 0 && this.selection.selectedIds.size < this.filteredData.length}"
              @change="${this.handleSelectAll}"
              aria-label="Select all rows"
            ></forge-checkbox>
          </div>
        ` : ""}
        
        ${this.columns.map((e) => l`
          <div
            class="${W({
      "header-cell": !0,
      sortable: e.sortable || !1,
      sorted: this.sortState.some((t) => t.columnId === e.id)
    })}"
            style="${bt({
      width: e.width || "auto",
      minWidth: e.minWidth ? `${e.minWidth}px` : "120px",
      maxWidth: e.maxWidth ? `${e.maxWidth}px` : "none"
    })}"
            @click="${() => this.handleColumnSort(e)}"
            role="columnheader"
            aria-sort="${this.getColumnSortState(e.id)}"
            tabindex="0"
            @keydown="${(t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleColumnSort(e));
    }}"
          >
            <span class="header-title">${e.title}</span>
            ${e.sortable ? l`
              <forge-icon
                name="${this.getSortIcon(e.id)}"
                class="sort-indicator"
                aria-hidden="true"
              ></forge-icon>
            ` : ""}
            ${e.resizable ? l`
              <div class="resize-handle" @mousedown="${(t) => this.startColumnResize(t, e)}"></div>
            ` : ""}
          </div>
        `)}
      </div>
    `;
  }
  renderBody() {
    if (this.loading)
      return l`
        <div class="loading-indicator">
          <forge-icon name="spinner" aria-label="Loading data"></forge-icon>
          Loading...
        </div>
      `;
    if (this.filteredData.length === 0)
      return l`
        <div class="no-data">
          <forge-icon name="inbox" size="large"></forge-icon>
          <p>No data available</p>
          ${this.searchQuery ? l`<p>Try adjusting your search criteria</p>` : ""}
        </div>
      `;
    const e = this.getVisibleRows();
    return l`
      <div class="virtual-viewport" style="height: ${this.virtualScroller?.getTotalHeight() || "auto"}px">
        ${this.virtualScrolling && this.virtualScroller ? l`
          <div class="virtual-spacer-top" style="height: ${this.getSpacerHeight("top")}px"></div>
        ` : ""}
        
        ${qe(e, (t) => t.id, (t, i) => this.renderRow(t, i))}
        
        ${this.virtualScrolling && this.virtualScroller ? l`
          <div class="virtual-spacer-bottom" style="height: ${this.getSpacerHeight("bottom")}px"></div>
        ` : ""}
      </div>
    `;
  }
  getVisibleRows() {
    if (!this.virtualScrolling || !this.virtualScroller)
      return this.filteredData;
    const e = this.virtualScroller.getVisibleRange();
    return this.filteredData.slice(e.start, e.end);
  }
  getSpacerHeight(e) {
    if (!this.virtualScroller) return 0;
    const t = this.virtualScroller.getVisibleRange(), i = this.rowHeight;
    return e === "top" ? t.start * i : (this.filteredData.length - t.end) * i;
  }
  renderRow(e, t) {
    const i = this.selection.selectedIds.has(e.id), r = this.expandedRows.has(e.id);
    return l`
      <div
        class="${W({
      "grid-row": !0,
      selected: i,
      focused: this.selection.focusedId === e.id
    })}"
        role="row"
        aria-selected="${i}"
        style="height: ${this.rowHeight}px"
      >
        ${this.selectable ? l`
          <div class="grid-cell" style="width: 40px; min-width: 40px;">
            <forge-checkbox
              class="selection-checkbox"
              .checked="${i}"
              @change="${(s) => this.handleRowSelection(e.id, s)}"
              aria-label="Select row ${t + 1}"
            ></forge-checkbox>
          </div>
        ` : ""}

        ${this.columns.map((s) => l`
          <div
            class="grid-cell"
            style="${bt({
      width: s.width || "auto",
      minWidth: s.minWidth ? `${s.minWidth}px` : "120px",
      textAlign: s.align || "left"
    })}"
            role="gridcell"
            tabindex="0"
            @dblclick="${() => this.handleCellEdit(e.id, s.id)}"
            @keydown="${(a) => this.handleCellKeydown(a, e.id, s.id)}"
          >
            ${this.editingCell?.rowId === e.id && this.editingCell?.columnId === s.id ? this.renderCellEditor(e, s) : l`
                  <span class="cell-content">
                    ${s.renderer ? s.renderer(e[s.field], e) : this.formatCellValue(e[s.field], s)}
                  </span>
                `}
          </div>
        `)}
      </div>

      ${r && this.expandable ? l`
        <div class="expanded-content">
          <slot name="expanded-row" .row="${e}"></slot>
        </div>
      ` : ""}
    `;
  }
  renderCellEditor(e, t) {
    const i = e[t.field];
    return l`
      <div class="cell-editor">
        <input
          type="text"
          .value="${String(i || "")}"
          @blur="${(r) => this.handleCellEditComplete(r.target.value)}"
          @keydown="${(r) => {
      r.key === "Enter" ? this.handleCellEditComplete(r.target.value) : r.key === "Escape" && (this.editingCell = null, this.requestUpdate());
    }}"
        />
      </div>
    `;
  }
  formatCellValue(e, t) {
    if (e == null) return "";
    if (t.format)
      return t.format(e);
    switch (t.type) {
      case "number":
        return Number(e).toLocaleString();
      case "currency":
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(e));
      case "percentage":
        return `${Number(e) * 100}%`;
      case "date":
        return new Date(e).toLocaleDateString();
      default:
        return String(e);
    }
  }
  handleCellKeydown(e, t, i) {
    e.key === "Enter" && this.editable && (e.preventDefault(), this.handleCellEdit(t, i));
  }
  getColumnSortState(e) {
    const t = this.sortState.find((i) => i.columnId === e);
    return t ? t.direction === "asc" ? "ascending" : "descending" : "none";
  }
  getSortIcon(e) {
    const t = this.sortState.find((i) => i.columnId === e);
    return t ? t.direction === "asc" ? "expand-less" : "expand-more" : "unfold-more";
  }
  handleSelectAll(e) {
    e.target.checked ? this.filteredData.forEach((i) => this.selection.selectedIds.add(i.id)) : this.selection.selectedIds.clear(), this.emit("selection-change", {
      selectedIds: Array.from(this.selection.selectedIds),
      selectedRows: this.filteredData.filter((i) => this.selection.selectedIds.has(i.id))
    }), this.requestUpdate();
  }
  clearSelection() {
    this.selection.selectedIds.clear(), this.emit("selection-change", { selectedIds: [], selectedRows: [] }), this.requestUpdate();
  }
  exportData() {
    const e = this.selection.selectedIds.size > 0 ? this.filteredData.filter((t) => this.selection.selectedIds.has(t.id)) : this.filteredData;
    this.emit("export-request", { data: e, format: "csv" });
  }
  startColumnResize(e, t) {
    e.preventDefault();
  }
  render() {
    return this.checkPerformance(this.gridPerformanceStartTime), l`
      <div class="grid-container" role="grid" aria-label="Data grid">
        ${this.renderToolbar()}
        ${this.renderHeader()}
        <div class="grid-body" role="presentation">
          ${this.renderBody()}
        </div>
        
        ${this.isPerformanceWarning ? l`
          <div class="performance-warning" role="alert">
            ⚠️ Performance: Grid render time exceeded threshold
          </div>
        ` : ""}
        
        <!-- Screen reader announcements -->
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          ${this.getScreenReaderAnnouncement()}
        </div>
      </div>
    `;
  }
  getScreenReaderAnnouncement() {
    const e = this.filteredData.length, t = this.selection.selectedIds.size;
    return `Grid with ${e} rows. ${t > 0 ? `${t} rows selected.` : ""}`;
  }
  // ADR-014: AI-Ready Components - AI integration methods
  getPossibleActions() {
    return [
      {
        name: "sort",
        description: "Sort data by column",
        available: this.sortable && this.columns.some((e) => e.sortable),
        parameters: [
          { name: "columnId", type: "selection", required: !0, enum: this.columns.filter((e) => e.sortable).map((e) => e.id) },
          { name: "direction", type: "selection", required: !0, enum: ["asc", "desc"] }
        ]
      },
      {
        name: "filter",
        description: "Filter data by criteria",
        available: this.filterable,
        parameters: [
          { name: "query", type: "text", required: !0 }
        ]
      },
      {
        name: "select",
        description: "Select rows",
        available: this.selectable,
        parameters: [
          { name: "rowIds", type: "text", required: !0 }
        ]
      },
      {
        name: "export",
        description: "Export data",
        available: !0,
        parameters: [
          { name: "format", type: "text", required: !1, defaultValue: "csv" }
        ]
      }
    ];
  }
  explainState() {
    const e = this.data.length, t = this.filteredData.length, i = this.selection.selectedIds.size;
    return {
      currentState: `grid-with-${e}-rows`,
      possibleStates: ["grid-empty", "grid-loading", "grid-with-data", "grid-filtered", "grid-sorted"],
      stateDescription: `Data grid showing ${t} of ${e} rows. ${i} rows selected. ${this.sortState.length > 0 ? "Sorted by " + this.sortState.map((r) => `${r.columnId} ${r.direction}`).join(", ") : "No sorting applied"}.`,
      transitions: [
        {
          from: "grid-with-data",
          to: "grid-sorted",
          trigger: "Column header click",
          conditions: ["Column is sortable"]
        },
        {
          from: "any",
          to: "grid-filtered",
          trigger: "Search input",
          conditions: ["Search query provided"]
        }
      ],
      visualIndicators: [
        `${e} total rows`,
        `${t} visible after filtering`,
        `${i} rows selected`,
        this.sortState.length > 0 ? `Sorted by ${this.sortState.length} column(s)` : "No sorting",
        this.virtualScrolling ? "Virtual scrolling enabled" : "Standard scrolling"
      ]
    };
  }
};
b.styles = M`
    :host {
      --grid-header-bg: var(--color-surface-secondary, #f8fafc);
      --grid-header-text: var(--color-text-primary, #1f2937);
      --grid-row-bg: var(--color-surface-primary, #ffffff);
      --grid-row-alt-bg: var(--color-surface-tertiary, #f9fafb);
      --grid-border: var(--color-border-subtle, #e5e7eb);
      --grid-selection-bg: var(--color-primary-50, #eff6ff);
      --grid-hover-bg: var(--color-neutral-50, #f9fafb);
      --grid-focus-ring: var(--color-primary-500, #3b82f6);
      
      display: block;
      width: 100%;
      height: 400px;
      border: 1px solid var(--grid-border);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      background: var(--grid-row-bg);
      font-family: var(--font-family-base);
    }

    .grid-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .grid-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm);
      background: var(--grid-header-bg);
      border-bottom: 1px solid var(--grid-border);
      gap: var(--spacing-sm);
    }

    .toolbar-left,
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .search-input {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--grid-border);
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      min-width: 200px;
    }

    .grid-header {
      display: flex;
      background: var(--grid-header-bg);
      border-bottom: 2px solid var(--grid-border);
      position: sticky;
      top: 0;
      z-index: 10;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .grid-header::-webkit-scrollbar {
      display: none;
    }

    .header-cell {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--grid-header-text);
      border-right: 1px solid var(--grid-border);
      cursor: pointer;
      user-select: none;
      position: relative;
      min-width: 0;
      white-space: nowrap;
      transition: background-color 0.2s ease;
    }

    .header-cell:hover {
      background: var(--grid-hover-bg);
    }

    .header-cell.sortable:hover {
      background: var(--color-primary-25, #f0f9ff);
    }

    .header-cell:last-child {
      border-right: none;
    }

    .header-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sort-indicator {
      margin-left: var(--spacing-xs);
      opacity: 0.6;
      transition: opacity 0.2s ease;
    }

    .header-cell.sorted .sort-indicator {
      opacity: 1;
    }

    .resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
      height: 100%;
      cursor: col-resize;
      background: transparent;
      transition: background-color 0.2s ease;
    }

    .resize-handle:hover {
      background: var(--grid-focus-ring);
    }

    .grid-body {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    .virtual-viewport {
      width: 100%;
      position: relative;
    }

    .virtual-spacer-top,
    .virtual-spacer-bottom {
      width: 100%;
      pointer-events: none;
    }

    .grid-row {
      display: flex;
      border-bottom: 1px solid var(--grid-border);
      cursor: pointer;
      transition: background-color 0.2s ease;
      position: relative;
    }

    .grid-row:hover {
      background: var(--grid-hover-bg);
    }

    .grid-row.selected {
      background: var(--grid-selection-bg);
    }

    .grid-row.focused {
      outline: 2px solid var(--grid-focus-ring);
      outline-offset: -2px;
    }

    .grid-row:nth-child(even):not(.selected):not(:hover) {
      background: var(--grid-row-alt-bg);
    }

    .grid-cell {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm);
      border-right: 1px solid var(--grid-border);
      min-height: 40px;
      overflow: hidden;
      position: relative;
    }

    .grid-cell:last-child {
      border-right: none;
    }

    .cell-content {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cell-editor {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-white);
      border: 2px solid var(--grid-focus-ring);
      border-radius: var(--radius-sm);
      padding: var(--spacing-xs);
      z-index: 100;
    }

    .cell-editor input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: inherit;
    }

    .selection-checkbox {
      margin-right: var(--spacing-sm);
    }

    .expand-button {
      margin-right: var(--spacing-sm);
      padding: var(--spacing-xs);
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: background-color 0.2s ease;
    }

    .expand-button:hover {
      background: var(--grid-hover-bg);
    }

    .expanded-content {
      grid-column: 1 / -1;
      padding: var(--spacing-md);
      background: var(--color-neutral-25);
      border-bottom: 1px solid var(--grid-border);
    }

    .loading-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      z-index: 1000;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      color: var(--color-text-secondary);
    }

    .performance-warning {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-warning-100);
      border: 1px solid var(--color-warning-300);
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
      z-index: 20;
    }

    /* ADR-012: Accessibility Standards */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Focus management for keyboard navigation */
    .grid-row:focus-within {
      outline: 2px solid var(--grid-focus-ring);
      outline-offset: -2px;
    }

    /* Mobile responsive adjustments */
    @media (max-width: 768px) {
      .grid-toolbar {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-xs);
      }

      .toolbar-left,
      .toolbar-right {
        justify-content: space-between;
      }

      .search-input {
        min-width: auto;
        flex: 1;
      }
    }
  `;
w([
  o({ type: Array })
], b.prototype, "columns", 2);
w([
  o({ type: Array })
], b.prototype, "data", 2);
w([
  o({ type: Boolean })
], b.prototype, "loading", 2);
w([
  o({ type: Boolean })
], b.prototype, "sortable", 2);
w([
  o({ type: Boolean })
], b.prototype, "filterable", 2);
w([
  o({ type: Boolean })
], b.prototype, "selectable", 2);
w([
  o({ type: String })
], b.prototype, "selectionType", 2);
w([
  o({ type: Boolean })
], b.prototype, "editable", 2);
w([
  o({ type: Boolean })
], b.prototype, "expandable", 2);
w([
  o({ type: Boolean, attribute: "virtual-scrolling" })
], b.prototype, "virtualScrolling", 2);
w([
  o({ type: Number, attribute: "row-height" })
], b.prototype, "rowHeight", 2);
w([
  o({ type: Boolean, attribute: "show-toolbar" })
], b.prototype, "showToolbar", 2);
w([
  o({ type: Boolean, attribute: "show-search" })
], b.prototype, "showSearch", 2);
w([
  o({ type: String })
], b.prototype, "searchPlaceholder", 2);
w([
  o({ type: Number, attribute: "page-size" })
], b.prototype, "pageSize", 2);
w([
  o({ type: Boolean })
], b.prototype, "paginated", 2);
w([
  h()
], b.prototype, "selection", 2);
w([
  h()
], b.prototype, "sortState", 2);
w([
  h()
], b.prototype, "filterState", 2);
w([
  h()
], b.prototype, "editingCell", 2);
w([
  h()
], b.prototype, "expandedRows", 2);
w([
  h()
], b.prototype, "searchQuery", 2);
w([
  h()
], b.prototype, "currentPage", 2);
w([
  h()
], b.prototype, "isPerformanceWarning", 2);
w([
  ne(".grid-body")
], b.prototype, "gridBody", 2);
w([
  ne(".grid-header")
], b.prototype, "gridHeader", 2);
b = w([
  O("forge-data-grid")
], b);
function ur(e) {
  return e instanceof HTMLElement && "emit" in e && "announceToScreenReader" in e;
}
function fr(e) {
  return ["xs", "sm", "md", "lg", "xl"].includes(e);
}
function gr(e) {
  return ["primary", "secondary", "success", "warning", "danger", "info", "neutral"].includes(e);
}
class mr {
  constructor() {
    this.classes = /* @__PURE__ */ new Set();
  }
  add(t) {
    return t && this.classes.add(t), this;
  }
  addIf(t, i) {
    return t && i && this.classes.add(i), this;
  }
  remove(t) {
    return this.classes.delete(t), this;
  }
  toggle(t, i) {
    return i === void 0 ? this.classes.has(t) ? this.classes.delete(t) : this.classes.add(t) : i ? this.classes.add(t) : this.classes.delete(t), this;
  }
  toString() {
    return Array.from(this.classes).join(" ");
  }
  toObject() {
    const t = {};
    return this.classes.forEach((i) => {
      t[i] = !0;
    }), t;
  }
}
function br(e, t) {
  let i;
  return function(...r) {
    clearTimeout(i), i = setTimeout(() => e.apply(this, r), t);
  };
}
function vr(e, t) {
  let i;
  return function(...r) {
    i || (e.apply(this, r), i = !0, setTimeout(() => i = !1, t));
  };
}
let sr = 0;
function yr(e = "forge") {
  return `${e}-${++sr}-${Date.now()}`;
}
function vt(e, ...t) {
  if (!t.length) return e;
  const i = t.shift();
  if (!i) return e;
  for (const r in i) {
    const s = i[r], a = e[r];
    s && typeof s == "object" && !Array.isArray(s) && a && typeof a == "object" && !Array.isArray(a) ? e[r] = vt(
      a,
      s
    ) : e[r] = s;
  }
  return vt(e, ...t);
}
function xr(e, t, i) {
  return new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    composed: !0,
    cancelable: !0,
    ...i
  });
}
export {
  dr as AIMetadataBuilder,
  cr as AIMetadataUtils,
  f as BaseElement,
  mr as ClassBuilder,
  z as ForgeAlert,
  fe as ForgeAspectRatio,
  Z as ForgeAvatar,
  C as ForgeBadge,
  B as ForgeButton,
  L as ForgeCard,
  $ as ForgeCheckbox,
  b as ForgeDataGrid,
  D as ForgeDatePicker,
  N as ForgeDropdown,
  x as ForgeFormField,
  u as ForgeIcon,
  y as ForgeInput,
  F as ForgeModal,
  G as ForgeMultiSelect,
  pe as ForgeProgress,
  ae as ForgeProgressCircle,
  K as ForgeRadioGroup,
  A as ForgeSelect,
  ue as ForgeSkeleton,
  Q as ForgeSwitch,
  se as ForgeToast,
  we as ForgeToastContainer,
  fi as commonIcons,
  xr as createForgeEvent,
  br as debounce,
  vt as deepMerge,
  yr as generateId,
  ur as isForgeElement,
  fr as isValidSize,
  gr as isValidVariant,
  Le as showToast,
  vr as throttle,
  pr as toast
};
