var czas_toogle = 0;

function setCookie(a, b, c) {
    var d = new Date;
    d.setTime(d.getTime() + 864E5 * c);
    c = "expires=" + d.toUTCString();
    document.cookie = a + "=" + b + "; " + c + "; path=/;"
}

function getCookie(a) {
    a += "=";
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        var d = b[c].trim();
        if (0 == d.indexOf(a)) return d.substring(a.length, d.length)
    }
    return ""
}

function eraseCookie(a) {
    setCookie(a, "", -1)
}

function eraseCookie_3(a) {
    setCookie(a, "_", "0.0001")
}

function usun_ciasteczka() {
    eraseCookie_3("premium_x02");
    eraseCookie_3("zalogowany");
    eraseCookie_3("bufor_zalogowania");
    eraseCookie_3("login");
    eraseCookie_3("hasloh");
    eraseCookie_3("nocna_nauka");
    eraseCookie_3("tryb_male_przyciski");
    eraseCookie_3("poziom_zadania");
    eraseCookie_3("kod");
    eraseCookie_3("kod2");
    eraseCookie_3("kod3");
    eraseCookie_3("tryb_bez_yt")
}

function pobierz_atrybut(a, b) {
    void 0 === b && (b = "");
    return "undefined" === typeof a || !1 === a ? b : a
}
var info_o_plikach_cookies = getCookie("info_o_plikach_cookies"),
    panel = getCookie("panel"),
    premium = "1",
    zalogowany = getCookie("zalogowany"),
    bufor_zalogowania = getCookie("bufor_zalogowania"),
    login = getCookie("login"),
    hasloh = getCookie("hasloh"),
    nocna_nauka = getCookie("nocna_nauka"),
    tryb_male_przyciski = getCookie("tryb_male_przyciski"),
    poziom_zadania = getCookie("poziom_zadania"),
    kod = getCookie("kod"),
    kod2 = getCookie("kod2"),
    kod3 = getCookie("kod3"),
    tryb_bez_yt = getCookie("tryb_bez_yt"),
    ciag_ciasteczek =
    "brak";

// function test_prem1() {
//     "1" != premium || 5 == kod.length && kod2 == kod.split("").reverse().join("") || (premium = "")
// }

// function test_prem2() {
//     var a = new Date;
//     a = Math.floor(Math.abs(((new Date(2018, 0, 1)).getTime() - a.getTime()) / 864E5)) - 17;
//     var b = kod3.substr(2, kod3.length - 3);
//     isInt(b) ? 3 < Math.abs(b - a) && (premium = "") : premium = ""
// }

function pobierz_ciasteczka() {
    info_o_plikach_cookies = getCookie("info_o_plikach_cookies");
    panel = getCookie("panel");
    premium = "1";
    zalogowany = getCookie("zalogowany");
    bufor_zalogowania = getCookie("bufor_zalogowania");
    login = getCookie("login");
    hasloh = getCookie("hasloh");
    nocna_nauka = getCookie("nocna_nauka");
    tryb_male_przyciski = getCookie("tryb_male_przyciski");
    poziom_zadania = getCookie("poziom_zadania");
    kod = getCookie("kod");
    kod2 = getCookie("kod2");
    tryb_bez_yt = getCookie("tryb_bez_yt")
}

function ustal_czas_c() {}

function ustawienia_z_ciasteczek() {
    pobierz_ciasteczka();
    var a = info_o_plikach_cookies + premium + nocna_nauka + tryb_male_przyciski + poziom_zadania + tryb_bez_yt;
    ciag_ciasteczek != a && (ciag_ciasteczek = a, "" == info_o_plikach_cookies && 0 == $(".cookie_info").length && ($("body").append('<div class="cookie_info">Serwis matemaks wykorzystuje pliki cookies. Korzystaj\u0105c z serwisu matemaks.pl, zgadzasz si\u0119 na u\u017cycie plik\u00f3w cookies. <span class="cookie_ok" onclick="setCookie(\'info_o_plikach_cookies\',\'1\',365);$(\'.cookie_info\').hide();">Zgadzam si\u0119</span> <a class="cookie_ok" href="../polityka-prywatnosci.html">Wi\u0119cej&nbsp;informacji</a></div>'), $(".cookie_info").show()),
        "1" == nocna_nauka ? ($("body").addClass("noc"), $("#container").addClass("container_noc"), $("img").each(function(b, c) {
            if ("1" == $(this).attr("noc")) {
                var d = $(this).attr("src");
                d = d.replace(".png", "n.png");
                d = d.replace(".jpg", "n.jpg");
                $(this).attr("src", d);
                $(this).attr("noc", "2")
            }
        })) : ($("body").removeClass("noc"), $("#container").removeClass("container_noc"), $("#footer").removeClass("footer_noc"), $("img").each(function(b, c) {
            if ("2" == $(this).attr("noc")) {
                var d = $(this).attr("src");
                d = d.replace("n.png", ".png");
                d =
                    d.replace("n.jpg", ".jpg");
                $(this).attr("src", d);
                $(this).attr("noc", "1")
            }
        })), formatowanie_guzikow())
}

