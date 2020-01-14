

$(function () {

    user_history = db.get("history").value();
    
    user_history.forEach((element, index) => {

        history_template = `
        <a href="javascript:void(0)" historyIndex="` + index + `">
            <li class="list-group-item">
                <span class="method">` + element.request_method + `</span>
                <span class="url ml-3">` + element.request_url + `</span>
            </li>
        </a>`;

        $("#history .list-group").prepend(history_template);
    });
});