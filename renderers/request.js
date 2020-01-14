function create_parameter_template(key="", value=""){
    return `
    <div class="item">
        <div class="key">
            <input type="text" class="form-control params_key" name="params_key[]" placeholder="Parameter Key" value="`+key+`" />
        </div>
        <div class="value">
            <input type="text" class="form-control params_value" name="params_value[]" placeholder="Parameter Value" value="`+value+`"/>
        </div>
        <div class="operation">
            <button tabindex="-1" class="btn btn-delete delete_param"><i class="fa fa-trash"></i></button>
        </div>
    </div>`
}

const header_template = `
<div class="item">
    <div class="key">
        <input type="text" class="form-control params_key" name="headers_key[]" placeholder="Header Key"/>
    </div>
    <div class="value">
        <input type="text" class="form-control params_value" name="headers_value[]" placeholder="Header Value"/>
    </div>
    <div class="operation">
        <button tabindex="-1" class="btn btn-delete delete_header"><i class="fa fa-trash"></i></button>
    </div>
</div>`;

var headerKeySuggests = ["Connection","Keep-Alive","Proxy-Authenticate","Proxy-Authorization","TE","Trailer","Transfer-Encoding","Upgrade","Connection","WWW-Authenticate","Authorization","Proxy-Authenticate","Proxy-Authorization","Age","Cache-Control","Clear-Site-Data","Expires","Pragma","Warning","Accept-CH","Accept-CH-Lifetime","Early-Data","Content-DPR","DPR","Device-Memory","Save-Data","Viewport-Width","Width","Last-Modified","ETag","If-Modified-Since","If-Unmodified-Since","ETag","If-Match","If-None-Match","If-Match","If-None-Match","If-Modified-Since","If-Unmodified-Since","Vary","Connection","Keep-Alive","Accept","Accept-Charset","Accept-Encoding","Accept-Language","Expect","Max-Forwards","Cookie","2Set-Cookie","Cookie2","Set-Cookie2","Cookie","Set-Cookie2","Set-Cookie","Access-Control-Allow-Origin","Access-Control-Allow-Credentials","Access-Control-Allow-Headers","Access-Control-Allow-Methods","Access-Control-Expose-Headers","Access-Control-Max-Age","Access-Control-Request-Headers","Access-Control-Request-Method","Origin","Timing-Allow-Origin","DNT","Tk","Content-Disposition","Content-Length","Content-Type","Content-Encoding","Content-Language","Content-Location","Forwarded","X-Forwarded-For","X-Forwarded-Host","X-Forwarded-Proto","Via","Location","From","Host","Referer","Referrer-Policy","Referer","User-Agent","Allow","Server","Accept-Ranges","Range","If-Range","Content-Range","Cross-Origin-Embedder-Policy","Cross-Origin-Opener-Policy","Cross-Origin-Resource-Policy","Content-Security-Policy","Content-Security-Policy-Report-Only","Expect-CT","Feature-Policy","Public-Key-Pins","Public-Key-Pins-Report-Only","Strict-Transport-Security","Upgrade-Insecure-Requests","upgrade-insecure-requests","X-Content-Type-Options","X-Download-Options","X-Frame-Optionsy","X-Permitted-Cross-Domain-Policies","X-Powered-By","X-XSS-Protection","Last-Event-ID","NEL","Ping-From","Ping-To","Report-To","Transfer-Encoding","TE","Trailer","Sec-WebSocket-Key","Sec-WebSocket-Extensions","Sec-WebSocket-Accept","Sec-WebSocket-Protocol","Sec-WebSocket-Version","Accept-Push-Policy","Accept-Signature","Alt-Svc","Date","Large-Allocation","Link","Push-Policy","Retry-After","Signature","Signed-Headers","Server-Timing","Service-Worker-Allowed","SourceMap","Upgrade","X-DNS-Prefetch-Control","X-Firefox-Spdy","X-Pingback","X-Requested-With","X-Robots-Tag","X-UA-Compatible"];
var headerValueSuggests = ["application/EDI-X12","application/EDIFACT","application/javascript","application/octet-stream","application/ogg","application/pdf","application/xhtml+xml","application/x-shockwave-flash","application/json","application/ld+json","application/xml","application/zip","application/x-www-form-urlencoded","audio/mpeg","audio/x-ms-wma","audio/vnd.rn-realaudio","audio/x-wav","image/gif","image/jpeg","image/png","image/tiff","image/vnd.microsoft.icon","image/x-icon","image/vnd.djvu","image/svg+xml","multipart/mixed","multipart/alternative","multipart/related (using by MHTML (HTML mail).)","multipart/form-data","text/css","text/csv","text/html","text/javascript (obsolete)","text/plain","text/xml","video/mpeg","video/mp4","video/quicktime","video/x-ms-wmv","video/x-msvideo","video/x-flv","video/webm","application/vnd.oasis.opendocument.text","application/vnd.oasis.opendocument.spreadsheet","application/vnd.oasis.opendocument.presentation","application/vnd.oasis.opendocument.graphics","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.mozilla.xul+xml"];

function checkParamsAndAdd(){
    var params = $("#tab-params .param-list input.params_key");
    if($(params[params.length-1]).val()){
        $("#tab-params .param-list").append(create_parameter_template());
    }
}