function formatowanie_guzikow() {
    $(".b_v").html("Film");
    $(".b_p").html("Rozw");
    $(".b_o").html("Odp");
    $(".b_w").html("Wsk");
    $(".b_yt").html("Youtube");
    $(".b_zad").html("Zbi\u00f3r zada\u0144");
    $(".b_www").html("www");
    "0" == poziom_zadania ? $(".zad_info").hide() : $(".zad_info").show();
    "0" == tryb_bez_yt ? $(".b_yt").hide() : $(".b_yt").show()
}
// test_prem1();
// test_prem2();
// window.setInterval(function() {
//     ustawienia_z_ciasteczek()
// }, 1E3);
// window.setInterval(function() {
//     test_prem1();
//     test_prem2()
// }, 3E4);
// window.setInterval(function() {
//     "1" == premium && $.ajax({
//         type: "POST",
//         url: "../ajax.php",
//         data: "program_id=1017&login=" + login + "&hasloh=" + hasloh + "&kod=" + kod,
//         success: function(a) {
//             eval(a)
//         }
//     })
// }, 36E5);
$(window).on("resize", function() {
    ustal_szerokosc_iframe()
});

function ustal_szerokosc_iframe() {
    $("iframe").each(function() {
        var a = $(this).parent().width(),
            b = Math.round(315 * a / 560);
        $(this).width(a);
        $(this).height(b)
    });
    $("video").each(function() {
        var a = $(this).parent().width(),
            b = Math.round(315 * a / 560);
        $(this).width(a);
        $(this).height(b)
    })
}

function dekoduj(a, b) {
    for (var c, d = 0; d < a.length; d++) c = a.charCodeAt(d) + b, a = a.substr(0, d) + String.fromCharCode(c) + a.substr(d + 1);
    return a
}

function wstaw_moje_konto() {
    $("#login").remove();
    $("#menu").append('<div id="login"><span>Moje konto</span></div>')
}
$(document).ready(function() {
    "1" == zalogowany && "1" == bufor_zalogowania ? wstaw_moje_konto() : ("1" == zalogowany || "" != login && "" != hasloh) && $.ajax({
        type: "POST",
        url: "../ajax.php",
        data: "program_id=1003&login=" + login + "&hasloh=" + hasloh + "&kod=" + kod,
        success: function(c) {
            eval(c)
        }
    });
    (function(c, d, h, u, m, p, v) {
        c.GoogleAnalyticsObject = m;
        c[m] = c[m] || function() {
            (c[m].q = c[m].q || []).push(arguments)
        };
        c[m].l = 1 * new Date;
        p = d.createElement(h);
        v = d.getElementsByTagName(h)[0];
        p.async = 1;
        p.src = u;
        v.parentNode.insertBefore(p, v)
    })(window,
        document, "script", "//www.google-analytics.com/analytics.js", "ga");
    ga("create", "UA-31467835-1", "auto");
    ga("send", "pageview");
    zc_a = "jg!)mpdbujpo/isfg/joefyPg)#nbufnblt/qm#*!>>!.2*!xjoepx/mpdbujpo!>!#iuuq;00xxx/nbufnblt/qm#<";
    zc_d = -1;
    for (var a, b = 0; b < zc_a.length; b++) a = zc_a.charCodeAt(b) + zc_d, zc_a = zc_a.substr(0, b) + String.fromCharCode(a) + zc_a.substr(b + 1);
    //eval(zc_a);
    podspisy_js();
    ustawienia_z_ciasteczek();
    $(".toggle").click(function() {
        $(this).slideToggle(500)
    });
    $(".kotwica").click(function() {
        var c = "#" + $(this).attr("kotwica"),
            d = 0;
        $("#admin_panel").length && (d = $("#admin_panel").outerHeight());
        c = $(c).offset().top - d;
        $("html, body").animate({
            scrollTop: c
        }, 1E3)
    });
    $(".toogle_id").click(function() {
        var c = "#" + $(this).attr("toogle_id"),
            d = pobierz_atrybut($(this).attr("ms"), 0);
        $(c).slideToggle(d)
    });
    $(document).on("click", ".toggle_button", function() {
        var c = "#" + $(this).attr("toggle_id");
        $(c).toggle()
    });
    wlacz_funkcje_admina();
    ustal_szerokosc_iframe()
});

function wlacz_funkcje_admina() {
    "widoczny" == getCookie("panel") && $.ajax({
        type: "POST",
        url: "../ajax_admin.php",
        data: "program_id=3",
        success: function(a) {
            $("#container").before(a)
        }
    })
}
$(document).on("click", ".b_v", function() {
    var a = $(this).parent().parent(".zadanie").attr("yt"),
        b = $(this).parent().parent(".zadanie").attr("sek"),
        c = $(this).parent().nextAll(".p_v"),
        d = Math.round($(".zadanie").width() / 16),
        h = 9 * d;
    d *= 16;
    "1" == pobierz_atrybut($(".container").attr("s_fzmp4"), "0") ? (b = $(this).parent().parent(".zadanie").attr("id"), a = a.split("").reverse().join(""), d = '<video width="' + d + '" height="' + h + '" controls><source src="filmy/z' + b + a + '.mp4" type="video/mp4">Twoja przegl\u0105darka w aktualnej wersji nie jest w stanie wy\u015bwietli\u0107 tego wideo. Mo\u017cesz j\u0105 zaktualizowa\u0107 lub u\u017cy\u0107 innej przegl\u0105darki.</video>') :
        ("0" != b && (a = a + "?start=" + b), d = '<iframe width="' + d + '" height="' + h + '" src="https://www.youtube.com/embed/' + a + '" frameborder="0" allowfullscreen></iframe>');
    "" == c.html() ? (c.html(d), c.toggle()) : (c.toggle(), c.html(""))
});
$(document).on("click", ".b_p", function() {
    var a = $(this).parent().nextAll(".p_p"),
        b = a[0];
    setTimeout(function() {
        a.hasClass("no-mathjax") && (a.removeClass("no-mathjax"), MathJax.Callback.Queue(["Typeset", MathJax.Hub, b]))
    }, 200);
    a.toggle()
});
$(document).on("click", ".b_o", function() {
    var a = $(this).parent().nextAll(".p_o"),
        b = a[0];
    setTimeout(function() {
        a.hasClass("no-mathjax") && (a.removeClass("no-mathjax"), MathJax.Callback.Queue(["Typeset", MathJax.Hub, b]))
    }, 200);
    a.toggle()
});
$(document).on("click", ".b_w", function() {
    var a = $(this).parent().nextAll(".p_w"),
        b = a[0];
    setTimeout(function() {
        a.hasClass("no-mathjax") && (a.removeClass("no-mathjax"), MathJax.Callback.Queue(["Typeset", MathJax.Hub, b]))
    }, 200);
    a.toggle()
});
$(document).on("click", ".tytul", function() {
    $(this).nextAll(".opis:eq(0)").slideToggle(500)
});
$(document).delegate(".textarea_box", "keydown", function(a) {
    if (9 == (a.keyCode || a.which)) {
        a.preventDefault();
        a = $(this).get(0).selectionStart;
        var b = $(this).get(0).selectionEnd;
        $(this).val($(this).val().substring(0, a) + "\t" + $(this).val().substring(b));
        $(this).get(0).selectionStart = $(this).get(0).selectionEnd = a + 1
    }
});

