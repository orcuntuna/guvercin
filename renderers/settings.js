$(".open-drawer a").on("click", function(e){
    e.preventDefault();
    $("#drawer").show();
    $(".open-drawer").hide();
    $(".close-drawer").show();
});

$(".close-drawer a").on("click", function(e){
    e.preventDefault();
    $("#drawer").hide();
    $(".close-drawer").hide();
    $(".open-drawer").show();
});
