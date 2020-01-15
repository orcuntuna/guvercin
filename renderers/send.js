function validateURL(){
    var url = $("#url").val();
    if(validate({website: url}, {website: {url: true}}) != undefined){
        return false;
    }else{
        return true;
    }
}

var response_codes = [
    { code: 200, name: "OK", color: "#20bf6b" },
    { code: 201, name: "Created", color: "#20bf6b" },
    { code: 202, name: "Accepted", color: "#20bf6b" },
    { code: 204, name: "No Content", color: "#20bf6b" },
    { code: 301, name: "Moved Parmanently", color: "#4b6584" },
    { code: 302, name: "Found", color: "#4b6584" },
    { code: 303, name: "See Other", color: "#4b6584" },
    { code: 304, name: "Not Modified", color: "#4b6584" },
    { code: 307, name: "Temporary Redirect", color: "#4b6584" },
    { code: 400, name: "Bad Request", color: "#eb3b5a" },
    { code: 401, name: "Unauthorized", color: "#eb3b5a" },
    { code: 403, name: "Forbidden", color: "#eb3b5a" },
    { code: 404, name: "Not Found", color: "#eb3b5a" },
    { code: 405, name: "Method Not Allowed", color: "#eb3b5a" },
    { code: 406, name: "Not Acceptable", color: "#eb3b5a" },
    { code: 412, name: "Precondition Failed", color: "#eb3b5a" },
    { code: 415, name: "Unsupported Media Type", color: "#eb3b5a" },
    { code: 500, name: "Internal Server Error", color: "#fa8231" },
    { code: 501, name: "Not Implemented", color: "#fa8231" },
]

var response_timer;
var response_time;

$(function(){

    var params = {
        url: null,
        method: null,
        body: null,
        headers: {},
        params: ""
    }

    $("#request-form").on("submit", function(e){
        e.preventDefault();
        if(validateURL()){

            params.url = $("#url").val();
            params.method = $("#method-select").val();
            params.body = body_editor.getValue();

            history_data = {
                request_method: params.method,
                request_url: params.url,
                request_body: params.body,
                request_parameters: [],
                request_headers: []
            };

            $("#tab-headers .header-list .item").each(function(index){
                if($(this).find(".params_key").val()){
                    var key = $(this).find(".params_key").val();
                    var value = $(this).find(".params_value").val();
                    params.headers[key] = value;
                    history_data.request_headers[index] = JSON.stringify({key: key, value: value});
                }
            });

            $("#tab-params .param-list .item").each(function(index){
                if($(this).find(".params_key").val()){
                    var key = $(this).find(".params_key").val();
                    var value = $(this).find(".params_value").val();
                    if(index == 0){
                        params.params += "?" + key + "=" + value;
                    }else{
                        params.params += "&" + key + "=" + value;
                    }
                    history_data.request_parameters[index] = JSON.stringify({key: key, value: value});

                }
            });

            if(params.method.toLowerCase() == "get"){
                delete params.body;
            }

            var response = {}

            response_time = 0;
            response_timer = setInterval(() => {
                response_time += 10;
            }, 10);

            fetch(params.url + params.params, params).then(res => {
                response.headers = res.headers.raw();
                response.status = res.status;
                response.statusText = res.statusText;
                return res.text();
            }).then(data => {

                clearInterval(response_timer);
                /* History Save */
                last_history = db.get("history").value();
                
                if (JSON.stringify(last_history[last_history.length - 1]) != JSON.stringify(history_data)) {
                    history_template = create_history_template(last_history.length, history_data.request_method, history_data.request_url);
                    $("#history .list-group").prepend(history_template);
                    db.get('history')
                      .push(history_data)
                      .write()
                }
                /* History Save */

                response.data = data;
                console.log(response);

                if(response.headers["content-type"][0].includes("json")){
                    try{
                        response.data = JSON.stringify(JSON.parse(response.data), null, 4);
                    }catch(err){
                        console.log(err);
                    }
                }

                if(response.headers["content-type"][0].includes("xml")){
                    try{
                        var pretty_xml = xml_beautify(response.data);
                        response.data = pretty_xml;
                        response.data = response.data.replace(/^\s*\n/gm, ""); 
                    }catch(err){
                        console.log(err);
                    }
                }

                response_editor.setValue(response.data);
                response_editor.clearSelection();

                var mode = null;
                if(response.headers["content-type"][0].includes("json")){
                    mode = require("ace-builds/src/mode-json").Mode;
                }else if(response.headers["content-type"][0].includes("xml")){
                    mode = require("ace-builds/src/mode-xml").Mode;
                }else if(response.headers["content-type"][0].includes("html")){
                    mode = require("ace-builds/src/mode-html").Mode;
                }else{
                    mode = require("ace-builds/src/mode-plain_text").Mode;
                }

                response_editor.session.setMode(new mode());

                $("#response-headers").html("");
                $("#response-info").html("");
                $("#response-info").append('<li><strong>Response Time: </strong> '+response_time / 1000+' seconds</li>');
                Object.keys(response.headers).forEach(function(key) {
                    $("#response-headers").append('<li><strong>'+key+'</strong>: '+response.headers[key]+'</li>');
                });

                response_codes.forEach(element => {
                    if(element.code == response.status){
                        $("#response-info").prepend('<li><strong>Response Code: </strong> <span style="color: '+element.color+'">'+element.code+' ('+element.name+')</span></li>');
                        $(".response-code span").css("background-color", element.color);
                        $(".response-code span").text(element.code + " (" + element.name + ")");
                        $(".response-code span").show();
                    }
                });

                if(response.data.length > 0){
                    var response_size = (new TextEncoder().encode(response.data)).length;
                    $("#response-info").append('<li><strong>Response Data Size: </strong> '+response_size / 1000+' kb</li>');
                }

                $(".response-hr").show();
                
            }).catch(err => {
                clearInterval(response_timer);
                console.log(err);
                response_editor.setValue("");
                $("#response-headers").html("");
                $("#response-info").html("");
                $(".response-hr").hide();
                $(".response-code span").css("background-color", "#eb3b5a");
                $(".response-code span").text(err.code);
                $(".response-code span").show();
            });

        }else{
            $("#request-alert span.message").html("<strong>Hata!</strong> Girdğiniz istek adresi geçerli bir URL değil.");
            $("#request-alert").show()
        }
    });

    $("#request-alert button").on("click", function(e){
        e.preventDefault();
        $("#request-alert").hide();
    });

});