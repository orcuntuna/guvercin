$(".open-drawer a").on("click", function(e){
    e.preventDefault();
    $("#drawer").show();
    $(".open-drawer").hide();
    $(".close-drawer").show();
});

$(".close-drawer a").on("click", function(e){
    e.preventDefault();
    $("#drawer").hide();
    $(".close-drawer").hide();
    $(".open-drawer").show();
});

$(function() {

    user_theme = window.localStorage.getItem("theme");
    if (user_theme == "dark") {
        $("#theme-link").attr("href", "../styles/dark-theme.css");
        body_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
    }

    var theme_select = document.getElementById("theme");

    $(theme_select).on("change", function() {
        current_theme = window.localStorage.getItem("theme");
    
        theme_option = $(this).children("option:selected").val();
    
        if (theme_option != current_theme) {
            if (theme_option == "dark") {
                $("#theme-link").attr("href", "../styles/dark-theme.css");
                window.localStorage.setItem("theme", "dark");
                body_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
            }
            else if (theme_option == "light") {
                $("#theme-link").attr("href", "../styles/empty.css");
                window.localStorage.setItem("theme", "light");
                body_editor.setTheme(require('ace-builds/src/theme-xcode'));
            }
        }
    });    
});
