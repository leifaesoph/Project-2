$(document).ready(function(){
    $("#logout").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url:"/logout",
            method:"GET",
        }).then(function(data) {
            window.location.replace("/");
        });
    });
});