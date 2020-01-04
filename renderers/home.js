function validateURL(){
    var url = $("#url").val();
    if(validate({website: url}, {website: {url: true}}) != undefined){
        return false;
    }else{
        return true;
    }
}

$(function(){
    $("#method-list a").on("click", function(e){
        e.preventDefault();
    });
    $("#request-form").on("submit", function(e){
        e.preventDefault();
        if(validateURL()){

        }else{
            $("#request-alert span.message").html("<strong>Hata!</strong> Girdğiniz istek adresi geçerli bir URL değil.");
            $("#request-alert").addClass("show");
        }
    });
    $("#request-alert button").on("click", function(e){
        e.preventDefault();
        $("#request-alert").removeClass("show");
    });
});
