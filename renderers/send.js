const fetch = require("node-fetch");

function validateURL(){
    var url = $("#url").val();
    if(validate({website: url}, {website: {url: true}}) != undefined){
        return false;
    }else{
        return true;
    }
}

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

            $("#tab-headers .header-list .item").each(function(index){
                if($(this).find(".params_key").val()){
                    var key = $(this).find(".params_key").val();
                    var value = $(this).find(".params_value").val();
                    params.headers[key] = value;
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
                }
            });

            if(params.method.toLowerCase() == "get"){
                delete params.body;
            }

            var response = {}

            fetch(params.url + params.params, params).then(res => {
                response.headers = res.headers.raw();
                response.status = res.status;
                response.statusText = res.statusText;
                return res.text();
            }).then(data => {
                response.data = data;
                console.log(response);
            }).catch(err => {
                console.log(err);
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