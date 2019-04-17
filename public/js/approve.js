$(document).ready(function () {
    $("#reject").on("click", function (event) {
        event.preventDefault();
        id=$(this).val();
        console.log();
        // $('#modal').modal('hide');
        $.ajax({
            url: "/api/deleteTrans/" + id,
            method: "DELETE"
        })
        .then(() => window.location.replace("/users"));
    });
    $("#accept").on("click", function (event) {
        event.preventDefault();
        id=$(this).val();
        console.log(id);
        // $('#modal').modal('hide');
        $.ajax({
            url: "/api/update",
            method: "PUT",
            data: {id: id}  
        }).then(data => {
            console.log('putData: ', data);
            console.log('insidePutPromise');
            window.location.href='/users'
        });
    });

});