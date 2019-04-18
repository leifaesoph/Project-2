$(document).ready(function () {
    console.log("START");
    $("#paybtnid").on("click", function (event) {
        event.preventDefault();
        console.log("OK")
        id = $(this).val();
        console.log(id);
        // $('#modal').modal('hide');
        $.ajax({
            url: "/api/payPending",
            method: "PUT",
            data: { id: id }
        }).then(data => {
            console.log(data);
            // console.log('insidePutPromise');
            window.location.href = '/users'
        });

    });
    $("#payaccept").on("click", function (event) {
        event.preventDefault();
        id = $(this).val();
        console.log("ACCEPT");
        console.log(id);
        // $('#modal').modal('hide');
        $.ajax({
            url: "/api/paid",
            method: "PUT",
            data: { id: id }
        }).then(data => {
            console.log('putData: ', data);
            console.log('insidePutPromise');
            window.location.href='/users'
        }, function (err) {
            console.log(err);
        })
    });
    $("#payreject").on("click", function (event) {
        // event.preventDefault();
        window.location.href='/users'
    });
});