function create_history_template(index, method, url) {
    return `
    <a href="javascript:void(0)" class="mb-2" historyIndex="` + index + `">
        <li class="list-group-item">
            <span class="method" style="color: `+method_colors(method)+`">` + method + `</span>
            <span class="url ml-3">` + url + `</span>
        </li>
    </a>`;
}

function method_colors(method){
    var colors = {
        "get": "#10ac84",
        "post": "#2e86de",
        "put": "#f0932b",
        "delete": "#ee5253",
        "patch": "#be2edd",
        "custom": "#535c68"
    }
    method = method.toLowerCase();
    if(colors[method]){
        return colors[method];
    }
    return colors["custom"];
}

$(function () {

    user_history = db.get("history").value();
    
    if (user_history.length > 0) {
        user_history.forEach((element, index) => {
            history_template = create_history_template(index, element.request_method, element.request_url);
            $("#history .list-group").prepend(history_template);
        });
    }

    $("#history").on("click", ".list-group a", function(e) {
        history_index = $(this).attr("historyIndex");

        history_request = user_history[history_index];
        history_request_headers = history_request.request_headers;
        history_request_parameters = history_request.request_parameters;
        
        $("#url").val(history_request.request_url);
        $('#method-select option:selected').removeAttr('selected');
        $("#method-select option[value='" + history_request.request_method +"']").attr("selected", "selected");
        body_editor.setValue(history_request.request_body);
        history_request_headers.forEach(element => {
            element = JSON.parse(element);
            $("#tab-headers .header-list").html("");
            $("#tab-headers .header-list").append(create_header_template(element.key, element.value)); 
        });
        $("#tab-headers .header-list").append(create_header_template()); 


        history_request_parameters.forEach(element => {
            element = JSON.parse(element);
            $("#tab-params .param-list").html("");
            $("#tab-params .param-list").append(create_parameter_template(element.key, element.value));
        });
        $("#tab-params .param-list").append(create_parameter_template());
        body_editor.clearSelection();

        
    });
});