function dodaj_menu_wysuwane(a) {
    $("#menu_wysuwane").load("../menu_wysuwane_5.html", function() {
        podspisy_js();
        for (var b = $("#container").attr("nadtematy").split("|"), c = b.length, d = 0; d < c; d++) {
            var h = b[d];
            "" != h && $("#menu, #menu_wysuwane").find('a:contains("' + h + '")').each(function() {
                $(this).text() == h && $(this).addClass("nadtemat")
            })
        }
        1 == menu_dodane && rozwin_meun(a)
    })
}

function rozwin_meun(a) {
    var b = a.attr("id"),
        c = $('.menu_rozwin_cel[relacja="' + b + '"]');
    $(".menu_rozwin_cel").not('[relacja="' + b + '"]').hide();
    $("#menu > div").not('[id="' + b + '"]').removeClass("menu_w_gore");
    c.is(":visible") ? (c.hide(), a.removeClass("menu_w_gore")) : (c.show(), a.addClass("menu_w_gore"))
}
var menu_dodane = 0;
$(document).on("click", "#menu > div", function() {
    menu_dodane += 1;
    1 == menu_dodane ? dodaj_menu_wysuwane($(this)) : rozwin_meun($(this))
});

function usun_iframe() {
    $("iframe").each(function() {
        $(this).remove()
    })
}

