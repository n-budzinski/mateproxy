var mathcolor = "#575757",
  mathfontsize = "1em",
  mathfontfamily = "serif",
  automathrecognize = !1,
  checkForMathML = !0,
  notifyIfNoMathML = !0,
  alertIfNoMathML = !1,
  translateOnLoad = !0,
  translateLaTeX = !0,
  translateLaTeXformatting = !0,
  translateASCIIMath = !0,
  translateASCIIsvg = !0,
  avoidinnerHTML = !1,
  displaystyle = !0,
  showasciiformulaonhover = !0,
  decimalsign = ".",
  AMdelimiter1 = "`",
  AMescape1 = "\\\\`",
  AMdocumentId = "wikitext",
  checkforprocessasciimathinmoodle = !1,
  dsvglocation = "",
  isIE = null == document.createElementNS;
null == document.getElementById &&
  alert(
    "This webpage requires a recent browser such as\\nMozilla/Netscape 7+ or Internet Explorer 6+MathPlayer"
  );
function AMcreateElementXHTML(f) {
  return isIE
    ? document.createElement(f)
    : document.createElementNS("http://www.w3.org/1999/xhtml", f);
}
function AMnoMathMLNote() {
  var f = AMcreateElementXHTML("h3");
  f.setAttribute("align", "center");
  f.appendChild(AMcreateElementXHTML("p"));
  f.appendChild(document.createTextNode("To view the "));
  var g = AMcreateElementXHTML("a");
  g.appendChild(document.createTextNode("ASCIIMathML"));
  g.setAttribute("href", "http://www.chapman.edu/~jipsen/asciimath.html");
  f.appendChild(g);
  f.appendChild(document.createTextNode(" notation use Internet Explorer 6+"));
  g = AMcreateElementXHTML("a");
  g.appendChild(document.createTextNode("MathPlayer"));
  g.setAttribute(
    "href",
    "http://www.dessci.com/en/products/mathplayer/download.htm"
  );
  f.appendChild(g);
  f.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
  f.appendChild(AMcreateElementXHTML("p"));
  return f;
}
function AMisMathMLavailable() {
  if ("Netscape" == navigator.appName.slice(0, 8))
    return "5" <= navigator.appVersion.slice(0, 1) ? null : AMnoMathMLNote();
  if ("Microsoft" == navigator.appName.slice(0, 9))
    try {
      return new ActiveXObject("MathPlayer.Factory.1"), null;
    } catch (f) {
      return AMnoMathMLNote();
    }
  else return AMnoMathMLNote();
}
var AMcal = [
    61237, 8492, 61238, 61239, 8496, 8497, 61240, 8459, 8464, 61241, 61242,
    8466, 8499, 61243, 61244, 61245, 61246, 8475, 61247, 61248, 61249, 61250,
    61251, 61252, 61253, 61254,
  ],
  AMfrk = [
    61277, 61278, 8493, 61279, 61280, 61281, 61282, 8460, 8465, 61283, 61284,
    61285, 61286, 61287, 61288, 61289, 61290, 8476, 61291, 61292, 61293, 61294,
    61295, 61296, 61297, 8488,
  ],
  AMbbb = [
    61324, 61325, 8450, 61326, 61327, 61328, 61329, 8461, 61330, 61331, 61332,
    61333, 61334, 8469, 61335, 8473, 8474, 8477, 61336, 61337, 61338, 61339,
    61340, 61341, 61342, 8484,
  ],
  CONST = 0,
  UNARY = 1,
  BINARY = 2,
  INFIX = 3,
  LEFTBRACKET = 4,
  RIGHTBRACKET = 5,
  SPACE = 6,
  UNDEROVER = 7,
  DEFINITION = 8,
  LEFTRIGHT = 9,
  TEXT = 10,
  AMsqrt = {
    input: "sqrt",
    tag: "msqrt",
    output: "sqrt",
    tex: null,
    ttype: UNARY,
  },
  AMroot = {
    input: "root",
    tag: "mroot",
    output: "root",
    tex: null,
    ttype: BINARY,
  },
  AMfrac = {
    input: "frac",
    tag: "mfrac",
    output: "/",
    tex: null,
    ttype: BINARY,
  },
  AMdiv = { input: "/", tag: "mfrac", output: "/", tex: null, ttype: INFIX },
  AMover = {
    input: "stackrel",
    tag: "mover",
    output: "stackrel",
    tex: null,
    ttype: BINARY,
  },
  AMsub = { input: "_", tag: "msub", output: "_", tex: null, ttype: INFIX },
  AMsup = { input: "^", tag: "msup", output: "^", tex: null, ttype: INFIX },
  AMtext = {
    input: "text",
    tag: "mtext",
    output: "text",
    tex: null,
    ttype: TEXT,
  },
  AMmbox = {
    input: "mbox",
    tag: "mtext",
    output: "mbox",
    tex: null,
    ttype: TEXT,
  },
  AMquote = {
    input: '"',
    tag: "mtext",
    output: "mbox",
    tex: null,
    ttype: TEXT,
  },
  AMsymbols = [
    { input: "alpha", tag: "mi", output: "\u03b1", tex: null, ttype: CONST },
    { input: "beta", tag: "mi", output: "\u03b2", tex: null, ttype: CONST },
    { input: "chi", tag: "mi", output: "\u03c7", tex: null, ttype: CONST },
    { input: "delta", tag: "mi", output: "\u03b4", tex: null, ttype: CONST },
    { input: "Delta", tag: "mo", output: "\u0394", tex: null, ttype: CONST },
    {
      input: "epsi",
      tag: "mi",
      output: "\u03b5",
      tex: "epsilon",
      ttype: CONST,
    },
    {
      input: "varepsilon",
      tag: "mi",
      output: "\u025b",
      tex: null,
      ttype: CONST,
    },
    { input: "eta", tag: "mi", output: "\u03b7", tex: null, ttype: CONST },
    { input: "gamma", tag: "mi", output: "\u03b3", tex: null, ttype: CONST },
    { input: "Gamma", tag: "mo", output: "\u0393", tex: null, ttype: CONST },
    { input: "iota", tag: "mi", output: "\u03b9", tex: null, ttype: CONST },
    { input: "kappa", tag: "mi", output: "\u03ba", tex: null, ttype: CONST },
    { input: "lambda", tag: "mi", output: "\u03bb", tex: null, ttype: CONST },
    { input: "Lambda", tag: "mo", output: "\u039b", tex: null, ttype: CONST },
    { input: "mu", tag: "mi", output: "\u03bc", tex: null, ttype: CONST },
    { input: "nu", tag: "mi", output: "\u03bd", tex: null, ttype: CONST },
    { input: "omega", tag: "mi", output: "\u03c9", tex: null, ttype: CONST },
    { input: "Omega", tag: "mo", output: "\u03a9", tex: null, ttype: CONST },
    { input: "phi", tag: "mi", output: "\u03c6", tex: null, ttype: CONST },
    { input: "varphi", tag: "mi", output: "\u03d5", tex: null, ttype: CONST },
    { input: "Phi", tag: "mo", output: "\u03a6", tex: null, ttype: CONST },
    { input: "pi", tag: "mi", output: "\u03c0", tex: null, ttype: CONST },
    { input: "Pi", tag: "mo", output: "\u03a0", tex: null, ttype: CONST },
    { input: "psi", tag: "mi", output: "\u03c8", tex: null, ttype: CONST },
    { input: "Psi", tag: "mi", output: "\u03a8", tex: null, ttype: CONST },
    { input: "rho", tag: "mi", output: "\u03c1", tex: null, ttype: CONST },
    { input: "sigma", tag: "mi", output: "\u03c3", tex: null, ttype: CONST },
    { input: "Sigma", tag: "mo", output: "\u03a3", tex: null, ttype: CONST },
    { input: "tau", tag: "mi", output: "\u03c4", tex: null, ttype: CONST },
    { input: "theta", tag: "mi", output: "\u03b8", tex: null, ttype: CONST },
    { input: "vartheta", tag: "mi", output: "\u03d1", tex: null, ttype: CONST },
    { input: "Theta", tag: "mo", output: "\u0398", tex: null, ttype: CONST },
    { input: "upsilon", tag: "mi", output: "\u03c5", tex: null, ttype: CONST },
    { input: "xi", tag: "mi", output: "\u03be", tex: null, ttype: CONST },
    { input: "Xi", tag: "mo", output: "\u039e", tex: null, ttype: CONST },
    { input: "zeta", tag: "mi", output: "\u03b6", tex: null, ttype: CONST },
    { input: "*", tag: "mo", output: "\u22c5", tex: "cdot", ttype: CONST },
    { input: "**", tag: "mo", output: "\u22c6", tex: "star", ttype: CONST },
    { input: "//", tag: "mo", output: "/", tex: null, ttype: CONST },
    { input: "\\\\", tag: "mo", output: "\\", tex: "backslash", ttype: CONST },
    { input: "setminus", tag: "mo", output: "\\", tex: null, ttype: CONST },
    { input: "xx", tag: "mo", output: "\u00d7", tex: "times", ttype: CONST },
    { input: "-:", tag: "mo", output: "\u00f7", tex: "divide", ttype: CONST },
    { input: "@", tag: "mo", output: "\u2218", tex: "circ", ttype: CONST },
    { input: "o+", tag: "mo", output: "\u2295", tex: "oplus", ttype: CONST },
    { input: "ox", tag: "mo", output: "\u2297", tex: "otimes", ttype: CONST },
    { input: "o.", tag: "mo", output: "\u2299", tex: "odot", ttype: CONST },
    { input: "sum", tag: "mo", output: "\u2211", tex: null, ttype: UNDEROVER },
    { input: "prod", tag: "mo", output: "\u220f", tex: null, ttype: UNDEROVER },
    { input: "^^", tag: "mo", output: "\u2227", tex: "wedge", ttype: CONST },
    {
      input: "^^^",
      tag: "mo",
      output: "\u22c0",
      tex: "bigwedge",
      ttype: UNDEROVER,
    },
    { input: "vv", tag: "mo", output: "\u2228", tex: "vee", ttype: CONST },
    {
      input: "vvv",
      tag: "mo",
      output: "\u22c1",
      tex: "bigvee",
      ttype: UNDEROVER,
    },
    { input: "nn", tag: "mo", output: "\u2229", tex: "cap", ttype: CONST },
    {
      input: "nnn",
      tag: "mo",
      output: "\u22c2",
      tex: "bigcap",
      ttype: UNDEROVER,
    },
    { input: "uu", tag: "mo", output: "\u222a", tex: "cup", ttype: CONST },
    {
      input: "uuu",
      tag: "mo",
      output: "\u22c3",
      tex: "bigcup",
      ttype: UNDEROVER,
    },
    { input: "!=", tag: "mo", output: "\u2260", tex: "ne", ttype: CONST },
    { input: ":=", tag: "mo", output: ":=", tex: null, ttype: CONST },
    { input: "lt", tag: "mo", output: "<", tex: null, ttype: CONST },
    { input: "<=", tag: "mo", output: "\u2264", tex: "le", ttype: CONST },
    { input: "lt=", tag: "mo", output: "\u2264", tex: "leq", ttype: CONST },
    { input: ">=", tag: "mo", output: "\u2265", tex: "ge", ttype: CONST },
    { input: "geq", tag: "mo", output: "\u2265", tex: null, ttype: CONST },
    { input: "-<", tag: "mo", output: "\u227a", tex: "prec", ttype: CONST },
    { input: "-lt", tag: "mo", output: "\u227a", tex: null, ttype: CONST },
    { input: ">-", tag: "mo", output: "\u227b", tex: "succ", ttype: CONST },
    { input: "-<=", tag: "mo", output: "\u2aaf", tex: "preceq", ttype: CONST },
    { input: ">-=", tag: "mo", output: "\u2ab0", tex: "succeq", ttype: CONST },
    { input: "in", tag: "mo", output: "\u2208", tex: null, ttype: CONST },
    { input: "!in", tag: "mo", output: "\u2209", tex: "notin", ttype: CONST },
    { input: "sub", tag: "mo", output: "\u2282", tex: "subset", ttype: CONST },
    { input: "sup", tag: "mo", output: "\u2283", tex: "supset", ttype: CONST },
    {
      input: "sube",
      tag: "mo",
      output: "\u2286",
      tex: "subseteq",
      ttype: CONST,
    },
    {
      input: "supe",
      tag: "mo",
      output: "\u2287",
      tex: "supseteq",
      ttype: CONST,
    },
    { input: "-=", tag: "mo", output: "\u2261", tex: "equiv", ttype: CONST },
    { input: "~=", tag: "mo", output: "\u2245", tex: "cong", ttype: CONST },
    { input: "~~", tag: "mo", output: "\u2248", tex: "approx", ttype: CONST },
    { input: "prop", tag: "mo", output: "\u221d", tex: "propto", ttype: CONST },
    { input: "and", tag: "mtext", output: "and", tex: null, ttype: SPACE },
    { input: "or", tag: "mtext", output: "or", tex: null, ttype: SPACE },
    { input: "not", tag: "mo", output: "\u00ac", tex: "neg", ttype: CONST },
    { input: "=>", tag: "mo", output: "\u21d2", tex: "implies", ttype: CONST },
    { input: "if", tag: "mo", output: "if", tex: null, ttype: SPACE },
    { input: "<=>", tag: "mo", output: "\u21d4", tex: "iff", ttype: CONST },
    { input: "AA", tag: "mo", output: "\u2200", tex: "forall", ttype: CONST },
    { input: "EE", tag: "mo", output: "\u2203", tex: "exists", ttype: CONST },
    { input: "_|_", tag: "mo", output: "\u22a5", tex: "bot", ttype: CONST },
    { input: "TT", tag: "mo", output: "\u22a4", tex: "top", ttype: CONST },
    { input: "|--", tag: "mo", output: "\u22a2", tex: "vdash", ttype: CONST },
    { input: "|==", tag: "mo", output: "\u22a8", tex: "models", ttype: CONST },
    { input: "(", tag: "mo", output: "(", tex: null, ttype: LEFTBRACKET },
    { input: ")", tag: "mo", output: ")", tex: null, ttype: RIGHTBRACKET },
    { input: "[", tag: "mo", output: "[", tex: null, ttype: LEFTBRACKET },
    { input: "]", tag: "mo", output: "]", tex: null, ttype: RIGHTBRACKET },
    { input: "{", tag: "mo", output: "{", tex: null, ttype: LEFTBRACKET },
    { input: "}", tag: "mo", output: "}", tex: null, ttype: RIGHTBRACKET },
    { input: "|", tag: "mo", output: "|", tex: null, ttype: LEFTRIGHT },
    {
      input: "(:",
      tag: "mo",
      output: "\u2329",
      tex: "langle",
      ttype: LEFTBRACKET,
    },
    {
      input: ":)",
      tag: "mo",
      output: "\u232a",
      tex: "rangle",
      ttype: RIGHTBRACKET,
    },
    { input: "<<", tag: "mo", output: "\u2329", tex: null, ttype: LEFTBRACKET },
    {
      input: ">>",
      tag: "mo",
      output: "\u232a",
      tex: null,
      ttype: RIGHTBRACKET,
    },
    {
      input: "{:",
      tag: "mo",
      output: "{:",
      tex: null,
      ttype: LEFTBRACKET,
      invisible: !0,
    },
    {
      input: ":}",
      tag: "mo",
      output: ":}",
      tex: null,
      ttype: RIGHTBRACKET,
      invisible: !0,
    },
    { input: "int", tag: "mo", output: "\u222b", tex: null, ttype: CONST },
    { input: "dx", tag: "mi", output: "{:d x:}", tex: null, ttype: DEFINITION },
    { input: "dy", tag: "mi", output: "{:d y:}", tex: null, ttype: DEFINITION },
    { input: "dz", tag: "mi", output: "{:d z:}", tex: null, ttype: DEFINITION },
    { input: "dt", tag: "mi", output: "{:d t:}", tex: null, ttype: DEFINITION },
    { input: "oint", tag: "mo", output: "\u222e", tex: null, ttype: CONST },
    { input: "del", tag: "mo", output: "\u2202", tex: "partial", ttype: CONST },
    { input: "grad", tag: "mo", output: "\u2207", tex: "nabla", ttype: CONST },
    { input: "+-", tag: "mo", output: "\u00b1", tex: "pm", ttype: CONST },
    { input: "O/", tag: "mo", output: "\u2205", tex: "emptyset", ttype: CONST },
    { input: "oo", tag: "mo", output: "\u221e", tex: "infty", ttype: CONST },
    { input: "aleph", tag: "mo", output: "\u2135", tex: null, ttype: CONST },
    { input: "...", tag: "mo", output: "...", tex: "ldots", ttype: CONST },
    {
      input: ":.",
      tag: "mo",
      output: "\u2234",
      tex: "therefore",
      ttype: CONST,
    },
    { input: "/_", tag: "mo", output: "\u2220", tex: "angle", ttype: CONST },
    { input: "\\ ", tag: "mo", output: "\u00a0", tex: null, ttype: CONST },
    {
      input: "quad",
      tag: "mo",
      output: "\u00a0\u00a0",
      tex: null,
      ttype: CONST,
    },
    {
      input: "qquad",
      tag: "mo",
      output: "\u00a0\u00a0\u00a0\u00a0",
      tex: null,
      ttype: CONST,
    },
    { input: "cdots", tag: "mo", output: "\u22ef", tex: null, ttype: CONST },
    { input: "vdots", tag: "mo", output: "\u22ee", tex: null, ttype: CONST },
    { input: "ddots", tag: "mo", output: "\u22f1", tex: null, ttype: CONST },
    { input: "diamond", tag: "mo", output: "\u22c4", tex: null, ttype: CONST },
    { input: "square", tag: "mo", output: "\u25a1", tex: null, ttype: CONST },
    { input: "|__", tag: "mo", output: "\u230a", tex: "lfloor", ttype: CONST },
    { input: "__|", tag: "mo", output: "\u230b", tex: "rfloor", ttype: CONST },
    { input: "|~", tag: "mo", output: "\u2308", tex: "lceiling", ttype: CONST },
    { input: "~|", tag: "mo", output: "\u2309", tex: "rceiling", ttype: CONST },
    { input: "CC", tag: "mo", output: "\u2102", tex: null, ttype: CONST },
    { input: "NN", tag: "mo", output: "\u2115", tex: null, ttype: CONST },
    { input: "QQ", tag: "mo", output: "\u211a", tex: null, ttype: CONST },
    { input: "RR", tag: "mo", output: "\u211d", tex: null, ttype: CONST },
    { input: "ZZ", tag: "mo", output: "\u2124", tex: null, ttype: CONST },
    { input: "f", tag: "mi", output: "f", tex: null, ttype: UNARY, func: !0 },
    { input: "g", tag: "mi", output: "g", tex: null, ttype: UNARY, func: !0 },
    { input: "lim", tag: "mo", output: "lim", tex: null, ttype: UNDEROVER },
    { input: "Lim", tag: "mo", output: "Lim", tex: null, ttype: UNDEROVER },
    {
      input: "sin",
      tag: "mo",
      output: "sin",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "cos",
      tag: "mo",
      output: "cos",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "tan",
      tag: "mo",
      output: "tan",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "sinh",
      tag: "mo",
      output: "sinh",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "cosh",
      tag: "mo",
      output: "cosh",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "tanh",
      tag: "mo",
      output: "tanh",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "cot",
      tag: "mo",
      output: "cot",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "sec",
      tag: "mo",
      output: "sec",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "csc",
      tag: "mo",
      output: "csc",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "log",
      tag: "mo",
      output: "log",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    { input: "ln", tag: "mo", output: "ln", tex: null, ttype: UNARY, func: !0 },
    {
      input: "det",
      tag: "mo",
      output: "det",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    { input: "dim", tag: "mo", output: "dim", tex: null, ttype: CONST },
    { input: "mod", tag: "mo", output: "mod", tex: null, ttype: CONST },
    {
      input: "gcd",
      tag: "mo",
      output: "gcd",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    {
      input: "lcm",
      tag: "mo",
      output: "lcm",
      tex: null,
      ttype: UNARY,
      func: !0,
    },
    { input: "lub", tag: "mo", output: "lub", tex: null, ttype: CONST },
    { input: "glb", tag: "mo", output: "glb", tex: null, ttype: CONST },
    { input: "min", tag: "mo", output: "min", tex: null, ttype: UNDEROVER },
    { input: "max", tag: "mo", output: "max", tex: null, ttype: UNDEROVER },
    {
      input: "uarr",
      tag: "mo",
      output: "\u2191",
      tex: "uparrow",
      ttype: CONST,
    },
    {
      input: "darr",
      tag: "mo",
      output: "\u2193",
      tex: "downarrow",
      ttype: CONST,
    },
    {
      input: "rarr",
      tag: "mo",
      output: "\u2192",
      tex: "rightarrow",
      ttype: CONST,
    },
    { input: "->", tag: "mo", output: "\u2192", tex: "to", ttype: CONST },
    { input: "|->", tag: "mo", output: "\u21a6", tex: "mapsto", ttype: CONST },
    {
      input: "larr",
      tag: "mo",
      output: "\u2190",
      tex: "leftarrow",
      ttype: CONST,
    },
    {
      input: "harr",
      tag: "mo",
      output: "\u2194",
      tex: "leftrightarrow",
      ttype: CONST,
    },
    {
      input: "rArr",
      tag: "mo",
      output: "\u21d2",
      tex: "Rightarrow",
      ttype: CONST,
    },
    {
      input: "lArr",
      tag: "mo",
      output: "\u21d0",
      tex: "Leftarrow",
      ttype: CONST,
    },
    {
      input: "hArr",
      tag: "mo",
      output: "\u21d4",
      tex: "Leftrightarrow",
      ttype: CONST,
    },
    AMsqrt,
    AMroot,
    AMfrac,
    AMdiv,
    AMover,
    AMsub,
    AMsup,
    {
      input: "hat",
      tag: "mover",
      output: "^",
      tex: null,
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "bar",
      tag: "mover",
      output: "\u00af",
      tex: "overline",
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "vec",
      tag: "mover",
      output: "\u2192",
      tex: null,
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "dot",
      tag: "mover",
      output: ".",
      tex: null,
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "ddot",
      tag: "mover",
      output: "..",
      tex: null,
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "ul",
      tag: "munder",
      output: "\u0332",
      tex: "underline",
      ttype: UNARY,
      acc: !0,
    },
    AMtext,
    AMmbox,
    AMquote,
    {
      input: "bb",
      tag: "mstyle",
      atname: "fontweight",
      atval: "bold",
      output: "bb",
      tex: null,
      ttype: UNARY,
    },
    {
      input: "mathbf",
      tag: "mstyle",
      atname: "fontweight",
      atval: "bold",
      output: "mathbf",
      tex: null,
      ttype: UNARY,
    },
    {
      input: "sf",
      tag: "mstyle",
      atname: "fontfamily",
      atval: "sans-serif",
      output: "sf",
      tex: null,
      ttype: UNARY,
    },
    {
      input: "mathsf",
      tag: "mstyle",
      atname: "fontfamily",
      atval: "sans-serif",
      output: "mathsf",
      tex: null,
      ttype: UNARY,
    },
    {
      input: "bbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      output: "bbb",
      tex: null,
      ttype: UNARY,
      codes: AMbbb,
    },
    {
      input: "mathbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      output: "mathbb",
      tex: null,
      ttype: UNARY,
      codes: AMbbb,
    },
    {
      input: "cc",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      output: "cc",
      tex: null,
      ttype: UNARY,
      codes: AMcal,
    },
    {
      input: "mathcal",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      output: "mathcal",
      tex: null,
      ttype: UNARY,
      codes: AMcal,
    },
    {
      input: "tt",
      tag: "mstyle",
      atname: "fontfamily",
      atval: "monospace",
      output: "tt",
      tex: null,
      ttype: UNARY,
    },
    {
      input: "mathtt",
      tag: "mstyle",
      atname: "fontfamily",
      atval: "monospace",
      output: "mathtt",
      tex: null,
      ttype: UNARY,
    },
    {
      input: "fr",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      output: "fr",
      tex: null,
      ttype: UNARY,
      codes: AMfrk,
    },
    {
      input: "mathfrak",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      output: "mathfrak",
      tex: null,
      ttype: UNARY,
      codes: AMfrk,
    },
  ];
function compareNames(f, g) {
  return f.input > g.input ? 1 : -1;
}
var AMnames = [];
function AMinitSymbols() {
  var f = [],
    g;
  for (g = 0; g < AMsymbols.length; g++)
    AMsymbols[g].tex &&
      (f[f.length] = {
        input: AMsymbols[g].tex,
        tag: AMsymbols[g].tag,
        output: AMsymbols[g].output,
        ttype: AMsymbols[g].ttype,
      });
  AMsymbols = AMsymbols.concat(f);
  AMsymbols.sort(compareNames);
  for (g = 0; g < AMsymbols.length; g++) AMnames[g] = AMsymbols[g].input;
}
var AMmathml = "http://www.w3.org/1998/Math/MathML";
function AMcreateElementMathML(f) {
  return isIE
    ? document.createElement("m:" + f)
    : document.createElementNS(AMmathml, f);
}
function AMcreateMmlNode(f, g) {
  var h = isIE
    ? document.createElement("m:" + f)
    : document.createElementNS(AMmathml, f);
  h.appendChild(g);
  return h;
}
function define(f, g) {
  AMsymbols = AMsymbols.concat([
    { input: f, tag: "mo", output: g, tex: null, ttype: DEFINITION },
  ]);
  AMsymbols.sort(compareNames);
  for (i = 0; i < AMsymbols.length; i++) AMnames[i] = AMsymbols[i].input;
}
function AMremoveCharsAndBlanks(f, g) {
  var h;
  h =
    "\\" == f.charAt(g) && "\\" != f.charAt(g + 1) && " " != f.charAt(g + 1)
      ? f.slice(g + 1)
      : f.slice(g);
  for (var k = 0; k < h.length && 32 >= h.charCodeAt(k); k += 1);
  return h.slice(k);
}
function AMposition(f, g, h) {
  if (0 == h) {
    var k, l;
    h = -1;
    for (k = f.length; h + 1 < k; )
      (l = (h + k) >> 1), f[l] < g ? (h = l) : (k = l);
    return k;
  }
  for (; h < f.length && f[h] < g; h++);
  return h;
}
function AMgetSymbol(f) {
  var g = 0,
    h = 0,
    k,
    l,
    m = "";
  l = !0;
  for (var q = 1; q <= f.length && l; q++)
    (l = f.slice(0, q)),
      (h = g),
      (g = AMposition(AMnames, l, h)),
      g < AMnames.length &&
        f.slice(0, AMnames[g].length) == AMnames[g] &&
        ((m = AMnames[g]), (k = g), (q = m.length)),
      (l = g < AMnames.length && f.slice(0, AMnames[g].length) >= AMnames[g]);
  AMpreviousSymbol = AMcurrentSymbol;
  if ("" != m) return (AMcurrentSymbol = AMsymbols[k].ttype), AMsymbols[k];
  AMcurrentSymbol = CONST;
  g = 1;
  l = f.slice(0, 1);
  for (k = !0; "0" <= l && "9" >= l && g <= f.length; )
    (l = f.slice(g, g + 1)), g++;
  if (l == decimalsign && ((l = f.slice(g, g + 1)), "0" <= l && "9" >= l))
    for (k = !1, g++; "0" <= l && "9" >= l && g <= f.length; )
      (l = f.slice(g, g + 1)), g++;
  (k && 1 < g) || 2 < g
    ? ((l = f.slice(0, g - 1)), (f = "mn"))
    : ((l = f.slice(0, 1)),
      (f = ("A" > l || "Z" < l) && ("a" > l || "z" < l) ? "mo" : "mi"));
  return "-" == l && AMpreviousSymbol == INFIX
    ? ((AMcurrentSymbol = INFIX),
      { input: l, tag: f, output: l, ttype: UNARY, func: !0 })
    : { input: l, tag: f, output: l, ttype: CONST };
}
function AMremoveBrackets(f) {
  var g;
  "mrow" == f.nodeName &&
    ((g = f.firstChild.firstChild.nodeValue),
    ("(" != g && "[" != g && "{" != g) || f.removeChild(f.firstChild));
  "mrow" == f.nodeName &&
    ((g = f.lastChild.firstChild.nodeValue),
    (")" != g && "]" != g && "}" != g) || f.removeChild(f.lastChild));
}
var AMnestingDepth, AMpreviousSymbol, AMcurrentSymbol;
function AMparseSexpr(f) {
  var g,
    h,
    k,
    l,
    m,
    q = document.createDocumentFragment();
  f = AMremoveCharsAndBlanks(f, 0);
  g = AMgetSymbol(f);
  if (null == g || (g.ttype == RIGHTBRACKET && 0 < AMnestingDepth))
    return [null, f];
  g.ttype == DEFINITION &&
    ((f = g.output + AMremoveCharsAndBlanks(f, g.input.length)),
    (g = AMgetSymbol(f)));
  switch (g.ttype) {
    case UNDEROVER:
    case CONST:
      return (
        (f = AMremoveCharsAndBlanks(f, g.input.length)),
        [AMcreateMmlNode(g.tag, document.createTextNode(g.output)), f]
      );
    case LEFTBRACKET:
      return (
        AMnestingDepth++,
        (f = AMremoveCharsAndBlanks(f, g.input.length)),
        (k = AMparseExpr(f, !0)),
        AMnestingDepth--,
        "boolean" == typeof g.invisible && g.invisible
          ? (h = AMcreateMmlNode("mrow", k[0]))
          : ((h = AMcreateMmlNode("mo", document.createTextNode(g.output))),
            (h = AMcreateMmlNode("mrow", h)),
            h.appendChild(k[0])),
        [h, k[1]]
      );
    case TEXT:
      return (
        g != AMquote && (f = AMremoveCharsAndBlanks(f, g.input.length)),
        (l =
          "{" == f.charAt(0)
            ? f.indexOf("}")
            : "(" == f.charAt(0)
            ? f.indexOf(")")
            : "[" == f.charAt(0)
            ? f.indexOf("]")
            : g == AMquote
            ? f.slice(1).indexOf('"') + 1
            : 0),
        -1 == l && (l = f.length),
        (m = f.slice(1, l)),
        " " == m.charAt(0) &&
          ((h = AMcreateElementMathML("mspace")),
          h.setAttribute("width", "1ex"),
          q.appendChild(h)),
        q.appendChild(AMcreateMmlNode(g.tag, document.createTextNode(m))),
        " " == m.charAt(m.length - 1) &&
          ((h = AMcreateElementMathML("mspace")),
          h.setAttribute("width", "1ex"),
          q.appendChild(h)),
        (f = AMremoveCharsAndBlanks(f, l + 1)),
        [AMcreateMmlNode("mrow", q), f]
      );
    case UNARY:
      f = AMremoveCharsAndBlanks(f, g.input.length);
      k = AMparseSexpr(f);
      if (null == k[0])
        return [AMcreateMmlNode(g.tag, document.createTextNode(g.output)), f];
      if ("boolean" == typeof g.func && g.func) {
        m = f.charAt(0);
        if ("^" == m || "_" == m || "/" == m || "|" == m || "," == m)
          return [AMcreateMmlNode(g.tag, document.createTextNode(g.output)), f];
        h = AMcreateMmlNode(
          "mrow",
          AMcreateMmlNode(g.tag, document.createTextNode(g.output))
        );
        h.appendChild(k[0]);
        return [h, k[1]];
      }
      AMremoveBrackets(k[0]);
      if ("sqrt" == g.input) return [AMcreateMmlNode(g.tag, k[0]), k[1]];
      if ("boolean" == typeof g.acc && g.acc)
        (h = AMcreateMmlNode(g.tag, k[0])),
          h.appendChild(
            AMcreateMmlNode("mo", document.createTextNode(g.output))
          );
      else {
        if (!isIE && "zła składnia" != typeof g.codes)
          for (l = 0; l < k[0].childNodes.length; l++)
            if ("mi" == k[0].childNodes[l].nodeName || "mi" == k[0].nodeName) {
              m =
                "mi" == k[0].nodeName
                  ? k[0].firstChild.nodeValue
                  : k[0].childNodes[l].firstChild.nodeValue;
              f = [];
              for (q = 0; q < m.length; q++)
                f =
                  64 < m.charCodeAt(q) && 91 > m.charCodeAt(q)
                    ? f + String.fromCharCode(g.codes[m.charCodeAt(q) - 65])
                    : f + m.charAt(q);
              "mi" == k[0].nodeName
                ? (k[0] = AMcreateElementMathML("mo").appendChild(
                    document.createTextNode(f)
                  ))
                : k[0].replaceChild(
                    AMcreateElementMathML("mo").appendChild(
                      document.createTextNode(f)
                    ),
                    k[0].childNodes[l]
                  );
            }
        h = AMcreateMmlNode(g.tag, k[0]);
        h.setAttribute(g.atname, g.atval);
      }
      return [h, k[1]];
    case BINARY:
      f = AMremoveCharsAndBlanks(f, g.input.length);
      k = AMparseSexpr(f);
      if (null == k[0])
        return [AMcreateMmlNode("mo", document.createTextNode(g.input)), f];
      AMremoveBrackets(k[0]);
      l = AMparseSexpr(k[1]);
      if (null == l[0])
        return [AMcreateMmlNode("mo", document.createTextNode(g.input)), f];
      AMremoveBrackets(l[0]);
      ("root" != g.input && "stackrel" != g.input) || q.appendChild(l[0]);
      q.appendChild(k[0]);
      "frac" == g.input && q.appendChild(l[0]);
      return [AMcreateMmlNode(g.tag, q), l[1]];
    case INFIX:
      return (
        (f = AMremoveCharsAndBlanks(f, g.input.length)),
        [AMcreateMmlNode("mo", document.createTextNode(g.output)), f]
      );
    case SPACE:
      return (
        (f = AMremoveCharsAndBlanks(f, g.input.length)),
        (h = AMcreateElementMathML("mspace")),
        h.setAttribute("width", "1ex"),
        q.appendChild(h),
        q.appendChild(
          AMcreateMmlNode(g.tag, document.createTextNode(g.output))
        ),
        (h = AMcreateElementMathML("mspace")),
        h.setAttribute("width", "1ex"),
        q.appendChild(h),
        [AMcreateMmlNode("mrow", q), f]
      );
    case LEFTRIGHT:
      AMnestingDepth++;
      f = AMremoveCharsAndBlanks(f, g.input.length);
      k = AMparseExpr(f, !1);
      AMnestingDepth--;
      m = "";
      null != k[0].lastChild && (m = k[0].lastChild.firstChild.nodeValue);
      if ("|" == m)
        return (
          (h = AMcreateMmlNode("mo", document.createTextNode(g.output))),
          (h = AMcreateMmlNode("mrow", h)),
          h.appendChild(k[0]),
          [h, k[1]]
        );
      h = AMcreateMmlNode("mo", document.createTextNode(g.output));
      h = AMcreateMmlNode("mrow", h);
      return [h, f];
    default:
      return (
        (f = AMremoveCharsAndBlanks(f, g.input.length)),
        [AMcreateMmlNode(g.tag, document.createTextNode(g.output)), f]
      );
  }
}
function AMparseIexpr(f) {
  var g, h, k, l;
  f = AMremoveCharsAndBlanks(f, 0);
  h = AMgetSymbol(f);
  l = AMparseSexpr(f);
  k = l[0];
  f = l[1];
  g = AMgetSymbol(f);
  g.ttype == INFIX &&
    "/" != g.input &&
    ((f = AMremoveCharsAndBlanks(f, g.input.length)),
    (l = AMparseSexpr(f)),
    null == l[0]
      ? (l[0] = AMcreateMmlNode("mo", document.createTextNode("\u25a1")))
      : AMremoveBrackets(l[0]),
    (f = l[1]),
    "_" == g.input
      ? ((g = AMgetSymbol(f)),
        (h = h.ttype == UNDEROVER),
        "^" == g.input
          ? ((f = AMremoveCharsAndBlanks(f, g.input.length)),
            (g = AMparseSexpr(f)),
            AMremoveBrackets(g[0]),
            (f = g[1]),
            (k = AMcreateMmlNode(h ? "munderover" : "msubsup", k)),
            k.appendChild(l[0]),
            k.appendChild(g[0]),
            (k = AMcreateMmlNode("mrow", k)))
          : ((k = AMcreateMmlNode(h ? "munder" : "msub", k)),
            k.appendChild(l[0])))
      : ((k = AMcreateMmlNode(g.tag, k)), k.appendChild(l[0])));
  return [k, f];
}
function AMparseExpr(f, g) {
  var h,
    k,
    l,
    m = document.createDocumentFragment();
  do
    (f = AMremoveCharsAndBlanks(f, 0)),
      (l = AMparseIexpr(f)),
      (k = l[0]),
      (f = l[1]),
      (h = AMgetSymbol(f)),
      h.ttype == INFIX && "/" == h.input
        ? ((f = AMremoveCharsAndBlanks(f, h.input.length)),
          (l = AMparseIexpr(f)),
          null == l[0]
            ? (l[0] = AMcreateMmlNode("mo", document.createTextNode("\u25a1")))
            : AMremoveBrackets(l[0]),
          (f = l[1]),
          AMremoveBrackets(k),
          (k = AMcreateMmlNode(h.tag, k)),
          k.appendChild(l[0]),
          m.appendChild(k),
          (h = AMgetSymbol(f)))
        : void 0 != k && m.appendChild(k);
  while (
    ((h.ttype != RIGHTBRACKET && (h.ttype != LEFTRIGHT || g)) ||
      0 == AMnestingDepth) &&
    null != h &&
    "" != h.output
  );
  if (h.ttype == RIGHTBRACKET || h.ttype == LEFTRIGHT) {
    k = m.childNodes.length;
    if (
      0 < k &&
      "mrow" == m.childNodes[k - 1].nodeName &&
      1 < k &&
      "mo" == m.childNodes[k - 2].nodeName &&
      "," == m.childNodes[k - 2].firstChild.nodeValue
    ) {
      var q = m.childNodes[k - 1].lastChild.firstChild.nodeValue;
      if (")" == q || "]" == q) {
        var r = m.childNodes[k - 1].firstChild.firstChild.nodeValue;
        if (
          ("(" == r && ")" == q && "}" != h.output) ||
          ("[" == r && "]" == q)
        ) {
          var s = [],
            v = !0,
            w = m.childNodes.length;
          for (l = 0; v && l < w; l += 2) {
            s[l] = [];
            k = m.childNodes[l];
            v &&
              (v =
                "mrow" == k.nodeName &&
                (l == w - 1 ||
                  ("mo" == k.nextSibling.nodeName &&
                    "," == k.nextSibling.firstChild.nodeValue)) &&
                k.firstChild.firstChild.nodeValue == r &&
                k.lastChild.firstChild.nodeValue == q);
            if (v)
              for (var z = 0; z < k.childNodes.length; z++)
                "," == k.childNodes[z].firstChild.nodeValue &&
                  (s[l][s[l].length] = z);
            v && 1 < l && (v = s[l].length == s[l - 2].length);
          }
          if (v) {
            var A,
              B = document.createDocumentFragment();
            for (l = 0; l < w; l += 2) {
              q = document.createDocumentFragment();
              r = document.createDocumentFragment();
              k = m.firstChild;
              v = k.childNodes.length;
              A = 0;
              k.removeChild(k.firstChild);
              for (z = 1; z < v - 1; z++)
                "zła składnia" != typeof s[l][A] && z == s[l][A]
                  ? (k.removeChild(k.firstChild),
                    q.appendChild(AMcreateMmlNode("mtd", r)),
                    A++)
                  : r.appendChild(k.firstChild);
              q.appendChild(AMcreateMmlNode("mtd", r));
              2 < m.childNodes.length &&
                (m.removeChild(m.firstChild), m.removeChild(m.firstChild));
              B.appendChild(AMcreateMmlNode("mtr", q));
            }
            k = AMcreateMmlNode("mtable", B);
            "boolean" == typeof h.invisible &&
              h.invisible &&
              k.setAttribute("columnalign", "left");
            m.replaceChild(k, m.firstChild);
          }
        }
      }
    }
    f = AMremoveCharsAndBlanks(f, h.input.length);
    ("boolean" == typeof h.invisible && h.invisible) ||
      ((k = AMcreateMmlNode("mo", document.createTextNode(h.output))),
      m.appendChild(k));
  }
  return [m, f];
}
function AMparseMath(f) {
  var g = AMcreateElementMathML("mstyle");
  "" != mathcolor && g.setAttribute("mathcolor", mathcolor);
  displaystyle && g.setAttribute("displaystyle", "true");
  "" != mathfontfamily && g.setAttribute("fontfamily", mathfontfamily);
  AMnestingDepth = 0;
  g.appendChild(AMparseExpr(f.replace(/^\s+/g, ""), !1)[0]);
  g = AMcreateMmlNode("math", g);
  showasciiformulaonhover && g.setAttribute("title", f.replace(/\s+/g, " "));
  f = AMcreateElementXHTML("span");
  f.style.fontSize = mathfontsize;
  "" != mathfontfamily && (f.style.fontFamily = mathfontfamily);
  f.appendChild(g);
  return f;
}
function AMstrarr2docFrag(f, g) {
  for (
    var h = document.createDocumentFragment(), k = !1, l = 0;
    l < f.length;
    l++
  ) {
    if (k) h.appendChild(AMparseMath(f[l]));
    else {
      var m = g ? f[l].split("\n\n") : [f[l]];
      h.appendChild(
        AMcreateElementXHTML("span").appendChild(document.createTextNode(m[0]))
      );
      for (var q = 1; q < m.length; q++)
        h.appendChild(AMcreateElementXHTML("p")),
          h.appendChild(
            AMcreateElementXHTML("span").appendChild(
              document.createTextNode(m[q])
            )
          );
    }
    k = !k;
  }
  return h;
}
function AMautomathrec(f) {
  f = f.replace(
    RegExp(
      "(^|\\s)((([a-zA-HJ-Z](?=(?:[^a-zA-Z]|$|\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|\\b(?:sum|ox|log|sin|tan|dim|hat|bar|dot)(?![a-z])|NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta))|\\\\[a-zA-Z]+|\\\\\\s|\\d+|[-()[\\]{}+=*&^_%@/<>,\\|!:;'~]|\\.(?!(?: |$))|\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|\\b(?:sum|ox|log|sin|tan|dim|hat|bar|dot)(?![a-z])|NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta)\\s?)(([a-zA-HJ-Z](?=(?:[^a-zA-Z]|$|\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|\\b(?:sum|ox|log|sin|tan|dim|hat|bar|dot)(?![a-z])|NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta))|\\\\[a-zA-Z]+|\\\\\\s|\\d+|[-()[\\]{}+=*&^_%@/<>,\\|!:;'~]|\\.(?!(?: |$))|\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|\\b(?:sum|ox|log|sin|tan|dim|hat|bar|dot)(?![a-z])|NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta|\\bI\\b|\\bin\\b|\\btext\\b)\\s?)+)([,.?]?(?=\\s|$))",
      "g"
    ),
    " `$2`$7"
  );
  f = f.split(AMdelimiter1);
  var g = RegExp(
      "(^|\\s)([b-zB-HJ-Z+*<>]|\\\\[a-zA-Z]+|\\\\\\s|\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta)(\\s|\\n|$)",
      "g"
    ),
    h = RegExp(
      "(^|\\s)([a-z]|\\\\[a-zA-Z]+|\\\\\\s|\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta)([,.])",
      "g"
    );
  for (i = 0; i < f.length; i++)
    0 == i % 2 &&
      ((f[i] = f[i].replace(g, " `$2`$3")),
      (f[i] = f[i].replace(h, " `$2`$3")),
      (f[i] = f[i].replace(/([{}[\]])/, "`$1`")));
  f = f.join(AMdelimiter1);
  f = f.replace(/(\([a-zA-Z]{2,}.*?)\)`/g, "$1`)");
  f = f.replace(/`(\((a\s|in\s))(.*?[a-zA-Z]{2,}\))/g, "$1`$3");
  f = f.replace(/\sin`/g, "` in");
  f = f.replace(/`(\(\w\)[,.]?(\s|\n|$))/g, "$1`");
  f = f.replace(/`([0-9.]+|e.g)`(\\.)/gi, "$1$2");
  return (f = f.replace(/`([0-9.]:)`/g, "$1"));
}
function AMprocessNodeR(f, g) {
  var h, k, l;
  if (0 == f.childNodes.length) {
    if (
      (8 != f.nodeType || g) &&
      "form" != f.parentNode.nodeName &&
      "FORM" != f.parentNode.nodeName &&
      "textarea" != f.parentNode.nodeName &&
      "TEXTAREA" != f.parentNode.nodeName &&
      "pre" != f.parentNode.nodeName &&
      "PRE" != f.parentNode.nodeName &&
      ((k = f.nodeValue), null != k)
    ) {
      k = k.replace(/\r\n\r\n/g, "\n\n");
      k = k.replace(/\x20+/g, " ");
      k = k.replace(/\s*\r\n/g, " ");
      h = !1;
      k = k.replace(RegExp(AMescape1, "g"), function () {
        h = !0;
        return "AMescape1";
      });
      k = k.replace(/\\?end{?a?math}?/i, function () {
        automathrecognize = !1;
        h = !0;
        return "";
      });
      k = k.replace(/amath|\\begin{a?math}/i, function () {
        h = automathrecognize = !0;
        return "";
      });
      k = k.split(AMdelimiter1);
      if (automathrecognize)
        for (l = 0; l < k.length; l++)
          0 == l % 2 && (k[l] = AMautomathrec(k[l]));
      k = k.join(AMdelimiter1);
      k = k.split(AMdelimiter1);
      for (l = 0; l < k.length; l++)
        k[l] = k[l].replace(/AMescape1/g, AMdelimiter1);
      if (1 < k.length || h)
        if (
          (checkForMathML &&
            ((checkForMathML = !1),
            (l = AMisMathMLavailable()),
            (AMnoMathML = null != l) &&
              notifyIfNoMathML &&
              (alertIfNoMathML
                ? alert(
                    "To view the ASCIIMathML notation use Internet Explorer 6 +\nMathPlayer (free from www.dessci.com)\nor Firefox/Mozilla/Netscape"
                  )
                : AMbody.insertBefore(l, AMbody.childNodes[0]))),
          !AMnoMathML)
        )
          return (
            (k = AMstrarr2docFrag(k, 8 == f.nodeType)),
            (l = k.childNodes.length),
            f.parentNode.replaceChild(k, f),
            l - 1
          );
    }
  } else if ("math" != f.nodeName)
    for (l = 0; l < f.childNodes.length; l++)
      l += AMprocessNodeR(f.childNodes[l], g);
  return 0;
}
function AMprocessNode(f, g, h) {
  var k;
  if (null != h)
    for (f = document.getElementsByTagName("span"), h = 0; h < f.length; h++)
      "AM" == f[h].className && AMprocessNodeR(f[h], g);
  else {
    try {
      k = f.innerHTML;
    } catch (l) {}
    (null == k ||
      /amath|\\begin{a?math}/i.test(k) ||
      -1 != k.indexOf(AMdelimiter1 + " ") ||
      k.slice(-1) == AMdelimiter1 ||
      -1 != k.indexOf(AMdelimiter1 + "<") ||
      -1 != k.indexOf(AMdelimiter1 + "\n")) &&
      AMprocessNodeR(f, g);
  }
  if (isIE)
    for (f = document.getElementsByTagName("math"), h = 0; h < f.length; h++)
      f[h].update();
}
var AMbody,
  AMnoMathML = !1,
  AMtranslated = !1;
function translate(f) {
  if (!AMtranslated) {
    AMtranslated = !0;
    AMbody = document.getElementsByTagName("body")[0];
    var g = document.getElementById(AMdocumentId);
    AMprocessNode(null != g ? g : AMbody, !1, f);
  }
}
AMinitSymbols();
var LMcheckForMathML = !0,
  LMnotifyIfNoMathML = !0,
  LMalertIfNoMathML = !1,
  LMmathcolor = "",
  LMmathfontfamily = "serif",
  LMshowasciiformulaonhover = !0;
function LMcreateElementXHTML(f) {
  return isIE
    ? document.createElement(f)
    : document.createElementNS("http://www.w3.org/1999/xhtml", f);
}
function LMnoMathMLNote() {
  var f = LMcreateElementXHTML("h3");
  f.setAttribute("align", "center");
  f.appendChild(LMcreateElementXHTML("p"));
  f.appendChild(document.createTextNode("To view the "));
  var g = LMcreateElementXHTML("a");
  g.appendChild(document.createTextNode("LaTeXMathML"));
  g.setAttribute("href", "http://www.maths.nott.ac.uk/personal/drw/lm.html");
  f.appendChild(g);
  f.appendChild(document.createTextNode(" notation use Internet Explorer 6+"));
  g = LMcreateElementXHTML("a");
  g.appendChild(document.createTextNode("MathPlayer"));
  g.setAttribute(
    "href",
    "http://www.dessci.com/en/products/mathplayer/download.htm"
  );
  f.appendChild(g);
  f.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
  f.appendChild(LMcreateElementXHTML("p"));
  return f;
}
function LMisMathMLavailable() {
  if ("Netscape" == navigator.appName.slice(0, 8))
    return "5" <= navigator.appVersion.slice(0, 1) ? null : LMnoMathMLNote();
  if ("Microsoft" == navigator.appName.slice(0, 9))
    try {
      return new ActiveXObject("MathPlayer.Factory.1"), null;
    } catch (f) {
      return LMnoMathMLNote();
    }
  else return LMnoMathMLNote();
}
var LMcal = [
    61237, 8492, 61238, 61239, 8496, 8497, 61240, 8459, 8464, 61241, 61242,
    8466, 8499, 61243, 61244, 61245, 61246, 8475, 61247, 61248, 61249, 61250,
    61251, 61252, 61253, 61254,
  ],
  LMfrk = [
    61277, 61278, 8493, 61279, 61280, 61281, 61282, 8460, 8465, 61283, 61284,
    61285, 61286, 61287, 61288, 61289, 61290, 8476, 61291, 61292, 61293, 61294,
    61295, 61296, 61297, 8488,
  ],
  LMbbb = [
    61324, 61325, 8450, 61326, 61327, 61328, 61329, 8461, 61330, 61331, 61332,
    61333, 61334, 8469, 61335, 8473, 8474, 8477, 61336, 61337, 61338, 61339,
    61340, 61341, 61342, 8484,
  ],
  BIG = 11,
  LONG = 12,
  STRETCHY = 13,
  MATRIX = 14,
  LMsqrt = { input: "\\sqrt", tag: "msqrt", output: "sqrt", ttype: UNARY },
  LMroot = { input: "\\root", tag: "mroot", output: "root", ttype: BINARY },
  LMfrac = { input: "\\frac", tag: "mfrac", output: "/", ttype: BINARY },
  LMover = {
    input: "\\stackrel",
    tag: "mover",
    output: "stackrel",
    ttype: BINARY,
  },
  LMatop = { input: "\\atop", tag: "mfrac", output: "", ttype: INFIX },
  LMchoose = { input: "\\choose", tag: "mfrac", output: "", ttype: INFIX },
  LMsub = { input: "_", tag: "msub", output: "_", ttype: INFIX },
  LMsup = { input: "^", tag: "msup", output: "^", ttype: INFIX },
  LMtext = { input: "\\mathrm", tag: "mtext", output: "text", ttype: TEXT },
  LMmbox = { input: "\\mbox", tag: "mtext", output: "mbox", ttype: TEXT },
  LMsymbols = [
    { input: "\\alpha", tag: "mi", output: "\u03b1", ttype: CONST },
    { input: "\\beta", tag: "mi", output: "\u03b2", ttype: CONST },
    { input: "\\gamma", tag: "mi", output: "\u03b3", ttype: CONST },
    { input: "\\delta", tag: "mi", output: "\u03b4", ttype: CONST },
    { input: "\\epsilon", tag: "mi", output: "\u03b5", ttype: CONST },
    { input: "\\varepsilon", tag: "mi", output: "\u025b", ttype: CONST },
    { input: "\\zeta", tag: "mi", output: "\u03b6", ttype: CONST },
    { input: "\\eta", tag: "mi", output: "\u03b7", ttype: CONST },
    { input: "\\theta", tag: "mi", output: "\u03b8", ttype: CONST },
    { input: "\\vartheta", tag: "mi", output: "\u03d1", ttype: CONST },
    { input: "\\iota", tag: "mi", output: "\u03b9", ttype: CONST },
    { input: "\\kappa", tag: "mi", output: "\u03ba", ttype: CONST },
    { input: "\\lambda", tag: "mi", output: "\u03bb", ttype: CONST },
    { input: "\\mu", tag: "mi", output: "\u03bc", ttype: CONST },
    { input: "\\nu", tag: "mi", output: "\u03bd", ttype: CONST },
    { input: "\\xi", tag: "mi", output: "\u03be", ttype: CONST },
    { input: "\\pi", tag: "mi", output: "\u03c0", ttype: CONST },
    { input: "\\varpi", tag: "mi", output: "\u03d6", ttype: CONST },
    { input: "\\rho", tag: "mi", output: "\u03c1", ttype: CONST },
    { input: "\\varrho", tag: "mi", output: "\u03f1", ttype: CONST },
    { input: "\\varsigma", tag: "mi", output: "\u03c2", ttype: CONST },
    { input: "\\sigma", tag: "mi", output: "\u03c3", ttype: CONST },
    { input: "\\tau", tag: "mi", output: "\u03c4", ttype: CONST },
    { input: "\\upsilon", tag: "mi", output: "\u03c5", ttype: CONST },
    { input: "\\phi", tag: "mi", output: "\u03c6", ttype: CONST },
    { input: "\\varphi", tag: "mi", output: "\u03d5", ttype: CONST },
    { input: "\\chi", tag: "mi", output: "\u03c7", ttype: CONST },
    { input: "\\psi", tag: "mi", output: "\u03c8", ttype: CONST },
    { input: "\\omega", tag: "mi", output: "\u03c9", ttype: CONST },
    { input: "\\Gamma", tag: "mo", output: "\u0393", ttype: CONST },
    { input: "\\Delta", tag: "mo", output: "\u0394", ttype: CONST },
    { input: "\\Theta", tag: "mo", output: "\u0398", ttype: CONST },
    { input: "\\Lambda", tag: "mo", output: "\u039b", ttype: CONST },
    { input: "\\Xi", tag: "mo", output: "\u039e", ttype: CONST },
    { input: "\\Pi", tag: "mo", output: "\u03a0", ttype: CONST },
    { input: "\\Sigma", tag: "mo", output: "\u03a3", ttype: CONST },
    { input: "\\Upsilon", tag: "mo", output: "\u03a5", ttype: CONST },
    { input: "\\Phi", tag: "mo", output: "\u03a6", ttype: CONST },
    { input: "\\Psi", tag: "mo", output: "\u03a8", ttype: CONST },
    { input: "\\Omega", tag: "mo", output: "\u03a9", ttype: CONST },
    { input: "\\frac12", tag: "mo", output: "\u00bd", ttype: CONST },
    { input: "\\frac14", tag: "mo", output: "\u00bc", ttype: CONST },
    { input: "\\frac34", tag: "mo", output: "\u00be", ttype: CONST },
    { input: "\\frac13", tag: "mo", output: "\u2153", ttype: CONST },
    { input: "\\frac23", tag: "mo", output: "\u2154", ttype: CONST },
    { input: "\\frac15", tag: "mo", output: "\u2155", ttype: CONST },
    { input: "\\frac25", tag: "mo", output: "\u2156", ttype: CONST },
    { input: "\\frac35", tag: "mo", output: "\u2157", ttype: CONST },
    { input: "\\frac45", tag: "mo", output: "\u2158", ttype: CONST },
    { input: "\\frac16", tag: "mo", output: "\u2159", ttype: CONST },
    { input: "\\frac56", tag: "mo", output: "\u215a", ttype: CONST },
    { input: "\\frac18", tag: "mo", output: "\u215b", ttype: CONST },
    { input: "\\frac38", tag: "mo", output: "\u215c", ttype: CONST },
    { input: "\\frac58", tag: "mo", output: "\u215d", ttype: CONST },
    { input: "\\frac78", tag: "mo", output: "\u215e", ttype: CONST },
    { input: "\\pm", tag: "mo", output: "\u00b1", ttype: CONST },
    { input: "\\mp", tag: "mo", output: "\u2213", ttype: CONST },
    { input: "\\triangleleft", tag: "mo", output: "\u22b2", ttype: CONST },
    { input: "\\triangleright", tag: "mo", output: "\u22b3", ttype: CONST },
    { input: "\\cdot", tag: "mo", output: "\u22c5", ttype: CONST },
    { input: "\\star", tag: "mo", output: "\u22c6", ttype: CONST },
    { input: "\\ast", tag: "mo", output: "*", ttype: CONST },
    { input: "\\times", tag: "mo", output: "\u00d7", ttype: CONST },
    { input: "\\div", tag: "mo", output: "\u00f7", ttype: CONST },
    { input: "\\circ", tag: "mo", output: "\u2218", ttype: CONST },
    { input: "\\bullet", tag: "mo", output: "\u2022", ttype: CONST },
    { input: "\\oplus", tag: "mo", output: "\u2295", ttype: CONST },
    { input: "\\ominus", tag: "mo", output: "\u2296", ttype: CONST },
    { input: "\\otimes", tag: "mo", output: "\u2297", ttype: CONST },
    { input: "\\bigcirc", tag: "mo", output: "\u25cb", ttype: CONST },
    { input: "\\oslash", tag: "mo", output: "\u2298", ttype: CONST },
    { input: "\\odot", tag: "mo", output: "\u2299", ttype: CONST },
    { input: "\\land", tag: "mo", output: "\u2227", ttype: CONST },
    { input: "\\wedge", tag: "mo", output: "\u2227", ttype: CONST },
    { input: "\\lor", tag: "mo", output: "\u2228", ttype: CONST },
    { input: "\\vee", tag: "mo", output: "\u2228", ttype: CONST },
    { input: "\\cap", tag: "mo", output: "\u2229", ttype: CONST },
    { input: "\\cup", tag: "mo", output: "\u222a", ttype: CONST },
    { input: "\\sqcap", tag: "mo", output: "\u2293", ttype: CONST },
    { input: "\\sqcup", tag: "mo", output: "\u2294", ttype: CONST },
    { input: "\\uplus", tag: "mo", output: "\u228e", ttype: CONST },
    { input: "\\amalg", tag: "mo", output: "\u2210", ttype: CONST },
    { input: "\\bigtriangleup", tag: "mo", output: "\u25b3", ttype: CONST },
    { input: "\\bigtriangledown", tag: "mo", output: "\u25bd", ttype: CONST },
    { input: "\\dag", tag: "mo", output: "\u2020", ttype: CONST },
    { input: "\\dagger", tag: "mo", output: "\u2020", ttype: CONST },
    { input: "\\ddag", tag: "mo", output: "\u2021", ttype: CONST },
    { input: "\\ddagger", tag: "mo", output: "\u2021", ttype: CONST },
    { input: "\\lhd", tag: "mo", output: "\u22b2", ttype: CONST },
    { input: "\\rhd", tag: "mo", output: "\u22b3", ttype: CONST },
    { input: "\\unlhd", tag: "mo", output: "\u22b4", ttype: CONST },
    { input: "\\unrhd", tag: "mo", output: "\u22b5", ttype: CONST },
    { input: "\\sum", tag: "mo", output: "\u2211", ttype: UNDEROVER },
    { input: "\\prod", tag: "mo", output: "\u220f", ttype: UNDEROVER },
    { input: "\\bigcap", tag: "mo", output: "\u22c2", ttype: UNDEROVER },
    { input: "\\bigcup", tag: "mo", output: "\u22c3", ttype: UNDEROVER },
    { input: "\\bigwedge", tag: "mo", output: "\u22c0", ttype: UNDEROVER },
    { input: "\\bigvee", tag: "mo", output: "\u22c1", ttype: UNDEROVER },
    { input: "\\bigsqcap", tag: "mo", output: "\u2a05", ttype: UNDEROVER },
    { input: "\\bigsqcup", tag: "mo", output: "\u2a06", ttype: UNDEROVER },
    { input: "\\coprod", tag: "mo", output: "\u2210", ttype: UNDEROVER },
    { input: "\\bigoplus", tag: "mo", output: "\u2a01", ttype: UNDEROVER },
    { input: "\\bigotimes", tag: "mo", output: "\u2a02", ttype: UNDEROVER },
    { input: "\\bigodot", tag: "mo", output: "\u2a00", ttype: UNDEROVER },
    { input: "\\biguplus", tag: "mo", output: "\u2a04", ttype: UNDEROVER },
    { input: "\\int", tag: "mo", output: "\u222b", ttype: CONST },
    { input: "\\oint", tag: "mo", output: "\u222e", ttype: CONST },
    { input: ":=", tag: "mo", output: ":=", ttype: CONST },
    { input: "\\lt", tag: "mo", output: "<", ttype: CONST },
    { input: "\\gt", tag: "mo", output: ">", ttype: CONST },
    { input: "\\ne", tag: "mo", output: "\u2260", ttype: CONST },
    { input: "\\neq", tag: "mo", output: "\u2260", ttype: CONST },
    { input: "\\le", tag: "mo", output: "\u2264", ttype: CONST },
    { input: "\\leq", tag: "mo", output: "\u2264", ttype: CONST },
    { input: "\\leqslant", tag: "mo", output: "\u2264", ttype: CONST },
    { input: "\\ge", tag: "mo", output: "\u2265", ttype: CONST },
    { input: "\\geq", tag: "mo", output: "\u2265", ttype: CONST },
    { input: "\\geqslant", tag: "mo", output: "\u2265", ttype: CONST },
    { input: "\\equiv", tag: "mo", output: "\u2261", ttype: CONST },
    { input: "\\ll", tag: "mo", output: "\u226a", ttype: CONST },
    { input: "\\gg", tag: "mo", output: "\u226b", ttype: CONST },
    { input: "\\doteq", tag: "mo", output: "\u2250", ttype: CONST },
    { input: "\\prec", tag: "mo", output: "\u227a", ttype: CONST },
    { input: "\\succ", tag: "mo", output: "\u227b", ttype: CONST },
    { input: "\\preceq", tag: "mo", output: "\u227c", ttype: CONST },
    { input: "\\succeq", tag: "mo", output: "\u227d", ttype: CONST },
    { input: "\\subset", tag: "mo", output: "\u2282", ttype: CONST },
    { input: "\\supset", tag: "mo", output: "\u2283", ttype: CONST },
    { input: "\\subseteq", tag: "mo", output: "\u2286", ttype: CONST },
    { input: "\\supseteq", tag: "mo", output: "\u2287", ttype: CONST },
    { input: "\\sqsubset", tag: "mo", output: "\u228f", ttype: CONST },
    { input: "\\sqsupset", tag: "mo", output: "\u2290", ttype: CONST },
    { input: "\\sqsubseteq", tag: "mo", output: "\u2291", ttype: CONST },
    { input: "\\sqsupseteq", tag: "mo", output: "\u2292", ttype: CONST },
    { input: "\\sim", tag: "mo", output: "\u223c", ttype: CONST },
    { input: "\\simeq", tag: "mo", output: "\u2243", ttype: CONST },
    { input: "\\approx", tag: "mo", output: "\u2248", ttype: CONST },
    { input: "\\cong", tag: "mo", output: "\u2245", ttype: CONST },
    { input: "\\Join", tag: "mo", output: "\u22c8", ttype: CONST },
    { input: "\\bowtie", tag: "mo", output: "\u22c8", ttype: CONST },
    { input: "\\in", tag: "mo", output: "\u2208", ttype: CONST },
    { input: "\\ni", tag: "mo", output: "\u220b", ttype: CONST },
    { input: "\\owns", tag: "mo", output: "\u220b", ttype: CONST },
    { input: "\\propto", tag: "mo", output: "\u221d", ttype: CONST },
    { input: "\\vdash", tag: "mo", output: "\u22a2", ttype: CONST },
    { input: "\\dashv", tag: "mo", output: "\u22a3", ttype: CONST },
    { input: "\\models", tag: "mo", output: "\u22a8", ttype: CONST },
    { input: "\\perp", tag: "mo", output: "\u22a5", ttype: CONST },
    { input: "\\smile", tag: "mo", output: "\u2323", ttype: CONST },
    { input: "\\frown", tag: "mo", output: "\u2322", ttype: CONST },
    { input: "\\asymp", tag: "mo", output: "\u224d", ttype: CONST },
    { input: "\\notin", tag: "mo", output: "\u2209", ttype: CONST },
    { input: "\\begin{eqnarray}", output: "X", ttype: MATRIX, invisible: !0 },
    { input: "\\begin{array}", output: "X", ttype: MATRIX, invisible: !0 },
    { input: "\\\\", output: "}&{", ttype: DEFINITION },
    { input: "\\end{eqnarray}", output: "}}", ttype: DEFINITION },
    { input: "\\end{array}", output: "}}", ttype: DEFINITION },
    {
      input: "\\big",
      tag: "mo",
      output: "X",
      atval: "1.2",
      ieval: "2.2",
      ttype: BIG,
    },
    {
      input: "\\Big",
      tag: "mo",
      output: "X",
      atval: "1.6",
      ieval: "2.6",
      ttype: BIG,
    },
    {
      input: "\\bigg",
      tag: "mo",
      output: "X",
      atval: "2.2",
      ieval: "3.2",
      ttype: BIG,
    },
    {
      input: "\\Bigg",
      tag: "mo",
      output: "X",
      atval: "2.9",
      ieval: "3.9",
      ttype: BIG,
    },
    { input: "\\left", tag: "mo", output: "X", ttype: LEFTBRACKET },
    { input: "\\right", tag: "mo", output: "X", ttype: RIGHTBRACKET },
    { input: "{", output: "{", ttype: LEFTBRACKET, invisible: !0 },
    { input: "}", output: "}", ttype: RIGHTBRACKET, invisible: !0 },
    { input: "(", tag: "mo", output: "(", atval: "1", ttype: STRETCHY },
    { input: "[", tag: "mo", output: "[", atval: "1", ttype: STRETCHY },
    { input: "\\lbrack", tag: "mo", output: "[", atval: "1", ttype: STRETCHY },
    { input: "\\{", tag: "mo", output: "{", atval: "1", ttype: STRETCHY },
    { input: "\\lbrace", tag: "mo", output: "{", atval: "1", ttype: STRETCHY },
    {
      input: "\\langle",
      tag: "mo",
      output: "\u2329",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\lfloor",
      tag: "mo",
      output: "\u230a",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\lceil",
      tag: "mo",
      output: "\u2308",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: ")",
      tag: "mo",
      output: ")",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "]",
      tag: "mo",
      output: "]",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\rbrack",
      tag: "mo",
      output: "]",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\}",
      tag: "mo",
      output: "}",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\rbrace",
      tag: "mo",
      output: "}",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\rangle",
      tag: "mo",
      output: "\u232a",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\rfloor",
      tag: "mo",
      output: "\u230b",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\rceil",
      tag: "mo",
      output: "\u2309",
      rtag: "mi",
      atval: "1",
      ttype: STRETCHY,
    },
    { input: "|", tag: "mo", output: "\u2223", atval: "1", ttype: STRETCHY },
    { input: "\\|", tag: "mo", output: "\u2225", atval: "1", ttype: STRETCHY },
    {
      input: "\\vert",
      tag: "mo",
      output: "\u2223",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\Vert",
      tag: "mo",
      output: "\u2225",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\mid",
      tag: "mo",
      output: "\u2223",
      atval: "1",
      ttype: STRETCHY,
    },
    {
      input: "\\parallel",
      tag: "mo",
      output: "\u2225",
      atval: "1",
      ttype: STRETCHY,
    },
    { input: "/", tag: "mo", output: "/", atval: "1.01", ttype: STRETCHY },
    {
      input: "\\backslash",
      tag: "mo",
      output: "\u2216",
      atval: "1",
      ttype: STRETCHY,
    },
    { input: "\\setminus", tag: "mo", output: "\\", ttype: CONST },
    {
      input: "\\!",
      tag: "mspace",
      atname: "width",
      atval: "-0.167em",
      ttype: SPACE,
    },
    {
      input: "\\,",
      tag: "mspace",
      atname: "width",
      atval: "0.167em",
      ttype: SPACE,
    },
    {
      input: "\\>",
      tag: "mspace",
      atname: "width",
      atval: "0.222em",
      ttype: SPACE,
    },
    {
      input: "\\:",
      tag: "mspace",
      atname: "width",
      atval: "0.222em",
      ttype: SPACE,
    },
    {
      input: "\\;",
      tag: "mspace",
      atname: "width",
      atval: "0.278em",
      ttype: SPACE,
    },
    {
      input: "~",
      tag: "mspace",
      atname: "width",
      atval: "0.333em",
      ttype: SPACE,
    },
    {
      input: "\\quad",
      tag: "mspace",
      atname: "width",
      atval: "1em",
      ttype: SPACE,
    },
    {
      input: "\\qquad",
      tag: "mspace",
      atname: "width",
      atval: "2em",
      ttype: SPACE,
    },
    { input: "\\prime", tag: "mo", output: "\u2032", ttype: CONST },
    { input: "'", tag: "mo", output: "\u02b9", ttype: CONST },
    { input: "''", tag: "mo", output: "\u02ba", ttype: CONST },
    { input: "'''", tag: "mo", output: "\u2034", ttype: CONST },
    { input: "''''", tag: "mo", output: "\u2057", ttype: CONST },
    { input: "\\ldots", tag: "mo", output: "\u2026", ttype: CONST },
    { input: "\\cdots", tag: "mo", output: "\u22ef", ttype: CONST },
    { input: "\\vdots", tag: "mo", output: "\u22ee", ttype: CONST },
    { input: "\\ddots", tag: "mo", output: "\u22f1", ttype: CONST },
    { input: "\\forall", tag: "mo", output: "\u2200", ttype: CONST },
    { input: "\\exists", tag: "mo", output: "\u2203", ttype: CONST },
    { input: "\\Re", tag: "mo", output: "\u211c", ttype: CONST },
    { input: "\\Im", tag: "mo", output: "\u2111", ttype: CONST },
    { input: "\\aleph", tag: "mo", output: "\u2135", ttype: CONST },
    { input: "\\hbar", tag: "mo", output: "\u210f", ttype: CONST },
    { input: "\\ell", tag: "mo", output: "\u2113", ttype: CONST },
    { input: "\\wp", tag: "mo", output: "\u2118", ttype: CONST },
    { input: "\\emptyset", tag: "mo", output: "\u2205", ttype: CONST },
    { input: "\\infty", tag: "mo", output: "\u221e", ttype: CONST },
    { input: "\\surd", tag: "mo", output: "\\sqrt{}", ttype: DEFINITION },
    { input: "\\partial", tag: "mo", output: "\u2202", ttype: CONST },
    { input: "\\nabla", tag: "mo", output: "\u2207", ttype: CONST },
    { input: "\\triangle", tag: "mo", output: "\u25b3", ttype: CONST },
    { input: "\\therefore", tag: "mo", output: "\u2234", ttype: CONST },
    { input: "\\angle", tag: "mo", output: "\u2220", ttype: CONST },
    { input: "\\diamond", tag: "mo", output: "\u22c4", ttype: CONST },
    { input: "\\Diamond", tag: "mo", output: "\u25c7", ttype: CONST },
    { input: "\\neg", tag: "mo", output: "\u00ac", ttype: CONST },
    { input: "\\lnot", tag: "mo", output: "\u00ac", ttype: CONST },
    { input: "\\bot", tag: "mo", output: "\u22a5", ttype: CONST },
    { input: "\\top", tag: "mo", output: "\u22a4", ttype: CONST },
    { input: "\\square", tag: "mo", output: "\u25ab", ttype: CONST },
    { input: "\\Box", tag: "mo", output: "\u25a1", ttype: CONST },
    { input: "\\wr", tag: "mo", output: "\u2240", ttype: CONST },
    { input: "\\arccos", tag: "mi", output: "arccos", ttype: UNARY, func: !0 },
    { input: "\\arcsin", tag: "mi", output: "arcsin", ttype: UNARY, func: !0 },
    { input: "\\arctan", tag: "mi", output: "arctan", ttype: UNARY, func: !0 },
    { input: "\\arg", tag: "mi", output: "arg", ttype: UNARY, func: !0 },
    { input: "\\cos", tag: "mi", output: "cos", ttype: UNARY, func: !0 },
    { input: "\\cosh", tag: "mi", output: "cosh", ttype: UNARY, func: !0 },
    { input: "\\cot", tag: "mi", output: "cot", ttype: UNARY, func: !0 },
    { input: "\\coth", tag: "mi", output: "coth", ttype: UNARY, func: !0 },
    { input: "\\csc", tag: "mi", output: "csc", ttype: UNARY, func: !0 },
    { input: "\\deg", tag: "mi", output: "deg", ttype: UNARY, func: !0 },
    { input: "\\det", tag: "mi", output: "det", ttype: UNARY, func: !0 },
    { input: "\\dim", tag: "mi", output: "dim", ttype: UNARY, func: !0 },
    { input: "\\exp", tag: "mi", output: "exp", ttype: UNARY, func: !0 },
    { input: "\\gcd", tag: "mi", output: "gcd", ttype: UNARY, func: !0 },
    { input: "\\hom", tag: "mi", output: "hom", ttype: UNARY, func: !0 },
    { input: "\\inf", tag: "mo", output: "inf", ttype: UNDEROVER },
    { input: "\\ker", tag: "mi", output: "ker", ttype: UNARY, func: !0 },
    { input: "\\lg", tag: "mi", output: "lg", ttype: UNARY, func: !0 },
    { input: "\\lim", tag: "mo", output: "lim", ttype: UNDEROVER },
    { input: "\\liminf", tag: "mo", output: "liminf", ttype: UNDEROVER },
    { input: "\\limsup", tag: "mo", output: "limsup", ttype: UNDEROVER },
    { input: "\\ln", tag: "mi", output: "ln", ttype: UNARY, func: !0 },
    { input: "\\log", tag: "mi", output: "log", ttype: UNARY, func: !0 },
    { input: "\\max", tag: "mo", output: "max", ttype: UNDEROVER },
    { input: "\\min", tag: "mo", output: "min", ttype: UNDEROVER },
    { input: "\\Pr", tag: "mi", output: "Pr", ttype: UNARY, func: !0 },
    { input: "\\sec", tag: "mi", output: "sec", ttype: UNARY, func: !0 },
    { input: "\\sin", tag: "mi", output: "sin", ttype: UNARY, func: !0 },
    { input: "\\sinh", tag: "mi", output: "sinh", ttype: UNARY, func: !0 },
    { input: "\\sup", tag: "mo", output: "sup", ttype: UNDEROVER },
    { input: "\\tan", tag: "mi", output: "tan", ttype: UNARY, func: !0 },
    { input: "\\tanh", tag: "mi", output: "tanh", ttype: UNARY, func: !0 },
    { input: "\\gets", tag: "mo", output: "\u2190", ttype: CONST },
    { input: "\\leftarrow", tag: "mo", output: "\u2190", ttype: CONST },
    { input: "\\to", tag: "mo", output: "\u2192", ttype: CONST },
    { input: "\\rightarrow", tag: "mo", output: "\u2192", ttype: CONST },
    { input: "\\leftrightarrow", tag: "mo", output: "\u2194", ttype: CONST },
    { input: "\\uparrow", tag: "mo", output: "\u2191", ttype: CONST },
    { input: "\\downarrow", tag: "mo", output: "\u2193", ttype: CONST },
    { input: "\\updownarrow", tag: "mo", output: "\u2195", ttype: CONST },
    { input: "\\Leftarrow", tag: "mo", output: "\u21d0", ttype: CONST },
    { input: "\\Rightarrow", tag: "mo", output: "\u21d2", ttype: CONST },
    { input: "\\Leftrightarrow", tag: "mo", output: "\u21d4", ttype: CONST },
    {
      input: "\\iff",
      tag: "mo",
      output: "~\\Longleftrightarrow~",
      ttype: DEFINITION,
    },
    { input: "\\Uparrow", tag: "mo", output: "\u21d1", ttype: CONST },
    { input: "\\Downarrow", tag: "mo", output: "\u21d3", ttype: CONST },
    { input: "\\Updownarrow", tag: "mo", output: "\u21d5", ttype: CONST },
    { input: "\\mapsto", tag: "mo", output: "\u21a6", ttype: CONST },
    { input: "\\longleftarrow", tag: "mo", output: "\u2190", ttype: LONG },
    { input: "\\longrightarrow", tag: "mo", output: "\u2192", ttype: LONG },
    { input: "\\longleftrightarrow", tag: "mo", output: "\u2194", ttype: LONG },
    { input: "\\Longleftarrow", tag: "mo", output: "\u21d0", ttype: LONG },
    { input: "\\Longrightarrow", tag: "mo", output: "\u21d2", ttype: LONG },
    { input: "\\Longleftrightarrow", tag: "mo", output: "\u21d4", ttype: LONG },
    { input: "\\longmapsto", tag: "mo", output: "\u21a6", ttype: CONST },
    LMsqrt,
    LMroot,
    LMfrac,
    LMover,
    LMsub,
    LMsup,
    LMtext,
    LMmbox,
    LMatop,
    LMchoose,
    { input: "\\acute", tag: "mover", output: "\u00b4", ttype: UNARY, acc: !0 },
    { input: "\\grave", tag: "mover", output: "`", ttype: UNARY, acc: !0 },
    { input: "\\breve", tag: "mover", output: "\u02d8", ttype: UNARY, acc: !0 },
    { input: "\\check", tag: "mover", output: "\u02c7", ttype: UNARY, acc: !0 },
    { input: "\\dot", tag: "mover", output: ".", ttype: UNARY, acc: !0 },
    { input: "\\ddot", tag: "mover", output: "..", ttype: UNARY, acc: !0 },
    {
      input: "\\mathring",
      tag: "mover",
      output: "\u00b0",
      ttype: UNARY,
      acc: !0,
    },
    { input: "\\vec", tag: "mover", output: "\u20d7", ttype: UNARY, acc: !0 },
    {
      input: "\\overrightarrow",
      tag: "mover",
      output: "\u20d7",
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "\\overleftarrow",
      tag: "mover",
      output: "\u20d6",
      ttype: UNARY,
      acc: !0,
    },
    { input: "\\hat", tag: "mover", output: "^", ttype: UNARY, acc: !0 },
    {
      input: "\\widehat",
      tag: "mover",
      output: "\u0302",
      ttype: UNARY,
      acc: !0,
    },
    { input: "\\tilde", tag: "mover", output: "~", ttype: UNARY, acc: !0 },
    {
      input: "\\widetilde",
      tag: "mover",
      output: "\u02dc",
      ttype: UNARY,
      acc: !0,
    },
    { input: "\\bar", tag: "mover", output: "\u203e", ttype: UNARY, acc: !0 },
    {
      input: "\\overbrace",
      tag: "mover",
      output: "\u23b4",
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "\\overline",
      tag: "mover",
      output: "\u00af",
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "\\underbrace",
      tag: "munder",
      output: "\u23b5",
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "\\underline",
      tag: "munder",
      output: "\u00af",
      ttype: UNARY,
      acc: !0,
    },
    {
      input: "\\displaystyle",
      tag: "mstyle",
      atname: "displaystyle",
      atval: "true",
      ttype: UNARY,
    },
    {
      input: "\\textstyle",
      tag: "mstyle",
      atname: "displaystyle",
      atval: "false",
      ttype: UNARY,
    },
    {
      input: "\\scriptstyle",
      tag: "mstyle",
      atname: "scriptlevel",
      atval: "1",
      ttype: UNARY,
    },
    {
      input: "\\scriptscriptstyle",
      tag: "mstyle",
      atname: "scriptlevel",
      atval: "2",
      ttype: UNARY,
    },
    { input: "\\textrm", tag: "mstyle", output: "\\mathrm", ttype: DEFINITION },
    {
      input: "\\mathbf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "bold",
      ttype: UNARY,
    },
    {
      input: "\\textbf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "bold",
      ttype: UNARY,
    },
    {
      input: "\\mathit",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "italic",
      ttype: UNARY,
    },
    {
      input: "\\textit",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "italic",
      ttype: UNARY,
    },
    {
      input: "\\mathtt",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "monospace",
      ttype: UNARY,
    },
    {
      input: "\\texttt",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "monospace",
      ttype: UNARY,
    },
    {
      input: "\\mathsf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "sans-serif",
      ttype: UNARY,
    },
    {
      input: "\\mathbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      ttype: UNARY,
      codes: LMbbb,
    },
    {
      input: "\\mathcal",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      ttype: UNARY,
      codes: LMcal,
    },
    {
      input: "\\mathfrak",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      ttype: UNARY,
      codes: LMfrk,
    },
  ];
function compareNames(f, g) {
  return f.input > g.input ? 1 : -1;
}
var LMnames = [];
function LMinitSymbols() {
  LMsymbols.sort(compareNames);
  for (i = 0; i < LMsymbols.length; i++) LMnames[i] = LMsymbols[i].input;
}
var LMmathml = "http://www.w3.org/1998/Math/MathML";
function LMcreateElementMathML(f) {
  return isIE
    ? document.createElement("m:" + f)
    : document.createElementNS(LMmathml, f);
}
function LMcreateMmlNode(f, g) {
  var h = isIE
    ? document.createElement("m:" + f)
    : document.createElementNS(LMmathml, f);
  h.appendChild(g);
  return h;
}
function newcommand(f, g) {
  LMsymbols = LMsymbols.concat([
    { input: f, tag: "mo", output: g, ttype: DEFINITION },
  ]);
}
function LMremoveCharsAndBlanks(f, g) {
  var h;
  h = f.slice(g);
  for (var k = 0; k < h.length && 32 >= h.charCodeAt(k); k += 1);
  return h.slice(k);
}
function LMposition(f, g, h) {
  if (0 == h) {
    var k, l;
    h = -1;
    for (k = f.length; h + 1 < k; )
      (l = (h + k) >> 1), f[l] < g ? (h = l) : (k = l);
    return k;
  }
  for (; h < f.length && f[h] < g; h++);
  return h;
}
function LMgetSymbol(f) {
  for (var g = 0, h = 0, k, l, m = "", h = !0, q = 1; q <= f.length && h; q++)
    (l = f.slice(0, q)),
      (h = g),
      (g = LMposition(LMnames, l, h)),
      g < LMnames.length &&
        f.slice(0, LMnames[g].length) == LMnames[g] &&
        ((m = LMnames[g]), (k = g), (q = m.length)),
      (h = g < LMnames.length && f.slice(0, LMnames[g].length) >= LMnames[g]);
  LMpreviousSymbol = LMcurrentSymbol;
  if ("" != m) return (LMcurrentSymbol = LMsymbols[k].ttype), LMsymbols[k];
  LMcurrentSymbol = CONST;
  l = f.slice(0, 1);
  return {
    input: l,
    tag:
      "0" <= l && "9" >= l
        ? "mn"
        : ("A" > l || "Z" < l) && ("a" > l || "z" < l)
        ? "mo"
        : "mi",
    output: l,
    ttype: CONST,
  };
}
var LMpreviousSymbol, LMcurrentSymbol;
function LMparseSexpr(f) {
  var g,
    h,
    k,
    l,
    m,
    q = document.createDocumentFragment();
  f = LMremoveCharsAndBlanks(f, 0);
  g = LMgetSymbol(f);
  if (
    null == g ||
    g.ttype == RIGHTBRACKET ||
    (g.ttype == DEFINITION &&
      ((f = g.output + LMremoveCharsAndBlanks(f, g.input.length)),
      (g = LMgetSymbol(f)),
      null == g || g.ttype == RIGHTBRACKET))
  )
    return [null, f, null];
  f = LMremoveCharsAndBlanks(f, g.input.length);
  switch (g.ttype) {
    case SPACE:
      return (
        (h = LMcreateElementMathML(g.tag)),
        h.setAttribute(g.atname, g.atval),
        [h, f, g.tag]
      );
    case UNDEROVER:
      return (
        isIE &&
          "\\big" == g.input.substr(0, 4) &&
          ((f = "\\" + g.input.substr(4) + f),
          (g = LMgetSymbol(f)),
          (g.ttype = UNDEROVER),
          (f = LMremoveCharsAndBlanks(f, g.input.length))),
        [LMcreateMmlNode(g.tag, document.createTextNode(g.output)), f, g.tag]
      );
    case CONST:
      l = g.output;
      if (isIE)
        if ("'" == g.input) l = "\u2032";
        else if ("''" == g.input) l = "\u2033";
        else if ("'''" == g.input) l = "\u2033\u2032";
        else if ("''''" == g.input) l = "\u2033\u2033";
        else if ("\\square" == g.input) l = "\u25a1";
        else if (
          "\\frac" == g.input.substr(0, 5) &&
          ((k = g.input.substr(6, 1)), "5" == k || "6" == k)
        )
          return (f = g.input.replace(/\\frac/, "\\frac ") + f), [h, f, g.tag];
      h = LMcreateMmlNode(g.tag, document.createTextNode(l));
      return [h, f, g.tag];
    case LONG:
      return (
        (h = LMcreateMmlNode(g.tag, document.createTextNode(g.output))),
        h.setAttribute("minsize", "1.5"),
        h.setAttribute("maxsize", "1.5"),
        (h = LMcreateMmlNode("mover", h)),
        h.appendChild(LMcreateElementMathML("mspace")),
        [h, f, g.tag]
      );
    case STRETCHY:
      isIE && "\\backslash" == g.input && (g.output = "\\");
      h = LMcreateMmlNode(g.tag, document.createTextNode(g.output));
      if (
        "|" == g.input ||
        "\\vert" == g.input ||
        "\\|" == g.input ||
        "\\Vert" == g.input
      )
        h.setAttribute("lspace", "0em"), h.setAttribute("rspace", "0em");
      h.setAttribute("maxsize", g.atval);
      return null != g.rtag ? [h, f, g.rtag] : [h, f, g.tag];
    case BIG:
      k = g.atval;
      isIE && (k = g.ieval);
      g = LMgetSymbol(f);
      if (null == g) return [null, f, null];
      f = LMremoveCharsAndBlanks(f, g.input.length);
      h = LMcreateMmlNode(g.tag, document.createTextNode(g.output));
      isIE
        ? ((l = LMcreateElementMathML("mspace")),
          l.setAttribute("height", k + "ex"),
          (h = LMcreateMmlNode("mrow", h)),
          h.appendChild(l))
        : (h.setAttribute("minsize", k), h.setAttribute("maxsize", k));
      return [h, f, g.tag];
    case LEFTBRACKET:
      return (
        "\\left" == g.input &&
          ((g = LMgetSymbol(f)),
          null != g &&
            ("." == g.input && (g.invisible = !0),
            (f = LMremoveCharsAndBlanks(f, g.input.length)))),
        (k = LMparseExpr(f, !0, !1)),
        null == g || ("boolean" == typeof g.invisible && g.invisible)
          ? (h = LMcreateMmlNode("mrow", k[0]))
          : ((h = LMcreateMmlNode("mo", document.createTextNode(g.output))),
            (h = LMcreateMmlNode("mrow", h)),
            h.appendChild(k[0])),
        [h, k[1], k[2]]
      );
    case MATRIX:
      if ("\\begin{array}" == g.input) {
        l = "";
        g = LMgetSymbol(f);
        f = LMremoveCharsAndBlanks(f, 0);
        if (null == g) l = "l";
        else if (
          ((f = LMremoveCharsAndBlanks(f, g.input.length)), "{" != g.input)
        )
          l = "l";
        else {
          do
            (g = LMgetSymbol(f)),
              null != g &&
                ((f = LMremoveCharsAndBlanks(f, g.input.length)),
                "}" != g.input && (l += g.input));
          while (null != g && "" != g.input && "}" != g.input);
        }
        k = LMparseExpr("{" + f, !0, !0);
        h = LMcreateMmlNode("mtable", k[0]);
        l = l.replace(/l/g, "left ");
        l = l.replace(/r/g, "right ");
        l = l.replace(/c/g, "center ");
        h.setAttribute("columnalign", l);
        h.setAttribute("displaystyle", "false");
        if (isIE) return [h, k[1], null];
        f = LMcreateElementMathML("mspace");
        f.setAttribute("width", "0.167em");
        g = LMcreateElementMathML("mspace");
        g.setAttribute("width", "0.167em");
        f = LMcreateMmlNode("mrow", f);
        f.appendChild(h);
        f.appendChild(g);
        return [f, k[1], null];
      }
      k = LMparseExpr("{" + f, !0, !0);
      h = LMcreateMmlNode("mtable", k[0]);
      isIE
        ? h.setAttribute("columnspacing", "0.25em")
        : h.setAttribute("columnspacing", "0.167em");
      h.setAttribute("columnalign", "right center left");
      h.setAttribute("displaystyle", "true");
      h = LMcreateMmlNode("mrow", h);
      return [h, k[1], null];
    case TEXT:
      return (
        (l = "{" == f.charAt(0) ? f.indexOf("}") : 0),
        -1 == l && (l = f.length),
        (m = f.slice(1, l)),
        " " == m.charAt(0) &&
          ((h = LMcreateElementMathML("mspace")),
          h.setAttribute("width", "0.33em"),
          q.appendChild(h)),
        q.appendChild(LMcreateMmlNode(g.tag, document.createTextNode(m))),
        " " == m.charAt(m.length - 1) &&
          ((h = LMcreateElementMathML("mspace")),
          h.setAttribute("width", "0.33em"),
          q.appendChild(h)),
        (f = LMremoveCharsAndBlanks(f, l + 1)),
        [LMcreateMmlNode("mrow", q), f, null]
      );
    case UNARY:
      k = LMparseSexpr(f);
      if (null == k[0])
        return [LMcreateMmlNode(g.tag, document.createTextNode(g.output)), f];
      if ("boolean" == typeof g.func && g.func) {
        m = f.charAt(0);
        if ("^" == m || "_" == m || "," == m)
          return [
            LMcreateMmlNode(g.tag, document.createTextNode(g.output)),
            f,
            g.tag,
          ];
        h = LMcreateMmlNode(
          "mrow",
          LMcreateMmlNode(g.tag, document.createTextNode(g.output))
        );
        isIE &&
          ((l = LMcreateElementMathML("mspace")),
          l.setAttribute("width", "0.167em"),
          h.appendChild(l));
        h.appendChild(k[0]);
        return [h, k[1], g.tag];
      }
      if ("\\sqrt" == g.input)
        return isIE
          ? ((l = LMcreateElementMathML("mspace")),
            l.setAttribute("height", "1.2ex"),
            l.setAttribute("width", "0em"),
            (h = LMcreateMmlNode(g.tag, k[0])),
            h.appendChild(l),
            [h, k[1], g.tag])
          : [LMcreateMmlNode(g.tag, k[0]), k[1], g.tag];
      if ("boolean" == typeof g.acc && g.acc) {
        if (
          ((h = LMcreateMmlNode(g.tag, k[0])),
          (l = g.output),
          isIE &&
            ("\\hat" == g.input
              ? (l = "\u0302")
              : "\\widehat" == g.input
              ? (l = "^")
              : "\\bar" == g.input
              ? (l = "\u00af")
              : "\\grave" == g.input
              ? (l = "\u0300")
              : "\\tilde" == g.input && (l = "\u0303")),
          (f = LMcreateMmlNode("mo", document.createTextNode(l))),
          ("\\vec" != g.input && "\\check" != g.input) ||
            f.setAttribute("maxsize", "1.2"),
          isIE && "\\bar" == g.input && f.setAttribute("maxsize", "0.5"),
          "\\underbrace" == g.input || "\\underline" == g.input
            ? f.setAttribute("accentunder", "true")
            : f.setAttribute("accent", "true"),
          h.appendChild(f),
          "\\overbrace" == g.input || "\\underbrace" == g.input)
        )
          h.ttype = UNDEROVER;
      } else {
        if (!isIE && "zła składnia" != typeof g.codes)
          for (l = 0; l < k[0].childNodes.length; l++)
            if ("mi" == k[0].childNodes[l].nodeName || "mi" == k[0].nodeName) {
              m =
                "mi" == k[0].nodeName
                  ? k[0].firstChild.nodeValue
                  : k[0].childNodes[l].firstChild.nodeValue;
              h = [];
              for (f = 0; f < m.length; f++)
                h =
                  64 < m.charCodeAt(f) && 91 > m.charCodeAt(f)
                    ? h + String.fromCharCode(g.codes[m.charCodeAt(f) - 65])
                    : h + m.charAt(f);
              "mi" == k[0].nodeName
                ? (k[0] = LMcreateElementMathML("mo").appendChild(
                    document.createTextNode(h)
                  ))
                : k[0].replaceChild(
                    LMcreateElementMathML("mo").appendChild(
                      document.createTextNode(h)
                    ),
                    k[0].childNodes[l]
                  );
            }
        h = LMcreateMmlNode(g.tag, k[0]);
        h.setAttribute(g.atname, g.atval);
        ("\\scriptstyle" != g.input && "\\scriptscriptstyle" != g.input) ||
          h.setAttribute("displaystyle", "false");
      }
      return [h, k[1], g.tag];
    case BINARY:
      k = LMparseSexpr(f);
      if (null == k[0])
        return [
          LMcreateMmlNode("mo", document.createTextNode(g.input)),
          f,
          null,
        ];
      h = LMparseSexpr(k[1]);
      if (null == h[0])
        return [
          LMcreateMmlNode("mo", document.createTextNode(g.input)),
          f,
          null,
        ];
      ("\\root" != g.input && "\\stackrel" != g.input) || q.appendChild(h[0]);
      q.appendChild(k[0]);
      "\\frac" == g.input && q.appendChild(h[0]);
      return [LMcreateMmlNode(g.tag, q), h[1], g.tag];
    case INFIX:
      return (
        (f = LMremoveCharsAndBlanks(f, g.input.length)),
        [LMcreateMmlNode("mo", document.createTextNode(g.output)), f, g.tag]
      );
    default:
      return [
        LMcreateMmlNode(g.tag, document.createTextNode(g.output)),
        f,
        g.tag,
      ];
  }
}
function LMparseIexpr(f) {
  var g, h, k, l, m, q;
  f = LMremoveCharsAndBlanks(f, 0);
  h = LMgetSymbol(f);
  m = LMparseSexpr(f);
  l = m[0];
  f = m[1];
  q = m[2];
  g = LMgetSymbol(f);
  g.ttype == INFIX &&
    ((f = LMremoveCharsAndBlanks(f, g.input.length)),
    (m = LMparseSexpr(f)),
    null == m[0] &&
      (m[0] = LMcreateMmlNode("mo", document.createTextNode("\u25a1"))),
    (f = m[1]),
    (q = m[2]),
    "_" == g.input || "^" == g.input
      ? ((k = LMgetSymbol(f)),
        (q = null),
        (h = h.ttype == UNDEROVER || l.ttype == UNDEROVER),
        "_" == g.input && "^" == k.input
          ? ((f = LMremoveCharsAndBlanks(f, k.input.length)),
            (g = LMparseSexpr(f)),
            (f = g[1]),
            (q = g[2]),
            (l = LMcreateMmlNode(h ? "munderover" : "msubsup", l)),
            l.appendChild(m[0]),
            l.appendChild(g[0]))
          : ((l =
              "_" == g.input
                ? LMcreateMmlNode(h ? "munder" : "msub", l)
                : LMcreateMmlNode(h ? "mover" : "msup", l)),
            l.appendChild(m[0])),
        (l = LMcreateMmlNode("mrow", l)))
      : ((l = LMcreateMmlNode(g.tag, l)),
        ("\\atop" != g.input && "\\choose" != g.input) ||
          l.setAttribute("linethickness", "0ex"),
        l.appendChild(m[0]),
        "\\choose" == g.input && (l = LMcreateMmlNode("mfenced", l))));
  return [l, f, q];
}
function LMparseExpr(f, g, h) {
  var k, l, m;
  g = document.createDocumentFragment();
  do
    (f = LMremoveCharsAndBlanks(f, 0)),
      (k = LMparseIexpr(f)),
      (l = k[0]),
      (f = k[1]),
      (m = k[2]),
      (k = LMgetSymbol(f)),
      void 0 != l &&
        (("mn" != m && "mi" != m) ||
          null == k ||
          "boolean" != typeof k.func ||
          !k.func ||
          ((m = LMcreateElementMathML("mspace")),
          m.setAttribute("width", "0.167em"),
          (l = LMcreateMmlNode("mrow", l)),
          l.appendChild(m)),
        g.appendChild(l));
  while (k.ttype != RIGHTBRACKET && null != k && "" != k.output);
  m = null;
  if (k.ttype == RIGHTBRACKET) {
    "\\right" == k.input &&
      ((f = LMremoveCharsAndBlanks(f, k.input.length)),
      (k = LMgetSymbol(f)),
      null != k && "." == k.input && (k.invisible = !0),
      null != k && (m = k.rtag));
    null != k && (f = LMremoveCharsAndBlanks(f, k.input.length));
    l = g.childNodes.length;
    if (
      h &&
      0 < l &&
      "mrow" == g.childNodes[l - 1].nodeName &&
      1 < l &&
      "mo" == g.childNodes[l - 2].nodeName &&
      "&" == g.childNodes[l - 2].firstChild.nodeValue
    ) {
      m = [];
      var q = g.childNodes.length;
      for (k = 0; h && k < q; k += 2) {
        m[k] = [];
        l = g.childNodes[k];
        for (var r = 0; r < l.childNodes.length; r++)
          "&" == l.childNodes[r].firstChild.nodeValue &&
            (m[k][m[k].length] = r);
      }
      var s,
        v,
        w,
        z = document.createDocumentFragment();
      for (k = 0; k < q; k += 2) {
        h = document.createDocumentFragment();
        s = document.createDocumentFragment();
        l = g.firstChild;
        v = l.childNodes.length;
        for (r = w = 0; r < v; r++)
          "zła składnia" != typeof m[k][w] && r == m[k][w]
            ? (l.removeChild(l.firstChild),
              h.appendChild(LMcreateMmlNode("mtd", s)),
              w++)
            : s.appendChild(l.firstChild);
        h.appendChild(LMcreateMmlNode("mtd", s));
        2 < g.childNodes.length &&
          (g.removeChild(g.firstChild), g.removeChild(g.firstChild));
        z.appendChild(LMcreateMmlNode("mtr", h));
      }
      return [z, f];
    }
    ("boolean" == typeof k.invisible && k.invisible) ||
      ((l = LMcreateMmlNode("mo", document.createTextNode(k.output))),
      g.appendChild(l));
  }
  return [g, f, m];
}
function LMparseMath(f) {
  var g = LMcreateElementMathML("mstyle");
  "" != LMmathcolor && g.setAttribute("mathcolor", LMmathcolor);
  "" != LMmathfontfamily && g.setAttribute("fontfamily", LMmathfontfamily);
  g.appendChild(LMparseExpr(f.replace(/^\s+/g, ""), !1, !1)[0]);
  g = LMcreateMmlNode("math", g);
  LMshowasciiformulaonhover && g.setAttribute("title", f.replace(/\s+/g, " "));
  f = LMcreateElementXHTML("span");
  f.style.fontSize = mathfontsize;
  "" != LMmathfontfamily && (f.style.fontFamily = LMmathfontfamily);
  f.appendChild(g);
  return f;
}
function LMstrarr2docFrag(f, g) {
  for (
    var h = document.createDocumentFragment(), k = !1, l = 0;
    l < f.length;
    l++
  ) {
    if (k) h.appendChild(LMparseMath(f[l]));
    else {
      var m = g ? f[l].split("\n\n") : [f[l]];
      h.appendChild(
        LMcreateElementXHTML("span").appendChild(document.createTextNode(m[0]))
      );
      for (var q = 1; q < m.length; q++)
        h.appendChild(LMcreateElementXHTML("p")),
          h.appendChild(
            LMcreateElementXHTML("span").appendChild(
              document.createTextNode(m[q])
            )
          );
    }
    k = !k;
  }
  return h;
}
function LMprocessNodeR(f, g) {
  var h, k, l;
  if (0 == f.childNodes.length) {
    if (
      (8 != f.nodeType || g) &&
      "form" != f.parentNode.nodeName &&
      "FORM" != f.parentNode.nodeName &&
      "textarea" != f.parentNode.nodeName &&
      "TEXTAREA" != f.parentNode.nodeName &&
      "pre" != f.parentNode.nodeName &&
      "PRE" != f.parentNode.nodeName &&
      ((k = f.nodeValue), null != k)
    ) {
      k = k.replace(/\r\n\r\n/g, "\n\n");
      k = k.replace(/\x20+/g, " ");
      k = k.replace(/\s*\r\n/g, " ");
      h = -1 == k.indexOf("$") ? !1 : !0;
      k = k.replace(/([^\\])\$/g, "$1 $");
      k = k.replace(/^\$/, " $");
      k = k.split(" $");
      for (l = 0; l < k.length; l++) k[l] = k[l].replace(/\\\$/g, "$");
      if (1 < k.length || h)
        if (
          (LMcheckForMathML &&
            ((LMcheckForMathML = !1),
            (h = LMisMathMLavailable()),
            (LMnoMathML = null != h) &&
              LMnotifyIfNoMathML &&
              (LMalertIfNoMathML
                ? alert(
                    "To view the ASCIIMathML notation use Internet Explorer 6 +\nMathPlayer (free from www.dessci.com)\nor Firefox/Mozilla/Netscape"
                  )
                : LMbody.insertBefore(h, LMbody.childNodes[0]))),
          !LMnoMathML)
        )
          return (
            (h = LMstrarr2docFrag(k, 8 == f.nodeType)),
            (k = h.childNodes.length),
            f.parentNode.replaceChild(h, f),
            k - 1
          );
    }
  } else if ("math" != f.nodeName)
    for (l = 0; l < f.childNodes.length; l++)
      l += LMprocessNodeR(f.childNodes[l], g);
  return 0;
}
var tcnt = 0,
  dcnt = 0;
function simpleLaTeXformatting(f) {
  f = f.replace(/\$\$(.*?)\$\$/g, '<p align="center">$\\displaystyle{$1}$</p>');
  f = f.replace(
    /\\begin{(theorem|lemma|proposition|corollary)}((.|\n)*?)\\end{\1}/g,
    function (f, h, k) {
      tcnt++;
      return (
        "<b>" +
        h.charAt(0).toUpperCase() +
        h.slice(1) +
        " " +
        tcnt +
        ".</b> <i>" +
        k.replace(/^\s*<\/?\w+\/?>|\s*<\/?\w+\/?>$/g, "") +
        "</i>"
      );
    }
  );
  f = f.replace(
    /\\begin{(definition|example|remark|problem|exercise|conjecture|solution)}((.|\n)*?)\\end{\1}/g,
    function (f, h, k) {
      dcnt++;
      return (
        "<b>" +
        h.charAt(0).toUpperCase() +
        h.slice(1) +
        " " +
        dcnt +
        ".</b> " +
        k.replace(/^\s*<\/?\w+\/?>|\s*<\/?\w+\/?>$/g, "")
      );
    }
  );
  f = f.replace(/\\begin{proof}((.|\n)*?)\\end{proof}/g, function (f, h) {
    return (
      "<i>Proof:</i> " +
      h.replace(/^\s*<\/?\w+\/?>|\s*<\/?\w+\/?>$/g, "") +
      " &#x25A1;"
    );
  });
  f = f.replace(/\\emph{(.*?)}/g, "<em>$1</em>");
  f = f.replace(/\\textbf{(.*?)}/g, "<b>$1</b>");
  f = f.replace(/\\cite{(.*?)}/g, "[$1]");
  f = f.replace(/\\chapter{(.*?)}/g, "<h2>$1</h2>");
  f = f.replace(/\\section{(.*?)}(\s*<\/?(br|p)\s?\/?>)?/g, "<h3>$1</h3>");
  f = f.replace(/\\subsection{(.*?)}/g, "<h4>$1</h4>");
  f = f.replace(/\\begin{itemize}(\s*<\/?(br|p)\s?\/?>)?/g, "<ul>");
  f = f.replace(/\\item\s((.|\n)*?)(?=(\\item|\\end))/g, "<li>$1</li>");
  f = f.replace(/\\end{itemize}(\s*<\/?(br|p)\s?\/?>)?/g, "</ul>");
  f = f.replace(/\\begin{enumerate}(\s*<\/?(br|p)\s?\/?>)?/g, "<ol>");
  f = f.replace(/\\end{enumerate}(\s*<\/?(br|p)\s?\/?>)?/g, "</ol>");
  f = f.replace(/\\item\[(.*?)]{(.*?)}/g, "<dt>$1</dt><dd>$2</dd>");
  f = f.replace(/\\begin{description}/g, "<dl>");
  f = f.replace(/\\end{description}/g, "</dl>");
  f = f.replace(/\\newline\b/g, "<br/>");
  f = f.replace(/\\newpage\b/g, '<br style="page-break-after:always;">');
  f = f.replace(/\\par\b/g, "<p>&nbsp;</p>");
  f = f.replace(/\\bigskip/g, '<p style="margin-bottom:0.5in">&nbsp;</p>');
  f = f.replace(/\\medskip/g, '<p style="margin-bottom:0.3in">&nbsp;</p>');
  f = f.replace(/\\smallskip/g, '<p style="margin-bottom:0.15in">&nbsp;</p>');
  f = f.replace(
    /\\begin{center}(.*?)\\end{center}/g,
    '<p align="center">$1</p>'
  );
  f = f.replace(
    /<embed\s+class\s?=\s?"ASCIIsvg"/g,
    '<embed class="ASCIIsvg" src="' +
      dsvglocation +
      'd.svg" wmode="transparent"'
  );
  f = f.replace(
    /(?:\\begin{a?graph}|agraph|\(:graph\s)((.|\n)*?)(?:\\end{a?graph}|enda?graph|:\))/g,
    function (f, h) {
      return (
        '<div><embed class="ASCIIsvg" src="' +
        dsvglocation +
        'd.svg" wmode="transparent" script=\'' +
        h.replace(/<\/?(br|p|pre)\s?\/?>/gi, "\n") +
        "'/></div>"
      );
    }
  );
  return (f = f.replace(
    /insertASCIIMathCalculator/g,
    '<div class="ASCIIMathCalculator"></div>'
  ));
}
function LMprocessNode(f, g, h) {
  var k;
  if (null != h)
    for (f = document.getElementsByTagName("span"), k = 0; k < f.length; k++)
      "LM" == f[k].className && LMprocessNodeR(f[k], g);
  else {
    try {
      k = f.innerHTML;
    } catch (l) {}
    h = /amath|agraph/i.test(k);
    (null != k &&
      -1 == k.indexOf("$ ") &&
      -1 == k.indexOf("$<") &&
      -1 == k.indexOf("\\begin") &&
      !h &&
      "$" != k.slice(-1) &&
      -1 == k.indexOf("$\n")) ||
      /edit-content|HTMLArea|wikiedit/.test(k) ||
      (!avoidinnerHTML &&
        translateLaTeXformatting &&
        (k = simpleLaTeXformatting(k)),
      null != k &&
        h &&
        !avoidinnerHTML &&
        ((k = k.replace(/<sup>(.*?)<\/sup>(\s|(\S))/gi, "^{$1} $3")),
        (k = k.replace(/(Proof:)/g, "<i>$1</i>")),
        (k = k.replace(/QED/g, "&#x25A1;")),
        (k = k.replace(/(\\?end{?a?math}?)/gi, "<span></span>$1")),
        (k = k.replace(/(\bamath|\\begin{a?math})/gi, "<span></span>$1")),
        (k = k.replace(
          /([>\n])(Theorem|Lemma|Proposition|Corollary|Definition|Example|Remark|Problem|Exercise|Conjecture|Solution)(:|\W\W?(\w|\.)*?\W?:)/g,
          "$1<b>$2$3</b>"
        ))),
      (k = k.replace(/%7E/g, "~")),
      avoidinnerHTML || (f.innerHTML = k),
      LMprocessNodeR(f, g));
  }
  if (isIE)
    for (f = document.getElementsByTagName("math"), k = 0; k < f.length; k++)
      f[k].update();
}
var LMbody,
  LMnoMathML = !1,
  LMtranslated = !1;
function LMtranslate(f) {
  if (!LMtranslated) {
    LMtranslated = !0;
    LMinitSymbols();
    LMbody = document.getElementsByTagName("body")[0];
    var g = document.getElementById(AMdocumentId);
    LMprocessNode(null != g ? g : LMbody, !1, f);
  }
}
isIE &&
  (document.write(
    '<object id="mathplayer"classid="clsid:32F66A20-7614-11D4-BD11-00104BD3F987"></object>'
  ),
  document.write('<?import namespace="m" implementation="#mathplayer"?>'));
var checkIfSVGavailable = !0,
  notifyIfNoSVG = !0,
  alertIfNoSVG = !1,
  defaultwidth = 300;
defaultheight = 200;
var defaultxmin = -5.5;
defaultxmax = 5.5;
var defaultborder = 0;
border = defaultborder;
var defaultstrokewidth = "1",
  defaultstroke = "blue",
  defaultstrokeopacity = 1,
  defaultstrokedasharray = null,
  defaultfill = "none",
  defaultfillopacity = 1,
  defaultfontstyle = "normal",
  defaultfontfamily = "times",
  defaultfontsize = "16",
  defaultfontweight = "normal",
  defaultfontstroke = "none",
  defaultfontfill = "none",
  defaultmarker = "none",
  defaultendpoints = "",
  showcoordinates = !0,
  markerstrokewidth = "1",
  markerstroke = "black",
  markerfill = "yellow",
  markersize = 4,
  arrowfill = stroke,
  dotradius = 4,
  ticklength = 4,
  axesstroke = "black",
  gridstroke = "grey",
  backgroundstyle = "fill-opacity:0; fill:white",
  singlelettersitalic = !0,
  picturepos = null,
  xunitlength,
  yunitlength,
  origin = [0, 0],
  above = "above",
  below = "below",
  left = "left",
  right = "right",
  aboveleft = "aboveleft",
  aboveright = "aboveright",
  belowleft = "belowleft",
  belowright = "belowright",
  xmin,
  xmax,
  ymin,
  ymax,
  xscl,
  yscl,
  xgrid,
  ygrid,
  xtick,
  ytick,
  initialized,
  strokewidth,
  strokedasharray,
  stroke,
  fill,
  strokeopacity,
  fillopacity,
  fontstyle,
  fontfamily,
  fontsize,
  fontweight,
  fontstroke,
  fontfill,
  marker,
  endpoints,
  dynamic = {},
  picture,
  svgpicture,
  doc,
  width,
  height,
  a,
  b,
  c,
  d,
  i,
  n,
  p,
  t,
  x,
  y,
  isIE = null == document.createElementNS,
  cpi = "\u03c0",
  ctheta = "\u03b8",
  log = function (f) {
    return ln(f) / ln(10);
  },
  pi = Math.PI,
  e = Math.E,
  ln = Math.log,
  sqrt = Math.sqrt,
  floor = Math.floor,
  ceil = Math.ceil,
  abs = Math.abs,
  sin = Math.sin,
  cos = Math.cos,
  tan = Math.tan,
  arcsin = Math.asin,
  arccos = Math.acos,
  arctan = Math.atan,
  sec = function (f) {
    return 1 / Math.cos(f);
  },
  csc = function (f) {
    return 1 / Math.sin(f);
  },
  cot = function (f) {
    return 1 / Math.tan(f);
  },
  arcsec = function (f) {
    return arccos(1 / f);
  },
  arccsc = function (f) {
    return arcsin(1 / f);
  },
  arccot = function (f) {
    return arctan(1 / f);
  },
  sinh = function (f) {
    return (Math.exp(f) - Math.exp(-f)) / 2;
  },
  cosh = function (f) {
    return (Math.exp(f) + Math.exp(-f)) / 2;
  },
  tanh = function (f) {
    return (Math.exp(f) - Math.exp(-f)) / (Math.exp(f) + Math.exp(-f));
  },
  sech = function (f) {
    return 1 / cosh(f);
  },
  csch = function (f) {
    return 1 / sinh(f);
  },
  coth = function (f) {
    return 1 / tanh(f);
  },
  arcsinh = function (f) {
    return ln(f + Math.sqrt(f * f + 1));
  },
  arccosh = function (f) {
    return ln(f + Math.sqrt(f * f - 1));
  },
  arctanh = function (f) {
    return ln((1 + f) / (1 - f)) / 2;
  },
  sech = function (f) {
    return 1 / cosh(f);
  },
  csch = function (f) {
    return 1 / sinh(f);
  },
  coth = function (f) {
    return 1 / tanh(f);
  },
  arcsech = function (f) {
    return arccosh(1 / f);
  },
  arccsch = function (f) {
    return arcsinh(1 / f);
  },
  arccoth = function (f) {
    return arctanh(1 / f);
  },
  sign = function (f) {
    return 0 == f ? 0 : 0 > f ? -1 : 1;
  };
function factorial(f, g) {
  null == g && (g = 1);
  1e-15 > Math.abs(f - Math.round(1e6 * f) / 1e6) &&
    (f = Math.round(1e6 * f) / 1e6);
  if (0 != f - Math.floor(f)) return NaN;
  for (var h = f - g; 0 < h; h -= g) f *= h;
  return 0 > f ? NaN : 0 == f ? 1 : f;
}
function C(f, g) {
  for (var h = 1, k = 0; k < g; k++) h *= (f - k) / (g - k);
  return h;
}
function chop(f, g) {
  null == g && (g = 0);
  return Math.floor(f * Math.pow(10, g)) / Math.pow(10, g);
}
function ran(f, g, h) {
  null == h && (h = 0);
  return chop((g + Math.pow(10, -h) - f) * Math.random() + f, h);
}
function myCreateElementXHTML(f) {
  return isIE
    ? document.createElement(f)
    : document.createElementNS("http://www.w3.org/1999/xhtml", f);
}
function myCreateElementSVG(f) {
  return isIE
    ? doc.createElement(f)
    : doc.createElementNS("http://www.w3.org/2000/svg", f);
}
function getElementsByClass(f, g, h) {
  var k = [];
  f = f.getElementsByTagName(g);
  for (g = 0; g < f.length; g++)
    f[g].className.slice(0, h.length) == h && (k[k.length] = f[g]);
  return k;
}
function findPos(f) {
  var g = (curtop = 0);
  if (f.offsetParent)
    for (g = f.offsetLeft, curtop = f.offsetTop; (f = f.offsetParent); )
      (g += f.offsetLeft), (curtop += f.offsetTop);
  return [g, curtop];
}
function isSVGavailable() {
  var f = myCreateElementXHTML("center");
  f.appendChild(document.createTextNode("To view the "));
  var g = myCreateElementXHTML("a");
  g.appendChild(document.createTextNode("ASCIIsvg"));
  g.setAttribute("href", "http://www.chapman.edu/~jipsen/asciisvg.html");
  f.appendChild(g);
  f.appendChild(document.createTextNode(" images use Internet Explorer 6+"));
  g = myCreateElementXHTML("a");
  g.appendChild(document.createTextNode("Adobe SVGviewer 3.02"));
  g.setAttribute("href", "http://www.adobe.com/svg");
  f.appendChild(g);
  f.appendChild(document.createTextNode(" or "));
  g = myCreateElementXHTML("a");
  g.appendChild(document.createTextNode("SVG enabled Mozilla/Firefox"));
  g.setAttribute(
    "href",
    "http://www.chapman.edu/~jipsen/svg/svgenabledmozillafirefox.html"
  );
  f.appendChild(g);
  if ("Netscape" == navigator.appName.slice(0, 8))
    return window.SVGElement ? null : f;
  if ("Microsoft" == navigator.appName.slice(0, 9))
    try {
      return eval("new ActiveXObject('Adobe.SVGCtl.3');"), null;
    } catch (h) {
      return f;
    }
  else return f;
}
function setText(f, g) {
  var h = document.getElementById(g);
  null != h &&
    (0 != h.childNodes.length
      ? (h.childNodes[0].nodeValue = f)
      : h.appendChild(document.createTextNode(f)));
}
function getX(f) {
  var g = f.target.parentNode;
  return (
    (f.clientX +
      (isIE ? 0 : window.pageXOffset) -
      g.getAttribute("left") -
      g.getAttribute("ox")) /
    (g.getAttribute("xunitlength") - 0)
  );
}
function getY(f) {
  var g = f.target.parentNode;
  return (
    (g.getAttribute("height") -
      g.getAttribute("oy") -
      (f.clientY + (isIE ? 0 : window.pageYOffset) - g.getAttribute("top"))) /
    (g.getAttribute("yunitlength") - 0)
  );
}
function translateandeval(f) {
  var g;
  f = f.replace(/plot\(\x20*([^\"f\[][^\n\r;]+?)\,/g, 'plot("$1",');
  f = f.replace(/plot\(\x20*([^\"f\[][^\n\r;]+)\)/g, 'plot("$1")');
  f = f.replace(
    /([=(,]\x20*)\(([-a-z0-9./+*]+?),([-a-z0-9./+*]+?)\)/g,
    "$1[$2,$3]"
  );
  f = f.replace(/([0-9])([a-zA-Z])/g, "$1*$2");
  f = f.replace(/\)([\(0-9a-zA-Z])/g, ")*$1");
  try {
    with (Math) eval(f);
  } catch (h) {
    "wait" != h &&
      ((g =
        "object" == typeof h
          ? h.name + " " + h.message + " " + h.number + " " + h.description
          : h),
      alert(g + "\n" + f));
  }
}
function drawPictures() {
  var f,
    g,
    h,
    k,
    l,
    m,
    q = document.getElementsByTagName("textarea");
  for (k = 0; k < q.length; k++)
    "ASCIIsvg" == q[k].className && (q[k].style.display = "none");
  k = document.getElementsByTagName("body")[0];
  var q = getElementsByClass(k, "embed", "ASCIIsvg"),
    r = q.length;
  checkIfSVGavailable &&
    ((f = isSVGavailable()),
    null != f &&
      notifyIfNoSVG &&
      0 < r &&
      (alertIfNoSVG
        ? alert(
            "To view the SVG pictures in Internet Explorer\ndownload the free Adobe SVGviewer from www.adobe.com/svg or\nuse Firefox 2.0 or later"
          )
        : k.insertBefore(f, k.childNodes[0])));
  if (null == f)
    for (k = 0; k < r; k++) {
      ygrid =
        yscl =
        xgrid =
        xscl =
        ymax =
        ymin =
        xmax =
        xmin =
        height =
        width =
          null;
      initialized = !1;
      picture = q[k];
      f = picture.getAttribute("script");
      null == f && (f = "");
      if (!/axes\b|initPicture/.test(f)) {
        for (
          m = 0;
          /((yscl|ymax|ymin|xscl|xmax|xmin|\bwidth|\bheight)\s*=\s*-?\d*(\d\.|\.\d|\d)\d*\s*;?)/.test(
            f.slice(m)
          );

        )
          m++;
        f =
          0 == m
            ? "axes(); " + f
            : f.slice(0, m) +
              f
                .slice(m)
                .replace(
                  /((scl|max|min|idth|eight)\s*=\s*-?\d*(\d\.|\.\d|\d)\d*\s*;?)/,
                  "$1\naxes();"
                );
      }
      h = picture.getAttribute("height");
      isIE &&
        (picture.setAttribute("wmode", "transparent"),
        "" == picture.getAttribute("src") &&
          picture.setAttribute("src", dsvglocation + "d.svg"));
      null == document.getElementById("picture" + (k + 1) + "mml") &&
        ((picture.parentNode.style.position = "relative"),
        (g = myCreateElementXHTML("div")),
        (g.style.position = "absolute"),
        (g.style.top = "0px"),
        (g.style.left = "0px"),
        g.setAttribute("id", "picture" + (k + 1) + "mml"),
        picture.parentNode.insertBefore(g, picture.nextSibling));
      null == h && (h = "");
      if ("" == h || "" == f)
        if (null == document.getElementById("picture" + (k + 1) + "input")) {
          g = myCreateElementXHTML("textarea");
          l = f.split("\n");
          for (m = h = 0; m < l.length; m++) h = Math.max(h, l[m].length);
          g.setAttribute("rows", Math.min(10, l.length) + 1);
          g.setAttribute("cols", Math.max(Math.min(60, h), 20) + 5);
          isIE && (f = f.replace(/([^\r])\n/g, "$1\r"));
          g.appendChild(document.createTextNode(f));
          -1 == f.indexOf("showcode()") && (g.style.display = "none");
          g.setAttribute("id", "picture" + (k + 1) + "input");
          picture.parentNode.insertBefore(g, picture.nextSibling);
          picture.parentNode.insertBefore(myCreateElementXHTML("br"), g);
          h = myCreateElementXHTML("button");
          h.setAttribute("id", "picture" + (k + 1) + "button");
          isIE
            ? (h.onclick = function () {
                updatePicture(this);
              })
            : h.setAttribute("onclick", "updatePicture(this)");
          h.appendChild(document.createTextNode("Update"));
          -1 == f.indexOf("showcode()") && (h.style.display = "none");
          picture.parentNode.insertBefore(h, g);
          picture.parentNode.insertBefore(myCreateElementXHTML("br"), g);
        } else f = document.getElementById("picture" + (k + 1) + "input").value;
      g = picture.getAttribute("id");
      picture.getAttribute("src");
      if (null == g || "" == g)
        (g = "picture" + (k + 1)), picture.setAttribute("id", g);
      translateandeval(f);
    }
}
function setdefaults() {
  strokewidth = defaultstrokewidth;
  stroke = defaultstroke;
  strokeopacity = defaultstrokeopacity;
  strokedasharray = defaultstrokedasharray;
  fill = defaultfill;
  fillopacity = defaultfillopacity;
  fontstyle = defaultfontstyle;
  fontfamily = defaultfontfamily;
  fontsize = defaultfontsize;
  fontweight = defaultfontweight;
  fontstroke = defaultfontstroke;
  fontfill = defaultfontfill;
  marker = defaultmarker;
  endpoints = defaultendpoints;
}
function switchTo(f) {
  picture = document.getElementById(f);
  width = picture.getAttribute("width") - 0;
  height = picture.getAttribute("height") - 0;
  setdefaults();
  ("EMBED" != picture.nodeName && "embed" != picture.nodeName) || !isIE
    ? ((svgpicture = picture), (doc = document))
    : ((svgpicture = picture.getSVGDocument().getElementById("root")),
      (doc = picture.getSVGDocument()));
  xunitlength = svgpicture.getAttribute("xunitlength") - 0;
  yunitlength = svgpicture.getAttribute("yunitlength") - 0;
  xmin = svgpicture.getAttribute("xmin") - 0;
  xmax = svgpicture.getAttribute("xmax") - 0;
  ymin = svgpicture.getAttribute("ymin") - 0;
  ymax = svgpicture.getAttribute("ymax") - 0;
  origin = [
    svgpicture.getAttribute("ox") - 0,
    svgpicture.getAttribute("oy") - 0,
  ];
}
function updatePicture(f) {
  var g;
  g =
    "object" == typeof f
      ? f.id.slice(0, -6)
      : "string" == typeof f
      ? f
      : "picture" + (f + 1);
  f = document.getElementById(g + "input").value;
  ygrid = yscl = xgrid = xscl = ymax = ymin = xmax = xmin = null;
  initialized = !1;
  picture = document.getElementById(g);
  translateandeval(f);
}
function changepicturesize(f, g) {
  var h = f.target.parentNode.getAttribute("name"),
    k = document.getElementById(h),
    l = document.getElementById(h + "input").value,
    l = l.replace(
      /width\s*=\s*\d+/,
      "width=" + g * (k.getAttribute("width") - 0)
    ),
    l = l.replace(
      /height\s*=\s*\d+/,
      "height=" + g * (k.getAttribute("height") - 0)
    );
  document.getElementById(h + "input").value = l;
  updatePicture(h);
}
var sinceFirstClick = 0,
  dblClkTimer;
function timer() {
  60 > sinceFirstClick
    ? (sinceFirstClick++, setTimeout("timer()", 10))
    : (clearTimeout(dblClkTimer), (dblClkTimer = ""));
}
function mClick(f) {
  0 != sinceFirstClick
    ? 40 >= sinceFirstClick
      ? (f.shiftKey
          ? changepicturesize(f, 2)
          : f.altKey
          ? changepicturesize(f, 0.5)
          : showHideCode(f),
        clearTimeout(dblClkTimer),
        (dblClkTimer = ""))
      : (clearTimeout(dblClkTimer),
        (sinceFirstClick = 0),
        (dblClkTimer = setTimeout("timer()", 10)))
    : ((sinceFirstClick = 0), (dblClkTimer = setTimeout("timer()", 10)));
}
function showHideCode(f) {
  f = f.target.parentNode.getAttribute("name");
  var g = document.getElementById(f + "input");
  g.style.display = "none" == g.style.display ? "" : "none";
  g = document.getElementById(f + "button");
  g.style.display = "none" == g.style.display ? "" : "none";
}
function showcode() {}
function setBorder(f) {
  border = f;
}
function initPicture(f, g, h, k) {
  if (!initialized)
    if (
      (setdefaults(),
      (initialized = !0),
      null != f && (xmin = f),
      null != g && (xmax = g),
      null != h && (ymin = h),
      null != k && (ymax = k),
      null == xmin && (xmin = defaultxmin),
      null == xmax && (xmax = defaultxmax),
      "number" != typeof xmin || "number" != typeof xmax || xmin >= xmax)
    )
      alert("Picture requires at least two numbers: xmin < xmax");
    else if (
      null != k &&
      ("number" != typeof h || "number" != typeof k || h >= k)
    )
      alert("initPicture(xmin,xmax,ymin,ymax) requires numbers ymin < ymax");
    else {
      null == width &&
        ((width = picture.getAttribute("width")),
        null == width || "" == width) &&
        (width = defaultwidth);
      picture.setAttribute("width", width);
      null == height &&
        ((height = picture.getAttribute("height")),
        null == height || "" == height) &&
        (height = defaultheight);
      picture.setAttribute("height", height);
      yunitlength = xunitlength = (width - 2 * border) / (xmax - xmin);
      null == ymin
        ? ((origin = [-xmin * xunitlength + border, height / 2]),
          (ymin = -(height - 2 * border) / (2 * yunitlength)),
          (ymax = -ymin))
        : (null != ymax
            ? (yunitlength = (height - 2 * border) / (ymax - ymin))
            : (ymax = (height - 2 * border) / yunitlength + ymin),
          (origin = [
            -xmin * xunitlength + border,
            -ymin * yunitlength + border,
          ]));
      if (isIE) {
        if (void 0 == picture.FULLSCREEN)
          throw (setTimeout("drawPictures()", 50), "wait");
        svgpicture = picture.getSVGDocument().getElementById("root");
        if (null == svgpicture)
          throw (setTimeout("drawPictures()", 50), "wait");
        for (
          svgpicture = picture.getSVGDocument().getElementById("root");
          0 < svgpicture.childNodes.length;

        )
          svgpicture.removeChild(svgpicture.lastChild);
        svgpicture.setAttribute("width", width);
        svgpicture.setAttribute("height", height);
        svgpicture.setAttribute("name", picture.getAttribute("id"));
        doc = picture.getSVGDocument();
        f = document.getElementById(picture.getAttribute("id") + "mml");
        if (null != f)
          for (; 0 < f.childNodes.length; ) f.removeChild(f.lastChild);
      } else
        (f = document.createElementNS("http://www.w3.org/2000/svg", "svg")),
          f.setAttribute("id", picture.getAttribute("id")),
          f.setAttribute("name", picture.getAttribute("id")),
          f.setAttribute("style", "display:inline"),
          f.setAttribute("width", picture.getAttribute("width")),
          f.setAttribute("height", picture.getAttribute("height")),
          (picturepos = findPos(picture)),
          f.setAttribute("left", picturepos[0]),
          f.setAttribute("top", picturepos[1]),
          null != picture.parentNode
            ? picture.parentNode.replaceChild(f, picture)
            : svgpicture.parentNode.replaceChild(f, svgpicture),
          (svgpicture = f),
          (doc = document);
      svgpicture.setAttribute("xunitlength", xunitlength);
      svgpicture.setAttribute("yunitlength", yunitlength);
      svgpicture.setAttribute("xmin", xmin);
      svgpicture.setAttribute("xmax", xmax);
      svgpicture.setAttribute("ymin", ymin);
      svgpicture.setAttribute("ymax", ymax);
      svgpicture.setAttribute("ox", origin[0]);
      svgpicture.setAttribute("oy", origin[1]);
      f = myCreateElementSVG("rect");
      f.setAttribute("x", "0");
      f.setAttribute("y", "0");
      f.setAttribute("width", width);
      f.setAttribute("height", height);
      f.setAttribute("style", backgroundstyle);
      svgpicture.appendChild(f);
      svgpicture.setAttribute("onmousemove", "displayCoord(evt)");
      svgpicture.setAttribute("onmouseout", "removeCoord(evt)");
      svgpicture.setAttribute("onclick", "mClick(evt)");
      f = myCreateElementSVG("text");
      f.appendChild(doc.createTextNode(" "));
      svgpicture.appendChild(f);
      border = defaultborder;
    }
}
function line(f, g, h, k) {
  var l;
  null != h && (l = doc.getElementById(h));
  null == l &&
    ((l = myCreateElementSVG("path")),
    l.setAttribute("id", h),
    svgpicture.appendChild(l));
  l.setAttribute(
    "d",
    "M" +
      (f[0] * xunitlength + origin[0]) +
      "," +
      (height - f[1] * yunitlength - origin[1]) +
      " " +
      (g[0] * xunitlength + origin[0]) +
      "," +
      (height - g[1] * yunitlength - origin[1])
  );
  l.setAttribute("stroke-width", strokewidth);
  null != strokedasharray &&
    l.setAttribute("stroke-dasharray", strokedasharray);
  l.setAttribute("stroke", stroke);
  l.setAttribute("fill", fill);
  l.setAttribute("stroke-opacity", strokeopacity);
  l.setAttribute("fill-opacity", fillopacity);
  "dot" == marker || "arrowdot" == marker
    ? (ASdot(f, markersize, markerstroke, markerfill),
      "arrowdot" == marker && arrowhead(f, g),
      ASdot(g, markersize, markerstroke, markerfill))
    : "arrow" == marker && arrowhead(f, g);
  null == k && "" != endpoints && (k = endpoints);
  null != k &&
    (-1 != k.indexOf("<-") && arrowhead(g, f),
    -1 != k.indexOf("o-") && dot(f, "open"),
    -1 != k.indexOf("*-") && dot(f, "closed"),
    -1 != k.indexOf("->") && arrowhead(f, g),
    -1 != k.indexOf("-o") && dot(g, "open"),
    -1 != k.indexOf("-*") && dot(g, "closed"));
}
function path(f, g, h, k) {
  null == h && (h = "");
  var l, m;
  null != g && (l = doc.getElementById(g));
  null == l &&
    ((l = myCreateElementSVG("path")),
    l.setAttribute("id", g),
    svgpicture.appendChild(l));
  if ("string" == typeof f) g = f;
  else
    for (
      g =
        "M" +
        (f[0][0] * xunitlength +
          origin[0] +
          "," +
          (height - f[0][1] * yunitlength - origin[1]) +
          " " +
          h),
        m = 1;
      m < f.length;
      m++
    )
      g +=
        f[m][0] * xunitlength +
        origin[0] +
        "," +
        (height - f[m][1] * yunitlength - origin[1]) +
        " ";
  l.setAttribute("d", g);
  l.setAttribute("stroke-width", strokewidth);
  null != strokedasharray &&
    l.setAttribute("stroke-dasharray", strokedasharray);
  l.setAttribute("stroke", stroke);
  l.setAttribute("fill", fill);
  l.setAttribute("stroke-opacity", strokeopacity);
  l.setAttribute("fill-opacity", fillopacity);
  if ("dot" == marker || "arrowdot" == marker)
    for (m = 0; m < f.length; m++)
      (("C" != h && "T" != h) || (1 != m && 2 != m)) &&
        ASdot(f[m], markersize, markerstroke, markerfill);
  null == k && "" != endpoints && (k = endpoints);
  null != k &&
    (-1 != k.indexOf("<-") && arrowhead(f[1], f[0]),
    -1 != k.indexOf("o-") && dot(f[0], "open"),
    -1 != k.indexOf("*-") && dot(f[0], "closed"),
    -1 != k.indexOf("->") && arrowhead(f[f.length - 2], f[f.length - 1]),
    -1 != k.indexOf("-o") && dot(f[f.length - 1], "open"),
    -1 != k.indexOf("-*") && dot(f[f.length - 1], "closed"));
}
function curve(f, g, h) {
  path(f, g, "T", h);
}
function vector(f, g, h) {
  line(f, g, h, "", "->");
}
function circle(f, g, h) {
  var k;
  null != h && (k = doc.getElementById(h));
  null == k &&
    ((k = myCreateElementSVG("circle")),
    k.setAttribute("id", h),
    svgpicture.appendChild(k));
  k.setAttribute("cx", f[0] * xunitlength + origin[0]);
  k.setAttribute("cy", height - f[1] * yunitlength - origin[1]);
  k.setAttribute("r", g * xunitlength);
  k.setAttribute("stroke-width", strokewidth);
  k.setAttribute("stroke", stroke);
  k.setAttribute("fill", fill);
  k.setAttribute("stroke-opacity", strokeopacity);
  k.setAttribute("fill-opacity", fillopacity);
}
function loop(f, g, h) {
  null == g && (g = [1, 0]);
  path([f, [f[0] + g[0], f[1] + g[1]], [f[0] - g[1], f[1] + g[0]], f], h, "C");
  ("arrow" != marker && "arrowdot" != marker) ||
    arrowhead(
      [
        f[0] + Math.cos(1.4) * g[0] - Math.sin(1.4) * g[1],
        f[1] + Math.sin(1.4) * g[0] + Math.cos(1.4) * g[1],
      ],
      f
    );
}
function arc(f, g, h, k) {
  var l;
  null != k && (l = doc.getElementById(k));
  null == h &&
    ((h = [g[0] - f[0], g[1] - f[1]]),
    (h = Math.sqrt(h[0] * h[0] + h[1] * h[1])));
  null == l &&
    ((l = myCreateElementSVG("path")),
    l.setAttribute("id", k),
    svgpicture.appendChild(l));
  l.setAttribute(
    "d",
    "M" +
      (f[0] * xunitlength + origin[0]) +
      "," +
      (height - f[1] * yunitlength - origin[1]) +
      " A" +
      h * xunitlength +
      "," +
      h * yunitlength +
      " 0 0,0 " +
      (g[0] * xunitlength + origin[0]) +
      "," +
      (height - g[1] * yunitlength - origin[1])
  );
  l.setAttribute("stroke-width", strokewidth);
  l.setAttribute("stroke", stroke);
  l.setAttribute("fill", fill);
  l.setAttribute("stroke-opacity", strokeopacity);
  l.setAttribute("fill-opacity", fillopacity);
  "arrow" == marker || "arrowdot" == marker
    ? ((u = [(g[1] - f[1]) / 4, (f[0] - g[0]) / 4]),
      (h = [(g[0] - f[0]) / 2, (g[1] - f[1]) / 2]),
      (h = [f[0] + h[0] + u[0], f[1] + h[1] + u[1]]))
    : (h = [f[0], f[1]]);
  "dot" == marker || "arrowdot" == marker
    ? (ASdot(f, markersize, markerstroke, markerfill),
      "arrowdot" == marker && arrowhead(h, g),
      ASdot(g, markersize, markerstroke, markerfill))
    : "arrow" == marker && arrowhead(h, g);
}
function sector(f, g, h, k) {
  var l = g[0] - f[0],
    m = g[1] - f[1];
  arc(g, h, Math.sqrt(l * l + m * m), k + "arc");
  path([h, f, g], k + "path");
}
function ellipse(f, g, h, k) {
  var l;
  null != k && (l = doc.getElementById(k));
  null == l &&
    ((l = myCreateElementSVG("ellipse")),
    l.setAttribute("id", k),
    svgpicture.appendChild(l));
  l.setAttribute("cx", f[0] * xunitlength + origin[0]);
  l.setAttribute("cy", height - f[1] * yunitlength - origin[1]);
  l.setAttribute("rx", g * xunitlength);
  l.setAttribute("ry", h * yunitlength);
  l.setAttribute("stroke-width", strokewidth);
  l.setAttribute("stroke", stroke);
  l.setAttribute("fill", fill);
  l.setAttribute("stroke-opacity", strokeopacity);
  l.setAttribute("fill-opacity", fillopacity);
}
function triangle(f, g, h, k) {
  path([f, g, h, f], k);
}
function rect(f, g, h, k, l) {
  var m;
  null != h && (m = doc.getElementById(h));
  null == m &&
    ((m = myCreateElementSVG("rect")),
    m.setAttribute("id", h),
    svgpicture.appendChild(m));
  m.setAttribute("x", f[0] * xunitlength + origin[0]);
  m.setAttribute("y", height - g[1] * yunitlength - origin[1]);
  m.setAttribute("width", (g[0] - f[0]) * xunitlength);
  m.setAttribute("height", (g[1] - f[1]) * yunitlength);
  null != k && m.setAttribute("rx", k * xunitlength);
  null != l && m.setAttribute("ry", l * yunitlength);
  m.setAttribute("stroke-width", strokewidth);
  m.setAttribute("stroke", stroke);
  m.setAttribute("fill", fill);
  m.setAttribute("stroke-opacity", strokeopacity);
  m.setAttribute("fill-opacity", fillopacity);
}
function text(f, g, h, k, l) {
  var m,
    q = 0,
    r = fontsize / 3;
  if (/(`|\$)/.test(g)) {
    l = document.getElementById(svgpicture.getAttribute("name") + "mml");
    if (null != l) {
      null != k && (m = document.getElementById(k));
      null == m &&
        ((m = myCreateElementXHTML("div")),
        m.setAttribute("id", k),
        (m.style.position = "absolute"),
        l.appendChild(m));
      for (; 0 < m.childNodes.length; ) m.removeChild(m.lastChild);
      m.appendChild(document.createTextNode(g));
      m.style.left = "" + (f[0] * xunitlength + origin[0]) + "px";
      m.style.top = "" + (height - f[1] * yunitlength - origin[1]) + "px";
      /`/.test(g) ? AMprocessNode(m) : LMprocessNode(m);
      q = -m.offsetWidth / 2;
      r = -m.offsetHeight / 2;
      null != h &&
        (/above/.test(h) && (r = -m.offsetHeight),
        /below/.test(h) && (r = 0),
        /right/.test(h) && (q = 0),
        /left/.test(h) && (q = -m.offsetWidth));
      m.style.left = "" + (f[0] * xunitlength + origin[0] + q) + "px";
      m.style.top = "" + (height - f[1] * yunitlength - origin[1] + r) + "px";
    }
    return f;
  }
  var s = "middle";
  null != h &&
    (/above/.test(h) && (r = -fontsize / 2),
    /below/.test(h) && (r = fontsize - 0),
    /right/.test(h) && ((s = "start"), (q = fontsize / 4)),
    /left/.test(h) && ((s = "end"), (q = -fontsize / 4)));
  null != k && (m = doc.getElementById(k));
  null == m &&
    ((m = myCreateElementSVG("text")),
    m.setAttribute("id", k),
    svgpicture.appendChild(m),
    m.appendChild(doc.createTextNode(g)));
  for (; 1 < m.childNodes.length; ) m.removeChild(m.lastChild);
  m.lastChild.nodeValue = "\u00a0" + g + "\u00a0";
  m.setAttribute("x", f[0] * xunitlength + origin[0] + q);
  m.setAttribute("y", height - f[1] * yunitlength - origin[1] + r);
  m.setAttribute(
    "font-style",
    null != l ? l : -1 != g.search(/^[a-zA-Z]$/) ? "italic" : fontstyle
  );
  m.setAttribute("font-family", fontfamily);
  m.setAttribute("font-size", fontsize);
  m.setAttribute("font-weight", fontweight);
  m.setAttribute("text-anchor", s);
  "none" != fontstroke && m.setAttribute("stroke", fontstroke);
  "none" != fontfill && m.setAttribute("fill", fontfill);
  return f;
}
function mtext(f, g, h, k) {
  var l = "middle",
    m = 0,
    q = fontsize / 3;
  if (null != h) {
    "above" == h.slice(0, 5) && (q = -fontsize / 2);
    "below" == h.slice(0, 5) && (q = fontsize - 0);
    if ("right" == h.slice(0, 5) || "right" == h.slice(5, 10))
      (l = "start"), (m = fontsize / 2);
    if ("left" == h.slice(0, 4) || "left" == h.slice(5, 9))
      (l = "end"), (m = -fontsize / 2);
  }
  h = this;
  "svg" == this.nodeName &&
    ((h = myCreateElementSVG("text")),
    this.appendChild(h),
    h.appendChild(doc.createTextNode(g)));
  h.lastChild.nodeValue = g;
  h.setAttribute("x", f[0] + m);
  h.setAttribute("y", f[1] + q);
  h.setAttribute("font-style", null != k ? k : fontstyle);
  h.setAttribute("font-family", fontfamily);
  h.setAttribute("font-size", fontsize);
  h.setAttribute("font-weight", fontweight);
  h.setAttribute("text-anchor", l);
  "none" != fontstroke && h.setAttribute("stroke", fontstroke);
  "none" != fontfill && h.setAttribute("fill", fontfill);
}
function image(f, g, h, k, l) {
  var m;
  null != l && (m = doc.getElementById(l));
  null == m &&
    ((m = myCreateElementSVG("image")),
    m.setAttribute("id", l),
    svgpicture.appendChild(m));
  m.setAttribute("x", g[0] * xunitlength + origin[0]);
  m.setAttribute("y", height - g[1] * yunitlength - origin[1]);
  m.setAttribute("width", h);
  m.setAttribute("height", k);
  m.setAttribute("xlink:href", f);
}
function ASdot(f, g, h, k) {
  null == h && (h = stroke);
  null == k && (k = fill);
  var l = myCreateElementSVG("circle");
  l.setAttribute("cx", f[0] * xunitlength + origin[0]);
  l.setAttribute("cy", height - f[1] * yunitlength - origin[1]);
  l.setAttribute("r", g);
  l.setAttribute("stroke-width", strokewidth);
  l.setAttribute("stroke", h);
  l.setAttribute("fill", k);
  svgpicture.appendChild(l);
}
function dot(f, g, h, k, l) {
  var m,
    q = f[0] * xunitlength + origin[0],
    r = height - f[1] * yunitlength - origin[1];
  null != l && (m = doc.getElementById(l));
  "+" == g || "-" == g || "|" == g
    ? (null == m &&
        ((m = myCreateElementSVG("path")),
        m.setAttribute("id", l),
        svgpicture.appendChild(m)),
      "+" == g
        ? (m.setAttribute(
            "d",
            " M " +
              (q - ticklength) +
              " " +
              r +
              " L " +
              (q + ticklength) +
              " " +
              r +
              " M " +
              q +
              " " +
              (r - ticklength) +
              " L " +
              q +
              " " +
              (r + ticklength)
          ),
          m.setAttribute("stroke-width", 0.5),
          m.setAttribute("stroke", axesstroke))
        : ("-" == g
            ? m.setAttribute(
                "d",
                " M " +
                  (q - ticklength) +
                  " " +
                  r +
                  " L " +
                  (q + ticklength) +
                  " " +
                  r
              )
            : m.setAttribute(
                "d",
                " M " +
                  q +
                  " " +
                  (r - ticklength) +
                  " L " +
                  q +
                  " " +
                  (r + ticklength)
              ),
          m.setAttribute("stroke-width", strokewidth),
          m.setAttribute("stroke", stroke)))
    : (null == m &&
        ((m = myCreateElementSVG("circle")),
        m.setAttribute("id", l),
        svgpicture.appendChild(m)),
      m.setAttribute("cx", q),
      m.setAttribute("cy", r),
      m.setAttribute("r", dotradius),
      m.setAttribute("stroke-width", strokewidth),
      m.setAttribute("stroke", stroke),
      m.setAttribute(
        "fill",
        "open" == g ? "white" : "closed" == g ? stroke : markerfill
      ));
  null != h && text(f, h, null == k ? "below" : k, null == l ? l : l + "label");
}
point = dot;
function arrowhead(f, g) {
  var h,
    k = [
      f[0] * xunitlength + origin[0],
      height - f[1] * yunitlength - origin[1],
    ],
    l = [
      g[0] * xunitlength + origin[0],
      height - g[1] * yunitlength - origin[1],
    ],
    k = [l[0] - k[0], l[1] - k[1]];
  h = Math.sqrt(k[0] * k[0] + k[1] * k[1]);
  if (1e-8 < h) {
    k = [k[0] / h, k[1] / h];
    h = [-k[1], k[0]];
    var m = myCreateElementSVG("path");
    m.setAttribute(
      "d",
      "M " +
        (l[0] - 15 * k[0] - 4 * h[0]) +
        " " +
        (l[1] - 15 * k[1] - 4 * h[1]) +
        " L " +
        (l[0] - 3 * k[0]) +
        " " +
        (l[1] - 3 * k[1]) +
        " L " +
        (l[0] - 15 * k[0] + 4 * h[0]) +
        " " +
        (l[1] - 15 * k[1] + 4 * h[1]) +
        " z"
    );
    m.setAttribute("stroke-width", markerstrokewidth);
    m.setAttribute("stroke", stroke);
    m.setAttribute("fill", stroke);
    m.setAttribute("stroke-opacity", strokeopacity);
    m.setAttribute("fill-opacity", fillopacity);
    svgpicture.appendChild(m);
  }
}
function chopZ(f) {
  var g = f.indexOf(".");
  if (-1 == g) return f;
  for (var h = f.length - 1; h > g && "0" == f.charAt(h); h--);
  h == g && h--;
  return f.slice(0, h + 1);
}
function grid(f, g) {
  axes(f, g, null, f, g);
}
function noaxes() {
  initialized || initPicture();
}
function axes(f, g, h, k, l) {
  var m, q, r, s, v;
  initialized || initPicture();
  "string" == typeof f && ((h = f), (f = null));
  "string" == typeof g && ((k = g), (g = null));
  null != xscl && (h = k = f = xscl);
  null != yscl && (l = g = yscl);
  null != xtick && (f = xtick);
  null != ytick && (g = ytick);
  f = null == f ? xunitlength : f * xunitlength;
  g = null == g ? f : g * yunitlength;
  fontsize = Math.min(f / 2, g / 2, 16);
  ticklength = fontsize / 4;
  null != xgrid && (k = xgrid);
  null != ygrid && (l = ygrid);
  if (null != k) {
    k = "string" == typeof k ? f : k * xunitlength;
    l = null == l ? g : l * yunitlength;
    s = myCreateElementSVG("path");
    v = "";
    for (m = origin[0]; m < width; m += k)
      v += " M" + m + ",0 " + m + "," + height;
    for (m = origin[0] - k; 0 < m; m -= k)
      v += " M" + m + ",0 " + m + "," + height;
    for (m = height - origin[1]; m < height; m += l)
      v += " M0," + m + " " + width + "," + m;
    for (m = height - origin[1] - l; 0 < m; m -= l)
      v += " M0," + m + " " + width + "," + m;
    s.setAttribute("d", v);
    s.setAttribute("stroke-width", 0.5);
    s.setAttribute("stroke", gridstroke);
    s.setAttribute("fill", fill);
    svgpicture.appendChild(s);
  }
  s = myCreateElementSVG("path");
  v =
    "M0," +
    (height - origin[1]) +
    " " +
    width +
    "," +
    (height - origin[1]) +
    " M" +
    origin[0] +
    ",0 " +
    origin[0] +
    "," +
    height;
  for (m = origin[0] + f; m < width; m += f)
    v +=
      " M" +
      m +
      "," +
      (height - origin[1] + ticklength) +
      " " +
      m +
      "," +
      (height - origin[1] - ticklength);
  for (m = origin[0] - f; 0 < m; m -= f)
    v +=
      " M" +
      m +
      "," +
      (height - origin[1] + ticklength) +
      " " +
      m +
      "," +
      (height - origin[1] - ticklength);
  for (m = height - origin[1] + g; m < height; m += g)
    v +=
      " M" +
      (origin[0] + ticklength) +
      "," +
      m +
      " " +
      (origin[0] - ticklength) +
      "," +
      m;
  for (m = height - origin[1] - g; 0 < m; m -= g)
    v +=
      " M" +
      (origin[0] + ticklength) +
      "," +
      m +
      " " +
      (origin[0] - ticklength) +
      "," +
      m;
  if (null != h)
    with (Math) {
      f /= xunitlength;
      g /= yunitlength;
      h = 0 < xmin || 0 > xmax ? xmin : 0;
      q = 0 < ymin || 0 > ymax ? ymin : 0;
      r = 0 == q ? "below" : "above";
      l = 0 == h ? "left" : "right";
      var w = floor(1.1 - log(f) / log(10)) + 1;
      k = floor(1.1 - log(g) / log(10)) + 1;
      for (m = f; m <= xmax; m += f) text([m, q], chopZ(m.toFixed(w)), r);
      for (m = -f; xmin <= m; m -= f) text([m, q], chopZ(m.toFixed(w)), r);
      for (m = g; m <= ymax; m += g) text([h, m], chopZ(m.toFixed(k)), l);
      for (m = -g; ymin <= m; m -= g) text([h, m], chopZ(m.toFixed(k)), l);
    }
  fontsize = defaultfontsize;
  s.setAttribute("d", v);
  s.setAttribute("stroke-width", 0.5);
  s.setAttribute("stroke", axesstroke);
  s.setAttribute("fill", fill);
  s.setAttribute("stroke-opacity", strokeopacity);
  s.setAttribute("fill-opacity", fillopacity);
  svgpicture.appendChild(s);
}
function mathjs(f) {
  f = f.replace(/\s/g, "");
  -1 != f.indexOf("^-1") &&
    ((f = f.replace(/sin\^-1/g, "arcsin")),
    (f = f.replace(/cos\^-1/g, "arccos")),
    (f = f.replace(/tan\^-1/g, "arctan")),
    (f = f.replace(/sec\^-1/g, "arcsec")),
    (f = f.replace(/csc\^-1/g, "arccsc")),
    (f = f.replace(/cot\^-1/g, "arccot")),
    (f = f.replace(/sinh\^-1/g, "arcsinh")),
    (f = f.replace(/cosh\^-1/g, "arccosh")),
    (f = f.replace(/tanh\^-1/g, "arctanh")),
    (f = f.replace(/sech\^-1/g, "arcsech")),
    (f = f.replace(/csch\^-1/g, "arccsch")),
    (f = f.replace(/coth\^-1/g, "arccoth")));
  f = f.replace(/^e$/g, "(Math.E)");
  f = f.replace(/^e([^a-zA-Z])/g, "(Math.E)$1");
  f = f.replace(/([^a-zA-Z])e/g, "$1(Math.E)");
  f = f.replace(/([0-9])([\(a-zA-Z])/g, "$1*$2");
  f = f.replace(/\)([\(0-9a-zA-Z])/g, ")*$1");
  for (var g, h, k, l, m; -1 != (g = f.indexOf("^")); ) {
    if (0 == g) return "Error: missing argument";
    h = g - 1;
    l = f.charAt(h);
    if ("0" <= l && "9" >= l) {
      for (h--; 0 <= h && "0" <= (l = f.charAt(h)) && "9" >= l; ) h--;
      if ("." == l)
        for (h--; 0 <= h && "0" <= (l = f.charAt(h)) && "9" >= l; ) h--;
    } else if (")" == l) {
      m = 1;
      for (h--; 0 <= h && 0 < m; )
        (l = f.charAt(h)), "(" == l ? m-- : ")" == l && m++, h--;
      for (
        ;
        (0 <= h && "a" <= (l = f.charAt(h)) && "z" >= l) ||
        ("A" <= l && "Z" >= l);

      )
        h--;
    } else if (("a" <= l && "z" >= l) || ("A" <= l && "Z" >= l))
      for (
        h--;
        (0 <= h && "a" <= (l = f.charAt(h)) && "z" >= l) ||
        ("A" <= l && "Z" >= l);

      )
        h--;
    else return "Error: incorrect syntax in " + f + " at position " + h;
    if (g == f.length - 1) return "Error: missing argument";
    k = g + 1;
    l = f.charAt(k);
    if (("0" <= l && "9" >= l) || "-" == l) {
      for (k++; k < f.length && "0" <= (l = f.charAt(k)) && "9" >= l; ) k++;
      if ("." == l)
        for (k++; k < f.length && "0" <= (l = f.charAt(k)) && "9" >= l; ) k++;
    } else if ("(" == l)
      for (m = 1, k++; k < f.length && 0 < m; )
        (l = f.charAt(k)), "(" == l ? m++ : ")" == l && m--, k++;
    else if (("a" <= l && "z" >= l) || ("A" <= l && "Z" >= l))
      for (
        k++;
        (k < f.length && "a" <= (l = f.charAt(k)) && "z" >= l) ||
        ("A" <= l && "Z" >= l);

      )
        k++;
    else return "Error: incorrect syntax in " + f + " at position " + k;
    f =
      f.slice(0, h + 1) +
      "Math.pow(" +
      f.slice(h + 1, g) +
      "," +
      f.slice(g + 1, k) +
      ")" +
      f.slice(k);
  }
  for (; -1 != (g = f.indexOf("!")); ) {
    if (0 == g) return "Error: missing argument";
    h = g - 1;
    l = f.charAt(h);
    if ("0" <= l && "9" >= l) {
      for (h--; 0 <= h && "0" <= (l = f.charAt(h)) && "9" >= l; ) h--;
      if ("." == l)
        for (h--; 0 <= h && "0" <= (l = f.charAt(h)) && "9" >= l; ) h--;
    } else if (")" == l) {
      m = 1;
      for (h--; 0 <= h && 0 < m; )
        (l = f.charAt(h)), "(" == l ? m-- : ")" == l && m++, h--;
      for (
        ;
        (0 <= h && "a" <= (l = f.charAt(h)) && "z" >= l) ||
        ("A" <= l && "Z" >= l);

      )
        h--;
    } else if (("a" <= l && "z" >= l) || ("A" <= l && "Z" >= l))
      for (
        h--;
        (0 <= h && "a" <= (l = f.charAt(h)) && "z" >= l) ||
        ("A" <= l && "Z" >= l);

      )
        h--;
    else return "Error: incorrect syntax in " + f + " at position " + h;
    f =
      f.slice(0, h + 1) +
      "factorial(" +
      f.slice(h + 1, g) +
      ")" +
      f.slice(g + 1);
  }
  return f;
}
function plot(f, g, h, k, l, m) {
  var q = [],
    r = null;
  "string" == typeof f
    ? eval("g = function(x){ with(Math) return " + mathjs(f) + " }")
    : "object" == typeof f &&
      (eval("f = function(t){ with(Math) return " + mathjs(f[0]) + " }"),
      eval("g = function(t){ with(Math) return " + mathjs(f[1]) + " }"));
  "string" == typeof g ? ((r = g), (g = xmin)) : (r = l);
  l = null == g ? xmin : g;
  h = null == h ? xmax : h;
  g = h - l - 1e-6 * (h - l);
  for (g = null == k ? g / 200 : g / k; l <= h; l += g)
    (k = f(l)), isNaN(k) || "Infinity" == Math.abs(k) || (q[q.length] = [l, k]);
  path(q, r, null, m);
  return p;
}
function slopefield(f, g, h) {
  "string" == typeof f &&
    eval("g = function(x,y){ with(Math) return " + mathjs(f) + " }");
  var k, l, m, q, r;
  null == g && (g = 1);
  null == h && (h = 1);
  r = Math.sqrt(g * g + h * h) / 6;
  l = Math.ceil(xmin / g);
  for (var s = Math.ceil(ymin / h); l <= xmax; l += g)
    for (m = s; m <= ymax; m += h)
      (k = f(l, m)),
        isNaN(k) ||
          ("Infinity" == Math.abs(k)
            ? ((q = 0), (k = r))
            : ((q = r / Math.sqrt(1 + k * k)), (k *= q)),
          line([l - q, m - k], [l + q, m + k]));
}
function show_props(f) {
  for (var g = "", h = 0; h < f.childNodes.length; h++)
    g += f.childNodes.item(h) + "\n";
  return g;
}
function displayCoord(f) {
  if (showcoordinates) {
    for (
      var g = f.target.parentNode, h = g.childNodes, k = 0;
      k < h.length && "text" != h.item(k).nodeName;
      k++
    );
    h = h.item(k);
    h.mtext = mtext;
    h.mtext(
      [g.getAttribute("width") - 0, g.getAttribute("height") - 0],
      "(" + getX(f).toFixed(2) + ", " + getY(f).toFixed(2) + ")",
      "aboveleft",
      ""
    );
  }
}
function removeCoord(f) {
  f = f.target.parentNode;
  for (
    var g = f.childNodes, h = 0;
    h < g.length && "text" != g.item(h).nodeName;
    h++
  );
  g = g.item(h);
  g.mtext = mtext;
  g.mtext(
    [f.getAttribute("width") - 0, f.getAttribute("height") - 0],
    "",
    "aboveleft",
    ""
  );
}
function initASCIIMathCalculators(f) {
  var g;
  for (g = 0; g < f.length; g++)
    (f[g].innerHTML = calcstr), AMprocessNode(f[g]);
  f = document.getElementsByTagName("textarea");
  var h;
  for (g = 0; g < f.length; g++)
    (h = f[g].getAttribute("onkeyup")),
      null != h && eval(String(h).replace(/function anonymous\(\)/, ""));
}
function calculate(f, g) {
  var h = document.getElementById(f).value,
    h = h.replace(/\,/gi, "."),
    k = "",
    l = h.lastIndexOf("\n");
  l == h.length - 1 && (h = h.slice(0, l));
  h = h.slice(h.lastIndexOf("\n") + 1);
  try {
    var m = eval(mathjs(h));
  } catch (q) {
    k = "niekompletna sk\u0142adnia";
  }
  isNaN(m) || "niesko\u0144czono\u00b6\u0107" == m
    ? "" != h && (h = "`" + h + "` = zła składnia")
    : (h =
        "`" +
        h +
        " =` " +
        (1e-15 > Math.abs(m - Math.round(1e6 * m) / 1e6)
          ? Math.round(1e6 * m) / 1e6
          : m) +
        k);
  k = document.getElementById(g);
  l = k.childNodes.length;
  for (m = 0; m < l; m++) k.removeChild(k.firstChild);
  k.appendChild(document.createTextNode(h));
  AMprocessNode(k);
}
function append(f) {
  document.getElementById("in").value += f;
  calculate("in", "out");
  document.getElementById("in").scrollTop = 1e3;
  document.getElementById("in").focus();
}
function clearTextArea() {
  document.getElementById("in").value = "";
  calculate("in", "out");
  document.getElementById("in").focus();
}
var calcstr =
  '<table align="center">\n<tr><th>\nASCIIMath Scientific Calculator\n</th></tr>\n<tr><td>\nClick in the box to use your keyboard or use the buttons\n</td></tr>\n<tr><td>\n<textarea id="in" rows="3" cols="40" onkeyup="calculate(\'in\',\'out\')"></textarea></td></tr>\n<tr><td height="50">Result: &nbsp; &nbsp; <span id="out"></span></td></tr>\n</table>\n<table align="center" cellspacing="0" cellpadding="0">\n<tbody align="center">\n<tr>\n<td colspan="4">\n<button onclick="append(\'sin^-1(\')"><font size=2>`sin^-1`</font></button><button onclick="append(\'cos^-1(\')"><font size=2>`cos^-1`</font></button><button onclick="append(\'tan^-1(\')"><font size=2>`tan^-1`</font></button></td>\n<td><button onclick="clearTextArea()">&nbsp;`C`&nbsp;</button></td>\n\n</tr>\n<tr>\n<td><button onclick="append(\'pi\')">&nbsp;`pi` &nbsp;</button></td>\n<td><button onclick="append(\'sin(\')">&nbsp;`sin`</button></td>\n<td><button onclick="append(\'cos(\')">&nbsp;`cos`</button></td>\n<td><button onclick="append(\'tan(\')">&nbsp;`tan`</button></td>\n<td><button onclick="append(\'^\')">`x^y`</button></td>\n</tr>\n<tr>\n<td><button onclick="append(\'!\')">&nbsp; `!` &nbsp;</button></td>\n\n<td><button onclick="append(\'(\')"><font size=2>&nbsp;&nbsp;`(`&nbsp;&nbsp;</font></button></td>\n<td><button onclick="append(\')\')"><font size=2>&nbsp;&nbsp;`)`&nbsp;&nbsp;</font></button></td>\n<td><button onclick="append(\'sqrt(\')"><font size=2>`sqrt({::}^ )`</font></button></td>\n<td><button onclick="append(\'/\')">&nbsp;`-: `</button></td>\n</tr>\n<tr>\n<td><button onclick="append(\'log(\')">`log`</button></td>\n<td><button onclick="append(\'7\')">&nbsp; `7` &nbsp;</button></td>\n<td><button onclick="append(\'8\')">&nbsp; `8` &nbsp;</button></td>\n\n<td><button onclick="append(\'9\')">&nbsp; `9` &nbsp;</button></td>\n<td><button onclick="append(\'*\')">&nbsp;`times`&nbsp;</button></td>\n</tr>\n<tr>\n<td><button onclick="append(\'ln(\')">&nbsp;`ln`&nbsp;</button></td>\n<td><button onclick="append(\'4\')">&nbsp; `4` &nbsp;</button></td>\n<td><button onclick="append(\'5\')">&nbsp; `5` &nbsp;</button></td>\n<td><button onclick="append(\'6\')">&nbsp; `6` &nbsp;</button></td>\n\n<td><button onclick="append(\'-\')">&nbsp;`-{::}`&nbsp;</button></td>\n</tr>\n<tr>\n<td><button onclick="append(\'e\')">&nbsp; `e` &nbsp;</button></td>\n<td><button onclick="append(\'1\')">&nbsp;&nbsp;`1` &nbsp;</button></td>\n<td><button onclick="append(\'2\')">&nbsp; `2` &nbsp;</button></td>\n<td><button onclick="append(\'3\')">&nbsp; `3` &nbsp;</button></td>\n<td><button onclick="append(\'+\')">&nbsp;`+{::}`&nbsp;</button></td>\n\n</tr>\n<tr>\n<td> \x3c!--button onclick="append(\'pi\')">&nbsp;`pi` &nbsp;</button--\x3e</td>\n<td><button onclick="append(\'0\')">&nbsp; `0` &nbsp;</button></td>\n<td><button onclick="append(\'.\')">&nbsp; `.` &nbsp;</button></td>\n<td><button onclick="append(\'\\n\')">&nbsp;`"ent"`</button></td>\n</tr>\n</tbody>\n</table>';
function generic() {
  if (translateOnLoad) {
    var f = document.getElementById("processasciimathinmoodle");
    null != f && (dsvglocation = f.className);
    (null == f && checkforprocessasciimathinmoodle) ||
      (translateLaTeX && LMtranslate(),
      translateASCIIMath && translate(),
      translateASCIIsvg && drawPictures());
    f = getElementsByClass(document, "div", "ASCIIMathCalculator");
    0 < f.length && initASCIIMathCalculators(f);
  }
}
if ("zła składnia" != typeof window.addEventListener)
  window.addEventListener("load", generic, !1);
else if ("zła składnia" != typeof document.addEventListener)
  document.addEventListener("load", generic, !1);
else if ("zła składnia" != typeof window.attachEvent)
  window.attachEvent("onload", generic);
else if ("function" == typeof window.onload) {
  var existing = onload;
  window.onload = function () {
    existing();
    generic();
  };
} else window.onload = generic;
function insert(txt) {
  document.getElementById("in").value = txt;
}
