/* */ 
(function(Buffer, process) {
  (function() {
    var h,
        n = this;
    function p(a) {
      return void 0 !== a;
    }
    function aa() {}
    function ba(a) {
      a.wb = function() {
        return a.wf ? a.wf : a.wf = new a;
      };
    }
    function ca(a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array)
            return "array";
          if (a instanceof Object)
            return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c)
            return "object";
          if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
            return "array";
          if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
            return "function";
        } else
          return "null";
      else if ("function" == b && "undefined" == typeof a.call)
        return "object";
      return b;
    }
    function da(a) {
      return "array" == ca(a);
    }
    function ea(a) {
      var b = ca(a);
      return "array" == b || "object" == b && "number" == typeof a.length;
    }
    function q(a) {
      return "string" == typeof a;
    }
    function fa(a) {
      return "number" == typeof a;
    }
    function t(a) {
      return "function" == ca(a);
    }
    function ga(a) {
      var b = typeof a;
      return "object" == b && null != a || "function" == b;
    }
    function ha(a, b, c) {
      return a.call.apply(a.bind, arguments);
    }
    function ia(a, b, c) {
      if (!a)
        throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
          var c = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(c, d);
          return a.apply(b, c);
        };
      }
      return function() {
        return a.apply(b, arguments);
      };
    }
    function u(a, b, c) {
      u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
      return u.apply(null, arguments);
    }
    var ja = Date.now || function() {
      return +new Date;
    };
    function ka(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.qh = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.kh = function(a, c, f) {
        for (var g = Array(arguments.length - 2),
            k = 2; k < arguments.length; k++)
          g[k - 2] = arguments[k];
        return b.prototype[c].apply(a, g);
      };
    }
    ;
    function la(a) {
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, la);
      else {
        var b = Error().stack;
        b && (this.stack = b);
      }
      a && (this.message = String(a));
    }
    ka(la, Error);
    la.prototype.name = "CustomError";
    function v(a, b) {
      for (var c in a)
        b.call(void 0, a[c], c, a);
    }
    function ma(a, b) {
      var c = {},
          d;
      for (d in a)
        c[d] = b.call(void 0, a[d], d, a);
      return c;
    }
    function na(a, b) {
      for (var c in a)
        if (!b.call(void 0, a[c], c, a))
          return !1;
      return !0;
    }
    function oa(a) {
      var b = 0,
          c;
      for (c in a)
        b++;
      return b;
    }
    function pa(a) {
      for (var b in a)
        return b;
    }
    function qa(a) {
      var b = [],
          c = 0,
          d;
      for (d in a)
        b[c++] = a[d];
      return b;
    }
    function ra(a) {
      var b = [],
          c = 0,
          d;
      for (d in a)
        b[c++] = d;
      return b;
    }
    function sa(a, b) {
      for (var c in a)
        if (a[c] == b)
          return !0;
      return !1;
    }
    function ta(a, b, c) {
      for (var d in a)
        if (b.call(c, a[d], d, a))
          return d;
    }
    function ua(a, b) {
      var c = ta(a, b, void 0);
      return c && a[c];
    }
    function va(a) {
      for (var b in a)
        return !1;
      return !0;
    }
    function wa(a) {
      var b = {},
          c;
      for (c in a)
        b[c] = a[c];
      return b;
    }
    var xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function ya(a, b) {
      for (var c,
          d,
          e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
          a[c] = d[c];
        for (var f = 0; f < xa.length; f++)
          c = xa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    }
    ;
    function za(a) {
      a = String(a);
      if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
        try {
          return eval("(" + a + ")");
        } catch (b) {}
      throw Error("Invalid JSON string: " + a);
    }
    function Aa() {
      this.Td = void 0;
    }
    function Ba(a, b, c) {
      switch (typeof b) {
        case "string":
          Ca(b, c);
          break;
        case "number":
          c.push(isFinite(b) && !isNaN(b) ? b : "null");
          break;
        case "boolean":
          c.push(b);
          break;
        case "undefined":
          c.push("null");
          break;
        case "object":
          if (null == b) {
            c.push("null");
            break;
          }
          if (da(b)) {
            var d = b.length;
            c.push("[");
            for (var e = "",
                f = 0; f < d; f++)
              c.push(e), e = b[f], Ba(a, a.Td ? a.Td.call(b, String(f), e) : e, c), e = ",";
            c.push("]");
            break;
          }
          c.push("{");
          d = "";
          for (f in b)
            Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), Ca(f, c), c.push(":"), Ba(a, a.Td ? a.Td.call(b, f, e) : e, c), d = ","));
          c.push("}");
          break;
        case "function":
          break;
        default:
          throw Error("Unknown type: " + typeof b);
      }
    }
    var Da = {
      '"': '\\"',
      "\\": "\\\\",
      "/": "\\/",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "\t": "\\t",
      "\x0B": "\\u000b"
    },
        Ea = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    function Ca(a, b) {
      b.push('"', a.replace(Ea, function(a) {
        if (a in Da)
          return Da[a];
        var b = a.charCodeAt(0),
            e = "\\u";
        16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
        return Da[a] = e + b.toString(16);
      }), '"');
    }
    ;
    function Fa() {
      return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ja()).toString(36);
    }
    ;
    var w;
    a: {
      var Ga = n.navigator;
      if (Ga) {
        var Ha = Ga.userAgent;
        if (Ha) {
          w = Ha;
          break a;
        }
      }
      w = "";
    }
    ;
    function Ia() {
      this.Xa = -1;
    }
    ;
    function Ja() {
      this.Xa = -1;
      this.Xa = 64;
      this.P = [];
      this.le = [];
      this.dg = [];
      this.Md = [];
      this.Md[0] = 128;
      for (var a = 1; a < this.Xa; ++a)
        this.Md[a] = 0;
      this.de = this.dc = 0;
      this.reset();
    }
    ka(Ja, Ia);
    Ja.prototype.reset = function() {
      this.P[0] = 1732584193;
      this.P[1] = 4023233417;
      this.P[2] = 2562383102;
      this.P[3] = 271733878;
      this.P[4] = 3285377520;
      this.de = this.dc = 0;
    };
    function Ka(a, b, c) {
      c || (c = 0);
      var d = a.dg;
      if (q(b))
        for (var e = 0; 16 > e; e++)
          d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
      else
        for (e = 0; 16 > e; e++)
          d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
      for (e = 16; 80 > e; e++) {
        var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
        d[e] = (f << 1 | f >>> 31) & 4294967295;
      }
      b = a.P[0];
      c = a.P[1];
      for (var g = a.P[2],
          k = a.P[3],
          m = a.P[4],
          l,
          e = 0; 80 > e; e++)
        40 > e ? 20 > e ? (f = k ^ c & (g ^ k), l = 1518500249) : (f = c ^ g ^ k, l = 1859775393) : 60 > e ? (f = c & g | k & (c | g), l = 2400959708) : (f = c ^ g ^ k, l = 3395469782), f = (b << 5 | b >>> 27) + f + m + l + d[e] & 4294967295, m = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
      a.P[0] = a.P[0] + b & 4294967295;
      a.P[1] = a.P[1] + c & 4294967295;
      a.P[2] = a.P[2] + g & 4294967295;
      a.P[3] = a.P[3] + k & 4294967295;
      a.P[4] = a.P[4] + m & 4294967295;
    }
    Ja.prototype.update = function(a, b) {
      if (null != a) {
        p(b) || (b = a.length);
        for (var c = b - this.Xa,
            d = 0,
            e = this.le,
            f = this.dc; d < b; ) {
          if (0 == f)
            for (; d <= c; )
              Ka(this, a, d), d += this.Xa;
          if (q(a))
            for (; d < b; ) {
              if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Xa) {
                Ka(this, e);
                f = 0;
                break;
              }
            }
          else
            for (; d < b; )
              if (e[f] = a[d], ++f, ++d, f == this.Xa) {
                Ka(this, e);
                f = 0;
                break;
              }
        }
        this.dc = f;
        this.de += b;
      }
    };
    var La = Array.prototype,
        Ma = La.indexOf ? function(a, b, c) {
          return La.indexOf.call(a, b, c);
        } : function(a, b, c) {
          c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if (q(a))
            return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;
          for (; c < a.length; c++)
            if (c in a && a[c] === b)
              return c;
          return -1;
        },
        Na = La.forEach ? function(a, b, c) {
          La.forEach.call(a, b, c);
        } : function(a, b, c) {
          for (var d = a.length,
              e = q(a) ? a.split("") : a,
              f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a);
        },
        Oa = La.filter ? function(a, b, c) {
          return La.filter.call(a, b, c);
        } : function(a, b, c) {
          for (var d = a.length,
              e = [],
              f = 0,
              g = q(a) ? a.split("") : a,
              k = 0; k < d; k++)
            if (k in g) {
              var m = g[k];
              b.call(c, m, k, a) && (e[f++] = m);
            }
          return e;
        },
        Pa = La.map ? function(a, b, c) {
          return La.map.call(a, b, c);
        } : function(a, b, c) {
          for (var d = a.length,
              e = Array(d),
              f = q(a) ? a.split("") : a,
              g = 0; g < d; g++)
            g in f && (e[g] = b.call(c, f[g], g, a));
          return e;
        },
        Qa = La.reduce ? function(a, b, c, d) {
          for (var e = [],
              f = 1,
              g = arguments.length; f < g; f++)
            e.push(arguments[f]);
          d && (e[0] = u(b, d));
          return La.reduce.apply(a, e);
        } : function(a, b, c, d) {
          var e = c;
          Na(a, function(c, g) {
            e = b.call(d, e, c, g, a);
          });
          return e;
        },
        Ra = La.every ? function(a, b, c) {
          return La.every.call(a, b, c);
        } : function(a, b, c) {
          for (var d = a.length,
              e = q(a) ? a.split("") : a,
              f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a))
              return !1;
          return !0;
        };
    function Sa(a, b) {
      var c = Ta(a, b, void 0);
      return 0 > c ? null : q(a) ? a.charAt(c) : a[c];
    }
    function Ta(a, b, c) {
      for (var d = a.length,
          e = q(a) ? a.split("") : a,
          f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
          return f;
      return -1;
    }
    function Ua(a, b) {
      var c = Ma(a, b);
      0 <= c && La.splice.call(a, c, 1);
    }
    function Va(a, b) {
      a.sort(b || Wa);
    }
    function Wa(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    ;
    function Xa(a) {
      n.setTimeout(function() {
        throw a;
      }, 0);
    }
    var Ya;
    function Za() {
      var a = n.MessageChannel;
      "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == w.indexOf("Presto") && (a = function() {
        var a = document.createElement("iframe");
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
            a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
            a = u(function(a) {
              if (("*" == d || a.origin == d) && a.data == c)
                this.port1.onmessage();
            }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {postMessage: function() {
            b.postMessage(c, d);
          }};
      });
      if ("undefined" !== typeof a && -1 == w.indexOf("Trident") && -1 == w.indexOf("MSIE")) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
          if (p(c.next)) {
            c = c.next;
            var a = c.gb;
            c.gb = null;
            a();
          }
        };
        return function(a) {
          d.next = {gb: a};
          d = d.next;
          b.port2.postMessage(0);
        };
      }
      return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
        var b = document.createElement("script");
        b.onreadystatechange = function() {
          b.onreadystatechange = null;
          b.parentNode.removeChild(b);
          b = null;
          a();
          a = null;
        };
        document.documentElement.appendChild(b);
      } : function(a) {
        n.setTimeout(a, 0);
      };
    }
    ;
    function $a(a, b) {
      ab || bb();
      cb || (ab(), cb = !0);
      db.push(new eb(a, b));
    }
    var ab;
    function bb() {
      if (n.Promise && n.Promise.resolve) {
        var a = n.Promise.resolve();
        ab = function() {
          a.then(fb);
        };
      } else
        ab = function() {
          var a = fb;
          !t(n.setImmediate) || n.Window && n.Window.prototype && n.Window.prototype.setImmediate == n.setImmediate ? (Ya || (Ya = Za()), Ya(a)) : n.setImmediate(a);
        };
    }
    var cb = !1,
        db = [];
    [].push(function() {
      cb = !1;
      db = [];
    });
    function fb() {
      for (; db.length; ) {
        var a = db;
        db = [];
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          try {
            c.yg.call(c.scope);
          } catch (d) {
            Xa(d);
          }
        }
      }
      cb = !1;
    }
    function eb(a, b) {
      this.yg = a;
      this.scope = b;
    }
    ;
    var gb = -1 != w.indexOf("Opera") || -1 != w.indexOf("OPR"),
        hb = -1 != w.indexOf("Trident") || -1 != w.indexOf("MSIE"),
        ib = -1 != w.indexOf("Gecko") && -1 == w.toLowerCase().indexOf("webkit") && !(-1 != w.indexOf("Trident") || -1 != w.indexOf("MSIE")),
        jb = -1 != w.toLowerCase().indexOf("webkit");
    (function() {
      var a = "",
          b;
      if (gb && n.opera)
        return a = n.opera.version, t(a) ? a() : a;
      ib ? b = /rv\:([^\);]+)(\)|;)/ : hb ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : jb && (b = /WebKit\/(\S+)/);
      b && (a = (a = b.exec(w)) ? a[1] : "");
      return hb && (b = (b = n.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a;
    })();
    var kb = null,
        lb = null;
    function mb(a, b) {
      if (!ea(a))
        throw Error("encodeByteArray takes an array as a parameter");
      if (!kb) {
        kb = {};
        lb = {};
        for (var c = 0; 65 > c; c++)
          kb[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c), lb[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(c);
      }
      for (var c = b ? lb : kb,
          d = [],
          e = 0; e < a.length; e += 3) {
        var f = a[e],
            g = e + 1 < a.length,
            k = g ? a[e + 1] : 0,
            m = e + 2 < a.length,
            l = m ? a[e + 2] : 0,
            r = f >> 2,
            f = (f & 3) << 4 | k >> 4,
            k = (k & 15) << 2 | l >> 6,
            l = l & 63;
        m || (l = 64, g || (k = 64));
        d.push(c[r], c[f], c[k], c[l]);
      }
      return d.join("");
    }
    ;
    function nb(a, b) {
      this.N = ob;
      this.Pf = void 0;
      this.Ba = this.Ga = null;
      this.vd = this.ue = !1;
      if (a == pb)
        qb(this, rb, b);
      else
        try {
          var c = this;
          a.call(b, function(a) {
            qb(c, rb, a);
          }, function(a) {
            if (!(a instanceof sb))
              try {
                if (a instanceof Error)
                  throw a;
                throw Error("Promise rejected.");
              } catch (b) {}
            qb(c, tb, a);
          });
        } catch (d) {
          qb(this, tb, d);
        }
    }
    var ob = 0,
        rb = 2,
        tb = 3;
    function pb() {}
    nb.prototype.then = function(a, b, c) {
      return ub(this, t(a) ? a : null, t(b) ? b : null, c);
    };
    nb.prototype.then = nb.prototype.then;
    nb.prototype.$goog_Thenable = !0;
    nb.prototype.cancel = function(a) {
      this.N == ob && $a(function() {
        var b = new sb(a);
        vb(this, b);
      }, this);
    };
    function vb(a, b) {
      if (a.N == ob)
        if (a.Ga) {
          var c = a.Ga;
          if (c.Ba) {
            for (var d = 0,
                e = -1,
                f = 0,
                g; g = c.Ba[f]; f++)
              if (g = g.o)
                if (d++, g == a && (e = f), 0 <= e && 1 < d)
                  break;
            0 <= e && (c.N == ob && 1 == d ? vb(c, b) : (d = c.Ba.splice(e, 1)[0], wb(c, d, tb, b)));
          }
          a.Ga = null;
        } else
          qb(a, tb, b);
    }
    function xb(a, b) {
      a.Ba && a.Ba.length || a.N != rb && a.N != tb || yb(a);
      a.Ba || (a.Ba = []);
      a.Ba.push(b);
    }
    function ub(a, b, c, d) {
      var e = {
        o: null,
        Gf: null,
        If: null
      };
      e.o = new nb(function(a, g) {
        e.Gf = b ? function(c) {
          try {
            var e = b.call(d, c);
            a(e);
          } catch (l) {
            g(l);
          }
        } : a;
        e.If = c ? function(b) {
          try {
            var e = c.call(d, b);
            !p(e) && b instanceof sb ? g(b) : a(e);
          } catch (l) {
            g(l);
          }
        } : g;
      });
      e.o.Ga = a;
      xb(a, e);
      return e.o;
    }
    nb.prototype.Xf = function(a) {
      this.N = ob;
      qb(this, rb, a);
    };
    nb.prototype.Yf = function(a) {
      this.N = ob;
      qb(this, tb, a);
    };
    function qb(a, b, c) {
      if (a.N == ob) {
        if (a == c)
          b = tb, c = new TypeError("Promise cannot resolve to itself");
        else {
          var d;
          if (c)
            try {
              d = !!c.$goog_Thenable;
            } catch (e) {
              d = !1;
            }
          else
            d = !1;
          if (d) {
            a.N = 1;
            c.then(a.Xf, a.Yf, a);
            return;
          }
          if (ga(c))
            try {
              var f = c.then;
              if (t(f)) {
                zb(a, c, f);
                return;
              }
            } catch (g) {
              b = tb, c = g;
            }
        }
        a.Pf = c;
        a.N = b;
        a.Ga = null;
        yb(a);
        b != tb || c instanceof sb || Ab(a, c);
      }
    }
    function zb(a, b, c) {
      function d(b) {
        f || (f = !0, a.Yf(b));
      }
      function e(b) {
        f || (f = !0, a.Xf(b));
      }
      a.N = 1;
      var f = !1;
      try {
        c.call(b, e, d);
      } catch (g) {
        d(g);
      }
    }
    function yb(a) {
      a.ue || (a.ue = !0, $a(a.wg, a));
    }
    nb.prototype.wg = function() {
      for (; this.Ba && this.Ba.length; ) {
        var a = this.Ba;
        this.Ba = null;
        for (var b = 0; b < a.length; b++)
          wb(this, a[b], this.N, this.Pf);
      }
      this.ue = !1;
    };
    function wb(a, b, c, d) {
      if (c == rb)
        b.Gf(d);
      else {
        if (b.o)
          for (; a && a.vd; a = a.Ga)
            a.vd = !1;
        b.If(d);
      }
    }
    function Ab(a, b) {
      a.vd = !0;
      $a(function() {
        a.vd && Bb.call(null, b);
      });
    }
    var Bb = Xa;
    function sb(a) {
      la.call(this, a);
    }
    ka(sb, la);
    sb.prototype.name = "cancel";
    var Cb = Cb || "2.4.0";
    function y(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    function z(a, b) {
      if (Object.prototype.hasOwnProperty.call(a, b))
        return a[b];
    }
    function Db(a, b) {
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
    }
    function Eb(a) {
      var b = {};
      Db(a, function(a, d) {
        b[a] = d;
      });
      return b;
    }
    function Fb(a) {
      return "object" === typeof a && null !== a;
    }
    ;
    function Gb(a) {
      var b = [];
      Db(a, function(a, d) {
        da(d) ? Na(d, function(d) {
          b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d));
        }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d));
      });
      return b.length ? "&" + b.join("&") : "";
    }
    function Hb(a) {
      var b = {};
      a = a.replace(/^\?/, "").split("&");
      Na(a, function(a) {
        a && (a = a.split("="), b[a[0]] = a[1]);
      });
      return b;
    }
    ;
    function Ib(a, b) {
      if (!a)
        throw Jb(b);
    }
    function Jb(a) {
      return Error("Firebase (" + Cb + ") INTERNAL ASSERT FAILED: " + a);
    }
    ;
    var Kb = n.Promise || nb;
    function A() {
      var a = this;
      this.reject = this.resolve = null;
      this.D = new Kb(function(b, c) {
        a.resolve = b;
        a.reject = c;
      });
    }
    function B(a, b) {
      return function(c, d) {
        c ? a.reject(c) : a.resolve(d);
        t(b) && (Lb(a.D), 1 === b.length ? b(c) : b(c, d));
      };
    }
    function Lb(a) {
      a.then(void 0, aa);
    }
    ;
    function Mb(a) {
      for (var b = [],
          c = 0,
          d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        55296 <= e && 56319 >= e && (e -= 55296, d++, Ib(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
        128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
      }
      return b;
    }
    function Nb(a) {
      for (var b = 0,
          c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        128 > d ? b++ : 2048 > d ? b += 2 : 55296 <= d && 56319 >= d ? (b += 4, c++) : b += 3;
      }
      return b;
    }
    ;
    function C(a, b, c, d) {
      var e;
      d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
      if (e)
        throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    }
    function D(a, b, c) {
      var d = "";
      switch (b) {
        case 1:
          d = c ? "first" : "First";
          break;
        case 2:
          d = c ? "second" : "Second";
          break;
        case 3:
          d = c ? "third" : "Third";
          break;
        case 4:
          d = c ? "fourth" : "Fourth";
          break;
        default:
          throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
      }
      return a = a + " failed: " + (d + " argument ");
    }
    function E(a, b, c, d) {
      if ((!d || p(c)) && !t(c))
        throw Error(D(a, b, d) + "must be a valid function.");
    }
    function Ob(a, b, c) {
      if (p(c) && (!ga(c) || null === c))
        throw Error(D(a, b, !0) + "must be a valid context object.");
    }
    ;
    function Pb(a) {
      return "undefined" !== typeof JSON && p(JSON.parse) ? JSON.parse(a) : za(a);
    }
    function F(a) {
      if ("undefined" !== typeof JSON && p(JSON.stringify))
        a = JSON.stringify(a);
      else {
        var b = [];
        Ba(new Aa, a, b);
        a = b.join("");
      }
      return a;
    }
    ;
    function Qb() {
      this.Xd = G;
    }
    Qb.prototype.j = function(a) {
      return this.Xd.S(a);
    };
    Qb.prototype.toString = function() {
      return this.Xd.toString();
    };
    function Rb() {}
    Rb.prototype.rf = function() {
      return null;
    };
    Rb.prototype.ye = function() {
      return null;
    };
    var Sb = new Rb;
    function Tb(a, b, c) {
      this.ag = a;
      this.Na = b;
      this.Ld = c;
    }
    Tb.prototype.rf = function(a) {
      var b = this.Na.Q;
      if (Ub(b, a))
        return b.j().T(a);
      b = null != this.Ld ? new Vb(this.Ld, !0, !1) : this.Na.w();
      return this.ag.Ac(a, b);
    };
    Tb.prototype.ye = function(a, b, c) {
      var d = null != this.Ld ? this.Ld : Wb(this.Na);
      a = this.ag.me(d, b, 1, c, a);
      return 0 === a.length ? null : a[0];
    };
    function Xb() {
      this.vb = [];
    }
    function Yb(a, b) {
      for (var c = null,
          d = 0; d < b.length; d++) {
        var e = b[d],
            f = e.bc();
        null === c || f.ea(c.bc()) || (a.vb.push(c), c = null);
        null === c && (c = new Zb(f));
        c.add(e);
      }
      c && a.vb.push(c);
    }
    function $b(a, b, c) {
      Yb(a, c);
      ac(a, function(a) {
        return a.ea(b);
      });
    }
    function bc(a, b, c) {
      Yb(a, c);
      ac(a, function(a) {
        return a.contains(b) || b.contains(a);
      });
    }
    function ac(a, b) {
      for (var c = !0,
          d = 0; d < a.vb.length; d++) {
        var e = a.vb[d];
        if (e)
          if (e = e.bc(), b(e)) {
            for (var e = a.vb[d],
                f = 0; f < e.ud.length; f++) {
              var g = e.ud[f];
              if (null !== g) {
                e.ud[f] = null;
                var k = g.Yb();
                cc && dc("event: " + g.toString());
                ec(k);
              }
            }
            a.vb[d] = null;
          } else
            c = !1;
      }
      c && (a.vb = []);
    }
    function Zb(a) {
      this.ta = a;
      this.ud = [];
    }
    Zb.prototype.add = function(a) {
      this.ud.push(a);
    };
    Zb.prototype.bc = function() {
      return this.ta;
    };
    function H(a, b, c, d) {
      this.type = a;
      this.Ma = b;
      this.Ya = c;
      this.Le = d;
      this.Rd = void 0;
    }
    function fc(a) {
      return new H(gc, a);
    }
    var gc = "value";
    function hc(a, b, c, d) {
      this.te = b;
      this.Zd = c;
      this.Rd = d;
      this.td = a;
    }
    hc.prototype.bc = function() {
      var a = this.Zd.Kb();
      return "value" === this.td ? a.path : a.parent().path;
    };
    hc.prototype.ze = function() {
      return this.td;
    };
    hc.prototype.Yb = function() {
      return this.te.Yb(this);
    };
    hc.prototype.toString = function() {
      return this.bc().toString() + ":" + this.td + ":" + F(this.Zd.nf());
    };
    function ic(a, b, c) {
      this.te = a;
      this.error = b;
      this.path = c;
    }
    ic.prototype.bc = function() {
      return this.path;
    };
    ic.prototype.ze = function() {
      return "cancel";
    };
    ic.prototype.Yb = function() {
      return this.te.Yb(this);
    };
    ic.prototype.toString = function() {
      return this.path.toString() + ":cancel";
    };
    function Vb(a, b, c) {
      this.A = a;
      this.ga = b;
      this.Xb = c;
    }
    function jc(a) {
      return a.ga;
    }
    function kc(a) {
      return a.Xb;
    }
    function lc(a, b) {
      return b.e() ? a.ga && !a.Xb : Ub(a, I(b));
    }
    function Ub(a, b) {
      return a.ga && !a.Xb || a.A.Fa(b);
    }
    Vb.prototype.j = function() {
      return this.A;
    };
    function mc(a) {
      this.og = a;
      this.Dd = null;
    }
    mc.prototype.get = function() {
      var a = this.og.get(),
          b = wa(a);
      if (this.Dd)
        for (var c in this.Dd)
          b[c] -= this.Dd[c];
      this.Dd = a;
      return b;
    };
    function nc(a, b) {
      this.Uf = {};
      this.ed = new mc(a);
      this.da = b;
      var c = 1E4 + 2E4 * Math.random();
      setTimeout(u(this.Mf, this), Math.floor(c));
    }
    nc.prototype.Mf = function() {
      var a = this.ed.get(),
          b = {},
          c = !1,
          d;
      for (d in a)
        0 < a[d] && y(this.Uf, d) && (b[d] = a[d], c = !0);
      c && this.da.Ve(b);
      setTimeout(u(this.Mf, this), Math.floor(6E5 * Math.random()));
    };
    function oc() {
      this.Fc = {};
    }
    function pc(a, b, c) {
      p(c) || (c = 1);
      y(a.Fc, b) || (a.Fc[b] = 0);
      a.Fc[b] += c;
    }
    oc.prototype.get = function() {
      return wa(this.Fc);
    };
    var qc = {},
        rc = {};
    function sc(a) {
      a = a.toString();
      qc[a] || (qc[a] = new oc);
      return qc[a];
    }
    function tc(a, b) {
      var c = a.toString();
      rc[c] || (rc[c] = b());
      return rc[c];
    }
    ;
    function K(a, b) {
      this.name = a;
      this.U = b;
    }
    function uc(a, b) {
      return new K(a, b);
    }
    ;
    function vc(a, b) {
      return wc(a.name, b.name);
    }
    function xc(a, b) {
      return wc(a, b);
    }
    ;
    function yc(a, b, c) {
      this.type = zc;
      this.source = a;
      this.path = b;
      this.Ia = c;
    }
    yc.prototype.Yc = function(a) {
      return this.path.e() ? new yc(this.source, L, this.Ia.T(a)) : new yc(this.source, M(this.path), this.Ia);
    };
    yc.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Ia.toString() + ")";
    };
    function Ac(a, b) {
      this.type = Bc;
      this.source = a;
      this.path = b;
    }
    Ac.prototype.Yc = function() {
      return this.path.e() ? new Ac(this.source, L) : new Ac(this.source, M(this.path));
    };
    Ac.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)";
    };
    function Cc(a, b) {
      this.Oa = a;
      this.xa = b ? b : Dc;
    }
    h = Cc.prototype;
    h.Ra = function(a, b) {
      return new Cc(this.Oa, this.xa.Ra(a, b, this.Oa).$(null, null, !1, null, null));
    };
    h.remove = function(a) {
      return new Cc(this.Oa, this.xa.remove(a, this.Oa).$(null, null, !1, null, null));
    };
    h.get = function(a) {
      for (var b,
          c = this.xa; !c.e(); ) {
        b = this.Oa(a, c.key);
        if (0 === b)
          return c.value;
        0 > b ? c = c.left : 0 < b && (c = c.right);
      }
      return null;
    };
    function Ec(a, b) {
      for (var c,
          d = a.xa,
          e = null; !d.e(); ) {
        c = a.Oa(b, d.key);
        if (0 === c) {
          if (d.left.e())
            return e ? e.key : null;
          for (d = d.left; !d.right.e(); )
            d = d.right;
          return d.key;
        }
        0 > c ? d = d.left : 0 < c && (e = d, d = d.right);
      }
      throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }
    h.e = function() {
      return this.xa.e();
    };
    h.count = function() {
      return this.xa.count();
    };
    h.Tc = function() {
      return this.xa.Tc();
    };
    h.ic = function() {
      return this.xa.ic();
    };
    h.ka = function(a) {
      return this.xa.ka(a);
    };
    h.$b = function(a) {
      return new Fc(this.xa, null, this.Oa, !1, a);
    };
    h.ac = function(a, b) {
      return new Fc(this.xa, a, this.Oa, !1, b);
    };
    h.cc = function(a, b) {
      return new Fc(this.xa, a, this.Oa, !0, b);
    };
    h.tf = function(a) {
      return new Fc(this.xa, null, this.Oa, !0, a);
    };
    function Fc(a, b, c, d, e) {
      this.Vd = e || null;
      this.Fe = d;
      this.Sa = [];
      for (e = 1; !a.e(); )
        if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e)
          a = this.Fe ? a.left : a.right;
        else if (0 === e) {
          this.Sa.push(a);
          break;
        } else
          this.Sa.push(a), a = this.Fe ? a.right : a.left;
    }
    function Gc(a) {
      if (0 === a.Sa.length)
        return null;
      var b = a.Sa.pop(),
          c;
      c = a.Vd ? a.Vd(b.key, b.value) : {
        key: b.key,
        value: b.value
      };
      if (a.Fe)
        for (b = b.left; !b.e(); )
          a.Sa.push(b), b = b.right;
      else
        for (b = b.right; !b.e(); )
          a.Sa.push(b), b = b.left;
      return c;
    }
    function Hc(a) {
      if (0 === a.Sa.length)
        return null;
      var b;
      b = a.Sa;
      b = b[b.length - 1];
      return a.Vd ? a.Vd(b.key, b.value) : {
        key: b.key,
        value: b.value
      };
    }
    function Ic(a, b, c, d, e) {
      this.key = a;
      this.value = b;
      this.color = null != c ? c : !0;
      this.left = null != d ? d : Dc;
      this.right = null != e ? e : Dc;
    }
    h = Ic.prototype;
    h.$ = function(a, b, c, d, e) {
      return new Ic(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right);
    };
    h.count = function() {
      return this.left.count() + 1 + this.right.count();
    };
    h.e = function() {
      return !1;
    };
    h.ka = function(a) {
      return this.left.ka(a) || a(this.key, this.value) || this.right.ka(a);
    };
    function Jc(a) {
      return a.left.e() ? a : Jc(a.left);
    }
    h.Tc = function() {
      return Jc(this).key;
    };
    h.ic = function() {
      return this.right.e() ? this.key : this.right.ic();
    };
    h.Ra = function(a, b, c) {
      var d,
          e;
      e = this;
      d = c(a, e.key);
      e = 0 > d ? e.$(null, null, null, e.left.Ra(a, b, c), null) : 0 === d ? e.$(null, b, null, null, null) : e.$(null, null, null, null, e.right.Ra(a, b, c));
      return Kc(e);
    };
    function Lc(a) {
      if (a.left.e())
        return Dc;
      a.left.ha() || a.left.left.ha() || (a = Mc(a));
      a = a.$(null, null, null, Lc(a.left), null);
      return Kc(a);
    }
    h.remove = function(a, b) {
      var c,
          d;
      c = this;
      if (0 > b(a, c.key))
        c.left.e() || c.left.ha() || c.left.left.ha() || (c = Mc(c)), c = c.$(null, null, null, c.left.remove(a, b), null);
      else {
        c.left.ha() && (c = Nc(c));
        c.right.e() || c.right.ha() || c.right.left.ha() || (c = Oc(c), c.left.left.ha() && (c = Nc(c), c = Oc(c)));
        if (0 === b(a, c.key)) {
          if (c.right.e())
            return Dc;
          d = Jc(c.right);
          c = c.$(d.key, d.value, null, null, Lc(c.right));
        }
        c = c.$(null, null, null, null, c.right.remove(a, b));
      }
      return Kc(c);
    };
    h.ha = function() {
      return this.color;
    };
    function Kc(a) {
      a.right.ha() && !a.left.ha() && (a = Pc(a));
      a.left.ha() && a.left.left.ha() && (a = Nc(a));
      a.left.ha() && a.right.ha() && (a = Oc(a));
      return a;
    }
    function Mc(a) {
      a = Oc(a);
      a.right.left.ha() && (a = a.$(null, null, null, null, Nc(a.right)), a = Pc(a), a = Oc(a));
      return a;
    }
    function Pc(a) {
      return a.right.$(null, null, a.color, a.$(null, null, !0, null, a.right.left), null);
    }
    function Nc(a) {
      return a.left.$(null, null, a.color, null, a.$(null, null, !0, a.left.right, null));
    }
    function Oc(a) {
      return a.$(null, null, !a.color, a.left.$(null, null, !a.left.color, null, null), a.right.$(null, null, !a.right.color, null, null));
    }
    function Qc() {}
    h = Qc.prototype;
    h.$ = function() {
      return this;
    };
    h.Ra = function(a, b) {
      return new Ic(a, b, null);
    };
    h.remove = function() {
      return this;
    };
    h.count = function() {
      return 0;
    };
    h.e = function() {
      return !0;
    };
    h.ka = function() {
      return !1;
    };
    h.Tc = function() {
      return null;
    };
    h.ic = function() {
      return null;
    };
    h.ha = function() {
      return !1;
    };
    var Dc = new Qc;
    (function() {
      var a = process.version;
      if ("v0.10.22" === a || "v0.10.23" === a || "v0.10.24" === a) {
        var b = function(a, b, c) {
          this.chunk = a;
          this.encoding = b;
          this.callback = c;
        },
            c = function(a, c, d, e, l) {
              c.objectMode || !1 === c.decodeStrings || "string" !== typeof d || (d = new Buffer(d, e));
              Buffer.isBuffer(d) && (e = "buffer");
              var r = c.objectMode ? 1 : d.length;
              c.length += r;
              var x = c.length < c.highWaterMark;
              x || (c.needDrain = !0);
              c.writing ? c.buffer.push(new b(d, e, l)) : (c.writelen = r, c.writecb = l, c.writing = !0, c.sync = !0, a._write(d, e, c.onwrite), c.sync = !1);
              return x;
            },
            d = function(a, b, c, d) {
              var e = !0;
              if (!Buffer.isBuffer(c) && "string" !== typeof c && null !== c && void 0 !== c && !b.objectMode) {
                var r = new TypeError("Invalid non-string/buffer chunk");
                a.emit("error", r);
                process.nextTick(function() {
                  d(r);
                });
                e = !1;
              }
              return e;
            },
            e = function(a, b) {
              var c = Error("write after end");
              a.emit("error", c);
              process.nextTick(function() {
                b(c);
              });
            },
            a = require('_stream_writable');
        a.prototype.write = function(a, b, k) {
          var m = this._writableState,
              l = !1;
          "function" === typeof b && (k = b, b = null);
          Buffer.isBuffer(a) ? b = "buffer" : b || (b = m.defaultEncoding);
          "function" !== typeof k && (k = function() {});
          m.ended ? e(this, k) : d(this, m, a, k) && (l = c(this, m, a, b, k));
          return l;
        };
        require('_stream_duplex').prototype.write = a.prototype.write;
      }
    })();
    function Rc(a, b) {
      return a && "object" === typeof a ? (N(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a;
    }
    function Sc(a, b) {
      var c = new Tc;
      Uc(a, new O(""), function(a, e) {
        c.qc(a, Vc(e, b));
      });
      return c;
    }
    function Vc(a, b) {
      var c = a.C().J(),
          c = Rc(c, b),
          d;
      if (a.L()) {
        var e = Rc(a.Ea(), b);
        return e !== a.Ea() || c !== a.C().J() ? new Wc(e, P(c)) : a;
      }
      d = a;
      c !== a.C().J() && (d = d.ia(new Wc(c)));
      a.R(Q, function(a, c) {
        var e = Vc(c, b);
        e !== c && (d = d.W(a, e));
      });
      return d;
    }
    ;
    function Xc() {
      this.zc = {};
    }
    Xc.prototype.set = function(a, b) {
      null == b ? delete this.zc[a] : this.zc[a] = b;
    };
    Xc.prototype.get = function(a) {
      return y(this.zc, a) ? this.zc[a] : null;
    };
    Xc.prototype.remove = function(a) {
      delete this.zc[a];
    };
    Xc.prototype.xf = !0;
    function Yc(a) {
      this.Gc = a;
      this.Qd = "firebase:";
    }
    h = Yc.prototype;
    h.set = function(a, b) {
      null == b ? this.Gc.removeItem(this.Qd + a) : this.Gc.setItem(this.Qd + a, F(b));
    };
    h.get = function(a) {
      a = this.Gc.getItem(this.Qd + a);
      return null == a ? null : Pb(a);
    };
    h.remove = function(a) {
      this.Gc.removeItem(this.Qd + a);
    };
    h.xf = !1;
    h.toString = function() {
      return this.Gc.toString();
    };
    function Zc(a) {
      try {
        if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
          var b = window[a];
          b.setItem("firebase:sentinel", "cache");
          b.removeItem("firebase:sentinel");
          return new Yc(b);
        }
      } catch (c) {}
      return new Xc;
    }
    var $c = Zc("localStorage"),
        ad = Zc("sessionStorage");
    function bd(a, b, c, d, e) {
      this.host = a.toLowerCase();
      this.domain = this.host.substr(this.host.indexOf(".") + 1);
      this.mb = b;
      this.jc = c;
      this.ih = d;
      this.Pd = e || "";
      this.$a = $c.get("host:" + a) || this.host;
    }
    function cd(a, b) {
      b !== a.$a && (a.$a = b, "s-" === a.$a.substr(0, 2) && $c.set("host:" + a.host, a.$a));
    }
    function dd(a, b, c) {
      N("string" === typeof b, "typeof type must == string");
      N("object" === typeof c, "typeof params must == object");
      if (b === ed)
        b = (a.mb ? "wss://" : "ws://") + a.$a + "/.ws?";
      else if (b === fd)
        b = (a.mb ? "https://" : "http://") + a.$a + "/.lp?";
      else
        throw Error("Unknown connection type: " + b);
      a.host !== a.$a && (c.ns = a.jc);
      var d = [];
      v(c, function(a, b) {
        d.push(b + "=" + a);
      });
      return b + d.join("&");
    }
    bd.prototype.toString = function() {
      var a = (this.mb ? "https://" : "http://") + this.host;
      this.Pd && (a += "<" + this.Pd + ">");
      return a;
    };
    var gd = function() {
      var a = 1;
      return function() {
        return a++;
      };
    }(),
        N = Ib,
        hd = Jb;
    function id(a) {
      try {
        return (new Buffer(a, "base64")).toString("utf8");
      } catch (b) {
        dc("base64Decode failed: ", b);
      }
      return null;
    }
    function jd(a) {
      var b = Mb(a);
      a = new Ja;
      a.update(b);
      var b = [],
          c = 8 * a.de;
      56 > a.dc ? a.update(a.Md, 56 - a.dc) : a.update(a.Md, a.Xa - (a.dc - 56));
      for (var d = a.Xa - 1; 56 <= d; d--)
        a.le[d] = c & 255, c /= 256;
      Ka(a, a.le);
      for (d = c = 0; 5 > d; d++)
        for (var e = 24; 0 <= e; e -= 8)
          b[c] = a.P[d] >> e & 255, ++c;
      return mb(b);
    }
    function kd(a) {
      for (var b = "",
          c = 0; c < arguments.length; c++)
        b = ea(arguments[c]) ? b + kd.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + F(arguments[c]) : b + arguments[c], b += " ";
      return b;
    }
    var cc = null,
        ld = !0;
    function md(a, b) {
      Ib(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
      !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? cc = u(console.log, console) : "object" === typeof console.log && (cc = function(a) {
        console.log(a);
      })), b && ad.set("logging_enabled", !0)) : t(a) ? cc = a : (cc = null, ad.remove("logging_enabled"));
    }
    function dc(a) {
      !0 === ld && (ld = !1, null === cc && !0 === ad.get("logging_enabled") && md(!0));
      if (cc) {
        var b = kd.apply(null, arguments);
        cc(b);
      }
    }
    function nd(a) {
      return function() {
        dc(a, arguments);
      };
    }
    function od(a) {
      if ("undefined" !== typeof console) {
        var b = "FIREBASE INTERNAL ERROR: " + kd.apply(null, arguments);
        "undefined" !== typeof console.error ? console.error(b) : console.log(b);
      }
    }
    function pd(a) {
      var b = kd.apply(null, arguments);
      throw Error("FIREBASE FATAL ERROR: " + b);
    }
    function R(a) {
      if ("undefined" !== typeof console) {
        var b = "FIREBASE WARNING: " + kd.apply(null, arguments);
        "undefined" !== typeof console.warn ? console.warn(b) : console.log(b);
      }
    }
    function qd(a) {
      var b = "",
          c = "",
          d = "",
          e = "",
          f = !0,
          g = "https",
          k = 443;
      if (q(a)) {
        var m = a.indexOf("//");
        0 <= m && (g = a.substring(0, m - 1), a = a.substring(m + 2));
        m = a.indexOf("/");
        -1 === m && (m = a.length);
        b = a.substring(0, m);
        e = "";
        a = a.substring(m).split("/");
        for (m = 0; m < a.length; m++)
          if (0 < a[m].length) {
            var l = a[m];
            try {
              l = decodeURIComponent(l.replace(/\+/g, " "));
            } catch (r) {}
            e += "/" + l;
          }
        a = b.split(".");
        3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
        m = b.indexOf(":");
        0 <= m && (f = "https" === g || "wss" === g, k = b.substring(m + 1), isFinite(k) && (k = String(k)), k = q(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN);
      }
      return {
        host: b,
        port: k,
        domain: c,
        eh: d,
        mb: f,
        scheme: g,
        oc: e
      };
    }
    function rd(a) {
      return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY);
    }
    function sd(a) {
      a();
    }
    function wc(a, b) {
      if (a === b)
        return 0;
      if ("[MIN_NAME]" === a || "[MAX_NAME]" === b)
        return -1;
      if ("[MIN_NAME]" === b || "[MAX_NAME]" === a)
        return 1;
      var c = td(a),
          d = td(b);
      return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1;
    }
    function ud(a, b) {
      if (b && a in b)
        return b[a];
      throw Error("Missing required key (" + a + ") in object: " + F(b));
    }
    function vd(a) {
      if ("object" !== typeof a || null === a)
        return F(a);
      var b = [],
          c;
      for (c in a)
        b.push(c);
      b.sort();
      c = "{";
      for (var d = 0; d < b.length; d++)
        0 !== d && (c += ","), c += F(b[d]), c += ":", c += vd(a[b[d]]);
      return c + "}";
    }
    function wd(a, b) {
      if (a.length <= b)
        return [a];
      for (var c = [],
          d = 0; d < a.length; d += b)
        d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
      return c;
    }
    function xd(a, b) {
      if (da(a))
        for (var c = 0; c < a.length; ++c)
          b(c, a[c]);
      else
        v(a, b);
    }
    function yd(a) {
      N(!rd(a), "Invalid JSON number");
      var b,
          c,
          d,
          e;
      0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
      e = [];
      for (a = 52; a; --a)
        e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
      for (a = 11; a; --a)
        e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
      e.push(b ? 1 : 0);
      e.reverse();
      b = e.join("");
      c = "";
      for (a = 0; 64 > a; a += 8)
        d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length && (d = "0" + d), c += d;
      return c.toLowerCase();
    }
    var zd = /^-?\d{1,10}$/;
    function td(a) {
      return zd.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null;
    }
    function ec(a) {
      try {
        a();
      } catch (b) {
        setTimeout(function() {
          R("Exception was thrown by user callback.", b.stack || "");
          throw b;
        }, Math.floor(0));
      }
    }
    function S(a, b) {
      if (t(a)) {
        var c = Array.prototype.slice.call(arguments, 1).slice();
        ec(function() {
          a.apply(null, c);
        });
      }
    }
    ;
    function Ad(a) {
      var b = {},
          c = {},
          d = {},
          e = "";
      try {
        var f = a.split("."),
            b = Pb(id(f[0]) || ""),
            c = Pb(id(f[1]) || ""),
            e = f[2],
            d = c.d || {};
        delete c.d;
      } catch (g) {}
      return {
        nh: b,
        Dc: c,
        data: d,
        ah: e
      };
    }
    function Bd(a) {
      a = Ad(a).Dc;
      return "object" === typeof a && a.hasOwnProperty("iat") ? z(a, "iat") : null;
    }
    function Cd(a) {
      a = Ad(a);
      var b = a.Dc;
      return !!a.ah && !!b && "object" === typeof b && b.hasOwnProperty("iat");
    }
    ;
    function Dd(a) {
      this.Y = a;
      this.g = a.n.g;
    }
    function Ed(a, b, c, d) {
      var e = [],
          f = [];
      Na(b, function(b) {
        "child_changed" === b.type && a.g.Ad(b.Le, b.Ma) && f.push(new H("child_moved", b.Ma, b.Ya));
      });
      Fd(a, e, "child_removed", b, d, c);
      Fd(a, e, "child_added", b, d, c);
      Fd(a, e, "child_moved", f, d, c);
      Fd(a, e, "child_changed", b, d, c);
      Fd(a, e, gc, b, d, c);
      return e;
    }
    function Fd(a, b, c, d, e, f) {
      d = Oa(d, function(a) {
        return a.type === c;
      });
      Va(d, u(a.qg, a));
      Na(d, function(c) {
        var d = Gd(a, c, f);
        Na(e, function(e) {
          e.Of(c.type) && b.push(e.createEvent(d, a.Y));
        });
      });
    }
    function Gd(a, b, c) {
      "value" !== b.type && "child_removed" !== b.type && (b.Rd = c.sf(b.Ya, b.Ma, a.g));
      return b;
    }
    Dd.prototype.qg = function(a, b) {
      if (null == a.Ya || null == b.Ya)
        throw hd("Should only compare child_ events.");
      return this.g.compare(new K(a.Ya, a.Ma), new K(b.Ya, b.Ma));
    };
    function Hd() {
      this.hb = {};
    }
    function Id(a, b) {
      var c = b.type,
          d = b.Ya;
      N("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
      N(".priority" !== d, "Only non-priority child changes can be tracked.");
      var e = z(a.hb, d);
      if (e) {
        var f = e.type;
        if ("child_added" == c && "child_removed" == f)
          a.hb[d] = new H("child_changed", b.Ma, d, e.Ma);
        else if ("child_removed" == c && "child_added" == f)
          delete a.hb[d];
        else if ("child_removed" == c && "child_changed" == f)
          a.hb[d] = new H("child_removed", e.Le, d);
        else if ("child_changed" == c && "child_added" == f)
          a.hb[d] = new H("child_added", b.Ma, d);
        else if ("child_changed" == c && "child_changed" == f)
          a.hb[d] = new H("child_changed", b.Ma, d, e.Le);
        else
          throw hd("Illegal combination of changes: " + b + " occurred after " + e);
      } else
        a.hb[d] = b;
    }
    ;
    function Jd(a) {
      this.g = a;
    }
    h = Jd.prototype;
    h.H = function(a, b, c, d, e, f) {
      N(a.Kc(this.g), "A node must be indexed if only a child is updated");
      e = a.T(b);
      if (e.S(d).ea(c.S(d)) && e.e() == c.e())
        return a;
      null != f && (c.e() ? a.Fa(b) ? Id(f, new H("child_removed", e, b)) : N(a.L(), "A child remove without an old child only makes sense on a leaf node") : e.e() ? Id(f, new H("child_added", c, b)) : Id(f, new H("child_changed", c, b, e)));
      return a.L() && c.e() ? a : a.W(b, c).nb(this.g);
    };
    h.ya = function(a, b, c) {
      null != c && (a.L() || a.R(Q, function(a, e) {
        b.Fa(a) || Id(c, new H("child_removed", e, a));
      }), b.L() || b.R(Q, function(b, e) {
        if (a.Fa(b)) {
          var f = a.T(b);
          f.ea(e) || Id(c, new H("child_changed", e, b, f));
        } else
          Id(c, new H("child_added", e, b));
      }));
      return b.nb(this.g);
    };
    h.ia = function(a, b) {
      return a.e() ? G : a.ia(b);
    };
    h.Qa = function() {
      return !1;
    };
    h.Zb = function() {
      return this;
    };
    function Kd(a) {
      this.Be = new Jd(a.g);
      this.g = a.g;
      var b;
      a.oa ? (b = Ld(a), b = a.g.Qc(Nd(a), b)) : b = a.g.Uc();
      this.dd = b;
      a.ra ? (b = Od(a), a = a.g.Qc(Pd(a), b)) : a = a.g.Rc();
      this.Hc = a;
    }
    h = Kd.prototype;
    h.matches = function(a) {
      return 0 >= this.g.compare(this.dd, a) && 0 >= this.g.compare(a, this.Hc);
    };
    h.H = function(a, b, c, d, e, f) {
      this.matches(new K(b, c)) || (c = G);
      return this.Be.H(a, b, c, d, e, f);
    };
    h.ya = function(a, b, c) {
      b.L() && (b = G);
      var d = b.nb(this.g),
          d = d.ia(G),
          e = this;
      b.R(Q, function(a, b) {
        e.matches(new K(a, b)) || (d = d.W(a, G));
      });
      return this.Be.ya(a, d, c);
    };
    h.ia = function(a) {
      return a;
    };
    h.Qa = function() {
      return !0;
    };
    h.Zb = function() {
      return this.Be;
    };
    function Qd(a) {
      this.ua = new Kd(a);
      this.g = a.g;
      N(a.la, "Only valid if limit has been set");
      this.ma = a.ma;
      this.Lb = !Rd(a);
    }
    h = Qd.prototype;
    h.H = function(a, b, c, d, e, f) {
      this.ua.matches(new K(b, c)) || (c = G);
      return a.T(b).ea(c) ? a : a.Fb() < this.ma ? this.ua.Zb().H(a, b, c, d, e, f) : Sd(this, a, b, c, e, f);
    };
    h.ya = function(a, b, c) {
      var d;
      if (b.L() || b.e())
        d = G.nb(this.g);
      else if (2 * this.ma < b.Fb() && b.Kc(this.g)) {
        d = G.nb(this.g);
        b = this.Lb ? b.cc(this.ua.Hc, this.g) : b.ac(this.ua.dd, this.g);
        for (var e = 0; 0 < b.Sa.length && e < this.ma; ) {
          var f = Gc(b),
              g;
          if (g = this.Lb ? 0 >= this.g.compare(this.ua.dd, f) : 0 >= this.g.compare(f, this.ua.Hc))
            d = d.W(f.name, f.U), e++;
          else
            break;
        }
      } else {
        d = b.nb(this.g);
        d = d.ia(G);
        var k,
            m,
            l;
        if (this.Lb) {
          b = d.tf(this.g);
          k = this.ua.Hc;
          m = this.ua.dd;
          var r = Td(this.g);
          l = function(a, b) {
            return r(b, a);
          };
        } else
          b = d.$b(this.g), k = this.ua.dd, m = this.ua.Hc, l = Td(this.g);
        for (var e = 0,
            x = !1; 0 < b.Sa.length; )
          f = Gc(b), !x && 0 >= l(k, f) && (x = !0), (g = x && e < this.ma && 0 >= l(f, m)) ? e++ : d = d.W(f.name, G);
      }
      return this.ua.Zb().ya(a, d, c);
    };
    h.ia = function(a) {
      return a;
    };
    h.Qa = function() {
      return !0;
    };
    h.Zb = function() {
      return this.ua.Zb();
    };
    function Sd(a, b, c, d, e, f) {
      var g;
      if (a.Lb) {
        var k = Td(a.g);
        g = function(a, b) {
          return k(b, a);
        };
      } else
        g = Td(a.g);
      N(b.Fb() == a.ma, "");
      var m = new K(c, d),
          l = a.Lb ? Ud(b, a.g) : Vd(b, a.g),
          r = a.ua.matches(m);
      if (b.Fa(c)) {
        for (var x = b.T(c),
            l = e.ye(a.g, l, a.Lb); null != l && (l.name == c || b.Fa(l.name)); )
          l = e.ye(a.g, l, a.Lb);
        e = null == l ? 1 : g(l, m);
        if (r && !d.e() && 0 <= e)
          return null != f && Id(f, new H("child_changed", d, c, x)), b.W(c, d);
        null != f && Id(f, new H("child_removed", x, c));
        b = b.W(c, G);
        return null != l && a.ua.matches(l) ? (null != f && Id(f, new H("child_added", l.U, l.name)), b.W(l.name, l.U)) : b;
      }
      return d.e() ? b : r && 0 <= g(l, m) ? (null != f && (Id(f, new H("child_removed", l.U, l.name)), Id(f, new H("child_added", d, c))), b.W(c, d).W(l.name, G)) : b;
    }
    ;
    function Wd(a, b) {
      this.ie = a;
      this.ng = b;
    }
    function Xd(a) {
      this.X = a;
    }
    Xd.prototype.fb = function(a, b, c, d) {
      var e = new Hd,
          f;
      if (b.type === zc)
        b.source.we ? c = Yd(this, a, b.path, b.Ia, c, d, e) : (N(b.source.qf, "Unknown source."), f = b.source.bf || kc(a.w()) && !b.path.e(), c = Zd(this, a, b.path, b.Ia, c, d, f, e));
      else if (b.type === $d)
        b.source.we ? c = ae(this, a, b.path, b.children, c, d, e) : (N(b.source.qf, "Unknown source."), f = b.source.bf || kc(a.w()), c = be(this, a, b.path, b.children, c, d, f, e));
      else if (b.type === ce)
        if (b.Wd)
          if (b = b.path, null != c.wc(b))
            c = a;
          else {
            f = new Tb(c, a, d);
            d = a.Q.j();
            if (b.e() || ".priority" === I(b))
              jc(a.w()) ? b = c.Aa(Wb(a)) : (b = a.w().j(), N(b instanceof de, "serverChildren would be complete if leaf node"), b = c.Bc(b)), b = this.X.ya(d, b, e);
            else {
              var g = I(b),
                  k = c.Ac(g, a.w());
              null == k && Ub(a.w(), g) && (k = d.T(g));
              b = null != k ? this.X.H(d, g, k, M(b), f, e) : a.Q.j().Fa(g) ? this.X.H(d, g, G, M(b), f, e) : d;
              b.e() && jc(a.w()) && (d = c.Aa(Wb(a)), d.L() && (b = this.X.ya(b, d, e)));
            }
            d = jc(a.w()) || null != c.wc(L);
            c = ee(a, b, d, this.X.Qa());
          }
        else
          c = fe(this, a, b.path, b.Sb, c, d, e);
      else if (b.type === Bc)
        d = b.path, b = a.w(), f = b.j(), g = b.ga || d.e(), c = ge(this, new he(a.Q, new Vb(f, g, b.Xb)), d, c, Sb, e);
      else
        throw hd("Unknown operation type: " + b.type);
      e = qa(e.hb);
      d = c;
      b = d.Q;
      b.ga && (f = b.j().L() || b.j().e(), g = ie(a), (0 < e.length || !a.Q.ga || f && !b.j().ea(g) || !b.j().C().ea(g.C())) && e.push(fc(ie(d))));
      return new Wd(c, e);
    };
    function ge(a, b, c, d, e, f) {
      var g = b.Q;
      if (null != d.wc(c))
        return b;
      var k;
      if (c.e())
        N(jc(b.w()), "If change path is empty, we must have complete server data"), kc(b.w()) ? (e = Wb(b), d = d.Bc(e instanceof de ? e : G)) : d = d.Aa(Wb(b)), f = a.X.ya(b.Q.j(), d, f);
      else {
        var m = I(c);
        if (".priority" == m)
          N(1 == je(c), "Can't have a priority with additional path components"), f = g.j(), k = b.w().j(), d = d.kd(c, f, k), f = null != d ? a.X.ia(f, d) : g.j();
        else {
          var l = M(c);
          Ub(g, m) ? (k = b.w().j(), d = d.kd(c, g.j(), k), d = null != d ? g.j().T(m).H(l, d) : g.j().T(m)) : d = d.Ac(m, b.w());
          f = null != d ? a.X.H(g.j(), m, d, l, e, f) : g.j();
        }
      }
      return ee(b, f, g.ga || c.e(), a.X.Qa());
    }
    function Zd(a, b, c, d, e, f, g, k) {
      var m = b.w();
      g = g ? a.X : a.X.Zb();
      if (c.e())
        d = g.ya(m.j(), d, null);
      else if (g.Qa() && !m.Xb)
        d = m.j().H(c, d), d = g.ya(m.j(), d, null);
      else {
        var l = I(c);
        if (!lc(m, c) && 1 < je(c))
          return b;
        var r = M(c);
        d = m.j().T(l).H(r, d);
        d = ".priority" == l ? g.ia(m.j(), d) : g.H(m.j(), l, d, r, Sb, null);
      }
      m = m.ga || c.e();
      b = new he(b.Q, new Vb(d, m, g.Qa()));
      return ge(a, b, c, e, new Tb(e, b, f), k);
    }
    function Yd(a, b, c, d, e, f, g) {
      var k = b.Q;
      e = new Tb(e, b, f);
      if (c.e())
        g = a.X.ya(b.Q.j(), d, g), a = ee(b, g, !0, a.X.Qa());
      else if (f = I(c), ".priority" === f)
        g = a.X.ia(b.Q.j(), d), a = ee(b, g, k.ga, k.Xb);
      else {
        c = M(c);
        var m = k.j().T(f);
        if (!c.e()) {
          var l = e.rf(f);
          d = null != l ? ".priority" === ke(c) && l.S(c.parent()).e() ? l : l.H(c, d) : G;
        }
        m.ea(d) ? a = b : (g = a.X.H(k.j(), f, d, c, e, g), a = ee(b, g, k.ga, a.X.Qa()));
      }
      return a;
    }
    function ae(a, b, c, d, e, f, g) {
      var k = b;
      le(d, function(d, l) {
        var r = c.o(d);
        Ub(b.Q, I(r)) && (k = Yd(a, k, r, l, e, f, g));
      });
      le(d, function(d, l) {
        var r = c.o(d);
        Ub(b.Q, I(r)) || (k = Yd(a, k, r, l, e, f, g));
      });
      return k;
    }
    function me(a, b) {
      le(b, function(b, d) {
        a = a.H(b, d);
      });
      return a;
    }
    function be(a, b, c, d, e, f, g, k) {
      if (b.w().j().e() && !jc(b.w()))
        return b;
      var m = b;
      c = c.e() ? d : ne(oe, c, d);
      var l = b.w().j();
      c.children.ka(function(c, d) {
        if (l.Fa(c)) {
          var J = b.w().j().T(c),
              J = me(J, d);
          m = Zd(a, m, new O(c), J, e, f, g, k);
        }
      });
      c.children.ka(function(c, d) {
        var J = !Ub(b.w(), c) && null == d.value;
        l.Fa(c) || J || (J = b.w().j().T(c), J = me(J, d), m = Zd(a, m, new O(c), J, e, f, g, k));
      });
      return m;
    }
    function fe(a, b, c, d, e, f, g) {
      if (null != e.wc(c))
        return b;
      var k = kc(b.w()),
          m = b.w();
      if (null != d.value) {
        if (c.e() && m.ga || lc(m, c))
          return Zd(a, b, c, m.j().S(c), e, f, k, g);
        if (c.e()) {
          var l = oe;
          m.j().R(pe, function(a, b) {
            l = l.set(new O(a), b);
          });
          return be(a, b, c, l, e, f, k, g);
        }
        return b;
      }
      l = oe;
      le(d, function(a) {
        var b = c.o(a);
        lc(m, b) && (l = l.set(a, m.j().S(b)));
      });
      return be(a, b, c, l, e, f, k, g);
    }
    ;
    function qe() {}
    var re = {};
    function Td(a) {
      return u(a.compare, a);
    }
    qe.prototype.Ad = function(a, b) {
      return 0 !== this.compare(new K("[MIN_NAME]", a), new K("[MIN_NAME]", b));
    };
    qe.prototype.Uc = function() {
      return se;
    };
    function te(a) {
      N(!a.e() && ".priority" !== I(a), "Can't create PathIndex with empty path or .priority key");
      this.fc = a;
    }
    ka(te, qe);
    h = te.prototype;
    h.Jc = function(a) {
      return !a.S(this.fc).e();
    };
    h.compare = function(a, b) {
      var c = a.U.S(this.fc),
          d = b.U.S(this.fc),
          c = c.Ec(d);
      return 0 === c ? wc(a.name, b.name) : c;
    };
    h.Qc = function(a, b) {
      var c = P(a),
          c = G.H(this.fc, c);
      return new K(b, c);
    };
    h.Rc = function() {
      var a = G.H(this.fc, ue);
      return new K("[MAX_NAME]", a);
    };
    h.toString = function() {
      return this.fc.slice().join("/");
    };
    function ve() {}
    ka(ve, qe);
    h = ve.prototype;
    h.compare = function(a, b) {
      var c = a.U.C(),
          d = b.U.C(),
          c = c.Ec(d);
      return 0 === c ? wc(a.name, b.name) : c;
    };
    h.Jc = function(a) {
      return !a.C().e();
    };
    h.Ad = function(a, b) {
      return !a.C().ea(b.C());
    };
    h.Uc = function() {
      return se;
    };
    h.Rc = function() {
      return new K("[MAX_NAME]", new Wc("[PRIORITY-POST]", ue));
    };
    h.Qc = function(a, b) {
      var c = P(a);
      return new K(b, new Wc("[PRIORITY-POST]", c));
    };
    h.toString = function() {
      return ".priority";
    };
    var Q = new ve;
    function we() {}
    ka(we, qe);
    h = we.prototype;
    h.compare = function(a, b) {
      return wc(a.name, b.name);
    };
    h.Jc = function() {
      throw hd("KeyIndex.isDefinedOn not expected to be called.");
    };
    h.Ad = function() {
      return !1;
    };
    h.Uc = function() {
      return se;
    };
    h.Rc = function() {
      return new K("[MAX_NAME]", G);
    };
    h.Qc = function(a) {
      N(q(a), "KeyIndex indexValue must always be a string.");
      return new K(a, G);
    };
    h.toString = function() {
      return ".key";
    };
    var pe = new we;
    function xe() {}
    ka(xe, qe);
    h = xe.prototype;
    h.compare = function(a, b) {
      var c = a.U.Ec(b.U);
      return 0 === c ? wc(a.name, b.name) : c;
    };
    h.Jc = function() {
      return !0;
    };
    h.Ad = function(a, b) {
      return !a.ea(b);
    };
    h.Uc = function() {
      return se;
    };
    h.Rc = function() {
      return ye;
    };
    h.Qc = function(a, b) {
      var c = P(a);
      return new K(b, c);
    };
    h.toString = function() {
      return ".value";
    };
    var ze = new xe;
    function Ae() {
      this.Wb = this.ra = this.Nb = this.oa = this.la = !1;
      this.ma = 0;
      this.Pb = "";
      this.hc = null;
      this.zb = "";
      this.ec = null;
      this.xb = "";
      this.g = Q;
    }
    var Be = new Ae;
    function Rd(a) {
      return "" === a.Pb ? a.oa : "l" === a.Pb;
    }
    function Nd(a) {
      N(a.oa, "Only valid if start has been set");
      return a.hc;
    }
    function Ld(a) {
      N(a.oa, "Only valid if start has been set");
      return a.Nb ? a.zb : "[MIN_NAME]";
    }
    function Pd(a) {
      N(a.ra, "Only valid if end has been set");
      return a.ec;
    }
    function Od(a) {
      N(a.ra, "Only valid if end has been set");
      return a.Wb ? a.xb : "[MAX_NAME]";
    }
    function Ce(a) {
      var b = new Ae;
      b.la = a.la;
      b.ma = a.ma;
      b.oa = a.oa;
      b.hc = a.hc;
      b.Nb = a.Nb;
      b.zb = a.zb;
      b.ra = a.ra;
      b.ec = a.ec;
      b.Wb = a.Wb;
      b.xb = a.xb;
      b.g = a.g;
      return b;
    }
    h = Ae.prototype;
    h.He = function(a) {
      var b = Ce(this);
      b.la = !0;
      b.ma = a;
      b.Pb = "";
      return b;
    };
    h.Ie = function(a) {
      var b = Ce(this);
      b.la = !0;
      b.ma = a;
      b.Pb = "l";
      return b;
    };
    h.Je = function(a) {
      var b = Ce(this);
      b.la = !0;
      b.ma = a;
      b.Pb = "r";
      return b;
    };
    h.$d = function(a, b) {
      var c = Ce(this);
      c.oa = !0;
      p(a) || (a = null);
      c.hc = a;
      null != b ? (c.Nb = !0, c.zb = b) : (c.Nb = !1, c.zb = "");
      return c;
    };
    h.sd = function(a, b) {
      var c = Ce(this);
      c.ra = !0;
      p(a) || (a = null);
      c.ec = a;
      p(b) ? (c.Wb = !0, c.xb = b) : (c.ph = !1, c.xb = "");
      return c;
    };
    function De(a, b) {
      var c = Ce(a);
      c.g = b;
      return c;
    }
    function Ee(a) {
      var b = {};
      a.oa && (b.sp = a.hc, a.Nb && (b.sn = a.zb));
      a.ra && (b.ep = a.ec, a.Wb && (b.en = a.xb));
      if (a.la) {
        b.l = a.ma;
        var c = a.Pb;
        "" === c && (c = Rd(a) ? "l" : "r");
        b.vf = c;
      }
      a.g !== Q && (b.i = a.g.toString());
      return b;
    }
    function Fe(a) {
      return !(a.oa || a.ra || a.la);
    }
    function Ge(a) {
      return Fe(a) && a.g == Q;
    }
    function He(a) {
      var b = {};
      if (Ge(a))
        return b;
      var c;
      a.g === Q ? c = "$priority" : a.g === ze ? c = "$value" : a.g === pe ? c = "$key" : (N(a.g instanceof te, "Unrecognized index type!"), c = a.g.toString());
      b.orderBy = F(c);
      a.oa && (b.startAt = F(a.hc), a.Nb && (b.startAt += "," + F(a.zb)));
      a.ra && (b.endAt = F(a.ec), a.Wb && (b.endAt += "," + F(a.xb)));
      a.la && (Rd(a) ? b.limitToFirst = a.ma : b.limitToLast = a.ma);
      return b;
    }
    h.toString = function() {
      return F(Ee(this));
    };
    function Ie(a, b) {
      this.Bd = a;
      this.gc = b;
    }
    Ie.prototype.get = function(a) {
      var b = z(this.Bd, a);
      if (!b)
        throw Error("No index defined for " + a);
      return b === re ? null : b;
    };
    function Je(a, b, c) {
      var d = ma(a.Bd, function(d, f) {
        var g = z(a.gc, f);
        N(g, "Missing index implementation for " + f);
        if (d === re) {
          if (g.Jc(b.U)) {
            for (var k = [],
                m = c.$b(uc),
                l = Gc(m); l; )
              l.name != b.name && k.push(l), l = Gc(m);
            k.push(b);
            return Ke(k, Td(g));
          }
          return re;
        }
        g = c.get(b.name);
        k = d;
        g && (k = k.remove(new K(b.name, g)));
        return k.Ra(b, b.U);
      });
      return new Ie(d, a.gc);
    }
    function Le(a, b, c) {
      var d = ma(a.Bd, function(a) {
        if (a === re)
          return a;
        var d = c.get(b.name);
        return d ? a.remove(new K(b.name, d)) : a;
      });
      return new Ie(d, a.gc);
    }
    var Me = new Ie({".priority": re}, {".priority": Q});
    function Wc(a, b) {
      this.B = a;
      N(p(this.B) && null !== this.B, "LeafNode shouldn't be created with null/undefined value.");
      this.ca = b || G;
      Ne(this.ca);
      this.Eb = null;
    }
    var Oe = ["object", "boolean", "number", "string"];
    h = Wc.prototype;
    h.L = function() {
      return !0;
    };
    h.C = function() {
      return this.ca;
    };
    h.ia = function(a) {
      return new Wc(this.B, a);
    };
    h.T = function(a) {
      return ".priority" === a ? this.ca : G;
    };
    h.S = function(a) {
      return a.e() ? this : ".priority" === I(a) ? this.ca : G;
    };
    h.Fa = function() {
      return !1;
    };
    h.sf = function() {
      return null;
    };
    h.W = function(a, b) {
      return ".priority" === a ? this.ia(b) : b.e() && ".priority" !== a ? this : G.W(a, b).ia(this.ca);
    };
    h.H = function(a, b) {
      var c = I(a);
      if (null === c)
        return b;
      if (b.e() && ".priority" !== c)
        return this;
      N(".priority" !== c || 1 === je(a), ".priority must be the last token in a path");
      return this.W(c, G.H(M(a), b));
    };
    h.e = function() {
      return !1;
    };
    h.Fb = function() {
      return 0;
    };
    h.R = function() {
      return !1;
    };
    h.J = function(a) {
      return a && !this.C().e() ? {
        ".value": this.Ea(),
        ".priority": this.C().J()
      } : this.Ea();
    };
    h.hash = function() {
      if (null === this.Eb) {
        var a = "";
        this.ca.e() || (a += "priority:" + Pe(this.ca.J()) + ":");
        var b = typeof this.B,
            a = a + (b + ":"),
            a = "number" === b ? a + yd(this.B) : a + this.B;
        this.Eb = jd(a);
      }
      return this.Eb;
    };
    h.Ea = function() {
      return this.B;
    };
    h.Ec = function(a) {
      if (a === G)
        return 1;
      if (a instanceof de)
        return -1;
      N(a.L(), "Unknown node type");
      var b = typeof a.B,
          c = typeof this.B,
          d = Ma(Oe, b),
          e = Ma(Oe, c);
      N(0 <= d, "Unknown leaf type: " + b);
      N(0 <= e, "Unknown leaf type: " + c);
      return d === e ? "object" === c ? 0 : this.B < a.B ? -1 : this.B === a.B ? 0 : 1 : e - d;
    };
    h.nb = function() {
      return this;
    };
    h.Kc = function() {
      return !0;
    };
    h.ea = function(a) {
      return a === this ? !0 : a.L() ? this.B === a.B && this.ca.ea(a.ca) : !1;
    };
    h.toString = function() {
      return F(this.J(!0));
    };
    function de(a, b, c) {
      this.m = a;
      (this.ca = b) && Ne(this.ca);
      a.e() && N(!this.ca || this.ca.e(), "An empty node cannot have a priority");
      this.yb = c;
      this.Eb = null;
    }
    h = de.prototype;
    h.L = function() {
      return !1;
    };
    h.C = function() {
      return this.ca || G;
    };
    h.ia = function(a) {
      return this.m.e() ? this : new de(this.m, a, this.yb);
    };
    h.T = function(a) {
      if (".priority" === a)
        return this.C();
      a = this.m.get(a);
      return null === a ? G : a;
    };
    h.S = function(a) {
      var b = I(a);
      return null === b ? this : this.T(b).S(M(a));
    };
    h.Fa = function(a) {
      return null !== this.m.get(a);
    };
    h.W = function(a, b) {
      N(b, "We should always be passing snapshot nodes");
      if (".priority" === a)
        return this.ia(b);
      var c = new K(a, b),
          d,
          e;
      b.e() ? (d = this.m.remove(a), c = Le(this.yb, c, this.m)) : (d = this.m.Ra(a, b), c = Je(this.yb, c, this.m));
      e = d.e() ? G : this.ca;
      return new de(d, e, c);
    };
    h.H = function(a, b) {
      var c = I(a);
      if (null === c)
        return b;
      N(".priority" !== I(a) || 1 === je(a), ".priority must be the last token in a path");
      var d = this.T(c).H(M(a), b);
      return this.W(c, d);
    };
    h.e = function() {
      return this.m.e();
    };
    h.Fb = function() {
      return this.m.count();
    };
    var Qe = /^(0|[1-9]\d*)$/;
    h = de.prototype;
    h.J = function(a) {
      if (this.e())
        return null;
      var b = {},
          c = 0,
          d = 0,
          e = !0;
      this.R(Q, function(f, g) {
        b[f] = g.J(a);
        c++;
        e && Qe.test(f) ? d = Math.max(d, Number(f)) : e = !1;
      });
      if (!a && e && d < 2 * c) {
        var f = [],
            g;
        for (g in b)
          f[g] = b[g];
        return f;
      }
      a && !this.C().e() && (b[".priority"] = this.C().J());
      return b;
    };
    h.hash = function() {
      if (null === this.Eb) {
        var a = "";
        this.C().e() || (a += "priority:" + Pe(this.C().J()) + ":");
        this.R(Q, function(b, c) {
          var d = c.hash();
          "" !== d && (a += ":" + b + ":" + d);
        });
        this.Eb = "" === a ? "" : jd(a);
      }
      return this.Eb;
    };
    h.sf = function(a, b, c) {
      return (c = Re(this, c)) ? (a = Ec(c, new K(a, b))) ? a.name : null : Ec(this.m, a);
    };
    function Ud(a, b) {
      var c;
      c = (c = Re(a, b)) ? (c = c.Tc()) && c.name : a.m.Tc();
      return c ? new K(c, a.m.get(c)) : null;
    }
    function Vd(a, b) {
      var c;
      c = (c = Re(a, b)) ? (c = c.ic()) && c.name : a.m.ic();
      return c ? new K(c, a.m.get(c)) : null;
    }
    h.R = function(a, b) {
      var c = Re(this, a);
      return c ? c.ka(function(a) {
        return b(a.name, a.U);
      }) : this.m.ka(b);
    };
    h.$b = function(a) {
      return this.ac(a.Uc(), a);
    };
    h.ac = function(a, b) {
      var c = Re(this, b);
      if (c)
        return c.ac(a, function(a) {
          return a;
        });
      for (var c = this.m.ac(a.name, uc),
          d = Hc(c); null != d && 0 > b.compare(d, a); )
        Gc(c), d = Hc(c);
      return c;
    };
    h.tf = function(a) {
      return this.cc(a.Rc(), a);
    };
    h.cc = function(a, b) {
      var c = Re(this, b);
      if (c)
        return c.cc(a, function(a) {
          return a;
        });
      for (var c = this.m.cc(a.name, uc),
          d = Hc(c); null != d && 0 < b.compare(d, a); )
        Gc(c), d = Hc(c);
      return c;
    };
    h.Ec = function(a) {
      return this.e() ? a.e() ? 0 : -1 : a.L() || a.e() ? 1 : a === ue ? -1 : 0;
    };
    h.nb = function(a) {
      if (a === pe || sa(this.yb.gc, a.toString()))
        return this;
      var b = this.yb,
          c = this.m;
      N(a !== pe, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
      for (var d = [],
          e = !1,
          c = c.$b(uc),
          f = Gc(c); f; )
        e = e || a.Jc(f.U), d.push(f), f = Gc(c);
      d = e ? Ke(d, Td(a)) : re;
      e = a.toString();
      c = wa(b.gc);
      c[e] = a;
      a = wa(b.Bd);
      a[e] = d;
      return new de(this.m, this.ca, new Ie(a, c));
    };
    h.Kc = function(a) {
      return a === pe || sa(this.yb.gc, a.toString());
    };
    h.ea = function(a) {
      if (a === this)
        return !0;
      if (a.L())
        return !1;
      if (this.C().ea(a.C()) && this.m.count() === a.m.count()) {
        var b = this.$b(Q);
        a = a.$b(Q);
        for (var c = Gc(b),
            d = Gc(a); c && d; ) {
          if (c.name !== d.name || !c.U.ea(d.U))
            return !1;
          c = Gc(b);
          d = Gc(a);
        }
        return null === c && null === d;
      }
      return !1;
    };
    function Re(a, b) {
      return b === pe ? null : a.yb.get(b.toString());
    }
    h.toString = function() {
      return F(this.J(!0));
    };
    function P(a, b) {
      if (null === a)
        return G;
      var c = null;
      "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
      N(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
      "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
      if ("object" !== typeof a || ".sv" in a)
        return new Wc(a, P(c));
      if (a instanceof Array) {
        var d = G,
            e = a;
        v(e, function(a, b) {
          if (y(e, b) && "." !== b.substring(0, 1)) {
            var c = P(a);
            if (c.L() || !c.e())
              d = d.W(b, c);
          }
        });
        return d.ia(P(c));
      }
      var f = [],
          g = !1,
          k = a;
      Db(k, function(a) {
        if ("string" !== typeof a || "." !== a.substring(0, 1)) {
          var b = P(k[a]);
          b.e() || (g = g || !b.C().e(), f.push(new K(a, b)));
        }
      });
      if (0 == f.length)
        return G;
      var m = Ke(f, vc, function(a) {
        return a.name;
      }, xc);
      if (g) {
        var l = Ke(f, Td(Q));
        return new de(m, P(c), new Ie({".priority": l}, {".priority": Q}));
      }
      return new de(m, P(c), Me);
    }
    var Se = Math.log(2);
    function Te(a) {
      this.count = parseInt(Math.log(a + 1) / Se, 10);
      this.kf = this.count - 1;
      this.mg = a + 1 & parseInt(Array(this.count + 1).join("1"), 2);
    }
    function Ue(a) {
      var b = !(a.mg & 1 << a.kf);
      a.kf--;
      return b;
    }
    function Ke(a, b, c, d) {
      function e(b, d) {
        var f = d - b;
        if (0 == f)
          return null;
        if (1 == f) {
          var l = a[b],
              r = c ? c(l) : l;
          return new Ic(r, l.U, !1, null, null);
        }
        var l = parseInt(f / 2, 10) + b,
            f = e(b, l),
            x = e(l + 1, d),
            l = a[l],
            r = c ? c(l) : l;
        return new Ic(r, l.U, !1, f, x);
      }
      a.sort(b);
      var f = function(b) {
        function d(b, g) {
          var k = r - b,
              x = r;
          r -= b;
          var x = e(k + 1, x),
              k = a[k],
              J = c ? c(k) : k,
              x = new Ic(J, k.U, g, null, x);
          f ? f.left = x : l = x;
          f = x;
        }
        for (var f = null,
            l = null,
            r = a.length,
            x = 0; x < b.count; ++x) {
          var J = Ue(b),
              Md = Math.pow(2, b.count - (x + 1));
          J ? d(Md, !1) : (d(Md, !1), d(Md, !0));
        }
        return l;
      }(new Te(a.length));
      return null !== f ? new Cc(d || b, f) : new Cc(d || b);
    }
    function Pe(a) {
      return "number" === typeof a ? "number:" + yd(a) : "string:" + a;
    }
    function Ne(a) {
      if (a.L()) {
        var b = a.J();
        N("string" === typeof b || "number" === typeof b || "object" === typeof b && y(b, ".sv"), "Priority must be a string or number.");
      } else
        N(a === ue || a.e(), "priority of unexpected type.");
      N(a === ue || a.C().e(), "Priority nodes can't have a priority of their own.");
    }
    var G = new de(new Cc(xc), null, Me);
    function Ve() {
      de.call(this, new Cc(xc), G, Me);
    }
    ka(Ve, de);
    h = Ve.prototype;
    h.Ec = function(a) {
      return a === this ? 0 : 1;
    };
    h.ea = function(a) {
      return a === this;
    };
    h.C = function() {
      return this;
    };
    h.T = function() {
      return G;
    };
    h.e = function() {
      return !1;
    };
    var ue = new Ve,
        se = new K("[MIN_NAME]", G),
        ye = new K("[MAX_NAME]", ue);
    function he(a, b) {
      this.Q = a;
      this.Yd = b;
    }
    function ee(a, b, c, d) {
      return new he(new Vb(b, c, d), a.Yd);
    }
    function ie(a) {
      return a.Q.ga ? a.Q.j() : null;
    }
    he.prototype.w = function() {
      return this.Yd;
    };
    function Wb(a) {
      return a.Yd.ga ? a.Yd.j() : null;
    }
    ;
    function We(a, b) {
      this.Y = a;
      var c = a.n,
          d = new Jd(c.g),
          c = Fe(c) ? new Jd(c.g) : c.la ? new Qd(c) : new Kd(c);
      this.Lf = new Xd(c);
      var e = b.w(),
          f = b.Q,
          g = d.ya(G, e.j(), null),
          k = c.ya(G, f.j(), null);
      this.Na = new he(new Vb(k, f.ga, c.Qa()), new Vb(g, e.ga, d.Qa()));
      this.Za = [];
      this.ug = new Dd(a);
    }
    function Xe(a) {
      return a.Y;
    }
    h = We.prototype;
    h.w = function() {
      return this.Na.w().j();
    };
    h.ib = function(a) {
      var b = Wb(this.Na);
      return b && (Fe(this.Y.n) || !a.e() && !b.T(I(a)).e()) ? b.S(a) : null;
    };
    h.e = function() {
      return 0 === this.Za.length;
    };
    h.Rb = function(a) {
      this.Za.push(a);
    };
    h.lb = function(a, b) {
      var c = [];
      if (b) {
        N(null == a, "A cancel should cancel all event registrations.");
        var d = this.Y.path;
        Na(this.Za, function(a) {
          (a = a.hf(b, d)) && c.push(a);
        });
      }
      if (a) {
        for (var e = [],
            f = 0; f < this.Za.length; ++f) {
          var g = this.Za[f];
          if (!g.matches(a))
            e.push(g);
          else if (a.uf()) {
            e = e.concat(this.Za.slice(f + 1));
            break;
          }
        }
        this.Za = e;
      } else
        this.Za = [];
      return c;
    };
    h.fb = function(a, b, c) {
      a.type === $d && null !== a.source.Jb && (N(Wb(this.Na), "We should always have a full cache before handling merges"), N(ie(this.Na), "Missing event cache, even though we have a server cache"));
      var d = this.Na;
      a = this.Lf.fb(d, a, b, c);
      b = this.Lf;
      c = a.ie;
      N(c.Q.j().Kc(b.X.g), "Event snap not indexed");
      N(c.w().j().Kc(b.X.g), "Server snap not indexed");
      N(jc(a.ie.w()) || !jc(d.w()), "Once a server snap is complete, it should never go back");
      this.Na = a.ie;
      return Ye(this, a.ng, a.ie.Q.j(), null);
    };
    function Ze(a, b) {
      var c = a.Na.Q,
          d = [];
      c.j().L() || c.j().R(Q, function(a, b) {
        d.push(new H("child_added", b, a));
      });
      c.ga && d.push(fc(c.j()));
      return Ye(a, d, c.j(), b);
    }
    function Ye(a, b, c, d) {
      return Ed(a.ug, b, c, d ? [d] : a.Za);
    }
    ;
    function $e(a, b, c) {
      this.type = $d;
      this.source = a;
      this.path = b;
      this.children = c;
    }
    $e.prototype.Yc = function(a) {
      if (this.path.e())
        return a = this.children.subtree(new O(a)), a.e() ? null : a.value ? new yc(this.source, L, a.value) : new $e(this.source, L, a);
      N(I(this.path) === a, "Can't get a merge for a child not on the path of the operation");
      return new $e(this.source, M(this.path), this.children);
    };
    $e.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
    };
    function af(a, b) {
      this.f = nd("p:rest:");
      this.G = a;
      this.Ib = b;
      this.Ca = null;
      this.ba = {};
    }
    function bf(a, b) {
      if (p(b))
        return "tag$" + b;
      N(Ge(a.n), "should have a tag if it's not a default query.");
      return a.path.toString();
    }
    h = af.prototype;
    h.zf = function(a, b, c, d) {
      var e = a.path.toString();
      this.f("Listen called for " + e + " " + a.wa());
      var f = bf(a, c),
          g = {};
      this.ba[f] = g;
      a = He(a.n);
      var k = this;
      cf(this, e + ".json", a, function(a, b) {
        var r = b;
        404 === a && (a = r = null);
        null === a && k.Ib(e, r, !1, c);
        z(k.ba, f) === g && d(a ? 401 == a ? "permission_denied" : "rest_error:" + a : "ok", null);
      });
    };
    h.Zf = function(a, b) {
      var c = bf(a, b);
      delete this.ba[c];
    };
    h.O = function(a, b) {
      this.Ca = a;
      var c = Ad(a),
          d = c.data,
          c = c.Dc && c.Dc.exp;
      b && b("ok", {
        auth: d,
        expires: c
      });
    };
    h.ge = function(a) {
      this.Ca = null;
      a("ok", null);
    };
    h.Ne = function() {};
    h.Ff = function() {};
    h.Kd = function() {};
    h.put = function() {};
    h.Af = function() {};
    h.Ve = function() {};
    function cf(a, b, c, d) {
      c = c || {};
      c.format = "export";
      a.Ca && (c.auth = a.Ca);
      var e = (a.G.mb ? "https://" : "http://") + a.G.host + b + "?" + Gb(c);
      a.f("Sending REST request for " + e);
      var f = new XMLHttpRequest;
      f.onreadystatechange = function() {
        if (d && 4 === f.readyState) {
          a.f("REST Response for " + e + " received. status:", f.status, "response:", f.responseText);
          var b = null;
          if (200 <= f.status && 300 > f.status) {
            try {
              b = Pb(f.responseText);
            } catch (c) {
              R("Failed to parse JSON response for " + e + ": " + f.responseText);
            }
            d(null, b);
          } else
            401 !== f.status && 404 !== f.status && R("Got unsuccessful REST response for " + e + " Status: " + f.status), d(f.status);
          d = null;
        }
      };
      f.open("GET", e, !0);
      f.send();
    }
    ;
    function df(a) {
      N(da(a) && 0 < a.length, "Requires a non-empty array");
      this.eg = a;
      this.Pc = {};
    }
    df.prototype.fe = function(a, b) {
      var c;
      c = this.Pc[a] || [];
      var d = c.length;
      if (0 < d) {
        for (var e = Array(d),
            f = 0; f < d; f++)
          e[f] = c[f];
        c = e;
      } else
        c = [];
      for (d = 0; d < c.length; d++)
        c[d].Cc.apply(c[d].Pa, Array.prototype.slice.call(arguments, 1));
    };
    df.prototype.Gb = function(a, b, c) {
      ef(this, a);
      this.Pc[a] = this.Pc[a] || [];
      this.Pc[a].push({
        Cc: b,
        Pa: c
      });
      (a = this.Ae(a)) && b.apply(c, a);
    };
    df.prototype.kc = function(a, b, c) {
      ef(this, a);
      a = this.Pc[a] || [];
      for (var d = 0; d < a.length; d++)
        if (a[d].Cc === b && (!c || c === a[d].Pa)) {
          a.splice(d, 1);
          break;
        }
    };
    function ef(a, b) {
      N(Sa(a.eg, function(a) {
        return a === b;
      }), "Unknown event: " + b);
    }
    ;
    var ff = function() {
      var a = 0,
          b = [];
      return function(c) {
        var d = c === a;
        a = c;
        for (var e = Array(8),
            f = 7; 0 <= f; f--)
          e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
        N(0 === c, "Cannot push at time == 0");
        c = e.join("");
        if (d) {
          for (f = 11; 0 <= f && 63 === b[f]; f--)
            b[f] = 0;
          b[f]++;
        } else
          for (f = 0; 12 > f; f++)
            b[f] = Math.floor(64 * Math.random());
        for (f = 0; 12 > f; f++)
          c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        N(20 === c.length, "nextPushId: Length should be 20.");
        return c;
      };
    }();
    function gf() {
      df.call(this, ["online"]);
      this.mc = !0;
      if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
        var a = this;
        window.addEventListener("online", function() {
          a.mc || (a.mc = !0, a.fe("online", !0));
        }, !1);
        window.addEventListener("offline", function() {
          a.mc && (a.mc = !1, a.fe("online", !1));
        }, !1);
      }
    }
    ka(gf, df);
    gf.prototype.Ae = function(a) {
      N("online" === a, "Unknown event type: " + a);
      return [this.mc];
    };
    ba(gf);
    function hf() {
      df.call(this, ["visible"]);
      var a,
          b;
      "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
      this.Qb = !0;
      if (b) {
        var c = this;
        document.addEventListener(b, function() {
          var b = !document[a];
          b !== c.Qb && (c.Qb = b, c.fe("visible", b));
        }, !1);
      }
    }
    ka(hf, df);
    hf.prototype.Ae = function(a) {
      N("visible" === a, "Unknown event type: " + a);
      return [this.Qb];
    };
    ba(hf);
    function O(a, b) {
      if (1 == arguments.length) {
        this.u = a.split("/");
        for (var c = 0,
            d = 0; d < this.u.length; d++)
          0 < this.u[d].length && (this.u[c] = this.u[d], c++);
        this.u.length = c;
        this.aa = 0;
      } else
        this.u = a, this.aa = b;
    }
    function jf(a, b) {
      var c = I(a);
      if (null === c)
        return b;
      if (c === I(b))
        return jf(M(a), M(b));
      throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
    }
    function kf(a, b) {
      for (var c = a.slice(),
          d = b.slice(),
          e = 0; e < c.length && e < d.length; e++) {
        var f = wc(c[e], d[e]);
        if (0 !== f)
          return f;
      }
      return c.length === d.length ? 0 : c.length < d.length ? -1 : 1;
    }
    function I(a) {
      return a.aa >= a.u.length ? null : a.u[a.aa];
    }
    function je(a) {
      return a.u.length - a.aa;
    }
    function M(a) {
      var b = a.aa;
      b < a.u.length && b++;
      return new O(a.u, b);
    }
    function ke(a) {
      return a.aa < a.u.length ? a.u[a.u.length - 1] : null;
    }
    h = O.prototype;
    h.toString = function() {
      for (var a = "",
          b = this.aa; b < this.u.length; b++)
        "" !== this.u[b] && (a += "/" + this.u[b]);
      return a || "/";
    };
    h.slice = function(a) {
      return this.u.slice(this.aa + (a || 0));
    };
    h.parent = function() {
      if (this.aa >= this.u.length)
        return null;
      for (var a = [],
          b = this.aa; b < this.u.length - 1; b++)
        a.push(this.u[b]);
      return new O(a, 0);
    };
    h.o = function(a) {
      for (var b = [],
          c = this.aa; c < this.u.length; c++)
        b.push(this.u[c]);
      if (a instanceof O)
        for (c = a.aa; c < a.u.length; c++)
          b.push(a.u[c]);
      else
        for (a = a.split("/"), c = 0; c < a.length; c++)
          0 < a[c].length && b.push(a[c]);
      return new O(b, 0);
    };
    h.e = function() {
      return this.aa >= this.u.length;
    };
    h.ea = function(a) {
      if (je(this) !== je(a))
        return !1;
      for (var b = this.aa,
          c = a.aa; b <= this.u.length; b++, c++)
        if (this.u[b] !== a.u[c])
          return !1;
      return !0;
    };
    h.contains = function(a) {
      var b = this.aa,
          c = a.aa;
      if (je(this) > je(a))
        return !1;
      for (; b < this.u.length; ) {
        if (this.u[b] !== a.u[c])
          return !1;
        ++b;
        ++c;
      }
      return !0;
    };
    var L = new O("");
    function lf(a, b) {
      this.Ta = a.slice();
      this.Ja = Math.max(1, this.Ta.length);
      this.mf = b;
      for (var c = 0; c < this.Ta.length; c++)
        this.Ja += Nb(this.Ta[c]);
      mf(this);
    }
    lf.prototype.push = function(a) {
      0 < this.Ta.length && (this.Ja += 1);
      this.Ta.push(a);
      this.Ja += Nb(a);
      mf(this);
    };
    lf.prototype.pop = function() {
      var a = this.Ta.pop();
      this.Ja -= Nb(a);
      0 < this.Ta.length && --this.Ja;
    };
    function mf(a) {
      if (768 < a.Ja)
        throw Error(a.mf + "has a key path longer than 768 bytes (" + a.Ja + ").");
      if (32 < a.Ta.length)
        throw Error(a.mf + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + nf(a));
    }
    function nf(a) {
      return 0 == a.Ta.length ? "" : "in property '" + a.Ta.join(".") + "'";
    }
    ;
    function of(a, b) {
      this.value = a;
      this.children = b || pf;
    }
    var pf = new Cc(function(a, b) {
      return a === b ? 0 : a < b ? -1 : 1;
    });
    function qf(a) {
      var b = oe;
      v(a, function(a, d) {
        b = b.set(new O(d), a);
      });
      return b;
    }
    h = of.prototype;
    h.e = function() {
      return null === this.value && this.children.e();
    };
    function rf(a, b, c) {
      if (null != a.value && c(a.value))
        return {
          path: L,
          value: a.value
        };
      if (b.e())
        return null;
      var d = I(b);
      a = a.children.get(d);
      return null !== a ? (b = rf(a, M(b), c), null != b ? {
        path: (new O(d)).o(b.path),
        value: b.value
      } : null) : null;
    }
    function sf(a, b) {
      return rf(a, b, function() {
        return !0;
      });
    }
    h.subtree = function(a) {
      if (a.e())
        return this;
      var b = this.children.get(I(a));
      return null !== b ? b.subtree(M(a)) : oe;
    };
    h.set = function(a, b) {
      if (a.e())
        return new of(b, this.children);
      var c = I(a),
          d = (this.children.get(c) || oe).set(M(a), b),
          c = this.children.Ra(c, d);
      return new of(this.value, c);
    };
    h.remove = function(a) {
      if (a.e())
        return this.children.e() ? oe : new of(null, this.children);
      var b = I(a),
          c = this.children.get(b);
      return c ? (a = c.remove(M(a)), b = a.e() ? this.children.remove(b) : this.children.Ra(b, a), null === this.value && b.e() ? oe : new of(this.value, b)) : this;
    };
    h.get = function(a) {
      if (a.e())
        return this.value;
      var b = this.children.get(I(a));
      return b ? b.get(M(a)) : null;
    };
    function ne(a, b, c) {
      if (b.e())
        return c;
      var d = I(b);
      b = ne(a.children.get(d) || oe, M(b), c);
      d = b.e() ? a.children.remove(d) : a.children.Ra(d, b);
      return new of(a.value, d);
    }
    function tf(a, b) {
      return uf(a, L, b);
    }
    function uf(a, b, c) {
      var d = {};
      a.children.ka(function(a, f) {
        d[a] = uf(f, b.o(a), c);
      });
      return c(b, a.value, d);
    }
    function vf(a, b, c) {
      return wf(a, b, L, c);
    }
    function wf(a, b, c, d) {
      var e = a.value ? d(c, a.value) : !1;
      if (e)
        return e;
      if (b.e())
        return null;
      e = I(b);
      return (a = a.children.get(e)) ? wf(a, M(b), c.o(e), d) : null;
    }
    function xf(a, b, c) {
      yf(a, b, L, c);
    }
    function yf(a, b, c, d) {
      if (b.e())
        return a;
      a.value && d(c, a.value);
      var e = I(b);
      return (a = a.children.get(e)) ? yf(a, M(b), c.o(e), d) : oe;
    }
    function le(a, b) {
      zf(a, L, b);
    }
    function zf(a, b, c) {
      a.children.ka(function(a, e) {
        zf(e, b.o(a), c);
      });
      a.value && c(b, a.value);
    }
    function Af(a, b) {
      a.children.ka(function(a, d) {
        d.value && b(a, d.value);
      });
    }
    var oe = new of(null);
    of.prototype.toString = function() {
      var a = {};
      le(this, function(b, c) {
        a[b.toString()] = c.toString();
      });
      return F(a);
    };
    function Bf(a, b, c) {
      this.type = ce;
      this.source = Cf;
      this.path = a;
      this.Sb = b;
      this.Wd = c;
    }
    Bf.prototype.Yc = function(a) {
      if (this.path.e()) {
        if (null != this.Sb.value)
          return N(this.Sb.children.e(), "affectedTree should not have overlapping affected paths."), this;
        a = this.Sb.subtree(new O(a));
        return new Bf(L, a, this.Wd);
      }
      N(I(this.path) === a, "operationForChild called for unrelated child.");
      return new Bf(M(this.path), this.Sb, this.Wd);
    };
    Bf.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.Wd + " affectedTree=" + this.Sb + ")";
    };
    var zc = 0,
        $d = 1,
        ce = 2,
        Bc = 3;
    function Df(a, b, c, d) {
      this.we = a;
      this.qf = b;
      this.Jb = c;
      this.bf = d;
      N(!d || b, "Tagged queries must be from server.");
    }
    var Cf = new Df(!0, !1, null, !1),
        Ef = new Df(!1, !0, null, !1);
    Df.prototype.toString = function() {
      return this.we ? "user" : this.bf ? "server(queryID=" + this.Jb + ")" : "server";
    };
    function Ff(a) {
      this.Z = a;
    }
    var Gf = new Ff(new of(null));
    function Hf(a, b, c) {
      if (b.e())
        return new Ff(new of(c));
      var d = sf(a.Z, b);
      if (null != d) {
        var e = d.path,
            d = d.value;
        b = jf(e, b);
        d = d.H(b, c);
        return new Ff(a.Z.set(e, d));
      }
      a = ne(a.Z, b, new of(c));
      return new Ff(a);
    }
    function If(a, b, c) {
      var d = a;
      Db(c, function(a, c) {
        d = Hf(d, b.o(a), c);
      });
      return d;
    }
    Ff.prototype.Sd = function(a) {
      if (a.e())
        return Gf;
      a = ne(this.Z, a, oe);
      return new Ff(a);
    };
    function Jf(a, b) {
      var c = sf(a.Z, b);
      return null != c ? a.Z.get(c.path).S(jf(c.path, b)) : null;
    }
    function Kf(a) {
      var b = [],
          c = a.Z.value;
      null != c ? c.L() || c.R(Q, function(a, c) {
        b.push(new K(a, c));
      }) : a.Z.children.ka(function(a, c) {
        null != c.value && b.push(new K(a, c.value));
      });
      return b;
    }
    function Lf(a, b) {
      if (b.e())
        return a;
      var c = Jf(a, b);
      return null != c ? new Ff(new of(c)) : new Ff(a.Z.subtree(b));
    }
    Ff.prototype.e = function() {
      return this.Z.e();
    };
    Ff.prototype.apply = function(a) {
      return Mf(L, this.Z, a);
    };
    function Mf(a, b, c) {
      if (null != b.value)
        return c.H(a, b.value);
      var d = null;
      b.children.ka(function(b, f) {
        ".priority" === b ? (N(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = Mf(a.o(b), f, c);
      });
      c.S(a).e() || null === d || (c = c.H(a.o(".priority"), d));
      return c;
    }
    ;
    function Nf() {
      this.V = Gf;
      this.pa = [];
      this.Nc = -1;
    }
    function Of(a, b) {
      for (var c = 0; c < a.pa.length; c++) {
        var d = a.pa[c];
        if (d.jd === b)
          return d;
      }
      return null;
    }
    h = Nf.prototype;
    h.Sd = function(a) {
      var b = Ta(this.pa, function(b) {
        return b.jd === a;
      });
      N(0 <= b, "removeWrite called with nonexistent writeId.");
      var c = this.pa[b];
      this.pa.splice(b, 1);
      for (var d = c.visible,
          e = !1,
          f = this.pa.length - 1; d && 0 <= f; ) {
        var g = this.pa[f];
        g.visible && (f >= b && Pf(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
        f--;
      }
      if (d) {
        if (e)
          this.V = Qf(this.pa, Rf, L), this.Nc = 0 < this.pa.length ? this.pa[this.pa.length - 1].jd : -1;
        else if (c.Ia)
          this.V = this.V.Sd(c.path);
        else {
          var k = this;
          v(c.children, function(a, b) {
            k.V = k.V.Sd(c.path.o(b));
          });
        }
        return !0;
      }
      return !1;
    };
    h.Aa = function(a, b, c, d) {
      if (c || d) {
        var e = Lf(this.V, a);
        return !d && e.e() ? b : d || null != b || null != Jf(e, L) ? (e = Qf(this.pa, function(b) {
          return (b.visible || d) && (!c || !(0 <= Ma(c, b.jd))) && (b.path.contains(a) || a.contains(b.path));
        }, a), b = b || G, e.apply(b)) : null;
      }
      e = Jf(this.V, a);
      if (null != e)
        return e;
      e = Lf(this.V, a);
      return e.e() ? b : null != b || null != Jf(e, L) ? (b = b || G, e.apply(b)) : null;
    };
    h.Bc = function(a, b) {
      var c = G,
          d = Jf(this.V, a);
      if (d)
        d.L() || d.R(Q, function(a, b) {
          c = c.W(a, b);
        });
      else if (b) {
        var e = Lf(this.V, a);
        b.R(Q, function(a, b) {
          var d = Lf(e, new O(a)).apply(b);
          c = c.W(a, d);
        });
        Na(Kf(e), function(a) {
          c = c.W(a.name, a.U);
        });
      } else
        e = Lf(this.V, a), Na(Kf(e), function(a) {
          c = c.W(a.name, a.U);
        });
      return c;
    };
    h.kd = function(a, b, c, d) {
      N(c || d, "Either existingEventSnap or existingServerSnap must exist");
      a = a.o(b);
      if (null != Jf(this.V, a))
        return null;
      a = Lf(this.V, a);
      return a.e() ? d.S(b) : a.apply(d.S(b));
    };
    h.Ac = function(a, b, c) {
      a = a.o(b);
      var d = Jf(this.V, a);
      return null != d ? d : Ub(c, b) ? Lf(this.V, a).apply(c.j().T(b)) : null;
    };
    h.wc = function(a) {
      return Jf(this.V, a);
    };
    h.me = function(a, b, c, d, e, f) {
      var g;
      a = Lf(this.V, a);
      g = Jf(a, L);
      if (null == g)
        if (null != b)
          g = a.apply(b);
        else
          return [];
      g = g.nb(f);
      if (g.e() || g.L())
        return [];
      b = [];
      a = Td(f);
      e = e ? g.cc(c, f) : g.ac(c, f);
      for (f = Gc(e); f && b.length < d; )
        0 !== a(f, c) && b.push(f), f = Gc(e);
      return b;
    };
    function Pf(a, b) {
      return a.Ia ? a.path.contains(b) : !!ta(a.children, function(c, d) {
        return a.path.o(d).contains(b);
      });
    }
    function Rf(a) {
      return a.visible;
    }
    function Qf(a, b, c) {
      for (var d = Gf,
          e = 0; e < a.length; ++e) {
        var f = a[e];
        if (b(f)) {
          var g = f.path;
          if (f.Ia)
            c.contains(g) ? (g = jf(c, g), d = Hf(d, g, f.Ia)) : g.contains(c) && (g = jf(g, c), d = Hf(d, L, f.Ia.S(g)));
          else if (f.children)
            if (c.contains(g))
              g = jf(c, g), d = If(d, g, f.children);
            else {
              if (g.contains(c))
                if (g = jf(g, c), g.e())
                  d = If(d, L, f.children);
                else if (f = z(f.children, I(g)))
                  f = f.S(M(g)), d = Hf(d, L, f);
            }
          else
            throw hd("WriteRecord should have .snap or .children");
        }
      }
      return d;
    }
    function Sf(a, b) {
      this.Ob = a;
      this.Z = b;
    }
    h = Sf.prototype;
    h.Aa = function(a, b, c) {
      return this.Z.Aa(this.Ob, a, b, c);
    };
    h.Bc = function(a) {
      return this.Z.Bc(this.Ob, a);
    };
    h.kd = function(a, b, c) {
      return this.Z.kd(this.Ob, a, b, c);
    };
    h.wc = function(a) {
      return this.Z.wc(this.Ob.o(a));
    };
    h.me = function(a, b, c, d, e) {
      return this.Z.me(this.Ob, a, b, c, d, e);
    };
    h.Ac = function(a, b) {
      return this.Z.Ac(this.Ob, a, b);
    };
    h.o = function(a) {
      return new Sf(this.Ob.o(a), this.Z);
    };
    function Tf() {
      this.children = {};
      this.md = 0;
      this.value = null;
    }
    function Uf(a, b, c) {
      this.Hd = a ? a : "";
      this.Ga = b ? b : null;
      this.A = c ? c : new Tf;
    }
    function Vf(a, b) {
      for (var c = b instanceof O ? b : new O(b),
          d = a,
          e; null !== (e = I(c)); )
        d = new Uf(e, d, z(d.A.children, e) || new Tf), c = M(c);
      return d;
    }
    h = Uf.prototype;
    h.Ea = function() {
      return this.A.value;
    };
    function Wf(a, b) {
      N("undefined" !== typeof b, "Cannot set value to undefined");
      a.A.value = b;
      Xf(a);
    }
    h.clear = function() {
      this.A.value = null;
      this.A.children = {};
      this.A.md = 0;
      Xf(this);
    };
    h.wd = function() {
      return 0 < this.A.md;
    };
    h.e = function() {
      return null === this.Ea() && !this.wd();
    };
    h.R = function(a) {
      var b = this;
      v(this.A.children, function(c, d) {
        a(new Uf(d, b, c));
      });
    };
    function Yf(a, b, c, d) {
      c && !d && b(a);
      a.R(function(a) {
        Yf(a, b, !0, d);
      });
      c && d && b(a);
    }
    function Zf(a, b) {
      for (var c = a.parent(); null !== c && !b(c); )
        c = c.parent();
    }
    h.path = function() {
      return new O(null === this.Ga ? this.Hd : this.Ga.path() + "/" + this.Hd);
    };
    h.name = function() {
      return this.Hd;
    };
    h.parent = function() {
      return this.Ga;
    };
    function Xf(a) {
      if (null !== a.Ga) {
        var b = a.Ga,
            c = a.Hd,
            d = a.e(),
            e = y(b.A.children, c);
        d && e ? (delete b.A.children[c], b.A.md--, Xf(b)) : d || e || (b.A.children[c] = a.A, b.A.md++, Xf(b));
      }
    }
    ;
    var $f = /[\[\].#$\/\u0000-\u001F\u007F]/,
        ag = /[\[\].#$\u0000-\u001F\u007F]/,
        bg = /^[a-zA-Z][a-zA-Z._\-+]+$/;
    function cg(a) {
      return q(a) && 0 !== a.length && !$f.test(a);
    }
    function dg(a) {
      return null === a || q(a) || fa(a) && !rd(a) || ga(a) && y(a, ".sv");
    }
    function eg(a, b, c, d) {
      d && !p(b) || fg(D(a, 1, d), b, c);
    }
    function fg(a, b, c) {
      c instanceof O && (c = new lf(c, a));
      if (!p(b))
        throw Error(a + "contains undefined " + nf(c));
      if (t(b))
        throw Error(a + "contains a function " + nf(c) + " with contents: " + b.toString());
      if (rd(b))
        throw Error(a + "contains " + b.toString() + " " + nf(c));
      if (q(b) && b.length > 10485760 / 3 && 10485760 < Nb(b))
        throw Error(a + "contains a string greater than 10485760 utf8 bytes " + nf(c) + " ('" + b.substring(0, 50) + "...')");
      if (ga(b)) {
        var d = !1,
            e = !1;
        Db(b, function(b, g) {
          if (".value" === b)
            d = !0;
          else if (".priority" !== b && ".sv" !== b && (e = !0, !cg(b)))
            throw Error(a + " contains an invalid key (" + b + ") " + nf(c) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
          c.push(b);
          fg(a, g, c);
          c.pop();
        });
        if (d && e)
          throw Error(a + ' contains ".value" child ' + nf(c) + " in addition to actual children.");
      }
    }
    function gg(a, b) {
      var c,
          d;
      for (c = 0; c < b.length; c++) {
        d = b[c];
        for (var e = d.slice(),
            f = 0; f < e.length; f++)
          if ((".priority" !== e[f] || f !== e.length - 1) && !cg(e[f]))
            throw Error(a + "contains an invalid key (" + e[f] + ") in path " + d.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
      }
      b.sort(kf);
      e = null;
      for (c = 0; c < b.length; c++) {
        d = b[c];
        if (null !== e && e.contains(d))
          throw Error(a + "contains a path " + e.toString() + " that is ancestor of another path " + d.toString());
        e = d;
      }
    }
    function hg(a, b, c) {
      var d = D(a, 1, !1);
      if (!ga(b) || da(b))
        throw Error(d + " must be an object containing the children to replace.");
      var e = [];
      Db(b, function(a, b) {
        var k = new O(a);
        fg(d, b, c.o(k));
        if (".priority" === ke(k) && !dg(b))
          throw Error(d + "contains an invalid value for '" + k.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
        e.push(k);
      });
      gg(d, e);
    }
    function ig(a, b, c) {
      if (rd(c))
        throw Error(D(a, b, !1) + "is " + c.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
      if (!dg(c))
        throw Error(D(a, b, !1) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
    }
    function jg(a, b, c) {
      if (!c || p(b))
        switch (b) {
          case "value":
          case "child_added":
          case "child_removed":
          case "child_changed":
          case "child_moved":
            break;
          default:
            throw Error(D(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
        }
    }
    function kg(a, b) {
      if (p(b) && !cg(b))
        throw Error(D(a, 2, !0) + 'was an invalid key: "' + b + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    }
    function lg(a, b) {
      if (!q(b) || 0 === b.length || ag.test(b))
        throw Error(D(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    }
    function mg(a, b) {
      if (".info" === I(b))
        throw Error(a + " failed: Can't modify data under /.info/");
    }
    function ng(a, b) {
      if (!q(b))
        throw Error(D(a, 1, !1) + "must be a valid credential (a string).");
    }
    function og(a, b, c) {
      if (!q(c))
        throw Error(D(a, b, !1) + "must be a valid string.");
    }
    function pg(a, b) {
      og(a, 1, b);
      if (!bg.test(b))
        throw Error(D(a, 1, !1) + "'" + b + "' is not a valid authentication provider.");
    }
    function qg(a, b, c, d) {
      if (!d || p(c))
        if (!ga(c) || null === c)
          throw Error(D(a, b, d) + "must be a valid object.");
    }
    function rg(a, b, c) {
      if (!ga(b) || !y(b, c))
        throw Error(D(a, 1, !1) + 'must contain the key "' + c + '"');
      if (!q(z(b, c)))
        throw Error(D(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
    }
    ;
    function sg() {
      this.set = {};
    }
    h = sg.prototype;
    h.add = function(a, b) {
      this.set[a] = null !== b ? b : !0;
    };
    h.contains = function(a) {
      return y(this.set, a);
    };
    h.get = function(a) {
      return this.contains(a) ? this.set[a] : void 0;
    };
    h.remove = function(a) {
      delete this.set[a];
    };
    h.clear = function() {
      this.set = {};
    };
    h.e = function() {
      return va(this.set);
    };
    h.count = function() {
      return oa(this.set);
    };
    function tg(a, b) {
      v(a.set, function(a, d) {
        b(d, a);
      });
    }
    h.keys = function() {
      var a = [];
      v(this.set, function(b, c) {
        a.push(c);
      });
      return a;
    };
    function Tc() {
      this.m = this.B = null;
    }
    Tc.prototype.find = function(a) {
      if (null != this.B)
        return this.B.S(a);
      if (a.e() || null == this.m)
        return null;
      var b = I(a);
      a = M(a);
      return this.m.contains(b) ? this.m.get(b).find(a) : null;
    };
    Tc.prototype.qc = function(a, b) {
      if (a.e())
        this.B = b, this.m = null;
      else if (null !== this.B)
        this.B = this.B.H(a, b);
      else {
        null == this.m && (this.m = new sg);
        var c = I(a);
        this.m.contains(c) || this.m.add(c, new Tc);
        c = this.m.get(c);
        a = M(a);
        c.qc(a, b);
      }
    };
    function ug(a, b) {
      if (b.e())
        return a.B = null, a.m = null, !0;
      if (null !== a.B) {
        if (a.B.L())
          return !1;
        var c = a.B;
        a.B = null;
        c.R(Q, function(b, c) {
          a.qc(new O(b), c);
        });
        return ug(a, b);
      }
      return null !== a.m ? (c = I(b), b = M(b), a.m.contains(c) && ug(a.m.get(c), b) && a.m.remove(c), a.m.e() ? (a.m = null, !0) : !1) : !0;
    }
    function Uc(a, b, c) {
      null !== a.B ? c(b, a.B) : a.R(function(a, e) {
        var f = new O(b.toString() + "/" + a);
        Uc(e, f, c);
      });
    }
    Tc.prototype.R = function(a) {
      null !== this.m && tg(this.m, function(b, c) {
        a(b, c);
      });
    };
    var vg = "auth.firebase.com";
    function wg(a, b, c) {
      this.nd = a || {};
      this.ee = b || {};
      this.eb = c || {};
      this.nd.remember || (this.nd.remember = "default");
    }
    var xg = ["remember", "redirectTo"];
    function yg(a) {
      var b = {},
          c = {};
      Db(a || {}, function(a, e) {
        0 <= Ma(xg, a) ? b[a] = e : c[a] = e;
      });
      return new wg(b, {}, c);
    }
    ;
    function zg(a, b) {
      this.Re = ["session", a.Pd, a.jc].join(":");
      this.be = b;
    }
    zg.prototype.set = function(a, b) {
      if (!b)
        if (this.be.length)
          b = this.be[0];
        else
          throw Error("fb.login.SessionManager : No storage options available!");
      b.set(this.Re, a);
    };
    zg.prototype.get = function() {
      var a = Pa(this.be, u(this.Bg, this)),
          a = Oa(a, function(a) {
            return null !== a;
          });
      Va(a, function(a, c) {
        return Bd(c.token) - Bd(a.token);
      });
      return 0 < a.length ? a.shift() : null;
    };
    zg.prototype.Bg = function(a) {
      try {
        var b = a.get(this.Re);
        if (b && b.token)
          return b;
      } catch (c) {}
      return null;
    };
    zg.prototype.clear = function() {
      var a = this;
      Na(this.be, function(b) {
        b.remove(a.Re);
      });
    };
    function Ag() {
      return "undefined" !== typeof navigator && "string" === typeof navigator.userAgent ? navigator.userAgent : "";
    }
    function Bg() {
      var a = Ag();
      if ("" === a)
        return !1;
      if ("Microsoft Internet Explorer" === navigator.appName) {
        if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length)
          return 8 <= parseFloat(a[1]);
      } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length)
        return 8 <= parseFloat(a[1]);
      return !1;
    }
    ;
    function Cg() {
      var a = window.opener.frames,
          b;
      for (b = a.length - 1; 0 <= b; b--)
        try {
          if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name)
            return a[b];
        } catch (c) {}
      return null;
    }
    function Dg(a, b, c) {
      a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1);
    }
    function Eg(a, b, c) {
      a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1);
    }
    function Fg(a) {
      /^https?:\/\//.test(a) || (a = window.location.href);
      var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
      return b ? b[1] : a;
    }
    function Gg(a) {
      var b = "";
      try {
        a = a.replace(/.*\?/, "");
        var c = Hb(a);
        c && y(c, "__firebase_request_key") && (b = z(c, "__firebase_request_key"));
      } catch (d) {}
      return b;
    }
    function Hg() {
      var a = qd(vg);
      return a.scheme + "://" + a.host + "/v2";
    }
    function Ig(a) {
      return Hg() + "/" + a + "/auth/channel";
    }
    ;
    function Jg(a) {
      var b = this;
      this.gb = a;
      this.ce = "*";
      Bg() ? this.Sc = this.zd = Cg() : (this.Sc = window.opener, this.zd = window);
      if (!b.Sc)
        throw "Unable to find relay frame";
      Dg(this.zd, "message", u(this.lc, this));
      Dg(this.zd, "message", u(this.Ef, this));
      try {
        Kg(this, {a: "ready"});
      } catch (c) {
        Dg(this.Sc, "load", function() {
          Kg(b, {a: "ready"});
        });
      }
      Dg(window, "unload", u(this.Lg, this));
    }
    function Kg(a, b) {
      b = F(b);
      Bg() ? a.Sc.doPost(b, a.ce) : a.Sc.postMessage(b, a.ce);
    }
    Jg.prototype.lc = function(a) {
      var b = this,
          c;
      try {
        c = Pb(a.data);
      } catch (d) {}
      c && "request" === c.a && (Eg(window, "message", this.lc), this.ce = a.origin, this.gb && setTimeout(function() {
        b.gb(b.ce, c.d, function(a, c) {
          b.lg = !c;
          b.gb = void 0;
          Kg(b, {
            a: "response",
            d: a,
            forceKeepWindowOpen: c
          });
        });
      }, 0));
    };
    Jg.prototype.Lg = function() {
      try {
        Eg(this.zd, "message", this.Ef);
      } catch (a) {}
      this.gb && (Kg(this, {
        a: "error",
        d: "unknown closed window"
      }), this.gb = void 0);
      try {
        window.close();
      } catch (b) {}
    };
    Jg.prototype.Ef = function(a) {
      if (this.lg && "die" === a.data)
        try {
          window.close();
        } catch (b) {}
    };
    function Lg(a) {
      this.sc = Fa() + Fa() + Fa();
      this.Jf = a;
    }
    Lg.prototype.open = function(a, b) {
      ad.set("redirect_request_id", this.sc);
      ad.set("redirect_request_id", this.sc);
      b.requestId = this.sc;
      b.redirectTo = b.redirectTo || window.location.href;
      a += (/\?/.test(a) ? "" : "?") + Gb(b);
      window.location = a;
    };
    Lg.isAvailable = function() {
      return !1;
    };
    Lg.prototype.Ub = function() {
      return "redirect";
    };
    var Mg = {
      NETWORK_ERROR: "Unable to contact the Firebase server.",
      SERVER_ERROR: "An unknown server error occurred.",
      TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
      REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
      USER_CANCELLED: "The user cancelled authentication."
    };
    function T(a) {
      var b = Error(z(Mg, a), a);
      b.code = a;
      return b;
    }
    ;
    function Ng(a) {
      var b;
      (b = !a.window_features) || (b = Ag(), b = -1 !== b.indexOf("Fennec/") || -1 !== b.indexOf("Firefox/") && -1 !== b.indexOf("Android"));
      b && (a.window_features = void 0);
      a.window_name || (a.window_name = "_blank");
      this.options = a;
    }
    Ng.prototype.open = function(a, b, c) {
      function d(a) {
        g && (document.body.removeChild(g), g = void 0);
        r && (r = clearInterval(r));
        Eg(window, "message", e);
        Eg(window, "unload", d);
        if (l && !a)
          try {
            l.close();
          } catch (b) {
            k.postMessage("die", m);
          }
        l = k = void 0;
      }
      function e(a) {
        if (a.origin === m)
          try {
            var b = Pb(a.data);
            "ready" === b.a ? k.postMessage(x, m) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null));
          } catch (e) {}
      }
      var f = Bg(),
          g,
          k;
      if (!this.options.relay_url)
        return c(Error("invalid arguments: origin of url and relay_url must match"));
      var m = Fg(a);
      if (m !== Fg(this.options.relay_url))
        c && setTimeout(function() {
          c(Error("invalid arguments: origin of url and relay_url must match"));
        }, 0);
      else {
        f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
        a += (/\?/.test(a) ? "" : "?") + Gb(b);
        var l = window.open(a, this.options.window_name, this.options.window_features);
        k || (k = l);
        var r = setInterval(function() {
          l && l.closed && (d(!1), c && (c(T("USER_CANCELLED")), c = null));
        }, 500),
            x = F({
              a: "request",
              d: b
            });
        Dg(window, "unload", d);
        Dg(window, "message", e);
      }
    };
    Ng.isAvailable = function() {
      return !1;
    };
    Ng.prototype.Ub = function() {
      return "popup";
    };
    function Og(a) {
      a.method || (a.method = "GET");
      a.headers || (a.headers = {});
      a.headers.content_type || (a.headers.content_type = "application/json");
      a.headers.content_type = a.headers.content_type.toLowerCase();
      this.options = a;
    }
    Og.prototype.open = function(a, b, c) {
      var d = qd(a),
          e = "http" === d.scheme ? require('http') : require('https');
      a = this.options.method;
      var f,
          g = {Accept: "application/json;text/plain"};
      ya(g, this.options.headers);
      d = {
        host: d.host.split(":")[0],
        port: d.port,
        path: d.oc,
        method: this.options.method.toUpperCase()
      };
      if ("GET" === a)
        d.path += (/\?/.test(d.path) ? "" : "?") + Gb(b), f = null;
      else {
        var k = this.options.headers.content_type;
        "application/json" === k && (f = F(b));
        "application/x-www-form-urlencoded" === k && (f = Gb(b));
        g["Content-Length"] = Buffer.byteLength(f, "utf8");
      }
      d.headers = g;
      b = e.request(d, function(a) {
        var b = "";
        a.setEncoding("utf8");
        a.on("data", function(a) {
          b += a;
        });
        a.on("end", function() {
          try {
            b = Pb(b + "");
          } catch (a) {}
          c && (c(null, b), c = null);
        });
      });
      "GET" !== a && b.write(f);
      b.on("error", function(a) {
        a && a.code && ("ENOTFOUND" === a.code || "ENETDOWN" === a.code) ? c(T("NETWORK_ERROR")) : c(T("SERVER_ERROR"));
        c = null;
      });
      b.end();
    };
    Og.isAvailable = function() {
      return !0;
    };
    Og.prototype.Ub = function() {
      return "json";
    };
    function Pg(a) {
      a.method || (a.method = "GET");
      a.headers || (a.headers = {});
      a.headers.content_type || (a.headers.content_type = "application/json");
      a.headers.content_type = a.headers.content_type.toLowerCase();
      this.options = a;
    }
    Pg.prototype.open = function(a, b, c) {
      function d() {
        c && (c(T("REQUEST_INTERRUPTED")), c = null);
      }
      var e = new XMLHttpRequest,
          f = this.options.method.toUpperCase(),
          g;
      Dg(window, "beforeunload", d);
      e.onreadystatechange = function() {
        if (c && 4 === e.readyState) {
          var a;
          if (200 <= e.status && 300 > e.status) {
            try {
              a = Pb(e.responseText);
            } catch (b) {}
            c(null, a);
          } else
            500 <= e.status && 600 > e.status ? c(T("SERVER_ERROR")) : c(T("NETWORK_ERROR"));
          c = null;
          Eg(window, "beforeunload", d);
        }
      };
      if ("GET" === f)
        a += (/\?/.test(a) ? "" : "?") + Gb(b), g = null;
      else {
        var k = this.options.headers.content_type;
        "application/json" === k && (g = F(b));
        "application/x-www-form-urlencoded" === k && (g = Gb(b));
      }
      e.open(f, a, !0);
      a = {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json;text/plain"
      };
      ya(a, this.options.headers);
      for (var m in a)
        e.setRequestHeader(m, a[m]);
      e.send(g);
    };
    Pg.isAvailable = function() {
      return !1;
    };
    Pg.prototype.Ub = function() {
      return "json";
    };
    function Qg(a) {
      this.sc = Fa() + Fa() + Fa();
      this.Jf = a;
    }
    Qg.prototype.open = function(a, b, c) {
      function d() {
        c && (c(T("USER_CANCELLED")), c = null);
      }
      var e = this,
          f = qd(vg),
          g;
      b.requestId = this.sc;
      b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
      a += /\?/.test(a) ? "" : "?";
      a += Gb(b);
      (g = window.open(a, "_blank", "location=no")) && t(g.addEventListener) ? (g.addEventListener("loadstart", function(a) {
        var b;
        if (b = a && a.url)
          a: {
            try {
              var l = document.createElement("a");
              l.href = a.url;
              b = l.host === f.host && "/blank/page.html" === l.pathname;
              break a;
            } catch (r) {}
            b = !1;
          }
        b && (a = Gg(a.url), g.removeEventListener("exit", d), g.close(), a = new wg(null, null, {
          requestId: e.sc,
          requestKey: a
        }), e.Jf.requestWithCredential("/auth/session", a, c), c = null);
      }), g.addEventListener("exit", d)) : c(T("TRANSPORT_UNAVAILABLE"));
    };
    Qg.isAvailable = function() {
      return !1;
    };
    Qg.prototype.Ub = function() {
      return "redirect";
    };
    function Rg(a) {
      a.callback_parameter || (a.callback_parameter = "callback");
      this.options = a;
      window.__firebase_auth_jsonp = window.__firebase_auth_jsonp || {};
    }
    Rg.prototype.open = function(a, b, c) {
      function d() {
        c && (c(T("REQUEST_INTERRUPTED")), c = null);
      }
      function e() {
        setTimeout(function() {
          window.__firebase_auth_jsonp[f] = void 0;
          va(window.__firebase_auth_jsonp) && (window.__firebase_auth_jsonp = void 0);
          try {
            var a = document.getElementById(f);
            a && a.parentNode.removeChild(a);
          } catch (b) {}
        }, 1);
        Eg(window, "beforeunload", d);
      }
      var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
      b[this.options.callback_parameter] = "__firebase_auth_jsonp." + f;
      a += (/\?/.test(a) ? "" : "?") + Gb(b);
      Dg(window, "beforeunload", d);
      window.__firebase_auth_jsonp[f] = function(a) {
        c && (c(null, a), c = null);
        e();
      };
      Sg(f, a, c);
    };
    function Sg(a, b, c) {
      setTimeout(function() {
        try {
          var d = document.createElement("script");
          d.type = "text/javascript";
          d.id = a;
          d.async = !0;
          d.src = b;
          d.onerror = function() {
            var b = document.getElementById(a);
            null !== b && b.parentNode.removeChild(b);
            c && c(T("NETWORK_ERROR"));
          };
          var e = document.getElementsByTagName("head");
          (e && 0 != e.length ? e[0] : document.documentElement).appendChild(d);
        } catch (f) {
          c && c(T("NETWORK_ERROR"));
        }
      }, 0);
    }
    Rg.isAvailable = function() {
      return "undefined" !== typeof document && null != document.createElement;
    };
    Rg.prototype.Ub = function() {
      return "json";
    };
    function Tg(a, b, c, d) {
      df.call(this, ["auth_status"]);
      this.G = a;
      this.ef = b;
      this.gh = c;
      this.Me = d;
      this.vc = new zg(a, [$c, ad]);
      this.ob = null;
      this.Te = !1;
      Ug(this);
    }
    ka(Tg, df);
    h = Tg.prototype;
    h.xe = function() {
      return this.ob || null;
    };
    function Ug(a) {
      ad.get("redirect_request_id") && Vg(a);
      var b = a.vc.get();
      b && b.token ? (Wg(a, b), a.ef(b.token, function(c, d) {
        Xg(a, c, d, !1, b.token, b);
      }, function(b, d) {
        Yg(a, "resumeSession()", b, d);
      })) : Wg(a, null);
    }
    function Zg(a, b, c, d, e, f) {
      "firebaseio-demo.com" === a.G.domain && R("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");
      a.ef(b, function(f, k) {
        Xg(a, f, k, !0, b, c, d || {}, e);
      }, function(b, c) {
        Yg(a, "auth()", b, c, f);
      });
    }
    function $g(a, b) {
      a.vc.clear();
      Wg(a, null);
      a.gh(function(a, d) {
        if ("ok" === a)
          S(b, null);
        else {
          var e = (a || "error").toUpperCase(),
              f = e;
          d && (f += ": " + d);
          f = Error(f);
          f.code = e;
          S(b, f);
        }
      });
    }
    function Xg(a, b, c, d, e, f, g, k) {
      "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = Cd(e) ? e : "", c = null, b && y(b, "uid") ? c = z(b, "uid") : y(f, "uid") && (c = z(f, "uid")), f.uid = c, c = "custom", b && y(b, "provider") ? c = z(b, "provider") : y(f, "provider") && (c = z(f, "provider")), f.provider = c, a.vc.clear(), Cd(e) && (g = g || {}, c = $c, "sessionOnly" === g.remember && (c = ad), "none" !== g.remember && a.vc.set(f, c)), Wg(a, f)), S(k, null, f)) : (a.vc.clear(), Wg(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f = Error(f), f.code = a, S(k, f));
    }
    function Yg(a, b, c, d, e) {
      R(b + " was canceled: " + d);
      a.vc.clear();
      Wg(a, null);
      a = Error(d);
      a.code = c.toUpperCase();
      S(e, a);
    }
    function ah(a, b, c, d, e) {
      bh(a);
      c = new wg(d || {}, {}, c || {});
      ch(a, [Og], "/auth/" + b, c, e);
    }
    function dh(a, b, c, d) {
      bh(a);
      var e = [Ng, Qg];
      c = yg(c);
      "anonymous" === b || "password" === b ? setTimeout(function() {
        S(d, T("TRANSPORT_UNAVAILABLE"));
      }, 0) : (c.ee.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - 625) : 0), c.ee.relay_url = Ig(a.G.jc), c.ee.requestWithCredential = u(a.tc, a), ch(a, e, "/auth/" + b, c, d));
    }
    function Vg(a) {
      var b = ad.get("redirect_request_id");
      if (b) {
        var c = ad.get("redirect_client_options");
        ad.remove("redirect_request_id");
        ad.remove("redirect_client_options");
        var d = [Pg, Rg],
            b = {
              requestId: b,
              requestKey: Gg(document.location.hash)
            },
            c = new wg(c, {}, b);
        a.Te = !0;
        try {
          document.location.hash = document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/, "");
        } catch (e) {}
        ch(a, d, "/auth/session", c, function() {
          this.Te = !1;
        }.bind(a));
      }
    }
    h.re = function(a, b) {
      bh(this);
      var c = yg(a);
      c.eb._method = "POST";
      this.tc("/users", c, function(a, c) {
        a ? S(b, a) : S(b, a, c);
      });
    };
    h.Ue = function(a, b) {
      var c = this;
      bh(this);
      var d = "/users/" + encodeURIComponent(a.email),
          e = yg(a);
      e.eb._method = "DELETE";
      this.tc(d, e, function(a, d) {
        !a && d && d.uid && c.ob && c.ob.uid && c.ob.uid === d.uid && $g(c);
        S(b, a);
      });
    };
    h.oe = function(a, b) {
      bh(this);
      var c = "/users/" + encodeURIComponent(a.email) + "/password",
          d = yg(a);
      d.eb._method = "PUT";
      d.eb.password = a.newPassword;
      this.tc(c, d, function(a) {
        S(b, a);
      });
    };
    h.ne = function(a, b) {
      bh(this);
      var c = "/users/" + encodeURIComponent(a.oldEmail) + "/email",
          d = yg(a);
      d.eb._method = "PUT";
      d.eb.email = a.newEmail;
      d.eb.password = a.password;
      this.tc(c, d, function(a) {
        S(b, a);
      });
    };
    h.We = function(a, b) {
      bh(this);
      var c = "/users/" + encodeURIComponent(a.email) + "/password",
          d = yg(a);
      d.eb._method = "POST";
      this.tc(c, d, function(a) {
        S(b, a);
      });
    };
    h.tc = function(a, b, c) {
      eh(this, [Og], a, b, c);
    };
    function ch(a, b, c, d, e) {
      eh(a, b, c, d, function(b, c) {
        !b && c && c.token && c.uid ? Zg(a, c.token, c, d.nd, function(a, b) {
          a ? S(e, a) : S(e, null, b);
        }) : S(e, b || T("UNKNOWN_ERROR"));
      });
    }
    function eh(a, b, c, d, e) {
      b = Oa(b, function(a) {
        return "function" === typeof a.isAvailable && a.isAvailable();
      });
      0 === b.length ? setTimeout(function() {
        S(e, T("TRANSPORT_UNAVAILABLE"));
      }, 0) : (b = new (b.shift())(d.ee), d = Eb(d.eb), d.v = "node-" + Cb, d.transport = b.Ub(), d.suppress_status_codes = !0, a = Hg() + "/" + a.G.jc + c, b.open(a, d, function(a, b) {
        if (a)
          S(e, a);
        else if (b && b.error) {
          var c = Error(b.error.message);
          c.code = b.error.code;
          c.details = b.error.details;
          S(e, c);
        } else
          S(e, null, b);
      }));
    }
    function Wg(a, b) {
      var c = null !== a.ob || null !== b;
      a.ob = b;
      c && a.fe("auth_status", b);
      a.Me(null !== b);
    }
    h.Ae = function(a) {
      N("auth_status" === a, 'initial event must be of type "auth_status"');
      return this.Te ? null : [this.ob];
    };
    function bh(a) {
      var b = a.G;
      if ("firebaseio.com" !== b.domain && "firebaseio-demo.com" !== b.domain && "auth.firebase.com" === vg)
        throw Error("This custom Firebase server ('" + a.G.domain + "') does not support delegated login.");
    }
    ;
    var ed = "websocket",
        fd = "long_polling";
    function fh(a) {
      this.lc = a;
      this.Od = [];
      this.Vb = 0;
      this.pe = -1;
      this.Hb = null;
    }
    function gh(a, b, c) {
      a.pe = b;
      a.Hb = c;
      a.pe < a.Vb && (a.Hb(), a.Hb = null);
    }
    function hh(a, b, c) {
      for (a.Od[b] = c; a.Od[a.Vb]; ) {
        var d = a.Od[a.Vb];
        delete a.Od[a.Vb];
        for (var e = 0; e < d.length; ++e)
          if (d[e]) {
            var f = a;
            ec(function() {
              f.lc(d[e]);
            });
          }
        if (a.Vb === a.pe) {
          a.Hb && (clearTimeout(a.Hb), a.Hb(), a.Hb = null);
          break;
        }
        a.Vb++;
      }
    }
    ;
    function ih(a, b, c, d) {
      this.qe = a;
      this.f = nd(a);
      this.pb = this.qb = 0;
      this.Wa = sc(b);
      this.Wf = c;
      this.Ic = !1;
      this.Db = d;
      this.hd = function(a) {
        return dd(b, fd, a);
      };
    }
    var jh,
        kh;
    ih.prototype.open = function(a, b) {
      this.jf = 0;
      this.na = b;
      this.Df = new fh(a);
      this.Bb = !1;
      var c = this;
      this.sb = setTimeout(function() {
        c.f("Timed out trying to connect.");
        c.ab();
        c.sb = null;
      }, Math.floor(3E4));
      sd(function() {
        if (!c.Bb) {
          c.Va = new lh(function(a, b, d, k, m) {
            mh(c, arguments);
            if (c.Va)
              if (c.sb && (clearTimeout(c.sb), c.sb = null), c.Ic = !0, "start" == a)
                c.id = b, c.Sg = d;
              else if ("close" === a)
                b ? (c.Va.Sf = !1, gh(c.Df, b, function() {
                  c.ab();
                })) : c.ab();
              else
                throw Error("Unrecognized command received: " + a);
          }, function(a, b) {
            mh(c, arguments);
            hh(c.Df, a, b);
          }, function() {
            c.ab();
          }, c.hd);
          var a = {start: "t"};
          a.ser = Math.floor(1E8 * Math.random());
          c.Va.hh && (a.cb = c.Va.hh);
          a.v = "5";
          c.Wf && (a.s = c.Wf);
          c.Db && (a.ls = c.Db);
          a = c.hd(a);
          c.f("Connecting via long-poll to " + a);
          nh(c.Va, a, function() {});
        }
      });
    };
    ih.prototype.start = function() {
      var a = this.Va,
          b = this.Sg;
      a.Ke = this.id;
      a.Cf = b;
      for (a.ke = !0; oh(a); )
        ;
    };
    ih.isAvailable = function() {
      return jh || !kh && "undefined" !== typeof document && null != document.createElement && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" === typeof Windows && "object" === typeof Windows.jh) && !1;
    };
    h = ih.prototype;
    h.Ed = function() {};
    h.cd = function() {
      this.Bb = !0;
      this.Va && (this.Va.close(), this.Va = null);
      this.Bf && (document.body.removeChild(this.Bf), this.Bf = null);
      this.sb && (clearTimeout(this.sb), this.sb = null);
    };
    h.ab = function() {
      this.Bb || (this.f("Longpoll is closing itself"), this.cd(), this.na && (this.na(this.Ic), this.na = null));
    };
    h.close = function() {
      this.Bb || (this.f("Longpoll is being closed."), this.cd());
    };
    h.send = function(a) {
      a = F(a);
      this.qb += a.length;
      pc(this.Wa, "bytes_sent", a.length);
      a = Mb(a);
      a = mb(a, !0);
      a = wd(a, 1840);
      for (var b = 0; b < a.length; b++) {
        var c = this.Va;
        c.$c.push({
          Xg: this.jf,
          fh: a.length,
          lf: a[b]
        });
        c.ke && oh(c);
        this.jf++;
      }
    };
    function mh(a, b) {
      var c = F(b).length;
      a.pb += c;
      pc(a.Wa, "bytes_received", c);
    }
    function lh(a, b, c, d) {
      this.hd = d;
      this.jb = c;
      this.Qe = new sg;
      this.$c = [];
      this.se = Math.floor(1E8 * Math.random());
      this.Sf = !0;
      this.pg = a;
      this.Jg = b;
    }
    lh.prototype.close = function() {
      this.ke = !1;
      if (this.Gd) {
        this.Gd.lh.body.innerHTML = "";
        var a = this;
        setTimeout(function() {
          null !== a.Gd && (document.body.removeChild(a.Gd), a.Gd = null);
        }, Math.floor(0));
      }
      if (this.Ke) {
        var b = {disconn: "t"};
        b.id = this.Ke;
        b.pw = this.Cf;
        b = this.hd(b);
        ph(b);
      }
      if (b = this.jb)
        this.jb = null, b();
    };
    function oh(a) {
      if (a.ke && a.Sf && a.Qe.count() < (0 < a.$c.length ? 2 : 1)) {
        a.se++;
        var b = {};
        b.id = a.Ke;
        b.pw = a.Cf;
        b.ser = a.se;
        for (var b = a.hd(b),
            c = "",
            d = 0; 0 < a.$c.length; )
          if (1870 >= a.$c[0].lf.length + 30 + c.length) {
            var e = a.$c.shift(),
                c = c + "&seg" + d + "=" + e.Xg + "&ts" + d + "=" + e.fh + "&d" + d + "=" + e.lf;
            d++;
          } else
            break;
        qh(a, b + c, a.se);
        return !0;
      }
      return !1;
    }
    function qh(a, b, c) {
      function d() {
        a.Qe.remove(c);
        oh(a);
      }
      a.Qe.add(c, 1);
      var e = setTimeout(d, Math.floor(25E3));
      nh(a, b, function() {
        clearTimeout(e);
        d();
      });
    }
    function nh(a, b, c) {
      rh(a, b, c);
    }
    var sh = null;
    function ph(a, b) {
      sh || (sh = require('request'));
      sh(a, function(c, d, e) {
        if (c)
          throw "Rest request for " + a.url + " failed.";
        b && b(e);
      });
    }
    function rh(a, b, c) {
      ph({
        url: b,
        mh: !0
      }, function(b) {
        th(a, b);
        c();
      });
    }
    function th(a, b) {
      eval("var jsonpCB = function(pLPCommand, pRTLPCB) {" + b + "}");
      jsonpCB(a.pg, a.Jg);
    }
    ;
    var uh = null,
        uh = require('faye-websocket').Client;
    function vh(a, b, c, d) {
      this.qe = a;
      this.f = nd(this.qe);
      this.frames = this.Lc = null;
      this.pb = this.qb = this.cf = 0;
      this.Wa = sc(b);
      a = {v: "5"};
      c && (a.s = c);
      d && (a.ls = d);
      this.ff = dd(b, ed, a);
    }
    var wh;
    vh.prototype.open = function(a, b) {
      this.jb = b;
      this.Ig = a;
      this.f("Websocket connecting to " + this.ff);
      this.Ic = !1;
      $c.set("previous_websocket_failure", !0);
      try {
        this.Ka = new uh(this.ff, [], {headers: {"User-Agent": "Firebase/5/" + Cb + "/" + process.platform + "/Node"}});
      } catch (c) {
        this.f("Error instantiating WebSocket.");
        var d = c.message || c.data;
        d && this.f(d);
        this.ab();
        return;
      }
      var e = this;
      this.Ka.onopen = function() {
        e.f("Websocket connected.");
        e.Ic = !0;
      };
      this.Ka.onclose = function() {
        e.f("Websocket connection was disconnected.");
        e.Ka = null;
        e.ab();
      };
      this.Ka.onmessage = function(a) {
        if (null !== e.Ka)
          if (a = a.data, e.pb += a.length, pc(e.Wa, "bytes_received", a.length), xh(e), null !== e.frames)
            yh(e, a);
          else {
            a: {
              N(null === e.frames, "We already have a frame buffer");
              if (6 >= a.length) {
                var b = Number(a);
                if (!isNaN(b)) {
                  e.cf = b;
                  e.frames = [];
                  a = null;
                  break a;
                }
              }
              e.cf = 1;
              e.frames = [];
            }
            null !== a && yh(e, a);
          }
      };
      this.Ka.onerror = function(a) {
        e.f("WebSocket error.  Closing connection.");
        (a = a.message || a.data) && e.f(a);
        e.ab();
      };
    };
    vh.prototype.start = function() {};
    vh.isAvailable = function() {
      var a = !1;
      if ("undefined" !== typeof navigator && navigator.userAgent) {
        var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
        b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0);
      }
      return !a && null !== uh && !wh;
    };
    vh.responsesRequiredToBeHealthy = 2;
    vh.healthyTimeout = 3E4;
    h = vh.prototype;
    h.Ed = function() {
      $c.remove("previous_websocket_failure");
    };
    function yh(a, b) {
      a.frames.push(b);
      if (a.frames.length == a.cf) {
        var c = a.frames.join("");
        a.frames = null;
        c = Pb(c);
        a.Ig(c);
      }
    }
    h.send = function(a) {
      xh(this);
      a = F(a);
      this.qb += a.length;
      pc(this.Wa, "bytes_sent", a.length);
      a = wd(a, 16384);
      1 < a.length && zh(this, String(a.length));
      for (var b = 0; b < a.length; b++)
        zh(this, a[b]);
    };
    h.cd = function() {
      this.Bb = !0;
      this.Lc && (clearInterval(this.Lc), this.Lc = null);
      this.Ka && (this.Ka.close(), this.Ka = null);
    };
    h.ab = function() {
      this.Bb || (this.f("WebSocket is closing itself"), this.cd(), this.jb && (this.jb(this.Ic), this.jb = null));
    };
    h.close = function() {
      this.Bb || (this.f("WebSocket is being closed"), this.cd());
    };
    function xh(a) {
      clearInterval(a.Lc);
      a.Lc = setInterval(function() {
        a.Ka && zh(a, "0");
        xh(a);
      }, Math.floor(45E3));
    }
    function zh(a, b) {
      try {
        a.Ka.send(b);
      } catch (c) {
        a.f("Exception thrown from WebSocket.send():", c.message || c.data, "Closing connection."), setTimeout(u(a.ab, a), 0);
      }
    }
    ;
    function Ah(a) {
      Bh(this, a);
    }
    var Ch = [ih, vh];
    function Bh(a, b) {
      var c = vh && vh.isAvailable(),
          d = c && !($c.xf || !0 === $c.get("previous_websocket_failure"));
      b.ih && (c || R("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), d = !0);
      if (d)
        a.fd = [vh];
      else {
        var e = a.fd = [];
        xd(Ch, function(a, b) {
          b && b.isAvailable() && e.push(b);
        });
      }
    }
    function Dh(a) {
      if (0 < a.fd.length)
        return a.fd[0];
      throw Error("No transports available");
    }
    ;
    function Eh(a, b, c, d, e, f, g) {
      this.id = a;
      this.f = nd("c:" + this.id + ":");
      this.lc = c;
      this.Xc = d;
      this.na = e;
      this.Oe = f;
      this.G = b;
      this.Nd = [];
      this.gf = 0;
      this.Vf = new Ah(b);
      this.N = 0;
      this.Db = g;
      this.f("Connection created");
      Fh(this);
    }
    function Fh(a) {
      var b = Dh(a.Vf);
      a.K = new b("c:" + a.id + ":" + a.gf++, a.G, void 0, a.Db);
      a.Se = b.responsesRequiredToBeHealthy || 0;
      var c = Gh(a, a.K),
          d = Hh(a, a.K);
      a.gd = a.K;
      a.bd = a.K;
      a.F = null;
      a.Cb = !1;
      setTimeout(function() {
        a.K && a.K.open(c, d);
      }, Math.floor(0));
      b = b.healthyTimeout || 0;
      0 < b && (a.yd = setTimeout(function() {
        a.yd = null;
        a.Cb || (a.K && 102400 < a.K.pb ? (a.f("Connection exceeded healthy timeout but has received " + a.K.pb + " bytes.  Marking connection healthy."), a.Cb = !0, a.K.Ed()) : a.K && 10240 < a.K.qb ? a.f("Connection exceeded healthy timeout but has sent " + a.K.qb + " bytes.  Leaving connection alive.") : (a.f("Closing unhealthy connection after timeout."), a.close()));
      }, Math.floor(b)));
    }
    function Hh(a, b) {
      return function(c) {
        b === a.K ? (a.K = null, c || 0 !== a.N ? 1 === a.N && a.f("Realtime connection lost.") : (a.f("Realtime connection failed."), "s-" === a.G.$a.substr(0, 2) && ($c.remove("host:" + a.G.host), a.G.$a = a.G.host)), a.close()) : b === a.F ? (a.f("Secondary connection lost."), c = a.F, a.F = null, a.gd !== c && a.bd !== c || a.close()) : a.f("closing an old connection");
      };
    }
    function Gh(a, b) {
      return function(c) {
        if (2 != a.N)
          if (b === a.bd) {
            var d = ud("t", c);
            c = ud("d", c);
            if ("c" == d) {
              if (d = ud("t", c), "d" in c)
                if (c = c.d, "h" === d) {
                  var d = c.ts,
                      e = c.v,
                      f = c.h;
                  a.Tf = c.s;
                  cd(a.G, f);
                  0 == a.N && (a.K.start(), Ih(a, a.K, d), "5" !== e && R("Protocol version mismatch detected"), c = a.Vf, (c = 1 < c.fd.length ? c.fd[1] : null) && Jh(a, c));
                } else if ("n" === d) {
                  a.f("recvd end transmission on primary");
                  a.bd = a.F;
                  for (c = 0; c < a.Nd.length; ++c)
                    a.Jd(a.Nd[c]);
                  a.Nd = [];
                  Kh(a);
                } else
                  "s" === d ? (a.f("Connection shutdown command received. Shutting down..."), a.Oe && (a.Oe(c), a.Oe = null), a.na = null, a.close()) : "r" === d ? (a.f("Reset packet received.  New host: " + c), cd(a.G, c), 1 === a.N ? a.close() : (Lh(a), Fh(a))) : "e" === d ? od("Server Error: " + c) : "o" === d ? (a.f("got pong on primary."), Mh(a), Nh(a)) : od("Unknown control packet command: " + d);
            } else
              "d" == d && a.Jd(c);
          } else if (b === a.F)
            if (d = ud("t", c), c = ud("d", c), "c" == d)
              "t" in c && (c = c.t, "a" === c ? Oh(a) : "r" === c ? (a.f("Got a reset on secondary, closing it"), a.F.close(), a.gd !== a.F && a.bd !== a.F || a.close()) : "o" === c && (a.f("got pong on secondary."), a.Rf--, Oh(a)));
            else if ("d" == d)
              a.Nd.push(c);
            else
              throw Error("Unknown protocol layer: " + d);
          else
            a.f("message on old connection");
      };
    }
    Eh.prototype.Ha = function(a) {
      Ph(this, {
        t: "d",
        d: a
      });
    };
    function Kh(a) {
      a.gd === a.F && a.bd === a.F && (a.f("cleaning up and promoting a connection: " + a.F.qe), a.K = a.F, a.F = null);
    }
    function Oh(a) {
      0 >= a.Rf ? (a.f("Secondary connection is healthy."), a.Cb = !0, a.F.Ed(), a.F.start(), a.f("sending client ack on secondary"), a.F.send({
        t: "c",
        d: {
          t: "a",
          d: {}
        }
      }), a.f("Ending transmission on primary"), a.K.send({
        t: "c",
        d: {
          t: "n",
          d: {}
        }
      }), a.gd = a.F, Kh(a)) : (a.f("sending ping on secondary."), a.F.send({
        t: "c",
        d: {
          t: "p",
          d: {}
        }
      }));
    }
    Eh.prototype.Jd = function(a) {
      Mh(this);
      this.lc(a);
    };
    function Mh(a) {
      a.Cb || (a.Se--, 0 >= a.Se && (a.f("Primary connection is healthy."), a.Cb = !0, a.K.Ed()));
    }
    function Jh(a, b) {
      a.F = new b("c:" + a.id + ":" + a.gf++, a.G, a.Tf);
      a.Rf = b.responsesRequiredToBeHealthy || 0;
      a.F.open(Gh(a, a.F), Hh(a, a.F));
      setTimeout(function() {
        a.F && (a.f("Timed out trying to upgrade."), a.F.close());
      }, Math.floor(6E4));
    }
    function Ih(a, b, c) {
      a.f("Realtime connection established.");
      a.K = b;
      a.N = 1;
      a.Xc && (a.Xc(c, a.Tf), a.Xc = null);
      0 === a.Se ? (a.f("Primary connection is healthy."), a.Cb = !0) : setTimeout(function() {
        Nh(a);
      }, Math.floor(5E3));
    }
    function Nh(a) {
      a.Cb || 1 !== a.N || (a.f("sending ping on primary."), Ph(a, {
        t: "c",
        d: {
          t: "p",
          d: {}
        }
      }));
    }
    function Ph(a, b) {
      if (1 !== a.N)
        throw "Connection is not connected";
      a.gd.send(b);
    }
    Eh.prototype.close = function() {
      2 !== this.N && (this.f("Closing realtime connection."), this.N = 2, Lh(this), this.na && (this.na(), this.na = null));
    };
    function Lh(a) {
      a.f("Shutting down all connections");
      a.K && (a.K.close(), a.K = null);
      a.F && (a.F.close(), a.F = null);
      a.yd && (clearTimeout(a.yd), a.yd = null);
    }
    ;
    function Qh(a, b, c, d) {
      this.id = Rh++;
      this.f = nd("p:" + this.id + ":");
      this.yf = this.Ee = !1;
      this.ba = {};
      this.sa = [];
      this.Zc = 0;
      this.Wc = [];
      this.qa = !1;
      this.bb = 1E3;
      this.Fd = 3E5;
      this.Ib = b;
      this.Vc = c;
      this.Pe = d;
      this.G = a;
      this.ub = this.Ca = this.La = this.Db = this.Xe = null;
      this.Qb = !1;
      this.Ud = {};
      this.Wg = 0;
      this.of = !0;
      this.Mc = this.Ge = null;
      Sh(this, 0);
      hf.wb().Gb("visible", this.Mg, this);
      -1 === a.host.indexOf("fblocal") && gf.wb().Gb("online", this.Kg, this);
    }
    var Rh = 0,
        Th = 0;
    h = Qh.prototype;
    h.Ha = function(a, b, c) {
      var d = ++this.Wg;
      a = {
        r: d,
        a: a,
        b: b
      };
      this.f(F(a));
      N(this.qa, "sendRequest call when we're not connected not allowed.");
      this.La.Ha(a);
      c && (this.Ud[d] = c);
    };
    h.zf = function(a, b, c, d) {
      var e = a.wa(),
          f = a.path.toString();
      this.f("Listen called for " + f + " " + e);
      this.ba[f] = this.ba[f] || {};
      N(Ge(a.n) || !Fe(a.n), "listen() called for non-default but complete query");
      N(!this.ba[f][e], "listen() called twice for same path/queryId.");
      a = {
        I: d,
        xd: b,
        Tg: a,
        tag: c
      };
      this.ba[f][e] = a;
      this.qa && Uh(this, a);
    };
    function Uh(a, b) {
      var c = b.Tg,
          d = c.path.toString(),
          e = c.wa();
      a.f("Listen on " + d + " for " + e);
      var f = {p: d};
      b.tag && (f.q = Ee(c.n), f.t = b.tag);
      f.h = b.xd();
      a.Ha("q", f, function(f) {
        var k = f.d,
            m = f.s;
        if (k && "object" === typeof k && y(k, "w")) {
          var l = z(k, "w");
          da(l) && 0 <= Ma(l, "no_index") && R("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.n.g.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance");
        }
        (a.ba[d] && a.ba[d][e]) === b && (a.f("listen response", f), "ok" !== m && Vh(a, d, e), b.I && b.I(m, k));
      });
    }
    h.O = function(a, b, c) {
      this.Ca = {
        rg: a,
        pf: !1,
        Cc: b,
        ld: c
      };
      this.f("Authenticating using credential: " + a);
      Wh(this);
      (b = 40 == a.length) || (a = Ad(a).Dc, b = "object" === typeof a && !0 === z(a, "admin"));
      b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.Fd = 3E4);
    };
    h.ge = function(a) {
      delete this.Ca;
      this.qa && this.Ha("unauth", {}, function(b) {
        a(b.s, b.d);
      });
    };
    function Wh(a) {
      var b = a.Ca;
      a.qa && b && a.Ha("auth", {cred: b.rg}, function(c) {
        var d = c.s;
        c = c.d || "error";
        "ok" !== d && a.Ca === b && delete a.Ca;
        b.pf ? "ok" !== d && b.ld && b.ld(d, c) : (b.pf = !0, b.Cc && b.Cc(d, c));
      });
    }
    h.Zf = function(a, b) {
      var c = a.path.toString(),
          d = a.wa();
      this.f("Unlisten called for " + c + " " + d);
      N(Ge(a.n) || !Fe(a.n), "unlisten() called for non-default but complete query");
      if (Vh(this, c, d) && this.qa) {
        var e = Ee(a.n);
        this.f("Unlisten on " + c + " for " + d);
        c = {p: c};
        b && (c.q = e, c.t = b);
        this.Ha("n", c);
      }
    };
    h.Ne = function(a, b, c) {
      this.qa ? Xh(this, "o", a, b, c) : this.Wc.push({
        oc: a,
        action: "o",
        data: b,
        I: c
      });
    };
    h.Ff = function(a, b, c) {
      this.qa ? Xh(this, "om", a, b, c) : this.Wc.push({
        oc: a,
        action: "om",
        data: b,
        I: c
      });
    };
    h.Kd = function(a, b) {
      this.qa ? Xh(this, "oc", a, null, b) : this.Wc.push({
        oc: a,
        action: "oc",
        data: null,
        I: b
      });
    };
    function Xh(a, b, c, d, e) {
      c = {
        p: c,
        d: d
      };
      a.f("onDisconnect " + b, c);
      a.Ha(b, c, function(a) {
        e && setTimeout(function() {
          e(a.s, a.d);
        }, Math.floor(0));
      });
    }
    h.put = function(a, b, c, d) {
      Yh(this, "p", a, b, c, d);
    };
    h.Af = function(a, b, c, d) {
      Yh(this, "m", a, b, c, d);
    };
    function Yh(a, b, c, d, e, f) {
      d = {
        p: c,
        d: d
      };
      p(f) && (d.h = f);
      a.sa.push({
        action: b,
        Nf: d,
        I: e
      });
      a.Zc++;
      b = a.sa.length - 1;
      a.qa ? Zh(a, b) : a.f("Buffering put: " + c);
    }
    function Zh(a, b) {
      var c = a.sa[b].action,
          d = a.sa[b].Nf,
          e = a.sa[b].I;
      a.sa[b].Ug = a.qa;
      a.Ha(c, d, function(d) {
        a.f(c + " response", d);
        delete a.sa[b];
        a.Zc--;
        0 === a.Zc && (a.sa = []);
        e && e(d.s, d.d);
      });
    }
    h.Ve = function(a) {
      this.qa && (a = {c: a}, this.f("reportStats", a), this.Ha("s", a, function(a) {
        "ok" !== a.s && this.f("reportStats", "Error sending stats: " + a.d);
      }));
    };
    h.Jd = function(a) {
      if ("r" in a) {
        this.f("from server: " + F(a));
        var b = a.r,
            c = this.Ud[b];
        c && (delete this.Ud[b], c(a.b));
      } else {
        if ("error" in a)
          throw "A server-side error has occurred: " + a.error;
        "a" in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.Ib(c.p, c.d, !1, c.t) : "m" === b ? this.Ib(c.p, c.d, !0, c.t) : "c" === b ? $h(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Ca, delete this.Ca, c && c.ld && c.ld(a, b)) : "sd" === b ? this.Xe ? this.Xe(c) : "msg" in c && "undefined" !== typeof console && console.log("FIREBASE: " + c.msg.replace("\n", "\nFIREBASE: ")) : od("Unrecognized action received from server: " + F(b) + "\nAre you using the latest client?"));
      }
    };
    h.Xc = function(a, b) {
      this.f("connection ready");
      this.qa = !0;
      this.Mc = (new Date).getTime();
      this.Pe({serverTimeOffset: a - (new Date).getTime()});
      this.Db = b;
      if (this.of) {
        var c = {};
        c["sdk.js." + Cb.replace(/\./g, "-")] = 1;
        "undefined" !== typeof window && (window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ag()) ? c["framework.cordova"] = 1 : "object" === typeof navigator && "ReactNative" === navigator.product && (c["framework.reactnative"] = 1);
        this.Ve(c);
      }
      ai(this);
      this.of = !1;
      this.Vc(!0);
    };
    function Sh(a, b) {
      N(!a.La, "Scheduling a connect when we're already connected/ing?");
      a.ub && clearTimeout(a.ub);
      a.ub = setTimeout(function() {
        a.ub = null;
        bi(a);
      }, Math.floor(b));
    }
    h.Mg = function(a) {
      a && !this.Qb && this.bb === this.Fd && (this.f("Window became visible.  Reducing delay."), this.bb = 1E3, this.La || Sh(this, 0));
      this.Qb = a;
    };
    h.Kg = function(a) {
      a ? (this.f("Browser went online."), this.bb = 1E3, this.La || Sh(this, 0)) : (this.f("Browser went offline.  Killing connection."), this.La && this.La.close());
    };
    h.Hf = function() {
      this.f("data client disconnected");
      this.qa = !1;
      this.La = null;
      for (var a = 0; a < this.sa.length; a++) {
        var b = this.sa[a];
        b && "h" in b.Nf && b.Ug && (b.I && b.I("disconnect"), delete this.sa[a], this.Zc--);
      }
      0 === this.Zc && (this.sa = []);
      this.Ud = {};
      ci(this) && (this.Qb ? this.Mc && (3E4 < (new Date).getTime() - this.Mc && (this.bb = 1E3), this.Mc = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.bb = this.Fd, this.Ge = (new Date).getTime()), a = Math.max(0, this.bb - ((new Date).getTime() - this.Ge)), a *= Math.random(), this.f("Trying to reconnect in " + a + "ms"), Sh(this, a), this.bb = Math.min(this.Fd, 1.3 * this.bb));
      this.Vc(!1);
    };
    function bi(a) {
      if (ci(a)) {
        a.f("Making a connection attempt");
        a.Ge = (new Date).getTime();
        a.Mc = null;
        var b = u(a.Jd, a),
            c = u(a.Xc, a),
            d = u(a.Hf, a),
            e = a.id + ":" + Th++;
        a.La = new Eh(e, a.G, b, c, d, function(b) {
          R(b + " (" + a.G.toString() + ")");
          a.yf = !0;
        }, a.Db);
      }
    }
    h.Ab = function() {
      this.Ee = !0;
      this.La ? this.La.close() : (this.ub && (clearTimeout(this.ub), this.ub = null), this.qa && this.Hf());
    };
    h.uc = function() {
      this.Ee = !1;
      this.bb = 1E3;
      this.La || Sh(this, 0);
    };
    function $h(a, b, c) {
      c = c ? Pa(c, function(a) {
        return vd(a);
      }).join("$") : "default";
      (a = Vh(a, b, c)) && a.I && a.I("permission_denied");
    }
    function Vh(a, b, c) {
      b = (new O(b)).toString();
      var d;
      p(a.ba[b]) ? (d = a.ba[b][c], delete a.ba[b][c], 0 === oa(a.ba[b]) && delete a.ba[b]) : d = void 0;
      return d;
    }
    function ai(a) {
      Wh(a);
      v(a.ba, function(b) {
        v(b, function(b) {
          Uh(a, b);
        });
      });
      for (var b = 0; b < a.sa.length; b++)
        a.sa[b] && Zh(a, b);
      for (; a.Wc.length; )
        b = a.Wc.shift(), Xh(a, b.action, b.oc, b.data, b.I);
    }
    function ci(a) {
      var b;
      b = gf.wb().mc;
      return !a.yf && !a.Ee && b;
    }
    ;
    var U = {zg: function() {
        jh = wh = !0;
      }};
    U.forceLongPolling = U.zg;
    U.Ag = function() {
      kh = !0;
    };
    U.forceWebSockets = U.Ag;
    U.$g = function(a, b) {
      a.k.Ua.Xe = b;
    };
    U.setSecurityDebugCallback = U.$g;
    U.Ze = function(a, b) {
      a.k.Ze(b);
    };
    U.stats = U.Ze;
    U.$e = function(a, b) {
      a.k.$e(b);
    };
    U.statsIncrementCounter = U.$e;
    U.rd = function(a) {
      return a.k.rd;
    };
    U.dataUpdateCount = U.rd;
    U.Dg = function(a, b) {
      a.k.De = b;
    };
    U.interceptServerData = U.Dg;
    U.Hg = function(a) {
      new Jg(a);
    };
    U.onPopupOpen = U.Hg;
    U.Yg = function(a) {
      vg = a;
    };
    U.setAuthenticationServer = U.Yg;
    function di(a, b) {
      this.committed = a;
      this.snapshot = b;
    }
    ;
    function V(a, b) {
      this.ad = a;
      this.ta = b;
    }
    V.prototype.cancel = function(a) {
      C("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
      E("Firebase.onDisconnect().cancel", 1, a, !0);
      var b = new A;
      this.ad.Kd(this.ta, B(b, a));
      return b.D;
    };
    V.prototype.cancel = V.prototype.cancel;
    V.prototype.remove = function(a) {
      C("Firebase.onDisconnect().remove", 0, 1, arguments.length);
      mg("Firebase.onDisconnect().remove", this.ta);
      E("Firebase.onDisconnect().remove", 1, a, !0);
      var b = new A;
      ei(this.ad, this.ta, null, B(b, a));
      return b.D;
    };
    V.prototype.remove = V.prototype.remove;
    V.prototype.set = function(a, b) {
      C("Firebase.onDisconnect().set", 1, 2, arguments.length);
      mg("Firebase.onDisconnect().set", this.ta);
      eg("Firebase.onDisconnect().set", a, this.ta, !1);
      E("Firebase.onDisconnect().set", 2, b, !0);
      var c = new A;
      ei(this.ad, this.ta, a, B(c, b));
      return c.D;
    };
    V.prototype.set = V.prototype.set;
    V.prototype.Mb = function(a, b, c) {
      C("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
      mg("Firebase.onDisconnect().setWithPriority", this.ta);
      eg("Firebase.onDisconnect().setWithPriority", a, this.ta, !1);
      ig("Firebase.onDisconnect().setWithPriority", 2, b);
      E("Firebase.onDisconnect().setWithPriority", 3, c, !0);
      var d = new A;
      fi(this.ad, this.ta, a, b, B(d, c));
      return d.D;
    };
    V.prototype.setWithPriority = V.prototype.Mb;
    V.prototype.update = function(a, b) {
      C("Firebase.onDisconnect().update", 1, 2, arguments.length);
      mg("Firebase.onDisconnect().update", this.ta);
      if (da(a)) {
        for (var c = {},
            d = 0; d < a.length; ++d)
          c["" + d] = a[d];
        a = c;
        R("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
      }
      hg("Firebase.onDisconnect().update", a, this.ta);
      E("Firebase.onDisconnect().update", 2, b, !0);
      c = new A;
      gi(this.ad, this.ta, a, B(c, b));
      return c.D;
    };
    V.prototype.update = V.prototype.update;
    function W(a, b, c) {
      this.A = a;
      this.Y = b;
      this.g = c;
    }
    W.prototype.J = function() {
      C("Firebase.DataSnapshot.val", 0, 0, arguments.length);
      return this.A.J();
    };
    W.prototype.val = W.prototype.J;
    W.prototype.nf = function() {
      C("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
      return this.A.J(!0);
    };
    W.prototype.exportVal = W.prototype.nf;
    W.prototype.xg = function() {
      C("Firebase.DataSnapshot.exists", 0, 0, arguments.length);
      return !this.A.e();
    };
    W.prototype.exists = W.prototype.xg;
    W.prototype.o = function(a) {
      C("Firebase.DataSnapshot.child", 0, 1, arguments.length);
      fa(a) && (a = String(a));
      lg("Firebase.DataSnapshot.child", a);
      var b = new O(a),
          c = this.Y.o(b);
      return new W(this.A.S(b), c, Q);
    };
    W.prototype.child = W.prototype.o;
    W.prototype.Fa = function(a) {
      C("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
      lg("Firebase.DataSnapshot.hasChild", a);
      var b = new O(a);
      return !this.A.S(b).e();
    };
    W.prototype.hasChild = W.prototype.Fa;
    W.prototype.C = function() {
      C("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
      return this.A.C().J();
    };
    W.prototype.getPriority = W.prototype.C;
    W.prototype.forEach = function(a) {
      C("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
      E("Firebase.DataSnapshot.forEach", 1, a, !1);
      if (this.A.L())
        return !1;
      var b = this;
      return !!this.A.R(this.g, function(c, d) {
        return a(new W(d, b.Y.o(c), Q));
      });
    };
    W.prototype.forEach = W.prototype.forEach;
    W.prototype.wd = function() {
      C("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
      return this.A.L() ? !1 : !this.A.e();
    };
    W.prototype.hasChildren = W.prototype.wd;
    W.prototype.name = function() {
      R("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");
      C("Firebase.DataSnapshot.name", 0, 0, arguments.length);
      return this.key();
    };
    W.prototype.name = W.prototype.name;
    W.prototype.key = function() {
      C("Firebase.DataSnapshot.key", 0, 0, arguments.length);
      return this.Y.key();
    };
    W.prototype.key = W.prototype.key;
    W.prototype.Fb = function() {
      C("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
      return this.A.Fb();
    };
    W.prototype.numChildren = W.prototype.Fb;
    W.prototype.Kb = function() {
      C("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
      return this.Y;
    };
    W.prototype.ref = W.prototype.Kb;
    function hi(a, b, c) {
      this.Tb = a;
      this.rb = b;
      this.tb = c || null;
    }
    h = hi.prototype;
    h.Of = function(a) {
      return "value" === a;
    };
    h.createEvent = function(a, b) {
      var c = b.n.g;
      return new hc("value", this, new W(a.Ma, b.Kb(), c));
    };
    h.Yb = function(a) {
      var b = this.tb;
      if ("cancel" === a.ze()) {
        N(this.rb, "Raising a cancel event on a listener with no cancel callback");
        var c = this.rb;
        return function() {
          c.call(b, a.error);
        };
      }
      var d = this.Tb;
      return function() {
        d.call(b, a.Zd);
      };
    };
    h.hf = function(a, b) {
      return this.rb ? new ic(this, a, b) : null;
    };
    h.matches = function(a) {
      return a instanceof hi ? a.Tb && this.Tb ? a.Tb === this.Tb && a.tb === this.tb : !0 : !1;
    };
    h.uf = function() {
      return null !== this.Tb;
    };
    function ii(a, b, c) {
      this.ja = a;
      this.rb = b;
      this.tb = c;
    }
    h = ii.prototype;
    h.Of = function(a) {
      a = "children_added" === a ? "child_added" : a;
      return ("children_removed" === a ? "child_removed" : a) in this.ja;
    };
    h.hf = function(a, b) {
      return this.rb ? new ic(this, a, b) : null;
    };
    h.createEvent = function(a, b) {
      N(null != a.Ya, "Child events should have a childName.");
      var c = b.Kb().o(a.Ya);
      return new hc(a.type, this, new W(a.Ma, c, b.n.g), a.Rd);
    };
    h.Yb = function(a) {
      var b = this.tb;
      if ("cancel" === a.ze()) {
        N(this.rb, "Raising a cancel event on a listener with no cancel callback");
        var c = this.rb;
        return function() {
          c.call(b, a.error);
        };
      }
      var d = this.ja[a.td];
      return function() {
        d.call(b, a.Zd, a.Rd);
      };
    };
    h.matches = function(a) {
      if (a instanceof ii) {
        if (!this.ja || !a.ja)
          return !0;
        if (this.tb === a.tb) {
          var b = oa(a.ja);
          if (b === oa(this.ja)) {
            if (1 === b) {
              var b = pa(a.ja),
                  c = pa(this.ja);
              return c === b && (!a.ja[b] || !this.ja[c] || a.ja[b] === this.ja[c]);
            }
            return na(this.ja, function(b, c) {
              return a.ja[c] === b;
            });
          }
        }
      }
      return !1;
    };
    h.uf = function() {
      return null !== this.ja;
    };
    function ji() {
      this.za = {};
    }
    h = ji.prototype;
    h.e = function() {
      return va(this.za);
    };
    h.fb = function(a, b, c) {
      var d = a.source.Jb;
      if (null !== d)
        return d = z(this.za, d), N(null != d, "SyncTree gave us an op for an invalid query."), d.fb(a, b, c);
      var e = [];
      v(this.za, function(d) {
        e = e.concat(d.fb(a, b, c));
      });
      return e;
    };
    h.Rb = function(a, b, c, d, e) {
      var f = a.wa(),
          g = z(this.za, f);
      if (!g) {
        var g = c.Aa(e ? d : null),
            k = !1;
        g ? k = !0 : (g = d instanceof de ? c.Bc(d) : G, k = !1);
        g = new We(a, new he(new Vb(g, k, !1), new Vb(d, e, !1)));
        this.za[f] = g;
      }
      g.Rb(b);
      return Ze(g, b);
    };
    h.lb = function(a, b, c) {
      var d = a.wa(),
          e = [],
          f = [],
          g = null != ki(this);
      if ("default" === d) {
        var k = this;
        v(this.za, function(a, d) {
          f = f.concat(a.lb(b, c));
          a.e() && (delete k.za[d], Fe(a.Y.n) || e.push(a.Y));
        });
      } else {
        var m = z(this.za, d);
        m && (f = f.concat(m.lb(b, c)), m.e() && (delete this.za[d], Fe(m.Y.n) || e.push(m.Y)));
      }
      g && null == ki(this) && e.push(new X(a.k, a.path));
      return {
        Vg: e,
        vg: f
      };
    };
    function li(a) {
      return Oa(qa(a.za), function(a) {
        return !Fe(a.Y.n);
      });
    }
    h.ib = function(a) {
      var b = null;
      v(this.za, function(c) {
        b = b || c.ib(a);
      });
      return b;
    };
    function mi(a, b) {
      if (Fe(b.n))
        return ki(a);
      var c = b.wa();
      return z(a.za, c);
    }
    function ki(a) {
      return ua(a.za, function(a) {
        return Fe(a.Y.n);
      }) || null;
    }
    ;
    function ni(a) {
      this.va = oe;
      this.kb = new Nf;
      this.af = {};
      this.pc = {};
      this.Oc = a;
    }
    function oi(a, b, c, d, e) {
      var f = a.kb,
          g = e;
      N(d > f.Nc, "Stacking an older write on top of newer ones");
      p(g) || (g = !0);
      f.pa.push({
        path: b,
        Ia: c,
        jd: d,
        visible: g
      });
      g && (f.V = Hf(f.V, b, c));
      f.Nc = d;
      return e ? pi(a, new yc(Cf, b, c)) : [];
    }
    function qi(a, b, c, d) {
      var e = a.kb;
      N(d > e.Nc, "Stacking an older merge on top of newer ones");
      e.pa.push({
        path: b,
        children: c,
        jd: d,
        visible: !0
      });
      e.V = If(e.V, b, c);
      e.Nc = d;
      c = qf(c);
      return pi(a, new $e(Cf, b, c));
    }
    function ri(a, b, c) {
      c = c || !1;
      var d = Of(a.kb, b);
      if (a.kb.Sd(b)) {
        var e = oe;
        null != d.Ia ? e = e.set(L, !0) : Db(d.children, function(a, b) {
          e = e.set(new O(a), b);
        });
        return pi(a, new Bf(d.path, e, c));
      }
      return [];
    }
    function si(a, b, c) {
      c = qf(c);
      return pi(a, new $e(Ef, b, c));
    }
    function ti(a, b, c, d) {
      d = ui(a, d);
      if (null != d) {
        var e = vi(d);
        d = e.path;
        e = e.Jb;
        b = jf(d, b);
        c = new yc(new Df(!1, !0, e, !0), b, c);
        return wi(a, d, c);
      }
      return [];
    }
    function xi(a, b, c, d) {
      if (d = ui(a, d)) {
        var e = vi(d);
        d = e.path;
        e = e.Jb;
        b = jf(d, b);
        c = qf(c);
        c = new $e(new Df(!1, !0, e, !0), b, c);
        return wi(a, d, c);
      }
      return [];
    }
    ni.prototype.Rb = function(a, b) {
      var c = a.path,
          d = null,
          e = !1;
      xf(this.va, c, function(a, b) {
        var f = jf(a, c);
        d = d || b.ib(f);
        e = e || null != ki(b);
      });
      var f = this.va.get(c);
      f ? (e = e || null != ki(f), d = d || f.ib(L)) : (f = new ji, this.va = this.va.set(c, f));
      var g;
      null != d ? g = !0 : (g = !1, d = G, Af(this.va.subtree(c), function(a, b) {
        var c = b.ib(L);
        c && (d = d.W(a, c));
      }));
      var k = null != mi(f, a);
      if (!k && !Fe(a.n)) {
        var m = yi(a);
        N(!(m in this.pc), "View does not exist, but we have a tag");
        var l = zi++;
        this.pc[m] = l;
        this.af["_" + l] = m;
      }
      g = f.Rb(a, b, new Sf(c, this.kb), d, g);
      k || e || (f = mi(f, a), g = g.concat(Ai(this, a, f)));
      return g;
    };
    ni.prototype.lb = function(a, b, c) {
      var d = a.path,
          e = this.va.get(d),
          f = [];
      if (e && ("default" === a.wa() || null != mi(e, a))) {
        f = e.lb(a, b, c);
        e.e() && (this.va = this.va.remove(d));
        e = f.Vg;
        f = f.vg;
        b = -1 !== Ta(e, function(a) {
          return Fe(a.n);
        });
        var g = vf(this.va, d, function(a, b) {
          return null != ki(b);
        });
        if (b && !g && (d = this.va.subtree(d), !d.e()))
          for (var d = Bi(d),
              k = 0; k < d.length; ++k) {
            var m = d[k],
                l = m.Y,
                m = Ci(this, m);
            this.Oc.Ye(Di(l), Ei(this, l), m.xd, m.I);
          }
        if (!g && 0 < e.length && !c)
          if (b)
            this.Oc.ae(Di(a), null);
          else {
            var r = this;
            Na(e, function(a) {
              a.wa();
              var b = r.pc[yi(a)];
              r.Oc.ae(Di(a), b);
            });
          }
        Fi(this, e);
      }
      return f;
    };
    ni.prototype.Aa = function(a, b) {
      var c = this.kb,
          d = vf(this.va, a, function(b, c) {
            var d = jf(b, a);
            if (d = c.ib(d))
              return d;
          });
      return c.Aa(a, d, b, !0);
    };
    function Bi(a) {
      return tf(a, function(a, c, d) {
        if (c && null != ki(c))
          return [ki(c)];
        var e = [];
        c && (e = li(c));
        v(d, function(a) {
          e = e.concat(a);
        });
        return e;
      });
    }
    function Fi(a, b) {
      for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        if (!Fe(d.n)) {
          var d = yi(d),
              e = a.pc[d];
          delete a.pc[d];
          delete a.af["_" + e];
        }
      }
    }
    function Di(a) {
      return Fe(a.n) && !Ge(a.n) ? a.Kb() : a;
    }
    function Ai(a, b, c) {
      var d = b.path,
          e = Ei(a, b);
      c = Ci(a, c);
      b = a.Oc.Ye(Di(b), e, c.xd, c.I);
      d = a.va.subtree(d);
      if (e)
        N(null == ki(d.value), "If we're adding a query, it shouldn't be shadowed");
      else
        for (e = tf(d, function(a, b, c) {
          if (!a.e() && b && null != ki(b))
            return [Xe(ki(b))];
          var d = [];
          b && (d = d.concat(Pa(li(b), function(a) {
            return a.Y;
          })));
          v(c, function(a) {
            d = d.concat(a);
          });
          return d;
        }), d = 0; d < e.length; ++d)
          c = e[d], a.Oc.ae(Di(c), Ei(a, c));
      return b;
    }
    function Ci(a, b) {
      var c = b.Y,
          d = Ei(a, c);
      return {
        xd: function() {
          return (b.w() || G).hash();
        },
        I: function(b) {
          if ("ok" === b) {
            if (d) {
              var f = c.path;
              if (b = ui(a, d)) {
                var g = vi(b);
                b = g.path;
                g = g.Jb;
                f = jf(b, f);
                f = new Ac(new Df(!1, !0, g, !0), f);
                b = wi(a, b, f);
              } else
                b = [];
            } else
              b = pi(a, new Ac(Ef, c.path));
            return b;
          }
          f = "Unknown Error";
          "too_big" === b ? f = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? f = "Client doesn't have permission to access the desired data." : "unavailable" == b && (f = "The service is unavailable");
          f = Error(b + ": " + f);
          f.code = b.toUpperCase();
          return a.lb(c, null, f);
        }
      };
    }
    function yi(a) {
      return a.path.toString() + "$" + a.wa();
    }
    function vi(a) {
      var b = a.indexOf("$");
      N(-1 !== b && b < a.length - 1, "Bad queryKey.");
      return {
        Jb: a.substr(b + 1),
        path: new O(a.substr(0, b))
      };
    }
    function ui(a, b) {
      var c = a.af,
          d = "_" + b;
      return d in c ? c[d] : void 0;
    }
    function Ei(a, b) {
      var c = yi(b);
      return z(a.pc, c);
    }
    var zi = 1;
    function wi(a, b, c) {
      var d = a.va.get(b);
      N(d, "Missing sync point for query tag that we're tracking");
      return d.fb(c, new Sf(b, a.kb), null);
    }
    function pi(a, b) {
      return Gi(a, b, a.va, null, new Sf(L, a.kb));
    }
    function Gi(a, b, c, d, e) {
      if (b.path.e())
        return Hi(a, b, c, d, e);
      var f = c.get(L);
      null == d && null != f && (d = f.ib(L));
      var g = [],
          k = I(b.path),
          m = b.Yc(k);
      if ((c = c.children.get(k)) && m)
        var l = d ? d.T(k) : null,
            k = e.o(k),
            g = g.concat(Gi(a, m, c, l, k));
      f && (g = g.concat(f.fb(b, e, d)));
      return g;
    }
    function Hi(a, b, c, d, e) {
      var f = c.get(L);
      null == d && null != f && (d = f.ib(L));
      var g = [];
      c.children.ka(function(c, f) {
        var l = d ? d.T(c) : null,
            r = e.o(c),
            x = b.Yc(c);
        x && (g = g.concat(Hi(a, x, f, l, r)));
      });
      f && (g = g.concat(f.fb(b, e, d)));
      return g;
    }
    ;
    function Ii(a, b) {
      this.G = a;
      this.Wa = sc(a);
      this.ed = null;
      this.fa = new Xb;
      this.Id = 1;
      this.Ua = null;
      b || 0 <= ("object" === typeof window && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) ? (this.da = new af(this.G, u(this.Ib, this)), setTimeout(u(this.Vc, this, !0), 0)) : this.da = this.Ua = new Qh(this.G, u(this.Ib, this), u(this.Vc, this), u(this.Pe, this));
      this.dh = tc(a, u(function() {
        return new nc(this.Wa, this.da);
      }, this));
      this.xc = new Uf;
      this.Ce = new Qb;
      var c = this;
      this.Cd = new ni({
        Ye: function(a, b, f, g) {
          b = [];
          f = c.Ce.j(a.path);
          f.e() || (b = pi(c.Cd, new yc(Ef, a.path, f)), setTimeout(function() {
            g("ok");
          }, 0));
          return b;
        },
        ae: aa
      });
      Ji(this, "connected", !1);
      this.na = new Tc;
      this.O = new Tg(a, u(this.da.O, this.da), u(this.da.ge, this.da), u(this.Me, this));
      this.rd = 0;
      this.De = null;
      this.M = new ni({
        Ye: function(a, b, f, g) {
          c.da.zf(a, f, b, function(b, e) {
            var f = g(b, e);
            bc(c.fa, a.path, f);
          });
          return [];
        },
        ae: function(a, b) {
          c.da.Zf(a, b);
        }
      });
    }
    h = Ii.prototype;
    h.toString = function() {
      return (this.G.mb ? "https://" : "http://") + this.G.host;
    };
    h.name = function() {
      return this.G.jc;
    };
    function Ki(a) {
      a = a.Ce.j(new O(".info/serverTimeOffset")).J() || 0;
      return (new Date).getTime() + a;
    }
    function Li(a) {
      a = a = {timestamp: Ki(a)};
      a.timestamp = a.timestamp || (new Date).getTime();
      return a;
    }
    h.Ib = function(a, b, c, d) {
      this.rd++;
      var e = new O(a);
      b = this.De ? this.De(a, b) : b;
      a = [];
      d ? c ? (b = ma(b, function(a) {
        return P(a);
      }), a = xi(this.M, e, b, d)) : (b = P(b), a = ti(this.M, e, b, d)) : c ? (d = ma(b, function(a) {
        return P(a);
      }), a = si(this.M, e, d)) : (d = P(b), a = pi(this.M, new yc(Ef, e, d)));
      d = e;
      0 < a.length && (d = Mi(this, e));
      bc(this.fa, d, a);
    };
    h.Vc = function(a) {
      Ji(this, "connected", a);
      !1 === a && Ni(this);
    };
    h.Pe = function(a) {
      var b = this;
      xd(a, function(a, d) {
        Ji(b, d, a);
      });
    };
    h.Me = function(a) {
      Ji(this, "authenticated", a);
    };
    function Ji(a, b, c) {
      b = new O("/.info/" + b);
      c = P(c);
      var d = a.Ce;
      d.Xd = d.Xd.H(b, c);
      c = pi(a.Cd, new yc(Ef, b, c));
      bc(a.fa, b, c);
    }
    h.Mb = function(a, b, c, d) {
      this.f("set", {
        path: a.toString(),
        value: b,
        oh: c
      });
      var e = Li(this);
      b = P(b, c);
      var e = Vc(b, e),
          f = this.Id++,
          e = oi(this.M, a, e, f, !0);
      Yb(this.fa, e);
      var g = this;
      this.da.put(a.toString(), b.J(!0), function(b, c) {
        var e = "ok" === b;
        e || R("set at " + a + " failed: " + b);
        e = ri(g.M, f, !e);
        bc(g.fa, a, e);
        Oi(d, b, c);
      });
      e = Pi(this, a);
      Mi(this, e);
      bc(this.fa, e, []);
    };
    h.update = function(a, b, c) {
      this.f("update", {
        path: a.toString(),
        value: b
      });
      var d = !0,
          e = Li(this),
          f = {};
      v(b, function(a, b) {
        d = !1;
        var c = P(a);
        f[b] = Vc(c, e);
      });
      if (d)
        dc("update() called with empty data.  Don't do anything."), Oi(c, "ok");
      else {
        var g = this.Id++,
            k = qi(this.M, a, f, g);
        Yb(this.fa, k);
        var m = this;
        this.da.Af(a.toString(), b, function(b, d) {
          var e = "ok" === b;
          e || R("update at " + a + " failed: " + b);
          var e = ri(m.M, g, !e),
              f = a;
          0 < e.length && (f = Mi(m, a));
          bc(m.fa, f, e);
          Oi(c, b, d);
        });
        b = Pi(this, a);
        Mi(this, b);
        bc(this.fa, a, []);
      }
    };
    function Ni(a) {
      a.f("onDisconnectEvents");
      var b = Li(a),
          c = [];
      Uc(Sc(a.na, b), L, function(b, e) {
        c = c.concat(pi(a.M, new yc(Ef, b, e)));
        var f = Pi(a, b);
        Mi(a, f);
      });
      a.na = new Tc;
      bc(a.fa, L, c);
    }
    h.Kd = function(a, b) {
      var c = this;
      this.da.Kd(a.toString(), function(d, e) {
        "ok" === d && ug(c.na, a);
        Oi(b, d, e);
      });
    };
    function ei(a, b, c, d) {
      var e = P(c);
      a.da.Ne(b.toString(), e.J(!0), function(c, g) {
        "ok" === c && a.na.qc(b, e);
        Oi(d, c, g);
      });
    }
    function fi(a, b, c, d, e) {
      var f = P(c, d);
      a.da.Ne(b.toString(), f.J(!0), function(c, d) {
        "ok" === c && a.na.qc(b, f);
        Oi(e, c, d);
      });
    }
    function gi(a, b, c, d) {
      var e = !0,
          f;
      for (f in c)
        e = !1;
      e ? (dc("onDisconnect().update() called with empty data.  Don't do anything."), Oi(d, "ok")) : a.da.Ff(b.toString(), c, function(e, f) {
        if ("ok" === e)
          for (var m in c) {
            var l = P(c[m]);
            a.na.qc(b.o(m), l);
          }
        Oi(d, e, f);
      });
    }
    function Qi(a, b, c) {
      c = ".info" === I(b.path) ? a.Cd.Rb(b, c) : a.M.Rb(b, c);
      $b(a.fa, b.path, c);
    }
    h.Ab = function() {
      this.Ua && this.Ua.Ab();
    };
    h.uc = function() {
      this.Ua && this.Ua.uc();
    };
    h.Ze = function(a) {
      if ("undefined" !== typeof console) {
        a ? (this.ed || (this.ed = new mc(this.Wa)), a = this.ed.get()) : a = this.Wa.get();
        var b = Qa(ra(a), function(a, b) {
          return Math.max(b.length, a);
        }, 0),
            c;
        for (c in a) {
          for (var d = a[c],
              e = c.length; e < b + 2; e++)
            c += " ";
          console.log(c + d);
        }
      }
    };
    h.$e = function(a) {
      pc(this.Wa, a);
      this.dh.Uf[a] = !0;
    };
    h.f = function(a) {
      var b = "";
      this.Ua && (b = this.Ua.id + ":");
      dc(b, arguments);
    };
    function Oi(a, b, c) {
      a && ec(function() {
        if ("ok" == b)
          a(null);
        else {
          var d = (b || "error").toUpperCase(),
              e = d;
          c && (e += ": " + c);
          e = Error(e);
          e.code = d;
          a(e);
        }
      });
    }
    ;
    function Ri(a, b, c, d, e) {
      function f() {}
      a.f("transaction on " + b);
      var g = new X(a, b);
      g.Gb("value", f);
      c = {
        path: b,
        update: c,
        I: d,
        status: null,
        Kf: gd(),
        df: e,
        Qf: 0,
        he: function() {
          g.kc("value", f);
        },
        je: null,
        Da: null,
        od: null,
        pd: null,
        qd: null
      };
      d = a.M.Aa(b, void 0) || G;
      c.od = d;
      d = c.update(d.J());
      if (p(d)) {
        fg("transaction failed: Data returned ", d, c.path);
        c.status = 1;
        e = Vf(a.xc, b);
        var k = e.Ea() || [];
        k.push(c);
        Wf(e, k);
        "object" === typeof d && null !== d && y(d, ".priority") ? (k = z(d, ".priority"), N(dg(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) : k = (a.M.Aa(b) || G).C().J();
        e = Li(a);
        d = P(d, k);
        e = Vc(d, e);
        c.pd = d;
        c.qd = e;
        c.Da = a.Id++;
        c = oi(a.M, b, e, c.Da, c.df);
        bc(a.fa, b, c);
        Si(a);
      } else
        c.he(), c.pd = null, c.qd = null, c.I && (a = new W(c.od, new X(a, c.path), Q), c.I(null, !1, a));
    }
    function Si(a, b) {
      var c = b || a.xc;
      b || Ti(a, c);
      if (null !== c.Ea()) {
        var d = Ui(a, c);
        N(0 < d.length, "Sending zero length transaction queue");
        Ra(d, function(a) {
          return 1 === a.status;
        }) && Vi(a, c.path(), d);
      } else
        c.wd() && c.R(function(b) {
          Si(a, b);
        });
    }
    function Vi(a, b, c) {
      for (var d = Pa(c, function(a) {
        return a.Da;
      }),
          e = a.M.Aa(b, d) || G,
          d = e,
          e = e.hash(),
          f = 0; f < c.length; f++) {
        var g = c[f];
        N(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
        g.status = 2;
        g.Qf++;
        var k = jf(b, g.path),
            d = d.H(k, g.pd);
      }
      d = d.J(!0);
      a.da.put(b.toString(), d, function(d) {
        a.f("transaction put response", {
          path: b.toString(),
          status: d
        });
        var e = [];
        if ("ok" === d) {
          d = [];
          for (f = 0; f < c.length; f++) {
            c[f].status = 3;
            e = e.concat(ri(a.M, c[f].Da));
            if (c[f].I) {
              var g = c[f].qd,
                  k = new X(a, c[f].path);
              d.push(u(c[f].I, null, null, !0, new W(g, k, Q)));
            }
            c[f].he();
          }
          Ti(a, Vf(a.xc, b));
          Si(a);
          bc(a.fa, b, e);
          for (f = 0; f < d.length; f++)
            ec(d[f]);
        } else {
          if ("datastale" === d)
            for (f = 0; f < c.length; f++)
              c[f].status = 4 === c[f].status ? 5 : 1;
          else
            for (R("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++)
              c[f].status = 5, c[f].je = d;
          Mi(a, b);
        }
      }, e);
    }
    function Mi(a, b) {
      var c = Wi(a, b),
          d = c.path(),
          c = Ui(a, c);
      Xi(a, c, d);
      return d;
    }
    function Xi(a, b, c) {
      if (0 !== b.length) {
        for (var d = [],
            e = [],
            f = Pa(b, function(a) {
              return a.Da;
            }),
            g = 0; g < b.length; g++) {
          var k = b[g],
              m = jf(c, k.path),
              l = !1,
              r;
          N(null !== m, "rerunTransactionsUnderNode_: relativePath should not be null.");
          if (5 === k.status)
            l = !0, r = k.je, e = e.concat(ri(a.M, k.Da, !0));
          else if (1 === k.status)
            if (25 <= k.Qf)
              l = !0, r = "maxretry", e = e.concat(ri(a.M, k.Da, !0));
            else {
              var x = a.M.Aa(k.path, f) || G;
              k.od = x;
              var J = b[g].update(x.J());
              p(J) ? (fg("transaction failed: Data returned ", J, k.path), m = P(J), "object" === typeof J && null != J && y(J, ".priority") || (m = m.ia(x.C())), x = k.Da, J = Li(a), J = Vc(m, J), k.pd = m, k.qd = J, k.Da = a.Id++, Ua(f, x), e = e.concat(oi(a.M, k.path, J, k.Da, k.df)), e = e.concat(ri(a.M, x, !0))) : (l = !0, r = "nodata", e = e.concat(ri(a.M, k.Da, !0)));
            }
          bc(a.fa, c, e);
          e = [];
          l && (b[g].status = 3, setTimeout(b[g].he, Math.floor(0)), b[g].I && ("nodata" === r ? (k = new X(a, b[g].path), d.push(u(b[g].I, null, null, !1, new W(b[g].od, k, Q)))) : d.push(u(b[g].I, null, Error(r), !1, null))));
        }
        Ti(a, a.xc);
        for (g = 0; g < d.length; g++)
          ec(d[g]);
        Si(a);
      }
    }
    function Wi(a, b) {
      for (var c,
          d = a.xc; null !== (c = I(b)) && null === d.Ea(); )
        d = Vf(d, c), b = M(b);
      return d;
    }
    function Ui(a, b) {
      var c = [];
      Yi(a, b, c);
      c.sort(function(a, b) {
        return a.Kf - b.Kf;
      });
      return c;
    }
    function Yi(a, b, c) {
      var d = b.Ea();
      if (null !== d)
        for (var e = 0; e < d.length; e++)
          c.push(d[e]);
      b.R(function(b) {
        Yi(a, b, c);
      });
    }
    function Ti(a, b) {
      var c = b.Ea();
      if (c) {
        for (var d = 0,
            e = 0; e < c.length; e++)
          3 !== c[e].status && (c[d] = c[e], d++);
        c.length = d;
        Wf(b, 0 < c.length ? c : null);
      }
      b.R(function(b) {
        Ti(a, b);
      });
    }
    function Pi(a, b) {
      var c = Wi(a, b).path(),
          d = Vf(a.xc, b);
      Zf(d, function(b) {
        Zi(a, b);
      });
      Zi(a, d);
      Yf(d, function(b) {
        Zi(a, b);
      });
      return c;
    }
    function Zi(a, b) {
      var c = b.Ea();
      if (null !== c) {
        for (var d = [],
            e = [],
            f = -1,
            g = 0; g < c.length; g++)
          4 !== c[g].status && (2 === c[g].status ? (N(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].je = "set") : (N(1 === c[g].status, "Unexpected transaction status in abort"), c[g].he(), e = e.concat(ri(a.M, c[g].Da, !0)), c[g].I && d.push(u(c[g].I, null, Error("set"), !1, null))));
        -1 === f ? Wf(b, null) : c.length = f + 1;
        bc(a.fa, b.path(), e);
        for (g = 0; g < d.length; g++)
          ec(d[g]);
      }
    }
    ;
    function $i() {
      this.rc = {};
      this.$f = !1;
    }
    $i.prototype.Ab = function() {
      for (var a in this.rc)
        this.rc[a].Ab();
    };
    $i.prototype.uc = function() {
      for (var a in this.rc)
        this.rc[a].uc();
    };
    $i.prototype.ve = function() {
      this.$f = !0;
    };
    ba($i);
    $i.prototype.interrupt = $i.prototype.Ab;
    $i.prototype.resume = $i.prototype.uc;
    function Y(a, b, c, d) {
      this.k = a;
      this.path = b;
      this.n = c;
      this.nc = d;
    }
    function aj(a) {
      var b = null,
          c = null;
      a.oa && (b = Nd(a));
      a.ra && (c = Pd(a));
      if (a.g === pe) {
        if (a.oa) {
          if ("[MIN_NAME]" != Ld(a))
            throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
          if ("string" !== typeof b)
            throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
        }
        if (a.ra) {
          if ("[MAX_NAME]" != Od(a))
            throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
          if ("string" !== typeof c)
            throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
        }
      } else if (a.g === Q) {
        if (null != b && !dg(b) || null != c && !dg(c))
          throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
      } else if (N(a.g instanceof te || a.g === ze, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c)
        throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }
    function bj(a) {
      if (a.oa && a.ra && a.la && (!a.la || "" === a.Pb))
        throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }
    function cj(a, b) {
      if (!0 === a.nc)
        throw Error(b + ": You can't combine multiple orderBy calls.");
    }
    h = Y.prototype;
    h.Kb = function() {
      C("Query.ref", 0, 0, arguments.length);
      return new X(this.k, this.path);
    };
    h.Gb = function(a, b, c, d) {
      C("Query.on", 2, 4, arguments.length);
      jg("Query.on", a, !1);
      E("Query.on", 2, b, !1);
      var e = dj("Query.on", c, d);
      if ("value" === a)
        Qi(this.k, this, new hi(b, e.cancel || null, e.Pa || null));
      else {
        var f = {};
        f[a] = b;
        Qi(this.k, this, new ii(f, e.cancel, e.Pa));
      }
      return b;
    };
    h.kc = function(a, b, c) {
      C("Query.off", 0, 3, arguments.length);
      jg("Query.off", a, !0);
      E("Query.off", 2, b, !0);
      Ob("Query.off", 3, c);
      var d = null,
          e = null;
      "value" === a ? d = new hi(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new ii(e, null, c || null));
      e = this.k;
      d = ".info" === I(this.path) ? e.Cd.lb(this, d) : e.M.lb(this, d);
      $b(e.fa, this.path, d);
    };
    h.Ng = function(a, b) {
      function c(k) {
        f && (f = !1, e.kc(a, c), b && b.call(d.Pa, k), g.resolve(k));
      }
      C("Query.once", 1, 4, arguments.length);
      jg("Query.once", a, !1);
      E("Query.once", 2, b, !0);
      var d = dj("Query.once", arguments[2], arguments[3]),
          e = this,
          f = !0,
          g = new A;
      Lb(g.D);
      this.Gb(a, c, function(b) {
        e.kc(a, c);
        d.cancel && d.cancel.call(d.Pa, b);
        g.reject(b);
      });
      return g.D;
    };
    h.He = function(a) {
      R("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
      C("Query.limit", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a)
        throw Error("Query.limit: First argument must be a positive integer.");
      if (this.n.la)
        throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
      var b = this.n.He(a);
      bj(b);
      return new Y(this.k, this.path, b, this.nc);
    };
    h.Ie = function(a) {
      C("Query.limitToFirst", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a)
        throw Error("Query.limitToFirst: First argument must be a positive integer.");
      if (this.n.la)
        throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      return new Y(this.k, this.path, this.n.Ie(a), this.nc);
    };
    h.Je = function(a) {
      C("Query.limitToLast", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a)
        throw Error("Query.limitToLast: First argument must be a positive integer.");
      if (this.n.la)
        throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      return new Y(this.k, this.path, this.n.Je(a), this.nc);
    };
    h.Og = function(a) {
      C("Query.orderByChild", 1, 1, arguments.length);
      if ("$key" === a)
        throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
      if ("$priority" === a)
        throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
      if ("$value" === a)
        throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
      lg("Query.orderByChild", a);
      cj(this, "Query.orderByChild");
      var b = new O(a);
      if (b.e())
        throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
      b = new te(b);
      b = De(this.n, b);
      aj(b);
      return new Y(this.k, this.path, b, !0);
    };
    h.Pg = function() {
      C("Query.orderByKey", 0, 0, arguments.length);
      cj(this, "Query.orderByKey");
      var a = De(this.n, pe);
      aj(a);
      return new Y(this.k, this.path, a, !0);
    };
    h.Qg = function() {
      C("Query.orderByPriority", 0, 0, arguments.length);
      cj(this, "Query.orderByPriority");
      var a = De(this.n, Q);
      aj(a);
      return new Y(this.k, this.path, a, !0);
    };
    h.Rg = function() {
      C("Query.orderByValue", 0, 0, arguments.length);
      cj(this, "Query.orderByValue");
      var a = De(this.n, ze);
      aj(a);
      return new Y(this.k, this.path, a, !0);
    };
    h.$d = function(a, b) {
      C("Query.startAt", 0, 2, arguments.length);
      eg("Query.startAt", a, this.path, !0);
      kg("Query.startAt", b);
      var c = this.n.$d(a, b);
      bj(c);
      aj(c);
      if (this.n.oa)
        throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
      p(a) || (b = a = null);
      return new Y(this.k, this.path, c, this.nc);
    };
    h.sd = function(a, b) {
      C("Query.endAt", 0, 2, arguments.length);
      eg("Query.endAt", a, this.path, !0);
      kg("Query.endAt", b);
      var c = this.n.sd(a, b);
      bj(c);
      aj(c);
      if (this.n.ra)
        throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
      return new Y(this.k, this.path, c, this.nc);
    };
    h.tg = function(a, b) {
      C("Query.equalTo", 1, 2, arguments.length);
      eg("Query.equalTo", a, this.path, !1);
      kg("Query.equalTo", b);
      if (this.n.oa)
        throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
      if (this.n.ra)
        throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
      return this.$d(a, b).sd(a, b);
    };
    h.toString = function() {
      C("Query.toString", 0, 0, arguments.length);
      for (var a = this.path,
          b = "",
          c = a.aa; c < a.u.length; c++)
        "" !== a.u[c] && (b += "/" + encodeURIComponent(String(a.u[c])));
      return this.k.toString() + (b || "/");
    };
    h.wa = function() {
      var a = vd(Ee(this.n));
      return "{}" === a ? "default" : a;
    };
    function dj(a, b, c) {
      var d = {
        cancel: null,
        Pa: null
      };
      if (b && c)
        d.cancel = b, E(a, 3, d.cancel, !0), d.Pa = c, Ob(a, 4, d.Pa);
      else if (b)
        if ("object" === typeof b && null !== b)
          d.Pa = b;
        else if ("function" === typeof b)
          d.cancel = b;
        else
          throw Error(D(a, 3, !0) + " must either be a cancel callback or a context object.");
      return d;
    }
    Y.prototype.ref = Y.prototype.Kb;
    Y.prototype.on = Y.prototype.Gb;
    Y.prototype.off = Y.prototype.kc;
    Y.prototype.once = Y.prototype.Ng;
    Y.prototype.limit = Y.prototype.He;
    Y.prototype.limitToFirst = Y.prototype.Ie;
    Y.prototype.limitToLast = Y.prototype.Je;
    Y.prototype.orderByChild = Y.prototype.Og;
    Y.prototype.orderByKey = Y.prototype.Pg;
    Y.prototype.orderByPriority = Y.prototype.Qg;
    Y.prototype.orderByValue = Y.prototype.Rg;
    Y.prototype.startAt = Y.prototype.$d;
    Y.prototype.endAt = Y.prototype.sd;
    Y.prototype.equalTo = Y.prototype.tg;
    Y.prototype.toString = Y.prototype.toString;
    var Z = {};
    Z.yc = Qh;
    Z.DataConnection = Z.yc;
    Qh.prototype.bh = function(a, b) {
      this.Ha("q", {p: a}, b);
    };
    Z.yc.prototype.simpleListen = Z.yc.prototype.bh;
    Qh.prototype.sg = function(a, b) {
      this.Ha("echo", {d: a}, b);
    };
    Z.yc.prototype.echo = Z.yc.prototype.sg;
    Qh.prototype.interrupt = Qh.prototype.Ab;
    Z.cg = Eh;
    Z.RealTimeConnection = Z.cg;
    Eh.prototype.sendRequest = Eh.prototype.Ha;
    Eh.prototype.close = Eh.prototype.close;
    Z.Cg = function(a) {
      var b = Qh.prototype.put;
      Qh.prototype.put = function(c, d, e, f) {
        p(f) && (f = a());
        b.call(this, c, d, e, f);
      };
      return function() {
        Qh.prototype.put = b;
      };
    };
    Z.hijackHash = Z.Cg;
    Z.bg = bd;
    Z.ConnectionTarget = Z.bg;
    Z.wa = function(a) {
      return a.wa();
    };
    Z.queryIdentifier = Z.wa;
    Z.Eg = function(a) {
      return a.k.Ua.ba;
    };
    Z.listens = Z.Eg;
    Z.ve = function(a) {
      a.ve();
    };
    Z.forceRestClient = Z.ve;
    function X(a, b) {
      var c,
          d,
          e;
      if (a instanceof Ii)
        c = a, d = b;
      else {
        C("new Firebase", 1, 2, arguments.length);
        d = qd(arguments[0]);
        c = d.eh;
        "firebase" === d.domain && pd(d.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
        c && "undefined" != c || pd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
        d.mb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && R("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
        c = new bd(d.host, d.mb, c, "ws" === d.scheme || "wss" === d.scheme);
        d = new O(d.oc);
        e = d.toString();
        var f;
        !(f = !q(c.host) || 0 === c.host.length || !cg(c.jc)) && (f = 0 !== e.length) && (e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), f = !(q(e) && 0 !== e.length && !ag.test(e)));
        if (f)
          throw Error(D("new Firebase", 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
        if (b)
          if (b instanceof $i)
            e = b;
          else if (q(b))
            e = $i.wb(), c.Pd = b;
          else
            throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
        else
          e = $i.wb();
        f = c.toString();
        var g = z(e.rc, f);
        g || (g = new Ii(c, e.$f), e.rc[f] = g);
        c = g;
      }
      Y.call(this, c, d, Be, !1);
      this.then = void 0;
      this["catch"] = void 0;
    }
    ka(X, Y);
    var ej = X,
        fj = ["Firebase"],
        gj = n;
    fj[0] in gj || !gj.execScript || gj.execScript("var " + fj[0]);
    for (var hj; fj.length && (hj = fj.shift()); )
      !fj.length && p(ej) ? gj[hj] = ej : gj = gj[hj] ? gj[hj] : gj[hj] = {};
    X.goOffline = function() {
      C("Firebase.goOffline", 0, 0, arguments.length);
      $i.wb().Ab();
    };
    X.goOnline = function() {
      C("Firebase.goOnline", 0, 0, arguments.length);
      $i.wb().uc();
    };
    X.enableLogging = md;
    X.ServerValue = {TIMESTAMP: {".sv": "timestamp"}};
    X.SDK_VERSION = Cb;
    X.INTERNAL = U;
    X.Context = $i;
    X.TEST_ACCESS = Z;
    X.prototype.name = function() {
      R("Firebase.name() being deprecated. Please use Firebase.key() instead.");
      C("Firebase.name", 0, 0, arguments.length);
      return this.key();
    };
    X.prototype.name = X.prototype.name;
    X.prototype.key = function() {
      C("Firebase.key", 0, 0, arguments.length);
      return this.path.e() ? null : ke(this.path);
    };
    X.prototype.key = X.prototype.key;
    X.prototype.o = function(a) {
      C("Firebase.child", 1, 1, arguments.length);
      if (fa(a))
        a = String(a);
      else if (!(a instanceof O))
        if (null === I(this.path)) {
          var b = a;
          b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
          lg("Firebase.child", b);
        } else
          lg("Firebase.child", a);
      return new X(this.k, this.path.o(a));
    };
    X.prototype.child = X.prototype.o;
    X.prototype.parent = function() {
      C("Firebase.parent", 0, 0, arguments.length);
      var a = this.path.parent();
      return null === a ? null : new X(this.k, a);
    };
    X.prototype.parent = X.prototype.parent;
    X.prototype.root = function() {
      C("Firebase.ref", 0, 0, arguments.length);
      for (var a = this; null !== a.parent(); )
        a = a.parent();
      return a;
    };
    X.prototype.root = X.prototype.root;
    X.prototype.set = function(a, b) {
      C("Firebase.set", 1, 2, arguments.length);
      mg("Firebase.set", this.path);
      eg("Firebase.set", a, this.path, !1);
      E("Firebase.set", 2, b, !0);
      var c = new A;
      this.k.Mb(this.path, a, null, B(c, b));
      return c.D;
    };
    X.prototype.set = X.prototype.set;
    X.prototype.update = function(a, b) {
      C("Firebase.update", 1, 2, arguments.length);
      mg("Firebase.update", this.path);
      if (da(a)) {
        for (var c = {},
            d = 0; d < a.length; ++d)
          c["" + d] = a[d];
        a = c;
        R("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
      }
      hg("Firebase.update", a, this.path);
      E("Firebase.update", 2, b, !0);
      c = new A;
      this.k.update(this.path, a, B(c, b));
      return c.D;
    };
    X.prototype.update = X.prototype.update;
    X.prototype.Mb = function(a, b, c) {
      C("Firebase.setWithPriority", 2, 3, arguments.length);
      mg("Firebase.setWithPriority", this.path);
      eg("Firebase.setWithPriority", a, this.path, !1);
      ig("Firebase.setWithPriority", 2, b);
      E("Firebase.setWithPriority", 3, c, !0);
      if (".length" === this.key() || ".keys" === this.key())
        throw "Firebase.setWithPriority failed: " + this.key() + " is a read-only object.";
      var d = new A;
      this.k.Mb(this.path, a, b, B(d, c));
      return d.D;
    };
    X.prototype.setWithPriority = X.prototype.Mb;
    X.prototype.remove = function(a) {
      C("Firebase.remove", 0, 1, arguments.length);
      mg("Firebase.remove", this.path);
      E("Firebase.remove", 1, a, !0);
      return this.set(null, a);
    };
    X.prototype.remove = X.prototype.remove;
    X.prototype.transaction = function(a, b, c) {
      C("Firebase.transaction", 1, 3, arguments.length);
      mg("Firebase.transaction", this.path);
      E("Firebase.transaction", 1, a, !1);
      E("Firebase.transaction", 2, b, !0);
      if (p(c) && "boolean" != typeof c)
        throw Error(D("Firebase.transaction", 3, !0) + "must be a boolean.");
      if (".length" === this.key() || ".keys" === this.key())
        throw "Firebase.transaction failed: " + this.key() + " is a read-only object.";
      "undefined" === typeof c && (c = !0);
      var d = new A;
      t(b) && Lb(d.D);
      Ri(this.k, this.path, a, function(a, c, g) {
        a ? d.reject(a) : d.resolve(new di(c, g));
        t(b) && b(a, c, g);
      }, c);
      return d.D;
    };
    X.prototype.transaction = X.prototype.transaction;
    X.prototype.Zg = function(a, b) {
      C("Firebase.setPriority", 1, 2, arguments.length);
      mg("Firebase.setPriority", this.path);
      ig("Firebase.setPriority", 1, a);
      E("Firebase.setPriority", 2, b, !0);
      var c = new A;
      this.k.Mb(this.path.o(".priority"), a, null, B(c, b));
      return c.D;
    };
    X.prototype.setPriority = X.prototype.Zg;
    X.prototype.push = function(a, b) {
      C("Firebase.push", 0, 2, arguments.length);
      mg("Firebase.push", this.path);
      eg("Firebase.push", a, this.path, !0);
      E("Firebase.push", 2, b, !0);
      var c = Ki(this.k),
          d = ff(c),
          c = this.o(d);
      if (null != a) {
        var e = this,
            f = c.set(a, b).then(function() {
              return e.o(d);
            });
        c.then = u(f.then, f);
        c["catch"] = u(f.then, f, void 0);
        t(b) && Lb(f);
      }
      return c;
    };
    X.prototype.push = X.prototype.push;
    X.prototype.jb = function() {
      mg("Firebase.onDisconnect", this.path);
      return new V(this.k, this.path);
    };
    X.prototype.onDisconnect = X.prototype.jb;
    X.prototype.O = function(a, b, c) {
      R("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");
      C("Firebase.auth", 1, 3, arguments.length);
      ng("Firebase.auth", a);
      E("Firebase.auth", 2, b, !0);
      E("Firebase.auth", 3, b, !0);
      var d = new A;
      Zg(this.k.O, a, {}, {remember: "none"}, B(d, b), c);
      return d.D;
    };
    X.prototype.auth = X.prototype.O;
    X.prototype.ge = function(a) {
      C("Firebase.unauth", 0, 1, arguments.length);
      E("Firebase.unauth", 1, a, !0);
      var b = new A;
      $g(this.k.O, B(b, a));
      return b.D;
    };
    X.prototype.unauth = X.prototype.ge;
    X.prototype.xe = function() {
      C("Firebase.getAuth", 0, 0, arguments.length);
      return this.k.O.xe();
    };
    X.prototype.getAuth = X.prototype.xe;
    X.prototype.Gg = function(a, b) {
      C("Firebase.onAuth", 1, 2, arguments.length);
      E("Firebase.onAuth", 1, a, !1);
      Ob("Firebase.onAuth", 2, b);
      this.k.O.Gb("auth_status", a, b);
    };
    X.prototype.onAuth = X.prototype.Gg;
    X.prototype.Fg = function(a, b) {
      C("Firebase.offAuth", 1, 2, arguments.length);
      E("Firebase.offAuth", 1, a, !1);
      Ob("Firebase.offAuth", 2, b);
      this.k.O.kc("auth_status", a, b);
    };
    X.prototype.offAuth = X.prototype.Fg;
    X.prototype.gg = function(a, b, c) {
      C("Firebase.authWithCustomToken", 1, 3, arguments.length);
      2 === arguments.length && Fb(b) && (c = b, b = void 0);
      ng("Firebase.authWithCustomToken", a);
      E("Firebase.authWithCustomToken", 2, b, !0);
      qg("Firebase.authWithCustomToken", 3, c, !0);
      var d = new A;
      Zg(this.k.O, a, {}, c || {}, B(d, b));
      return d.D;
    };
    X.prototype.authWithCustomToken = X.prototype.gg;
    X.prototype.hg = function(a, b, c) {
      C("Firebase.authWithOAuthPopup", 1, 3, arguments.length);
      2 === arguments.length && Fb(b) && (c = b, b = void 0);
      pg("Firebase.authWithOAuthPopup", a);
      E("Firebase.authWithOAuthPopup", 2, b, !0);
      qg("Firebase.authWithOAuthPopup", 3, c, !0);
      var d = new A;
      dh(this.k.O, a, c, B(d, b));
      return d.D;
    };
    X.prototype.authWithOAuthPopup = X.prototype.hg;
    X.prototype.ig = function(a, b, c) {
      C("Firebase.authWithOAuthRedirect", 1, 3, arguments.length);
      2 === arguments.length && Fb(b) && (c = b, b = void 0);
      pg("Firebase.authWithOAuthRedirect", a);
      E("Firebase.authWithOAuthRedirect", 2, b, !1);
      qg("Firebase.authWithOAuthRedirect", 3, c, !0);
      var d = new A,
          e = this.k.O,
          f = c,
          g = B(d, b);
      bh(e);
      var k = [Lg],
          f = yg(f);
      "anonymous" === a || "firebase" === a ? S(g, T("TRANSPORT_UNAVAILABLE")) : (ad.set("redirect_client_options", f.nd), ch(e, k, "/auth/" + a, f, g));
      return d.D;
    };
    X.prototype.authWithOAuthRedirect = X.prototype.ig;
    X.prototype.jg = function(a, b, c, d) {
      C("Firebase.authWithOAuthToken", 2, 4, arguments.length);
      3 === arguments.length && Fb(c) && (d = c, c = void 0);
      pg("Firebase.authWithOAuthToken", a);
      E("Firebase.authWithOAuthToken", 3, c, !0);
      qg("Firebase.authWithOAuthToken", 4, d, !0);
      var e = new A;
      q(b) ? (og("Firebase.authWithOAuthToken", 2, b), ah(this.k.O, a + "/token", {access_token: b}, d, B(e, c))) : (qg("Firebase.authWithOAuthToken", 2, b, !1), ah(this.k.O, a + "/token", b, d, B(e, c)));
      return e.D;
    };
    X.prototype.authWithOAuthToken = X.prototype.jg;
    X.prototype.fg = function(a, b) {
      C("Firebase.authAnonymously", 0, 2, arguments.length);
      1 === arguments.length && Fb(a) && (b = a, a = void 0);
      E("Firebase.authAnonymously", 1, a, !0);
      qg("Firebase.authAnonymously", 2, b, !0);
      var c = new A;
      ah(this.k.O, "anonymous", {}, b, B(c, a));
      return c.D;
    };
    X.prototype.authAnonymously = X.prototype.fg;
    X.prototype.kg = function(a, b, c) {
      C("Firebase.authWithPassword", 1, 3, arguments.length);
      2 === arguments.length && Fb(b) && (c = b, b = void 0);
      qg("Firebase.authWithPassword", 1, a, !1);
      rg("Firebase.authWithPassword", a, "email");
      rg("Firebase.authWithPassword", a, "password");
      E("Firebase.authWithPassword", 2, b, !0);
      qg("Firebase.authWithPassword", 3, c, !0);
      var d = new A;
      ah(this.k.O, "password", a, c, B(d, b));
      return d.D;
    };
    X.prototype.authWithPassword = X.prototype.kg;
    X.prototype.re = function(a, b) {
      C("Firebase.createUser", 1, 2, arguments.length);
      qg("Firebase.createUser", 1, a, !1);
      rg("Firebase.createUser", a, "email");
      rg("Firebase.createUser", a, "password");
      E("Firebase.createUser", 2, b, !0);
      var c = new A;
      this.k.O.re(a, B(c, b));
      return c.D;
    };
    X.prototype.createUser = X.prototype.re;
    X.prototype.Ue = function(a, b) {
      C("Firebase.removeUser", 1, 2, arguments.length);
      qg("Firebase.removeUser", 1, a, !1);
      rg("Firebase.removeUser", a, "email");
      rg("Firebase.removeUser", a, "password");
      E("Firebase.removeUser", 2, b, !0);
      var c = new A;
      this.k.O.Ue(a, B(c, b));
      return c.D;
    };
    X.prototype.removeUser = X.prototype.Ue;
    X.prototype.oe = function(a, b) {
      C("Firebase.changePassword", 1, 2, arguments.length);
      qg("Firebase.changePassword", 1, a, !1);
      rg("Firebase.changePassword", a, "email");
      rg("Firebase.changePassword", a, "oldPassword");
      rg("Firebase.changePassword", a, "newPassword");
      E("Firebase.changePassword", 2, b, !0);
      var c = new A;
      this.k.O.oe(a, B(c, b));
      return c.D;
    };
    X.prototype.changePassword = X.prototype.oe;
    X.prototype.ne = function(a, b) {
      C("Firebase.changeEmail", 1, 2, arguments.length);
      qg("Firebase.changeEmail", 1, a, !1);
      rg("Firebase.changeEmail", a, "oldEmail");
      rg("Firebase.changeEmail", a, "newEmail");
      rg("Firebase.changeEmail", a, "password");
      E("Firebase.changeEmail", 2, b, !0);
      var c = new A;
      this.k.O.ne(a, B(c, b));
      return c.D;
    };
    X.prototype.changeEmail = X.prototype.ne;
    X.prototype.We = function(a, b) {
      C("Firebase.resetPassword", 1, 2, arguments.length);
      qg("Firebase.resetPassword", 1, a, !1);
      rg("Firebase.resetPassword", a, "email");
      E("Firebase.resetPassword", 2, b, !0);
      var c = new A;
      this.k.O.We(a, B(c, b));
      return c.D;
    };
    X.prototype.resetPassword = X.prototype.We;
    module.exports = X;
  })();
})(require('buffer').Buffer, require('process'));