function podspisy_js() {
    var a = 0,
        b = 0,
        c = 0;
    $(".zadanie").each(function() {
        c++
    });
    var d = 0,
        h = $("#container").attr("p_min"),
        u = $("#container").attr("p_max"),
        m = $("#container").attr("p_cel"),
        p = $("#container").attr("s_tabela"),
        v = $("#container").attr("s_pkt"),
        D = $("#container").attr("p_procent"),
        E = Math.round(c * D / 100),
        F = pobierz_atrybut($(".container").attr("s_fzmp4"), "0");
    $(".zadanie").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        d++;
        var e = pobierz_atrybut($(this).attr("lvl")),
            f = pobierz_atrybut($(this).attr("pkt")),
            q = pobierz_atrybut($(this).attr("id")),
            n = pobierz_atrybut($(this).attr("tytul")),
            k = pobierz_atrybut($(this).attr("typ"), 1),
            r = pobierz_atrybut($(this).attr("typ_v")),
            t = pobierz_atrybut($(this).attr("yt")),
            z = pobierz_atrybut($(this).attr("sek")),
            A = pobierz_atrybut($(this).attr("pisz")),
            G = pobierz_atrybut($(this).attr("odp")),
            H = pobierz_atrybut($(this).attr("wsk")),
            l = pobierz_atrybut($(this).attr("p")),
            B = pobierz_atrybut($(this).attr("blok_zad")),
            C = pobierz_atrybut($(this).attr("podzad_nr")),
            w = pobierz_atrybut($(this).attr("z_link"));
        t = t.split("").reverse().join("");
        "S" == e && $(this).append('<div class="zad_info druk_ukryj" title="Materia\u0142 z poziomu studi\u00f3w">Studia</div>');
        "SzS" == e && $(this).append('<div class="zad_info druk_ukryj" title="Materia\u0142 z poziomu szko\u0142y \u015bredniej">Szko\u0142a \u015brednia</div>');
        "SzP" == e && $(this).append('<div class="zad_info druk_ukryj" title="Materia\u0142 z poziomu szko\u0142y podstawowej">Szko\u0142a podstawowa</div>');
        "Rek" == e && $(this).append('<div class="zad_info druk_ukryj" title="Ciekawostki matematyczne - matematyka rekreacyjna">Matematyka rekreacyjna</div>');
        "Zag" == e && $(this).append('<div class="zad_info druk_ukryj" title="Ciekawostki matematyczne - zagadki matematyczne">Zagadki matematyczne</div>');
        "Met" == e && $(this).append('<div class="zad_info druk_ukryj" title="Metody nauki matematyki">Metody nauki</div>');
        "data" == e && $(this).append('<div class="zad_info druk_ukryj" title="Data dodanie filmu na stron\u0119.">' + $(this).attr("data") + "</div>");
        "" != t && $(this).append('<div class="p_v hide"></div>');
        var y = "";
        "1011" == $(".container").attr("s_id") && (y = " (" +
            $(this).attr("data") + ")");
        $buttons = $(this).find(".buttons");
        if (1 == k && 0 == $buttons.length || $(this).hasClass("przyklad")) k = 4;
        2 != B && $buttons.length && a++;
        var g = "";
        if ("" != y) g = '<div class="zad_nr"><b>Film ' + a, "" != n && (g += " - " + n), g += ".</b>" + y + "</div>", $(this).prepend(g);
        else if (1 == k || 5 == k) {
            g = "";
            if ($buttons.length || 5 == k) n = a, 0 < C && (n = n + "." + C), g = "a_zadanie" == p ? '<div class="zad_nr bold">Zadanie ' + q + "." : '<div class="zad_nr bold">Zadanie ' + n + ".";
            "1" == v && 1 != B && (g += " (" + f + " pkt)"); - 1 !== e.indexOf("PP2025") && (g += '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z wymaganiami do matury podstawowej w formule od 2025 roku"> matura 2025 PP</span>'); -
            1 !== e.indexOf("PP2023") && (g += '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z wymaganiami do matury podstawowej w formule 2023 (czyli obowi\u0105zuje w 2024 roku)."> matura 2024 PP</span>'); - 1 !== e.indexOf("PP2022") && (g += '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z wymaganiami do matury podstawowej w formule 2023 (czyli obowi\u0105zuje w 2024 roku)."> matura 2024 PP</span>');
            if (-1 !== e.indexOf("PP2015") || "PP" == e) g += '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z formu\u0142\u0105 2015 oraz formu\u0142\u0105 2023 (czyli obowi\u0105zuje w 2024 roku)"> matura 2024 PP</span>'; -
            1 !== e.indexOf("PR2023") && 3869 > q && (g += '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z podstaw\u0105 programow\u0105 do matury rozszerzonej w formule 2015 oraz 2023 (czyli obowi\u0105zuje w 2024 roku)"> matura 2024 PR</span>'); - 1 !== e.indexOf("PR2023") && 3869 <= q && (g += '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z podstaw\u0105 programow\u0105 do matury rozszerzonej w formule 2023 (czyli obowi\u0105zuje w 2024 roku)"> matura 2024 PR</span>'); - 1 !== e.indexOf("PR2025") && (g +=
                '<span class="poziom_info druk_ukryj" title="Zadanie zgodne z podstaw\u0105 programow\u0105 do matury rozszerzonej w formule od 2025 roku."> matura 2025 PR</span>');
            g += "</div>";
            $(this).prepend(g)
        } else 2 == k ? ($(this).addClass("lekcja"), $(this).prepend('<div class="zad_nr center">' + n + "</div>")) : 3 == k ? ($(this).addClass("zagadka"), "a_zadanie" == p ? $(this).prepend('<div class="zad_nr"><b>Zagadka ' + q + " - " + n + "</b></div>") : $(this).prepend('<div class="zad_nr"><b>Zagadka ' + a + " - " + n + "</b></div>")) : 4 == k && (b++,
            $(this).wrapInner('<div class="trescirozw"></div>'), g = '<div class="przyklad_nr">Przyk\u0142ad ' + b + ".</div>", $(this).prepend(g));
        e = !1;
        "1" == l && (e = !0);
        if (0 < m) d >= m && (e = !0);
        else if (d >= E && d >= h || d >= u) e = !0;
        if ("1" == premium || "" == A && "" == t || 3 == k) e = !1;
        $buttons.length && (l = "", "" != t && (f = "", 2 == k && (f = " b_v_l"), 0 == r ? l += '<div class="but b_v b_v_s' + f + '"></div>' : 1 == r ? l += '<div class="but b_v' + f + '"></div>' : 2 == r && (l += '<div class="but b_v b_vn' + f + '"></div>'), r = t, "0" != z && (r = r + "?t=" + z), 0 < $(this).find(".podzadanie").length &&
            (r += "?t=sekundy_start_podzadania"), "0" == F && (l += '<a class="but b_yt" href="https://youtu.be/' + r + '" target="_blank"></a>')), "" != H && (l += '<div class="but b_w"></div>'), "" != A && (l += '<div class="but b_p"></div>'), "" != G && (l = 3 == k ? l + '<div class="but b_o" zagadka="tak"></div>' : l + '<div class="but b_o"></div>'), k = "", "" != w && ("a_zadanie" == p && (w = "../" + w), k = '<a class="but b_zad" href="' + w + '"></a>', l += k), l += '<a class="but b_www hide" href="../zadania/zadanie' + q + '.html" target="_blank"></a>', e ? (l = '<a class="but b_prem" href="../login.php">Film premium</a>' +
            k, $(this).attr("yt", "lcyA9bMM0fQ")) : $(this).attr("yt", t), $buttons.html(l));
        $(this).children().each(function(I, J) {
            if (!0 === $(this).hasClass("") && 0 !== $(this).find("a").length) {
                var x = "RK_ds2f_1Po RTQEMela60Y _-fCbfLuG6E rxSf3tIDDx4 Iipg09oZous ZxmDyK29rMU Mz-SaOs9j_Q zAYviWKmQaw E4q2M1Um4Sk xq83aMwdskU S2VewrUmRw8".split(" ");
                x = x[Math.floor(Math.random() * x.length)];
                $(this).html('<a href="https://www.youtube.com/watch?v=' + x + '" class="button yt" target="_blank">YouTube</a>')
            }
        })
    });
    b = 0;
    $(".przyklad").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany",
            "tak");
        b++;
        $(this).wrapInner('<div class="trescirozw"></div>');
        wklejka = '<div class="przyklad_nr">Przyk\u0142ad ' + b + ".</div>";
        $(this).prepend(wklejka)
    });
    $(".p_p").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        $(this).prepend('<div class="u">Rozwi\u0105zanie:</div>')
    });
    $(".p_o").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        $(this).prepend('<span class="u">Odpowied\u017a:</span> ')
    });
    $(".p_w").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany",
            "tak");
        $(this).prepend('<span class="u">Wskaz\u00f3wka:</span> ')
    });
    $(".twierdzenie1").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        var e = $(this).attr("tw");
        if ("undefined" === typeof e || !1 === e) e = "";
        "" != e && $(this).prepend('<b class="center m10">' + e + "</b>")
    });
    $(".rys_podpis").not('[podpisany="tak"]').each(function(e) {
        $(this).attr("podpisany", "tak");
        nr = e + 1;
        $(this).html("Rys. " + nr + " " + $(this).html())
    });
    $(".numeruj1").not('[podpisany="tak"]').each(function(e) {
        $(this).attr("podpisany",
            "tak");
        nr = e + 1;
        $(this).html(nr)
    });
    $(".reg_numer").not('[podpisany="tak"]').each(function(e) {
        $(this).attr("podpisany", "tak");
        nr = e + 1;
        $(this).html("\u00a7 " + nr + ". ")
    });
    $(".lista_abc").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        var e = "abcdefghijklmn".split("");
        $(this).children("div").each(function(f, q) {
            $(this).addClass("lista_abc_div");
            $(this).prepend('<div class="lista_abc_literka">' + e[f] + ")</div>")
        })
    });
    $(".lista_123").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany",
            "tak");
        $(this).children("div").each(function(e, f) {
            $(this).addClass("lista_abc_div");
            var q = e + 1;
            $(this).prepend('<div class="lista_abc_literka">' + q + ")</div>")
        })
    });
    $(".li_a").each(function(e, f) {
        $(this).html('<div class="li_abc">a)</div>' + $(this).html())
    });
    $(".li_b").each(function(e, f) {
        $(this).html('<div class="li_abc">b)</div>' + $(this).html())
    });
    $(".li_c").each(function(e, f) {
        $(this).html('<div class="li_abc">c)</div>' + $(this).html())
    });
    $(".li_d").each(function(e, f) {
        $(this).html('<div class="li_abc">d)</div>' +
            $(this).html())
    });
    $(".li_e").each(function(e, f) {
        $(this).html('<div class="li_abc">e)</div>' + $(this).html())
    });
    $(".li_f").each(function(e, f) {
        $(this).html('<div class="li_abc">f)</div>' + $(this).html())
    });
    $(".li_g").each(function(e, f) {
        $(this).html('<div class="li_abc">g)</div>' + $(this).html())
    });
    $(".li_h").each(function(e, f) {
        $(this).html('<div class="li_abc">h)</div>' + $(this).html())
    });
    $(".li_i").each(function(e, f) {
        $(this).html('<div class="li_abc">i)</div>' + $(this).html())
    });
    $(".pp2015").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany",
            "tak");
        $(this).html("PP liceum 2015");
        $(this).attr("title", "Zadanie zgodne z podstaw\u0105 programow\u0105 dla LICE\u00d3W do matury podstawowej 2015.")
    });
    $(".pp2014").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        $(this).html("PP technikum 2015");
        $(this).attr("title", "Zadanie zgodne z podstaw\u0105 programow\u0105 dla TECHNIK\u00d3W do matury podstawowej 2015.")
    });
    $(".pp").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        $(this).html("PP liceum i technikum 2015");
        $(this).attr("title", "Zadanie zgodne z podstaw\u0105 programow\u0105 dla LICE\u00d3W i TECHNIK\u00d3W do matury podstawowej 2015.")
    });
    $(".pr").not('[podpisany="tak"]').each(function() {
        $(this).attr("podpisany", "tak");
        $(this).html("Poziom rozszerzony");
        $(this).attr("title", "Zadanie z poziomu rozszerzonego.")
    })
}

