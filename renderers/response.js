var response_editor;

$(function(){

    response_editor = ace.edit("response-editor", {
        minLines: 18,
        maxLines: 9999
    });

    var JSONMode = require("ace-builds/src/mode-json").Mode;
    response_editor.session.setMode(new JSONMode());
    response_editor.setTheme(require('ace-builds/src/theme-xcode'));
    response_editor.setFontSize("14px");
    response_editor.setReadOnly(true);

});