function checkHeadersAndAdd() {
    var header = $("#tab-headers .header-list input.params_key");
    if ($(header[header.length-1]).val()) {
        $("#tab-headers .header-list").append(header_template);
    }
    $("#tab-headers .params_key").autocomplete({
        source: [headerKeySuggests]
    });

    $("#tab-headers .params_value").autocomplete({
        source: [headerValueSuggests]
    });
    $(".xdsoft_autocomplete_hint").attr("tabindex", "-1");
}

$(function(){

    var active_tab_name_props = $("#props .nav-tabs .active").attr("tab");
    $("#props .tabs .tab[tab='"+active_tab_name_props+"']").show();

    var active_tab_name_response = $("#response .nav-tabs .active").attr("tab");
    $("#response .tabs .tab[tab='"+active_tab_name_response+"']").show();

    $("#tab-params .param-list").append(create_parameter_template());
    $("#tab-params .param-list").append(create_parameter_template());
    $("#tab-params .param-list").append(create_parameter_template());
    $("#tab-headers .header-list").append(header_template);
    $("#tab-headers .header-list").append(header_template);
    $("#tab-headers .header-list").append(header_template);

    $("#tab-headers .params_key").autocomplete({
        source: [headerKeySuggests]
    });

    $("#tab-headers .params_value").autocomplete({
        source: [headerValueSuggests]
    });

    $(".xdsoft_autocomplete_hint").attr("tabindex", "-1");

    $("#tab-params .param-list").on("change", "input.params_key", function(e){
        checkParamsAndAdd();
    });

    $("#tab-headers .header-list").on("change", "input.params_key", function(e){
        checkHeadersAndAdd();
    });

    body_editor = ace.edit("body-editor", {
        minLines: 15,
        maxLines: 9999
    });

    var JSONMode = require("ace-builds/src/mode-json").Mode;
    body_editor.session.setMode(new JSONMode());
    body_editor.setTheme(require('ace-builds/src/theme-xcode'));
    body_editor.setFontSize("14px");

    $("#body-editor-theme").on("change", function(e){
        switch ($("#body-editor-theme").val()) {
            case "light":
                body_editor.setTheme(require('ace-builds/src/theme-xcode'));
                response_editor.setTheme(require('ace-builds/src/theme-xcode'));
                break;
            case "dark":
                body_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
                response_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
                break;
            default:
                break;
        }
    });

    $("#body-content-type").on("change", function(e){
        var mode;
        var new_header_mode;
        switch ($("#body-content-type").val()) {
            case "json":
                mode = require("ace-builds/src/mode-json").Mode;
                new_header_mode = "application/json";
                break;
            case "xml":
                mode = require("ace-builds/src/mode-xml").Mode;
                new_header_mode = "application/xml";
                break;
            case "plain text":
                mode = require("ace-builds/src/mode-plain_text").Mode;
                new_header_mode = "text/plain";
                break;
            case "html":
                mode = require("ace-builds/src/mode-html").Mode;
                new_header_mode = "text/html";
                break;
            default:
                mode = require("ace-builds/src/mode-plain_text").Mode;
                break;
        }
        body_editor.session.setMode(new mode());
        if(new_header_mode){
            var changed = false;
            $("#tab-headers .header-list .item").each(function(index){
                if($(this).find(".params_key").val() == "Content-Type"){
                    if(!changed){
                        $(this).find(".params_value").val(new_header_mode);
                        changed = true;
                    }
                }
            });
            if(!changed){
                var created = false;
                $("#tab-headers .header-list .item").each(function(index){
                    if(!$(this).find(".params_key").val()){
                        if(!created){
                            $(this).find(".params_key").val("Content-Type");
                            $(this).find(".params_value").val(new_header_mode);
                            created = true;
                        }
                    }
                });
                if(!created){
                    $("#tab-headers .header-list").append(header_template);
                    $("#tab-headers .header-list .item:last").find(".params_key").val("Content-Type");
                    $("#tab-headers .header-list .item:last").find(".params_value").val(new_header_mode);
                }
            }
        }
    });

    $("#method-select").on("change", async function(e){
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

    $("#props .nav-tabs .nav-item a").on("click", function(e){
        e.preventDefault();          
        $("#props .nav-link").removeClass("active");
        $(this).addClass("active");
        var tab_name = $(this).attr("tab");
        $("#props .tabs .tab").hide();
        $("#props .tabs .tab[tab='"+tab_name+"']").show();
    });

    $("#response .nav-tabs .nav-item a").on("click", function(e){
        e.preventDefault();
        $("#response .nav-link").removeClass("active");
        $(this).addClass("active");
        var tab_name = $(this).attr("tab");
        $("#response .tabs .tab").hide();
        $("#response .tabs .tab[tab='"+tab_name+"']").show();
    });

    $("#tab-params .param-list").on("click", ".add_param", function(e){
        $("#tab-params .param-list").append(create_parameter_template());
    });

    $("#tab-params .param-list").on("click", ".delete_param", function(e){
        if($("#tab-params .param-list .item").length > 1){
            if($(this).parent().parent().find(".params_key").val()){
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
                });
            }else{
                $(this).parent().parent().remove();
            }
        }else{
            Swal.fire("Warning", "You cant delete last parameter, maybe you need it.", "warning");
        }
    });

    $("#tab-headers .header-list").on("click", ".delete_header", function(e){
        if($("#tab-headers .header-list .item").length > 1){
            if($(this).parent().parent().find(".params_key").val()){
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
                });
            }else{
                $(this).parent().parent().remove();
            }
        }else{
            Swal.fire("Warning", "You cant delete last header, maybe you need it.", "warning");
        }
    });

});