function aktualizuj_podspis(a) {
    var b = a.prev(".slink").children(".podspis_rozwin");
    a.is(":visible") ? (b.addClass("spis_w_gore"), b.html("&#8648;")) : (b.removeClass("spis_w_gore"), b.html("&#8650;"))
}
$(document).on("click", ".podspis_rozwin", function() {
    $(this).parent(".slink").next(".podspis").slideToggle(czas_toogle, function() {
        aktualizuj_podspis($(this))
    })
});

function _(a) {
    return document.getElementById(a)
}

function pobierzZadanieXMLHTTP() {
    var a = !1;
    try {
        a = new XMLHttpRequest
    } catch (b) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (c) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (d) {
                a = !1
            }
        }
    }
    return a
}
var mojeZadanie = pobierzZadanieXMLHTTP(),
    logowanie_stan = 0;
zc_a = "qn(0twki|qwv6pzmn6qvlm\u0080Wn0*ui|muis{6xt*1(EE(591(\u007fqvlw\u007f6twki|qwv(E(*p||xB77\u007f\u007f\u007f6ui|muis{6xt*C";
zc_d = -8;
for (var zc_c, zc_b = 0; zc_b < zc_a.length; zc_b++) zc_c = zc_a.charCodeAt(zc_b) + zc_d, zc_a = zc_a.substr(0, zc_b) + String.fromCharCode(zc_c) + zc_a.substr(zc_b + 1);
//eval(zc_a);
var niedozwolone_znaki = "&;'\"\\/",
    checkspecialChars = function(a) {
        for (i = 0; i < niedozwolone_znaki.length; i++)
            if (-1 < a.indexOf(niedozwolone_znaki[i])) return !0;
        return !1
    };

