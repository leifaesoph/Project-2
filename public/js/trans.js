$(document).ready(function() {
    // Getting references to our form and input
    // var signUpForm = $("form.signup1");
    var emailInput = $("input#borrowersemailid");
    var moneyInput = $("input#amounttogiveid");
    var dateInput = $("input#datetopayid");
    var msgInput = $("input#msgtoborrowerid");

    //-----------------------

$("#sendbtnid").on("click", function(event) {
      event.preventDefault();
      var transData = {
        lenderName:user.name,
        lenderId: user.id,
        email: emailInput.val().trim(),
        amount: moneyInput.val().trim(),
        dueDate: dateInput.val().trim(),
        message: msgInput.val().trim()
        // text: textInput.val().trim()
      };
      console.log(transData)

      
      $.post("/api/sendTrans", transData).then(function(data){

          console.log("UAHSDOUAHSDOIAHS" + data)
          window.location.replace("/users");
        }, function(err) {
          // $('.errormessage').fadeIn(500).fadeOut(1000); 
          // $("").append("error");
          alert("hey");
        })
    });

  });

  //-------------------------------------------------------------------------------


  


    