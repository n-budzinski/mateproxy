function _(d) {
  return document.getElementById(d);
}
var tablica_funkcji,
  tablica_funkcji_czystych,
  ile_funkcji,
  formula2,
  dokladnosc,
  skala,
  srodek_x,
  srodek_y,
  canvas_id = "mainCanvas",
  canvas = _(canvas_id),
  context,
  width = 10,
  height = 10,
  xRange,
  yRange,
  _xMid,
  _yMid,
  xMin,
  xMax,
  yMin,
  yMax,
  _yAspect,
  skok = 0.1,
  stala_skoku = 500,
  a = 1,
  b = 1,
  c = 1,
  m = 1,
  p = 1,
  q = 1,
  skok_parametru = 10,
  a_min = skok_parametru,
  b_min = skok_parametru,
  c_min = skok_parametru,
  m_min = skok_parametru,
  p_min = skok_parametru,
  q_min = skok_parametru,
  slideButtonDown = !1,
  slideTouchDown = !1,
  zoomButtonDown = !1,
  zoomTouchDown = !1,
  stretchButtonDown = !1,
  stretchTouchDown = !1,
  lastMouseX = 0,
  lastMouseY = 0,
  lastTouchX1 = 0,
  lastTouchX2 = 0,
  lastTouchMidX = 0,
  lastTouchY1 = 0,
  lastTouchY2 = 0,
  lastTouchMidY = 0,
  lastTouchSpace = 0,
  pi = Math.PI,
  blackList =
    "; for new ml $ ). ook ipt doc win set get tim net post black y va eva [] ![ {} [".split(
      " "
    ),
  test_mz = 0,
  test_y = 0,
  test_ekstrema = 0,
  test_punkty_przeciecia = 0,
  test_pochodne = 0,
  test_obszary = 0,
  test_calka = 0,
  test_asymptoty = 0,
  test_osie = 0,
  test_siatka = 0,
  test_os_x = 0,
  test_os_y = 0,
  test_podpisy = 0,
  test_x_szczegolne = 0,
  tablica_x_szczegolne,
  ile_x_szczegolne,
  font_size_wsp = 16,
  przedzial_calkowania_poczatek,
  przedzial_calkowania_koniec,
  tablica_f = [],
  liczba_skokow = width / skok,
  rangeMin_x,
  gridRange_x,
  rangeMin_y,
  gridRange_y,
  a = _("a").value,
  b = _("b").value,
  c = _("c").value,
  m = _("m").value,
  p = _("p").value,
  q = _("q").value;