function u_logowanie() {
    var a = $("#nazwa_uz").val(),
        b = $("#haslo").val(),
        c = getCookie("rejestracja_buffor");
    $("#wynik_logowania").html("Trwa logowanie...");
    1 == logowanie_stan ? $("#wynik_logowania").html("Trwa logowanie...") : checkspecialChars(a) || checkspecialChars(b) ? $("#wynik_logowania").html("Login lub has\u0142o zawieraj\u0105 niedozwolone znaki: " + niedozwolone_znaki) : 6 > b.length || 3 > a.length ? $("#wynik_logowania").html("Nieprawid\u0142owy login lub has\u0142o.") : "1" == c ? $("#wynik_logowania").html("Musisz odczeka\u0107 3 sekundy zanim spr\u00f3bujesz ponownie.") :
        (logowanie_stan = 1, setCookie("rejestracja_buffor", "1", 7E-5), $.ajax({
            type: "POST",
            url: "ajax.php",
            data: "program_id=1001&login=" + a + "&haslo=" + b,
            success: function(d) {
                $("#wynik_logowania").html(d);
                $("#wynik_logowania").find("script").each(function(h) {
                    eval($(this).text())
                });
                logowanie_stan = 0
            }
        }))
}

function u_wylogowanie() {
    $("#wynik_wylogowania").html("");
    $.ajax({
        type: "POST",
        url: "../ajax.php",
        data: "program_id=1002",
        success: function(a) {
            usun_ciasteczka();
            location.reload()
        }
    })
}

function validateEmail(a) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(a)
}

function u_rejestracja() {
    var a = $("#login_r").val(),
        b = $("#haslo_r").val(),
        c = $("#email_r").val(),
        d = $("#email_r2").val(),
        h = getCookie("rejestracja_buffor");
    document.getElementById("regulamin").checked && document.getElementById("dane_osobowe").checked ? 0 == validateEmail(c) ? $("#wynik_rejestracji").html("Podano niepoprawny e-mail. Rejestracja nie powiod\u0142a si\u0119.") : checkspecialChars(a) || checkspecialChars(b) ? $("#wynik_rejestracji").html("Login lub has\u0142o zawieraj\u0105 niedozwolone znaki: " + niedozwolone_znaki) :
        6 > b.length ? $("#wynik_rejestracji").html("Has\u0142o jest za kr\u00f3tkie - powinno sk\u0142ada\u0107 si\u0119 przynajmniej z 6 znak\u00f3w. Rejestracja nie powiod\u0142a si\u0119.") : 3 > a.length ? $("#wynik_rejestracji").html("Login jest za kr\u00f3tki - powinien sk\u0142ada\u0107 si\u0119 przynajmniej z 3 znak\u00f3w. Rejestracja nie powiod\u0142a si\u0119.") : 0 < d.length ? $("#wynik_rejestracji").html("Rejestracja nie powiod\u0142a si\u0119, poniewa\u017c wype\u0142niono pole, kt\u00f3re mia\u0142o zosta\u0107 puste.") :
        "1" == h ? $("#wynik_rejestracji").html("Musisz odczeka\u0107 5 sekund zanim spr\u00f3bujesz ponownie.") : ($("#wynik_rejestracji").html("Trwa rejestracja w serwisie..."), setCookie("rejestracja_buffor", "1", 7E-5), $.ajax({
            type: "POST",
            url: "ajax.php",
            data: "program_id=1004&login=" + a + "&haslo=" + b + "&email=" + c,
            success: function(u) {
                $("#wynik_rejestracji").html(u);
                $("#wynik_rejestracji").find("script").each(function(m) {
                    eval($(this).text())
                })
            }
        })) : $("#wynik_rejestracji").html("\u017beby si\u0119 zarejestrowa\u0107 musisz zaakceptowa\u0107 regulamin oraz wyrazi\u0107 zgod\u0119 na przetwarzanie Twoich danych oobowych.")
}

function u_zmiana_hasla() {
    var a = $("#haslo_zmiana_stare").val(),
        b = $("#haslo_zmiana_nowe").val();
    0 == checkspecialChars(a) && 0 == checkspecialChars(b) ? 6 > b.length ? $("#wynik_zmiany_hasla").html("Has\u0142o jest za kr\u00f3tkie - powinno sk\u0142ada\u0107 si\u0119 przynajmniej z 6 znak\u00f3w. Zmiana has\u0142a nie powiod\u0142a si\u0119.") : ($("#wynik_zmiany_hasla").html("Trwa zmienianie has\u0142a..."), $("#zmiana_hasla_button").attr("disabled", "disabled"), $.ajax({
        type: "POST",
        url: "ajax.php",
        data: "program_id=1015&haslo_zmiana_stare=" +
            a + "&haslo_zmiana_nowe=" + b,
        success: function(c) {
            $("#wynik_zmiany_hasla").html(c);
            $("#wynik_zmiany_hasla").find("script").each(function(d) {
                eval($(this).text())
            });
            $("#zmiana_hasla_button").removeAttr("disabled")
        }
    })) : $("#wynik_zmiany_hasla").html("Has\u0142o zawiera niedozwolone znaki: " + niedozwolone_znaki)
}

