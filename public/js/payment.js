$(document).ready(function () {
    $("#accept").on("click", function (event) {
        event.preventDefault();
        id=$(this).val();
        console.log(id);
        // $('#modal').modal('hide');
        $.ajax({
            url: "/api/payed",
            method: "PUT",
            data: {id: id}  
        }).then(data => {
            console.log('putData: ', data);
            console.log('insidePutPromise');
            window.location.href='/users'
        });
    });

});