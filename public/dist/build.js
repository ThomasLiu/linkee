"bundle";
(function() {
var define = System.amdDefine;
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.1",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      return true;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
    if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (document.msFullscreenElement && window.top !== window) {
      if (elem.getClientRects().length) {
        val = Math.round(elem.getBoundingClientRect()[name] * 100);
      }
    }
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }};
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          return jQuery.trim(elem.value);
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("github:components/jquery@2.2.1/jquery.js", [], function() {
      return jQuery;
    }), define("jquery", ["github:components/jquery@2.2.1/jquery.js"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

})();
(function() {
var define = System.amdDefine;
define("github:components/jquery@2.2.1.js", ["github:components/jquery@2.2.1/jquery.js"], function(main) {
  return main;
});

})();
System.registerDynamic("github:twbs/bootstrap@3.3.6/js/bootstrap.js", ["github:components/jquery@2.2.1.js"], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, "$", null);
  (function() {
    "format global";
    "deps jquery";
    "exports $";
    if (typeof jQuery === 'undefined') {
      throw new Error('Bootstrap\'s JavaScript requires jQuery');
    }
    +function($) {
      'use strict';
      var version = $.fn.jquery.split(' ')[0].split('.');
      if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3');
      }
    }(jQuery);
    +function($) {
      'use strict';
      function transitionEnd() {
        var el = document.createElement('bootstrap');
        var transEndEventNames = {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend',
          transition: 'transitionend'
        };
        for (var name in transEndEventNames) {
          if (el.style[name] !== undefined) {
            return {end: transEndEventNames[name]};
          }
        }
        return false;
      }
      $.fn.emulateTransitionEnd = function(duration) {
        var called = false;
        var $el = this;
        $(this).one('bsTransitionEnd', function() {
          called = true;
        });
        var callback = function() {
          if (!called)
            $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
      };
      $(function() {
        $.support.transition = transitionEnd();
        if (!$.support.transition)
          return;
        $.event.special.bsTransitionEnd = {
          bindType: $.support.transition.end,
          delegateType: $.support.transition.end,
          handle: function(e) {
            if ($(e.target).is(this))
              return e.handleObj.handler.apply(this, arguments);
          }
        };
      });
    }(jQuery);
    +function($) {
      'use strict';
      var dismiss = '[data-dismiss="alert"]';
      var Alert = function(el) {
        $(el).on('click', dismiss, this.close);
      };
      Alert.VERSION = '3.3.6';
      Alert.TRANSITION_DURATION = 150;
      Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $this.attr('data-target');
        if (!selector) {
          selector = $this.attr('href');
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = $(selector);
        if (e)
          e.preventDefault();
        if (!$parent.length) {
          $parent = $this.closest('.alert');
        }
        $parent.trigger(e = $.Event('close.bs.alert'));
        if (e.isDefaultPrevented())
          return;
        $parent.removeClass('in');
        function removeElement() {
          $parent.detach().trigger('closed.bs.alert').remove();
        }
        $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.alert');
          if (!data)
            $this.data('bs.alert', (data = new Alert(this)));
          if (typeof option == 'string')
            data[option].call($this);
        });
      }
      var old = $.fn.alert;
      $.fn.alert = Plugin;
      $.fn.alert.Constructor = Alert;
      $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
      };
      $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
    }(jQuery);
    +function($) {
      'use strict';
      var Button = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Button.DEFAULTS, options);
        this.isLoading = false;
      };
      Button.VERSION = '3.3.6';
      Button.DEFAULTS = {loadingText: 'loading...'};
      Button.prototype.setState = function(state) {
        var d = 'disabled';
        var $el = this.$element;
        var val = $el.is('input') ? 'val' : 'html';
        var data = $el.data();
        state += 'Text';
        if (data.resetText == null)
          $el.data('resetText', $el[val]());
        setTimeout($.proxy(function() {
          $el[val](data[state] == null ? this.options[state] : data[state]);
          if (state == 'loadingText') {
            this.isLoading = true;
            $el.addClass(d).attr(d, d);
          } else if (this.isLoading) {
            this.isLoading = false;
            $el.removeClass(d).removeAttr(d);
          }
        }, this), 0);
      };
      Button.prototype.toggle = function() {
        var changed = true;
        var $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
          var $input = this.$element.find('input');
          if ($input.prop('type') == 'radio') {
            if ($input.prop('checked'))
              changed = false;
            $parent.find('.active').removeClass('active');
            this.$element.addClass('active');
          } else if ($input.prop('type') == 'checkbox') {
            if (($input.prop('checked')) !== this.$element.hasClass('active'))
              changed = false;
            this.$element.toggleClass('active');
          }
          $input.prop('checked', this.$element.hasClass('active'));
          if (changed)
            $input.trigger('change');
        } else {
          this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
          this.$element.toggleClass('active');
        }
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.button');
          var options = typeof option == 'object' && option;
          if (!data)
            $this.data('bs.button', (data = new Button(this, options)));
          if (option == 'toggle')
            data.toggle();
          else if (option)
            data.setState(option);
        });
      }
      var old = $.fn.button;
      $.fn.button = Plugin;
      $.fn.button.Constructor = Button;
      $.fn.button.noConflict = function() {
        $.fn.button = old;
        return this;
      };
      $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('btn'))
          $btn = $btn.closest('.btn');
        Plugin.call($btn, 'toggle');
        if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]')))
          e.preventDefault();
      }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
        $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Carousel = function(element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find('.carousel-indicators');
        this.options = options;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));
        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
      };
      Carousel.VERSION = '3.3.6';
      Carousel.TRANSITION_DURATION = 600;
      Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
      };
      Carousel.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName))
          return;
        switch (e.which) {
          case 37:
            this.prev();
            break;
          case 39:
            this.next();
            break;
          default:
            return;
        }
        e.preventDefault();
      };
      Carousel.prototype.cycle = function(e) {
        e || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
        return this;
      };
      Carousel.prototype.getItemIndex = function(item) {
        this.$items = item.parent().children('.item');
        return this.$items.index(item || this.$active);
      };
      Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active);
        var willWrap = (direction == 'prev' && activeIndex === 0) || (direction == 'next' && activeIndex == (this.$items.length - 1));
        if (willWrap && !this.options.wrap)
          return active;
        var delta = direction == 'prev' ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
      };
      Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));
        if (pos > (this.$items.length - 1) || pos < 0)
          return;
        if (this.sliding)
          return this.$element.one('slid.bs.carousel', function() {
            that.to(pos);
          });
        if (activeIndex == pos)
          return this.pause().cycle();
        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
      };
      Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find('.next, .prev').length && $.support.transition) {
          this.$element.trigger($.support.transition.end);
          this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
      };
      Carousel.prototype.next = function() {
        if (this.sliding)
          return;
        return this.slide('next');
      };
      Carousel.prototype.prev = function() {
        if (this.sliding)
          return;
        return this.slide('prev');
      };
      Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active');
        var $next = next || this.getItemForDirection(type, $active);
        var isCycling = this.interval;
        var direction = type == 'next' ? 'left' : 'right';
        var that = this;
        if ($next.hasClass('active'))
          return (this.sliding = false);
        var relatedTarget = $next[0];
        var slideEvent = $.Event('slide.bs.carousel', {
          relatedTarget: relatedTarget,
          direction: direction
        });
        this.$element.trigger(slideEvent);
        if (slideEvent.isDefaultPrevented())
          return;
        this.sliding = true;
        isCycling && this.pause();
        if (this.$indicators.length) {
          this.$indicators.find('.active').removeClass('active');
          var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
          $nextIndicator && $nextIndicator.addClass('active');
        }
        var slidEvent = $.Event('slid.bs.carousel', {
          relatedTarget: relatedTarget,
          direction: direction
        });
        if ($.support.transition && this.$element.hasClass('slide')) {
          $next.addClass(type);
          $next[0].offsetWidth;
          $active.addClass(direction);
          $next.addClass(direction);
          $active.one('bsTransitionEnd', function() {
            $next.removeClass([type, direction].join(' ')).addClass('active');
            $active.removeClass(['active', direction].join(' '));
            that.sliding = false;
            setTimeout(function() {
              that.$element.trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
        } else {
          $active.removeClass('active');
          $next.addClass('active');
          this.sliding = false;
          this.$element.trigger(slidEvent);
        }
        isCycling && this.cycle();
        return this;
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.carousel');
          var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
          var action = typeof option == 'string' ? option : options.slide;
          if (!data)
            $this.data('bs.carousel', (data = new Carousel(this, options)));
          if (typeof option == 'number')
            data.to(option);
          else if (action)
            data[action]();
          else if (options.interval)
            data.pause().cycle();
        });
      }
      var old = $.fn.carousel;
      $.fn.carousel = Plugin;
      $.fn.carousel.Constructor = Carousel;
      $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
      };
      var clickHandler = function(e) {
        var href;
        var $this = $(this);
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
        if (!$target.hasClass('carousel'))
          return;
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr('data-slide-to');
        if (slideIndex)
          options.interval = false;
        Plugin.call($target, options);
        if (slideIndex) {
          $target.data('bs.carousel').to(slideIndex);
        }
        e.preventDefault();
      };
      $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
      $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
          var $carousel = $(this);
          Plugin.call($carousel, $carousel.data());
        });
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
        this.transitioning = null;
        if (this.options.parent) {
          this.$parent = this.getParent();
        } else {
          this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        }
        if (this.options.toggle)
          this.toggle();
      };
      Collapse.VERSION = '3.3.6';
      Collapse.TRANSITION_DURATION = 350;
      Collapse.DEFAULTS = {toggle: true};
      Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width');
        return hasWidth ? 'width' : 'height';
      };
      Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in'))
          return;
        var activesData;
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
        if (actives && actives.length) {
          activesData = actives.data('bs.collapse');
          if (activesData && activesData.transitioning)
            return;
        }
        var startEvent = $.Event('show.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented())
          return;
        if (actives && actives.length) {
          Plugin.call(actives, 'hide');
          activesData || actives.data('bs.collapse', null);
        }
        var dimension = this.dimension();
        this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);
        this.$trigger.removeClass('collapsed').attr('aria-expanded', true);
        this.transitioning = 1;
        var complete = function() {
          this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
          this.transitioning = 0;
          this.$element.trigger('shown.bs.collapse');
        };
        if (!$.support.transition)
          return complete.call(this);
        var scrollSize = $.camelCase(['scroll', dimension].join('-'));
        this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
      };
      Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in'))
          return;
        var startEvent = $.Event('hide.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented())
          return;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);
        this.$trigger.addClass('collapsed').attr('aria-expanded', false);
        this.transitioning = 1;
        var complete = function() {
          this.transitioning = 0;
          this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
        };
        if (!$.support.transition)
          return complete.call(this);
        this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
      };
      Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
      };
      Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
          var $element = $(element);
          this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
      };
      Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass('in');
        $element.attr('aria-expanded', isOpen);
        $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
      };
      function getTargetFromTrigger($trigger) {
        var href;
        var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
        return $(target);
      }
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.collapse');
          var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
          if (!data && options.toggle && /show|hide/.test(option))
            options.toggle = false;
          if (!data)
            $this.data('bs.collapse', (data = new Collapse(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.collapse;
      $.fn.collapse = Plugin;
      $.fn.collapse.Constructor = Collapse;
      $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
      };
      $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        if (!$this.attr('data-target'))
          e.preventDefault();
        var $target = getTargetFromTrigger($this);
        var data = $target.data('bs.collapse');
        var option = data ? 'toggle' : $this.data();
        Plugin.call($target, option);
      });
    }(jQuery);
    +function($) {
      'use strict';
      var backdrop = '.dropdown-backdrop';
      var toggle = '[data-toggle="dropdown"]';
      var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle);
      };
      Dropdown.VERSION = '3.3.6';
      function getParent($this) {
        var selector = $this.attr('data-target');
        if (!selector) {
          selector = $this.attr('href');
          selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
      }
      function clearMenus(e) {
        if (e && e.which === 3)
          return;
        $(backdrop).remove();
        $(toggle).each(function() {
          var $this = $(this);
          var $parent = getParent($this);
          var relatedTarget = {relatedTarget: this};
          if (!$parent.hasClass('open'))
            return;
          if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target))
            return;
          $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
          if (e.isDefaultPrevented())
            return;
          $this.attr('aria-expanded', 'false');
          $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
        });
      }
      Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled'))
          return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        clearMenus();
        if (!isActive) {
          if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
            $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
          }
          var relatedTarget = {relatedTarget: this};
          $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
          if (e.isDefaultPrevented())
            return;
          $this.trigger('focus').attr('aria-expanded', 'true');
          $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
        }
        return false;
      };
      Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName))
          return;
        var $this = $(this);
        e.preventDefault();
        e.stopPropagation();
        if ($this.is('.disabled, :disabled'))
          return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        if (!isActive && e.which != 27 || isActive && e.which == 27) {
          if (e.which == 27)
            $parent.find(toggle).trigger('focus');
          return $this.trigger('click');
        }
        var desc = ' li:not(.disabled):visible a';
        var $items = $parent.find('.dropdown-menu' + desc);
        if (!$items.length)
          return;
        var index = $items.index(e.target);
        if (e.which == 38 && index > 0)
          index--;
        if (e.which == 40 && index < $items.length - 1)
          index++;
        if (!~index)
          index = 0;
        $items.eq(index).trigger('focus');
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.dropdown');
          if (!data)
            $this.data('bs.dropdown', (data = new Dropdown(this)));
          if (typeof option == 'string')
            data[option].call($this);
        });
      }
      var old = $.fn.dropdown;
      $.fn.dropdown = Plugin;
      $.fn.dropdown.Constructor = Dropdown;
      $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old;
        return this;
      };
      $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation();
      }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
    }(jQuery);
    +function($) {
      'use strict';
      var Modal = function(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.modal-dialog');
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
          this.$element.find('.modal-content').load(this.options.remote, $.proxy(function() {
            this.$element.trigger('loaded.bs.modal');
          }, this));
        }
      };
      Modal.VERSION = '3.3.6';
      Modal.TRANSITION_DURATION = 300;
      Modal.BACKDROP_TRANSITION_DURATION = 150;
      Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
      };
      Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
      };
      Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget});
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented())
          return;
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('modal-open');
        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.$dialog.on('mousedown.dismiss.bs.modal', function() {
          that.$element.one('mouseup.dismiss.bs.modal', function(e) {
            if ($(e.target).is(that.$element))
              that.ignoreBackdropClick = true;
          });
        });
        this.backdrop(function() {
          var transition = $.support.transition && that.$element.hasClass('fade');
          if (!that.$element.parent().length) {
            that.$element.appendTo(that.$body);
          }
          that.$element.show().scrollTop(0);
          that.adjustDialog();
          if (transition) {
            that.$element[0].offsetWidth;
          }
          that.$element.addClass('in');
          that.enforceFocus();
          var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget});
          transition ? that.$dialog.one('bsTransitionEnd', function() {
            that.$element.trigger('focus').trigger(e);
          }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
        });
      };
      Modal.prototype.hide = function(e) {
        if (e)
          e.preventDefault();
        e = $.Event('hide.bs.modal');
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented())
          return;
        this.isShown = false;
        this.escape();
        this.resize();
        $(document).off('focusin.bs.modal');
        this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
        this.$dialog.off('mousedown.dismiss.bs.modal');
        $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
      };
      Modal.prototype.enforceFocus = function() {
        $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function(e) {
          if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
            this.$element.trigger('focus');
          }
        }, this));
      };
      Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keydown.dismiss.bs.modal', $.proxy(function(e) {
            e.which == 27 && this.hide();
          }, this));
        } else if (!this.isShown) {
          this.$element.off('keydown.dismiss.bs.modal');
        }
      };
      Modal.prototype.resize = function() {
        if (this.isShown) {
          $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
        } else {
          $(window).off('resize.bs.modal');
        }
      };
      Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
          that.$body.removeClass('modal-open');
          that.resetAdjustments();
          that.resetScrollbar();
          that.$element.trigger('hidden.bs.modal');
        });
      };
      Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
      };
      Modal.prototype.backdrop = function(callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate;
          this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);
          this.$element.on('click.dismiss.bs.modal', $.proxy(function(e) {
            if (this.ignoreBackdropClick) {
              this.ignoreBackdropClick = false;
              return;
            }
            if (e.target !== e.currentTarget)
              return;
            this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
          }, this));
          if (doAnimate)
            this.$backdrop[0].offsetWidth;
          this.$backdrop.addClass('in');
          if (!callback)
            return;
          doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in');
          var callbackRemove = function() {
            that.removeBackdrop();
            callback && callback();
          };
          $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else if (callback) {
          callback();
        }
      };
      Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
      };
      Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
          paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
      };
      Modal.prototype.resetAdjustments = function() {
        this.$element.css({
          paddingLeft: '',
          paddingRight: ''
        });
      };
      Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
          var documentElementRect = document.documentElement.getBoundingClientRect();
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
      };
      Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing)
          this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
      };
      Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', this.originalBodyPad);
      };
      Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
      };
      function Plugin(option, _relatedTarget) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.modal');
          var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
          if (!data)
            $this.data('bs.modal', (data = new Modal(this, options)));
          if (typeof option == 'string')
            data[option](_relatedTarget);
          else if (options.show)
            data.show(_relatedTarget);
        });
      }
      var old = $.fn.modal;
      $.fn.modal = Plugin;
      $.fn.modal.Constructor = Modal;
      $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
      };
      $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data());
        if ($this.is('a'))
          e.preventDefault();
        $target.one('show.bs.modal', function(showEvent) {
          if (showEvent.isDefaultPrevented())
            return;
          $target.one('hidden.bs.modal', function() {
            $this.is(':visible') && $this.trigger('focus');
          });
        });
        Plugin.call($target, option, this);
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Tooltip = function(element, options) {
        this.type = null;
        this.options = null;
        this.enabled = null;
        this.timeout = null;
        this.hoverState = null;
        this.$element = null;
        this.inState = null;
        this.init('tooltip', element, options);
      };
      Tooltip.VERSION = '3.3.6';
      Tooltip.TRANSITION_DURATION = 150;
      Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
          selector: 'body',
          padding: 0
        }
      };
      Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport));
        this.inState = {
          click: false,
          hover: false,
          focus: false
        };
        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
          throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
        }
        var triggers = this.options.trigger.split(' ');
        for (var i = triggers.length; i--; ) {
          var trigger = triggers[i];
          if (trigger == 'click') {
            this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
          } else if (trigger != 'manual') {
            var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
            var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
            this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
            this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
          }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {
          trigger: 'manual',
          selector: ''
        })) : this.fixTitle();
      };
      Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
      };
      Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.delay && typeof options.delay == 'number') {
          options.delay = {
            show: options.delay,
            hide: options.delay
          };
        }
        return options;
      };
      Tooltip.prototype.getDelegateOptions = function() {
        var options = {};
        var defaults = this.getDefaults();
        this._options && $.each(this._options, function(key, value) {
          if (defaults[key] != value)
            options[key] = value;
        });
        return options;
      };
      Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
          $(obj.currentTarget).data('bs.' + this.type, self);
        }
        if (obj instanceof $.Event) {
          self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
        }
        if (self.tip().hasClass('in') || self.hoverState == 'in') {
          self.hoverState = 'in';
          return;
        }
        clearTimeout(self.timeout);
        self.hoverState = 'in';
        if (!self.options.delay || !self.options.delay.show)
          return self.show();
        self.timeout = setTimeout(function() {
          if (self.hoverState == 'in')
            self.show();
        }, self.options.delay.show);
      };
      Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) {
          if (this.inState[key])
            return true;
        }
        return false;
      };
      Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
          $(obj.currentTarget).data('bs.' + this.type, self);
        }
        if (obj instanceof $.Event) {
          self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
        }
        if (self.isInStateTrue())
          return;
        clearTimeout(self.timeout);
        self.hoverState = 'out';
        if (!self.options.delay || !self.options.delay.hide)
          return self.hide();
        self.timeout = setTimeout(function() {
          if (self.hoverState == 'out')
            self.hide();
        }, self.options.delay.hide);
      };
      Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(e);
          var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
          if (e.isDefaultPrevented() || !inDom)
            return;
          var that = this;
          var $tip = this.tip();
          var tipId = this.getUID(this.type);
          this.setContent();
          $tip.attr('id', tipId);
          this.$element.attr('aria-describedby', tipId);
          if (this.options.animation)
            $tip.addClass('fade');
          var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
          var autoToken = /\s?auto?\s?/i;
          var autoPlace = autoToken.test(placement);
          if (autoPlace)
            placement = placement.replace(autoToken, '') || 'top';
          $tip.detach().css({
            top: 0,
            left: 0,
            display: 'block'
          }).addClass(placement).data('bs.' + this.type, this);
          this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
          this.$element.trigger('inserted.bs.' + this.type);
          var pos = this.getPosition();
          var actualWidth = $tip[0].offsetWidth;
          var actualHeight = $tip[0].offsetHeight;
          if (autoPlace) {
            var orgPlacement = placement;
            var viewportDim = this.getPosition(this.$viewport);
            placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;
            $tip.removeClass(orgPlacement).addClass(placement);
          }
          var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
          this.applyPlacement(calculatedOffset, placement);
          var complete = function() {
            var prevHoverState = that.hoverState;
            that.$element.trigger('shown.bs.' + that.type);
            that.hoverState = null;
            if (prevHoverState == 'out')
              that.leave(that);
          };
          $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
      };
      Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);
        if (isNaN(marginTop))
          marginTop = 0;
        if (isNaN(marginLeft))
          marginLeft = 0;
        offset.top += marginTop;
        offset.left += marginLeft;
        $.offset.setOffset($tip[0], $.extend({using: function(props) {
            $tip.css({
              top: Math.round(props.top),
              left: Math.round(props.left)
            });
          }}, offset), 0);
        $tip.addClass('in');
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        if (placement == 'top' && actualHeight != height) {
          offset.top = offset.top + height - actualHeight;
        }
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        if (delta.left)
          offset.left += delta.left;
        else
          offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement);
        var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
        $tip.offset(offset);
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
      };
      Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
      };
      Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
        $tip.removeClass('fade in top bottom left right');
      };
      Tooltip.prototype.hide = function(callback) {
        var that = this;
        var $tip = $(this.$tip);
        var e = $.Event('hide.bs.' + this.type);
        function complete() {
          if (that.hoverState != 'in')
            $tip.detach();
          that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
          callback && callback();
        }
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
          return;
        $tip.removeClass('in');
        $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        this.hoverState = null;
        return this;
      };
      Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
          $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
        }
      };
      Tooltip.prototype.hasContent = function() {
        return this.getTitle();
      };
      Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0];
        var isBody = el.tagName == 'BODY';
        var elRect = el.getBoundingClientRect();
        if (elRect.width == null) {
          elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
          });
        }
        var elOffset = isBody ? {
          top: 0,
          left: 0
        } : $element.offset();
        var scroll = {scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()};
        var outerDims = isBody ? {
          width: $(window).width(),
          height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
      };
      Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
          top: pos.top + pos.height,
          left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'top' ? {
          top: pos.top - actualHeight,
          left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'left' ? {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left - actualWidth
        } : {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left + pos.width
        };
      };
      Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
          top: 0,
          left: 0
        };
        if (!this.$viewport)
          return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
        var viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
          var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
          var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
          if (topEdgeOffset < viewportDimensions.top) {
            delta.top = viewportDimensions.top - topEdgeOffset;
          } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
            delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
          }
        } else {
          var leftEdgeOffset = pos.left - viewportPadding;
          var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
          if (leftEdgeOffset < viewportDimensions.left) {
            delta.left = viewportDimensions.left - leftEdgeOffset;
          } else if (rightEdgeOffset > viewportDimensions.right) {
            delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
          }
        }
        return delta;
      };
      Tooltip.prototype.getTitle = function() {
        var title;
        var $e = this.$element;
        var o = this.options;
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
        return title;
      };
      Tooltip.prototype.getUID = function(prefix) {
        do
          prefix += ~~(Math.random() * 1000000);
 while (document.getElementById(prefix));
        return prefix;
      };
      Tooltip.prototype.tip = function() {
        if (!this.$tip) {
          this.$tip = $(this.options.template);
          if (this.$tip.length != 1) {
            throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
          }
        }
        return this.$tip;
      };
      Tooltip.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'));
      };
      Tooltip.prototype.enable = function() {
        this.enabled = true;
      };
      Tooltip.prototype.disable = function() {
        this.enabled = false;
      };
      Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
      };
      Tooltip.prototype.toggle = function(e) {
        var self = this;
        if (e) {
          self = $(e.currentTarget).data('bs.' + this.type);
          if (!self) {
            self = new this.constructor(e.currentTarget, this.getDelegateOptions());
            $(e.currentTarget).data('bs.' + this.type, self);
          }
        }
        if (e) {
          self.inState.click = !self.inState.click;
          if (self.isInStateTrue())
            self.enter(self);
          else
            self.leave(self);
        } else {
          self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
        }
      };
      Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout);
        this.hide(function() {
          that.$element.off('.' + that.type).removeData('bs.' + that.type);
          if (that.$tip) {
            that.$tip.detach();
          }
          that.$tip = null;
          that.$arrow = null;
          that.$viewport = null;
        });
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.tooltip');
          var options = typeof option == 'object' && option;
          if (!data && /destroy|hide/.test(option))
            return;
          if (!data)
            $this.data('bs.tooltip', (data = new Tooltip(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.tooltip;
      $.fn.tooltip = Plugin;
      $.fn.tooltip.Constructor = Tooltip;
      $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old;
        return this;
      };
    }(jQuery);
    +function($) {
      'use strict';
      var Popover = function(element, options) {
        this.init('popover', element, options);
      };
      if (!$.fn.tooltip)
        throw new Error('Popover requires tooltip.js');
      Popover.VERSION = '3.3.6';
      Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      });
      Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
      Popover.prototype.constructor = Popover;
      Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
      };
      Popover.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        var content = this.getContent();
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
        $tip.find('.popover-content').children().detach().end()[this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'](content);
        $tip.removeClass('fade top bottom left right in');
        if (!$tip.find('.popover-title').html())
          $tip.find('.popover-title').hide();
      };
      Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
      };
      Popover.prototype.getContent = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
      };
      Popover.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'));
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.popover');
          var options = typeof option == 'object' && option;
          if (!data && /destroy|hide/.test(option))
            return;
          if (!data)
            $this.data('bs.popover', (data = new Popover(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.popover;
      $.fn.popover = Plugin;
      $.fn.popover.Constructor = Popover;
      $.fn.popover.noConflict = function() {
        $.fn.popover = old;
        return this;
      };
    }(jQuery);
    +function($) {
      'use strict';
      function ScrollSpy(element, options) {
        this.$body = $(document.body);
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
        this.selector = (this.options.target || '') + ' .nav li > a';
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
        this.refresh();
        this.process();
      }
      ScrollSpy.VERSION = '3.3.6';
      ScrollSpy.DEFAULTS = {offset: 10};
      ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
      };
      ScrollSpy.prototype.refresh = function() {
        var that = this;
        var offsetMethod = 'offset';
        var offsetBase = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        if (!$.isWindow(this.$scrollElement[0])) {
          offsetMethod = 'position';
          offsetBase = this.$scrollElement.scrollTop();
        }
        this.$body.find(this.selector).map(function() {
          var $el = $(this);
          var href = $el.data('target') || $el.attr('href');
          var $href = /^#./.test(href) && $(href);
          return ($href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]]) || null;
        }).sort(function(a, b) {
          return a[0] - b[0];
        }).each(function() {
          that.offsets.push(this[0]);
          that.targets.push(this[1]);
        });
      };
      ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
        var scrollHeight = this.getScrollHeight();
        var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
        var offsets = this.offsets;
        var targets = this.targets;
        var activeTarget = this.activeTarget;
        var i;
        if (this.scrollHeight != scrollHeight) {
          this.refresh();
        }
        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        }
        if (activeTarget && scrollTop < offsets[0]) {
          this.activeTarget = null;
          return this.clear();
        }
        for (i = offsets.length; i--; ) {
          activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
        }
      };
      ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target;
        this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
        var active = $(selector).parents('li').addClass('active');
        if (active.parent('.dropdown-menu').length) {
          active = active.closest('li.dropdown').addClass('active');
        }
        active.trigger('activate.bs.scrollspy');
      };
      ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.scrollspy');
          var options = typeof option == 'object' && option;
          if (!data)
            $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.scrollspy;
      $.fn.scrollspy = Plugin;
      $.fn.scrollspy.Constructor = ScrollSpy;
      $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old;
        return this;
      };
      $(window).on('load.bs.scrollspy.data-api', function() {
        $('[data-spy="scroll"]').each(function() {
          var $spy = $(this);
          Plugin.call($spy, $spy.data());
        });
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Tab = function(element) {
        this.element = $(element);
      };
      Tab.VERSION = '3.3.6';
      Tab.TRANSITION_DURATION = 150;
      Tab.prototype.show = function() {
        var $this = this.element;
        var $ul = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');
        if (!selector) {
          selector = $this.attr('href');
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        if ($this.parent('li').hasClass('active'))
          return;
        var $previous = $ul.find('.active:last a');
        var hideEvent = $.Event('hide.bs.tab', {relatedTarget: $this[0]});
        var showEvent = $.Event('show.bs.tab', {relatedTarget: $previous[0]});
        $previous.trigger(hideEvent);
        $this.trigger(showEvent);
        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented())
          return;
        var $target = $(selector);
        this.activate($this.closest('li'), $ul);
        this.activate($target, $target.parent(), function() {
          $previous.trigger({
            type: 'hidden.bs.tab',
            relatedTarget: $this[0]
          });
          $this.trigger({
            type: 'shown.bs.tab',
            relatedTarget: $previous[0]
          });
        });
      };
      Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);
        function next() {
          $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
          element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);
          if (transition) {
            element[0].offsetWidth;
            element.addClass('in');
          } else {
            element.removeClass('fade');
          }
          if (element.parent('.dropdown-menu').length) {
            element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
          }
          callback && callback();
        }
        $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
        $active.removeClass('in');
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.tab');
          if (!data)
            $this.data('bs.tab', (data = new Tab(this)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.tab;
      $.fn.tab = Plugin;
      $.fn.tab.Constructor = Tab;
      $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
      };
      var clickHandler = function(e) {
        e.preventDefault();
        Plugin.call($(this), 'show');
      };
      $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
    }(jQuery);
    +function($) {
      'use strict';
      var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options);
        this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
        this.$element = $(element);
        this.affixed = null;
        this.unpin = null;
        this.pinnedOffset = null;
        this.checkPosition();
      };
      Affix.VERSION = '3.3.6';
      Affix.RESET = 'affix affix-top affix-bottom';
      Affix.DEFAULTS = {
        offset: 0,
        target: window
      };
      Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop();
        var position = this.$element.offset();
        var targetHeight = this.$target.height();
        if (offsetTop != null && this.affixed == 'top')
          return scrollTop < offsetTop ? 'top' : false;
        if (this.affixed == 'bottom') {
          if (offsetTop != null)
            return (scrollTop + this.unpin <= position.top) ? false : 'bottom';
          return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom';
        }
        var initializing = this.affixed == null;
        var colliderTop = initializing ? scrollTop : position.top;
        var colliderHeight = initializing ? targetHeight : height;
        if (offsetTop != null && scrollTop <= offsetTop)
          return 'top';
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom))
          return 'bottom';
        return false;
      };
      Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
          return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass('affix');
        var scrollTop = this.$target.scrollTop();
        var position = this.$element.offset();
        return (this.pinnedOffset = position.top - scrollTop);
      };
      Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
      };
      Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible'))
          return;
        var height = this.$element.height();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        var scrollHeight = Math.max($(document).height(), $(document.body).height());
        if (typeof offset != 'object')
          offsetBottom = offsetTop = offset;
        if (typeof offsetTop == 'function')
          offsetTop = offset.top(this.$element);
        if (typeof offsetBottom == 'function')
          offsetBottom = offset.bottom(this.$element);
        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
        if (this.affixed != affix) {
          if (this.unpin != null)
            this.$element.css('top', '');
          var affixType = 'affix' + (affix ? '-' + affix : '');
          var e = $.Event(affixType + '.bs.affix');
          this.$element.trigger(e);
          if (e.isDefaultPrevented())
            return;
          this.affixed = affix;
          this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
          this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
        }
        if (affix == 'bottom') {
          this.$element.offset({top: scrollHeight - height - offsetBottom});
        }
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.affix');
          var options = typeof option == 'object' && option;
          if (!data)
            $this.data('bs.affix', (data = new Affix(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.affix;
      $.fn.affix = Plugin;
      $.fn.affix.Constructor = Affix;
      $.fn.affix.noConflict = function() {
        $.fn.affix = old;
        return this;
      };
      $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
          var $spy = $(this);
          var data = $spy.data();
          data.offset = data.offset || {};
          if (data.offsetBottom != null)
            data.offset.bottom = data.offsetBottom;
          if (data.offsetTop != null)
            data.offset.top = data.offsetTop;
          Plugin.call($spy, data);
        });
      });
    }(jQuery);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("github:twbs/bootstrap@3.3.6.js", ["github:twbs/bootstrap@3.3.6/js/bootstrap.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('github:twbs/bootstrap@3.3.6/js/bootstrap.js');
  return module.exports;
});

System.registerDynamic("app/ueditor/src/umeditor.config.js", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    (function() {
      window.UMEDITOR_HOME_URL = '/app/ueditor/src/';
      var URL = window.UMEDITOR_HOME_URL || (function() {
        function PathStack() {
          this.documentURL = self.document.URL || self.location.href;
          this.separator = '/';
          this.separatorPattern = /\\|\//g;
          this.currentDir = './';
          this.currentDirPattern = /^[.]\/]/;
          this.path = this.documentURL;
          this.stack = [];
          this.push(this.documentURL);
        }
        PathStack.isParentPath = function(path) {
          return path === '..';
        };
        PathStack.hasProtocol = function(path) {
          return !!PathStack.getProtocol(path);
        };
        PathStack.getProtocol = function(path) {
          var protocol = /^[^:]*:\/*/.exec(path);
          return protocol ? protocol[0] : null;
        };
        PathStack.prototype = {
          push: function(path) {
            this.path = path;
            update.call(this);
            parse.call(this);
            return this;
          },
          getPath: function() {
            return this + "";
          },
          toString: function() {
            return this.protocol + (this.stack.concat([''])).join(this.separator);
          }
        };
        function update() {
          var protocol = PathStack.getProtocol(this.path || '');
          if (protocol) {
            this.protocol = protocol;
            this.localSeparator = /\\|\//.exec(this.path.replace(protocol, ''))[0];
            this.stack = [];
          } else {
            protocol = /\\|\//.exec(this.path);
            protocol && (this.localSeparator = protocol[0]);
          }
        }
        function parse() {
          var parsedStack = this.path.replace(this.currentDirPattern, '');
          if (PathStack.hasProtocol(this.path)) {
            parsedStack = parsedStack.replace(this.protocol, '');
          }
          parsedStack = parsedStack.split(this.localSeparator);
          parsedStack.length = parsedStack.length - 1;
          for (var i = 0,
              tempPath,
              l = parsedStack.length,
              root = this.stack; i < l; i++) {
            tempPath = parsedStack[i];
            if (tempPath) {
              if (PathStack.isParentPath(tempPath)) {
                root.pop();
              } else {
                root.push(tempPath);
              }
            }
          }
        }
        var currentPath = document.getElementsByTagName('script');
        currentPath = currentPath[currentPath.length - 1].src;
        return new PathStack().push(currentPath) + "";
      })();
      window.UMEDITOR_CONFIG = {
        UMEDITOR_HOME_URL: URL,
        imageUrl: URL + "php/imageUp.php",
        imagePath: URL + "php/",
        imageFieldName: "upfile",
        toolbar: ['source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |', 'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize', '| justifyleft justifycenter justifyright justifyjustify |', 'link unlink | emotion image video  | map', '| horizontal print preview fullscreen', 'drafts', 'formula']
      };
    })();
  })();
  return _retrieveGlobal();
});

System.registerDynamic("app/ueditor/src/umeditor.min.js", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    (function(h) {
      function G(a, b, d) {
        var c;
        b = b.toLowerCase();
        return (c = a.__allListeners || d && (a.__allListeners = {})) && (c[b] || d && (c[b] = []));
      }
      function H(a, b, d, c, e, g) {
        c = c && a[b];
        var f;
        for (!c && (c = a[d]); !c && (f = (f || a).parentNode); ) {
          if ("BODY" == f.tagName || g && !g(f))
            return null;
          c = f[d];
        }
        return c && e && !e(c) ? H(c, b, d, !1, e) : c;
      }
      UMEDITOR_CONFIG = window.UMEDITOR_CONFIG || {};
      window.UM = {
        plugins: {},
        commands: {},
        I18N: {},
        version: "1.2.2"
      };
      var x = UM.dom = {},
          m = UM.browser = function() {
            var a = navigator.userAgent.toLowerCase(),
                b = window.opera,
                d = {
                  ie: /(msie\s|trident.*rv:)([\w.]+)/.test(a),
                  opera: !!b && b.version,
                  webkit: -1 < a.indexOf(" applewebkit/"),
                  mac: -1 < a.indexOf("macintosh"),
                  quirks: "BackCompat" == document.compatMode
                };
            d.gecko = "Gecko" == navigator.product && !d.webkit && !d.opera && !d.ie;
            var c = 0;
            if (d.ie) {
              var c = a.match(/(?:msie\s([\w.]+))/),
                  e = a.match(/(?:trident.*rv:([\w.]+))/),
                  c = c && e && c[1] && e[1] ? Math.max(1 * c[1], 1 * e[1]) : c && c[1] ? 1 * c[1] : e && e[1] ? 1 * e[1] : 0;
              d.ie11Compat = 11 == document.documentMode;
              d.ie9Compat = 9 == document.documentMode;
              d.ie8 = !!document.documentMode;
              d.ie8Compat = 8 == document.documentMode;
              d.ie7Compat = 7 == c && !document.documentMode || 7 == document.documentMode;
              d.ie6Compat = 7 > c || d.quirks;
              d.ie9above = 8 < c;
              d.ie9below = 9 > c;
            }
            d.gecko && (e = a.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), c = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
            /chrome\/(\d+\.\d)/i.test(a) && (d.chrome = +RegExp.$1);
            /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a) && !/chrome/i.test(a) && (d.safari = +(RegExp.$1 || RegExp.$2));
            d.opera && (c = parseFloat(b.version()));
            d.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
            d.version = c;
            d.isCompatible = !d.mobile && (d.ie && 6 <= c || d.gecko && 10801 <= c || d.opera && 9.5 <= c || d.air && 1 <= c || d.webkit && 522 <= c || !1);
            return d;
          }(),
          E = m.ie,
          n = UM.utils = {
            each: function(a, b, d) {
              if (null != a)
                if (a.length === +a.length)
                  for (var c = 0,
                      e = a.length; c < e; c++) {
                    if (!1 === b.call(d, a[c], c, a))
                      return !1;
                  }
                else
                  for (c in a)
                    if (a.hasOwnProperty(c) && !1 === b.call(d, a[c], c, a))
                      return !1;
            },
            makeInstance: function(a) {
              var b = new Function;
              b.prototype = a;
              a = new b;
              b.prototype = null;
              return a;
            },
            extend: function(a, b, d) {
              if (b)
                for (var c in b)
                  d && a.hasOwnProperty(c) || (a[c] = b[c]);
              return a;
            },
            extend2: function(a) {
              for (var b = arguments,
                  d = 1; d < b.length; d++) {
                var c = b[d],
                    e;
                for (e in c)
                  a.hasOwnProperty(e) || (a[e] = c[e]);
              }
              return a;
            },
            inherits: function(a, b) {
              var d = a.prototype,
                  c = n.makeInstance(b.prototype);
              n.extend(c, d, !0);
              a.prototype = c;
              return c.constructor = a;
            },
            bind: function(a, b) {
              return function() {
                return a.apply(b, arguments);
              };
            },
            defer: function(a, b, d) {
              var c;
              return function() {
                d && clearTimeout(c);
                c = setTimeout(a, b);
              };
            },
            indexOf: function(a, b, d) {
              var c = -1;
              d = this.isNumber(d) ? d : 0;
              this.each(a, function(a, g) {
                if (g >= d && a === b)
                  return c = g, !1;
              });
              return c;
            },
            removeItem: function(a, b) {
              for (var d = 0,
                  c = a.length; d < c; d++)
                a[d] === b && (a.splice(d, 1), d--);
            },
            trim: function(a) {
              return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
            },
            listToMap: function(a) {
              if (!a)
                return {};
              a = n.isArray(a) ? a : a.split(",");
              for (var b = 0,
                  d,
                  c = {}; d = a[b++]; )
                c[d.toUpperCase()] = c[d] = 1;
              return c;
            },
            unhtml: function(a, b) {
              return a ? a.replace(b || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function(a, b) {
                return b ? a : {
                  "<": "&lt;",
                  "&": "&amp;",
                  '"': "&quot;",
                  ">": "&gt;",
                  "'": "&#39;"
                }[a];
              }) : "";
            },
            html: function(a) {
              return a ? a.replace(/&((g|l|quo)t|amp|#39);/g, function(a) {
                return {
                  "&lt;": "<",
                  "&amp;": "&",
                  "&quot;": '"',
                  "&gt;": ">",
                  "&#39;": "'"
                }[a];
              }) : "";
            },
            cssStyleToDomStyle: function() {
              var a = document.createElement("div").style,
                  b = {"float": void 0 != a.cssFloat ? "cssFloat" : void 0 != a.styleFloat ? "styleFloat" : "float"};
              return function(a) {
                return b[a] || (b[a] = a.toLowerCase().replace(/-./g, function(a) {
                  return a.charAt(1).toUpperCase();
                }));
              };
            }(),
            loadFile: function() {
              function a(a, c) {
                try {
                  for (var e = 0,
                      g; g = b[e++]; )
                    if (g.doc === a && g.url == (c.src || c.href))
                      return g;
                } catch (f) {
                  return null;
                }
              }
              var b = [];
              return function(d, c, e) {
                var g = a(d, c);
                if (g)
                  g.ready ? e && e() : g.funs.push(e);
                else if (b.push({
                  doc: d,
                  url: c.src || c.href,
                  funs: [e]
                }), !d.body) {
                  e = [];
                  for (var f in c)
                    "tag" != f && e.push(f + '="' + c[f] + '"');
                  d.write("<" + c.tag + " " + e.join(" ") + " ></" + c.tag + ">");
                } else if (!c.id || !d.getElementById(c.id)) {
                  var l = d.createElement(c.tag);
                  delete c.tag;
                  for (f in c)
                    l.setAttribute(f, c[f]);
                  l.onload = l.onreadystatechange = function() {
                    if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                      g = a(d, c);
                      if (0 < g.funs.length) {
                        g.ready = 1;
                        for (var b; b = g.funs.pop(); )
                          b();
                      }
                      l.onload = l.onreadystatechange = null;
                    }
                  };
                  l.onerror = function() {
                    throw Error("The load " + (c.href || c.src) + " fails,check the url settings of file umeditor.config.js ");
                  };
                  d.getElementsByTagName("head")[0].appendChild(l);
                }
              };
            }(),
            isEmptyObject: function(a) {
              if (null == a)
                return !0;
              if (this.isArray(a) || this.isString(a))
                return 0 === a.length;
              for (var b in a)
                if (a.hasOwnProperty(b))
                  return !1;
              return !0;
            },
            fixColor: function(a, b) {
              if (/color/i.test(a) && /rgba?/.test(b)) {
                var d = b.split(",");
                if (3 < d.length)
                  return "";
                b = "#";
                for (var c = 0,
                    e; e = d[c++]; )
                  e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), b += 1 == e.length ? "0" + e : e;
                b = b.toUpperCase();
              }
              return b;
            },
            clone: function(a, b) {
              var d;
              b = b || {};
              for (var c in a)
                a.hasOwnProperty(c) && (d = a[c], "object" == typeof d ? (b[c] = n.isArray(d) ? [] : {}, n.clone(a[c], b[c])) : b[c] = d);
              return b;
            },
            transUnitToPx: function(a) {
              if (!/(pt|cm)/.test(a))
                return a;
              var b;
              a.replace(/([\d.]+)(\w+)/, function(d, c, e) {
                a = c;
                b = e;
              });
              switch (b) {
                case "cm":
                  a = 25 * parseFloat(a);
                  break;
                case "pt":
                  a = Math.round(96 * parseFloat(a) / 72);
              }
              return a + (a ? "px" : "");
            },
            cssRule: m.ie && 11 != m.version ? function(a, b, d) {
              var c;
              d = d || document;
              c = d.indexList ? d.indexList : d.indexList = {};
              var e;
              if (c[a])
                e = d.styleSheets[c[a]];
              else {
                if (void 0 === b)
                  return "";
                e = d.createStyleSheet("", d = d.styleSheets.length);
                c[a] = d;
              }
              if (void 0 === b)
                return e.cssText;
              e.cssText = b || "";
            } : function(a, b, d) {
              d = d || document;
              var c = d.getElementsByTagName("head")[0],
                  e;
              if (!(e = d.getElementById(a))) {
                if (void 0 === b)
                  return "";
                e = d.createElement("style");
                e.id = a;
                c.appendChild(e);
              }
              if (void 0 === b)
                return e.innerHTML;
              "" !== b ? e.innerHTML = b : c.removeChild(e);
            }
          };
      n.each("String Function Array Number RegExp Object".split(" "), function(a) {
        UM.utils["is" + a] = function(b) {
          return Object.prototype.toString.apply(b) == "[object " + a + "]";
        };
      });
      var I = UM.EventBase = function() {};
      I.prototype = {
        addListener: function(a, b) {
          a = n.trim(a).split(" ");
          for (var d = 0,
              c; c = a[d++]; )
            G(this, c, !0).push(b);
        },
        removeListener: function(a, b) {
          a = n.trim(a).split(" ");
          for (var d = 0,
              c; c = a[d++]; )
            n.removeItem(G(this, c) || [], b);
        },
        fireEvent: function() {
          for (var a = arguments[0],
              a = n.trim(a).split(" "),
              b = 0,
              d; d = a[b++]; ) {
            var c = G(this, d),
                e,
                g,
                f;
            if (c)
              for (f = c.length; f--; )
                if (c[f]) {
                  g = c[f].apply(this, arguments);
                  if (!0 === g)
                    return g;
                  void 0 !== g && (e = g);
                }
            if (g = this["on" + d.toLowerCase()])
              e = g.apply(this, arguments);
          }
          return e;
        }
      };
      var q = x.dtd = function() {
        function a(a) {
          for (var b in a)
            a[b.toUpperCase()] = a[b];
          return a;
        }
        var b = n.extend2,
            d = a({
              isindex: 1,
              fieldset: 1
            }),
            c = a({
              input: 1,
              button: 1,
              select: 1,
              textarea: 1,
              label: 1
            }),
            e = b(a({a: 1}), c),
            g = b({iframe: 1}, e),
            f = a({
              hr: 1,
              ul: 1,
              menu: 1,
              div: 1,
              blockquote: 1,
              noscript: 1,
              table: 1,
              center: 1,
              address: 1,
              dir: 1,
              pre: 1,
              h5: 1,
              dl: 1,
              h4: 1,
              noframes: 1,
              h6: 1,
              ol: 1,
              h1: 1,
              h3: 1,
              h2: 1
            }),
            l = a({
              ins: 1,
              del: 1,
              script: 1,
              style: 1
            }),
            u = b(a({
              b: 1,
              acronym: 1,
              bdo: 1,
              "var": 1,
              "#": 1,
              abbr: 1,
              code: 1,
              br: 1,
              i: 1,
              cite: 1,
              kbd: 1,
              u: 1,
              strike: 1,
              s: 1,
              tt: 1,
              strong: 1,
              q: 1,
              samp: 1,
              em: 1,
              dfn: 1,
              span: 1
            }), l),
            t = b(a({
              sub: 1,
              img: 1,
              embed: 1,
              object: 1,
              sup: 1,
              basefont: 1,
              map: 1,
              applet: 1,
              font: 1,
              big: 1,
              small: 1
            }), u),
            r = b(a({p: 1}), t),
            c = b(a({iframe: 1}), t, c),
            t = a({
              img: 1,
              embed: 1,
              noscript: 1,
              br: 1,
              kbd: 1,
              center: 1,
              button: 1,
              basefont: 1,
              h5: 1,
              h4: 1,
              samp: 1,
              h6: 1,
              ol: 1,
              h1: 1,
              h3: 1,
              h2: 1,
              form: 1,
              font: 1,
              "#": 1,
              select: 1,
              menu: 1,
              ins: 1,
              abbr: 1,
              label: 1,
              code: 1,
              table: 1,
              script: 1,
              cite: 1,
              input: 1,
              iframe: 1,
              strong: 1,
              textarea: 1,
              noframes: 1,
              big: 1,
              small: 1,
              span: 1,
              hr: 1,
              sub: 1,
              bdo: 1,
              "var": 1,
              div: 1,
              object: 1,
              sup: 1,
              strike: 1,
              dir: 1,
              map: 1,
              dl: 1,
              applet: 1,
              del: 1,
              isindex: 1,
              fieldset: 1,
              ul: 1,
              b: 1,
              acronym: 1,
              a: 1,
              blockquote: 1,
              i: 1,
              u: 1,
              s: 1,
              tt: 1,
              address: 1,
              q: 1,
              pre: 1,
              p: 1,
              em: 1,
              dfn: 1
            }),
            p = b(a({a: 0}), c),
            w = a({tr: 1}),
            h = a({"#": 1}),
            k = b(a({param: 1}), t),
            v = b(a({form: 1}), d, g, f, r),
            m = a({
              li: 1,
              ol: 1,
              ul: 1
            }),
            q = a({
              style: 1,
              script: 1
            }),
            B = a({
              base: 1,
              link: 1,
              meta: 1,
              title: 1
            }),
            q = b(B, q),
            D = a({
              head: 1,
              body: 1
            }),
            z = a({html: 1}),
            C = a({
              address: 1,
              blockquote: 1,
              center: 1,
              dir: 1,
              div: 1,
              dl: 1,
              fieldset: 1,
              form: 1,
              h1: 1,
              h2: 1,
              h3: 1,
              h4: 1,
              h5: 1,
              h6: 1,
              hr: 1,
              isindex: 1,
              menu: 1,
              noframes: 1,
              ol: 1,
              p: 1,
              pre: 1,
              table: 1,
              ul: 1
            }),
            x = a({
              area: 1,
              base: 1,
              basefont: 1,
              br: 1,
              col: 1,
              command: 1,
              dialog: 1,
              embed: 1,
              hr: 1,
              img: 1,
              input: 1,
              isindex: 1,
              keygen: 1,
              link: 1,
              meta: 1,
              param: 1,
              source: 1,
              track: 1,
              wbr: 1
            });
        return a({
          $nonBodyContent: b(z, D, B),
          $block: C,
          $inline: p,
          $inlineWithA: b(a({a: 1}), p),
          $body: b(a({
            script: 1,
            style: 1
          }), C),
          $cdata: a({
            script: 1,
            style: 1
          }),
          $empty: x,
          $nonChild: a({
            iframe: 1,
            textarea: 1
          }),
          $listItem: a({
            dd: 1,
            dt: 1,
            li: 1
          }),
          $list: a({
            ul: 1,
            ol: 1,
            dl: 1
          }),
          $isNotEmpty: a({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1,
            iframe: 1,
            area: 1,
            base: 1,
            col: 1,
            hr: 1,
            img: 1,
            embed: 1,
            input: 1,
            link: 1,
            meta: 1,
            param: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1
          }),
          $removeEmpty: a({
            a: 1,
            abbr: 1,
            acronym: 1,
            address: 1,
            b: 1,
            bdo: 1,
            big: 1,
            cite: 1,
            code: 1,
            del: 1,
            dfn: 1,
            em: 1,
            font: 1,
            i: 1,
            ins: 1,
            label: 1,
            kbd: 1,
            q: 1,
            s: 1,
            samp: 1,
            small: 1,
            span: 1,
            strike: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            tt: 1,
            u: 1,
            "var": 1
          }),
          $removeEmptyBlock: a({
            p: 1,
            div: 1
          }),
          $tableContent: a({
            caption: 1,
            col: 1,
            colgroup: 1,
            tbody: 1,
            td: 1,
            tfoot: 1,
            th: 1,
            thead: 1,
            tr: 1,
            table: 1
          }),
          $notTransContent: a({
            pre: 1,
            script: 1,
            style: 1,
            textarea: 1
          }),
          html: D,
          head: q,
          style: h,
          script: h,
          body: v,
          base: {},
          link: {},
          meta: {},
          title: h,
          col: {},
          tr: a({
            td: 1,
            th: 1
          }),
          img: {},
          embed: {},
          colgroup: a({
            thead: 1,
            col: 1,
            tbody: 1,
            tr: 1,
            tfoot: 1
          }),
          noscript: v,
          td: v,
          br: {},
          th: v,
          center: v,
          kbd: p,
          button: b(r, f),
          basefont: {},
          h5: p,
          h4: p,
          samp: p,
          h6: p,
          ol: m,
          h1: p,
          h3: p,
          option: h,
          h2: p,
          form: b(d, g, f, r),
          select: a({
            optgroup: 1,
            option: 1
          }),
          font: p,
          ins: p,
          menu: m,
          abbr: p,
          label: p,
          table: a({
            thead: 1,
            col: 1,
            tbody: 1,
            tr: 1,
            colgroup: 1,
            caption: 1,
            tfoot: 1
          }),
          code: p,
          tfoot: w,
          cite: p,
          li: v,
          input: {},
          iframe: v,
          strong: p,
          textarea: h,
          noframes: v,
          big: p,
          small: p,
          span: a({
            "#": 1,
            br: 1,
            b: 1,
            strong: 1,
            u: 1,
            i: 1,
            em: 1,
            sub: 1,
            sup: 1,
            strike: 1,
            span: 1
          }),
          hr: p,
          dt: p,
          sub: p,
          optgroup: a({option: 1}),
          param: {},
          bdo: p,
          "var": p,
          div: v,
          object: k,
          sup: p,
          dd: v,
          strike: p,
          area: {},
          dir: m,
          map: b(a({
            area: 1,
            form: 1,
            p: 1
          }), d, l, f),
          applet: k,
          dl: a({
            dt: 1,
            dd: 1
          }),
          del: p,
          isindex: {},
          fieldset: b(a({legend: 1}), t),
          thead: w,
          ul: m,
          acronym: p,
          b: p,
          a: b(a({a: 1}), c),
          blockquote: b(a({
            td: 1,
            tr: 1,
            tbody: 1,
            li: 1
          }), v),
          caption: p,
          i: p,
          u: p,
          tbody: w,
          s: p,
          address: b(g, r),
          tt: p,
          legend: p,
          q: p,
          pre: b(u, e),
          p: b(a({a: 1}), p),
          em: p,
          dfn: p
        });
      }(),
          J = E && 9 > m.version ? {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder"
          } : {
            tabindex: "tabIndex",
            readonly: "readOnly"
          },
          K = n.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
          k = x.domUtils = {
            NODE_ELEMENT: 1,
            NODE_DOCUMENT: 9,
            NODE_TEXT: 3,
            NODE_COMMENT: 8,
            NODE_DOCUMENT_FRAGMENT: 11,
            POSITION_IDENTICAL: 0,
            POSITION_DISCONNECTED: 1,
            POSITION_FOLLOWING: 2,
            POSITION_PRECEDING: 4,
            POSITION_IS_CONTAINED: 8,
            POSITION_CONTAINS: 16,
            fillChar: E && "6" == m.version ? "\ufeff" : "\u200b",
            keys: {
              8: 1,
              46: 1,
              16: 1,
              17: 1,
              18: 1,
              37: 1,
              38: 1,
              39: 1,
              40: 1,
              13: 1
            },
            breakParent: function(a, b) {
              var d,
                  c = a,
                  e = a,
                  g,
                  f;
              do {
                c = c.parentNode;
                g ? (d = c.cloneNode(!1), d.appendChild(g), g = d, d = c.cloneNode(!1), d.appendChild(f), f = d) : (g = c.cloneNode(!1), f = g.cloneNode(!1));
                for (; d = e.previousSibling; )
                  g.insertBefore(d, g.firstChild);
                for (; d = e.nextSibling; )
                  f.appendChild(d);
                e = c;
              } while (b !== c);
              d = b.parentNode;
              d.insertBefore(g, b);
              d.insertBefore(f, b);
              d.insertBefore(a, f);
              k.remove(b);
              return a;
            },
            trimWhiteTextNode: function(a) {
              function b(b) {
                for (var c; (c = a[b]) && 3 == c.nodeType && k.isWhitespace(c); )
                  a.removeChild(c);
              }
              b("firstChild");
              b("lastChild");
            },
            getPosition: function(a, b) {
              if (a === b)
                return 0;
              var d,
                  c = [a],
                  e = [b];
              for (d = a; d = d.parentNode; ) {
                if (d === b)
                  return 10;
                c.push(d);
              }
              for (d = b; d = d.parentNode; ) {
                if (d === a)
                  return 20;
                e.push(d);
              }
              c.reverse();
              e.reverse();
              if (c[0] !== e[0])
                return 1;
              for (d = -1; d++, c[d] === e[d]; )
                ;
              a = c[d];
              for (b = e[d]; a = a.nextSibling; )
                if (a === b)
                  return 4;
              return 2;
            },
            getNodeIndex: function(a, b) {
              for (var d = a,
                  c = 0; d = d.previousSibling; )
                b && 3 == d.nodeType ? d.nodeType != d.nextSibling.nodeType && c++ : c++;
              return c;
            },
            inDoc: function(a, b) {
              return 10 == k.getPosition(a, b);
            },
            findParent: function(a, b, d) {
              if (a && !k.isBody(a))
                for (a = d ? a : a.parentNode; a; ) {
                  if (!b || b(a) || k.isBody(a))
                    return b && !b(a) && k.isBody(a) ? null : a;
                  a = a.parentNode;
                }
              return null;
            },
            findParentByTagName: function(a, b, d, c) {
              b = n.listToMap(n.isArray(b) ? b : [b]);
              return k.findParent(a, function(a) {
                return b[a.tagName] && !(c && c(a));
              }, d);
            },
            findParents: function(a, b, d, c) {
              for (b = b && (d && d(a) || !d) ? [a] : []; a = k.findParent(a, d); )
                b.push(a);
              return c ? b : b.reverse();
            },
            insertAfter: function(a, b) {
              return a.parentNode.insertBefore(b, a.nextSibling);
            },
            remove: function(a, b) {
              var d = a.parentNode,
                  c;
              if (d) {
                if (b && a.hasChildNodes())
                  for (; c = a.firstChild; )
                    d.insertBefore(c, a);
                d.removeChild(a);
              }
              return a;
            },
            getNextDomNode: function(a, b, d, c) {
              return H(a, "firstChild", "nextSibling", b, d, c);
            },
            getPreDomNode: function(a, b, d, c) {
              return H(a, "lastChild", "previousSibling", b, d, c);
            },
            isBookmarkNode: function(a) {
              return 1 == a.nodeType && a.id && /^_baidu_bookmark_/i.test(a.id);
            },
            getWindow: function(a) {
              a = a.ownerDocument || a;
              return a.defaultView || a.parentWindow;
            },
            getCommonAncestor: function(a, b) {
              if (a === b)
                return a;
              for (var d = [a],
                  c = [b],
                  e = a,
                  g = -1; e = e.parentNode; ) {
                if (e === b)
                  return e;
                d.push(e);
              }
              for (e = b; e = e.parentNode; ) {
                if (e === a)
                  return e;
                c.push(e);
              }
              d.reverse();
              for (c.reverse(); g++, d[g] === c[g]; )
                ;
              return 0 == g ? null : d[g - 1];
            },
            clearEmptySibling: function(a, b, d) {
              function c(a, b) {
                for (var c; a && !k.isBookmarkNode(a) && (k.isEmptyInlineElement(a) || !(new RegExp("[^\t\n\r" + k.fillChar + "]")).test(a.nodeValue)); )
                  c = a[b], k.remove(a), a = c;
              }
              !b && c(a.nextSibling, "nextSibling");
              !d && c(a.previousSibling, "previousSibling");
            },
            split: function(a, b) {
              var d = a.ownerDocument;
              if (m.ie && b == a.nodeValue.length) {
                var c = d.createTextNode("");
                return k.insertAfter(a, c);
              }
              c = a.splitText(b);
              m.ie8 && (d = d.createTextNode(""), k.insertAfter(c, d), k.remove(d));
              return c;
            },
            isWhitespace: function(a) {
              return !(new RegExp("[^ \t\n\r" + k.fillChar + "]")).test(a.nodeValue);
            },
            getXY: function(a) {
              for (var b = 0,
                  d = 0; a.offsetParent; )
                d += a.offsetTop, b += a.offsetLeft, a = a.offsetParent;
              return {
                x: b,
                y: d
              };
            },
            isEmptyInlineElement: function(a) {
              if (1 != a.nodeType || !q.$removeEmpty[a.tagName])
                return 0;
              for (a = a.firstChild; a; ) {
                if (k.isBookmarkNode(a) || 1 == a.nodeType && !k.isEmptyInlineElement(a) || 3 == a.nodeType && !k.isWhitespace(a))
                  return 0;
                a = a.nextSibling;
              }
              return 1;
            },
            isBlockElm: function(a) {
              return 1 == a.nodeType && (q.$block[a.tagName] || K[k.getComputedStyle(a, "display")]) && !q.$nonChild[a.tagName];
            },
            getElementsByTagName: function(a, b, d) {
              if (d && n.isString(d)) {
                var c = d;
                d = function(a) {
                  var b = !1;
                  h.each(n.trim(c).replace(/[ ]{2,}/g, " ").split(" "), function(l, c) {
                    if (h(a).hasClass(c))
                      return b = !0, !1;
                  });
                  return b;
                };
              }
              b = n.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
              for (var e = [],
                  g = 0,
                  f; f = b[g++]; ) {
                f = a.getElementsByTagName(f);
                for (var l = 0,
                    u; u = f[l++]; )
                  d && !d(u) || e.push(u);
              }
              return e;
            },
            unSelectable: E && m.ie9below || m.opera ? function(a) {
              a.onselectstart = function() {
                return !1;
              };
              a.onclick = a.onkeyup = a.onkeydown = function() {
                return !1;
              };
              a.unselectable = "on";
              a.setAttribute("unselectable", "on");
              for (var b = 0,
                  d; d = a.all[b++]; )
                switch (d.tagName.toLowerCase()) {
                  case "iframe":
                  case "textarea":
                  case "input":
                  case "select":
                    break;
                  default:
                    d.unselectable = "on", a.setAttribute("unselectable", "on");
                }
            } : function(a) {
              a.style.MozUserSelect = a.style.webkitUserSelect = a.style.msUserSelect = a.style.KhtmlUserSelect = "none";
            },
            removeAttributes: function(a, b) {
              b = n.isArray(b) ? b : n.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
              for (var d = 0,
                  c; c = b[d++]; ) {
                c = J[c] || c;
                switch (c) {
                  case "className":
                    a[c] = "";
                    break;
                  case "style":
                    a.style.cssText = "", !m.ie && a.removeAttributeNode(a.getAttributeNode("style"));
                }
                a.removeAttribute(c);
              }
            },
            createElement: function(a, b, d) {
              return k.setAttributes(a.createElement(b), d);
            },
            setAttributes: function(a, b) {
              for (var d in b)
                if (b.hasOwnProperty(d)) {
                  var c = b[d];
                  switch (d) {
                    case "class":
                      a.className = c;
                      break;
                    case "style":
                      a.style.cssText = a.style.cssText + ";" + c;
                      break;
                    case "innerHTML":
                      a[d] = c;
                      break;
                    case "value":
                      a.value = c;
                      break;
                    default:
                      a.setAttribute(J[d] || d, c);
                  }
                }
              return a;
            },
            getComputedStyle: function(a, b) {
              return n.transUnitToPx(n.fixColor(b, h(a).css(b)));
            },
            preventDefault: function(a) {
              a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            },
            removeStyle: function(a, b) {
              m.ie ? ("color" == b && (b = "(^|;)" + b), a.style.cssText = a.style.cssText.replace(new RegExp(b + "[^:]*:[^;]+;?", "ig"), "")) : a.style.removeProperty ? a.style.removeProperty(b) : a.style.removeAttribute(n.cssStyleToDomStyle(b));
              a.style.cssText || k.removeAttributes(a, ["style"]);
            },
            getStyle: function(a, b) {
              var d = a.style[n.cssStyleToDomStyle(b)];
              return n.fixColor(b, d);
            },
            setStyle: function(a, b, d) {
              a.style[n.cssStyleToDomStyle(b)] = d;
              n.trim(a.style.cssText) || this.removeAttributes(a, "style");
            },
            removeDirtyAttr: function(a) {
              for (var b = 0,
                  d,
                  c = a.getElementsByTagName("*"); d = c[b++]; )
                d.removeAttribute("_moz_dirty");
              a.removeAttribute("_moz_dirty");
            },
            getChildCount: function(a, b) {
              var d = 0,
                  c = a.firstChild;
              for (b = b || function() {
                return 1;
              }; c; )
                b(c) && d++, c = c.nextSibling;
              return d;
            },
            isEmptyNode: function(a) {
              return !a.firstChild || 0 == k.getChildCount(a, function(a) {
                return !k.isBr(a) && !k.isBookmarkNode(a) && !k.isWhitespace(a);
              });
            },
            isBr: function(a) {
              return 1 == a.nodeType && "BR" == a.tagName;
            },
            isFillChar: function(a, b) {
              return 3 == a.nodeType && !a.nodeValue.replace(new RegExp((b ? "^" : "") + k.fillChar), "").length;
            },
            isEmptyBlock: function(a, b) {
              if (1 != a.nodeType)
                return 0;
              b = b || new RegExp("[ \t\r\n" + k.fillChar + "]", "g");
              if (0 < a[m.ie ? "innerText" : "textContent"].replace(b, "").length)
                return 0;
              for (var d in q.$isNotEmpty)
                if (a.getElementsByTagName(d).length)
                  return 0;
              return 1;
            },
            isCustomeNode: function(a) {
              return 1 == a.nodeType && a.getAttribute("_ue_custom_node_");
            },
            fillNode: function(a, b) {
              var d = m.ie ? a.createTextNode(k.fillChar) : a.createElement("br");
              b.innerHTML = "";
              b.appendChild(d);
            },
            isBoundaryNode: function(a, b) {
              for (var d; !k.isBody(a); )
                if (d = a, a = a.parentNode, d !== a[b])
                  return !1;
              return !0;
            },
            isFillChar: function(a, b) {
              return 3 == a.nodeType && !a.nodeValue.replace(new RegExp((b ? "^" : "") + k.fillChar), "").length;
            },
            isBody: function(a) {
              return h(a).hasClass("edui-body-container");
            }
          },
          F = new RegExp(k.fillChar, "g");
      (function() {
        function a(a, b, c, f) {
          1 == b.nodeType && (q.$empty[b.tagName] || q.$nonChild[b.tagName]) && (c = k.getNodeIndex(b) + (a ? 0 : 1), b = b.parentNode);
          a ? (f.startContainer = b, f.startOffset = c, f.endContainer || f.collapse(!0)) : (f.endContainer = b, f.endOffset = c, f.startContainer || f.collapse(!1));
          f.collapsed = f.startContainer && f.endContainer && f.startContainer === f.endContainer && f.startOffset == f.endOffset;
          return f;
        }
        function b(a, b) {
          try {
            if (g && k.inDoc(g, a))
              if (g.nodeValue.replace(F, "").length)
                g.nodeValue = g.nodeValue.replace(F, "");
              else {
                var c = g.parentNode;
                for (k.remove(g); c && k.isEmptyInlineElement(c) && (m.safari ? !(k.getPosition(c, b) & k.POSITION_CONTAINS) : !c.contains(b)); )
                  g = c.parentNode, k.remove(c), c = g;
              }
          } catch (f) {}
        }
        function d(a, b) {
          var c;
          for (a = a[b]; a && k.isFillChar(a); )
            c = a[b], k.remove(a), a = c;
        }
        var c = 0,
            e = k.fillChar,
            g,
            f = x.Range = function(a, b) {
              this.startContainer = this.startOffset = this.endContainer = this.endOffset = null;
              this.document = a;
              this.collapsed = !0;
              this.body = b;
            };
        f.prototype = {
          deleteContents: function() {
            var a;
            if (!this.collapsed) {
              a = this.startContainer;
              var b = this.endContainer,
                  c = this.startOffset,
                  f = this.endOffset,
                  d = this.document,
                  e = d.createDocumentFragment(),
                  g,
                  h;
              1 == a.nodeType && (a = a.childNodes[c] || (g = a.appendChild(d.createTextNode(""))));
              1 == b.nodeType && (b = b.childNodes[f] || (h = b.appendChild(d.createTextNode(""))));
              if (a === b && 3 == a.nodeType)
                e.appendChild(d.createTextNode(a.substringData(c, f - c))), a.deleteData(c, f - c), this.collapse(!0);
              else {
                for (var v,
                    n,
                    q = e,
                    B = k.findParents(a, !0),
                    D = k.findParents(b, !0),
                    z = 0; B[z] == D[z]; )
                  z++;
                for (var C = z,
                    x; x = B[C]; C++) {
                  v = x.nextSibling;
                  x == a ? g || (3 == this.startContainer.nodeType ? (q.appendChild(d.createTextNode(a.nodeValue.slice(c))), a.deleteData(c, a.nodeValue.length - c)) : q.appendChild(a)) : (n = x.cloneNode(!1), q.appendChild(n));
                  for (; v && v !== b && v !== D[C]; )
                    x = v.nextSibling, q.appendChild(v), v = x;
                  q = n;
                }
                q = e;
                B[z] || (q.appendChild(B[z - 1].cloneNode(!1)), q = q.firstChild);
                for (C = z; c = D[C]; C++) {
                  v = c.previousSibling;
                  c == b ? h || 3 != this.endContainer.nodeType || (q.appendChild(d.createTextNode(b.substringData(0, f))), b.deleteData(0, f)) : (n = c.cloneNode(!1), q.appendChild(n));
                  if (C != z || !B[z])
                    for (; v && v !== a; )
                      c = v.previousSibling, q.insertBefore(v, q.firstChild), v = c;
                  q = n;
                }
                this.setStartBefore(D[z] ? B[z] ? D[z] : B[z - 1] : D[z - 1]).collapse(!0);
                g && k.remove(g);
                h && k.remove(h);
              }
            }
            m.webkit && (a = this.startContainer, 3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0), k.remove(a)));
            return this;
          },
          inFillChar: function() {
            var a = this.startContainer;
            return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(new RegExp("^" + k.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1;
          },
          setStart: function(b, c) {
            return a(!0, b, c, this);
          },
          setEnd: function(b, c) {
            return a(!1, b, c, this);
          },
          setStartAfter: function(a) {
            return this.setStart(a.parentNode, k.getNodeIndex(a) + 1);
          },
          setStartBefore: function(a) {
            return this.setStart(a.parentNode, k.getNodeIndex(a));
          },
          setEndAfter: function(a) {
            return this.setEnd(a.parentNode, k.getNodeIndex(a) + 1);
          },
          setEndBefore: function(a) {
            return this.setEnd(a.parentNode, k.getNodeIndex(a));
          },
          setStartAtFirst: function(a) {
            return this.setStart(a, 0);
          },
          setStartAtLast: function(a) {
            return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length);
          },
          setEndAtFirst: function(a) {
            return this.setEnd(a, 0);
          },
          setEndAtLast: function(a) {
            return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length);
          },
          selectNode: function(a) {
            return this.setStartBefore(a).setEndAfter(a);
          },
          selectNodeContents: function(a) {
            return this.setStart(a, 0).setEndAtLast(a);
          },
          cloneRange: function() {
            return (new f(this.document)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset);
          },
          collapse: function(a) {
            a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) : (this.startContainer = this.endContainer, this.startOffset = this.endOffset);
            this.collapsed = !0;
            return this;
          },
          shrinkBoundary: function(a) {
            function b(a) {
              return 1 == a.nodeType && !k.isBookmarkNode(a) && !q.$empty[a.tagName] && !q.$nonChild[a.tagName];
            }
            for (var c,
                f = this.collapsed; 1 == this.startContainer.nodeType && (c = this.startContainer.childNodes[this.startOffset]) && b(c); )
              this.setStart(c, 0);
            if (f)
              return this.collapse(!0);
            if (!a)
              for (; 1 == this.endContainer.nodeType && 0 < this.endOffset && (c = this.endContainer.childNodes[this.endOffset - 1]) && b(c); )
                this.setEnd(c, c.childNodes.length);
            return this;
          },
          trimBoundary: function(a) {
            this.txtToElmBoundary();
            var b = this.startContainer,
                c = this.startOffset,
                f = this.collapsed,
                d = this.endContainer;
            if (3 == b.nodeType) {
              if (0 == c)
                this.setStartBefore(b);
              else if (c >= b.nodeValue.length)
                this.setStartAfter(b);
              else {
                var e = k.split(b, c);
                b === d ? this.setEnd(e, this.endOffset - c) : b.parentNode === d && (this.endOffset += 1);
                this.setStartBefore(e);
              }
              if (f)
                return this.collapse(!0);
            }
            a || (c = this.endOffset, d = this.endContainer, 3 == d.nodeType && (0 == c ? this.setEndBefore(d) : (c < d.nodeValue.length && k.split(d, c), this.setEndAfter(d))));
            return this;
          },
          txtToElmBoundary: function(a) {
            function b(a, c) {
              var l = a[c + "Container"],
                  f = a[c + "Offset"];
              if (3 == l.nodeType)
                if (!f)
                  a["set" + c.replace(/(\w)/, function(a) {
                    return a.toUpperCase();
                  }) + "Before"](l);
                else if (f >= l.nodeValue.length)
                  a["set" + c.replace(/(\w)/, function(a) {
                    return a.toUpperCase();
                  }) + "After"](l);
            }
            if (a || !this.collapsed)
              b(this, "start"), b(this, "end");
            return this;
          },
          insertNode: function(a) {
            var b = a,
                c = 1;
            11 == a.nodeType && (b = a.firstChild, c = a.childNodes.length);
            this.trimBoundary(!0);
            var f = this.startContainer,
                d = f.childNodes[this.startOffset];
            d ? f.insertBefore(a, d) : f.appendChild(a);
            b.parentNode === this.endContainer && (this.endOffset += c);
            return this.setStartBefore(b);
          },
          setCursor: function(a, b) {
            return this.collapse(!a).select(b);
          },
          createBookmark: function(a, b) {
            var f,
                d = this.document.createElement("span");
            d.style.cssText = "display:none;line-height:0px;";
            d.appendChild(this.document.createTextNode("\u200d"));
            d.id = "_baidu_bookmark_start_" + (b ? "" : c++);
            this.collapsed || (f = d.cloneNode(!0), f.id = "_baidu_bookmark_end_" + (b ? "" : c++));
            this.insertNode(d);
            f && this.collapse().insertNode(f).setEndBefore(f);
            this.setStartAfter(d);
            return {
              start: a ? d.id : d,
              end: f ? a ? f.id : f : null,
              id: a
            };
          },
          moveToBookmark: function(a) {
            var b = a.id ? this.document.getElementById(a.start) : a.start;
            a = a.end && a.id ? this.document.getElementById(a.end) : a.end;
            this.setStartBefore(b);
            k.remove(b);
            a ? (this.setEndBefore(a), k.remove(a)) : this.collapse(!0);
            return this;
          },
          adjustmentBoundary: function() {
            if (!this.collapsed) {
              for (; !k.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length; )
                this.setStartAfter(this.startContainer);
              for (; !k.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length; )
                this.setEndBefore(this.endContainer);
            }
            return this;
          },
          getClosedNode: function() {
            var a;
            if (!this.collapsed) {
              var b = this.cloneRange().adjustmentBoundary().shrinkBoundary();
              b.collapsed || 1 != b.startContainer.nodeType || b.startContainer !== b.endContainer || 1 != b.endOffset - b.startOffset || (b = b.startContainer.childNodes[b.startOffset]) && 1 == b.nodeType && (q.$empty[b.tagName] || q.$nonChild[b.tagName]) && (a = b);
            }
            return a;
          },
          select: m.ie ? function(a, c) {
            var f;
            this.collapsed || this.shrinkBoundary();
            var r = this.getClosedNode();
            if (r && !c) {
              try {
                f = this.document.body.createControlRange(), f.addElement(r), f.select();
              } catch (h) {}
              return this;
            }
            var r = this.createBookmark(),
                p = r.start;
            f = this.document.body.createTextRange();
            f.moveToElementText(p);
            f.moveStart("character", 1);
            if (!this.collapsed) {
              var w = this.document.body.createTextRange(),
                  p = r.end;
              w.moveToElementText(p);
              f.setEndPoint("EndToEnd", w);
            } else if (!a && 3 != this.startContainer.nodeType) {
              var w = this.document.createTextNode(e),
                  y = this.document.createElement("span");
              y.appendChild(this.document.createTextNode(e));
              p.parentNode.insertBefore(y, p);
              p.parentNode.insertBefore(w, p);
              b(this.document, w);
              g = w;
              d(y, "previousSibling");
              d(p, "nextSibling");
              f.moveStart("character", -1);
              f.collapse(!0);
            }
            this.moveToBookmark(r);
            y && k.remove(y);
            try {
              f.select();
            } catch (h) {}
            return this;
          } : function(a) {
            function c(a) {
              function b(c, f, d) {
                3 == c.nodeType && c.nodeValue.length < f && (a[d + "Offset"] = c.nodeValue.length);
              }
              b(a.startContainer, a.startOffset, "start");
              b(a.endContainer, a.endOffset, "end");
            }
            var f = k.getWindow(this.document),
                r = f.getSelection();
            m.gecko ? this.body.focus() : f.focus();
            if (r) {
              r.removeAllRanges();
              this.collapsed && !a && (a = f = this.startContainer, 1 == f.nodeType && (a = f.childNodes[this.startOffset]), 3 == f.nodeType && this.startOffset || (a ? a.previousSibling && 3 == a.previousSibling.nodeType : f.lastChild && 3 == f.lastChild.nodeType) || (a = this.document.createTextNode(e), this.insertNode(a), b(this.document, a), d(a, "previousSibling"), d(a, "nextSibling"), g = a, this.setStart(a, m.webkit ? 1 : 0).collapse(!0)));
              f = this.document.createRange();
              if (this.collapsed && m.opera && 1 == this.startContainer.nodeType)
                if (a = this.startContainer.childNodes[this.startOffset]) {
                  for (; a && k.isBlockElm(a); )
                    if (1 == a.nodeType && a.childNodes[0])
                      a = a.childNodes[0];
                    else
                      break;
                  a && this.setStartBefore(a).collapse(!0);
                } else
                  (a = this.startContainer.lastChild) && k.isBr(a) && this.setStartBefore(a).collapse(!0);
              c(this);
              f.setStart(this.startContainer, this.startOffset);
              f.setEnd(this.endContainer, this.endOffset);
              r.addRange(f);
            }
            return this;
          },
          createAddress: function(a, b) {
            function c(a) {
              for (var f = a ? d.startContainer : d.endContainer,
                  l = k.findParents(f, !0, function(a) {
                    return !k.isBody(a);
                  }),
                  e = [],
                  g = 0,
                  r; r = l[g++]; )
                e.push(k.getNodeIndex(r, b));
              l = 0;
              if (b)
                if (3 == f.nodeType) {
                  for (f = f.previousSibling; f && 3 == f.nodeType; )
                    l += f.nodeValue.replace(F, "").length, f = f.previousSibling;
                  l += a ? d.startOffset : d.endOffset;
                } else if (f = f.childNodes[a ? d.startOffset : d.endOffset])
                  l = k.getNodeIndex(f, b);
                else
                  for (f = a ? d.startContainer : d.endContainer, a = f.firstChild; a; )
                    if (k.isFillChar(a))
                      a = a.nextSibling;
                    else if (l++, 3 == a.nodeType)
                      for (; a && 3 == a.nodeType; )
                        a = a.nextSibling;
                    else
                      a = a.nextSibling;
              else
                l = a ? k.isFillChar(f) ? 0 : d.startOffset : d.endOffset;
              0 > l && (l = 0);
              e.push(l);
              return e;
            }
            var f = {},
                d = this;
            f.startAddress = c(!0);
            a || (f.endAddress = d.collapsed ? [].concat(f.startAddress) : c());
            return f;
          },
          moveToAddress: function(a, b) {
            function c(a, b) {
              for (var d = f.body,
                  l,
                  e,
                  g = 0,
                  u,
                  t = a.length; g < t; g++)
                if (u = a[g], l = d, d = d.childNodes[u], !d) {
                  e = u;
                  break;
                }
              b ? d ? f.setStartBefore(d) : f.setStart(l, e) : d ? f.setEndBefore(d) : f.setEnd(l, e);
            }
            var f = this;
            c(a.startAddress, !0);
            !b && a.endAddress && c(a.endAddress);
            return f;
          },
          equals: function(a) {
            for (var b in this)
              if (this.hasOwnProperty(b) && this[b] !== a[b])
                return !1;
            return !0;
          },
          scrollIntoView: function() {
            var a = h('<span style="padding:0;margin:0;display:block;border:0">&nbsp;</span>');
            this.cloneRange().insertNode(a.get(0));
            var b = h(window).scrollTop(),
                c = h(window).height(),
                f = a.offset().top;
            if (f < b - c || f > b + c)
              f > b + c ? window.scrollTo(0, f - c + a.height()) : window.scrollTo(0, b - f);
            a.remove();
          },
          getOffset: function() {
            var a = this.createBookmark(),
                b = h(a.start).css("display", "inline-block").offset();
            this.moveToBookmark(a);
            return b;
          }
        };
      })();
      (function() {
        function a(a, b) {
          var d = k.getNodeIndex;
          a = a.duplicate();
          a.collapse(b);
          var f = a.parentElement();
          if (!f.hasChildNodes())
            return {
              container: f,
              offset: 0
            };
          for (var l = f.children,
              u,
              t = a.duplicate(),
              r = 0,
              h = l.length - 1,
              w = -1; r <= h; ) {
            w = Math.floor((r + h) / 2);
            u = l[w];
            t.moveToElementText(u);
            var y = t.compareEndPoints("StartToStart", a);
            if (0 < y)
              h = w - 1;
            else if (0 > y)
              r = w + 1;
            else
              return {
                container: f,
                offset: d(u)
              };
          }
          if (-1 == w) {
            t.moveToElementText(f);
            t.setEndPoint("StartToStart", a);
            t = t.text.replace(/(\r\n|\r)/g, "\n").length;
            l = f.childNodes;
            if (!t)
              return u = l[l.length - 1], {
                container: u,
                offset: u.nodeValue.length
              };
            for (d = l.length; 0 < t; )
              t -= l[--d].nodeValue.length;
            return {
              container: l[d],
              offset: -t
            };
          }
          t.collapse(0 < y);
          t.setEndPoint(0 < y ? "StartToStart" : "EndToStart", a);
          t = t.text.replace(/(\r\n|\r)/g, "\n").length;
          if (!t)
            return q.$empty[u.tagName] || q.$nonChild[u.tagName] ? {
              container: f,
              offset: d(u) + (0 < y ? 0 : 1)
            } : {
              container: u,
              offset: 0 < y ? 0 : u.childNodes.length
            };
          for (; 0 < t; )
            try {
              l = u, u = u[0 < y ? "previousSibling" : "nextSibling"], t -= u.nodeValue.length;
            } catch (A) {
              return {
                container: f,
                offset: d(l)
              };
            }
          return {
            container: u,
            offset: 0 < y ? -t : u.nodeValue.length + t
          };
        }
        function b(b, d) {
          if (b.item)
            d.selectNode(b.item(0));
          else {
            var g = a(b, !0);
            d.setStart(g.container, g.offset);
            0 != b.compareEndPoints("StartToEnd", b) && (g = a(b, !1), d.setEnd(g.container, g.offset));
          }
          return d;
        }
        function d(a, b) {
          var d;
          try {
            d = a.getNative(b).createRange();
          } catch (l) {
            return null;
          }
          var f = d.item ? d.item(0) : d.parentElement();
          return (f.ownerDocument || f) === a.document ? d : null;
        }
        (x.Selection = function(a, b) {
          var g = this;
          g.document = a;
          g.body = b;
          if (m.ie9below)
            h(b).on("beforedeactivate", function() {
              g._bakIERange = g.getIERange();
            }).on("activate", function() {
              try {
                var a = d(g);
                a && g.rangeInBody(a) || !g._bakIERange || g._bakIERange.select();
              } catch (b) {}
              g._bakIERange = null;
            });
        }).prototype = {
          hasNativeRange: function() {
            var a;
            if (!m.ie || m.ie9above) {
              a = this.getNative();
              if (!a.rangeCount)
                return !1;
              a = a.getRangeAt(0);
            } else
              a = d(this);
            return this.rangeInBody(a);
          },
          getNative: function(a) {
            var b = this.document;
            try {
              return b ? m.ie9below || a ? b.selection : k.getWindow(b).getSelection() : null;
            } catch (d) {
              return null;
            }
          },
          getIERange: function(a) {
            var b = d(this, a);
            return b && this.rangeInBody(b, a) || !this._bakIERange ? b : this._bakIERange;
          },
          rangeInBody: function(a, b) {
            var d = m.ie9below || b ? a.item ? a.item() : a.parentElement() : a.startContainer;
            return d === this.body || k.inDoc(d, this.body);
          },
          cache: function() {
            this.clear();
            this._cachedRange = this.getRange();
            this._cachedStartElement = this.getStart();
            this._cachedStartElementPath = this.getStartElementPath();
          },
          getStartElementPath: function() {
            if (this._cachedStartElementPath)
              return this._cachedStartElementPath;
            var a = this.getStart();
            return a ? k.findParents(a, !0, null, !0) : [];
          },
          clear: function() {
            this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
          },
          isFocus: function() {
            return this.hasNativeRange();
          },
          getRange: function() {
            function a(b) {
              for (var c = d.body.firstChild,
                  f = b.collapsed; c && c.firstChild; )
                b.setStart(c, 0), c = c.firstChild;
              b.startContainer || b.setStart(d.body, 0);
              f && b.collapse(!0);
            }
            var d = this;
            if (null != d._cachedRange)
              return this._cachedRange;
            var g = new x.Range(d.document, d.body);
            if (m.ie9below) {
              var f = d.getIERange();
              if (f && this.rangeInBody(f))
                try {
                  b(f, g);
                } catch (u) {
                  a(g);
                }
              else
                a(g);
            } else {
              var l = d.getNative();
              if (l && l.rangeCount && d.rangeInBody(l.getRangeAt(0)))
                f = l.getRangeAt(0), l = l.getRangeAt(l.rangeCount - 1), g.setStart(f.startContainer, f.startOffset).setEnd(l.endContainer, l.endOffset), g.collapsed && k.isBody(g.startContainer) && !g.startOffset && a(g);
              else {
                if (this._bakRange && (this._bakRange.startContainer === this.body || k.inDoc(this._bakRange.startContainer, this.body)))
                  return this._bakRange;
                a(g);
              }
            }
            return this._bakRange = g;
          },
          getStart: function() {
            if (this._cachedStartElement)
              return this._cachedStartElement;
            var a = m.ie9below ? this.getIERange() : this.getRange(),
                b,
                d;
            if (m.ie9below) {
              if (!a)
                return this.document.body.firstChild;
              if (a.item)
                return a.item(0);
              b = a.duplicate();
              0 < b.text.length && b.moveStart("character", 1);
              b.collapse(1);
              b = b.parentElement();
              for (d = a = a.parentElement(); a = a.parentNode; )
                if (a == b) {
                  b = d;
                  break;
                }
            } else if (b = a.startContainer, 1 == b.nodeType && b.hasChildNodes() && (b = b.childNodes[Math.min(b.childNodes.length - 1, a.startOffset)]), 3 == b.nodeType)
              return b.parentNode;
            return b;
          },
          getText: function() {
            var a;
            return this.isFocus() && (a = this.getNative()) ? (a = m.ie9below ? a.createRange() : a.getRangeAt(0), m.ie9below ? a.text : a.toString()) : "";
          }
        };
      })();
      (function() {
        function a(a, b) {
          var c;
          if (b.textarea)
            if (n.isString(b.textarea))
              for (var d = 0,
                  e,
                  g = k.getElementsByTagName(a, "textarea"); e = g[d++]; ) {
                if (e.id == "umeditor_textarea_" + b.options.textarea) {
                  c = e;
                  break;
                }
              }
            else
              c = b.textarea;
          c || (a.appendChild(c = k.createElement(document, "textarea", {
            name: b.options.textarea,
            id: "umeditor_textarea_" + b.options.textarea,
            style: "display:none"
          })), b.textarea = c);
          c.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : "";
        }
        function b(a) {
          for (var b in UM.plugins)
            -1 == a.options.excludePlugins.indexOf(b) && (UM.plugins[b].call(a), a.plugins[b] = 1);
          a.langIsReady = !0;
          a.fireEvent("langReady");
        }
        function d(a) {
          for (var b in a)
            return b;
        }
        var c = 0,
            e,
            g = UM.Editor = function(a) {
              var l = this;
              l.uid = c++;
              I.call(l);
              l.commands = {};
              l.options = n.extend(n.clone(a || {}), UMEDITOR_CONFIG, !0);
              l.shortcutkeys = {};
              l.inputRules = [];
              l.outputRules = [];
              l.setOpt({
                isShow: !0,
                initialContent: "",
                initialStyle: "",
                autoClearinitialContent: !1,
                textarea: "editorValue",
                focus: !1,
                focusInEnd: !0,
                autoClearEmptyNode: !0,
                fullscreen: !1,
                readonly: !1,
                zIndex: 999,
                enterTag: "p",
                lang: "zh-cn",
                langPath: l.options.UMEDITOR_HOME_URL + "lang/",
                theme: "default",
                themePath: l.options.UMEDITOR_HOME_URL + "themes/",
                allHtmlEnabled: !1,
                autoSyncData: !0,
                autoHeightEnabled: !0,
                excludePlugins: ""
              });
              l.plugins = {};
              n.isEmptyObject(UM.I18N) ? n.loadFile(document, {
                src: l.options.langPath + l.options.lang + "/" + l.options.lang + ".js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
              }, function() {
                b(l);
              }) : (l.options.lang = d(UM.I18N), b(l));
            };
        g.prototype = {
          ready: function(a) {
            a && (this.isReady ? a.apply(this) : this.addListener("ready", a));
          },
          setOpt: function(a, b) {
            var c = {};
            n.isString(a) ? c[a] = b : c = a;
            n.extend(this.options, c, !0);
          },
          getOpt: function(a) {
            return this.options[a] || "";
          },
          destroy: function() {
            this.fireEvent("destroy");
            var a = this.container.parentNode;
            a === document.body && (a = this.container);
            var b = this.textarea;
            b ? b.style.display = "" : (b = document.createElement("textarea"), a.parentNode.insertBefore(b, a));
            b.style.width = this.body.offsetWidth + "px";
            b.style.height = this.body.offsetHeight + "px";
            b.value = this.getContent();
            b.id = this.key;
            a.contains(b) && h(b).insertBefore(a);
            a.innerHTML = "";
            k.remove(a);
            UM.clearCache(this.id);
            for (var c in this)
              this.hasOwnProperty(c) && delete this[c];
          },
          initialCont: function(a) {
            if (a) {
              a.getAttribute("name") && (this.options.textarea = a.getAttribute("name"));
              if (a && /script|textarea/ig.test(a.tagName)) {
                var b = document.createElement("div");
                a.parentNode.insertBefore(b, a);
                this.options.initialContent = UM.htmlparser(a.value || a.innerHTML || this.options.initialContent).toHtml();
                a.className && (b.className = a.className);
                a.style.cssText && (b.style.cssText = a.style.cssText);
                /textarea/i.test(a.tagName) ? (this.textarea = a, this.textarea.style.display = "none") : (a.parentNode.removeChild(a), a.id && (b.id = a.id));
                a = b;
                a.innerHTML = "";
              }
              return a;
            }
            return null;
          },
          render: function(a) {
            var b = this.options,
                c = function(b) {
                  return parseInt(h(a).css(b));
                };
            n.isString(a) && (a = document.getElementById(a));
            a && (this.id = a.getAttribute("id"), UM.setEditor(this), n.cssRule("edui-style-body", this.options.initialStyle, document), a = this.initialCont(a), a.className += " edui-body-container", b.minFrameWidth = b.initialFrameWidth ? b.initialFrameWidth : b.initialFrameWidth = h(a).width() || UM.defaultWidth, b.initialFrameHeight ? b.minFrameHeight = b.initialFrameHeight : b.initialFrameHeight = b.minFrameHeight = h(a).height() || UM.defaultHeight, a.style.width = /%$/.test(b.initialFrameWidth) ? "100%" : b.initialFrameWidth - c("padding-left") - c("padding-right") + "px", c = /%$/.test(b.initialFrameHeight) ? "100%" : b.initialFrameHeight - c("padding-top") - c("padding-bottom"), this.options.autoHeightEnabled ? (a.style.minHeight = c + "px", a.style.height = "", m.ie && 6 >= m.version && (a.style.height = c, a.style.setExpression("height", "this.scrollHeight <= " + c + ' ? "' + c + 'px" : "auto"'))) : h(a).height(c), a.style.zIndex = b.zIndex, this._setup(a));
          },
          _setup: function(b) {
            var c = this,
                d = c.options;
            b.contentEditable = !0;
            document.body.spellcheck = !1;
            c.document = document;
            c.window = document.defaultView || document.parentWindow;
            c.body = b;
            c.$body = h(b);
            c.selection = new x.Selection(document, c.body);
            c._isEnabled = !1;
            var e;
            m.gecko && (e = this.selection.getNative()) && e.removeAllRanges();
            this._initEvents();
            for (var g = b.parentNode; g && !k.isBody(g); g = g.parentNode)
              if ("FORM" == g.tagName) {
                c.form = g;
                if (c.options.autoSyncData)
                  h(b).on("blur", function() {
                    a(g, c);
                  });
                else
                  h(g).on("submit", function() {
                    a(this, c);
                  });
                break;
              }
            if (d.initialContent)
              if (d.autoClearinitialContent) {
                var p = c.execCommand;
                c.execCommand = function() {
                  c.fireEvent("firstBeforeExecCommand");
                  return p.apply(c, arguments);
                };
                this._setDefaultContent(d.initialContent);
              } else
                this.setContent(d.initialContent, !1, !0);
            k.isEmptyNode(c.body) && (c.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>");
            d.focus && setTimeout(function() {
              c.focus(c.options.focusInEnd);
              !c.options.autoClearinitialContent && c._selectionChange();
            }, 0);
            c.container || (c.container = b.parentNode);
            c._bindshortcutKeys();
            c.isReady = 1;
            c.fireEvent("ready");
            d.onready && d.onready.call(c);
            if (!m.ie || m.ie9above)
              h(c.body).on("blur focus", function(a) {
                var b = c.selection.getNative();
                if ("blur" == a.type)
                  0 < b.rangeCount && (c._bakRange = b.getRangeAt(0));
                else {
                  try {
                    c._bakRange && b.addRange(c._bakRange);
                  } catch (d) {}
                  c._bakRange = null;
                }
              });
            !d.isShow && c.setHide();
            d.readonly && c.setDisabled();
          },
          sync: function(b) {
            (b = b ? document.getElementById(b) : k.findParent(this.body.parentNode, function(a) {
              return "FORM" == a.tagName;
            }, !0)) && a(b, this);
          },
          setHeight: function(a, b) {
            !b && (this.options.initialFrameHeight = a);
            this.options.autoHeightEnabled ? (h(this.body).css({"min-height": a + "px"}), m.ie && 6 >= m.version && this.container && (this.container.style.height = a, this.container.style.setExpression("height", "this.scrollHeight <= " + a + ' ? "' + a + 'px" : "auto"'))) : h(this.body).height(a);
            this.fireEvent("resize");
          },
          setWidth: function(a) {
            this.$container && this.$container.width(a);
            h(this.body).width(a - 1 * h(this.body).css("padding-left").replace("px", "") - 1 * h(this.body).css("padding-right").replace("px", ""));
            this.fireEvent("resize");
          },
          addshortcutkey: function(a, b) {
            var c = {};
            b ? c[a] = b : c = a;
            n.extend(this.shortcutkeys, c);
          },
          _bindshortcutKeys: function() {
            var a = this,
                b = this.shortcutkeys;
            a.addListener("keydown", function(c, d) {
              var e = d.keyCode || d.which,
                  g;
              for (g in b)
                for (var h = b[g].split(","),
                    y = 0,
                    A; A = h[y++]; ) {
                  A = A.split(":");
                  var v = A[0];
                  A = A[1];
                  if (/^(ctrl)(\+shift)?\+(\d+)$/.test(v.toLowerCase()) || /^(\d+)$/.test(v))
                    if ("ctrl" == RegExp.$1 && (d.ctrlKey || d.metaKey) && ("" != RegExp.$2 ? d[RegExp.$2.slice(1) + "Key"] : 1) && e == RegExp.$3 || e == RegExp.$1)
                      -1 != a.queryCommandState(g, A) && a.execCommand(g, A), k.preventDefault(d);
                }
            });
          },
          getContent: function(a, b, c, d, e) {
            a && n.isFunction(a) && (b = a);
            if (b ? !b() : !this.hasContents())
              return "";
            this.fireEvent("beforegetcontent");
            a = UM.htmlparser(this.body.innerHTML, d);
            this.filterOutputRule(a);
            this.fireEvent("aftergetcontent", a);
            return a.toHtml(e);
          },
          getAllHtml: function() {
            var a = [];
            this.fireEvent("getAllHtml", a);
            if (m.ie && 8 < m.version) {
              var b = "";
              n.each(this.document.styleSheets, function(a) {
                b += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />' : "<style>" + a.cssText + "</style>";
              });
              n.each(this.document.getElementsByTagName("script"), function(a) {
                b += a.outerHTML;
              });
            }
            return "<html><head>" + (this.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + this.options.charset + '"/>' : "") + (b || this.document.getElementsByTagName("head")[0].innerHTML) + a.join("\n") + "</head><body " + (E && 9 > m.version ? 'class="view"' : "") + ">" + this.getContent(null, null, !0) + "</body></html>";
          },
          getPlainTxt: function() {
            var a = new RegExp(k.fillChar, "g"),
                b = this.body.innerHTML.replace(/[\n\r]/g, ""),
                b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(a, b, c) {
                  return q.$block[c] ? "\n" : b ? b : "";
                });
            return b.replace(a, "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ");
          },
          getContentTxt: function() {
            return this.body[m.ie ? "innerText" : "textContent"].replace(new RegExp(k.fillChar, "g"), "").replace(/\u00a0/g, " ");
          },
          setContent: function(b, c, d) {
            this.fireEvent("beforesetcontent", b);
            b = UM.htmlparser(b);
            this.filterInputRule(b);
            b = b.toHtml();
            this.body.innerHTML = (c ? this.body.innerHTML : "") + b;
            if ("p" == this.options.enterTag)
              if (c = this.body.firstChild, !c || 1 == c.nodeType && (q.$cdata[c.tagName] || "DIV" == c.tagName && c.getAttribute("cdata_tag") || k.isCustomeNode(c)) && c === this.body.lastChild)
                this.body.innerHTML = "<p>" + (m.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
              else
                for (var e = this.document.createElement("p"); c; ) {
                  for (; c && (3 == c.nodeType || 1 == c.nodeType && q.p[c.tagName] && !q.$cdata[c.tagName]); )
                    b = c.nextSibling, e.appendChild(c), c = b;
                  if (e.firstChild)
                    if (c)
                      c.parentNode.insertBefore(e, c), e = this.document.createElement("p");
                    else {
                      this.body.appendChild(e);
                      break;
                    }
                  c = c.nextSibling;
                }
            this.fireEvent("aftersetcontent");
            this.fireEvent("contentchange");
            !d && this._selectionChange();
            this._bakRange = this._bakIERange = this._bakNativeRange = null;
            var g;
            m.gecko && (g = this.selection.getNative()) && g.removeAllRanges();
            this.options.autoSyncData && this.form && a(this.form, this);
          },
          focus: function(a) {
            try {
              var b = this.selection.getRange();
              a ? b.setStartAtLast(this.body.lastChild).setCursor(!1, !0) : b.select(!0);
              this.fireEvent("focus");
            } catch (c) {}
          },
          blur: function() {
            var a = this.selection.getNative();
            a.empty ? a.empty() : a.removeAllRanges();
            this.fireEvent("blur");
          },
          isFocus: function() {
            return !0 === this.fireEvent("isfocus") ? !0 : this.selection.isFocus();
          },
          _initEvents: function() {
            var a = this,
                b = function() {
                  a._proxyDomEvent.apply(a, arguments);
                };
            h(a.body).on("click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart", b).on("focus blur", b).on("mouseup keydown", function(b) {
              "keydown" == b.type && (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || 2 != b.button && a._selectionChange(250, b);
            });
          },
          _proxyDomEvent: function(a) {
            return this.fireEvent(a.type.replace(/^on/, ""), a);
          },
          _selectionChange: function(a, b) {
            var c = this,
                d = !1,
                g,
                h;
            m.ie && 9 > m.version && b && "mouseup" == b.type && !this.selection.getRange().collapsed && (d = !0, g = b.clientX, h = b.clientY);
            clearTimeout(e);
            e = setTimeout(function() {
              if (c.selection.getNative()) {
                var a;
                if (d && "None" == c.selection.getNative().type) {
                  a = c.document.body.createTextRange();
                  try {
                    a.moveToPoint(g, h);
                  } catch (f) {
                    a = null;
                  }
                }
                var e;
                a && (e = c.selection.getIERange, c.selection.getIERange = function() {
                  return a;
                });
                c.selection.cache();
                e && (c.selection.getIERange = e);
                c.selection._cachedRange && c.selection._cachedStartElement && (c.fireEvent("beforeselectionchange"), c.fireEvent("selectionchange", !!b), c.fireEvent("afterselectionchange"), c.selection.clear());
              }
            }, a || 50);
          },
          _callCmdFn: function(a, b) {
            b = Array.prototype.slice.call(b, 0);
            var c = b.shift().toLowerCase(),
                d,
                e;
            e = (d = this.commands[c] || UM.commands[c]) && d[a];
            if (!(d && e || "queryCommandState" != a))
              return 0;
            if (e)
              return e.apply(this, [c].concat(b));
          },
          execCommand: function(a) {
            if (!this.isFocus()) {
              var b = this.selection._bakRange;
              b ? b.select() : this.focus(!0);
            }
            a = a.toLowerCase();
            var c,
                b = this.commands[a] || UM.commands[a];
            if (!b || !b.execCommand)
              return null;
            b.notNeedUndo || this.__hasEnterExecCommand ? (c = this._callCmdFn("execCommand", arguments), this.__hasEnterExecCommand || b.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange")) : (this.__hasEnterExecCommand = !0, -1 != this.queryCommandState.apply(this, arguments) && (this.fireEvent("saveScene"), this.fireEvent("beforeexeccommand", a), c = this._callCmdFn("execCommand", arguments), b.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange"), this.fireEvent("afterexeccommand", a), this.fireEvent("saveScene")), this.__hasEnterExecCommand = !1);
            this.__hasEnterExecCommand || b.ignoreContentChange || this._ignoreContentChange || this._selectionChange();
            return c;
          },
          queryCommandState: function(a) {
            try {
              return this._callCmdFn("queryCommandState", arguments);
            } catch (b) {
              return 0;
            }
          },
          queryCommandValue: function(a) {
            try {
              return this._callCmdFn("queryCommandValue", arguments);
            } catch (b) {
              return null;
            }
          },
          hasContents: function(a) {
            if (a)
              for (var b = 0,
                  c; c = a[b++]; )
                if (0 < this.body.getElementsByTagName(c).length)
                  return !0;
            if (!k.isEmptyBlock(this.body))
              return !0;
            a = ["div"];
            for (b = 0; c = a[b++]; ) {
              c = k.getElementsByTagName(this.body, c);
              for (var d = 0,
                  e; e = c[d++]; )
                if (k.isCustomeNode(e))
                  return !0;
            }
            return !1;
          },
          reset: function() {
            this.fireEvent("reset");
          },
          isEnabled: function() {
            return 1 != this._isEnabled;
          },
          setEnabled: function() {
            var a;
            this.body.contentEditable = !0;
            if (this.lastBk) {
              a = this.selection.getRange();
              try {
                a.moveToBookmark(this.lastBk), delete this.lastBk;
              } catch (b) {
                a.setStartAtFirst(this.body).collapse(!0);
              }
              a.select(!0);
            }
            this.bkqueryCommandState && (this.queryCommandState = this.bkqueryCommandState, delete this.bkqueryCommandState);
            this._bkproxyDomEvent && (this._proxyDomEvent = this._bkproxyDomEvent, delete this._bkproxyDomEvent);
            this.fireEvent("setEnabled");
          },
          enable: function() {
            return this.setEnabled();
          },
          setDisabled: function(a, b) {
            var c = this;
            c.body.contentEditable = !1;
            c._except = a ? n.isArray(a) ? a : [a] : [];
            c.lastBk || (c.lastBk = c.selection.getRange().createBookmark(!0));
            c.bkqueryCommandState || (c.bkqueryCommandState = c.queryCommandState, c.queryCommandState = function(a) {
              return -1 != n.indexOf(c._except, a) ? c.bkqueryCommandState.apply(c, arguments) : -1;
            });
            b || c._bkproxyDomEvent || (c._bkproxyDomEvent = c._proxyDomEvent, c._proxyDomEvent = function() {
              return !1;
            });
            c.fireEvent("selectionchange");
            c.fireEvent("setDisabled", c._except);
          },
          disable: function(a) {
            return this.setDisabled(a);
          },
          _setDefaultContent: function() {
            function a() {
              var b = this;
              b.document.getElementById("initContent") && (b.body.innerHTML = "<p>" + (E ? "" : "<br/>") + "</p>", b.removeListener("firstBeforeExecCommand focus", a), setTimeout(function() {
                b.focus();
                b._selectionChange();
              }, 0));
            }
            return function(b) {
              this.body.innerHTML = '<p id="initContent">' + b + "</p>";
              this.addListener("firstBeforeExecCommand focus", a);
            };
          }(),
          setShow: function() {
            var a = this.selection.getRange();
            if ("none" == this.container.style.display) {
              try {
                a.moveToBookmark(this.lastBk), delete this.lastBk;
              } catch (b) {
                a.setStartAtFirst(this.body).collapse(!0);
              }
              setTimeout(function() {
                a.select(!0);
              }, 100);
              this.container.style.display = "";
            }
          },
          show: function() {
            return this.setShow();
          },
          setHide: function() {
            this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0));
            this.container.style.display = "none";
          },
          hide: function() {
            return this.setHide();
          },
          getLang: function(a) {
            var b = UM.I18N[this.options.lang];
            if (!b)
              throw Error("not import language file");
            a = (a || "").split(".");
            for (var c = 0,
                d; (d = a[c++]) && (b = b[d], b); )
              ;
            return b;
          },
          getContentLength: function(a, b) {
            var c = this.getContent(!1, !1, !0).length;
            if (a) {
              b = (b || []).concat(["hr", "img", "iframe"]);
              for (var c = this.getContentTxt().replace(/[\t\r\n]+/g, "").length,
                  d = 0,
                  e; e = b[d++]; )
                c += this.body.getElementsByTagName(e).length;
            }
            return c;
          },
          addInputRule: function(a, b) {
            a.ignoreUndo = b;
            this.inputRules.push(a);
          },
          filterInputRule: function(a, b) {
            for (var c = 0,
                d; d = this.inputRules[c++]; )
              b && d.ignoreUndo || d.call(this, a);
          },
          addOutputRule: function(a, b) {
            a.ignoreUndo = b;
            this.outputRules.push(a);
          },
          filterOutputRule: function(a, b) {
            for (var c = 0,
                d; d = this.outputRules[c++]; )
              b && d.ignoreUndo || d.call(this, a);
          }
        };
        n.inherits(g, I);
      })();
      UM.filterWord = function() {
        function a(a) {
          return a = a.replace(/[\d.]+\w+/g, function(a) {
            return n.transUnitToPx(a);
          });
        }
        function b(b) {
          return b.replace(/[\t\r\n]+/g, " ").replace(/\x3c!--[\s\S]*?--\x3e/ig, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(b) {
            if (m.opera)
              return "";
            try {
              if (/Bitmap/i.test(b))
                return "";
              var d = b.match(/width:([ \d.]*p[tx])/i)[1],
                  g = b.match(/height:([ \d.]*p[tx])/i)[1],
                  f = b.match(/src=\s*"([^"]*)"/i)[1];
              return '<img width="' + a(d) + '" height="' + a(g) + '" src="' + f + '" />';
            } catch (l) {
              return "";
            }
          }).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function(a, b, d, f) {
            return "class" == b && "MsoListParagraph" == f ? a : "";
          }).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function(a, b, d) {
            return d.replace(/[\t\r\n ]+/g, " ");
          }).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(b, d, g, f) {
            b = [];
            f = f.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").split(/;\s*/g);
            g = 0;
            for (var l; l = f[g]; g++) {
              var u,
                  h = l.split(":");
              if (2 == h.length && (l = h[0].toLowerCase(), u = h[1].toLowerCase(), !(/^(background)\w*/.test(l) && 0 == u.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(l) && /^0\w+$/.test(u)))) {
                switch (l) {
                  case "mso-padding-alt":
                  case "mso-padding-top-alt":
                  case "mso-padding-right-alt":
                  case "mso-padding-bottom-alt":
                  case "mso-padding-left-alt":
                  case "mso-margin-alt":
                  case "mso-margin-top-alt":
                  case "mso-margin-right-alt":
                  case "mso-margin-bottom-alt":
                  case "mso-margin-left-alt":
                  case "mso-height":
                  case "mso-width":
                  case "mso-vertical-align-alt":
                    /<table/.test(d) || (b[g] = l.replace(/^mso-|-alt$/g, "") + ":" + a(u));
                    continue;
                  case "horiz-align":
                    b[g] = "text-align:" + u;
                    continue;
                  case "vert-align":
                    b[g] = "vertical-align:" + u;
                    continue;
                  case "font-color":
                  case "mso-foreground":
                    b[g] = "color:" + u;
                    continue;
                  case "mso-background":
                  case "mso-highlight":
                    b[g] = "background:" + u;
                    continue;
                  case "mso-default-height":
                    b[g] = "min-height:" + a(u);
                    continue;
                  case "mso-default-width":
                    b[g] = "min-width:" + a(u);
                    continue;
                  case "mso-padding-between-alt":
                    b[g] = "border-collapse:separate;border-spacing:" + a(u);
                    continue;
                  case "text-line-through":
                    if ("single" == u || "double" == u)
                      b[g] = "text-decoration:line-through";
                    continue;
                  case "mso-zero-height":
                    "yes" == u && (b[g] = "display:none");
                    continue;
                  case "margin":
                    if (!/[1-9]/.test(u))
                      continue;
                }
                /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l) || /text\-indent|padding|margin/.test(l) && /\-[\d.]+/.test(u) || (b[g] = l + ":" + h[1]);
              }
            }
            return d + (b.length ? ' style="' + b.join(";").replace(/;{2,}/g, ";") + '"' : "");
          }).replace(/[\d.]+(cm|pt)/g, function(a) {
            return n.transUnitToPx(a);
          });
        }
        return function(a) {
          return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(a) ? b(a) : a;
        };
      }();
      (function() {
        function a(a, b, c) {
          a.push("\n");
          return b + (c ? 1 : -1);
        }
        function b(a, b) {
          for (var c = 0; c < b; c++)
            a.push("    ");
        }
        function d(e, f, g, l) {
          switch (e.type) {
            case "root":
              for (var h = 0,
                  u; u = e.children[h++]; )
                g && "element" == u.type && !q.$inlineWithA[u.tagName] && 1 < h && (a(f, l, !0), b(f, l)), d(u, f, g, l);
              break;
            case "text":
              "pre" == e.parentNode.tagName ? f.push(e.data) : f.push(k[e.parentNode.tagName] ? n.html(e.data) : e.data.replace(/[ ]{2}/g, " &nbsp;"));
              break;
            case "element":
              c(e, f, g, l);
              break;
            case "comment":
              f.push("\x3c!--" + e.data + "--\x3e");
          }
          return f;
        }
        function c(c, e, f, g) {
          var l = "";
          if (c.attrs) {
            var l = [],
                h = c.attrs,
                k;
            for (k in h)
              l.push(k + (void 0 !== h[k] ? '="' + (u[k] ? n.html(h[k]).replace(/["]/g, function(a) {
                return "&quot;";
              }) : n.unhtml(h[k])) + '"' : ""));
            l = l.join(" ");
          }
          e.push("<" + c.tagName + (l ? " " + l : "") + (q.$empty[c.tagName] ? "/" : "") + ">");
          f && !q.$inlineWithA[c.tagName] && "pre" != c.tagName && c.children && c.children.length && (g = a(e, g, !0), b(e, g));
          if (c.children && c.children.length)
            for (l = 0; h = c.children[l++]; )
              f && "element" == h.type && !q.$inlineWithA[h.tagName] && 1 < l && (a(e, g), b(e, g)), d(h, e, f, g);
          q.$empty[c.tagName] || (f && !q.$inlineWithA[c.tagName] && "pre" != c.tagName && c.children && c.children.length && (g = a(e, g), b(e, g)), e.push("</" + c.tagName + ">"));
        }
        function e(a, b) {
          var c;
          if ("element" == a.type && a.getAttr("id") == b)
            return a;
          if (a.children && a.children.length)
            for (var d = 0; c = a.children[d++]; )
              if (c = e(c, b))
                return c;
        }
        function g(a, b, c) {
          "element" == a.type && a.tagName == b && c.push(a);
          if (a.children && a.children.length)
            for (var d = 0,
                e; e = a.children[d++]; )
              g(e, b, c);
        }
        function f(a, b) {
          if (a.children && a.children.length)
            for (var c = 0,
                d; d = a.children[c]; )
              f(d, b), d.parentNode && (d.children && d.children.length && b(d), d.parentNode && c++);
          else
            b(a);
        }
        var l = UM.uNode = function(a) {
          this.type = a.type;
          this.data = a.data;
          this.tagName = a.tagName;
          this.parentNode = a.parentNode;
          this.attrs = a.attrs || {};
          this.children = a.children;
        },
            u = {
              href: 1,
              src: 1,
              _src: 1,
              _href: 1,
              cdata_data: 1
            },
            k = {
              style: 1,
              script: 1
            };
        l.createElement = function(a) {
          return /[<>]/.test(a) ? UM.htmlparser(a).children[0] : new l({
            type: "element",
            children: [],
            tagName: a
          });
        };
        l.createText = function(a, b) {
          return new UM.uNode({
            type: "text",
            data: b ? a : n.unhtml(a || "")
          });
        };
        l.prototype = {
          toHtml: function(a) {
            var b = [];
            d(this, b, a, 0);
            return b.join("");
          },
          innerHTML: function(a) {
            if ("element" != this.type || q.$empty[this.tagName])
              return this;
            if (n.isString(a)) {
              if (this.children)
                for (var b = 0,
                    c; c = this.children[b++]; )
                  c.parentNode = null;
              this.children = [];
              a = UM.htmlparser(a);
              for (b = 0; c = a.children[b++]; )
                this.children.push(c), c.parentNode = this;
              return this;
            }
            a = new UM.uNode({
              type: "root",
              children: this.children
            });
            return a.toHtml();
          },
          innerText: function(a, b) {
            if ("element" != this.type || q.$empty[this.tagName])
              return this;
            if (a) {
              if (this.children)
                for (var c = 0,
                    d; d = this.children[c++]; )
                  d.parentNode = null;
              this.children = [];
              this.appendChild(l.createText(a, b));
              return this;
            }
            return this.toHtml().replace(/<[^>]+>/g, "");
          },
          getData: function() {
            return "element" == this.type ? "" : this.data;
          },
          firstChild: function() {
            return this.children ? this.children[0] : null;
          },
          lastChild: function() {
            return this.children ? this.children[this.children.length - 1] : null;
          },
          previousSibling: function() {
            for (var a = this.parentNode,
                b = 0,
                c; c = a.children[b]; b++)
              if (c === this)
                return 0 == b ? null : a.children[b - 1];
          },
          nextSibling: function() {
            for (var a = this.parentNode,
                b = 0,
                c; c = a.children[b++]; )
              if (c === this)
                return a.children[b];
          },
          replaceChild: function(a, b) {
            if (this.children) {
              a.parentNode && a.parentNode.removeChild(a);
              for (var c = 0,
                  d; d = this.children[c]; c++)
                if (d === b)
                  return this.children.splice(c, 1, a), b.parentNode = null, a.parentNode = this, a;
            }
          },
          appendChild: function(a) {
            if ("root" == this.type || "element" == this.type && !q.$empty[this.tagName]) {
              this.children || (this.children = []);
              a.parentNode && a.parentNode.removeChild(a);
              for (var b = 0,
                  c; c = this.children[b]; b++)
                if (c === a) {
                  this.children.splice(b, 1);
                  break;
                }
              this.children.push(a);
              a.parentNode = this;
              return a;
            }
          },
          insertBefore: function(a, b) {
            if (this.children) {
              a.parentNode && a.parentNode.removeChild(a);
              for (var c = 0,
                  d; d = this.children[c]; c++)
                if (d === b)
                  return this.children.splice(c, 0, a), a.parentNode = this, a;
            }
          },
          insertAfter: function(a, b) {
            if (this.children) {
              a.parentNode && a.parentNode.removeChild(a);
              for (var c = 0,
                  d; d = this.children[c]; c++)
                if (d === b)
                  return this.children.splice(c + 1, 0, a), a.parentNode = this, a;
            }
          },
          removeChild: function(a, b) {
            if (this.children)
              for (var c = 0,
                  d; d = this.children[c]; c++)
                if (d === a) {
                  this.children.splice(c, 1);
                  d.parentNode = null;
                  if (b && d.children && d.children.length)
                    for (var e = 0,
                        f; f = d.children[e]; e++)
                      this.children.splice(c + e, 0, f), f.parentNode = this;
                  return d;
                }
          },
          getAttr: function(a) {
            return this.attrs && this.attrs[a.toLowerCase()];
          },
          setAttr: function(a, b) {
            if (a)
              if (this.attrs || (this.attrs = {}), n.isObject(a))
                for (var c in a)
                  a[c] ? this.attrs[c.toLowerCase()] = a[c] : delete this.attrs[c];
              else
                b ? this.attrs[a.toLowerCase()] = b : delete this.attrs[a];
            else
              delete this.attrs;
          },
          hasAttr: function(a) {
            a = this.getAttr(a);
            return null !== a && void 0 !== a;
          },
          getIndex: function() {
            for (var a = this.parentNode,
                b = 0,
                c; c = a.children[b]; b++)
              if (c === this)
                return b;
            return -1;
          },
          getNodeById: function(a) {
            var b;
            if (this.children && this.children.length)
              for (var c = 0; b = this.children[c++]; )
                if (b = e(b, a))
                  return b;
          },
          getNodesByTagName: function(a) {
            a = n.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
            var b = [],
                c = this;
            n.each(a, function(a) {
              if (c.children && c.children.length)
                for (var d = 0,
                    e; e = c.children[d++]; )
                  g(e, a, b);
            });
            return b;
          },
          getStyle: function(a) {
            var b = this.getAttr("style");
            return b ? (a = b.match(new RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"))) && a[0] ? a[2] : "" : "";
          },
          setStyle: function(a, b) {
            function c(a, b) {
              d = d.replace(new RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi"), "$1");
              b && (d = a + ":" + n.unhtml(b) + ";" + d);
            }
            var d = this.getAttr("style");
            d || (d = "");
            if (n.isObject(a))
              for (var e in a)
                c(e, a[e]);
            else
              c(a, b);
            this.setAttr("style", n.trim(d));
          },
          hasClass: function(a) {
            if (this.hasAttr("class")) {
              var b = this.getAttr("class").split(/\s+/),
                  c = !1;
              h.each(b, function(b, d) {
                d === a && (c = !0);
              });
              return c;
            }
            return !1;
          },
          addClass: function(a) {
            var b = null,
                c = !1;
            this.hasAttr("class") ? (b = this.getAttr("class"), b = b.split(/\s+/), b.forEach(function(b) {
              b === a && (c = !0);
            }), !c && b.push(a), this.setAttr("class", b.join(" "))) : this.setAttr("class", a);
          },
          removeClass: function(a) {
            if (this.hasAttr("class")) {
              var b = this.getAttr("class"),
                  b = b.replace(new RegExp("\\b" + a + "\\b", "g"), "");
              this.setAttr("class", n.trim(b).replace(/[ ]{2,}/g, " "));
            }
          },
          traversal: function(a) {
            this.children && this.children.length && f(this, a);
            return this;
          }
        };
      })();
      UM.htmlparser = function(a, b) {
        function d(a, b) {
          if (r[a.tagName]) {
            var c = h.createElement(r[a.tagName]);
            a.appendChild(c);
            c.appendChild(h.createText(b));
          } else
            a.appendChild(h.createText(b));
        }
        function c(a, b, d) {
          var e;
          if (e = t[b]) {
            for (var f = a,
                k; "root" != f.type; ) {
              if (n.isArray(e) ? -1 != n.indexOf(e, f.tagName) : e == f.tagName) {
                a = f;
                k = !0;
                break;
              }
              f = f.parentNode;
            }
            k || (a = c(a, n.isArray(e) ? e[0] : e));
          }
          e = new h({
            parentNode: a,
            type: "element",
            tagName: b.toLowerCase(),
            children: q.$empty[b] ? null : []
          });
          if (d) {
            for (f = {}; k = g.exec(d); )
              f[k[1].toLowerCase()] = l[k[1].toLowerCase()] ? k[2] || k[3] || k[4] : n.unhtml(k[2] || k[3] || k[4]);
            e.attrs = f;
          }
          a.children.push(e);
          return q.$empty[b] ? a : e;
        }
        var e = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
            g = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            f = {
              b: 1,
              code: 1,
              i: 1,
              u: 1,
              strike: 1,
              s: 1,
              tt: 1,
              strong: 1,
              q: 1,
              samp: 1,
              em: 1,
              span: 1,
              sub: 1,
              img: 1,
              sup: 1,
              font: 1,
              big: 1,
              small: 1,
              iframe: 1,
              a: 1,
              br: 1,
              pre: 1
            };
        a = a.replace(new RegExp(k.fillChar, "g"), "");
        b || (a = a.replace(new RegExp("[\\r\\t\\n" + (b ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (b ? "" : " ") + "]*", "g"), function(a, c) {
          return c && f[c.toLowerCase()] ? a.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : a.replace(new RegExp("^[\\r\\n" + (b ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (b ? "" : " ") + "]+$"), "");
        }));
        for (var l = {
          href: 1,
          src: 1
        },
            h = UM.uNode,
            t = {
              td: "tr",
              tr: ["tbody", "thead", "tfoot"],
              tbody: "table",
              th: "tr",
              thead: "table",
              tfoot: "table",
              caption: "table",
              li: ["ul", "ol"],
              dt: "dl",
              dd: "dl",
              option: "select"
            },
            r = {
              ol: "li",
              ul: "li"
            },
            p,
            w = 0,
            m = 0,
            A = new h({
              type: "root",
              children: []
            }),
            v = A; p = e.exec(a); ) {
          w = p.index;
          try {
            if (w > m && d(v, a.slice(m, w)), p[3])
              q.$cdata[v.tagName] ? d(v, p[0]) : v = c(v, p[3].toLowerCase(), p[4]);
            else if (p[1]) {
              if ("root" != v.type)
                if (q.$cdata[v.tagName] && !q.$cdata[p[1]])
                  d(v, p[0]);
                else {
                  for (w = v; "element" == v.type && v.tagName != p[1].toLowerCase(); )
                    if (v = v.parentNode, "root" == v.type)
                      throw v = w, "break";
                  v = v.parentNode;
                }
            } else
              p[2] && v.children.push(new h({
                type: "comment",
                data: p[2],
                parentNode: v
              }));
          } catch (L) {}
          m = e.lastIndex;
        }
        m < a.length && d(v, a.slice(m));
        return A;
      };
      UM.filterNode = function() {
        function a(b, d) {
          switch (b.type) {
            case "element":
              var c;
              if (c = d[b.tagName])
                if ("-" === c)
                  b.parentNode.removeChild(b);
                else if (n.isFunction(c)) {
                  var e = b.parentNode,
                      g = b.getIndex();
                  c(b);
                  if (b.parentNode) {
                    if (b.children)
                      for (c = 0; g = b.children[c]; )
                        a(g, d), g.parentNode && c++;
                  } else
                    for (c = g; g = e.children[c]; )
                      a(g, d), g.parentNode && c++;
                } else {
                  if ((c = c.$) && b.attrs) {
                    var g = {},
                        f;
                    for (e in c) {
                      f = b.getAttr(e);
                      if ("style" == e && n.isArray(c[e])) {
                        var l = [];
                        n.each(c[e], function(a) {
                          var c;
                          (c = b.getStyle(a)) && l.push(a + ":" + c);
                        });
                        f = l.join(";");
                      }
                      f && (g[e] = f);
                    }
                    b.attrs = g;
                  }
                  if (b.children)
                    for (c = 0; g = b.children[c]; )
                      a(g, d), g.parentNode && c++;
                }
              else if (q.$cdata[b.tagName])
                b.parentNode.removeChild(b);
              else
                for (e = b.parentNode, g = b.getIndex(), b.parentNode.removeChild(b, !0), c = g; g = e.children[c]; )
                  a(g, d), g.parentNode && c++;
              break;
            case "comment":
              b.parentNode.removeChild(b);
          }
        }
        return function(b, d) {
          if (n.isEmptyObject(d))
            return b;
          var c;
          (c = d["-"]) && n.each(c.split(" "), function(a) {
            d[a] = "-";
          });
          c = 0;
          for (var e; e = b.children[c]; )
            a(e, d), e.parentNode && c++;
          return b;
        };
      }();
      UM.commands.inserthtml = {execCommand: function(a, b, d) {
          var c = this,
              e;
          if (b && !0 !== c.fireEvent("beforeinserthtml", b)) {
            e = c.selection.getRange();
            a = e.document.createElement("div");
            a.style.display = "inline";
            d || (b = UM.htmlparser(b), c.options.filterRules && UM.filterNode(b, c.options.filterRules), c.filterInputRule(b), b = b.toHtml());
            a.innerHTML = n.trim(b);
            if (!e.collapsed && (b = e.startContainer, k.isFillChar(b) && e.setStartBefore(b), b = e.endContainer, k.isFillChar(b) && e.setEndAfter(b), e.txtToElmBoundary(), e.endContainer && 1 == e.endContainer.nodeType && (b = e.endContainer.childNodes[e.endOffset]) && k.isBr(b) && e.setEndAfter(b), 0 == e.startOffset && (b = e.startContainer, k.isBoundaryNode(b, "firstChild") && (b = e.endContainer, e.endOffset == (3 == b.nodeType ? b.nodeValue.length : b.childNodes.length) && k.isBoundaryNode(b, "lastChild") && (c.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>", e.setStart(c.body.firstChild, 0).collapse(!0)))), !e.collapsed && e.deleteContents(), 1 == e.startContainer.nodeType)) {
              b = e.startContainer.childNodes[e.startOffset];
              var g;
              if (b && k.isBlockElm(b) && (g = b.previousSibling) && k.isBlockElm(g)) {
                for (e.setEnd(g, g.childNodes.length).collapse(); b.firstChild; )
                  g.appendChild(b.firstChild);
                k.remove(b);
              }
            }
            var f,
                l;
            d = 0;
            var h;
            e.inFillChar() && (b = e.startContainer, k.isFillChar(b) ? (e.setStartBefore(b).collapse(!0), k.remove(b)) : k.isFillChar(b, !0) && (b.nodeValue = b.nodeValue.replace(F, ""), e.startOffset--, e.collapsed && e.collapse(!0)));
            for (; b = a.firstChild; ) {
              if (d) {
                for (f = c.document.createElement("p"); b && (3 == b.nodeType || !q.$block[b.tagName]); )
                  h = b.nextSibling, f.appendChild(b), b = h;
                f.firstChild && (b = f);
              }
              e.insertNode(b);
              h = b.nextSibling;
              if (!d && b.nodeType == k.NODE_ELEMENT && k.isBlockElm(b) && (f = k.findParent(b, function(a) {
                return k.isBlockElm(a);
              })) && "body" != f.tagName.toLowerCase() && (!q[f.tagName][b.nodeName] || b.parentNode !== f)) {
                if (q[f.tagName][b.nodeName])
                  for (l = b.parentNode; l !== f; )
                    g = l, l = l.parentNode;
                else
                  g = f;
                k.breakParent(b, g || l);
                g = b.previousSibling;
                k.trimWhiteTextNode(g);
                g.childNodes.length || k.remove(g);
                !m.ie && (t = b.nextSibling) && k.isBlockElm(t) && t.lastChild && !k.isBr(t.lastChild) && t.appendChild(c.document.createElement("br"));
                d = 1;
              }
              var t = b.nextSibling;
              if (!a.firstChild && t && k.isBlockElm(t)) {
                e.setStart(t, 0).collapse(!0);
                break;
              }
              e.setEndAfter(b).collapse();
            }
            b = e.startContainer;
            h && k.isBr(h) && k.remove(h);
            if (k.isBlockElm(b) && k.isEmptyNode(b))
              if (h = b.nextSibling)
                k.remove(b), 1 == h.nodeType && q.$block[h.tagName] && e.setStart(h, 0).collapse(!0).shrinkBoundary();
              else
                try {
                  b.innerHTML = m.ie ? k.fillChar : "<br/>";
                } catch (p) {
                  e.setStartBefore(b), k.remove(b);
                }
            try {
              if (m.ie9below && 1 == e.startContainer.nodeType && !e.startContainer.childNodes[e.startOffset] && (g = e.startContainer.childNodes[e.startOffset - 1]) && 1 == g.nodeType && q.$empty[g.tagName]) {
                var r = this.document.createTextNode(k.fillChar);
                e.insertNode(r).setStart(r, 0).collapse(!0);
              }
              setTimeout(function() {
                e.select(!0);
              });
            } catch (p) {}
            setTimeout(function() {
              e = c.selection.getRange();
              e.scrollIntoView();
              c.fireEvent("afterinserthtml");
            }, 200);
          }
        }};
      UM.commands.insertimage = {execCommand: function(a, b) {
          b = n.isArray(b) ? b : [b];
          if (b.length) {
            var d = [],
                c = "",
                e;
            e = b[0];
            if (1 == b.length)
              c = '<img src="' + e.src + '" ' + (e._src ? ' _src="' + e._src + '" ' : "") + (e.width ? 'width="' + e.width + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ("left" == e.floatStyle || "right" == e.floatStyle ? ' style="float:' + e.floatStyle + ';"' : "") + (e.title && "" != e.title ? ' title="' + e.title + '"' : "") + (e.border && "0" != e.border ? ' border="' + e.border + '"' : "") + (e.alt && "" != e.alt ? ' alt="' + e.alt + '"' : "") + (e.hspace && "0" != e.hspace ? ' hspace = "' + e.hspace + '"' : "") + (e.vspace && "0" != e.vspace ? ' vspace = "' + e.vspace + '"' : "") + "/>", "center" == e.floatStyle && (c = '<p style="text-align: center">' + c + "</p>"), d.push(c);
            else
              for (var g = 0; e = b[g++]; )
                c = "<p " + ("center" == e.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + e.src + '" ' + (e.width ? 'width="' + e.width + '" ' : "") + (e._src ? ' _src="' + e._src + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ' style="' + (e.floatStyle && "center" != e.floatStyle ? "float:" + e.floatStyle + ";" : "") + (e.border || "") + '" ' + (e.title ? ' title="' + e.title + '"' : "") + " /></p>", d.push(c);
            this.execCommand("insertHtml", d.join(""), !0);
          }
        }};
      UM.plugins.justify = function() {
        var a = this;
        h.each(["justifyleft", "justifyright", "justifycenter", "justifyfull"], function(b, d) {
          a.commands[d] = {
            execCommand: function(a) {
              return this.document.execCommand(a);
            },
            queryCommandValue: function(a) {
              var b = this.document.queryCommandValue(a);
              return !0 === b || "true" === b ? a.replace(/justify/, "") : "";
            },
            queryCommandState: function(a) {
              return this.document.queryCommandState(a) ? 1 : 0;
            }
          };
        });
      };
      UM.plugins.font = function() {
        var a = this,
            b = {
              forecolor: "forecolor",
              backcolor: "backcolor",
              fontsize: "fontsize",
              fontfamily: "fontname"
            },
            d = {
              forecolor: "color",
              backcolor: "background-color",
              fontsize: "font-size",
              fontfamily: "font-family"
            },
            c = {
              forecolor: "color",
              fontsize: "size",
              fontfamily: "face"
            };
        a.setOpt({
          fontfamily: [{
            name: "songti",
            val: "\u5b8b\u4f53,SimSun"
          }, {
            name: "yahei",
            val: "\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"
          }, {
            name: "kaiti",
            val: "\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"
          }, {
            name: "heiti",
            val: "\u9ed1\u4f53, SimHei"
          }, {
            name: "lishu",
            val: "\u96b6\u4e66, SimLi"
          }, {
            name: "andaleMono",
            val: "andale mono"
          }, {
            name: "arial",
            val: "arial, helvetica,sans-serif"
          }, {
            name: "arialBlack",
            val: "arial black,avant garde"
          }, {
            name: "comicSansMs",
            val: "comic sans ms"
          }, {
            name: "impact",
            val: "impact,chicago"
          }, {
            name: "timesNewRoman",
            val: "times new roman"
          }, {
            name: "sans-serif",
            val: "sans-serif"
          }],
          fontsize: [10, 12, 16, 18, 24, 32, 48]
        });
        a.addOutputRule(function(a) {
          n.each(a.getNodesByTagName("font"), function(a) {
            if ("font" == a.tagName) {
              var b = [],
                  c;
              for (c in a.attrs)
                switch (c) {
                  case "size":
                    var d = a.attrs[c];
                    h.each({
                      10: "1",
                      12: "2",
                      16: "3",
                      18: "4",
                      24: "5",
                      32: "6",
                      48: "7"
                    }, function(a, b) {
                      if (b == d)
                        return d = a, !1;
                    });
                    b.push("font-size:" + d + "px");
                    break;
                  case "color":
                    b.push("color:" + a.attrs[c]);
                    break;
                  case "face":
                    b.push("font-family:" + a.attrs[c]);
                    break;
                  case "style":
                    b.push(a.attrs[c]);
                }
              a.attrs = {style: b.join(";")};
            }
            a.tagName = "span";
            "span" == a.parentNode.tagName && 1 == a.parentNode.children.length && (h.each(a.attrs, function(b, c) {
              a.parentNode.attrs[b] = "style" == b ? a.parentNode.attrs[b] + c : c;
            }), a.parentNode.removeChild(a, !0));
          });
        });
        for (var e in b)
          (function(e) {
            a.commands[e] = {
              execCommand: function(a, c) {
                if ("transparent" != c) {
                  var e = this.selection.getRange();
                  if (e.collapsed) {
                    var g = h("<span></span>").css(d[a], c)[0];
                    e.insertNode(g).setStart(g, 0).setCursor();
                  } else {
                    "fontsize" == a && (c = {
                      10: "1",
                      12: "2",
                      16: "3",
                      18: "4",
                      24: "5",
                      32: "6",
                      48: "7"
                    }[(c + "").replace(/px/, "")]);
                    this.document.execCommand(b[a], !1, c);
                    m.gecko && h.each(this.$body.find("a"), function(a, b) {
                      var c = b.parentNode;
                      if (c.lastChild === c.firstChild && /FONT|SPAN/.test(c.tagName)) {
                        var d = c.cloneNode(!1);
                        d.innerHTML = b.innerHTML;
                        h(b).html("").append(d).insertBefore(c);
                        h(c).remove();
                      }
                    });
                    if (!m.ie) {
                      var g = this.selection.getNative().getRangeAt(0).commonAncestorContainer,
                          e = this.selection.getRange(),
                          k = e.createBookmark(!0);
                      h(g).find("a").each(function(a, b) {
                        var c = b.parentNode;
                        "FONT" == c.nodeName && (c = c.cloneNode(!1), c.innerHTML = b.innerHTML, h(b).html("").append(c));
                      });
                      e.moveToBookmark(k).select();
                    }
                    return !0;
                  }
                }
              },
              queryCommandValue: function(b) {
                var e = a.selection.getStart(),
                    g = h(e).css(d[b]);
                void 0 === g && (g = h(e).attr(c[b]));
                return g ? n.fixColor(b, g).replace(/px/, "") : "";
              },
              queryCommandState: function(a) {
                return this.queryCommandValue(a);
              }
            };
          })(e);
      };
      UM.plugins.link = function() {
        this.setOpt("autourldetectinie", !1);
        m.ie && !1 === this.options.autourldetectinie && this.addListener("keyup", function(a, b) {
          var d = b.keyCode;
          if (13 == d || 32 == d) {
            var c = this.selection.getRange().startContainer;
            13 == d ? "P" == c.nodeName && (d = c.previousSibling) && 1 == d.nodeType && (d = d.lastChild) && "A" == d.nodeName && !d.getAttribute("_href") && k.remove(d, !0) : 32 == d && 3 == c.nodeType && /^\s$/.test(c.nodeValue) && (c = c.previousSibling) && "A" == c.nodeName && !c.getAttribute("_href") && k.remove(c, !0);
          }
        });
        this.addOutputRule(function(a) {
          h.each(a.getNodesByTagName("a"), function(a, d) {
            var c = n.html(d.getAttr("_href"));
            /^(ftp|https?|\/|file)/.test(c) || (c = "http://" + c);
            d.setAttr("href", c);
            d.setAttr("_href");
            "" == d.getAttr("title") && d.setAttr("title");
          });
        });
        this.addInputRule(function(a) {
          h.each(a.getNodesByTagName("a"), function(a, d) {
            d.setAttr("_href", n.html(d.getAttr("href")));
          });
        });
        this.commands.link = {
          execCommand: function(a, b) {
            var d = this.selection.getRange();
            if (d.collapsed) {
              var c = d.startContainer;
              (c = k.findParentByTagName(c, "a", !0)) ? (h(c).attr(b), d.selectNode(c).select()) : d.insertNode(h("<a>" + b.href + "</a>").attr(b)[0]).select();
            } else
              this.document.execCommand("createlink", !1, "_umeditor_link"), n.each(k.getElementsByTagName(this.body, "a", function(a) {
                return "_umeditor_link" == a.getAttribute("href");
              }), function(a) {
                "_umeditor_link" == h(a).text() && h(a).text(b.href);
                k.setAttributes(a, b);
                d.selectNode(a).select();
              });
          },
          queryCommandState: function() {
            return this.queryCommandValue("link") ? 1 : 0;
          },
          queryCommandValue: function() {
            var a = this.selection.getStartElementPath(),
                b;
            h.each(a, function(a, c) {
              if ("A" == c.nodeName)
                return b = c, !1;
            });
            return b;
          }
        };
        this.commands.unlink = {execCommand: function() {
            this.document.execCommand("unlink");
          }};
      };
      UM.commands.print = {
        execCommand: function() {
          var a = "editor_print_" + +new Date;
          h('<iframe src="" id="' + a + '" name="' + a + '" frameborder="0"></iframe>').attr("id", a).css({
            width: "0px",
            height: "0px",
            overflow: "hidden",
            "float": "left",
            position: "absolute",
            top: "-10000px",
            left: "-10000px"
          }).appendTo(this.$container.find(".edui-dialog-container"));
          var b = window.open("", a, "").document;
          b.open();
          b.write("<html><head></head><body><div>" + this.getContent(null, null, !0) + "</div><script>setTimeout(function(){window.print();setTimeout(function(){window.parent.$('#" + a + "').remove();},100);},200);\x3c/script></body></html>");
          b.close();
        },
        notNeedUndo: 1
      };
      UM.plugins.paragraph = function() {
        this.setOpt("paragraph", {
          p: "",
          h1: "",
          h2: "",
          h3: "",
          h4: "",
          h5: "",
          h6: ""
        });
        this.commands.paragraph = {
          execCommand: function(a, b) {
            return this.document.execCommand("formatBlock", !1, "<" + b + ">");
          },
          queryCommandValue: function() {
            try {
              var a = this.document.queryCommandValue("formatBlock");
            } catch (b) {}
            return a;
          }
        };
      };
      UM.plugins.horizontal = function() {
        var a = this;
        a.commands.horizontal = {execCommand: function() {
            this.document.execCommand("insertHorizontalRule");
            var b = a.selection.getRange().txtToElmBoundary(!0),
                d = b.startContainer;
            if (k.isBody(b.startContainer))
              (d = b.startContainer.childNodes[b.startOffset]) || (d = h("<p></p>").appendTo(b.startContainer).html(m.ie ? "&nbsp;" : "<br/>")[0]), b.setStart(d, 0).setCursor();
            else {
              for (; q.$inline[d.tagName] && d.lastChild === d.firstChild; ) {
                var c = d.parentNode;
                c.appendChild(d.firstChild);
                c.removeChild(d);
                d = c;
              }
              for (; q.$inline[d.tagName]; )
                d = d.parentNode;
              1 == d.childNodes.length && "HR" == d.lastChild.nodeName ? (c = d.lastChild, h(c).insertBefore(d), b.setStart(d, 0).setCursor()) : (c = h("hr", d)[0], k.breakParent(c, d), (d = c.previousSibling) && k.isEmptyBlock(d) && h(d).remove(), b.setStart(c.nextSibling, 0).setCursor());
            }
          }};
      };
      UM.commands.cleardoc = {execCommand: function() {
          var a = this,
              b = a.selection.getRange();
          a.body.innerHTML = "<p>" + (E ? "" : "<br/>") + "</p>";
          b.setStart(a.body.firstChild, 0).setCursor(!1, !0);
          setTimeout(function() {
            a.fireEvent("clearDoc");
          }, 0);
        }};
      UM.plugins.undo = function() {
        function a(a, b) {
          if (a.length != b.length)
            return 0;
          for (var c = 0,
              d = a.length; c < d; c++)
            if (a[c] != b[c])
              return 0;
          return 1;
        }
        function b() {
          this.undoManger.save();
        }
        var d,
            c = this.options.maxUndoCount || 20,
            e = this.options.maxInputCount || 20,
            g = new RegExp(k.fillChar + "|</hr>", "gi"),
            f = {
              ol: 1,
              ul: 1,
              table: 1,
              tbody: 1,
              tr: 1,
              body: 1
            },
            l = this.options.autoClearEmptyNode;
        this.undoManger = new function() {
          this.list = [];
          this.index = 0;
          this.hasRedo = this.hasUndo = !1;
          this.undo = function() {
            if (this.hasUndo)
              if (this.list[this.index - 1] || 1 != this.list.length) {
                for (; this.list[this.index].content == this.list[this.index - 1].content; )
                  if (this.index--, 0 == this.index)
                    return this.restore(0);
                this.restore(--this.index);
              } else
                this.reset();
          };
          this.redo = function() {
            if (this.hasRedo) {
              for (; this.list[this.index].content == this.list[this.index + 1].content; )
                if (this.index++, this.index == this.list.length - 1)
                  return this.restore(this.index);
              this.restore(++this.index);
            }
          };
          this.restore = function() {
            var a = this.editor,
                b = this.list[this.index],
                c = UM.htmlparser(b.content.replace(g, ""));
            a.options.autoClearEmptyNode = !1;
            a.filterInputRule(c, !0);
            a.options.autoClearEmptyNode = l;
            a.body.innerHTML = c.toHtml();
            a.fireEvent("afterscencerestore");
            m.ie && n.each(k.getElementsByTagName(a.document, "td th caption p"), function(b) {
              k.isEmptyNode(b) && k.fillNode(a.document, b);
            });
            try {
              var d = (new x.Range(a.document, a.body)).moveToAddress(b.address);
              if (m.ie && d.collapsed && 1 == d.startContainer.nodeType) {
                var e = d.startContainer.childNodes[d.startOffset];
                (!e || 1 == e.nodeType && q.$empty[e]) && d.insertNode(a.document.createTextNode(" ")).collapse(!0);
              }
              d.select(f[d.startContainer.nodeName.toLowerCase()]);
            } catch (h) {}
            this.update();
            this.clearKey();
            a.fireEvent("reset", !0);
          };
          this.getScene = function() {
            var a = this.editor,
                b = a.selection.getRange().createAddress(!1, !0);
            a.fireEvent("beforegetscene");
            var c = UM.htmlparser(a.body.innerHTML, !0);
            a.options.autoClearEmptyNode = !1;
            a.filterOutputRule(c, !0);
            a.options.autoClearEmptyNode = l;
            c = c.toHtml();
            m.ie && (c = c.replace(/>&nbsp;</g, "><").replace(/\s*</g, "<").replace(/>\s*/g, ">"));
            a.fireEvent("aftergetscene");
            return {
              address: b,
              content: c
            };
          };
          this.save = function(b, e) {
            clearTimeout(d);
            var f = this.getScene(e),
                g = this.list[this.index],
                l;
            if (l = g && g.content == f.content)
              b ? g = 1 : (g = g.address, l = f.address, g = g.collapsed != l.collapsed ? 0 : a(g.startAddress, l.startAddress) && a(g.endAddress, l.endAddress) ? 1 : 0), l = g;
            l || (this.list = this.list.slice(0, this.index + 1), this.list.push(f), this.list.length > c && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update());
          };
          this.update = function() {
            this.hasRedo = !!this.list[this.index + 1];
            this.hasUndo = !!this.list[this.index - 1];
          };
          this.reset = function() {
            this.list = [];
            this.index = 0;
            this.hasRedo = this.hasUndo = !1;
            this.clearKey();
          };
          this.clearKey = function() {
            t = 0;
          };
        };
        this.undoManger.editor = this;
        this.addListener("saveScene", function() {
          var a = Array.prototype.splice.call(arguments, 1);
          this.undoManger.save.apply(this.undoManger, a);
        });
        this.addListener("beforeexeccommand", b);
        this.addListener("afterexeccommand", b);
        this.addListener("reset", function(a, b) {
          b || this.undoManger.reset();
        });
        this.commands.redo = this.commands.undo = {
          execCommand: function(a) {
            this.undoManger[a]();
          },
          queryCommandState: function(a) {
            return this.undoManger["has" + ("undo" == a.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1;
          },
          notNeedUndo: 1
        };
        var u = {
          16: 1,
          17: 1,
          18: 1,
          37: 1,
          38: 1,
          39: 1,
          40: 1
        },
            t = 0,
            r = !1;
        this.addListener("ready", function() {
          h(this.body).on("compositionstart", function() {
            r = !0;
          }).on("compositionend", function() {
            r = !1;
          });
        });
        this.addshortcutkey({
          Undo: "ctrl+90",
          Redo: "ctrl+89,shift+ctrl+z"
        });
        var p = !0;
        this.addListener("keydown", function(a, b) {
          var c = this;
          if (!(u[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey)) {
            var f = function(a) {
              a.selection.getRange().collapsed && a.fireEvent("contentchange");
              a.undoManger.save(!1, !0);
              a.fireEvent("selectionchange");
            };
            r || (c.selection.getRange().collapsed ? (0 == c.undoManger.list.length && c.undoManger.save(!0), clearTimeout(d), d = setTimeout(function() {
              if (r)
                var a = setInterval(function() {
                  r || (f(c), clearInterval(a));
                }, 300);
              else
                f(c);
            }, 200), t++, t >= e && f(c)) : (c.undoManger.save(!1, !0), p = !1));
          }
        });
        this.addListener("keyup", function(a, b) {
          u[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || r || p || (this.undoManger.save(!1, !0), p = !0);
        });
      };
      UM.plugins.paste = function() {
        function a(a) {
          var b = this.document;
          if (!b.getElementById("baidu_pastebin")) {
            var d = this.selection.getRange(),
                f = d.createBookmark(),
                l = b.createElement("div");
            l.id = "baidu_pastebin";
            m.webkit && l.appendChild(b.createTextNode(k.fillChar + k.fillChar));
            this.body.appendChild(l);
            f.start.style.display = "";
            l.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + h(f.start).position().top + "px";
            d.selectNodeContents(l).select(!0);
            setTimeout(function() {
              if (m.webkit)
                for (var h = 0,
                    t = b.querySelectorAll("#baidu_pastebin"),
                    r; r = t[h++]; )
                  if (k.isEmptyNode(r))
                    k.remove(r);
                  else {
                    l = r;
                    break;
                  }
              try {
                l.parentNode.removeChild(l);
              } catch (p) {}
              d.moveToBookmark(f).select(!0);
              a(l);
            }, 0);
          }
        }
        function b(a) {
          var b;
          if (a.firstChild) {
            var g = k.getElementsByTagName(a, "span");
            b = 0;
            for (var f; f = g[b++]; )
              "_baidu_cut_start" != f.id && "_baidu_cut_end" != f.id || k.remove(f);
            if (m.webkit) {
              f = a.querySelectorAll("div br");
              for (b = 0; g = f[b++]; )
                g = g.parentNode, "DIV" == g.tagName && 1 == g.childNodes.length && (g.innerHTML = "<p><br/></p>", k.remove(g));
              g = a.querySelectorAll("#baidu_pastebin");
              for (b = 0; f = g[b++]; ) {
                var l = d.document.createElement("p");
                for (f.parentNode.insertBefore(l, f); f.firstChild; )
                  l.appendChild(f.firstChild);
                k.remove(f);
              }
              f = a.querySelectorAll("meta");
              for (b = 0; g = f[b++]; )
                k.remove(g);
              f = a.querySelectorAll("br");
              for (b = 0; g = f[b++]; )
                /^apple-/i.test(g.className) && k.remove(g);
            }
            if (m.gecko)
              for (f = a.querySelectorAll("[_moz_dirty]"), b = 0; g = f[b++]; )
                g.removeAttribute("_moz_dirty");
            if (!m.ie)
              for (f = a.querySelectorAll("span.Apple-style-span"), b = 0; g = f[b++]; )
                k.remove(g, !0);
            b = a.innerHTML;
            b = UM.filterWord(b);
            a = UM.htmlparser(b);
            d.options.filterRules && UM.filterNode(a, d.options.filterRules);
            d.filterInputRule(a);
            m.webkit && ((b = a.lastChild()) && "element" == b.type && "br" == b.tagName && a.removeChild(b), n.each(d.body.querySelectorAll("div"), function(a) {
              k.isEmptyBlock(a) && k.remove(a);
            }));
            b = {html: a.toHtml()};
            d.fireEvent("beforepaste", b, a);
            b.html && (d.execCommand("insertHtml", b.html, !0), d.fireEvent("afterpaste", b));
          }
        }
        var d = this;
        d.addListener("ready", function() {
          h(d.body).on("cut", function() {
            !d.selection.getRange().collapsed && d.undoManger && d.undoManger.save();
          }).on(m.ie || m.opera ? "keydown" : "paste", function(c) {
            (!m.ie && !m.opera || (c.ctrlKey || c.metaKey) && "86" == c.keyCode) && a.call(d, function(a) {
              b(a);
            });
          });
        });
      };
      UM.plugins.list = function() {
        this.setOpt({
          insertorderedlist: {
            decimal: "",
            "lower-alpha": "",
            "lower-roman": "",
            "upper-alpha": "",
            "upper-roman": ""
          },
          insertunorderedlist: {
            circle: "",
            disc: "",
            square: ""
          }
        });
        this.addInputRule(function(a) {
          n.each(a.getNodesByTagName("li"), function(a) {
            0 == a.children.length && a.parentNode.removeChild(a);
          });
        });
        this.commands.insertorderedlist = this.commands.insertunorderedlist = {
          execCommand: function(a) {
            this.document.execCommand(a);
            a = this.selection.getRange();
            var b = a.createBookmark(!0);
            this.$body.find("ol,ul").each(function(a, b) {
              var e = b.parentNode;
              "P" == e.tagName && e.lastChild === e.firstChild && (h(b).children().each(function(a, b) {
                var c = e.cloneNode(!1);
                h(c).append(b.innerHTML);
                h(b).html("").append(c);
              }), h(b).insertBefore(e), h(e).remove());
              q.$inline[e.tagName] && ("SPAN" == e.tagName && h(b).children().each(function(a, b) {
                var c = e.cloneNode(!1);
                if ("P" != b.firstChild.nodeName) {
                  for (; b.firstChild; )
                    c.appendChild(b.firstChild);
                  h("<p></p>").appendTo(b).append(c);
                } else {
                  for (; b.firstChild; )
                    c.appendChild(b.firstChild);
                  h(b.firstChild).append(c);
                }
              }), k.remove(e, !0));
            });
            a.moveToBookmark(b).select();
            return !0;
          },
          queryCommandState: function(a) {
            return this.document.queryCommandState(a);
          }
        };
      };
      (function() {
        var a = {textarea: function(a, d) {
            var c = d.ownerDocument.createElement("textarea");
            c.style.cssText = "resize:none;border:0;padding:0;margin:0;overflow-y:auto;outline:0";
            m.ie && 8 > m.version && (c.style.width = d.offsetWidth + "px", c.style.height = d.offsetHeight + "px", d.onresize = function() {
              c.style.width = d.offsetWidth + "px";
              c.style.height = d.offsetHeight + "px";
            });
            d.appendChild(c);
            return {
              container: c,
              setContent: function(a) {
                c.value = a;
              },
              getContent: function() {
                return c.value;
              },
              select: function() {
                var a;
                m.ie ? (a = c.createTextRange(), a.collapse(!0), a.select()) : (c.setSelectionRange(0, 0), c.focus());
              },
              dispose: function() {
                d.removeChild(c);
                d = c = d.onresize = null;
              }
            };
          }};
        UM.plugins.source = function() {
          var b = this,
              d = !1,
              c;
          this.options.sourceEditor = "textarea";
          b.setOpt({sourceEditorFirst: !1});
          var e = b.getContent,
              g;
          b.commands.source = {
            execCommand: function() {
              if (d = !d) {
                g = b.selection.getRange().createAddress(!1, !0);
                b.undoManger && b.undoManger.save(!0);
                m.gecko && (b.body.contentEditable = !1);
                b.body.style.cssText += ";position:absolute;left:-32768px;top:-32768px;";
                b.fireEvent("beforegetcontent");
                var f = UM.htmlparser(b.body.innerHTML);
                b.filterOutputRule(f);
                f.traversal(function(a) {
                  if ("element" == a.type)
                    switch (a.tagName) {
                      case "td":
                      case "th":
                      case "caption":
                        a.children && 1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
                        break;
                      case "pre":
                        a.innerText(a.innerText().replace(/&nbsp;/g, " "));
                    }
                });
                b.fireEvent("aftergetcontent");
                f = f.toHtml(!0);
                c = a.textarea(b, b.body.parentNode);
                c.setContent(f);
                h(c.container).width(h(b.body).width() + parseInt(h(b.body).css("padding-left")) + parseInt(h(b.body).css("padding-right"))).height(h(b.body).height());
                setTimeout(function() {
                  c.select();
                });
                b.getContent = function() {
                  return c.getContent() || "<p>" + (m.ie ? "" : "<br/>") + "</p>";
                };
              } else {
                b.$body.css({
                  position: "",
                  left: "",
                  top: ""
                });
                f = c.getContent() || "<p>" + (m.ie ? "" : "<br/>") + "</p>";
                f = f.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function(a, b) {
                  return b && !q.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "");
                });
                b.setContent(f);
                c.dispose();
                c = null;
                b.getContent = e;
                b.body.firstChild || (b.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>");
                b.undoManger && b.undoManger.save(!0);
                m.gecko && (b.body.contentEditable = !0);
                try {
                  b.selection.getRange().moveToAddress(g).select();
                } catch (k) {}
              }
              this.fireEvent("sourcemodechanged", d);
            },
            queryCommandState: function() {
              return d | 0;
            },
            notNeedUndo: 1
          };
          var f = b.queryCommandState;
          b.queryCommandState = function(a) {
            a = a.toLowerCase();
            return d ? a in {
              source: 1,
              fullscreen: 1
            } ? f.apply(this, arguments) : -1 : f.apply(this, arguments);
          };
        };
      })();
      UM.plugins.enterkey = function() {
        var a,
            b = this,
            d = b.options.enterTag;
        b.addListener("keyup", function(c, d) {
          if (13 == (d.keyCode || d.which)) {
            var g = b.selection.getRange(),
                f = g.startContainer,
                l;
            if (m.ie)
              b.fireEvent("saveScene", !0, !0);
            else {
              if (/h\d/i.test(a)) {
                if (m.gecko)
                  k.findParentByTagName(f, "h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "), !0) || (b.document.execCommand("formatBlock", !1, "<p>"), l = 1);
                else if (1 == f.nodeType) {
                  var f = b.document.createTextNode(""),
                      h;
                  g.insertNode(f);
                  if (h = k.findParentByTagName(f, "div", !0)) {
                    for (l = b.document.createElement("p"); h.firstChild; )
                      l.appendChild(h.firstChild);
                    h.parentNode.insertBefore(l, h);
                    k.remove(h);
                    g.setStartBefore(f).setCursor();
                    l = 1;
                  }
                  k.remove(f);
                }
                b.undoManger && l && b.undoManger.save();
              }
              m.opera && g.select();
            }
          }
        });
        b.addListener("keydown", function(c, e) {
          if (13 == (e.keyCode || e.which))
            if (b.fireEvent("beforeenterkeydown"))
              k.preventDefault(e);
            else {
              b.fireEvent("saveScene", !0, !0);
              a = "";
              var g = b.selection.getRange();
              if (!g.collapsed) {
                var f = g.startContainer,
                    l = g.endContainer,
                    f = k.findParentByTagName(f, "td", !0),
                    l = k.findParentByTagName(l, "td", !0);
                if (f && l && f !== l || !f && l || f && !l) {
                  e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                  return;
                }
              }
              "p" != d || m.ie || ((f = k.findParentByTagName(g.startContainer, "ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "), !0)) || m.opera ? (a = f.tagName, "p" == f.tagName.toLowerCase() && m.gecko && k.removeDirtyAttr(f)) : (b.document.execCommand("formatBlock", !1, "<p>"), m.gecko && (g = b.selection.getRange(), (f = k.findParentByTagName(g.startContainer, "p", !0)) && k.removeDirtyAttr(f))));
            }
        });
        m.ie && b.addListener("setDisabled", function() {
          h(b.body).find("p").each(function(a, b) {
            k.isEmptyBlock(b) && (b.innerHTML = "&nbsp;");
          });
        });
      };
      UM.commands.preview = {
        execCommand: function() {
          var a = window.open("", "_blank", "").document,
              b = this.getContent(null, null, !0),
              d = this.getOpt("UMEDITOR_HOME_URL"),
              d = -1 != b.indexOf("mathquill-embedded-latex") ? '<link rel="stylesheet" href="' + d + 'third-party/mathquill/mathquill.css"/><script src="' + d + 'third-party/jquery.min.js">\x3c/script><script src="' + d + 'third-party/mathquill/mathquill.min.js">\x3c/script>' : "";
          a.open();
          a.write("<html><head>" + d + "</head><body><div>" + b + "</div></body></html>");
          a.close();
        },
        notNeedUndo: 1
      };
      UM.plugins.basestyle = function() {
        var a = this;
        a.addshortcutkey({
          Bold: "ctrl+66",
          Italic: "ctrl+73",
          Underline: "ctrl+shift+85",
          strikeThrough: "ctrl+shift+83"
        });
        a.addOutputRule(function(a) {
          h.each(a.getNodesByTagName("b i u strike s"), function(a, b) {
            switch (b.tagName) {
              case "b":
                b.tagName = "strong";
                break;
              case "i":
                b.tagName = "em";
                break;
              case "u":
                b.tagName = "span";
                b.setStyle("text-decoration", "underline");
                break;
              case "s":
              case "strike":
                b.tagName = "span", b.setStyle("text-decoration", "line-through");
            }
          });
        });
        h.each("bold underline superscript subscript italic strikethrough".split(" "), function(b, d) {
          a.commands[d] = {
            execCommand: function(a) {
              var b = this.selection.getRange();
              return b.collapsed && 1 != this.queryCommandState(a) ? (a = this.document.createElement({
                bold: "strong",
                underline: "u",
                superscript: "sup",
                subscript: "sub",
                italic: "em",
                strikethrough: "strike"
              }[a]), b.insertNode(a).setStart(a, 0).setCursor(!1), !0) : this.document.execCommand(a);
            },
            queryCommandState: function(a) {
              if (m.gecko)
                return this.document.queryCommandState(a);
              var b = this.selection.getStartElementPath(),
                  d = !1;
              h.each(b, function(b, e) {
                switch (a) {
                  case "bold":
                    if ("STRONG" == e.nodeName || "B" == e.nodeName)
                      return d = 1, !1;
                    break;
                  case "underline":
                    if ("U" == e.nodeName || "SPAN" == e.nodeName && "underline" == h(e).css("text-decoration"))
                      return d = 1, !1;
                    break;
                  case "superscript":
                    if ("SUP" == e.nodeName)
                      return d = 1, !1;
                    break;
                  case "subscript":
                    if ("SUB" == e.nodeName)
                      return d = 1, !1;
                    break;
                  case "italic":
                    if ("EM" == e.nodeName || "I" == e.nodeName)
                      return d = 1, !1;
                    break;
                  case "strikethrough":
                    if ("S" == e.nodeName || "STRIKE" == e.nodeName || "SPAN" == e.nodeName && "line-through" == h(e).css("text-decoration"))
                      return d = 1, !1;
                }
              });
              return d;
            }
          };
        });
      };
      UM.plugins.video = function() {
        function a(a, b, g, f, l, h) {
          return h ? '<embed type="application/x-shockwave-flash" class="edui-faked-video" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + a + '" width="' + b + '" height="' + g + '"' + (l ? ' style="float:' + l + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' : "<img " + (f ? 'id="' + f + '"' : "") + ' width="' + b + '" height="' + g + '" _url="' + a + '" class="edui-faked-video" src="' + d.options.UMEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + d.options.UMEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (l ? "float:" + l + ";" : "") + '" />';
        }
        function b(b, d) {
          n.each(b.getNodesByTagName(d ? "img" : "embed"), function(b) {
            if ("edui-faked-video" == b.getAttr("class")) {
              var c = a(d ? b.getAttr("_url") : b.getAttr("src"), b.getAttr("width"), b.getAttr("height"), null, b.getStyle("float") || "", d);
              b.parentNode.replaceChild(UM.uNode.createElement(c), b);
            }
          });
        }
        var d = this;
        d.addOutputRule(function(a) {
          b(a, !0);
        });
        d.addInputRule(function(a) {
          b(a);
        });
        d.commands.insertvideo = {
          execCommand: function(b, e) {
            e = n.isArray(e) ? e : [e];
            for (var g = [],
                f = 0,
                l,
                h = e.length; f < h; f++)
              l = e[f], g.push(a(l.url, l.width || 420, l.height || 280, "tmpVedio" + f, l.align, !1));
            d.execCommand("inserthtml", g.join(""), !0);
          },
          queryCommandState: function() {
            var a = d.selection.getRange().getClosedNode();
            return a && "edui-faked-video" == a.className ? 1 : 0;
          }
        };
      };
      UM.plugins.selectall = function() {
        this.commands.selectall = {
          execCommand: function() {
            var a = this.body,
                b = this.selection.getRange();
            b.selectNodeContents(a);
            k.isEmptyBlock(a) && (m.opera && a.firstChild && 1 == a.firstChild.nodeType && b.setStartAtFirst(a.firstChild), b.collapse(!0));
            b.select(!0);
          },
          notNeedUndo: 1
        };
        this.addshortcutkey({selectAll: "ctrl+65"});
      };
      UM.plugins.removeformat = function() {
        this.setOpt({
          removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
          removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
        });
        this.commands.removeformat = {execCommand: function(a, b, d, c, e) {
            function g(a) {
              if (3 == a.nodeType || "span" != a.tagName.toLowerCase())
                return 0;
              if (m.ie) {
                var b = a.attributes;
                if (b.length) {
                  a = 0;
                  for (var c = b.length; a < c; a++)
                    if (b[a].specified)
                      return 0;
                  return 1;
                }
              }
              return !a.attributes.length;
            }
            function f(a) {
              var b = a.createBookmark();
              a.collapsed && a.enlarge(!0);
              if (!e) {
                var c = k.findParentByTagName(a.startContainer, "a", !0);
                c && a.setStartBefore(c);
                (c = k.findParentByTagName(a.endContainer, "a", !0)) && a.setEndAfter(c);
              }
              t = a.createBookmark();
              for (c = t.start; (r = c.parentNode) && !k.isBlockElm(r); )
                k.breakParent(c, r), k.clearEmptySibling(c);
              if (t.end) {
                for (c = t.end; (r = c.parentNode) && !k.isBlockElm(r); )
                  k.breakParent(c, r), k.clearEmptySibling(c);
                for (var c = k.getNextDomNode(t.start, !1, p),
                    f; c && c != t.end; )
                  f = k.getNextDomNode(c, !0, p), q.$empty[c.tagName.toLowerCase()] || k.isBookmarkNode(c) || (l.test(c.tagName) ? d ? (k.removeStyle(c, d), g(c) && "text-decoration" != d && k.remove(c, !0)) : k.remove(c, !0) : q.$tableContent[c.tagName] || q.$list[c.tagName] || (k.removeAttributes(c, h), g(c) && k.remove(c, !0))), c = f;
              }
              c = t.start.parentNode;
              !k.isBlockElm(c) || q.$tableContent[c.tagName] || q.$list[c.tagName] || k.removeAttributes(c, h);
              c = t.end.parentNode;
              t.end && k.isBlockElm(c) && !q.$tableContent[c.tagName] && !q.$list[c.tagName] && k.removeAttributes(c, h);
              a.moveToBookmark(t).moveToBookmark(b);
              c = a.startContainer;
              for (f = a.collapsed; 1 == c.nodeType && k.isEmptyNode(c) && q.$removeEmpty[c.tagName]; )
                b = c.parentNode, a.setStartBefore(c), a.startContainer === a.endContainer && a.endOffset--, k.remove(c), c = b;
              if (!f)
                for (c = a.endContainer; 1 == c.nodeType && k.isEmptyNode(c) && q.$removeEmpty[c.tagName]; )
                  b = c.parentNode, a.setEndBefore(c), k.remove(c), c = b;
            }
            var l = new RegExp("^(?:" + (b || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
                h = d ? [] : (c || this.options.removeFormatAttributes).split(",");
            a = new x.Range(this.document);
            var t,
                r,
                p = function(a) {
                  return 1 == a.nodeType;
                };
            a = this.selection.getRange();
            a.collapsed || (f(a), a.select());
          }};
      };
      UM.plugins.keystrokes = function() {
        var a = this,
            b = !0;
        a.addListener("keydown", function(d, c) {
          var e = c.keyCode || c.which,
              g = a.selection.getRange();
          if (!(g.collapsed || c.ctrlKey || c.shiftKey || c.altKey || c.metaKey) && (65 <= e && 90 >= e || 48 <= e && 57 >= e || 96 <= e && 111 >= e || {
            13: 1,
            8: 1,
            46: 1
          }[e])) {
            var f = g.startContainer;
            k.isFillChar(f) && g.setStartBefore(f);
            f = g.endContainer;
            k.isFillChar(f) && g.setEndAfter(f);
            g.txtToElmBoundary();
            g.endContainer && 1 == g.endContainer.nodeType && (f = g.endContainer.childNodes[g.endOffset]) && k.isBr(f) && g.setEndAfter(f);
            if (0 == g.startOffset && (f = g.startContainer, k.isBoundaryNode(f, "firstChild") && (f = g.endContainer, g.endOffset == (3 == f.nodeType ? f.nodeValue.length : f.childNodes.length) && k.isBoundaryNode(f, "lastChild")))) {
              a.fireEvent("saveScene");
              a.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>";
              g.setStart(a.body.firstChild, 0).setCursor(!1, !0);
              a._selectionChange();
              return;
            }
          }
          if (8 == e) {
            g = a.selection.getRange();
            b = g.collapsed;
            if (a.fireEvent("delkeydown", c))
              return;
            var l;
            g.collapsed && g.inFillChar() && (f = g.startContainer, k.isFillChar(f) ? (g.setStartBefore(f).shrinkBoundary(!0).collapse(!0), k.remove(f)) : (f.nodeValue = f.nodeValue.replace(new RegExp("^" + k.fillChar), ""), g.startOffset--, g.collapse(!0).select(!0)));
            if (f = g.getClosedNode()) {
              a.fireEvent("saveScene");
              g.setStartBefore(f);
              k.remove(f);
              g.setCursor();
              a.fireEvent("saveScene");
              k.preventDefault(c);
              return;
            }
            if (!m.ie && (f = k.findParentByTagName(g.startContainer, "table", !0), l = k.findParentByTagName(g.endContainer, "table", !0), f && !l || !f && l || f !== l)) {
              c.preventDefault();
              return;
            }
            f = g.startContainer;
            g.collapsed && 1 == f.nodeType && (f = f.childNodes[g.startOffset - 1]) && 1 == f.nodeType && "BR" == f.tagName && (a.fireEvent("saveScene"), g.setStartBefore(f).collapse(!0), k.remove(f), g.select(), a.fireEvent("saveScene"));
            if (m.chrome && g.collapsed) {
              for (; 0 == g.startOffset && !k.isEmptyBlock(g.startContainer); )
                g.setStartBefore(g.startContainer);
              (f = g.startContainer.childNodes[g.startOffset - 1]) && "BR" == f.nodeName && (g.setStartBefore(f), a.fireEvent("saveScene"), h(f).remove(), g.setCursor(), a.fireEvent("saveScene"));
            }
          }
          if (m.gecko && 46 == e && (e = a.selection.getRange(), e.collapsed && (f = e.startContainer, k.isEmptyBlock(f)))) {
            for (e = f.parentNode; 1 == k.getChildCount(e) && !k.isBody(e); )
              f = e, e = e.parentNode;
            f === e.lastChild && c.preventDefault();
          }
        });
        a.addListener("keyup", function(a, c) {
          var e;
          if (8 == (c.keyCode || c.which) && !this.fireEvent("delkeyup")) {
            e = this.selection.getRange();
            if (e.collapsed) {
              var g;
              if ((g = k.findParentByTagName(e.startContainer, "h1 h2 h3 h4 h5 h6".split(" "), !0)) && k.isEmptyBlock(g)) {
                var f = g.previousSibling;
                if (f && "TABLE" != f.nodeName) {
                  k.remove(g);
                  e.setStartAtLast(f).setCursor(!1, !0);
                  return;
                }
                if ((f = g.nextSibling) && "TABLE" != f.nodeName) {
                  k.remove(g);
                  e.setStartAtFirst(f).setCursor(!1, !0);
                  return;
                }
              }
              k.isBody(e.startContainer) && (g = k.createElement(this.document, "p", {innerHTML: m.ie ? k.fillChar : "<br/>"}), e.insertNode(g).setStart(g, 0).setCursor(!1, !0));
            }
            !b && (3 == e.startContainer.nodeType || 1 == e.startContainer.nodeType && k.isEmptyBlock(e.startContainer)) && (m.ie ? (g = e.document.createElement("span"), e.insertNode(g).setStartBefore(g).collapse(!0), e.select(), k.remove(g)) : e.select());
          }
        });
      };
      UM.plugins.autosave = function() {
        function a(a) {
          var f = null;
          20 > new Date - d || (a.hasContents() ? (d = new Date, a._saveFlag = null, f = b.body.innerHTML, !1 !== a.fireEvent("beforeautosave", {content: f}) && (e.saveLocalData(c, f), a.fireEvent("afterautosave", {content: f}))) : c && e.removeItem(c));
        }
        var b = this,
            d = new Date,
            c = null;
        b.setOpt("saveInterval", 500);
        var e = UM.LocalStorage = function() {
          function a() {
            var b = document.createElement("div");
            b.style.display = "none";
            if (!b.addBehavior)
              return null;
            b.addBehavior("#default#userdata");
            return {
              getItem: function(a) {
                var d = null;
                try {
                  document.body.appendChild(b), b.load(c), d = b.getAttribute(a), document.body.removeChild(b);
                } catch (e) {}
                return d;
              },
              setItem: function(a, d) {
                document.body.appendChild(b);
                b.setAttribute(a, d);
                b.save(c);
                document.body.removeChild(b);
              },
              removeItem: function(a) {
                document.body.appendChild(b);
                b.removeAttribute(a);
                b.save(c);
                document.body.removeChild(b);
              }
            };
          }
          var b = window.localStorage || a() || null,
              c = "localStorage";
          return {
            saveLocalData: function(a, c) {
              return b && c ? (b.setItem(a, c), !0) : !1;
            },
            getLocalData: function(a) {
              return b ? b.getItem(a) : null;
            },
            removeItem: function(a) {
              b && b.removeItem(a);
            }
          };
        }();
        b.addListener("ready", function() {
          var a = null,
              a = b.key ? b.key + "-drafts-data" : (b.container.parentNode.id || "ue-common") + "-drafts-data";
          c = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + a;
        });
        b.addListener("contentchange", function() {
          c && (b._saveFlag && window.clearTimeout(b._saveFlag), 0 < b.options.saveInterval ? b._saveFlag = window.setTimeout(function() {
            a(b);
          }, b.options.saveInterval) : a(b));
        });
        b.commands.clearlocaldata = {
          execCommand: function(a, b) {
            c && e.getLocalData(c) && e.removeItem(c);
          },
          notNeedUndo: !0,
          ignoreContentChange: !0
        };
        b.commands.getlocaldata = {
          execCommand: function(a, b) {
            return c ? e.getLocalData(c) || "" : "";
          },
          notNeedUndo: !0,
          ignoreContentChange: !0
        };
        b.commands.drafts = {
          execCommand: function(a, d) {
            c && (b.body.innerHTML = e.getLocalData(c) || "<p>" + (m.ie ? "&nbsp;" : "<br/>") + "</p>", b.focus(!0));
          },
          queryCommandState: function() {
            return c ? null === e.getLocalData(c) ? -1 : 0 : -1;
          },
          notNeedUndo: !0,
          ignoreContentChange: !0
        };
      };
      UM.plugins.autoupload = function() {
        var a = this;
        a.setOpt("pasteImageEnabled", !0);
        a.setOpt("dropFileEnabled", !0);
        var b = function(b, c) {
          var e = new FormData;
          e.append(c.options.imageFieldName || "upfile", b, b.name || "blob." + b.type.substr(6));
          e.append("type", "ajax");
          var g = new XMLHttpRequest;
          g.open("post", a.options.imageUrl, !0);
          g.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          g.addEventListener("load", function(b) {
            try {
              var d = eval("(" + b.target.response + ")").url,
                  e = a.options.imagePath + d;
              c.execCommand("insertimage", {
                src: e,
                _src: e
              });
            } catch (g) {}
          });
          g.send(e);
        };
        a.addListener("ready", function() {
          if (window.FormData && window.FileReader) {
            var d = function(c) {
              var d = !1;
              "paste" == c.type ? (c = c.originalEvent, c = c.clipboardData && c.clipboardData.items && 1 == c.clipboardData.items.length && /^image\//.test(c.clipboardData.items[0].type) ? c.clipboardData.items : null) : (c = c.originalEvent, c = c.dataTransfer && c.dataTransfer.files ? c.dataTransfer.files : null);
              if (c) {
                for (var g = c.length,
                    f; g--; )
                  f = c[g], f.getAsFile && (f = f.getAsFile()), f && 0 < f.size && /image\/\w+/i.test(f.type) && (b(f, a), d = !0);
                if (d)
                  return !1;
              }
            };
            a.getOpt("pasteImageEnabled") && a.$body.on("paste", d);
            a.getOpt("dropFileEnabled") && a.$body.on("drop", d);
            a.$body.on("dragover", function(a) {
              if ("Files" == a.originalEvent.dataTransfer.types[0])
                return !1;
            });
          }
        });
      };
      UM.plugins.formula = function() {
        function a() {
          return d.$body.find("iframe.edui-formula-active")[0] || null;
        }
        function b() {
          var b = a();
          b && b.contentWindow.formula.blur();
        }
        var d = this;
        d.addInputRule(function(a) {
          h.each(a.getNodesByTagName("span"), function(a, b) {
            if (b.hasClass("mathquill-embedded-latex")) {
              for (var c,
                  l = ""; c = b.firstChild(); )
                l += c.data, b.removeChild(c);
              b.tagName = "iframe";
              b.setAttr({
                frameborder: "0",
                src: d.getOpt("UMEDITOR_HOME_URL") + "dialogs/formula/formula.html",
                "data-latex": n.unhtml(l)
              });
            }
          });
        });
        d.addOutputRule(function(a) {
          h.each(a.getNodesByTagName("iframe"), function(a, b) {
            b.hasClass("mathquill-embedded-latex") && (b.tagName = "span", b.appendChild(UM.uNode.createText(b.getAttr("data-latex"))), b.setAttr({
              frameborder: "",
              src: "",
              "data-latex": ""
            }));
          });
        });
        d.addListener("click", function() {
          b();
        });
        d.addListener("afterexeccommand", function(a, d) {
          "formula" != d && b();
        });
        d.commands.formula = {
          execCommand: function(b, e) {
            var g = a();
            g ? g.contentWindow.formula.insertLatex(e) : (d.execCommand("inserthtml", '<span class="mathquill-embedded-latex">' + e + "</span>"), m.ie && m.ie9below && setTimeout(function() {
              var a = d.selection.getRange(),
                  b = a.startContainer;
              1 != b.nodeType || b.childNodes[a.startOffset] || (a.insertNode(d.document.createTextNode(" ")), a.setCursor());
            }, 100));
          },
          queryCommandState: function(a) {
            return 0;
          },
          queryCommandValue: function(b) {
            return (b = a()) && b.contentWindow.formula.getLatex();
          }
        };
      };
      (function(a) {
        function b(b, c, d) {
          b.prototype = a.extend2(a.extend({}, c), (UM.ui[d] || e).prototype, !0);
          b.prototype.supper = (UM.ui[d] || e).prototype;
          UM.ui[d] && UM.ui[d].prototype.defaultOpt && (b.prototype.defaultOpt = a.extend({}, UM.ui[d].prototype.defaultOpt, b.prototype.defaultOpt || {}));
          return b;
        }
        function d(b, c) {
          a["edui" + c] = b;
          a.fn["edui" + c] = function(c) {
            var d,
                e = Array.prototype.slice.call(arguments, 1);
            this.each(function(g, l) {
              var h = a(l),
                  k = h.edui();
              k || (b(c && a.isPlainObject(c) ? c : {}, h), h.edui(k));
              if ("string" == a.type(c))
                if ("this" == c)
                  d = k;
                else {
                  d = k[c].apply(k, e);
                  if (d !== k && void 0 !== d)
                    return !1;
                  d = null;
                }
            });
            return null !== d ? d : this;
          };
        }
        a.parseTmpl = function(a, b) {
          var c = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g, function(a, b) {
            return "'," + b.replace(/\\'/g, "'") + ",'";
          }).replace(/<%([\s\S]+?)%>/g, function(a, b) {
            return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('";
          }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
              c = new Function("obj", c);
          return b ? c(b) : c;
        };
        a.extend2 = function(b, c) {
          for (var d = arguments,
              e = "boolean" == a.type(d[d.length - 1]) ? d[d.length - 1] : !1,
              g = "boolean" == a.type(d[d.length - 1]) ? d.length - 1 : d.length,
              h = 1; h < g; h++) {
            var k = d[h],
                m;
            for (m in k)
              e && b.hasOwnProperty(m) || (b[m] = k[m]);
          }
          return b;
        };
        a.IE6 = !!window.ActiveXObject && 6 == parseFloat(navigator.userAgent.match(/msie (\d+)/i)[1]);
        var c = [],
            e = function() {};
        e.prototype = {
          on: function(b, c) {
            this.root().on(b, a.proxy(c, this));
            return this;
          },
          off: function(b, c) {
            this.root().off(b, a.proxy(c, this));
            return this;
          },
          trigger: function(a, b) {
            return !1 === this.root().trigger(a, b) ? !1 : this;
          },
          root: function(a) {
            return this._$el || (this._$el = a);
          },
          destroy: function() {},
          data: function(a, b) {
            return void 0 !== b ? (this.root().data("edui" + a, b), this) : this.root().data("edui" + a);
          },
          register: function(b, d, e) {
            c.push({
              evtname: b,
              $els: a.isArray(d) ? d : [d],
              handler: a.proxy(e, d)
            });
          }
        };
        a.fn.edui = function(a) {
          return a ? this.data("eduiwidget", a) : this.data("eduiwidget");
        };
        var g = 1;
        UM.ui = {define: function(c, e, h) {
            var k = UM.ui[c] = b(function(b, d) {
              var e = function() {};
              a.extend(e.prototype, k.prototype, {
                guid: c + g++,
                widgetName: c
              });
              e = new e;
              if ("string" == a.type(b))
                return e.init && e.init({}), e.root().edui(e), e.root().find("a").click(function(a) {
                  a.preventDefault();
                }), e.root()["edui" + c].apply(e.root(), arguments);
              d && e.root(d);
              e.init && e.init(!b || a.isPlainObject(b) ? a.extend2(b || {}, e.defaultOpt || {}, !0) : b);
              try {
                e.root().find("a").click(function(a) {
                  a.preventDefault();
                });
              } catch (h) {}
              return e.root().edui(e);
            }, e, h);
            d(k, c);
          }};
        a(function() {
          a(document).on("click mouseup mousedown dblclick mouseover", function(b) {
            a.each(c, function(c, d) {
              d.evtname == b.type && a.each(d.$els, function(c, e) {
                e[0] === b.target || a.contains(e[0], b.target) || d.handler(b);
              });
            });
          });
        });
      })(jQuery);
      UM.ui.define("button", {
        tpl: '<<%if(!texttype){%>div class="edui-btn edui-btn-<%=icon%> <%if(name){%>edui-btn-name-<%=name%><%}%>" unselectable="on" onmousedown="return false" <%}else{%>a class="edui-text-btn"<%}%><% if(title) {%> data-original-title="<%=title%>" <%};%>> <% if(icon) {%><div unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><% }; %><%if(text) {%><span unselectable="on" onmousedown="return false" class="edui-button-label"><%=text%></span><%}%><%if(caret && text){%><span class="edui-button-spacing"></span><%}%><% if(caret) {%><span unselectable="on" onmousedown="return false" class="edui-caret"></span><% };%></<%if(!texttype){%>div<%}else{%>a<%}%>>',
        defaultOpt: {
          text: "",
          title: "",
          icon: "",
          width: "",
          caret: !1,
          texttype: !1,
          click: function() {}
        },
        init: function(a) {
          var b = this;
          b.root(h(h.parseTmpl(b.tpl, a))).click(function(d) {
            b.wrapclick(a.click, d);
          });
          b.root().hover(function() {
            b.root().hasClass("edui-disabled") || b.root().toggleClass("edui-hover");
          });
          return b;
        },
        wrapclick: function(a, b) {
          this.disabled() || (this.root().trigger("wrapclick"), h.proxy(a, this, b)());
          return this;
        },
        label: function(a) {
          if (void 0 === a)
            return this.root().find(".edui-button-label").text();
          this.root().find(".edui-button-label").text(a);
          return this;
        },
        disabled: function(a) {
          if (void 0 === a)
            return this.root().hasClass("edui-disabled");
          this.root().toggleClass("edui-disabled", a);
          this.root().hasClass("edui-disabled") && this.root().removeClass("edui-hover");
          return this;
        },
        active: function(a) {
          if (void 0 === a)
            return this.root().hasClass("edui-active");
          this.root().toggleClass("edui-active", a);
          return this;
        },
        mergeWith: function(a) {
          var b = this;
          b.data("$mergeObj", a);
          a.edui().data("$mergeObj", b.root());
          h.contains(document.body, a[0]) || a.appendTo(b.root());
          b.on("click", function() {
            b.wrapclick(function() {
              a.edui().show();
            });
          }).register("click", b.root(), function(b) {
            a.hide();
          });
        }
      });
      (function() {
        UM.ui.define("toolbar", {
          tpl: '<div class="edui-toolbar"  ><div class="edui-btn-toolbar" unselectable="on" onmousedown="return false"  ></div></div>',
          init: function() {
            var a = this.root(h(this.tpl));
            this.data("$btnToolbar", a.find(".edui-btn-toolbar"));
          },
          appendToBtnmenu: function(a) {
            var b = this.data("$btnToolbar");
            a = h.isArray(a) ? a : [a];
            h.each(a, function(a, c) {
              b.append(c);
            });
          }
        });
      })();
      UM.ui.define("menu", {
        show: function(a, b, d, c, e) {
          d = d || "position";
          !1 !== this.trigger("beforeshow") && (this.root().css(h.extend({display: "block"}, a ? {
            top: a[d]().top + ("right" == b ? 0 : a.outerHeight()) - (c || 0),
            left: a[d]().left + ("right" == b ? a.outerWidth() : 0) - (e || 0)
          } : {})), this.trigger("aftershow"));
        },
        hide: function(a) {
          var b;
          !1 !== this.trigger("beforehide") && ((b = this.root().data("parentmenu")) && (b.data("parentmenu") || a) && b.edui().hide(), this.root().css("display", "none"), this.trigger("afterhide"));
        },
        attachTo: function(a) {
          var b = this;
          a.data("$mergeObj") || (a.data("$mergeObj", b.root()), a.on("wrapclick", function(a) {
            b.show();
          }), b.register("click", a, function(a) {
            b.hide();
          }), b.data("$mergeObj", a));
        }
      });
      UM.ui.define("dropmenu", {
        tmpl: '<ul class="edui-dropdown-menu" aria-labelledby="dropdownMenu" ><%for(var i=0,ci;ci=data[i++];){%><%if(ci.divider){%><li class="edui-divider"></li><%}else{%><li <%if(ci.active||ci.disabled){%>class="<%= ci.active|| \'\' %> <%=ci.disabled||\'\' %>" <%}%> data-value="<%= ci.value%>"><a href="#" tabindex="-1"><em class="edui-dropmenu-checkbox"><i class="edui-icon-ok"></i></em><%= ci.label%></a></li><%}%><%}%></ul>',
        defaultOpt: {
          data: [],
          click: function() {}
        },
        init: function(a) {
          var b = this,
              d = {
                click: 1,
                mouseover: 1,
                mouseout: 1
              };
          this.root(h(h.parseTmpl(this.tmpl, a))).on("click", 'li[class!="edui-disabled edui-divider edui-dropdown-submenu"]', function(c) {
            h.proxy(a.click, b, c, h(this).data("value"), h(this))();
          }).find("li").each(function(c, e) {
            var g = h(this);
            if (!g.hasClass("edui-disabled edui-divider edui-dropdown-submenu")) {
              var f = a.data[c];
              h.each(d, function(a) {
                f[a] && g[a](function(c) {
                  h.proxy(f[a], e)(c, f, b.root);
                });
              });
            }
          });
        },
        disabled: function(a) {
          h("li[class!=edui-divider]", this.root()).each(function() {
            var b = h(this);
            !0 === a ? b.addClass("edui-disabled") : h.isFunction(a) ? b.toggleClass("edui-disabled", a(li)) : b.removeClass("edui-disabled");
          });
        },
        val: function(a) {
          var b;
          h('li[class!="edui-divider edui-disabled edui-dropdown-submenu"]', this.root()).each(function() {
            var d = h(this);
            if (void 0 === a) {
              if (d.find("em.edui-dropmenu-checked").length)
                return b = d.data("value"), !1;
            } else
              d.find("em").toggleClass("edui-dropmenu-checked", d.data("value") == a);
          });
          if (void 0 === a)
            return b;
        },
        addSubmenu: function(a, b, d) {
          d = d || 0;
          var c = h("li[class!=edui-divider]", this.root());
          a = h('<li class="edui-dropdown-submenu"><a tabindex="-1" href="#">' + a + "</a></li>").append(b);
          0 <= d && d < c.length ? a.insertBefore(c[d]) : 0 > d ? a.insertBefore(c[0]) : d >= c.length && a.appendTo(c);
        }
      }, "menu");
      UM.ui.define("splitbutton", {
        tpl: '<div class="edui-splitbutton <%if (name){%>edui-splitbutton-<%= name %><%}%>"  unselectable="on" <%if(title){%>data-original-title="<%=title%>"<%}%>><div class="edui-btn"  unselectable="on" ><%if(icon){%><div  unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><%}%><%if(text){%><%=text%><%}%></div><div  unselectable="on" class="edui-btn edui-dropdown-toggle" ><div  unselectable="on" class="edui-caret"></div></div></div>',
        defaultOpt: {
          text: "",
          title: "",
          click: function() {}
        },
        init: function(a) {
          var b = this;
          b.root(h(h.parseTmpl(b.tpl, a)));
          b.root().find(".edui-btn:first").click(function(d) {
            b.disabled() || h.proxy(a.click, b)();
          });
          b.root().find(".edui-dropdown-toggle").click(function() {
            b.disabled() || b.trigger("arrowclick");
          });
          b.root().hover(function() {
            b.root().hasClass("edui-disabled") || b.root().toggleClass("edui-hover");
          });
          return b;
        },
        wrapclick: function(a, b) {
          this.disabled() || h.proxy(a, this, b)();
          return this;
        },
        disabled: function(a) {
          if (void 0 === a)
            return this.root().hasClass("edui-disabled");
          this.root().toggleClass("edui-disabled", a).find(".edui-btn").toggleClass("edui-disabled", a);
          return this;
        },
        active: function(a) {
          if (void 0 === a)
            return this.root().hasClass("edui-active");
          this.root().toggleClass("edui-active", a).find(".edui-btn:first").toggleClass("edui-active", a);
          return this;
        },
        mergeWith: function(a) {
          var b = this;
          b.data("$mergeObj", a);
          a.edui().data("$mergeObj", b.root());
          h.contains(document.body, a[0]) || a.appendTo(b.root());
          b.root().delegate(".edui-dropdown-toggle", "click", function() {
            b.wrapclick(function() {
              a.edui().show();
            });
          });
          b.register("click", b.root().find(".edui-dropdown-toggle"), function(b) {
            a.hide();
          });
        }
      });
      UM.ui.define("colorsplitbutton", {
        tpl: '<div class="edui-splitbutton <%if (name){%>edui-splitbutton-<%= name %><%}%>"  unselectable="on" <%if(title){%>data-original-title="<%=title%>"<%}%>><div class="edui-btn"  unselectable="on" ><%if(icon){%><div  unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><%}%><div class="edui-splitbutton-color-label" <%if (color) {%>style="background: <%=color%>"<%}%>></div><%if(text){%><%=text%><%}%></div><div  unselectable="on" class="edui-btn edui-dropdown-toggle" ><div  unselectable="on" class="edui-caret"></div></div></div>',
        defaultOpt: {color: ""},
        init: function(a) {
          this.supper.init.call(this, a);
        },
        colorLabel: function() {
          return this.root().find(".edui-splitbutton-color-label");
        }
      }, "splitbutton");
      UM.ui.define("popup", {
        tpl: '<div class="edui-dropdown-menu edui-popup"<%if(!<%=stopprop%>){%>onmousedown="return false"<%}%>><div class="edui-popup-body" unselectable="on" onmousedown="return false"><%=subtpl%></div><div class="edui-popup-caret"></div></div>',
        defaultOpt: {
          stopprop: !1,
          subtpl: "",
          width: "",
          height: ""
        },
        init: function(a) {
          this.root(h(h.parseTmpl(this.tpl, a)));
          return this;
        },
        mergeTpl: function(a) {
          return h.parseTmpl(this.tpl, {subtpl: a});
        },
        show: function(a, b) {
          b || (b = {});
          var d = b.fnname || "position";
          !1 !== this.trigger("beforeshow") && (this.root().css(h.extend({display: "block"}, a ? {
            top: a[d]().top + ("right" == b.dir ? 0 : a.outerHeight()) - (b.offsetTop || 0),
            left: a[d]().left + ("right" == b.dir ? a.outerWidth() : 0) - (b.offsetLeft || 0),
            position: "absolute"
          } : {})), this.root().find(".edui-popup-caret").css({
            top: b.caretTop || 0,
            left: b.caretLeft || 0,
            position: "absolute"
          }).addClass(b.caretDir || "up"), this.trigger("aftershow"));
        },
        hide: function() {
          this.root().css("display", "none");
          this.trigger("afterhide");
        },
        attachTo: function(a, b) {
          var d = this;
          a.data("$mergeObj") || (a.data("$mergeObj", d.root()), a.on("wrapclick", function(c) {
            d.show(a, b);
          }), d.register("click", a, function(a) {
            d.hide();
          }), d.data("$mergeObj", a));
        },
        getBodyContainer: function() {
          return this.root().find(".edui-popup-body");
        }
      });
      UM.ui.define("scale", {
        tpl: '<div class="edui-scale" unselectable="on"><span class="edui-scale-hand0"></span><span class="edui-scale-hand1"></span><span class="edui-scale-hand2"></span><span class="edui-scale-hand3"></span><span class="edui-scale-hand4"></span><span class="edui-scale-hand5"></span><span class="edui-scale-hand6"></span><span class="edui-scale-hand7"></span></div>',
        defaultOpt: {
          $doc: h(document),
          $wrap: h(document)
        },
        init: function(a) {
          a.$doc && (this.defaultOpt.$doc = a.$doc);
          a.$wrap && (this.defaultOpt.$wrap = a.$wrap);
          this.root(h(h.parseTmpl(this.tpl, a)));
          this.initStyle();
          this.startPos = this.prePos = {
            x: 0,
            y: 0
          };
          this.dragId = -1;
          return this;
        },
        initStyle: function() {
          n.cssRule("edui-style-scale", ".edui-scale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;}.edui-scale span{position:absolute;left:0;top:0;width:7px;height:7px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-scale .edui-scale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-scale .edui-scale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-scale .edui-scale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-scale .edui-scale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-scale .edui-scale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}");
        },
        _eventHandler: function(a) {
          var b = this.defaultOpt.$doc;
          switch (a.type) {
            case "mousedown":
              var d = a.target || a.srcElement;
              -1 != d.className.indexOf("edui-scale-hand") && (this.dragId = d.className.slice(-1), this.startPos.x = this.prePos.x = a.clientX, this.startPos.y = this.prePos.y = a.clientY, b.bind("mousemove", h.proxy(this._eventHandler, this)));
              break;
            case "mousemove":
              -1 != this.dragId && (this.updateContainerStyle(this.dragId, {
                x: a.clientX - this.prePos.x,
                y: a.clientY - this.prePos.y
              }), this.prePos.x = a.clientX, this.prePos.y = a.clientY, this.updateTargetElement());
              break;
            case "mouseup":
              -1 != this.dragId && (this.dragId = -1, this.updateTargetElement(), this.data("$scaleTarget").parent() && this.attachTo(this.data("$scaleTarget"))), b.unbind("mousemove", h.proxy(this._eventHandler, this));
          }
        },
        updateTargetElement: function() {
          var a = this.root(),
              b = this.data("$scaleTarget");
          b.css({
            width: a.width(),
            height: a.height()
          });
          this.attachTo(b);
        },
        updateContainerStyle: function(a, b) {
          var d = this.root(),
              c,
              e = [[0, 0, -1, -1], [0, 0, 0, -1], [0, 0, 1, -1], [0, 0, -1, 0], [0, 0, 1, 0], [0, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]];
          0 != e[a][0] && (c = parseInt(d.offset().left) + b.x, d.css("left", this._validScaledProp("left", c)));
          0 != e[a][1] && (c = parseInt(d.offset().top) + b.y, d.css("top", this._validScaledProp("top", c)));
          0 != e[a][2] && (c = d.width() + e[a][2] * b.x, d.css("width", this._validScaledProp("width", c)));
          0 != e[a][3] && (c = d.height() + e[a][3] * b.y, d.css("height", this._validScaledProp("height", c)));
        },
        _validScaledProp: function(a, b) {
          var d = this.root(),
              c = this.defaultOpt.$doc,
              e = function(a, c, d) {
                return a + c > d ? d - c : b;
              };
          b = isNaN(b) ? 0 : b;
          switch (a) {
            case "left":
              return 0 > b ? 0 : e(b, d.width(), c.width());
            case "top":
              return 0 > b ? 0 : e(b, d.height(), c.height());
            case "width":
              return 0 >= b ? 1 : e(b, d.offset().left, c.width());
            case "height":
              return 0 >= b ? 1 : e(b, d.offset().top, c.height());
          }
        },
        show: function(a) {
          a && this.attachTo(a);
          this.root().bind("mousedown", h.proxy(this._eventHandler, this));
          this.defaultOpt.$doc.bind("mouseup", h.proxy(this._eventHandler, this));
          this.root().show();
          this.trigger("aftershow");
        },
        hide: function() {
          this.root().unbind("mousedown", h.proxy(this._eventHandler, this));
          this.defaultOpt.$doc.unbind("mouseup", h.proxy(this._eventHandler, this));
          this.root().hide();
          this.trigger("afterhide");
        },
        attachTo: function(a) {
          var b = a.offset(),
              d = this.root(),
              c = this.defaultOpt.$wrap,
              e = c.offset();
          this.data("$scaleTarget", a);
          this.root().css({
            position: "absolute",
            width: a.width(),
            height: a.height(),
            left: b.left - e.left - parseInt(c.css("border-left-width")) - parseInt(d.css("border-left-width")),
            top: b.top - e.top - parseInt(c.css("border-top-width")) - parseInt(d.css("border-top-width"))
          });
        },
        getScaleTarget: function() {
          return this.data("$scaleTarget")[0];
        }
      });
      UM.ui.define("colorpicker", {
        tpl: function(a) {
          for (var b = "ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" "),
              d = '<div unselectable="on" onmousedown="return false" class="edui-colorpicker<%if (name){%> edui-colorpicker-<%=name%><%}%>" ><table unselectable="on" onmousedown="return false"><tr><td colspan="10">' + a.lang_themeColor + '</td> </tr><tr class="edui-colorpicker-firstrow" >',
              c = 0; c < b.length; c++)
            c && 0 === c % 10 && (d += "</tr>" + (60 == c ? '<tr><td colspan="10">' + a.lang_standardColor + "</td></tr>" : "") + "<tr" + (60 == c ? ' class="edui-colorpicker-firstrow"' : "") + ">"), d += 70 > c ? '<td><a unselectable="on" onmousedown="return false" title="' + b[c] + '" class="edui-colorpicker-colorcell" data-color="#' + b[c] + '" style="background-color:#' + b[c] + ";border:solid #ccc;" + (10 > c || 60 <= c ? "border-width:1px;" : 10 <= c && 20 > c ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
          return d + "</tr></table></div>";
        },
        init: function(a) {
          var b = this;
          b.root(h(h.parseTmpl(b.supper.mergeTpl(b.tpl(a)), a)));
          b.root().on("click", function(a) {
            b.trigger("pickcolor", h(a.target).data("color"));
          });
        }
      }, "popup");
      (function() {
        UM.ui.define("combobox", function() {
          return {
            tpl: '<ul class="dropdown-menu edui-combobox-menu<%if (comboboxName!==\'\') {%> edui-combobox-<%=comboboxName%><%}%>" unselectable="on" onmousedown="return false" role="menu" aria-labelledby="dropdownMenu"><%if(autoRecord) {%><%for( var i=0, len = recordStack.length; i<len; i++ ) {%><%var index = recordStack[i];%><li class="<%=itemClassName%><%if( selected == index ) {%> edui-combobox-checked<%}%>" data-item-index="<%=index%>" unselectable="on" onmousedown="return false"><span class="edui-combobox-icon" unselectable="on" onmousedown="return false"></span><label class="<%=labelClassName%>" style="<%=itemStyles[ index ]%>" unselectable="on" onmousedown="return false"><%=items[index]%></label></li><%}%><%if( i ) {%><li class="edui-combobox-item-separator"></li><%}%><%}%><%for( var i=0, label; label = items[i]; i++ ) {%><li class="<%=itemClassName%><%if( selected == i ) {%> edui-combobox-checked<%}%> edui-combobox-item-<%=i%>" data-item-index="<%=i%>" unselectable="on" onmousedown="return false"><span class="edui-combobox-icon" unselectable="on" onmousedown="return false"></span><label class="<%=labelClassName%>" style="<%=itemStyles[ i ]%>" unselectable="on" onmousedown="return false"><%=label%></label></li><%}%></ul>',
            defaultOpt: {
              recordStack: [],
              items: [],
              value: [],
              comboboxName: "",
              selected: "",
              autoRecord: !0,
              recordCount: 5
            },
            init: function(a) {
              h.extend(this._optionAdaptation(a), this._createItemMapping(a.recordStack, a.items), {
                itemClassName: "edui-combobox-item",
                iconClass: "edui-combobox-checked-icon",
                labelClassName: "edui-combobox-item-label"
              });
              this._transStack(a);
              this.root(h(h.parseTmpl(this.tpl, a)));
              this.data("options", a).initEvent();
            },
            initEvent: function() {
              this.initSelectItem();
              this.initItemActive();
            },
            initSelectItem: function() {
              var a = this;
              a.root().delegate(".edui-combobox-item", "click", function() {
                var b = h(this),
                    d = b.attr("data-item-index");
                a.trigger("comboboxselect", {
                  index: d,
                  label: b.find(".edui-combobox-item-label").text(),
                  value: a.data("options").value[d]
                }).select(d);
                a.hide();
                return !1;
              });
            },
            initItemActive: function() {
              var a = {
                mouseenter: "addClass",
                mouseleave: "removeClass"
              };
              if (h.IE6)
                this.root().delegate(".edui-combobox-item", "mouseenter mouseleave", function(b) {
                  h(this)[a[b.type]]("edui-combobox-item-hover");
                }).one("afterhide", function() {});
            },
            select: function(a) {
              var b = this.data("options").itemCount,
                  d = this.data("options").autowidthitem;
              d && !d.length && (d = this.data("options").items);
              if (0 == b)
                return null;
              0 > a ? a = b + a % b : a >= b && (a = b - 1);
              this.trigger("changebefore", d[a]);
              this._update(a);
              this.trigger("changeafter", d[a]);
              return null;
            },
            selectItemByLabel: function(a) {
              var b = this.data("options").itemMapping,
                  d = this,
                  c = null;
              !h.isArray(a) && (a = [a]);
              h.each(a, function(a, g) {
                c = b[g];
                if (void 0 !== c)
                  return d.select(c), !1;
              });
            },
            _transStack: function(a) {
              var b = [],
                  d = -1,
                  c = -1;
              h.each(a.recordStack, function(e, g) {
                d = a.itemMapping[g];
                h.isNumeric(d) && (b.push(d), g == a.selected && (c = d));
              });
              a.recordStack = b;
              a.selected = c;
              b = null;
            },
            _optionAdaptation: function(a) {
              if (!("itemStyles" in a)) {
                a.itemStyles = [];
                for (var b = 0,
                    d = a.items.length; b < d; b++)
                  a.itemStyles.push("");
              }
              a.autowidthitem = a.autowidthitem || a.items;
              a.itemCount = a.items.length;
              return a;
            },
            _createItemMapping: function(a, b) {
              var d = {},
                  c = {
                    recordStack: [],
                    mapping: {}
                  };
              h.each(b, function(a, b) {
                d[b] = a;
              });
              c.itemMapping = d;
              h.each(a, function(a, b) {
                void 0 !== d[b] && (c.recordStack.push(d[b]), c.mapping[b] = d[b]);
              });
              return c;
            },
            _update: function(a) {
              var b = this.data("options"),
                  d = [],
                  c = null;
              h.each(b.recordStack, function(b, c) {
                c != a && d.push(c);
              });
              d.unshift(a);
              d.length > b.recordCount && (d.length = b.recordCount);
              b.recordStack = d;
              b.selected = a;
              c = h(h.parseTmpl(this.tpl, b));
              this.root().html(c.html());
              d = c = null;
            }
          };
        }(), "menu");
      })();
      (function() {
        UM.ui.define("buttoncombobox", function() {
          return {
            defaultOpt: {
              label: "",
              title: ""
            },
            init: function(a) {
              var b = this,
                  d = h.eduibutton({
                    caret: !0,
                    name: a.comboboxName,
                    title: a.title,
                    text: a.label,
                    click: function() {
                      b.show(this.root());
                    }
                  });
              b.supper.init.call(b, a);
              b.on("changebefore", function(a, b) {
                d.eduibutton("label", b);
              });
              b.data("button", d);
              b.attachTo(d);
            },
            button: function() {
              return this.data("button");
            }
          };
        }(), "combobox");
      })();
      UM.ui.define("modal", {
        tpl: '<div class="edui-modal" tabindex="-1" ><div class="edui-modal-header"><div class="edui-close" data-hide="modal"></div><h3 class="edui-title"><%=title%></h3></div><div class="edui-modal-body"  style="<%if(width){%>width:<%=width%>px;<%}%><%if(height){%>height:<%=height%>px;<%}%>"> </div><% if(cancellabel || oklabel) {%><div class="edui-modal-footer"><div class="edui-modal-tip"></div><%if(oklabel){%><div class="edui-btn edui-btn-primary" data-ok="modal"><%=oklabel%></div><%}%><%if(cancellabel){%><div class="edui-btn" data-hide="modal"><%=cancellabel%></div><%}%></div><%}%></div>',
        defaultOpt: {
          title: "",
          cancellabel: "",
          oklabel: "",
          width: "",
          height: "",
          backdrop: !0,
          keyboard: !0
        },
        init: function(a) {
          this.root(h(h.parseTmpl(this.tpl, a || {})));
          this.data("options", a);
          if (a.okFn)
            this.on("ok", h.proxy(a.okFn, this));
          if (a.cancelFn)
            this.on("beforehide", h.proxy(a.cancelFn, this));
          this.root().delegate('[data-hide="modal"]', "click", h.proxy(this.hide, this)).delegate('[data-ok="modal"]', "click", h.proxy(this.ok, this));
          h('[data-hide="modal"],[data-ok="modal"]', this.root()).hover(function() {
            h(this).toggleClass("edui-hover");
          });
        },
        toggle: function() {
          return this[this.data("isShown") ? "hide" : "show"]();
        },
        show: function() {
          var a = this;
          a.trigger("beforeshow");
          a.data("isShown") || (a.data("isShown", !0), a.escape(), a.backdrop(function() {
            a.autoCenter();
            a.root().show().focus().trigger("aftershow");
          }));
        },
        showTip: function(a) {
          h(".edui-modal-tip", this.root()).html(a).fadeIn();
        },
        hideTip: function(a) {
          h(".edui-modal-tip", this.root()).fadeOut(function() {
            h(this).html("");
          });
        },
        autoCenter: function() {
          !h.IE6 && this.root().css("margin-left", -(this.root().width() / 2));
        },
        hide: function() {
          this.trigger("beforehide");
          this.data("isShown") && (this.data("isShown", !1), this.escape(), this.hideModal());
        },
        escape: function() {
          var a = this;
          if (a.data("isShown") && a.data("options").keyboard)
            a.root().on("keyup", function(b) {
              27 == b.which && a.hide();
            });
          else
            a.data("isShown") || a.root().off("keyup");
        },
        hideModal: function() {
          var a = this;
          a.root().hide();
          a.backdrop(function() {
            a.removeBackdrop();
            a.trigger("afterhide");
          });
        },
        removeBackdrop: function() {
          this.$backdrop && this.$backdrop.remove();
          this.$backdrop = null;
        },
        backdrop: function(a) {
          this.data("isShown") && this.data("options").backdrop && (this.$backdrop = h('<div class="edui-modal-backdrop" />').click("static" == this.data("options").backdrop ? h.proxy(this.root()[0].focus, this.root()[0]) : h.proxy(this.hide, this)));
          this.trigger("afterbackdrop");
          a && a();
        },
        attachTo: function(a) {
          var b = this;
          a.data("$mergeObj") || (a.data("$mergeObj", b.root()), a.on("click", function() {
            b.toggle(a);
          }), b.data("$mergeObj", a));
        },
        ok: function() {
          this.trigger("beforeok");
          !1 !== this.trigger("ok", this) && this.hide();
        },
        getBodyContainer: function() {
          return this.root().find(".edui-modal-body");
        }
      });
      UM.ui.define("tooltip", {
        tpl: '<div class="edui-tooltip" unselectable="on" onmousedown="return false"><div class="edui-tooltip-arrow" unselectable="on" onmousedown="return false"></div><div class="edui-tooltip-inner" unselectable="on" onmousedown="return false"></div></div>',
        init: function(a) {
          this.root(h(h.parseTmpl(this.tpl, a || {})));
        },
        content: function(a) {
          a = h(a.currentTarget).attr("data-original-title");
          this.root().find(".edui-tooltip-inner").text(a);
        },
        position: function(a) {
          a = h(a.currentTarget);
          this.root().css(h.extend({display: "block"}, a ? {
            top: a.outerHeight(),
            left: (a.outerWidth() - this.root().outerWidth()) / 2
          } : {}));
        },
        show: function(a) {
          h(a.currentTarget).hasClass("edui-disabled") || (this.content(a), this.root().appendTo(h(a.currentTarget)), this.position(a), this.root().css("display", "block"));
        },
        hide: function() {
          this.root().css("display", "none");
        },
        attachTo: function(a) {
          function b(a) {
            var b = this;
            h.contains(document.body, b.root()[0]) || b.root().appendTo(a);
            b.data("tooltip", b.root());
            a.each(function() {
              if (h(this).attr("data-original-title"))
                h(this).on("mouseenter", h.proxy(b.show, b)).on("mouseleave click", h.proxy(b.hide, b));
            });
          }
          var d = this;
          "undefined" === h.type(a) ? h("[data-original-title]").each(function(a, e) {
            b.call(d, h(e));
          }) : a.data("tooltip") || b.call(d, a);
        }
      });
      UM.ui.define("tab", {
        init: function(a) {
          var b = this,
              d = a.selector;
          h.type(d) && (b.root(h(d, a.context)), b.data("context", a.context), h(d, b.data("context")).on("click", function(a) {
            b.show(a);
          }));
        },
        show: function(a) {
          var b = this,
              d = h(a.target),
              c = d.closest("ul"),
              e,
              g;
          e = (e = d.attr("data-context")) && e.replace(/.*(?=#[^\s]*$)/, "");
          a = d.parent("li");
          a.length && !a.hasClass("edui-active") && (g = c.find(".edui-active:last a")[0], a = h.Event("beforeshow", {
            target: d[0],
            relatedTarget: g
          }), b.trigger(a), a.isDefaultPrevented() || (e = h(e, b.data("context")), b.activate(d.parent("li"), c), b.activate(e, e.parent(), function() {
            b.trigger({
              type: "aftershow",
              relatedTarget: g
            });
          })));
        },
        activate: function(a, b, d) {
          if (void 0 === a)
            return h(".edui-tab-item.edui-active", this.root()).index();
          b.find("> .edui-active").removeClass("edui-active");
          a.addClass("edui-active");
          d && d();
        }
      });
      UM.ui.define("separator", {
        tpl: '<div class="edui-separator" unselectable="on" onmousedown="return false" ></div>',
        init: function(a) {
          this.root(h(h.parseTmpl(this.tpl, a)));
          return this;
        }
      });
      (function() {
        var a = {},
            b = {},
            d = [],
            c = {},
            e = {},
            g = {},
            f = null;
        n.extend(UM, {
          defaultWidth: 500,
          defaultHeight: 500,
          registerUI: function(b, c) {
            n.each(b.split(/\s+/), function(b) {
              a[b] = c;
            });
          },
          setEditor: function(a) {
            !b[a.id] && (b[a.id] = a);
          },
          registerWidget: function(a, b, d) {
            c[a] = h.extend2(b, {
              $root: "",
              _preventDefault: !1,
              root: function(a) {
                return this.$root || (this.$root = a);
              },
              preventDefault: function() {
                this._preventDefault = !0;
              },
              clear: !1
            });
            d && (e[a] = d);
          },
          getWidgetData: function(a) {
            return c[a];
          },
          setWidgetBody: function(a, b, d) {
            d._widgetData || n.extend(d, {
              _widgetData: {},
              getWidgetData: function(a) {
                return this._widgetData[a];
              },
              getWidgetCallback: function(a) {
                var c = this;
                return function() {
                  return e[a].apply(c, [c, b].concat(Array.prototype.slice.call(arguments, 0)));
                };
              }
            });
            var f = c[a];
            if (!f)
              return null;
            f = d._widgetData[a];
            f || (f = c[a], f = d._widgetData[a] = "function" == h.type(f) ? f : n.clone(f));
            f.root(b.edui().getBodyContainer());
            f.initContent(d, b);
            f._preventDefault || f.initEvent(d, b);
            f.width && b.width(f.width);
          },
          setActiveWidget: function(a) {},
          getEditor: function(a, c) {
            var d = b[a] || (b[a] = this.createEditor(a, c));
            f = f ? Math.max(d.getOpt("zIndex"), f) : d.getOpt("zIndex");
            return d;
          },
          setTopEditor: function(a) {
            h.each(b, function(b, c) {
              a == c ? a.$container && a.$container.css("zIndex", f + 1) : c.$container && c.$container.css("zIndex", c.getOpt("zIndex"));
            });
          },
          clearCache: function(a) {
            b[a] && delete b[a];
          },
          delEditor: function(a) {
            var c;
            (c = b[a]) && c.destroy();
          },
          ready: function(a) {
            d.push(a);
          },
          createEditor: function(a, b) {
            function c() {
              var b = this.createUI("#" + a, e);
              e.key = a;
              e.ready(function() {
                h.each(d, function(a, b) {
                  h.proxy(b, e)();
                });
              });
              var f = e.options;
              f.minFrameWidth = f.initialFrameWidth ? f.initialFrameWidth : f.initialFrameWidth = e.$body.width() || UM.defaultWidth;
              b.css({
                width: f.initialFrameWidth,
                zIndex: e.getOpt("zIndex")
              });
              UM.browser.ie && 6 === UM.browser.version && document.execCommand("BackgroundImageCache", !1, !0);
              e.render(a);
              h.eduitooltip && h.eduitooltip("attachTo", h("[data-original-title]", b)).css("z-index", e.getOpt("zIndex") + 1);
              b.find("a").click(function(a) {
                a.preventDefault();
              });
              e.fireEvent("afteruiready");
            }
            var e = new UM.Editor(b);
            e.langIsReady ? h.proxy(c, this)() : e.addListener("langReady", h.proxy(c, this));
            return e;
          },
          createUI: function(b, c) {
            var d = h(b),
                e = h('<div class="edui-container"><div class="edui-editor-body"></div></div>').insertBefore(d);
            c.$container = e;
            c.container = e[0];
            c.$body = d;
            m.ie && m.ie9above && h('<span style="padding:0;margin:0;height:0;width:0"></span>').insertAfter(e);
            h.each(a, function(a, b) {
              var d = b.call(c, a);
              d && (g[a] = d);
            });
            e.find(".edui-editor-body").append(d).before(this.createToolbar(c.options, c));
            e.find(".edui-toolbar").append(h('<div class="edui-dialog-container"></div>'));
            return e;
          },
          createToolbar: function(a, b) {
            var c = h.eduitoolbar(),
                d = c.edui();
            if (a.toolbar && a.toolbar.length) {
              var e = [];
              h.each(a.toolbar, function(a, b) {
                h.each(b.split(/\s+/), function(a, b) {
                  if ("|" == b)
                    h.eduiseparator && e.push(h.eduiseparator());
                  else {
                    var c = g[b];
                    "fullscreen" == b ? c && e.unshift(c) : c && e.push(c);
                  }
                });
                e.length && d.appendToBtnmenu(e);
              });
            } else
              c.find(".edui-btn-toolbar").remove();
            return c;
          }
        });
      })();
      UM.registerUI("bold italic redo undo underline strikethrough superscript subscript insertorderedlist insertunorderedlist cleardoc selectall link unlink print preview justifyleft justifycenter justifyright justifyfull removeformat horizontal drafts", function(a) {
        var b = this,
            d = h.eduibutton({
              icon: a,
              click: function() {
                b.execCommand(a);
              },
              title: this.getLang("labelMap")[a] || ""
            });
        this.addListener("selectionchange", function() {
          var b = this.queryCommandState(a);
          d.edui().disabled(-1 == b).active(1 == b);
        });
        return d;
      });
      (function() {
        function a(a) {
          var b = this;
          if (!a)
            throw Error("invalid params, notfound editor");
          b.editor = a;
          f[a.uid] = this;
          a.addListener("destroy", function() {
            delete f[a.uid];
            b.editor = null;
          });
        }
        var b = {},
            d = "width height position top left margin padding overflowX overflowY".split(" "),
            c = {},
            e = {},
            g = {},
            f = {};
        UM.registerUI("fullscreen", function(b) {
          var c = this,
              d = h.eduibutton({
                icon: "fullscreen",
                title: c.options.labelMap && c.options.labelMap[b] || c.getLang("labelMap." + b),
                click: function() {
                  c.execCommand(b);
                  UM.setTopEditor(c);
                }
              });
          c.addListener("selectionchange", function() {
            var a = this.queryCommandState(b);
            d.edui().disabled(-1 == a).active(1 == a);
          });
          c.addListener("ready", function() {
            c.options.fullscreen && a.getInstance(c).toggle();
          });
          return d;
        });
        UM.commands.fullscreen = {
          execCommand: function(b) {
            a.getInstance(this).toggle();
          },
          queryCommandState: function(a) {
            return this._edui_fullscreen_status;
          },
          notNeedUndo: 1
        };
        a.prototype = {
          toggle: function() {
            var a = this.editor,
                b = this.isFullState();
            a.fireEvent("beforefullscreenchange", !b);
            this.update(!b);
            b ? this.revert() : this.enlarge();
            a.fireEvent("afterfullscreenchange", !b);
            "true" === a.body.contentEditable && a.fireEvent("fullscreenchanged", !b);
            a.fireEvent("selectionchange");
          },
          enlarge: function() {
            this.saveSataus();
            this.setDocumentStatus();
            this.resize();
          },
          revert: function() {
            var a = this.editor.options,
                a = /%$/.test(a.initialFrameHeight) ? "100%" : a.initialFrameHeight - this.getStyleValue("padding-top") - this.getStyleValue("padding-bottom") - this.getStyleValue("border-width");
            h.IE6 && this.getEditorHolder().style.setExpression("height", "this.scrollHeight <= " + a + ' ? "' + a + 'px" : "auto"');
            this.revertContainerStatus();
            this.revertContentAreaStatus();
            this.revertDocumentStatus();
          },
          update: function(a) {
            this.editor._edui_fullscreen_status = a;
          },
          resize: function() {
            var a = null,
                b = a = 0,
                c = 0,
                d = 0,
                e = this.editor,
                f = null,
                g = null;
            this.isFullState() && (a = h(window), b = a.width(), a = a.height(), g = this.getEditorHolder(), c = parseInt(k.getComputedStyle(g, "border-width"), 10) || 0, c += parseInt(k.getComputedStyle(e.container, "border-width"), 10) || 0, d += parseInt(k.getComputedStyle(g, "padding-left"), 10) + parseInt(k.getComputedStyle(g, "padding-right"), 10) || 0, h.IE6 && g.style.setExpression("height", null), f = this.getBound(), h(e.container).css({
              width: b + "px",
              height: a + "px",
              position: h.IE6 ? "absolute" : "fixed",
              top: f.top,
              left: f.left,
              margin: 0,
              padding: 0,
              overflowX: "hidden",
              overflowY: "hidden"
            }), h(g).css({
              width: b - 2 * c - d + "px",
              height: a - 2 * c - (e.options.withoutToolbar ? 0 : h(".edui-toolbar", e.container).outerHeight()) - h(".edui-bottombar", e.container).outerHeight() + "px",
              overflowX: "hidden",
              overflowY: "auto"
            }));
          },
          saveSataus: function() {
            for (var a = this.editor.container.style,
                c = null,
                e = {},
                f = 0,
                g = d.length; f < g; f++)
              c = d[f], e[c] = a[c];
            b[this.editor.uid] = e;
            this.saveContentAreaStatus();
            this.saveDocumentStatus();
          },
          saveContentAreaStatus: function() {
            var a = h(this.getEditorHolder());
            c[this.editor.uid] = {
              width: a.css("width"),
              overflowX: a.css("overflowX"),
              overflowY: a.css("overflowY"),
              height: a.css("height")
            };
          },
          saveDocumentStatus: function() {
            var a = h(this.getEditorDocumentBody());
            e[this.editor.uid] = {
              overflowX: a.css("overflowX"),
              overflowY: a.css("overflowY")
            };
            g[this.editor.uid] = {
              overflowX: h(this.getEditorDocumentElement()).css("overflowX"),
              overflowY: h(this.getEditorDocumentElement()).css("overflowY")
            };
          },
          revertContainerStatus: function() {
            h(this.editor.container).css(this.getEditorStatus());
          },
          revertContentAreaStatus: function() {
            var a = this.getEditorHolder(),
                b = this.getContentAreaStatus();
            this.supportMin() && (delete b.height, a.style.height = null);
            h(a).css(b);
          },
          revertDocumentStatus: function() {
            var a = this.getDocumentStatus();
            h(this.getEditorDocumentBody()).css("overflowX", a.body.overflowX);
            h(this.getEditorDocumentElement()).css("overflowY", a.html.overflowY);
          },
          setDocumentStatus: function() {
            h(this.getEditorDocumentBody()).css({
              overflowX: "hidden",
              overflowY: "hidden"
            });
            h(this.getEditorDocumentElement()).css({
              overflowX: "hidden",
              overflowY: "hidden"
            });
          },
          isFullState: function() {
            return !!this.editor._edui_fullscreen_status;
          },
          getEditorStatus: function() {
            return b[this.editor.uid];
          },
          getContentAreaStatus: function() {
            return c[this.editor.uid];
          },
          getEditorDocumentElement: function() {
            return this.editor.container.ownerDocument.documentElement;
          },
          getEditorDocumentBody: function() {
            return this.editor.container.ownerDocument.body;
          },
          getEditorHolder: function() {
            return this.editor.body;
          },
          getDocumentStatus: function() {
            return {
              body: e[this.editor.uid],
              html: g[this.editor.uid]
            };
          },
          supportMin: function() {
            var a = null;
            this._support || (a = document.createElement("div"), this._support = "minWidth" in a.style);
            return this._support;
          },
          getBound: function() {
            var a = {
              html: !0,
              body: !0
            },
                b = {
                  top: 0,
                  left: 0
                },
                c = null;
            if (!h.IE6)
              return b;
            (c = this.editor.container.offsetParent) && !a[c.nodeName.toLowerCase()] && (a = c.getBoundingClientRect(), b.top = -a.top, b.left = -a.left);
            return b;
          },
          getStyleValue: function(a) {
            return parseInt(k.getComputedStyle(this.getEditorHolder(), a));
          }
        };
        h.extend(a, {
          listen: function() {
            var b = null;
            a._hasFullscreenListener || (a._hasFullscreenListener = !0, h(window).on("resize", function() {
              null !== b && (window.clearTimeout(b), b = null);
              b = window.setTimeout(function() {
                for (var a in f)
                  f[a].resize();
                b = null;
              }, 50);
            }));
          },
          getInstance: function(b) {
            f[b.uid] || new a(b);
            return f[b.uid];
          }
        });
        a.listen();
      })();
      UM.registerUI("link image video map formula", function(a) {
        var b = this,
            d,
            c,
            e = {
              title: b.options.labelMap && b.options.labelMap[a] || b.getLang("labelMap." + a),
              url: b.options.UMEDITOR_HOME_URL + "dialogs/" + a + "/" + a + ".js"
            },
            g = h.eduibutton({
              icon: a,
              title: this.getLang("labelMap")[a] || ""
            });
        n.loadFile(document, {
          src: e.url,
          tag: "script",
          type: "text/javascript",
          defer: "defer"
        }, function() {
          var f = UM.getWidgetData(a);
          if (f) {
            if (f.buttons) {
              var k = f.buttons.ok;
              k && (e.oklabel = k.label || b.getLang("ok"), k.exec && (e.okFn = function() {
                return h.proxy(k.exec, null, b, c)();
              }));
              var m = f.buttons.cancel;
              m && (e.cancellabel = m.label || b.getLang("cancel"), m.exec && (e.cancelFn = function() {
                return h.proxy(m.exec, null, b, c)();
              }));
            }
            f.width && (e.width = f.width);
            f.height && (e.height = f.height);
            c = h.eduimodal(e);
            c.attr("id", "edui-dialog-" + a).addClass("edui-dialog-" + a).find(".edui-modal-body").addClass("edui-dialog-" + a + "-body");
            c.edui().on("beforehide", function() {
              var a = b.selection.getRange();
              a.equals(d) && a.select();
            }).on("beforeshow", function() {
              var e = this.root(),
                  f = null,
                  g = null;
              d = b.selection.getRange();
              e.parent()[0] || b.$container.find(".edui-dialog-container").append(e);
              h.IE6 && (f = {
                width: h(window).width(),
                height: h(window).height()
              }, g = e.parents(".edui-toolbar")[0].getBoundingClientRect(), e.css({
                position: "absolute",
                margin: 0,
                left: (f.width - e.width()) / 2 - g.left,
                top: 100 - g.top
              }));
              UM.setWidgetBody(a, c, b);
              UM.setTopEditor(b);
            }).on("afterbackdrop", function() {
              this.$backdrop.css("zIndex", b.getOpt("zIndex") + 1).appendTo(b.$container.find(".edui-dialog-container"));
              c.css("zIndex", b.getOpt("zIndex") + 2);
            }).on("beforeok", function() {
              try {
                d.select();
              } catch (a) {}
            }).attachTo(g);
          }
        });
        b.addListener("selectionchange", function() {
          var b = this.queryCommandState(a);
          g.edui().disabled(-1 == b).active(1 == b);
        });
        return g;
      });
      UM.registerUI("emotion formula", function(a) {
        var b = this,
            d = b.options.UMEDITOR_HOME_URL + "dialogs/" + a + "/" + a + ".js",
            c = h.eduibutton({
              icon: a,
              title: this.getLang("labelMap")[a] || ""
            });
        n.loadFile(document, {
          src: d,
          tag: "script",
          type: "text/javascript",
          defer: "defer"
        }, function() {
          var e = {url: d},
              g = UM.getWidgetData(a);
          g.width && (e.width = g.width);
          g.height && (e.height = g.height);
          h.eduipopup(e).css("zIndex", b.options.zIndex + 1).addClass("edui-popup-" + a).edui().on("beforeshow", function() {
            var c = this.root();
            c.parent().length || b.$container.find(".edui-dialog-container").append(c);
            UM.setWidgetBody(a, c, b);
            UM.setTopEditor(b);
          }).attachTo(c, {
            offsetTop: -5,
            offsetLeft: 10,
            caretLeft: 11,
            caretTop: -8
          });
          b.addListener("selectionchange", function() {
            var b = this.queryCommandState(a);
            c.edui().disabled(-1 == b).active(1 == b);
          });
        });
        return c;
      });
      UM.registerUI("imagescale", function() {
        var a = this,
            b;
        a.setOpt("imageScaleEnabled", !0);
        m.webkit && a.getOpt("imageScaleEnabled") && (a.addListener("click", function(d, c) {
          var e = a.selection.getRange().getClosedNode(),
              g = c.target;
          if (e && "IMG" == e.tagName && g == e) {
            if (!b) {
              b = h.eduiscale({$wrap: a.$container}).css("zIndex", a.options.zIndex);
              a.$container.append(b);
              var f = function() {
                b.edui().hide();
              },
                  k = function(a) {
                    var b = a.target || a.srcElement;
                    b && -1 == b.className.indexOf("edui-scale") && f(a);
                  },
                  m;
              b.edui().on("aftershow", function() {
                h(document).bind("keydown", f);
                h(document).bind("mousedown", k);
                a.selection.getNative().removeAllRanges();
              }).on("afterhide", function() {
                h(document).unbind("keydown", f);
                h(document).unbind("mousedown", k);
                var c = b.edui().getScaleTarget();
                c.parentNode && a.selection.getRange().selectNode(c).select();
              }).on("mousedown", function(c) {
                a.selection.getNative().removeAllRanges();
                (c = c.target || c.srcElement) && -1 == c.className.indexOf("edui-scale-hand") && (m = setTimeout(function() {
                  b.edui().hide();
                }, 200));
              }).on("mouseup", function(a) {
                (a = a.target || a.srcElement) && -1 == a.className.indexOf("edui-scale-hand") && clearTimeout(m);
              });
            }
            b.edui().show(h(e));
          } else
            b && "none" != b.css("display") && b.edui().hide();
        }), a.addListener("click", function(b, c) {
          "IMG" == c.target.tagName && (new x.Range(a.document, a.body)).selectNode(c.target).select();
        }));
      });
      UM.registerUI("autofloat", function() {
        var a = this,
            b = a.getLang();
        a.setOpt({
          autoFloatEnabled: !0,
          topOffset: 0
        });
        var d = a.options.topOffset;
        !1 !== a.options.autoFloatEnabled && a.ready(function() {
          function c() {
            var a = document.body.style;
            a.backgroundImage = 'url("about:blank")';
            a.backgroundAttachment = "fixed";
          }
          function e() {
            t.parentNode && t.parentNode.removeChild(t);
            r.style.cssText = q;
          }
          function g() {
            var b = a.container,
                c;
            try {
              c = b.getBoundingClientRect();
            } catch (g) {
              c = {
                left: 0,
                top: 0,
                height: 0,
                width: 0
              };
            }
            for (var h = Math.round(c.top),
                n = Math.round(c.bottom - c.top),
                q; (q = b.ownerDocument) !== document && (b = k.getWindow(q).frameElement); )
              c = b.getBoundingClientRect(), h += c.top;
            b = a.options.toolbarTopOffset || 0;
            0 > h && h + n - r.offsetHeight > b ? w || (h = k.getXY(r), n = k.getComputedStyle(r, "position"), b = k.getComputedStyle(r, "left"), r.style.width = r.offsetWidth + "px", r.style.zIndex = 1 * a.options.zIndex + 1, r.parentNode.insertBefore(t, r), f || l && m.ie ? ("absolute" != r.style.position && (r.style.position = "absolute"), r.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - p + d + "px") : "fixed" != r.style.position && (r.style.position = "fixed", r.style.top = d + "px", ("absolute" == n || "relative" == n) && parseFloat(b) && (r.style.left = h.x + "px"))) : e();
          }
          var f = m.ie && 6 >= m.version,
              l = m.quirks,
              q,
              t = document.createElement("div"),
              r,
              p,
              w = !1,
              y = n.defer(function() {
                g();
              }, m.ie ? 200 : 100, !0);
          a.addListener("destroy", function() {
            h(window).off("scroll resize", g);
            a.removeListener("keydown", y);
          });
          var x;
          UM.ui ? x = 1 : (alert(b.autofloatMsg), x = 0);
          x && (r = h(".edui-toolbar", a.container)[0], a.addListener("afteruiready", function() {
            setTimeout(function() {
              p = h(r).offset().top;
            }, 100);
          }), q = r.style.cssText, t.style.height = r.offsetHeight + "px", f && c(), h(window).on("scroll resize", g), a.addListener("keydown", y), a.addListener("resize", function() {
            e();
            t.style.height = r.offsetHeight + "px";
            g();
          }), a.addListener("beforefullscreenchange", function(a, b) {
            b && (e(), w = b);
          }), a.addListener("fullscreenchanged", function(a, b) {
            b || g();
            w = b;
          }), a.addListener("sourcemodechanged", function(a, b) {
            setTimeout(function() {
              g();
            }, 0);
          }), a.addListener("clearDoc", function() {
            setTimeout(function() {
              g();
            }, 0);
          }));
        });
      });
      UM.registerUI("source", function(a) {
        var b = this;
        b.addListener("fullscreenchanged", function() {
          b.$container.find("textarea").width(b.$body.width() - 10).height(b.$body.height());
        });
        var d = h.eduibutton({
          icon: a,
          click: function() {
            b.execCommand(a);
            UM.setTopEditor(b);
          },
          title: this.getLang("labelMap")[a] || ""
        });
        this.addListener("selectionchange", function() {
          var b = this.queryCommandState(a);
          d.edui().disabled(-1 == b).active(1 == b);
        });
        return d;
      });
      UM.registerUI("paragraph fontfamily fontsize", function(a) {
        function b(a, c) {
          var d = h("<span>").html(a).css({
            display: "inline",
            position: "absolute",
            top: -1E7,
            left: -1E5
          }).appendTo(document.body),
              e = d.width();
          d.remove();
          if (50 > e)
            return a;
          a = a.slice(0, c ? -4 : -1);
          return a.length ? b(a + "...", !0) : "...";
        }
        function d(a) {
          var c = [],
              d;
          for (d in a.items)
            a.value.push(d), c.push(d), a.autowidthitem.push(b(d));
          a.items = c;
          a.autoRecord = !1;
          return a;
        }
        function c(a) {
          for (var c = null,
              d = [],
              e = 0,
              f = a.items.length; e < f; e++)
            c = a.items[e].val, d.push(c.split(/\s*,\s*/)[0]), a.itemStyles.push("font-family: " + c), a.value.push(c), a.autowidthitem.push(b(d[e]));
          a.items = d;
          return a;
        }
        function e(a) {
          var b = null,
              c = [];
          a.itemStyles = [];
          a.value = [];
          for (var d = 0,
              e = a.items.length; d < e; d++)
            b = a.items[d], c.push(b), a.itemStyles.push("font-size: " + b + "px");
          a.value = a.items;
          a.items = c;
          a.autoRecord = !1;
          return a;
        }
        var g = this,
            f = g.options.labelMap && g.options.labelMap[a] || g.getLang("labelMap." + a),
            f = {
              label: f,
              title: f,
              comboboxName: a,
              items: g.options[a] || [],
              itemStyles: [],
              value: [],
              autowidthitem: []
            },
            k = null,
            m = null;
        if (0 == f.items.length)
          return null;
        switch (a) {
          case "paragraph":
            f = d(f);
            break;
          case "fontfamily":
            f = c(f);
            break;
          case "fontsize":
            f = e(f);
        }
        k = h.eduibuttoncombobox(f).css("zIndex", g.getOpt("zIndex") + 1);
        m = k.edui();
        m.on("comboboxselect", function(b, c) {
          g.execCommand(a, c.value);
        }).on("beforeshow", function() {
          0 === k.parent().length && k.appendTo(g.$container.find(".edui-dialog-container"));
          UM.setTopEditor(g);
        });
        this.addListener("selectionchange", function(b) {
          b = this.queryCommandState(a);
          var c = this.queryCommandValue(a);
          m.button().edui().disabled(-1 == b).active(1 == b);
          c && (c = c.replace(/['"]/g, "").toLowerCase().split(/['|"]?\s*,\s*[\1]?/), m.selectItemByLabel(c));
        });
        return m.button().addClass("edui-combobox");
      });
      UM.registerUI("forecolor backcolor", function(a) {
        var b = this,
            d = null,
            c = null,
            e = null;
        this.addListener("selectionchange", function() {
          var b = this.queryCommandState(a);
          e.edui().disabled(-1 == b).active(1 == b);
        });
        e = h.eduicolorsplitbutton({
          icon: a,
          caret: !0,
          name: a,
          title: b.getLang("labelMap")[a],
          click: function() {
            b.execCommand(a, k.getComputedStyle(c[0], "background-color"));
          }
        });
        c = e.edui().colorLabel();
        d = h.eduicolorpicker({
          name: a,
          lang_clearColor: b.getLang("clearColor") || "",
          lang_themeColor: b.getLang("themeColor") || "",
          lang_standardColor: b.getLang("standardColor") || ""
        }).on("pickcolor", function(d, e) {
          window.setTimeout(function() {
            c.css("backgroundColor", e);
            b.execCommand(a, e);
          }, 0);
        }).on("show", function() {
          UM.setActiveWidget(colorPickerWidget.root());
        }).css("zIndex", b.getOpt("zIndex") + 1);
        e.edui().on("arrowclick", function() {
          d.parent().length || b.$container.find(".edui-dialog-container").append(d);
          d.edui().show(e, {
            caretDir: "down",
            offsetTop: -5,
            offsetLeft: 8,
            caretLeft: 11,
            caretTop: -8
          });
          UM.setTopEditor(b);
        }).register("click", e, function() {
          d.edui().hide();
        });
        return e;
      });
    })(jQuery);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("app/ueditor/src/lang/zh-cn/zh-cn.js", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    UM.I18N['zh-cn'] = {
      'labelMap': {
        'anchor': '锚点',
        'undo': '撤销',
        'redo': '重做',
        'bold': '加粗',
        'indent': '首行缩进',
        'snapscreen': '截图',
        'italic': '斜体',
        'underline': '下划线',
        'strikethrough': '删除线',
        'subscript': '下标',
        'fontborder': '字符边框',
        'superscript': '上标',
        'formatmatch': '格式刷',
        'source': '源代码',
        'blockquote': '引用',
        'pasteplain': '纯文本粘贴模式',
        'selectall': '全选',
        'print': '打印',
        'preview': '预览',
        'horizontal': '分隔线',
        'removeformat': '清除格式',
        'time': '时间',
        'date': '日期',
        'unlink': '取消链接',
        'insertrow': '前插入行',
        'insertcol': '前插入列',
        'mergeright': '右合并单元格',
        'mergedown': '下合并单元格',
        'deleterow': '删除行',
        'deletecol': '删除列',
        'splittorows': '拆分成行',
        'splittocols': '拆分成列',
        'splittocells': '完全拆分单元格',
        'mergecells': '合并多个单元格',
        'deletetable': '删除表格',
        'cleardoc': '清空文档',
        'insertparagraphbeforetable': "表格前插入行",
        'insertcode': '代码语言',
        'fontfamily': '字体',
        'fontsize': '字号',
        'paragraph': '段落格式',
        'image': '图片',
        'edittable': '表格属性',
        'edittd': '单元格属性',
        'link': '超链接',
        'emotion': '表情',
        'spechars': '特殊字符',
        'searchreplace': '查询替换',
        'map': '百度地图',
        'gmap': 'Google地图',
        'video': '视频',
        'help': '帮助',
        'justifyleft': '居左对齐',
        'justifyright': '居右对齐',
        'justifycenter': '居中对齐',
        'justifyjustify': '两端对齐',
        'forecolor': '字体颜色',
        'backcolor': '背景色',
        'insertorderedlist': '有序列表',
        'insertunorderedlist': '无序列表',
        'fullscreen': '全屏',
        'directionalityltr': '从左向右输入',
        'directionalityrtl': '从右向左输入',
        'rowspacingtop': '段前距',
        'rowspacingbottom': '段后距',
        'highlightcode': '插入代码',
        'pagebreak': '分页',
        'insertframe': '插入Iframe',
        'imagenone': '默认',
        'imageleft': '左浮动',
        'imageright': '右浮动',
        'attachment': '附件',
        'imagecenter': '居中',
        'wordimage': '图片转存',
        'lineheight': '行间距',
        'edittip': '编辑提示',
        'customstyle': '自定义标题',
        'autotypeset': '自动排版',
        'webapp': '百度应用',
        'touppercase': '字母大写',
        'tolowercase': '字母小写',
        'background': '背景',
        'template': '模板',
        'scrawl': '涂鸦',
        'music': '音乐',
        'inserttable': '插入表格',
        'drafts': '草稿箱',
        'formula': '数学公式'
      },
      'paragraph': {
        'p': '段落',
        'h1': '标题 1',
        'h2': '标题 2',
        'h3': '标题 3',
        'h4': '标题 4',
        'h5': '标题 5',
        'h6': '标题 6'
      },
      'fontfamily': {
        'songti': '宋体',
        'kaiti': '楷体',
        'heiti': '黑体',
        'lishu': '隶书',
        'yahei': '微软雅黑',
        'andaleMono': 'andale mono',
        'arial': 'arial',
        'arialBlack': 'arial black',
        'comicSansMs': 'comic sans ms',
        'impact': 'impact',
        'timesNewRoman': 'times new roman'
      },
      'ok': "确认",
      'cancel': "取消",
      'closeDialog': "关闭对话框",
      'tableDrag': "表格拖动必须引入uiUtils.js文件！",
      'autofloatMsg': "工具栏浮动依赖编辑器UI，您首先需要引入UI文件!",
      'anthorMsg': "链接",
      'clearColor': '清空颜色',
      'standardColor': '标准颜色',
      'themeColor': '主题颜色',
      'property': '属性',
      'default': '默认',
      'modify': '修改',
      'justifyleft': '左对齐',
      'justifyright': '右对齐',
      'justifycenter': '居中',
      'justify': '默认',
      'clear': '清除',
      'anchorMsg': '锚点',
      'delete': '删除',
      'clickToUpload': "点击上传",
      'unset': '尚未设置语言文件',
      't_row': '行',
      't_col': '列',
      'more': '更多',
      'pasteOpt': '粘贴选项',
      'pasteSourceFormat': "保留源格式",
      'tagFormat': '只保留标签',
      'pasteTextFormat': '只保留文本',
      'image': {
        'static': {
          'lang_tab_local': "本地上传",
          'lang_tab_imgSearch': "网络图片",
          'lang_input_dragTip': "支持图片拖拽上传",
          'lang_btn_add': "添加"
        },
        'uploadError': '上传出错'
      },
      'emotion': {'static': {
          'lang_input_choice': '精选',
          'lang_input_Tuzki': '兔斯基',
          'lang_input_BOBO': 'BOBO',
          'lang_input_lvdouwa': '绿豆蛙',
          'lang_input_babyCat': 'baby猫',
          'lang_input_bubble': '泡泡',
          'lang_input_youa': '有啊'
        }},
      'gmap': {
        'static': {
          'lang_input_address': '地址',
          'lang_input_search': '搜索',
          'address': {'value': "北京"}
        },
        'searchError': '无法定位到该地址!'
      },
      'link': {
        'static': {
          'lang_input_text': '文本内容：',
          'lang_input_url': '链接地址：',
          'lang_input_title': '标题：',
          'lang_input_target': '是否在新窗口打开：'
        },
        'validLink': '只支持选中一个链接时生效',
        'httpPrompt': '您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀'
      },
      'map': {
        'static': {
          'lang_city': "城市",
          'lang_address': "地址",
          'city': {'value': "北京"},
          'lang_search': "搜索",
          'lang_dynamicmap': "插入动态地图"
        },
        'cityMsg': "请选择城市",
        'errorMsg': "抱歉，找不到该位置！"
      },
      'video': {
        'static': {
          'lang_tab_insertV': "插入视频",
          'lang_video_url': "视频网址",
          'lang_video_size': "视频尺寸",
          'lang_videoW': "宽度",
          'lang_videoH': "高度",
          'lang_alignment': "对齐方式",
          'videoSearchTxt': {'value': "请输入搜索关键字！"},
          'videoType': {'options': ["全部", "热门", "娱乐", "搞笑", "体育", "科技", "综艺"]},
          'videoSearchBtn': {'value': "百度一下"},
          'videoSearchReset': {'value': "清空结果"}
        },
        'numError': "请输入正确的数值，如123,400",
        'floatLeft': "左浮动",
        'floatRight': "右浮动",
        'default': "默认",
        'block': "独占一行",
        'urlError': "输入的视频地址有误，请检查后再试！",
        'loading': " &nbsp;视频加载中，请等待……",
        'clickToSelect': "点击选中",
        'goToSource': '访问源视频',
        'noVideo': " &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！"
      },
      'formula': {'static': {
          'lang_tab_common': '常用公式',
          'lang_tab_symbol': '符号',
          'lang_tab_letter': '字母'
        }}
    };
  })();
  return _retrieveGlobal();
});

System.register("app/ueditor/src/themes/default/css/umeditor.min.css!github:systemjs/plugin-css@0.1.20.js", [], function() { return { setters: [], execute: function() {} } });

System.register('app/ueditor/UeditorInit.js', ['npm:jquery@2.2.2.js', 'app/ueditor/src/umeditor.config.js', 'app/ueditor/src/umeditor.min.js', 'app/ueditor/src/lang/zh-cn/zh-cn.js', 'app/ueditor/src/themes/default/css/umeditor.min.css!github:systemjs/plugin-css@0.1.20.js'], function (_export) {
    'use strict';

    var $;

    _export('ueditorInit', ueditorInit);

    function ueditorInit() {
        var divId = arguments.length <= 0 || arguments[0] === undefined ? 'container' : arguments[0];

        var serverPath = '/',
            _csrf = $('[name=_csrf]').val() || $('meta[name="csrf-token"]').attr('content');
        window.um = UM.getEditor(divId, {

            imageUrl: serverPath + 'ueditorUpload?_csrf=' + _csrf,
            imagePath: '',
            lang: /^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
            langPath: UMEDITOR_CONFIG.UMEDITOR_HOME_URL + "lang/",
            focus: true
        });
    }

    return {
        setters: [function (_npmJquery222Js) {
            $ = _npmJquery222Js['default'];
        }, function (_appUeditorSrcUmeditorConfigJs) {}, function (_appUeditorSrcUmeditorMinJs) {}, function (_appUeditorSrcLangZhCnZhCnJs) {}, function (_appUeditorSrcThemesDefaultCssUmeditorMinCssGithubSystemjsPluginCss0120Js) {}],
        execute: function () {}
    };
});
(function() {
var define = System.amdDefine;
(function(root, factory) {
  var modules = {},
      _require = function(deps, callback) {
        var args,
            len,
            i;
        if (typeof deps === 'string') {
          return getModule(deps);
        } else {
          args = [];
          for (len = deps.length, i = 0; i < len; i++) {
            args.push(getModule(deps[i]));
          }
          return callback.apply(null, args);
        }
      },
      _define = function(id, deps, factory) {
        if (arguments.length === 2) {
          factory = deps;
          deps = null;
        }
        _require(deps || [], function() {
          setModule(id, factory, arguments);
        });
      },
      setModule = function(id, factory, args) {
        var module = {exports: factory},
            returned;
        if (typeof factory === 'function') {
          args.length || (args = [_require, module.exports, module]);
          returned = factory.apply(null, args);
          returned !== undefined && (module.exports = returned);
        }
        modules[id] = module.exports;
      },
      getModule = function(id) {
        var module = modules[id] || root[id];
        if (!module) {
          throw new Error('`' + id + '` is undefined');
        }
        return module;
      },
      exportsTo = function(obj) {
        var key,
            host,
            parts,
            part,
            last,
            ucFirst;
        ucFirst = function(str) {
          return str && (str.charAt(0).toUpperCase() + str.substr(1));
        };
        for (key in modules) {
          host = obj;
          if (!modules.hasOwnProperty(key)) {
            continue;
          }
          parts = key.split('/');
          last = ucFirst(parts.pop());
          while ((part = ucFirst(parts.shift()))) {
            host[part] = host[part] || {};
            host = host[part];
          }
          host[last] = modules[key];
        }
        return obj;
      },
      makeExport = function(dollar) {
        root.__dollar = dollar;
        return exportsTo(factory(root, _define, _require));
      },
      origin;
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = makeExport();
  } else if (typeof define === 'function' && define.amd) {
    define("github:fex-team/webuploader@0.1.5/webuploader.js", ["npm:jquery@2.2.2.js"], makeExport);
  } else {
    origin = root.WebUploader;
    root.WebUploader = makeExport();
    root.WebUploader.noConflict = function() {
      root.WebUploader = origin;
    };
  }
})(window, function(window, define, require) {
  define('dollar-third', [], function() {
    var $ = window.__dollar || window.jQuery || window.Zepto;
    if (!$) {
      throw new Error('jQuery or Zepto not found!');
    }
    return $;
  });
  define('dollar', ['dollar-third'], function(_) {
    return _;
  });
  define('promise-third', ['dollar'], function($) {
    return {
      Deferred: $.Deferred,
      when: $.when,
      isPromise: function(anything) {
        return anything && typeof anything.then === 'function';
      }
    };
  });
  define('promise', ['promise-third'], function(_) {
    return _;
  });
  define('base', ['dollar', 'promise'], function($, promise) {
    var noop = function() {},
        call = Function.call;
    function uncurryThis(fn) {
      return function() {
        return call.apply(fn, arguments);
      };
    }
    function bindFn(fn, context) {
      return function() {
        return fn.apply(context, arguments);
      };
    }
    function createObject(proto) {
      var f;
      if (Object.create) {
        return Object.create(proto);
      } else {
        f = function() {};
        f.prototype = proto;
        return new f();
      }
    }
    return {
      version: '0.1.5',
      $: $,
      Deferred: promise.Deferred,
      isPromise: promise.isPromise,
      when: promise.when,
      browser: (function(ua) {
        var ret = {},
            webkit = ua.match(/WebKit\/([\d.]+)/),
            chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
            ie = ua.match(/MSIE\s([\d\.]+)/) || ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
            firefox = ua.match(/Firefox\/([\d.]+)/),
            safari = ua.match(/Safari\/([\d.]+)/),
            opera = ua.match(/OPR\/([\d.]+)/);
        webkit && (ret.webkit = parseFloat(webkit[1]));
        chrome && (ret.chrome = parseFloat(chrome[1]));
        ie && (ret.ie = parseFloat(ie[1]));
        firefox && (ret.firefox = parseFloat(firefox[1]));
        safari && (ret.safari = parseFloat(safari[1]));
        opera && (ret.opera = parseFloat(opera[1]));
        return ret;
      })(navigator.userAgent),
      os: (function(ua) {
        var ret = {},
            android = ua.match(/(?:Android);?[\s\/]+([\d.]+)?/),
            ios = ua.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
        android && (ret.android = parseFloat(android[1]));
        ios && (ret.ios = parseFloat(ios[1].replace(/_/g, '.')));
        return ret;
      })(navigator.userAgent),
      inherits: function(Super, protos, staticProtos) {
        var child;
        if (typeof protos === 'function') {
          child = protos;
          protos = null;
        } else if (protos && protos.hasOwnProperty('constructor')) {
          child = protos.constructor;
        } else {
          child = function() {
            return Super.apply(this, arguments);
          };
        }
        $.extend(true, child, Super, staticProtos || {});
        child.__super__ = Super.prototype;
        child.prototype = createObject(Super.prototype);
        protos && $.extend(true, child.prototype, protos);
        return child;
      },
      noop: noop,
      bindFn: bindFn,
      log: (function() {
        if (window.console) {
          return bindFn(console.log, console);
        }
        return noop;
      })(),
      nextTick: (function() {
        return function(cb) {
          setTimeout(cb, 1);
        };
      })(),
      slice: uncurryThis([].slice),
      guid: (function() {
        var counter = 0;
        return function(prefix) {
          var guid = (+new Date()).toString(32),
              i = 0;
          for (; i < 5; i++) {
            guid += Math.floor(Math.random() * 65535).toString(32);
          }
          return (prefix || 'wu_') + guid + (counter++).toString(32);
        };
      })(),
      formatSize: function(size, pointLength, units) {
        var unit;
        units = units || ['B', 'K', 'M', 'G', 'TB'];
        while ((unit = units.shift()) && size > 1024) {
          size = size / 1024;
        }
        return (unit === 'B' ? size : size.toFixed(pointLength || 2)) + unit;
      }
    };
  });
  define('mediator', ['base'], function(Base) {
    var $ = Base.$,
        slice = [].slice,
        separator = /\s+/,
        protos;
    function findHandlers(arr, name, callback, context) {
      return $.grep(arr, function(handler) {
        return handler && (!name || handler.e === name) && (!callback || handler.cb === callback || handler.cb._cb === callback) && (!context || handler.ctx === context);
      });
    }
    function eachEvent(events, callback, iterator) {
      $.each((events || '').split(separator), function(_, key) {
        iterator(key, callback);
      });
    }
    function triggerHanders(events, args) {
      var stoped = false,
          i = -1,
          len = events.length,
          handler;
      while (++i < len) {
        handler = events[i];
        if (handler.cb.apply(handler.ctx2, args) === false) {
          stoped = true;
          break;
        }
      }
      return !stoped;
    }
    protos = {
      on: function(name, callback, context) {
        var me = this,
            set;
        if (!callback) {
          return this;
        }
        set = this._events || (this._events = []);
        eachEvent(name, callback, function(name, callback) {
          var handler = {e: name};
          handler.cb = callback;
          handler.ctx = context;
          handler.ctx2 = context || me;
          handler.id = set.length;
          set.push(handler);
        });
        return this;
      },
      once: function(name, callback, context) {
        var me = this;
        if (!callback) {
          return me;
        }
        eachEvent(name, callback, function(name, callback) {
          var once = function() {
            me.off(name, once);
            return callback.apply(context || me, arguments);
          };
          once._cb = callback;
          me.on(name, once, context);
        });
        return me;
      },
      off: function(name, cb, ctx) {
        var events = this._events;
        if (!events) {
          return this;
        }
        if (!name && !cb && !ctx) {
          this._events = [];
          return this;
        }
        eachEvent(name, cb, function(name, cb) {
          $.each(findHandlers(events, name, cb, ctx), function() {
            delete events[this.id];
          });
        });
        return this;
      },
      trigger: function(type) {
        var args,
            events,
            allEvents;
        if (!this._events || !type) {
          return this;
        }
        args = slice.call(arguments, 1);
        events = findHandlers(this._events, type);
        allEvents = findHandlers(this._events, 'all');
        return triggerHanders(events, args) && triggerHanders(allEvents, arguments);
      }
    };
    return $.extend({installTo: function(obj) {
        return $.extend(obj, protos);
      }}, protos);
  });
  define('uploader', ['base', 'mediator'], function(Base, Mediator) {
    var $ = Base.$;
    function Uploader(opts) {
      this.options = $.extend(true, {}, Uploader.options, opts);
      this._init(this.options);
    }
    Uploader.options = {};
    Mediator.installTo(Uploader.prototype);
    $.each({
      upload: 'start-upload',
      stop: 'stop-upload',
      getFile: 'get-file',
      getFiles: 'get-files',
      addFile: 'add-file',
      addFiles: 'add-file',
      sort: 'sort-files',
      removeFile: 'remove-file',
      cancelFile: 'cancel-file',
      skipFile: 'skip-file',
      retry: 'retry',
      isInProgress: 'is-in-progress',
      makeThumb: 'make-thumb',
      md5File: 'md5-file',
      getDimension: 'get-dimension',
      addButton: 'add-btn',
      predictRuntimeType: 'predict-runtime-type',
      refresh: 'refresh',
      disable: 'disable',
      enable: 'enable',
      reset: 'reset'
    }, function(fn, command) {
      Uploader.prototype[fn] = function() {
        return this.request(command, arguments);
      };
    });
    $.extend(Uploader.prototype, {
      state: 'pending',
      _init: function(opts) {
        var me = this;
        me.request('init', opts, function() {
          me.state = 'ready';
          me.trigger('ready');
        });
      },
      option: function(key, val) {
        var opts = this.options;
        if (arguments.length > 1) {
          if ($.isPlainObject(val) && $.isPlainObject(opts[key])) {
            $.extend(opts[key], val);
          } else {
            opts[key] = val;
          }
        } else {
          return key ? opts[key] : opts;
        }
      },
      getStats: function() {
        var stats = this.request('get-stats');
        return stats ? {
          successNum: stats.numOfSuccess,
          progressNum: stats.numOfProgress,
          cancelNum: stats.numOfCancel,
          invalidNum: stats.numOfInvalid,
          uploadFailNum: stats.numOfUploadFailed,
          queueNum: stats.numOfQueue,
          interruptNum: stats.numofInterrupt
        } : {};
      },
      trigger: function(type) {
        var args = [].slice.call(arguments, 1),
            opts = this.options,
            name = 'on' + type.substring(0, 1).toUpperCase() + type.substring(1);
        if (Mediator.trigger.apply(this, arguments) === false || $.isFunction(opts[name]) && opts[name].apply(this, args) === false || $.isFunction(this[name]) && this[name].apply(this, args) === false || Mediator.trigger.apply(Mediator, [this, type].concat(args)) === false) {
          return false;
        }
        return true;
      },
      destroy: function() {
        this.request('destroy', arguments);
        this.off();
      },
      request: Base.noop
    });
    Base.create = Uploader.create = function(opts) {
      return new Uploader(opts);
    };
    Base.Uploader = Uploader;
    return Uploader;
  });
  define('runtime/runtime', ['base', 'mediator'], function(Base, Mediator) {
    var $ = Base.$,
        factories = {},
        getFirstKey = function(obj) {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              return key;
            }
          }
          return null;
        };
    function Runtime(options) {
      this.options = $.extend({container: document.body}, options);
      this.uid = Base.guid('rt_');
    }
    $.extend(Runtime.prototype, {
      getContainer: function() {
        var opts = this.options,
            parent,
            container;
        if (this._container) {
          return this._container;
        }
        parent = $(opts.container || document.body);
        container = $(document.createElement('div'));
        container.attr('id', 'rt_' + this.uid);
        container.css({
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        });
        parent.append(container);
        parent.addClass('webuploader-container');
        this._container = container;
        this._parent = parent;
        return container;
      },
      init: Base.noop,
      exec: Base.noop,
      destroy: function() {
        this._container && this._container.remove();
        this._parent && this._parent.removeClass('webuploader-container');
        this.off();
      }
    });
    Runtime.orders = 'html5,flash';
    Runtime.addRuntime = function(type, factory) {
      factories[type] = factory;
    };
    Runtime.hasRuntime = function(type) {
      return !!(type ? factories[type] : getFirstKey(factories));
    };
    Runtime.create = function(opts, orders) {
      var type,
          runtime;
      orders = orders || Runtime.orders;
      $.each(orders.split(/\s*,\s*/g), function() {
        if (factories[this]) {
          type = this;
          return false;
        }
      });
      type = type || getFirstKey(factories);
      if (!type) {
        throw new Error('Runtime Error');
      }
      runtime = new factories[type](opts);
      return runtime;
    };
    Mediator.installTo(Runtime.prototype);
    return Runtime;
  });
  define('runtime/client', ['base', 'mediator', 'runtime/runtime'], function(Base, Mediator, Runtime) {
    var cache;
    cache = (function() {
      var obj = {};
      return {
        add: function(runtime) {
          obj[runtime.uid] = runtime;
        },
        get: function(ruid, standalone) {
          var i;
          if (ruid) {
            return obj[ruid];
          }
          for (i in obj) {
            if (standalone && obj[i].__standalone) {
              continue;
            }
            return obj[i];
          }
          return null;
        },
        remove: function(runtime) {
          delete obj[runtime.uid];
        }
      };
    })();
    function RuntimeClient(component, standalone) {
      var deferred = Base.Deferred(),
          runtime;
      this.uid = Base.guid('client_');
      this.runtimeReady = function(cb) {
        return deferred.done(cb);
      };
      this.connectRuntime = function(opts, cb) {
        if (runtime) {
          throw new Error('already connected!');
        }
        deferred.done(cb);
        if (typeof opts === 'string' && cache.get(opts)) {
          runtime = cache.get(opts);
        }
        runtime = runtime || cache.get(null, standalone);
        if (!runtime) {
          runtime = Runtime.create(opts, opts.runtimeOrder);
          runtime.__promise = deferred.promise();
          runtime.once('ready', deferred.resolve);
          runtime.init();
          cache.add(runtime);
          runtime.__client = 1;
        } else {
          Base.$.extend(runtime.options, opts);
          runtime.__promise.then(deferred.resolve);
          runtime.__client++;
        }
        standalone && (runtime.__standalone = standalone);
        return runtime;
      };
      this.getRuntime = function() {
        return runtime;
      };
      this.disconnectRuntime = function() {
        if (!runtime) {
          return;
        }
        runtime.__client--;
        if (runtime.__client <= 0) {
          cache.remove(runtime);
          delete runtime.__promise;
          runtime.destroy();
        }
        runtime = null;
      };
      this.exec = function() {
        if (!runtime) {
          return;
        }
        var args = Base.slice(arguments);
        component && args.unshift(component);
        return runtime.exec.apply(this, args);
      };
      this.getRuid = function() {
        return runtime && runtime.uid;
      };
      this.destroy = (function(destroy) {
        return function() {
          destroy && destroy.apply(this, arguments);
          this.trigger('destroy');
          this.off();
          this.exec('destroy');
          this.disconnectRuntime();
        };
      })(this.destroy);
    }
    Mediator.installTo(RuntimeClient.prototype);
    return RuntimeClient;
  });
  define('lib/dnd', ['base', 'mediator', 'runtime/client'], function(Base, Mediator, RuntimeClent) {
    var $ = Base.$;
    function DragAndDrop(opts) {
      opts = this.options = $.extend({}, DragAndDrop.options, opts);
      opts.container = $(opts.container);
      if (!opts.container.length) {
        return;
      }
      RuntimeClent.call(this, 'DragAndDrop');
    }
    DragAndDrop.options = {
      accept: null,
      disableGlobalDnd: false
    };
    Base.inherits(RuntimeClent, {
      constructor: DragAndDrop,
      init: function() {
        var me = this;
        me.connectRuntime(me.options, function() {
          me.exec('init');
          me.trigger('ready');
        });
      }
    });
    Mediator.installTo(DragAndDrop.prototype);
    return DragAndDrop;
  });
  define('widgets/widget', ['base', 'uploader'], function(Base, Uploader) {
    var $ = Base.$,
        _init = Uploader.prototype._init,
        _destroy = Uploader.prototype.destroy,
        IGNORE = {},
        widgetClass = [];
    function isArrayLike(obj) {
      if (!obj) {
        return false;
      }
      var length = obj.length,
          type = $.type(obj);
      if (obj.nodeType === 1 && length) {
        return true;
      }
      return type === 'array' || type !== 'function' && type !== 'string' && (length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj);
    }
    function Widget(uploader) {
      this.owner = uploader;
      this.options = uploader.options;
    }
    $.extend(Widget.prototype, {
      init: Base.noop,
      invoke: function(apiName, args) {
        var map = this.responseMap;
        if (!map || !(apiName in map) || !(map[apiName] in this) || !$.isFunction(this[map[apiName]])) {
          return IGNORE;
        }
        return this[map[apiName]].apply(this, args);
      },
      request: function() {
        return this.owner.request.apply(this.owner, arguments);
      }
    });
    $.extend(Uploader.prototype, {
      _init: function() {
        var me = this,
            widgets = me._widgets = [],
            deactives = me.options.disableWidgets || '';
        $.each(widgetClass, function(_, klass) {
          (!deactives || !~deactives.indexOf(klass._name)) && widgets.push(new klass(me));
        });
        return _init.apply(me, arguments);
      },
      request: function(apiName, args, callback) {
        var i = 0,
            widgets = this._widgets,
            len = widgets && widgets.length,
            rlts = [],
            dfds = [],
            widget,
            rlt,
            promise,
            key;
        args = isArrayLike(args) ? args : [args];
        for (; i < len; i++) {
          widget = widgets[i];
          rlt = widget.invoke(apiName, args);
          if (rlt !== IGNORE) {
            if (Base.isPromise(rlt)) {
              dfds.push(rlt);
            } else {
              rlts.push(rlt);
            }
          }
        }
        if (callback || dfds.length) {
          promise = Base.when.apply(Base, dfds);
          key = promise.pipe ? 'pipe' : 'then';
          return promise[key](function() {
            var deferred = Base.Deferred(),
                args = arguments;
            if (args.length === 1) {
              args = args[0];
            }
            setTimeout(function() {
              deferred.resolve(args);
            }, 1);
            return deferred.promise();
          })[callback ? key : 'done'](callback || Base.noop);
        } else {
          return rlts[0];
        }
      },
      destroy: function() {
        _destroy.apply(this, arguments);
        this._widgets = null;
      }
    });
    Uploader.register = Widget.register = function(responseMap, widgetProto) {
      var map = {
        init: 'init',
        destroy: 'destroy',
        name: 'anonymous'
      },
          klass;
      if (arguments.length === 1) {
        widgetProto = responseMap;
        $.each(widgetProto, function(key) {
          if (key[0] === '_' || key === 'name') {
            key === 'name' && (map.name = widgetProto.name);
            return;
          }
          map[key.replace(/[A-Z]/g, '-$&').toLowerCase()] = key;
        });
      } else {
        map = $.extend(map, responseMap);
      }
      widgetProto.responseMap = map;
      klass = Base.inherits(Widget, widgetProto);
      klass._name = map.name;
      widgetClass.push(klass);
      return klass;
    };
    Uploader.unRegister = Widget.unRegister = function(name) {
      if (!name || name === 'anonymous') {
        return;
      }
      for (var i = widgetClass.length; i--; ) {
        if (widgetClass[i]._name === name) {
          widgetClass.splice(i, 1);
        }
      }
    };
    return Widget;
  });
  define('widgets/filednd', ['base', 'uploader', 'lib/dnd', 'widgets/widget'], function(Base, Uploader, Dnd) {
    var $ = Base.$;
    Uploader.options.dnd = '';
    return Uploader.register({
      name: 'dnd',
      init: function(opts) {
        if (!opts.dnd || this.request('predict-runtime-type') !== 'html5') {
          return;
        }
        var me = this,
            deferred = Base.Deferred(),
            options = $.extend({}, {
              disableGlobalDnd: opts.disableGlobalDnd,
              container: opts.dnd,
              accept: opts.accept
            }),
            dnd;
        this.dnd = dnd = new Dnd(options);
        dnd.once('ready', deferred.resolve);
        dnd.on('drop', function(files) {
          me.request('add-file', [files]);
        });
        dnd.on('accept', function(items) {
          return me.owner.trigger('dndAccept', items);
        });
        dnd.init();
        return deferred.promise();
      },
      destroy: function() {
        this.dnd && this.dnd.destroy();
      }
    });
  });
  define('lib/filepaste', ['base', 'mediator', 'runtime/client'], function(Base, Mediator, RuntimeClent) {
    var $ = Base.$;
    function FilePaste(opts) {
      opts = this.options = $.extend({}, opts);
      opts.container = $(opts.container || document.body);
      RuntimeClent.call(this, 'FilePaste');
    }
    Base.inherits(RuntimeClent, {
      constructor: FilePaste,
      init: function() {
        var me = this;
        me.connectRuntime(me.options, function() {
          me.exec('init');
          me.trigger('ready');
        });
      }
    });
    Mediator.installTo(FilePaste.prototype);
    return FilePaste;
  });
  define('widgets/filepaste', ['base', 'uploader', 'lib/filepaste', 'widgets/widget'], function(Base, Uploader, FilePaste) {
    var $ = Base.$;
    return Uploader.register({
      name: 'paste',
      init: function(opts) {
        if (!opts.paste || this.request('predict-runtime-type') !== 'html5') {
          return;
        }
        var me = this,
            deferred = Base.Deferred(),
            options = $.extend({}, {
              container: opts.paste,
              accept: opts.accept
            }),
            paste;
        this.paste = paste = new FilePaste(options);
        paste.once('ready', deferred.resolve);
        paste.on('paste', function(files) {
          me.owner.request('add-file', [files]);
        });
        paste.init();
        return deferred.promise();
      },
      destroy: function() {
        this.paste && this.paste.destroy();
      }
    });
  });
  define('lib/blob', ['base', 'runtime/client'], function(Base, RuntimeClient) {
    function Blob(ruid, source) {
      var me = this;
      me.source = source;
      me.ruid = ruid;
      this.size = source.size || 0;
      if (!source.type && this.ext && ~'jpg,jpeg,png,gif,bmp'.indexOf(this.ext)) {
        this.type = 'image/' + (this.ext === 'jpg' ? 'jpeg' : this.ext);
      } else {
        this.type = source.type || 'application/octet-stream';
      }
      RuntimeClient.call(me, 'Blob');
      this.uid = source.uid || this.uid;
      if (ruid) {
        me.connectRuntime(ruid);
      }
    }
    Base.inherits(RuntimeClient, {
      constructor: Blob,
      slice: function(start, end) {
        return this.exec('slice', start, end);
      },
      getSource: function() {
        return this.source;
      }
    });
    return Blob;
  });
  define('lib/file', ['base', 'lib/blob'], function(Base, Blob) {
    var uid = 1,
        rExt = /\.([^.]+)$/;
    function File(ruid, file) {
      var ext;
      this.name = file.name || ('untitled' + uid++);
      ext = rExt.exec(file.name) ? RegExp.$1.toLowerCase() : '';
      if (!ext && file.type) {
        ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(file.type) ? RegExp.$1.toLowerCase() : '';
        this.name += '.' + ext;
      }
      this.ext = ext;
      this.lastModifiedDate = file.lastModifiedDate || (new Date()).toLocaleString();
      Blob.apply(this, arguments);
    }
    return Base.inherits(Blob, File);
  });
  define('lib/filepicker', ['base', 'runtime/client', 'lib/file'], function(Base, RuntimeClent, File) {
    var $ = Base.$;
    function FilePicker(opts) {
      opts = this.options = $.extend({}, FilePicker.options, opts);
      opts.container = $(opts.id);
      if (!opts.container.length) {
        throw new Error('按钮指定错误');
      }
      opts.innerHTML = opts.innerHTML || opts.label || opts.container.html() || '';
      opts.button = $(opts.button || document.createElement('div'));
      opts.button.html(opts.innerHTML);
      opts.container.html(opts.button);
      RuntimeClent.call(this, 'FilePicker', true);
    }
    FilePicker.options = {
      button: null,
      container: null,
      label: null,
      innerHTML: null,
      multiple: true,
      accept: null,
      name: 'file'
    };
    Base.inherits(RuntimeClent, {
      constructor: FilePicker,
      init: function() {
        var me = this,
            opts = me.options,
            button = opts.button;
        button.addClass('webuploader-pick');
        me.on('all', function(type) {
          var files;
          switch (type) {
            case 'mouseenter':
              button.addClass('webuploader-pick-hover');
              break;
            case 'mouseleave':
              button.removeClass('webuploader-pick-hover');
              break;
            case 'change':
              files = me.exec('getFiles');
              me.trigger('select', $.map(files, function(file) {
                file = new File(me.getRuid(), file);
                file._refer = opts.container;
                return file;
              }), opts.container);
              break;
          }
        });
        me.connectRuntime(opts, function() {
          me.refresh();
          me.exec('init', opts);
          me.trigger('ready');
        });
        this._resizeHandler = Base.bindFn(this.refresh, this);
        $(window).on('resize', this._resizeHandler);
      },
      refresh: function() {
        var shimContainer = this.getRuntime().getContainer(),
            button = this.options.button,
            width = button.outerWidth ? button.outerWidth() : button.width(),
            height = button.outerHeight ? button.outerHeight() : button.height(),
            pos = button.offset();
        width && height && shimContainer.css({
          bottom: 'auto',
          right: 'auto',
          width: width + 'px',
          height: height + 'px'
        }).offset(pos);
      },
      enable: function() {
        var btn = this.options.button;
        btn.removeClass('webuploader-pick-disable');
        this.refresh();
      },
      disable: function() {
        var btn = this.options.button;
        this.getRuntime().getContainer().css({top: '-99999px'});
        btn.addClass('webuploader-pick-disable');
      },
      destroy: function() {
        var btn = this.options.button;
        $(window).off('resize', this._resizeHandler);
        btn.removeClass('webuploader-pick-disable webuploader-pick-hover ' + 'webuploader-pick');
      }
    });
    return FilePicker;
  });
  define('widgets/filepicker', ['base', 'uploader', 'lib/filepicker', 'widgets/widget'], function(Base, Uploader, FilePicker) {
    var $ = Base.$;
    $.extend(Uploader.options, {
      pick: null,
      accept: null
    });
    return Uploader.register({
      name: 'picker',
      init: function(opts) {
        this.pickers = [];
        return opts.pick && this.addBtn(opts.pick);
      },
      refresh: function() {
        $.each(this.pickers, function() {
          this.refresh();
        });
      },
      addBtn: function(pick) {
        var me = this,
            opts = me.options,
            accept = opts.accept,
            promises = [];
        if (!pick) {
          return;
        }
        $.isPlainObject(pick) || (pick = {id: pick});
        $(pick.id).each(function() {
          var options,
              picker,
              deferred;
          deferred = Base.Deferred();
          options = $.extend({}, pick, {
            accept: $.isPlainObject(accept) ? [accept] : accept,
            swf: opts.swf,
            runtimeOrder: opts.runtimeOrder,
            id: this
          });
          picker = new FilePicker(options);
          picker.once('ready', deferred.resolve);
          picker.on('select', function(files) {
            me.owner.request('add-file', [files]);
          });
          picker.init();
          me.pickers.push(picker);
          promises.push(deferred.promise());
        });
        return Base.when.apply(Base, promises);
      },
      disable: function() {
        $.each(this.pickers, function() {
          this.disable();
        });
      },
      enable: function() {
        $.each(this.pickers, function() {
          this.enable();
        });
      },
      destroy: function() {
        $.each(this.pickers, function() {
          this.destroy();
        });
        this.pickers = null;
      }
    });
  });
  define('lib/image', ['base', 'runtime/client', 'lib/blob'], function(Base, RuntimeClient, Blob) {
    var $ = Base.$;
    function Image(opts) {
      this.options = $.extend({}, Image.options, opts);
      RuntimeClient.call(this, 'Image');
      this.on('load', function() {
        this._info = this.exec('info');
        this._meta = this.exec('meta');
      });
    }
    Image.options = {
      quality: 90,
      crop: false,
      preserveHeaders: false,
      allowMagnify: false
    };
    Base.inherits(RuntimeClient, {
      constructor: Image,
      info: function(val) {
        if (val) {
          this._info = val;
          return this;
        }
        return this._info;
      },
      meta: function(val) {
        if (val) {
          this._meta = val;
          return this;
        }
        return this._meta;
      },
      loadFromBlob: function(blob) {
        var me = this,
            ruid = blob.getRuid();
        this.connectRuntime(ruid, function() {
          me.exec('init', me.options);
          me.exec('loadFromBlob', blob);
        });
      },
      resize: function() {
        var args = Base.slice(arguments);
        return this.exec.apply(this, ['resize'].concat(args));
      },
      crop: function() {
        var args = Base.slice(arguments);
        return this.exec.apply(this, ['crop'].concat(args));
      },
      getAsDataUrl: function(type) {
        return this.exec('getAsDataUrl', type);
      },
      getAsBlob: function(type) {
        var blob = this.exec('getAsBlob', type);
        return new Blob(this.getRuid(), blob);
      }
    });
    return Image;
  });
  define('widgets/image', ['base', 'uploader', 'lib/image', 'widgets/widget'], function(Base, Uploader, Image) {
    var $ = Base.$,
        throttle;
    throttle = (function(max) {
      var occupied = 0,
          waiting = [],
          tick = function() {
            var item;
            while (waiting.length && occupied < max) {
              item = waiting.shift();
              occupied += item[0];
              item[1]();
            }
          };
      return function(emiter, size, cb) {
        waiting.push([size, cb]);
        emiter.once('destroy', function() {
          occupied -= size;
          setTimeout(tick, 1);
        });
        setTimeout(tick, 1);
      };
    })(5 * 1024 * 1024);
    $.extend(Uploader.options, {
      thumb: {
        width: 110,
        height: 110,
        quality: 70,
        allowMagnify: true,
        crop: true,
        preserveHeaders: false,
        type: 'image/jpeg'
      },
      compress: {
        width: 1600,
        height: 1600,
        quality: 90,
        allowMagnify: false,
        crop: false,
        preserveHeaders: true
      }
    });
    return Uploader.register({
      name: 'image',
      makeThumb: function(file, cb, width, height) {
        var opts,
            image;
        file = this.request('get-file', file);
        if (!file.type.match(/^image/)) {
          cb(true);
          return;
        }
        opts = $.extend({}, this.options.thumb);
        if ($.isPlainObject(width)) {
          opts = $.extend(opts, width);
          width = null;
        }
        width = width || opts.width;
        height = height || opts.height;
        image = new Image(opts);
        image.once('load', function() {
          file._info = file._info || image.info();
          file._meta = file._meta || image.meta();
          if (width <= 1 && width > 0) {
            width = file._info.width * width;
          }
          if (height <= 1 && height > 0) {
            height = file._info.height * height;
          }
          image.resize(width, height);
        });
        image.once('complete', function() {
          cb(false, image.getAsDataUrl(opts.type));
          image.destroy();
        });
        image.once('error', function(reason) {
          cb(reason || true);
          image.destroy();
        });
        throttle(image, file.source.size, function() {
          file._info && image.info(file._info);
          file._meta && image.meta(file._meta);
          image.loadFromBlob(file.source);
        });
      },
      beforeSendFile: function(file) {
        var opts = this.options.compress || this.options.resize,
            compressSize = opts && opts.compressSize || 0,
            noCompressIfLarger = opts && opts.noCompressIfLarger || false,
            image,
            deferred;
        file = this.request('get-file', file);
        if (!opts || !~'image/jpeg,image/jpg'.indexOf(file.type) || file.size < compressSize || file._compressed) {
          return;
        }
        opts = $.extend({}, opts);
        deferred = Base.Deferred();
        image = new Image(opts);
        deferred.always(function() {
          image.destroy();
          image = null;
        });
        image.once('error', deferred.reject);
        image.once('load', function() {
          var width = opts.width,
              height = opts.height;
          file._info = file._info || image.info();
          file._meta = file._meta || image.meta();
          if (width <= 1 && width > 0) {
            width = file._info.width * width;
          }
          if (height <= 1 && height > 0) {
            height = file._info.height * height;
          }
          image.resize(width, height);
        });
        image.once('complete', function() {
          var blob,
              size;
          try {
            blob = image.getAsBlob(opts.type);
            size = file.size;
            if (!noCompressIfLarger || blob.size < size) {
              file.source = blob;
              file.size = blob.size;
              file.trigger('resize', blob.size, size);
            }
            file._compressed = true;
            deferred.resolve();
          } catch (e) {
            deferred.resolve();
          }
        });
        file._info && image.info(file._info);
        file._meta && image.meta(file._meta);
        image.loadFromBlob(file.source);
        return deferred.promise();
      }
    });
  });
  define('file', ['base', 'mediator'], function(Base, Mediator) {
    var $ = Base.$,
        idPrefix = 'WU_FILE_',
        idSuffix = 0,
        rExt = /\.([^.]+)$/,
        statusMap = {};
    function gid() {
      return idPrefix + idSuffix++;
    }
    function WUFile(source) {
      this.name = source.name || 'Untitled';
      this.size = source.size || 0;
      this.type = source.type || 'application/octet-stream';
      this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);
      this.id = gid();
      this.ext = rExt.exec(this.name) ? RegExp.$1 : '';
      this.statusText = '';
      statusMap[this.id] = WUFile.Status.INITED;
      this.source = source;
      this.loaded = 0;
      this.on('error', function(msg) {
        this.setStatus(WUFile.Status.ERROR, msg);
      });
    }
    $.extend(WUFile.prototype, {
      setStatus: function(status, text) {
        var prevStatus = statusMap[this.id];
        typeof text !== 'undefined' && (this.statusText = text);
        if (status !== prevStatus) {
          statusMap[this.id] = status;
          this.trigger('statuschange', status, prevStatus);
        }
      },
      getStatus: function() {
        return statusMap[this.id];
      },
      getSource: function() {
        return this.source;
      },
      destroy: function() {
        this.off();
        delete statusMap[this.id];
      }
    });
    Mediator.installTo(WUFile.prototype);
    WUFile.Status = {
      INITED: 'inited',
      QUEUED: 'queued',
      PROGRESS: 'progress',
      ERROR: 'error',
      COMPLETE: 'complete',
      CANCELLED: 'cancelled',
      INTERRUPT: 'interrupt',
      INVALID: 'invalid'
    };
    return WUFile;
  });
  define('queue', ['base', 'mediator', 'file'], function(Base, Mediator, WUFile) {
    var $ = Base.$,
        STATUS = WUFile.Status;
    function Queue() {
      this.stats = {
        numOfQueue: 0,
        numOfSuccess: 0,
        numOfCancel: 0,
        numOfProgress: 0,
        numOfUploadFailed: 0,
        numOfInvalid: 0,
        numofDeleted: 0,
        numofInterrupt: 0
      };
      this._queue = [];
      this._map = {};
    }
    $.extend(Queue.prototype, {
      append: function(file) {
        this._queue.push(file);
        this._fileAdded(file);
        return this;
      },
      prepend: function(file) {
        this._queue.unshift(file);
        this._fileAdded(file);
        return this;
      },
      getFile: function(fileId) {
        if (typeof fileId !== 'string') {
          return fileId;
        }
        return this._map[fileId];
      },
      fetch: function(status) {
        var len = this._queue.length,
            i,
            file;
        status = status || STATUS.QUEUED;
        for (i = 0; i < len; i++) {
          file = this._queue[i];
          if (status === file.getStatus()) {
            return file;
          }
        }
        return null;
      },
      sort: function(fn) {
        if (typeof fn === 'function') {
          this._queue.sort(fn);
        }
      },
      getFiles: function() {
        var sts = [].slice.call(arguments, 0),
            ret = [],
            i = 0,
            len = this._queue.length,
            file;
        for (; i < len; i++) {
          file = this._queue[i];
          if (sts.length && !~$.inArray(file.getStatus(), sts)) {
            continue;
          }
          ret.push(file);
        }
        return ret;
      },
      removeFile: function(file) {
        var me = this,
            existing = this._map[file.id];
        if (existing) {
          delete this._map[file.id];
          file.destroy();
          this.stats.numofDeleted++;
        }
      },
      _fileAdded: function(file) {
        var me = this,
            existing = this._map[file.id];
        if (!existing) {
          this._map[file.id] = file;
          file.on('statuschange', function(cur, pre) {
            me._onFileStatusChange(cur, pre);
          });
        }
      },
      _onFileStatusChange: function(curStatus, preStatus) {
        var stats = this.stats;
        switch (preStatus) {
          case STATUS.PROGRESS:
            stats.numOfProgress--;
            break;
          case STATUS.QUEUED:
            stats.numOfQueue--;
            break;
          case STATUS.ERROR:
            stats.numOfUploadFailed--;
            break;
          case STATUS.INVALID:
            stats.numOfInvalid--;
            break;
          case STATUS.INTERRUPT:
            stats.numofInterrupt--;
            break;
        }
        switch (curStatus) {
          case STATUS.QUEUED:
            stats.numOfQueue++;
            break;
          case STATUS.PROGRESS:
            stats.numOfProgress++;
            break;
          case STATUS.ERROR:
            stats.numOfUploadFailed++;
            break;
          case STATUS.COMPLETE:
            stats.numOfSuccess++;
            break;
          case STATUS.CANCELLED:
            stats.numOfCancel++;
            break;
          case STATUS.INVALID:
            stats.numOfInvalid++;
            break;
          case STATUS.INTERRUPT:
            stats.numofInterrupt++;
            break;
        }
      }
    });
    Mediator.installTo(Queue.prototype);
    return Queue;
  });
  define('widgets/queue', ['base', 'uploader', 'queue', 'file', 'lib/file', 'runtime/client', 'widgets/widget'], function(Base, Uploader, Queue, WUFile, File, RuntimeClient) {
    var $ = Base.$,
        rExt = /\.\w+$/,
        Status = WUFile.Status;
    return Uploader.register({
      name: 'queue',
      init: function(opts) {
        var me = this,
            deferred,
            len,
            i,
            item,
            arr,
            accept,
            runtime;
        if ($.isPlainObject(opts.accept)) {
          opts.accept = [opts.accept];
        }
        if (opts.accept) {
          arr = [];
          for (i = 0, len = opts.accept.length; i < len; i++) {
            item = opts.accept[i].extensions;
            item && arr.push(item);
          }
          if (arr.length) {
            accept = '\\.' + arr.join(',').replace(/,/g, '$|\\.').replace(/\*/g, '.*') + '$';
          }
          me.accept = new RegExp(accept, 'i');
        }
        me.queue = new Queue();
        me.stats = me.queue.stats;
        if (this.request('predict-runtime-type') !== 'html5') {
          return;
        }
        deferred = Base.Deferred();
        this.placeholder = runtime = new RuntimeClient('Placeholder');
        runtime.connectRuntime({runtimeOrder: 'html5'}, function() {
          me._ruid = runtime.getRuid();
          deferred.resolve();
        });
        return deferred.promise();
      },
      _wrapFile: function(file) {
        if (!(file instanceof WUFile)) {
          if (!(file instanceof File)) {
            if (!this._ruid) {
              throw new Error('Can\'t add external files.');
            }
            file = new File(this._ruid, file);
          }
          file = new WUFile(file);
        }
        return file;
      },
      acceptFile: function(file) {
        var invalid = !file || !file.size || this.accept && rExt.exec(file.name) && !this.accept.test(file.name);
        return !invalid;
      },
      _addFile: function(file) {
        var me = this;
        file = me._wrapFile(file);
        if (!me.owner.trigger('beforeFileQueued', file)) {
          return;
        }
        if (!me.acceptFile(file)) {
          me.owner.trigger('error', 'Q_TYPE_DENIED', file);
          return;
        }
        me.queue.append(file);
        me.owner.trigger('fileQueued', file);
        return file;
      },
      getFile: function(fileId) {
        return this.queue.getFile(fileId);
      },
      addFile: function(files) {
        var me = this;
        if (!files.length) {
          files = [files];
        }
        files = $.map(files, function(file) {
          return me._addFile(file);
        });
        me.owner.trigger('filesQueued', files);
        if (me.options.auto) {
          setTimeout(function() {
            me.request('start-upload');
          }, 20);
        }
      },
      getStats: function() {
        return this.stats;
      },
      removeFile: function(file, remove) {
        var me = this;
        file = file.id ? file : me.queue.getFile(file);
        this.request('cancel-file', file);
        if (remove) {
          this.queue.removeFile(file);
        }
      },
      getFiles: function() {
        return this.queue.getFiles.apply(this.queue, arguments);
      },
      fetchFile: function() {
        return this.queue.fetch.apply(this.queue, arguments);
      },
      retry: function(file, noForceStart) {
        var me = this,
            files,
            i,
            len;
        if (file) {
          file = file.id ? file : me.queue.getFile(file);
          file.setStatus(Status.QUEUED);
          noForceStart || me.request('start-upload');
          return;
        }
        files = me.queue.getFiles(Status.ERROR);
        i = 0;
        len = files.length;
        for (; i < len; i++) {
          file = files[i];
          file.setStatus(Status.QUEUED);
        }
        me.request('start-upload');
      },
      sortFiles: function() {
        return this.queue.sort.apply(this.queue, arguments);
      },
      reset: function() {
        this.owner.trigger('reset');
        this.queue = new Queue();
        this.stats = this.queue.stats;
      },
      destroy: function() {
        this.reset();
        this.placeholder && this.placeholder.destroy();
      }
    });
  });
  define('widgets/runtime', ['uploader', 'runtime/runtime', 'widgets/widget'], function(Uploader, Runtime) {
    Uploader.support = function() {
      return Runtime.hasRuntime.apply(Runtime, arguments);
    };
    return Uploader.register({
      name: 'runtime',
      init: function() {
        if (!this.predictRuntimeType()) {
          throw Error('Runtime Error');
        }
      },
      predictRuntimeType: function() {
        var orders = this.options.runtimeOrder || Runtime.orders,
            type = this.type,
            i,
            len;
        if (!type) {
          orders = orders.split(/\s*,\s*/g);
          for (i = 0, len = orders.length; i < len; i++) {
            if (Runtime.hasRuntime(orders[i])) {
              this.type = type = orders[i];
              break;
            }
          }
        }
        return type;
      }
    });
  });
  define('lib/transport', ['base', 'runtime/client', 'mediator'], function(Base, RuntimeClient, Mediator) {
    var $ = Base.$;
    function Transport(opts) {
      var me = this;
      opts = me.options = $.extend(true, {}, Transport.options, opts || {});
      RuntimeClient.call(this, 'Transport');
      this._blob = null;
      this._formData = opts.formData || {};
      this._headers = opts.headers || {};
      this.on('progress', this._timeout);
      this.on('load error', function() {
        me.trigger('progress', 1);
        clearTimeout(me._timer);
      });
    }
    Transport.options = {
      server: '',
      method: 'POST',
      withCredentials: false,
      fileVal: 'file',
      timeout: 2 * 60 * 1000,
      formData: {},
      headers: {},
      sendAsBinary: false
    };
    $.extend(Transport.prototype, {
      appendBlob: function(key, blob, filename) {
        var me = this,
            opts = me.options;
        if (me.getRuid()) {
          me.disconnectRuntime();
        }
        me.connectRuntime(blob.ruid, function() {
          me.exec('init');
        });
        me._blob = blob;
        opts.fileVal = key || opts.fileVal;
        opts.filename = filename || opts.filename;
      },
      append: function(key, value) {
        if (typeof key === 'object') {
          $.extend(this._formData, key);
        } else {
          this._formData[key] = value;
        }
      },
      setRequestHeader: function(key, value) {
        if (typeof key === 'object') {
          $.extend(this._headers, key);
        } else {
          this._headers[key] = value;
        }
      },
      send: function(method) {
        this.exec('send', method);
        this._timeout();
      },
      abort: function() {
        clearTimeout(this._timer);
        return this.exec('abort');
      },
      destroy: function() {
        this.trigger('destroy');
        this.off();
        this.exec('destroy');
        this.disconnectRuntime();
      },
      getResponse: function() {
        return this.exec('getResponse');
      },
      getResponseAsJson: function() {
        return this.exec('getResponseAsJson');
      },
      getStatus: function() {
        return this.exec('getStatus');
      },
      _timeout: function() {
        var me = this,
            duration = me.options.timeout;
        if (!duration) {
          return;
        }
        clearTimeout(me._timer);
        me._timer = setTimeout(function() {
          me.abort();
          me.trigger('error', 'timeout');
        }, duration);
      }
    });
    Mediator.installTo(Transport.prototype);
    return Transport;
  });
  define('widgets/upload', ['base', 'uploader', 'file', 'lib/transport', 'widgets/widget'], function(Base, Uploader, WUFile, Transport) {
    var $ = Base.$,
        isPromise = Base.isPromise,
        Status = WUFile.Status;
    $.extend(Uploader.options, {
      prepareNextFile: false,
      chunked: false,
      chunkSize: 5 * 1024 * 1024,
      chunkRetry: 2,
      threads: 3,
      formData: {}
    });
    function CuteFile(file, chunkSize) {
      var pending = [],
          blob = file.source,
          total = blob.size,
          chunks = chunkSize ? Math.ceil(total / chunkSize) : 1,
          start = 0,
          index = 0,
          len,
          api;
      api = {
        file: file,
        has: function() {
          return !!pending.length;
        },
        shift: function() {
          return pending.shift();
        },
        unshift: function(block) {
          pending.unshift(block);
        }
      };
      while (index < chunks) {
        len = Math.min(chunkSize, total - start);
        pending.push({
          file: file,
          start: start,
          end: chunkSize ? (start + len) : total,
          total: total,
          chunks: chunks,
          chunk: index++,
          cuted: api
        });
        start += len;
      }
      file.blocks = pending.concat();
      file.remaning = pending.length;
      return api;
    }
    Uploader.register({
      name: 'upload',
      init: function() {
        var owner = this.owner,
            me = this;
        this.runing = false;
        this.progress = false;
        owner.on('startUpload', function() {
          me.progress = true;
        }).on('uploadFinished', function() {
          me.progress = false;
        });
        this.pool = [];
        this.stack = [];
        this.pending = [];
        this.remaning = 0;
        this.__tick = Base.bindFn(this._tick, this);
        owner.on('uploadComplete', function(file) {
          file.blocks && $.each(file.blocks, function(_, v) {
            v.transport && (v.transport.abort(), v.transport.destroy());
            delete v.transport;
          });
          delete file.blocks;
          delete file.remaning;
        });
      },
      reset: function() {
        this.request('stop-upload', true);
        this.runing = false;
        this.pool = [];
        this.stack = [];
        this.pending = [];
        this.remaning = 0;
        this._trigged = false;
        this._promise = null;
      },
      startUpload: function(file) {
        var me = this;
        $.each(me.request('get-files', Status.INVALID), function() {
          me.request('remove-file', this);
        });
        if (file) {
          file = file.id ? file : me.request('get-file', file);
          if (file.getStatus() === Status.INTERRUPT) {
            $.each(me.pool, function(_, v) {
              if (v.file !== file) {
                return;
              }
              v.transport && v.transport.send();
            });
            file.setStatus(Status.QUEUED);
          } else if (file.getStatus() === Status.PROGRESS) {
            return;
          } else {
            file.setStatus(Status.QUEUED);
          }
        } else {
          $.each(me.request('get-files', [Status.INITED]), function() {
            this.setStatus(Status.QUEUED);
          });
        }
        if (me.runing) {
          return;
        }
        me.runing = true;
        var files = [];
        $.each(me.pool, function(_, v) {
          var file = v.file;
          if (file.getStatus() === Status.INTERRUPT) {
            files.push(file);
            me._trigged = false;
            v.transport && v.transport.send();
          }
        });
        var file;
        while ((file = files.shift())) {
          file.setStatus(Status.PROGRESS);
        }
        file || $.each(me.request('get-files', Status.INTERRUPT), function() {
          this.setStatus(Status.PROGRESS);
        });
        me._trigged = false;
        Base.nextTick(me.__tick);
        me.owner.trigger('startUpload');
      },
      stopUpload: function(file, interrupt) {
        var me = this;
        if (file === true) {
          interrupt = file;
          file = null;
        }
        if (me.runing === false) {
          return;
        }
        if (file) {
          file = file.id ? file : me.request('get-file', file);
          if (file.getStatus() !== Status.PROGRESS && file.getStatus() !== Status.QUEUED) {
            return;
          }
          file.setStatus(Status.INTERRUPT);
          $.each(me.pool, function(_, v) {
            if (v.file !== file) {
              return;
            }
            v.transport && v.transport.abort();
            me._putback(v);
            me._popBlock(v);
          });
          return Base.nextTick(me.__tick);
        }
        me.runing = false;
        if (this._promise && this._promise.file) {
          this._promise.file.setStatus(Status.INTERRUPT);
        }
        interrupt && $.each(me.pool, function(_, v) {
          v.transport && v.transport.abort();
          v.file.setStatus(Status.INTERRUPT);
        });
        me.owner.trigger('stopUpload');
      },
      cancelFile: function(file) {
        file = file.id ? file : this.request('get-file', file);
        file.blocks && $.each(file.blocks, function(_, v) {
          var _tr = v.transport;
          if (_tr) {
            _tr.abort();
            _tr.destroy();
            delete v.transport;
          }
        });
        file.setStatus(Status.CANCELLED);
        this.owner.trigger('fileDequeued', file);
      },
      isInProgress: function() {
        return !!this.progress;
      },
      _getStats: function() {
        return this.request('get-stats');
      },
      skipFile: function(file, status) {
        file = file.id ? file : this.request('get-file', file);
        file.setStatus(status || Status.COMPLETE);
        file.skipped = true;
        file.blocks && $.each(file.blocks, function(_, v) {
          var _tr = v.transport;
          if (_tr) {
            _tr.abort();
            _tr.destroy();
            delete v.transport;
          }
        });
        this.owner.trigger('uploadSkip', file);
      },
      _tick: function() {
        var me = this,
            opts = me.options,
            fn,
            val;
        if (me._promise) {
          return me._promise.always(me.__tick);
        }
        if (me.pool.length < opts.threads && (val = me._nextBlock())) {
          me._trigged = false;
          fn = function(val) {
            me._promise = null;
            val && val.file && me._startSend(val);
            Base.nextTick(me.__tick);
          };
          me._promise = isPromise(val) ? val.always(fn) : fn(val);
        } else if (!me.remaning && !me._getStats().numOfQueue && !me._getStats().numofInterrupt) {
          me.runing = false;
          me._trigged || Base.nextTick(function() {
            me.owner.trigger('uploadFinished');
          });
          me._trigged = true;
        }
      },
      _putback: function(block) {
        var idx;
        block.cuted.unshift(block);
        idx = this.stack.indexOf(block.cuted);
        if (!~idx) {
          this.stack.unshift(block.cuted);
        }
      },
      _getStack: function() {
        var i = 0,
            act;
        while ((act = this.stack[i++])) {
          if (act.has() && act.file.getStatus() === Status.PROGRESS) {
            return act;
          } else if (!act.has() || act.file.getStatus() !== Status.PROGRESS && act.file.getStatus() !== Status.INTERRUPT) {
            this.stack.splice(--i, 1);
          }
        }
        return null;
      },
      _nextBlock: function() {
        var me = this,
            opts = me.options,
            act,
            next,
            done,
            preparing;
        if ((act = this._getStack())) {
          if (opts.prepareNextFile && !me.pending.length) {
            me._prepareNextFile();
          }
          return act.shift();
        } else if (me.runing) {
          if (!me.pending.length && me._getStats().numOfQueue) {
            me._prepareNextFile();
          }
          next = me.pending.shift();
          done = function(file) {
            if (!file) {
              return null;
            }
            act = CuteFile(file, opts.chunked ? opts.chunkSize : 0);
            me.stack.push(act);
            return act.shift();
          };
          if (isPromise(next)) {
            preparing = next.file;
            next = next[next.pipe ? 'pipe' : 'then'](done);
            next.file = preparing;
            return next;
          }
          return done(next);
        }
      },
      _prepareNextFile: function() {
        var me = this,
            file = me.request('fetch-file'),
            pending = me.pending,
            promise;
        if (file) {
          promise = me.request('before-send-file', file, function() {
            if (file.getStatus() === Status.PROGRESS || file.getStatus() === Status.INTERRUPT) {
              return file;
            }
            return me._finishFile(file);
          });
          me.owner.trigger('uploadStart', file);
          file.setStatus(Status.PROGRESS);
          promise.file = file;
          promise.done(function() {
            var idx = $.inArray(promise, pending);
            ~idx && pending.splice(idx, 1, file);
          });
          promise.fail(function(reason) {
            file.setStatus(Status.ERROR, reason);
            me.owner.trigger('uploadError', file, reason);
            me.owner.trigger('uploadComplete', file);
          });
          pending.push(promise);
        }
      },
      _popBlock: function(block) {
        var idx = $.inArray(block, this.pool);
        this.pool.splice(idx, 1);
        block.file.remaning--;
        this.remaning--;
      },
      _startSend: function(block) {
        var me = this,
            file = block.file,
            promise;
        if (file.getStatus() !== Status.PROGRESS) {
          if (file.getStatus() === Status.INTERRUPT) {
            me._putback(block);
          }
          return;
        }
        me.pool.push(block);
        me.remaning++;
        block.blob = block.chunks === 1 ? file.source : file.source.slice(block.start, block.end);
        promise = me.request('before-send', block, function() {
          if (file.getStatus() === Status.PROGRESS) {
            me._doSend(block);
          } else {
            me._popBlock(block);
            Base.nextTick(me.__tick);
          }
        });
        promise.fail(function() {
          if (file.remaning === 1) {
            me._finishFile(file).always(function() {
              block.percentage = 1;
              me._popBlock(block);
              me.owner.trigger('uploadComplete', file);
              Base.nextTick(me.__tick);
            });
          } else {
            block.percentage = 1;
            me.updateFileProgress(file);
            me._popBlock(block);
            Base.nextTick(me.__tick);
          }
        });
      },
      _doSend: function(block) {
        var me = this,
            owner = me.owner,
            opts = me.options,
            file = block.file,
            tr = new Transport(opts),
            data = $.extend({}, opts.formData),
            headers = $.extend({}, opts.headers),
            requestAccept,
            ret;
        block.transport = tr;
        tr.on('destroy', function() {
          delete block.transport;
          me._popBlock(block);
          Base.nextTick(me.__tick);
        });
        tr.on('progress', function(percentage) {
          block.percentage = percentage;
          me.updateFileProgress(file);
        });
        requestAccept = function(reject) {
          var fn;
          ret = tr.getResponseAsJson() || {};
          ret._raw = tr.getResponse();
          fn = function(value) {
            reject = value;
          };
          if (!owner.trigger('uploadAccept', block, ret, fn)) {
            reject = reject || 'server';
          }
          return reject;
        };
        tr.on('error', function(type, flag) {
          block.retried = block.retried || 0;
          if (block.chunks > 1 && ~'http,abort'.indexOf(type) && block.retried < opts.chunkRetry) {
            block.retried++;
            tr.send();
          } else {
            if (!flag && type === 'server') {
              type = requestAccept(type);
            }
            file.setStatus(Status.ERROR, type);
            owner.trigger('uploadError', file, type);
            owner.trigger('uploadComplete', file);
          }
        });
        tr.on('load', function() {
          var reason;
          if ((reason = requestAccept())) {
            tr.trigger('error', reason, true);
            return;
          }
          if (file.remaning === 1) {
            me._finishFile(file, ret);
          } else {
            tr.destroy();
          }
        });
        data = $.extend(data, {
          id: file.id,
          name: file.name,
          type: file.type,
          lastModifiedDate: file.lastModifiedDate,
          size: file.size
        });
        block.chunks > 1 && $.extend(data, {
          chunks: block.chunks,
          chunk: block.chunk
        });
        owner.trigger('uploadBeforeSend', block, data, headers);
        tr.appendBlob(opts.fileVal, block.blob, file.name);
        tr.append(data);
        tr.setRequestHeader(headers);
        tr.send();
      },
      _finishFile: function(file, ret, hds) {
        var owner = this.owner;
        return owner.request('after-send-file', arguments, function() {
          file.setStatus(Status.COMPLETE);
          owner.trigger('uploadSuccess', file, ret, hds);
        }).fail(function(reason) {
          if (file.getStatus() === Status.PROGRESS) {
            file.setStatus(Status.ERROR, reason);
          }
          owner.trigger('uploadError', file, reason);
        }).always(function() {
          owner.trigger('uploadComplete', file);
        });
      },
      updateFileProgress: function(file) {
        var totalPercent = 0,
            uploaded = 0;
        if (!file.blocks) {
          return;
        }
        $.each(file.blocks, function(_, v) {
          uploaded += (v.percentage || 0) * (v.end - v.start);
        });
        totalPercent = uploaded / file.size;
        this.owner.trigger('uploadProgress', file, totalPercent || 0);
      }
    });
  });
  define('widgets/validator', ['base', 'uploader', 'file', 'widgets/widget'], function(Base, Uploader, WUFile) {
    var $ = Base.$,
        validators = {},
        api;
    api = {
      addValidator: function(type, cb) {
        validators[type] = cb;
      },
      removeValidator: function(type) {
        delete validators[type];
      }
    };
    Uploader.register({
      name: 'validator',
      init: function() {
        var me = this;
        Base.nextTick(function() {
          $.each(validators, function() {
            this.call(me.owner);
          });
        });
      }
    });
    api.addValidator('fileNumLimit', function() {
      var uploader = this,
          opts = uploader.options,
          count = 0,
          max = parseInt(opts.fileNumLimit, 10),
          flag = true;
      if (!max) {
        return;
      }
      uploader.on('beforeFileQueued', function(file) {
        if (count >= max && flag) {
          flag = false;
          this.trigger('error', 'Q_EXCEED_NUM_LIMIT', max, file);
          setTimeout(function() {
            flag = true;
          }, 1);
        }
        return count >= max ? false : true;
      });
      uploader.on('fileQueued', function() {
        count++;
      });
      uploader.on('fileDequeued', function() {
        count--;
      });
      uploader.on('reset', function() {
        count = 0;
      });
    });
    api.addValidator('fileSizeLimit', function() {
      var uploader = this,
          opts = uploader.options,
          count = 0,
          max = parseInt(opts.fileSizeLimit, 10),
          flag = true;
      if (!max) {
        return;
      }
      uploader.on('beforeFileQueued', function(file) {
        var invalid = count + file.size > max;
        if (invalid && flag) {
          flag = false;
          this.trigger('error', 'Q_EXCEED_SIZE_LIMIT', max, file);
          setTimeout(function() {
            flag = true;
          }, 1);
        }
        return invalid ? false : true;
      });
      uploader.on('fileQueued', function(file) {
        count += file.size;
      });
      uploader.on('fileDequeued', function(file) {
        count -= file.size;
      });
      uploader.on('reset', function() {
        count = 0;
      });
    });
    api.addValidator('fileSingleSizeLimit', function() {
      var uploader = this,
          opts = uploader.options,
          max = opts.fileSingleSizeLimit;
      if (!max) {
        return;
      }
      uploader.on('beforeFileQueued', function(file) {
        if (file.size > max) {
          file.setStatus(WUFile.Status.INVALID, 'exceed_size');
          this.trigger('error', 'F_EXCEED_SIZE', max, file);
          return false;
        }
      });
    });
    api.addValidator('duplicate', function() {
      var uploader = this,
          opts = uploader.options,
          mapping = {};
      if (opts.duplicate) {
        return;
      }
      function hashString(str) {
        var hash = 0,
            i = 0,
            len = str.length,
            _char;
        for (; i < len; i++) {
          _char = str.charCodeAt(i);
          hash = _char + (hash << 6) + (hash << 16) - hash;
        }
        return hash;
      }
      uploader.on('beforeFileQueued', function(file) {
        var hash = file.__hash || (file.__hash = hashString(file.name + file.size + file.lastModifiedDate));
        if (mapping[hash]) {
          this.trigger('error', 'F_DUPLICATE', file);
          return false;
        }
      });
      uploader.on('fileQueued', function(file) {
        var hash = file.__hash;
        hash && (mapping[hash] = true);
      });
      uploader.on('fileDequeued', function(file) {
        var hash = file.__hash;
        hash && (delete mapping[hash]);
      });
      uploader.on('reset', function() {
        mapping = {};
      });
    });
    return api;
  });
  define('lib/md5', ['runtime/client', 'mediator'], function(RuntimeClient, Mediator) {
    function Md5() {
      RuntimeClient.call(this, 'Md5');
    }
    Mediator.installTo(Md5.prototype);
    Md5.prototype.loadFromBlob = function(blob) {
      var me = this;
      if (me.getRuid()) {
        me.disconnectRuntime();
      }
      me.connectRuntime(blob.ruid, function() {
        me.exec('init');
        me.exec('loadFromBlob', blob);
      });
    };
    Md5.prototype.getResult = function() {
      return this.exec('getResult');
    };
    return Md5;
  });
  define('widgets/md5', ['base', 'uploader', 'lib/md5', 'lib/blob', 'widgets/widget'], function(Base, Uploader, Md5, Blob) {
    return Uploader.register({
      name: 'md5',
      md5File: function(file, start, end) {
        var md5 = new Md5(),
            deferred = Base.Deferred(),
            blob = (file instanceof Blob) ? file : this.request('get-file', file).source;
        md5.on('progress load', function(e) {
          e = e || {};
          deferred.notify(e.total ? e.loaded / e.total : 1);
        });
        md5.on('complete', function() {
          deferred.resolve(md5.getResult());
        });
        md5.on('error', function(reason) {
          deferred.reject(reason);
        });
        if (arguments.length > 1) {
          start = start || 0;
          end = end || 0;
          start < 0 && (start = blob.size + start);
          end < 0 && (end = blob.size + end);
          end = Math.min(end, blob.size);
          blob = blob.slice(start, end);
        }
        md5.loadFromBlob(blob);
        return deferred.promise();
      }
    });
  });
  define('runtime/compbase', [], function() {
    function CompBase(owner, runtime) {
      this.owner = owner;
      this.options = owner.options;
      this.getRuntime = function() {
        return runtime;
      };
      this.getRuid = function() {
        return runtime.uid;
      };
      this.trigger = function() {
        return owner.trigger.apply(owner, arguments);
      };
    }
    return CompBase;
  });
  define('runtime/html5/runtime', ['base', 'runtime/runtime', 'runtime/compbase'], function(Base, Runtime, CompBase) {
    var type = 'html5',
        components = {};
    function Html5Runtime() {
      var pool = {},
          me = this,
          destroy = this.destroy;
      Runtime.apply(me, arguments);
      me.type = type;
      me.exec = function(comp, fn) {
        var client = this,
            uid = client.uid,
            args = Base.slice(arguments, 2),
            instance;
        if (components[comp]) {
          instance = pool[uid] = pool[uid] || new components[comp](client, me);
          if (instance[fn]) {
            return instance[fn].apply(instance, args);
          }
        }
      };
      me.destroy = function() {
        return destroy && destroy.apply(this, arguments);
      };
    }
    Base.inherits(Runtime, {
      constructor: Html5Runtime,
      init: function() {
        var me = this;
        setTimeout(function() {
          me.trigger('ready');
        }, 1);
      }
    });
    Html5Runtime.register = function(name, component) {
      var klass = components[name] = Base.inherits(CompBase, component);
      return klass;
    };
    if (window.Blob && window.FileReader && window.DataView) {
      Runtime.addRuntime(type, Html5Runtime);
    }
    return Html5Runtime;
  });
  define('runtime/html5/blob', ['runtime/html5/runtime', 'lib/blob'], function(Html5Runtime, Blob) {
    return Html5Runtime.register('Blob', {slice: function(start, end) {
        var blob = this.owner.source,
            slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, start, end);
        return new Blob(this.getRuid(), blob);
      }});
  });
  define('runtime/html5/dnd', ['base', 'runtime/html5/runtime', 'lib/file'], function(Base, Html5Runtime, File) {
    var $ = Base.$,
        prefix = 'webuploader-dnd-';
    return Html5Runtime.register('DragAndDrop', {
      init: function() {
        var elem = this.elem = this.options.container;
        this.dragEnterHandler = Base.bindFn(this._dragEnterHandler, this);
        this.dragOverHandler = Base.bindFn(this._dragOverHandler, this);
        this.dragLeaveHandler = Base.bindFn(this._dragLeaveHandler, this);
        this.dropHandler = Base.bindFn(this._dropHandler, this);
        this.dndOver = false;
        elem.on('dragenter', this.dragEnterHandler);
        elem.on('dragover', this.dragOverHandler);
        elem.on('dragleave', this.dragLeaveHandler);
        elem.on('drop', this.dropHandler);
        if (this.options.disableGlobalDnd) {
          $(document).on('dragover', this.dragOverHandler);
          $(document).on('drop', this.dropHandler);
        }
      },
      _dragEnterHandler: function(e) {
        var me = this,
            denied = me._denied || false,
            items;
        e = e.originalEvent || e;
        if (!me.dndOver) {
          me.dndOver = true;
          items = e.dataTransfer.items;
          if (items && items.length) {
            me._denied = denied = !me.trigger('accept', items);
          }
          me.elem.addClass(prefix + 'over');
          me.elem[denied ? 'addClass' : 'removeClass'](prefix + 'denied');
        }
        e.dataTransfer.dropEffect = denied ? 'none' : 'copy';
        return false;
      },
      _dragOverHandler: function(e) {
        var parentElem = this.elem.parent().get(0);
        if (parentElem && !$.contains(parentElem, e.currentTarget)) {
          return false;
        }
        clearTimeout(this._leaveTimer);
        this._dragEnterHandler.call(this, e);
        return false;
      },
      _dragLeaveHandler: function() {
        var me = this,
            handler;
        handler = function() {
          me.dndOver = false;
          me.elem.removeClass(prefix + 'over ' + prefix + 'denied');
        };
        clearTimeout(me._leaveTimer);
        me._leaveTimer = setTimeout(handler, 100);
        return false;
      },
      _dropHandler: function(e) {
        var me = this,
            ruid = me.getRuid(),
            parentElem = me.elem.parent().get(0),
            dataTransfer,
            data;
        if (parentElem && !$.contains(parentElem, e.currentTarget)) {
          return false;
        }
        e = e.originalEvent || e;
        dataTransfer = e.dataTransfer;
        try {
          data = dataTransfer.getData('text/html');
        } catch (err) {}
        if (data) {
          return;
        }
        me._getTansferFiles(dataTransfer, function(results) {
          me.trigger('drop', $.map(results, function(file) {
            return new File(ruid, file);
          }));
        });
        me.dndOver = false;
        me.elem.removeClass(prefix + 'over');
        return false;
      },
      _getTansferFiles: function(dataTransfer, callback) {
        var results = [],
            promises = [],
            items,
            files,
            file,
            item,
            i,
            len,
            canAccessFolder;
        items = dataTransfer.items;
        files = dataTransfer.files;
        canAccessFolder = !!(items && items[0].webkitGetAsEntry);
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          item = items && items[i];
          if (canAccessFolder && item.webkitGetAsEntry().isDirectory) {
            promises.push(this._traverseDirectoryTree(item.webkitGetAsEntry(), results));
          } else {
            results.push(file);
          }
        }
        Base.when.apply(Base, promises).done(function() {
          if (!results.length) {
            return;
          }
          callback(results);
        });
      },
      _traverseDirectoryTree: function(entry, results) {
        var deferred = Base.Deferred(),
            me = this;
        if (entry.isFile) {
          entry.file(function(file) {
            results.push(file);
            deferred.resolve();
          });
        } else if (entry.isDirectory) {
          entry.createReader().readEntries(function(entries) {
            var len = entries.length,
                promises = [],
                arr = [],
                i;
            for (i = 0; i < len; i++) {
              promises.push(me._traverseDirectoryTree(entries[i], arr));
            }
            Base.when.apply(Base, promises).then(function() {
              results.push.apply(results, arr);
              deferred.resolve();
            }, deferred.reject);
          });
        }
        return deferred.promise();
      },
      destroy: function() {
        var elem = this.elem;
        if (!elem) {
          return;
        }
        elem.off('dragenter', this.dragEnterHandler);
        elem.off('dragover', this.dragOverHandler);
        elem.off('dragleave', this.dragLeaveHandler);
        elem.off('drop', this.dropHandler);
        if (this.options.disableGlobalDnd) {
          $(document).off('dragover', this.dragOverHandler);
          $(document).off('drop', this.dropHandler);
        }
      }
    });
  });
  define('runtime/html5/filepaste', ['base', 'runtime/html5/runtime', 'lib/file'], function(Base, Html5Runtime, File) {
    return Html5Runtime.register('FilePaste', {
      init: function() {
        var opts = this.options,
            elem = this.elem = opts.container,
            accept = '.*',
            arr,
            i,
            len,
            item;
        if (opts.accept) {
          arr = [];
          for (i = 0, len = opts.accept.length; i < len; i++) {
            item = opts.accept[i].mimeTypes;
            item && arr.push(item);
          }
          if (arr.length) {
            accept = arr.join(',');
            accept = accept.replace(/,/g, '|').replace(/\*/g, '.*');
          }
        }
        this.accept = accept = new RegExp(accept, 'i');
        this.hander = Base.bindFn(this._pasteHander, this);
        elem.on('paste', this.hander);
      },
      _pasteHander: function(e) {
        var allowed = [],
            ruid = this.getRuid(),
            items,
            item,
            blob,
            i,
            len;
        e = e.originalEvent || e;
        items = e.clipboardData.items;
        for (i = 0, len = items.length; i < len; i++) {
          item = items[i];
          if (item.kind !== 'file' || !(blob = item.getAsFile())) {
            continue;
          }
          allowed.push(new File(ruid, blob));
        }
        if (allowed.length) {
          e.preventDefault();
          e.stopPropagation();
          this.trigger('paste', allowed);
        }
      },
      destroy: function() {
        this.elem.off('paste', this.hander);
      }
    });
  });
  define('runtime/html5/filepicker', ['base', 'runtime/html5/runtime'], function(Base, Html5Runtime) {
    var $ = Base.$;
    return Html5Runtime.register('FilePicker', {
      init: function() {
        var container = this.getRuntime().getContainer(),
            me = this,
            owner = me.owner,
            opts = me.options,
            label = this.label = $(document.createElement('label')),
            input = this.input = $(document.createElement('input')),
            arr,
            i,
            len,
            mouseHandler;
        input.attr('type', 'file');
        input.attr('name', opts.name);
        input.addClass('webuploader-element-invisible');
        label.on('click', function() {
          input.trigger('click');
        });
        label.css({
          opacity: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'pointer',
          background: '#ffffff'
        });
        if (opts.multiple) {
          input.attr('multiple', 'multiple');
        }
        if (opts.accept && opts.accept.length > 0) {
          arr = [];
          for (i = 0, len = opts.accept.length; i < len; i++) {
            arr.push(opts.accept[i].mimeTypes);
          }
          input.attr('accept', arr.join(','));
        }
        container.append(input);
        container.append(label);
        mouseHandler = function(e) {
          owner.trigger(e.type);
        };
        input.on('change', function(e) {
          var fn = arguments.callee,
              clone;
          me.files = e.target.files;
          clone = this.cloneNode(true);
          clone.value = null;
          this.parentNode.replaceChild(clone, this);
          input.off();
          input = $(clone).on('change', fn).on('mouseenter mouseleave', mouseHandler);
          owner.trigger('change');
        });
        label.on('mouseenter mouseleave', mouseHandler);
      },
      getFiles: function() {
        return this.files;
      },
      destroy: function() {
        this.input.off();
        this.label.off();
      }
    });
  });
  define('runtime/html5/util', ['base'], function(Base) {
    var urlAPI = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL,
        createObjectURL = Base.noop,
        revokeObjectURL = createObjectURL;
    if (urlAPI) {
      createObjectURL = function() {
        return urlAPI.createObjectURL.apply(urlAPI, arguments);
      };
      revokeObjectURL = function() {
        return urlAPI.revokeObjectURL.apply(urlAPI, arguments);
      };
    }
    return {
      createObjectURL: createObjectURL,
      revokeObjectURL: revokeObjectURL,
      dataURL2Blob: function(dataURI) {
        var byteStr,
            intArray,
            ab,
            i,
            mimetype,
            parts;
        parts = dataURI.split(',');
        if (~parts[0].indexOf('base64')) {
          byteStr = atob(parts[1]);
        } else {
          byteStr = decodeURIComponent(parts[1]);
        }
        ab = new ArrayBuffer(byteStr.length);
        intArray = new Uint8Array(ab);
        for (i = 0; i < byteStr.length; i++) {
          intArray[i] = byteStr.charCodeAt(i);
        }
        mimetype = parts[0].split(':')[1].split(';')[0];
        return this.arrayBufferToBlob(ab, mimetype);
      },
      dataURL2ArrayBuffer: function(dataURI) {
        var byteStr,
            intArray,
            i,
            parts;
        parts = dataURI.split(',');
        if (~parts[0].indexOf('base64')) {
          byteStr = atob(parts[1]);
        } else {
          byteStr = decodeURIComponent(parts[1]);
        }
        intArray = new Uint8Array(byteStr.length);
        for (i = 0; i < byteStr.length; i++) {
          intArray[i] = byteStr.charCodeAt(i);
        }
        return intArray.buffer;
      },
      arrayBufferToBlob: function(buffer, type) {
        var builder = window.BlobBuilder || window.WebKitBlobBuilder,
            bb;
        if (builder) {
          bb = new builder();
          bb.append(buffer);
          return bb.getBlob(type);
        }
        return new Blob([buffer], type ? {type: type} : {});
      },
      canvasToDataUrl: function(canvas, type, quality) {
        return canvas.toDataURL(type, quality / 100);
      },
      parseMeta: function(blob, callback) {
        callback(false, {});
      },
      updateImageHead: function(data) {
        return data;
      }
    };
  });
  define('runtime/html5/imagemeta', ['runtime/html5/util'], function(Util) {
    var api;
    api = {
      parsers: {0xffe1: []},
      maxMetaDataSize: 262144,
      parse: function(blob, cb) {
        var me = this,
            fr = new FileReader();
        fr.onload = function() {
          cb(false, me._parse(this.result));
          fr = fr.onload = fr.onerror = null;
        };
        fr.onerror = function(e) {
          cb(e.message);
          fr = fr.onload = fr.onerror = null;
        };
        blob = blob.slice(0, me.maxMetaDataSize);
        fr.readAsArrayBuffer(blob.getSource());
      },
      _parse: function(buffer, noParse) {
        if (buffer.byteLength < 6) {
          return;
        }
        var dataview = new DataView(buffer),
            offset = 2,
            maxOffset = dataview.byteLength - 4,
            headLength = offset,
            ret = {},
            markerBytes,
            markerLength,
            parsers,
            i;
        if (dataview.getUint16(0) === 0xffd8) {
          while (offset < maxOffset) {
            markerBytes = dataview.getUint16(offset);
            if (markerBytes >= 0xffe0 && markerBytes <= 0xffef || markerBytes === 0xfffe) {
              markerLength = dataview.getUint16(offset + 2) + 2;
              if (offset + markerLength > dataview.byteLength) {
                break;
              }
              parsers = api.parsers[markerBytes];
              if (!noParse && parsers) {
                for (i = 0; i < parsers.length; i += 1) {
                  parsers[i].call(api, dataview, offset, markerLength, ret);
                }
              }
              offset += markerLength;
              headLength = offset;
            } else {
              break;
            }
          }
          if (headLength > 6) {
            if (buffer.slice) {
              ret.imageHead = buffer.slice(2, headLength);
            } else {
              ret.imageHead = new Uint8Array(buffer).subarray(2, headLength);
            }
          }
        }
        return ret;
      },
      updateImageHead: function(buffer, head) {
        var data = this._parse(buffer, true),
            buf1,
            buf2,
            bodyoffset;
        bodyoffset = 2;
        if (data.imageHead) {
          bodyoffset = 2 + data.imageHead.byteLength;
        }
        if (buffer.slice) {
          buf2 = buffer.slice(bodyoffset);
        } else {
          buf2 = new Uint8Array(buffer).subarray(bodyoffset);
        }
        buf1 = new Uint8Array(head.byteLength + 2 + buf2.byteLength);
        buf1[0] = 0xFF;
        buf1[1] = 0xD8;
        buf1.set(new Uint8Array(head), 2);
        buf1.set(new Uint8Array(buf2), head.byteLength + 2);
        return buf1.buffer;
      }
    };
    Util.parseMeta = function() {
      return api.parse.apply(api, arguments);
    };
    Util.updateImageHead = function() {
      return api.updateImageHead.apply(api, arguments);
    };
    return api;
  });
  define('runtime/html5/imagemeta/exif', ['base', 'runtime/html5/imagemeta'], function(Base, ImageMeta) {
    var EXIF = {};
    EXIF.ExifMap = function() {
      return this;
    };
    EXIF.ExifMap.prototype.map = {'Orientation': 0x0112};
    EXIF.ExifMap.prototype.get = function(id) {
      return this[id] || this[this.map[id]];
    };
    EXIF.exifTagTypes = {
      1: {
        getValue: function(dataView, dataOffset) {
          return dataView.getUint8(dataOffset);
        },
        size: 1
      },
      2: {
        getValue: function(dataView, dataOffset) {
          return String.fromCharCode(dataView.getUint8(dataOffset));
        },
        size: 1,
        ascii: true
      },
      3: {
        getValue: function(dataView, dataOffset, littleEndian) {
          return dataView.getUint16(dataOffset, littleEndian);
        },
        size: 2
      },
      4: {
        getValue: function(dataView, dataOffset, littleEndian) {
          return dataView.getUint32(dataOffset, littleEndian);
        },
        size: 4
      },
      5: {
        getValue: function(dataView, dataOffset, littleEndian) {
          return dataView.getUint32(dataOffset, littleEndian) / dataView.getUint32(dataOffset + 4, littleEndian);
        },
        size: 8
      },
      9: {
        getValue: function(dataView, dataOffset, littleEndian) {
          return dataView.getInt32(dataOffset, littleEndian);
        },
        size: 4
      },
      10: {
        getValue: function(dataView, dataOffset, littleEndian) {
          return dataView.getInt32(dataOffset, littleEndian) / dataView.getInt32(dataOffset + 4, littleEndian);
        },
        size: 8
      }
    };
    EXIF.exifTagTypes[7] = EXIF.exifTagTypes[1];
    EXIF.getExifValue = function(dataView, tiffOffset, offset, type, length, littleEndian) {
      var tagType = EXIF.exifTagTypes[type],
          tagSize,
          dataOffset,
          values,
          i,
          str,
          c;
      if (!tagType) {
        Base.log('Invalid Exif data: Invalid tag type.');
        return;
      }
      tagSize = tagType.size * length;
      dataOffset = tagSize > 4 ? tiffOffset + dataView.getUint32(offset + 8, littleEndian) : (offset + 8);
      if (dataOffset + tagSize > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid data offset.');
        return;
      }
      if (length === 1) {
        return tagType.getValue(dataView, dataOffset, littleEndian);
      }
      values = [];
      for (i = 0; i < length; i += 1) {
        values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);
      }
      if (tagType.ascii) {
        str = '';
        for (i = 0; i < values.length; i += 1) {
          c = values[i];
          if (c === '\u0000') {
            break;
          }
          str += c;
        }
        return str;
      }
      return values;
    };
    EXIF.parseExifTag = function(dataView, tiffOffset, offset, littleEndian, data) {
      var tag = dataView.getUint16(offset, littleEndian);
      data.exif[tag] = EXIF.getExifValue(dataView, tiffOffset, offset, dataView.getUint16(offset + 2, littleEndian), dataView.getUint32(offset + 4, littleEndian), littleEndian);
    };
    EXIF.parseExifTags = function(dataView, tiffOffset, dirOffset, littleEndian, data) {
      var tagsNumber,
          dirEndOffset,
          i;
      if (dirOffset + 6 > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid directory offset.');
        return;
      }
      tagsNumber = dataView.getUint16(dirOffset, littleEndian);
      dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
      if (dirEndOffset + 4 > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid directory size.');
        return;
      }
      for (i = 0; i < tagsNumber; i += 1) {
        this.parseExifTag(dataView, tiffOffset, dirOffset + 2 + 12 * i, littleEndian, data);
      }
      return dataView.getUint32(dirEndOffset, littleEndian);
    };
    EXIF.parseExifData = function(dataView, offset, length, data) {
      var tiffOffset = offset + 10,
          littleEndian,
          dirOffset;
      if (dataView.getUint32(offset + 4) !== 0x45786966) {
        return;
      }
      if (tiffOffset + 8 > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid segment size.');
        return;
      }
      if (dataView.getUint16(offset + 8) !== 0x0000) {
        Base.log('Invalid Exif data: Missing byte alignment offset.');
        return;
      }
      switch (dataView.getUint16(tiffOffset)) {
        case 0x4949:
          littleEndian = true;
          break;
        case 0x4D4D:
          littleEndian = false;
          break;
        default:
          Base.log('Invalid Exif data: Invalid byte alignment marker.');
          return;
      }
      if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
        Base.log('Invalid Exif data: Missing TIFF marker.');
        return;
      }
      dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
      data.exif = new EXIF.ExifMap();
      dirOffset = EXIF.parseExifTags(dataView, tiffOffset, tiffOffset + dirOffset, littleEndian, data);
    };
    ImageMeta.parsers[0xffe1].push(EXIF.parseExifData);
    return EXIF;
  });
  define('runtime/html5/jpegencoder', [], function(require, exports, module) {
    function JPEGEncoder(quality) {
      var self = this;
      var fround = Math.round;
      var ffloor = Math.floor;
      var YTable = new Array(64);
      var UVTable = new Array(64);
      var fdtbl_Y = new Array(64);
      var fdtbl_UV = new Array(64);
      var YDC_HT;
      var UVDC_HT;
      var YAC_HT;
      var UVAC_HT;
      var bitcode = new Array(65535);
      var category = new Array(65535);
      var outputfDCTQuant = new Array(64);
      var DU = new Array(64);
      var byteout = [];
      var bytenew = 0;
      var bytepos = 7;
      var YDU = new Array(64);
      var UDU = new Array(64);
      var VDU = new Array(64);
      var clt = new Array(256);
      var RGB_YUV_TABLE = new Array(2048);
      var currentQuality;
      var ZigZag = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63];
      var std_dc_luminance_nrcodes = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
      var std_dc_luminance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      var std_ac_luminance_nrcodes = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d];
      var std_ac_luminance_values = [0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08, 0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0, 0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa];
      var std_dc_chrominance_nrcodes = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
      var std_dc_chrominance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      var std_ac_chrominance_nrcodes = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 0x77];
      var std_ac_chrominance_values = [0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31, 0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71, 0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91, 0xa1, 0xb1, 0xc1, 0x09, 0x23, 0x33, 0x52, 0xf0, 0x15, 0x62, 0x72, 0xd1, 0x0a, 0x16, 0x24, 0x34, 0xe1, 0x25, 0xf1, 0x17, 0x18, 0x19, 0x1a, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa];
      function initQuantTables(sf) {
        var YQT = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
        for (var i = 0; i < 64; i++) {
          var t = ffloor((YQT[i] * sf + 50) / 100);
          if (t < 1) {
            t = 1;
          } else if (t > 255) {
            t = 255;
          }
          YTable[ZigZag[i]] = t;
        }
        var UVQT = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99];
        for (var j = 0; j < 64; j++) {
          var u = ffloor((UVQT[j] * sf + 50) / 100);
          if (u < 1) {
            u = 1;
          } else if (u > 255) {
            u = 255;
          }
          UVTable[ZigZag[j]] = u;
        }
        var aasf = [1.0, 1.387039845, 1.306562965, 1.175875602, 1.0, 0.785694958, 0.541196100, 0.275899379];
        var k = 0;
        for (var row = 0; row < 8; row++) {
          for (var col = 0; col < 8; col++) {
            fdtbl_Y[k] = (1.0 / (YTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
            fdtbl_UV[k] = (1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
            k++;
          }
        }
      }
      function computeHuffmanTbl(nrcodes, std_table) {
        var codevalue = 0;
        var pos_in_table = 0;
        var HT = new Array();
        for (var k = 1; k <= 16; k++) {
          for (var j = 1; j <= nrcodes[k]; j++) {
            HT[std_table[pos_in_table]] = [];
            HT[std_table[pos_in_table]][0] = codevalue;
            HT[std_table[pos_in_table]][1] = k;
            pos_in_table++;
            codevalue++;
          }
          codevalue *= 2;
        }
        return HT;
      }
      function initHuffmanTbl() {
        YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes, std_dc_luminance_values);
        UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes, std_dc_chrominance_values);
        YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes, std_ac_luminance_values);
        UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes, std_ac_chrominance_values);
      }
      function initCategoryNumber() {
        var nrlower = 1;
        var nrupper = 2;
        for (var cat = 1; cat <= 15; cat++) {
          for (var nr = nrlower; nr < nrupper; nr++) {
            category[32767 + nr] = cat;
            bitcode[32767 + nr] = [];
            bitcode[32767 + nr][1] = cat;
            bitcode[32767 + nr][0] = nr;
          }
          for (var nrneg = -(nrupper - 1); nrneg <= -nrlower; nrneg++) {
            category[32767 + nrneg] = cat;
            bitcode[32767 + nrneg] = [];
            bitcode[32767 + nrneg][1] = cat;
            bitcode[32767 + nrneg][0] = nrupper - 1 + nrneg;
          }
          nrlower <<= 1;
          nrupper <<= 1;
        }
      }
      function initRGBYUVTable() {
        for (var i = 0; i < 256; i++) {
          RGB_YUV_TABLE[i] = 19595 * i;
          RGB_YUV_TABLE[(i + 256) >> 0] = 38470 * i;
          RGB_YUV_TABLE[(i + 512) >> 0] = 7471 * i + 0x8000;
          RGB_YUV_TABLE[(i + 768) >> 0] = -11059 * i;
          RGB_YUV_TABLE[(i + 1024) >> 0] = -21709 * i;
          RGB_YUV_TABLE[(i + 1280) >> 0] = 32768 * i + 0x807FFF;
          RGB_YUV_TABLE[(i + 1536) >> 0] = -27439 * i;
          RGB_YUV_TABLE[(i + 1792) >> 0] = -5329 * i;
        }
      }
      function writeBits(bs) {
        var value = bs[0];
        var posval = bs[1] - 1;
        while (posval >= 0) {
          if (value & (1 << posval)) {
            bytenew |= (1 << bytepos);
          }
          posval--;
          bytepos--;
          if (bytepos < 0) {
            if (bytenew == 0xFF) {
              writeByte(0xFF);
              writeByte(0);
            } else {
              writeByte(bytenew);
            }
            bytepos = 7;
            bytenew = 0;
          }
        }
      }
      function writeByte(value) {
        byteout.push(clt[value]);
      }
      function writeWord(value) {
        writeByte((value >> 8) & 0xFF);
        writeByte((value) & 0xFF);
      }
      function fDCTQuant(data, fdtbl) {
        var d0,
            d1,
            d2,
            d3,
            d4,
            d5,
            d6,
            d7;
        var dataOff = 0;
        var i;
        var I8 = 8;
        var I64 = 64;
        for (i = 0; i < I8; ++i) {
          d0 = data[dataOff];
          d1 = data[dataOff + 1];
          d2 = data[dataOff + 2];
          d3 = data[dataOff + 3];
          d4 = data[dataOff + 4];
          d5 = data[dataOff + 5];
          d6 = data[dataOff + 6];
          d7 = data[dataOff + 7];
          var tmp0 = d0 + d7;
          var tmp7 = d0 - d7;
          var tmp1 = d1 + d6;
          var tmp6 = d1 - d6;
          var tmp2 = d2 + d5;
          var tmp5 = d2 - d5;
          var tmp3 = d3 + d4;
          var tmp4 = d3 - d4;
          var tmp10 = tmp0 + tmp3;
          var tmp13 = tmp0 - tmp3;
          var tmp11 = tmp1 + tmp2;
          var tmp12 = tmp1 - tmp2;
          data[dataOff] = tmp10 + tmp11;
          data[dataOff + 4] = tmp10 - tmp11;
          var z1 = (tmp12 + tmp13) * 0.707106781;
          data[dataOff + 2] = tmp13 + z1;
          data[dataOff + 6] = tmp13 - z1;
          tmp10 = tmp4 + tmp5;
          tmp11 = tmp5 + tmp6;
          tmp12 = tmp6 + tmp7;
          var z5 = (tmp10 - tmp12) * 0.382683433;
          var z2 = 0.541196100 * tmp10 + z5;
          var z4 = 1.306562965 * tmp12 + z5;
          var z3 = tmp11 * 0.707106781;
          var z11 = tmp7 + z3;
          var z13 = tmp7 - z3;
          data[dataOff + 5] = z13 + z2;
          data[dataOff + 3] = z13 - z2;
          data[dataOff + 1] = z11 + z4;
          data[dataOff + 7] = z11 - z4;
          dataOff += 8;
        }
        dataOff = 0;
        for (i = 0; i < I8; ++i) {
          d0 = data[dataOff];
          d1 = data[dataOff + 8];
          d2 = data[dataOff + 16];
          d3 = data[dataOff + 24];
          d4 = data[dataOff + 32];
          d5 = data[dataOff + 40];
          d6 = data[dataOff + 48];
          d7 = data[dataOff + 56];
          var tmp0p2 = d0 + d7;
          var tmp7p2 = d0 - d7;
          var tmp1p2 = d1 + d6;
          var tmp6p2 = d1 - d6;
          var tmp2p2 = d2 + d5;
          var tmp5p2 = d2 - d5;
          var tmp3p2 = d3 + d4;
          var tmp4p2 = d3 - d4;
          var tmp10p2 = tmp0p2 + tmp3p2;
          var tmp13p2 = tmp0p2 - tmp3p2;
          var tmp11p2 = tmp1p2 + tmp2p2;
          var tmp12p2 = tmp1p2 - tmp2p2;
          data[dataOff] = tmp10p2 + tmp11p2;
          data[dataOff + 32] = tmp10p2 - tmp11p2;
          var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781;
          data[dataOff + 16] = tmp13p2 + z1p2;
          data[dataOff + 48] = tmp13p2 - z1p2;
          tmp10p2 = tmp4p2 + tmp5p2;
          tmp11p2 = tmp5p2 + tmp6p2;
          tmp12p2 = tmp6p2 + tmp7p2;
          var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433;
          var z2p2 = 0.541196100 * tmp10p2 + z5p2;
          var z4p2 = 1.306562965 * tmp12p2 + z5p2;
          var z3p2 = tmp11p2 * 0.707106781;
          var z11p2 = tmp7p2 + z3p2;
          var z13p2 = tmp7p2 - z3p2;
          data[dataOff + 40] = z13p2 + z2p2;
          data[dataOff + 24] = z13p2 - z2p2;
          data[dataOff + 8] = z11p2 + z4p2;
          data[dataOff + 56] = z11p2 - z4p2;
          dataOff++;
        }
        var fDCTQuant;
        for (i = 0; i < I64; ++i) {
          fDCTQuant = data[i] * fdtbl[i];
          outputfDCTQuant[i] = (fDCTQuant > 0.0) ? ((fDCTQuant + 0.5) | 0) : ((fDCTQuant - 0.5) | 0);
        }
        return outputfDCTQuant;
      }
      function writeAPP0() {
        writeWord(0xFFE0);
        writeWord(16);
        writeByte(0x4A);
        writeByte(0x46);
        writeByte(0x49);
        writeByte(0x46);
        writeByte(0);
        writeByte(1);
        writeByte(1);
        writeByte(0);
        writeWord(1);
        writeWord(1);
        writeByte(0);
        writeByte(0);
      }
      function writeSOF0(width, height) {
        writeWord(0xFFC0);
        writeWord(17);
        writeByte(8);
        writeWord(height);
        writeWord(width);
        writeByte(3);
        writeByte(1);
        writeByte(0x11);
        writeByte(0);
        writeByte(2);
        writeByte(0x11);
        writeByte(1);
        writeByte(3);
        writeByte(0x11);
        writeByte(1);
      }
      function writeDQT() {
        writeWord(0xFFDB);
        writeWord(132);
        writeByte(0);
        for (var i = 0; i < 64; i++) {
          writeByte(YTable[i]);
        }
        writeByte(1);
        for (var j = 0; j < 64; j++) {
          writeByte(UVTable[j]);
        }
      }
      function writeDHT() {
        writeWord(0xFFC4);
        writeWord(0x01A2);
        writeByte(0);
        for (var i = 0; i < 16; i++) {
          writeByte(std_dc_luminance_nrcodes[i + 1]);
        }
        for (var j = 0; j <= 11; j++) {
          writeByte(std_dc_luminance_values[j]);
        }
        writeByte(0x10);
        for (var k = 0; k < 16; k++) {
          writeByte(std_ac_luminance_nrcodes[k + 1]);
        }
        for (var l = 0; l <= 161; l++) {
          writeByte(std_ac_luminance_values[l]);
        }
        writeByte(1);
        for (var m = 0; m < 16; m++) {
          writeByte(std_dc_chrominance_nrcodes[m + 1]);
        }
        for (var n = 0; n <= 11; n++) {
          writeByte(std_dc_chrominance_values[n]);
        }
        writeByte(0x11);
        for (var o = 0; o < 16; o++) {
          writeByte(std_ac_chrominance_nrcodes[o + 1]);
        }
        for (var p = 0; p <= 161; p++) {
          writeByte(std_ac_chrominance_values[p]);
        }
      }
      function writeSOS() {
        writeWord(0xFFDA);
        writeWord(12);
        writeByte(3);
        writeByte(1);
        writeByte(0);
        writeByte(2);
        writeByte(0x11);
        writeByte(3);
        writeByte(0x11);
        writeByte(0);
        writeByte(0x3f);
        writeByte(0);
      }
      function processDU(CDU, fdtbl, DC, HTDC, HTAC) {
        var EOB = HTAC[0x00];
        var M16zeroes = HTAC[0xF0];
        var pos;
        var I16 = 16;
        var I63 = 63;
        var I64 = 64;
        var DU_DCT = fDCTQuant(CDU, fdtbl);
        for (var j = 0; j < I64; ++j) {
          DU[ZigZag[j]] = DU_DCT[j];
        }
        var Diff = DU[0] - DC;
        DC = DU[0];
        if (Diff == 0) {
          writeBits(HTDC[0]);
        } else {
          pos = 32767 + Diff;
          writeBits(HTDC[category[pos]]);
          writeBits(bitcode[pos]);
        }
        var end0pos = 63;
        for (; (end0pos > 0) && (DU[end0pos] == 0); end0pos--) {}
        ;
        if (end0pos == 0) {
          writeBits(EOB);
          return DC;
        }
        var i = 1;
        var lng;
        while (i <= end0pos) {
          var startpos = i;
          for (; (DU[i] == 0) && (i <= end0pos); ++i) {}
          var nrzeroes = i - startpos;
          if (nrzeroes >= I16) {
            lng = nrzeroes >> 4;
            for (var nrmarker = 1; nrmarker <= lng; ++nrmarker)
              writeBits(M16zeroes);
            nrzeroes = nrzeroes & 0xF;
          }
          pos = 32767 + DU[i];
          writeBits(HTAC[(nrzeroes << 4) + category[pos]]);
          writeBits(bitcode[pos]);
          i++;
        }
        if (end0pos != I63) {
          writeBits(EOB);
        }
        return DC;
      }
      function initCharLookupTable() {
        var sfcc = String.fromCharCode;
        for (var i = 0; i < 256; i++) {
          clt[i] = sfcc(i);
        }
      }
      this.encode = function(image, quality) {
        if (quality)
          setQuality(quality);
        byteout = new Array();
        bytenew = 0;
        bytepos = 7;
        writeWord(0xFFD8);
        writeAPP0();
        writeDQT();
        writeSOF0(image.width, image.height);
        writeDHT();
        writeSOS();
        var DCY = 0;
        var DCU = 0;
        var DCV = 0;
        bytenew = 0;
        bytepos = 7;
        this.encode.displayName = "_encode_";
        var imageData = image.data;
        var width = image.width;
        var height = image.height;
        var quadWidth = width * 4;
        var tripleWidth = width * 3;
        var x,
            y = 0;
        var r,
            g,
            b;
        var start,
            p,
            col,
            row,
            pos;
        while (y < height) {
          x = 0;
          while (x < quadWidth) {
            start = quadWidth * y + x;
            p = start;
            col = -1;
            row = 0;
            for (pos = 0; pos < 64; pos++) {
              row = pos >> 3;
              col = (pos & 7) * 4;
              p = start + (row * quadWidth) + col;
              if (y + row >= height) {
                p -= (quadWidth * (y + 1 + row - height));
              }
              if (x + col >= quadWidth) {
                p -= ((x + col) - quadWidth + 4);
              }
              r = imageData[p++];
              g = imageData[p++];
              b = imageData[p++];
              YDU[pos] = ((RGB_YUV_TABLE[r] + RGB_YUV_TABLE[(g + 256) >> 0] + RGB_YUV_TABLE[(b + 512) >> 0]) >> 16) - 128;
              UDU[pos] = ((RGB_YUV_TABLE[(r + 768) >> 0] + RGB_YUV_TABLE[(g + 1024) >> 0] + RGB_YUV_TABLE[(b + 1280) >> 0]) >> 16) - 128;
              VDU[pos] = ((RGB_YUV_TABLE[(r + 1280) >> 0] + RGB_YUV_TABLE[(g + 1536) >> 0] + RGB_YUV_TABLE[(b + 1792) >> 0]) >> 16) - 128;
            }
            DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
            DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
            DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
            x += 32;
          }
          y += 8;
        }
        if (bytepos >= 0) {
          var fillbits = [];
          fillbits[1] = bytepos + 1;
          fillbits[0] = (1 << (bytepos + 1)) - 1;
          writeBits(fillbits);
        }
        writeWord(0xFFD9);
        var jpegDataUri = 'data:image/jpeg;base64,' + btoa(byteout.join(''));
        byteout = [];
        return jpegDataUri;
      };
      function setQuality(quality) {
        if (quality <= 0) {
          quality = 1;
        }
        if (quality > 100) {
          quality = 100;
        }
        if (currentQuality == quality)
          return;
        var sf = 0;
        if (quality < 50) {
          sf = Math.floor(5000 / quality);
        } else {
          sf = Math.floor(200 - quality * 2);
        }
        initQuantTables(sf);
        currentQuality = quality;
      }
      function init() {
        if (!quality)
          quality = 50;
        initCharLookupTable();
        initHuffmanTbl();
        initCategoryNumber();
        initRGBYUVTable();
        setQuality(quality);
      }
      init();
    }
    ;
    JPEGEncoder.encode = function(data, quality) {
      var encoder = new JPEGEncoder(quality);
      return encoder.encode(data);
    };
    return JPEGEncoder;
  });
  define('runtime/html5/androidpatch', ['runtime/html5/util', 'runtime/html5/jpegencoder', 'base'], function(Util, encoder, Base) {
    var origin = Util.canvasToDataUrl,
        supportJpeg;
    Util.canvasToDataUrl = function(canvas, type, quality) {
      var ctx,
          w,
          h,
          fragement,
          parts;
      if (!Base.os.android) {
        return origin.apply(null, arguments);
      }
      if (type === 'image/jpeg' && typeof supportJpeg === 'undefined') {
        fragement = origin.apply(null, arguments);
        parts = fragement.split(',');
        if (~parts[0].indexOf('base64')) {
          fragement = atob(parts[1]);
        } else {
          fragement = decodeURIComponent(parts[1]);
        }
        fragement = fragement.substring(0, 2);
        supportJpeg = fragement.charCodeAt(0) === 255 && fragement.charCodeAt(1) === 216;
      }
      if (type === 'image/jpeg' && !supportJpeg) {
        w = canvas.width;
        h = canvas.height;
        ctx = canvas.getContext('2d');
        return encoder.encode(ctx.getImageData(0, 0, w, h), quality);
      }
      return origin.apply(null, arguments);
    };
  });
  define('runtime/html5/image', ['base', 'runtime/html5/runtime', 'runtime/html5/util'], function(Base, Html5Runtime, Util) {
    var BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
    return Html5Runtime.register('Image', {
      modified: false,
      init: function() {
        var me = this,
            img = new Image();
        img.onload = function() {
          me._info = {
            type: me.type,
            width: this.width,
            height: this.height
          };
          if (!me._metas && 'image/jpeg' === me.type) {
            Util.parseMeta(me._blob, function(error, ret) {
              me._metas = ret;
              me.owner.trigger('load');
            });
          } else {
            me.owner.trigger('load');
          }
        };
        img.onerror = function() {
          me.owner.trigger('error');
        };
        me._img = img;
      },
      loadFromBlob: function(blob) {
        var me = this,
            img = me._img;
        me._blob = blob;
        me.type = blob.type;
        img.src = Util.createObjectURL(blob.getSource());
        me.owner.once('load', function() {
          Util.revokeObjectURL(img.src);
        });
      },
      resize: function(width, height) {
        var canvas = this._canvas || (this._canvas = document.createElement('canvas'));
        this._resize(this._img, canvas, width, height);
        this._blob = null;
        this.modified = true;
        this.owner.trigger('complete', 'resize');
      },
      crop: function(x, y, w, h, s) {
        var cvs = this._canvas || (this._canvas = document.createElement('canvas')),
            opts = this.options,
            img = this._img,
            iw = img.naturalWidth,
            ih = img.naturalHeight,
            orientation = this.getOrientation();
        s = s || 1;
        cvs.width = w;
        cvs.height = h;
        opts.preserveHeaders || this._rotate2Orientaion(cvs, orientation);
        this._renderImageToCanvas(cvs, img, -x, -y, iw * s, ih * s);
        this._blob = null;
        this.modified = true;
        this.owner.trigger('complete', 'crop');
      },
      getAsBlob: function(type) {
        var blob = this._blob,
            opts = this.options,
            canvas;
        type = type || this.type;
        if (this.modified || this.type !== type) {
          canvas = this._canvas;
          if (type === 'image/jpeg') {
            blob = Util.canvasToDataUrl(canvas, type, opts.quality);
            if (opts.preserveHeaders && this._metas && this._metas.imageHead) {
              blob = Util.dataURL2ArrayBuffer(blob);
              blob = Util.updateImageHead(blob, this._metas.imageHead);
              blob = Util.arrayBufferToBlob(blob, type);
              return blob;
            }
          } else {
            blob = Util.canvasToDataUrl(canvas, type);
          }
          blob = Util.dataURL2Blob(blob);
        }
        return blob;
      },
      getAsDataUrl: function(type) {
        var opts = this.options;
        type = type || this.type;
        if (type === 'image/jpeg') {
          return Util.canvasToDataUrl(this._canvas, type, opts.quality);
        } else {
          return this._canvas.toDataURL(type);
        }
      },
      getOrientation: function() {
        return this._metas && this._metas.exif && this._metas.exif.get('Orientation') || 1;
      },
      info: function(val) {
        if (val) {
          this._info = val;
          return this;
        }
        return this._info;
      },
      meta: function(val) {
        if (val) {
          this._meta = val;
          return this;
        }
        return this._meta;
      },
      destroy: function() {
        var canvas = this._canvas;
        this._img.onload = null;
        if (canvas) {
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = canvas.height = 0;
          this._canvas = null;
        }
        this._img.src = BLANK;
        this._img = this._blob = null;
      },
      _resize: function(img, cvs, width, height) {
        var opts = this.options,
            naturalWidth = img.width,
            naturalHeight = img.height,
            orientation = this.getOrientation(),
            scale,
            w,
            h,
            x,
            y;
        if (~[5, 6, 7, 8].indexOf(orientation)) {
          width ^= height;
          height ^= width;
          width ^= height;
        }
        scale = Math[opts.crop ? 'max' : 'min'](width / naturalWidth, height / naturalHeight);
        opts.allowMagnify || (scale = Math.min(1, scale));
        w = naturalWidth * scale;
        h = naturalHeight * scale;
        if (opts.crop) {
          cvs.width = width;
          cvs.height = height;
        } else {
          cvs.width = w;
          cvs.height = h;
        }
        x = (cvs.width - w) / 2;
        y = (cvs.height - h) / 2;
        opts.preserveHeaders || this._rotate2Orientaion(cvs, orientation);
        this._renderImageToCanvas(cvs, img, x, y, w, h);
      },
      _rotate2Orientaion: function(canvas, orientation) {
        var width = canvas.width,
            height = canvas.height,
            ctx = canvas.getContext('2d');
        switch (orientation) {
          case 5:
          case 6:
          case 7:
          case 8:
            canvas.width = height;
            canvas.height = width;
            break;
        }
        switch (orientation) {
          case 2:
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            break;
          case 3:
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            break;
          case 4:
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break;
          case 5:
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break;
          case 6:
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            break;
          case 7:
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            break;
          case 8:
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            break;
        }
      },
      _renderImageToCanvas: (function() {
        if (!Base.os.ios) {
          return function(canvas) {
            var args = Base.slice(arguments, 1),
                ctx = canvas.getContext('2d');
            ctx.drawImage.apply(ctx, args);
          };
        }
        function detectVerticalSquash(img, iw, ih) {
          var canvas = document.createElement('canvas'),
              ctx = canvas.getContext('2d'),
              sy = 0,
              ey = ih,
              py = ih,
              data,
              alpha,
              ratio;
          canvas.width = 1;
          canvas.height = ih;
          ctx.drawImage(img, 0, 0);
          data = ctx.getImageData(0, 0, 1, ih).data;
          while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
              ey = py;
            } else {
              sy = py;
            }
            py = (ey + sy) >> 1;
          }
          ratio = (py / ih);
          return (ratio === 0) ? 1 : ratio;
        }
        if (Base.os.ios >= 7) {
          return function(canvas, img, x, y, w, h) {
            var iw = img.naturalWidth,
                ih = img.naturalHeight,
                vertSquashRatio = detectVerticalSquash(img, iw, ih);
            return canvas.getContext('2d').drawImage(img, 0, 0, iw * vertSquashRatio, ih * vertSquashRatio, x, y, w, h);
          };
        }
        function detectSubsampling(img) {
          var iw = img.naturalWidth,
              ih = img.naturalHeight,
              canvas,
              ctx;
          if (iw * ih > 1024 * 1024) {
            canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img, -iw + 1, 0);
            return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
          } else {
            return false;
          }
        }
        return function(canvas, img, x, y, width, height) {
          var iw = img.naturalWidth,
              ih = img.naturalHeight,
              ctx = canvas.getContext('2d'),
              subsampled = detectSubsampling(img),
              doSquash = this.type === 'image/jpeg',
              d = 1024,
              sy = 0,
              dy = 0,
              tmpCanvas,
              tmpCtx,
              vertSquashRatio,
              dw,
              dh,
              sx,
              dx;
          if (subsampled) {
            iw /= 2;
            ih /= 2;
          }
          ctx.save();
          tmpCanvas = document.createElement('canvas');
          tmpCanvas.width = tmpCanvas.height = d;
          tmpCtx = tmpCanvas.getContext('2d');
          vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
          dw = Math.ceil(d * width / iw);
          dh = Math.ceil(d * height / ih / vertSquashRatio);
          while (sy < ih) {
            sx = 0;
            dx = 0;
            while (sx < iw) {
              tmpCtx.clearRect(0, 0, d, d);
              tmpCtx.drawImage(img, -sx, -sy);
              ctx.drawImage(tmpCanvas, 0, 0, d, d, x + dx, y + dy, dw, dh);
              sx += d;
              dx += dw;
            }
            sy += d;
            dy += dh;
          }
          ctx.restore();
          tmpCanvas = tmpCtx = null;
        };
      })()
    });
  });
  define('runtime/html5/transport', ['base', 'runtime/html5/runtime'], function(Base, Html5Runtime) {
    var noop = Base.noop,
        $ = Base.$;
    return Html5Runtime.register('Transport', {
      init: function() {
        this._status = 0;
        this._response = null;
      },
      send: function() {
        var owner = this.owner,
            opts = this.options,
            xhr = this._initAjax(),
            blob = owner._blob,
            server = opts.server,
            formData,
            binary,
            fr;
        if (opts.sendAsBinary) {
          server += (/\?/.test(server) ? '&' : '?') + $.param(owner._formData);
          binary = blob.getSource();
        } else {
          formData = new FormData();
          $.each(owner._formData, function(k, v) {
            formData.append(k, v);
          });
          formData.append(opts.fileVal, blob.getSource(), opts.filename || owner._formData.name || '');
        }
        if (opts.withCredentials && 'withCredentials' in xhr) {
          xhr.open(opts.method, server, true);
          xhr.withCredentials = true;
        } else {
          xhr.open(opts.method, server);
        }
        this._setRequestHeader(xhr, opts.headers);
        if (binary) {
          xhr.overrideMimeType && xhr.overrideMimeType('application/octet-stream');
          if (Base.os.android) {
            fr = new FileReader();
            fr.onload = function() {
              xhr.send(this.result);
              fr = fr.onload = null;
            };
            fr.readAsArrayBuffer(binary);
          } else {
            xhr.send(binary);
          }
        } else {
          xhr.send(formData);
        }
      },
      getResponse: function() {
        return this._response;
      },
      getResponseAsJson: function() {
        return this._parseJson(this._response);
      },
      getStatus: function() {
        return this._status;
      },
      abort: function() {
        var xhr = this._xhr;
        if (xhr) {
          xhr.upload.onprogress = noop;
          xhr.onreadystatechange = noop;
          xhr.abort();
          this._xhr = xhr = null;
        }
      },
      destroy: function() {
        this.abort();
      },
      _initAjax: function() {
        var me = this,
            xhr = new XMLHttpRequest(),
            opts = this.options;
        if (opts.withCredentials && !('withCredentials' in xhr) && typeof XDomainRequest !== 'undefined') {
          xhr = new XDomainRequest();
        }
        xhr.upload.onprogress = function(e) {
          var percentage = 0;
          if (e.lengthComputable) {
            percentage = e.loaded / e.total;
          }
          return me.trigger('progress', percentage);
        };
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== 4) {
            return;
          }
          xhr.upload.onprogress = noop;
          xhr.onreadystatechange = noop;
          me._xhr = null;
          me._status = xhr.status;
          if (xhr.status >= 200 && xhr.status < 300) {
            me._response = xhr.responseText;
            return me.trigger('load');
          } else if (xhr.status >= 500 && xhr.status < 600) {
            me._response = xhr.responseText;
            return me.trigger('error', 'server');
          }
          return me.trigger('error', me._status ? 'http' : 'abort');
        };
        me._xhr = xhr;
        return xhr;
      },
      _setRequestHeader: function(xhr, headers) {
        $.each(headers, function(key, val) {
          xhr.setRequestHeader(key, val);
        });
      },
      _parseJson: function(str) {
        var json;
        try {
          json = JSON.parse(str);
        } catch (ex) {
          json = {};
        }
        return json;
      }
    });
  });
  define('runtime/html5/md5', ['runtime/html5/runtime'], function(FlashRuntime) {
    var add32 = function(a, b) {
      return (a + b) & 0xFFFFFFFF;
    },
        cmn = function(q, a, b, x, s, t) {
          a = add32(add32(a, q), add32(x, t));
          return add32((a << s) | (a >>> (32 - s)), b);
        },
        ff = function(a, b, c, d, x, s, t) {
          return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        },
        gg = function(a, b, c, d, x, s, t) {
          return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        },
        hh = function(a, b, c, d, x, s, t) {
          return cmn(b ^ c ^ d, a, b, x, s, t);
        },
        ii = function(a, b, c, d, x, s, t) {
          return cmn(c ^ (b | (~d)), a, b, x, s, t);
        },
        md5cycle = function(x, k) {
          var a = x[0],
              b = x[1],
              c = x[2],
              d = x[3];
          a = ff(a, b, c, d, k[0], 7, -680876936);
          d = ff(d, a, b, c, k[1], 12, -389564586);
          c = ff(c, d, a, b, k[2], 17, 606105819);
          b = ff(b, c, d, a, k[3], 22, -1044525330);
          a = ff(a, b, c, d, k[4], 7, -176418897);
          d = ff(d, a, b, c, k[5], 12, 1200080426);
          c = ff(c, d, a, b, k[6], 17, -1473231341);
          b = ff(b, c, d, a, k[7], 22, -45705983);
          a = ff(a, b, c, d, k[8], 7, 1770035416);
          d = ff(d, a, b, c, k[9], 12, -1958414417);
          c = ff(c, d, a, b, k[10], 17, -42063);
          b = ff(b, c, d, a, k[11], 22, -1990404162);
          a = ff(a, b, c, d, k[12], 7, 1804603682);
          d = ff(d, a, b, c, k[13], 12, -40341101);
          c = ff(c, d, a, b, k[14], 17, -1502002290);
          b = ff(b, c, d, a, k[15], 22, 1236535329);
          a = gg(a, b, c, d, k[1], 5, -165796510);
          d = gg(d, a, b, c, k[6], 9, -1069501632);
          c = gg(c, d, a, b, k[11], 14, 643717713);
          b = gg(b, c, d, a, k[0], 20, -373897302);
          a = gg(a, b, c, d, k[5], 5, -701558691);
          d = gg(d, a, b, c, k[10], 9, 38016083);
          c = gg(c, d, a, b, k[15], 14, -660478335);
          b = gg(b, c, d, a, k[4], 20, -405537848);
          a = gg(a, b, c, d, k[9], 5, 568446438);
          d = gg(d, a, b, c, k[14], 9, -1019803690);
          c = gg(c, d, a, b, k[3], 14, -187363961);
          b = gg(b, c, d, a, k[8], 20, 1163531501);
          a = gg(a, b, c, d, k[13], 5, -1444681467);
          d = gg(d, a, b, c, k[2], 9, -51403784);
          c = gg(c, d, a, b, k[7], 14, 1735328473);
          b = gg(b, c, d, a, k[12], 20, -1926607734);
          a = hh(a, b, c, d, k[5], 4, -378558);
          d = hh(d, a, b, c, k[8], 11, -2022574463);
          c = hh(c, d, a, b, k[11], 16, 1839030562);
          b = hh(b, c, d, a, k[14], 23, -35309556);
          a = hh(a, b, c, d, k[1], 4, -1530992060);
          d = hh(d, a, b, c, k[4], 11, 1272893353);
          c = hh(c, d, a, b, k[7], 16, -155497632);
          b = hh(b, c, d, a, k[10], 23, -1094730640);
          a = hh(a, b, c, d, k[13], 4, 681279174);
          d = hh(d, a, b, c, k[0], 11, -358537222);
          c = hh(c, d, a, b, k[3], 16, -722521979);
          b = hh(b, c, d, a, k[6], 23, 76029189);
          a = hh(a, b, c, d, k[9], 4, -640364487);
          d = hh(d, a, b, c, k[12], 11, -421815835);
          c = hh(c, d, a, b, k[15], 16, 530742520);
          b = hh(b, c, d, a, k[2], 23, -995338651);
          a = ii(a, b, c, d, k[0], 6, -198630844);
          d = ii(d, a, b, c, k[7], 10, 1126891415);
          c = ii(c, d, a, b, k[14], 15, -1416354905);
          b = ii(b, c, d, a, k[5], 21, -57434055);
          a = ii(a, b, c, d, k[12], 6, 1700485571);
          d = ii(d, a, b, c, k[3], 10, -1894986606);
          c = ii(c, d, a, b, k[10], 15, -1051523);
          b = ii(b, c, d, a, k[1], 21, -2054922799);
          a = ii(a, b, c, d, k[8], 6, 1873313359);
          d = ii(d, a, b, c, k[15], 10, -30611744);
          c = ii(c, d, a, b, k[6], 15, -1560198380);
          b = ii(b, c, d, a, k[13], 21, 1309151649);
          a = ii(a, b, c, d, k[4], 6, -145523070);
          d = ii(d, a, b, c, k[11], 10, -1120210379);
          c = ii(c, d, a, b, k[2], 15, 718787259);
          b = ii(b, c, d, a, k[9], 21, -343485551);
          x[0] = add32(a, x[0]);
          x[1] = add32(b, x[1]);
          x[2] = add32(c, x[2]);
          x[3] = add32(d, x[3]);
        },
        md5blk = function(s) {
          var md5blks = [],
              i;
          for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
          }
          return md5blks;
        },
        md5blk_array = function(a) {
          var md5blks = [],
              i;
          for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
          }
          return md5blks;
        },
        md51 = function(s) {
          var n = s.length,
              state = [1732584193, -271733879, -1732584194, 271733878],
              i,
              length,
              tail,
              tmp,
              lo,
              hi;
          for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
          }
          s = s.substring(i - 64);
          length = s.length;
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
          }
          tail[i >> 2] |= 0x80 << ((i % 4) << 3);
          if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = n * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(state, tail);
          return state;
        },
        md51_array = function(a) {
          var n = a.length,
              state = [1732584193, -271733879, -1732584194, 271733878],
              i,
              length,
              tail,
              tmp,
              lo,
              hi;
          for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
          }
          a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);
          length = a.length;
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
          }
          tail[i >> 2] |= 0x80 << ((i % 4) << 3);
          if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = n * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(state, tail);
          return state;
        },
        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
        rhex = function(n) {
          var s = '',
              j;
          for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
          }
          return s;
        },
        hex = function(x) {
          var i;
          for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
          }
          return x.join('');
        },
        md5 = function(s) {
          return hex(md51(s));
        },
        SparkMD5 = function() {
          this.reset();
        };
    if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
      add32 = function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      };
    }
    SparkMD5.prototype.append = function(str) {
      if (/[\u0080-\uFFFF]/.test(str)) {
        str = unescape(encodeURIComponent(str));
      }
      this.appendBinary(str);
      return this;
    };
    SparkMD5.prototype.appendBinary = function(contents) {
      this._buff += contents;
      this._length += contents.length;
      var length = this._buff.length,
          i;
      for (i = 64; i <= length; i += 64) {
        md5cycle(this._state, md5blk(this._buff.substring(i - 64, i)));
      }
      this._buff = this._buff.substr(i - 64);
      return this;
    };
    SparkMD5.prototype.end = function(raw) {
      var buff = this._buff,
          length = buff.length,
          i,
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ret;
      for (i = 0; i < length; i += 1) {
        tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
      }
      this._finish(tail, length);
      ret = !!raw ? this._state : hex(this._state);
      this.reset();
      return ret;
    };
    SparkMD5.prototype._finish = function(tail, length) {
      var i = length,
          tmp,
          lo,
          hi;
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(this._state, tail);
        for (i = 0; i < 16; i += 1) {
          tail[i] = 0;
        }
      }
      tmp = this._length * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(this._state, tail);
    };
    SparkMD5.prototype.reset = function() {
      this._buff = "";
      this._length = 0;
      this._state = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD5.prototype.destroy = function() {
      delete this._state;
      delete this._buff;
      delete this._length;
    };
    SparkMD5.hash = function(str, raw) {
      if (/[\u0080-\uFFFF]/.test(str)) {
        str = unescape(encodeURIComponent(str));
      }
      var hash = md51(str);
      return !!raw ? hash : hex(hash);
    };
    SparkMD5.hashBinary = function(content, raw) {
      var hash = md51(content);
      return !!raw ? hash : hex(hash);
    };
    SparkMD5.ArrayBuffer = function() {
      this.reset();
    };
    SparkMD5.ArrayBuffer.prototype.append = function(arr) {
      var buff = this._concatArrayBuffer(this._buff, arr),
          length = buff.length,
          i;
      this._length += arr.byteLength;
      for (i = 64; i <= length; i += 64) {
        md5cycle(this._state, md5blk_array(buff.subarray(i - 64, i)));
      }
      this._buff = (i - 64) < length ? buff.subarray(i - 64) : new Uint8Array(0);
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.end = function(raw) {
      var buff = this._buff,
          length = buff.length,
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          i,
          ret;
      for (i = 0; i < length; i += 1) {
        tail[i >> 2] |= buff[i] << ((i % 4) << 3);
      }
      this._finish(tail, length);
      ret = !!raw ? this._state : hex(this._state);
      this.reset();
      return ret;
    };
    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
    SparkMD5.ArrayBuffer.prototype.reset = function() {
      this._buff = new Uint8Array(0);
      this._length = 0;
      this._state = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
    SparkMD5.ArrayBuffer.prototype._concatArrayBuffer = function(first, second) {
      var firstLength = first.length,
          result = new Uint8Array(firstLength + second.byteLength);
      result.set(first);
      result.set(new Uint8Array(second), firstLength);
      return result;
    };
    SparkMD5.ArrayBuffer.hash = function(arr, raw) {
      var hash = md51_array(new Uint8Array(arr));
      return !!raw ? hash : hex(hash);
    };
    return FlashRuntime.register('Md5', {
      init: function() {},
      loadFromBlob: function(file) {
        var blob = file.getSource(),
            chunkSize = 2 * 1024 * 1024,
            chunks = Math.ceil(blob.size / chunkSize),
            chunk = 0,
            owner = this.owner,
            spark = new SparkMD5.ArrayBuffer(),
            me = this,
            blobSlice = blob.mozSlice || blob.webkitSlice || blob.slice,
            loadNext,
            fr;
        fr = new FileReader();
        loadNext = function() {
          var start,
              end;
          start = chunk * chunkSize;
          end = Math.min(start + chunkSize, blob.size);
          fr.onload = function(e) {
            spark.append(e.target.result);
            owner.trigger('progress', {
              total: file.size,
              loaded: end
            });
          };
          fr.onloadend = function() {
            fr.onloadend = fr.onload = null;
            if (++chunk < chunks) {
              setTimeout(loadNext, 1);
            } else {
              setTimeout(function() {
                owner.trigger('load');
                me.result = spark.end();
                loadNext = file = blob = spark = null;
                owner.trigger('complete');
              }, 50);
            }
          };
          fr.readAsArrayBuffer(blobSlice.call(blob, start, end));
        };
        loadNext();
      },
      getResult: function() {
        return this.result;
      }
    });
  });
  define('runtime/flash/runtime', ['base', 'runtime/runtime', 'runtime/compbase'], function(Base, Runtime, CompBase) {
    var $ = Base.$,
        type = 'flash',
        components = {};
    function getFlashVersion() {
      var version;
      try {
        version = navigator.plugins['Shockwave Flash'];
        version = version.description;
      } catch (ex) {
        try {
          version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
        } catch (ex2) {
          version = '0.0';
        }
      }
      version = version.match(/\d+/g);
      return parseFloat(version[0] + '.' + version[1], 10);
    }
    function FlashRuntime() {
      var pool = {},
          clients = {},
          destroy = this.destroy,
          me = this,
          jsreciver = Base.guid('webuploader_');
      Runtime.apply(me, arguments);
      me.type = type;
      me.exec = function(comp, fn) {
        var client = this,
            uid = client.uid,
            args = Base.slice(arguments, 2),
            instance;
        clients[uid] = client;
        if (components[comp]) {
          if (!pool[uid]) {
            pool[uid] = new components[comp](client, me);
          }
          instance = pool[uid];
          if (instance[fn]) {
            return instance[fn].apply(instance, args);
          }
        }
        return me.flashExec.apply(client, arguments);
      };
      function handler(evt, obj) {
        var type = evt.type || evt,
            parts,
            uid;
        parts = type.split('::');
        uid = parts[0];
        type = parts[1];
        if (type === 'Ready' && uid === me.uid) {
          me.trigger('ready');
        } else if (clients[uid]) {
          clients[uid].trigger(type.toLowerCase(), evt, obj);
        }
      }
      window[jsreciver] = function() {
        var args = arguments;
        setTimeout(function() {
          handler.apply(null, args);
        }, 1);
      };
      this.jsreciver = jsreciver;
      this.destroy = function() {
        return destroy && destroy.apply(this, arguments);
      };
      this.flashExec = function(comp, fn) {
        var flash = me.getFlash(),
            args = Base.slice(arguments, 2);
        return flash.exec(this.uid, comp, fn, args);
      };
    }
    Base.inherits(Runtime, {
      constructor: FlashRuntime,
      init: function() {
        var container = this.getContainer(),
            opts = this.options,
            html;
        container.css({
          position: 'absolute',
          top: '-8px',
          left: '-8px',
          width: '9px',
          height: '9px',
          overflow: 'hidden'
        });
        html = '<object id="' + this.uid + '" type="application/' + 'x-shockwave-flash" data="' + opts.swf + '" ';
        if (Base.browser.ie) {
          html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
        }
        html += 'width="100%" height="100%" style="outline:0">' + '<param name="movie" value="' + opts.swf + '" />' + '<param name="flashvars" value="uid=' + this.uid + '&jsreciver=' + this.jsreciver + '" />' + '<param name="wmode" value="transparent" />' + '<param name="allowscriptaccess" value="always" />' + '</object>';
        container.html(html);
      },
      getFlash: function() {
        if (this._flash) {
          return this._flash;
        }
        this._flash = $('#' + this.uid).get(0);
        return this._flash;
      }
    });
    FlashRuntime.register = function(name, component) {
      component = components[name] = Base.inherits(CompBase, $.extend({flashExec: function() {
          var owner = this.owner,
              runtime = this.getRuntime();
          return runtime.flashExec.apply(owner, arguments);
        }}, component));
      return component;
    };
    if (getFlashVersion() >= 11.4) {
      Runtime.addRuntime(type, FlashRuntime);
    }
    return FlashRuntime;
  });
  define('runtime/flash/filepicker', ['base', 'runtime/flash/runtime'], function(Base, FlashRuntime) {
    var $ = Base.$;
    return FlashRuntime.register('FilePicker', {
      init: function(opts) {
        var copy = $.extend({}, opts),
            len,
            i;
        len = copy.accept && copy.accept.length;
        for (i = 0; i < len; i++) {
          if (!copy.accept[i].title) {
            copy.accept[i].title = 'Files';
          }
        }
        delete copy.button;
        delete copy.id;
        delete copy.container;
        this.flashExec('FilePicker', 'init', copy);
      },
      destroy: function() {
        this.flashExec('FilePicker', 'destroy');
      }
    });
  });
  define('runtime/flash/image', ['runtime/flash/runtime'], function(FlashRuntime) {
    return FlashRuntime.register('Image', {loadFromBlob: function(blob) {
        var owner = this.owner;
        owner.info() && this.flashExec('Image', 'info', owner.info());
        owner.meta() && this.flashExec('Image', 'meta', owner.meta());
        this.flashExec('Image', 'loadFromBlob', blob.uid);
      }});
  });
  define('runtime/flash/transport', ['base', 'runtime/flash/runtime', 'runtime/client'], function(Base, FlashRuntime, RuntimeClient) {
    var $ = Base.$;
    return FlashRuntime.register('Transport', {
      init: function() {
        this._status = 0;
        this._response = null;
        this._responseJson = null;
      },
      send: function() {
        var owner = this.owner,
            opts = this.options,
            xhr = this._initAjax(),
            blob = owner._blob,
            server = opts.server,
            binary;
        xhr.connectRuntime(blob.ruid);
        if (opts.sendAsBinary) {
          server += (/\?/.test(server) ? '&' : '?') + $.param(owner._formData);
          binary = blob.uid;
        } else {
          $.each(owner._formData, function(k, v) {
            xhr.exec('append', k, v);
          });
          xhr.exec('appendBlob', opts.fileVal, blob.uid, opts.filename || owner._formData.name || '');
        }
        this._setRequestHeader(xhr, opts.headers);
        xhr.exec('send', {
          method: opts.method,
          url: server,
          forceURLStream: opts.forceURLStream,
          mimeType: 'application/octet-stream'
        }, binary);
      },
      getStatus: function() {
        return this._status;
      },
      getResponse: function() {
        return this._response || '';
      },
      getResponseAsJson: function() {
        return this._responseJson;
      },
      abort: function() {
        var xhr = this._xhr;
        if (xhr) {
          xhr.exec('abort');
          xhr.destroy();
          this._xhr = xhr = null;
        }
      },
      destroy: function() {
        this.abort();
      },
      _initAjax: function() {
        var me = this,
            xhr = new RuntimeClient('XMLHttpRequest');
        xhr.on('uploadprogress progress', function(e) {
          var percent = e.loaded / e.total;
          percent = Math.min(1, Math.max(0, percent));
          return me.trigger('progress', percent);
        });
        xhr.on('load', function() {
          var status = xhr.exec('getStatus'),
              readBody = false,
              err = '',
              p;
          xhr.off();
          me._xhr = null;
          if (status >= 200 && status < 300) {
            readBody = true;
          } else if (status >= 500 && status < 600) {
            readBody = true;
            err = 'server';
          } else {
            err = 'http';
          }
          if (readBody) {
            me._response = xhr.exec('getResponse');
            me._response = decodeURIComponent(me._response);
            p = window.JSON && window.JSON.parse || function(s) {
              try {
                return new Function('return ' + s).call();
              } catch (err) {
                return {};
              }
            };
            me._responseJson = me._response ? p(me._response) : {};
          }
          xhr.destroy();
          xhr = null;
          return err ? me.trigger('error', err) : me.trigger('load');
        });
        xhr.on('error', function() {
          xhr.off();
          me._xhr = null;
          me.trigger('error', 'http');
        });
        me._xhr = xhr;
        return xhr;
      },
      _setRequestHeader: function(xhr, headers) {
        $.each(headers, function(key, val) {
          xhr.exec('setRequestHeader', key, val);
        });
      }
    });
  });
  define('runtime/flash/blob', ['runtime/flash/runtime', 'lib/blob'], function(FlashRuntime, Blob) {
    return FlashRuntime.register('Blob', {slice: function(start, end) {
        var blob = this.flashExec('Blob', 'slice', start, end);
        return new Blob(blob.uid, blob);
      }});
  });
  define('runtime/flash/md5', ['runtime/flash/runtime'], function(FlashRuntime) {
    return FlashRuntime.register('Md5', {
      init: function() {},
      loadFromBlob: function(blob) {
        return this.flashExec('Md5', 'loadFromBlob', blob.uid);
      }
    });
  });
  define('preset/all', ['base', 'widgets/filednd', 'widgets/filepaste', 'widgets/filepicker', 'widgets/image', 'widgets/queue', 'widgets/runtime', 'widgets/upload', 'widgets/validator', 'widgets/md5', 'runtime/html5/blob', 'runtime/html5/dnd', 'runtime/html5/filepaste', 'runtime/html5/filepicker', 'runtime/html5/imagemeta/exif', 'runtime/html5/androidpatch', 'runtime/html5/image', 'runtime/html5/transport', 'runtime/html5/md5', 'runtime/flash/filepicker', 'runtime/flash/image', 'runtime/flash/transport', 'runtime/flash/blob', 'runtime/flash/md5'], function(Base) {
    return Base;
  });
  define('widgets/log', ['base', 'uploader', 'widgets/widget'], function(Base, Uploader) {
    var $ = Base.$,
        logUrl = ' http://static.tieba.baidu.com/tb/pms/img/st.gif??',
        product = (location.hostname || location.host || 'protected').toLowerCase(),
        enable = product && /baidu/i.exec(product),
        base;
    if (!enable) {
      return;
    }
    base = {
      dv: 3,
      master: 'webuploader',
      online: /test/.exec(product) ? 0 : 1,
      module: '',
      product: product,
      type: 0
    };
    function send(data) {
      var obj = $.extend({}, base, data),
          url = logUrl.replace(/^(.*)\?/, '$1' + $.param(obj)),
          image = new Image();
      image.src = url;
    }
    return Uploader.register({
      name: 'log',
      init: function() {
        var owner = this.owner,
            count = 0,
            size = 0;
        owner.on('error', function(code) {
          send({
            type: 2,
            c_error_code: code
          });
        }).on('uploadError', function(file, reason) {
          send({
            type: 2,
            c_error_code: 'UPLOAD_ERROR',
            c_reason: '' + reason
          });
        }).on('uploadComplete', function(file) {
          count++;
          size += file.size;
        }).on('uploadFinished', function() {
          send({
            c_count: count,
            c_size: size
          });
          count = size = 0;
        });
        send({c_usage: 1});
      }
    });
  });
  define('webuploader', ['preset/all', 'widgets/log'], function(preset) {
    return preset;
  });
  return require('webuploader');
});

})();
(function() {
var define = System.amdDefine;
define("github:fex-team/webuploader@0.1.5.js", ["github:fex-team/webuploader@0.1.5/webuploader.js"], function(main) {
  return main;
});

})();
System.register("github:fex-team/webuploader@0.1.5/webuploader.css!github:systemjs/plugin-css@0.1.20.js", [], function() { return { setters: [], execute: function() {} } });

System.register('app/uploade/ImageUploader.js', ['npm:jquery@2.2.2.js', 'github:fex-team/webuploader@0.1.5.js', 'github:fex-team/webuploader@0.1.5/webuploader.css!github:systemjs/plugin-css@0.1.20.js'], function (_export) {
    'use strict';

    var $, WebUploader;

    _export('imageUploadeInit', imageUploadeInit);

    function imageUploadeInit($this) {
        var $form = $this.closest('form'),
            value = $this.data('value'),
            name = $this.attr('name'),
            max = $this.attr('data-max') || 1,
            _csrf = $('[name=_csrf]').val() || $('meta[name="csrf-token"]').attr('content'),
            $list = $this.prev('.uploader-list'),

        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 100 * ratio,
            thumbnailHeight = 100 * ratio;
        // Web Uploader实例
        var uploader = WebUploader.create({
            swf: '/jspm_packages/github/fex-team/webuploader@0.1.5/Uploader.swf',
            server: '/upload?_csrf=' + _csrf,
            pick: $this,
            // 自动上传。
            auto: true,
            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });

        var addInput = function addInput(thisInputName, url) {
            if (name) {
                var inputName = name;
                if (max > 1) {
                    inputName = inputName + '[' + thisInputName + ']';
                }
                var $input = $('[name="' + inputName + '"]:hidden');
                if ($input.size() === 0) {
                    $input = $('<input>');
                    $input.attr('type', 'hidden').attr('name', inputName);
                    $this.after($input);
                }
                $input.val(url);
            }
        };

        if (value) {
            var $li = $('<div class="file-item thumbnail">' + '<img>' + '<div class="info"></div>' + '</div>'),
                $img = $li.find('img');
            if (max == 1) {
                $list.empty();
            }
            $list.append($li);
            $img.attr('src', value).css({ width: thumbnailWidth, height: thumbnailHeight });
            addInput('', value);
        }

        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' + '<img>' + '<div class="info">' + file.name + '</div>' + '</div>'),
                $img = $li.find('img');
            if (max == 1) {
                $list.empty();
            }
            $list.append($li);

            // 创建缩略图
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight);
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span');
            }

            $percent.css('width', percentage * 100 + '%');
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function (file, res) {
            $('#' + file.id).addClass('upload-state-done');

            addInput($('#' + file.id).index(), res.url);
        });

        // 文件上传失败，现实上传出错。
        uploader.on('uploadError', function (file) {
            var $li = $('#' + file.id),
                $error = $li.find('div.error');

            // 避免重复创建
            if (!$error.length) {
                $error = $('<div class="error"></div>').appendTo($li);
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
        });
    }

    return {
        setters: [function (_npmJquery222Js) {
            $ = _npmJquery222Js['default'];
        }, function (_githubFexTeamWebuploader015Js) {
            WebUploader = _githubFexTeamWebuploader015Js['default'];
        }, function (_githubFexTeamWebuploader015WebuploaderCssGithubSystemjsPluginCss0120Js) {}],
        execute: function () {}
    };
});
System.register('app/ui/ui.js', ['github:twbs/bootstrap@3.3.6.js', 'app/ueditor/UeditorInit.js', 'app/uploade/ImageUploader.js'], function (_export) {
    "use strict";

    var ueditorInit, imageUploadeInit;

    _export('initUi', initUi);

    function initUi() {
        if ($('[data-ueditor]').size() > 0) {
            $('[data-ueditor]').each(function (index, t) {
                ueditorInit($(t).attr('id'));
            });
        }

        if ($('[data-uploader-pricture]').size() > 0) {
            $('[data-uploader-pricture]').each(function (index, t) {
                imageUploadeInit($(t));
            });
        }

        if ($('#editErrorModal').size() > 0) {
            $('#editErrorModal').modal('show');
        }
    }

    return {
        setters: [function (_githubTwbsBootstrap336Js) {}, function (_appUeditorUeditorInitJs) {
            ueditorInit = _appUeditorUeditorInitJs.ueditorInit;
        }, function (_appUploadeImageUploaderJs) {
            imageUploadeInit = _appUploadeImageUploaderJs.imageUploadeInit;
        }],
        execute: function () {}
    };
});
System.register('app/manage/userPage.js', ['npm:jquery@2.2.2.js'], function (_export) {
    'use strict';

    var $;

    _export('initUserPageUi', initUserPageUi);

    function initUserPageUi() {

        $('.user-role-radio').on('change', function (e) {
            var $this = $(e.currentTarget),
                $tr = $this.closest('tr');

            if ($this.prop('checked')) {
                $.post(hostPath + '/user/' + $tr.data('id') + '/' + $this.data('value') + '/changeRoleJson', {}, function (json) {
                    if (json && (json.stutas === 200 || json.stutas === '200')) {
                        alert('修改成功');
                    } else {
                        alert('修改失败,' + addJson.err_msg);
                    }
                }, 'JSON');
            }
        });

        $('.user-area-checkbox-td').each(function (i, item) {
            var $thisTd = $(item),
                $tr = $thisTd.closest('tr'),
                id = $tr.data('id'),
                $userAreaCheckbox = $('.user-area-checkbox', $thisTd);

            $.getJSON(hostPath + '/user/' + id + '/getAreaJson', function (json) {
                if (json && (json.stutas === 200 || json.stutas === '200')) {
                    if (json.list) {
                        json.list.map(function (listItem) {
                            $userAreaCheckbox.each(function (j, checkbox) {
                                var $checkbox = $(checkbox);
                                if ($checkbox.data('value') === listItem.area_id) {
                                    $checkbox.prop('checked', true);
                                }
                            });
                        });
                    }
                }
                $userAreaCheckbox.on('change', function (e) {
                    var $checkbox = $(e.currentTarget),
                        $tr = $checkbox.closest('tr'),
                        isAdd = 0;

                    if ($checkbox.prop('checked')) {
                        isAdd = 1;
                    }

                    $.post(hostPath + '/user/' + id + '/' + $checkbox.data('value') + '/' + isAdd + '/addAreaJson', {}, function (addJson) {
                        if (addJson && (addJson.stutas === 200 || addJson.stutas === '200')) {
                            alert('修改成功');
                        } else {
                            alert('修改失败,' + addJson.err_msg);
                        }
                    }, 'JSON');
                });
            });
        });
    }

    return {
        setters: [function (_npmJquery222Js) {
            $ = _npmJquery222Js['default'];
        }],
        execute: function () {}
    };
});
(function() {
var define = System.amdDefine;
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.2",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      var key;
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
        return false;
      }
      for (key in obj) {}
      return key === undefined || hasOwn.call(obj, key);
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
    if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (document.msFullscreenElement && window.top !== window) {
      if (elem.getClientRects().length) {
        val = Math.round(elem.getBoundingClientRect()[name] * 100);
      }
    }
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g,
      rspaces = /[\x20\t\r\n\f]+/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("npm:jquery@2.2.2/dist/jquery.js", [], function() {
      return jQuery;
    }), define("jquery", ["npm:jquery@2.2.2/dist/jquery.js"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

})();
(function() {
var define = System.amdDefine;
define("npm:jquery@2.2.2.js", ["npm:jquery@2.2.2/dist/jquery.js"], function(main) {
  return main;
});

})();
System.register('app/manage/themePage.js', ['npm:jquery@2.2.2.js'], function (_export) {
    'use strict';

    var $;

    _export('initThemePageUi', initThemePageUi);

    function initThemePageUi() {

        $('.new-info-div').each(function (i, item) {
            var $this = $(item),
                $btn = $('.btn', $this);

            $btn.on('click', function (e) {
                var $thisBtn = $(e.currentTarget),
                    $thisNewInfoDiv = $thisBtn.closest('.new-info-div'),
                    $formGroup = $this.closest('.form-group'),
                    $select = $('select', $formGroup),
                    name = $this.data('name'),
                    $ul = $('ul', $formGroup),
                    url = $thisNewInfoDiv.data('url'),
                    $dataName = $('[data-name]', $thisNewInfoDiv),
                    params = {};
                $dataName.map(function (i, item) {
                    var $item = $(item);
                    params[$item.data('name')] = $item.val();
                });
                console.log('params = ', params);
                if (url) {
                    $.post(url, params, function (json) {
                        if (json && (json.stutas === 200 || json.stutas === '200')) {
                            if (json.saved) {
                                var text = json.saved.name + ' ' + json.saved.avg + '/人';
                                addLi($ul, name, json.saved._id, text);
                                $select.append($('<option value="' + json.saved._id + '">' + text + '</option>'));
                                $thisNewInfoDiv.removeClass('hidden').addClass('hidden');
                            }
                            $select.val('');
                            alert('添加成功');
                        } else {
                            alert(json.err_msg);
                        }
                    }, 'JSON');
                }
            });
        });

        $('select[data-name]').on('change', function (e) {
            var $this = $(e.currentTarget),
                $selected = $('option:selected', $this),
                $formGroup = $this.closest('.form-group'),
                name = $this.data('name'),
                text = $selected.text(),
                $ul = $('ul', $formGroup),
                val = $this.val();
            if (val) {
                if (val === 'new') {
                    var $newInfoDiv = $('.new-info-div', $formGroup);
                    $newInfoDiv.removeClass('hidden');
                } else {
                    addLi($ul, name, val, text);
                    $this.val('');
                }
            }
        });

        var addLi = function addLi($ul, name, val, text) {
            if ($ul.find('input[name="' + name + '"][value="' + val + '"]').size() === 0) {
                var $newLi = newLi(name, val, text);

                var $close = $newLi.find('.close');

                $ul.append($newLi);

                $close.on('click', function (close_e) {
                    var $this_close = $(close_e.currentTarget),
                        $li = $this_close.closest('li');
                    $li.remove();
                });
            }
        };

        var newLi = function newLi(name, val, text) {
            return $('<li class="relevance-data">\n                    <input type="hidden" name="' + name + '" value="' + val + '">\n                    <span>' + text + '</span>\n                    <button class="close" type="button">\n                        <span>&times;</span>\n                    </button>\n                </li>');
        };
    }

    return {
        setters: [function (_npmJquery222Js) {
            $ = _npmJquery222Js['default'];
        }],
        execute: function () {}
    };
});
System.register('app/main.js', ['npm:jquery@2.2.2.js', 'app/ui/ui.js', 'app/manage/userPage.js', 'app/manage/themePage.js'], function (_export) {
    'use strict';

    var $, initUi, initUserPageUi, initThemePageUi;
    return {
        setters: [function (_npmJquery222Js) {
            $ = _npmJquery222Js['default'];
        }, function (_appUiUiJs) {
            initUi = _appUiUiJs.initUi;
        }, function (_appManageUserPageJs) {
            initUserPageUi = _appManageUserPageJs.initUserPageUi;
        }, function (_appManageThemePageJs) {
            initThemePageUi = _appManageThemePageJs.initThemePageUi;
        }],
        execute: function () {

            $(function () {

                initUi();
                initUserPageUi();
                initThemePageUi();
            });
        }
    };
});
System.register('app/ueditor/src/themes/default/css/umeditor.min.css!github:systemjs/plugin-css@0.1.20.js', [], false, function() {});
System.register('github:fex-team/webuploader@0.1.5/webuploader.css!github:systemjs/plugin-css@0.1.20.js', [], false, function() {});
//# sourceMappingURL=build.js.map