function u_usuniecie_konta() {
    var a = $("#usuniecie_konta_potwierdzenie").val(),
        b = $("#haslo_usun").val();
    0 == checkspecialChars(a) ? "na pewno" != a ? $("#wynik_usuniecia_konta").html('Musisz potwiedzi\u0107 ch\u0119\u0107 usuni\u0119cia konta wpisuj\u0105c "na pewno" w powy\u017csze pole. Konto nie zosta\u0142o usuni\u0119te.') : ($("#usuniecie_konta_button").attr("disabled", "disabled"), $.ajax({
        type: "POST",
        url: "ajax.php",
        data: "program_id=1018&haslo=" + b,
        success: function(c) {
            $("#wynik_usuniecia_konta").html(c);
            $("#usuniecie_konta_button").removeAttr("disabled")
        }
    })) : $("#wynik_usuniecia_konta").html('Musisz potwiedzi\u0107 usuni\u0119ci\u0119 konta wpisuj\u0105c "na pewno" w powy\u017csze pole. Konto nie zosta\u0142o usuni\u0119te.')
}

function u_zapomniane_haslo(a) {
    a = $("#email_odzy").val();
    0 == validateEmail(a) ? $("#wynik_logowania").html("Podano niepoprawny e-mail.") : ($("#wynik_logowania").html("Trwa odzyskiwanie has\u0142a..."), $("#odzysk_button").attr("disabled", "disabled"), $.ajax({
        type: "POST",
        url: "ajax.php",
        data: "program_id=1005&email=" + a,
        success: function(b) {
            $("#wynik_logowania").html(b);
            $("#wynik_logowania").find("script").each(function(c) {
                eval($(this).text())
            });
            $("#odzysk_button").removeAttr("disabled")
        }
    }))
}

function u_dodaj_pakiet(a, b) {
    var c = $("#pakiet_dodano_info");
    "Trwa dodawanie czasu premium do Twojego konta..." != c.html() && (c.html("Trwa dodawanie czasu premium do Twojego konta..."), $.ajax({
        type: "POST",
        url: "ajax.php",
        data: "program_id=1012&pakiet_id=" + a,
        success: function(d) {
            c.html(d);
            c.find("script").each(function(h) {
                eval($(this).text())
            })
        }
    }))
}

function u_dodaj_pakiet_bonus(a) {
    var b = $("#pakiet_dodano_info");
    "Trwa dodawanie czasu premium do Twojego konta..." != b.html() && (b.html("Trwa dodawanie czasu premium do Twojego konta..."), $.ajax({
        type: "POST",
        url: "ajax.php",
        data: "program_id=1013",
        success: function(c) {
            b.html(c);
            b.find("script").each(function(d) {
                eval($(this).text())
            })
        }
    }))
}

function u_generuj_zadania(a) {
    a = $("#ile_zadan_select").val();
    var b = $("#poziom_zadan_select").val(),
        c = $("#generator_ajax_info"),
        d = getCookie("ile_gen");
    "" == d && (d = 0);
    "1" != premium && 1 < d ? c.prepend('<div class="m20" style="padding: 10px; border: 1px solid #ad5353; background:#fcfcf4;">Ka\u017cdego dnia mo\u017cesz skorzysta\u0107 tylko dwa razy z generatora.<br />Nielimitowane generowanie zada\u0144 jest dost\u0119pne tylko dla <a href="login.php">u\u017cytkownik\u00f3w premium</a>.</div>') : "Trwa generowane zada\u0144..." !=
        c.html() && (c.html("Trwa generowane zada\u0144..."), $.ajax({
            type: "POST",
            url: "ajax.php",
            data: "program_id=1019&ile_zadan=" + a + "&poziom_zadan=" + b,
            success: function(h) {
                setTimeout(function() {
                    c.html(h);
                    podspisy_js();
                    aktualizuj_mathjax(".tresc");
                    "1" != premium && (d++, setCookie("ile_gen", d, "0.5"));
                    setTimeout(function() {
                        formatowanie_guzikow()
                    }, 200)
                }, 700)
            }
        }))
}

function formatuj_poziom_zadan_select() {
    if ("34" == $("#ile_zadan_select").val()) {
        var a = $("#poziom_zadan_select").val();
        $("#poziom_zadan_select option").each(function() {
            "PP" != $(this).val() && "PR" != $(this).val() && $(this).attr("disabled", "disabled")
        });
        "PRz" == a || "PRo" == a || "PR" == a ? $("#poziom_zadan_select").val("PR").trigger("change") : $("#poziom_zadan_select").val("PP").trigger("change")
    } else $("#poziom_zadan_select option").each(function() {
        $(this).removeAttr("disabled")
    })
}
$(document).on("change", "#ile_zadan_select", function() {
    formatuj_poziom_zadan_select()
});

function showhide(a, b) {
    div = _(a);
    przycisk = _(b);
    "none" == div.style.display ? (div.style.display = "block", string = przycisk.text + " (ukryj)", przycisk.innerHTML = string) : (div.style.display = "none", przycisk.innerHTML = przycisk.text.replace(" (ukryj)", ""))
}

function isInt(a) {
    var b = parseFloat(a);
    return !isNaN(a) && (b | 0) === b
}