ustal_granice_parametrow();
function tworz_wykres() {
  var d = _("wzor_funkcji").value;
  tablica_funkcji = Transform(d).split(";");
  ile_funkcji = tablica_funkcji.length;
  tablica_funkcji_czystych = d.split(";");
  formula2 = d.replace(/\+/g, "%2B");
  dokladnosc = 100;
  skala = 1 * _("skala").innerHTML;
  srodek_x = 1 * _("xc").innerHTML;
  srodek_y = 1 * _("yc").innerHTML;
  tablica_f = [];
  a = (_("a_range").value - a_min * skok_parametru) / skok_parametru;
  b = (_("b_range").value - b_min * skok_parametru) / skok_parametru;
  c = (_("c_range").value - c_min * skok_parametru) / skok_parametru;
  p = (_("p_range").value - p_min * skok_parametru) / skok_parametru;
  q = (_("q_range").value - q_min * skok_parametru) / skok_parametru;
  m = (_("m_range").value - m_min * skok_parametru) / skok_parametru;
  rysuj_wykres();
  _("parametry_c").style.display = "none";
  _("parametr_a_c").style.display = "none";
  _("parametr_b_c").style.display = "none";
  _("parametr_c_c").style.display = "none";
  _("parametr_m_c").style.display = "none";
  _("parametr_p_c").style.display = "none";
  _("parametr_q_c").style.display = "none";
  _("opcje_kilku_funkcji_c").style.display = "none";
  if (
    -1 < d.indexOf("a") ||
    -1 < d.indexOf("b") ||
    (-1 < d.indexOf("c") && -1 == d.indexOf("cos") && -1 == d.indexOf("ctg")) ||
    -1 < d.indexOf("m") ||
    -1 < d.indexOf("p") ||
    (-1 < d.indexOf("q") && -1 == d.indexOf("sqrt"))
  )
    _("parametry_c").style.display = "block";
  -1 < d.indexOf("a") && (_("parametr_a_c").style.display = "block");
  -1 < d.indexOf("b") && (_("parametr_b_c").style.display = "block");
  -1 < d.indexOf("c") &&
    -1 == d.indexOf("cos") &&
    -1 == d.indexOf("ctg") &&
    (_("parametr_c_c").style.display = "block");
  -1 < d.indexOf("m") && (_("parametr_m_c").style.display = "block");
  -1 < d.indexOf("p") && (_("parametr_p_c").style.display = "block");
  -1 < d.indexOf("q") &&
    -1 == d.indexOf("sqrt") &&
    (_("parametr_q_c").style.display = "block");
  1 < ile_funkcji && (_("opcje_kilku_funkcji_c").style.display = "block");
}
function rysuj_wykres() {
  canvas &&
    canvas.getContext &&
    (context = canvas.getContext("2d")) &&
    (setZoom(srodek_x, srodek_y, skala, skala), pobierz_ustawienia());
}
function setZoom(d, e, u, k) {
  _xMid = d;
  _yMid = e;
  xRange = u;
  xMin = d - 0.5 * xRange;
  xMax = d + 0.5 * xRange;
  yRange = k ? k : (xRange * canvas.clientHeight) / canvas.clientWidth;
  yMin = e - 0.5 * yRange;
  yMax = e + 0.5 * yRange;
  try {
    _yAspect = yRange / ((xRange * canvas.clientHeight) / canvas.clientWidth);
  } catch (t) {
    _yAspect = 1;
  }
  height = canvas.height = canvas.clientHeight;
  width = canvas.width = canvas.clientWidth;
  rangeMin_x = (14 * xRange) / width;
  gridRange_x = Math.pow(10, Math.ceil(Math.log(rangeMin_x) / Math.LN10));
  0.2 * gridRange_x > rangeMin_x
    ? (gridRange_x *= 0.2)
    : 0.5 * gridRange_x > rangeMin_x && (gridRange_x *= 0.5);
  rangeMin_y = (14 * yRange) / height;
  gridRange_y = Math.pow(10, Math.ceil(Math.log(rangeMin_y) / Math.LN10));
  0.2 * gridRange_y > rangeMin_y
    ? (gridRange_y *= 0.2)
    : 0.5 * gridRange_y > rangeMin_y && (gridRange_y *= 0.5);
  generuj_link();
}
var sc = 100;
function pobierz_ustawienia() {
  test_siatka = 1 == _("siatka").checked ? 1 : 0;
  test_os_x = 1 == _("os_x").checked ? 1 : 0;
  test_os_y = 1 == _("os_y").checked ? 1 : 0;
  test_podpisy = 1 == _("punkty_s").checked ? 1 : 0;
  if (void 0 != _("x_szczegolne_checkbox"))
    if (1 == _("x_szczegolne_checkbox").checked) {
      test_x_szczegolne = 1;
      var d = _("x_szczegolne").value,
        d = d.replace(/\,/gi, ".");
      tablica_x_szczegolne = Transform(d).split(";");
      ile_x_szczegolne = tablica_x_szczegolne.length;
    } else test_x_szczegolne = 0;
  void 0 != _("font_size") && (font_size_wsp = _("font_size").value);
  1 == _("osie").checked &&
  (1 == test_mz ||
    1 == test_y ||
    1 == test_asymptoty ||
    (0 == _("miejsca_zerowe").checked &&
      0 == _("punkt_przeciecia_y").checked &&
      0 == _("asymptoty").checked))
    ? ((test_osie = 1),
      (_("miejsca_zerowe").checked = !1),
      (_("punkt_przeciecia_y").checked = !1),
      (_("asymptoty").checked = !1))
    : (test_osie = 0);
  1 == _("miejsca_zerowe").checked
    ? ((test_mz = 1), (test_osie = 0), (_("osie").checked = !1))
    : (test_mz = 0);
  1 == _("punkt_przeciecia_y").checked
    ? ((test_y = 1), (_("osie").checked = !1), (test_osie = 0))
    : (test_y = 0);
  1 == _("asymptoty").checked
    ? ((test_asymptoty = 1), (_("osie").checked = !1), (test_osie = 0))
    : (test_asymptoty = 0);
  test_ekstrema = 1 == _("ekstrema").checked ? 1 : 0;
  test_punkty_przeciecia = 1 == _("punkty_przeciecia").checked ? 1 : 0;
  test_pochodne = 1 == _("pochodne").checked ? 1 : 0;
  1 == _("obszary").checked
    ? ((test_obszary = 1),
      (przedzial_calkowania_poczatek = xMin),
      (przedzial_calkowania_koniec = xMax))
    : ((test_obszary = 0),
      1 == _("calka").checked && 1 == test_calka && (_("calka").checked = !1));
  1 == _("calka").checked &&
    0 == test_calka &&
    ((test_obszary = test_calka = 1), (_("obszary").checked = !0));
  0 == _("calka").checked && (test_calka = 0);
  sc = _("dokladnosc_wykresu").value;
  skok = (201 - sc) / stala_skoku;
  _("skok_info").innerHTML = sc;
  liczba_skokow = width / skok;
  1 == test_calka &&
    ((przedzial_calkowania_poczatek = _("przedzial_calkowania_min").value),
    (przedzial_calkowania_koniec = _("przedzial_calkowania_max").value),
    (przedzial_calkowania_poczatek = przedzial_calkowania_poczatek.replace(
      /\,/gi,
      "."
    )),
    (przedzial_calkowania_koniec = przedzial_calkowania_koniec.replace(
      /\,/gi,
      "."
    )),
    isNaN(przedzial_calkowania_poczatek) &&
      (przedzial_calkowania_poczatek = xMin),
    isNaN(przedzial_calkowania_koniec) && (przedzial_calkowania_koniec = xMax),
    "" == przedzial_calkowania_poczatek &&
      (przedzial_calkowania_poczatek = xMin),
    "" == przedzial_calkowania_koniec && (przedzial_calkowania_koniec = xMax),
    przedzial_calkowania_poczatek < xMin &&
      (przedzial_calkowania_poczatek = xMin),
    przedzial_calkowania_koniec > xMax && (przedzial_calkowania_koniec = xMax));
  height = canvas.height;
  width = canvas.width;
  generuj_link();
  plot();
}
function wymiar_change(d) {
  _("wymiar_info").innerHTML = d;
  h = d + "px";
  _(canvas_id).style.height = h;
  _(canvas_id).style.width = h;
}
function ustal_granice_parametrow() {
  if (void 0 != _("parametr_skok")) {
    var d = _("parametr_skok").selectedIndex;
    skok_parametru = _("parametr_skok").options[d].value;
    void 0 != _("a_range") && (_("a_range").max = a_min * skok_parametru * 2);
    void 0 != _("b_range") && (_("b_range").max = b_min * skok_parametru * 2);
    void 0 != _("c_range") && (_("c_range").max = c_min * skok_parametru * 2);
    void 0 != _("m_range") && (_("m_range").max = m_min * skok_parametru * 2);
    void 0 != _("p_range") && (_("p_range").max = p_min * skok_parametru * 2);
    void 0 != _("q_range") && (_("q_range").max = q_min * skok_parametru * 2);
    void 0 != _("a_range") &&
      (_("a_range").value = a * skok_parametru + a_min * skok_parametru);
    void 0 != _("b_range") &&
      (_("b_range").value = b * skok_parametru + b_min * skok_parametru);
    void 0 != _("c_range") &&
      (_("c_range").value = c * skok_parametru + c_min * skok_parametru);
    void 0 != _("m_range") &&
      (_("m_range").value = m * skok_parametru + m_min * skok_parametru);
    void 0 != _("p_range") &&
      (_("p_range").value = p * skok_parametru + p_min * skok_parametru);
    void 0 != _("q_range") &&
      (_("q_range").value = q * skok_parametru + q_min * skok_parametru);
  }
}
function parametr_a_change(d) {
  a = (_("a_range").value - a_min * skok_parametru) / skok_parametru;
  d = "a = " + a;
  plot();
  _("a_info").innerHTML = d;
}
function parametr_b_change(d) {
  b = (d - b_min * skok_parametru) / skok_parametru;
  d = "b = " + b;
  _("b_info").innerHTML = d;
  plot();
}
function parametr_c_change(d) {
  c = (d - c_min * skok_parametru) / skok_parametru;
  d = "c = " + c;
  _("c_info").innerHTML = d;
  plot();
}
function parametr_m_change(d) {
  m = (d - m_min * skok_parametru) / skok_parametru;
  d = "m = " + m;
  _("m_info").innerHTML = d;
  plot();
}
function parametr_p_change(d) {
  p = (d - p_min * skok_parametru) / skok_parametru;
  d = "p = " + p;
  _("p_info").innerHTML = d;
  plot();
}
function parametr_q_change(d) {
  q = (d - q_min * skok_parametru) / skok_parametru;
  d = "q = " + q;
  _("q_info").innerHTML = d;
  plot();
}
function ustal_granice_parametru_a() {
  var d = _("parametr_a_min").selectedIndex;
  a_min = _("parametr_a_min").options[d].value;
  d = a * skok_parametru + a_min * skok_parametru;
  _("a_range").max = a_min * skok_parametru * 2;
  _("a_range").value = d;
  d = "a = " + a;
  _("a_info").innerHTML = d;
  plot();
}
function ustal_granice_parametru_b() {
  var d = _("parametr_b_min").selectedIndex;
  b_min = _("parametr_b_min").options[d].value;
  d = b * skok_parametru + b_min * skok_parametru;
  _("b_range").max = b_min * skok_parametru * 2;
  _("b_range").value = d;
  d = "b = " + b;
  _("b_info").innerHTML = d;
  plot();
}
function ustal_granice_parametru_c() {
  var d = _("parametr_c_min").selectedIndex;
  c_min = _("parametr_c_min").options[d].value;
  d = c * skok_parametru + c_min * skok_parametru;
  _("c_range").max = c_min * skok_parametru * 2;
  _("c_range").value = d;
  d = "c = " + c;
  _("c_info").innerHTML = d;
  plot();
}
function ustal_granice_parametru_m() {
  var d = _("parametr_m_min").selectedIndex;
  m_min = _("parametr_m_min").options[d].value;
  d = m * skok_parametru + m_min * skok_parametru;
  _("m_range").max = m_min * skok_parametru * 2;
  _("m_range").value = d;
  d = "m = " + m;
  _("m_info").innerHTML = d;
  plot();
}
function ustal_granice_parametru_p() {
  var d = _("parametr_p_min").selectedIndex;
  p_min = _("parametr_p_min").options[d].value;
  d = p * skok_parametru + p_min * skok_parametru;
  _("p_range").max = p_min * skok_parametru * 2;
  _("p_range").value = d;
  d = "p = " + p;
  _("p_info").innerHTML = d;
  plot();
}
function ustal_granice_parametru_q() {
  var d = _("parametr_q_min").selectedIndex;
  q_min = _("parametr_q_min").options[d].value;
  d = q * skok_parametru + q_min * skok_parametru;
  _("q_range").max = q_min * skok_parametru * 2;
  _("q_range").value = d;
  d = "q = " + q;
  _("q_info").innerHTML = d;
  plot();
}
function ustal_kolor_fillStyle(d) {
  context.fillStyle =
    0 == d
      ? "#00ED00"
      : 1 == d
      ? "#ED0000"
      : 2 == d
      ? "#0000ED"
      : 3 == d
      ? "#fcff00"
      : 4 == d
      ? "#ff00ea"
      : 5 == d
      ? "#10c9c2"
      : "#000000";
}
function ustal_kolor_strokeStyle(d) {
  context.strokeStyle =
    0 == d
      ? "#00ED00"
      : 1 == d
      ? "#ED0000"
      : 2 == d
      ? "#0000ED"
      : 3 == d
      ? "#fcff00"
      : 4 == d
      ? "#ff00ea"
      : 5 == d
      ? "#10c9c2"
      : "#000000";
}
function ustal_kolor_strokeStyle_pochodne(d) {
  context.strokeStyle =
    1 == ile_funkcji
      ? "#e5b83e"
      : 0 == d
      ? "#88ff88"
      : 1 == d
      ? "#ff7777"
      : 2 == d
      ? "#8181ff"
      : 3 == d
      ? "#e2e379"
      : 4 == d
      ? "#ff97f6"
      : 5 == d
      ? "#7ae5e1"
      : "#8c9b9a";
}
function generuj_link() {
  $("#skala").html(xRange.toPrecision(4));
  $("#xc").html(Math.round(10 * _xMid) / 10);
  $("#yc").html(Math.round(10 * _yMid) / 10);
}
function resizeCanvas() {
  _yAspect &&
    ((yRange = (_yAspect * xRange * canvas.clientHeight) / canvas.clientWidth),
    (yMin = _yMid - 0.5 * yRange),
    (yMax = _yMid + 0.5 * yRange),
    plot());
}
function makeLabel(d) {
  var e = Math.abs(Math.round(1e7 * d)).toString();
  if (0 <= e.indexOf("e", 0)) e = d.toString();
  else {
    for (; 8 > e.length; ) e = "0" + e;
    0 > d && (e = "-" + e);
    d = e.length - 7;
    for (
      e = e.substr(0, d) + "." + e.substr(d);
      "0" == e[e.length - 1] && "." != e[e.length - 2];

    )
      e = e.substr(0, e.length - 1);
  }
  return e;
}
function notOnBlackList(d) {
  if (140 < d.length)
    return (
      alert(
        "Wz\u00f3r funkcji musi by\u0107 kr\u00f3tszy ni\u017c 140 znak\u00f3w."
      ),
      !1
    );
  var e = d.toLowerCase();
  for (d = blackList.length - 1; 0 <= d; --d)
    if (-1 != e.indexOf(blackList[d]))
      return alert("Niedozwolony znak:  " + blackList[d]), !1;
  return !0;
}
function czy_cyfra1(d) {
  return "0" == d ||
    "1" == d ||
    "2" == d ||
    "3" == d ||
    "4" == d ||
    "5" == d ||
    "6" == d ||
    "7" == d ||
    "8" == d ||
    "9" == d ||
    "." == d
    ? !0
    : !1;
}
function Transform(d) {
  var e, u;
  d = d.replace(/a/gi, "(a)");
  d = d.replace(/b/gi, "(b)");
  d = d.replace(/cos/gi, "kos");
  d = d.replace(/ctg/gi, "ktg");
  d = d.replace(/c/gi, "(c)");
  d = d.replace(/kos/gi, "cos");
  d = d.replace(/ktg/gi, "ctg");
  d = d.replace(/m/gi, "(m)");
  d = d.replace(/p/gi, "(p)");
  d = d.replace(/sqrt/gi, "skurt");
  d = d.replace(/q/gi, "(q)");
  d = d.replace(/skurt/gi, "sqrt");
  d = d.replace(/ /g, "");
  d = d.replace(/\+\-/gi, "-");
  d = d.replace(/\-\+/gi, "-");
  d = d.replace(/\-\-/gi, "+");
  d = d.replace(/0x/gi, "0*x");
  d = d.replace(/1x/gi, "1*x");
  d = d.replace(/2x/gi, "2*x");
  d = d.replace(/3x/gi, "3*x");
  d = d.replace(/4x/gi, "4*x");
  d = d.replace(/5x/gi, "5*x");
  d = d.replace(/6x/gi, "6*x");
  d = d.replace(/7x/gi, "7*x");
  d = d.replace(/8x/gi, "8*x");
  d = d.replace(/9x/gi, "9*x");
  d = d.replace(/0\(/gi, "0*(");
  d = d.replace(/1\(/gi, "1*(");
  d = d.replace(/2\(/gi, "2*(");
  d = d.replace(/3\(/gi, "3*(");
  d = d.replace(/4\(/gi, "4*(");
  d = d.replace(/5\(/gi, "5*(");
  d = d.replace(/6\(/gi, "6*(");
  d = d.replace(/7\(/gi, "7*(");
  d = d.replace(/8\(/gi, "8*(");
  d = d.replace(/9\(/gi, "9*(");
  d = d.replace(/\)x/gi, ")*x");
  d = d.replace(/x\(/gi, "x*(");
  d = d.replace(/\)\(/gi, ")*(");
  d = d.replace(/xsin/gi, "x*sin");
  d = d.replace(/xcos/gi, "x*cos");
  d = d.replace(/xtg/gi, "x*tg");
  d = d.replace(/xlog/gi, "x*log");
  d = d.replace(/sin/gi, "Math.sin");
  d = d.replace(/cos/gi, "Math.cos");
  d = d.replace(/tan/gi, "Math.tan");
  d = d.replace(/tg/gi, "Math.tan");
  d = d.replace(/sqrt/gi, "Math.sqrt");
  d = d.replace(/pierwiastek/gi, "Math.sqrt");
  d = d.replace(/random/gi, "Math.random()");
  d = d.replace(/exp/gi, "Math.exp");
  d = d.replace(/log/gi, "Math.log");
  d = d.replace(/abs/gi, "Math.abs");
  d = d.replace(/\,/gi, ".");
  d = d.replace(/0cMath.tan/gi, "0*1/Math.tan");
  d = d.replace(/1cMath.tan/gi, "1*1/Math.tan");
  d = d.replace(/2cMath.tan/gi, "2*1/Math.tan");
  d = d.replace(/3cMath.tan/gi, "3*1/Math.tan");
  d = d.replace(/4cMath.tan/gi, "4*1/Math.tan");
  d = d.replace(/5cMath.tan/gi, "5*1/Math.tan");
  d = d.replace(/6cMath.tan/gi, "6*1/Math.tan");
  d = d.replace(/7cMath.tan/gi, "7*1/Math.tan");
  d = d.replace(/8cMath.tan/gi, "8*1/Math.tan");
  d = d.replace(/9cMath.tan/gi, "9*1/Math.tan");
  d = d.replace(/cMath.tan/gi, "1/Math.tan");
  d = d.replace(/\)cMath.tan/gi, ")*1/Math.tan");
  d = d.replace(/xcMath.tan/gi, "x*1/Math.tan");
  var k = 0;
  for (i = 0; i < d.length; i++)
    "|" == d.charAt(i) &&
      (0 == k
        ? ((d = d.replace("|", "Math.abs(")), k++)
        : "+" == d.charAt(i - 1) ||
          "-" == d.charAt(i - 1) ||
          "*" == d.charAt(i - 1) ||
          "/" == d.charAt(i - 1) ||
          "(" == d.charAt(i - 1)
        ? ((d = d.replace("|", "Math.abs(")), k++)
        : ((d = d.replace("|", ")")), k--));
  var k = (e = -1),
    t;
  for (i = t = 0; i < d.length; i++)
    if ("^" == d.charAt(i) && 0 < i) {
      if ("x" == d.charAt(i - 1)) (u = d.charAt(i - 1)), (k = i - 1);
      else if (")" == d.charAt(i - 1)) {
        t = -1;
        for (j = i - 2; 0 <= j; )
          ")" == d.charAt(j) && t--,
            "(" == d.charAt(j) && (t++, 0 == t && ((k = j), (j = -1))),
            j--;
        u = d.substr(k + 1, i - (k + 1) - 1);
      } else {
        for (k = i; czy_cyfra1(d.charAt(k - 1)); ) k--;
        u = d.substr(k, i - k);
      }
      e = i;
      if ("(" != d.charAt(i + 1))
        if ("x" == d.charAt(i + 1)) (e = i + 1), (t = "x");
        else {
          for (; czy_cyfra1(d.charAt(e + 1)); ) e++;
          t = d.substr(i + 1, e - (i + 1) + 1);
        }
      else {
        t = 1;
        for (j = i + 2; j < d.length; )
          "(" == d.charAt(j) && t++,
            ")" == d.charAt(j) &&
              (t--, 0 == t && ((e = j), (j = d.length + 1))),
            j++;
        t = d.substr(i + 2, e - (i + 2));
      }
      e = d.substr(k, e - k + 1);
      u = "Math.pow(" + u + "," + t + ")";
      d = d.replace(e, u);
    }
  d = d.replace(/0M/gi, "0*M");
  d = d.replace(/1M/gi, "1*M");
  d = d.replace(/2M/gi, "2*M");
  d = d.replace(/3M/gi, "3*M");
  d = d.replace(/4M/gi, "4*M");
  d = d.replace(/5M/gi, "5*M");
  d = d.replace(/6M/gi, "6*M");
  d = d.replace(/7M/gi, "7*M");
  d = d.replace(/8M/gi, "8*M");
  return (d = d.replace(/9M/gi, "9*M"));
}
var f2 = "";
function plot() {
  grid();
  f2 = "";
  for (var d = 0; d < ile_funkcji; d += 1) {
    context.lineWidth = 3;
    ustal_kolor_strokeStyle(d);
    var e = 0,
      u = 1;
    formula = tablica_funkcji[d];
    1 != notOnBlackList(formula) && (formula = "0");
    1 != notOnBlackList(String(a)) && (a = 1);
    1 != notOnBlackList(String(b)) && (b = 1);
    1 != notOnBlackList(String(c)) && (c = 1);
    1 != notOnBlackList(String(m)) && (m = 1);
    1 != notOnBlackList(String(p)) && (p = 1);
    1 != notOnBlackList(String(q)) && (q = 1);
    if ("" != formula) {
      context.beginPath();
      var k = xMin,
        t = k,
        l = k,
        r = 0,
        w = 0,
        f = 0,
        x = 0,
        H = new Function("x", "return " + formula),
        D = (xRange / width) * skok,
        L = height / yRange,
        M = width + 1,
        z = 0,
        E = [],
        n = [],
        N = [],
        O = [],
        K = [],
        A = [],
        I = 0,
        P = "",
        v = 1;
      tablica_f[d] = [];
      for (
        var y = xMin, T = xMin, R = 0, U = 0, S = 0, V = 0, e = 0;
        e < M;
        e += skok
      ) {
        k += D;
        r = H(k);
        isNaN(r) ||
        r == Number.NEGATIVE_INFINITY ||
        r == Number.POSITIVE_INFINITY ||
        2e5 < Math.abs(r) ||
        200 < Math.abs(r - w) ||
        (20 < Math.abs(r - w) && 0 > r * w)
          ? (u = 2)
          : test_asymptoty &&
            1 > u &&
            ((T = y),
            (y = k),
            (U = R),
            (R = r),
            (V = S),
            (S = (r - w) / (k - t)));
        x = (yMax - r) * L;
        tablica_f[d][v] = [k, r, e, x];
        v++;
        if (
          test_asymptoty &&
          0 == I &&
          (-100 > S * V || 0 > R * U) &&
          2 < Math.abs(r)
        ) {
          var I = 20,
            g = Math.round(((y + T) / 2) * 100) / 100;
          0.05 >= Math.abs(g - Math.round(g)) && (g = Math.round(g));
          50 > dokladnosc &&
            0.1 > Math.abs(g - Math.round(g)) &&
            (g = Math.round(g));
          g = String(g);
          A[A.length] = [g, e, yMax * L];
        }
        0 < u ? (1 == u && context.moveTo(e, x), --u) : context.lineTo(e, x);
        if (test_y && 0 >= k * t) {
          var G = String(Math.round(100 * H(0)) / 100);
          "0" != G
            ? (P = [G, e - 2, x - 2])
            : 0 == test_mz && (P = [G, e - 2, x - 2]);
        }
        if (
          test_mz &&
          0 == z &&
          (0.5 > Math.abs(r) || (1 == u && 0.1 > Math.abs(f)))
        )
          if (0 == r)
            (g = String(Math.round(100 * k) / 100)),
              (E[E.length] = [g, e + 2, yMax * L + 16]),
              (z = 20);
          else if (0 > r * w && 1 > Math.abs(r - w)) {
            g = xMax - xMin;
            10 > g && (g = 10);
            200 < g && (g = 200);
            for (var B = k - t, B = B / g, F = w, J = w, C = t; 0 < g; )
              (C += B),
                (F = H(C)),
                0 >= F * J &&
                  ((g = String(Math.round(100 * (C - 0.5 * B)) / 100)),
                  (E[E.length] = [g, e + 2, yMax * L + 16]),
                  (g = -1)),
                g--,
                (J = F);
            z = 20;
          } else if (isNaN(w) && isNaN(f) && 0.1 > Math.abs(r))
            (g = String(Math.round(100 * k) / 100)),
              (E[E.length] = [g, e + 2, yMax * L + 16]),
              (z = 20);
          else if (1 == u && 0.1 > Math.abs(f) && l > xMin)
            (g = String(Math.round(100 * l) / 100)),
              (E[E.length] = [g, e + 2, yMax * L + 16]),
              (z = 20);
          else if (f > w && w < r && 0.1 > Math.abs(r))
            for (
              g = xMax - xMin,
                10 > g && (g = 10),
                200 < g && (g = 200),
                G = xMax - xMin,
                1 < G && (G = 1),
                B = k - l,
                B /= g,
                J = f,
                C = l;
              0 < g;

            )
              (C += B),
                (F = H(C)),
                F > J &&
                  F < 0.01 * G &&
                  ((g = String(Math.round(100 * (C - 0.5 * B)) / 100)),
                  (E[E.length] = [g, e + 2, yMax * L + 16]),
                  (g = -1),
                  (z = 20)),
                g--,
                (J = F);
          else if (f < w && w > r && 0.1 > Math.abs(r))
            for (
              g = xMax - xMin,
                10 > g && (g = 10),
                200 < g && (g = 200),
                G = xMax - xMin,
                1 < G && (G = 1),
                B = k - l,
                B /= g,
                J = f,
                C = l;
              0 < g;

            )
              (C += B),
                (F = H(C)),
                F < J &&
                  F < 0.01 * G &&
                  ((g = String(Math.round(100 * (C - 0.5 * B)) / 100)),
                  (E[E.length] = [g, e + 2, yMax * L + 16]),
                  (g = -1),
                  (z = 20)),
                g--,
                (J = F);
        if (test_ekstrema && k > xMin + 4 * D && k < xMax - 4 * D) {
          if (f < w && w > r && 50 > Math.abs(w - r) && 50 > Math.abs(f - w))
            for (
              g = xMax - xMin,
                10 > g && (g = 10),
                200 < g && (g = 200),
                B = k - l,
                B /= 2 * g,
                g *= 2,
                J = f,
                C = l;
              0 < g;

            )
              (C += B),
                (F = H(C)),
                F < J &&
                  ((g = String(Math.round(100 * (C - 0.5 * B)) / 100)),
                  (G = String(Math.round(((F + J) / 2) * 100) / 100)),
                  (n[n.length] = [g, G, e, x]),
                  (g = -1)),
                g--,
                (J = F);
          if (f > w && w < r && 50 > Math.abs(w - r) && 50 > Math.abs(f - w))
            for (
              g = xMax - xMin,
                10 > g && (g = 10),
                200 < g && (g = 200),
                B = k - l,
                B /= 2 * g,
                g *= 2,
                J = f,
                C = l;
              0 < g;

            )
              (C += B),
                (F = H(C)),
                F > J &&
                  ((g = String(Math.round(100 * (C - 0.5 * B)) / 100)),
                  (G = String(Math.round(((F + J) / 2) * 100) / 100)),
                  (N[N.length] = [g, G, e, x]),
                  (g = -1)),
                g--,
                (J = F);
        }
        l = t;
        t = k;
        f = w;
        w = r;
        0 < z && z--;
        0 < I && I--;
      }
      context.stroke();
      context.closePath();
      if (1 == test_pochodne) {
        v = 2;
        context.beginPath();
        f = w = 0;
        ustal_kolor_strokeStyle_pochodne(d);
        context.lineWidth = 2;
        for (e = skok; e < M; e += skok) {
          D = tablica_f[d][v][0] - tablica_f[d][v - 1][0];
          g = tablica_f[d][v][1] - tablica_f[d][v - 1][1];
          r = g / D;
          v++;
          4 < v &&
            (Math.abs(r - w) > 0.01 + 3 * Math.abs(w - f) && (u = 2),
            10 < Math.abs(r - w) && 0 > r * w && (u = 2));
          if (
            isNaN(r) ||
            r == Number.NEGATIVE_INFINITY ||
            r == Number.POSITIVE_INFINITY ||
            2e5 < Math.abs(r) ||
            200 < Math.abs(r - w)
          )
            u = 2;
          x = (yMax - r) * L;
          0 < u ? (1 == u && context.moveTo(e, x), --u) : context.lineTo(e, x);
          f = w;
          w = r;
        }
        context.stroke();
        context.closePath();
      }
      if (1 == test_punkty_przeciecia && 0 < d)
        for (f = g = t = k = 0; f < d; f++) {
          v = 1;
          context.beginPath();
          context.strokeStyle = "#dd0000";
          context.lineWidth = 1;
          u = (xMax - xMin) / 100;
          for (e = skok; e < M; e += skok)
            (k = Math.abs(tablica_f[f][v][1] - tablica_f[d][v][1])),
              t < u &&
                g > t &&
                t < k &&
                ((D = tablica_f[f][v][0] - tablica_f[f][v - 1][0]),
                (g = tablica_f[f][v][1] - tablica_f[f][v - 1][1]),
                (g /= D),
                (z =
                  (tablica_f[d][v][1] - tablica_f[d][v - 1][1]) /
                  (tablica_f[d][v][0] - tablica_f[d][v - 1][0])),
                (l = 0),
                0.8 < Math.abs(g) && 0.8 < Math.abs(z)
                  ? (l = 0)
                  : 0 > g && 0 > z
                  ? (l = g < z ? -10 - 10 * z : -10 - 10 * g)
                  : 0 < g && 0 < z
                  ? (l = g < z ? 10 - 10 * g : 10 - 10 * z)
                  : 0.8 > Math.abs(g) && 0.8 > Math.abs(z)
                  ? (l =
                      Math.abs(g) < Math.abs(z)
                        ? 0 > g
                          ? 8 + 10 * g
                          : -8 - 10 * g
                        : 0 > z
                        ? 8 + 10 * z
                        : -8 - 10 * z)
                  : 0.1 > Math.abs(g) && 0.1 > Math.abs(z)
                  ? (l = -8)
                  : 0.1 > Math.abs(g) && 1 < Math.abs(z)
                  ? (l = -8)
                  : 0.1 > Math.abs(z) && 1 < Math.abs(g)
                  ? (l = -8)
                  : 0.8 < g
                  ? (l = -7)
                  : 0.8 < z
                  ? (l = -7)
                  : -0.8 > g
                  ? (l = 7)
                  : -0.8 > z && (l = 7),
                (g = String(Math.round(100 * tablica_f[f][v - 1][0]) / 100)),
                (G = String(Math.round(100 * tablica_f[f][v - 1][1]) / 100)),
                (O[O.length] = [
                  g,
                  G,
                  tablica_f[f][v - 1][2],
                  tablica_f[f][v - 1][3],
                  l,
                ])),
              v++,
              (g = t),
              (t = k);
          context.stroke();
          context.closePath();
        }
      if (1 == test_obszary && d == ile_funkcji - 1) {
        void 0 != _("f1_obszar")
          ? ((D = _("f1_obszar").selectedIndex),
            (k = _("f1_obszar").options[D].value - 1))
          : (k = 0);
        void 0 != _("f2_obszar")
          ? ((D = _("f2_obszar").selectedIndex),
            (nr_f2 = _("f2_obszar").options[D].value - 1))
          : (nr_f2 = 0);
        void 0 != _("znak_obszar")
          ? ((D = _("znak_obszar").selectedIndex),
            (f = _("znak_obszar").options[D].value))
          : (f = 0);
        v = 2;
        l = t = 0;
        context.beginPath();
        context.strokeStyle = "#CDB7B5";
        context.lineWidth = 1;
        g = Math.floor(liczba_skokow / 400);
        D = tablica_f[k][v + 1][0] - tablica_f[k][v][0];
        u = (xMax - xMin) / 1e3;
        for (e = skok; e < M; e += skok)
          tablica_f[k][v][0] > przedzial_calkowania_poczatek &&
          tablica_f[k][v][0] < przedzial_calkowania_koniec &&
          ((tablica_f[k][v][1] > tablica_f[nr_f2][v][1] + u && 0 == f) ||
            (tablica_f[k][v][1] < tablica_f[nr_f2][v][1] - u && 1 == f))
            ? (1 == test_calka &&
                (0 == t && (t = v),
                (l += (tablica_f[k][v][1] - tablica_f[nr_f2][v][1]) * D),
                tablica_f[k][v - 1][0] < przedzial_calkowania_poczatek &&
                  (l +=
                    ((tablica_f[k][v][1] -
                      tablica_f[nr_f2][v][1] +
                      tablica_f[k][v - 1][1] -
                      tablica_f[nr_f2][v - 1][1]) /
                      2) *
                    (tablica_f[k][v][0] -
                      przedzial_calkowania_poczatek -
                      D / 2))),
              0 == v % g &&
                (context.moveTo(tablica_f[k][v][2], tablica_f[k][v][3] + 1),
                context.lineTo(
                  tablica_f[nr_f2][v][2],
                  tablica_f[nr_f2][v][3] - 1
                )),
              e > M - skok &&
                1 == test_calka &&
                0 != t &&
                ((l = String(Math.round(100 * Math.abs(l)) / 100)),
                (y = Math.round((t + v) / 2)),
                (z = tablica_f[k][y][2]),
                (I = Math.round(
                  (tablica_f[k][y][3] + tablica_f[nr_f2][y][3]) / 2
                )),
                60 > I && (I = 60),
                I > height - 60 && (I = height - 60),
                (y = Math.round(
                  Math.abs(tablica_f[k][y][3] - tablica_f[nr_f2][y][3]) / 2
                )),
                (t = Math.round(
                  Math.abs(tablica_f[k][v][2] - tablica_f[k][t][2]) / 3
                )),
                y > t && (y = t),
                40 < y && (y = 40),
                16 > y && (y = 16),
                (context.textAlign = "center"),
                (context.textBaseline = "middle"),
                (context.fillStyle = "#000"),
                (context.font = "bold " + y + "pt Calibri"),
                (K[K.length] = [l, z, I, y]),
                (t = l = 0)))
            : 1 == test_calka &&
              0 != t &&
              (tablica_f[k][v][0] > przedzial_calkowania_koniec &&
                (l +=
                  ((tablica_f[k][v][1] -
                    tablica_f[nr_f2][v][1] +
                    tablica_f[k][v - 1][1] -
                    tablica_f[nr_f2][v - 1][1]) /
                    2) *
                  (przedzial_calkowania_koniec -
                    tablica_f[k][v - 1][0] -
                    D / 2)),
              (l = String(Math.round(100 * Math.abs(l)) / 100)),
              (y = Math.round((t + v) / 2)),
              (z = tablica_f[k][y][2]),
              (I = Math.round(
                (tablica_f[k][y][3] + tablica_f[nr_f2][y][3]) / 2
              )),
              60 > I && (I = 60),
              I > height - 60 && (I = height - 60),
              (y = Math.round(
                Math.abs(tablica_f[k][y][3] - tablica_f[nr_f2][y][3]) / 2
              )),
              (t = Math.round(
                Math.abs(tablica_f[k][v][2] - tablica_f[k][t][2]) / 3
              )),
              y > t && (y = t),
              40 < y && (y = 40),
              16 > y && (y = 16),
              (context.textAlign = "center"),
              (context.textBaseline = "middle"),
              (context.fillStyle = "#000"),
              (context.font = "bold " + y + "pt Calibri"),
              (K[K.length] = [l, z, I, y]),
              (t = l = 0)),
            v++;
        context.stroke();
        context.closePath();
      }
      for (f = 0; f < K.length; f++)
        (context.textAlign = "center"),
          (context.textBaseline = "middle"),
          (context.fillStyle = "#000"),
          (context.font = "bold " + K[f][3] + "pt Calibri"),
          context.fillText(K[f][0], K[f][1], K[f][2]);
      context.fillStyle = "#000000";
      context.font = "bold 12px sans-serif";
      for (f = 0; f < A.length; f++) {
        "0" != A[f][0] &&
          (context.beginPath(),
          context.moveTo(A[f][1], 0),
          context.lineTo(A[f][1], height),
          (context.lineWidth = 2),
          (context.strokeStyle = "#fff"),
          context.stroke(),
          context.closePath());
        context.beginPath();
        for (j2 = 0; j2 < height; j2++)
          0 == j2 % 20 &&
            (context.moveTo(A[f][1], j2), context.lineTo(A[f][1], j2 + 10));
        context.lineWidth = 2;
        context.strokeStyle = "#bbb";
        context.stroke();
        context.closePath();
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillStyle = "#000";
        1 == test_podpisy &&
          context.fillText(A[f][0], A[f][1] + 2, A[f][2] + 4);
        context.beginPath();
        context.arc(A[f][1], A[f][2], 3, 0, 2 * Math.PI, !1);
        context.fillStyle = "#eee";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#003300";
        context.stroke();
        context.closePath();
      }
      if (test_asymptoty) {
        for (
          var M = 10, K = !0, Q, D = (Math.abs(xMin) / D) * skok, A = 1e6;
          1e7 > A;
          A += 999999
        )
          (r = H(A)),
            1e6 < A &&
              ((x = (yMax - r) * L),
              Math.abs(r - w) < M ? (M = Math.abs(r - w)) : (K = !1)),
            (w = r);
        if (0.001 > M && 1 == K) {
          0.01 < Math.abs(r) &&
            (context.beginPath(),
            context.moveTo(0, x),
            context.lineTo(width, x),
            (context.lineWidth = 2),
            (context.strokeStyle = "#fff"),
            context.stroke(),
            context.closePath());
          context.beginPath();
          for (j2 = 0; j2 < width; j2++)
            0 == j2 % 20 && (context.moveTo(j2, x), context.lineTo(j2 + 10, x));
          context.lineWidth = 2;
          context.strokeStyle = "#bbb";
          context.stroke();
          context.closePath();
          Q = Math.round(100 * r) / 100;
          0 > xMin &&
            0 < xMax &&
            ((context.textAlign = "right"),
            (context.textBaseline = "bottom"),
            (context.fillStyle = "#000"),
            1 == test_podpisy && context.fillText(String(Q), D - 4, x - 2),
            context.beginPath(),
            context.arc(D, x, 3, 0, 2 * Math.PI, !1),
            (context.fillStyle = "#eee"),
            context.fill(),
            (context.lineWidth = 2),
            (context.strokeStyle = "#003300"),
            context.stroke(),
            context.closePath());
        }
        M = 10;
        K = !0;
        for (A = -1e6; -1e7 < A; A -= 999999)
          (r = H(A)),
            -1e6 > A &&
              ((x = (yMax - r) * L),
              Math.abs(r - w) < M ? (M = Math.abs(r - w)) : (K = !1)),
            (w = r);
        w = Math.round(100 * r) / 100;
        if (0.001 > M && 1 == K && w != Q) {
          0.01 < Math.abs(r) &&
            (context.beginPath(),
            context.moveTo(0, x),
            context.lineTo(width, x),
            (context.lineWidth = 2),
            (context.strokeStyle = "#fff"),
            context.stroke(),
            context.closePath());
          context.beginPath();
          for (j2 = 0; j2 < width; j2++)
            0 == j2 % 20 && (context.moveTo(j2, x), context.lineTo(j2 + 10, x));
          context.lineWidth = 2;
          context.strokeStyle = "#bbb";
          context.stroke();
          context.closePath();
          Q = Math.round(100 * r) / 100;
          0 > xMin &&
            0 < xMax &&
            ((context.textAlign = "right"),
            (context.textBaseline = "bottom"),
            (context.fillStyle = "#000"),
            1 == test_podpisy && context.fillText(String(Q), D - 4, x - 2),
            context.beginPath(),
            context.arc(D, x, 3, 0, 2 * Math.PI, !1),
            (context.fillStyle = "#eee"),
            context.fill(),
            (context.lineWidth = 2),
            (context.strokeStyle = "#003300"),
            context.stroke(),
            context.closePath());
        }
      }
      context.textAlign = "right";
      context.textBaseline = "bottom";
      "" != P &&
        ((context.fillStyle = "#000000"),
        1 == test_podpisy && context.fillText(P[0], P[1], P[2]),
        context.beginPath(),
        context.arc(P[1] + 2, P[2] + 2, 3, 0, 2 * Math.PI, !1),
        ustal_kolor_fillStyle(d),
        context.fill(),
        (context.lineWidth = 2),
        (context.strokeStyle = "#003300"),
        context.stroke(),
        context.closePath());
      context.textAlign = "left";
      context.textBaseline = "bottom";
      r = 1;
      for (f = 0; f < E.length; f++) {
        context.fillStyle = "#000000";
        r = 1;
        for (j2 = 0; j2 < N.length; j2++) N[j2][2] == E[f][1] - 2 && (r = 0);
        for (j2 = 0; j2 < n.length; j2++) n[j2][2] == E[f][1] - 2 && (r = 0);
        r &&
          (1 == test_podpisy && context.fillText(E[f][0], E[f][1], E[f][2]),
          ustal_kolor_fillStyle(d),
          context.beginPath(),
          context.arc(E[f][1] - 2, E[f][2] - 16, 3, 0, 2 * Math.PI, !1),
          context.fill(),
          (context.lineWidth = 2),
          (context.strokeStyle = "#003300"),
          context.stroke(),
          context.closePath());
      }
      if (1 == test_x_szczegolne)
        for (f = 0; f < ile_x_szczegolne; f++)
          if (
            ((k = parseFloat(tablica_x_szczegolne[f])),
            (r = H(k)),
            k < xMax && k > xMin && r < yMax && r > yMin)
          ) {
            context.beginPath();
            x = (yMax - r) * L;
            e = ((k - xMin) / (xMax - xMin)) * width;
            ustal_kolor_fillStyle(d);
            context.arc(e, x, 3, 0, 2 * Math.PI, !1);
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = "#003300";
            context.stroke();
            context.closePath();
            y0Pos = (yMax - 0) * L;
            x0Pos = ((0 - xMin) / (xMax - xMin)) * width;
            context.beginPath();
            start = x0Pos;
            stop = e;
            start > stop && ((stop = x0Pos), (start = e));
            start = Math.round(start);
            stop = Math.round(stop);
            for (j2 = start; j2 < stop; j2++)
              0 == j2 % 12 &&
                (context.moveTo(j2, x), context.lineTo(j2 + 6, x));
            start = y0Pos;
            stop = x;
            start > stop && ((stop = y0Pos), (start = x));
            start = Math.round(start);
            stop = Math.round(stop);
            for (j2 = start; j2 < stop; j2++)
              0 == j2 % 12 &&
                (context.moveTo(e, j2), context.lineTo(e, j2 + 6));
            context.lineWidth = 1;
            context.strokeStyle = "#333";
            context.stroke();
            context.closePath();
            context.beginPath();
            context.lineWidth = 2;
            context.moveTo(e, y0Pos - 3);
            context.lineTo(e, y0Pos + 3);
            context.moveTo(x0Pos - 3, x);
            context.lineTo(x0Pos + 3, x);
            context.strokeStyle = "#000";
            context.stroke();
            context.closePath();
            context.fillStyle = "#000000";
            context.font = "bold " + font_size_wsp + "px Times New Roman";
            context.textBaseline = "top";
            context.textAlign = "center";
            string_x = k.toString().replace(/\./gi, ",");
            string_y = String(Math.round(100 * r) / 100).replace(/\./gi, ",");
            context.fillText(string_x, e, y0Pos + 4);
            context.textBaseline = "middle";
            context.textAlign = "right";
            context.fillText(string_y, x0Pos - 4, x);
          }
      context.textAlign = "center";
      context.textBaseline = "bottom";
      for (f = 0; f < n.length; f++)
        (context.fillStyle = "#000000"),
          (H = "(" + n[f][0] + "; " + n[f][1] + ")"),
          1 == test_podpisy && context.fillText(H, n[f][2], n[f][3] - 3),
          ustal_kolor_fillStyle(d),
          context.beginPath(),
          context.arc(n[f][2], n[f][3], 3, 0, 2 * Math.PI, !1),
          context.fill(),
          (context.lineWidth = 2),
          (context.strokeStyle = "#003300"),
          context.stroke(),
          context.closePath();
      context.textBaseline = "top";
      for (f = 0; f < N.length; f++)
        (context.fillStyle = "#000000"),
          (H = "(" + N[f][0] + "; " + N[f][1] + ")"),
          1 == test_podpisy && context.fillText(H, N[f][2], N[f][3] + 3),
          ustal_kolor_fillStyle(d),
          context.beginPath(),
          context.arc(N[f][2], N[f][3], 3, 0, 2 * Math.PI, !1),
          context.fill(),
          (context.lineWidth = 2),
          (context.strokeStyle = "#003300"),
          context.stroke(),
          context.closePath();
      context.textBaseline = "middle";
      context.textAlign = "left";
      for (f = 0; f < O.length; f++)
        (context.fillStyle = "#000000"),
          (H = "(" + O[f][0] + "; " + O[f][1] + ")"),
          1 == test_podpisy &&
            context.fillText(H, O[f][2] + 5, O[f][3] + O[f][4]),
          (context.fillStyle = "#ff00ff"),
          context.beginPath(),
          context.arc(O[f][2], O[f][3], 3, 0, 2 * Math.PI, !1),
          context.fill(),
          (context.lineWidth = 2),
          (context.strokeStyle = "#000"),
          context.stroke(),
          context.closePath();
      void 0 != _("formula_bez_parametrow") &&
        (ustal_kolor_fillStyle(d),
        (n = context.fillStyle),
        (f2 =
          "" == f2
            ? 1 == ile_funkcji
              ? "<span style='color: " +
                n +
                ";'><b>&#8226;</b>&nbsp;&nbsp;</span><i>f</i>(x) = "
              : "<span style='color: " +
                n +
                ";'><b>&#8226;</b>&nbsp;&nbsp;</span><i>f</i><sub>1</sub>(x) = "
            : f2 +
              "<br /><span style='color: " +
              n +
              ";'><b>&#8226;</b>&nbsp;&nbsp;</span><i>f</i><sub>" +
              String(d + 1) +
              "</sub>(x) = "),
        (n = tablica_funkcji_czystych[d]),
        0 > a && (n = n.replace(/a/gi, "(a)")),
        0 > b && (n = n.replace(/b/gi, "(b)")),
        (n = n.replace(/a/gi, a)),
        (n = n.replace(/b/gi, b)),
        (n = n.replace(/cos/gi, "kos")),
        (n = n.replace(/ctg/gi, "ktg")),
        0 > c && (n = n.replace(/c/gi, "(c)")),
        (n = n.replace(/c/gi, c)),
        (n = n.replace(/kos/gi, "cos")),
        (n = n.replace(/ktg/gi, "ctg")),
        0 > m && (n = n.replace(/m/gi, "(m)")),
        (n = n.replace(/m/gi, m)),
        0 > p && (n = n.replace(/p/gi, "(p)")),
        (n = n.replace(/p/gi, p)),
        (n = n.replace(/sqrt/gi, "skurt")),
        0 > q && (n = n.replace(/q/gi, "(q)")),
        (n = n.replace(/q/gi, q)),
        (n = n.replace(/skurt/gi, "sqrt")),
        (n = n.replace(/\+\-/gi, "-")),
        (n = n.replace(/\-\+/gi, "-")),
        (n = n.replace(/\-\-/gi, "+")),
        (n = n.replace(/\-/gi, " - ")),
        (n = n.replace(/\+/gi, " + ")),
        (n = n.replace(/  \- /gi, " -")),
        (n = n.replace(/x/gi, "<i>x</i>")),
        (f2 += n),
        (_("formula_bez_parametrow").innerHTML = f2));
    }
  }
}
function grid() {
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  context.textBaseline = "bottom";
  for (
    var d = Math.floor(xMin / gridRange_x),
      e = d * gridRange_x,
      u = height - (Math.abs(yMin) * height) / yRange + 4,
      k = (Math.abs(xMin) * width) / xRange - 5,
      t = width / xRange;
    e <= xMax;
    e = d * gridRange_x
  ) {
    var l = (e - xMin) * t;
    context.lineWidth = 1;
    1e-9 > Math.abs(d)
      ? ((context.lineWidth = 2),
        (context.strokeStyle = "#000000"),
        1 == test_os_y
          ? (context.beginPath(),
            context.moveTo(l, 0),
            context.lineTo(l, height),
            context.stroke(),
            context.closePath())
          : 1 == test_siatka &&
            ((context.strokeStyle = "#8888ED"),
            (context.lineWidth = 1),
            context.beginPath(),
            context.moveTo(l, 0),
            context.lineTo(l, height),
            context.stroke(),
            context.closePath()))
      : 1 == test_siatka &&
        ((context.strokeStyle = 0 != d % 5 ? "#DDE5FF" : "#8888ED"),
        context.beginPath(),
        context.moveTo(l, 0),
        context.lineTo(l, height),
        context.stroke(),
        context.closePath());
    ++d;
  }
  d = Math.floor(yMin / gridRange_y);
  e = d * gridRange_y;
  for (t = height / yRange; e <= yMax; e = d * gridRange_y)
    (l = (yMax - e) * t),
      (context.lineWidth = 1),
      1e-9 > Math.abs(d)
        ? ((context.lineWidth = 2),
          (context.strokeStyle = "#000000"),
          1 == test_os_x
            ? (context.beginPath(),
              context.moveTo(0, l),
              context.lineTo(width, l),
              context.stroke(),
              context.closePath())
            : 1 == test_siatka &&
              ((context.strokeStyle = "#8888ED"),
              (context.lineWidth = 1),
              context.beginPath(),
              context.moveTo(0, l),
              context.lineTo(width, l),
              context.stroke(),
              context.closePath()))
        : 1 == test_siatka &&
          ((context.strokeStyle = 0 != d % 5 ? "#DDE5FF" : "#8888ED"),
          context.beginPath(),
          context.moveTo(0, l),
          context.lineTo(width, l),
          context.stroke(),
          context.closePath()),
      ++d;
  d = Math.floor(yMin / gridRange_y);
  e = d * gridRange_y;
  for (t = height / yRange; e <= yMax; e = d * gridRange_y)
    (l = (yMax - e) * t),
      1e-9 > Math.abs(d)
        ? ((context.fillStyle = "#8888ED"),
          (context.font = "normal 12px sans-serif"),
          1 == test_siatka && context.fillText("0.0", 2, l),
          1 == test_os_x &&
            ((context.lineWidth = 2),
            (context.strokeStyle = "#000000"),
            context.beginPath(),
            context.moveTo(width - 10, l - 4),
            context.lineTo(width, l),
            context.moveTo(width - 10, l + 4),
            context.lineTo(width, l),
            context.stroke(),
            context.closePath(),
            (context.fillStyle = "#000000"),
            (context.font = "bold italic 17px Times New Roman"),
            (context.textBaseline = "top"),
            context.fillText("x", width - 15, l),
            (context.textBaseline = "bottom")))
        : 0 == d % 5 &&
          ((context.font = "normal 12px sans-serif"),
          1 == test_osie &&
            1 == test_os_y &&
            30 < l &&
            ((context.fillStyle = "#000000"),
            (context.textAlign = "right"),
            0 > xMin && context.fillText(makeLabel(e), k, l),
            (context.textAlign = "left")),
          1 == test_siatka &&
            ((context.fillStyle = "#8888ED"),
            context.fillText(makeLabel(e), 2, l))),
      ++d;
  d = Math.floor(xMin / gridRange_x);
  e = d * gridRange_x;
  for (t = width / xRange; e <= xMax; e = d * gridRange_x)
    (l = (e - xMin) * t),
      (context.lineWidth = 1),
      1e-9 > Math.abs(d)
        ? (20 < l &&
            (1 == test_siatka && context.fillText("0.0", l + 2, height - 2),
            1 == test_osie &&
              ((context.fillStyle = "#000000"),
              (context.font = "normal 12px sans-serif"),
              (context.textBaseline = "top"),
              0 > yMin &&
                (0 == test_os_x
                  ? ((context.textAlign = "right"),
                    (context.textBaseline = "bottom"),
                    1 == test_os_y && context.fillText("0.0", l - 2, u - 4))
                  : ((context.textAlign = "left"),
                    (context.textBaseline = "top"),
                    context.fillText("0.0", l + 2, u))),
              (context.textBaseline = "bottom")),
            (context.fillStyle = "#000000"),
            (context.font = "bold italic 17px Times New Roman"),
            (context.textAlign = "right"),
            1 == test_os_y &&
              ((context.lineWidth = 2),
              (context.strokeStyle = "#000000"),
              context.beginPath(),
              context.moveTo(l - 4, 10),
              context.lineTo(l, 0),
              context.moveTo(l + 4, 10),
              context.lineTo(l, 0),
              context.stroke(),
              context.closePath(),
              context.fillText("y", l - 6, 16)),
            (context.textAlign = "left")),
          (context.lineWidth = 2),
          (context.strokeStyle = "#000000"))
        : 0 == d % 5 &&
          (1 == test_osie &&
            1 == test_os_x &&
            l < width - 44 &&
            ((context.fillStyle = "#000000"),
            (context.font = "normal 12px sans-serif"),
            (context.textBaseline = "top"),
            (context.textAlign = "left"),
            0 > yMin && context.fillText(makeLabel(e), l + 2, u),
            (context.textAlign = "left"),
            (context.textBaseline = "bottom")),
          1 == test_siatka &&
            20 < l &&
            ((context.fillStyle = "#8888ED"),
            (context.font = "normal 12px sans-serif"),
            context.fillText(makeLabel(e), l + 2, height - 2)),
          (context.strokeStyle = "#8888ED")),
      ++d;
}
function clickCanvas(d) {
  d || (d = window.event);
  0 == d.button && 1 == d.ctrlKey
    ? (stretchButtonDown = !0)
    : 0 == d.button && 0 == d.shiftKey
    ? (slideButtonDown = !0)
    : (zoomButtonDown = !0);
  lastMouseX = d.clientX;
  lastMouseY = d.clientY;
  return stretchTouchDown || slideTouchDown || zoomTouchDown
    ? ((zoomButtonDown = stretchButtonDown = slideButtonDown = !1), !0)
    : stretchButtonDown || slideButtonDown || zoomButtonDown
    ? (d.preventDefault(), d.stopPropagation(), !1)
    : !0;
}
function releaseCanvas() {
  zoomButtonDown = stretchButtonDown = slideButtonDown = !1;
}
function slideCanvas(d) {
  var e = !1;
  d || (d = window.event);
  if (slideButtonDown)
    (e = ((d.clientY - lastMouseY) * yRange) / height),
      (xMin -= ((d.clientX - lastMouseX) * xRange) / width),
      (xMax = xMin + xRange),
      (yMin += e),
      (yMax = yMin + yRange),
      (_xMid = 0.5 * (xMin + xMax)),
      (_yMid = 0.5 * (yMin + yMax)),
      (lastMouseX = d.clientX),
      (lastMouseY = d.clientY),
      plot(),
      (_("xc").innerHTML = Math.round(10 * _xMid) / 10),
      (_("yc").innerHTML = Math.round(10 * _yMid) / 10),
      (e = !0);
  else if (stretchButtonDown) {
    var e = Math.pow(0.995, d.clientX - lastMouseX),
      u = Math.pow(0.995, lastMouseY - d.clientY),
      e = Math.min(2e5, Math.max(1e-6, xRange * e)),
      u = Math.min(2e5, Math.max(1e-6, yRange * u)),
      k = 0.5 * (xMin + xMax),
      t = 0.5 * (yMin + yMax);
    lastMouseX = d.clientX;
    lastMouseY = d.clientY;
    setZoom(k, t, e, u);
    plot();
    e = !0;
  } else
    zoomButtonDown &&
      ((e = Math.pow(0.995, d.clientX - lastMouseX)),
      1 > e
        ? xRange <= yRange
          ? ((e = Math.max(1e-6, xRange * e)), (u = (yRange * e) / xRange))
          : ((u = Math.max(1e-6, yRange * e)), (e = (xRange * u) / yRange))
        : xRange >= yRange
        ? ((e = Math.min(2e5, xRange * e)), (u = (yRange * e) / xRange))
        : ((u = Math.min(2e5, yRange * e)), (e = (xRange * u) / yRange)),
      (k = 0.5 * (xMin + xMax)),
      (t = 0.5 * (yMin + yMax)),
      (lastMouseX = d.clientX),
      (lastMouseY = d.clientY),
      setZoom(k, t, e, u),
      plot(),
      (e = !0));
  return e ? (d.preventDefault(), d.stopPropagation(), !1) : !0;
}
function handleTouchStart(d) {
  var e = !1;
  d || (d = window.event);
  zoomTouchDown = stretchTouchDown = slideTouchDown = !1;
  if (1 === d.touches.length)
    (slideTouchDown = !0),
      (lastTouchX1 = d.touches[0].clientX),
      (lastTouchY1 = d.touches[0].clientY),
      (e = !0);
  else if (2 === d.touches.length) {
    zoomTouchDown = !0;
    var e = d.touches[0],
      u = d.touches[1];
    e.identifier > u.identifier && ((u = d.touches[0]), (e = d.touches[1]));
    lastTouchX1 = e.clientX;
    lastTouchY1 = e.clientY;
    lastTouchX2 = u.clientX;
    lastTouchY2 = u.clientY;
    lastTouchMidX = 0.5 * (lastTouchX1 + lastTouchX2);
    lastTouchMidY = 0.5 * (lastTouchY1 + lastTouchY2);
    e = Math.abs(lastTouchX1 - lastTouchX2);
    u = Math.abs(lastTouchY1 - lastTouchY2);
    lastTouchSpace = Math.sqrt(e * e + u * u);
    e = !0;
  }
  return e ? (d.preventDefault(), d.stopPropagation(), !1) : !0;
}
function handleTouchMove(d) {
  var e = !1;
  d || (d = window.event);
  if (slideTouchDown) {
    if (1 === d.touches.length) {
      var u = ((d.touches[0].clientX - lastTouchX1) * xRange) / width,
        k = ((d.touches[0].clientY - lastTouchY1) * yRange) / height;
      xMin -= u;
      xMax = xMin + xRange;
      yMin += k;
      yMax = yMin + yRange;
      _xMid = 0.5 * (xMin + xMax);
      _yMid = 0.5 * (yMin + yMax);
      lastTouchX1 = d.touches[0].clientX;
      lastTouchY1 = d.touches[0].clientY;
      plot();
      e = !0;
    }
  } else if (zoomTouchDown && 2 === d.touches.length) {
    var e = d.touches[0],
      t = d.touches[1];
    e.identifier > t.identifier && ((t = d.touches[0]), (e = d.touches[1]));
    var l = 0.5 * (e.clientX + t.clientX),
      r = 0.5 * (e.clientY + t.clientY),
      w = Math.abs(e.clientX - t.clientX),
      f = Math.abs(e.clientY - t.clientY),
      w = Math.sqrt(w * w + f * f),
      f = 0.5 * (xMin + xMax),
      x = 0.5 * (yMin + yMax);
    0 < w && 0 < lastTouchSpace
      ? ((f = lastTouchSpace / w),
        (k = xMin + (lastTouchX1 * xRange - e.clientX * xRange * f) / width),
        (u = yMax - (lastTouchY1 * yRange - e.clientY * yRange * f) / height),
        (xRange *= f),
        (yRange *= f),
        (f = k + 0.5 * xRange),
        (x = u - 0.5 * yRange))
      : ((u = ((l - lastTouchMidX) * xRange) / width),
        (k = ((r - lastTouchMidY) * yRange) / height),
        (f -= u),
        (x += k));
    setZoom(f, x, xRange, yRange);
    plot();
    lastTouchX1 = e.clientX;
    lastTouchY1 = e.clientY;
    lastTouchX2 = t.clientX;
    lastTouchY2 = t.clientY;
    lastTouchMidX = l;
    lastTouchMidY = r;
    lastTouchSpace = w;
    e = !0;
  }
  return e ? (d.preventDefault(), d.stopPropagation(), !1) : !0;
}
function handleTouchEnd(d) {
  d || (d = window.event);
  zoomButtonDown =
    stretchButtonDown =
    slideButtonDown =
    zoomTouchDown =
    stretchTouchDown =
    slideTouchDown =
      !1;
  1 == d.touches.length &&
    ((slideTouchDown = !0),
    (lastTouchX1 = d.touches[0].clientX),
    (lastTouchY1 = d.touches[0].clientY));
}
window.onresize = resizeCanvas;
canvas.oncontextmenu = function () {
  return !1;
};
document.addEventListener("mousemove", slideCanvas, !1);
document.addEventListener("mouseup", releaseCanvas, !1);
canvas.addEventListener("touchstart", handleTouchStart, !1);
document.addEventListener("touchmove", handleTouchMove, !1);
document.addEventListener("touchend", handleTouchEnd, !1);
