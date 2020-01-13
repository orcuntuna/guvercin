$(".open-drawer a").on("click", function (e) {
    e.preventDefault();
    $("#drawer").show();
    $(".open-drawer").hide();
    $(".close-drawer").show();
});

$(".close-drawer a").on("click", function (e) {
    e.preventDefault();
    $("#drawer").hide();
    $(".close-drawer").hide();
    $(".open-drawer").show();
});

function setHeaderContentType(header_mode) {
    if (header_mode) {
        var changed = false;
        $("#tab-headers .header-list .item").each(function (index) {
            if ($(this).find(".params_key").val() == "Content-Type") {
                if (!changed) {
                    $(this).find(".params_value").val(header_mode);
                    changed = true;
                }
            }
        });
        if (!changed) {
            var created = false;
            $("#tab-headers .header-list .item").each(function (index) {
                if (!$(this).find(".params_key").val()) {
                    if (!created) {
                        $(this).find(".params_key").val("Content-Type");
                        $(this).find(".params_value").val(header_mode);
                        created = true;
                    }
                }
            });
            if (!created) {
                $("#tab-headers .header-list").append(header_template);
                $("#tab-headers .header-list .item:last").find(".params_key").val("Content-Type");
                $("#tab-headers .header-list .item:last").find(".params_value").val(header_mode);
            }
        }
    }
}

function setDefaultAceOption(user_ace_option) {
    $('#ace-option option:selected').removeAttr('selected');
    $("#ace-option option[value='" + user_ace_option +"']").attr("selected", "selected");
}

function setAceOption(user_ace_option) {
    $('#body-content-type option:selected').removeAttr('selected');
    $("#body-content-type option[value='" + user_ace_option + "']").attr("selected", "selected");
}

$(function () {

    user_theme = window.localStorage.getItem("theme");

    user_ace_option = window.localStorage.getItem("ace_mode");

    if (user_theme == "dark") {
        $("#theme-link").attr("href", "../styles/dark-theme.css");
        body_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
        $('#theme option:selected').removeAttr('selected');
        $("#theme option[value='dark']").attr("selected", "selected");
    }


    $("#theme").on("change", function () {
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

    switch (user_ace_option) {
        case "json":
            mode = require("ace-builds/src/mode-json").Mode;
            new_header_mode = "application/json";
            setDefaultAceOption(user_ace_option);
            setAceOption(user_ace_option);
            body_editor.session.setMode(new mode());
            setHeaderContentType(new_header_mode);
            break;
        case "xml":
            mode = require("ace-builds/src/mode-xml").Mode;
            new_header_mode = "application/xml";
            setDefaultAceOption(user_ace_option);
            setAceOption(user_ace_option);
            body_editor.session.setMode(new mode());
            setHeaderContentType(new_header_mode);
            break;
        case "plain-text":
            mode = require("ace-builds/src/mode-plain_text").Mode;
            new_header_mode = "text/plain";
            setDefaultAceOption(user_ace_option);
            setAceOption(user_ace_option);
            body_editor.session.setMode(new mode());
            setHeaderContentType(new_header_mode);
            break;
        case "html":
            mode = require("ace-builds/src/mode-html").Mode;
            new_header_mode = "text/html";
            setDefaultAceOption(user_ace_option);
            setAceOption(user_ace_option);
            body_editor.session.setMode(new mode());
            setHeaderContentType(new_header_mode);
            break;
    }

    $("#ace-option").on("change", function () {
        current_option = window.localStorage.getItem("ace_mode");
        ace_option = $(this).children("option:selected").val();
        if (ace_option != current_option) {
            switch (ace_option) {
                case "json":
                    mode = require("ace-builds/src/mode-json").Mode;
                    new_header_mode = "application/json";
                    window.localStorage.setItem("ace_mode", "json");
                    setAceOption(ace_option);
                    break;
                case "xml":
                    mode = require("ace-builds/src/mode-xml").Mode;
                    new_header_mode = "application/xml";
                    window.localStorage.setItem("ace_mode", "xml");
                    setAceOption(ace_option);
                    break;
                case "plain-text":
                    mode = require("ace-builds/src/mode-plain_text").Mode;
                    new_header_mode = "text/plain";
                    window.localStorage.setItem("ace_mode", "plain-text");
                    setAceOption(ace_option);
                    break;
                case "html":
                    mode = require("ace-builds/src/mode-html").Mode;
                    new_header_mode = "text/html";
                    window.localStorage.setItem("ace_mode", "html");
                    setAceOption(ace_option);
                    break;
            }
            body_editor.session.setMode(new mode());
            setHeaderContentType(new_header_mode);
        }
    });
});
