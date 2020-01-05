const Swal = require('sweetalert2');
const ace = require('ace-builds/src/ace');

const parameter_template = `<div class="item">
<div class="key">
  <input type="text" class="form-control params_key" name="params_key[]" placeholder="Parameter Key"/>
</div>
<div class="value">
  <input type="text" class="form-control params_value" name="params_value[]" placeholder="Parameter Value"/>
</div>
<div class="operation">
  <button class="btn btn-delete delete_param"><i class="fa fa-trash"></i></button>
</div>
</div>`;

var body_editor;

function validateURL(){
    var url = $("#url").val();
    if(validate({website: url}, {website: {url: true}}) != undefined){
        return false;
    }else{
        return true;
    }
}

function checkParamsAndAdd(){
    var params = $("#tab-params .list input.params_key");
    if($(params[params.length-1]).val()){
        $("#tab-params .list").append(parameter_template);
    }
}


$(function(){

    var active_tab_name = $("#props .nav-tabs .active").attr("tab");
    $("#props .tabs .tab[tab='"+active_tab_name+"']").show();

    $("#tab-params .list").append(parameter_template);
    $("#tab-params .list").append(parameter_template);
    $("#tab-params .list").append(parameter_template);

    $("#tab-params .list").on("change", "input.params_key", function(e){
        checkParamsAndAdd();
    });

    body_editor = ace.edit("body-editor");
    var JSONMode = require("ace-builds/src/mode-json").Mode;
    body_editor.session.setMode(new JSONMode());
    body_editor.setTheme(require('ace-builds/src/theme-eclipse'));
    body_editor.setFontSize("14px");

    $("#body-editor-theme").on("change", function(e){
        if($("#body-editor-theme").val() == "light"){
            body_editor.setTheme(require('ace-builds/src/theme-eclipse'));
        }else if($("#body-editor-theme").val() == "dark"){
            body_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
        }
    });

    $("#method-select").on("change", async function(e){
        console.log("aa");
        if($("#method-select").val() == "custom"){
            const { value: method } = await Swal.fire({
                title: 'Create Custom Method',
                input: 'text',
                inputPlaceholder: 'Enter your custom method name',
                showCancelButton: true
            });
            if (method) {
                $("#method-select").append('<option>'+method+'</option>');
                $("#method-select option:last").attr("selected", "selected");
            }
        }
    });

    $("#method-list a").on("click", function(e){
        e.preventDefault();
    });

    $("#request-form").on("submit", function(e){
        e.preventDefault();
        if(validateURL()){

        }else{
            $("#request-alert span.message").html("<strong>Hata!</strong> Girdğiniz istek adresi geçerli bir URL değil.");
            $("#request-alert").show()
        }
    });

    $("#request-alert button").on("click", function(e){
        e.preventDefault();
        $("#request-alert").hide();
    });

    $("#props .nav-tabs .nav-item a").on("click", function(e){
        $("#props .nav-link").removeClass("active");
        $(this).addClass("active");
        var tab_name = $(this).attr("tab");
        $("#props .tabs .tab").hide();
        $("#props .tabs .tab[tab='"+tab_name+"']").show();
    });

    $("#tab-params .list").on("click", ".add_param", function(e){
        $("#tab-params .list").append(parameter_template);
    });

    $("#tab-params .list").on("click", ".delete_param", function(e){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Delete Parameter',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                $(this).parent().parent().remove();
            }
        })
    });
});
