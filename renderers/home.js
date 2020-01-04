const Swal = require('sweetalert2');

const parameter_template = `<div class="item">
<div class="key">
  <input type="text" class="form-control" name="params_key[]" placeholder="Parameter Key"/>
</div>
<div class="value">
  <input type="text" class="form-control" name="params_value[]" placeholder="Parameter Value"/>
</div>
<div class="operation">
  <button class="btn btn-danger delete_param mr-1"><i class="fa fa-trash"></i></button>
  <button class="btn btn-success add_param"><i class="fa fa-plus"></i></button>
</div>
</div>`;

function validateURL(){
    var url = $("#url").val();
    if(validate({website: url}, {website: {url: true}}) != undefined){
        return false;
    }else{
        return true;
    }
}

$(function(){

    var active_tab_name = $("#props .nav-tabs .active").attr("tab");
    $("#props .tabs .tab[tab='"+active_tab_name+"']").show();

    $("#tab-params .list").append(parameter_template);
    $("#tab-params .list").append(parameter_template);
    $("#tab-params .list").append(parameter_template);

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
