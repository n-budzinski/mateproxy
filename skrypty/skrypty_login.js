function ustal_suwaki() {
  ustawienia_z_ciasteczek();
  "1" == tryb_male_przyciski
    ? $(".ustawienia_zmiana[opcja='tryb_male_przyciski']").prop("checked", !0)
    : $(".ustawienia_zmiana[opcja='tryb_male_przyciski']").prop("checked", !1);
  "1" == nocna_nauka
    ? $(".ustawienia_zmiana[opcja='nocna_nauka']").prop("checked", !0)
    : $(".ustawienia_zmiana[opcja='nocna_nauka']").prop("checked", !1);
  "0" == poziom_zadania
    ? $(".ustawienia_zmiana[opcja='poziom_zadania']").prop("checked", !0)
    : $(".ustawienia_zmiana[opcja='poziom_zadania']").prop("checked", !1);
  "0" == tryb_bez_yt
    ? $(".ustawienia_zmiana[opcja='tryb_bez_yt']").prop("checked", !0)
    : $(".ustawienia_zmiana[opcja='tryb_bez_yt']").prop("checked", !1);
  "" != login
    ? $(".ustawienia_zmiana[opcja='szybkie_logowanie']").prop("checked", !0)
    : $(".ustawienia_zmiana[opcja='szybkie_logowanie']").prop("checked", !1);
}
$(document).ready(function () {
  ustal_suwaki();
  $(".panel_z_opis").click(function () {
    $(this).parent().nextAll(".panel_opis:eq(0)").slideToggle(0);
  });
  $(".panel_z_opis_next").click(function () {
    $(this).nextAll(".panel_opis:eq(0)").slideToggle(0);
    $(this).hasClass("bold")
      ? $(this).removeClass("bold")
      : $(this).addClass("bold");
  });
  $(".kotwica").click(function () {
    var a = "#" + $(this).attr("kotwica");
    $("html, body").animate({ scrollTop: $(a).offset().top }, 1e3);
  });
  $(".tylko_online_checkbox").change(function () {
    $(this).is(":checked")
      ? $(".online_input").val("1")
      : $(".online_input").val("0");
  });
  $(".pakiet_wybor").click(function () {
    $(".pakiet_wybor").removeClass("zaznaczony_pakiet");
    $(this).addClass("zaznaczony_pakiet");
    var a = "#" + $(this).attr("g_id");
    $(".kup_form").hide();
    $(a).show();
  });
  var b = 0;
  $(".ustawienia_zmiana").change(function () {
    var a = pobierz_atrybut($(this).attr("program"));
    "" != a && 0 == b
      ? ((b = 1),
        $.ajax({
          type: "POST",
          url: "../ajax.php",
          data: "program_id=" + a,
          success: function (a) {
            eval(a);
            ustal_suwaki();
          },
        }),
        setTimeout(function () {
          b = 0;
        }, 200))
      : 1 == b
      ? $(this).prop("checked")
        ? $(this).prop("checked", !1)
        : $(this).prop("checked", !0)
      : "" == a &&
        ((a = pobierz_atrybut($(this).attr("opcja"))),
        $(this).prop("checked")
          ? ("nocna_nauka" == a && setCookie("nocna_nauka", "1", 999),
            "tryb_male_przyciski" == a &&
              setCookie("tryb_male_przyciski", "1", 999),
            "poziom_zadania" == a && setCookie("poziom_zadania", "0", 999),
            "tryb_bez_yt" == a && setCookie("tryb_bez_yt", "0", 999),
            console.log(a + "e-" + getCookie("nocna_nauka")))
          : ("nocna_nauka" == a && setCookie("nocna_nauka", "", 0),
            "tryb_male_przyciski" == a &&
              setCookie("tryb_male_przyciski", "", 0),
            "poziom_zadania" == a && setCookie("poziom_zadania", "", 0),
            "tryb_bez_yt" == a && setCookie("tryb_bez_yt", "", 0),
            console.log(a + "ee-" + getCookie("nocna_nauka"))),
        ustawienia_z_ciasteczek());
  });
});