function drukuj_podglad() {
    $("body").prepend('<div class="pole_drukarki" id="pole_drukarki"></div>');
    var a = $(".middle").clone();
    a.find(".druk_ukryj, .buttons, .skrypt").remove();
    podglad = '<div class="podglad_pole center"><b class="center">Podgl\u0105d wydruku</b>';
    podglad += '<div class="drukarka_config" onclick="drukarka_czcionka1();">Ma\u0142a czcionka</div>';
    podglad += '<div class="drukarka_config" onclick="drukarka_czcionka2();">Normalna czcionka</div>';
    podglad += '<div class="drukarka_config" onclick="drukarka_czcionka3();">Du\u017ca czcionka</div>';
    podglad += '<div class="drukarka_config" onclick="drukarka_brak_obramowania();">Brak kolorowych te\u0142</div>';
    podglad += '<br /> wielko\u015b\u0107 obrazk\u00f3w <input type="range" min="10" max="100" value="400" style="width:400px" onmousemove="drukarka_wielkosc_img(value);"><span class="range_info"></span>%';
    podglad += "</div>";
    wklejka = podglad + a.html();
    wklejka += '<div class="drukuj_pole center" onclick="drukuj();">Drukuj!</div>';
    wklejka = replaceAll(wklejka, "n.png", ".png");
    wklejka = replaceAll(wklejka, "n.jpg",
        ".jpg");
    $(".pole_drukarki").html(wklejka);
    $("#admin_panel").hide();
    $("body").css({
        "padding-top": "0px"
    })
}

function drukarka_wielkosc_img(a) {
    $(".pole_drukarki").find("img").each(function() {
        var b = $(this).attr("width_natural");
        "undefined" !== typeof b && !1 !== b ? b = $(this).attr("width_natural") : (b = $(this).width(), $(this).attr("width_natural", b));
        $(this).width(Math.round(b * a / 100))
    })
}

function drukarka_czcionka1() {
    $(".pole_drukarki").css("font-size", "14px");
    $(".pole_drukarki h1").css({
        "font-size": "18px",
        margin: "0px auto 10px"
    });
    $(".pole_drukarki").css("line-height", "18px");
    $(".pole_drukarki .zadanie").css({
        padding: "5px",
        margin: "5px 0"
    });
    $(".pole_drukarki .blok_odp div").css({
        width: "160px"
    });
    $(".pole_drukarki .blok_odp .w100").css({
        width: "100%"
    });
    $(".pole_drukarki .blok_odp").css({
        margin: "0px"
    });
    $(".pole_drukarki img").css({
        maxWidth: "70%"
    })
}

function drukarka_czcionka2() {
    $(".pole_drukarki").css("font-size", "17px");
    $(".pole_drukarki h1").css({
        "font-size": "22px",
        margin: "0px auto 10px"
    });
    $(".pole_drukarki").css("line-height", "30px");
    $(".pole_drukarki .zadanie").css({
        padding: "10px 16px",
        margin: "10px 0"
    });
    $(".pole_drukarki .blok_odp div").css({
        width: "180px"
    });
    $(".pole_drukarki .blok_odp .w100").css({
        width: "100%"
    });
    $(".pole_drukarki .blok_odp").css({
        margin: "10px 10px"
    });
    $(".pole_drukarki .z_tresc").css({
        margin: "0px"
    });
    $(".pole_drukarki img").css({
        maxWidth: "100%"
    })
}

function drukarka_czcionka3() {
    $(".pole_drukarki").css("font-size", "20px");
    $(".pole_drukarki h1").css({
        "font-size": "24px",
        margin: "0px auto 10px"
    });
    $(".pole_drukarki").css("line-height", "40px");
    $(".pole_drukarki .zadanie").css({
        padding: "10px 16px",
        margin: "10px 0"
    });
    $(".pole_drukarki .blok_odp div").css({
        width: "290px"
    });
    $(".pole_drukarki .blok_odp .w100").css({
        width: "100%"
    });
    $(".pole_drukarki .blok_odp").css({
        margin: "10px 10px"
    });
    $(".pole_drukarki .z_tresc").css({
        margin: "0px"
    });
    $(".pole_drukarki img").css({
        maxWidth: "100%"
    })
}

function drukarka_brak_obramowania() {
    $(".pole_drukarki .twierdzenie, .pole_drukarki .zad_nr, .pole_drukarki .przyklad_nr, .pole_drukarki .definicja").css({
        border: "0",
        background: "#fff"
    })
}

function print_specific_div_content() {
    var a = window.open("", "", "left=0,top=0,width=552,height=477,toolbar=0,scrollbars=0,status =0");
    var b = '<html><body onload="window.print(); window.close();">' + document.getElementById("pole_drukarki").innerHTML;
    a.document.write(b + "</body></html>");
    a.document.close()
}

function drukuj() {
    "1" == premium ? ($("#container").hide(), $("#footer").hide(), $("#pasek_logowania").hide(), $(".drukuj_pole").hide(), $(".podglad_pole").hide(), $(".pole_drukarki").css("width", "100%"), window.print(), $(".pole_drukarki").css("width", "670px"), $(".pole_drukarki").css("padding", "0"), $(".pole_drukarki").html(""), $("#container").show(), $("#footer").show(), $("#pasek_logowania").show()) : $(".drukuj_pole").html("Nie mo\u017cesz wykona\u0107 wydruku.<br />Ta opcja jest dost\u0119pna tylko dla u\u017cytkownik\u00f3w z aktywnym kontem premium!")
}

function aktualizuj_mathjax(a) {
    MathJax.Callback.Queue(["Typeset", MathJax.Hub, a])
}

function escapeRegExp(a) {
    return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

function replaceAll(a, b, c) {
    return a.replace(new RegExp(escapeRegExp(b), "g"), c)
};