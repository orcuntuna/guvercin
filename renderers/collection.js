function create_collection_template(index, method, url) {
    return `
    <a href="javascript:void(0)" class="mb-2" collectionIndex="` + index + `">
        <li class="list-group-item">
            <span class="method">` + method + `</span>
            <span class="url ml-3">` + url + `</span>
            <button class="delete-button">
                <i class="fa fa-trash"></i>
            </button>
        </li>
    </a>`;
}

ipcRenderer.on("save-request", function(event) {
    $("#save").click();
})

$(function () {
    user_collection = db.get("collection").value();

    if (user_collection.length > 0) {
        user_collection.forEach((element, index) => {
            collection_template = create_collection_template(index, element.request_method, element.request_url);
            $("#collection .list-group").prepend(collection_template);
        });  
    } 

    $("#collection").on("click", ".list-group-item button", function() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Delete Collection',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                collection_item = $(this).parent().parent().attr("collectionIndex");
                $(this).parent().parent().remove();
                db.get("collection").remove(user_collection[collection_item]).write()
            }
        });
        

    });


    $("#save").on("click", function() {

        method = $("#method-select").val();
        url = $("#url").val();
        body = body_editor.getValue();

        if (url) {
            collection_data = {
                request_method: method,
                request_url: url,
                request_body: body,
                request_parameters: [],
                request_headers: []
            };
    
            $("#tab-headers .header-list .item").each(function(index){
                if($(this).find(".params_key").val()){
                    var key = $(this).find(".params_key").val();
                    var value = $(this).find(".params_value").val();
                    collection_data.request_headers[index] = JSON.stringify({key: key, value: value});
                }
            });
    
            $("#tab-params .param-list .item").each(function(index){
                if($(this).find(".params_key").val()){
                    var key = $(this).find(".params_key").val();
                    var value = $(this).find(".params_value").val();
                    collection_data.request_parameters[index] = JSON.stringify({key: key, value: value});
                }
            });
    
            last_collection = db.get("collection").value();
    
            if (JSON.stringify(last_collection[last_collection.length - 1]) != JSON.stringify(collection_data)) {
                db.get("collection").push(collection_data).write();
                collection_template = create_collection_template(last_collection.length-1, collection_data.request_method, collection_data.request_url);
                $("#collection .list-group").prepend(collection_template);
                
                Swal.fire({
                    icon: "success",
                    title: "Good Job!",
                    text: "Saving succesfully",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "URL could not empty. Please enter URL",
            });
        }

    });

    $("#collection").on("click", ".list-group a", function(e) {
        collection_index = $(this).attr("collectionIndex");

        collection_request = user_collection[collection_index];
        collection_request_headers = collection_request.request_headers;
        collection_request_parameters = collection_request.request_parameters;

        $("#url").val(collection_request.request_url);
        $('#method-select option:selected').removeAttr('selected');
        $("#method-select option[value='" + collection_request.request_method +"']").attr("selected", "selected");
        body_editor.setValue(collection_request.request_body);
        collection_request_headers.forEach(element => {
            element = JSON.parse(element);
            $("#tab-headers .header-list").html("");
            $("#tab-headers .header-list").append(create_header_template(element.key, element.value)); 
        });
        if (collection_request_headers.length > 0) {
            $("#tab-headers .header-list").append(create_header_template()); 
        }


        collection_request_parameters.forEach(element => {
            element = JSON.parse(element);
            $("#tab-params .param-list").html("");
            $("#tab-params .param-list").append(create_parameter_template(element.key, element.value));
        });
        if (collection_request_parameters.length > 0) {
            $("#tab-params .param-list").append(create_parameter_template());
        }
        body_editor.clearSelection();
    });


});
