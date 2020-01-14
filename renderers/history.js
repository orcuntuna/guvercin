

$(function () {

    user_history = db.get("history").value();
    
    user_history.forEach((element, index) => {

        history_template = `
        <a href="javascript:void(0)" class="mb-2" historyIndex="` + index + `">
            <li class="list-group-item">
                <span class="method">` + element.request_method + `</span>
                <span class="url ml-3">` + element.request_url + `</span>
            </li>
        </a>`;

        $("#history .list-group").prepend(history_template);
    });

    $("#history .list-group a").on("click", function(e) {
        history_index = $(this).attr("historyIndex");

        history_request = user_history[history_index];
        console.log(history_request);
        $("#url").val(history_request.request_url);
        $('#method-select option:selected').removeAttr('selected');
        $("#method-select option[value='" + history_request.request_method +"']").attr("selected", "selected");
        body_editor.setValue(history_request.request_body)
        
    });
});