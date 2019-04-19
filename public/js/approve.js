$(document).ready(function () {
    
    //reject the new trans and send the req to server to delete 
    $("#reject").on("click", function (event) {
        event.preventDefault();
        id=$(this).val();
        console.log();
        $.ajax({
            url: "/api/deleteTrans/" + id,
            method: "DELETE"
        })
        .then(() => window.location.replace("/users"));
    });

    //accepte the new trans and send the req to server to update 
    $("#accept").on("click", function (event) {
        event.preventDefault();
        id=$(this).val();
        console.log(id);
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