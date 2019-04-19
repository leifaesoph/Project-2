// For the payment approval
$(document).ready(function () {
    $("#paybtnid").on("click", function (event) {
        event.preventDefault();
        id = $(this).val();
        $.ajax({
            url: "/api/payPending",
            method: "PUT",
            data: { id: id }
        }).then(data => {
            window.location.href = '/users'
        });
    });
    $("#payaccept").on("click", function (event) {
        event.preventDefault();
        id = $(this).val();
        $.ajax({
            url: "/api/paid",
            method: "PUT",
            data: { id: id }
        }).then(data => {
            window.location.href='/users'
        }, function (err) {
            console.log(err);
        })
    });
    $("#payreject").on("click", function (event) {
        event.preventDefault();
        id = $(this).val();
        $.ajax({
            url: "/api/payreject",
            method: "PUT",
            data: { id: id }
        }).then(data => {
            window.location.href='/users'
        }, function (err) {
            console.log(err);
        })
    }); 
});