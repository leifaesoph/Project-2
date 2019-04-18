$(document).ready(function() {
    // Getting data form  input and pass the data to the server 
    var emailInput = $("input#borrowersemailid");
    var moneyInput = $("input#amounttogiveid");
    var dateInput = $("input#datetopayid");
    var msgInput = $("input#msgtoborrowerid");

$("#sendbtnid").on("click", function(event) {
      event.preventDefault();
      var transData = {
        lenderName: user.name,
        lenderId: user.id,
        lenderEmail: user.email,
        email: emailInput.val().trim(),
        amount: moneyInput.val().trim(),
        dueDate: dateInput.val().trim(),
        message: msgInput.val().trim()
      };
      // console.log(transData);
      
      $.post("/api/sendTrans", transData).then(function(data){
          window.location.replace("/users");
        }, function(err) {
          alert("hey");
        });
    });
  });


    